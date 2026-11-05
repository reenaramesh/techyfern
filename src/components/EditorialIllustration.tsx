const illustrations = {
  workspace: {
    file: "digital-workspace",
    alt: "Illustration of a laptop and mobile website connected to design, marketing and automation tools.",
  },
  collaboration: {
    file: "creative-collaboration",
    alt: "Illustration of people planning a digital project with wireframes, design swatches and software building blocks.",
  },
  services: {
    file: "connected-services",
    alt: "Illustration connecting website design, digital marketing and business software as three complementary services.",
  },
} as const;

type EditorialIllustrationProps = {
  kind: keyof typeof illustrations;
  className?: string;
  priority?: boolean;
};

export function EditorialIllustration({
  kind,
  className = "",
  priority = false,
}: EditorialIllustrationProps) {
  const { file, alt } = illustrations[kind];
  const source = `${import.meta.env.BASE_URL}illustrations/${file}`;

  return (
    <img
      alt={alt}
      className={`editorial-illustration ${className}`}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      height={853}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1200px) 48vw, 590px"
      src={`${source}-1280.webp`}
      srcSet={`${source}-640.webp 640w, ${source}-1280.webp 1280w`}
      width={1280}
    />
  );
}
