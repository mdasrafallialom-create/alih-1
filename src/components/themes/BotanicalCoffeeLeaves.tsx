import React from 'react';

interface BotanicalCoffeeLeavesProps {
  className?: string;
  color?: string;
}

export const BotanicalCoffeeLeaves: React.FC<BotanicalCoffeeLeavesProps> = ({
  className = "w-48 sm:w-64 md:w-80 h-auto pointer-events-none opacity-40 select-none",
  color = "#ffffff"
}) => {
  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Branch 1 */}
      <path
        d="M10 270 Q80 220 130 150 Q160 110 180 40"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 1"
      />
      {/* Leaves on branch 1 */}
      <path
        d="M80 220 Q70 180 40 170 Q75 190 80 220"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M40 170 Q60 195 80 220"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />

      <path
        d="M105 185 Q130 160 150 165 Q125 180 105 185"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M150 165 Q125 170 105 185"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />

      <path
        d="M130 150 Q120 110 90 105 Q120 125 130 150"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M90 105 Q110 130 130 150"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />

      <path
        d="M150 120 Q180 95 210 105 Q175 115 150 120"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M210 105 Q180 110 150 120"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />

      <path
        d="M180 40 Q160 20 140 30 Q160 35 180 40"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />

      {/* Coffee Cherries clusters */}
      <circle cx="106" cy="180" r="4.5" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="113" cy="184" r="4" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="109" cy="188" r="3.5" stroke={color} strokeWidth="1" fill="none" />

      <circle cx="132" cy="146" r="4" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="138" cy="151" r="4.5" stroke={color} strokeWidth="1" fill="none" />

      {/* Branch 2 (Side branch) */}
      <path
        d="M20 280 Q90 260 170 240 Q220 220 260 170"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M170 240 Q180 205 160 190 Q170 220 170 240"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M210 225 Q245 230 265 215 Q235 230 210 225"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="172" cy="235" r="4" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="178" cy="239" r="3.5" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
};
