import Link from "next/link";
import Reveal from "./Reveal";
import MeasureLine from "./MeasureLine";
import WaxSeal from "./WaxSeal";
import BrushUnderline from "./BrushUnderline";

export default function CtaBand() {
  return (
    <section className="grain-overlay relative isolate overflow-hidden bg-brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-8.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, transparent 35%, var(--color-brand-900) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-28">
        <Reveal className="flex flex-col items-center">
          <WaxSeal size={64} />
          <MeasureLine className="mt-8 w-24" origin="center" tone="brass" />

          <h2 className="mt-8 font-display text-display-2 font-light leading-[1.05] text-cream">
            Ready to design your{" "}
            <BrushUnderline>
              <span className="font-display italic">home?</span>
            </BrushUnderline>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-cream/80">
            Book a free, no-obligation consultation. We&apos;ll help you plan the
            space, the look and the budget.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full border border-accent bg-accent px-8 py-3 font-semibold text-brand transition-colors hover:bg-accent-600"
          >
            Book your free consultation
          </Link>

          <MeasureLine className="mt-10 w-24" origin="center" tone="brass" />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <a href="tel:+918608177061" className="label-caps text-accent hover:text-cream">
              +91 86081 77061
            </a>
            <a href="tel:+916383956066" className="label-caps text-accent hover:text-cream">
              +91 63839 56066
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
