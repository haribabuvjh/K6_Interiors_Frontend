import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import PhotoPlate from "@/components/PhotoPlate";
import MeasureLine from "@/components/MeasureLine";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About — K6 Interiors",
  description: "Who we are and how we design interiors that feel like home.",
};

const values = [
  { title: "Design-led", text: "Every project starts with how you live, not a catalogue." },
  { title: "Transparent pricing", text: "Clear quotes with no hidden costs, ever." },
  { title: "Built to last", text: "Quality materials backed by a 15-year warranty." },
  { title: "On-time delivery", text: "Project timelines we actually keep." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="Folio"
        kicker="About"
        title="Turning houses into"
        accentWord="homes."
        standfirst="We're a team of designers and makers obsessed with craft, clarity and timelines you can trust."
        photo="/hero-2.jpg"
      />

      <section className="section-y mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="label-caps">Our story</span>
            <MeasureLine className="mt-3 w-14" />
            <h2 className="mt-6 font-display text-display-3 font-normal leading-snug text-brand">
              Interiors, done the right way
            </h2>
            <p className="dropcap mt-5 text-ink/75">
              K6 Interiors was built on a simple belief: great interiors
              shouldn&apos;t be stressful or unpredictable. We bring design,
              manufacturing and installation under one roof, so you get a single
              accountable team from first idea to final handover.
            </p>
            <p className="mt-4 text-ink/75">
              Whether it&apos;s a compact modular kitchen or a full-home fit-out,
              we focus on craft, clarity and timelines you can trust.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-5">
              <div className="col-span-3">
                <PhotoPlate src="/hero-7.jpg" alt="An interior designed by K6" ratio="4 / 5" />
              </div>
              <div className="col-span-2">
                <PhotoPlate src="/hero-9.jpg" alt="A detail of a K6 interior" ratio="3 / 4" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <span className="label-caps">What we value</span>
          <MeasureLine className="mt-3 w-14" />
          <div className="mt-8">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.06}>
                <div className="grid grid-cols-1 gap-2 border-t border-ink/12 py-7 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span className="font-display text-3xl font-light tabular-nums text-accent-600 md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-brand md:col-span-4">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink/70 md:col-span-6">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-ink/12" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
