import csv

from django.contrib import admin
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.utils import timezone

from .models import Lead, LeadActivity, QuotationRequest


class LeadActivityInline(admin.TabularInline):
    model = LeadActivity
    extra = 0
    can_delete = False
    fields = ("action", "notes", "performed_by", "timestamp")
    readonly_fields = ("action", "performed_by", "timestamp")

    def has_add_permission(self, request, obj=None):
        return request.user.has_perm("leads.add_leadactivity")

    def has_change_permission(self, request, obj=None):
        return False


class QuotationRequestInline(admin.TabularInline):
    model = QuotationRequest
    extra = 0
    can_delete = False
    fields = (
        "project_category",
        "project_requirements",
        "service_requirements",
        "budget_range",
        "expected_timeline",
        "created_at",
    )
    readonly_fields = fields

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "reference",
        "name",
        "email",
        "get_service_display",
        "status",
        "priority",
        "assigned_to",
        "created_at",
    )
    list_filter = ("status", "priority", "service", "created_at")
    search_fields = ("reference", "name", "email", "business", "requirements")
    readonly_fields = ("id", "reference", "source", "utm", "created_at", "updated_at", "privacy_consent_at")
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    list_per_page = 50
    inlines = (QuotationRequestInline, LeadActivityInline)
    actions = ("export_leads_csv",)

    fieldsets = (
        ("Contact", {"fields": ("name", "email", "phone", "business", "privacy_consent_at")}),
        ("Enquiry", {"fields": ("service", "requirements", "source", "utm")}),
        ("CRM", {"fields": ("status", "priority", "assigned_to")}),
        ("Record", {"fields": ("id", "reference", "created_at", "updated_at")}),
    )

    def save_model(self, request, obj, form, change):
        old_status = None
        old_priority = None
        if change:
            previous = Lead.objects.only("status", "priority").get(pk=obj.pk)
            old_status = previous.status
            old_priority = previous.priority
        super().save_model(request, obj, form, change)
        if old_status is not None and old_status != obj.status:
            LeadActivity.objects.create(
                lead=obj,
                action=LeadActivity.Action.STATUS_CHANGED,
                notes=f"Status changed from {old_status} to {obj.status}.",
                performed_by=request.user,
            )
        if old_priority is not None and old_priority != obj.priority:
            LeadActivity.objects.create(
                lead=obj,
                action=LeadActivity.Action.PRIORITY_CHANGED,
                notes=f"Priority changed from {old_priority} to {obj.priority}.",
                performed_by=request.user,
            )

    def save_formset(self, request, form, formset, change):
        if formset.model is not LeadActivity:
            return super().save_formset(request, form, formset, change)
        instances = formset.save(commit=False)
        for instance in instances:
            if instance._state.adding:
                instance.action = LeadActivity.Action.NOTE
                instance.performed_by = request.user
            instance.save()
        formset.save_m2m()

    def has_export_permission(self, request):
        return request.user.has_perm("leads.export_lead")

    @admin.action(description="Export selected leads as CSV", permissions=("export",))
    def export_leads_csv(self, request, queryset):
        if not self.has_export_permission(request):
            raise PermissionDenied
        response = HttpResponse(content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = (
            f'attachment; filename="techyfern-leads-{timezone.localdate().isoformat()}.csv"'
        )
        writer = csv.writer(response)
        writer.writerow(
            (
                "Reference",
                "Name",
                "Email",
                "Phone",
                "Business",
                "Service",
                "Requirements",
                "Status",
                "Priority",
                "Source",
                "Created",
            )
        )
        for lead in queryset.select_related("assigned_to").iterator():
            writer.writerow(
                (
                    lead.reference,
                    _safe_csv_cell(lead.name),
                    _safe_csv_cell(lead.email),
                    _safe_csv_cell(lead.phone),
                    _safe_csv_cell(lead.business),
                    lead.get_service_display(),
                    _safe_csv_cell(lead.requirements),
                    lead.get_status_display(),
                    lead.get_priority_display(),
                    _safe_csv_cell(lead.source),
                    lead.created_at.isoformat(),
                )
            )
        return response


@admin.register(LeadActivity)
class LeadActivityAdmin(admin.ModelAdmin):
    list_display = ("lead", "action", "performed_by", "timestamp")
    list_filter = ("action", "timestamp")
    search_fields = ("lead__reference", "lead__name", "notes")
    readonly_fields = ("lead", "action", "notes", "performed_by", "timestamp")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(QuotationRequest)
class QuotationRequestAdmin(admin.ModelAdmin):
    list_display = ("lead", "project_category", "budget_range", "expected_timeline", "created_at")
    list_filter = ("project_category", "created_at")
    search_fields = ("lead__reference", "lead__name", "lead__email", "project_requirements")
    readonly_fields = (
        "lead",
        "project_category",
        "project_requirements",
        "service_requirements",
        "budget_range",
        "expected_timeline",
        "created_at",
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


def _safe_csv_cell(value):
    text = str(value or "")
    if text.lstrip().startswith(("=", "+", "-", "@")):
        return f"'{text}"
    return text
