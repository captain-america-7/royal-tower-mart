import { Hero } from "@/components/sections/Hero";
import { BuildingShowcase } from "@/components/sections/BuildingShowcase";
import { About } from "@/components/sections/About";
import { Gym } from "@/components/sections/Gym";
import { CafeExperience } from "@/components/sections/Cave";
import { Rooms } from "@/components/sections/Rooms";
import { Food } from "@/components/sections/Food";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { InteractiveBuilding } from "@/components/sections/InteractiveBuilding";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <BuildingShowcase />
      <About />
      <Gym />
      <CafeExperience />
      <Rooms />
      <Food />
      <Testimonials />
      <Gallery />
      <InteractiveBuilding />
      <WhyChooseUs />
      <FAQ />
      <Contact />
    </>
  );
}
