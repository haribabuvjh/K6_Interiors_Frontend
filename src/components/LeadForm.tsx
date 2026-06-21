"use client";

import { useState } from "react";
import {
  submitContact,
  submitConsultation,
  type LeadPayload,
} from "@/lib/api";
import WaxSeal from "./WaxSeal";

const SERVICES = ["Modular Kitchen", "Wardrobe", "Living Room", "Bedroom", "Full Home"];
const BUDGETS = ["Under ₹1L", "₹1L – ₹3L", "₹3L – ₹6L", "₹6L+"];

// Editorial "ledger" field — filled cream surface with a single hairline that
// turns brass on focus (keeps a visible 2px focus border for accessibility).
const inputClass =
  "w-full rounded-none border-0 border-b border-ink/20 bg-cream-100 px-1 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-b-2 focus:border-accent";

export default function LeadForm({
  variant = "contact",
}: {
  variant?: "contact" | "consultation";
}) {
  const isConsult = variant === "consultation";
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload: LeadPayload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      budget: String(fd.get("budget") ?? ""),
      service_type: String(fd.get("service_type") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (isConsult) {
      const d = String(fd.get("preferred_date") ?? "");
      if (d) payload.preferred_date = d;
    }

    if (!payload.name || !payload.phone || !payload.email) {
      setStatus("error");
      setError("Name, phone and email are required.");
      return;
    }

    const res = isConsult
      ? await submitConsultation(payload)
      : await submitContact(payload);

    if (res.ok) {
      setStatus("ok");
    } else {
      setStatus("error");
      setError(
        typeof res.errors === "string"
          ? res.errors
          : "Please check the form and try again."
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-ink/10 bg-cream-100 p-10 text-center">
        <div className="flex justify-center">
          <WaxSeal size={64} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-medium italic text-brand">
          Thank you
        </h3>
        <p className="mt-2 text-muted">
          We&apos;ve received your details and will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" placeholder="Full name *" aria-label="Full name" aria-required="true" aria-invalid={status === "error" || undefined} className={inputClass} required />
        <input name="phone" placeholder="Phone *" aria-label="Phone number" aria-required="true" aria-invalid={status === "error" || undefined} className={inputClass} required />
        <input name="email" type="email" placeholder="Email *" aria-label="Email address" aria-required="true" aria-invalid={status === "error" || undefined} className={inputClass} required />
        <input name="city" placeholder="City" aria-label="City" className={inputClass} />
        <select name="service_type" aria-label="Service interested in" className={inputClass} defaultValue="">
          <option value="" disabled>Service interested in</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="budget" aria-label="Budget range" className={inputClass} defaultValue="">
          <option value="" disabled>Budget range</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {isConsult && (
          <input
            name="preferred_date"
            type="date"
            className={`${inputClass} sm:col-span-2`}
            aria-label="Preferred consultation date"
          />
        )}
      </div>

      <textarea
        name="message"
        rows={4}
        placeholder="Tell us about your project"
        aria-label="Tell us about your project"
        className={inputClass}
      />

      {status === "error" && (
        <p className="text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brand px-7 py-3 font-semibold text-cream transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "loading"
          ? "Sending…"
          : isConsult
          ? "Book free consultation"
          : "Send message"}
      </button>
    </form>
  );
}
