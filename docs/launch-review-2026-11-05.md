# Launch review — 5 November 2026

## Current decision

Public launch remains blocked by production configuration and enquiry delivery.
Preserve the existing SEO preparation and keep the temporary preview noindex.
This review does not certify traffic growth, rankings, campaign performance,
backend operations or production deployment.

## Independently checked

- The documented preview, https://reenaramesh.github.io/techyfern/, returns HTTP 200.
- Its homepage contains `noindex, nofollow`; robots.txt permits crawling so that
  crawlers can read that directive.
- Its title is still “TechyPraxis Digital | Growing Ideas Through Technology”
  and its H1 is “Smart Digital Solutions for Growing Businesses.” The local
  homepage and service metadata have newer Bengaluru-focused content. Local
  preparation must not be confused with deployed improvements.
- The repository already implements prerendering, per-page metadata, conditional
  canonicals/sitemap, structured data, service-specific enquiry links and GA4
  conversion hooks. Preserve this work.
- ESLint passed during this review. The first `npm.cmd run build` failed in prerendering with Vite SSR
  `transport invoke timed out after 60000ms` while loading `siteContact.ts`.
  A separate entry-module diagnostic also timed out while loading `pages.ts`.
  The root cause is not established. A separate page-definition load then
  succeeded, and a full build retry passed, including TypeScript, Vite and
  all 24 static outputs. The subsequent route suite passed 10 tests with one
  GitHub-Pages-specific test skipped. The initial route test run began too
  early against incomplete output and is superseded by this sequential run.
  Current output remains intentionally noindex with no production sitemap;
  rebuild against the approved production configuration before deployment.
- Ubersuggest authentication returned UNAUTHORIZED. Keyword volumes, difficulty,
  competitor traffic and rankings remain unverified; connect Ubersuggest through
  OAuth before using those figures to allocate marketing spend.
- No production domain was established by repository evidence. No live lead
  submission, production email delivery or Search Console ownership was verified.

## Release order

1. Confirm the production HTTPS origin and whether the supplied phone/address
   are appropriate for public promotion. Confirm the intended Bengaluru market.
2. Deploy Django on Python 3.12+ with PostgreSQL, HTTPS and working notification
   delivery. Configure the frontend API origin. Submit a real test enquiry and
   quotation; verify persistence, staff access, notification delivery and useful
   error behavior. Confirm the phone is answered.
3. Finish the privacy notice with actual hosting, retention, deletion and contact
   arrangements. Decide analytics consent behavior before configuring GA4.
4. Build for the approved origin with indexing enabled. Verify canonical URLs,
   sitemap entries, robots policy, prerendered headings, assets, redirects and
   HTTP 404 on Hostinger. Keep preview builds separate and noindex.
5. Verify Search Console ownership, submit the production sitemap and inspect
   the homepage plus each service URL. This requires account/domain access.
6. Check mobile usability and performance on the deployed origin. No Core Web
   Vitals or Lighthouse score was measured in this review.
7. Enable verified measurement, check one page-view per navigation, and verify
   successful-enquiry events. Treat phone clicks as intent, not completed leads.
   Check that no entered form data appears in analytics requests.

## First 30 days after launch

| Period | Work | Measure |
|---|---|---|
| Week 1 | Validate indexing and enquiry delivery; align owner-controlled business profiles with approved details; confirm Google Business Profile eligibility before setup. | Indexed service URLs, successful enquiries, missed calls and delivery failures. |
| Week 2 | Research actual service keywords for the confirmed market; improve the existing five service pages against customer questions and verified capabilities. | Search impressions, relevant queries and service-page visits. |
| Week 3 | Publish one useful original resource answering a recurring customer question; link it to the relevant service page; share it through owner-controlled channels. | Relevant visits, engaged enquiries and referring sources. |
| Week 4 | Review query and lead quality; improve weak landing-page explanations; consider one narrowly scoped Search campaign only after budget and conversion tracking are approved. | Qualified enquiries, cost per qualified enquiry if advertising runs, and lead-to-consultation progression. |

Use the existing keyword map and marketing launch plan for service ownership,
campaign groups and candidate negative keywords. Select the first content topic
from actual customer questions; the themes are suggestions, not measured demand.
Use consistent `utm_source`, `utm_medium` and `utm_campaign` labels on external
campaign links, never internal navigation, and never include personal data.
Do not buy links or fabricate reviews, results or client work. Publish approved
case studies when supporting evidence and client permission become available.

## Guidance

Google recommends crawlable links, accessible page resources and accurate
sitemaps: https://developers.google.com/search/docs/fundamentals/get-started-developers
and https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap.
These practices improve discovery; they do not guarantee indexing or rankings.
