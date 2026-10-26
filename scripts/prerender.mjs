import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { createServer, loadEnv } from "vite";

const root = process.cwd();
const env = loadEnv("production", root, "VITE_");
const githubPagesPreview = process.env.VITE_GITHUB_PAGES_PREVIEW === "true";
const siteUrl = githubPagesPreview
  ? ""
  : env.VITE_SITE_URL?.trim().replace(/\/+$/, "") || "";
const indexingEnabled =
  !githubPagesPreview && env.VITE_ENABLE_INDEXING === "true";
function escapeHtmlAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMetaTag(html, attribute, key, content) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${key}"[\\s\\S]*?\\/?>`,
  );
  if (!pattern.test(html)) {
    throw new Error(`The HTML template is missing ${attribute}="${key}" metadata.`);
  }
  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapeHtmlAttribute(content)}" />`,
  );
}

if (indexingEnabled && !siteUrl) {
  throw new Error("VITE_SITE_URL is required when VITE_ENABLE_INDEXING=true.");
}
if (siteUrl) {
  const configuredUrl = new URL(siteUrl);
  if (
    configuredUrl.origin !== siteUrl ||
    configuredUrl.pathname !== "/" ||
    configuredUrl.search ||
    configuredUrl.hash
  ) {
    throw new Error("VITE_SITE_URL must be a domain origin without a path, query or fragment.");
  }
  if (indexingEnabled && configuredUrl.protocol !== "https:") {
    throw new Error("Indexing requires an approved HTTPS VITE_SITE_URL.");
  }
}
const server = await createServer({
  configFile: resolve(root, "vite.config.ts"),
  appType: "custom",
  server: { middlewareMode: true },
});

try {
  const basePath = server.config.base.replace(/\/+$/, "");
  const withBasePath = (path) => `${basePath}${path}` || "/";
  const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
  const {
    homePage,
    futurePages,
    aboutPage,
    portfolioPage,
    processPage,
    contactPage,
    quotationPage,
    privacyPage,
    servicesOverviewPage,
    notFoundPage,
    getCanonicalPath,
    getPageDefinition,
  } =
    await server.ssrLoadModule("/src/lib/pages.ts");
  const { detailedServices, legacyServiceRedirects } = await server.ssrLoadModule(
    "/src/lib/serviceContent.ts",
  );
  const { portfolioProjects } = await server.ssrLoadModule(
    "/src/lib/portfolioProjects.ts",
  );
  const template = await readFile(join(root, "dist/index.html"), "utf8");

  const pages = [
    ...[
      homePage,
      ...futurePages,
      aboutPage,
      portfolioPage,
      processPage,
      contactPage,
      quotationPage,
      privacyPage,
      servicesOverviewPage,
      ...detailedServices,
    ].map((page) => ({ routePath: page.path, page })),
    ...portfolioProjects.map((project) => {
      const routePath = `/portfolio/${project.slug}/`;
      return { routePath, page: getPageDefinition(routePath) };
    }),
    ...legacyServiceRedirects.map((route) => {
      const page = detailedServices.find(
        (service) => service.path === route.servicePath,
      );
      if (!page) throw new Error(`No service configured for ${route.path}`);
      return { routePath: route.path, page };
    }),
  ];

  async function prerenderPage(routePath, page, outputPath) {
    const prerenderedPath = withBasePath(routePath);
    const html = await render(prerenderedPath);
    let output = template.replace("<!--app-html-->", html);
    output = output.replace(
      "</head>",
      `    <meta name="prerendered-path" content="${prerenderedPath}" />\n  </head>`,
    );
    output = output.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtmlAttribute(page.title)}</title>`,
    );
    output = replaceMetaTag(output, "name", "description", page.description);
    output = replaceMetaTag(output, "property", "og:title", page.title);
    output = replaceMetaTag(
      output,
      "property",
      "og:description",
      page.description,
    );
    output = replaceMetaTag(output, "name", "twitter:title", page.title);
    output = replaceMetaTag(
      output,
      "name",
      "twitter:description",
      page.description,
    );
    const robotsContent =
      page.noIndex || !indexingEnabled
        ? "noindex, nofollow"
        : "index, follow";
    output = replaceMetaTag(output, "name", "robots", robotsContent);
    if (siteUrl) {
      const canonicalUrl = `${siteUrl}${getCanonicalPath(page.path)}`;
      output = output.replace(
        "</head>",
        `    <link rel="canonical" href="${canonicalUrl}" />\n    <meta property="og:url" content="${canonicalUrl}" />\n  </head>`,
      );
    }
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output);
    console.log(`Prerendered ${routePath}`);
  }

  for (const { routePath, page } of pages) {
    const outputPath =
      routePath === "/"
        ? join(root, "dist/index.html")
        : join(root, "dist", routePath.replace(/^\/|\/$/g, ""), "index.html");
    await prerenderPage(routePath, page, outputPath);
  }

  await prerenderPage("/404/", notFoundPage, join(root, "dist/404.html"));

  if (githubPagesPreview) {
    await writeFile(
      join(root, "dist/robots.txt"),
      "User-agent: *\nAllow: /\n",
    );
  }

  if (indexingEnabled) {
    const legacyPaths = new Set(legacyServiceRedirects.map((route) => route.path));
    const indexablePaths = new Set(
      pages
        .filter(({ routePath, page }) => !page.noIndex && !legacyPaths.has(routePath))
        .map(({ page }) => getCanonicalPath(page.path)),
    );
    const sitemapEntries = [...indexablePaths]
      .sort()
      .map(
        (path) =>
          `  <url><loc>${siteUrl}${path.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</loc></url>`,
      )
      .join("\n");
    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      sitemapEntries,
      "</urlset>",
      "",
    ].join("\n");
    await writeFile(join(root, "dist/sitemap.xml"), sitemap);
    await writeFile(
      join(root, "dist/robots.txt"),
      `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
    );
    console.log(`Generated sitemap.xml with ${indexablePaths.size} URLs`);
  }
} finally {
  await server.close();
}
