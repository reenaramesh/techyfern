import logging
import smtplib

from django.conf import settings
from django.core.mail import send_mail
from django.core.mail.message import BadHeaderError

logger = logging.getLogger(__name__)


def send_lead_notifications(lead):
    recipient = settings.COMPANY_NOTIFICATION_EMAIL
    if not recipient:
        logger.warning(
            "Lead notification email is not configured (lead_id=%s).",
            lead.pk,
        )
        return False
    if not settings.DEFAULT_FROM_EMAIL:
        logger.warning(
            "Default sender email is not configured (lead_id=%s).",
            lead.pk,
        )
        return False

    subject = f"New Techyfern enquiry {lead.reference}"
    message = "\n".join(
        (
            f"Reference: {lead.reference}",
            f"Name: {lead.name}",
            f"Email: {lead.email}",
            f"Service: {lead.get_service_display()}",
            f"Business: {lead.business or 'Not provided'}",
            "",
            "Requirements:",
            lead.requirements,
        )
    )
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [recipient],
            fail_silently=False,
        )
    except (OSError, smtplib.SMTPException, BadHeaderError, ValueError):
        logger.error(
            "Company notification email failed (lead_id=%s).",
            lead.pk,
        )
        return False

    if settings.SEND_CUSTOMER_ACKNOWLEDGEMENT:
        try:
            send_mail(
                f"We received your enquiry {lead.reference}",
                (
                    f"Hello {lead.name},\n\n"
                    f"Thank you for contacting Techyfern Digital. We received "
                    f"your enquiry ({lead.reference}) and will review it.\n"
                ),
                settings.DEFAULT_FROM_EMAIL,
                [lead.email],
                fail_silently=False,
            )
        except (OSError, smtplib.SMTPException, BadHeaderError, ValueError):
            logger.error(
                "Customer acknowledgement email failed (lead_id=%s).",
                lead.pk,
            )
            return False
    return True
