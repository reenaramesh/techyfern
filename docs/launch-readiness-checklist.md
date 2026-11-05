# Launch readiness checklist

Statuses describe repository evidence at the time of this report. **PASS**
means the listed check was actually demonstrated; **NOT TESTED** means no
verification was performed; **BLOCKED** means a required external decision or
service is still missing.

## Frontend ready

| Check | Status | Evidence / next action |
|---|---|---|
| React, TypeScript and Vite application | PASS | Existing application and build configuration retained. |
| Responsive visual system and approved branding | PASS | Existing design, logo and brand tokens retained. Run viewport/browser checks before release. |
| Contact phone and supplied address shown | PASS | Present in Contact and shared footer; verify phone availability and address representation. |
| Service enquiry context | PASS | Service CTAs preselect the relevant contact-form category. |
| Contact and quotation form persistence | BLOCKED | Requires a deployed Django API; GitHub Pages preview forms remain disabled. |
| Production static build and prerender | PASS | GitHub Pages preview build and all 11 generated-route tests pass with `/techyfern/` paths and noindex preserved. |

## SEO technically ready

| Check | Status | Evidence / next action |
|---|---|---|
| Unique titles, descriptions and page headings | PASS | Generated-route tests verified unique titles, descriptions within 160 characters, one H1 and prerendered route output. |
| Canonical origin and production sitemap | BLOCKED | Domain is intentionally not configured; keep indexing disabled. |
| GitHub Pages indexing protection | PASS | Preview workflow sets a dedicated preview flag; every route remains noindex and the URL is not a future canonical. Verify generated artifact on CI. |
| Structured data | PASS | Reserved-origin build verified Organization, WebSite, Service and breadcrumb data; LocalBusiness is omitted. Recheck only against the final approved origin. |
| Responsive layout and keyboard-interaction checks | PASS | 42 route/viewport checks across seven routes and 360, 390, 430, 768, 1024 and 1440px found no horizontal overflow; Contact menu Escape/focus and required-field validation were checked. |
| Full automated/assistive-technology accessibility audit | NOT TESTED | No axe or screen-reader audit was run; manual browser checks are not a substitute. |
| Core Web Vitals and third-party font/privacy review | NOT TESTED | No Lighthouse/field metrics; Manrope currently loads from Google Fonts. |
| Sitemap/crawler behavior on a production host | BLOCKED | Verify only after an approved domain and deployment. |

## Backend ready

| Check | Status | Evidence / next action |
|---|---|---|
| Django application and lead protections | PASS | Existing implementation has serializers, consent, idempotency, throttling and staff permissions. |
| Django checks, migrations and lead-app tests | PASS | Checks and migrations pass; 14 lead-app tests pass on Python 3.10.6. |
| Python 3.12+ runtime | NOT TESTED | Python 3.12+ is unavailable in this workspace; run the backend suite on the documented target runtime. |
| Production PostgreSQL, API host, HTTPS and email | BLOCKED | No production infrastructure or SMTP configuration is supplied. |
| Privacy notice and data operations | BLOCKED | Approve hosting location, data retention/deletion, backups, access roles and legal/privacy wording. |

## Promotion ready

| Check | Status | Evidence / next action |
|---|---|---|
| Campaign landing pages and page-level keyword ownership | PASS | Five current service pages have distinct intent; keyword volume/competition remain unverified. |
| Search, Meta, analytics and tag accounts | BLOCKED | No campaigns, budgets, verified account configuration, GA4 ID or GTM container supplied. |
| Analytics consent and privacy review | BLOCKED | No consent-management implementation or owner/legal decision verified. Do not activate analytics or advertising tags until approved. |
| Alternative contact route while forms are disabled | BLOCKED | The provided number is displayed; confirm it is reachable and monitored before promoting. Do not add WhatsApp until its account is verified. |
| Google Business Profile consistency | NOT TESTED | No owner-controlled profile was available to compare. |

## Public launch approval

**BLOCKED.** The current brief explicitly keeps the custom domain and indexing
disabled. A successful local build does not deploy the site or provision an
API. Revisit this checklist after the owner confirms the domain, public
content, contact method, privacy operations, backend hosting and indexing
approval. Do not submit the GitHub Pages URL to Google Search Console or
Google Business Profile.
