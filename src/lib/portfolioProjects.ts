export const projectCategories = [
  "Website Design",
  "Web Application Development",
  "Business Software",
  "Digital Marketing",
  "AI & Automation",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

type ProjectDetails = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  industry: string;
  challenge: string;
  scope: string[];
  approach: string;
  features: string[];
  technologies: string[];
  process: string[];
  relatedServices: { label: string; to: string }[];
  visual: "website" | "dashboard" | "booking" | "campaign" | "automation";
};

export type ConceptProject = ProjectDetails & {
  kind: "concept";
  outcome: null;
};

export type ApprovedCaseStudy = ProjectDetails & {
  kind: "case-study";
  publicationApproved: true;
  outcome?: { summary: string; verified: true };
};

export type PortfolioProject = ConceptProject | ApprovedCaseStudy;

export const approvedCaseStudies: ApprovedCaseStudy[] = [];

export const conceptProjects: ConceptProject[] = [
  {
    kind: "concept",
    slug: "service-business-website",
    title: "Service Business Website",
    category: "Website Design",
    summary:
      "A concept for a clear, responsive service-business website that helps visitors understand the offer and find the next step.",
    industry: "Professional services — illustrative",
    challenge:
      "A service business needs to explain several offerings without overwhelming visitors or hiding its enquiry path.",
    scope: [
      "Information architecture for service pages",
      "Responsive page layouts and enquiry touchpoints",
      "Foundational on-page SEO and accessibility considerations",
    ],
    approach:
      "The concept groups information around visitor questions, uses clear page hierarchy and makes contact actions easy to locate across screen sizes.",
    features: [
      "Service overview and detail sections",
      "Responsive navigation and page layouts",
      "Clear contact prompts",
      "Readable, semantic content structure",
    ],
    technologies: ["React", "TypeScript", "Vite"],
    process: ["Discovery", "Content structure", "Interface design", "Build and review"],
    relatedServices: [
      { label: "Website Design & Development", to: "/website-design/" },
      { label: "Digital Marketing & SEO", to: "/digital-marketing/" },
    ],
    visual: "website",
    outcome: null,
  },
  {
    kind: "concept",
    slug: "customer-management-dashboard",
    title: "Customer Management Dashboard",
    category: "Business Software",
    summary:
      "An illustrative dashboard concept for keeping customer records, follow-ups and routine team activity together.",
    industry: "Small business operations — illustrative",
    challenge:
      "Customer information spread across separate documents can make it difficult to see recent conversations and follow-up tasks.",
    scope: [
      "Customer list and profile views",
      "Follow-up status and task summaries",
      "Dashboard layout for common operational questions",
    ],
    approach:
      "The concept presents fictional sample records in a straightforward workspace, prioritizing scanability and a manageable set of customer actions.",
    features: [
      "Searchable customer list concept",
      "Follow-up status labels",
      "Task overview panel",
      "Fictional sample records only",
    ],
    technologies: ["React", "TypeScript", "CSS"],
    process: ["Workflow discovery", "Requirements mapping", "Prototype", "Implementation planning"],
    relatedServices: [
      { label: "Business Technology Solutions", to: "/business-tech-solutions/" },
      { label: "Web Application Development", to: "/web-app-development/" },
    ],
    visual: "dashboard",
    outcome: null,
  },
  {
    kind: "concept",
    slug: "appointment-booking-application",
    title: "Appointment Booking Application",
    category: "Web Application Development",
    summary:
      "A booking-flow demonstration showing how a customer could choose a service, select a time and review a request.",
    industry: "Appointment-based services — illustrative",
    challenge:
      "Customers may need a simple way to understand service options and request an appointment without a lengthy back-and-forth.",
    scope: [
      "Service selection flow",
      "Availability and time selection interface",
      "Booking review and confirmation states",
    ],
    approach:
      "The demo maps a booking journey into small, understandable steps. Availability and booking details are illustrative and are not connected to a live calendar.",
    features: [
      "Service selection cards",
      "Calendar-style date and time choices",
      "Booking summary",
      "Clear confirmation state",
    ],
    technologies: ["React", "TypeScript", "React Router"],
    process: ["Requirements", "Journey mapping", "Interactive prototype", "Technical planning"],
    relatedServices: [
      { label: "Web Application Development", to: "/web-app-development/" },
      { label: "Business Technology Solutions", to: "/business-tech-solutions/" },
    ],
    visual: "booking",
    outcome: null,
  },
  {
    kind: "concept",
    slug: "campaign-performance-dashboard",
    title: "Campaign Performance Dashboard",
    category: "Digital Marketing",
    summary:
      "A visual reporting concept for organizing channel activity and campaign indicators in one review layout.",
    industry: "Marketing operations — illustrative",
    challenge:
      "Campaign information can be difficult to review when channel activity and measurement live in separate interfaces.",
    scope: [
      "Channel overview layout",
      "Illustrative campaign indicators",
      "Reporting and review structure",
    ],
    approach:
      "This static concept uses clearly fictional sample values to demonstrate how channel summaries could be presented. It is not connected to advertising or analytics accounts.",
    features: [
      "Channel summary cards",
      "Illustrative trend visualization",
      "Campaign status overview",
      "Fictional sample values only",
    ],
    technologies: ["React", "TypeScript", "SVG"],
    process: ["Measurement questions", "Reporting structure", "Visual concept", "Review planning"],
    relatedServices: [
      { label: "Digital Marketing & SEO", to: "/digital-marketing/" },
      { label: "Web Application Development", to: "/web-app-development/" },
    ],
    visual: "campaign",
    outcome: null,
  },
  {
    kind: "concept",
    slug: "business-workflow-automation",
    title: "Business Workflow Automation",
    category: "AI & Automation",
    summary:
      "A workflow illustration showing how an incoming request might move through review, assignment and follow-up.",
    industry: "General business operations — illustrative",
    challenge:
      "Repeated hand-offs and manual reminders can make routine processes harder to track consistently.",
    scope: [
      "Trigger and review stages",
      "Task assignment and notification concept",
      "Human review points in the workflow",
    ],
    approach:
      "The concept separates repeatable administrative steps from decisions that need human judgment. No live automation or AI service is connected.",
    features: [
      "Request intake stage",
      "Review and routing steps",
      "Human approval checkpoint",
      "Follow-up task concept",
    ],
    technologies: ["Workflow mapping", "React", "TypeScript"],
    process: ["Process review", "Automation suitability", "Workflow design", "Testing plan"],
    relatedServices: [
      { label: "AI & Business Automation", to: "/ai-automation/" },
      { label: "Business Technology Solutions", to: "/business-tech-solutions/" },
    ],
    visual: "automation",
    outcome: null,
  },
];

export const portfolioProjects: PortfolioProject[] = [
  ...approvedCaseStudies,
  ...conceptProjects,
];

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}
