"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroCarousel from "./HeroCarousel";
import BrushUnderline from "./BrushUnderline";
import MeasureLine from "./MeasureLine";
import { useCountUp } from "@/hooks/useCountUp";
import { EASE } from "@/lib/motion";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { ref, value: shown } = useCountUp(value);
  return (
    <div>
      <div className="font-display text-3xl font-medium tabular-nums text-brand">
        <span ref={ref}>{shown}</span>
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
        {label}
      </div>
    </div>
  );
}

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero({ images }: { images?: string[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <motion.div {...fade} transition={{ duration: 0.5, ease: EASE }}>
            <span className="label-caps">Full-home interiors · end to end</span>
            <MeasureLine className="mt-3 w-16" />
          </motion.div>

          <motion.h1
            {...fade}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
            className="mt-6 font-display text-display-1 font-light leading-[0.95] tracking-tight text-brand"
          >
            Interiors that
            <br className="hidden sm:block" /> feel like{" "}
            <BrushUnderline>
              <span className="font-display italic font-normal">home.</span>
            </BrushUnderline>
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/75"
          >
            From modular kitchens to wardrobes and living rooms, K6 Interiors
            designs, builds and installs your space — on time and on budget.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <Link
              href="/contact"
              className="rounded-full bg-brand px-7 py-3 font-semibold text-cream transition-colors hover:bg-brand-700"
            >
              Book a free consultation
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand"
            >
              <span className="relative">
                View the portfolio
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-accent transition-transform duration-300 group-hover:scale-x-50" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          {/* masthead stat ledger */}
          <div className="mt-12">
            <MeasureLine className="w-full" />
            <div className="mt-6 grid grid-cols-3 divide-x divide-ink/10">
              <div className="pr-4">
                <Stat value={500} suffix="+" label="homes designed" />
              </div>
              <div className="px-4">
                <Stat value={15} suffix=" yr" label="warranty" />
              </div>
              <div className="px-4">
                <Stat value={45} suffix=" days" label="avg. install" />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative"
        >
          <HeroCarousel images={images} />
        </motion.div>
      </div>
    </section>
  );
}
