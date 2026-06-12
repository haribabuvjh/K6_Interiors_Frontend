import type { Testimonial } from "@/lib/api";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FALLBACK: Pick<Testimonial, "customer_name" | "city" | "review" | "rating">[] = [
  { customer_name: "Priya S.", city: "Chennai", review: "Loved the modular kitchen. On time and on budget.", rating: 5 },
  { customer_name: "Rahul M.", city: "Bengaluru", review: "Great wardrobe design, very professional team.", rating: 5 },
  { customer_name: "Anita K.", city: "Hyderabad", review: "Beautiful living room makeover. Highly recommend.", rating: 4 },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.length ? testimonials : FALLBACK;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Homeowners love working with us"
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-6">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-ink/80">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-5 font-semibold text-brand">
                  {t.customer_name}
                  {t.city && <span className="font-normal text-muted"> · {t.city}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
