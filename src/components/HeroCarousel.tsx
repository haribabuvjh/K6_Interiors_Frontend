"use client";

import { useEffect, useState } from "react";

// Images live in /public as hero-1.jpg .. hero-10.jpg
const IMAGES = Array.from({ length: 10 }, (_, i) => `/hero-${i + 1}.jpg`);
const INTERVAL_MS = 3000;

/**
 * Auto-rotating hero image panel. Cross-fades to the next interior photo
 * every 3 seconds. Replace/add files in /public (hero-1.jpg, hero-2.jpg, ...)
 * to change the pictures — no code change needed if you keep the same names.
 */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand/10">
      {IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="A modern interior designed by K6 Interiors"
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* subtle brand tint over the photo for a cohesive look */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/30 via-transparent to-transparent" />

      {/* dots indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {IMAGES.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-cream" : "w-1.5 bg-cream/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
