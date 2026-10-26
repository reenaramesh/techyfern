import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PrimaryButton } from "./Buttons";
import { MobileNavigation } from "./MobileNavigation";

const navigation: {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
}[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Services",
    to: "/services/",
    children: [
      { label: "All services", to: "/services/" },
      { label: "Website design", to: "/website-design/" },
      { label: "Digital marketing", to: "/digital-marketing/" },
      { label: "Web applications", to: "/web-app-development/" },
      { label: "Business technology", to: "/business-tech-solutions/" },
      { label: "AI & automation", to: "/ai-automation/" },
    ],
  },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const servicesDropdownRef = useRef<HTMLDetailsElement>(null);
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const servicesActive = navigation
    .find((item) => item.label === "Services")
    ?.children?.some(
      (child) => (child.to.replace(/\/+$/, "") || "/") === normalizedPath,
    );

  function closeMobileNavigation() {
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      mobileButtonRef.current?.focus();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="header-inner page-container">
        <Link
          className="brand"
          to="/"
          aria-label="Techyfern Digital home"
          onClick={closeMobileNavigation}
        >
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M8 24c0-7.2 4.5-12 12-12s12 4.8 12 12"
                stroke="currentColor"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
              <path
                d="M20 13v16M13 21h14"
                stroke="#38c7a5"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="brand-copy">
            <span className="brand-name">techyfern</span>
            <span className="brand-descriptor">DIGITAL</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) =>
            item.children ? (
              <details
                className="nav-dropdown"
                data-active={servicesActive}
                key={item.label}
                onKeyDown={(event) => {
                  if (event.key !== "Escape") return;
                  if (servicesDropdownRef.current) {
                    servicesDropdownRef.current.open = false;
                  }
                  servicesDropdownRef.current
                    ?.querySelector<HTMLElement>("summary")
                    ?.focus();
                }}
                ref={servicesDropdownRef}
              >
                <summary
                  aria-current={servicesActive ? "page" : undefined}
                  className="nav-link"
                >
                  {item.label}
                  <span aria-hidden="true" className="nav-dropdown-caret" />
                </summary>
                <div className="nav-dropdown-menu">
                  {item.children.map((child) => {
                    const isCurrent =
                      (child.to.replace(/\/+$/, "") || "/") === normalizedPath;
                    return (
                      <NavLink
                        aria-current={isCurrent ? "page" : undefined}
                        className={isCurrent ? "nav-dropdown-link-active" : undefined}
                        end
                        key={child.to}
                        to={child.to}
                      >
                      {child.label}
                      </NavLink>
                    );
                  })}
                </div>
              </details>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? " nav-link-active" : ""}`
                }
                end={item.to === "/"}
                key={item.label}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="header-actions">
          <PrimaryButton className="header-cta" to="/contact">
            Let’s talk
          </PrimaryButton>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="mobile-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            ref={mobileButtonRef}
            type="button"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <MobileNavigation
        id="mobile-navigation"
        isOpen={mobileOpen}
        onNavigate={closeMobileNavigation}
        items={navigation}
      />
    </header>
  );
}
