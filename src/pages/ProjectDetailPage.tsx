import { ArrowRight, Check, CircleHelp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CTASection } from "../components/CTASection";
import { PageContainer } from "../components/PageContainer";
import { PortfolioProjectCard } from "../components/PortfolioProjectCard";
import { PortfolioVisual } from "../components/PortfolioVisual";
import { SectionHeading } from "../components/SectionHeading";
import {
  getPortfolioProject,
  portfolioProjects,
} from "../lib/portfolioProjects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getPortfolioProject(slug) : undefined;

  if (!project) {
    return (
      <section className="project-not-found section-space">
        <PageContainer>
          <Breadcrumbs current="Project not found" items={[{ label: "Portfolio", to: "/portfolio/" }]} />
          <SectionHeading
            as="h1"
            eyebrow="PORTFOLIO"
            title="This project page is unavailable."
            description="The link may be out of date. Browse the portfolio to see available project pages."
          />
          <Link className="text-link" to="/portfolio/">
            Browse portfolio <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </PageContainer>
      </section>
    );
  }

  const isConcept = project.kind === "concept";
  const relatedProjects = portfolioProjects.filter(
    (candidate) =>
      candidate.slug !== project.slug && candidate.category === project.category,
  );

  return (
    <>
      <section className="project-detail-hero">
        <PageContainer>
          <Breadcrumbs current={project.title} items={[{ label: "Portfolio", to: "/portfolio/" }]} />
          <div className="project-detail-layout">
            <div className="project-detail-copy">
              <span className="concept-label concept-label-prominent">
                {isConcept ? "CONCEPT DEMONSTRATION · NOT CLIENT WORK" : "APPROVED CASE STUDY"}
              </span>
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
              <Link className="text-link" to="/contact">
                Discuss a similar challenge <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <PortfolioVisual project={project} />
          </div>
        </PageContainer>
      </section>

      <section className="project-detail-content section-space">
        <PageContainer>
          {isConcept && (
            <div className="project-detail-banner">
              <CircleHelp size={20} aria-hidden="true" />
              <p>
                This is an original concept demonstration using fictional
                illustrative material. It is not a completed paid project,
                does not represent a real customer, and has no measured
                business outcomes.
              </p>
            </div>
          )}
          <div className="project-information-grid">
            <article className="project-information-main">
              <SectionHeading
                eyebrow="THE BUSINESS CHALLENGE"
                title="Start with the situation, not the technology."
                description={project.challenge}
              />
              <div className="project-detail-section">
                <h2>Project scope</h2>
                <ul className="project-check-list">
                  {project.scope.map((item) => <li key={item}><Check size={16} />{item}</li>)}
                </ul>
              </div>
              <div className="project-detail-section">
                <h2>Solution approach</h2>
                <p>{project.approach}</p>
              </div>
              <div className="project-detail-section">
                <h2>Key features</h2>
                <ul className="project-check-list">
                  {project.features.map((item) => <li key={item}><Check size={16} />{item}</li>)}
                </ul>
              </div>
              <div className="project-detail-section">
                <h2>Development process</h2>
                <ol className="project-process-list">
                  {project.process.map((item, index) => (
                    <li key={item}><span>0{index + 1}</span>{item}</li>
                  ))}
                </ol>
              </div>
              <div className="project-detail-section">
                <h2>Outcomes</h2>
                <p>
                  {project.kind === "concept"
                    ? "No measured outcomes are available or claimed for this concept demonstration."
                    : project.outcome?.summary ??
                      "No verified outcomes are published for this case study."}
                </p>
              </div>
            </article>
            <aside className="project-detail-sidebar">
              <div className="project-fact-card">
                <span>INDUSTRY CONTEXT</span>
                <p>{project.industry}</p>
                <span>SERVICE CATEGORY</span>
                <p>{project.category}</p>
                <span>PROJECT STATUS</span>
                <p><b>{isConcept ? "Concept demonstration" : "Approved case study"}</b></p>
                <span>TECHNOLOGIES SHOWN</span>
                <ul className="portfolio-tags">
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
              <div className="project-related-card">
                <h2>Related services</h2>
                {project.relatedServices.map((service) => (
                  <Link key={service.to} to={service.to}>
                    {service.label}<ArrowRight size={15} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>

      {relatedProjects.length > 0 && (
        <section className="related-projects-section section-space">
          <PageContainer>
            <SectionHeading
              eyebrow="RELATED PROJECTS"
              title="Explore another direction."
              description="Browse other illustrative ideas from the concept collection."
            />
            <div className="portfolio-grid related-projects-grid">
              {relatedProjects.map((relatedProject) => (
                <PortfolioProjectCard key={relatedProject.slug} project={relatedProject} />
              ))}
            </div>
          </PageContainer>
        </section>
      )}
      <CTASection
        eyebrow="A REAL BUSINESS CHALLENGE"
        title="Let’s discuss what would work for your business."
        description="A useful solution starts with your requirements, people and constraints—not a preselected feature list."
      />
    </>
  );
}
