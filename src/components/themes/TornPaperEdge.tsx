import React from 'react';

interface TornPaperEdgeProps {
  color?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  color = '#FFFBF2',
  position = 'top',
  className = ''
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none z-20 pointer-events-none select-none ${className}`}
      style={{ transform: position === 'bottom' ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-10 sm:h-14 md:h-20 block filter drop-shadow-[0_-3px_5px_rgba(0,0,0,0.35)]"
      >
        {/* Torn Paper Main Fill */}
        <path
          fill={color}
          d="M0,0 
             L0,48 
             Q15,58 30,42 Q45,28 60,52 Q75,64 90,40 Q105,22 120,48 Q135,62 150,38 Q165,24 180,50 
             Q195,60 210,34 Q225,18 240,46 Q255,62 270,38 Q285,22 300,52 Q315,64 330,40 
             Q345,24 360,48 Q375,58 390,34 Q405,18 420,50 Q435,64 450,38 Q465,22 480,52 
             Q495,62 510,36 Q525,18 540,48 Q555,64 570,38 Q585,22 600,50 Q615,62 630,36 
             Q645,18 660,48 Q675,64 690,38 Q705,22 720,52 Q735,64 750,40 Q765,24 780,48 
             Q795,58 810,34 Q825,18 840,50 Q855,64 870,38 Q885,22 900,52 Q915,64 930,38 
             Q945,22 960,50 Q975,62 990,36 Q1005,18 1020,48 Q1035,64 1050,38 Q1065,22 1080,52 
             Q1095,62 1110,36 Q1125,18 1140,48 Q1155,64 1170,38 Q1185,22 1200,50 Q1215,62 1230,36 
             Q1245,18 1260,48 Q1275,64 1290,38 Q1305,22 1320,52 Q1335,64 1350,40 Q1365,24 1380,48 
             Q1395,58 1410,34 Q1425,20 1440,45 
             L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
};

export default TornPaperEdge;
