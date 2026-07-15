"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Gym", href: "#gym" },
    { name: "Cafe", href: "#cafe" },
    { name: "Rooms", href: "#rooms" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background-secondary/80 py-4 backdrop-blur-md border-b border-border/50"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="group flex flex-col font-heading text-2xl md:text-3xl uppercase tracking-widest text-primary hover:text-primary-hover transition-colors"
            data-magnetic
          >
            <span className="font-extrabold">Royal</span>
            <span className="text-xs md:text-sm tracking-[0.35em] text-foreground group-hover:text-muted transition-colors font-sans">
              Tower Mart
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted hover:text-primary transition-colors"
                data-magnetic
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-background"
              data-magnetic
            >
              Visit Today
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-heading text-4xl text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-8 rounded-full bg-primary px-8 py-4 font-heading text-xl text-background"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Visit Today
          </Link>
        </nav>
      </div>
    </>
  );
}
