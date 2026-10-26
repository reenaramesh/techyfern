import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  getApiErrorMessage,
  leadSubmissionsEnabled,
  submitLeadRequest,
} from "../lib/leadApi";
import { trackAnalyticsEvent } from "../lib/analytics";

const serviceOptions = [
  { value: "website_design", label: "Website Design & Development" },
  { value: "digital_marketing", label: "Digital Marketing & SEO" },
  { value: "business_technology", label: "Business Technology Solutions" },
  { value: "web_application", label: "Web Application Development" },
  { value: "ai_automation", label: "AI & Business Automation" },
  { value: "other", label: "Other" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(160),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => !value || /^[0-9+ ().-]{7,40}$/.test(value), {
      message: "Enter a valid phone number.",
    }),
  business: z.string().trim().max(180),
  service: z.enum([
    "website_design",
    "digital_marketing",
    "business_technology",
    "web_application",
    "ai_automation",
    "other",
  ]),
  message: z.string().trim().min(10, "Add a little more detail.").max(5000),
  website: z.string().max(200).optional(),
  privacy_consent: z.boolean().refine((value) => value, {
    message: "Consent is required before we can respond to this enquiry.",
  }),
});

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(160),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => !value || /^[0-9+ ().-]{7,40}$/.test(value), {
      message: "Enter a valid phone number.",
    }),
  business: z.string().trim().max(180),
  service_category: z.enum([
    "website_design",
    "digital_marketing",
    "business_technology",
    "web_application",
    "ai_automation",
    "other",
  ]),
  project_description: z
    .string()
    .trim()
    .min(10, "Describe the project in a little more detail.")
    .max(5000),
  budget_range: z.string().trim().min(2, "Share a budget range or enter “not sure yet”.").max(120),
  timeline: z.string().trim().min(2, "Share an expected timeline or enter “not sure yet”.").max(120),
  service_requirements: z.string().trim().max(1500),
  website: z.string().max(200).optional(),
  privacy_consent: z.boolean().refine((value) => value, {
    message: "Consent is required before we can respond to this request.",
  }),
});

type ContactValues = z.infer<typeof contactSchema>;
type QuoteValues = z.infer<typeof quoteSchema>;
type SubmissionState =
  | { kind: "idle" }
  | { kind: "success"; reference: string; duplicate: boolean }
  | { kind: "error"; message: string };

function newIdempotencyKey() {
  if (!globalThis.crypto?.randomUUID) {
    throw new Error("Secure request keys are unavailable in this browser.");
  }
  return globalThis.crypto.randomUUID();
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span className="lead-field-error" id={id} role="alert">
      {message}
    </span>
  ) : null;
}

function PrivacyConsent({
  field,
  error,
}: {
  field: UseFormRegisterReturn<"privacy_consent">;
  error?: string;
}) {
  return (
    <div className="lead-consent">
      <label>
        <input
          {...field}
          aria-describedby={error ? "privacy_consent-error" : undefined}
          aria-invalid={Boolean(error)}
          type="checkbox"
        />
        <span>
          I agree that Techyfern Digital may use the information I provide to
          review and respond to this request. Read the{" "}
          <Link to="/privacy/">privacy notice</Link>.
        </span>
      </label>
      <ErrorMessage id="privacy_consent-error" message={error} />
    </div>
  );
}

function Honeypot({ field }: { field: UseFormRegisterReturn<"website"> }) {
  return (
    <div aria-hidden="true" className="lead-honeypot">
      <label>
        Leave this field empty
        <input
          {...field}
          autoComplete="off"
          tabIndex={-1}
          type="text"
        />
      </label>
    </div>
  );
}

