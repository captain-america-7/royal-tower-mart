import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background-secondary pt-24 pb-12">
      {/* Decorative Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex flex-col font-heading text-2xl uppercase tracking-widest text-primary mb-6"
            >
              <span>Royal</span>
              <span className="text-base tracking-[0.3em] text-foreground">
                Tower Mart
              </span>
            </Link>
            <p className="text-muted leading-relaxed max-w-sm">
              Where shopping, fitness, and comfort meet. The ultimate premium lifestyle destination in Bithoor, Kanpur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-6">Explore</h4>
            <ul className="space-y-4">
              {["About", "Amenities", "Gym", "Rooms", "Food & Refreshments"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-0 h-px bg-primary transition-all group-hover:w-4"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-muted hover:text-primary transition-colors group">
                  <MapPin size={20} className="mt-1 flex-shrink-0 text-primary" />
                  <span>
                    Royal Tower Mart<br/>
                    Lavkush Nagar, Moti Bagh<br/>
                    Bithoor, Kanpur, UP
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-muted hover:text-primary transition-colors">
                  <Phone size={20} className="text-primary" />
                  <span>Call Now</span>
                </a>
              </li>
              <li className="text-muted flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 Open until 9:30 PM
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
             <h4 className="font-heading text-xl text-foreground mb-6">Connect</h4>
             <div className="flex gap-4">
               <a href="#" className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all">
                 <Instagram size={20} />
               </a>
               <a href="#" className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all">
                 <Facebook size={20} />
               </a>
             </div>
             <div className="mt-8">
               <Link href="#contact" className="group inline-flex items-center gap-2 text-primary font-medium hover:text-primary-hover transition-colors">
                 Get Directions
                 <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </Link>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Royal Tower Mart. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
