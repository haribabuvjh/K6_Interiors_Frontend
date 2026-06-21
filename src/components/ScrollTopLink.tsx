"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Logo link that goes to the home page AND smoothly scrolls to the top.
 * If you're already on the home page (e.g. scrolled to the footer), clicking
 * it scrolls back up instead of doing nothing. Honors reduced-motion.
 */
export default function ScrollTopLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href="/"
      className={className}
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
