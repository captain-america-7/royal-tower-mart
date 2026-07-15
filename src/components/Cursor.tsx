"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/utils/cn";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    
    setIsHidden(false);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Move cursor and follower
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power4.out",
      });
    };

    // Add hover state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-magnetic")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial setup to center them before first move
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-primary transition-opacity duration-300",
          isHovering ? "opacity-0" : "opacity-100"
        )}
      />
      <div
        ref={followerRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[99] h-10 w-10 rounded-full border border-primary transition-all duration-300",
          isHovering ? "scale-[1.5] bg-primary/10 backdrop-blur-sm" : "scale-100 bg-transparent"
        )}
      />
    </>
  );
}
