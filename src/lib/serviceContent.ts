import {
  Accessibility,
  Activity,
  AppWindow,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Code2,
  Compass,
  FileText,
  Gauge,
  Globe2,
  Layers3,
  Megaphone,
  MonitorSmartphone,
  Network,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { PageDefinition } from "./pages";

export type ServiceFaq = { question: string; answer: string };
export type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};
export type ServiceSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
  variant?: "soft" | "dark" | "split";
};

export type DetailedService = PageDefinition & {
  shortName: string;
  icon: LucideIcon;
  visualLabel: string;
  visualMetrics: { label: string; value: string; icon: LucideIcon }[];
  challenges: string[];
  offerings: ServiceItem[];
  sections: ServiceSection[];
  process: { title: string; description: string }[];
  faqs: ServiceFaq[];
  related: string[];
  benefitTitle: string;
  benefitDescription: string;
  benefits: string[];
};

export const serviceGroups = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "A responsive, considered website that earns trust, answers real customer questions and makes the next step clear.",
    icon: Globe2,
    to: "/website-design/",
    highlights: ["Business and corporate websites", "WordPress and React", "E-commerce and landing pages"],
    benefit: "Give customers a clearer, more useful experience of your business.",
  },
  {
    number: "02",
    title: "Digital Marketing & Business Growth",
    description:
      "Bring organic search, local visibility, paid campaigns and useful measurement together around your business goals.",
    icon: ChartNoAxesCombined,
    to: "/digital-marketing/",
    highlights: ["SEO and local SEO", "Google and social advertising", "Analytics and reporting"],
    benefit: "Understand where attention comes from and make informed improvements.",
  },
  {
    number: "03",
    title: "Business Technology & Software Solutions",
    description:
      "Make day-to-day business tasks easier to manage with connected workflows and software designed around your operations.",
    icon: Settings2,
    to: "/business-tech-solutions/",
    highlights: ["Customer and business management", "Billing, inventory and workflows", "Dashboards and automation"],
    benefit: "Spend less time coordinating information across disconnected processes.",
  },
];

export const specialistServices = [
  {
    title: "Web Application Development",
    description:
      "Custom portals, platforms and dashboards for customer-facing products or internal workflows.",
    icon: AppWindow,
    to: "/web-app-development/",
  },
  {
    title: "AI & Business Automation",
    description:
      "Thoughtful AI integrations and automation for suitable, repeatable business tasks.",
    icon: Bot,
    to: "/ai-automation/",
  },
];

export const legacyServiceRedirects = [
  { path: "/services/website-design", to: "/website-design/", servicePath: "/website-design/" },
  { path: "/services/web-applications", to: "/web-app-development/", servicePath: "/web-app-development/" },
  { path: "/services/digital-marketing", to: "/digital-marketing/", servicePath: "/digital-marketing/" },
  { path: "/services/business-technology", to: "/business-tech-solutions/", servicePath: "/business-tech-solutions/" },
  { path: "/services/ai-automation", to: "/ai-automation/", servicePath: "/ai-automation/" },
];

