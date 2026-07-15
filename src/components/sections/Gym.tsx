"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const equipment = [
  {
    name: "Cardio Elite Suite",
    desc: "Equipped with state-of-the-art treadmill systems, cross trainers, and spin bikes with intelligent bio-feedback monitors.",
    img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Hammer Strength Stations",
    desc: "Premium plate-loaded resistance machines designed to mirror natural human movement for optimal conditioning.",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Olympic Free Weights",
    desc: "A massive custom weight rack area featuring premium polyurethane dumbbells, kettlebells, and bumper plates.",
    img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop",
  },
];

export function Gym() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      // Dynamic lighting pulse
      gsap.to(".gym-glow", {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pin the section and animate equipment slides
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Slide sequence
      const items = gsap.utils.toArray(".gym-slide");
      items.forEach((item: any, i) => {
        if (i === 0) return; // First is already visible
        tl.from(item, {
          yPercent: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        }, `slide-${i}`)
        .from(item.querySelector(".gym-slide-content"), {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, `slide-${i}+=0.5`);
      });

      // Animate Stats on Scroll
      gsap.from(".gym-stat-item", {
        scrollTrigger: {
          trigger: ".gym-stats-trigger",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} id="gym" className="relative h-screen w-full bg-background overflow-hidden flex flex-col justify-between">
      {/* Absolute Dynamic Glow Ambient Lights */}
      <div className="gym-glow absolute top-10 right-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-30" />
      <div className="gym-glow absolute bottom-10 left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none opacity-20" />

      {/* Header */}
      <div className="container mx-auto px-6 lg:px-12 pt-24 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-2">Second Floor</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
            The Elite <span className="text-primary italic">Gym</span>
          </h2>
        </div>
        <p className="text-muted max-w-sm text-sm md:text-base leading-relaxed">
          Uncompromised fitness experiences with modern machines, professional layout, and deep premium dark lighting.
        </p>
      </div>

      {/* Pinned Slides Container */}
      <div className="flex-1 w-full relative z-10 container mx-auto px-6 lg:px-12 flex items-center justify-center py-8">
        <div className={cn(
          "w-full h-full relative overflow-hidden rounded-3xl border border-border/40 bg-background-secondary/30 backdrop-blur-md shadow-2xl flex",
          prefersReducedMotion && "flex-col overflow-y-auto h-auto relative gap-8 p-4 md:p-8"
        )}>
          
          {equipment.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "gym-slide w-full h-full flex flex-col lg:flex-row items-center gap-8 p-6 md:p-12 lg:p-16 bg-background-secondary/95",
                prefersReducedMotion ? "relative" : "absolute inset-0 z-10"
              )}
              style={prefersReducedMotion ? {} : { zIndex: 10 + idx }}
            >
              {/* Image Box */}
              <div className="w-full lg:w-1/2 h-48 sm:h-72 lg:h-full relative rounded-2xl overflow-hidden border border-border/20 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                <Image
                  src={item.img}
                  alt={`High-end gym equipment: ${item.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[4s] ease-out group-hover:scale-105"
                />
              </div>

              {/* Info Box */}
              <div className="gym-slide-content w-full lg:w-1/2 flex flex-col justify-center gap-6">
                <span className="text-primary font-mono text-sm tracking-wider">0{idx + 1} / EQUIPMENT SPECIAL</span>
                <h3 className="font-heading text-2xl md:text-4xl text-foreground font-semibold">
                  {item.name}
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed max-w-md">
                  {item.desc}
                </p>
                <div className="flex flex-col gap-2">
                  {["Bio-feedback monitoring", "Premium soft-touch grips", "Certified clean after every session"].map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Stats Trigger Area (Just above footer area of this section) */}
      <div className="gym-stats-trigger w-full border-t border-border/20 bg-background-secondary/40 backdrop-blur-md py-8 z-10">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "24/7", label: "Timings Availability" },
            { value: "20+", label: "Advanced Equipment" },
            { value: "Certified", label: "Personal Trainers" },
            { value: "Premium", label: "Shower & Lockers" },
          ].map((stat, idx) => (
            <div key={idx} className="gym-stat-item">
              <span className="block font-heading text-2xl md:text-3xl text-primary font-bold">{stat.value}</span>
              <span className="text-xs text-muted uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
