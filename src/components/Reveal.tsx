"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * Scroll-reveal primitive for the Folio language.
 *   fade    — opacity + lift + slight de-blur (default; back-compatible)
 *   curtain — image "develops" in via a clip-path wipe + gentle zoom
 * All motion is gated by prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade" | "curtain";
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  if (variant === "curtain") {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.06 }}
          whileInView={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
