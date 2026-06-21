"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Fallback if the backend returns no hero images (or is unreachable).
// Bundled photos live in /public as hero-1.jpg .. hero-10.jpg
const FALLBACK = Array.from({ length: 10 }, (_, i) => `/hero-${i + 1}.jpg`);
const INTERVAL_MS = 3000;

/**
 * The hero "cover plate": a contact-sheet frame whose interior photo slowly
 * cross-fades through the hero images with a near-imperceptible Ken-Burns
 * drift. Photos come from the backend (`/api/k6/hero-images/`, managed in the
 * Django admin) and fall back to the bundled stills when none are available.
 * A brass plate counter ("03 / 10") and a thin brass progress bar replace the
 * old dots. Reduced-motion stops the rotation and shows a single still.
 */
export default function HeroCarousel({ images }: { images?: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const list = images && images.length ? images : FALLBACK;

  useEffect(() => {
    if (reduce || list.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, list.length]);

  return (
    <div className="group relative bg-cream p-1.5 shadow-craft ring-1 ring-ink/10">
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-5 w-5 border-l-2 border-t-2 border-accent" />
      <span className="pointer-events-none absolute right-0 top-0 z-10 h-5 w-5 border-r-2 border-t-2 border-accent" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-5 w-5 border-b-2 border-l-2 border-accent" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-5 w-5 border-b-2 border-r-2 border-accent" />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-plate">
        {list.map((src, i) => (
          <motion.img
            // eslint-disable-next-line @next/next/no-img-element
            key={src}
            src={src}
            alt="A modern interior designed by K6 Interiors"
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
            animate={
              reduce
                ? { opacity: i === index ? 1 : 0 }
                : { opacity: i === index ? 1 : 0, scale: i === index ? 1.06 : 1 }
            }
            transition={{
              opacity: { duration: 1, ease: "easeInOut" },
              scale: { duration: INTERVAL_MS / 1000 + 1, ease: "linear" },
            }}
          />
        ))}

        {/* legibility tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-900/35 via-transparent to-transparent" />

        {/* plate counter */}
        <div className="absolute left-4 top-4">
          <span className="rounded-sm bg-cream/90 px-2.5 py-1 font-display text-xs tabular-nums text-brand shadow-sm">
            {String(index + 1).padStart(2, "0")} / {list.length}
          </span>
        </div>

        {/* brass progress bar (re-fills every interval) */}
        <div className="absolute inset-x-4 bottom-4 h-px bg-cream/30">
          {!reduce && (
            <motion.div
              key={index}
              className="h-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
