import { ArrowUpRight, Sparkles } from "lucide-react";
import { PrimaryButton } from "./Buttons";
import { PageContainer } from "./PageContainer";

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function CTASection({
  eyebrow = "YOUR NEXT CHAPTER",
  title = "Have a good idea? Let’s give it a digital home.",
  description = "Start with a conversation about your goals, your challenges and where you want to go next.",
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <PageContainer>
        <div className="cta-panel">
          <div aria-hidden="true" className="cta-decoration">
            <span />
            <span />
            <span />
          </div>
          <div className="cta-copy">
            <p className="eyebrow eyebrow-light">
              <Sparkles size={15} aria-hidden="true" /> {eyebrow}
            </p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-action">
            <PrimaryButton to="/contact">Discuss Your Project</PrimaryButton>
            <span>
              No pressure. Just a thoughtful first conversation.
              <ArrowUpRight aria-hidden="true" size={14} />
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
