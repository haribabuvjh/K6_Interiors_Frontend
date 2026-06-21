import MeasureLine from "./MeasureLine";
import BrushUnderline from "./BrushUnderline";
import Reveal from "./Reveal";

/**
 * Shared photographic masthead for inner pages — replaces the old flat
 * solid-emerald banner. A full-bleed interior photo with an emerald scrim, a
 * brass breadcrumb + measure-line, and an oversized Fraunces title.
 */
export default function PageHeader({
  index,
  kicker,
  title,
  accentWord,
  standfirst,
  photo,
}: {
  index?: string;
  kicker: string;
  title: string;
  accentWord?: string;
  standfirst?: string;
  photo: string;
}) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand/45 to-brand/15" />

      <div className="relative mx-auto flex h-[46vh] min-h-[20rem] max-w-6xl flex-col justify-end px-5 pb-12 sm:h-[52vh] md:h-[56vh]">
        <Reveal>
          <span className="label-caps text-accent">
            {index ? `${index} / ` : "FOLIO / "}
            {kicker}
          </span>
          <MeasureLine className="mt-4 w-16" />
          <h1 className="mt-5 max-w-3xl font-display text-display-2 font-normal leading-[1.02] tracking-tight text-cream">
            {title}
            {accentWord && (
              <>
                {" "}
                <BrushUnderline>
                  <span className="font-display italic">{accentWord}</span>
                </BrushUnderline>
              </>
            )}
          </h1>
          {standfirst && (
            <p className="mt-4 max-w-xl text-cream/85">{standfirst}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
