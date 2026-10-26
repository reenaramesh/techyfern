# Techyfern Digital

Website for Techyfern Digital, built with React, TypeScript,
Vite, Tailwind CSS, React Router, Lucide React and Motion.

## Local development

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run test:routes
```

The production build is written to `dist/`. `npm run build` type-checks and
builds the app, then prerenders the homepage and each known public route to
static HTML. The generated page metadata and content are present before
client-side JavaScript runs.

## Django lead management

The backend is Python 3.12+ with Django REST Framework. For Windows setup,
local API development, tests, environment configuration and production
deployment guidance, see [backend/README.md](./backend/README.md). Django uses
SQLite locally and PostgreSQL in production; it is not required to serve the
static frontend pages.

Run Django in a separate terminal and keep Vite's `/api` proxy pointed at it.
Public form submissions require a configured backend and do not report success
until the API confirms that the lead was saved.

## Routes

- `/` — homepage
- `/about/` — company purpose, services and working principles
- `/services/` — service overview
- `/website-design/` — website design and development
- `/digital-marketing/` — digital marketing and SEO
- `/web-app-development/` — custom web applications
- `/business-tech-solutions/` — business technology and software
- `/ai-automation/` — AI and business automation
- `/portfolio/` — searchable, category-filtered portfolio and concept projects
- `/portfolio/<slug>/` — project case study or concept detail
- `/our-process/` — project delivery process and engagement-specific approach
- `/contact/` — contact form submitted to the Django lead API
- `/request-quote/` — detailed project consultation request
- `/privacy/` — preliminary privacy notice requiring business/legal review

The previous `/services/website-design`, `/services/web-applications`,
`/services/digital-marketing`, `/services/business-technology` and
`/services/ai-automation` paths redirect to their current service URLs.

## Hostinger static deployment

Set the approved production origin in `.env.production` and run
`npm ci && npm run build`. The build output is `dist/`; upload its contents
(including `.htaccess`, `404.html`, route folders and assets) to the Hostinger
document root. Route folders contain prerendered `index.html` files for direct
navigation and refresh. `.htaccess` redirects retired service URLs and returns
unknown paths with the static not-found page and HTTP 404. The current Vite
output assumes the site is served from the domain root.

For GitHub-based workflow, push the source to the approved GitHub repository,
build the production artifact from the approved branch with Node.js installed,
and upload the resulting `dist/` contents using Hostinger's supported Git/FTP
workflow. Use Git deployment only if the plan supports the required Node build;
otherwise build locally or in CI and upload only the static `dist/` output.
Never expose FTP credentials or production API secrets in a repository or
frontend environment file. Detailed readiness and release steps are in
[docs/phase5-website-readiness.md](./docs/phase5-website-readiness.md).

## Temporary GitHub Pages preview

The repository includes a GitHub Actions workflow for a temporary Pages
preview. It builds with the repository subpath, keeps every page noindex,
blocks crawling, and disables contact/consultation form submissions. The
workflow publishes only the static `dist/` output; Django remains separate.
See [docs/github-pages-deployment.md](./docs/github-pages-deployment.md) for
the required repository and Pages setup. No GitHub remote or deployment is
currently configured.

Keep Django hosted separately on a Python-compatible environment such as a VPS;
do not try to run it on Hostinger Business static/shared hosting. See
[backend/README.md](./backend/README.md) for backend deployment preparation.

## SEO launch checklist

The domain is not yet confirmed. Copy `.env.example` to `.env.production` and
set `VITE_SITE_URL` to the approved canonical origin before the production
build. Canonical links are omitted while this value is empty.

The included `robots.txt` intentionally blocks crawling and prerendered pages
contain `noindex, nofollow` until launch readiness is approved. Concept
demonstrations, the preliminary privacy notice, quotation form and 404 page
remain noindex. When the domain and launch are approved, set
`VITE_ENABLE_INDEXING=true` together with an HTTPS `VITE_SITE_URL`; the
prerender step then writes an accurate sitemap and open robots policy for
indexable pages. Without both settings, the sitemap is omitted and crawling
remains blocked.

## Portfolio content

Portfolio entries are defined in `src/lib/portfolioProjects.ts`. Concept
demonstrations are maintained separately from approved case studies. Add an
approved case study only after publication permission is confirmed; include
outcomes only when they are verified.

## Replaceable brand assets

The text-based Techyfern mark, favicon, palette and original inline SVG/CSS
illustrations are provisional working assets. Replace them with approved final
brand assets when available. Do not add unverified client claims, reviews,
awards or project results.
