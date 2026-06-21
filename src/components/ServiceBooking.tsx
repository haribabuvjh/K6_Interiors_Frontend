import { getMaintenanceTypes, getServiceTypes } from "@/lib/api";
import PlateHeading from "./PlateHeading";
import MeasureLine from "./MeasureLine";
import ServiceBookingForm from "./ServiceBookingForm";

/**
 * "Book a service / maintenance visit" — a Yamaha-style booking block.
 * The customer picks a service type, a maintenance type, a date and a time
 * slot; the team manages the lists and the bookings from the Django admin.
 * Lives at the bottom of the Services page (anchor: #book-service).
 */
export default async function ServiceBooking() {
  const [serviceTypes, maintenanceTypes] = await Promise.all([
    getServiceTypes(),
    getMaintenanceTypes(),
  ]);

  return (
    <section id="book-service" className="section-y mx-auto max-w-6xl px-5">
      <PlateHeading
        index="03"
        kicker="Book a visit"
        title="Book a service or"
        accentWord="maintenance."
        meta="Pick a date & time"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <span className="label-caps">How it works</span>
          <MeasureLine className="mt-3 w-14" />
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-ink/70">
            <li className="flex gap-4">
              <span className="font-display text-lg tabular-nums text-accent-600">01</span>
              <span>Choose the service and the type of maintenance you need.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-lg tabular-nums text-accent-600">02</span>
              <span>Pick a preferred date and a time slot that suits you.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-lg tabular-nums text-accent-600">03</span>
              <span>We call to confirm and our team arrives on schedule.</span>
            </li>
          </ol>

          <div className="mt-10 border-t border-ink/10 pt-6 text-sm text-ink/70">
            <p className="label-caps text-ink/50">Prefer to call?</p>
            <p className="mt-3 space-x-2">
              <a href="tel:+918608177061" className="hover:text-brand">+91 86081 77061</a>
              <span className="text-ink/30">·</span>
              <a href="tel:+916383956066" className="hover:text-brand">+91 63839 56066</a>
            </p>
            <p className="mt-2 text-muted">Mon–Sun · 10am – 8pm</p>
          </div>
        </aside>

        <div className="border border-ink/10 bg-cream-100 p-6 sm:p-8">
          <ServiceBookingForm
            serviceTypes={serviceTypes}
            maintenanceTypes={maintenanceTypes}
          />
        </div>
      </div>
    </section>
  );
}
