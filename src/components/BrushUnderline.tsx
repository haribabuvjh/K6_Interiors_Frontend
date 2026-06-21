"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * Hand-drawn brass brush-underline for a single emphasized word.
 * Wrap the accent word; the SVG is absolutely positioned so it never affects
 * layout, and its stroke draws in (pathLength 0→1) on view.
 */
export default function BrushUnderline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-1.5 left-0 h-[0.38em] w-full overflow-visible"
      >
        <motion.path
          d="M2 8 C 38 3, 78 11, 118 5 S 178 3, 198 7"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        />
      </svg>
    </span>
  );
}
