import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { sectionRevealVariants } from "../lib/motionVariants";
import { useIsHydrated } from "../lib/useIsHydrated";

type ScrollRevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollRevealSection({
  children,
  className,
  id,
}: ScrollRevealSectionProps) {
  const motionReady = useIsHydrated();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
    margin: "0px 0px -40px 0px",
  });
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      animate={
        reduceMotion === false && motionReady
          ? isInView
            ? "visible"
            : "hidden"
          : "visible"
      }
      className={className}
      id={id}
      initial={motionReady && reduceMotion === false ? "hidden" : false}
      key={motionReady ? "animated" : "static"}
      ref={sectionRef}
      variants={sectionRevealVariants}
    >
      {children}
    </motion.section>
  );
}
