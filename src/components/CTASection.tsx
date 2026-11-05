import { ArrowUpRight, Sparkles } from "lucide-react";
import { PrimaryButton } from "./Buttons";
import { PageContainer } from "./PageContainer";
import { ScrollRevealSection } from "./ScrollRevealSection";

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  contactTo?: string;
  reveal?: boolean;
};

export function CTASection({
  eyebrow = "LET’S TALK",
  title = "Ready to improve your digital presence?",
  description = "Tell us what you need for your website, marketing or business tools. We’ll talk through a practical way to begin.",
  contactTo = "/contact",
  reveal = false,
}: CTASectionProps) {
  const content = (
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
          <PrimaryButton to={contactTo}>Talk About Your Project</PrimaryButton>
          <span>
            Start with a clear conversation about your needs.
            <ArrowUpRight aria-hidden="true" size={14} />
          </span>
        </div>
      </div>
    </PageContainer>
  );

  return reveal ? (
    <ScrollRevealSection className="cta-section">{content}</ScrollRevealSection>
  ) : (
    <section className="cta-section">{content}</section>
  );
}
