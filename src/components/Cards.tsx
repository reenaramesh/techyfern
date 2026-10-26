import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  to: string;
};

export function ServiceCard({
  icon: Icon,
  number,
  title,
  description,
  to,
}: ServiceCardProps) {
  return (
    <Link className="service-card" to={to}>
      <div className="service-card-top">
        <span className="icon-tile">
          <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
        </span>
        <span className="card-number">{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-link">
        Explore service <ArrowUpRight aria-hidden="true" size={16} />
      </span>
    </Link>
  );
}

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <article className={`feature-card ${className}`.trim()}>
      <span className="icon-tile icon-tile-soft">
        <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
