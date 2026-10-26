from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.leads.models import Lead
from apps.leads.permissions import LeadManagementPermission
from apps.leads.serializers import AdminLeadSerializer


class AdminDashboardView(APIView):
    permission_classes = [LeadManagementPermission]
    queryset = Lead.objects.all()

    def get_queryset(self):
        return self.queryset

    def get(self, request):
        leads = Lead.objects.all()
        counts = {
            row["status"]: row["count"]
            for row in leads.values("status").annotate(count=Count("id"))
        }
        recent = leads.order_by("-created_at")[:10]
        serializer = AdminLeadSerializer(recent, many=True, context={"request": request})
        return Response(
            {
                "total": leads.count(),
                "by_status": counts,
                "high_priority": leads.filter(
                    priority__in=(Lead.Priority.HIGH, Lead.Priority.URGENT),
                ).count(),
                "recent": serializer.data,
            }
        )
