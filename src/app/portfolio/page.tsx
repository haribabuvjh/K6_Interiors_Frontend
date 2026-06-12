import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import Portfolio from "@/components/Portfolio";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Portfolio — Nestora Interiors",
  description: "A gallery of kitchens, wardrobes and living spaces by Nestora.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <>
      <section className="bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
            Portfolio
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Spaces we&apos;ve designed and built for homeowners.
          </p>
        </div>
      </section>
      <Portfolio projects={projects} />
      <CtaBand />
    </>
  );
}
