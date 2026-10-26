import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackAnalyticsEvent } from "../lib/analytics";

const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();

function configureAnalytics() {
  if (!measurementId || typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  if (document.querySelector("#techyfern-ga4-script")) return;
  const script = document.createElement("script");
  script.id = "techyfern-ga4-script";
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
    function handleWhatsAppClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const host = new URL(link.href, window.location.href).hostname;
      if (host === "wa.me" || host === "api.whatsapp.com" || host === "web.whatsapp.com") {
        trackAnalyticsEvent("whatsapp_cta_click", {
          cta_location: link.dataset.analyticsLocation ?? "website",
        });
      }
    }

    document.addEventListener("click", handleWhatsAppClick);
    return () => document.removeEventListener("click", handleWhatsAppClick);
  }, []);

  return null;
}
