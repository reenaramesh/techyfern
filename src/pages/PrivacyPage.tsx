import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageContainer } from "../components/PageContainer";
import { SectionHeading } from "../components/SectionHeading";

const sections = [
  {
    title: "Information you submit",
    body: "The contact form asks for your name, email address, optional phone and business name, selected service and message. A consultation request also asks for project requirements, budget range, expected timeline and optional service-specific details. Campaign UTM parameters in the page URL may be recorded with an enquiry; other query parameters are not collected by the form.",
  },
  {
    title: "Why information is used",
    body: "Information is used to review, manage and respond to the enquiry, and to keep a record of related project discussions. Submission requires an explicit privacy-consent checkbox. Do not submit passwords, payment card details or sensitive personal information.",
  },
  {
    title: "Access, notifications and analytics",
    body: "Enquiry records are stored by the Django application and are available only to staff accounts granted lead-management permissions. A configured SMTP service may receive a notification containing enquiry details. Customer acknowledgement email is disabled by default. The website's GA4 event integration does not include form names, emails, phone numbers, message content or other direct personal identifiers.",
  },
  {
    title: "Security and retention",
    body: "The backend is configured for authenticated staff access, HTTPS-ready production settings and environment-based database and email credentials. The production hosting provider, data location, operational retention period and deletion schedule have not yet been confirmed. These must be documented and approved before launch; no fixed retention period is claimed here.",
  },
  {
    title: "Questions or requests",
    body: "To ask about, correct or request removal of enquiry information, submit a message through the contact form and identify the enquiry reference if available. Requests will be reviewed by an authorized team member.",
  },
];

export function PrivacyPage() {
  return (
    <section className="privacy-page section-space">
      <PageContainer>
        <Breadcrumbs current="Privacy notice" items={[]} />
        <SectionHeading
          as="h1"
          eyebrow="PRIVACY / ENQUIRY DATA"
          title="Clear information about enquiry data."
          description="This notice describes the current contact and consultation form workflow. It is operational information, not legal advice, and requires a privacy-owner review before production launch."
        />
        <div className="privacy-notice-content">
          {sections.map((section, index) => (
            <article key={section.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="privacy-last-updated">
          This notice must be reviewed with the production hosting, email,
          analytics and retention configuration before launch.
        </p>
      </PageContainer>
    </section>
  );
}
