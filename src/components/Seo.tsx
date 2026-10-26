import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCanonicalPath, getPageDefinition } from "../lib/pages";

const githubPagesPreview =
  import.meta.env.VITE_GITHUB_PAGES_PREVIEW === "true";
const siteUrl = githubPagesPreview
  ? undefined
  : import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "");
const indexingEnabled =
  !githubPagesPreview && import.meta.env.VITE_ENABLE_INDEXING === "true";

export function Seo() {
  const { pathname } = useLocation();
  const page = getPageDefinition(pathname);

  useEffect(() => {
    document.title = page.title;

    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = page.description;

    let robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.append(robots);
    }
    robots.content =
      page.noIndex || !indexingEnabled || !siteUrl
        ? "noindex, nofollow"
        : "index, follow";

    const socialMetadata: {
      selector: string;
      attribute: "name" | "property";
      key: string;
      value: string;
    }[] = [
      {
        selector: 'meta[property="og:title"]',
        attribute: "property",
        key: "og:title",
        value: page.title,
      },
      {
        selector: 'meta[property="og:description"]',
        attribute: "property",
        key: "og:description",
        value: page.description,
      },
      {
        selector: 'meta[name="twitter:title"]',
        attribute: "name",
        key: "twitter:title",
        value: page.title,
      },
      {
        selector: 'meta[name="twitter:description"]',
        attribute: "name",
        key: "twitter:description",
        value: page.description,
      },
    ];

    for (const metadata of socialMetadata) {
      let tag = document.querySelector<HTMLMetaElement>(metadata.selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(metadata.attribute, metadata.key);
        document.head.append(tag);
      }
      tag.content = metadata.value;
    }

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    let socialUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]',
    );
    if (siteUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      const canonicalUrl = `${siteUrl}${getCanonicalPath(page.path)}`;
      canonical.href = canonicalUrl;
      if (!socialUrl) {
        socialUrl = document.createElement("meta");
        socialUrl.setAttribute("property", "og:url");
        document.head.append(socialUrl);
      }
      socialUrl.content = canonicalUrl;
    } else {
      canonical?.remove();
      socialUrl?.remove();
    }
  }, [page]);

  return null;
}
