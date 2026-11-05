export const siteContact = {
  phoneDisplay: "9986752890",
  phoneHref: "tel:+919986752890",
  address:
    "12th Cross, Annasandrapalya, Vinayaka Nagar, HAL, Bengaluru 560017, India",
};

export const serviceOptions = [
  { value: "website_design", label: "Website Design & Development" },
  { value: "digital_marketing", label: "Digital Marketing & SEO" },
  { value: "business_technology", label: "Business Technology Solutions" },
  { value: "web_application", label: "Web Application Development" },
  { value: "ai_automation", label: "AI & Business Automation" },
  { value: "other", label: "Not sure / another service" },
] as const;

export type ServiceCategory = (typeof serviceOptions)[number]["value"];

export function isServiceCategory(
  value: string | null,
): value is ServiceCategory {
  return serviceOptions.some((option) => option.value === value);
}

export function getServiceContactPath(category: ServiceCategory): string {
  return `/contact/?service=${encodeURIComponent(category)}`;
}
