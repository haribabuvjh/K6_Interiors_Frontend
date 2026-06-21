import { getHeroImages, getProjects, getServices, getTestimonials } from "@/lib/api";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";

export default async function HomePage() {
  const [services, projects, testimonials, heroImages] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
    getHeroImages(),
  ]);

  return (
    <>
      <Hero images={heroImages.map((h) => h.image)} />
      <Marquee />
      <Services services={services} />
      <HowItWorks />
      <Portfolio projects={projects} showViewAll />
      <Testimonials testimonials={testimonials} />
      <CtaBand />
    </>
  );
}
