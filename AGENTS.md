# Techyfern Digital — Agent Instructions

These instructions apply to GitHub Copilot and OpenAI Codex. Follow them for all work in this repository.

## Project status and preservation

- The repository may be incomplete. Inspect the files and existing implementation before making changes; follow the architecture and conventions that are actually present.
- Preserve completed work. Make focused changes and do not replace, delete, or overwrite unrelated files.
- If the repository is empty or a requested detail cannot be verified, ask for the missing scope or source of truth rather than claiming an existing pattern or inventing business information.
- Use reusable components and shared tokens instead of duplicating page-specific UI or styles.

## Application architecture

- The intended frontend stack is React, TypeScript, Vite, and Tailwind CSS. Use the versions and configuration already present; do not introduce a competing framework or styling system.
- The only approved backend technology is Python 3.12+ with Django and Django REST Framework. Use Django apps, the Django ORM, migrations, built-in authentication/permissions, and Django's email facilities. Do not introduce PHP files, APIs, frameworks, or dependencies, or substitute another backend runtime/framework.
- Keep backend dependencies and configuration under `backend/`. Use environment-based secrets and database settings; never commit credentials, administrator accounts, or populated environment files.
- PostgreSQL is the production database. SQLite may be used only for local development and tests.
- Keep UI in React components, use TypeScript for application code, and use Vite for development and production builds.
- Organize components, pages, assets, and shared utilities according to the existing project structure. Extract shared UI when it improves consistency; avoid needless abstraction.
- Keep browser-facing code compatible with static hosting. Do not require a Node.js server, server-side runtime, server-only environment variables, or runtime API for public pages unless explicitly approved.
- Respect the existing routing approach. Any client-side routes must work on direct navigation and refresh on Hostinger using the supported static output or an explicitly configured fallback. Do not assume Hostinger rewrite configuration exists.
- Keep production assets and URLs compatible with the configured Vite base path and Hostinger's deployment location. Do not hard-code a domain or deployment subpath without approval.

## Branding and content

- Use only brand names, logos, colors, typography, imagery, and messaging provided in the repository or explicitly approved by the user.
- Do not fabricate client reviews, testimonials, customer counts, case studies, awards, credentials, results, or business achievements.
- Do not present placeholder claims or invented contact details as facts. Mark genuinely necessary placeholders clearly and keep them out of production-facing content until approved.
- Preserve supplied assets and their intended use. Do not replace approved branding with a guessed redesign.

## Shared UI and design

- Maintain a consistent visual language across all pages by reusing shared components, layout primitives, design tokens, and Tailwind conventions.
- Build responsive layouts for small, medium, and large viewports. Avoid horizontal overflow and ensure interactive controls remain usable on touch devices.
- Use semantic HTML, accessible names and labels, logical heading order, visible keyboard focus, keyboard-operable controls, and sufficient color contrast.
- Respect reduced-motion preferences. Do not use color alone to convey meaning.
- Prefer clear, simple layouts and consistent spacing, typography, and interaction states. Avoid one-off styling where a shared component or token is appropriate.

## Public-page SEO

- Make every public page crawlable and meaningful without relying solely on client-side rendering where the project supports static generation or prerendering.
- Give each public page a unique, accurate title and meta description, a canonical URL when the production URL is known, and appropriate social-sharing metadata.
- Use semantic landmarks, descriptive headings, useful link text, and descriptive image alternative text. Provide an appropriate favicon and ensure important page content is present in the generated static output when feasible.
- Keep `robots.txt`, sitemap entries, structured data, and canonical URLs accurate and consistent with the deployed site. Only publish structured data for facts verified from approved content.
- Do not expose staging URLs, private pages, or placeholder metadata as production SEO content.

## Hostinger static deployment

- The production build must be deployable as static files to Hostinger. Follow the repository's configured build command and output directory (Vite commonly uses `dist`; verify rather than assume).
- Do not add server-dependent features to the public site. Use static assets and build-time configuration, and never commit secrets.
- Check asset paths, route refresh behavior, and the final build output for the actual Hostinger deployment mode. Document or configure any required fallback or base-path behavior rather than assuming it.

## Coding standards and verification

- Match existing naming, formatting, linting, localization, and component patterns. Keep changes scoped to the request.
- Prefer clear, type-safe code. Handle errors explicitly; avoid silent fallbacks, broad catches, and success-shaped failure states.
- Update documentation directly related to a behavior or architecture change.
- Run the smallest relevant tests, lint, type-check, or production build after code changes. Fix regressions caused by the change and report any checks that could not be run.
- Before reporting completion, verify the requested behavior and, for public-page or deployment changes, inspect the production build for static-hosting compatibility.
