"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Exterior",
  "Gym",
  "Rooms",
  "Food",
  "Cave",
  "Shopping Area",
];

const galleryItems = [
  {
    category: "Exterior",
    img: "https://images.unsplash.com/photo-1541888073574-e3505cdd81d3?q=80&w=800&auto=format&fit=crop",
    title: "Golden Hour View",
    size: "aspect-[4/5]",
  },
  {
    category: "Gym",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    title: "Hammer Strength Stations",
    size: "aspect-square",
  },
  {
    category: "Rooms",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
    title: "Executive Suite",
    size: "aspect-[4/3]",
  },
  {
    category: "Cave",
    img: "https://images.unsplash.com/photo-1507163879411-5e9275ab4557?q=80&w=800&auto=format&fit=crop",
    title: "Themed Cave Entry",
    size: "aspect-[4/5]",
  },
  {
    category: "Food",
    img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800&auto=format&fit=crop",
    title: "KitKat Shake Special",
    size: "aspect-square",
  },
  {
    category: "Shopping Area",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    title: "Premium Mart Aisles",
    size: "aspect-[3/4]",
  },
  {
    category: "Food",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
    title: "Classic Cold Coffee",
    size: "aspect-[4/5]",
  },
  {
    category: "Rooms",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    title: "Deluxe Bedroom",
    size: "aspect-square",
  },
  {
    category: "Exterior",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
    title: "Mart Night Lights",
    size: "aspect-[4/3]",
  },
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  useEffect(() => {
    // Filter items
    if (activeCategory === "All") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Re-trigger layout entry animation on category change
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [filteredItems]);

  return (
    <section ref={containerRef} id="gallery" className="relative w-full bg-background py-32 overflow-hidden border-b border-border/20">
      
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Visual Tour</span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground font-bold max-w-xl mx-auto leading-tight">
            Immersive <span className="text-primary italic">Gallery</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium tracking-wide border transition-all duration-300",
                activeCategory === cat
                  ? "bg-primary border-primary text-background"
                  : "bg-background-secondary/40 border-border/30 text-muted hover:border-primary/50 hover:text-foreground"
              )}
              data-magnetic
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <GalleryCard key={`${item.title}-${idx}`} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

function GalleryCard({ item }: { item: typeof galleryItems[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 12;
    const rotateY = (x - centerX) / 12;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "gallery-item group relative w-full overflow-hidden rounded-2xl bg-background-secondary/20 border border-border/20 shadow-xl transition-all duration-300 break-inside-avoid transform-style-3d cursor-none select-none",
        item.size
      )}
    >
      {/* Light Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-[3s] ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${item.img}')` }}
      />

      {/* Dark Overlay info panel */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
        <span className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">{item.category}</span>
        <h4 className="font-heading text-lg text-foreground font-semibold">
          {item.title}
        </h4>
      </div>
    </div>
  );
}
