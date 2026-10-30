export const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: "easeOut" },
  },
} as const;

export const staggerChildrenVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.04, staggerChildren: 0.08 },
  },
} as const;

export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: "easeOut" },
  },
} as const;
