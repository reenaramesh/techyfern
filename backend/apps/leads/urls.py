from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.dashboard.views import AdminDashboardView

from .views import (
    AdminLeadViewSet,
    create_contact_lead,
    create_quotation_request,
)

router = DefaultRouter()
router.register("admin/leads", AdminLeadViewSet, basename="admin-lead")

urlpatterns = [
    path("leads/", create_contact_lead, name="public-leads"),
    path("quotations/requests/", create_quotation_request, name="public-quotation-request"),
    path("admin/dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path("", include(router.urls)),
]
