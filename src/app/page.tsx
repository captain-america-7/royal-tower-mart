import { Hero } from "@/components/sections/Hero";
import { BuildingShowcase } from "@/components/sections/BuildingShowcase";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <BuildingShowcase />
      <About />
      {/* 
        <Amenities />
        <Gym />
        <Cave />
        <Rooms />
        <Food />
        <Testimonials />
        <Gallery />
        <InteractiveBuilding />
        <WhyChooseUs />
        <FAQ />
      */}
      <div className="h-[200vh]">
         {/* Temporary spacing to test scroll */}
      </div>
    </>
  );
}
