import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services — K6 Interiors",
  description: "Modular kitchens, wardrobes, living rooms and full-home interiors.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <section className="bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Design, manufacturing and installation under one roof.
          </p>
        </div>
      </section>
      <Services services={services} />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
