"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blocks = [
  {
    num: "01",
    title: "Exceptional Service",
    desc: "A warm, dedicated team centered around hospitality, excellent guest relations, and customer support.",
  },
  {
    num: "02",
    title: "Clean Environment",
    desc: "Highest standards of order, deep daily cleaning, and hygiene management across all levels.",
  },
  {
    num: "03",
    title: "Prime Location",
    desc: "Perfect position in Lovkush Nagar, Bithoor, offering serene scenic views and easy access.",
  },
  {
    num: "04",
    title: "Luxury Facilities",
    desc: "A beautiful mix of premium fitness center, stays, cave theme, and curated shopping destination.",
  },
  {
    num: "05",
    title: "Affordable Pricing",
    desc: "Luxury experiences priced thoughtfully to ensure high value for our guests.",
  },
  {
    num: "06",
    title: "Family Friendly",
    desc: "A safe, positive, and spacious destination built for multi-generational experiences.",
  },
  {
    num: "07",
    title: "Modern Infrastructure",
    desc: "Constructed with advanced security monitoring, modern elevators, and custom interior design.",
  },
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Assemble block elements on scroll
      gsap.from(".why-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why-choose-us" className="relative w-full bg-background py-32 overflow-hidden border-b border-border/20">
      
      {/* Background soft ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Distinction</span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground font-bold max-w-2xl mx-auto leading-tight">
            Why We Are <span className="text-primary italic">Preferred</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg mx-auto">
            Our commitment to quality, cleanliness, and premium hospitality sets us apart.
          </p>
        </div>

        {/* Floating Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blocks.map((block, idx) => (
            <div
              key={idx}
              className="why-block group relative overflow-hidden rounded-2xl bg-background-secondary/30 border border-border/20 p-8 flex flex-col gap-6 transition-all duration-500 shadow-xl hover:border-primary/30 hover:bg-background-secondary/50"
            >
              {/* Light Reflection glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <span className="font-heading text-4xl text-primary/30 group-hover:text-primary transition-colors duration-500 font-bold">
                  {block.num}
                </span>
                <div className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground font-semibold mb-3 group-hover:text-primary transition-colors duration-350">
                  {block.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {block.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
