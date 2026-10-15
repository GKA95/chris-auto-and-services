import React from 'react';
import { MessageSquareText, Car, FileCheck2, CreditCard, KeyRound, ArrowRight } from 'lucide-react';

interface HowToBookProps {
  onStartEnquiry: () => void;
}

export const HowToBook: React.FC<HowToBookProps> = ({ onStartEnquiry }) => {
  const steps = [
    {
      step: '01',
      title: 'Enquire',
      description: 'Contact the business to check rates and availability for your intended dates.',
      icon: MessageSquareText,
      detail: 'Submit our online form or call +233 24 708 8974.',
    },
    {
      step: '02',
      title: 'Choose',
      description: 'Select a preferred vehicle type and rental period (daily, weekly, or monthly).',
      icon: Car,
      detail: 'Specify whether you need self-drive or a dedicated chauffeur.',
    },
    {
      step: '03',
      title: 'Confirm',
      description: 'Provide the required identification and complete a short rental agreement directly with the business.',
      icon: FileCheck2,
      detail: 'Arranged straightforwardly with Chris Auto & Tour Services directly.',
    },
    {
      step: '04',
      title: 'Pay',
      description: 'Arrange payment by cash, bank transfer, or mobile money (MoMo).',
      icon: CreditCard,
      detail: 'Accepted Ghanaian and regional payment methods.',
    },
    {
      step: '05',
      title: 'Collect or Arrange Delivery',
      description: 'Agree the pickup or delivery details with the business.',
      icon: KeyRound,
      detail: '24/7 delivery service available upon agreement.',
    },
  ];

  return (
    <section id="how-to-book" className="py-20 bg-slate-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            How to Book Your Vehicle
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Our straightforward booking procedure ensures transparency, speed, and dependable service.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-400 dark:hover:border-red-600/50 shadow-sm transition-all duration-200 group"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-red-600 dark:text-red-500 font-mono">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center group-hover:bg-red-50 dark:group-hover:bg-red-600/20 group-hover:border-red-300 dark:group-hover:border-red-600/40 transition-colors">
                      <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    {st.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  {st.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Action */}
        <div className="mt-12 text-center bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md transition-colors">
          <div className="text-left space-y-1">
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white">Ready to begin Step 1?</h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Submit your enquiry online or call us directly. We respond promptly.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onStartEnquiry}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-md cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233247088974"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-xl transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
