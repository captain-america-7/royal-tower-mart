"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const floors = [
  {
    id: "third",
    title: "Third Floor",
    subtitle: "Themed Cave Experience",
    description: "An immersive, stone-carved atmospheric lounge with custom ambient lighting and premium vibes.",
    height: "h-32 md:h-40",
    image: "https://images.unsplash.com/photo-1507163879411-5e9275ab4557?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "second",
    title: "Second Floor",
    subtitle: "Modern Gym Center",
    description: "State-of-the-art fitness equipment, biomechanical trainers, and high-energy ambient lighting.",
    height: "h-32 md:h-40",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "ground",
    title: "Ground Floor",
    subtitle: "Premium Convenience Store",
    description: "A meticulously organized, ultra-clean mart featuring a gourmet coffee counter and local specialties.",
    height: "h-32 md:h-40",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "basement",
    title: "Basement",
    subtitle: "Luxury Stays & Lobby",
    description: "Exquisite and peaceful overnight suites designed for relaxation and premium comfort.",
    height: "h-40 md:h-48",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop",
  },
];

export function BuildingShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

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

      // Initially hide all floors
      gsap.set(".floor-block", { y: 100, opacity: 0, filter: "brightness(0.3)" });
      gsap.set(".floor-content", { y: 50, opacity: 0 });

      // Build the timeline from basement (last) up to third floor (first)
      const reversedFloors = [...floors].reverse();

      reversedFloors.forEach((floor, index) => {
        // Reveal block
        tl.to(`.floor-block-${floor.id}`, {
          y: 0,
          opacity: 1,
          filter: "brightness(1)",
          duration: 1,
          ease: "power2.out",
        }, index * 0.8);
        
        // Fade out previous card
        if (index > 0) {
          const prevFloor = reversedFloors[index - 1];
          tl.to(`.floor-content-${prevFloor.id}`, {
            opacity: 0,
            y: -50,
            duration: 0.4,
            ease: "power2.in",
          }, index * 0.8 - 0.2);
        }

        // Fade in active card
        tl.fromTo(`.floor-content-${floor.id}`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          index * 0.8 + 0.2
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className={cn(
      "relative w-full bg-background-secondary overflow-hidden flex items-center justify-center py-20",
      prefersReducedMotion ? "h-auto" : "h-screen"
    )}>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className={cn(
        "container mx-auto px-6 lg:px-12 h-full flex flex-col items-center gap-12",
        prefersReducedMotion ? "py-10" : "md:flex-row"
      )}>
        
        {/* Left Side: Content Card Frame */}
        <div className={cn(
          "w-full flex flex-col justify-center gap-8 relative",
          prefersReducedMotion ? "h-auto md:w-full" : "md:w-1/2 h-[60vh] md:h-[80vh]"
        )}>
          <div className={cn(
            "relative",
            prefersReducedMotion ? "flex flex-col gap-6" : "flex-1 min-h-[350px] w-full"
          )}>
            {floors.map((floor) => (
              <div 
                key={`content-${floor.id}`} 
                className={cn(
                  `floor-content floor-content-${floor.id}`,
                  prefersReducedMotion ? "relative w-full opacity-100 translate-y-0" : "absolute inset-0 flex items-center justify-center md:justify-start"
                )}
              >
                <div className="bg-background/80 backdrop-blur-md border border-border p-8 rounded-2xl shadow-2xl w-full max-w-md">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">{floor.title}</span>
                  <h3 className="text-2xl md:text-3xl font-heading text-foreground mb-4">{floor.subtitle}</h3>
                  <p className="text-sm md:text-base text-muted leading-relaxed">{floor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Building Visualization */}
        {!prefersReducedMotion && (
          <div className="w-full md:w-1/2 flex items-end justify-center h-[60vh] md:h-[80vh] relative perspective-1000">
            <div ref={buildingRef} className="flex flex-col justify-end w-full max-w-md gap-4 transform-style-3d rotate-y-[-10deg]">
              {floors.map((floor) => (
                <div 
                  key={`block-${floor.id}`}
                  className={cn(
                    `floor-block floor-block-${floor.id}`,
                    "relative w-full rounded-lg border border-primary/30 bg-background/50 backdrop-blur-sm overflow-hidden group hover:border-primary/60 transition-colors",
                    floor.height
                  )}
                >
                  {/* Floor Background Image */}
                  <Image 
                    src={floor.image}
                    alt={floor.subtitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 z-10 pointer-events-none" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity z-10 pointer-events-none" />
                  
                  {/* Structure details */}
                  <div className="absolute bottom-0 w-full h-1 bg-primary/20 z-20" />
                  <div className="flex h-full items-center justify-center p-4 relative z-20">
                    <span className="font-heading text-2xl text-foreground font-bold uppercase tracking-widest text-center">{floor.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
