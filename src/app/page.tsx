import { getProjects, getServices, getTestimonials } from "@/lib/api";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";

export default async function HomePage() {
  const [services, projects, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <Services services={services} />
      <HowItWorks />
      <Portfolio projects={projects} />
      <Testimonials testimonials={testimonials} />
      <CtaBand />
    </>
  );
}
