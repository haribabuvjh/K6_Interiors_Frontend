import Reveal from "./Reveal";
import MeasureLine from "./MeasureLine";
import BrushUnderline from "./BrushUnderline";

/**
 * Numbered "plate" section header — the editorial heading used site-wide.
 * A top hairline, a brass index row ("01 / SERVICES" left, a meta note right),
 * then an oversized Fraunces title with exactly one italic accent word carrying
 * the hand-drawn brass underline.
 *
 *   title       — the heading up to (but not including) the accent word
 *   accentWord  — the single italic, brush-underlined word (optional)
 *   tone        — "ink" on cream, "cream" on emerald dark spreads
 */
export default function PlateHeading({
  index,
  kicker,
  title,
  accentWord,
  meta,
  tone = "ink",
  center = false,
  className = "",
}: {
  index?: string;
  kicker: string;
  title: string;
  accentWord?: string;
  meta?: string;
  tone?: "ink" | "cream";
  center?: boolean;
  className?: string;
}) {
  const isCream = tone === "cream";
  const ruleColor = isCream ? "border-cream/25" : "border-ink/15";
  const titleColor = isCream ? "text-cream" : "text-brand";
  const labelColor = isCream ? "text-accent" : "";
  const metaColor = isCream ? "text-cream/50" : "text-ink/40";

  return (
    <Reveal className={className}>
      <div className={`border-t ${ruleColor} pt-5`}>
        <div className="flex items-center justify-between gap-4">
          <span className={`label-caps ${labelColor}`}>
            {index ? `${index} / ` : ""}
            {kicker}
          </span>
          {meta && (
            <span className={`label-caps ${metaColor} hidden sm:block`}>{meta}</span>
          )}
        </div>

        <h2
          className={`mt-6 max-w-3xl font-display text-display-2 font-normal leading-[1.04] tracking-tight ${titleColor} ${
            center ? "mx-auto text-center" : ""
          }`}
        >
          {title}
          {accentWord && (
            <>
              {" "}
              <BrushUnderline>
                <span className="font-display italic">{accentWord}</span>
              </BrushUnderline>
            </>
          )}
        </h2>
      </div>
    </Reveal>
  );
}
