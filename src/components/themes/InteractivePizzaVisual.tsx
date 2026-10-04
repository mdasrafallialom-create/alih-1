import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Pizza } from 'lucide-react';
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
  const [hoveredSliceIndex, setHoveredSliceIndex] = useState<number | null>(null);

  // Guaranteed fallback image URL so pizza image NEVER fails or goes blank
  const pizzaImgSrc = (customImg && !customImg.includes('photo-1513104890138') && !customImg.includes('photo-1544025162'))
    ? customImg
    : (roundArtisanPizzaImg || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop');

  // Function to calculate the SVG path of a 60-degree wedge (1/6th of a pizza)
  const getWedgePath = (startDeg: number, endDeg: number, cx = 500, cy = 500, r = 455) => {
    const rad1 = (startDeg - 90) * Math.PI / 180;
    const rad2 = (endDeg - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(rad1);
    const y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2);
    const y2 = cy + r * Math.sin(rad2);
    
    return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    
    const sliceIndex = Math.floor(angle / 60);
    setHoveredSliceIndex(sliceIndex);
  };

  const handleMouseLeave = () => {
    setHoveredSliceIndex(null);
  };

  return (
    <div 
      className="relative w-full max-w-[540px] flex flex-col items-center justify-center select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredSliceIndex(null);
      }}
      role="button"
      tabIndex={0}
      aria-label="Interactive Wood-Fired Pizza - Hover over slices to pull them out"
    >
      {/* Soft Circular Ambient Halo Behind Pizza */}
      <div 
        className="absolute inset-4 rounded-full pointer-events-none blur-3xl transition-opacity duration-700"
        style={{
          background: isHovered 
            ? 'radial-gradient(circle, rgba(245,158,11,0.38) 0%, rgba(220,38,38,0.22) 50%, transparent 75%)' 
            : 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(180,83,9,0.12) 50%, transparent 70%)'
        }}
      />

      {/* Main Interactive Round Pizza Viewport */}
      <motion.div
        animate={isHovered ? { y: -4 } : { y: [-6, 6, -6], rotate: [0, 0.8, 0, -0.8, 0] }}
        transition={isHovered ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full aspect-square flex items-center justify-center cursor-pointer rounded-full overflow-hidden"
      >
        {/* Base Pristine HTML Image Layer (Guarantees image is 100% ALWAYS visible) */}
        <div className="absolute inset-2 rounded-full overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.9)] bg-stone-950">
          <img 
            src={pizzaImgSrc} 
            alt={cupName || "Artisanal Round Truffle Pizza"} 
            className="w-full h-full object-cover rounded-full filter brightness-[1.05] contrast-[1.08]"
          />
        </div>

        {/* Interactive SVG Slice Overlay */}
        <svg 
          viewBox="0 0 1000 1000" 
          className="relative z-10 w-full h-full overflow-visible drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* 6 separate wedge clip-paths for the 6 pizza slices */}
            {Array.from({ length: 6 }).map((_, i) => (
              <clipPath id={`pizza-slice-clip-${i}`} key={i}>
                <path d={getWedgePath(i * 60, (i + 1) * 60)} />
              </clipPath>
            ))}

            {/* Whole Pizza Circle Clip */}
            <clipPath id="pizza-full-circle-clip">
              <circle cx="500" cy="500" r="455" />
            </clipPath>

            {/* Dark Wood-Fired Pizza Stone / Oven Peel Surface in Void */}
            <radialGradient id="peel-void-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c1008" />
              <stop offset="60%" stopColor="#120804" />
              <stop offset="100%" stopColor="#080302" />
            </radialGradient>

            {/* Glowing Golden Slice Elevation Shadow */}
            <filter id="slice-lift-shadow" x="-30%" y="-30%" width="170%" height="170%">
              <feDropShadow dx="-14" dy="20" stdDeviation="16" floodColor="#000000" floodOpacity="0.95" />
              <feDropShadow dx="-4" dy="8" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.6" />
            </filter>
          </defs>

          {hoveredSliceIndex === null ? (
            /* Whole Round Pizza Seam Guide Layer */
            <g pointerEvents="none">
              {/* Subtle dashed pre-sliced guide lines radiating from center */}
              {Array.from({ length: 6 }).map((_, i) => {
                const rad = (i * 60 - 90) * Math.PI / 180;
                const x2 = 500 + 455 * Math.cos(rad);
                const y2 = 500 + 455 * Math.sin(rad);
                return (
                  <line 
                    key={i}
                    x1="500" 
                    y1="500" 
                    x2={x2.toFixed(1)} 
                    y2={y2.toFixed(1)} 
                    stroke="rgba(255, 240, 200, 0.35)" 
                    strokeWidth="1.5" 
                    strokeDasharray="6 6"
                  />
                );
              })}
            </g>
          ) : (
            /* Interactive Slice Pulled State */
            <>
              {/* Pizza Oven Stone Beneath in the Void */}
              <circle cx="500" cy="500" r="456" fill="url(#peel-void-gradient)" />
              
              {/* Void Highlight of the Pulled Slice */}
              <path 
                d={getWedgePath(hoveredSliceIndex * 60, (hoveredSliceIndex + 1) * 60)} 
                fill="#0e0703" 
                stroke="rgba(245,158,11,0.4)" 
                strokeWidth="2" 
              />

              {/* Render each of the 6 slices with active slice translated outward */}
              {Array.from({ length: 6 }).map((_, i) => {
                const isSliceHovered = hoveredSliceIndex === i;
                const midDeg = i * 60 + 30;
                const midRad = (midDeg - 90) * Math.PI / 180;
                
                const pullDistance = 50;
                const targetX = isSliceHovered ? Math.cos(midRad) * pullDistance : 0;
                const targetY = isSliceHovered ? Math.sin(midRad) * pullDistance : 0;
                
                const pivotX = 500 + 455 * Math.cos(midRad);
                const pivotY = 500 + 455 * Math.sin(midRad);

                return (
                  <motion.g
                    key={i}
                    animate={{
                      x: targetX,
                      y: targetY,
                      scale: isSliceHovered ? 1.06 : 1,
                      rotate: isSliceHovered ? (i % 2 === 0 ? 3.5 : -3.5) : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      mass: 0.55
                    }}
                    style={{
                      transformOrigin: `${pivotX}px ${pivotY}px`,
                      filter: isSliceHovered ? "url(#slice-lift-shadow)" : "none"
                    }}
                  >
                    <g clipPath={`url(#pizza-slice-clip-${i})`}>
                      <image 
                        href={pizzaImgSrc} 
                        xlinkHref={pizzaImgSrc}
                        x="0" 
                        y="0" 
                        width="1000" 
                        height="1000" 
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>

                    {/* Glowing Golden Cut Edge on the Pulled Slice */}
                    {isSliceHovered && (
                      <g pointerEvents="none">
                        <line 
                          x1="500" 
                          y1="500" 
                          x2={(500 + 455 * Math.cos((i * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          y2={(500 + 455 * Math.sin((i * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          stroke="rgba(254, 240, 138, 0.98)" 
                          strokeWidth="5" 
                          strokeLinecap="round" 
                          filter="drop-shadow(0 0 10px rgba(245,158,11,0.95))"
                        />
                        <line 
                          x1="500" 
                          y1="500" 
                          x2={(500 + 455 * Math.cos(((i + 1) * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          y2={(500 + 455 * Math.sin(((i + 1) * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          stroke="rgba(254, 240, 138, 0.98)" 
                          strokeWidth="5" 
                          strokeLinecap="round" 
                          filter="drop-shadow(0 0 10px rgba(245,158,11,0.95))"
                        />
                      </g>
                    )}
                  </motion.g>
                );
              })}
            </>
          )}

          {/* Invisible Cursor Interactive Hit Area */}
          <circle 
            cx="500" 
            cy="500" 
            r="455" 
            fill="transparent" 
            className="cursor-pointer"
          />
        </svg>
      </motion.div>

      {/* Bottom Luxury Gold Badge */}
      <div className="mt-3 w-full max-w-[480px] bg-stone-950/90 border border-amber-500/50 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3 text-left transition-all">
        <div className="flex items-center gap-2.5 min-w-0">
          <Pizza className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="flex items-baseline gap-2 truncate">
            <span className="font-serif text-xs sm:text-sm tracking-wider font-black text-amber-200 uppercase truncate" style={{ fontFamily: "'Cinzel', serif" }}>
              {cupName || 'ARTISANAL ROUND TRUFFLE PIZZA'}
            </span>
            {hoveredSliceIndex === null && (
              <span className="text-[10px] text-amber-300/60 font-mono italic hidden sm:inline shrink-0">
                (Hover to slice)
              </span>
            )}
          </div>
        </div>
        
        <div className="shrink-0">
          {hoveredSliceIndex !== null ? (
            <span className="px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/60 text-amber-300 text-[10px] font-black tracking-widest uppercase shadow-md animate-pulse">
              FRESHLY SLICED
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-wider uppercase">
              CHEF SIGNATURE
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
