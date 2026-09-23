import React from 'react';
import { motion } from 'motion/react';
import coffeeBeanCupImg from '../../assets/images/coffee_bean_cup_isolated.png';

interface CoffeeBeanSculptedVisualProps {
  accentColor?: string;
}

export const CoffeeBeanSculptedVisual: React.FC<CoffeeBeanSculptedVisualProps> = ({
  accentColor = '#c89666'
}) => {
  return (
    <div className="relative w-full max-w-[290px] min-[400px]:max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] aspect-square flex items-center justify-center lg:justify-end select-none mx-auto lg:mx-0">
      {/* Warm Ambient Radial Glow behind the cup */}
      <div 
        className="absolute inset-6 rounded-full blur-3xl opacity-30 pointer-events-none scale-100"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, #3e2723 45%, transparent 70%)`
        }}
      />

      {/* Main Container with subtle gentle floating breathing motion */}
      <motion.div
        animate={{ 
          y: [-6, 6, -6],
          rotate: [-0.5, 0.5, -0.5]
        }}
        transition={{ 
          duration: 4.8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Full Coffee Bean Cup & Spoon Image without top cropping */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={coffeeBeanCupImg}
            alt="Artisanal Coffee Cup Sculpted from Coffee Beans"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] contrast-[1.05] brightness-[1.02] pointer-events-none"
          />
        </div>

        {/* Delicate Rising Steam Wisps from the Coffee Cup */}
        <div className="absolute bottom-[44%] right-[28%] pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -32, -50], 
              opacity: [0, 0.55, 0], 
              scale: [0.8, 1.2, 1.4],
              x: [-4, 6, -2]
            }}
            transition={{ 
              duration: 3.2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
            className="w-16 h-20 bg-gradient-to-t from-white/20 via-amber-100/10 to-transparent blur-lg rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -28, -45], 
              opacity: [0, 0.4, 0], 
              scale: [0.7, 1.1, 1.3],
              x: [4, -5, 3]
            }}
            transition={{ 
              duration: 2.8, 
              repeat: Infinity, 
              delay: 1.2,
              ease: "easeOut" 
            }}
            className="w-14 h-16 bg-gradient-to-t from-white/15 via-white/5 to-transparent blur-md rounded-full -mt-10 ml-4"
          />
        </div>
      </motion.div>
    </div>
  );
};
