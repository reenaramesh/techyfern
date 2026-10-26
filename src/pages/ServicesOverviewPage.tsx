import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/Buttons";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/Cards";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ServiceVisual } from "../components/ServiceVisual";
import { serviceGroups, specialistServices } from "../lib/serviceContent";
import { detailedServices } from "../lib/serviceContent";

export function ServicesOverviewPage() {
  return (
    <>
      <section className="services-overview-hero">
        <PageContainer>
          <Breadcrumbs current="Services" />
          <div className="services-overview-hero-grid">
            <div className="services-overview-copy">
              <p className="eyebrow">Connected digital services</p>
              <h1>The right digital support for your next step.</h1>
              <p>
                Build a stronger online presence, reach the right audience or
                make everyday work easier. Explore connected services shaped
                around the needs of your business.
              </p>
              <div className="service-hero-actions">
                <PrimaryButton to="/contact">Discuss Your Project</PrimaryButton>
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
            <ServiceVisual
              icon={Sparkles}
              label="Digital tools working together"
              variant="services"
              metrics={[
                { label: "Presence", value: "Websites", icon: detailedServices[0].icon },
                { label: "Growth", value: "Marketing", icon: detailedServices[1].icon },
                { label: "Operations", value: "Technology", icon: detailedServices[2].icon },
              ]}
            />
          </div>
        </PageContainer>
      </section>

      <section className="service-category-section section-space" id="service-categories">
        <PageContainer>
          <SectionHeading
            eyebrow="Three connected foundations"
            title="Services to meet your business where it is."
            description="Choose the area that fits your current priorities. We can also help you work out where to start."
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
              eyebrow="Specialist capabilities"
              title="More focused solutions for specific needs."
              description="Explore web application and automation work when your requirements call for something beyond a standard website or campaign."
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
        title="Not sure which service fits? Let’s work it out together."
        description="Share the challenge you are trying to solve. We can discuss practical options and a sensible next step."
      />
    </>
  );
}
