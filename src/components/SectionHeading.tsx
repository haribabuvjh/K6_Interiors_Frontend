import PlateHeading from "./PlateHeading";

/**
 * Back-compatible shim. The site now uses <PlateHeading> directly, but this
 * keeps any older call sites working by forwarding the eyebrow → kicker.
 */
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
    <div>
      <PlateHeading kicker={eyebrow ?? ""} title={title} center={center} />
      {subtitle && (
        <p
          className={`mt-4 text-ink/70 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
