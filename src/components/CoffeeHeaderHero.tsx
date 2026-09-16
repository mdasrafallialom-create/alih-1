import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Sparkles, Flame, Sliders, Check, Zap, Eye, Layers } from 'lucide-react';

interface CoffeeHeaderHeroProps {
  brandName?: string;
  tagline?: string;
  themeStyle?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    surfaceColor?: string;
    textColor?: string;
    fontDisplay?: string;
  };
  activeHeaderOption?: 'cover' | 'beans' | 'both';
  onHeaderOptionChange?: (option: 'cover' | 'beans' | 'both') => void;
  lang?: string;
}

export function CoffeeHeaderHero({
  brandName = 'SAHINSH',
  tagline = 'Warm hearth fires, exposed brick and vintage bronze for artisan coffee houses & bakeries.',
  themeStyle,
  activeHeaderOption: externalOption,
  onHeaderOptionChange,
  lang = 'bn'
}: CoffeeHeaderHeroProps) {
  const [internalHeaderOption, setInternalHeaderOption] = useState<'cover' | 'beans' | 'both'>('both');
  
  const currentOption = externalOption || internalHeaderOption;

  const handleSelectOption = (opt: 'cover' | 'beans' | 'both') => {
    setInternalHeaderOption(opt);
    if (onHeaderOptionChange) {
      onHeaderOptionChange(opt);
    }
  };

  const primary = themeStyle?.primaryColor || '#f97316';
  const surface = themeStyle?.surfaceColor || '#1c120c';
  const fontDisplay = themeStyle?.fontDisplay || 'DM Serif Display, serif';

  // Coffee bean positions for animated floating background particles (কপির বিট)
  const coffeeBeans = [
    { id: 1, top: '15%', left: '8%', size: 'w-6 h-6', delay: 0, duration: 4 },
    { id: 2, top: '25%', left: '85%', size: 'w-8 h-8', delay: 1, duration: 5 },
    { id: 3, top: '65%', left: '12%', size: 'w-7 h-7', delay: 2, duration: 4.5 },
    { id: 4, top: '75%', left: '78%', size: 'w-6 h-6', delay: 0.5, duration: 3.8 },
    { id: 5, top: '45%', left: '92%', size: 'w-5 h-5', delay: 1.5, duration: 5.2 },
    { id: 6, top: '80%', left: '45%', size: 'w-6 h-6', delay: 2.2, duration: 4.2 },
  ];

  return (
    <div className="w-full space-y-6 select-none">
      {/* Header Mode Switcher Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-500/20 text-white">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              {lang === 'bn' ? 'হেডার সেকশন অ্যানিমেশন মোড' : 'Header Animation Style'}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium">
              {lang === 'bn' ? 'কভার স্লাইডার ও বিট পার্টিকেল অ্যানিমেশন সুইচার' : 'Switch between Coffee Cover Slide & Floating Bean Particles'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleSelectOption('cover')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentOption === 'cover' 
                ? 'bg-amber-500 text-black shadow-md font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'কফি কাভার (Cover)' : 'Coffee Cover'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectOption('beans')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentOption === 'beans' 
                ? 'bg-amber-500 text-black shadow-md font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'কফি বিট (Beans)' : 'Coffee Beans'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectOption('both')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentOption === 'both' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'উভয় হেডার (Both Dual)' : 'Dual Headers'}</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* HEADER SECTION 1: ANIMATED COFFEE COVER BANNER (উপর থেকে কফির কাভার) */}
      {/* ======================================================================= */}
      {(currentOption === 'cover' || currentOption === 'both') && (
        <motion.div 
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-gradient-to-br from-[#1c120c] via-[#2d1e15] to-[#120a06]"
        >
          {/* Dynamic Top Cover Image with Floating Animation */}
          <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
            <motion.img 
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=85" 
              alt="Artisan Coffee Cover"
              className="w-full h-full object-cover"
            />

            {/* Dark & Amber Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c120c] via-[#1c120c]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c120c]/90 via-transparent to-[#1c120c]/90" />

            {/* Animated Steam & Vapor Effect */}
            <motion.div 
              animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.15),transparent_60%)]"
            />

            {/* Cover Banner Content */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end items-center text-center text-white z-10 space-y-3">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-xl"
              >
                <Coffee className="w-8 h-8 animate-bounce" />
              </motion.div>

              <h2 
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500"
                style={{ fontFamily: fontDisplay }}
              >
                {brandName} - Artisan Roast House
              </h2>

              <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl font-medium leading-relaxed">
                {tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'bn' ? 'উষ্ণ ফায়ারস্পেস অ্যান্ড বেকারি' : 'Warm Hearth & Bakery'}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 font-mono text-xs">
                  ☕ 100% Single-Origin Arabica
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ======================================================================= */}
      {/* HEADER SECTION 2: FLOATING COFFEE BEANS BEATS (নিচে কপির বিট অ্যানিমেশন) */}
      {/* ======================================================================= */}
      {(currentOption === 'beans' || currentOption === 'both') && (
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative w-full rounded-3xl overflow-hidden border border-orange-500/30 p-8 sm:p-12 shadow-2xl bg-gradient-to-r from-[#241710] via-[#362217] to-[#241710] min-h-[260px] flex flex-col justify-center items-center text-center"
        >
          {/* FLOATING COFFEE BEANS (কপির বিট) PARTICLES */}
          {coffeeBeans.map((bean) => (
            <motion.div
              key={bean.id}
              style={{ top: bean.top, left: bean.left }}
              animate={{ 
                y: [0, -18, 0],
                rotate: [0, 45, -20, 0],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: bean.duration, 
                delay: bean.delay,
                ease: "easeInOut"
              }}
              className={`absolute pointer-events-none text-amber-600/60 ${bean.size} flex items-center justify-center`}
            >
              <div className="relative">
                {/* Custom Coffee Bean Icon Shape */}
                <div className="w-6 h-4 rounded-full bg-gradient-to-tr from-amber-900 via-amber-700 to-amber-950 border border-amber-500/40 shadow-inner rotate-45 flex items-center justify-center">
                  <div className="w-full h-[1.5px] bg-amber-400/60 rounded-full transform -rotate-12" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Center Roasted Bean Glow Feature */}
          <div className="relative z-10 space-y-4 max-w-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-amber-700 p-0.5 shadow-xl shadow-orange-500/20"
            >
              <div className="w-full h-full rounded-full bg-[#1c120c] flex items-center justify-center text-amber-400">
                <Coffee className="w-7 h-7" />
              </div>
            </motion.div>

            <h3 
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: fontDisplay }}
            >
              {lang === 'bn' ? 'আর্টিসান রোস্টেড কফি অ্যান্ড এক্সপ্রেসো বার' : 'Artisan Roasted Coffee & Espresso Bar'}
            </h3>

            <p className="text-xs sm:text-sm text-amber-200/80 font-medium max-w-lg mx-auto leading-relaxed">
              {lang === 'bn' 
                ? 'টাটকা ভাজা কফি বিনের সুবাস ও উড-ফায়ার্ড ওভেনের উষ্ণতায় তৈরি হয় আমাদের প্রতিদিনের সিগনেচার পানীয়।' 
                : 'Immerse yourself in freshly roasted coffee aromas, wood-fired hearth warmth, and hand-crafted espresso.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-600/40 text-amber-400 text-xs font-bold font-mono">
                🔥 Roasted In-House Daily
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-bold font-mono">
                ✨ Organic Bean Beats
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CoffeeHeaderHero;
