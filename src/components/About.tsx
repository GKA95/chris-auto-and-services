import React from 'react';
import { ShieldCheck, Compass, CreditCard, Sparkles, MapPin, Check } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      title: 'Reliability',
      description: 'Dependable vehicles maintained for smooth trips across Mankessim and journeys across West Africa.',
      icon: ShieldCheck,
    },
    {
      title: 'Convenience',
      description: 'Flexible daily, weekly, and monthly options with 24/7 delivery service arranged directly with you.',
      icon: Compass,
    },
    {
      title: 'Comfort',
      description: 'Clean, well-appointed vehicle options suited for personal downtime, corporate guests, or family travel.',
      icon: Sparkles,
    },
    {
      title: 'Safety',
      description: 'Safety-first inspections, well-vetted chauffeur options, and thorough preparation for your peace of mind.',
      icon: ShieldCheck,
    },
    {
      title: 'Affordability',
      description: 'Competitive quotes with clear payment options via Cash, Bank Transfer, or Mobile Money (MoMo).',
      icon: CreditCard,
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full">
            About Chris Auto &amp; Tour Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            Trusted Car Rental &amp; Tour Travel Partner
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed transition-colors">
            Based in Mankessim, Ghana, <strong className="text-zinc-900 dark:text-white font-semibold">Chris Auto &amp; Tour Services</strong> provides convenient, dependable transport solutions for both local and international travellers.
          </p>
        </div>

        {/* Story / Mission Narrative */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-lg dark:shadow-xl transition-colors">
          <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              Serving Local &amp; International Travellers
            </h3>
            <p>
              Whether you are arriving for a corporate engagement, embarking on a family holiday, needing an on-time airport transfer, or setting out on longer-distance road travel across West Africa, we offer tailored car hire services built around your schedule.
            </p>
            <p>
              Our fleet solutions range from everyday personal city rentals to executive chauffeured saloons and spacious tour vehicles. Every booking is confirmed directly with clear terms and dedicated customer care.
            </p>
            <div className="pt-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Headquartered in Mankessim, Central Region, Ghana</span>
            </div>
          </div>

          {/* Payment & Travel Needs Card */}
          <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-5 shadow-sm transition-colors">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              Travel Needs Covered
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80">
                <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Business Trips</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80">
                <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Leisure Travel</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80">
                <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Airport Transfers</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80">
                <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Long-Distance Trips</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                Accepted Payment Methods:
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm">
                  Cash
                </span>
                <span className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm">
                  Bank Transfer
                </span>
                <span className="px-3 py-1.5 rounded-md bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 shadow-sm">
                  Mobile Money (MoMo)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Values Grid */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white transition-colors">
              Our Core Business Values
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Guiding every journey we support
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/90 rounded-xl p-5 hover:border-red-500 dark:hover:border-red-600/50 shadow-sm transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:bg-red-50 dark:group-hover:bg-red-950/60 group-hover:border-red-300 dark:group-hover:border-red-700/60 flex items-center justify-center mb-3 transition-colors">
                      <Icon className="w-5 h-5 text-red-600 dark:text-red-500" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-1.5">{v.title}</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
