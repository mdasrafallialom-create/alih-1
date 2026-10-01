import React, { useState } from 'react';
import { motion } from 'motion/react';

interface DeconstructedBurgerGapsProps {
  accentColor?: string;
  cupName?: string;
}

export const DeconstructedBurgerGaps: React.FC<DeconstructedBurgerGapsProps> = ({
  accentColor = '#f59e0b',
  cupName = 'DOUBLE FLAME-GRILLED WAGYU CHEESEBURGER'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Spacing values to create distinct visual gaps (deconstructed state)
  const baseSpacing = {
    topBun: -130,
    baconOnions: -75,
    cheese: -30,
    patty: 15,
    lettuceTomato: 65,
    bottomBun: 110,
    plate: 155,
  };

  const hoverSpacing = {
    topBun: -180,
    baconOnions: -110,
    cheese: -50,
    patty: 15,
    lettuceTomato: 80,
    bottomBun: 140,
    plate: 175,
  };

  const getSpacing = (layer: keyof typeof baseSpacing) => {
    return isHovered ? hoverSpacing[layer] : baseSpacing[layer];
  };

  return (
    <div 
      className="relative w-full max-w-[500px] aspect-square flex flex-col items-center justify-center select-none no-print overflow-hidden mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      {/* 3D Container Area for floating layers */}
      <div className="relative w-full h-[440px] flex items-center justify-center">
        
        {/* LAYER 1: TOP SESAME BRIOCHE BUN */}
        <motion.div
          animate={{ y: getSpacing('topBun'), scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-50 w-56 h-28 cursor-pointer filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.65)]"
        >
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <defs>
              <linearGradient id="briocheGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e3914c" />
                <stop offset="45%" stopColor="#c26c27" />
                <stop offset="90%" stopColor="#87410c" />
                <stop offset="100%" stopColor="#632e06" />
              </linearGradient>
              <linearGradient id="bunGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </linearGradient>
            </defs>
            <path 
              d="M10,80 C10,35 45,15 100,15 C155,15 190,35 190,80 C190,86 182,90 170,90 L30,90 C18,90 10,86 10,80 Z" 
              fill="url(#briocheGrad)" 
            />
            <path 
              d="M25,65 C25,40 50,22 100,22 C140,22 170,35 175,55 C160,35 125,26 100,26 C55,26 30,45 25,65 Z" 
              fill="url(#bunGlint)" 
            />
            <g fill="#fffaeb" opacity="0.9">
              <ellipse cx="65" cy="40" rx="3" ry="1.5" transform="rotate(-15 65 40)" />
              <ellipse cx="85" cy="32" rx="3" ry="1.5" transform="rotate(10 85 32)" />
              <ellipse cx="110" cy="30" rx="3" ry="1.5" transform="rotate(-5 110 30)" />
              <ellipse cx="135" cy="38" rx="3" ry="1.5" transform="rotate(25 135 38)" />
              <ellipse cx="50" cy="55" rx="3" ry="1.5" transform="rotate(-30 50 55)" />
              <ellipse cx="98" cy="48" rx="3" ry="1.5" transform="rotate(15 98 48)" />
              <ellipse cx="120" cy="50" rx="3" ry="1.5" transform="rotate(-10 120 50)" />
              <ellipse cx="155" cy="52" rx="3" ry="1.5" transform="rotate(35 155 52)" />
              <ellipse cx="80" cy="58" rx="3" ry="1.5" transform="rotate(-20 80 58)" />
              <ellipse cx="140" cy="62" rx="3" ry="1.5" transform="rotate(5 140 62)" />
              <ellipse cx="110" cy="64" rx="3" ry="1.5" transform="rotate(-15 110 64)" />
            </g>
          </svg>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-amber-200/55 uppercase font-bold">
            Brioche Bun Top
          </div>
        </motion.div>

        {/* LAYER 2: CRISPY SMOKED BACON & CARAMELIZED ONIONS */}
        <motion.div
          animate={{ y: getSpacing('baconOnions'), scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-40 w-[240px] h-16 cursor-pointer filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.6)]"
        >
          <svg viewBox="0 0 220 70" className="w-full h-full">
            <defs>
              <linearGradient id="baconGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5c1515" />
                <stop offset="25%" stopColor="#942b2b" />
                <stop offset="40%" stopColor="#e07272" />
                <stop offset="55%" stopColor="#942b2b" />
                <stop offset="80%" stopColor="#5c1515" />
                <stop offset="100%" stopColor="#3d0b0b" />
              </linearGradient>
              <linearGradient id="onionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7a552b" />
                <stop offset="100%" stopColor="#452a0e" />
              </linearGradient>
            </defs>
            <path 
              d="M15,40 Q30,20 45,40 T75,40 T105,40 T135,35" 
              fill="none" 
              stroke="url(#baconGrad)" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
            <path 
              d="M85,45 Q105,25 125,45 T165,45 T205,40" 
              fill="none" 
              stroke="url(#baconGrad)" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
            <path 
              d="M50,25 Q70,12 90,25 Q110,38 90,50 Q70,38 50,25 Z" 
              fill="none" 
              stroke="url(#onionGrad)" 
              strokeWidth="6" 
              opacity="0.85" 
            />
          </svg>
          <div className="absolute -top-1 left-12 text-[9px] font-mono tracking-widest text-red-300/65 uppercase font-bold">
            Smoked Bacon & Onions
          </div>
        </motion.div>

        {/* LAYER 3: MELTED GOLDEN CHEDDAR CHEESE */}
        <motion.div
          animate={{ y: getSpacing('cheese'), scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-30 w-[245px] h-16 cursor-pointer filter drop-shadow-[0_10px_12px_rgba(0,0,0,0.55)]"
        >
          <svg viewBox="0 0 220 60" className="w-full h-full">
            <defs>
              <linearGradient id="cheddarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffd23f" />
                <stop offset="60%" stopColor="#ff9f1c" />
                <stop offset="100%" stopColor="#e05e00" />
              </linearGradient>
            </defs>
            <path 
              d="M10,15 L210,15 C210,15 205,32 195,35 C185,38 180,25 170,25 C160,25 155,48 145,50 C135,52 130,30 115,30 C100,30 95,55 80,55 C65,55 60,35 45,35 C30,35 25,48 15,42 C8,38 10,15 10,15 Z" 
              fill="url(#cheddarGrad)" 
            />
            <circle cx="80" cy="55" r="3.5" fill="#e05e00" />
            <circle cx="145" cy="50" r="3" fill="#e05e00" />
          </svg>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-amber-200/65 uppercase font-bold">
            Melted Cheddar
          </div>
        </motion.div>

        {/* LAYER 4: THICK FLAME-GRILLED WAGYU BEEF PATTY */}
        <motion.div
          animate={{ y: getSpacing('patty'), scale: isHovered ? 1.06 : 1.01 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-20 w-[255px] h-28 cursor-pointer filter drop-shadow-[0_16px_25px_rgba(0,0,0,0.8)]"
        >
          <svg viewBox="0 0 220 100" className="w-full h-full">
            <defs>
              <linearGradient id="beefGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#523023" />
                <stop offset="20%" stopColor="#3d2116" />
                <stop offset="50%" stopColor="#2b140c" />
                <stop offset="100%" stopColor="#170904" />
              </linearGradient>
              <radialGradient id="pattyJuice" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <path 
              d="M15,50 C15,35 40,25 110,25 C180,25 205,35 205,50 C205,65 180,82 110,82 C40,82 15,65 15,50 Z" 
              fill="url(#beefGrad)" 
            />
            <path 
              d="M30,45 C30,35 50,30 110,30 C170,30 190,35 190,45 C190,50 170,55 110,55 C50,55 30,50 30,45 Z" 
              fill="url(#pattyJuice)" 
            />
            <g stroke="#120603" strokeWidth="3" strokeLinecap="round" opacity="0.85">
              <line x1="50" y1="35" x2="70" y2="65" />
              <line x1="85" y1="32" x2="105" y2="68" />
              <line x1="120" y1="32" x2="140" y2="68" />
              <line x1="155" y1="35" x2="175" y2="65" />
            </g>
          </svg>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-amber-500 font-black uppercase text-center drop-shadow-md">
            Wagyu Beef Patty
          </div>
        </motion.div>

        {/* LAYER 5: FRESH LETTUCE & RIPE SLICED TOMATO */}
        <motion.div
          animate={{ y: getSpacing('lettuceTomato'), scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-15 w-[250px] h-16 cursor-pointer filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.65)]"
        >
          <svg viewBox="0 0 220 70" className="w-full h-full">
            <defs>
              <linearGradient id="lettuceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4bb543" />
                <stop offset="100%" stopColor="#1f601a" />
              </linearGradient>
              <linearGradient id="tomatoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#cc1111" />
              </linearGradient>
            </defs>
            <path 
              d="M15,45 C5,40 10,25 25,30 C35,15 50,20 65,25 C80,10 100,15 115,22 C130,8 150,12 165,20 C180,10 195,18 205,30 C215,40 210,50 195,48 C185,55 165,50 155,55 C145,62 125,58 110,60 C95,58 75,62 65,55 C55,50 35,52 25,48 C15,50 10,45 15,45 Z" 
              fill="url(#lettuceGrad)" 
            />
            <ellipse cx="65" cy="42" rx="40" ry="17" fill="url(#tomatoGrad)" stroke="#b30000" strokeWidth="2" />
            <ellipse cx="65" cy="42" rx="32" ry="12" fill="#ff6666" opacity="0.4" />
            <ellipse cx="145" cy="45" rx="40" ry="17" fill="url(#tomatoGrad)" stroke="#b30000" strokeWidth="2" />
            <ellipse cx="145" cy="45" rx="32" ry="12" fill="#ff6666" opacity="0.4" />
          </svg>
          <div className="absolute top-3 left-20 text-[9px] font-mono tracking-widest text-green-200/65 uppercase font-bold">
            Lettuce & Tomato
          </div>
        </motion.div>

        {/* LAYER 6: BOTTOM TOASTED BRIOCHE BUN */}
        <motion.div
          animate={{ y: getSpacing('bottomBun'), scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-10 w-56 h-20 cursor-pointer filter drop-shadow-[0_15px_18px_rgba(0,0,0,0.7)]"
        >
          <svg viewBox="0 0 200 80" className="w-full h-full">
            <defs>
              <linearGradient id="briocheBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5aa6c" />
                <stop offset="25%" stopColor="#c26c27" />
                <stop offset="100%" stopColor="#703205" />
              </linearGradient>
            </defs>
            <path 
              d="M15,25 C15,25 35,15 100,15 C165,15 185,25 185,25 C185,38 170,62 100,62 C30,62 15,38 15,25 Z" 
              fill="url(#briocheBaseGrad)" 
            />
          </svg>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-amber-200/55 uppercase font-bold">
            Brioche Bun Base
          </div>
        </motion.div>

        {/* LAYER 7: POLISHED BLACK SLATE CHARCOAL PLATE */}
        <motion.div
          animate={{ y: getSpacing('plate'), scale: isHovered ? 1.02 : 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute z-5 w-[300px] h-16 pointer-events-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.98)]"
        >
          <svg viewBox="0 0 300 60" className="w-full h-full">
            <defs>
              <linearGradient id="slateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1f1e1d" />
                <stop offset="40%" stopColor="#141312" />
                <stop offset="100%" stopColor="#080707" />
              </linearGradient>
              <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a723e" />
                <stop offset="50%" stopColor="#f5ca7d" />
                <stop offset="100%" stopColor="#9a723e" />
              </linearGradient>
            </defs>
            <ellipse cx="150" cy="30" rx="142" ry="24" fill="#000000" opacity="0.6" />
            <ellipse cx="150" cy="27" rx="140" ry="22" fill="url(#slateGrad)" />
            <ellipse cx="150" cy="27" rx="140" ry="22" fill="none" stroke="url(#goldRim)" strokeWidth="2.5" opacity="0.85" />
          </svg>
        </motion.div>
        
      </div>

      {/* Floating Description Panel below the plate */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[85%] z-20 pointer-events-none text-center">
        <div className="bg-stone-950/95 border border-orange-500/40 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.95)] flex items-center justify-center gap-2">
          <span className="text-[10px] sm:text-xs uppercase font-black text-amber-400 font-sans tracking-[0.15em] leading-snug">
            {cupName}
          </span>
        </div>
      </div>
    </div>
  );
};