export function ContactLeadForm() {
  const [requestKey, setRequestKey] = useState<string | null>(null);
  const [submission, setSubmission] = useState<SubmissionState>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business: "",
      service: "website_design",
      message: "",
      privacy_consent: false,
      website: "",
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmission({ kind: "idle" });
    if (!leadSubmissionsEnabled) {
      setSubmission({
        kind: "error",
        message: "Enquiry submissions are disabled on this preview.",
      });
      return;
    }
    try {
      const key = requestKey ?? newIdempotencyKey();
      setRequestKey(key);
      const result = await submitLeadRequest("leads/", values, key);
      if (!result.ok) {
        if (result.status === 409) setRequestKey(newIdempotencyKey());
        for (const field of ["name", "email", "phone", "business", "service", "message", "privacy_consent"] as const) {
          const value = result.errors[field];
          if (!value) continue;
          setError(field, {
            type: "server",
            message: Array.isArray(value) ? String(value[0]) : String(value),
          });
        }
        setSubmission({
          kind: "error",
          message: getApiErrorMessage(result.errors),
        });
        return;
      }
      const reference = result.data.reference ?? "received";
      setSubmission({
        kind: "success",
        reference,
        duplicate: Boolean(result.data.duplicate),
      });
      trackAnalyticsEvent("generate_lead", { service_category: values.service });
      reset();
      setRequestKey(null);
    } catch (error) {
      setSubmission({
        kind: "error",
        message:
          error instanceof Error && error.message.includes("Secure request keys")
            ? error.message
            : "We could not reach the enquiry service. Your details have not been confirmed as received; please try again.",
      });
    }
  });

  if (submission.kind === "success") {
    return (
      <div aria-live="polite" className="lead-success" role="status">
        <span className="lead-success-mark" aria-hidden="true">✓</span>
        <h2>{submission.duplicate ? "Your enquiry is already with us." : "Thank you for getting in touch."}</h2>
        <p>
          {submission.duplicate
            ? "We found your earlier submission and have not created a duplicate."
            : "Your enquiry has been received."}
        </p>
        <p className="lead-reference">Reference: <strong>{submission.reference}</strong></p>
        <button className="lead-submit-button" onClick={() => setSubmission({ kind: "idle" })} type="button">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" noValidate onSubmit={submit}>
      {!leadSubmissionsEnabled && (
        <p className="lead-form-alert" role="note">
          Preview only: submissions are disabled. Do not enter personal or
          customer information.
        </p>
      )}
      {submission.kind === "error" && (
        <p aria-live="assertive" className="lead-form-alert" role="alert">
          {submission.message}
        </p>
      )}
      <div className="lead-form-grid">
        <label className="lead-field">
          <span>Full name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" {...register("name")} aria-describedby={errors.name ? "contact-name-error" : undefined} aria-invalid={Boolean(errors.name)} />
          <ErrorMessage id="contact-name-error" message={errors.name?.message} />
        </label>
        <label className="lead-field">
          <span>Email <b aria-hidden="true">*</b></span>
          <input autoComplete="email" type="email" {...register("email")} aria-describedby={errors.email ? "contact-email-error" : undefined} aria-invalid={Boolean(errors.email)} />
          <ErrorMessage id="contact-email-error" message={errors.email?.message} />
        </label>
        <label className="lead-field">
          <span>Phone</span>
          <input autoComplete="tel" type="tel" {...register("phone")} aria-describedby={errors.phone ? "contact-phone-error" : undefined} aria-invalid={Boolean(errors.phone)} />
          <ErrorMessage id="contact-phone-error" message={errors.phone?.message} />
        </label>
        <label className="lead-field">
          <span>Business name</span>
          <input autoComplete="organization" {...register("business")} aria-describedby={errors.business ? "contact-business-error" : undefined} aria-invalid={Boolean(errors.business)} />
          <ErrorMessage id="contact-business-error" message={errors.business?.message} />
        </label>
        <label className="lead-field lead-field-full">
          <span>Service you are interested in <b aria-hidden="true">*</b></span>
          <select {...register("service")} aria-describedby={errors.service ? "contact-service-error" : undefined} aria-invalid={Boolean(errors.service)}>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
          <ErrorMessage id="contact-service-error" message={errors.service?.message} />
        </label>
        <label className="lead-field lead-field-full">
          <span>How can we help? <b aria-hidden="true">*</b></span>
          <textarea rows={5} {...register("message")} aria-describedby={errors.message ? "contact-message-error" : undefined} aria-invalid={Boolean(errors.message)} />
          <ErrorMessage id="contact-message-error" message={errors.message?.message} />
        </label>
      </div>
      <PrivacyConsent field={register("privacy_consent")} error={errors.privacy_consent?.message} />
      <Honeypot field={register("website")} />
      <button
        className="lead-submit-button"
        disabled={isSubmitting || !leadSubmissionsEnabled}
        type="submit"
      >
        {!leadSubmissionsEnabled
          ? "Submissions disabled in preview"
          : isSubmitting
            ? "Sending enquiry…"
            : "Send enquiry"}
      </button>
      <p className="lead-required-note">Fields marked * are required.</p>
    </form>
  );
}

