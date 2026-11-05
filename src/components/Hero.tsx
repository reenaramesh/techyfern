import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { fadeUpVariants, staggerChildrenVariants } from "../lib/motionVariants";
import { useIsHydrated } from "../lib/useIsHydrated";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { PageContainer } from "./PageContainer";
import { EditorialIllustration } from "./EditorialIllustration";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const motionReady = useIsHydrated();

  return (
    <section className="hero-section">
      <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
      <PageContainer className="hero-grid">
        <div className="hero-copy">
          <motion.div
            animate="visible"
            initial={motionReady && reduceMotion === false ? "hidden" : false}
            key={motionReady ? "animated" : "static"}
            variants={staggerChildrenVariants}
          >
            <motion.p className="hero-kicker" variants={fadeUpVariants}>
              <span className="status-dot" /> DIGITAL SERVICES FOR BENGALURU BUSINESSES
            </motion.p>
            <motion.h1 variants={fadeUpVariants}>
              Website design and digital marketing for Bengaluru businesses.
            </motion.h1>
            <motion.p
              className="hero-description"
              variants={fadeUpVariants}
            >
              Need a better website, digital marketing or software that saves
              time? TechyPraxis Digital helps you find a clear, practical way
              forward.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUpVariants}>
              <PrimaryButton to="/contact">Talk About Your Project</PrimaryButton>
              <SecondaryButton to="/#services" icon>
                Explore Our Services
              </SecondaryButton>
            </motion.div>
            <motion.div className="hero-trust-line" variants={fadeUpVariants}>
              <span>
                <Check aria-hidden="true" size={15} /> Clear advice for your needs
              </span>
              <span>
                <Check aria-hidden="true" size={15} /> Practical next steps
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate="visible"
          className="hero-art-wrap"
          initial={motionReady && reduceMotion === false ? "hidden" : false}
          key={motionReady ? "animated" : "static"}
          variants={fadeUpVariants}
        >
          <div className="hero-art-glow" />
          <EditorialIllustration
            className="hero-editorial-illustration"
            kind="workspace"
            priority
          />
          <div className="hero-caption">
            <span className="caption-mark">TP</span>
            <span>
              <strong>Make your digital presence work harder</strong>
              <small>Useful ideas. A clear way forward.</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </div>
        </motion.div>
      </PageContainer>
      <Link aria-label="Scroll to services" className="hero-scroll" to="/#services">
        <ArrowDown aria-hidden="true" size={16} />
      </Link>
    </section>
  );
}
