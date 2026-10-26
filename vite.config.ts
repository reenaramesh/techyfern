import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const githubRepositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
if (isGitHubActions && !githubRepositoryName) {
  throw new Error("GITHUB_REPOSITORY must identify the GitHub Pages repository.");
}

const prerenderedRoutes = new Set([
  "/about",
  "/portfolio",
  "/our-process",
  "/contact",
  "/request-quote",
  "/privacy",
  "/services",
  "/website-design",
  "/digital-marketing",
  "/web-app-development",
  "/business-tech-solutions",
  "/ai-automation",
  "/services/website-design",
  "/services/web-applications",
  "/services/digital-marketing",
  "/services/business-technology",
  "/services/ai-automation",
]);

const previewPrerenderedRoutes = {
  name: "preview-prerendered-routes",
  configurePreviewServer(server: {
    middlewares: {
      use: (
        middleware: (
          request: { url?: string },
          response: unknown,
          next: () => void,
        ) => void,
      ) => void;
    };
  }) {
    server.middlewares.use((request, _response, next) => {
      if (!request.url) {
        next();
        return;
      }

      const separator = request.url.indexOf("?");
      const pathname =
        separator === -1 ? request.url : request.url.slice(0, separator);
      const isProjectRoute =
        pathname.startsWith("/portfolio/") &&
        pathname.slice("/portfolio/".length).length > 0 &&
        !pathname.slice("/portfolio/".length).includes("/");
      if (prerenderedRoutes.has(pathname) || isProjectRoute) {
        const query = separator === -1 ? "" : request.url.slice(separator);
        request.url = `${pathname}/${query}`;
      }
      next();
    });
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    base: isGitHubActions ? `/${githubRepositoryName}/` : "/",
    plugins: [react(), tailwindcss(), previewPrerenderedRoutes],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://127.0.0.1:8000",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
