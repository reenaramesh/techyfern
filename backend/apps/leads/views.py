
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import (
    action,
    api_view,
    authentication_classes,
    permission_classes,
    throttle_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import Lead, LeadActivity
from .permissions import LeadManagementPermission
from .serializers import (
    AdminLeadSerializer,
    ContactSubmissionSerializer,
    LeadNoteSerializer,
    QuotationSubmissionSerializer,
)
from .services import create_public_submission, require_idempotency_key


class PublicSubmissionThrottle(AnonRateThrottle):
    scope = "anon"


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([PublicSubmissionThrottle])
def create_contact_lead(request):
    serializer = ContactSubmissionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    key = require_idempotency_key(request)
    return create_public_submission(
        scope="website/contact",
        key=key,
        serializer=serializer,
        is_quote=False,
    )


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([PublicSubmissionThrottle])
def create_quotation_request(request):
    serializer = QuotationSubmissionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    key = require_idempotency_key(request)
    return create_public_submission(
        scope="website/quotation",
        key=key,
        serializer=serializer,
        is_quote=True,
    )


class AdminLeadViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Lead.objects.select_related("assigned_to").prefetch_related(
        "activities__performed_by",
        "quotation_requests",
    )
    serializer_class = AdminLeadSerializer
    permission_classes = [LeadManagementPermission]

    def perform_update(self, serializer):
        previous = serializer.instance
        old_status = previous.status
        old_priority = previous.priority
        lead = serializer.save()
        if old_status != lead.status:
            LeadActivity.objects.create(
                lead=lead,
                action=LeadActivity.Action.STATUS_CHANGED,
                notes=f"Status changed from {old_status} to {lead.status}.",
                performed_by=self.request.user,
            )
        if old_priority != lead.priority:
            LeadActivity.objects.create(
                lead=lead,
                action=LeadActivity.Action.PRIORITY_CHANGED,
                notes=f"Priority changed from {old_priority} to {lead.priority}.",
                performed_by=self.request.user,
            )

    @action(detail=True, methods=["post"], url_path="notes")
    def notes(self, request, pk=None):
        lead = self.get_object()
        serializer = LeadNoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        activity = LeadActivity.objects.create(
            lead=lead,
            action=LeadActivity.Action.NOTE,
            notes=serializer.validated_data["note"],
            performed_by=request.user,
        )
        return Response(
            {
                "id": activity.pk,
                "action": activity.action,
                "notes": activity.notes,
                "performed_by": str(request.user),
                "timestamp": activity.timestamp,
            },
            status=status.HTTP_201_CREATED,
        )
