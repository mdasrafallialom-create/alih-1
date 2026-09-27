import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown, Flame, Award, Eye, Utensils } from 'lucide-react';
import clocheImg from '../../assets/images/gold_cloche_luxury_1790508663190.jpg';
import wagyuDishImg from '../../assets/images/luxury_michelin_dish_1790508680735.jpg';

interface OrivelleGoldClocheVisualProps {
  accentColor?: string;
  customImg?: string;
  itemName?: string;
}

export const OrivelleGoldClocheVisual: React.FC<OrivelleGoldClocheVisualProps> = ({
  accentColor = '#e5c158',
  customImg,
  itemName = 'Imperial 24K Wagyu & Winter Truffle'
}) => {
  const [isLifted, setIsLifted] = useState(false);

  return (
    <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none py-2">
      {/* 1. Ambient Background Multi-Tiered Golden Radiance */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl bg-amber-500/25 pointer-events-none scale-125 animate-pulse" 
        style={{ animationDuration: '4s' }} 
      />
      <div className="absolute w-80 h-80 rounded-full blur-2xl bg-yellow-400/20 pointer-events-none" />
      <div className="absolute inset-2 rounded-full border border-amber-400/25 pointer-events-none opacity-50 scale-105" />

      {/* 2. Rotating Sacred Geometry 12-Point Gold Star Mandala */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="absolute w-84 sm:w-[410px] h-84 sm:h-[410px] pointer-events-none opacity-40"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="mandalaGoldReal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#aa771c" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="192" fill="none" stroke="url(#mandalaGoldReal)" strokeWidth="1" strokeDasharray="3,6" />
          <circle cx="200" cy="200" r="172" fill="none" stroke="url(#mandalaGoldReal)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#mandalaGoldReal)" strokeWidth="0.8" strokeDasharray="6,4" />
          
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 150;
            const y1 = 200 + Math.sin(angle) * 150;
            const x2 = 200 + Math.cos(angle) * 192;
            const y2 = 200 + Math.sin(angle) * 192;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#mandalaGoldReal)" strokeWidth="1.2" />
                <circle cx={x2} cy={y2} r="2.5" fill="#fef08a" />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* 3. Floating 24K Edible Gold Leaf Flakes with Realistic Drift */}
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [20, -50, -110],
            x: [0, (i % 2 === 0 ? 22 : -22), 0],
            rotate: [0, i * 60, i * 120],
            opacity: [0, 0.95, 0],
            scale: [0.6, 1.3, 0.5]
          }}
          transition={{
            duration: 3.4 + (i % 3) * 0.9,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut'
          }}
          style={{
            left: `${15 + (i * 9)}%`,
            bottom: '18%'
          }}
          className="absolute pointer-events-none z-30"
        >
          <div className="w-3.5 h-3.5 bg-gradient-to-tr from-amber-300 via-yellow-100 to-amber-500 rounded-sm transform rotate-45 shadow-[0_0_15px_rgba(254,240,138,0.95)] opacity-95" />
        </motion.div>
      ))}

      {/* 4. Realistic Photographed 24K Gold Cloche & Culinary Platter with Interactive Reveal */}
      <div 
        onClick={() => setIsLifted(!isLifted)}
        className="relative z-20 flex flex-col items-center justify-center cursor-pointer group w-72 sm:w-84 md:w-96 aspect-square"
      >
        {/* Top Glint Sparkle */}
        <motion.div
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 1, 0.4], rotate: [0, 90, 180] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 z-30 pointer-events-none text-yellow-200 filter drop-shadow-[0_0_12px_#fef08a]"
        >
          <Sparkles className="w-7 h-7" />
        </motion.div>

        {/* Real Food Dish Revealed underneath when lifted */}
        <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-black flex items-center justify-center">
          <img
            src={customImg || wagyuDishImg}
            alt="Michelin Star Haute Cuisine"
            className="w-full h-full object-cover transform scale-110 filter brightness-110 contrast-110"
          />
          {/* Subtle steam rising from dish */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -12, -24], scaleX: [1, 1.2, 1.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-8 top-12 h-20 bg-gradient-to-t from-white/20 via-amber-200/15 to-transparent blur-md pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute bottom-4 inset-x-0 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 font-serif drop-shadow-md">
              Miyazaki A5 Wagyu & Black Truffle
            </span>
          </div>
        </div>

        {/* Realistic 24K Gold Cloche Cover (Photo-Realistic) */}
        <motion.div
          animate={isLifted ? { y: -80, opacity: 0.95, rotate: -4, scale: 0.95 } : { y: [-5, 5, -5], rotate: [-0.5, 0.5, -0.5] }}
          transition={isLifted ? { type: 'spring', stiffness: 220, damping: 20 } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden p-1 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            <img
              src={clocheImg}
              alt="24K Imperial Gold Cloche Haute Cuisine"
              className="w-full h-full object-cover rounded-full filter drop-shadow-[0_20px_40px_rgba(212,175,55,0.45)] brightness-105 contrast-110"
            />
            
            {/* Mirror-Polished 24K Specular Sheen Sweep Animation */}
            <motion.div
              animate={{ x: ['-120%', '140%'] }}
              transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-yellow-100/35 to-transparent skew-x-[-25deg] pointer-events-none"
            />

            {/* Subtle Gold Outer Ring Frame */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 pointer-events-none shadow-[inset_0_0_20px_rgba(245,158,11,0.3)]" />
          </div>

          {/* Interactive Tap Prompt Badge */}
          <div className="absolute bottom-6 bg-stone-950/90 backdrop-blur-md border border-amber-400/60 px-3 py-1 rounded-full text-[10px] text-amber-200 font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl group-hover:scale-105 transition-transform">
            <Utensils className="w-3 h-3 text-amber-400" />
            <span>{isLifted ? 'ট্যাপ করে ঢাকনা লাগান' : 'ঢাকনা তুলুন (Reveal Haute Cuisine)'}</span>
          </div>
        </motion.div>

        {/* 5. Floating Glassmorphism VIP Badges */}
        <motion.div
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 -left-2 sm:-left-4 z-30 px-3.5 py-1.5 rounded-xl bg-stone-950/95 backdrop-blur-md border border-amber-400/60 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-2"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center text-stone-950 font-black text-[10px] shadow">
            <Crown className="w-3.5 h-3.5 text-stone-950" />
          </div>
          <div>
            <span className="text-[8px] font-mono tracking-widest text-amber-300 uppercase block font-semibold">ORIVELLE LUXE</span>
            <span className="text-[10px] font-bold text-white tracking-wide">3-Star Michelin Reserve</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ x: [4, -4, 4] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 -right-2 sm:-right-4 z-30 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-stone-950/90 backdrop-blur-md border border-amber-300/50 text-amber-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Pure 24K Gold Cloche</span>
        </motion.div>
      </div>
    </div>
  );
};

export default OrivelleGoldClocheVisual;
