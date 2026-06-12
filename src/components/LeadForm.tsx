"use client";

import { useState } from "react";
import {
  submitContact,
  submitConsultation,
  type LeadPayload,
} from "@/lib/api";

const SERVICES = ["Modular Kitchen", "Wardrobe", "Living Room", "Bedroom", "Full Home"];
const BUDGETS = ["Under ₹1L", "₹1L – ₹3L", "₹3L – ₹6L", "₹6L+"];

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

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

    if (!payload.name || !payload.phone) {
      setStatus("error");
      setError("Name and phone are required.");
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
      <div className="rounded-2xl border border-brand/20 bg-white p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-cream">
          ✓
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-brand">
          Thank you!
        </h3>
        <p className="mt-2 text-muted">
          We&apos;ve received your details and will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Full name *" className={inputClass} required />
        <input name="phone" placeholder="Phone *" className={inputClass} required />
        <input name="email" type="email" placeholder="Email" className={inputClass} />
        <input name="city" placeholder="City" className={inputClass} />
        <select name="service_type" className={inputClass} defaultValue="">
          <option value="" disabled>Service interested in</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="budget" className={inputClass} defaultValue="">
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
        className={inputClass}
      />

      {status === "error" && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
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
