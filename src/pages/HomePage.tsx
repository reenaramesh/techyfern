import {
  Accessibility,
  ArrowRight,
  Bot,
  Braces,
  Check,
  CircleHelp,
  Code2,
  Compass,
  Layers3,
  Megaphone,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { FAQAccordion } from "../components/FAQAccordion";
import { FeatureCard, ServiceCard } from "../components/Cards";
import { Hero } from "../components/Hero";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { SectionHeading } from "../components/SectionHeading";
import { PortfolioProjectCard } from "../components/PortfolioProjectCard";
import { conceptProjects } from "../lib/portfolioProjects";

const services = [
  {
    icon: Code2,
    number: "01",
    title: "Website Design & Development",
    description:
      "Responsive, considered websites that communicate what you do and make the next step clear.",
    to: "/website-design/",
  },
  {
    icon: Megaphone,
    number: "02",
    title: "Digital Marketing & SEO",
    description:
      "Thoughtful digital foundations that help the right people discover and understand your business.",
    to: "/digital-marketing/",
  },
  {
    icon: Network,
    number: "03",
    title: "Business Technology Solutions",
    description:
      "Connected tools and practical technology that support the way your business works.",
    to: "/business-tech-solutions/",
  },
  {
    icon: Braces,
    number: "04",
    title: "Custom Web Applications",
    description:
      "Purpose-built web applications shaped around your product, people and processes.",
    to: "/web-app-development/",
  },
  {
    icon: Bot,
    number: "05",
    title: "AI & Business Automation",
    description:
      "Practical automation ideas that make repeatable work simpler and create more room to focus.",
    to: "/ai-automation/",
  },
];

const challenges = [
  {
    icon: Search,
    title: "Hard to be found",
    description:
      "Make your digital presence easier to discover, understand and navigate.",
  },
  {
    icon: Workflow,
    title: "Disconnected tools",
    description:
      "Bring information and workflows closer together with thoughtful technology.",
  },
  {
    icon: Layers3,
    title: "Growing complexity",
    description:
      "Create a more useful digital foundation as your business and its needs evolve.",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Start with your goals",
    description:
      "We begin by understanding what matters to your business before shaping a solution.",
  },
  {
    icon: Accessibility,
    title: "Make it work for people",
    description:
      "Clear, accessible experiences help customers and teams move with confidence.",
  },
  {
    icon: Wrench,
    title: "Keep it practical",
    description:
      "Choose useful tools and considered features that serve a real business need.",
  },
  {
    icon: ShieldCheck,
    title: "Build for what’s next",
    description:
      "Create a flexible digital foundation that can adapt as your priorities change.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We listen to your goals, challenges, audience and existing setup.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We align on a clear direction, priorities and a practical scope of work.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "We design and build the right digital experience or solution together.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "We review the work and identify sensible next steps as your needs evolve.",
  },
];

const capabilities = [
  "Responsive websites",
  "Search foundations",
  "Custom web apps",
  "Digital campaigns",
  "Workflow automation",
  "AI integrations",
  "Business software",
  "Experience design",
];

function ServiceIntroduction({
  label,
  title,
  description,
  to,
  icon: Icon,
  className,
}: {
  label: string;
  title: string;
  description: string;
  to: string;
  icon: typeof Code2;
  className: string;
}) {
  return (
    <article className={`intro-card ${className}`}>
      <div className="intro-card-visual" aria-hidden="true">
        <div className="intro-visual-frame">
          <Icon size={30} strokeWidth={1.6} />
          <span className="intro-visual-line intro-visual-line-wide" />
          <span className="intro-visual-line" />
          <span className="intro-visual-chip">
            <Check size={13} /> Thoughtfully connected
          </span>
        </div>
      </div>
      <div className="intro-card-copy">
        <p className="eyebrow">{label}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="text-link" to={to}>
          Explore this service <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />

      <section className="services-section section-space" id="services">
        <PageContainer>
          <div className="section-topline">
            <SectionHeading
              eyebrow="What we do"
              title="Digital support, built around your business."
              description="The right mix of digital thinking and technology to help your business take its next step."
            />
            <Link className="text-link section-toplink" to="/services/">
              View all services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.number} {...service} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="problems-section section-space">
        <PageContainer className="problems-layout">
          <div className="problems-intro">
            <SectionHeading
              eyebrow="A better way forward"
              title="Good technology solves real business problems."
              description="When digital tools feel disconnected or your online presence falls behind, it can be hard to know what to tackle first. Start with the friction; build from there."
              light
            />
            <SecondaryButton to="/contact" icon>
              Talk through a challenge
            </SecondaryButton>
          </div>
          <div className="problem-card-grid">
            {challenges.map((challenge, index) => (
              <article className="problem-card" key={challenge.title}>
                <span className="problem-number">0{index + 1}</span>
                <span className="problem-icon">
                  <challenge.icon size={21} aria-hidden="true" />
                </span>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="service-intros-section section-space">
        <PageContainer>
          <div className="section-topline">
            <SectionHeading
              eyebrow="Built with intention"
              title="A stronger digital foundation, one step at a time."
              description="Whether you are creating something new or improving what is already there, the work should connect back to what your business needs."
            />
            <Link className="text-link section-toplink" to="/contact">
              Find the right fit <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="intro-card-grid">
            <ServiceIntroduction
              className="intro-card-website"
              description="Make a thoughtful first impression with a fast, responsive website that clearly communicates your value and guides visitors to take action."
              icon={Code2}
              label="01 / DIGITAL PRESENCE"
              title="Website Design & Development"
              to="/website-design/"
            />
            <ServiceIntroduction
              className="intro-card-marketing"
              description="Build solid search foundations and useful digital marketing experiences that help people find your business and understand what sets it apart."
              icon={Megaphone}
              label="02 / DISCOVERABILITY"
              title="Digital Marketing & SEO"
              to="/digital-marketing/"
            />
            <ServiceIntroduction
              className="intro-card-automation"
              description="Connect everyday tools, shape custom applications and explore practical automation to make important work easier to manage."
              icon={Workflow}
              label="03 / BUSINESS SYSTEMS"
              title="Business Software & Automation"
              to="/business-tech-solutions/"
            />
          </div>
        </PageContainer>
      </section>

      <section className="why-section section-space">
        <PageContainer className="why-layout">
          <div className="why-copy">
            <SectionHeading
              eyebrow="Why Techyfern Digital"
              title="Technology is better when it starts with people."
              description="A website, campaign or application is only useful when it helps someone do something better. We bring creative website design, software engineering and digital marketing together around practical business goals."
            />
            <PrimaryButton to="/about">More about Techyfern</PrimaryButton>
            <div aria-hidden="true" className="why-graphic">
              <span className="why-graphic-orbit" />
              <span className="why-graphic-core">T</span>
              <span className="why-node why-node-one"><Compass size={16} /></span>
              <span className="why-node why-node-two"><Sparkles size={16} /></span>
              <span className="why-node why-node-three"><Network size={16} /></span>
            </div>
          </div>
          <div className="why-feature-grid">
            {benefits.map((benefit) => (
              <FeatureCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="process-section section-space">
        <PageContainer>
          <SectionHeading
            align="center"
            eyebrow="Our working process"
            title="Clear steps. Shared direction."
            description="A collaborative, considered approach keeps the work focused from the first conversation through to the next iteration."
          />
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-step" key={step.number}>
                <span className="process-step-number">{step.number}</span>
                <span aria-hidden="true" className="process-step-line" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <div className="home-process-link">
            <Link className="text-link" to="/our-process/">
              Explore our full process <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="home-portfolio-section section-space">
        <PageContainer>
          <div className="section-topline">
            <SectionHeading
              eyebrow="CONCEPT PROJECTS"
              title="Explore ideas through illustrative demos."
              description="These original concepts show possible approaches to common digital challenges. They are not presented as completed client work."
            />
            <Link className="text-link section-toplink" to="/portfolio/">
              Browse all concepts <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="portfolio-grid home-portfolio-grid">
            {conceptProjects.slice(0, 3).map((project) => (
              <PortfolioProjectCard compact key={project.slug} project={project} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="capabilities-section">
        <PageContainer className="capabilities-layout">
          <div className="capabilities-intro">
            <SectionHeading
              eyebrow="Technology capabilities"
              title="The right tools for the right job."
              description="Technology is a means to a better outcome, not the outcome itself. We choose an approach to suit your goals, your audience and your team."
              light
            />
          </div>
          <div className="capabilities-panel">
            <div className="capabilities-panel-header">
              <span className="capabilities-icon">
                <Code2 size={20} aria-hidden="true" />
              </span>
              <span>
                <strong>Digital toolkit</strong>
                <small>Flexible by design</small>
              </span>
              <span className="capabilities-live">
                <span /> CONNECTED
              </span>
            </div>
            <div className="capabilities-list">
              {capabilities.map((capability, index) => (
                <div className="capability-item" key={capability}>
                  <span className="capability-check">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  <span>{capability}</span>
                  <span className="capability-index">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="faq-section section-space">
        <PageContainer className="faq-layout">
          <div className="faq-intro">
            <span className="faq-icon">
              <CircleHelp size={22} aria-hidden="true" />
            </span>
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="A few useful things to know."
              description="Have another question? We would be glad to talk it through."
            />
            <SecondaryButton to="/contact" icon>
              Get in touch
            </SecondaryButton>
          </div>
          <FAQAccordion />
        </PageContainer>
      </section>

      <CTASection />
    </>
  );
}
