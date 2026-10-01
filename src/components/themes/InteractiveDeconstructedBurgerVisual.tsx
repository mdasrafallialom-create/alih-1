import React, { useState } from 'react';
import { motion } from 'motion/react';
import realAssembledPlateImg from '../../assets/images/real_assembled_wagyu_plate_1790864314074.jpg';

interface InteractiveDeconstructedBurgerVisualProps {
  accentColor?: string;
  cupName?: string;
  customImg?: string;
}

export const InteractiveDeconstructedBurgerVisual: React.FC<InteractiveDeconstructedBurgerVisualProps> = ({
  accentColor = '#f59e0b',
  cupName = 'DOUBLE FLAME-GRILLED WAGYU CHEESEBURGER'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-[560px] aspect-square flex flex-col items-center justify-center select-none no-print">
      {/* Background Ambient Warm Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-75 transition-opacity duration-700 pointer-events-none scale-110"
        style={{
          background: `radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(239, 68, 68, 0.08) 50%, rgba(0, 0, 0, 0) 75%)`
        }}
      />

      {/* Gourmet Fully Assembled Burger Card Container */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(!isHovered)}
        whileHover={{ scale: 1.03, y: -6 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="relative w-[95%] h-[95%] rounded-[2.5rem] overflow-hidden border-2 border-orange-500/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] bg-stone-950 flex items-center justify-center cursor-pointer group"
      >
        {/* Real Assembled Wagyu Burger Photo */}
        <img
          src={realAssembledPlateImg}
          alt="Double Flame-Grilled Wagyu Cheeseburger"
          className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.05] transition-all duration-700 group-hover:brightness-[1.06] group-hover:scale-103"
        />

        {/* Ambient Dark Vignette and Shimmer Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-[2.5rem]" />

        {/* Gold Leaf Corner Filigrees (Luxury Touch) */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-orange-500/30 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-orange-500/30 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-orange-500/30 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-orange-500/30 rounded-br-lg pointer-events-none" />

        {/* ✦ LUXURY FLOATING BADGE (Matches User Screenshot perfectly) ✦ */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-20 pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="bg-stone-950/95 border-2 border-amber-500/60 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] text-center flex items-center justify-center gap-3">
            {/* Custom Mini Burger SVG Icon */}
            <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5,10.5 C19.5,7.5 16.5,5 12,5 C7.5,5 4.5,7.5 4.5,10.5 C4.5,11 5,11.5 5.5,11.5 L18.5,11.5 C19,11.5 19.5,11 19.5,10.5 Z M4,13 C4,13.5 4.5,14 5,14 L19,14 C19.5,14 20,13.5 20,13 C20,12.5 19.5,12 19,12 L5,12 C4.5,12 4,12.5 4,13 Z M5,15.5 C5,17.5 8,19 12,17.5 C16,19 19,17.5 19,15.5 L19,15 L5,15 L5,15.5 Z" />
            </svg>
            <span className="text-[11px] sm:text-xs uppercase font-black text-amber-400 font-sans tracking-[0.12em] leading-snug">
              DOUBLE FLAME-GRILLED WAGYU CHEESEBURGER
            </span>
          </div>
        </div>

        {/* Top-Right Special Stamp */}
        <div className="absolute top-5 right-5 bg-stone-900/90 border border-orange-500/30 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg flex items-center gap-1.5 pointer-events-none transition-transform duration-500 group-hover:scale-105">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-orange-400">
            Aurelisse Reserve
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDeconstructedBurgerVisual;
