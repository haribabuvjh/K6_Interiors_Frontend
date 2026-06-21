// Materials marquee — the site's single continuous "heartbeat".
// A thin full-bleed emerald band of materials in Fraunces italic, scrolling
// slowly (pauses on hover; static under prefers-reduced-motion via globals.css).

const ITEMS = [
  "Walnut",
  "Brushed Brass",
  "Italian Marble",
  "Linen",
  "Terrazzo",
  "Fluted Glass",
  "Oak",
  "Quartz",
];

function Run() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {ITEMS.map((it) => (
        <span
          key={it}
          className="flex items-center gap-8 whitespace-nowrap px-8 font-display text-lg italic text-cream/90"
        >
          {it}
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-track relative overflow-hidden border-y border-cream/10 bg-brand py-4">
      <div className="flex w-max animate-marquee">
        <Run />
        <Run />
      </div>
    </div>
  );
}
