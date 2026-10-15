import React from 'react';
import { ConfirmedService } from '../types';
import { CalendarDays, CalendarRange, PlaneTakeoff, Crown, UserCheck, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: ConfirmedService) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const serviceList: {
    title: ConfirmedService;
    description: string;
    details: string;
    icon: React.ComponentType<{ className?: string }>;
    tag: string;
  }[] = [
    {
      title: 'Daily car rentals',
      description: 'Flexible short-term car rentals designed for single-day excursions, quick errands, local business meetings, or day trips around Mankessim and surrounding regions.',
      details: 'Available with self-drive or driver options. Fast booking confirmation and 24/7 delivery available upon request.',
      icon: CalendarDays,
      tag: 'Flexible & Fast',
    },
    {
      title: 'Weekly and monthly rentals',
      description: 'Cost-effective, extended vehicle hire for projects, long-stay tourists, corporate assignees, or visiting families needing dependable daily mobility.',
      details: 'Discounted multi-day arrangements with dedicated support and scheduled maintenance check-ins.',
      icon: CalendarRange,
      tag: 'Extended Stays',
    },
    {
      title: 'Airport pickup and drop-off',
      description: 'Punctual, stress-free transfers connecting travellers to and from major airport terminals, ensuring you arrive on time without transit hassles.',
      details: 'Flight tracking, luggage assistance, and door-to-door transit between airport arrivals and your destination.',
      icon: PlaneTakeoff,
      tag: 'Door-to-Door',
    },
    {
      title: 'Luxury and executive cars',
      description: 'Premium, immaculate vehicles tailored for VIP guests, business summits, delegations, formal events, and clients who prioritize prestige and supreme comfort.',
      details: 'Well-appointed interiors, pristine presentation, and high-spec amenities for an exceptional executive ride.',
      icon: Crown,
      tag: 'Executive Class',
    },
    {
      title: 'Chauffeur-driven services',
      description: 'Professional, courteous drivers with extensive local and regional road knowledge so you can sit back, focus on work, or relax throughout your journey.',
      details: 'Expert navigation, polite conduct, and personalized attention across Ghanaian routes and West Africa trips.',
      icon: UserCheck,
      tag: 'Relax & Arrive',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full">
            Our Official Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            Tailored Vehicle Hire for Every Need
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Choose from our five confirmed core services. Click any service to start your customized enquiry.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((svc, index) => {
            const Icon = svc.icon;
            const isFeatured = index === 3; // Luxury/Executive card slight accent

            return (
              <div
                key={svc.title}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 border group ${
                  isFeatured
                    ? 'bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 border-red-300 dark:border-red-900/60 shadow-md dark:shadow-lg dark:shadow-red-950/30'
                    : 'bg-white dark:bg-zinc-900/50 hover:bg-slate-50 dark:hover:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 group-hover:bg-red-50 dark:group-hover:bg-red-600/20 border border-zinc-200 dark:border-zinc-700 group-hover:border-red-200 dark:group-hover:border-red-600/40 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700/60">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
                    {svc.details}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onSelectService(svc.title)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-bold text-zinc-800 hover:text-white dark:text-white bg-zinc-100 hover:bg-red-600 dark:bg-zinc-800 dark:hover:bg-red-600 rounded-xl transition-all duration-150 group/btn cursor-pointer"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 6th Card: 24/7 Delivery Spotlight & Custom Request */}
          <div className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-red-50 via-white to-red-100/40 dark:from-red-950/40 dark:via-zinc-900 dark:to-zinc-950 border border-red-200 dark:border-red-900/70 shadow-md dark:shadow-lg">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider mb-4">
                Special Delivery Service
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                24/7 Delivery Available
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Need a vehicle delivered right to your home, workplace, hotel, or transit depot? Chris Auto &amp; Tour Services offers round-the-clock vehicle delivery upon agreement.
              </p>
              <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                Covers Mankessim, Central Region, and scheduled arrangements across broader travel routes.
              </div>
            </div>

            <div className="mt-6 pt-2">
              <a
                href="tel:+233247088974"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-md shadow-red-950/30"
              >
                <span>Call Directly: +233 24 708 8974</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
