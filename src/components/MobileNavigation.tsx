import { ArrowUpRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

type MobileNavigationProps = {
  id: string;
  isOpen: boolean;
  onNavigate: () => void;
  items: {
    label: string;
    to: string;
    children?: { label: string; to: string }[];
  }[];
};

export function MobileNavigation({
  id,
  isOpen,
  onNavigate,
  items,
}: MobileNavigationProps) {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  function isCurrentPath(path: string) {
    return (path.replace(/\/+$/, "") || "/") === normalizedPath;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className={`mobile-navigation${isOpen ? " mobile-navigation-open" : ""}`}
      id={id}
      inert={!isOpen}
    >
      {items.map((item) =>
        item.children ? (
          <details
            className={`mobile-navigation-group${item.children.some((child) => isCurrentPath(child.to)) ? " mobile-navigation-group-active" : ""}`}
            key={item.label}
          >
            <summary
              aria-current={
                item.children.some((child) => isCurrentPath(child.to))
                  ? "page"
                  : undefined
              }
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" size={16} />
            </summary>
            <div>
              {item.children.map((child) => {
                const isCurrent = isCurrentPath(child.to);
                return (
                  <NavLink
                    aria-current={isCurrent ? "page" : undefined}
                    className={
                      isCurrent ? "mobile-navigation-link-active" : undefined
                    }
                    end
                    key={child.to}
                    onClick={onNavigate}
                    to={child.to}
                  >
                    {child.label}
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </NavLink>
                );
              })}
            </div>
          </details>
        ) : (
          <NavLink
            aria-current={isCurrentPath(item.to) ? "page" : undefined}
            className={({ isActive }) =>
              isActive ? "mobile-navigation-link-active" : undefined
            }
            end={item.to === "/"}
            key={item.label}
            onClick={onNavigate}
            to={item.to}
          >
            {item.label}
            <ArrowUpRight aria-hidden="true" size={16} />
          </NavLink>
        ),
      )}
      <NavLink className="mobile-navigation-cta" onClick={onNavigate} to="/contact">
        Discuss your project
      </NavLink>
    </nav>
  );
}
