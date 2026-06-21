"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollTopLink from "./ScrollTopLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
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
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-accent/25 bg-cream/95 backdrop-blur"
          : "bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <ScrollTopLink className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-sm bg-black ring-1 ring-inset ring-accent/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/k6-logo.png" alt="K6 Interiors logo" className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold text-brand">
              K6 Interiors
            </span>
            <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-accent-600">
              Interiors
            </span>
          </span>
        </ScrollTopLink>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    active ? "text-brand" : "text-ink/70 hover:text-brand"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="rounded-full border border-accent px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand transition-colors hover:bg-accent hover:text-brand"
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
        <ul className="space-y-1 border-t border-ink/10 bg-cream px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href} className="border-b border-ink/10 last:border-0">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full border border-accent px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-brand"
            >
              Free Consultation
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
