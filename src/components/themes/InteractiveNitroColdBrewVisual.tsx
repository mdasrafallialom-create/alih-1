import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Coffee, Zap, ShieldCheck, Thermometer, Droplet } from 'lucide-react';
import opaluneNitroColdBrewImg from '../../assets/images/opalune_nitro_cold_brew_1791021529686.jpg';

interface InteractiveNitroColdBrewVisualProps {
  accentColor?: string;
  cupName?: string;
  customImg?: string;
}

const seamlessMaskStyle: React.CSSProperties = {
  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0) 95%)',
  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0) 95%)'
};

export const InteractiveNitroColdBrewVisual: React.FC<InteractiveNitroColdBrewVisualProps> = ({
  accentColor = '#0d9488',
  cupName = 'Artisanal Nitro Cold Brew Atrium',
  customImg
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none cursor-pointer group"
    >
      {/* Cyan/Teal Ambient Halo Glow behind Glass */}
      <div className="absolute inset-0 rounded-full blur-3xl bg-teal-500/25 pointer-events-none scale-125 animate-pulse" />
      <div className="absolute inset-0 rounded-full blur-2xl bg-cyan-500/15 pointer-events-none scale-110" />

      {/* Decorative Rotating Precision Ring */}
      <div className="absolute w-[82%] h-[82%] rounded-full border border-teal-400/20 pointer-events-none z-0 animate-spin-slow" style={{ animationDuration: '40s' }} />
      <div className="absolute w-[88%] h-[88%] rounded-full border border-cyan-300/10 pointer-events-none z-0" />

      {/* 100% Circular Organic Vignette Masked Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center pointer-events-none select-none z-10"
        style={seamlessMaskStyle}
      >
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-0.8, 0.8, -0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src={customImg || opaluneNitroColdBrewImg}
            alt={cupName}
            className={`w-full h-full object-cover filter brightness-[1.10] contrast-[1.15] transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />

          {/* Animated Rising Nitrogen Micro-Bubbles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 120, x: (i % 3) * 20 - 20 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [-20, -140],
                  x: [(i % 3) * 20 - 20, (i % 3) * 20 - 10 + (i % 2) * 15]
                }}
                transition={{
                  duration: 2.8 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: 'easeOut'
                }}
                className="absolute bottom-12 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan-200/60 blur-[0.5px]"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Top-Left Telemetry Tag */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-950/85 border border-teal-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-2 text-[10px] font-mono text-teal-300"
        >
          <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
          <span>-2°C NITRO TAP</span>
        </motion.div>
      </div>

      {/* Floating Top-Right Pressure Badge */}
      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-950/85 border border-cyan-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-2 text-[10px] font-mono text-cyan-300"
        >
          <Zap className="w-3.5 h-3.5 text-teal-400" />
          <span>45 PSI N₂ INJECTION</span>
        </motion.div>
      </div>

      {/* Floating Bottom Center Glassmorphic Badge */}
      <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="default-nitro-badge"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-slate-950/90 border border-teal-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(13,148,136,0.4)] flex items-center gap-2.5"
            >
              <Coffee className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-100 font-sans">
                {cupName}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="hover-nitro-badge"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="bg-slate-950/95 border border-cyan-400/70 backdrop-blur-md px-6 py-2.5 rounded-full text-center shadow-[0_15px_35px_rgba(13,148,136,0.6)] flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-200 font-sans">
                18-HR KYOTO SLOW EXTRACTION · SINGLE-ORIGIN
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveNitroColdBrewVisual;
