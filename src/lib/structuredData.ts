import { detailedServices } from "./serviceContent";
import { getCanonicalPath, type PageDefinition } from "./pages";
import { siteContact } from "./siteContact";

type Breadcrumb = {
  name: string;
  path: string;
};

function getBreadcrumbs(page: PageDefinition): Breadcrumb[] {
  if (page.path.startsWith("/portfolio/")) {
    return [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio/" },
      { name: page.heading, path: page.path },
    ];
  }
  if (detailedServices.some((service) => service.path === page.path)) {
    return [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services/" },
      { name: page.heading, path: page.path },
    ];
  }
  return [
    { name: "Home", path: "/" },
    { name: page.heading, path: page.path },
  ];
}

export function getStructuredData(
  page: PageDefinition,
  siteUrl: string,
): Record<string, unknown> | undefined {
  if (!siteUrl || page.noIndex) return undefined;

  const organizationId = `${siteUrl}/#organization`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "TechyPraxis Digital",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/brand/techypraxis-logo.png`,
      telephone: `+91${siteContact.phoneDisplay}`,
    },
  ];

  if (page.path === "/") {
    graph.push({
      "@type": "WebSite",
      name: "TechyPraxis Digital",
      url: `${siteUrl}/`,
      publisher: { "@id": organizationId },
    });
  }

  const service = detailedServices.find(
    (candidate) => candidate.path === page.path,
  );
  if (service) {
    graph.push({
      "@type": "Service",
      name: service.shortName,
      serviceType: service.shortName,
      description: service.description,
      url: `${siteUrl}${getCanonicalPath(service.path)}`,
      provider: { "@id": organizationId },
    });
  }

  const breadcrumbs = getBreadcrumbs(page);
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: `${siteUrl}${getCanonicalPath(breadcrumb.path)}`,
    })),
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
