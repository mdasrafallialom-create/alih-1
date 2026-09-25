import React from 'react';

interface TornPaperEdgeProps {
  color?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  color = '#ffffff',
  position = 'top',
  className = ''
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none z-20 pointer-events-none select-none ${className}`}
      style={{ transform: position === 'bottom' ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 md:h-16 block filter drop-shadow-[0_-4px_8px_rgba(0,0,0,0.28)]"
      >
        {/* Soft Under-layer Deckle Paper Shadow */}
        <path
          fill={color}
          opacity="0.55"
          d="M0,0 L0,32 
             C120,40 240,24 360,34 
             C480,44 600,26 720,36 
             C840,46 960,28 1080,38 
             C1200,48 1320,28 1440,36 
             L1440,60 L0,60 Z"
        />
        {/* Main Artisanal Deckle Edge with Gentle Organic Flow */}
        <path
          fill={color}
          d="M0,0 L0,26 
             C60,30 120,20 180,27 
             C240,34 300,23 360,28 
             C420,33 480,21 540,29 
             C600,37 660,24 720,31 
             C780,38 840,22 900,27 
             C960,32 1020,24 1080,30 
             C1140,36 1200,22 1260,28 
             C1320,34 1380,25 1440,30 
             L1440,60 L0,60 Z"
        />
      </svg>
    </div>
  );
};

export default TornPaperEdge;
