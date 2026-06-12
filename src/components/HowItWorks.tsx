import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  { n: "01", title: "Free consultation", text: "Tell us your space, style and budget. We listen and advise." },
  { n: "02", title: "Design & 3D layout", text: "Our designers craft a layout with materials, finishes and a clear quote." },
  { n: "03", title: "Manufacturing", text: "Your interiors are precision-made in our partner factories." },
  { n: "04", title: "Install & handover", text: "We install on schedule and hand over a home that's ready to live in." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="How it works"
          title="A simple path to your new space"
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl bg-cream p-6">
                <span className="font-display text-4xl font-semibold text-accent/60">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-brand">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
