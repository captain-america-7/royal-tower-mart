"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, Tv, ShieldCheck, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    name: "Royal Executive Suite",
    type: "Premium Stay",
    desc: "Our finest suite features premium custom bedding, private work lounge, clean ambient layout, and scenic windows overlooking Bithoor.",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000&auto=format&fit=crop",
    price: "₹3,499",
  },
  {
    name: "Deluxe Twin Comfort",
    type: "Family & Friends",
    desc: "Perfect for group stays, designed with two cozy beds, independent AC settings, clean bathroom suite, and complete family privacy.",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop",
    price: "₹2,499",
  },
];

export function Rooms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Room images parallax
      gsap.from(".room-img-container", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
        },
        yPercent: 10,
        scale: 0.95,
      });

      // Pinned Booking Card floating effect
      gsap.to(".booking-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          pin: false, // soft float
          scrub: 1,
        },
        yPercent: 15,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="rooms" className="relative bg-background-secondary py-32 overflow-hidden border-b border-border/20">
      
      {/* Decorative ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-2">Luxury Rooms</span>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground font-bold">
            Stay in <span className="text-primary italic">Comfort & Style</span>
          </h2>
          <p className="text-muted mt-4">
            Meticulously clean, modern infrastructure, and world-class hospitality for short and extended stays in Bithoor.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left: Rooms Slider & Info */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12">
            
            {/* Room Tabs */}
            <div className="flex border-b border-border/20">
              {rooms.map((room, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveRoom(idx)}
                  className={`py-4 px-6 font-heading text-lg transition-all border-b-2 tracking-wide ${
                    activeRoom === idx
                      ? "border-primary text-primary"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {room.type}
                </button>
              ))}
            </div>

            {/* Active Room Content */}
            <div className="flex flex-col gap-8 transition-all duration-500">
              <div className="room-img-container relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-border/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/90 via-transparent to-transparent z-10" />
                <Image
                  src={rooms[activeRoom].img}
                  alt={`Luxury room interior view: ${rooms[activeRoom].name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-all duration-1000"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl text-foreground font-semibold mb-2">
                    {rooms[activeRoom].name}
                  </h3>
                  <p className="text-muted max-w-lg text-sm md:text-base leading-relaxed">
                    {rooms[activeRoom].desc}
                  </p>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                  <span className="text-xs text-muted uppercase tracking-widest block">Starting From</span>
                  <span className="font-heading text-3xl text-primary font-bold">{rooms[activeRoom].price}</span>
                  <span className="text-xs text-muted block">/ night</span>
                </div>
              </div>

              {/* Amenities tags */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/25">
                {[
                  { icon: Wifi, label: "Hi-Speed Wi-Fi" },
                  { icon: Tv, label: "Premium Smart TV" },
                  { icon: ShieldCheck, label: "24/7 Security Support" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/20 text-xs text-foreground/80">
                    <item.icon size={14} className="text-primary" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Floating Booking Card */}
          <div className="booking-card w-full lg:w-1/3 bg-background/80 backdrop-blur-md border border-border p-8 rounded-2xl shadow-2xl flex flex-col gap-6 lg:sticky lg:top-28">
            <h4 className="font-heading text-2xl text-foreground font-bold">Reserve Your Room</h4>
            <p className="text-xs text-muted">Enjoy modern amenities, exceptional service, and instant check-ins.</p>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Check In</label>
                <input type="date" className="w-full bg-background-secondary border border-border/50 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Check Out</label>
                <input type="date" className="w-full bg-background-secondary border border-border/50 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Guests</label>
                <select className="w-full bg-background-secondary border border-border/50 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-primary">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3+ Guests</option>
                </select>
              </div>
              
              <button className="w-full bg-primary hover:bg-primary-hover text-background font-medium py-4 rounded-lg flex items-center justify-center gap-2 transition-all mt-4" data-magnetic>
                <span>Check Availability</span>
                <ChevronRight size={16} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
