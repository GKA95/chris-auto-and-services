import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'pill' | 'icon' | 'pill-labeled';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  // 1. Icon variant: sleek compact button (ideal for mobile toolbars)
  if (variant === 'icon') {
    return (
      <motion.button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Current theme is ${theme}. Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className={`relative p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 overflow-hidden cursor-pointer ${
          isDark
            ? 'bg-zinc-900/90 text-red-400 hover:text-red-300 hover:bg-zinc-800/90 border border-zinc-800 hover:border-red-900/40 shadow-sm shadow-black/40'
            : 'bg-zinc-100 text-amber-600 hover:text-amber-700 hover:bg-zinc-200/90 border border-zinc-300/80 hover:border-amber-400/50 shadow-sm'
        } ${className}`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-icon"
              initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              className="flex items-center justify-center"
            >
              <Moon className="w-4 h-4 fill-red-500/25 stroke-[2.2]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-icon"
              initial={{ scale: 0.4, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: -90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              className="flex items-center justify-center"
            >
              <Sun className="w-4 h-4 stroke-[2.4]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  // 2. Labeled variant: Pill toggle with explicit text badge (great in settings/menus)
  if (variant === 'pill-labeled') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <motion.button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label={`Toggle theme. Current theme is ${theme}`}
          onClick={toggleTheme}
          onKeyDown={handleKeyDown}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className={`relative inline-flex items-center h-8 w-15 p-1 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer ${
            isDark
              ? 'bg-zinc-900 border border-zinc-800'
              : 'bg-zinc-200 border border-zinc-300'
          }`}
        >
          {/* Track cues */}
          <Sun className={`w-3 h-3 ml-1 text-amber-500 transition-opacity duration-200 ${isDark ? 'opacity-30' : 'opacity-80'}`} />
          <Moon className={`w-3 h-3 ml-auto mr-1 text-red-400 transition-opacity duration-200 ${isDark ? 'opacity-80' : 'opacity-30'}`} />

          {/* Thumb */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            animate={{ x: isDark ? 28 : 0 }}
            className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
              isDark
                ? 'bg-gradient-to-tr from-zinc-800 to-zinc-700 text-red-400 border border-zinc-600'
                : 'bg-white text-amber-500 border border-zinc-200'
            }`}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 fill-red-500/20" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
          </motion.div>
        </motion.button>
        <span className="text-xs font-semibold capitalize text-zinc-600 dark:text-zinc-300 select-none">
          {theme} mode
        </span>
      </div>
    );
  }

  // 3. Deluxe Interactive Sliding Pill Toggle (Default)
  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Current theme is ${theme}. Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center h-9 w-[68px] p-[3px] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 select-none cursor-pointer ${
        isDark
          ? 'bg-zinc-900 border border-zinc-800 hover:border-red-900/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] shadow-inner'
          : 'bg-zinc-200/90 border border-zinc-300 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] shadow-inner'
      } ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background static icon cues in the track */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            isDark ? 'opacity-25 text-zinc-500 scale-90' : 'opacity-0 text-amber-500'
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            isDark ? 'opacity-0 text-red-400' : 'opacity-25 text-zinc-500 scale-90'
          }`}
        />
      </div>

      {/* Floating Animated Sliding Thumb */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 480,
          damping: 28,
          mass: 0.8,
        }}
        animate={{
          x: isDark ? 32 : 0,
        }}
        className={`relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-md transition-colors ${
          isDark
            ? 'bg-gradient-to-tr from-zinc-800 via-zinc-800 to-zinc-700 text-red-400 border border-zinc-600/90 shadow-black/50'
            : 'bg-white text-amber-500 border border-zinc-200 shadow-zinc-400/30'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-thumb"
              initial={{ rotate: -120, scale: 0.3, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 25,
                duration: 0.25,
              }}
              className="relative flex items-center justify-center"
            >
              <Moon className="w-3.5 h-3.5 fill-red-500/25 stroke-[2.2]" />
              {/* Subtle crimson star spark in dark mode */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.8], scale: [0.5, 1.2, 1] }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute -top-1 -right-1 text-red-400/80"
              >
                <Sparkles className="w-2 h-2" />
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="sun-thumb"
              initial={{ rotate: 120, scale: 0.3, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 25,
                duration: 0.25,
              }}
              className="relative flex items-center justify-center"
            >
              <Sun className="w-4 h-4 stroke-[2.3]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};
