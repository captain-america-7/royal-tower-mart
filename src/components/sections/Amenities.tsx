"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, Dumbbell, Bed, Coffee, ParkingCircle, Users, Wind, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    icon: ShoppingBag,
    title: "Convenience Store",
    desc: "A fully stocked modern grocery and essentials experience.",
  },
  {
    icon: Dumbbell,
    title: "Modern Gym",
    desc: "State-of-the-art strength & cardio training facilities.",
  },
  {
    icon: Bed,
    title: "Luxury Rooms",
    desc: "Exquisite stays designed for relaxation and comfort.",
  },
  {
    icon: Coffee,
    title: "Food & Drinks",
    desc: "Fresh treats, KitKat shakes, hot snacks and premium coffee.",
  },
  {
    icon: ParkingCircle,
    title: "Valet Parking",
    desc: "Spacious and secure parking for all our visitors.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    desc: "A warm, welcoming, and safe environment for all ages.",
  },
  {
    icon: Wind,
    title: "Air Conditioned",
    desc: "Fully air-conditioned spaces ensuring comfortable visits.",
  },
  {
    icon: Sparkles,
    title: "Clean Environment",
    desc: "Highest standards of hygiene, cleanliness, and order.",
  },
];

export function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".amenity-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="amenities" className="relative w-full bg-background-secondary py-32 overflow-hidden border-t border-b border-border/20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="font-heading text-primary text-lg uppercase tracking-widest mb-4">Premium Amenities</h2>
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground max-w-2xl mx-auto leading-tight">
            Designed for the <span className="text-primary italic">Modern Lifestyle</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => (
            <AmenityCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenityCard({ item }: { item: typeof amenities[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Premium tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="amenity-card group relative overflow-hidden rounded-2xl bg-background/40 border border-border/30 p-8 flex flex-col justify-between h-72 transition-all duration-300 backdrop-blur-sm cursor-none select-none transform-style-3d shadow-xl"
    >
      {/* Light Reflection Glare Effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full w-48 h-48 bg-primary/20 blur-[60px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
          }}
        />
      )}

      {/* Translucent Hover Border highlight */}
      <div 
        className="absolute inset-0 border border-primary/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <div className="z-10 flex flex-col gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500">
          <item.icon size={24} className="stroke-[1.5]" />
        </div>
        <h3 className="font-heading text-xl text-foreground/90 group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>
      </div>

      <p className="z-10 text-sm text-muted group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
}
