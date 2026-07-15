"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/utils/cn";
import { Sparkles, Dumbbell, Bed, Coffee } from "lucide-react";

const buildingFloors = [
  {
    id: "entertainment",
    name: "Entertainment Level",
    subtitle: "Themed Cave Experience",
    desc: "An immersive, atmospheric custom stone cave setup designed for ultimate evening escapes, events, or peaceful relaxation.",
    img: "https://images.unsplash.com/photo-1507163879411-5e9275ab4557?q=80&w=600&auto=format&fit=crop",
    features: ["Stone Textures", "Ambient Lighting", "Private Lounges", "Sound System"],
    icon: Sparkles,
  },
  {
    id: "upper",
    name: "Upper Level",
    subtitle: "Luxury Staying Rooms",
    desc: "Premium executive stays designed to deliver luxury hotel level hospitality, complete privacy, and exceptional comfort.",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop",
    features: ["Smart TV Suite", "Hi-Speed Wi-Fi", "Valet Support", "Room Service"],
    icon: Bed,
  },
  {
    id: "second",
    name: "Second Floor",
    subtitle: "Modern Gym Center",
    desc: "Fully equipped athletic conditioning gym featuring top tier biomechanical machines, free weights, and dynamic interior lighting.",
    img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
    features: ["Personal Training", "Biofeedback Tech", "Clean Locker Suite", "Modern Cardio"],
    icon: Dumbbell,
  },
  {
    id: "ground",
    name: "Ground Floor",
    subtitle: "Convenience Store & Food",
    desc: "An ultra clean, highly organized department grocery mart with a refreshing gourmet coffee bar and quick snacks counter.",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
    features: ["Daily Groceries", "KitKat Shakes", "Frothy Cold Coffee", "Quick Checkout"],
    icon: Coffee,
  },
];

export function InteractiveBuilding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const [selectedFloor, setSelectedFloor] = useState(0);

  // Subtly tilt the building container relative to mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buildingRef.current) return;
    const rect = buildingRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    gsap.to(buildingRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buildingRef.current) return;
    gsap.to(buildingRef.current, {
      rotateX: -10, // Slight default tilt
      rotateY: -15, // Slight default tilt
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section ref={containerRef} id="interactive-building" className="relative w-full bg-background-secondary py-32 overflow-hidden border-b border-border/20 flex items-center justify-center">
      
      {/* Light glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Isometric Tower Visualization */}
        <div className="w-full lg:w-1/2 flex items-center justify-center h-[550px] perspective-1000">
          <div
            ref={buildingRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col-reverse justify-end w-full max-w-sm gap-4 transform-style-3d transition-transform duration-500"
            style={{ transform: "rotateX(-10deg) rotateY(-15deg)" }}
          >
            {buildingFloors.map((floor, idx) => (
              <button
                key={floor.id}
                onClick={() => setSelectedFloor(idx)}
                onMouseEnter={() => setSelectedFloor(idx)}
                className={cn(
                  "relative w-full h-28 rounded-xl border transition-all duration-500 overflow-hidden transform-style-3d cursor-none shadow-2xl",
                  selectedFloor === idx
                    ? "border-primary bg-primary/10 scale-105 shadow-primary/20"
                    : "border-border/30 bg-background/40 opacity-70 scale-95"
                )}
              >
                {/* Glowing light bars on highlight */}
                {selectedFloor === idx && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent animate-pulse" />
                )}
                
                {/* Structural elements */}
                <div className={cn(
                  "absolute bottom-0 w-full h-1.5 transition-colors duration-500",
                  selectedFloor === idx ? "bg-primary" : "bg-border/30"
                )} />

                {/* Inner label */}
                <div className="flex h-full items-center justify-between px-8 z-10 relative">
                  <span className="font-heading text-lg tracking-wider text-foreground font-semibold">
                    {floor.subtitle}
                  </span>
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-500",
                    selectedFloor === idx ? "bg-primary text-background" : "bg-background-secondary/80 text-muted"
                  )}>
                    <floor.icon size={20} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Dynamic Info Board */}
        <div className="w-full lg:w-1/2 bg-background/50 border border-border p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl min-h-[480px] flex flex-col justify-between transition-all duration-500">
          
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-primary text-xs uppercase tracking-widest block mb-1">
                  {buildingFloors[selectedFloor].name}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl text-foreground font-bold leading-tight">
                  {buildingFloors[selectedFloor].subtitle}
                </h3>
              </div>
            </div>

            {/* Floor image preview */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-border/20 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url('${buildingFloors[selectedFloor].img}')` }}
              />
            </div>

            <p className="text-muted leading-relaxed text-sm md:text-base">
              {buildingFloors[selectedFloor].desc}
            </p>
          </div>

          <div className="mt-8 border-t border-border/25 pt-6 flex flex-wrap gap-3">
            {buildingFloors[selectedFloor].features.map((feat, fIdx) => (
              <span
                key={fIdx}
                className="px-3.5 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-xs text-primary font-medium tracking-wide"
              >
                {feat}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
