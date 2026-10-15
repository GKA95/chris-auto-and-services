import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

interface MobileBottomBarProps {
  onRequestCar: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onRequestCar }) => {
  const whatsappUrl =
    'https://wa.me/233247088974?text=Hello%20Chris%20Auto%20%26%20Tour%20Services%2C%20I%20would%20like%20to%20inquire%20about%20renting%20a%20car.';

  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-3 py-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-2xl transition-colors duration-200"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Quick Call */}
        <a
          href="tel:+233247088974"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:text-red-600 dark:hover:text-red-400 active:scale-95 transition-all text-center min-h-[48px]"
          aria-label="Call +233 24 708 8974"
        >
          <Phone className="w-4 h-4 text-red-500 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">Call Now</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 active:scale-95 transition-all text-center min-h-[48px]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-500 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">WhatsApp</span>
        </a>

        {/* Quick Enquiry */}
        <button
          type="button"
          onClick={onRequestCar}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-950/40 active:scale-95 transition-all text-center cursor-pointer min-h-[48px]"
          aria-label="Request a car rental enquiry"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">Rent Car</span>
        </button>
      </div>
    </aside>
  );
};
