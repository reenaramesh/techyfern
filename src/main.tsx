import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The application root element was not found.");
}

const application = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const prerenderedPath = document
  .querySelector<HTMLMetaElement>('meta[name="prerendered-path"]')
  ?.content.replace(/\/+$/, "") || "/";
const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

if (rootElement.firstElementChild && prerenderedPath === currentPath) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
