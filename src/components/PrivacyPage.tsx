import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface PrivacyPageProps {
  onBackToSite: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBackToSite }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-4 sm:px-6 py-4 flex items-center justify-between transition-colors">
        <button
          onClick={onBackToSite}
          className="text-xs font-semibold text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Public Website
        </button>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="pill" />
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider hidden sm:inline">
            Chris Auto &amp; Tour Services
          </span>
        </div>
      </header>

      {/* Main Privacy Document */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-12 space-y-8">
        <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Customer Privacy &amp; Data Handling
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: October 2026 &bull; Chris Auto &amp; Tour Services, Mankessim, Ghana.
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              1. Information We Collect
            </h2>
            <p>
              When you submit a vehicle rental enquiry or request a quote on this website, we collect only the information you voluntarily provide in the enquiry form:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Your full name</li>
              <li>Your contact telephone number</li>
              <li>Your email address (if optionally provided)</li>
              <li>Your selected service category (e.g. daily rentals, airport transfer, executive cars)</li>
              <li>Preferred rental dates and pickup/delivery location (if specified)</li>
              <li>Your trip description or message</li>
            </ul>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <strong>Notice:</strong> We do NOT collect national ID uploads, passport scans, credit card details, or banking numbers through this initial public web form. Those are arranged directly and securely between you and the business when finalizing the short rental agreement.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              2. How Your Information Is Used
            </h2>
            <p>
              Your contact details and message are stored securely in our private owner inbox. They are used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Review your vehicle rental request and verify availability</li>
              <li>Contact you via telephone, WhatsApp, or email to provide an accurate rate quote</li>
              <li>Coordinate vehicle pickup, delivery, or airport transfer logistics</li>
            </ul>
            <p>
              We do not sell, rent, trade, or share your contact details with external advertisers, marketers, or data brokers.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              3. Data Security &amp; Private Owner Inbox
            </h2>
            <p>
              Customer messages are kept in a secure database protected by authentication and authorization controls. Public visitors cannot read, list, or scrape submissions. Access to customer enquiries is strictly limited to authorized business management via the protected <code>/admin</code> portal.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              4. Data Retention &amp; Rights
            </h2>
            <p>
              Enquiries are retained in our internal records to assist in returning customer bookings and accounting verification. You have the right to request deletion or modification of your enquiry information at any time by contacting our management directly.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              5. Contacting the Business
            </h2>
            <p>
              For any questions regarding your data, vehicle bookings, or privacy practices, please contact:
            </p>
            <div className="text-xs bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-zinc-700 dark:text-zinc-300">
              <div><strong>Business Name:</strong> Chris Auto &amp; Tour Services</div>
              <div><strong>Location:</strong> Mankessim, Central Region, Ghana</div>
              <div><strong>Telephone:</strong> <a href="tel:+233247088974" className="text-red-600 dark:text-red-400 hover:underline">+233 24 708 8974</a></div>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <button
            onClick={onBackToSite}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-red-950/20 dark:shadow-red-950/50 cursor-pointer"
          >
            Return to Chris Auto Website
          </button>
        </div>
      </main>
    </div>
  );
};
