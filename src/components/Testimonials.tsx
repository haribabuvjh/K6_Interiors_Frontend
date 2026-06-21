"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/lib/api";
import PlateHeading from "./PlateHeading";
import MeasureLine from "./MeasureLine";
import { EASE } from "@/lib/motion";

const FALLBACK: Pick<Testimonial, "customer_name" | "city" | "review" | "rating">[] = [
  { customer_name: "Priya S.", city: "Chennai", review: "Loved the modular kitchen. The team was on time, on budget, and the finish is flawless — it genuinely feels like a different home.", rating: 5 },
  { customer_name: "Rahul M.", city: "Bengaluru", review: "Great wardrobe design and a very professional team. Every detail was thought through and delivered exactly as promised.", rating: 5 },
  { customer_name: "Anita K.", city: "Hyderabad", review: "Beautiful living room makeover. They listened to how we actually live and designed around it. Highly recommend.", rating: 4 },
];

const INTERVAL_MS = 7000;

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.length ? testimonials : FALLBACK;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, items.length]);

  const t = items[i];
  const avg =
    Math.round(
      (items.reduce((sum, x) => sum + (x.rating || 0), 0) / items.length) * 10
    ) / 10;
  const go = (dir: number) =>
    setI((v) => (v + dir + items.length) % items.length);

  return (
    <section className="bg-cream-100">
      <div className="section-y mx-auto max-w-6xl px-5">
        <PlateHeading
          index="04"
          kicker="Voices"
          title="Homeowners love working with"
          accentWord="K6."
          meta={`${items.length}+ homeowners · avg ${avg.toFixed(1)}`}
        />

        <div className="mt-12 grid items-start gap-8 sm:grid-cols-[auto_1fr]">
          <span
            aria-hidden
            className="font-display text-7xl leading-none text-accent/50 sm:text-8xl"
          >
            “
          </span>

          <div className="min-h-[10rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-display text-2xl font-light italic leading-snug text-ink sm:text-3xl"
              >
                {t.review}
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 max-w-xs">
              <MeasureLine className="w-12" />
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <span className="label-caps text-ink/70">
                    {t.customer_name}
                    {t.city ? ` — ${t.city}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg tabular-nums text-accent-600">
                    {Number(t.rating).toFixed(1)}
                  </span>
                  <span className="text-sm text-accent-600" aria-label={`${t.rating} out of 5`}>
                    {"★".repeat(t.rating)}
                    <span className="text-accent/30">{"★".repeat(5 - t.rating)}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {items.length > 1 && (
          <div className="mt-10 flex items-center gap-6">
            <span className="label-caps text-ink/40 tabular-nums">
              {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-accent hover:text-brand"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-accent hover:text-brand"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
