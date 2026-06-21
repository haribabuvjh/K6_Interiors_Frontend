import Link from "next/link";
import ScrollTopLink from "./ScrollTopLink";

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <ScrollTopLink className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-sm bg-black ring-1 ring-inset ring-accent/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/k6-logo.png" alt="K6 Interiors logo" className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold text-brand">
              K6 Interiors
            </span>
            <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-accent-600">
              A K6 Folio
            </span>
          </span>
        </ScrollTopLink>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
          Interiors that feel like home — modular kitchens, wardrobes and
          full-home design, built end to end.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <div className="md:border-l md:border-ink/10 md:pl-8">
            <h4 className="label-caps">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              <li><Link href="/services" className="hover:text-brand">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-brand">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-brand">Blog</Link></li>
              <li><Link href="/about" className="hover:text-brand">About</Link></li>
              <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
            </ul>
          </div>

          <div className="md:border-l md:border-ink/10 md:pl-8">
            <h4 className="label-caps">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              <li>Modular Kitchens</li>
              <li>Wardrobes</li>
              <li>Living Rooms</li>
              <li>Bedrooms</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 md:border-l md:border-ink/10 md:pl-8">
            <h4 className="label-caps">Get in touch</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              <li><a href="mailto:admin@k6interiors.in" className="hover:text-brand">admin@k6interiors.in</a></li>
              <li><a href="tel:+918608177061" className="hover:text-brand">+91 86081 77061</a></li>
              <li><a href="tel:+916383956066" className="hover:text-brand">+91 63839 56066</a></li>
              <li>Mon–Sun · 10am – 8pm</li>
              <li>Across Tamil Nadu · Bengaluru · Hyderabad</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-xs text-muted">
          <span>© {new Date().getFullYear()} K6 Interiors. All rights reserved.</span>
          <span className="label-caps text-ink/40">A K6 Folio</span>
        </div>
      </div>
    </footer>
  );
}
