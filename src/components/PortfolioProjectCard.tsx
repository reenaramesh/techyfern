import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortfolioProject } from "../lib/portfolioProjects";
import { PortfolioVisual } from "./PortfolioVisual";

export function PortfolioProjectCard({
  project,
  compact = false,
}: {
  project: PortfolioProject;
  compact?: boolean;
}) {
  const isConcept = project.kind === "concept";
  const projectLabel = isConcept ? "concept demonstration" : "case study";

  return (
    <article className={`portfolio-card${compact ? " portfolio-card-compact" : ""}`}>
      <Link
        aria-label={`View ${project.title} ${projectLabel}`}
        className="portfolio-card-visual-link"
        to={`/portfolio/${project.slug}/`}
      >
        <PortfolioVisual compact={compact} project={project} />
      </Link>
      <div className="portfolio-card-copy">
        <div className="portfolio-card-meta">
          <span>{project.category}</span>
          <span className="concept-label">{isConcept ? "Concept demonstration" : "Approved case study"}</span>
        </div>
        <h2><Link to={`/portfolio/${project.slug}/`}>{project.title}</Link></h2>
        <p>{project.summary}</p>
        {project.technologies.length > 0 && (
          <ul aria-label="Technologies shown" className="portfolio-tags">
            {project.technologies.slice(0, compact ? 2 : 3).map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}
        <Link className="portfolio-card-link" to={`/portfolio/${project.slug}/`}>
          View {isConcept ? "details" : "case study"} <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
