import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant }) => {
  let currentTheme = 'dark';
  try {
    const { theme } = useTheme();
    currentTheme = theme;
  } catch {
    // If used outside provider
  }

  const isLight = (variant ?? currentTheme) === 'light';

  // Height mapping based on size
  const heightClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-20',
  };

  const bgBorder = isLight
    ? 'bg-white border-zinc-200/90 shadow-sm'
    : 'bg-zinc-900/90 border-zinc-800 shadow-sm';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`relative px-3 py-1.5 rounded-lg border ${bgBorder} backdrop-blur transition-all duration-200 group-hover:border-red-600/50`}>
        <svg
          viewBox="0 0 460 110"
          className={`${heightClasses[size]} w-auto max-w-full`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="CHRIS AUTO — CAR RENTALS logo"
          role="img"
        >
          <defs>
            <linearGradient id={isLight ? "logoSilverGradLight" : "logoSilverGradDark"} x1="0%" y1="0%" x2="100%" y2="100%">
              {isLight ? (
                <>
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="60%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#475569" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="45%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </>
              )}
            </linearGradient>

            <linearGradient id="logoRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>

            <filter id="logoRedGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#DC2626" floodOpacity={isLight ? "0.2" : "0.35"} />
            </filter>
          </defs>

          {/* Aerodynamic vehicle roofline silhouette swoosh */}
          <path
            d="M 32,46 C 75,18 130,10 215,10 C 295,10 365,20 415,48"
            stroke="url(#logoRedGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#logoRedGlow)"
          />

          <path
            d="M 60,40 C 105,18 160,15 220,15 C 285,15 345,23 395,44"
            stroke={isLight ? "#94A3B8" : "url(#logoSilverGradDark)"}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity={isLight ? "0.7" : "0.85"}
          />

          {/* Left car headlight / fender accent */}
          <path d="M 22,50 C 30,48 40,48 48,50" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />

          {/* Right car rear spoiler accent */}
          <path
            d="M 405,52 C 418,50 432,50 440,53"
            stroke={isLight ? "#64748B" : "#CBD5E1"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Main Wordmark: CHRIS in bold red */}
          <text
            x="32"
            y="74"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="45"
            letterSpacing="1.5"
            fill="#DC2626"
          >
            CHRIS
          </text>

          {/* Main Wordmark: AUTO in metallic silver/charcoal */}
          <text
            x="215"
            y="74"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="45"
            letterSpacing="2"
            fill={`url(#${isLight ? 'logoSilverGradLight' : 'logoSilverGradDark'})`}
          >
            AUTO
          </text>

          {/* Red divider slash accent */}
          <line x1="202" y1="46" x2="208" y2="76" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" opacity="0.75" />

          {/* Subtitle Bar: CAR RENTALS with decorative bounding lines */}
          <line
            x1="36"
            y1="94"
            x2="135"
            y2="94"
            stroke={isLight ? "#94A3B8" : "#64748B"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          <text
            x="230"
            y="99"
            fontFamily="'Space Grotesk', system-ui, sans-serif"
            fontWeight="700"
            fontSize="14.5"
            letterSpacing="6"
            textAnchor="middle"
            fill={isLight ? "#1E293B" : "#F8FAFC"}
          >
            CAR RENTALS
          </text>

          <line
            x1="325"
            y1="94"
            x2="424"
            y2="94"
            stroke={isLight ? "#94A3B8" : "#64748B"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Subtle center accent dots */}
          <circle cx="150" cy="94" r="2.2" fill="#DC2626" />
          <circle cx="310" cy="94" r="2.2" fill="#DC2626" />
        </svg>
      </div>
    </div>
  );
};
