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
  assert.doesNotMatch(home, /rel="canonical"/);
  const robots = await readFile(join(outputDirectory, "robots.txt"), "utf8");
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow: \//);

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
  assert.match(notFound, /<title>Page Not Found \| Techyfern Digital<\/title>/);
  assert.match(notFound, /<meta name="robots" content="noindex, nofollow"/);
});
