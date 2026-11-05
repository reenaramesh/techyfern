import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackAnalyticsEvent } from "../lib/analytics";

const measurementId =
  import.meta.env.VITE_GITHUB_PAGES_PREVIEW === "true"
    ? ""
    : import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();

function configureAnalytics() {
  if (!measurementId || typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  if (document.querySelector("#techypraxis-ga4-script")) return;
  const script = document.createElement("script");
  script.id = "techypraxis-ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
}

export function AnalyticsTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    configureAnalytics();
    trackAnalyticsEvent("page_view", { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    function handleContactClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.protocol === "tel:") {
        trackAnalyticsEvent("contact_click", { contact_method: "phone" });
        return;
      }
      const host = new URL(link.href, window.location.href).hostname;
      if (host === "wa.me" || host === "api.whatsapp.com" || host === "web.whatsapp.com") {
        trackAnalyticsEvent("whatsapp_click", {
          cta_location: link.dataset.analyticsLocation ?? "website",
        });
      }
    }

    document.addEventListener("click", handleContactClick);
    return () => document.removeEventListener("click", handleContactClick);
  }, []);

  return null;
}
