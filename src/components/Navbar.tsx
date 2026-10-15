import React, { useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Phone, Calendar, Menu, X, Shield, MapPin, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenPrivacy: () => void;
  currentView: 'home' | 'admin' | 'privacy';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenAdmin,
  onOpenPrivacy,
  currentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Vehicle Options', target: 'vehicles' },
    { label: 'How to Book', target: 'how-to-book' },
    { label: 'FAQ', target: 'faq' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-zinc-100 dark:bg-gradient-to-r dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 py-1.5 px-3 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold tracking-wide text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              24/7 Delivery
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs">
              <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              Mankessim, Ghana
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <a
              href="tel:+233247088974"
              className="inline-flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 text-[11px] sm:text-xs transition-colors py-1 px-1.5 rounded active:bg-zinc-200 dark:active:bg-zinc-800"
              aria-label="Call +233 24 708 8974"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>+233 24 708 8974</span>
            </a>
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] sm:text-xs transition-colors cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800/60'
              }`}
              title="Owner Private Inbox"
            >
              <Shield className="w-3 h-3" />
              <span className="hidden xs:inline">Owner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg group active:scale-95 transition-transform"
            aria-label="Chris Auto & Tour Services Home"
          >
            <Logo size="md" />
            <div className="hidden xl:flex flex-col ml-3 pl-3 border-l border-zinc-200 dark:border-zinc-800 transition-colors">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-400">
                Chris Auto &amp; Tour Services
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-500">Mankessim, Ghana</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs & Animated Theme Toggle */}
          <div className="hidden sm:flex items-center space-x-3">
            <ThemeToggle variant="pill" />

            <a
              href="tel:+233247088974"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/80 rounded-lg shadow-sm transition-all duration-150 active:scale-95"
            >
              <Phone className="w-4 h-4 text-red-500" />
              Call Now
            </a>

            <button
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-950/20 dark:shadow-red-950/50 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Request a Car
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle variant="icon" />

            <a
              href="tel:+233247088974"
              className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-red-500 active:scale-95"
              aria-label="Call +233 24 708 8974"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-auto z-50 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-5 pt-3 pb-8 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
          <div className="flex items-center justify-between px-3">
            <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Chris Auto &amp; Tour Services
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Theme:</span>
              <ThemeToggle variant="pill" />
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrivacy();
              }}
              className="w-full text-left px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
            >
              Privacy Policy
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Request a Car
            </button>

            <a
              href="https://wa.me/233247088974?text=Hello%20Chris%20Auto%20%26%20Tour%20Services%2C%20I%20would%20like%20to%20inquire%20about%20renting%20a%20car."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-center text-sm font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg active:scale-98 transition-transform"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              Chat on WhatsApp (+233 24 708 8974)
            </a>

            <a
              href="tel:+233247088974"
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-center text-sm font-semibold text-zinc-800 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg active:scale-98 transition-transform"
            >
              <Phone className="w-4 h-4 text-red-500" />
              Call Now: +233 24 708 8974
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 px-3 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              Owner Private Portal (/admin)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
