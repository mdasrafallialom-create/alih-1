import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, ChefHat } from 'lucide-react';
import chefClosedImg from '../../assets/images/chef_person_closed_cloche_1790604062826.jpg';
import chefOpenImg from '../../assets/images/chef_person_open_cloche_1790604089081.jpg';

interface OrivelleGoldClocheVisualProps {
  accentColor?: string;
  customImg?: string;
  itemName?: string;
}

export const OrivelleGoldClocheVisual: React.FC<OrivelleGoldClocheVisualProps> = ({
  accentColor = '#e5c158',
  customImg,
  itemName = 'Miyazaki A5 Wagyu & Black Truffle'
}) => {
  const [isLifted, setIsLifted] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsLifted(true)}
      onMouseLeave={() => setIsLifted(false)}
      onClick={() => setIsLifted(!isLifted)}
      /* STABLE FIXED BOUNDING CONTAINER - 100% SEAMLESS BACKGROUND BLEND */
      className="relative w-full max-w-[560px] aspect-square flex flex-col items-center justify-center select-none cursor-pointer overflow-visible"
    >
      {/* 
        NO BOX / NO BORDER / SEAMLESS BACKGROUND BLEND:
        Uses a radial vignette mask so the chef photo blends 100% seamlessly 
        into the dark luxury restaurant background without any visible box outline or border.
      */}
      <div 
        className="relative w-full h-full overflow-hidden pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 98%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 98%)'
        }}
      >
        {/* 1. PHOTOREALISTIC CHEF HOLDING PLATTER WITH CLOSED GOLD CLOCHE */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img 
            src={customImg ? customImg : chefClosedImg} 
            alt="Chef Marcus Croft holding closed gold cloche" 
            className={`w-full h-full object-cover filter brightness-105 contrast-[1.08] transition-opacity duration-600 ease-in-out ${
              isLifted ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
            }`}
          />
        </div>

        {/* 2. PHOTOREALISTIC CHEF LIFTING GOLD CLOCHE UP REVEALING DISH */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
          <img 
            src={chefOpenImg} 
            alt={itemName}
            className={`w-full h-full object-cover filter brightness-110 contrast-110 transition-all duration-700 ease-out ${
              isLifted ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        </div>

        {/* 3. DYNAMIC GOLDEN LIGHT GLOW BURST WHEN OPENED */}
        <div 
          className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-700 bg-radial from-amber-400/25 via-yellow-500/10 to-transparent ${
            isLifted ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* 4. FLOATING 24K GOLD LEAF PARTICLES */}
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={`gold-flake-${i}`}
            animate={isLifted ? {
              y: [40, -110, -220],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              rotate: [0, i * 60, i * 120],
              opacity: [0, 0.85, 0],
              scale: [0.4, i % 2 === 0 ? 1.3 : 0.7, 0.3]
            } : { opacity: 0 }}
            transition={{
              duration: 4.2 + (i % 3) * 1.1,
              repeat: Infinity,
              delay: i * 0.45,
              ease: 'easeInOut'
            }}
            style={{
              left: `${12 + (i * 9.5)}%`,
              bottom: '18%'
            }}
            className="absolute pointer-events-none z-30"
          >
            <div className="w-2.5 h-2.5 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 rounded-sm transform rotate-45 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
          </motion.div>
        ))}

        {/* 5. AROMATIC WARM STEAM PLUMES RISING WHEN OPENED */}
        <AnimatePresence>
          {isLifted && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`wagyu-steam-${i}`}
                  initial={{ opacity: 0, y: 50, scale: 0.7 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: [20, -70, -140],
                    scale: [0.7, 1.5, 2.1],
                    x: [0, i % 2 === 0 ? 20 : -20, i % 2 === 0 ? -12 : 12]
                  }}
                  transition={{
                    duration: 2.6 + i * 0.35,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut'
                  }}
                  style={{
                    left: `${32 + i * 8}%`,
                    bottom: '28%'
                  }}
                  className="absolute w-14 h-32 bg-gradient-to-t from-amber-100/25 via-yellow-200/15 to-transparent rounded-full blur-2xl"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* 6. LUXURY HOVER BADGE / ITEM LABEL */}
        <div className="absolute bottom-4 z-40 pointer-events-none px-4 w-full flex justify-center">
          <AnimatePresence mode="wait">
            {!isLifted ? (
              <motion.div
                key="closed-badge"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-stone-950/85 border border-amber-500/50 backdrop-blur-md px-5 py-2 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-2.5"
              >
                <ChefHat className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="text-xs uppercase font-semibold tracking-widest text-amber-200 font-serif">
                  HOVER CHEF TO LIFT CLOCHE
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="open-badge"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="bg-stone-950/90 border border-amber-400/60 backdrop-blur-md px-6 py-2.5 rounded-2xl text-center shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center gap-2.5"
              >
                <Utensils className="w-4 h-4 text-amber-300" />
                <span className="text-xs uppercase font-bold tracking-widest text-amber-200 font-serif">
                  {itemName}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OrivelleGoldClocheVisual;
