import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

export function Breadcrumbs({
  current,
  items = [{ label: "Services", to: "/services/" }],
}: {
  current: string;
  items?: BreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li>
          <Link aria-label="Home" to="/">
            <Home size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.to ?? item.label}>
            <ChevronRight aria-hidden="true" size={13} />
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
        <li aria-current="page">
          <ChevronRight aria-hidden="true" size={13} />
          <span>{current}</span>
        </li>
      </ol>
    </nav>
  );
}
