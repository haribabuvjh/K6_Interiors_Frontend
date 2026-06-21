"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/api";
import PlateHeading from "./PlateHeading";
import PhotoPlate from "./PhotoPlate";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "kitchen", label: "Kitchen" },
  { key: "living_room", label: "Living Room" },
  { key: "bedroom", label: "Bedroom" },
  { key: "wardrobe", label: "Wardrobe" },
];

// Shown when the backend has no projects yet, so the gallery never looks empty.
const PLACEHOLDERS = [
  { title: "Warm Modular Kitchen", category_display: "Modular Kitchen" },
  { title: "Minimal Living Room", category_display: "Living Room" },
  { title: "Walk-in Wardrobe", category_display: "Wardrobe" },
  { title: "Cosy Master Bedroom", category_display: "Bedroom" },
  { title: "Island Kitchen", category_display: "Modular Kitchen" },
  { title: "Feature TV Wall", category_display: "Living Room" },
];

const GRADIENTS = [
  "from-brand to-brand-700",
  "from-accent to-accent-600",
  "from-brand-300 to-brand",
];

function ratioFor(i: number, featured: boolean) {
  if (featured) return "16 / 11";
  return i % 3 === 1 ? "4 / 5" : "4 / 3";
}

export default function Portfolio({
  projects,
  showViewAll = false,
}: {
  projects: Project[];
  showViewAll?: boolean;
}) {
  const [active, setActive] = useState("all");
  const hasReal = projects.length > 0;

  const visible = useMemo(() => {
    if (!hasReal) return [];
    return active === "all"
      ? projects
      : projects.filter((p) => p.category === active);
  }, [projects, active, hasReal]);

  return (
    <section id="portfolio" className="section-y mx-auto max-w-6xl px-5">
      <PlateHeading
        index="03"
        kicker="Selected Work"
        title="A glimpse of recent"
        accentWord="projects"
        meta="Real homes, designed & built"
      />

      {hasReal && (
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {FILTERS.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`relative pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  on ? "text-brand" : "text-ink/50 hover:text-brand"
                }`}
              >
                {f.label}
                {on && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute -bottom-px left-0 h-px w-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {hasReal
          ? visible.map((p, i) => {
              const featured = p.is_featured || i === 0;
              return (
                <motion.div
                  key={p.id}
                  layout
                  className={featured ? "sm:col-span-2" : ""}
                >
                  <PhotoPlate
                    src={p.image}
                    alt={p.title}
                    ratio={ratioFor(i, featured)}
                    caption={{
                      plate: `Plate ${String(i + 1).padStart(2, "0")}`,
                      title: p.title,
                      meta: [p.category_display, p.city].filter(Boolean).join(" · "),
                    }}
                  />
                </motion.div>
              );
            })
          : PLACEHOLDERS.map((p, i) => (
              <div key={i} className={i === 0 ? "sm:col-span-2" : ""}>
                <figure className="group relative">
                  <div className="relative bg-cream p-1.5 ring-1 ring-ink/10">
                    <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent" />
                    <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-accent" />
                    <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent" />
                    <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent" />
                    <div
                      className={`w-full rounded-plate bg-gradient-to-br ${GRADIENTS[i % 3]}`}
                      style={{ aspectRatio: ratioFor(i, i === 0) }}
                    />
                  </div>
                  <figcaption className="mt-4">
                    <span className="block h-px w-10 bg-accent/70" />
                    <p className="mt-3 font-display text-lg text-ink">{p.title}</p>
                    <p className="mt-1 text-sm text-muted">{p.category_display}</p>
                  </figcaption>
                </figure>
              </div>
            ))}
      </div>

      {!hasReal && (
        <p className="mt-10 text-center text-sm text-muted">
          Project photos coming soon — add them from the admin panel to show them here.
        </p>
      )}

      {showViewAll && hasReal && (
        <div className="mt-12">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-1.5 font-semibold text-brand"
          >
            <span className="relative">
              View full portfolio
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 group-hover:scale-x-50" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
