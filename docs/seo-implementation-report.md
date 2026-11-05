# SEO implementation report

## Summary

The existing multi-page site and five service routes were retained. Content
and metadata now make the homepage and individual service intents clearer for
the Bangalore/Bengaluru market. Service-page CTAs carry the service category
to the contact form. The GitHub Pages preview remains separate from
production SEO configuration and must remain noindex.

Search-volume and competition data are **UNVERIFIED**. No rankings, lead
outcomes, advertising results, customer demand, production domain or Google
Business Profile were independently measured.

## Titles and descriptions: before / after

| Page | Before title | After title | Before description | After description |
|---|---|---|---|---|
| Home | `TechyPraxis Digital \| Growing Ideas Through Technology` | `TechyPraxis Digital \| Website Design & Digital Marketing Bangalore` | TechyPraxis Digital helps businesses build, connect and grow through websites, digital marketing, business software and automation. | TechyPraxis Digital helps Bengaluru businesses with website design, web development, digital marketing, custom applications and business technology. |
| About | `About TechyPraxis Digital \| Practical Digital Solutions` | `About TechyPraxis Digital \| Bengaluru` | Learn how TechyPraxis Digital brings website design, software engineering and digital marketing together to solve practical business challenges. | Learn how Bengaluru-based TechyPraxis Digital brings website design, software engineering and marketing together around practical business needs. |
| Services | `Digital Services for Growing Businesses \| TechyPraxis Digital` | `Digital Services in Bangalore \| TechyPraxis Digital` | Explore website development, digital marketing, business software, web applications and AI automation services from TechyPraxis Digital. | Explore website design, digital marketing, custom applications, business software and automation for businesses in Bangalore and Bengaluru. |
| Website design | `Website Design & Development \| TechyPraxis Digital` | `Website Design Company in Bangalore \| TechyPraxis Digital` | Plan and build responsive business websites, corporate sites, WordPress and React websites, e-commerce stores and landing pages with TechyPraxis Digital. | Plan responsive business and corporate websites, WordPress and React builds, e-commerce pages and redesigns with TechyPraxis Digital in Bengaluru. |
| Digital marketing | `Digital Marketing & SEO Services \| TechyPraxis Digital` | `Digital Marketing Services in Bangalore \| TechyPraxis Digital` | Explore SEO, local SEO, Google Ads, social media campaigns, conversion improvement, analytics and reporting for growing businesses. | Explore SEO, local search, Google Ads, Meta campaigns, content and measurement for Bengaluru businesses with TechyPraxis Digital. |
| Web applications | `Web Application Development \| TechyPraxis Digital` | `Web Application Development Company in Bangalore \| TechyPraxis Digital` | Plan custom web applications, SaaS platforms, portals, booking systems, dashboards, API integrations and business applications with TechyPraxis Digital. | Plan custom web applications, SaaS products, portals and dashboards with React and Python Django for business workflows in Bengaluru. |
| Business technology | `Business Technology & Software Solutions \| TechyPraxis Digital` | `Business Software Solutions in Bangalore \| TechyPraxis Digital` | Explore practical CRM, business management, billing, attendance, inventory, vendor, task and reporting software solutions for growing businesses. | Explore CRM, quotations, billing, inventory, team workflows and business dashboards for Bengaluru companies with TechyPraxis Digital. |
| AI and automation | `AI & Business Automation \| TechyPraxis Digital` | `AI Automation Services in Bangalore \| TechyPraxis Digital` | Explore practical AI-assisted workflows, customer support, lead management, document processing and business automation with TechyPraxis Digital. | Explore AI integrations, document workflows and business process automation with practical human review for Bengaluru businesses. |

Page titles and descriptions are maintained in `src/lib/pages.ts` and
`src/lib/serviceContent.ts`; the shared `Seo` component and prerender step
publish them in HTML. The homepage hero uses a service-and-location H1 with a
concise description rather than repeating every keyword.

## Content and page changes

- Homepage copy states the audience, Bengaluru relevance and primary service
  scope. Existing service, process, about and concept-project links remain.
- Website design content explains design versus development and keeps the
  existing WordPress, React, responsive, e-commerce, landing-page and
  improvement coverage.
