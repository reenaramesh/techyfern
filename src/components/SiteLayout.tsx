import type { CSSProperties } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

const illustrationBasePath = `${import.meta.env.BASE_URL}illustrations/`;
const illustrationStyles: CSSProperties & Record<`--${string}`, string> = {
  "--illustration-ai": `image-set(url("${illustrationBasePath}digital-ai-background-light-960.webp") 1x, url("${illustrationBasePath}digital-ai-background-light-1920.webp") 2x)`,
  "--illustration-web": `image-set(url("${illustrationBasePath}web-design-background-960.webp") 1x, url("${illustrationBasePath}web-design-background-1920.webp") 2x)`,
  "--illustration-marketing": `image-set(url("${illustrationBasePath}digital-marketing-background-960.webp") 1x, url("${illustrationBasePath}digital-marketing-background-1920.webp") 2x)`,
  "--illustration-workflow": `image-set(url("${illustrationBasePath}workflow-automation-background-960.webp") 1x, url("${illustrationBasePath}workflow-automation-background-1920.webp") 2x)`,
  "--illustration-collaboration": `image-set(url("${illustrationBasePath}collaboration-background-960.webp") 1x, url("${illustrationBasePath}collaboration-background-1920.webp") 2x)`,
  "--illustration-security": `image-set(url("${illustrationBasePath}privacy-security-background-960.webp") 1x, url("${illustrationBasePath}privacy-security-background-1920.webp") 2x)`,
};

const pageIllustrations: Record<string, string> = {
  "/": "ai",
  "/about": "collaboration",
  "/our-process": "collaboration",
  "/contact": "collaboration",
  "/request-quote": "collaboration",
  "/privacy": "privacy-security",
  "/website-design": "web-design",
  "/digital-marketing": "digital-marketing",
  "/web-app-development": "workflow-automation",
  "/business-tech-solutions": "workflow-automation",
  "/ai-automation": "ai",
  "/portfolio/customer-management-dashboard": "workflow-automation",
  "/portfolio/appointment-booking-application": "workflow-automation",
  "/portfolio/campaign-performance-dashboard": "digital-marketing",
  "/portfolio/business-workflow-automation": "workflow-automation",
};

export function SiteLayout() {
  const { pathname } = useLocation();
  const pagePath = pathname.replace(/\/+$/, "") || "/";

  return (
    <>
      <Header />
      <main
        data-illustration-theme={pageIllustrations[pagePath] ?? "web-design"}
        id="main-content"
        style={illustrationStyles}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
