"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * The brass "measure line" — the site's single unifying device.
 * A 1px brass rule that draws itself across the page (scaleX 0→1) when scrolled
 * into view. Used as the eyebrow underline, plate top-rules, the hero baseline,
 * figcaption rules and section dividers.
 */
export default function MeasureLine({
  className = "",
  delay = 0,
  origin = "left",
  tone = "brass",
}: {
  className?: string;
  delay?: number;
  origin?: "left" | "center";
  tone?: "brass" | "cream";
}) {
  const reduce = useReducedMotion();
  const color = tone === "cream" ? "bg-cream/40" : "bg-accent/70";
  const originClass = origin === "center" ? "origin-center" : "origin-left";

  return (
    <motion.span
      aria-hidden
      className={`block h-px ${color} ${originClass} ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    />
  );
}
