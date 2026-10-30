import { getServiceByPath } from "./serviceContent";
import { getPortfolioProject } from "./portfolioProjects";

export type PageDefinition = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  noIndex?: boolean;
};

export const futurePages: PageDefinition[] = [];

export const contactPage: PageDefinition = {
  path: "/contact/",
  title: "Contact TechyPraxis Digital | Discuss Your Project",
  description:
    "Contact TechyPraxis Digital in Bengaluru to discuss website, marketing, software or automation requirements.",
  eyebrow: "Contact",
  heading: "Tell us what you would like to make easier.",
  introduction:
    "Share a little about your business and the digital challenge you are working through. We’ll use the details to review and respond to your enquiry.",
};

export const quotationPage: PageDefinition = {
  path: "/request-quote/",
  title: "Request a Project Consultation | TechyPraxis Digital",
  description:
    "Share your project requirements, service category, budget range and expected timeline with TechyPraxis Digital.",
  eyebrow: "Project consultation",
  heading: "Help us understand the shape of your project.",
  introduction:
    "Share the service, requirements, budget range and timeline you have in mind. We’ll review the context before discussing a suitable scope.",
  noIndex: true,
};

export const privacyPage: PageDefinition = {
  path: "/privacy/",
  title: "Privacy Notice | TechyPraxis Digital",
  description:
    "Learn what information TechyPraxis Digital collects through project enquiry forms and how it is used and protected.",
  eyebrow: "Privacy notice",
  heading: "Clear information about enquiry data.",
  introduction:
    "This notice describes information collected through the TechyPraxis Digital contact and consultation forms. It is operational information and must be reviewed before production launch.",
  noIndex: true,
};

export const aboutPage: PageDefinition = {
  path: "/about/",
  title: "About TechyPraxis Digital | Practical Digital Solutions",
  description:
    "Learn how TechyPraxis Digital brings website design, software engineering and digital marketing together to solve practical business challenges.",
  eyebrow: "About TechyPraxis",
  heading: "Build a stronger digital foundation, with purpose.",
  introduction:
    "TechyPraxis Digital brings together creative website design, software engineering and digital marketing to help businesses build stronger digital foundations and grow.",
};

export const portfolioPage: PageDefinition = {
  path: "/portfolio/",
  title: "Portfolio & Concept Projects | TechyPraxis Digital",
  description:
    "Explore approved TechyPraxis Digital case studies when available and clearly labelled concept demonstrations across web design, software, marketing and automation.",
  eyebrow: "Portfolio",
  heading: "Selected work, with every project clearly represented.",
  introduction:
    "Explore original concept demonstrations and, when approved for sharing, project case studies. Each entry is clearly identified so illustrative work is never mistaken for client work.",
};

export const processPage: PageDefinition = {
  path: "/our-process/",
  title: "Our Project Process | TechyPraxis Digital",
  description:
    "Understand how TechyPraxis Digital approaches discovery, planning, design, development, testing, launch and ongoing improvement.",
  eyebrow: "Our process",
  heading: "A clear process, shaped around your project.",
  introduction:
    "Good work starts with understanding the business need. We make scope, decisions and review points clear as a project moves from early questions toward implementation.",
};

export const notFoundPage: PageDefinition = {
  path: "/404/",
  title: "Page Not Found | TechyPraxis Digital",
  description: "The requested TechyPraxis Digital page could not be found.",
  eyebrow: "404 / PAGE NOT FOUND",
  heading: "This page isn’t here.",
  introduction: "The link may be out of date, or the page may have moved.",
  noIndex: true,
};

export const homePage: PageDefinition = {
  path: "/",
  title: "TechyPraxis Digital | Growing Ideas Through Technology",
  description:
    "TechyPraxis Digital helps businesses build, connect and grow through websites, digital marketing, business software and automation.",
  eyebrow: "Digital made purposeful",
  heading: "Smart Digital Solutions for Growing Businesses.",
  introduction:
    "From professional websites and custom business applications to digital marketing and intelligent automation, TechyPraxis Digital helps businesses build, connect and grow.",
};

export const servicesOverviewPage: PageDefinition = {
  path: "/services/",
  title: "Digital Services for Growing Businesses | TechyPraxis Digital",
  description:
    "Explore website development, digital marketing, business software, web applications and AI automation services from TechyPraxis Digital.",
  eyebrow: "Our services",
  heading: "The right digital support for your next step.",
  introduction:
    "Build a stronger online presence, reach the right audience or make everyday work easier. Explore connected services shaped around the needs of your business.",
};

export function getPageDefinition(pathname: string): PageDefinition {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/services") return servicesOverviewPage;
  const service = getServiceByPath(path);
  if (service) return service;
  if (path === "/about") return aboutPage;
  if (path === "/portfolio") return portfolioPage;
  if (path === "/our-process") return processPage;
  if (path === "/contact") return contactPage;
  if (path === "/request-quote") return quotationPage;
  if (path === "/privacy") return privacyPage;
  if (path === "/") return homePage;
  if (path.startsWith("/portfolio/")) {
    const project = getPortfolioProject(path.slice("/portfolio/".length));
    if (project) {
      return {
        path: `/portfolio/${project.slug}/`,
        title: `${project.title} ${project.kind === "concept" ? "Concept Project" : "Case Study"} | TechyPraxis Digital`,
        description: project.summary,
        eyebrow: project.kind === "concept" ? "Concept project" : "Case study",
        heading: project.title,
        introduction: project.summary,
        noIndex: project.kind === "concept",
      };
    }
  }
  return futurePages.find((page) => page.path === path) ?? notFoundPage;
}

export function getCanonicalPath(path: string): string {
  return path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
}
