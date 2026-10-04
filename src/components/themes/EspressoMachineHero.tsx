import React, { useState, useEffect } from 'react';
import { Coffee, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import fullEspressoMachineImg from '../../assets/images/full_espresso_machine_1790780343468.jpg';

interface EspressoMachineHeroProps {
  brandName?: string;
  tagline?: string;
  onOrderClick?: () => void;
  onReserveClick?: () => void;
  lang?: string;
  deviceView?: 'desktop' | 'tablet' | 'mobile';
}

export const EspressoMachineHero: React.FC<EspressoMachineHeroProps> = ({
  brandName = 'LUNAVERE',
  tagline = 'Parisian Starlight Cafe',
  onOrderClick,
  onReserveClick,
  lang = 'en',
  deviceView
}) => {
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = deviceView === 'mobile' || (deviceView !== 'desktop' && deviceView !== 'tablet' && windowWidth < 640);
  const isTablet = deviceView === 'tablet' || (deviceView !== 'desktop' && (windowWidth >= 640 && windowWidth < 1024));

  /* 
    ========================================================================
    1. MOBILE VIEW (Screen < 640px or deviceView === 'mobile')
    Clean stacked vertical layout: Elegant headline and buttons on top, 
    followed by a vibrant, 100% full-visibility luxury machine showcase 
    card with steam animation and live extraction badge.
    ========================================================================
  */
  if (isMobile) {
    return (
      <section 
        id="hero" 
        className="relative w-full bg-[#15162B] text-white pt-24 sm:pt-28 pb-12 px-4 sm:px-6 flex flex-col justify-start overflow-hidden"
      >
        {/* Mobile Left-aligned Text Content */}
        <div className="w-full space-y-4 text-left z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15162B]/90 border border-[#C9A86A]/45 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A86A] inline-block animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#C9A86A] uppercase">
              EST. 2026 • PARISIAN NIGHT COFFEE
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1 
              className="font-light text-white tracking-tight leading-[1.12] text-3xl sm:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="block font-normal text-white">Pure Extraction,</span>
              <span className="block italic text-[#C9A86A] font-normal mt-0.5">somewhere after dusk.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white/85 font-normal leading-relaxed text-xs sm:text-sm">
            {'freshly-ground single-origin Arabica beans extracted under majestic commercial pressure into warm white porcelain cups for slow Parisian evenings.'
            }
          </p>

          {/* Sub-badge Line */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#C9A86A] pt-0.5">
            <Coffee className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
            <span className="font-semibold uppercase tracking-[0.14em] text-[11px]">
              {'SINGLE-ORIGIN ROAST • EXTRACTED FRESH'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2 w-full">
            <button
              type="button"
              onClick={onOrderClick}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C9A86A] hover:bg-[#b59556] text-[#15162B] font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-[#15162B]" />
              <span>{'EXPLORE SIGNATURE MENU'}</span>
            </button>

            <button
              type="button"
              onClick={onReserveClick}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/25 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
            >
              <span>{'RESERVE EVENING TABLE'}</span>
            </button>
          </div>
        </div>

        {/* 
          Dedicated Full Espresso Machine Showcase for Mobile 
          100% full opacity, complete machine visible with steam & live extraction badge
        */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#C9A86A]/40 bg-gradient-to-b from-[#1b1d38] via-[#15162B] to-[#101122] shadow-2xl mt-7 p-3 sm:p-4">
          {/* Card Top Label */}
          <div className="flex items-center justify-between pb-2 border-b border-[#C9A86A]/20 mb-2">
            <div className="flex items-center gap-1.5 text-[#C9A86A] text-[10px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#C9A86A]" />
              <span>COMMERCIAL BREW GROUP</span>
            </div>
            <span className="text-[10px] font-mono text-white/60">PARISIAN EXTRACTION</span>
          </div>

          {/* Full Espresso Machine Container with Motion */}
          <motion.div 
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center overflow-hidden rounded-xl bg-black/30"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={fullEspressoMachineImg}
              alt="Complete Commercial Luxury Espresso Machine"
              className="w-full h-full object-contain filter brightness-[0.98] contrast-[1.05]"
            />

            {/* Rising Steam Particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.45, 0], 
                  y: [-3, -40, -80], 
                  scale: [0.8, 1.3, 1.9] 
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: i * 0.9,
                  ease: "easeOut"
                }}
                className="absolute rounded-full bg-white/25 blur-sm pointer-events-none"
                style={{
                  width: `${20 + i * 6}px`,
                  height: `${20 + i * 6}px`,
                  bottom: '38%',
                  right: `${28 + (i * 12)}%`,
                }}
              />
            ))}

            {/* Live Extraction Badge */}
            <div className="absolute bottom-2.5 right-2.5 z-20 px-3 py-1.5 rounded-xl bg-[#15162B]/90 backdrop-blur-md border border-[#C9A86A]/50 flex items-center gap-2 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A86A]"></span>
              </span>
              <span className="font-mono text-[10px] font-bold tracking-wider text-[#C9A86A] uppercase">
                {'9.2 BAR • LIVE'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* 
    ========================================================================
    2. TABLET VIEW (640px <= Screen < 1024px or deviceView === 'tablet')
    Balanced 2-column layout: Left text block & right full machine at 
    100% opacity with steam particles and live extraction badge.
    ========================================================================
  */
  if (isTablet) {
    return (
      <section 
        id="hero" 
        className="relative w-full bg-[#15162B] text-white pt-28 pb-16 px-6 sm:px-8 min-h-[640px] flex items-center overflow-hidden"
      >
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between gap-6">
          {/* Left Column Text */}
          <div className="w-[48%] space-y-5 text-left z-10 shrink-0">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15162B]/85 border border-[#C9A86A]/40 shadow-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A] inline-block animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#C9A86A] uppercase">
                EST. 2026 • PARISIAN NIGHT COFFEE
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 
                className="font-light text-white tracking-tight leading-[1.12] text-3xl sm:text-4xl md:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span className="block font-normal text-white">Pure Extraction,</span>
                <span className="block italic text-[#C9A86A] font-normal mt-1">somewhere after dusk.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-white/80 font-normal leading-relaxed text-xs sm:text-sm">
              {'freshly-ground single-origin Arabica beans extracted under majestic commercial pressure. Watch the rich, velvet chestnut crema pour directly into warm porcelain cups.'
              }
            </p>

            {/* Sub-badge Line */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#C9A86A] pt-0.5">
              <Coffee className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span className="font-semibold uppercase tracking-[0.16em]">
                {'SINGLE-ORIGIN ROAST • EXTRACTED FRESH'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={onOrderClick}
                className="px-6 py-3 rounded-full bg-[#C9A86A] hover:bg-[#b59556] text-[#15162B] font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-[#15162B]" />
                <span>{'SIGNATURE MENU'}</span>
              </button>

              <button
                type="button"
                onClick={onReserveClick}
                className="px-6 py-3 rounded-full bg-transparent hover:bg-white/5 border border-white/25 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center shadow-sm hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{'RESERVE TABLE'}</span>
              </button>
            </div>
          </div>

          {/* Right Column Full Espresso Machine at 100% Opacity */}
          <div className="w-[52%] relative flex items-center justify-end">
            <motion.div 
              className="relative w-full h-[380px] md:h-[440px] flex items-center justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={fullEspressoMachineImg}
                alt="Complete Commercial Luxury Espresso Machine"
                className="w-full h-full object-contain filter brightness-[0.96] contrast-[1.05]"
              />

              {/* Steam Particles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.45, 0], 
                    y: [-5, -55, -100], 
                    scale: [0.8, 1.3, 2.0] 
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute rounded-full bg-white/20 blur-md pointer-events-none"
                  style={{
                    width: `${24 + i * 8}px`,
                    height: `${24 + i * 8}px`,
                    bottom: '36%',
                    right: `${24 + (i * 7)}%`,
                  }}
                />
              ))}

              {/* Live Extraction Badge */}
              <div className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-2xl bg-[#15162B]/85 backdrop-blur-md border border-[#C9A86A]/45 flex items-center gap-2 shadow-2xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A86A]"></span>
                </span>
                <span className="font-mono text-[11px] font-bold tracking-wider text-[#C9A86A] uppercase">
                  {'9.2 BAR • LIVE EXTRACTION'}
                </span>
              </div>

              {/* Soft edge blend on left */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#15162B] to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* 
    ========================================================================
    3. DESKTOP VIEW (Screen >= 1024px and deviceView === 'desktop')
    Strictly preserved per RULE[AGENTS_md]: Full-width split layout with 
    corner-left text and right-hand commercial coffee machine.
    ========================================================================
  */
  return (
    <section 
      id="hero" 
      className="relative w-full bg-[#15162B] text-white overflow-hidden flex items-center min-h-[90vh] lg:min-h-[850px]"
    >
      {/* RIGHT-SIDE COFFEE MACHINE SECTION */}
      <div className="absolute right-0 top-0 bottom-0 h-full z-0 overflow-hidden flex items-center justify-end pointer-events-none w-full lg:w-[58%] xl:w-[54%]">
        <motion.div 
          className="relative w-full h-full flex items-center justify-end"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Full Commercial Espresso Machine Image */}
          <img
            src={fullEspressoMachineImg}
            alt="Complete Commercial Luxury Espresso Machine"
            className="w-full h-full object-cover object-right filter brightness-[0.94] contrast-[1.05]"
          />

          {/* Animated Steam Particles rising above the machine */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, scale: 0.8, x: 0 }}
              animate={{ 
                opacity: [0, 0.45, 0], 
                y: [-5, -60, -110], 
                x: [0, (i % 2 === 0 ? 12 : -12), (i % 2 === 0 ? -16 : 16)],
                scale: [0.8, 1.4, 2.2] 
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut"
              }}
              className="absolute rounded-full bg-white/20 blur-md pointer-events-none"
              style={{
                width: `${26 + i * 8}px`,
                height: `${26 + i * 8}px`,
                bottom: '36%',
                right: `${22 + (i * 6)}%`,
              }}
            />
          ))}

          {/* Live Extraction Badge with animated pulsating indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 px-4 py-2.5 rounded-2xl bg-[#15162B]/85 backdrop-blur-md border border-[#C9A86A]/45 flex items-center gap-2.5 shadow-2xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A86A]"></span>
            </span>
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#C9A86A] uppercase">
              {'9.2 BAR • LIVE EXTRACTION'}
            </span>
          </motion.div>

          {/* Subtle edge blending gradient to seamlessly integrate with navy theme */}
          <div className="absolute inset-y-0 left-0 w-32 sm:w-48 lg:w-60 bg-gradient-to-r from-[#15162B] via-[#15162B]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#15162B] via-[#15162B]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#15162B] via-[#15162B]/70 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* LEFT-SIDE TEXT CONTENT ON DESKTOP */}
      <div className="relative z-10 w-full pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-24 pr-6 sm:pr-8 py-24 sm:py-32 lg:py-36">
        <div className="space-y-5 sm:space-y-6 text-left max-w-xl xl:max-w-2xl">
          
          {/* Top Pill Badge: EST. 2026 • PARISIAN NIGHT COFFEE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#15162B]/80 border border-[#C9A86A]/40 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A86A] inline-block animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#C9A86A] uppercase">
              EST. 2026 • PARISIAN NIGHT COFFEE
            </span>
          </div>

          {/* Headline: Pure Extraction, somewhere after dusk. */}
          <div className="space-y-1">
            <h1 
              className="font-light text-white tracking-tight leading-[1.12] text-4xl sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="block font-normal text-white">Pure Extraction,</span>
              <span className="block italic text-[#C9A86A] font-normal mt-1">somewhere after dusk.</span>
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-white/80 font-normal leading-relaxed text-sm sm:text-base md:text-lg max-w-xl">
            {'freshly-ground single-origin Arabica beans extracted under majestic commercial pressure. Watch the rich, velvet chestnut crema pour directly into your warm white porcelain cup for unforgettable slow Parisian evenings.'
            }
          </p>

          {/* Sub-badge Line: SINGLE-ORIGIN ROAST • EXTRACTED FRESH TO ORDER */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-[#C9A86A] pt-0.5">
            <Coffee className="w-4 h-4 text-[#C9A86A] shrink-0" />
            <span className="font-semibold uppercase tracking-[0.16em]">
              {'SINGLE-ORIGIN ROAST • EXTRACTED FRESH TO ORDER'}
            </span>
          </div>

          {/* CTA Buttons Matching Theme */}
          <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-4">
            {/* Explore Signature Menu (Golden Primary Button) */}
            <button
              type="button"
              onClick={onOrderClick}
              className="rounded-full bg-[#C9A86A] hover:bg-[#b59556] text-[#15162B] font-black uppercase tracking-wider transition-all shadow-xl hover:shadow-[#C9A86A]/20 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm"
            >
              <Coffee className="w-4 h-4 text-[#15162B]" />
              <span>{'EXPLORE SIGNATURE MENU'}</span>
            </button>

            {/* Reserve Evening Table (Outlined White Button) */}
            <button
              type="button"
              onClick={onReserveClick}
              className="rounded-full bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm"
            >
              <span>{'RESERVE EVENING TABLE'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
