import smtplib
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import Client, TestCase, override_settings
from rest_framework.test import APIClient

from apps.notifications.services import send_lead_notifications

from .models import Lead, LeadActivity, QuotationRequest


CONTACT_URL = "/api/v1/leads/"
QUOTE_URL = "/api/v1/quotations/requests/"
ADMIN_LIST_URL = "/api/v1/admin/leads/"
DASHBOARD_URL = "/api/v1/admin/dashboard/"
IDEMPOTENCY_KEY = "test-contact-key-0001"


def contact_payload(**overrides):
    payload = {
        "name": "Asha Rao",
        "email": "asha@example.test",
        "phone": "+91 98765 43210",
        "business": "Example Studio",
        "service": "website_design",
        "message": "We need a responsive business website.",
        "privacy_consent": True,
        "utm": {"utm_source": "newsletter", "utm_campaign": "autumn"},
    }
    return {**payload, **overrides}


def quotation_payload(**overrides):
    payload = {
        "name": "Ravi Kumar",
        "email": "ravi@example.test",
        "phone": "",
        "business": "Local Services",
        "service_category": "business_technology",
        "project_description": "We want to organize customer follow-ups.",
        "budget_range": "Still being explored",
        "timeline": "To be discussed",
        "service_requirements": {"current_tools": "Spreadsheets"},
        "privacy_consent": True,
    }
    return {**payload, **overrides}


class PublicLeadSubmissionTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def post(self, url=CONTACT_URL, data=None, key=IDEMPOTENCY_KEY):
        return self.client.post(
            url,
            data or contact_payload(),
            format="json",
            HTTP_IDEMPOTENCY_KEY=key,
        )

    def test_contact_submission_creates_lead_and_activity(self):
        with patch("apps.leads.services.send_lead_notifications") as notify:
            with self.captureOnCommitCallbacks(execute=True):
                response = self.post()
            notify.assert_called_once()
        self.assertEqual(response.status_code, 201)
        lead = Lead.objects.get()
        self.assertEqual(lead.email, "asha@example.test")
        self.assertEqual(lead.status, Lead.Status.NEW)
        self.assertEqual(lead.utm["utm_source"], "newsletter")
        self.assertIsNotNone(lead.privacy_consent_at)
        self.assertEqual(lead.activities.get().action, LeadActivity.Action.CREATED)
        self.assertEqual(response.data["reference"], lead.reference)

    def test_invalid_email_and_missing_consent_are_rejected(self):
        response = self.post(data=contact_payload(email="not-an-email"))
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.data)
        self.assertEqual(Lead.objects.count(), 0)

        response = self.post(data=contact_payload(privacy_consent=False))
        self.assertEqual(response.status_code, 400)
        self.assertIn("privacy_consent", response.data)
        self.assertEqual(Lead.objects.count(), 0)

    def test_honeypot_submission_is_rejected_without_saving(self):
        response = self.post(data=contact_payload(website="spam"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Lead.objects.count(), 0)

    def test_repeated_idempotency_key_returns_original_lead(self):
        first = self.post()
        second = self.post()
        self.assertEqual(first.status_code, 201)
        self.assertEqual(second.status_code, 200)
        self.assertTrue(second.data["duplicate"])
        self.assertEqual(first.data["reference"], second.data["reference"])
        self.assertEqual(Lead.objects.count(), 1)

    def test_reusing_key_for_different_data_is_rejected(self):
        self.post()
        response = self.post(data=contact_payload(message="Different request."))
        self.assertEqual(response.status_code, 409)
        self.assertEqual(Lead.objects.count(), 1)

    def test_missing_idempotency_key_is_rejected(self):
        response = self.client.post(CONTACT_URL, contact_payload(), format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("idempotency_key", response.data)

    def test_quotation_request_links_lead_and_keeps_requirements(self):
        with self.captureOnCommitCallbacks(execute=True):
            response = self.client.post(
                QUOTE_URL,
                quotation_payload(),
                format="json",
                HTTP_IDEMPOTENCY_KEY="test-quotation-key-0001",
            )
        self.assertEqual(response.status_code, 201)
        lead = Lead.objects.get()
        quote = QuotationRequest.objects.get()
        self.assertEqual(quote.lead, lead)
        self.assertEqual(quote.project_category, "business_technology")
        self.assertEqual(quote.service_requirements["current_tools"], "Spreadsheets")
        self.assertEqual(quote.budget_range, "Still being explored")

    def test_anonymous_submission_throttle_blocks_excess_requests(self):
        cache.clear()
        responses = [
            self.post(key=f"rate-limit-key-{index:04d}")
            for index in range(6)
        ]
        self.assertTrue(all(response.status_code == 201 for response in responses[:5]))
        self.assertEqual(responses[5].status_code, 429)


class AdminLeadApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.lead = Lead.objects.create(
            name="Private Lead",
            email="private@example.test",
            service="website_design",
            requirements="Private enquiry text.",
        )
        self.user_model = get_user_model()

    def make_staff_user(self, username, permissions=()):
        user = self.user_model.objects.create_user(
            username=username,
            password="Not-a-production-password-123!",
            is_staff=True,
        )
        if permissions:
            user.user_permissions.add(*permissions)
        return user

    def test_admin_api_rejects_anonymous_and_unpermitted_staff(self):
        anonymous = self.client.get(ADMIN_LIST_URL)
        self.assertEqual(anonymous.status_code, 403)

        staff = self.make_staff_user("no-permission")
        self.client.force_authenticate(staff)
        denied = self.client.get(ADMIN_LIST_URL)
        self.assertEqual(denied.status_code, 403)
        self.assertNotIn(b"private@example.test", denied.content)

    def test_lead_list_requires_view_permission_and_dashboard_is_protected(self):
        permission = self._permission("view_lead")
        staff = self.make_staff_user("lead-reader", (permission,))
        self.client.force_authenticate(staff)

        response = self.client.get(ADMIN_LIST_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["results"][0]["reference"], self.lead.reference)
        self.assertEqual(self.client.get(DASHBOARD_URL).status_code, 200)

    def test_status_update_and_note_create_audit_activity(self):
        permissions = (
            self._permission("view_lead"),
            self._permission("change_lead"),
            self._permission("add_leadactivity"),
        )
        staff = self.make_staff_user("lead-editor", permissions)
        self.client.force_authenticate(staff)
        url = f"{ADMIN_LIST_URL}{self.lead.pk}/"

        response = self.client.patch(url, {"status": "CONTACTED"}, format="json")
        self.assertEqual(response.status_code, 200)
        self.lead.refresh_from_db()
        self.assertEqual(self.lead.status, Lead.Status.CONTACTED)
        activity = self.lead.activities.get(action=LeadActivity.Action.STATUS_CHANGED)
        self.assertEqual(activity.performed_by, staff)

        note_response = self.client.post(
            f"{url}notes/",
            {"note": "Follow-up scheduled."},
            format="json",
        )
        self.assertEqual(note_response.status_code, 201)
        self.assertEqual(note_response.data["notes"], "Follow-up scheduled.")

    def test_session_authenticated_admin_write_requires_csrf(self):
        staff = self.make_staff_user(
            "csrf-editor",
            (self._permission("view_lead"), self._permission("change_lead")),
        )
        csrf_client = APIClient(enforce_csrf_checks=True)
        csrf_client.force_login(staff)
        response = csrf_client.patch(
            f"{ADMIN_LIST_URL}{self.lead.pk}/",
            {"status": "CONTACTED"},
            format="json",
        )
        self.assertEqual(response.status_code, 403)

    def test_admin_csv_export_requires_export_permission_and_escapes_formulas(self):
        self.lead.name = "=2+2"
        self.lead.save(update_fields=("name",))
        changelist_url = "/django-admin/leads/lead/"
        action_data = {
            "action": "export_leads_csv",
            "_selected_action": str(self.lead.pk),
        }

        restricted = self.make_staff_user(
            "csv-restricted",
            (self._permission("view_lead"),),
        )
        restricted_client = Client()
        restricted_client.force_login(restricted)
        denied = restricted_client.post(changelist_url, action_data)
        self.assertNotEqual(denied.get("Content-Type"), "text/csv; charset=utf-8")

        exporter = self.make_staff_user(
            "csv-exporter",
            (
                self._permission("view_lead"),
                self._permission("export_lead"),
            ),
        )
        exporter_client = Client()
        exporter_client.force_login(exporter)
        exported = exporter_client.post(changelist_url, action_data)
        self.assertEqual(exported.status_code, 200)
        self.assertTrue(exported["Content-Type"].startswith("text/csv"))
        self.assertIn(b"'=2+2", exported.content)

    def _permission(self, codename):
        from django.contrib.auth.models import Permission

        return Permission.objects.get(
            content_type__app_label="leads",
            codename=codename,
        )


class NotificationFailureTests(TestCase):
    def test_smtp_failure_is_reported_without_raising_or_exposing_customer_data(self):
        lead = Lead.objects.create(
            name="Mail Test",
            email="mail@example.test",
            service="website_design",
            requirements="A request",
        )
        with override_settings(
            COMPANY_NOTIFICATION_EMAIL="company@example.test",
            DEFAULT_FROM_EMAIL="site@example.test",
        ):
            with patch(
                "apps.notifications.services.send_mail",
                side_effect=smtplib.SMTPException("mail service unavailable"),
            ) as send:
                result = send_lead_notifications(lead)
        self.assertFalse(result)
        send.assert_called_once()
