import { ArrowLeft, ArrowUpRight, CheckCircle2, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { SectionHeading } from "../components/SectionHeading";
import { getPageDefinition } from "../lib/pages";

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const page = getPageDefinition(pathname);
  const reduceMotion = useReducedMotion();

  return (
    <section className="placeholder-page">
      <PageContainer>
        <Link className="back-link" to="/">
          <ArrowLeft size={16} aria-hidden="true" /> Back to home
        </Link>
        <div className="placeholder-layout">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.45 }}
            className="placeholder-copy"
          >
            <SectionHeading
              as="h1"
              eyebrow={page.eyebrow}
              title={page.heading}
              description={page.introduction}
            />
            <p className="placeholder-note">
              <CheckCircle2 size={17} aria-hidden="true" />
              Introductory page — further information will be added as it is
              confirmed.
            </p>
            <div className="placeholder-actions">
              <PrimaryButton to="/contact">Discuss Your Project</PrimaryButton>
              <SecondaryButton to="/services/" icon>
                Explore Services
              </SecondaryButton>
            </div>
          </motion.div>
          <div aria-hidden="true" className="placeholder-visual">
            <div className="placeholder-visual-ring placeholder-ring-one" />
            <div className="placeholder-visual-ring placeholder-ring-two" />
            <div className="placeholder-visual-center">
              <Compass size={38} strokeWidth={1.35} />
            </div>
            <span className="placeholder-orbit-label">PURPOSEFUL DIGITAL</span>
            <span className="placeholder-orbit-node">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="placeholder-page">
      <PageContainer className="not-found-content">
        <SectionHeading
          as="h1"
          eyebrow="404 / PAGE NOT FOUND"
          title="This page isn’t here."
          description="The link may be out of date, or the page may have moved."
        />
        <PrimaryButton to="/">Return home</PrimaryButton>
      </PageContainer>
    </section>
  );
}
