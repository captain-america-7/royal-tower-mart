"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    name: "Signature KitKat Shake",
    category: "Shakes",
    desc: "A rich, chocolatey blend topped with crushed KitKat bars and premium fresh cream.",
    img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1000&auto=format&fit=crop",
    price: "₹149",
    tag: "Best Seller",
  },
  {
    name: "Classic Cold Coffee",
    category: "Beverages",
    desc: "Brewed with premium arabica coffee beans, blended to absolute frothy perfection.",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop",
    price: "₹119",
  },
  {
    name: "Gourmet Savory Snacks",
    category: "Snacks",
    desc: "Delicious hot snacks, wraps, and finger foods prepared fresh on order.",
    img: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1000&auto=format&fit=crop",
    price: "₹99",
  },
  {
    name: "Delicate Royal Desserts",
    category: "Sweets",
    desc: "Decadent cakes, pastries, and traditional sweets crafted with high-quality ingredients.",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop",
    price: "₹129",
  },
  {
    name: "Family Meal Combos",
    category: "Meals",
    desc: "Hearty, sharing-sized family combo plates filled with delicious main items and appetizers.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    price: "₹399",
    tag: "Family Special",
  },
];

export function Food() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".food-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="food" className="relative w-full bg-background py-32 overflow-hidden border-b border-border/20">
      
      {/* Dynamic ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Cafe & Dining</span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground font-bold max-w-2xl mx-auto leading-tight">
            Indulge in <span className="text-primary italic">Exquisite Refreshments</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg mx-auto">
            From our signature KitKat shakes to full family meals, satisfy your cravings in a premium atmosphere.
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="food-card group relative overflow-hidden rounded-2xl bg-background-secondary/40 border border-border/30 shadow-xl transition-all duration-500 backdrop-blur-sm"
            >
              {/* Product Image Box */}
              <div className="relative h-64 w-full overflow-hidden">
                {item.tag && (
                  <div className="absolute top-4 left-4 z-20 bg-primary/95 text-background font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {item.tag}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent z-10" />
                <Image
                  src={item.img}
                  alt={`Gourmet menu item: ${item.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                />
              </div>

              {/* Product Content Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
                <div>
                  <span className="text-xs text-primary uppercase font-medium tracking-widest block mb-2">{item.category}</span>
                  <h3 className="font-heading text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border/20">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-primary fill-primary" />
                    <span className="text-sm font-semibold text-foreground">4.9</span>
                    <span className="text-xs text-muted">(Freshly Made)</span>
                  </div>
                  <span className="font-heading text-2xl text-primary font-bold">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
