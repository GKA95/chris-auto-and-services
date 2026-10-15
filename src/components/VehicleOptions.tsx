import React from 'react';
import { ConfirmedService } from '../types';
import { AlertCircle, ArrowUpRight } from 'lucide-react';

interface VehicleOptionsProps {
  onAskAvailability: (categoryName: string, service: ConfirmedService) => void;
}

export const VehicleOptions: React.FC<VehicleOptionsProps> = ({ onAskAvailability }) => {
  const categories = [
    {
      id: 'executive',
      name: 'Luxury & Executive Sedans',
      serviceCategory: 'Luxury and executive cars' as ConfirmedService,
      tag: 'VIP & Corporate',
      description: 'Sophisticated saloons offering supreme ride comfort, climate-controlled interiors, and prestigious exterior styling.',
      sampleModels: 'Representative models: Mercedes-Benz E-Class / C-Class, Toyota Camry, or comparable executive sedans.',
      features: ['Air-conditioned comfort', 'Chauffeur option available', 'Airport pickup ready'],
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'suv',
      name: 'Full-Size SUVs & 4x4',
      serviceCategory: 'Daily car rentals' as ConfirmedService,
      tag: 'Highway & Long-Distance',
      description: 'Robust, elevated four-wheel drives well-suited for long-distance highway travel, regional exploration, and family luggage.',
      sampleModels: 'Representative models: Toyota Land Cruiser Prado, Fortuner, Mitsubishi Pajero, or comparable 4x4 SUVs.',
      features: ['High ground clearance', 'Generous cargo space', 'Long-distance stability'],
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'city',
      name: 'Comfortable City Sedans & Compacts',
      serviceCategory: 'Daily car rentals' as ConfirmedService,
      tag: 'Everyday Mobility',
      description: 'Fuel-efficient, easy-to-park sedans ideal for daily city driving around Mankessim, quick town errands, and budget-conscious travel.',
      sampleModels: 'Representative models: Toyota Corolla, Hyundai Elantra, Honda Civic, or comparable fuel-efficient saloons.',
      features: ['Fuel efficient', 'Smooth automatic drive', 'Daily & weekly terms'],
      imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tour-van',
      name: 'Group Tour Vans & Minibuses',
      serviceCategory: 'Chauffeur-driven services' as ConfirmedService,
      tag: 'Tour & Group Travel',
      description: 'Spacious multi-passenger vans with ample legroom and luggage storage for tour groups, wedding parties, and delegations.',
      sampleModels: 'Representative models: Toyota HiAce VIP / Minibus, Nissan Urvan, or comparable tour transport.',
      features: ['Large seating capacity', 'Experienced tour driver', 'Air-conditioned cabin'],
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="vehicles" className="py-20 bg-white dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full">
            Vehicle Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            Vehicle Options for Every Journey
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Explore our main vehicle classes. Contact us with your preferred class and dates to check availability and obtain an accurate quote.
          </p>
        </div>

        {/* Clear Photographic Disclosure Banner */}
        <div className="mt-8 max-w-4xl mx-auto bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-start gap-3 text-xs text-zinc-700 dark:text-zinc-300 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider block">Important Disclosure:</span>
            Photographs shown below are illustrative representations of vehicle classes. Chris Auto &amp; Tour Services confirms the exact available vehicle make, model, specifications, and rental agreement directly upon inquiry.
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between group shadow-sm dark:shadow-lg"
            >
              <div>
                {/* Image Container with Label */}
                <div className="relative h-60 w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={`${cat.name} - representative illustration`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-sm border border-zinc-700/80 text-zinc-200 px-3 py-1 rounded-md text-xs font-bold">
                    {cat.tag}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-[11px] text-zinc-300 bg-zinc-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-zinc-800/80">
                    *Illustrative image representation
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 italic">
                    {cat.sampleModels}
                  </div>

                  {/* Feature Pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-md shadow-xs"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onAskAvailability(cat.name, cat.serviceCategory)}
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Ask About Availability</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAskAvailability(cat.name, cat.serviceCategory)}
                    className="w-full sm:w-auto py-2.5 px-4 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