export function QuotationRequestForm() {
  const [requestKey, setRequestKey] = useState<string | null>(null);
  const [submission, setSubmission] = useState<SubmissionState>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business: "",
      service_category: "website_design",
      project_description: "",
      budget_range: "",
      timeline: "",
      service_requirements: "",
      privacy_consent: false,
      website: "",
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmission({ kind: "idle" });
    if (!leadSubmissionsEnabled) {
      setSubmission({
        kind: "error",
        message: "Consultation submissions are disabled on this preview.",
      });
      return;
    }
    try {
      const key = requestKey ?? newIdempotencyKey();
      setRequestKey(key);
      const { service_requirements, ...quote } = values;
      const result = await submitLeadRequest(
        "quotations/requests/",
        {
          ...quote,
          service_requirements: service_requirements
            ? { additional_requirements: service_requirements }
            : {},
        },
        key,
      );
      if (!result.ok) {
        if (result.status === 409) setRequestKey(newIdempotencyKey());
        for (const field of ["name", "email", "phone", "business", "service_category", "project_description", "budget_range", "timeline", "privacy_consent"] as const) {
          const value = result.errors[field];
          if (!value) continue;
          setError(field, {
            type: "server",
            message: Array.isArray(value) ? String(value[0]) : String(value),
          });
        }
        setSubmission({
          kind: "error",
          message: getApiErrorMessage(result.errors),
        });
        return;
      }
      setSubmission({
        kind: "success",
        reference: result.data.reference ?? "received",
        duplicate: Boolean(result.data.duplicate),
      });
      trackAnalyticsEvent("quote_request_submit", {
        service_category: values.service_category,
      });
      reset();
      setRequestKey(null);
    } catch (error) {
      setSubmission({
        kind: "error",
        message:
          error instanceof Error && error.message.includes("Secure request keys")
            ? error.message
            : "We could not reach the quotation service. Your request has not been confirmed as received; please try again.",
      });
    }
  });

  if (submission.kind === "success") {
    return (
      <div aria-live="polite" className="lead-success" role="status">
        <span className="lead-success-mark" aria-hidden="true">✓</span>
        <h2>{submission.duplicate ? "Your request is already with us." : "Your quotation request has been received."}</h2>
        <p>We will review the information provided. No pricing or delivery timeline is promised by this submission.</p>
        <p className="lead-reference">Reference: <strong>{submission.reference}</strong></p>
        <button className="lead-submit-button" onClick={() => setSubmission({ kind: "idle" })} type="button">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" noValidate onSubmit={submit}>
      {!leadSubmissionsEnabled && (
        <p className="lead-form-alert" role="note">
          Preview only: submissions are disabled. Do not enter personal or
          customer information.
        </p>
      )}
      {submission.kind === "error" && (
        <p aria-live="assertive" className="lead-form-alert" role="alert">
          {submission.message}
        </p>
      )}
      <div className="lead-form-grid">
        <label className="lead-field">
          <span>Full name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" {...register("name")} aria-describedby={errors.name ? "quote-name-error" : undefined} aria-invalid={Boolean(errors.name)} />
          <ErrorMessage id="quote-name-error" message={errors.name?.message} />
        </label>
        <label className="lead-field">
          <span>Email <b aria-hidden="true">*</b></span>
          <input autoComplete="email" type="email" {...register("email")} aria-describedby={errors.email ? "quote-email-error" : undefined} aria-invalid={Boolean(errors.email)} />
          <ErrorMessage id="quote-email-error" message={errors.email?.message} />
        </label>
        <label className="lead-field">
          <span>Phone</span>
          <input autoComplete="tel" type="tel" {...register("phone")} aria-describedby={errors.phone ? "quote-phone-error" : undefined} aria-invalid={Boolean(errors.phone)} />
          <ErrorMessage id="quote-phone-error" message={errors.phone?.message} />
        </label>
        <label className="lead-field">
          <span>Business name</span>
          <input autoComplete="organization" {...register("business")} aria-describedby={errors.business ? "quote-business-error" : undefined} aria-invalid={Boolean(errors.business)} />
          <ErrorMessage id="quote-business-error" message={errors.business?.message} />
        </label>
        <label className="lead-field lead-field-full">
          <span>Service category <b aria-hidden="true">*</b></span>
          <select {...register("service_category")} aria-describedby={errors.service_category ? "quote-service-category-error" : undefined} aria-invalid={Boolean(errors.service_category)}>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
          <ErrorMessage id="quote-service-category-error" message={errors.service_category?.message} />
        </label>
        <label className="lead-field lead-field-full">
          <span>Project description <b aria-hidden="true">*</b></span>
          <textarea rows={5} {...register("project_description")} aria-describedby={errors.project_description ? "quote-project-description-error" : undefined} aria-invalid={Boolean(errors.project_description)} />
          <ErrorMessage id="quote-project-description-error" message={errors.project_description?.message} />
        </label>
        <label className="lead-field">
          <span>Budget range <b aria-hidden="true">*</b></span>
          <input placeholder="A range, or “not sure yet”" {...register("budget_range")} aria-describedby={errors.budget_range ? "quote-budget-range-error" : undefined} aria-invalid={Boolean(errors.budget_range)} />
          <ErrorMessage id="quote-budget-range-error" message={errors.budget_range?.message} />
        </label>
        <label className="lead-field">
          <span>Expected timeline <b aria-hidden="true">*</b></span>
          <input placeholder="For example, a target month or “not sure yet”" {...register("timeline")} aria-describedby={errors.timeline ? "quote-timeline-error" : undefined} aria-invalid={Boolean(errors.timeline)} />
          <ErrorMessage id="quote-timeline-error" message={errors.timeline?.message} />
        </label>
        <label className="lead-field lead-field-full">
          <span>Service-specific requirements</span>
          <textarea
            placeholder="Share relevant workflows, pages, integrations, tools or requirements."
            rows={4}
            {...register("service_requirements")}
            aria-describedby={errors.service_requirements ? "quote-service-requirements-error" : undefined}
            aria-invalid={Boolean(errors.service_requirements)}
          />
          <ErrorMessage id="quote-service-requirements-error" message={errors.service_requirements?.message} />
        </label>
      </div>
      <PrivacyConsent field={register("privacy_consent")} error={errors.privacy_consent?.message} />
      <Honeypot field={register("website")} />
      <button
        className="lead-submit-button"
        disabled={isSubmitting || !leadSubmissionsEnabled}
        type="submit"
      >
        {!leadSubmissionsEnabled
          ? "Submissions disabled in preview"
          : isSubmitting
            ? "Sending request…"
            : "Request a consultation"}
      </button>
      <p className="lead-required-note">Fields marked * are required. This request is not a binding quote.</p>
    </form>
  );
}
