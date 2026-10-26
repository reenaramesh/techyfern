from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Lead, LeadActivity, SERVICE_CHOICES


UTM_FIELDS = {"utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"}


class PublicSubmissionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=160, trim_whitespace=True)
    email = serializers.EmailField(max_length=254)
    phone = serializers.CharField(max_length=40, allow_blank=True, required=False)
    business = serializers.CharField(
        max_length=180,
        allow_blank=True,
        required=False,
    )
    utm = serializers.DictField(
        child=serializers.CharField(max_length=200, allow_blank=True),
        required=False,
        default=dict,
    )
    website = serializers.CharField(max_length=200, allow_blank=True, required=False)
    privacy_consent = serializers.BooleanField()

    def validate_phone(self, value):
        value = value.strip()
        allowed = set("0123456789 +-().")
        if value and (len(value) < 7 or any(character not in allowed for character in value)):
            raise serializers.ValidationError("Enter a valid phone number.")
        return value

    def validate_utm(self, value):
        unexpected = set(value) - UTM_FIELDS
        if unexpected:
            raise serializers.ValidationError("Only supported campaign fields are accepted.")
        return {key: item.strip() for key, item in value.items()}

    def validate_privacy_consent(self, value):
        if not value:
            raise serializers.ValidationError("Privacy consent is required.")
        return value

    def validate_website(self, value):
        if value.strip():
            raise serializers.ValidationError("Unable to accept this submission.")
        return ""


class ContactSubmissionSerializer(PublicSubmissionSerializer):
    service = serializers.ChoiceField(choices=SERVICE_CHOICES)
    message = serializers.CharField(max_length=5000, trim_whitespace=True)


class QuotationSubmissionSerializer(PublicSubmissionSerializer):
    service_category = serializers.ChoiceField(choices=SERVICE_CHOICES)
    project_description = serializers.CharField(max_length=5000, trim_whitespace=True)
    budget_range = serializers.CharField(max_length=120, trim_whitespace=True)
    timeline = serializers.CharField(max_length=120, trim_whitespace=True)
    service_requirements = serializers.DictField(
        child=serializers.CharField(max_length=1500, allow_blank=True),
        required=False,
        default=dict,
    )

    def validate_service_requirements(self, value):
        if len(value) > 20:
            raise serializers.ValidationError("Too many service-specific requirement fields.")
        if any(not key or len(key) > 80 for key in value):
            raise serializers.ValidationError("Requirement labels must be 1 to 80 characters.")
        return {key: item.strip() for key, item in value.items()}


class LeadActivitySerializer(serializers.ModelSerializer):
    performed_by = serializers.StringRelatedField()

    class Meta:
        model = LeadActivity
        fields = ("id", "action", "notes", "performed_by", "timestamp")


class AdminLeadSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.filter(is_active=True, is_staff=True),
        allow_null=True,
        required=False,
    )
    assigned_to_label = serializers.StringRelatedField(source="assigned_to", read_only=True)
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    priority_label = serializers.CharField(source="get_priority_display", read_only=True)
    activities = LeadActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Lead
        fields = (
            "id",
            "reference",
            "name",
            "email",
            "phone",
            "business",
            "service",
            "requirements",
            "source",
            "utm",
            "status",
            "status_label",
            "priority",
            "priority_label",
            "assigned_to",
            "assigned_to_label",
            "created_at",
            "updated_at",
            "activities",
        )
        read_only_fields = (
            "id",
            "reference",
            "created_at",
            "updated_at",
            "activities",
        )


class LeadNoteSerializer(serializers.Serializer):
    note = serializers.CharField(max_length=3000, trim_whitespace=True)
