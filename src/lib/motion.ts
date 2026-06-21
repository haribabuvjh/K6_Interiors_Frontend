// Shared motion constants for the "Folio" design language.
// Calm, deliberate, "print being assembled" — never bouncy.
import type { Transition } from "framer-motion";

/** The house easing curve (expo-out). Typed as a bezier tuple for Framer. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const REVEAL_T: Transition = { duration: 0.6, ease: EASE };
export const CURTAIN_T: Transition = { duration: 0.95, ease: EASE };
