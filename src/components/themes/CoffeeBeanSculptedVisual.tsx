import React from 'react';
import { motion } from 'motion/react';
import coffeeBeanCupImg from '../../assets/images/coffee_bean_cup_isolated.png';

interface CoffeeBeanSculptedVisualProps {
  accentColor?: string;
}

export const CoffeeBeanSculptedVisual: React.FC<CoffeeBeanSculptedVisualProps> = ({
  accentColor = '#c89666'
}) => {
  // Staggered animated coffee beans dropping from the spoon down into the coffee cup
  const fallingBeans = [
    { id: 1, xOffset: 12, delay: 0, duration: 1.4, size: 10, rotateEnd: 180 },
    { id: 2, xOffset: 24, delay: 0.35, duration: 1.5, size: 8, rotateEnd: -140 },
    { id: 3, xOffset: 18, delay: 0.7, duration: 1.35, size: 11, rotateEnd: 210 },
    { id: 4, xOffset: 28, delay: 1.05, duration: 1.45, size: 9, rotateEnd: -190 },
    { id: 5, xOffset: 15, delay: 1.4, duration: 1.55, size: 10, rotateEnd: 160 },
  ];

  return (
    <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] aspect-square flex items-center justify-center lg:justify-end select-none">
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
        {/* The Isolated Transparent Coffee Bean Cup & Spoon Image with crisp organic drop-shadow */}
        <img
          src={coffeeBeanCupImg}
          alt="Artisanal Coffee Cup Sculpted from Coffee Beans"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] contrast-[1.05] brightness-[1.02] pointer-events-none"
        />

        {/* Animated Falling Coffee Beans Particles from the Spoon into the Cup */}
        <div className="absolute top-[28%] right-[32%] w-16 h-28 pointer-events-none overflow-hidden">
          {fallingBeans.map((bean) => (
            <motion.div
              key={bean.id}
              initial={{ y: -8, opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{
                y: [0, 100],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1, 0.75],
                rotate: [0, bean.rotateEnd]
              }}
              transition={{
                duration: bean.duration,
                repeat: Infinity,
                delay: bean.delay,
                ease: "easeIn"
              }}
              style={{ left: `${bean.xOffset}px` }}
              className="absolute top-0"
            >
              {/* Coffee bean shape rendered in SVG */}
              <svg 
                width={bean.size} 
                height={bean.size * 1.3} 
                viewBox="0 0 16 22" 
                fill="none" 
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                <ellipse cx="8" cy="11" rx="7" ry="10" fill="#4a2c11" />
                <ellipse cx="8" cy="11" rx="6" ry="9" fill="#6d3f1a" />
                <path 
                  d="M8,2 Q6,11 8,20" 
                  stroke="#2b1404" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </motion.div>
          ))}
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
