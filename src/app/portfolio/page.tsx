import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import Portfolio from "@/components/Portfolio";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Portfolio — K6 Interiors",
  description: "A gallery of kitchens, wardrobes and living spaces by K6 Interiors.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        kicker="Selected Work"
        title="Spaces we've designed &"
        accentWord="built."
        standfirst="A gallery of real homes — kitchens, wardrobes and living spaces designed and built by K6 Interiors."
        photo="/hero-4.jpg"
      />
      <Portfolio projects={projects} />
      <CtaBand />
    </>
  );
}