- Digital marketing distinguishes technical/on-page/local SEO, Google
  Business Profile, Search/Display and Meta Ads, content, reporting and
  Bengaluru small-business considerations. It does not promise outcomes.
- Web application content names React and Python/Django and makes roles,
  permissions, data boundaries, integrations, testing and support easier to
  scan.
- Business software and AI content uses local context without claiming
  existing products, customer results or unchecked AI capability.
- No separate general website-development page was created. Its intent
  substantially overlaps the existing website design/development page; the
  custom application page stays separate because it serves a different
  product/workflow intent.
- Service calls to action preselect the service in the contact form.
  General enquiries use “Not sure / another service” rather than being
  incorrectly attributed to website design.
- Contact and footer show the owner-supplied phone and address. The address
  is not described as a walk-in office; verify how it should be represented
  before publication. No WhatsApp URL was invented.

## Keyword ownership

The full requested keyword clusters are mapped in
[`keyword-mapping.md`](./keyword-mapping.md). Each cluster has one page owner;
website design and general website development remain together, while custom
web applications have a separate page. Volume and competition remain
**UNVERIFIED**, and no neighborhood doorway pages were added.

## Technical SEO and measurement

- Existing unique route metadata, server prerendering, direct route folders,
  legacy redirects and a static 404 remain in place.
- Canonicals and sitemap generation still require an approved origin and
  explicit indexing opt-in. The GitHub Pages workflow does not use a future
  production canonical and must keep every page noindex.
- Organization, WebSite, Service and BreadcrumbList JSON-LD is added only
  when a non-preview site origin is configured. LocalBusiness data is omitted
  because a customer-facing location has not been verified. No reviews,
  ratings, FAQ rich-result markup, SearchAction or invented social image was
  added.
- Background illustration URLs now use Vite's configured base path, including
  the `/techyfern/` Pages subpath.
- GA4 initialization is suppressed on the GitHub Pages preview. `generate_lead`
  and `quote_request_submit` fire only after API confirmation; `contact_click`
  tracks phone-link selection; `quote_request_start` fires on first focus of a
  quote form. WhatsApp click tracking is ready if a verified link is added.
  Events contain no direct form identifiers.
- No GA4 measurement ID, GTM container or advertising pixel is configured.
  Review consent and privacy requirements before activating third-party tags.

## Conversion and launch status

Service-specific form context is implemented, but public form submission
requires the deployed, secured Django API. The Pages workflow keeps forms
disabled. The phone number is available as a `tel:` link; verify it is
reachable and monitored before relying on it for promotion.

See [`launch-readiness-checklist.md`](./launch-readiness-checklist.md) for
PASS / NOT TESTED / BLOCKED status. The production domain, production
backend, database, SMTP, data-retention policy, privacy approval, analytics
consent and advertising accounts are not configured. This work does not
deploy, index, connect a custom domain or launch campaigns.

## Validation record

Validation reflects commands and browser checks run in this workspace.

| Check | Status | Result |
|---|---|---|
| `npm run typecheck` | PASS | `tsc -b --pretty false` completed successfully. |
| `npm run lint` | PASS | `eslint .` completed successfully. |
| GitHub Pages preview build | PASS | `npm run build` completed with `/techyfern/` asset paths and static prerendering. |
| `npm run test` | PASS | 11/11 generated-route tests passed, including noindex, contact details, service links and preview paths. |
| Origin-gated metadata and structured data | PASS | Reserved `https://example.invalid` build emitted canonical URLs, Organization/WebSite/Service/BreadcrumbList JSON-LD, no LocalBusiness data, and an 11-URL sitemap; this origin was test-only. |
| Django checks and migrations | PASS | `manage.py check` reported no issues; `makemigrations --check --dry-run` found no changes. |
| Django lead-app tests | PASS | 14/14 tests passed with Python 3.10.6; this does not certify Python 3.12+. |
| Browser checks | PASS | 42 route/viewport combinations across seven routes and six widths showed no horizontal overflow; Contact service selection, phone/address, Escape/focus and required-field validation were checked. |
| Python 3.12+ runtime | NOT TESTED | Python 3.12+ is unavailable in this workspace. |
| Production host, domain, canonical and public indexing | BLOCKED | No launch/domain approval; keep preview noindex. |
