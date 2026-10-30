import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ContactLeadForm } from "../components/LeadForms";
import { PageContainer } from "../components/PageContainer";
import { SectionHeading } from "../components/SectionHeading";
import { leadSubmissionsEnabled } from "../lib/leadApi";

export function ContactPage() {
  return (
    <>
      <section className="lead-page-hero">
        <PageContainer>
          <Breadcrumbs current="Contact" items={[]} />
          <SectionHeading
            as="h1"
            eyebrow="CONTACT TECHYPRAXIS DIGITAL"
            title="Tell us what you would like to make easier."
            description="Share a little about your business and the digital challenge you are working through. We’ll use the details to review and respond to your enquiry."
          />
        </PageContainer>
      </section>
      <section className="lead-page-content section-space">
        <PageContainer className="lead-page-layout">
          <div className="lead-page-aside">
            <SectionHeading
              eyebrow="A USEFUL FIRST STEP"
              title="Start with the context."
              description="A clear picture of the challenge helps us understand whether website development, marketing, software or automation is a sensible direction."
            />
            <div className="lead-page-aside-card">
              <span>Prefer a detailed brief?</span>
              <p>Share project scope, budget range and expected timeline through our consultation request.</p>
              <Link to="/request-quote/">
                Request a consultation <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="lead-privacy-reminder">
              Please do not include passwords, payment card information or other sensitive personal data.
            </p>
          </div>
          <div className="lead-form-panel">
            <h2>Send an enquiry</h2>
            <p>
              {leadSubmissionsEnabled
                ? "We’ll confirm receipt on this page after the server accepts your submission."
                : "This preview is for interface review only; enquiries are not sent."}
            </p>
            <ContactLeadForm />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
