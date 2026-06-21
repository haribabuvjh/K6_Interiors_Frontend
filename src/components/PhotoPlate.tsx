"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import MeasureLine from "./MeasureLine";

type Caption = { plate?: string; title: string; meta?: string };

/**
 * Contact-sheet "plate" frame used for every photo on the site.
 * A cream mat with four brass corner brackets, a curtain-wipe image reveal and a
 * gentle scroll parallax. On hover the plate lifts and the corners extend.
 * NOTE: `src` is passed straight to a raw <img> so absolute Django image URLs
 * keep working (we intentionally do not use next/image here).
 */
export default function PhotoPlate({
  src,
  alt,
  ratio = "4 / 5",
  caption,
  priority = false,
  parallax = true,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  caption?: Caption;
  priority?: boolean;
  parallax?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const active = parallax && !reduce;
  const y = useTransform(scrollYProgress, [0, 1], active ? [-12, 12] : [0, 0]);

  return (
    <figure className={`group relative ${className}`}>
      <div className="relative bg-cream p-1.5 ring-1 ring-ink/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-craft">
        <Corner className="left-0 top-0 border-l-2 border-t-2" />
        <Corner className="right-0 top-0 border-r-2 border-t-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <div
          ref={ref}
          className="relative overflow-hidden rounded-plate"
          style={{ aspectRatio: ratio }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={src}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover"
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0)", scale: 1.2 }}
              whileInView={reduce ? undefined : { clipPath: "inset(0% 0 0 0)", scale: 1.14 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE }}
              style={reduce ? { scale: 1.14 } : undefined}
            />
          </motion.div>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-4">
          <MeasureLine className="w-10" />
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <span className="font-display text-lg text-ink">{caption.title}</span>
            {caption.plate && (
              <span className="label-caps shrink-0">{caption.plate}</span>
            )}
          </div>
          {caption.meta && <p className="mt-1 text-sm text-muted">{caption.meta}</p>}
        </figcaption>
      )}
    </figure>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 h-4 w-4 border-accent transition-all duration-500 group-hover:h-[22px] group-hover:w-[22px] ${className}`}
    />
  );
}
