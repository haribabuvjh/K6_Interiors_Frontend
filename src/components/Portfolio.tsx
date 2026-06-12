"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/api";
import SectionHeading from "./SectionHeading";

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

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const hasReal = projects.length > 0;

  const visible = useMemo(() => {
    if (!hasReal) return [];
    return active === "all"
      ? projects
      : projects.filter((p) => p.category === active);
  }, [projects, active, hasReal]);

  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        eyebrow="Our work"
        title="A glimpse of recent projects"
        subtitle="Real homes, designed and built by K6 Interiors."
      />

      {hasReal && (
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === f.key
                  ? "bg-brand text-cream"
                  : "bg-white text-ink/70 hover:bg-brand/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {hasReal
          ? visible.map((p, i) => (
              <motion.figure
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                    {p.category_display}
                  </p>
                  <p className="mt-1 font-display text-lg text-ink">{p.title}</p>
                </figcaption>
              </motion.figure>
            ))
          : PLACEHOLDERS.map((p, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div
                  className={`h-56 w-full bg-gradient-to-br ${
                    ["from-brand to-brand-700", "from-accent to-accent-600", "from-brand-300 to-brand"][i % 3]
                  }`}
                />
                <figcaption className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                    {p.category_display}
                  </p>
                  <p className="mt-1 font-display text-lg text-ink">{p.title}</p>
                </figcaption>
              </figure>
            ))}
      </div>

      {!hasReal && (
        <p className="mt-8 text-center text-sm text-muted">
          Project photos coming soon — add them from the admin panel to show them here.
        </p>
      )}
    </section>
  );
}
