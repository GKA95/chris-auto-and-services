/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { VehicleOptions } from './components/VehicleOptions';
import { HowToBook } from './components/HowToBook';
import { EnquiryForm } from './components/EnquiryForm';
import { FAQ } from './components/FAQ';
import { ContactFooter } from './components/ContactFooter';
import { AdminInbox } from './components/AdminInbox';
import { PrivacyPage } from './components/PrivacyPage';
import { ConfirmedService } from './types';

function MainSite() {
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'privacy'>('home');
  const [selectedService, setSelectedService] = useState<string>('Daily car rentals');
  const [vehicleNote, setVehicleNote] = useState<string>('');

  const safeNavigate = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      try {
        window.location.hash = path.replace(/^\//, '#');
      } catch {
        // Safe fallback in restricted sandboxes
      }
    }
  };

  // Handle URL path or hash changes (e.g. /admin or #admin or /privacy)
  useEffect(() => {
    const handleUrl = () => {
      try {
        const path = window.location.pathname;
        const hash = window.location.hash;
        if (path === '/admin' || hash === '#admin') {
          setCurrentView('admin');
        } else if (path === '/privacy' || hash === '#privacy') {
          setCurrentView('privacy');
        } else {
          setCurrentView('home');
        }
      } catch {
        setCurrentView('home');
      }
    };

    handleUrl();
    window.addEventListener('popstate', handleUrl);
    window.addEventListener('hashchange', handleUrl);

    return () => {
      window.removeEventListener('popstate', handleUrl);
      window.removeEventListener('hashchange', handleUrl);
    };
  }, []);

  const navigateToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectService = (service: ConfirmedService) => {
    setSelectedService(service);
    navigateToSection('contact');
  };

  const handleAskAvailability = (categoryName: string, service: ConfirmedService) => {
    setSelectedService(service);
    setVehicleNote(categoryName);
    navigateToSection('contact');
  };

  // View routing
  if (currentView === 'admin') {
    return (
      <AdminInbox
        onBackToSite={() => {
          setCurrentView('home');
          safeNavigate('/');
        }}
      />
    );
  }

  if (currentView === 'privacy') {
    return (
      <PrivacyPage
        onBackToSite={() => {
          setCurrentView('home');
          safeNavigate('/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white transition-colors duration-200">
      <Navbar
        onNavigate={navigateToSection}
        onOpenAdmin={() => {
          setCurrentView('admin');
          safeNavigate('/admin');
        }}
        onOpenPrivacy={() => {
          setCurrentView('privacy');
          safeNavigate('/privacy');
        }}
        currentView={currentView}
      />

      <main className="flex-1">
        <Hero onRequestCar={() => navigateToSection('contact')} />
        <About />
        <Services onSelectService={handleSelectService} />
        <VehicleOptions onAskAvailability={handleAskAvailability} />
        <HowToBook onStartEnquiry={() => navigateToSection('contact')} />
        <EnquiryForm
          initialService={selectedService}
          initialVehicleNote={vehicleNote}
        />
        <FAQ />
      </main>

      <ContactFooter
        onNavigate={navigateToSection}
        onOpenPrivacy={() => {
          setCurrentView('privacy');
          safeNavigate('/privacy');
        }}
        onOpenAdmin={() => {
          setCurrentView('admin');
          safeNavigate('/admin');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainSite />
    </ThemeProvider>
  );
}
