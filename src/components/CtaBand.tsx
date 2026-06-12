import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-14 text-center">
          <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-accent/20 blur-2xl" />
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            Ready to design your home?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            Book a free, no-obligation consultation. We&apos;ll help you plan the
            space, the look and the budget.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-brand transition-colors hover:bg-accent-600"
          >
            Get your free consultation
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
