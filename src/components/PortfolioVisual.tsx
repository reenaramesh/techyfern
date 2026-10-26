import { ArrowUpRight, Bot, CalendarDays, ChartNoAxesCombined, Globe2, LayoutDashboard, Workflow } from "lucide-react";
import type { PortfolioProject } from "../lib/portfolioProjects";

const visualIcons = {
  website: Globe2,
  dashboard: LayoutDashboard,
  booking: CalendarDays,
  campaign: ChartNoAxesCombined,
  automation: Workflow,
};

export function PortfolioVisual({
  project,
  compact = false,
}: {
  project: PortfolioProject;
  compact?: boolean;
}) {
  const Icon = visualIcons[project.visual];

  return (
    <div
      aria-hidden="true"
      className={`portfolio-visual portfolio-visual-${project.visual}${compact ? " portfolio-visual-compact" : ""}`}
    >
      <div className="portfolio-visual-window">
        <div className="portfolio-visual-toolbar">
          <span className="portfolio-window-dots"><i /><i /><i /></span>
          <span className="portfolio-window-label">CONCEPT PREVIEW</span>
          <ArrowUpRight size={14} />
        </div>
        <div className="portfolio-visual-content">
          <div className="portfolio-visual-heading">
            <span className="portfolio-visual-icon"><Icon size={17} /></span>
            <span><b>{project.title}</b><small>Illustrative interface</small></span>
          </div>
          {project.visual === "website" && (
            <div className="portfolio-website-preview">
              <span className="portfolio-mock-line portfolio-mock-line-long" />
              <span className="portfolio-mock-line" />
              <span className="portfolio-mock-button" />
              <span className="portfolio-mock-image" />
            </div>
          )}
          {project.visual === "dashboard" && (
            <div className="portfolio-dashboard-preview">
              <span /><span /><span />
              <div className="portfolio-dashboard-chart"><i /><i /><i /><i /><i /><i /></div>
            </div>
          )}
          {project.visual === "booking" && (
            <div className="portfolio-booking-preview">
              <div><span /><span /><span /><span /><span /><span /></div>
              <span className="portfolio-booking-slot" />
            </div>
          )}
          {project.visual === "campaign" && (
            <div className="portfolio-campaign-preview">
              <div className="portfolio-campaign-bars"><i /><i /><i /><i /><i /><i /><i /></div>
              <div><span /><span /><span /></div>
            </div>
          )}
          {project.visual === "automation" && (
            <div className="portfolio-automation-preview">
              <span><Bot size={13} /></span><i /><span><Workflow size={13} /></span><i /><span><ArrowUpRight size={13} /></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
