import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coffee, ChevronLeft, ChevronRight, Ruler, Flame } from 'lucide-react';
import opaluneCupSplashImg from '../../assets/images/opalune_cup_splash_white_1791024644098.jpg';
import opaluneCupSlide2Img from '../../assets/images/opalune_cup_slide_2_white_1791024658331.jpg';
import opaluneCupSlide3Img from '../../assets/images/opalune_cup_slide_3_white_1791024671243.jpg';

interface InteractiveCoffeeCupSplashVisualProps {
  accentColor?: string;
  cupName?: string;
  customImg?: string;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  slideIndex?: number;
  activeTier?: string;
}

const seamlessMaskStyle: React.CSSProperties = {
  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0) 96%)',
  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0) 96%)'
};

export const InteractiveCoffeeCupSplashVisual: React.FC<InteractiveCoffeeCupSplashVisualProps> = ({
  accentColor = '#6d4c41',
  cupName = 'Brew Pod Premium Blend',
  customImg,
  onNextSlide,
  onPrevSlide,
  slideIndex = 0,
  activeTier
}) => {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isHovered, setIsHovered] = useState(false);

  // Compute scale based on selected cup size
  const sizeScale = selectedSize === 'small' ? 0.88 : selectedSize === 'large' ? 1.12 : 1.0;

  const currentCupImg = customImg || (
    (slideIndex % 3 === 1) ? opaluneCupSlide2Img : 
    (slideIndex % 3 === 2) ? opaluneCupSlide3Img : 
    opaluneCupSplashImg
  );

  // Robustly resolve active plan/tier ($15 -> basic, $39/$19 -> pro, $99 -> elite)
  const getEffectiveTier = () => {
    if (activeTier) {
      const at = activeTier.toLowerCase().trim();
      if (at === 'plan1' || at === 'basic') return 'basic';
      if (at === 'plan2' || at === 'pro') return 'pro';
      if (at === 'plan3' || at === 'elite') return 'elite';
      return at;
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan')?.toLowerCase();
      if (plan === '15' || plan === 'basic' || plan === 'plan1') return 'basic';
      if (plan === '49' || plan === '39' || plan === 'pro' || plan === 'plan2') return 'pro';
      if (plan === '99' || plan === 'elite' || plan === 'plan3') return 'elite';

      try {
        const saved = localStorage.getItem('webar_restaurant_admin_settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.subscriptionPlan) {
            const sp = parsed.subscriptionPlan.toLowerCase().trim();
            if (sp === 'plan1' || sp === 'basic') return 'basic';
            if (sp === 'plan2' || sp === 'pro') return 'pro';
            if (sp === 'plan3' || sp === 'elite') return 'elite';
            return sp;
          }
        }
      } catch (e) {}
    }
    return 'pro'; // default to pro for rich editing
  };

  const tier = getEffectiveTier();

  const renderCups = () => {
    // Basic Plan ($15) -> 1 Cup with beautiful rotation & floating animations
    if (tier === 'basic') {
      return (
        <motion.div
          animate={{ 
            y: isHovered ? [-8, 2, -8] : [-4, 4, -4], 
            rotate: isHovered ? [10, 14, 10] : [11, 13, 11] 
          }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
          style={{ scale: sizeScale }}
          className="relative w-[95%] h-[95%] flex items-center justify-center transition-all duration-300"
        >
          <img
            src={currentCupImg}
            alt={cupName}
            className="w-full h-full object-contain filter brightness-[1.04] contrast-[1.05] drop-shadow-[0_20px_35px_rgba(74,40,16,0.38)]"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>
      );
    }

    // Pro Plan ($19 or $39) -> 3 Cups fanning out elegantly with staggered wave floating animations
    if (tier === 'pro') {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Cup 1: Left Back Cup */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -15, scale: 0.8 }}
            animate={{ 
              opacity: 0.85, 
              x: isHovered ? -70 : -50, 
              y: isHovered ? [-12, 0, -12] : [-6, 6, -6], 
              rotate: isHovered ? [-16, -12, -16] : [-14, -10, -14],
              scale: sizeScale * 0.82
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="absolute w-[85%] h-[85%] flex items-center justify-center pointer-events-none z-0 animate-pulse-slow"
          >
            <img
              src={currentCupImg}
              alt={cupName}
              className="w-full h-full object-contain filter brightness-[0.9] contrast-[1.05] saturate-[0.95]"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.div>

          {/* Cup 2: Right Back Cup */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 15, scale: 0.8 }}
            animate={{ 
              opacity: 0.85, 
              x: isHovered ? 70 : 50, 
              y: isHovered ? [-12, 0, -12] : [-6, 6, -6], 
              rotate: isHovered ? [16, 12, 16] : [14, 10, 14],
              scale: sizeScale * 0.82
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute w-[85%] h-[85%] flex items-center justify-center pointer-events-none z-0 animate-pulse-slow"
          >
            <img
              src={currentCupImg}
              alt={cupName}
              className="w-full h-full object-contain filter brightness-[0.9] contrast-[1.05] saturate-[0.95]"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.div>

          {/* Cup 3: Center Front Cup (Main) */}
          <motion.div
            animate={{ 
              y: isHovered ? [-8, 2, -8] : [-4, 4, -4], 
              rotate: isHovered ? [8, 12, 8] : [9, 11, 9] 
            }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
            style={{ scale: sizeScale }}
            className="relative w-[95%] h-[95%] flex items-center justify-center transition-all duration-300 z-10"
          >
            <img
              src={currentCupImg}
              alt={cupName}
              className="w-full h-full object-contain filter brightness-[1.04] contrast-[1.05] drop-shadow-[0_20px_35px_rgba(74,40,16,0.38)]"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.div>
        </div>
      );
    }

    // Elite Plan ($99) -> 4 Cups symmetrically fanning out left-to-right with waves
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Cup 1: Far Left Cup */}
        <motion.div
          initial={{ opacity: 0, x: -90, rotate: -25, scale: 0.7 }}
          animate={{ 
            opacity: 0.75, 
            x: isHovered ? -100 : -80, 
            y: isHovered ? [-16, -4, -16] : [-10, 2, -10], 
            rotate: isHovered ? [-26, -22, -26] : [-24, -20, -24],
            scale: sizeScale * 0.72
          }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          className="absolute w-[80%] h-[80%] flex items-center justify-center pointer-events-none z-0"
        >
          <img
            src={currentCupImg}
            alt={cupName}
            className="w-full h-full object-contain filter brightness-[0.82] contrast-[1.05] saturate-[0.9]"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        {/* Cup 2: Left Center Cup */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -10, scale: 0.85 }}
          animate={{ 
            opacity: 0.9, 
            x: isHovered ? -45 : -32, 
            y: isHovered ? [-10, 2, -10] : [-5, 5, -5], 
            rotate: isHovered ? [-11, -7, -11] : [-9, -5, -9],
            scale: sizeScale * 0.86
          }}
          transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute w-[88%] h-[88%] flex items-center justify-center pointer-events-none z-10"
        >
          <img
            src={currentCupImg}
            alt={cupName}
            className="w-full h-full object-contain filter brightness-[0.92] contrast-[1.05] saturate-[0.95]"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        {/* Cup 3: Right Center Cup */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 10, scale: 0.85 }}
          animate={{ 
            opacity: 0.9, 
            x: isHovered ? 45 : 32, 
            y: isHovered ? [-11, 1, -11] : [-6, 4, -6], 
            rotate: isHovered ? [11, 7, 11] : [9, 5, 9],
            scale: sizeScale * 0.86
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute w-[88%] h-[88%] flex items-center justify-center pointer-events-none z-10"
        >
          <img
            src={currentCupImg}
            alt={cupName}
            className="w-full h-full object-contain filter brightness-[0.92] contrast-[1.05] saturate-[0.95]"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>

        {/* Cup 4: Far Right Cup */}
        <motion.div
          initial={{ opacity: 0, x: 90, rotate: 25, scale: 0.7 }}
          animate={{ 
            opacity: 0.75, 
            x: isHovered ? 100 : 80, 
            y: isHovered ? [-15, -3, -15] : [-9, 3, -9], 
            rotate: isHovered ? [26, 22, 26] : [24, 20, 24],
            scale: sizeScale * 0.72
          }}
          transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute w-[80%] h-[80%] flex items-center justify-center pointer-events-none z-0"
        >
          <img
            src={currentCupImg}
            alt={cupName}
            className="w-full h-full object-contain filter brightness-[0.82] contrast-[1.05] saturate-[0.9]"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[550px] aspect-square flex flex-col items-center justify-center select-none"
    >
      {/* Soft warm gold ambient halo behind the cup */}
      <div className="absolute inset-0 rounded-full blur-3xl bg-[#d4a373]/25 pointer-events-none scale-125" />
      <div className="absolute inset-0 rounded-full blur-2xl bg-[#6d4c41]/15 pointer-events-none scale-110" />

      {/* Decorative Rotating Thin Border */}
      <div className="absolute w-[86%] h-[86%] rounded-full border border-[#6d4c41]/20 pointer-events-none z-0 animate-spin-slow" style={{ animationDuration: '60s' }} />
      <div className="absolute w-[92%] h-[92%] rounded-full border border-[#d4a373]/10 pointer-events-none z-0" />

      {/* 100% Circular Organic Vignette Masked Container */}
      <div 
        className="relative w-full h-[80%] flex items-center justify-center pointer-events-none select-none z-10"
        style={seamlessMaskStyle}
      >
        {renderCups()}
      </div>

      {/* Screenshot-Style Dark Brown Control Panel Panel at the bottom */}
      <div className="absolute bottom-1 z-30 w-full max-w-[360px] bg-[#321b0f]/95 border border-[#d4a373]/30 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-[0_15px_35px_rgba(50,27,15,0.45)] flex flex-col gap-3">
        {/* Top bar: Left Arrow, Indicators, Right Arrow */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onPrevSlide) onPrevSlide();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-90"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  slideIndex % 3 === idx ? 'w-4 bg-[#d4a373]' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onNextSlide) onNextSlide();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-90"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom bar: Size Buttons Group */}
        <div className="grid grid-cols-3 gap-2 bg-[#1c0f08]/90 p-1 rounded-xl border border-white/5">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
              }}
              className={`py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedSize === size
                  ? 'bg-[#d4a373] text-[#321b0f] shadow-md font-extrabold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Small Text Metadata Row */}
        <div className="flex items-center justify-between text-[9px] font-semibold text-white/50 tracking-wider font-mono">
          <span>PURE 100% BRAND</span>
          <span className="text-[#d4a373]">COFFEE MENU</span>
          <span>SINCE 1993</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCoffeeCupSplashVisual;
