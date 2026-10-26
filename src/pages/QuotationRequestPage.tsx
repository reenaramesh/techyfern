import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { QuotationRequestForm } from "../components/LeadForms";
import { PageContainer } from "../components/PageContainer";
import { SectionHeading } from "../components/SectionHeading";
import { leadSubmissionsEnabled } from "../lib/leadApi";

export function QuotationRequestPage() {
  return (
    <>
      <section className="lead-page-hero">
        <PageContainer>
          <Breadcrumbs current="Request a consultation" items={[{ label: "Contact", to: "/contact/" }]} />
          <SectionHeading
            as="h1"
            eyebrow="PROJECT CONSULTATION"
            title="Help us understand the shape of your project."
            description="Share the service, requirements, budget range and timeline you have in mind. We’ll review the context before discussing a suitable scope."
          />
        </PageContainer>
      </section>
      <section className="lead-page-content section-space">
        <PageContainer className="lead-form-narrow">
          <div className="lead-form-panel">
            <h2>Project details</h2>
            <p>
              {leadSubmissionsEnabled
                ? "Providing a request does not create a binding quotation or confirm a delivery date."
                : "This preview does not send consultation requests."}
            </p>
            <QuotationRequestForm />
          </div>
          <p className="lead-back-link"><Link to="/contact/">Have a general enquiry instead?</Link></p>
        </PageContainer>
      </section>
    </>
  );
}
