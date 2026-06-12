import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About — K6 Interiors",
  description: "Who we are and how we design interiors that feel like home.",
};

const values = [
  { title: "Design-led", text: "Every project starts with how you live, not a catalogue." },
  { title: "Transparent pricing", text: "Clear quotes with no hidden costs, ever." },
  { title: "Built to last", text: "Quality materials backed by a 10-year warranty." },
  { title: "On-time delivery", text: "Project timelines we actually keep." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
            About K6 Interiors
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            We&apos;re a team of designers and makers turning houses into homes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-brand">
              Interiors, done the right way
            </h2>
            <p className="mt-4 text-muted">
              K6 Interiors was built on a simple belief: great interiors shouldn&apos;t be
              stressful or unpredictable. We bring design, manufacturing and
              installation under one roof, so you get a single accountable team
              from first idea to final handover.
            </p>
            <p className="mt-4 text-muted">
              Whether it&apos;s a compact modular kitchen or a full-home fit-out, we
              focus on craft, clarity and timelines you can trust.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-700 p-6">
              <div className="grid h-full grid-cols-2 gap-4">
                <div className="rounded-2xl bg-accent/80" />
                <div className="rounded-2xl bg-cream/20" />
                <div className="rounded-2xl bg-cream/20" />
                <div className="rounded-2xl bg-accent/40" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-brand">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
