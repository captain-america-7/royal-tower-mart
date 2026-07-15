"use client";

import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative w-full bg-background py-32 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Contact Info & CTA Buttons */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-12">
            <div>
              <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Visit Us</span>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground font-bold leading-tight">
                Plan Your <span className="text-primary italic">Visit Today</span>
              </h2>
              <p className="text-muted mt-6 max-w-md leading-relaxed">
                Step into a premium space of comfort, fitness, and exceptional service. We look forward to welcoming you to Royal Tower Mart.
              </p>
            </div>

            {/* Structured details list */}
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-foreground font-semibold mb-1">Our Location</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    Royal Tower Mart, Lavkush Nagar,<br />
                    Moti Bagh, Bithoor, Kanpur,<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-foreground font-semibold mb-1">Contact Number</h4>
                  <p className="text-sm text-muted">
                    <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-foreground font-semibold mb-1">Opening Hours</h4>
                  <p className="text-sm text-muted flex items-center gap-2">
                    Open Daily: 8:00 AM – 9:30 PM
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-background font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                data-magnetic
              >
                <span>Get Directions</span>
                <ArrowUpRight size={18} />
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-3 border border-border hover:bg-white/5 text-foreground font-medium px-8 py-4 rounded-full transition-all"
                data-magnetic
              >
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="w-full lg:w-1/2 h-[450px] lg:h-auto min-h-[450px] rounded-3xl overflow-hidden border border-border/30 shadow-2xl relative">
            {/* Ambient Darkened Map Filter Overlay */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-color-burn z-10" />
            <iframe
              title="Royal Tower Mart Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.4338902580795!2d80.2646849!3d26.6027179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c394747ebc793%3A0xe543e498c8c760!2sBithoor%2C%20Kanpur%20Nagar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
