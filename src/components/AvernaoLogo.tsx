import React from 'react';

interface AvernaoLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AvernaoLogo: React.FC<AvernaoLogoProps> = ({ 
  className = "w-12 h-12", 
  size,
  showText = true 
}) => {
  const sizeStyle = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <svg 
      className={`${className} shrink-0 shadow-md rounded-2xl inline-block select-none`} 
      style={sizeStyle}
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic Gold Gradient for Border and Flourishes */}
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d77f" />
          <stop offset="25%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#fff2ac" />
          <stop offset="75%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>

        {/* Soft Metallic Gold Gradient */}
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f7d070" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9e721d" />
        </linearGradient>

        {/* Card Background Gradient */}
        <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fcfbfa" />
          <stop offset="100%" stopColor="#f4eee1" />
        </linearGradient>

        {/* Letter A Dark Metallic Gradient */}
        <linearGradient id="darkA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c2825" />
          <stop offset="50%" stopColor="#1a1816" />
          <stop offset="100%" stopColor="#080706" />
        </linearGradient>

        {/* Inner Card Drop Shadow */}
        <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#b8860b" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer Squircle Container with Gold Border */}
      <rect 
        x="12" 
        y="12" 
        width="476" 
        height="476" 
        rx="100" 
        fill="url(#cardBg)" 
        stroke="url(#goldBorder)" 
        strokeWidth="22" 
        filter="url(#goldGlow)"
      />

      {/* Inner Subtle Inset Gold Ring */}
      <rect 
        x="26" 
        y="26" 
        width="448" 
        height="448" 
        rx="86" 
        fill="none" 
        stroke="url(#goldBorder)" 
        strokeWidth="3" 
        strokeOpacity="0.4"
      />

      {/* === CHEF HAT (Top) === */}
      <g transform="translate(0, -10)">
        {/* Hat Main Pouf */}
        <path 
          d="M 200 135 C 190 100 220 75 250 82 C 275 60 315 70 325 95 C 345 85 370 105 360 135 C 375 160 350 180 335 175 H 215 C 195 175 185 155 200 135 Z" 
          fill="url(#cardBg)"
          stroke="url(#goldAccent)"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        {/* Hat Base Band */}
        <path 
          d="M 215 170 H 335 C 340 170 342 188 335 192 H 215 C 208 188 210 170 215 170 Z" 
          fill="url(#goldAccent)"
        />
      </g>

      {/* === LETTER 'A' (Main Body) === */}
      {/* Left Leg */}
      <path 
        d="M 250 155 L 140 325 C 135 333 145 342 165 342 H 210 L 250 275 H 250 L 250 155 Z" 
        fill="url(#darkA)"
      />
      {/* Right Leg */}
      <path 
        d="M 250 155 L 360 325 C 365 333 355 342 335 342 H 290 L 250 275 H 250 L 250 155 Z" 
        fill="url(#darkA)"
      />
      {/* Complete A Shape */}
      <path 
        d="M 250 150 L 142 322 C 138 328 145 335 165 335 L 205 335 L 250 262 L 295 335 L 335 335 C 355 335 362 328 358 322 L 250 150 Z" 
        fill="url(#darkA)"
      />

      {/* 4 Golden Window Panes inside the A's lower arch */}
      <g transform="translate(232, 280)">
        <rect x="0" y="0" width="15" height="15" rx="2" fill="url(#goldAccent)" />
        <rect x="19" y="0" width="15" height="15" rx="2" fill="url(#goldAccent)" />
        <rect x="0" y="19" width="15" height="15" rx="2" fill="url(#goldAccent)" />
        <rect x="19" y="19" width="15" height="15" rx="2" fill="url(#goldAccent)" />
      </g>

      {/* === SWOOSH & FORK === */}
      {/* Golden Swoosh Ring around A */}
      <path 
        d="M 148 268 C 190 282 250 280 310 248 C 345 229 375 200 420 160 C 400 185 360 220 315 245 C 245 284 175 280 148 268 Z" 
        fill="url(#goldBorder)"
      />

      {/* Fork Head at the end of Swoosh */}
      <g transform="translate(365, 158) rotate(-38)">
        {/* Fork Handle */}
        <path d="M 0 10 L 45 10 L 55 12 L 55 8 L 45 10 Z" fill="url(#goldBorder)" />
        {/* Fork Base */}
        <path d="M 45 0 C 55 0 62 5 65 10 C 62 15 55 20 45 20 Z" fill="url(#goldBorder)" />
        {/* 4 Tines */}
        <rect x="62" y="1" width="30" height="3.5" rx="1" fill="url(#goldBorder)" />
        <rect x="64" y="6" width="32" height="3.5" rx="1" fill="url(#goldBorder)" />
        <rect x="64" y="11" width="32" height="3.5" rx="1" fill="url(#goldBorder)" />
        <rect x="62" y="16" width="30" height="3.5" rx="1" fill="url(#goldBorder)" />
      </g>

      {/* === TEXT: AVERNAO === */}
      <text 
        x="250" 
        y="398" 
        textAnchor="middle" 
        fill="#1a1816" 
        style={{
          fontFamily: "'Montserrat', 'Inter', 'Helvetica Neue', sans-serif",
          fontSize: "44px",
          fontWeight: 900,
          letterSpacing: "0.22em"
        }}
      >
        AVERNAO
      </text>

      {/* === BOTTOM LEAVES FLOURISH === */}
      <g transform="translate(0, 405)">
        {/* Left Line */}
        <line x1="150" y1="20" x2="222" y2="20" stroke="url(#goldAccent)" strokeWidth="3" strokeLinecap="round" />
        {/* Right Line */}
        <line x1="278" y1="20" x2="350" y2="20" stroke="url(#goldAccent)" strokeWidth="3" strokeLinecap="round" />
        {/* Center Golden Leaves */}
        <path d="M 250 20 C 242 10 232 12 235 22 C 242 22 248 18 250 20 Z" fill="url(#goldAccent)" />
        <path d="M 250 20 C 258 10 268 12 265 22 C 258 22 252 18 250 20 Z" fill="url(#goldAccent)" />
        <circle cx="250" cy="20" r="3" fill="url(#goldAccent)" />
      </g>
    </svg>
  );
};

export default AvernaoLogo;
