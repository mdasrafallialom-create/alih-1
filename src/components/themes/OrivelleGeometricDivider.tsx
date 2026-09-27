import React from 'react';

interface OrivelleGeometricDividerProps {
  color?: string;
  position?: 'top' | 'bottom';
  className?: string;
  accentColor?: string;
}

export const OrivelleGeometricDivider: React.FC<OrivelleGeometricDividerProps> = ({
  color = '#0a0907',
  position = 'top',
  className = '',
  accentColor = '#e5c158'
}) => {
  const isBottom = position === 'bottom';

  return (
    <div
      className={`w-full overflow-hidden leading-none z-20 pointer-events-none select-none relative ${className}`}
      style={{ transform: isBottom ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block filter drop-shadow-[0_-10px_25px_rgba(0,0,0,0.9)]"
      >
        <defs>
          {/* Imperial 24K Metallic Multi-Stop Chiseled Gold Gradient */}
          <linearGradient id="orivelle24kGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a5512" stopOpacity="0.4" />
            <stop offset="12%" stopColor="#c59b27" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffd700" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="88%" stopColor="#c59b27" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7a5512" stopOpacity="0.4" />
          </linearGradient>

          {/* Platinum / Champagne Highlight Gradient */}
          <linearGradient id="orivelleChampagneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a150c" stopOpacity="0" />
            <stop offset="35%" stopColor="#fef3c7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="65%" stopColor="#fef3c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1a150c" stopOpacity="0" />
          </linearGradient>

          {/* Deep Obsidian Architectural Shadow Gradient */}
          <linearGradient id="orivelleShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#120f0a" stopOpacity="0.98" />
          </linearGradient>

          {/* Realistic Gold Glow Filter */}
          <filter id="imperialGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComponentTransfer in="blur" result="boost">
              <feFuncA type="linear" slope="1.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="boost" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Underlying Dark Architectural Facet Layer */}
        <path
          fill="url(#orivelleShadowGrad)"
          d="M0,0 L0,30 L360,40 L680,70 L720,86 L760,70 L1080,40 L1440,30 L1440,96 L0,96 Z"
          opacity="0.85"
        />

        {/* 2. Main Solid Base Fill with Target Section Color */}
        <path
          fill={color}
          d="M0,18 L0,34 L360,44 L680,74 L720,90 L760,74 L1080,44 L1440,34 L1440,96 L0,96 Z"
        />

        {/* 3. Outer Hairline Chevron Guide with Micro Dash */}
        <path
          d="M0,18 L360,34 L680,64 L720,80 L760,64 L1080,34 L1440,18"
          fill="none"
          stroke="url(#orivelle24kGoldGrad)"
          strokeWidth="1.2"
          strokeDasharray="4,6"
          opacity="0.6"
        />

        {/* 4. Primary 24K Sculpted Gold Architectural Stroke Line */}
        <path
          d="M0,34 L360,44 L680,74 L720,90 L760,74 L1080,44 L1440,34"
          fill="none"
          stroke="url(#orivelle24kGoldGrad)"
          strokeWidth="3.2"
          filter="url(#imperialGoldGlow)"
        />

        {/* 5. Center Laser Champagne Specular Sheen Stroke */}
        <path
          d="M200,40 L680,74 L720,90 L760,74 L1240,40"
          fill="none"
          stroke="url(#orivelleChampagneGrad)"
          strokeWidth="1.4"
          opacity="0.95"
        />

        {/* 6. Geometric Symmetrical Stepped Facets (Left & Right) */}
        <polygon points="610,64 645,67 640,73 605,70" fill="url(#orivelle24kGoldGrad)" opacity="0.9" />
        <polygon points="650,68 685,73 680,79 645,74" fill="url(#orivelle24kGoldGrad)" opacity="0.95" />
        <polygon points="830,64 795,67 800,73 835,70" fill="url(#orivelle24kGoldGrad)" opacity="0.9" />
        <polygon points="790,68 755,73 760,79 795,74" fill="url(#orivelle24kGoldGrad)" opacity="0.95" />

        {/* 7. Center Grand Imperial 3-Star Michelin Starburst Medallion */}
        {/* Outer Radiant Diamond */}
        <polygon
          points="720,56 745,78 720,100 695,78"
          fill="#0a0907"
          stroke="url(#orivelle24kGoldGrad)"
          strokeWidth="2.5"
          filter="url(#imperialGoldGlow)"
        />

        {/* Inner Faceted 24K Gold Gem */}
        <polygon
          points="720,62 738,78 720,94 702,78"
          fill="url(#orivelle24kGoldGrad)"
        />

        {/* Center Brilliant Core White Diamond */}
        <polygon
          points="720,68 730,78 720,88 710,78"
          fill="#ffffff"
          filter="url(#imperialGoldGlow)"
        />

        {/* Michelin Starburst Flanking Gold Beads */}
        <circle cx="680" cy="74" r="3.5" fill="url(#orivelle24kGoldGrad)" filter="url(#imperialGoldGlow)" />
        <circle cx="680" cy="74" r="1.4" fill="#ffffff" />
        
        <circle cx="760" cy="74" r="3.5" fill="url(#orivelle24kGoldGrad)" filter="url(#imperialGoldGlow)" />
        <circle cx="760" cy="74" r="1.4" fill="#ffffff" />

        {/* Flanking Diamond Pips */}
        <polygon points="645,62 651,67 645,72 639,67" fill="#fef08a" opacity="0.9" filter="url(#imperialGoldGlow)" />
        <polygon points="795,62 801,67 795,72 789,67" fill="#fef08a" opacity="0.9" filter="url(#imperialGoldGlow)" />
      </svg>
    </div>
  );
};

export default OrivelleGeometricDivider;
