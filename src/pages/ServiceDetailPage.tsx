import {
  ArrowRight,
  Check,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CTASection } from "../components/CTASection";
import { FAQAccordion } from "../components/FAQAccordion";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FeatureCard } from "../components/Cards";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceVisual } from "../components/ServiceVisual";
import {
  getRelatedServices,
  getServiceByPath,
  type ServiceSection,
} from "../lib/serviceContent";

function ServiceContentSection({
  section,
  index,
}: {
  section: ServiceSection;
  index: number;
}) {
  const variant = section.variant ?? (index % 2 === 0 ? "white" : "soft");

  return (
    <section className={`service-detail-content service-content-${variant}`}>
      <PageContainer>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className="service-content-grid">
          {section.items.map((item) => (
            <article className="service-content-card" key={item.title}>
              <span className="icon-tile">
                <item.icon size={20} aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function ProcessSection({
  process,
}: {
  process: { title: string; description: string }[];
}) {
  return (
    <section className="service-process-section section-space">
      <PageContainer>
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="A clear process, shaped around your needs."
          description="We agree the right scope together and keep decisions, responsibilities and next steps visible."
        />
        <div className="service-process-grid">
          {process.map((step, index) => (
            <article className="service-process-step" key={step.title}>
              <span className="service-process-number">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < process.length - 1 && (
                <span aria-hidden="true" className="service-process-connector" />
              )}
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function ServiceFaq({ serviceName, items }: {
  serviceName: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="service-faq-section section-space">
      <PageContainer className="service-faq-layout">
        <div className="service-faq-intro">
          <span className="faq-icon">
            <CircleHelp size={22} aria-hidden="true" />
          </span>
          <SectionHeading
            eyebrow="Frequently asked questions"
            title={`Questions about ${serviceName.toLowerCase()}.`}
            description="A few useful details to help you decide what to explore next."
          />
        </div>
        <FAQAccordion items={items} />
      </PageContainer>
    </section>
  );
}

function RelatedServices({ paths }: { paths: string[] }) {
  const services = getRelatedServices(paths);
  return (
    <section className="related-services-section section-space">
      <PageContainer>
        <div className="section-topline">
          <SectionHeading
            eyebrow="Related services"
            title="Connected help, when you need it."
            description="Some business goals benefit from bringing a few digital disciplines together."
          />
          <Link className="text-link section-toplink" to="/services/">
            View all services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="related-services-grid">
          {services.map((service) => (
            <Link
              className="related-service-card"
              key={service.path}
              to={service.path}
            >
              <span className="icon-tile">
                <service.icon size={20} aria-hidden="true" />
              </span>
              <span className="related-service-copy">
                <strong>{service.shortName}</strong>
                <small>{service.heading}</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function TechnologyList({ serviceIcon: Icon }: { serviceIcon: LucideIcon }) {
  const technologies = [
    { name: "WordPress", kind: "Content management" },
    { name: "React", kind: "Interactive frontend" },
    { name: "E-commerce platforms", kind: "Online store" },
    { name: "Approved integrations", kind: "Connected tools" },
  ];
  return (
    <div className="technology-panel">
      <div className="technology-panel-heading">
        <span className="icon-tile">
          <Icon size={21} aria-hidden="true" />
        </span>
        <span>
          <strong>Technology that fits the work</strong>
          <small>Selected around your requirements</small>
        </span>
      </div>
      <div className="technology-list">
        {technologies.map((technology, index) => (
          <div className="technology-item" key={technology.name}>
            <span className="technology-item-check">
              <Check size={13} aria-hidden="true" />
            </span>
            <span>
              <strong>{technology.name}</strong>
              <small>{technology.kind}</small>
            </span>
            <span className="technology-index">0{index + 1}</span>
          </div>
        ))}
      </div>
      <p>
        The platform and integrations are confirmed during discovery. No
        technology is assumed until it fits the agreed project scope.
      </p>
    </div>
  );
}

export function ServiceDetailPage() {
  const { pathname } = useLocation();
  const service = getServiceByPath(pathname);

  if (!service) {
    throw new Error(`No service content configured for route: ${pathname}`);
  }

  return (
    <>
      <section className={`service-detail-hero service-hero-${service.path.slice(1, -1)}`}>
        <PageContainer>
          <Breadcrumbs current={service.shortName} />
          <div className="service-detail-hero-grid">
            <div className="service-detail-copy">
              <p className="eyebrow">{service.eyebrow}</p>
              <h1>{service.heading}</h1>
              <p className="service-detail-introduction">
                {service.introduction}
              </p>
              <div className="service-detail-actions">
                <PrimaryButton to="/contact">Discuss Your Project</PrimaryButton>
                <SecondaryButton to="/services/" icon>
                  Explore All Services
                </SecondaryButton>
              </div>
              <p className="service-hero-reassurance">
                <Check size={15} aria-hidden="true" />
                A practical conversation, starting with your goals.
              </p>
            </div>
            <ServiceVisual
              icon={service.icon}
              label={service.visualLabel}
              metrics={service.visualMetrics}
              variant={service.path.slice(1, -1)}
            />
          </div>
        </PageContainer>
      </section>

      <section className="service-challenges-section section-space">
        <PageContainer className="service-challenges-layout">
          <div className="service-challenges-copy">
            <SectionHeading
              eyebrow="Start with the challenge"
              title="Make progress on what is getting in the way."
              description="The useful solution is the one that addresses a real customer experience or business need."
            />
          </div>
          <ul className="service-challenge-list">
            {service.challenges.map((challenge, index) => (
              <li key={challenge}>
                <span>0{index + 1}</span>
                <p>{challenge}</p>
                <Check size={17} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <section className="service-offerings-section section-space">
        <PageContainer>
          <SectionHeading
            eyebrow="What we can help with"
            title={`Explore ${service.shortName.toLowerCase()} services.`}
            description="The right combination depends on your audience, current tools and the outcomes you want to support."
          />
          <div className="service-offerings-grid">
            {service.offerings.map((offering) => (
              <FeatureCard
                key={offering.title}
                className="service-offering-card"
                description={offering.description}
                icon={offering.icon}
                title={offering.title}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {service.sections.map((section, index) => (
        <ServiceContentSection
          index={index}
          key={section.title}
          section={section}
        />
      ))}

      {service.path === "/website-design/" && (
        <section className="technology-section section-space">
          <PageContainer className="technology-layout">
            <SectionHeading
              eyebrow="Technology capabilities"
              title="The platform should fit your team and your website."
              description="We discuss the options that suit your content, interactions and ongoing ownership rather than choosing tools by default."
            />
            <TechnologyList serviceIcon={service.icon} />
          </PageContainer>
        </section>
      )}

      <section className="service-benefits-section section-space">
        <PageContainer className="service-benefits-layout">
          <div>
            <SectionHeading
              eyebrow="Business value"
              title={service.benefitTitle}
              description={service.benefitDescription}
            />
            <PrimaryButton to="/contact">Talk through your goals</PrimaryButton>
          </div>
          <div className="service-benefit-list">
            {service.benefits.map((benefit) => (
              <div className="service-benefit-item" key={benefit}>
                <span>
                  <Check size={15} aria-hidden="true" />
                </span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <ProcessSection process={service.process} />
      <ServiceFaq items={service.faqs} serviceName={service.shortName} />
      <RelatedServices paths={service.related} />
      <CTASection
        eyebrow={`LET’S TALK ABOUT ${service.shortName.toUpperCase()}`}
        title="A good next step starts with a clear conversation."
        description="Tell us what you are trying to achieve. We can discuss your needs, practical options and a suitable scope."
      />
    </>
  );
}

export function ServiceAliasRedirect({ to }: { to: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return <ServiceDetailPage />;
}
