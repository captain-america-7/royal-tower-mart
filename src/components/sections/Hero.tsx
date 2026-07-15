"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();
      
      tl.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      })
      .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.8");

      // Parallax Effect on Scroll
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to(".hero-content", {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Cinematic Background */}
      <div className="hero-bg absolute inset-0 z-0 scale-105">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/0 to-background/0 z-10" />
        {/* Placeholder for high-quality background image */}
        <div 
          className="h-full w-full bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888073574-e3505cdd81d3?q=80&w=2940&auto=format&fit=crop')" }}
        />
      </div>

      {/* Content */}
      <div className="hero-content relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div ref={textRef} className="overflow-hidden mb-6">
          <h1 className="hero-title font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-foreground tracking-tight flex flex-col md:flex-row gap-2 md:gap-6">
            <span className="block">Premium</span>
            <span className="block text-primary italic">Lifestyle</span>
            <span className="block">Destination</span>
          </h1>
        </div>
        
        <p className="hero-subtitle mb-12 max-w-2xl text-lg md:text-xl text-muted font-light leading-relaxed">
          Where Shopping, Fitness & Comfort Meet. Redefining convenience and luxury in Bithoor, Kanpur.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="hero-cta group relative overflow-hidden rounded-full bg-primary px-8 py-4 font-medium text-background transition-transform hover:scale-105" data-magnetic>
            <span className="relative z-10">Explore Royal Tower</span>
            <div className="absolute inset-0 bg-primary-hover transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0" />
          </button>
          <button className="hero-cta group relative rounded-full border border-border px-8 py-4 font-medium text-foreground transition-colors hover:bg-white/5" data-magnetic>
            Book Your Stay
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
        <ArrowDown size={16} className="text-primary" />
      </div>
    </section>
  );
}
