from rest_framework.permissions import BasePermission


class LeadManagementPermission(BasePermission):
    message = "You do not have permission to manage lead records."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated or not user.is_active or not user.is_staff:
            return False

        model = view.get_queryset().model
        action = getattr(view, "action", None)
        if action == "notes":
            required = ("leads.view_lead", "leads.add_leadactivity")
        elif request.method in ("GET", "HEAD", "OPTIONS"):
            required = f"leads.view_{model._meta.model_name}"
        elif request.method in ("PUT", "PATCH"):
            required = f"leads.change_{model._meta.model_name}"
        else:
            return False

        if isinstance(required, tuple):
            return user.is_superuser or all(user.has_perm(permission) for permission in required)
        return user.is_superuser or user.has_perm(required)

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
