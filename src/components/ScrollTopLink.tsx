"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Logo link that goes to the home page AND smoothly scrolls to the top.
 * If you're already on the home page (e.g. scrolled to the footer), clicking
 * it scrolls back up instead of doing nothing.
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
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {children}
    </Link>
  );
}
