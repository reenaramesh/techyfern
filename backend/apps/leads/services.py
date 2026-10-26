import hashlib
import json
import re

from django.db import IntegrityError, transaction
from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError
from rest_framework.response import Response

from apps.notifications.services import send_lead_notifications

from .models import IdempotencyRecord, Lead, LeadActivity, QuotationRequest

IDEMPOTENCY_KEY_PATTERN = re.compile(r"^[A-Za-z0-9._:-]{16,128}$")


class IdempotencyConflict(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = "This request key was already used with different form data."
    default_code = "idempotency_conflict"


def require_idempotency_key(request):
    key = request.headers.get("Idempotency-Key", "").strip()
    if not IDEMPOTENCY_KEY_PATTERN.fullmatch(key):
        raise ValidationError(
            {
                "idempotency_key": (
                    "Send a unique Idempotency-Key header containing 16 to 128 "
                    "letters, numbers, dots, underscores, colons or hyphens."
                )
            }
        )
    return key


def payload_fingerprint(payload):
    canonical = json.dumps(
        payload,
        sort_keys=True,
        ensure_ascii=True,
        separators=(",", ":"),
    )
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def create_public_submission(*, scope, key, serializer, is_quote):
    clean_data = dict(serializer.validated_data)
    clean_data.pop("website", None)
    clean_data.pop("privacy_consent", None)
    fingerprint = payload_fingerprint(clean_data)

    existing = IdempotencyRecord.objects.select_related("lead").filter(
        scope=scope,
        key=key,
    ).first()
    if existing:
        if existing.fingerprint != fingerprint:
            raise IdempotencyConflict()
        return Response(
            {
                "reference": existing.lead.reference,
                "message": "This enquiry has already been received.",
                "duplicate": True,
            },
            status=status.HTTP_200_OK,
        )

    try:
        with transaction.atomic():
            if is_quote:
                service = clean_data.pop("service_category")
                requirements = clean_data.pop("project_description")
                service_requirements = clean_data.pop("service_requirements", {})
                budget = clean_data.pop("budget_range")
                timeline = clean_data.pop("timeline")
            else:
                service = clean_data.pop("service")
                requirements = clean_data.pop("message")

            name = clean_data.pop("name")
            email = clean_data.pop("email")
            phone = clean_data.pop("phone", "")
            business = clean_data.pop("business", "")
            utm = clean_data.pop("utm", {})
            lead = Lead.objects.create(
                name=name,
                email=email,
                phone=phone,
                business=business,
                service=service,
                requirements=requirements,
                source=scope,
                utm=utm,
                privacy_consent_at=timezone.now(),
            )
            LeadActivity.objects.create(
                lead=lead,
                action=LeadActivity.Action.CREATED,
                notes="Public website enquiry received.",
            )
            if is_quote:
                QuotationRequest.objects.create(
                    lead=lead,
                    project_category=service,
                    project_requirements=requirements,
                    service_requirements=service_requirements,
                    budget_range=budget,
                    expected_timeline=timeline,
                )
            IdempotencyRecord.objects.create(
                scope=scope,
                key=key,
                fingerprint=fingerprint,
                lead=lead,
            )
            transaction.on_commit(
                lambda lead_id=lead.pk: notify_after_commit(lead_id),
                robust=True,
            )
    except IntegrityError:
        existing = IdempotencyRecord.objects.select_related("lead").filter(
            scope=scope,
            key=key,
        ).first()
        if not existing:
            raise
        if existing.fingerprint != fingerprint:
            raise IdempotencyConflict()
        return Response(
            {
                "reference": existing.lead.reference,
                "message": "This enquiry has already been received.",
                "duplicate": True,
            },
            status=status.HTTP_200_OK,
        )

    return Response(
        {
            "reference": lead.reference,
            "message": "Thank you. Your enquiry has been received.",
            "duplicate": False,
        },
        status=status.HTTP_201_CREATED,
    )


def notify_after_commit(lead_id):
    lead = Lead.objects.get(pk=lead_id)
    send_lead_notifications(lead)
