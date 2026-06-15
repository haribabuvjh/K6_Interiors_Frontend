"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* decorative brass blob */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand"
          >
            Full-home interiors, end to end
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-semibold leading-tight text-brand sm:text-5xl lg:text-6xl"
          >
            Interiors that feel like home.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-md text-lg text-muted"
          >
            From modular kitchens to wardrobes and living rooms, K6 Interiors designs,
            builds and installs your space — on time and on budget.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="rounded-full bg-brand px-7 py-3 font-semibold text-cream shadow-sm transition-colors hover:bg-brand-700"
            >
              Book a free consultation
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-brand/30 px-7 py-3 font-semibold text-brand transition-colors hover:bg-brand/5"
            >
              View our work
            </Link>
          </motion.div>

          <div className="mt-10 flex gap-8 text-sm text-muted">
            <div>
              <div className="font-display text-2xl font-semibold text-brand">500+</div>
              homes designed
            </div>
            <div>
              <div className="font-display text-2xl font-semibold text-brand">10 yr</div>
              warranty
            </div>
            <div>
              <div className="font-display text-2xl font-semibold text-brand">45 days</div>
              avg. install
            </div>
          </div>
        </div>

        {/* Auto-rotating hero image panel (changes every 3s). */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </section>
  );
}
