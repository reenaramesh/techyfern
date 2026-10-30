# Temporary GitHub Pages preview

This project is prepared for a temporary GitHub Pages preview. It does not
configure a custom domain or deploy the Django backend.

## Repository and URL

- Repository name: `techyfern`
- GitHub repository URL: <https://github.com/reenaramesh/techyfern>
- Deployment branch: `main`
- Latest verified remote commit: `89383e94c0a0cf17cecffb911fc838058c4fe24a`
- Expected Pages URL:
  <https://reenaramesh.github.io/techyfern/>
- Actual deployed URL, verified 2026-10-26:
  <https://reenaramesh.github.io/techyfern/>
- Current public brand: TechyPraxis Digital. The repository and `/techyfern/`
  base path remain unchanged.

The repository's `main` branch is present on `origin`, and its GitHub Pages
workflow has completed successfully. The homepage is reachable at the expected
URL. Environment files, local databases, Python environments, build output,
caches, and common private credential files are excluded by `.gitignore`. Do
not commit secrets or customer records.

The verified deployment used the
[successful GitHub Actions run](https://github.com/reenaramesh/techyfern/actions/runs/40266188083)
for commit `89383e94c0a0cf17cecffb911fc838058c4fe24a`. Phase 7 changes in this
workspace are local and will not appear on the live preview until you commit
and push them.

## One-time GitHub setup

1. The repository is public. Review its source for material that should remain
   private.
2. The Pages source is configured as **GitHub Actions**. No custom domain is
   needed.
3. Push reviewed changes to `main` to trigger the workflow, or start it from
   **Actions → Deploy TechyPraxis Digital to GitHub Pages**.
4. Confirm both `build` and `deploy` jobs succeed, then verify the deployed
   URL shown in the workflow matches the expected URL above.

The workflow deploys only the root Vite `dist/` artifact. Django code, local
databases, environment files, and Python dependencies are not uploaded as
website assets. It runs TypeScript validation, ESLint, a production static
build, and prerender/preview regression tests before deployment. Pushes to
`main` trigger deployment automatically; `workflow_dispatch` is available for
manual builds, with deployment restricted to `main`.

## Preview behavior and limitations

- The workflow derives Vite's base path from `GITHUB_REPOSITORY`; for this
  repository it is `/techyfern/`. React Router and prerendered route
  hydration use the same base path.
- Known routes are prerendered as static directories so direct navigation and
  refresh can serve page HTML. Unknown paths use GitHub Pages' static
  `404.html`; unlike the Django API or an application server, Pages cannot
  provide server-side route handling.
- Every page in this temporary build is marked `noindex, nofollow`, and no
  sitemap is generated. The preview `robots.txt` allows crawler access so
  crawlers can read the page-level noindex metadata. Do not submit this URL to
  Google Search Console or add it to Google Business Profile. `robots.txt`
  and page metadata are crawler directives, not access control; anyone with
  the URL may view a public Pages site.
- Contact and consultation forms remain visible for interface review but
  display a preview-only warning and have submissions disabled. No request is
  sent to localhost or Django, and no success response is shown.
- The Django backend is not hosted by GitHub Pages. Public forms require the
  separately hosted Python/Django API to be enabled in a future production
  build.
- The current Pages build uses the existing externally hosted Google Fonts
  stylesheet. The preview needs an internet connection to retrieve those
  fonts.
- No custom domain is configured. Repository, `main` branch, successful
  workflow run and the live preview URL were verified on 2026-10-26.

## Updating the preview

Commit and push reviewed changes to `main`. The Actions workflow runs checks
and publishes the new static artifact when they pass. Check the workflow run
and open its Pages URL to verify the update. Do not include `.env` files, API
credentials, customer data, or local database files.

## Later migration to Hostinger

The GitHub Pages build is intentionally a preview build. To prepare a
Hostinger release:

1. Keep the same React source and the existing prerendered static output.
2. Build outside the GitHub Pages workflow with no
   `VITE_GITHUB_PAGES_PREVIEW` flag. Vite then uses the root base `/`, suitable
   for the domain root.
3. Configure only the approved production `VITE_SITE_URL`,
   `VITE_ENABLE_INDEXING`, and Django API origin as needed; review privacy and
   consent requirements before enabling submissions or indexing.
4. Run the normal type-check, lint, route tests and production build. Confirm
   canonical/robots/sitemap output for the approved domain.
5. Upload only the reviewed static `dist/` contents to the approved Hostinger
   static hosting document root. Do not run Django on Hostinger Business
   shared/static hosting; deploy the Django API separately to a
   Python-compatible provider. See [the Django deployment guide](../backend/README.md)
   and [the website readiness report](./phase5-website-readiness.md).

No deployment or custom-domain configuration is performed by these migration
instructions.
