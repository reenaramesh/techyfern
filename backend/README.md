# Django lead management backend

This backend uses Python 3.12+, Django, Django REST Framework and PostgreSQL
in production. SQLite is used for local development. It is separate from the
React static site; the public site remains deployable to Hostinger static
hosting and sends form submissions to the configured API.

## Windows local development

From the repository root, run these commands in PowerShell:

```powershell
py -3.12 -m venv backend\.venv
backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
Set-Location backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

`DJANGO_SETTINGS_MODULE` defaults to `config.settings.development`. The
development settings use SQLite and console email unless SMTP settings or a
different `DJANGO_EMAIL_BACKEND` are supplied. Never use the local-only
development secret in production.

In another terminal, run `npm install`, copy the root `.env.example` to
`.env.local` if configuration is needed, and start `npm run dev`. Vite proxies
`/api/` to `http://127.0.0.1:8000` by default; set
`VITE_API_PROXY_TARGET` when Django listens elsewhere. Set
`VITE_API_BASE_URL` only when the API uses a separate origin.

## API and lead administration

- `POST /api/v1/leads/` accepts contact enquiries.
- `POST /api/v1/quotations/requests/` accepts consultation requests.
- `GET /api/v1/admin/leads/` and `GET /api/v1/admin/leads/{uuid}/` require an
  active staff account with lead view permission.
- `PATCH /api/v1/admin/leads/{uuid}/` requires lead change permission.
- `POST /api/v1/admin/leads/{uuid}/notes/` requires lead view and activity-add
  permissions.
- `GET /api/v1/admin/dashboard/` requires lead view permission.
- `/django-admin/` is Django Admin; use `createsuperuser` and grant staff
  permissions deliberately.

Public writes require an `Idempotency-Key`, consent, valid serializer data and
an empty honeypot; anonymous submissions are throttled. Production uses the
database cache for a shared throttle count across web workers. Admin APIs use
session authentication and Django permissions, so state-changing session
requests require CSRF. Lead values and submitted text are not written to logs.
SMTP is attempted after the database transaction commits. A failed email is
logged by record UUID; the saved enquiry remains available in Django Admin.
Email retry delivery is not configured, so monitor SMTP delivery and use a
persistent task queue only if reliable retries become a production
requirement.

## Production deployment preparation

The backend is suitable for a Python-capable VPS (including a Hostinger VPS),
not Hostinger static-only hosting. Keep the frontend static and host the API
under the same origin behind a reverse proxy where possible.

1. Provision a maintained Python 3.12+ runtime and PostgreSQL database. Install
   `backend\requirements.txt` in an isolated virtual environment.
2. Set `DJANGO_SETTINGS_MODULE=config.settings.production`.
3. Configure environment variables outside the repository:
   - `DJANGO_SECRET_KEY`: unique cryptographically random secret.
   - `DJANGO_ALLOWED_HOSTS`: comma-separated backend hostnames.
   - `DATABASE_URL`: PostgreSQL connection URL with credentials supplied by the
     host's secret manager/environment.
   - `CSRF_TRUSTED_ORIGINS`: exact HTTPS origins for browser sessions/admin.
   - `CORS_ALLOWED_ORIGINS`: only when the public frontend is on a separate
     origin; do not use wildcards.
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`, `EMAIL_HOST_USER`,
     `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL` and
     `COMPANY_NOTIFICATION_EMAIL`.
   - `SECURE_SSL_REDIRECT=True` and `SECURE_HSTS_SECONDS` after HTTPS and proxy
     forwarding are verified. Set `SECURE_HSTS_INCLUDE_SUBDOMAINS=True` only
     after confirming every subdomain is HTTPS-only. Keep
     `SECURE_HSTS_PRELOAD=False` until the verified production domain satisfies
     preload requirements and the business explicitly approves submission.
4. Run `python manage.py migrate` and
   `python manage.py createcachetable` during release preparation.
5. Run `python manage.py collectstatic --noinput`. Serve `STATIC_ROOT` from
   the web server or a protected static-file service; no user-upload media is
   currently required.
6. Run the WSGI application with Gunicorn, for example:

   ```sh
   gunicorn config.wsgi:application --chdir backend --bind 127.0.0.1:8000 --workers 3
   ```

   Configure the reverse proxy for HTTPS termination, forwarded protocol
   headers, `/api/` and `/django-admin/`. Restrict direct access to the
   application port. Keep the static frontend deployment independent.
7. Create the initial administrator with `python manage.py createsuperuser`;
   do not seed or hardcode administrator credentials.
8. Before release, run `python manage.py check --deploy`, backend tests, frontend
   typecheck/lint/build, and verify the configured host/origin behavior.

With the conservative defaults, `check --deploy` reports HSTS warnings about
subdomains and browser preload. Review them against the verified domain and
its subdomains; do not enable either option just to silence a warning.

For backup, use PostgreSQL's `pg_dump` and protect encrypted backup copies
according to the chosen retention policy. Test restoration into a separate
database before relying on backups. Define and approve a personal-data
retention/deletion policy, hosting location, privacy notice and data access
roles before collecting production enquiries. No production database,
verified domain, SMTP inbox, data-retention period or hosting location is
configured by this project.

## Tests

From `backend\` with the virtual environment active:

```powershell
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py test
```

The frontend provides `npm run typecheck`, `npm run lint` and `npm run build`
from the repository root.
