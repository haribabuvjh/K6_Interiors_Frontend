import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import ServiceBooking from "@/components/ServiceBooking";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services — K6 Interiors",
  description: "Modular kitchens, wardrobes, living rooms and full-home interiors.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        kicker="Services"
        title="Design, build & install,"
        accentWord="end to end."
        standfirst="One team for design, manufacturing and installation — so your project stays seamless from first sketch to handover."
        photo="/hero-3.jpg"
      />
      <Services services={services} />
      <HowItWorks />
      <ServiceBooking />
      <CtaBand />
    </>
  );
}
