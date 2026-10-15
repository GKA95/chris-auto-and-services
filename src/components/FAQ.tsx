import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does submitting an enquiry online automatically reserve a vehicle?',
      a: 'No. Submitting an enquiry does not guarantee or reserve a car. All bookings, vehicle availability, exact rates, identification requirements, and the short rental agreement must be directly confirmed by Chris Auto & Tour Services before a vehicle is assigned.',
    },
    {
      q: 'What rental durations do you offer?',
      a: 'We offer daily car rentals for single-day journeys or short excursions, as well as discounted weekly and monthly arrangements for projects, extended holiday stays, or corporate visitors.',
    },
    {
      q: 'How does the 24/7 delivery service work?',
      a: 'We advertise 24/7 delivery for vehicles upon prior agreement. Once your booking is finalized, we can arrange for the car to be delivered directly to your home, hotel, office, or designated pickup point at any agreed hour.',
    },
    {
      q: 'Can I request a professional driver (chauffeur)?',
      a: 'Yes. In addition to self-drive options, we provide professional, courteous chauffeur-driven services. Our drivers have thorough knowledge of road networks in Mankessim, Central Region, Accra, and routes across West Africa.',
    },
    {
      q: 'How do airport pickup and drop-off transfers work?',
      a: 'Provide your flight details and terminal. Our driver will meet you at the arrivals hall or pick you up from your location with ample time to reach the airport safely and comfortably.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash, Bank Transfer, and Mobile Money (MoMo) — including standard Ghanaian networks. We do not process online credit card checkouts through this website; payment arrangements are finalized directly with the business.',
    },
    {
      q: 'What identification and documents will I need to rent?',
      a: 'You will need a valid government-issued photo ID (or passport for international visitors) and a valid driver’s license if choosing self-drive. Chris Auto & Tour Services will guide you through our short rental agreement when confirming your booking.',
    },
    {
      q: 'Where are you based and can you travel across West Africa?',
      a: 'Chris Auto & Tour Services is based in Mankessim, Ghana. We cater to local and international travellers, including clients planning cross-regional journeys across West Africa by prior mutual arrangement.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            Clear Answers About Renting With Us
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Everything you need to know about our rates, chauffeur options, delivery, and booking terms.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-150 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-transform ${isOpen ? 'text-red-600 dark:text-red-400' : ''}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
