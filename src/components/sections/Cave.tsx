"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Cave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Floating dust particles animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; alpha: number }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.5 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(200, 155, 60, ${p.alpha})`; // gold tinted particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if it goes out of screen
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    drawParticles();

    // GSAP ScrollTrigger timeline to simulate stepping inside the cave
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(".cave-gate-left", {
        xPercent: -100,
        ease: "power2.inOut",
        duration: 1.5,
      }, "zoom")
      .to(".cave-gate-right", {
        xPercent: 100,
        ease: "power2.inOut",
        duration: 1.5,
      }, "zoom")
      .to(".cave-background", {
        scale: 1.1,
        ease: "power1.inOut",
        duration: 2,
      }, "zoom")
      .from(".cave-inner-content", {
        scale: 0.8,
        opacity: 0,
        ease: "power2.out",
        duration: 1.5,
      }, "zoom+=0.3")
      .from(".cave-light-ray", {
        opacity: 0,
        scaleY: 0,
        transformOrigin: "top center",
        ease: "power2.out",
        duration: 1.5,
      }, "zoom+=0.5");

    }, containerRef);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      context.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="cave" className="relative h-screen w-full bg-background overflow-hidden flex items-center justify-center">
      
      {/* Background Cave Interior */}
      <div 
        className="cave-background absolute inset-0 w-full h-full bg-cover bg-center scale-100"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507163879411-5e9275ab4557?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background z-10" />
        <div className="absolute inset-0 bg-black/70 z-0" />
      </div>

      {/* Floating Dust Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none" />

      {/* Volumetric Moving Light Rays */}
      <div className="cave-light-ray absolute top-0 left-1/3 w-64 h-[150%] bg-gradient-to-b from-primary/15 to-transparent blur-[80px] origin-top rotate-12 z-20 pointer-events-none mix-blend-screen" />
      <div className="cave-light-ray absolute top-0 right-1/4 w-48 h-[150%] bg-gradient-to-b from-primary/10 to-transparent blur-[70px] origin-top -rotate-12 z-20 pointer-events-none mix-blend-screen" />

      {/* Inner Cave Experience Details (Revealed as we walk in) */}
      <div className="cave-inner-content relative z-30 max-w-4xl text-center px-6 flex flex-col items-center gap-8">
        <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em] block">Exclusive Lounge</span>
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground font-bold leading-tight">
          The Themed <span className="text-primary italic block md:inline">Cave Experience</span>
        </h2>
        <p className="text-muted text-base md:text-lg max-w-2xl font-light leading-relaxed">
          Step into our signature space—a custom carved stone experience featuring warm ambient lighting, peaceful mood setting, and absolute privacy. Perfect for relaxation, small events, or a distinct evening escape.
        </p>
        <button className="group relative overflow-hidden rounded-full border border-primary px-8 py-4 font-medium text-primary hover:text-background transition-all" data-magnetic>
          <span className="relative z-10">Reserve The Cave</span>
          <div className="absolute inset-0 bg-primary transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0" />
        </button>
      </div>

      {/* Interactive Gates (Foregound element that splits open as we walk in) */}
      <div className="absolute inset-0 flex z-40 pointer-events-none">
        {/* Left Gate */}
        <div className="cave-gate-left w-1/2 h-full bg-[#080809] border-r border-border/20 flex flex-col items-end justify-center pr-6 md:pr-16 relative">
          <div className="absolute inset-0 bg-radial-gradient(at center, rgba(200, 155, 60, 0.05), transparent)" />
          <div className="text-right pointer-events-auto">
            <span className="text-xs uppercase tracking-widest text-primary block mb-2">Signature Escape</span>
            <h3 className="font-heading text-2xl md:text-4xl text-foreground">The Cave</h3>
          </div>
        </div>
        {/* Right Gate */}
        <div className="cave-gate-right w-1/2 h-full bg-[#080809] border-l border-border/20 flex flex-col items-start justify-center pl-6 md:pl-16 relative">
          <div className="absolute inset-0 bg-radial-gradient(at center, rgba(200, 155, 60, 0.05), transparent)" />
          <div className="text-left pointer-events-auto">
            <span className="text-xs uppercase tracking-widest text-primary block mb-2">Scroll to Enter</span>
            <h3 className="font-heading text-2xl md:text-4xl text-foreground">Awaits You</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
