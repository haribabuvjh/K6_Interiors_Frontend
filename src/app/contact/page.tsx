import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact — Nestora Interiors",
  description: "Book a free consultation or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
            Let&apos;s design your home
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Book a free consultation — we&apos;ll get back to you within one
            business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand">
              Free consultation
            </h2>
            <p className="mt-2 text-muted">
              Tell us a little about your space and we&apos;ll take it from there.
            </p>
            <div className="mt-6">
              <LeadForm variant="consultation" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-brand">
                Reach us
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li><span className="font-medium text-ink">Phone:</span> +91 90000 00000</li>
                <li><span className="font-medium text-ink">Email:</span> hello@nestora.example</li>
                <li><span className="font-medium text-ink">Cities:</span> Chennai · Bengaluru · Hyderabad</li>
                <li><span className="font-medium text-ink">Hours:</span> Mon–Sat, 10am – 7pm</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-brand p-6 text-cream">
              <h3 className="font-display text-lg font-semibold">
                Why a free consultation?
              </h3>
              <p className="mt-2 text-sm text-cream/80">
                No pressure, no cost. Just expert advice on layout, materials and
                budget so you can plan with confidence.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
