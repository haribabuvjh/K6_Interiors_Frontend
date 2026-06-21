import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import MeasureLine from "@/components/MeasureLine";

export const metadata: Metadata = {
  title: "Contact — K6 Interiors",
  description: "Book a free consultation or send us a message.",
};

const LEDGER = [
  { k: "Phone", v: ["+91 86081 77061", "+91 63839 56066"], hrefs: ["tel:+918608177061", "tel:+916383956066"] },
  { k: "Email", v: ["admin@k6interiors.in"], hrefs: ["mailto:admin@k6interiors.in"] },
  { k: "Hours", v: ["Mon–Sun · 10am – 8pm"] },
  { k: "Cities", v: ["Across Tamil Nadu · Bengaluru · Hyderabad"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Let's design your"
        accentWord="home."
        standfirst="Book a free consultation — we'll get back to you within one business day."
        photo="/hero-5.jpg"
      />

      <section className="section-y mx-auto max-w-6xl px-5">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <aside>
            <span className="label-caps">Reach us</span>
            <MeasureLine className="mt-3 w-14" />
            <p className="mt-6 max-w-sm text-ink/70">
              Tell us a little about your space and we&apos;ll take it from there.
              No pressure, no cost — just expert advice on layout, materials and
              budget so you can plan with confidence.
            </p>

            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {LEDGER.map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label-caps text-ink/50">{row.k}</dt>
                  <dd className="text-right text-sm text-ink/80">
                    {row.v.map((val, idx) => (
                      <span key={val} className="block">
                        {row.hrefs?.[idx] ? (
                          <a href={row.hrefs[idx]} className="hover:text-brand">
                            {val}
                          </a>
                        ) : (
                          val
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          <div>
            <span className="label-caps">Free consultation</span>
            <MeasureLine className="mt-3 w-14" />
            <div className="mt-8 border border-ink/10 bg-cream-100 p-6 sm:p-8">
              <LeadForm variant="consultation" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
