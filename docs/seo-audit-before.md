# SEO and content audit — before implementation

## Scope and evidence

This audit records the site state before the SEO content, structured-data and
conversion-path changes in `seo-implementation-report.md`. It reviewed the
React routes and page components, page and service content data, shared
navigation and forms, metadata/prerender code, public assets, route tests,
GitHub Pages workflow and Django deployment notes.

No keyword-volume provider, Google Search Console property, Google Business
Profile, production host, analytics account or live Django service was
available for this review. Search volumes, competition, rankings, live
delivery, real-world Core Web Vitals and production HTTP behavior were not
verified.

## Page-by-page findings

| Page | Before findings |
|---|---|
| Home `/` | A clear multi-service proposition, service links, process, concept-work disclosure and enquiry CTA were present. The title and H1 were broad and did not identify Bangalore/Bengaluru or the primary services in search results. |
| About `/about/` | Described the business purpose, working principles and suitable business contexts without fabricated client claims. Its title and copy did not establish the Bengaluru location. |
| Services `/services/` | Organized the five existing service routes into core and specialist groups. The unique metadata and service links were present, but the title and introduction were generic and not location-relevant. |
| Website design `/website-design/` | Already described WordPress, React, business/corporate sites, stores, landing pages, responsive design, redesign, quality checks, a process and FAQs. The H1 and title were generic; the content did not distinguish design from development explicitly or target Bangalore intent. |
| Digital marketing `/digital-marketing/` | Already covered organic versus paid work, SEO, local SEO, Google Business Profile, Google and social campaigns, measurement, reporting, workflow and FAQs without promising results. Local support for Bengaluru businesses and the technical/on-page/content/measurement scope were not explained as distinct items. |
| Web applications `/web-app-development/` | Already described SaaS, portals, booking, dashboards, APIs, roles, product scope, delivery and FAQs. The title, H1 and introduction lacked local relevance; security, data access, integration and support considerations were present but could be made easier to scan. |
| Business technology `/business-tech-solutions/` | Already covered CRM, ERP-style systems, billing, attendance, inventory, quotations, vendors, customers, dashboards and automation, with practical business-context examples. The page lacked location relevance in its title and opening copy. It appropriately did not claim a ready-made product. |
| AI and automation `/ai-automation/` | Already described AI integration, customer support, lead and document workflows, reporting, human review and safeguards. Its title and opening copy lacked Bengaluru relevance. |
| Portfolio `/portfolio/` and project details | The portfolio clearly separated illustrative concepts from approved case studies, disclosed fictional sample material, and marked concepts noindex. There were no approved case studies. Search/filter behavior existed; concepts are not evidence of client delivery. |
| Our process `/our-process/` | Explained discovery, scope, design/development, review and release steps. It was informational rather than a distinct commercial search landing page. |
| Contact `/contact/` | The contact form had client/server validation, consent, honeypot, rate limiting/idempotency support and a privacy link. The user-supplied phone and address had been added to the page and footer. The service selection defaulted to website design even for visitors arriving from other service pages; no verified WhatsApp account was available. |
| Request a quote `/request-quote/` | The consultation form had explicit required fields and was noindex. Submission depends on the separately deployed Django service; the GitHub Pages workflow disables submissions. |
| Privacy `/privacy/` | A preliminary operational notice explained the current forms and data flow but identified unconfirmed hosting, retention and deletion details. It was correctly marked noindex and requires privacy-owner/legal review before production collection. |
| Not found `/404.html` | A static not-found page and noindex metadata were generated. Host-specific HTTP status behavior still requires deployment verification. |

## Technical and conversion audit

| Area | Finding before implementation |
|---|---|
| Titles and descriptions | Public routes had unique definitions and prerendered metadata. The home and service metadata did not focus their distinct local commercial intent. |
| Headings and content | Known pages were designed around one H1, semantic sections, service FAQs and internal links. The home hero and service H1s were broad rather than query-specific. |
| Canonical URLs and sitemap | Canonicals and sitemap generation were intentionally disabled without an approved origin and explicit indexing opt-in. The temporary GitHub Pages build must remain noindex and must not use the GitHub URL as a future production canonical. |
| Robots and indexing | The default production robots policy disallowed crawling and pages were noindex. The Pages workflow overrides robots to allow crawlers to read the page-level noindex directives; this does not enable indexing. |
| Prerendering and routing | Vite prerendered route folders and a static 404; legacy service paths had redirects for the Hostinger configuration. The Pages subpath build and its output need to be tested separately from the root-path local build. |
| Structured data | No JSON-LD was present. A LocalBusiness claim would be inappropriate without verification of a customer-facing location. Organization, WebSite, Service and breadcrumb data can be emitted only when an approved production origin is configured. |
| Images and accessibility | Supplied responsive WebP editorial images include descriptive alt text, dimensions, sizes and lazy/eager loading. Shared React navigation, semantic landmarks, focus styles and reduced-motion behavior were already present. Automated accessibility and current responsive checks were not run for this audit. |
| Performance and privacy | Manrope is fetched from Google Fonts. No Lighthouse, field Core Web Vitals or third-party network audit was available. A GA4 ID was unset, but the existing client code could load GA4 when an ID was provided without a consent-management implementation. |
| Lead measurement | `generate_lead` was recorded after a confirmed successful contact-form response and did not include direct identifiers. Phone clicks and quotation-form starts were not measured. No GA4/GTM ID or advertising pixel was configured. |
| Lead pathways | Service CTAs went to the valid general contact route, but did not carry the originating service into the form. A WhatsApp CTA was intentionally absent because a verified WhatsApp destination had not been provided. |
| Backend | Django endpoints, validation, throttling and permission-controlled lead administration are documented. The API, PostgreSQL, SMTP, production origin, backups and Python 3.12+ deployment were not live or verified from this workspace. |
| Internal links and assets | Route definitions, legacy aliases and common service links were present. No exhaustive automated crawl for every rendered anchor or remote asset was performed before implementation. |

## Main opportunities taken forward

1. Make the homepage communicate its service scope and Bangalore/Bengaluru
   relevance in the title, H1 and introduction.
2. Give each existing service page a distinct search-intent title and
   location-aware opening without making duplicate neighborhood pages.
3. Make service CTAs preselect the relevant enquiry category.
4. Add only factual, production-origin-gated structured data; do not imply a
   walk-in office or publish LocalBusiness markup.
5. Keep the GitHub Pages preview noindex, canonical-free, sitemap-free and
   unable to send lead data.
