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
  const [hoveredSliceIndex, setHoveredSliceIndex] = useState<number | null>(null);

  const pizzaImgSrc = customImg || roundArtisanPizzaImg;

  // Function to calculate the SVG path of a 60-degree wedge (1/6th of a pizza)
  // cx, cy are center coordinates, r is radius
  // Angle starts from 12 o'clock (0 degrees), increasing clockwise
  const getWedgePath = (startDeg: number, endDeg: number, cx = 500, cy = 500, r = 455) => {
    const rad1 = (startDeg - 90) * Math.PI / 180;
    const rad2 = (endDeg - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(rad1);
    const y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2);
    const y2 = cy + r * Math.sin(rad2);
    
    return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
  };

  // Tracking mouse movement over the SVG container to determine the active 60-degree slice
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    // Calculate angle in degrees from -180 to 180, then map to 0 to 360 relative to 12 o'clock
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
      className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredSliceIndex(null);
      }}
      role="button"
      tabIndex={0}
      aria-label="Interactive Wood-Fired Pizza - Hover over slices to pull them out"
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
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* 6 separate wedge clip-paths for 6 slices */}
            {Array.from({ length: 6 }).map((_, i) => (
              <clipPath id={`pizza-slice-clip-${i}`} key={i}>
                <path d={getWedgePath(i * 60, (i + 1) * 60)} />
              </clipPath>
            ))}

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

          {hoveredSliceIndex === null ? (
            /* Solid undivided whole round pizza with absolutely ZERO subpixel hairline seams */
            <g clipPath="url(#pizza-full-circle-clip)">
              <image 
                href={pizzaImgSrc} 
                x="0" 
                y="0" 
                width="1000" 
                height="1000" 
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          ) : (
            /* Render individual slices ONLY when one of them is being lifted/pulled */
            <>
              {/* LAYER A: Pizza Stone / Peel Base Underneath (Visible inside the empty cut slots) */}
              <circle cx="500" cy="500" r="456" fill="url(#peel-void-gradient)" />
              
              {/* Subtle char marks and herb crumbs on the stone beneath where any slice lifts */}
              <g className="transition-opacity duration-300">
                {/* Highlight the void of the lifted slice */}
                <path 
                  d={getWedgePath(hoveredSliceIndex * 60, (hoveredSliceIndex + 1) * 60)} 
                  fill="#0f0804" 
                  stroke="rgba(217,119,6,0.3)" 
                  strokeWidth="2" 
                />
                {/* Crumb and melted oil residue centered relative to active slice wedge */}
                {(() => {
                  const midDeg = hoveredSliceIndex * 60 + 30;
                  const midRad = (midDeg - 90) * Math.PI / 180;
                  const rx = (dist: number) => 500 + dist * Math.cos(midRad);
                  const ry = (dist: number) => 500 + dist * Math.sin(midRad);
                  return (
                    <>
                      <circle cx={rx(80)} cy={ry(80)} r="6" fill="#ca8a04" opacity="0.7" />
                      <circle cx={rx(140)} cy={ry(140)} r="4" fill="#ea580c" opacity="0.6" />
                      <circle cx={rx(240)} cy={ry(240)} r="5" fill="#ca8a04" opacity="0.5" />
                      <circle cx={rx(320)} cy={ry(320)} r="8" fill="#1c1917" opacity="0.8" />
                      <circle cx={rx(180)} cy={ry(180)} r="3" fill="#15803d" opacity="0.7" />
                      <circle cx={rx(280)} cy={ry(280)} r="4.5" fill="#f59e0b" opacity="0.5" />
                    </>
                  );
                })()}
              </g>

              {/* LAYER B: Render the 6 slices of pizza individually */}
              {Array.from({ length: 6 }).map((_, i) => {
                const isSliceHovered = hoveredSliceIndex === i;
                const midDeg = i * 60 + 30;
                const midRad = (midDeg - 90) * Math.PI / 180;
                
                // Slice moves outwards radially
                const pullDistance = 50;
                const targetX = isSliceHovered ? Math.cos(midRad) * pullDistance : 0;
                const targetY = isSliceHovered ? Math.sin(midRad) * pullDistance : 0;
                
                // Pivot is located at the outer crust edge of the slice
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
                      stiffness: 240,
                      damping: 18,
                      mass: 0.6
                    }}
                    style={{
                      transformOrigin: `${pivotX}px ${pivotY}px`,
                      filter: isSliceHovered ? "url(#slice-lift-shadow)" : "none"
                    }}
                  >
                    {/* Slices of pizza body clipped to its own 60-degree wedge */}
                    <g clipPath={`url(#pizza-slice-clip-${i})`}>
                      <image 
                        href={pizzaImgSrc} 
                        x="0" 
                        y="0" 
                        width="1000" 
                        height="1000" 
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>

                    {/* Glowing edge highlight and melted cheese rim on the active slice */}
                    {isSliceHovered && (
                      <g pointerEvents="none">
                        {/* First cut line of the wedge */}
                        <line 
                          x1="500" 
                          y1="500" 
                          x2={(500 + 455 * Math.cos((i * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          y2={(500 + 455 * Math.sin((i * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          stroke="rgba(254, 240, 138, 0.9)" 
                          strokeWidth="5.5" 
                          strokeLinecap="round" 
                          filter="drop-shadow(0 0 8px rgba(245,158,11,0.95))"
                        />
                        {/* Second cut line of the wedge */}
                        <line 
                          x1="500" 
                          y1="500" 
                          x2={(500 + 455 * Math.cos(((i + 1) * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          y2={(500 + 455 * Math.sin(((i + 1) * 60 - 90) * Math.PI / 180)).toFixed(1)} 
                          stroke="rgba(254, 240, 138, 0.9)" 
                          strokeWidth="5.5" 
                          strokeLinecap="round" 
                          filter="drop-shadow(0 0 8px rgba(245,158,11,0.95))"
                        />
                      </g>
                    )}
                  </motion.g>
                );
              })}
            </>
          )}

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
    </div>
  );
};
