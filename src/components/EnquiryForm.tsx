import React, { useState, useEffect } from 'react';
import { ConfirmedService } from '../types';
import { Send, Phone, CheckCircle2, AlertTriangle, Clock, Calendar, MapPin, User, Mail, MessageSquare, Loader2, MessageCircle } from 'lucide-react';

interface EnquiryFormProps {
  initialService?: string;
  initialVehicleNote?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialService = 'Daily car rentals',
  initialVehicleNote = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService);
  const [preferredPickupDateTime, setPreferredPickupDateTime] = useState('');
  const [preferredReturnDateTime, setPreferredReturnDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState(initialVehicleNote);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Update initialService when prop changes
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialVehicleNote) {
      setMessage((prev) => (prev ? `${prev}\nInterested in: ${initialVehicleNote}` : `Interested in: ${initialVehicleNote}`));
    }
  }, [initialVehicleNote]);

  const serviceOptions = [
    'Daily car rentals',
    'Weekly and monthly rentals',
    'Airport pickup and drop-off',
    'Luxury and executive cars',
    'Chauffeur-driven services',
    'General enquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Front-end validations
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 20 || !/^(\+)?[0-9]{7,20}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid phone number (e.g. +233 24 708 8974 or 024 708 8974).');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address or leave the field empty.');
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Please describe your requirements in the message box (at least 5 characters).');
      return;
    }

    if (!consent) {
      setErrorMessage('Please check the consent box allowing Chris Auto & Tour Services to contact you regarding this enquiry.');
      return;
    }

    // Inconsistent dates check
    if (preferredPickupDateTime && preferredReturnDateTime) {
      const pDate = new Date(preferredPickupDateTime);
      const rDate = new Date(preferredReturnDateTime);
      if (!isNaN(pDate.getTime()) && !isNaN(rDate.getTime()) && rDate.getTime() < pDate.getTime()) {
        setErrorMessage('Preferred return date and time cannot be earlier than pickup date and time.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        service,
        preferredPickupDateTime: preferredPickupDateTime || undefined,
        preferredReturnDateTime: preferredReturnDateTime || undefined,
        location: location.trim() || undefined,
        message: message.trim(),
        consent: true,
        website_url: honeypot, // Honeypot trap
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected the request.');
      }

      // Success ONLY after confirmed database persistence
      setSuccessResponse(data.message || 'Your enquiry has been received. The business will contact you to confirm availability and price.');
      setHasSubmitted(true);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Could not connect to the server. Please call us directly at +233 24 708 8974.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccessResponse(null);
    setHasSubmitted(false);
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setService('Daily car rentals');
    setPreferredPickupDateTime('');
    setPreferredReturnDateTime('');
    setLocation('');
    setMessage('');
    setConsent(false);
    setErrorMessage(null);
  };

  // Pre-encoded WhatsApp message
  const whatsappText = encodeURIComponent(
    `Hello Chris Auto & Tour Services, I would like to inquire about ${service}. My name is ${fullName || '[Name]'}. Please let me know your rates and availability.`
  );
  const whatsappUrl = `https://wa.me/233247088974?text=${whatsappText}`;

  return (
    <section id="contact" className="py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full">
            Book or Enquire
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight transition-colors">
            Send an Enquiry to the Owner
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Tell us what you need. Each message is delivered directly to our owner inbox in Mankessim.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur transition-colors">
          
          {/* Success State Screen */}
          {hasSubmitted && successResponse ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-600/60 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Enquiry Received</h3>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium text-base sm:text-lg max-w-lg mx-auto">
                  “{successResponse}”
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto pt-2">
                  Our manager in Mankessim will review your request and get in touch via phone/WhatsApp.
                </p>
              </div>

              {/* Direct Call & WhatsApp confirmation actions */}
              <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+233247088974"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Directly: +233 24 708 8974
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>

              {/* WhatsApp Optional Action */}
              <div className="pt-4 text-xs text-zinc-400 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
                <div className="font-semibold text-zinc-300 mb-1">Prefer instant chat?</div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue in WhatsApp (+233 24 708 8974)
                </a>
                <p className="text-[11px] text-zinc-400 mt-1">
                  *Note: Opening WhatsApp prepares your prefilled draft; you must press Send inside WhatsApp to transmit.
                </p>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Error Alert */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-sm flex items-start gap-3 animate-in fade-in"
                >
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold">Submission Notice</div>
                    <div>{errorMessage}</div>
                    <div className="pt-1">
                      <a
                        href="tel:+233247088974"
                        className="inline-flex items-center gap-1 font-bold underline hover:text-white"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call +233 24 708 8974 instead
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Honeypot hidden input for bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url">Website URL (leave blank)</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      id="fullName"
                      required
                      autoComplete="name"
                      placeholder="e.g. Kwame Mensah"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      maxLength={100}
                      className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      id="phoneNumber"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+233 24 708 8974 or 024..."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      maxLength={30}
                      className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-colors"
                    />
                  </div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">Ghanaian or international number</span>
                </div>
              </div>

              {/* Row 2: Email & Service Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Email Address <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={100}
                      className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white outline-none transition-colors"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Preferred Dates & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="pickupDateTime" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Pickup Date / Time <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="pickupDateTime"
                    value={preferredPickupDateTime}
                    onChange={(e) => setPreferredPickupDateTime(e.target.value)}
                    className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-3 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="returnDateTime" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Return Date / Time <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="returnDateTime"
                    value={preferredReturnDateTime}
                    onChange={(e) => setPreferredReturnDateTime(e.target.value)}
                    className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-3 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Pickup/Delivery Area <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      id="location"
                      placeholder="e.g. Mankessim, Accra Airport..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      maxLength={200}
                      className="w-full min-h-[46px] bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl pl-10 pr-3 py-2.5 text-base sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Message Box */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  Message &amp; Rental Requirements <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us about your trip (e.g., number of passengers, self-drive or chauffeur, destination, specific dates, or questions)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={3000}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl p-3.5 sm:p-4 text-base sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none resize-y"
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  <span>Minimum 5 characters. No payment or ID uploads required in this initial form.</span>
                  <span>{message.length}/3000</span>
                </div>
              </div>

              {/* Consent Checkbox with generous touch area */}
              <div className="p-4 bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 h-5 w-5 rounded border-zinc-300 dark:border-zinc-700 text-red-600 focus:ring-red-500 bg-white dark:bg-zinc-900 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 leading-normal">
                    I consent to allow <strong className="text-zinc-950 dark:text-white">Chris Auto &amp; Tour Services</strong> to use the contact details provided above solely to respond to this enquiry and confirm booking details. This is separate from marketing.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold text-white bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-400 rounded-xl shadow-lg shadow-red-950/50 active:scale-95 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-zinc-600 dark:text-zinc-400 text-center sm:text-right">
                  Or call directly:{' '}
                  <a
                    href="tel:+233247088974"
                    className="font-bold text-zinc-900 dark:text-white hover:text-red-500 transition-colors inline-block py-1"
                  >
                    +233 24 708 8974
                  </a>
                </div>
              {/* Optional WhatsApp shortcut */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue in WhatsApp (+233 24 708 8974)</span>
                </a>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Press Send inside WhatsApp to complete message transmission.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
