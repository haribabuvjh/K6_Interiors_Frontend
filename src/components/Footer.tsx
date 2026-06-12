import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-display text-lg font-semibold text-brand">
              N
            </span>
            <span className="font-display text-xl font-semibold text-cream">
              Nestora
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            Interiors that feel like home. Modular kitchens, wardrobes and
            full-home design, built end to end.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-accent">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-cream">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-cream">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-cream">Blog</Link></li>
            <li><Link href="/about" className="hover:text-cream">About</Link></li>
            <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-accent">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>Modular Kitchens</li>
            <li>Wardrobes</li>
            <li>Living Rooms</li>
            <li>Bedrooms</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-accent">
            Get in touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>hello@nestora.example</li>
            <li>+91 90000 00000</li>
            <li>Chennai · Bengaluru · Hyderabad</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-cream/60">
          © {new Date().getFullYear()} Nestora Interiors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
