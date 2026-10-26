from .base import *  # noqa: F403

DEBUG = env.bool("DJANGO_DEBUG", default=True)  # noqa: F405
if not ALLOWED_HOSTS:  # noqa: F405
    ALLOWED_HOSTS = ["localhost", "127.0.0.1", "[::1]"]
EMAIL_BACKEND = env(  # noqa: F405
    "DJANGO_EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",
)
