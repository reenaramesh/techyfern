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
              <p className="eyebrow">ABOUT TECHYFERN DIGITAL</p>
              <h1>Technology and creativity, working toward the same goal.</h1>
              <p>
                Techyfern Digital brings together creative website design,
                software engineering and digital marketing to help businesses
                build stronger digital foundations and grow.
              </p>
              <Link className="text-link" to="/services/">
                Explore what we do <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div aria-hidden="true" className="company-hero-visual">
              <span className="company-orbit company-orbit-one" />
              <span className="company-orbit company-orbit-two" />
              <span className="company-orbit-core">T</span>
              <span className="company-orbit-node company-orbit-node-one">WEB</span>
              <span className="company-orbit-node company-orbit-node-two">BUILD</span>
              <span className="company-orbit-node company-orbit-node-three">GROW</span>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="company-purpose section-space">
        <PageContainer className="company-purpose-layout">
          <div>
            <SectionHeading
              eyebrow="Our purpose"
              title="Make digital work more useful for business."
              description="Businesses can lose time and opportunity when their website, marketing and everyday tools do not support one another. We help connect those parts around practical goals."
            />
          </div>
          <div className="company-purpose-note">
            <Compass size={22} aria-hidden="true" />
            <p>
              We help businesses improve how they show up online, manage
              important workflows and make informed decisions about what to
              build next.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="company-mission-section section-space">
        <PageContainer className="company-mission-grid">
          <article>
            <span className="company-mission-icon"><Target size={21} /></span>
            <p className="eyebrow">OUR MISSION</p>
            <h2>Bring clarity to digital challenges.</h2>
            <p>
              Help growing businesses choose and create useful digital
              experiences, software and marketing foundations that respond to
              real needs.
            </p>
          </article>
          <article>
            <span className="company-mission-icon"><Compass size={21} /></span>
            <p className="eyebrow">OUR VISION</p>
            <h2>A more connected way to grow.</h2>
            <p>
              Work toward a future where businesses can use technology with
              confidence: intentionally, responsibly and in ways their teams
              can sustain.
            </p>
          </article>
        </PageContainer>
      </section>

      <section className="company-services-section section-space">
        <PageContainer>
          <SectionHeading
            eyebrow="What we do"
            title="One connected digital toolkit."
            description="A clear website can support marketing. Useful software can support service delivery. Thoughtful measurement can help teams decide what to improve. We bring these disciplines into the same conversation."
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
            eyebrow="Industries we can serve"
            title="Different contexts. A shared focus on the people doing the work."
            description="Our services can be shaped for a range of business contexts. These are areas we can support, not a list of claimed clients or completed engagements."
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
              title="Good collaboration makes better decisions possible."
              description="We start with your context, agree what is in scope and share progress at meaningful review points. You stay involved in decisions that affect your customers, team and operations."
            />
            <Link className="text-link" to="/our-process/">
              See how our process works <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </PageContainer>
      </section>
      <CTASection
        eyebrow="START A CONVERSATION"
        title="Bring us the challenge you are working through."
        description="We can explore the business need together and discuss a practical next step."
      />
    </>
  );
}
