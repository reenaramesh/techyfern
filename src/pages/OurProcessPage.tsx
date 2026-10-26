import { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CTASection } from "../components/CTASection";
import { PageContainer } from "../components/PageContainer";
import { SectionHeading } from "../components/SectionHeading";

const steps = [
  { title: "Discovery and requirements", description: "Understand your goals, users, constraints and current setup. Agree on the questions that need answers before committing to a solution." },
  { title: "Business analysis", description: "Map the relevant customer journeys or internal workflows, identify friction and clarify what a useful improvement would look like." },
  { title: "Strategy and planning", description: "Prioritize requirements, technical considerations, content needs and dependencies. Define the proposed scope and review points." },
  { title: "Design and prototyping", description: "Shape the information architecture and interface, then review a prototype or design direction before implementation." },
  { title: "Development and implementation", description: "Build the agreed experience or workflow in manageable pieces, keeping decisions and progress visible." },
  { title: "Testing and quality assurance", description: "Review functionality, content, accessibility, responsive behavior and relevant technical checks before release." },
  { title: "Launch and deployment", description: "Prepare the agreed release, confirm responsibilities and check the live experience after deployment." },
  { title: "Maintenance and improvement", description: "Plan ongoing care, monitor what is relevant and agree on future improvements as requirements evolve." },
];

const engagementDetails = {
  Website: {
    heading: "For website projects",
    description: "We focus on audience needs, content structure, responsive design, accessibility, performance foundations and a clear route for visitors to take action.",
    checkpoints: ["Content and page structure", "Design review before build", "Responsive and browser checks"],
  },
  Software: {
    heading: "For software projects",
    description: "We spend more time mapping roles, data, permissions, integrations and edge cases so the product reflects how people actually work.",
    checkpoints: ["Requirements and workflow mapping", "Prototype critical journeys", "Test data, access and failure states"],
  },
  Marketing: {
    heading: "For digital marketing",
    description: "We agree objectives, audience, channel roles and measurement before campaigns or optimization work begins. Results are reviewed without guaranteed rankings or returns.",
    checkpoints: ["Baseline and measurement needs", "Channel and content plan", "Regular performance review"],
  },
} as const;

type EngagementType = keyof typeof engagementDetails;

export function OurProcessPage() {
  const [selectedEngagement, setSelectedEngagement] = useState<EngagementType>("Website");
  const engagement = engagementDetails[selectedEngagement];

  return (
    <>
      <section className="process-page-hero">
        <PageContainer>
          <Breadcrumbs current="Our process" items={[]} />
          <SectionHeading
            as="h1"
            eyebrow="HOW WE WORK"
            title="A thoughtful process, from first question to ongoing care."
            description="A clear process helps everyone understand the work, make decisions at the right time and see what comes next. Scope and sequence are adapted to the needs of each engagement."
          />
        </PageContainer>
      </section>
      <section className="process-timeline-section section-space">
        <PageContainer className="process-timeline-layout">
          <div>
            <SectionHeading
              eyebrow="THE PROJECT JOURNEY"
              title="Eight useful stages."
              description="Not every project follows a perfectly straight line. We return to earlier questions when new information changes the best way forward."
            />
            <p className="process-scope-note">
              Delivery scope and timing are discussed after requirements are understood; no fixed timeline is assumed in advance.
            </p>
          </div>
          <ol className="process-timeline">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="process-timeline-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><h2>{step.title}</h2><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>
      <section className="process-engagement-section section-space">
        <PageContainer>
          <SectionHeading
            eyebrow="THE DETAILS CHANGE WITH THE WORK"
            title="Different engagements need different questions."
            description="Select a project type to see what receives extra attention."
          />
          <div aria-label="Project type" className="process-engagement-controls">
            {(Object.keys(engagementDetails) as EngagementType[]).map((type) => (
              <button
                aria-pressed={selectedEngagement === type}
                className={selectedEngagement === type ? "process-engagement-button process-engagement-button-active" : "process-engagement-button"}
                key={type}
                onClick={() => setSelectedEngagement(type)}
                type="button"
              >
                {type} projects
              </button>
            ))}
          </div>
          <div aria-live="polite" className="process-engagement-panel">
            <div>
              <p className="eyebrow">{selectedEngagement.toUpperCase()} ENGAGEMENT</p>
              <h2>{engagement.heading}</h2>
              <p>{engagement.description}</p>
            </div>
            <ul>
              {engagement.checkpoints.map((checkpoint) => <li key={checkpoint}>{checkpoint}</li>)}
            </ul>
          </div>
        </PageContainer>
      </section>
      <section className="process-quality-section section-space">
        <PageContainer className="process-quality-layout">
          <SectionHeading
            eyebrow="BUILT ON GOOD PRACTICE"
            title="Quality is part of the process."
            description="We make space for clear scope and deliverables, responsive development, accessibility checks, testing and responsible handling of information."
            light
          />
          <div className="process-quality-grid">
            <article><b>01</b><h2>Transparent scope</h2><p>Decisions and deliverables are agreed in context.</p></article>
            <article><b>02</b><h2>Thoughtful privacy</h2><p>Data needs and access are considered as part of design.</p></article>
            <article><b>03</b><h2>Careful testing</h2><p>Review covers the paths people need to use.</p></article>
            <article><b>04</b><h2>Maintainability</h2><p>Foundations should be understandable and supportable.</p></article>
          </div>
        </PageContainer>
      </section>
      <CTASection
        eyebrow="YOUR NEXT STEP"
        title="Start with a conversation about the work."
        description="We can discuss your goals and identify the questions that will shape a suitable scope."
      />
    </>
  );
}
