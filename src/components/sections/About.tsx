"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Text reveal
      const words = gsap.utils.toArray(".about-word");
      
      gsap.from(words, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: prefersReducedMotion ? false : 1,
        },
        opacity: prefersReducedMotion ? 1 : 0.1,
        y: prefersReducedMotion ? 0 : 20,
        stagger: prefersReducedMotion ? 0 : 0.1,
        ease: "power2.out",
      });

      if (!prefersReducedMotion) {
        // Layered imagery parallax
        const images = gsap.utils.toArray(".about-image");
        images.forEach((img: any, i) => {
          gsap.to(img, {
            yPercent: -8 * (i + 1),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraph = "More than just a destination, Royal Tower Mart is an experience crafted for those who appreciate modern convenience combined with premium hospitality. Located in the heart of Bithoor, we bring together world-class fitness, luxury stays, immersive entertainment, and exquisite dining under one spectacular roof. Discover a space where every detail is designed to elevate your lifestyle, surrounded by a clean, family-friendly atmosphere that feels like home, yet entirely extraordinary.";

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-background py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2" ref={textRef}>
          <h2 className="font-heading text-primary text-lg uppercase tracking-widest mb-8">Our Story</h2>
          <div className="font-heading text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground/90">
            {paragraph.split(" ").map((word, i) => (
              <span key={i} className="about-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="text-center">
              <span className="block font-heading text-4xl text-primary">60+</span>
              <span className="text-sm text-muted uppercase tracking-wider">Reviews</span>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <span className="block font-heading text-4xl text-primary">4.9</span>
              <span className="text-sm text-muted uppercase tracking-wider">Rating</span>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <span className="block font-heading text-4xl text-primary">5</span>
              <span className="text-sm text-muted uppercase tracking-wider">Levels</span>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center" ref={imagesRef}>
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px]" />
          
          <div className="about-image absolute left-4 sm:left-10 top-10 w-44 h-56 sm:w-60 sm:h-76 md:w-64 md:h-80 bg-background-secondary rounded-2xl overflow-hidden shadow-2xl border border-border/50 z-10">
            <Image 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
              alt="Premium convenience store shelves and products at Royal Tower Mart"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          </div>
          
          <div className="about-image absolute right-4 sm:right-10 bottom-10 w-52 h-68 sm:w-64 sm:h-84 md:w-72 md:h-96 bg-background-secondary rounded-2xl overflow-hidden shadow-2xl border border-border/50 z-20">
            <Image 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
              alt="Luxury hotel room interior design comfort hotel stay"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
