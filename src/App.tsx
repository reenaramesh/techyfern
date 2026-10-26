import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Seo } from "./components/Seo";
import { SiteLayout } from "./components/SiteLayout";
import { detailedServices, legacyServiceRedirects } from "./lib/serviceContent";
import { futurePages } from "./lib/pages";
import { AnalyticsTracking } from "./components/AnalyticsTracking";

const HomePage = lazy(() =>
  import("./pages/HomePage").then(({ HomePage }) => ({ default: HomePage })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then(({ AboutPage }) => ({ default: AboutPage })),
);
const PortfolioPage = lazy(() =>
  import("./pages/PortfolioPage").then(({ PortfolioPage }) => ({
    default: PortfolioPage,
  })),
);
const ProjectDetailPage = lazy(() =>
  import("./pages/ProjectDetailPage").then(({ ProjectDetailPage }) => ({
    default: ProjectDetailPage,
  })),
);
const OurProcessPage = lazy(() =>
  import("./pages/OurProcessPage").then(({ OurProcessPage }) => ({
    default: OurProcessPage,
  })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then(({ ContactPage }) => ({
    default: ContactPage,
  })),
);
const QuotationRequestPage = lazy(() =>
  import("./pages/QuotationRequestPage").then(({ QuotationRequestPage }) => ({
    default: QuotationRequestPage,
  })),
);
const PrivacyPage = lazy(() =>
  import("./pages/PrivacyPage").then(({ PrivacyPage }) => ({
    default: PrivacyPage,
  })),
);
const ServicesOverviewPage = lazy(() =>
  import("./pages/ServicesOverviewPage").then(({ ServicesOverviewPage }) => ({
    default: ServicesOverviewPage,
  })),
);
const ServiceDetailPage = lazy(() =>
  import("./pages/ServiceDetailPage").then(({ ServiceDetailPage }) => ({
    default: ServiceDetailPage,
  })),
);
const ServiceAliasRedirect = lazy(() =>
  import("./pages/ServiceDetailPage").then(({ ServiceAliasRedirect }) => ({
    default: ServiceAliasRedirect,
  })),
);
const PlaceholderPage = lazy(() =>
  import("./pages/PlaceholderPage").then(({ PlaceholderPage }) => ({
    default: PlaceholderPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("./pages/PlaceholderPage").then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  })),
);

function HashNavigation() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }, 0);
    return () => window.clearTimeout(target);
  }, [hash, pathname]);

  return null;
}

export function App() {
  return (
    <>
      <Seo />
      <AnalyticsTracking />
      <HashNavigation />
      <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="portfolio/:slug" element={<ProjectDetailPage />} />
            <Route path="our-process" element={<OurProcessPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="request-quote" element={<QuotationRequestPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="services" element={<ServicesOverviewPage />} />
            {detailedServices.map((service) => (
              <Route
                element={<ServiceDetailPage />}
                key={service.path}
                path={service.path.replace(/^\/|\/$/g, "")}
              />
            ))}
            {futurePages.map((page) => (
              <Route
                element={<PlaceholderPage />}
                key={page.path}
                path={page.path.slice(1)}
              />
            ))}
            {legacyServiceRedirects.map((route) => (
              <Route
                element={<ServiceAliasRedirect to={route.to} />}
                key={route.path}
                path={route.path.slice(1)}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
