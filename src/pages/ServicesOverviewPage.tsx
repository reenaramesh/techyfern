import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/Buttons";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/Cards";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { EditorialIllustration } from "../components/EditorialIllustration";
import { serviceGroups, specialistServices } from "../lib/serviceContent";

export function ServicesOverviewPage() {
  return (
    <>
      <section className="services-overview-hero">
        <PageContainer>
          <Breadcrumbs current="Services" />
          <div className="services-overview-hero-grid">
            <div className="services-overview-copy">
              <p className="eyebrow">Website, marketing and software services</p>
              <h1>What can we help your business do?</h1>
              <p>
                Get a website that explains what you do, help more people find
                your business online, or make everyday work easier with
                software. Explore our services and find a good place to start.
              </p>
              <div className="service-hero-actions">
                <PrimaryButton to="/contact">Talk About Your Needs</PrimaryButton>
                <Link className="text-link" to="#service-categories">
                  Explore services <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="services-overview-points">
                {["Start with a business need", "Choose a practical next step"].map(
                  (point) => (
                    <span key={point}>
                      <Check size={15} aria-hidden="true" /> {point}
                    </span>
                  ),
                )}
              </div>
            </div>
            <EditorialIllustration kind="services" priority />
          </div>
        </PageContainer>
      </section>

      <section className="service-category-section section-space" id="service-categories">
        <PageContainer>
          <SectionHeading
            eyebrow="Our main services"
            title="Choose the help you need right now."
            description="Explore website design, digital marketing and business technology. Not sure where to start? Tell us what you are trying to improve."
          />
          <div className="service-category-grid">
            {serviceGroups.map((group) => (
              <article className="service-category-card" key={group.number}>
                <div className="service-category-card-top">
                  <span className="icon-tile">
                    <group.icon size={22} aria-hidden="true" />
                  </span>
                  <span className="card-number">{group.number}</span>
                </div>
                <h2>{group.title}</h2>
                <p className="service-category-description">
                  {group.description}
                </p>
                <ul className="service-highlight-list">
                  {group.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Check size={15} aria-hidden="true" /> {highlight}
                    </li>
                  ))}
                </ul>
                <p className="service-category-benefit">{group.benefit}</p>
                <Link className="service-category-link" to={group.to}>
                  Explore this service <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className="service-category-enquiry" to="/contact">
                  Ask about this service
                </Link>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="specialist-section section-space">
        <PageContainer>
          <div className="section-topline">
            <SectionHeading
              eyebrow="Specialist services"
              title="Custom web apps and automation."
              description="When a standard website or tool is not enough, a custom web application or carefully chosen automation may help."
            />
            <span className="specialist-note">
              <Sparkles size={16} aria-hidden="true" /> Built around the workflow
            </span>
          </div>
          <div className="specialist-grid">
            {specialistServices.map((service) => (
              <ServiceCard
                key={service.to}
                description={service.description}
                icon={service.icon}
                number="SPECIALIST"
                title={service.title}
                to={service.to}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        eyebrow="START WITH A CONVERSATION"
        title="Not sure what your business needs?"
        description="Tell us what is not working or what you would like to improve. We can talk through your options and a practical next step."
      />
    </>
  );
}
