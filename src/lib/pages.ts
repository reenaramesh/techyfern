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
  title: "Contact TechyPraxis Digital | Web & Marketing Bengaluru",
  description:
    "Talk to TechyPraxis Digital in Bengaluru about website design, digital marketing, business software or automation for your business.",
  eyebrow: "Contact",
  heading: "What would you like to improve?",
  introduction:
    "Tell us what your business does and what you need help with. We’ll review your enquiry and get back to you.",
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
  title: "About TechyPraxis Digital | Web Design Bengaluru",
  description:
    "Meet TechyPraxis Digital, a Bengaluru digital services company helping businesses with website design, digital marketing and software.",
  eyebrow: "About TechyPraxis",
  heading: "Clear, practical digital support for your business.",
  introduction:
    "We help businesses improve their websites, reach customers online and make everyday work easier with useful software.",
};

export const portfolioPage: PageDefinition = {
  path: "/portfolio/",
  title: "Portfolio & Concept Projects | TechyPraxis Digital",
  description:
    "Explore concept demonstrations and approved case studies, when available, across web design, software, marketing and automation.",
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
  title: "Website Design in Bengaluru | TechyPraxis Digital",
  description:
    "Need a website, digital marketing or business software? TechyPraxis Digital helps businesses in Bengaluru choose a practical next step.",
  eyebrow: "Digital services for Bengaluru businesses",
  heading: "Website design and digital marketing for Bengaluru businesses.",
  introduction:
    "Need a better website, digital marketing or software that saves time? TechyPraxis Digital helps you find a clear, practical way forward.",
};

export const servicesOverviewPage: PageDefinition = {
  path: "/services/",
  title: "Web Design Services Bengaluru | TechyPraxis Digital",
  description:
    "Explore website design, SEO, digital marketing, custom web apps and business software for businesses in Bengaluru.",
  eyebrow: "Our services",
  heading: "What can we help your business do?",
  introduction:
    "Create a website customers can use, help more people find your business or simplify everyday tasks with software. Explore our services and find a good place to start.",
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
