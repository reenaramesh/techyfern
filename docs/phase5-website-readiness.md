# Phase 5 — Website readiness report

## Pages and routes audited

Reviewed the homepage, About, Services overview, all five detailed service
pages, Portfolio, all five concept-project details, Our Process, Contact,
Quotation Request, and Privacy Notice. Also reviewed historic service
aliases, the not-found route, shared navigation/footer, page metadata,
prerender output, Vite configuration and Django lead integration.

## UI and accessibility changes

- Made the shared header sticky, moved the skip link to the first keyboard
  stop, added active route indicators, and kept the native `details` dropdowns
  keyboard-operable. Escape now closes the desktop services disclosure or
  mobile menu and restores focus to the menu control.
- Applied the approved indigo/amber/charcoal palette and retained Manrope typography,
  original SVG illustrations and distinct service-page content.
- Split page components into route-level chunks. The server prerenderer now
  waits for lazy routes, so the generated HTML retains full page content.
- Navigation uses current-page semantics and visual state on desktop and
  mobile. Mobile navigation remains inert while closed.
- Increased the nested mobile Services link targets to at least 44 CSS pixels
  and adjusted their label size for easier touch interaction.
- Decorative SVGs remain inline and labelled/hide-from-assistive-technology
  according to their purpose. No stock images or unapproved brand assets were
  introduced.
- Automated axe/screen-reader testing is not configured; manual browser checks
  and source-level accessibility review are reported below.

## SEO results

- Known public routes retain unique titles and descriptions, one H1, semantic
  headings, internal links and prerendered main content.
- Canonical URLs and Open Graph URL metadata use the configurable
  `VITE_SITE_URL`. The page shell and default build remain `noindex, nofollow`
  with the current robots disallow policy.
- Sitemap and indexable robots policy are generated only when both an approved
  HTTPS `VITE_SITE_URL` and `VITE_ENABLE_INDEXING=true` are explicitly set.
  Sitemap generation was tested using the reserved `example.invalid` domain;
  that test output was not retained in the final build.
- Quotation, Privacy, concept-project and 404 pages remain `noindex` and are
  excluded from sitemap entries.
- The static build creates `404.html`; `.htaccess` uses it as an HTTP 404 error
  document and permanently redirects the five retired service URL patterns.
- The business-provided address and phone number are displayed on Contact and
  in the shared footer. Organization, WebSite, Service and breadcrumb JSON-LD
  are emitted only when a production origin is configured. LocalBusiness data
  is omitted because a customer-facing location has not been verified. No
  social image is fabricated.
- The live Hostinger response code and crawler behavior cannot be certified
  before deployment.

## Performance results

- Production build now emits route-level JavaScript chunks and no longer
  reports the prior single 658 KB JavaScript chunk advisory.
- The verified GitHub Pages preview build emitted the main entry chunk at
  285.86 KB (88.45 KB gzip), React runtime at 133.00 KB (43.75 KB gzip), Home
  page at 11.70 KB (3.72 KB gzip), and the form component chunk at 128.46 KB
  (37.88 KB gzip). Page chunks are downloaded as their route is visited.
- Illustrations are inline SVG/CSS; there are no photographic assets requiring
  responsive image variants or lazy loading.
- Font CSS requests Manrope with `display=swap`; the font remains externally
  hosted by Google Fonts.
- No Lighthouse run, field Core Web Vitals, LCP/CLS/INP measurement, or
  production-network font test was performed. No performance score is claimed.

## Mobile and navigation checks

The production preview was checked across 14 routes covering the homepage,
About, Services, all five service pages, Portfolio, a concept detail, Our
Process, Contact, Quotation Request and Privacy. A final responsive pass
checked the homepage, all five service pages and Contact at 360, 390, 430,
768, 1024 and 1440 CSS pixels (42 route/viewport combinations); none exceeded
the viewport width. At 390px, the mobile menu closed on Escape with focus
returned to its button. Contact also verified the service query selection,
tap-to-call link, supplied address and required-field errors. Earlier checks
confirmed one H1 and a main landmark per route, keyboard operation of the
desktop services disclosure, 44px nested Services links, and a noindex
not-found page. Hostinger-specific direct-refresh behavior and actual HTTP
status codes remain unverified until deployment.

## React and Django integration

The React contact and consultation forms continue to submit to the Django
versioned API. Requests use server-side serializer validation, required
idempotency keys, anonymous rate limiting, consent checks and the honeypot.
Admin lead records remain permission-gated; Django Admin uses staff
authentication and model permissions. SMTP/database credentials remain
backend-only. The frontend reports API failure instead of displaying a false
success state.

