"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const floors = [
  {
    id: "entertainment",
    title: "Entertainment Level",
    subtitle: "Themed Cave Experience",
    description: "An immersive environment with warm ambient lighting and moving light rays.",
    height: "h-32 md:h-40",
  },
  {
    id: "upper",
    title: "Upper Level",
    subtitle: "Luxury Rooms",
    description: "Comfortable, premium stays with a luxury hotel feel.",
    height: "h-32 md:h-40",
  },
  {
    id: "second",
    title: "Second Floor",
    subtitle: "Modern Gym",
    description: "State-of-the-art fitness center with dynamic lighting.",
    height: "h-32 md:h-40",
  },
  {
    id: "ground",
    title: "Ground Floor",
    subtitle: "Premium Convenience Store",
    description: "Everything you need, presented in a clean, modern environment.",
    height: "h-40 md:h-48",
  },
];

export function BuildingShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section while we scroll through the floors
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Initially hide all floors (move them down and fade them out)
      gsap.set(".floor-block", { y: 100, opacity: 0, filter: "brightness(0.3)" });
      gsap.set(".floor-content", { x: -50, opacity: 0 });

      // Build the timeline
      // We animate from ground floor (last in array, but visually at the bottom) up to entertainment
      // Since it's a visual stack, ground is at the bottom, entertainment at the top.
      const reversedFloors = [...floors].reverse(); // ground, second, upper, entertainment

      reversedFloors.forEach((floor, index) => {
        tl.to(`.floor-block-${floor.id}`, {
          y: 0,
          opacity: 1,
          filter: "brightness(1)",
          duration: 1,
          ease: "power2.out",
        }, index * 0.8) // Overlap the animations slightly
        .to(`.floor-content-${floor.id}`, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }, "<0.2"); // Start slightly after the block starts revealing
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-background-secondary overflow-hidden flex items-center justify-center py-20">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Content Reveal */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-8 relative h-[60vh] md:h-[80vh]">
          <div className="mb-4">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Explore The <span className="text-primary italic">Tower</span>
            </h2>
            <p className="text-muted max-w-md">
              A vertical journey through premium experiences. Watch the tower come alive as you ascend.
            </p>
          </div>

          <div className="relative flex-1">
            {floors.map((floor) => (
              <div 
                key={`content-${floor.id}`} 
                className={cn(`floor-content floor-content-${floor.id}`, "absolute bottom-0 w-full")}
                style={{ bottom: floors.findIndex(f => f.id === floor.id) * 20 + '%' }} // Rough positioning for visual stack
              >
                <div className="bg-background/80 backdrop-blur-md border border-border p-6 rounded-2xl shadow-2xl max-w-sm">
                  <span className="text-xs font-medium uppercase tracking-widest text-primary mb-2 block">{floor.title}</span>
                  <h3 className="text-xl font-heading text-foreground mb-2">{floor.subtitle}</h3>
                  <p className="text-sm text-muted">{floor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Building Visualization */}
        <div className="w-full md:w-1/2 flex items-end justify-center h-[60vh] md:h-[80vh] relative perspective-1000">
          <div ref={buildingRef} className="flex flex-col justify-end w-full max-w-md gap-4 transform-style-3d rotate-y-[-10deg]">
            {floors.map((floor) => (
              <div 
                key={`block-${floor.id}`}
                className={cn(
                  `floor-block floor-block-${floor.id}`,
                  "relative w-full rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm overflow-hidden",
                  floor.height
                )}
              >
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                
                {/* Structure details */}
                <div className="absolute bottom-0 w-full h-1 bg-primary/20" />
                <div className="flex h-full items-center justify-center p-4">
                  <span className="font-heading text-2xl text-white/10 font-bold uppercase tracking-widest">{floor.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
