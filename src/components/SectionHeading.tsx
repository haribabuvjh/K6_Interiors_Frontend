import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-accent-600">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold text-brand sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-muted ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
