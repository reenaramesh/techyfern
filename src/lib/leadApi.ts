const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";
export const leadSubmissionsEnabled =
  import.meta.env.VITE_GITHUB_PAGES_PREVIEW !== "true";
const utmNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UTMFields = Partial<Record<(typeof utmNames)[number], string>>;
export type LeadResponse = {
  reference?: string;
  message?: string;
  duplicate?: boolean;
};

export type LeadApiResult =
  | { ok: true; data: LeadResponse }
  | { ok: false; status: number; errors: Record<string, unknown> };

export function getUtmFields(): UTMFields {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    utmNames.flatMap((name) => {
      const value = params.get(name)?.trim().slice(0, 200);
      return value ? [[name, value]] : [];
    }),
  );
}

export async function submitLeadRequest(
  endpoint: "leads/" | "quotations/requests/",
  payload: Record<string, unknown>,
  idempotencyKey: string,
): Promise<LeadApiResult> {
  const response = await fetch(`${apiBaseUrl}/api/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      ...payload,
      utm: getUtmFields(),
    }),
  });
  const body: unknown = await response.json().catch(() => undefined);
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      errors:
        body && typeof body === "object"
          ? (body as Record<string, unknown>)
          : { detail: `The server returned an unreadable response (HTTP ${response.status}).` },
    };
  }
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      status: response.status,
      errors: { detail: `The server returned an unreadable response (HTTP ${response.status}).` },
    };
  }
  return { ok: true, data: body as LeadResponse };
}

export function getApiErrorMessage(errors: Record<string, unknown>): string {
  const detail = errors.detail;
  if (typeof detail === "string") return detail;
  const messages = Object.entries(errors).flatMap(([field, value]) => {
    const items = Array.isArray(value) ? value : [value];
    return items
      .filter((item): item is string => typeof item === "string")
      .map((message) => `${field}: ${message}`);
  });
  return messages.length
    ? messages.join(" ")
    : "The server could not accept the request. Please review the form and try again.";
}
