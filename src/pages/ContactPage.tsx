import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ContactLeadForm } from "../components/LeadForms";
import { PageContainer } from "../components/PageContainer";
import { SectionHeading } from "../components/SectionHeading";
import { leadSubmissionsEnabled } from "../lib/leadApi";
import {
  isServiceCategory,
  siteContact,
} from "../lib/siteContact";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service");
  const defaultService = isServiceCategory(requestedService)
    ? requestedService
    : "other";

  return (
    <>
      <section className="lead-page-hero">
        <PageContainer>
          <Breadcrumbs current="Contact" items={[]} />
          <SectionHeading
            as="h1"
            eyebrow="CONTACT TECHYPRAXIS DIGITAL IN BENGALURU"
            title="What would you like to improve?"
            description="Tell us about your business and what you need help with, from website design and digital marketing to software or automation. We’ll review your enquiry and get back to you."
          />
        </PageContainer>
      </section>
      <section className="lead-page-content section-space">
        <PageContainer className="lead-page-layout">
          <div className="lead-page-aside">
            <SectionHeading
              eyebrow="START HERE"
              title="Tell us what is not working."
              description="A little context helps us understand whether a new website, digital marketing, software or automation could help."
            />
            <section aria-labelledby="contact-details-heading" className="contact-details">
              <h2 id="contact-details-heading">Contact details</h2>
              <address>
                <MapPin size={17} aria-hidden="true" />
                <span>{siteContact.address}</span>
              </address>
              <a href={siteContact.phoneHref}>
                <Phone size={17} aria-hidden="true" />
                <span>{siteContact.phoneDisplay}</span>
              </a>
            </section>
            <div className="lead-page-aside-card">
              <span>Have a specific project in mind?</span>
              <p>Share what you need, your budget range and preferred timeline in a consultation request.</p>
              <Link to="/request-quote/">
                Share project details <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="lead-privacy-reminder">
              Please do not include passwords, payment card information or other sensitive personal data.
            </p>
          </div>
          <div className="lead-form-panel">
            <h2>Send us a message</h2>
            <p>
              {leadSubmissionsEnabled
                ? "We’ll confirm receipt on this page after the server accepts your submission."
                : "This preview is for interface review only; enquiries are not sent."}
            </p>
            <ContactLeadForm defaultService={defaultService} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
