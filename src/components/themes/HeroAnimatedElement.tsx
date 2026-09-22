import React from 'react';
import { motion } from 'motion/react';
import { CoffeeBeanSculptedVisual } from './CoffeeBeanSculptedVisual';
import whiteCupSideImg from '../../assets/images/white_cup_side_isolated.png';
import whiteCoffeeCupImg from '../../assets/images/white_coffee_cup_isolated_trimmed.png';
import whiteCappuccinoCupImg from '../../assets/images/white_cappuccino_isolated.png';

interface HeroAnimatedElementProps {
  themeId?: string;
  accentColor?: string;
  cupImg?: string;
  cupName?: string;
}

export const HeroAnimatedElement: React.FC<HeroAnimatedElementProps> = ({
  themeId = 'velmora-dining',
  accentColor = '#c89666',
  cupImg,
  cupName
}) => {
  const normId = (themeId || '').toLowerCase().trim();

  // Theme #01: Velmora Dining -> Artisanal Coffee Cup Sculpted from Coffee Beans with Falling Beans
  if (normId === 'velmora-dining') {
    return <CoffeeBeanSculptedVisual accentColor={accentColor} />;
  }

  // Theme #02: Orivelle House (24k Gold Cloche & Crystal Shimmer)
  if (normId === 'orivelle-house') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/25 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Orivelle Gold Cloche & Cup"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(229,193,88,0.45)]"
          />
          {/* Floating Gold Sparkle Particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [10, -50, -90],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.4],
                x: [0, (i % 2 === 0 ? 15 : -15)]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.45,
                ease: "easeOut"
              }}
              style={{ left: `${30 + i * 12}%`, bottom: '25%' }}
              className="absolute w-2.5 h-2.5 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_8px_#fde047]"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Theme #03: Lunavere (Parisian Starlight Latte & Nebula Glow)
  if (normId === 'lunavere') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-purple-600/25 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [0.5, -0.5, 0.5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCappuccinoCupImg}
            alt={cupName || "Lunavere Starlight Latte"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(154,123,181,0.5)]"
          />
          {/* Gentle Starlight Dust */}
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 w-36 h-28 bg-gradient-to-t from-purple-300/30 via-indigo-200/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #04: Aurelisse (Imperial Monarch Goblet & Royal Aura)
  if (normId === 'aurelisse') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-purple-700/30 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-7, 7, -7], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCupSideImg}
            alt={cupName || "Aurelisse Imperial Goblet"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(168,85,247,0.55)]"
          />
          <motion.div
            animate={{ y: [-4, -30, -4], opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-32 h-24 bg-gradient-to-t from-amber-400/30 via-purple-400/20 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #07: Emberion (Robata Charcoal & Flame Embers)
  if (normId === 'emberion') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-orange-600/35 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Emberion Charcoal Robata Cup"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(234,88,12,0.6)]"
          />
          {/* Glowing Ember Particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -60, -100],
                opacity: [0, 1, 0],
                scale: [0.8, 1.4, 0.2],
                x: [0, (i % 2 === 0 ? 12 : -18)]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
              style={{ left: `${35 + i * 10}%`, bottom: '30%' }}
              className="absolute w-2 h-2 bg-orange-400 rounded-full blur-[0.5px] shadow-[0_0_10px_#ea580c]"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Theme #06: Opalune (Minimalist Glass & Nitrogen Cold Brew Bubbles)
  if (normId === 'opalune') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-teal-500/25 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCappuccinoCupImg}
            alt={cupName || "Opalune Cold Brew"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(13,148,136,0.45)]"
          />
          {/* Micro Nitrogen Bubbles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, -80],
                opacity: [0, 0.8, 0],
                scale: [0.4, 1, 0.6]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{ left: `${40 + i * 8}%`, bottom: '25%' }}
              className="absolute w-1.5 h-1.5 bg-teal-200 rounded-full blur-[0.5px]"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Theme #08: Couravelle (French Courtyard Garden Cup with Floating Jasmine Petals)
  if (normId === 'couravelle') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/20 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-0.8, 0.8, -0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCupSideImg}
            alt={cupName || "Couravelle Courtyard Cup"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(180,83,9,0.4)]"
          />
          {/* Rising gentle steam */}
          <motion.div
            animate={{ y: [-5, -28, -5], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-32 h-24 bg-gradient-to-t from-amber-100/25 via-white/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #10: Caravelle Dining (Celestial Sapphire Midnight Skyline)
  if (normId === 'caravelle-dining') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-sky-500/30 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-7, 7, -7] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Caravelle Skyline Cup"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(56,189,248,0.55)]"
          />
          {/* Twinkling cyan starlight dust */}
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 w-36 h-28 bg-gradient-to-t from-sky-300/30 via-sky-100/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #11: Elvaris Espresso Roastery (Dark Roast Beans & Roaster Fire Ember Smoke)
  if (normId === 'elvaris-atelier') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-700/30 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Elvaris Dark Roast Espresso"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_22px_45px_rgba(245,158,11,0.5)]"
          />
          {/* Roastery Aromatic Steam Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-6 border border-dashed border-amber-500/30 rounded-full pointer-events-none"
          />
          {/* Floating Dark Roast Coffee Bean Particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -45, -75],
                opacity: [0, 0.9, 0],
                rotate: [0, 90, 180],
                scale: [0.6, 1, 0.7]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeInOut'
              }}
              style={{ left: `${32 + i * 14}%`, bottom: '26%' }}
              className="absolute w-3 h-2 bg-[#2c1407] rounded-full border border-amber-600/60 shadow-[0_0_8px_rgba(217,119,6,0.5)]"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Theme #12: Silvarenne Titanium Cafe (High-Tech Titanium Precision & Silver Halo)
  if (normId === 'silvarenne') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-zinc-400/20 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Silvarenne Titanium Specialty Cup"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(255,255,255,0.4)]"
          />
          {/* Titanium Orbiting Micro Extraction Ring */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-10 border border-zinc-300/40 rounded-full pointer-events-none"
          />
          <motion.div
            animate={{ y: [-4, -30, -4], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-32 h-20 bg-gradient-to-t from-zinc-200/30 via-white/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #16: Zafrelle Hand-Grinder Cafe (Vintage Brass Gear & Ground Coffee Bloom)
  if (normId === 'zafrelle') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-600/25 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCupSideImg}
            alt={cupName || "Zafrelle Hand Grinder Coffee"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_22px_45px_rgba(251,191,36,0.45)]"
          />
          {/* Brass Gear Halo Glow */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-8 rounded-full border border-dashed border-amber-400/40 pointer-events-none"
          />
          {/* Golden Aromatic Bloom Sparks */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, -70],
                opacity: [0, 0.85, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeOut'
              }}
              style={{ left: `${36 + i * 14}%`, bottom: '30%' }}
              className="absolute w-2 h-2 bg-amber-300 rounded-full blur-[0.5px] shadow-[0_0_8px_#fbbf24]"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Theme #21: Marovelle Stovetop Moka (Italian Moka Crema Rise & Rich Velvet Steam)
  if (normId === 'marovelle') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-orange-700/25 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-7, 7, -7] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Marovelle Moka Crema"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_24px_45px_rgba(251,146,60,0.5)]"
          />
          {/* Dense Warm Moka Crema Plume */}
          <motion.div
            animate={{ y: [-6, -32, -6], opacity: [0.2, 0.75, 0.2], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 w-36 h-28 bg-gradient-to-t from-orange-400/30 via-amber-200/15 to-transparent blur-2xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #30: Degustara Chemex Alchemy (Hand-blown Chemex Pour-Over Dripping Alchemy)
  if (normId === 'degustara') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-600/30 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-0.6, 0.6, -0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCappuccinoCupImg}
            alt={cupName || "Degustara Chemex Pour-Over"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_22px_45px_rgba(234,88,12,0.55)]"
          />
          {/* Chemex Drip Droplet */}
          <motion.div
            animate={{
              y: [-10, 35, 70],
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.4]
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeIn' }}
            className="absolute top-12 left-1/2 -translate-x-1/2 w-2.5 h-3.5 bg-amber-600 rounded-full blur-[0.5px] shadow-[0_0_6px_#ea580c]"
          />
          {/* Soft amber vapor */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.95, 1.1, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-32 h-24 bg-gradient-to-t from-orange-400/25 via-amber-200/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #33: Figavelle Turkish Sand Cafe (Golden Hot Sand & Copper Cezve Cardamom Froth)
  if (normId === 'figavelle') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/30 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Figavelle Turkish Cezve Coffee"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_24px_45px_rgba(217,119,6,0.6)]"
          />
          {/* Hot Sand Shimmer Bed */}
          <motion.div
            animate={{ scaleX: [0.95, 1.05, 0.95], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-2 w-48 h-6 bg-gradient-to-r from-transparent via-amber-400/35 to-transparent blur-md pointer-events-none"
          />
          {/* Cardamom Froth Rising Vapor */}
          <motion.div
            animate={{ y: [-5, -28, -5], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-32 h-24 bg-gradient-to-t from-amber-300/30 via-orange-200/15 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #39: Lumivelle Barista Lounge (Barista Latte Art Microfoam & Morning Pastry Warmth)
  if (normId === 'lumivelle') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-600/25 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-0.8, 0.8, -0.8] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCappuccinoCupImg}
            alt={cupName || "Lumivelle Barista Latte"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_22px_45px_rgba(249,115,22,0.5)]"
          />
          {/* Barista Micro-Foam Swirl Steam */}
          <motion.div
            animate={{ y: [-6, -26, -6], opacity: [0.2, 0.65, 0.2], rotate: [-5, 5, -5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-36 h-26 bg-gradient-to-t from-amber-200/30 via-white/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Theme #40: Amberelle Sunset Cafe (Caramel Macchiato Drizzle & Sunset Acoustic Radiance)
  if (normId === 'amberelle') {
    return (
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full blur-3xl bg-lime-600/20 pointer-events-none scale-110" />
        <motion.div
          animate={{ y: [-7, 7, -7], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
        >
          <img
            src={cupImg || whiteCoffeeCupImg}
            alt={cupName || "Amberelle Caramel Macchiato"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(163,230,53,0.4)]"
          />
          {/* Caramel Sunset Glow */}
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 w-36 h-26 bg-gradient-to-t from-amber-300/30 via-lime-200/10 to-transparent blur-xl pointer-events-none"
          />
        </motion.div>
      </div>
    );
  }

  // Default Standard Floating Coffee Cup with gentle hovering steam
  return (
    <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-35 pointer-events-none scale-110" 
        style={{ backgroundColor: accentColor }}
      />
      <motion.div
        animate={{ y: [-7, 7, -7], rotate: [-1, 1, -1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 sm:w-84 aspect-square flex items-center justify-center"
      >
        <img
          src={cupImg || whiteCoffeeCupImg}
          alt={cupName || "Artisan Coffee Cup"}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
        />
        {/* Rising steam */}
        <motion.div
          animate={{ y: [-6, -26, -6], opacity: [0.15, 0.65, 0.15], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 w-36 h-28 bg-gradient-to-t from-white/30 via-white/10 to-transparent blur-2xl pointer-events-none"
        />
      </motion.div>
    </div>
  );
};
