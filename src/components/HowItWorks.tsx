import Reveal from "./Reveal";
import MeasureLine from "./MeasureLine";
import PlateHeading from "./PlateHeading";

const steps = [
  { n: "01", title: "Free consultation", text: "Tell us your space, style and budget. We listen and advise." },
  { n: "02", title: "Design & 3D layout", text: "Our designers craft a layout with materials, finishes and a clear quote." },
  { n: "03", title: "Manufacturing", text: "Your interiors are precision-made in our partner factories." },
  { n: "04", title: "Install & handover", text: "We install on schedule and hand over a home that's ready to live in." },
];

export default function HowItWorks() {
  return (
    <section className="grain-overlay relative isolate overflow-hidden bg-brand-700">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, var(--color-brand-900) 100%)",
        }}
      />
      <div className="section-y relative mx-auto max-w-6xl px-5">
        <PlateHeading
          index="02"
          kicker="The Process"
          title="A simple path to your"
          accentWord="new space"
          meta="From first sketch to handover"
          tone="cream"
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* connecting brass line (desktop) */}
          <MeasureLine className="absolute inset-x-0 top-7 hidden md:block" tone="brass" />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative border-l border-cream/20 pl-5 md:border-l-0 md:pl-0">
                <span className="relative inline-block bg-brand-700 pr-3 font-display text-6xl font-light leading-none text-cream md:pr-4">
                  <span className="text-accent">{s.n}</span>
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-cream">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
