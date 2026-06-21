import type { Service } from "@/lib/api";
import Reveal from "./Reveal";
import PlateHeading from "./PlateHeading";

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
    <section id="services" className="section-y mx-auto max-w-6xl px-5">
      <PlateHeading
        index="01"
        kicker="Services"
        title="Interior services, designed to"
        accentWord="last."
        meta="Design · Manufacture · Install"
      />

      <div className="mt-12">
        {items.map((s, i) => {
          const price = inr(s.starting_price);
          return (
            <Reveal key={s.name} delay={(i % 4) * 0.05}>
              <div className="group relative grid grid-cols-1 gap-3 border-t border-ink/12 py-8 transition-colors hover:bg-brand/[0.05] md:grid-cols-12 md:items-center md:gap-6 md:px-4">
                <span className="pointer-events-none absolute left-0 top-0 hidden h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100 md:block" />
                <div className="flex items-baseline gap-4 md:col-span-5">
                  <span className="font-display text-lg tabular-nums text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-brand transition-transform duration-300 md:group-hover:translate-x-1">
                    {s.name}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-ink/70 md:col-span-4">
                  {s.description}
                </p>

                <div className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
                  {price && (
                    <span className="text-right">
                      <span className="label-caps block">From</span>
                      <span className="font-display text-lg tabular-nums text-brand">
                        {price}
                      </span>
                    </span>
                  )}
                  <span className="text-accent opacity-0 transition-all duration-300 md:-translate-x-2 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
        <div className="border-t border-ink/12" />
      </div>
    </section>
  );
}
