import type { Service } from "@/lib/api";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Fallback content if the API returns nothing (e.g. backend not seeded yet).
const FALLBACK: Pick<Service, "name" | "description" | "starting_price">[] = [
  { name: "Modular Kitchen", description: "Smart, durable kitchens built to fit your space.", starting_price: 120000 },
  { name: "Wardrobes", description: "Sliding and hinged wardrobes with custom storage.", starting_price: 45000 },
  { name: "Living Room", description: "TV units, false ceilings and feature walls.", starting_price: 60000 },
  { name: "Bedroom", description: "Beds, side tables and cosy bedroom interiors.", starting_price: 80000 },
];

function inr(n: number | null | undefined) {
  if (!n) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Services({ services }: { services: Service[] }) {
  const items = services.length ? services : FALLBACK;

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        eyebrow="What we do"
        title="Interior services, designed to last"
        subtitle="One team for design, manufacturing and installation — so your project stays seamless from first sketch to handover."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05}>
            <div className="group h-full rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 font-display text-xl font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-cream">
                {s.name.charAt(0)}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {s.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{s.description}</p>
              {inr(s.starting_price) && (
                <p className="mt-4 text-sm font-semibold text-brand">
                  Starting {inr(s.starting_price)}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
