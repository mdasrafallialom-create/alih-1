import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pizza, Sparkles, Flame } from 'lucide-react';
import roundArtisanPizzaImg from '../../assets/images/round_artisan_pizza_1790689153501.jpg';

interface InteractivePizzaVisualProps {
  accentColor?: string;
  cupName?: string;
  customImg?: string;
}

export const InteractivePizzaVisual: React.FC<InteractivePizzaVisualProps> = ({
  accentColor = '#f59e0b',
  cupName,
  customImg
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sliceCount, setSliceCount] = useState(1);

  const pizzaImgSrc = customImg || roundArtisanPizzaImg;

  // Geometry: 1000x1000 coordinate system
  // Center at (500, 500), radius R = 455 (strictly encompasses only the round pizza crust, clipping all square dark borders away)
  // Slice angle: from -65 deg to -10 deg (a classic 55-degree slice in top-right sector)
  // Point 1 (-65 deg): (692.3, 87.6)
  // Point 2 (-10 deg): (948.1, 421.0)
  const slicePath = "M 500 500 L 692.3 87.6 A 455 455 0 0 1 948.1 421.0 Z";
  const bodyPath = "M 500 500 L 948.1 421.0 A 455 455 0 1 1 692.3 87.6 Z";

  return (
    <div 
      className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(prev => !prev)}
      role="button"
      tabIndex={0}
      aria-label="Interactive Wood-Fired Pizza - Hover to lift a slice"
    >
      {/* 1. Soft Circular Ambient Halo Behind Pizza - Zero Square Boundaries */}
      <div 
        className="absolute inset-4 rounded-full pointer-events-none blur-3xl transition-opacity duration-700"
        style={{
          background: isHovered 
            ? 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(220,38,38,0.2) 50%, transparent 75%)' 
            : 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(180,83,9,0.12) 50%, transparent 70%)'
        }}
      />

      {/* 2. Floating Gentle Hover Motion Container */}
      <motion.div
        animate={isHovered ? { y: -4 } : { y: [-6, 6, -6], rotate: [0, 0.8, 0, -0.8, 0] }}
        transition={isHovered ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full flex items-center justify-center cursor-pointer"
      >
        <svg 
          viewBox="0 0 1000 1000" 
          className="w-full h-full overflow-visible drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
        >
          <defs>
            {/* Main Pizza Body Clip Path (Whole circle minus the lifted slice) */}
            <clipPath id="pizza-body-clip">
              <path d={bodyPath} />
            </clipPath>

            {/* Lifted Slice Clip Path (The single 55-degree slice) */}
            <clipPath id="pizza-slice-clip">
              <path d={slicePath} />
            </clipPath>

            {/* Whole Pizza Circle Clip (to guarantee zero corners outside the round crust) */}
            <clipPath id="pizza-full-circle-clip">
              <circle cx="500" cy="500" r="455" />
            </clipPath>

            {/* Rustic Charred Pizza Peel / Stone Gradient in Cut Void */}
            <radialGradient id="peel-void-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#140c06" />
              <stop offset="60%" stopColor="#0d0703" />
              <stop offset="100%" stopColor="#050302" />
            </radialGradient>

            {/* Melted Cheese Glow Filter for Dynamic Shadow */}
            <filter id="slice-lift-shadow" x="-30%" y="-30%" width="170%" height="170%">
              <feDropShadow dx="-18" dy="24" stdDeviation="16" floodColor="#000000" floodOpacity="0.9" />
              <feDropShadow dx="-6" dy="10" stdDeviation="8" floodColor="#1a0902" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* LAYER A: Pizza Stone / Peel Base Underneath (Visible inside the empty cut slot) */}
          <circle cx="500" cy="500" r="456" fill="url(#peel-void-gradient)" />
          
          {/* Subtle char marks and herb crumbs on the stone beneath where the slice lifted */}
          <AnimatePresence>
            {isHovered && (
              <g className="transition-opacity duration-300">
                <path 
                  d={slicePath} 
                  fill="#0f0804" 
                  stroke="rgba(217,119,6,0.3)" 
                  strokeWidth="2" 
                />
                {/* Crumb and melted oil residue */}
                <circle cx="540" cy="460" r="6" fill="#ca8a04" opacity="0.7" />
                <circle cx="590" cy="410" r="4" fill="#ea580c" opacity="0.6" />
                <circle cx="670" cy="340" r="5" fill="#ca8a04" opacity="0.5" />
                <circle cx="730" cy="270" r="8" fill="#1c1917" opacity="0.8" />
                <circle cx="620" cy="480" r="3" fill="#15803d" opacity="0.7" />
                <circle cx="780" cy="380" r="4.5" fill="#f59e0b" opacity="0.5" />
                <path d="M 520 480 Q 560 450 600 440" stroke="#f59e0b" strokeWidth="2.5" fill="none" opacity="0.4" strokeDasharray="3 3" />
              </g>
            )}
          </AnimatePresence>

          {/* LAYER B: Main Pizza Body (The remaining 305 degrees of the pizza, stays anchored) */}
          <g clipPath="url(#pizza-body-clip)">
            <image 
              href={pizzaImgSrc} 
              x="0" 
              y="0" 
              width="1000" 
              height="1000" 
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          {/* LAYER C: Melted Mozzarella Cheese Pull Strings (Stretch from pizza base to slice tip as it lifts) */}
          <AnimatePresence>
            {isHovered && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Stretchy string 1: Tip stretch */}
                <motion.path
                  initial={{ d: "M 500 500 Q 500 500 500 500" }}
                  animate={{ d: "M 500 500 Q 530 460 565 440" }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  stroke="#fef08a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
                />
                <motion.path
                  initial={{ d: "M 505 495 Q 515 480 520 470" }}
                  animate={{ d: "M 505 495 Q 545 440 575 425" }}
                  transition={{ type: "spring", stiffness: 180, damping: 17, delay: 0.02 }}
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Stretchy string 2: Lower edge stretch */}
                <motion.path
                  initial={{ d: "M 650 470 Q 650 470 650 470" }}
                  animate={{ d: "M 650 470 Q 690 440 725 410" }}
                  transition={{ type: "spring", stiffness: 220, damping: 19, delay: 0.04 }}
                  stroke="#fef9c3"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Stretchy string 3: Upper edge stretch */}
                <motion.path
                  initial={{ d: "M 560 320 Q 560 320 560 320" }}
                  animate={{ d: "M 560 320 Q 590 280 625 260" }}
                  transition={{ type: "spring", stiffness: 210, damping: 18, delay: 0.03 }}
                  stroke="#fde047"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Hot savory steam wisps rising from the freshly pulled slice */}
                <motion.circle 
                  cx="570" 
                  cy="430" 
                  r="12" 
                  fill="rgba(255,255,255,0.18)" 
                  animate={{ y: [-5, -35], opacity: [0.6, 0], scale: [0.8, 1.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle 
                  cx="640" 
                  cy="350" 
                  r="15" 
                  fill="rgba(255,255,255,0.14)" 
                  animate={{ y: [-5, -45], opacity: [0.5, 0], scale: [0.9, 2] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* LAYER D: The Lifted Pizza Slice (Slides away / lifts up backward with 3D angle like a hand picking it up) */}
          <motion.g
            animate={isHovered ? {
              x: 72,
              y: -58,
              rotate: 8.5,
              scale: 1.08,
            } : {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
              mass: 0.8
            }}
            style={{
              transformOrigin: "780px 250px", // Pivot near outer crust edge, tilting backward
              filter: isHovered ? "url(#slice-lift-shadow)" : "none"
            }}
          >
            {/* Slice texture clipped strictly to slice geometry */}
            <g clipPath="url(#pizza-slice-clip)">
              <image 
                href={pizzaImgSrc} 
                x="0" 
                y="0" 
                width="1000" 
                height="1000" 
                preserveAspectRatio="xMidYMid slice"
              />
            </g>

            {/* Cut-Edge Highlight & Melted Cheese Rim on Slice Edges when lifted */}
            {isHovered && (
              <g pointerEvents="none">
                {/* Upper edge cut line cheese shine */}
                <line 
                  x1="500" 
                  y1="500" 
                  x2="692.3" 
                  y2="87.6" 
                  stroke="rgba(254, 240, 138, 0.8)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  filter="drop-shadow(0 0 6px rgba(245,158,11,0.8))"
                />
                {/* Lower edge cut line cheese shine */}
                <line 
                  x1="500" 
                  y1="500" 
                  x2="948.1" 
                  y2="421.0" 
                  stroke="rgba(254, 240, 138, 0.8)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  filter="drop-shadow(0 0 6px rgba(245,158,11,0.8))"
                />
              </g>
            )}
          </motion.g>

          {/* Interactive Hit Area in center of pizza to make mouse interaction instant & intuitive */}
          <circle 
            cx="500" 
            cy="500" 
            r="455" 
            fill="transparent" 
            className="cursor-pointer"
          />
        </svg>
      </motion.div>

      {/* 3. Floating Frameless Pill Badge - Ultra Clean with Zero Box */}
      <div className="absolute -bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
        <motion.div 
          animate={isHovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
          className="bg-stone-950/92 border border-amber-500/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2.5"
        >
          <div className="relative">
            <Pizza className={`w-4 h-4 text-amber-400 ${isHovered ? 'animate-bounce' : 'animate-pulse'}`} />
            {isHovered && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            )}
          </div>
          <span className="text-xs sm:text-sm uppercase font-extrabold text-amber-200 font-serif tracking-widest">
            {cupName || "Wood-Fired Neapolitan Artisan Pizza"}
          </span>
          {isHovered ? (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 animate-pulse">
              Freshly Sliced
            </span>
          ) : (
            <span className="hidden sm:inline text-[10px] text-stone-400 italic">
              (Hover to slice)
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
};
