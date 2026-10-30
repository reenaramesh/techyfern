import {
  Accessibility,
  ArrowRight,
  Check,
  CircleHelp,
  Code2,
  Compass,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { FAQAccordion } from "../components/FAQAccordion";
import { FeatureCard, ServiceCard } from "../components/Cards";
import { Hero } from "../components/Hero";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { SectionHeading } from "../components/SectionHeading";
import { PortfolioProjectCard } from "../components/PortfolioProjectCard";
import { ScrollRevealSection } from "../components/ScrollRevealSection";
import { conceptProjects } from "../lib/portfolioProjects";
import { fadeUpVariants, staggerChildrenVariants } from "../lib/motionVariants";
import { serviceGroups, specialistServices } from "../lib/serviceContent";

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
  "React & TypeScript",
  "Vite & Tailwind CSS",
  "WordPress",
  "Python & Django",
  "PostgreSQL",
  "Analytics & search tools",
  "E-commerce platforms",
  "APIs & workflow automation",
];

export function HomePage() {
  return (
    <>
      <Hero />

      <ScrollRevealSection className="services-section section-space" id="services">
        <PageContainer>
          <div className="section-topline">
            <SectionHeading
              eyebrow="What we do"
              title="Three connected foundations for your business."
              description="Start with the area that matters most: a clear digital presence, more informed marketing or technology that supports everyday work."
            />
            <Link className="text-link section-toplink" to="/services/">
              View all services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <motion.div
            className="services-grid"
            variants={staggerChildrenVariants}
          >
            {serviceGroups.map((service) => (
              <motion.div
                className="service-card-reveal"
                key={service.number}
                variants={fadeUpVariants}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </ScrollRevealSection>

      <ScrollRevealSection className="problems-section section-space">
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
      </ScrollRevealSection>

      <ScrollRevealSection className="specialist-section section-space">
        <PageContainer>
          <div className="section-topline">
            <SectionHeading
              eyebrow="Specialist capabilities"
              title="Purpose-built solutions for specific workflows."
              description="When your needs go beyond a standard website or campaign, explore custom applications and practical automation."
            />
            <Link className="text-link section-toplink" to="/contact">
              Talk through a workflow <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <motion.div
            className="specialist-grid"
            variants={staggerChildrenVariants}
          >
            {specialistServices.map((service, index) => (
              <motion.div
                className="service-card-reveal"
                key={service.to}
                variants={fadeUpVariants}
              >
                <ServiceCard
                  description={service.description}
                  icon={service.icon}
                  number={`0${index + 4}`}
                  title={service.title}
                  to={service.to}
                />
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </ScrollRevealSection>

      <ScrollRevealSection className="why-section section-space">
        <PageContainer className="why-layout">
          <div className="why-copy">
            <SectionHeading
              eyebrow="Why TechyPraxis Digital"
              title="Technology is better when it starts with people."
              description="A website, campaign or application is only useful when it helps someone do something better. We bring creative website design, software engineering and digital marketing together around practical business goals."
            />
            <PrimaryButton to="/about">More about TechyPraxis</PrimaryButton>
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
      </ScrollRevealSection>

      <ScrollRevealSection className="process-section section-space">
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
      </ScrollRevealSection>

      <ScrollRevealSection className="home-portfolio-section section-space">
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
      </ScrollRevealSection>

      <ScrollRevealSection className="capabilities-section">
        <PageContainer className="capabilities-layout">
          <div className="capabilities-intro">
            <SectionHeading
              eyebrow="Technology capabilities"
              title="Choose technology to fit the work."
              description="The examples shown reflect tools used in this website and the services described here. The right approach depends on your goals, existing systems and ongoing needs."
              light
            />
          </div>
          <div className="capabilities-panel">
            <div className="capabilities-panel-header">
              <span className="capabilities-icon">
                <Code2 size={20} aria-hidden="true" />
              </span>
              <span>
                <strong>Technology toolkit</strong>
                <small>Selected for the project</small>
              </span>
              <span className="capabilities-scope">
                <span /> SCOPE-LED
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
            <p className="capabilities-note">
              This list is illustrative, not a fixed stack or promise of
              prebuilt integrations. The Python backend is separate from this
              static website preview.
            </p>
          </div>
        </PageContainer>
      </ScrollRevealSection>

      <ScrollRevealSection className="faq-section section-space">
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
      </ScrollRevealSection>

      <CTASection reveal />
    </>
  );
}
