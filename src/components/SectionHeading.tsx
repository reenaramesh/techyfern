type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading-${align}${light ? " section-heading-light" : ""}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
