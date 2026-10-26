import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CTASection } from "../components/CTASection";
import { PageContainer } from "../components/PageContainer";
import { PortfolioProjectCard } from "../components/PortfolioProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { portfolioProjects, projectCategories } from "../lib/portfolioProjects";

const filters = ["All projects", ...projectCategories] as const;

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof filters)[number]>("All projects");
  const [searchTerm, setSearchTerm] = useState("");
  const visibleProjects = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    return portfolioProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All projects" || project.category === activeCategory;
      const matchesName = project.title.toLocaleLowerCase().includes(query);
      return matchesCategory && matchesName;
    });
  }, [activeCategory, searchTerm]);
  const approvedProjects = visibleProjects.filter(
    (project) => project.kind === "case-study",
  );
  const concepts = visibleProjects.filter((project) => project.kind === "concept");

  return (
    <>
      <section className="portfolio-page-hero">
        <PageContainer>
          <Breadcrumbs current="Portfolio" items={[]} />
          <SectionHeading
            as="h1"
            eyebrow="PORTFOLIO / SELECTED WORK"
            title="Selected work, with every project clearly represented."
            description="Explore original concept demonstrations and, when approved for sharing, project case studies. Each entry is labelled so illustrative work is never mistaken for client work."
          />
          <p className="portfolio-honesty-note">
            Current demonstrations use fictional sample material. No
            unsupported customer relationships, measured results or
            achievements are claimed.
          </p>
        </PageContainer>
      </section>
      <section
        aria-labelledby="portfolio-items-heading"
        className="portfolio-listing section-space"
      >
        <PageContainer>
          <div className="portfolio-listing-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2 id="portfolio-items-heading">
                Approved work and concept demonstrations.
              </h2>
            </div>
            <p>
              Approved case studies will be published only when project details
              and permission are confirmed.
            </p>
          </div>
          <div className="portfolio-controls">
            <div
              aria-label="Filter projects by category"
              className="portfolio-filters"
              role="group"
            >
              {filters.map((category) => (
                <button
                  aria-pressed={activeCategory === category}
                  className={
                    activeCategory === category
                      ? "portfolio-filter portfolio-filter-active"
                      : "portfolio-filter"
                  }
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="portfolio-search">
              <Search aria-hidden="true" size={17} />
              <span className="visually-hidden">Search by project name</span>
              <input
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                placeholder="Search projects"
                type="search"
                value={searchTerm}
              />
              {searchTerm && (
                <button
                  aria-label="Clear project search"
                  onClick={() => setSearchTerm("")}
                  type="button"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </label>
          </div>
          <p aria-live="polite" className="portfolio-result-count">
            {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "project" : "projects"} shown
          </p>
          {approvedProjects.length > 0 && (
            <section
              aria-labelledby="approved-projects-heading"
              className="portfolio-subsection"
            >
              <h3 id="approved-projects-heading">Approved case studies</h3>
              <div className="portfolio-grid">
                {approvedProjects.map((project) => (
                  <PortfolioProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          )}
          {concepts.length > 0 && (
            <section
              aria-labelledby="concept-projects-heading"
              className="portfolio-subsection"
            >
              <h3 id="concept-projects-heading">Concept Projects</h3>
              <p className="portfolio-subsection-note">
                Original illustrative demos using generic fictional sample
                material—not completed paid client work.
              </p>
              <div className="portfolio-grid">
                {concepts.map((project) => (
                  <PortfolioProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          )}
          {!visibleProjects.length && (
            <div className="portfolio-empty-state">
              <Search size={23} aria-hidden="true" />
              <h2>No projects match that search.</h2>
              <p>Try another project name or clear the current filters.</p>
              <button
                className="portfolio-reset-button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All projects");
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </PageContainer>
      </section>
      <CTASection
        eyebrow="YOUR PROJECT"
        title="Have a real business challenge to solve?"
        description="Talk with us about the context, what you need to improve and a useful way to begin."
      />
    </>
  );
}
