"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

const faqs = [
  {
    q: "Is parking available at Royal Tower Mart?",
    a: "Yes, we offer spacious and highly secure valet parking facilities completely free of charge for our guests and customers.",
  },
  {
    q: "How can I book a luxury room stay?",
    a: "You can easily reserve your stay through our online booking availability form on this website, or connect with our front desk directly by calling us.",
  },
  {
    q: "What are the timings of the Elite Gym?",
    a: "The gym operates daily from 5:00 AM to 9:30 PM, offering flexibility for both early morning routines and late evening workouts.",
  },
  {
    q: "What are the timings of the Convenience Store?",
    a: "Our premium convenience store is open every day from 8:00 AM to 9:30 PM to serve your daily grocery and household needs.",
  },
  {
    q: "What refreshments are served at the food zone?",
    a: "We offer a delicious range of gourmet treats, including our signature KitKat shakes, frothy cold coffee, fresh savories, desserts, and wholesome family meals.",
  },
  {
    q: "Where is Royal Tower Mart located?",
    a: "We are located at Lavkush Nagar, Moti Bagh, Bithoor, Kanpur, Uttar Pradesh. A scenic, easily accessible destination in the historical area of Bithoor.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-background-secondary py-32 overflow-hidden border-b border-border/20">
      
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Information</span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground font-bold leading-tight">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "border rounded-2xl transition-all duration-500 overflow-hidden bg-background/20 backdrop-blur-sm",
                  isOpen ? "border-primary/50" : "border-border/30 hover:border-primary/20"
                )}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-none select-none"
                >
                  <span className="font-heading text-lg md:text-xl text-foreground/90 font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "text-primary transition-transform duration-500",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>
                
                <div
                  className={cn(
                    "transition-all duration-500 ease-in-out px-6 md:px-8 overflow-hidden",
                    isOpen ? "max-h-[200px] pb-6 md:pb-8 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