export const detailedServices: DetailedService[] = [
  {
    path: "/website-design/",
    shortName: "Website design",
    title: "Website Design & Development | Techyfern Digital",
    description:
      "Plan and build responsive business websites, corporate sites, WordPress and React websites, e-commerce stores and landing pages with Techyfern Digital.",
    eyebrow: "Website design & development",
    heading: "A website that makes your business easier to choose.",
    introduction:
      "Your website often shapes a customer’s first impression. We create clear, responsive digital experiences that explain what you do, work smoothly across devices and help visitors take a useful next step.",
    icon: MonitorSmartphone,
    visualLabel: "A clearer digital front door",
    visualMetrics: [
      { label: "Experience", value: "Customer-first", icon: Accessibility },
      { label: "Layout", value: "Responsive", icon: MonitorSmartphone },
      { label: "Structure", value: "Purpose-led", icon: Layers3 },
    ],
    challenges: [
      "Visitors cannot quickly understand your services or what makes them relevant.",
      "An older or difficult-to-use site creates friction on phones and smaller screens.",
      "Important information and enquiries are hard to find or act on.",
    ],
    offerings: [
      { title: "Business websites", description: "Clear, multi-page websites for startups, SMEs and established businesses.", icon: Building2 },
      { title: "Corporate websites", description: "Structured company websites for communicating services, teams and business information.", icon: BriefcaseBusiness },
      { title: "WordPress websites", description: "Editable websites using WordPress where a content-management workflow fits your needs.", icon: Globe2 },
      { title: "React websites", description: "Interactive, component-based websites for tailored digital experiences.", icon: Code2 },
      { title: "E-commerce websites", description: "Product and store experiences that help customers browse and understand purchase steps.", icon: ShoppingBag },
      { title: "Landing pages", description: "Focused pages that explain a specific offer, campaign or service and guide the next action.", icon: FileText },
      { title: "Redesign and improvement", description: "A considered refresh of an existing site’s structure, visual language or user experience.", icon: Sparkles },
      { title: "Speed optimization and maintenance", description: "Review loading performance, plan speed improvements and provide practical site care based on an agreed scope.", icon: Gauge },
    ],
    sections: [
      {
        eyebrow: "Website types",
        title: "A format suited to what you need to communicate.",
        description:
          "Start with the purpose of the site and the people who will use it. The structure and technology should follow from there.",
        items: [
          { title: "Company and corporate sites", description: "Present your business, services and essential information in a consistent structure.", icon: Building2 },
          { title: "Online stores", description: "Organize product information and shopping journeys so customers can make informed choices.", icon: ShoppingBag },
          { title: "Campaign landing pages", description: "Keep attention on a particular service, campaign or enquiry action.", icon: FileText },
          { title: "Editorial and content sites", description: "Make it easier to publish and maintain useful articles, updates or resources.", icon: Globe2 },
        ],
      },
      {
        eyebrow: "Features & deliverables",
        title: "Useful details that support trust and usability.",
        description:
          "The final scope depends on your goals. A project may include the foundations that make a site easier to navigate, use and maintain.",
        variant: "soft",
        items: [
          { title: "Mobile-responsive layouts", description: "Layouts designed to adapt across phone, tablet and desktop screens.", icon: MonitorSmartphone },
          { title: "Clear page structure", description: "Navigation and content hierarchy that help visitors find information.", icon: Layers3 },
          { title: "Enquiry pathways", description: "Visible calls to action and contact links placed where they make sense.", icon: Activity },
          { title: "Speed and quality checks", description: "Practical checks for page loading, links, content and common screen sizes.", icon: Gauge },
        ],
      },
      {
        eyebrow: "Technologies",
        title: "Choose a platform that fits your team and website.",
        description:
          "We can discuss WordPress for familiar content editing, React for custom interactive frontends, and suitable commerce or hosting tools based on project requirements.",
        variant: "split",
        items: [
          { title: "WordPress", description: "A content-management option for teams that need to update pages and articles.", icon: Globe2 },
          { title: "React", description: "A flexible frontend foundation for interactive, component-based experiences.", icon: Code2 },
          { title: "E-commerce platforms", description: "Store tooling selected around products, operations and customer needs.", icon: ShoppingBag },
          { title: "Hosting and integrations", description: "Connect the site with approved hosting, analytics and business tools.", icon: Network },
        ],
      },
    ],
    process: [
      { title: "Understand", description: "Discuss your audience, business goals, content and current website." },
      { title: "Plan", description: "Agree the page structure, key user journeys, scope and platform." },
      { title: "Design & build", description: "Create responsive layouts and implement the agreed pages and features." },
      { title: "Review & launch", description: "Check content, links and screen sizes, then prepare the static or hosted release." },
    ],
    faqs: [
      { question: "What types of websites can you build?", answer: "Projects can include business and corporate websites, WordPress or React sites, e-commerce experiences and campaign landing pages. The right format depends on the goals, content and workflows involved." },
      { question: "Will my website work on mobile phones?", answer: "Responsive design is part of the approach. Layouts and interactions are considered across phone, tablet and desktop widths and checked during review." },
      { question: "Can you improve an existing website?", answer: "Yes. We can review an existing site and discuss redesign, content structure, usability, speed or maintenance needs before agreeing a suitable scope." },
      { question: "Do you guarantee more leads or sales?", answer: "No. A clear and usable website can support customer confidence and make enquiry steps easier, but outcomes depend on many factors and are not guaranteed." },
    ],
    related: ["/digital-marketing/", "/web-app-development/", "/business-tech-solutions/"],
    benefitTitle: "A professional website helps people feel confident taking the next step.",
    benefitDescription:
      "Clear information, considered design and dependable usability make it easier for customers to understand your offer, use the site and decide whether to get in touch.",
    benefits: ["Build trust with consistent, helpful information.", "Make important pages and actions easier to find.", "Support a smoother experience across mobile and desktop.", "Create a foundation for future content and digital activity."],
  },
  {
    path: "/digital-marketing/",
    shortName: "Digital marketing",
    title: "Digital Marketing & SEO Services | Techyfern Digital",
    description:
      "Explore SEO, local SEO, Google Ads, social media campaigns, conversion improvement, analytics and reporting for growing businesses.",
    eyebrow: "Digital marketing & business growth",
    heading: "Help the right people find and understand your business.",
    introduction:
      "Digital marketing works best when the audience, message and measurement make sense together. We help businesses plan organic search improvements and paid campaigns, then review what the available data can tell us.",
    icon: Megaphone,
    visualLabel: "Visibility with a plan",
    visualMetrics: [
      { label: "Discovery", value: "Search & local", icon: Search },
      { label: "Campaigns", value: "Organic + paid", icon: Megaphone },
      { label: "Learning", value: "Measured", icon: ChartNoAxesCombined },
    ],
    challenges: [
      "Potential customers have difficulty finding accurate information about your business.",
      "Marketing activity is happening without a clear connection to business priorities.",
      "Reports show numbers but do not make the next decision easier.",
    ],
    offerings: [
      { title: "Search engine optimization", description: "Improve technical, on-page and content foundations for relevant organic discovery.", icon: Search },
      { title: "Local SEO", description: "Strengthen location-relevant information and local search signals.", icon: Globe2 },
      { title: "Google Business Profile optimization", description: "Review business profile information, categories, services and customer-facing details.", icon: Building2 },
      { title: "Google Ads", description: "Plan and manage search or other suitable Google advertising campaigns.", icon: ChartNoAxesCombined },
      { title: "Facebook & Instagram Ads", description: "Build paid social campaigns around defined audiences, creative and objectives.", icon: Megaphone },
      { title: "Social media marketing", description: "Plan practical content and publishing activity suited to your business and channels.", icon: Network },
      { title: "Content marketing & conversion optimization", description: "Create helpful content and review pages or journeys where visitors may need clarity.", icon: FileText },
      { title: "Analytics and campaign reporting", description: "Use GA4, Search Console and Tag Manager where appropriate to review activity.", icon: Activity },
    ],
    sections: [
      {
        eyebrow: "Organic and paid",
        title: "Two different ways to build visibility.",
        description:
          "Organic work improves the usefulness and discoverability of your digital presence over time. Paid advertising buys placements or reach for a defined campaign while it is active. They can complement each other, but they have different timelines, costs and measures.",
        items: [
          { title: "Organic search", description: "SEO, local information and useful content build a foundation that can develop over time; visibility is not instant or guaranteed.", icon: Search },
          { title: "Paid advertising", description: "Google, Facebook or Instagram campaigns can reach selected audiences while budgets are active; results depend on offer, targeting and market conditions.", icon: Megaphone },
          { title: "Conversion experience", description: "A clear landing page and enquiry journey help visitors understand the offer after they arrive.", icon: Activity },
          { title: "Measurement", description: "Analytics help interpret activity, but tracking quality and privacy choices affect what can be measured.", icon: ChartNoAxesCombined },
        ],
      },
      {
        eyebrow: "What you receive",
        title: "A planned, understandable campaign approach.",
        description:
          "Deliverables are agreed to suit your needs. They can include a channel review, campaign structure, content or landing page recommendations, tracking checks and a regular summary of activity.",
        variant: "soft",
        items: [
          { title: "Campaign plan", description: "Audience, objective, channel and message mapped before activity begins.", icon: Compass },
          { title: "Search foundations", description: "Recommendations for local presence, site content and organic search priorities.", icon: Search },
          { title: "Measurement setup", description: "Review or configuration of GA4, Search Console and Tag Manager as access allows.", icon: Settings2 },
          { title: "Performance review", description: "Reporting that describes what was measured, what changed and possible next steps.", icon: FileText },
        ],
      },
      {
        eyebrow: "Measurement & reporting",
        title: "Use evidence to guide the next decision.",
        description:
          "We agree meaningful measures before launch, confirm what tracking can capture and review results in context. Reporting is for learning and decisions—not a promise of rankings, leads or advertising returns.",
        variant: "split",
        items: [
          { title: "Google Analytics 4", description: "Review configured website interactions and campaign activity.", icon: Activity },
          { title: "Search Console", description: "Understand search queries, indexing signals and site search performance.", icon: Search },
          { title: "Tag Manager", description: "Manage approved measurement tags with careful testing and documentation.", icon: Settings2 },
          { title: "Campaign reports", description: "Summarize spend, reach, visits or other agreed metrics with their limitations.", icon: ChartNoAxesCombined },
        ],
      },
    ],
    process: [
      { title: "Discover", description: "Understand the business, audience, offer, current channels and constraints." },
      { title: "Plan", description: "Set a practical channel plan, campaign scope, budget considerations and measures." },
      { title: "Set up & launch", description: "Prepare content, destination pages, approved tracking and campaign settings." },
      { title: "Measure & refine", description: "Review available data, explain findings and agree sensible adjustments." },
    ],
    faqs: [
      { question: "How soon will SEO show results?", answer: "SEO is an ongoing process and timing varies with competition, site condition, content and other factors. We can set priorities and review progress, but cannot guarantee ranking positions or a fixed timeline." },
      { question: "Is paid advertising the same as SEO?", answer: "No. SEO focuses on organic search visibility and useful site foundations. Paid advertising uses a budget to place campaigns in selected channels while they run. They have different costs, timelines and reporting." },
      { question: "Can you promise a specific number of leads or sales?", answer: "No. Audience response, competition, budget, offer, tracking and many external factors influence outcomes. Reporting helps assess activity without promising a particular return." },
      { question: "Which measurement tools can be used?", answer: "Google Analytics 4, Search Console and Tag Manager can be reviewed or configured where appropriate and where access and privacy requirements permit. Data quality depends on correct setup and consent choices." },
    ],
    related: ["/website-design/", "/business-tech-solutions/", "/ai-automation/"],
    benefitTitle: "Make marketing decisions with a clearer view of activity.",
    benefitDescription:
      "A focused plan connects your audience and channels to business priorities. Thoughtful measurement helps explain what is visible in the data and where to investigate next.",
    benefits: ["Understand how organic and paid channels differ.", "Keep business listings and search foundations accurate.", "Connect campaigns to appropriate landing experiences.", "Review measures and limitations before drawing conclusions."],
  },
  {
    path: "/web-app-development/",
    shortName: "Web applications",
    title: "Web Application Development | Techyfern Digital",
    description:
      "Plan custom web applications, SaaS platforms, portals, booking systems, dashboards, API integrations and business applications with Techyfern Digital.",
    eyebrow: "Web application development",
    heading: "Software shaped around the way people need to work.",
    introduction:
      "When standard tools do not fit a workflow or product idea, a web application can bring the right tasks and information together. We start with requirements and users, then plan an approach through build, testing and deployment.",
    icon: AppWindow,
    visualLabel: "One useful workflow at a time",
    visualMetrics: [
      { label: "Product", value: "Purpose-built", icon: AppWindow },
      { label: "Experience", value: "Role-aware", icon: Network },
      { label: "Delivery", value: "Step-by-step", icon: Workflow },
    ],
    challenges: [
      "Teams rely on disconnected spreadsheets or repeated manual updates.",
      "Customers need a more convenient way to book, track or manage information.",
      "A digital product idea needs a defined first release before it is built.",
    ],
    offerings: [
      { title: "Custom web applications", description: "Browser-based tools for defined business or customer workflows.", icon: Code2 },
      { title: "SaaS platforms", description: "Product foundations for subscription or multi-user software concepts.", icon: Layers3 },
      { title: "Customer and employee portals", description: "Secure, role-aware spaces for the information and tasks users need.", icon: Network },
      { title: "Booking platforms", description: "Scheduling journeys for customers, teams or service providers.", icon: Activity },
      { title: "Management dashboards", description: "Views that bring selected operational information into one place.", icon: ChartNoAxesCombined },
      { title: "API and database applications", description: "Connect application interfaces with data and approved external services.", icon: Settings2 },
      { title: "React frontend development", description: "Interactive interfaces with reusable components and clear states.", icon: Code2 },
      { title: "Backend application development", description: "Application logic and service integrations planned to meet project requirements.", icon: Workflow },
    ],
    sections: [
      {
        eyebrow: "From workflow to product",
        title: "Start with the task—not the feature list.",
        description:
          "Understanding who uses the application and what they need to complete helps define a focused first release and avoids building complexity without a clear purpose.",
        items: [
          { title: "Clarify users and roles", description: "Identify who uses the system and the information each role should access.", icon: Network },
          { title: "Map the key journey", description: "Describe the task from start to completion and where handoffs occur.", icon: Workflow },
          { title: "Prioritize a first release", description: "Separate essential workflows from ideas that can wait for later review.", icon: Layers3 },
          { title: "Plan data and integrations", description: "Agree what information is needed and which approved systems must connect.", icon: Settings2 },
        ],
      },
      {
        eyebrow: "Complete delivery workflow",
        title: "A considered path from requirements to release.",
        description:
          "Each stage is reviewed with you. Scope, security, hosting and support expectations are made explicit before implementation.",
        variant: "soft",
        items: [
          { title: "Requirements", description: "Document users, business rules, information and constraints.", icon: FileText },
          { title: "Experience and architecture", description: "Plan interface flows, data boundaries and technical direction.", icon: Compass },
          { title: "Build and integration", description: "Implement the agreed features and connect approved APIs or services.", icon: Code2 },
          { title: "Test and deploy", description: "Review key flows and prepare a deployment and ongoing support plan.", icon: ShieldCheck },
        ],
      },
    ],
    process: [
      { title: "Requirements", description: "Map users, workflows, rules, data and project constraints." },
      { title: "Product plan", description: "Agree the first-release scope, experience and technical approach." },
      { title: "Build & test", description: "Develop features in reviewed stages and test the important user journeys." },
      { title: "Deploy & support", description: "Prepare the release and define monitoring, maintenance and next-step support." },
    ],
    faqs: [
      { question: "When is a custom web application useful?", answer: "It can be useful when a repeated workflow, customer task or product requirement is not served well by existing tools. Discovery helps determine whether custom development is appropriate." },
      { question: "Can an application connect to existing tools?", answer: "Potentially, when the relevant service provides a suitable API or integration method and access is approved. Integration scope and limitations are assessed during planning." },
      { question: "Do you build the backend as well as the interface?", answer: "Projects can include frontend and backend work depending on scope. Data, hosting, security and maintenance responsibilities should be agreed before implementation." },
      { question: "What happens after launch?", answer: "Ongoing support can be scoped around the application's hosting, updates, monitoring and future changes. The support arrangement is agreed as part of the project." },
    ],
    related: ["/business-tech-solutions/", "/ai-automation/", "/website-design/"],
    benefitTitle: "Make a complex workflow easier to follow.",
    benefitDescription:
      "A well-scoped application can give users a clearer path through a task and bring relevant information together, while keeping technical and operational responsibilities visible.",
    benefits: ["Give users interfaces shaped around their tasks.", "Reduce repeated coordination across agreed workflows.", "Connect selected data and systems where integration is suitable.", "Plan an initial release that can be reviewed before expanding."],
  },
  {
    path: "/business-tech-solutions/",
    shortName: "Business technology",
    title: "Business Technology & Software Solutions | Techyfern Digital",
    description:
      "Explore practical CRM, business management, billing, attendance, inventory, vendor, task and reporting software solutions for growing businesses.",
    eyebrow: "Business technology & software",
    heading: "Make everyday business work easier to manage.",
    introduction:
      "As a business grows, information can become scattered across messages, spreadsheets and separate tools. We help identify the process that needs attention and explore a practical system or workflow to support it.",
    icon: Settings2,
    visualLabel: "Operations, made more connected",
    visualMetrics: [
      { label: "Information", value: "In context", icon: Layers3 },
      { label: "Workflows", value: "Less friction", icon: Workflow },
      { label: "Visibility", value: "Useful views", icon: ChartNoAxesCombined },
    ],
    challenges: [
      "Customer and work details are recorded in multiple places.",
      "Staff repeat updates or chase status across teams and suppliers.",
      "Owners need a clearer view of workload, stock or outstanding work.",
    ],
    offerings: [
      { title: "Custom CRM", description: "Organize customer details, conversations and follow-up activities.", icon: Network },
      { title: "ERP-style business management", description: "Bring selected business records and workflows into a shared system.", icon: BriefcaseBusiness },
      { title: "Billing and invoicing", description: "Support consistent preparation and tracking of billing documents.", icon: FileText },
      { title: "Employee attendance & payroll workflows", description: "Coordinate attendance records and payroll preparation steps; statutory calculations require appropriate review.", icon: Activity },
      { title: "Inventory management", description: "Track selected stock information, movements and operational status.", icon: ShoppingBag },
      { title: "Quotations and estimations", description: "Create a structured way to prepare, review and follow up on estimates.", icon: FileText },
      { title: "Contractor and vendor management", description: "Keep supplier details, assignments and follow-up information accessible.", icon: Building2 },
      { title: "Customer and task management", description: "Coordinate customer requests, responsibilities and task status.", icon: Workflow },
      { title: "Reporting dashboards", description: "Summarize selected business information to support day-to-day decisions.", icon: ChartNoAxesCombined },
      { title: "Process automation", description: "Reduce repetitive handoffs where a reliable, reviewable workflow can be defined.", icon: Bot },
    ],
    sections: [
      {
        eyebrow: "Practical examples",
        title: "Start with the work your team does every day.",
        description:
          "Different businesses need different workflows. These examples describe common areas to explore—not fixed packages or assumed requirements.",
        items: [
          { title: "Small businesses", description: "Bring customer enquiries, quotations and follow-ups into a consistent routine.", icon: BriefcaseBusiness },
          { title: "Contractors", description: "Coordinate estimates, job progress, vendors and work records.", icon: Building2 },
          { title: "Service companies", description: "Track customer requests, schedules, assigned work and completion status.", icon: Workflow },
          { title: "Retail businesses", description: "Connect selected inventory, sales and customer records for clearer operations.", icon: ShoppingBag },
          { title: "Agencies", description: "Organize client requests, project tasks, approvals and reporting.", icon: Layers3 },
          { title: "Growing enterprises", description: "Review handoffs and reporting across teams before deciding what to standardize.", icon: Network },
        ],
      },
      {
        eyebrow: "A practical approach",
        title: "Improve the process before adding more software.",
        description:
          "We first map the current workflow and the problem it creates. The outcome may be a configuration of existing tools, a connected process, or a purpose-built application.",
        variant: "soft",
        items: [
          { title: "Map the current work", description: "See where information starts, moves and gets delayed.", icon: Workflow },
          { title: "Choose useful records", description: "Agree the key details and ownership that help people do their jobs.", icon: FileText },
          { title: "Make status visible", description: "Create views that help teams understand what needs attention.", icon: ChartNoAxesCombined },
          { title: "Review and refine", description: "Check that the workflow works for the people using it before extending it.", icon: Activity },
        ],
      },
    ],
    process: [
      { title: "Listen", description: "Understand the people, process and friction before suggesting software." },
      { title: "Map", description: "Document the information, handoffs, permissions and useful outcomes." },
      { title: "Shape", description: "Select a suitable tool, integration or custom workflow for the agreed need." },
      { title: "Adopt & improve", description: "Review with the team and plan support or adjustments based on use." },
    ],
    faqs: [
      { question: "Do we always need custom software?", answer: "No. Sometimes an existing tool or a clearer process is enough. We explore current tools and requirements before recommending whether configuration, integration or custom development is appropriate." },
      { question: "Can a system combine CRM, inventory and invoicing?", answer: "Some systems cover multiple functions, while others need integrations or separate workflows. The best fit depends on your operations, existing tools, access and data needs." },
      { question: "Can software calculate payroll or compliance amounts?", answer: "Workflows can help organize attendance or payroll inputs, but statutory calculations and compliance decisions need validation by qualified professionals and suitable software." },
      { question: "How do we choose what to automate first?", answer: "Start with a frequent, clearly defined task where the inputs and expected outcome are understood. Include exception handling and human review where decisions need judgment." },
    ],
    related: ["/web-app-development/", "/ai-automation/", "/digital-marketing/"],
    benefitTitle: "Give your team a more dependable way to coordinate work.",
    benefitDescription:
      "Well-considered business tools make records, responsibilities and progress easier to find. The goal is to support the people and processes you already rely on—not add complexity for its own sake.",
    benefits: ["Keep selected business information organized.", "Make task ownership and status easier to see.", "Reduce repeated copying between agreed workflows.", "Support decisions with useful, clearly scoped reports."],
  },
  {
    path: "/ai-automation/",
    shortName: "AI & automation",
    title: "AI & Business Automation | Techyfern Digital",
    description:
      "Explore practical AI-assisted workflows, customer support, lead management, document processing and business automation with Techyfern Digital.",
    eyebrow: "AI & business automation",
    heading: "Use automation thoughtfully, where it helps.",
    introduction:
      "Automation can help with repeatable steps; AI can assist with some language and information tasks. We help assess suitable use cases, data considerations and human review so a workflow remains understandable and accountable.",
    icon: Bot,
    visualLabel: "Human-guided automation",
    visualMetrics: [
      { label: "Routine work", value: "Automated", icon: Workflow },
      { label: "AI assistance", value: "Reviewed", icon: Sparkles },
      { label: "Decisions", value: "Human-led", icon: ShieldCheck },
    ],
    challenges: [
      "Staff spend time moving information between repeatable steps.",
      "Enquiries or documents need triage before a person can respond.",
      "Teams want to explore AI but need to understand its limits and data risks.",
    ],
    offerings: [
      { title: "AI-assisted workflows", description: "Add AI support to suitable tasks while keeping expected outputs and review clear.", icon: Sparkles },
      { title: "Customer support automation", description: "Organize common support questions and route requests that need a person.", icon: Network },
      { title: "Lead management automation", description: "Move enquiry details into an agreed workflow and help teams track follow-up.", icon: Activity },
      { title: "Business data processing", description: "Transform or organize defined information with checks for exceptions.", icon: Layers3 },
      { title: "Document processing", description: "Assist with extracting or classifying document information for human verification.", icon: FileText },
      { title: "AI integrations", description: "Connect approved AI services to a defined product or business process.", icon: Network },
      { title: "Repetitive task automation", description: "Reduce manual handoffs in well-defined, repeatable workflows.", icon: Workflow },
      { title: "Reporting automation", description: "Prepare recurring summaries from agreed data sources for review.", icon: ChartNoAxesCombined },
    ],
    sections: [
      {
        eyebrow: "Practical benefits",
        title: "Support the routine; keep people in control.",
        description:
          "The value comes from fitting the tool to the work and checking the outcome. Automation is most suitable when the steps are understood and exceptions can be handled responsibly.",
        items: [
          { title: "Reduce repetitive handling", description: "Move information through clear, repeatable steps with fewer manual transfers.", icon: Workflow },
          { title: "Route work more clearly", description: "Direct requests to the right team or review stage based on agreed rules.", icon: Network },
          { title: "Prepare information for review", description: "Help organize documents or data before a person confirms the result.", icon: FileText },
          { title: "Keep a human checkpoint", description: "Make it clear where a person reviews, corrects or approves an output.", icon: ShieldCheck },
        ],
      },
      {
        eyebrow: "Limitations & safeguards",
        title: "AI can assist, but it can also be wrong.",
        description:
          "AI outputs may be inaccurate, incomplete or inconsistent. Sensitive information, access controls, provider terms and legal requirements need consideration. High-impact decisions should not be delegated to an unchecked automated output.",
        variant: "dark",
        items: [
          { title: "Validate outputs", description: "Test against realistic examples and keep human review for consequential or uncertain results.", icon: ShieldCheck },
          { title: "Protect information", description: "Review what data is shared, where it is processed and who has access.", icon: Settings2 },
          { title: "Plan exceptions", description: "Provide a clear route for failures, unusual inputs and requests needing human judgment.", icon: Workflow },
          { title: "Measure usefulness", description: "Check quality and workflow impact rather than assuming automation is beneficial.", icon: ChartNoAxesCombined },
        ],
      },
    ],
    process: [
      { title: "Identify", description: "Choose a frequent task and understand its inputs, outcomes and exceptions." },
      { title: "Assess", description: "Review feasibility, data handling, risks and where a person must remain involved." },
      { title: "Prototype", description: "Test a small, bounded workflow with representative examples and clear checks." },
      { title: "Monitor", description: "Review quality and failures, then adjust or pause the workflow when needed." },
    ],
    faqs: [
      { question: "Will AI eliminate the need for human review?", answer: "Not necessarily. AI can make mistakes and may not understand context. Human review should remain in place when accuracy, fairness, privacy or business impact matters." },
      { question: "Can AI automate every business process?", answer: "No. Tasks involving unclear rules, sensitive decisions or unusual exceptions may not suit full automation. Assessment helps identify a bounded and reviewable use case." },
      { question: "Is customer or company information safe to use with AI?", answer: "It depends on the data, provider terms, configuration and applicable requirements. Data handling and access should be reviewed before connecting a service; sensitive information should not be sent without approval." },
      { question: "How do you decide whether automation is worthwhile?", answer: "We look at how often the task occurs, the time and friction involved, error handling and the effort needed to operate the automation. A simpler process may sometimes be the better answer." },
    ],
    related: ["/business-tech-solutions/", "/web-app-development/", "/digital-marketing/"],
    benefitTitle: "Spend less effort on predictable handoffs—not less attention on important decisions.",
    benefitDescription:
      "A carefully scoped workflow can help move routine information along while people retain context, judgment and a clear way to correct or stop the process.",
    benefits: ["Identify suitable repetitive steps before automating.", "Keep outputs reviewable and provide a human escalation route.", "Consider privacy, access and provider limitations early.", "Measure quality and usefulness rather than assuming impact."],
  },
];

export function getServiceByPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const alias = legacyServiceRedirects.find(
    (redirect) => redirect.path === normalized,
  );
  const servicePath = alias?.servicePath.replace(/\/+$/, "") ?? normalized;
  return detailedServices.find(
    (service) => service.path.replace(/\/+$/, "") === servicePath,
  );
}

export function getRelatedServices(paths: string[]) {
  return paths.map((path) => {
    const service = detailedServices.find((item) => item.path === path);
    if (!service) throw new Error(`Unknown related service path: ${path}`);
    return service;
  });
}
