"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-cream/95 backdrop-blur shadow-sm" : "bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-base font-bold tracking-tight text-cream">
            K6
          </span>
          <span className="font-display text-xl font-semibold text-brand">
            K6 Interiors
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-brand-700"
            >
              Free Consultation
            </Link>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-ink/10 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-ink/80 hover:text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-brand px-5 py-2 text-center font-semibold text-cream"
            >
              Free Consultation
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
