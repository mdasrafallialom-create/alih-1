import React from 'react';
import { Coffee, Sparkles, ArrowRight } from 'lucide-react';
import espressoWhiteCupImg from '../../assets/images/espresso_white_cup_1789539569203.jpg';

interface EspressoMachineHeroProps {
  brandName?: string;
  tagline?: string;
  onOrderClick?: () => void;
  onReserveClick?: () => void;
  lang?: string;
}

export const EspressoMachineHero: React.FC<EspressoMachineHeroProps> = ({
  brandName = 'LUNAVERE',
  tagline = 'Parisian Starlight Cafe',
  onOrderClick,
  onReserveClick,
  lang = 'en'
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-[850px] w-full bg-[#F4E7D3] text-[#171522] overflow-hidden flex items-center">
      {/* Background Image with Authentic Commercial Espresso Machine Extraction */}
      <div className="absolute inset-0 z-0">
        <img
          src={espressoWhiteCupImg}
          alt="Espresso Commercial Extraction"
          className="w-full h-full object-cover object-right lg:object-[82%_center]"
        />
        {/* Warm Cream Vignette Overlays for Light Theme text contrast */}
        {/* Left Warm Cream Gradient for Crystal-Clear Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4E7D3] via-[#F4E7D3]/95 sm:via-[#F4E7D3]/85 via-45% lg:via-50% to-transparent" />
        {/* Top & Bottom Gradient for Nav and Section Integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4E7D3]/80 via-transparent to-[#F4E7D3]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-28 sm:py-36">
        <div className="max-w-2xl space-y-6 sm:space-y-8 text-left">
          
          {/* Top Pill Badge: EST. 2026 • PARISIAN NIGHT COFFEE */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-[#C9A86A]/50 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#96722d] inline-block animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#96722d]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#96722d] uppercase">
              EST. 2026 • PARISIAN NIGHT COFFEE
            </span>
          </div>

          {/* Headline: Pure Extraction, somewhere after dusk. */}
          <div className="space-y-1">
            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#171522] tracking-tight leading-[1.08]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="block font-normal text-[#171522]">Pure Extraction,</span>
              <span className="block italic text-[#96722d] font-normal mt-1">somewhere after dusk.</span>
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-[#171522]/80 font-normal leading-relaxed max-w-xl">
            {lang === 'bn' 
              ? 'অথেনটিক কমার্শিয়াল প্রেশারে তাজা অ্যারাবিকা কফি বিনের বিশুদ্ধ এক্সট্র্যাকশন। ধীরস্থির প্যারিসিয়ান সন্ধ্যার জন্য পোরসেলিনের সাদা কাপে নেমে আসে ঘন হ্যাজেলনাট ক্রেমার সোনালী ধারা।'
              : 'Freshly ground single-origin Arabica beans extracted under authentic commercial pressure. Watch the rich, velvet hazelnut crema pour directly into your warm white porcelain cup for unforgettable slow Parisian evenings.'
            }
          </p>

          {/* Sub-badge Line: SINGLE-ORIGIN ROAST • EXTRACTED FRESH TO ORDER */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-[#96722d] pt-1">
            <Coffee className="w-4 h-4 text-[#96722d] shrink-0" />
            <span className="font-semibold uppercase tracking-[0.18em]">
              {lang === 'bn' ? 'সিঙ্গেল-অরিজিন রোস্ট • ফ্রেশ এক্সট্র্যাকশন' : 'SINGLE-ORIGIN ROAST • EXTRACTED FRESH TO ORDER'}
            </span>
          </div>

          {/* CTA Buttons Matching Theme */}
          <div className="flex flex-wrap items-center gap-4 pt-3 sm:pt-4">
            {/* Explore Signature Menu (Dark Primary Button) */}
            <button
              type="button"
              onClick={onOrderClick}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-[#C9A86A]" />
              <span>{lang === 'bn' ? 'সিগনেচার মেনু দেখুন' : 'EXPLORE SIGNATURE MENU'}</span>
            </button>

            {/* Reserve Evening Table (Outlined White Button) */}
            <button
              type="button"
              onClick={onReserveClick}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/90 hover:bg-white border border-[#C9A86A]/60 text-[#171522] hover:text-[#96722d] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
            >
              <span>{lang === 'bn' ? 'টেবিল রিজার্ভেশন' : 'RESERVE EVENING TABLE'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EspressoMachineHero;
