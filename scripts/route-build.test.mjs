import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const outputDirectory = join(process.cwd(), "dist");
const isGitHubPagesPreview =
  process.env.VITE_GITHUB_PAGES_PREVIEW === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName
    ? `/${repositoryName}`
    : "";
const indexableRoutes = [
  "/",
  "/about/",
  "/services/",
  "/website-design/",
  "/digital-marketing/",
  "/web-app-development/",
  "/business-tech-solutions/",
  "/ai-automation/",
  "/portfolio/",
  "/our-process/",
  "/contact/",
];
const noIndexRoutes = [
  "/request-quote/",
  "/privacy/",
  "/portfolio/service-business-website/",
  "/portfolio/customer-management-dashboard/",
  "/portfolio/appointment-booking-application/",
  "/portfolio/campaign-performance-dashboard/",
  "/portfolio/business-workflow-automation/",
];
const knownRoutes = [...indexableRoutes, ...noIndexRoutes];
const routeFile = (route) =>
  route === "/"
    ? join(outputDirectory, "index.html")
    : join(outputDirectory, route.replace(/^\/|\/$/g, ""), "index.html");

test("known routes contain prerendered content and unique page metadata", async () => {
  const seenTitles = new Set();

  for (const route of knownRoutes) {
    const html = await readFile(routeFile(route), "utf8");
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${route} must have a title`);
    assert.match(title, /TechyPraxis Digital/);
    assert.doesNotMatch(html, /Techyfern Digital/i);
    assert.ok(!seenTitles.has(title), `${route} should have a unique title`);
    seenTitles.add(title);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(
      html,
      new RegExp(
        `<meta name="prerendered-path" content="${`${basePath}${route}`.replaceAll("/", "\\/")}"`,
      ),
    );
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route} should have one H1`);
    assert.doesNotMatch(html, /<!--app-html-->/);
  }
});

