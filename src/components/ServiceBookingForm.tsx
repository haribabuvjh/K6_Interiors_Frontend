"use client";

import { useEffect, useState } from "react";
import {
  submitServiceBooking,
  type MaintenanceType,
  type ServiceBookingPayload,
  type ServiceType,
} from "@/lib/api";
import WaxSeal from "./WaxSeal";

// Time slots — values MUST match the backend ServiceBooking.TimeSlot choices.
const TIME_SLOTS = [
  { value: "10:00-12:00", label: "10:00 AM – 12:00 PM" },
  { value: "12:00-14:00", label: "12:00 PM – 2:00 PM" },
  { value: "14:00-16:00", label: "2:00 PM – 4:00 PM" },
  { value: "16:00-18:00", label: "4:00 PM – 6:00 PM" },
  { value: "18:00-20:00", label: "6:00 PM – 8:00 PM" },
];

const inputClass =
  "w-full rounded-none border-0 border-b border-ink/20 bg-cream-100 px-1 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-b-2 focus:border-accent";

export default function ServiceBookingForm({
  serviceTypes,
  maintenanceTypes,
}: {
  serviceTypes: ServiceType[];
  maintenanceTypes: MaintenanceType[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [minDate, setMinDate] = useState("");

  // Set the earliest selectable date to today on the client (avoids any
  // server/client date mismatch during hydration).
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const serviceType = Number(fd.get("service_type"));
    const maintenanceType = Number(fd.get("maintenance_type"));
    const payload: ServiceBookingPayload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      address: String(fd.get("address") ?? "").trim(),
      service_type: serviceType,
      maintenance_type: maintenanceType,
      preferred_date: String(fd.get("preferred_date") ?? ""),
      time_slot: String(fd.get("time_slot") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.phone || !payload.email) {
      setStatus("error");
      setError("Name, phone and email are required.");
      return;
    }
    if (!serviceType || !maintenanceType) {
      setStatus("error");
      setError("Please choose a service type and a maintenance type.");
      return;
    }
    if (!payload.preferred_date || !payload.time_slot) {
      setStatus("error");
      setError("Please pick a preferred date and time slot.");
      return;
    }

    const res = await submitServiceBooking(payload);
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
          Booking received
        </h3>
        <p className="mt-2 text-muted">
          Thank you — we&apos;ll call you to confirm your service visit shortly.
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

        <select name="service_type" aria-label="Service type" className={inputClass} defaultValue="" required>
          <option value="" disabled>Service type *</option>
          {serviceTypes.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select name="maintenance_type" aria-label="Maintenance type" className={inputClass} defaultValue="" required>
          <option value="" disabled>Maintenance type *</option>
          {maintenanceTypes.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <label className="flex flex-col gap-1">
          <span className="label-caps text-ink/50">Preferred date *</span>
          <input
            name="preferred_date"
            type="date"
            min={minDate || undefined}
            aria-label="Preferred date"
            className={inputClass}
            required
          />
        </label>
        <select name="time_slot" aria-label="Preferred time slot" className={`${inputClass} self-end`} defaultValue="" required>
          <option value="" disabled>Preferred time *</option>
          {TIME_SLOTS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <input name="address" placeholder="Service address" aria-label="Service address" className={`${inputClass} sm:col-span-2`} />
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Anything we should know? (optional)"
        aria-label="Additional details"
        className={inputClass}
      />

      {status === "error" && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brand px-7 py-3 font-semibold text-cream transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "loading" ? "Booking…" : "Book my service visit"}
      </button>
    </form>
  );
}
