/**
 * Brass "wax seal" medallion — the hand-signed atelier mark.
 * Anchors the CtaBand headline and the lead-form success state.
 */
export default function WaxSeal({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-grid place-items-center rounded-full shadow-craft ring-1 ring-inset ring-cream/40 ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 32% 30%, var(--color-accent), var(--color-accent-600))",
      }}
    >
      <span
        className="font-display font-semibold leading-none text-brand"
        style={{ fontSize: size * 0.38 }}
      >
        K6
      </span>
    </span>
  );
}