Both forms were submitted in a browser through the Vite development proxy to
the local Django API. The contact and quotation flows each displayed the
reference returned by Django after a successful response. The contact
submitting state was observed, and a server throttle response was surfaced as
an error rather than success. Django's 14-test suite also covers validation,
idempotency, abuse protection, permissions and notification behavior. All
temporary QA leads and their related records were removed after the checks.
CORS is allowlist-only and unnecessary for the default same-origin
deployment; session-authenticated administrative writes remain
CSRF-protected.

## Test results

| Check | Result | Notes |
|---|---|---|
| TypeScript | PASS | `npm run typecheck` |
| ESLint | PASS | `npm run lint` |
| Frontend build/prerender | PASS | GitHub Pages preview `npm run build`; routes rendered with `/techyfern/` base paths |
| Route build tests | PASS | `npm run test`; all 11 checks pass for metadata, H1, prerender, noindex, contact and service CTAs |
| Origin-gated metadata/schema and sitemap | PASS | Reserved HTTPS test origin emitted canonical URLs, Organization/WebSite/Service/BreadcrumbList JSON-LD and 11 eligible sitemap URLs; LocalBusiness omitted. Test origin was not retained. |
| Django system checks | PASS | Local development settings |
| Django migrations | PASS | `makemigrations --check --dry-run` reports no changes |
| Django tests | PASS | 14 tests, including contact/quotation, throttling, idempotency, admin permissions, CSRF and CSV export |
| Responsive route checks | PASS | 42 route/viewport combinations across seven routes and six widths; no horizontal overflow |
| Navigation and unknown route | PASS | Mobile/desktop Escape and focus behavior; unknown route has a noindex 404 page |
| Contact and quotation browser submissions | PASS | Both returned server references through the Vite proxy; temporary QA records removed |
| Form error handling | PASS | Actual throttling response displayed as an error, not a success confirmation |
| Python 3.12+ runtime | NOT TESTED | Python 3.10.6 is available; project policy/production target remains 3.12+ |
| Unit tests for React components | NOT TESTED | No component test runner or unit test suite is configured |
| Automated accessibility (axe) | NOT TESTED | Manual keyboard and DOM checks only |
| Lighthouse/Core Web Vitals | NOT TESTED | No score or field performance data collected |
| Live Hostinger routes/HTTP 404 | NOT TESTED | No deployment or production domain configured |

## Remaining configuration and earlier incomplete work

- The provided public phone number and Bengaluru address are now shown on the
  Contact page and in the shared footer. Verify their formatting and
  availability before release.
- Earlier phases did not configure the verified production domain, real
  PostgreSQL instance, SMTP company inbox, GA4 measurement ID or a production
  data-retention/deletion schedule. The privacy notice therefore requires
  review and approval before live collection.
- Python 3.12+ was specified but is not installed in this workspace; Django
  checks and tests ran with the available Python 3.10 interpreter and do not
  certify Python 3.12 compatibility.
- SMTP notification failure does not lose the saved enquiry, but a persistent
  retry queue is not configured.
- Hostinger Business static hosting serves the React build only. Host the
  Django API on a Python-compatible VPS/provider; do not attempt to run Django
  on Hostinger Business shared/static hosting.
- `check --deploy` retains intentional HSTS subdomain/preload warnings until
  all relevant subdomains and preload eligibility are verified. Do not enable
  those policies solely to silence the warnings.
- No deployment has been performed.

## Hostinger static deployment

1. Confirm the production root-domain origin and approve public indexing.
   Configure `VITE_SITE_URL` and explicitly set `VITE_ENABLE_INDEXING=true`
   only when launch readiness is approved. Otherwise leave indexing disabled.
2. In a Node.js environment at the repository root, install locked
   dependencies and build:

   ```powershell
   npm ci
   npm run typecheck
   npm run lint
   npm run test:routes
   npm run build
   ```

3. Verify the build output in `dist/`: root `index.html`, prerendered route
   directories, assets, `.htaccess` and `404.html`. With approved indexing
   enabled, also verify `robots.txt` and `sitemap.xml`.
4. Keep source in the approved GitHub repository. Push the reviewed release
   branch, build its static artifact in CI or locally, then use Hostinger's
   supported Git/FTP process to upload the **contents** of `dist/` into the
   domain document root. Use a Git deployment only if the plan supports the
   required Node build; otherwise upload the built static files. Keep
   deployment credentials in the hosting/CI secret store, never in GitHub
   source or a `VITE_` variable.
5. Configure HTTPS and verify canonical host redirects, root-relative asset
   paths, route refresh, the HTTP 404 response, permanent legacy redirects,
   form/API origin, browser console and robots/sitemap behavior after upload.
   Do not submit a sitemap before the real domain and indexable content are
   finalized.
6. Host the Django backend separately on a Python-capable VPS or provider. See
   [the backend deployment guide](../backend/README.md); no backend deployment
   is part of these static steps.

No deployment was run or approved as part of Phase 5.
