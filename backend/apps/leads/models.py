import uuid

from django.conf import settings
from django.db import models


SERVICE_CHOICES = (
    ("website_design", "Website Design & Development"),
    ("digital_marketing", "Digital Marketing & SEO"),
    ("business_technology", "Business Technology Solutions"),
    ("web_application", "Web Application Development"),
    ("ai_automation", "AI & Business Automation"),
    ("other", "Other"),
)


class Lead(models.Model):
    class Status(models.TextChoices):
        NEW = "NEW", "New"
        CONTACTED = "CONTACTED", "Contacted"
        QUALIFIED = "QUALIFIED", "Qualified"
        PROPOSAL_SENT = "PROPOSAL_SENT", "Proposal sent"
        WON = "WON", "Won"
        LOST = "LOST", "Lost"
        ON_HOLD = "ON_HOLD", "On hold"
        SPAM = "SPAM", "Spam"

    class Priority(models.TextChoices):
        LOW = "LOW", "Low"
        NORMAL = "NORMAL", "Normal"
        HIGH = "HIGH", "High"
        URGENT = "URGENT", "Urgent"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference = models.CharField(max_length=18, unique=True, editable=False)
    name = models.CharField(max_length=160)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=40, blank=True)
    business = models.CharField(max_length=180, blank=True)
    service = models.CharField(max_length=40, choices=SERVICE_CHOICES)
    requirements = models.TextField()
    source = models.CharField(max_length=120, default="website/contact")
    utm = models.JSONField(default=dict, blank=True)
    privacy_consent_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True,
    )
    priority = models.CharField(
        max_length=10,
        choices=Priority.choices,
        default=Priority.NORMAL,
        db_index=True,
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="assigned_leads",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        permissions = [("export_lead", "Can export leads as CSV")]
        indexes = [
            models.Index(fields=("status", "-created_at"), name="leads_status_created_idx"),
            models.Index(fields=("service", "-created_at"), name="leads_service_created_idx"),
        ]

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = f"TF-{self.pk.hex[:12].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference} — {self.name}"


class LeadActivity(models.Model):
    class Action(models.TextChoices):
        CREATED = "CREATED", "Lead created"
        NOTE = "NOTE", "Note added"
        STATUS_CHANGED = "STATUS_CHANGED", "Status changed"
        PRIORITY_CHANGED = "PRIORITY_CHANGED", "Priority changed"
        UPDATED = "UPDATED", "Lead updated"

    id = models.BigAutoField(primary_key=True)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="activities")
    action = models.CharField(max_length=24, choices=Action.choices, default=Action.NOTE)
    notes = models.TextField(blank=True)
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="lead_activities",
        null=True,
        blank=True,
    )
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-timestamp",)
        indexes = [models.Index(fields=("lead", "-timestamp"), name="activity_lead_time_idx")]

    def __str__(self):
        return f"{self.get_action_display()} — {self.lead.reference}"


class QuotationRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        related_name="quotation_requests",
    )
    project_category = models.CharField(max_length=80)
    project_requirements = models.TextField()
    service_requirements = models.JSONField(default=dict, blank=True)
    budget_range = models.CharField(max_length=120)
    expected_timeline = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=("project_category", "-created_at"), name="quote_category_created_idx"),
        ]

    def __str__(self):
        return f"Quotation request — {self.lead.reference}"


class IdempotencyRecord(models.Model):
    scope = models.CharField(max_length=32)
    key = models.CharField(max_length=128)
    fingerprint = models.CharField(max_length=64)
    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        related_name="idempotency_records",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=("scope", "key"),
                name="unique_submission_idempotency_key",
            ),
        ]
        indexes = [models.Index(fields=("created_at",), name="idempotency_created_idx")]

    def __str__(self):
        return f"{self.scope} submission key"
