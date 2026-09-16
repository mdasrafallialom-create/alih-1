import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowDown, Droplets, Coffee } from 'lucide-react';
import whiteCupSharpImage from '../../assets/images/white_cup_sharp_1789548436404.jpg';

interface EspressoMachineHeroProps {
  onOrderClick?: () => void;
  onReserveClick?: () => void;
  brandName?: string;
}

export const EspressoMachineHero: React.FC<EspressoMachineHeroProps> = ({
  onOrderClick,
  onReserveClick,
  brandName = 'Lunavere'
}) => {
  // Parallax subtle depth effect on scroll
  const { scrollYProgress } = useScroll();
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <div 
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0C0D1A] text-[#F4E7D3]"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS RIGHT CAFE BACKGROUND (একবারে ব্যাকগ্রাউন্ডের সঙ্গে মিক্সড)      */}
      {/* মেশিন ও কাপটি পুরোপুরি ডানপাশে সুন্দরভাবে ছড়িয়ে ব্যাকগ্রাউন্ডের সাথে ব্লেন্ড   */}
      {/* ========================================================================= */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] xl:w-[55%] h-full pointer-events-none overflow-hidden select-none z-0">
        <motion.div 
          style={{ scale: photoScale }}
          className="relative w-full h-full"
        >
          {/* Real authentic sharp photo of the commercial machine & white cup */}
          <img 
            src={whiteCupSharpImage} 
            alt="Authentic commercial Italian chrome espresso machine in a cafe dispensing espresso into classic white cup" 
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04]"
          />

          {/* Left seamless blending mask: Gradual natural fade into #0C0D1A background */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#0C0D1A] via-[#0C0D1A]/95 sm:via-[#0C0D1A]/70 to-transparent pointer-events-none" />

          {/* Top subtle blend */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0C0D1A] via-[#0C0D1A]/70 to-transparent pointer-events-none" />

          {/* Bottom subtle blend */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0D1A] via-[#0C0D1A]/80 to-transparent pointer-events-none" />

          {/* ========================================================================= */}
          {/* REALISTIC ANIMATED ESPRESSO LIQUID STREAM, SPLASH & STEAM OVERLAYS       */}
          {/* ========================================================================= */}

          {/* Organic Natural Rising Steam directly from the White Cup */}
          <div className="absolute top-[38%] right-[24%] sm:right-[25%] lg:right-[26%] pointer-events-none z-20 flex justify-center items-center w-44 h-64">
            {/* Main Soft Thermal Steam Column */}
            <motion.div 
              animate={{ 
                y: [10, -130],
                x: [-8, 16, -6],
                opacity: [0, 0.5, 0.2, 0],
                scale: [0.5, 1.5, 2.4],
                rotate: [0, 16, -10]
              }}
              transition={{ duration: 4.2, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute w-16 h-40 bg-radial from-white/40 via-amber-50/20 to-transparent blur-xl rounded-full"
            />

            {/* Fine Wisps */}
            <motion.div 
              animate={{ 
                y: [15, -150],
                x: [6, -14, 12],
                opacity: [0, 0.6, 0.15, 0],
                scale: [0.4, 1.7, 2.8],
                rotate: [0, -20, 15]
              }}
              transition={{ duration: 3.6, delay: 1.0, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-12 h-36 bg-radial from-slate-100/50 via-white/25 to-transparent blur-lg rounded-full"
            />
          </div>

          {/* 4. Secondary Cup Steam (Right Side) */}
          <div className="absolute top-[50%] right-[3%] sm:right-[5%] pointer-events-none z-10 flex justify-center items-center w-24 h-36">
            <motion.div 
              animate={{ 
                y: [0, -95],
                x: [-4, 10, -3],
                opacity: [0, 0.5, 0],
                scale: [0.6, 2.1],
              }}
              transition={{ duration: 3.6, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
              className="w-14 h-28 bg-radial from-white/45 via-amber-100/25 to-transparent blur-lg rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Global Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_15%_40%,rgba(201,168,106,0.18),transparent_60%)]" />

      {/* ========================================================================= */}
      {/* 2. LEFT CONTENT: BRAND STORY & CTAs (একদম বাম দিকে চাপানো)                 */}
      {/* Container mx-0 / pl-6 to pl-16 দ্বারা লেখাগুলো একদম বামে পুশ করা হয়েছে       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-6 pt-14 sm:pt-20 lg:pt-24 pb-14 flex-1 flex flex-col justify-center">
        
        <div className="w-full max-w-xl lg:max-w-lg xl:max-w-xl flex flex-col items-start text-left space-y-6 sm:space-y-7">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#181932]/90 border border-[#C9A86A]/40 text-[#C9A86A] text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>EST. 2026 • PARISIAN NIGHT COFFEE</span>
          </div>

          {/* Luxury Display Heading */}
          <div className="space-y-4">
            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F4E7D3] leading-[1.08] tracking-tight drop-shadow-lg"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Pure Extraction, <br />
              <span className="italic font-light text-[#C9A86A]">somewhere after dusk.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F4E7D3]/85 font-light leading-relaxed max-w-lg drop-shadow-sm">
              Freshly ground single-origin Arabica beans extracted under authentic commercial pressure. 
              Watch the rich, velvet hazelnut crema pour directly into your warm white porcelain cup for unforgettable slow Parisian evenings.
            </p>
          </div>

          {/* Artisanal Note */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-light text-[#C9A86A] tracking-wider uppercase drop-shadow-sm">
            <Coffee className="w-4 h-4 text-[#C9A86A]" />
            <span>Single-Origin Roast • Extracted Fresh to Order</span>
          </div>

          {/* Clean Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
            <button
              type="button"
              onClick={onOrderClick}
              className="px-8 py-4 rounded-full bg-[#C9A86A] hover:bg-[#b89759] active:scale-95 text-[#15162B] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-2xl shadow-amber-950/50 flex items-center gap-2.5 cursor-pointer"
            >
              <Droplets className="w-4 h-4 fill-[#15162B]" />
              <span>Explore Signature Menu</span>
            </button>
            <button
              type="button"
              onClick={onReserveClick}
              className="px-8 py-4 rounded-full border border-[#F4E7D3]/40 hover:border-[#C9A86A] text-[#F4E7D3] hover:text-[#C9A86A] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer"
            >
              Reserve Evening Table
            </button>
          </div>
        </div>

      </div>


    </div>
  );
};
