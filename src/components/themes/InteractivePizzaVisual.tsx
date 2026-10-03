import React, { useState } from 'react';
import { motion } from 'motion/react';

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
  const pizzaImgSrc = customImg || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop';

  return (
    <div 
      className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Sliced Wood-Fired Artisanal Pizza"
    >
      {/* Soft Circular Ambient Halo Behind Pizza */}
      <div 
        className="absolute inset-4 rounded-full pointer-events-none blur-3xl transition-opacity duration-700"
        style={{
          background: isHovered 
            ? 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(220,38,38,0.2) 50%, transparent 75%)' 
            : 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(180,83,9,0.12) 50%, transparent 70%)'
        }}
      />

      {/* Floating Gentle Hover Motion Container with Sliced Pizza */}
      <motion.div
        animate={isHovered ? { y: -6, scale: 1.02 } : { y: [-6, 6, -6], rotate: [0, 0.8, 0, -0.8, 0] }}
        transition={isHovered ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full flex items-center justify-center cursor-pointer rounded-full overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.85)] border-2 border-amber-400/40"
      >
        <div className="w-full h-full relative overflow-hidden rounded-full">
          <img 
            src={pizzaImgSrc} 
            alt={cupName || "Sliced Wood-Fired Artisanal Pizza"} 
            className="w-full h-full object-cover filter brightness-[1.06] contrast-[1.1] transition-transform duration-700 group-hover:scale-108"
          />
        </div>
      </motion.div>
    </div>
  );
};
