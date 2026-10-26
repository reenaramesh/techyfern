# Temporary GitHub Pages preview

This project is prepared for a temporary GitHub Pages preview. It does not
configure a custom domain or deploy the Django backend.

## Repository and URL

- Repository name: `techyfern`
- GitHub repository URL: <https://github.com/reenaramesh/techyfern>
- Deployment branch: `main`
- Expected Pages URL:
  <https://reenaramesh.github.io/techyfern/>
- Actual deployed URL: not verified; the remote repository and Pages settings
  have not been configured.

The GitHub repository exists and was empty when checked (no branches or
commits). The workspace is now initialized locally on `main`, with the
repository configured as `origin`. Its initial website commit has not yet
been pushed because GitHub credentials are not available to this session.
Environment files, local databases, Python environments, build output, caches,
and common private credential files are excluded by `.gitignore`. Do not
commit secrets or customer records.

## One-time GitHub setup

1. The repository already exists at
   <https://github.com/reenaramesh/techyfern> and its default branch is `main`.
   It is public; review the source for material that should remain private.
2. The local workspace has an initial commit. Review its staged/pushed state
   with `git status --short --branch` and `git log -1 --oneline`. Once GitHub
   authentication is available in the local credential manager, publish the
   `main` branch:

   ```powershell
   git push -u origin main
   ```

   No remote commits or branches existed when checked. If the remote
   repository has since changed, fetch and integrate any new history before
   pushing; never force-push or replace existing history.
3. In the GitHub repository, open **Settings → Pages** and select **GitHub
   Actions** as the build and deployment source. No custom domain is needed.
4. Push to `main`, then open **Actions → Deploy Techyfern Digital to GitHub
   Pages** and wait for both `build` and `deploy` jobs to succeed.
5. GitHub displays the published URL in the Pages settings and deployment
   workflow. Confirm it matches the expected URL above before sharing it.

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
- No custom domain is configured. GitHub account ownership, repository
  visibility, Pages settings, workflow execution and a live URL remain
  unverified until the one-time setup is completed.

## Updating the preview

After the repository is connected, commit and push reviewed changes to `main`.
The Actions workflow runs checks and publishes the new static artifact when
they pass. Check the workflow run and open its Pages URL to verify the update.
Do not include `.env` files, API credentials, customer data, or local database
files.

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