test("approved brand is used in shared navigation, footer, favicon, and palette", async () => {
  const home = await readFile(routeFile("/"), "utf8");
  const styles = await readFile(join(process.cwd(), "src", "styles.css"), "utf8");
  const favicon = await readFile(join(process.cwd(), "public", "favicon.svg"), "utf8");
  const logoPath = `${basePath}/brand/techypraxis-logo.png`;

  assert.equal((home.match(new RegExp(`src="${logoPath}"`, "g")) ?? []).length, 2);
  assert.match(home, /aria-label="TechyPraxis Digital home"/);
  assert.match(home, /TechyPraxis Digital\./);
  assert.match(styles, /--brand-indigo:\s*#3730a3/);
  assert.match(styles, /--brand-amber:\s*#f59e0b/);
  assert.match(styles, /--brand-pale-indigo:\s*#eef2ff/);
  assert.match(styles, /--brand-pale-amber:\s*#fffbeb/);
  assert.match(styles, /\.button-primary\s*\{[^}]*background:\s*var\(--brand-amber\);[^}]*color:\s*var\(--charcoal\);/s);
  assert.match(favicon, /fill="#3730A3"/);
  assert.match(favicon, /stroke="#F59E0B"/);
});

test("homepage separates primary service areas from specialist capabilities", async () => {
  const home = await readFile(routeFile("/"), "utf8");
  const primarySection = home.match(
    /<section class="services-section[\s\S]*?<\/section>/,
  )?.[0];
  const specialistSection = home.match(
    /<section class="specialist-section[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(primarySection, "homepage should render its primary service grid");
  assert.ok(specialistSection, "homepage should render its specialist grid");
  assert.equal((primarySection.match(/class="service-card"/g) ?? []).length, 3);
  assert.equal((specialistSection.match(/class="service-card"/g) ?? []).length, 2);
  assert.match(home, /Three connected foundations for your business/);
  assert.match(home, /Purpose-built solutions for specific workflows/);
  assert.doesNotMatch(home, /Built with intention/);
});

test("homepage animation content stays visible in prerendered HTML", async () => {
  const home = await readFile(routeFile("/"), "utf8");

  assert.match(home, /Smart Digital Solutions for Growing Businesses\./);
  assert.match(home, /Three connected foundations for your business\./);
  assert.doesNotMatch(
    home,
    /style="[^"]*(?:opacity:\s*0|transform:\s*translateY\()/i,
  );
});

test("build keeps preview pages noindex and excludes a sitemap", async () => {
  const robots = await readFile(join(outputDirectory, "robots.txt"), "utf8");
  const home = await readFile(routeFile("/"), "utf8");
  if (isGitHubPagesPreview) {
    assert.match(robots, /Allow: \//);
  } else {
    assert.match(robots, /Disallow: \//);
  }
  assert.match(home, /<meta name="robots" content="noindex, nofollow"/);
  await assert.rejects(readFile(join(outputDirectory, "sitemap.xml")));
});

test("portfolio search describes the fields it can find", async () => {
  const portfolio = await readFile(routeFile("/portfolio/"), "utf8");
  assert.match(
    portfolio,
    /Search projects by name, service, description or technology/,
  );
  assert.match(portfolio, /Search name, service or technology/);
});

test("all five service routes include scope, process, FAQs, and related services", async () => {
  const serviceRoutes = [
    "/website-design/",
    "/digital-marketing/",
    "/web-app-development/",
    "/business-tech-solutions/",
    "/ai-automation/",
  ];
  const requiredSections = [
    /What we can help with/,
    /How we work/,
    /Frequently asked questions/,
    /Related services/,
  ];

  for (const route of serviceRoutes) {
    const html = await readFile(routeFile(route), "utf8");
    for (const section of requiredSections) {
      assert.match(html, section, `${route} should render ${section}`);
    }
  }
});

test("GitHub Pages preview uses repository-relative assets and disables lead submissions", async (context) => {
  if (!isGitHubPagesPreview) {
    context.skip("GitHub Pages build variables are not enabled.");
    return;
  }

  assert.ok(basePath, "GitHub Actions must provide the repository name.");
  const home = await readFile(routeFile("/"), "utf8");
  const escapedBasePath = basePath.replaceAll("/", "\\/");
  assert.match(home, new RegExp(`href="${escapedBasePath}\\/favicon\\.svg"`));
  assert.match(home, new RegExp(`src="${escapedBasePath}\\/assets\\/`));
  assert.match(home, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(home, /static website preview/);
  assert.match(home, /SCOPE-LED/);
  assert.doesNotMatch(home, /rel="canonical"/);
  const robots = await readFile(join(outputDirectory, "robots.txt"), "utf8");
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow: \//);

  for (const route of indexableRoutes) {
    const html = await readFile(routeFile(route), "utf8");
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(html, /rel="canonical"/);
  }

  for (const route of ["/contact/", "/request-quote/"]) {
    const html = await readFile(routeFile(route), "utf8");
    assert.match(html, /Preview only: submissions are disabled/);
    assert.match(html, /<button[^>]*disabled[^>]*>Submissions disabled in preview<\/button>/);
  }

  const contact = await readFile(routeFile("/contact/"), "utf8");
  const quotation = await readFile(routeFile("/request-quote/"), "utf8");
  assert.match(contact, /This preview is for interface review only; enquiries are not sent/);
  assert.match(quotation, /This preview does not send consultation requests/);
  assert.match(contact, new RegExp(`href="${escapedBasePath}\\/privacy/"`));
});

test("noindex forms and concept pages stay excluded, with a static not-found page", async () => {
  for (const route of noIndexRoutes) {
    const html = await readFile(routeFile(route), "utf8");
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  }

  const notFound = await readFile(join(outputDirectory, "404.html"), "utf8");
  assert.match(notFound, /<title>Page Not Found \| TechyPraxis Digital<\/title>/);
  assert.match(notFound, /<meta name="robots" content="noindex, nofollow"/);
});
