"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    stars: 5,
    text: "Thank you so much for always serving us with a warm smile. Everything is always clean, organized, and welcoming. Special thanks to Nikhil Sir for the delicious treats and excellent hospitality.",
    author: "Deeksha Srivastava",
    role: "Local Guide",
  },
  {
    stars: 5,
    text: "One of the best places around Kanpur to spend quality time with family and friends. Great food, amazing service, and beautiful views.",
    author: "Maitreyi Jha",
    role: "Premium Member",
  },
  {
    stars: 5,
    text: "The KitKat shake was absolutely delicious. High quality ingredients and wonderful hospitality. Highly recommended!",
    author: "Rani Chaurasia",
    role: "Regular Visitor",
  },
  {
    stars: 5,
    text: "Excellent shopping layout and convenient parking space. A complete premium experience for Kanpur locals.",
    author: "Aman Bajpai",
    role: "Verified Buyer",
  },
  {
    stars: 5,
    text: "The suites are remarkably clean and well-serviced. Felt like a premium hotel experience in the heart of Bithoor.",
    author: "Sneha Mishra",
    role: "Overnight Guest",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Intro animations
      gsap.from(".testimonial-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      // Infinite horizontal marquee scroll
      if (!prefersReducedMotion) {
        gsap.to(".marquee-inner", {
          xPercent: -50,
          repeat: -1,
          duration: 35,
          ease: "none",
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Double the reviews array to create a seamless infinite loop
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section ref={containerRef} className="relative w-full bg-background-secondary py-32 overflow-hidden border-b border-border/20">
      
      {/* Background glow lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 mb-16">
        
        {/* Rating Header Info */}
        <div className="testimonial-header text-center">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground font-bold leading-tight mb-6">
            What Our <span className="text-primary italic">Guests Say</span>
          </h2>
          
          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-primary fill-primary" />
              ))}
            </div>
            <div className="mt-2 text-foreground/90 font-medium">
              <span className="font-heading text-2xl text-primary font-bold">⭐ 4.9</span> / 5
            </div>
            <p className="text-xs text-muted tracking-widest uppercase">Based on 60+ Google Reviews</p>
          </div>
        </div>
      </div>

      {/* Testimonials Marquee Row */}
      <div className="w-full overflow-hidden relative flex py-4 mask-gradient-horizontal z-20">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-secondary to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-secondary to-transparent z-30 pointer-events-none" />

        <div className="marquee-inner flex gap-8 whitespace-nowrap w-fit">
          {marqueeItems.map((rev, idx) => (
            <div
              key={idx}
              className="testimonial-card group relative overflow-hidden rounded-2xl bg-background/30 border border-border/30 p-8 md:p-10 flex flex-col justify-between min-h-[280px] w-[320px] md:w-[380px] transition-all duration-500 backdrop-blur-md shadow-2xl hover:border-primary/40 flex-shrink-0 whitespace-normal select-none"
            >
              {/* Soft Reflected Light Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="z-10 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={16} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <Quote size={24} className="text-primary/20" />
                </div>
                
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic font-light">
                  "{rev.text}"
                </p>
              </div>

              <div className="z-10 mt-6 border-t border-border/20 pt-4">
                <span className="block font-heading text-base text-foreground font-semibold">
                  {rev.author}
                </span>
                <span className="text-xs text-primary tracking-wider uppercase font-medium mt-0.5 block">
                  {rev.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
