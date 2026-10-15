import React from 'react';
import { Phone, Calendar, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onRequestCar: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestCar }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-50 dark:bg-zinc-950 pt-10 pb-20 md:pt-16 md:pb-28 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-zinc-400/20 dark:bg-zinc-800/20 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* 24/7 Delivery & Location Badges */}
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-red-200 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Clock className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                24/7 Delivery Advertised
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Mankessim, Ghana
              </span>
            </div>

            {/* Main Flyer Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] transition-colors">
              Need a Car for Rent?
            </h1>

            {/* Flyer Supporting Slogan & Exact Text */}
            <p className="text-xl sm:text-2xl font-semibold text-red-600 dark:text-red-500 tracking-tight">
              We&apos;ve got you covered. Book us today!
            </p>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed transition-colors">
              Daily, weekly and monthly car rentals, airport transfers and chauffeur services. Based in Mankessim, Ghana.
            </p>

            {/* Key Value Points from source */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 px-3 py-2 rounded-lg shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Reliable &amp; Safe</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 px-3 py-2 rounded-lg shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Executive &amp; Chauffeur</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 px-3 py-2 rounded-lg col-span-2 sm:col-span-1 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Airport Transfers</span>
              </div>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onRequestCar}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-950/20 dark:shadow-red-950/60 transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Request a Car
              </button>

              <a
                href="tel:+233247088974"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 rounded-xl shadow-sm transition-all duration-200 active:scale-95"
              >
                <Phone className="w-5 h-5 text-red-500" />
                Call Now (+233 24 708 8974)
              </a>
            </div>

            {/* Accepted Payment Methods notice from source */}
            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-300">Accepted Payments:</span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm">Cash</span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm">Bank Transfer</span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm">Mobile Money (MoMo)</span>
            </div>

          </div>

          {/* Right Column: Hero Vehicle Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Glass Frame with Metallic border */}
              <div className="relative rounded-2xl bg-white dark:bg-gradient-to-b dark:from-zinc-900/90 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-700/80 p-3 shadow-xl dark:shadow-2xl shadow-zinc-200/50 dark:shadow-red-950/30 overflow-hidden group transition-colors">
                
                {/* Visual Header Tag */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-zinc-200 dark:border-zinc-800 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-red-500" />
                    CHRIS AUTO — Fleet Preview
                  </div>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    Mankessim Hub
                  </span>
                </div>

                {/* Hero Vehicle Visual Container */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden mt-3 bg-zinc-900">
                  <img
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury executive car for rent in Mankessim Ghana (Representative vehicle illustration)"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-zinc-950/85 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-zinc-800">
                    <div>
                      <div className="text-xs font-bold text-white tracking-wide">Executive Sedans &amp; SUVs</div>
                      <div className="text-[11px] text-zinc-400">Chauffeur or Self-drive upon agreement</div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-red-600 text-white">
                      Inquire
                    </span>
                  </div>
                </div>

                {/* Disclaimers & Transparency */}
                <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight text-center px-2">
                  *Illustrative photograph. Chris Auto &amp; Tour Services will confirm the exact available vehicle make, model, and specifications when finalizing your booking.
                </p>
              </div>

              {/* Floating 24/7 Delivery Stamp */}
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-3 rounded-xl shadow-xl shadow-red-950/80 border border-red-500/50 hidden sm:flex items-center gap-3">
                <div className="p-2 bg-red-800/80 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wider uppercase text-red-200">Delivery Service</div>
                  <div className="text-base font-extrabold leading-none">24/7 Available</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
