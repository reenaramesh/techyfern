import {
  Accessibility,
  ArrowRight,
  Compass,
  Handshake,
  Layers3,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { EditorialIllustration } from "../components/EditorialIllustration";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CTASection } from "../components/CTASection";
import { PageContainer } from "../components/PageContainer";
import { SectionHeading } from "../components/SectionHeading";

const principles = [
  {
    icon: Target,
    title: "Start with the business need",
    description:
      "We ask what should become easier or clearer before recommending a platform, feature or campaign.",
  },
  {
    icon: Accessibility,
    title: "Design for real people",
    description:
      "Useful digital experiences account for different devices, abilities and levels of familiarity.",
  },
  {
    icon: ShieldCheck,
    title: "Be clear about the work",
    description:
      "Scope, assumptions, review points and open questions should be understandable throughout a project.",
  },
  {
    icon: Layers3,
    title: "Keep solutions maintainable",
    description:
      "We favor practical foundations that can be understood, cared for and improved over time.",
  },
];

const industries = [
  "Startups and emerging products",
  "Professional and local services",
  "Retail and commerce",
  "Contractors and field services",
  "Agencies and consultancies",
  "Growing small and medium businesses",
];

export function AboutPage() {
  return (
    <>
      <section className="company-hero">
        <PageContainer>
          <Breadcrumbs current="About" items={[]} />
          <div className="company-hero-layout">
            <div className="company-hero-copy">
              <p className="eyebrow">ABOUT TECHYPRAXIS DIGITAL</p>
              <h1>Digital services made clear and practical.</h1>
              <p>
                We help businesses in Bengaluru with website design, digital
                marketing and software. Start with a clear conversation about
                what your business needs.
              </p>
              <Link className="text-link" to="/services/">
                Explore what we do <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <EditorialIllustration kind="collaboration" priority />
          </div>
        </PageContainer>
      </section>

      <section className="company-purpose section-space">
        <PageContainer className="company-purpose-layout">
          <div>
            <SectionHeading
              eyebrow="Our purpose"
              title="Make your website, marketing and tools more useful."
              description="When your website, marketing and work tools do not fit together, it can be hard to know what to improve. We help you focus on the need and explore practical options."
            />
          </div>
          <div className="company-purpose-note">
            <Compass size={22} aria-hidden="true" />
            <p>
              We help businesses improve their online presence, simplify
              everyday tasks and decide what to work on next.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="company-mission-section section-space">
        <PageContainer className="company-mission-grid">
          <article>
            <span className="company-mission-icon"><Target size={21} /></span>
            <p className="eyebrow">OUR MISSION</p>
            <h2>Make digital challenges easier to solve.</h2>
            <p>
              Help businesses choose useful websites, software and marketing
              that fit their needs.
            </p>
          </article>
          <article>
            <span className="company-mission-icon"><Compass size={21} /></span>
            <p className="eyebrow">OUR VISION</p>
            <h2>Help businesses use technology with confidence.</h2>
            <p>
              Support businesses in using technology thoughtfully and in ways
              their teams can manage.
            </p>
          </article>
        </PageContainer>
      </section>

      <section className="company-services-section section-space">
        <PageContainer>
          <SectionHeading
            eyebrow="What we do"
            title="Website design, marketing and business software."
            description="A clear website helps customers understand your business. Digital marketing helps people find it. Useful software can make work easier for your team. We can help you explore each of these."
          />
          <div className="company-services-row">
            <Link to="/website-design/"><span>01</span><b>Digital presence</b><small>Websites and digital experiences</small><ArrowRight size={17} /></Link>
            <Link to="/digital-marketing/"><span>02</span><b>Discoverability</b><small>Search, campaigns and measurement</small><ArrowRight size={17} /></Link>
            <Link to="/business-tech-solutions/"><span>03</span><b>Business systems</b><small>Software and connected workflows</small><ArrowRight size={17} /></Link>
          </div>
        </PageContainer>
      </section>

      <section className="company-principles-section section-space">
        <PageContainer>
          <SectionHeading
            eyebrow="How we work"
            title="Principles that keep the work grounded."
            description="The details vary from one engagement to another, but clear communication and practical decisions stay important."
          />
          <div className="company-principles-grid">
            {principles.map(({ icon: Icon, ...principle }) => (
              <article className="company-principle-card" key={principle.title}>
                <span><Icon size={20} aria-hidden="true" /></span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="company-industries-section section-space">
        <PageContainer className="company-industries-layout">
          <SectionHeading
            eyebrow="Businesses we can support"
            title="Digital help for different kinds of businesses."
            description="We can discuss website, marketing and software needs across these business types. This is not a list of claimed clients or completed projects."
            light
          />
          <ul className="company-industry-list">
            {industries.map((industry) => (
              <li key={industry}><span />{industry}</li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <section className="company-collaboration-section section-space">
        <PageContainer className="company-collaboration-layout">
          <div className="company-collaboration-icon"><Handshake size={28} aria-hidden="true" /></div>
          <div>
            <SectionHeading
              eyebrow="Working together"
              title="Work together, with clear next steps."
              description="We learn about your business, agree what is included and share progress at key points. You stay involved in decisions that affect your customers and team."
            />
            <Link className="text-link" to="/our-process/">
              See how our process works <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </PageContainer>
      </section>
      <CTASection
        eyebrow="START A CONVERSATION"
        title="Tell us what you would like to improve."
        description="We can learn about your business, talk through your options and help identify a practical next step."
      />
    </>
  );
}
