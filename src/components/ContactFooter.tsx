import React from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Phone, MapPin, ExternalLink, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface ContactFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-slate-900 dark:bg-zinc-950 text-zinc-300 border-t border-zinc-800 transition-colors duration-200">
      
      {/* Contact Hub Bar */}
      <div className="border-b border-zinc-800/80 bg-slate-950/60 dark:bg-zinc-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Phone Card */}
            <div className="bg-slate-900/90 dark:bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-600/50 transition-colors group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-red-950/60 border border-red-900/60 flex items-center justify-center text-red-500 mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Direct Telephone</div>
                <div className="text-xl font-extrabold text-white mt-1">+233 24 708 8974</div>
                <p className="text-xs text-zinc-400 mt-2">
                  Call for immediate quotes, delivery arrangements, or reservation inquiries.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800">
                <a
                  href="tel:+233247088974"
                  className="inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300"
                >
                  <span>Click to Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-slate-900/90 dark:bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-600/50 transition-colors group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-800 flex items-center justify-center text-red-500 mb-4 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Location Base</div>
                <div className="text-xl font-extrabold text-white mt-1">Mankessim, Ghana</div>
                <p className="text-xs text-zinc-400 mt-2">
                  Serving Central Region, Accra, and travellers journeying across West Africa.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mankessim%2C+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-200 hover:text-white"
                >
                  <span>Search Mankessim on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>

            {/* 24/7 Delivery Card */}
            <div className="bg-slate-900/90 dark:bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-600/50 transition-colors group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-800 flex items-center justify-center text-red-500 mb-4 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Delivery Service</div>
                <div className="text-xl font-extrabold text-white mt-1">24/7 Vehicle Delivery</div>
                <p className="text-xs text-zinc-400 mt-2">
                  Round-the-clock vehicle drop-off and pickup arranged directly with our team.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <span>Request Delivery Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              <strong className="text-zinc-200 font-semibold">Chris Auto &amp; Tour Services</strong> provides daily, weekly, and monthly car rentals, executive vehicles, airport transfers, and chauffeur services based in Mankessim, Ghana.
            </p>

            <div className="text-xs text-zinc-400 space-y-1">
              <div>Telephone: <a href="tel:+233247088974" className="text-white hover:underline">+233 24 708 8974</a></div>
              <div>Base: Mankessim, Central Region, Ghana</div>
              <div>Payments: Cash, Bank Transfer, Mobile Money</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vehicles')} className="hover:text-white transition-colors cursor-pointer">
                  Vehicle Options
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-to-book')} className="hover:text-white transition-colors cursor-pointer">
                  How to Book
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Daily car rentals</li>
              <li>Weekly and monthly rentals</li>
              <li>Airport pickup &amp; drop-off</li>
              <li>Luxury &amp; executive cars</li>
              <li>Chauffeur-driven services</li>
              <li className="text-red-400 font-medium">24/7 Delivery Advertised</li>
            </ul>
          </div>

          {/* Admin & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Business Access</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  Owner Inbox (/admin)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mankessim%2C+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  <span>Google Maps: Mankessim</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500">Theme:</span>
                  <ThemeToggle variant="pill" />
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-xs text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Chris Auto &amp; Tour Services. All rights reserved. Original logo: CHRIS AUTO — CAR RENTALS.
          </p>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-zinc-200 cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenAdmin} className="hover:text-zinc-200 cursor-pointer">
              Admin Portal
            </button>
          </div>
        </div>

        {/* Disclaimers & Notes */}
        <div className="mt-4 pt-4 border-t border-zinc-800/60 text-[11px] text-zinc-400 leading-relaxed">
          *Photographs used on this website are illustrative representations of vehicle classes. Chris Auto &amp; Tour Services confirms the specific available vehicle, rates, and rental terms with each customer directly. Submitting an enquiry does not reserve a vehicle.
        </div>

      </div>
    </footer>
  );
};
