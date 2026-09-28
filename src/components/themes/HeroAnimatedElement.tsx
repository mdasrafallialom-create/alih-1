import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, ChefHat, Crown, Wine, Flame, Star, Coffee, Pizza, Sandwich } from 'lucide-react';
import { CoffeeBeanSculptedVisual } from './CoffeeBeanSculptedVisual';
import { OrivelleGoldClocheVisual } from './OrivelleGoldClocheVisual';
import whiteCupSideImg from '../../assets/images/white_cup_side_isolated.png';
import whiteCoffeeCupImg from '../../assets/images/white_coffee_cup_isolated_trimmed.png';
import whiteCappuccinoCupImg from '../../assets/images/white_cappuccino_isolated.png';

// Fine Dining Imagery
import caviarDishImg from '../../assets/images/luxury_caviar_dish_1790508696808.jpg';
import wagyuDishImg from '../../assets/images/luxury_michelin_dish_1790508680735.jpg';
import dessertSphereImg from '../../assets/images/luxury_dessert_dish_1790508714022.jpg';
import tableClosedImg from '../../assets/images/table_closed_gold_cloche_1790603175271.jpg';
import tableOpenImg from '../../assets/images/table_open_gold_cloche_1790603214374.jpg';

interface HeroAnimatedElementProps {
  themeId?: string;
  accentColor?: string;
  cupImg?: string;
  cupName?: string;
  slideType?: string;
  slideIndex?: number;
}

export const HeroAnimatedElement: React.FC<HeroAnimatedElementProps> = ({
  themeId = 'velmora-dining',
  accentColor = '#c89666',
  cupImg,
  cupName,
  slideType,
  slideIndex = 0
}) => {
  const normId = (themeId || '').toLowerCase().trim();
  const [isHovered, setIsHovered] = useState(false);

  // Compute activeType first based on slideType or cupName keywords
  const lowerName = (cupName || '').toLowerCase();
  const activeType = slideType || (
    lowerName.includes('pizza') ? 'pizza' :
    lowerName.includes('burger') ? 'burger' :
    lowerName.includes('chicken') || lowerName.includes('peri') || lowerName.includes('wings') || lowerName.includes('robata') ? 'chicken' :
    lowerName.includes('steak') || lowerName.includes('wagyu') || lowerName.includes('tomahawk') ? 'steak' :
    lowerName.includes('sushi') || lowerName.includes('omakase') || lowerName.includes('sashimi') ? 'sushi' :
    lowerName.includes('seafood') || lowerName.includes('lobster') || lowerName.includes('bass') ? 'seafood' :
    lowerName.includes('pasta') || lowerName.includes('truffle') ? 'pasta' :
    lowerName.includes('caviar') ? 'caviar' :
    lowerName.includes('dessert') || lowerName.includes('sphere') ? 'dessert' :
    'cloche'
  );

  // Theme #01: Velmora Dining -> Artisanal Coffee Cup Sculpted from Coffee Beans
  if (normId === 'velmora-dining') {
    return <CoffeeBeanSculptedVisual accentColor={accentColor} />;
  }

  // Cloche slide type (e.g. for Orivelle House or Haute Gastronomy default)
  if (activeType === 'cloche' && (normId === 'orivelle-house' || !slideType)) {
    return (
      <OrivelleGoldClocheVisual
        accentColor={accentColor}
        customImg={cupImg}
        itemName={cupName || 'Miyazaki A5 Wagyu & Black Truffle'}
      />
    );
  }

  // Common Radial Vignette Mask Style: 100% Seamless Dissolve into Background with NO Box Outline
  const seamlessMaskStyle: React.CSSProperties = {
    maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 56%, rgba(0,0,0,0) 96%)',
    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 56%, rgba(0,0,0,0) 96%)'
  };

  // 1. Pizza Visual (Seamless Background Blended Wood-Fired Neapolitan Truffle Pizza)
  if (activeType === 'pizza') {
    return (
      <div className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/30 pointer-events-none scale-125" />
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [0.5, -0.5, 0.5] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
          style={seamlessMaskStyle}
        >
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop"
            alt={cupName || "Wood-Fired Truffle & Burrata Neapolitan Pizza"}
            className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.12] group-hover:scale-108 transition-transform duration-700"
          />
        </motion.div>
        
        {/* Floating Frameless Pill Badge */}
        <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
          <div className="bg-stone-950/90 border border-amber-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2">
            <Pizza className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs sm:text-sm uppercase font-extrabold text-amber-200 font-serif tracking-widest">
              {cupName || "Wood-Fired Truffle & Burrata Neapolitan Pizza"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Burger Visual (Seamless Background Blended Double Truffle Wagyu Burger)
  if (activeType === 'burger') {
    return (
      <div className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-600/30 pointer-events-none scale-125" />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
          style={seamlessMaskStyle}
        >
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop"
            alt={cupName || "Double Truffle A5 Wagyu Gourmet Burger"}
            className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.12] group-hover:scale-108 transition-transform duration-700"
          />
        </motion.div>

        {/* Floating Frameless Pill Badge */}
        <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
          <div className="bg-stone-950/90 border border-amber-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2">
            <Sandwich className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs sm:text-sm uppercase font-extrabold text-amber-200 font-serif tracking-widest">
              {cupName || "Double Truffle A5 Wagyu Gourmet Burger"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Chicken / Robata Flame Visual (Seamless Background Blended)
  if (activeType === 'chicken') {
    return (
      <div className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group">
        <div className="absolute inset-0 rounded-full blur-3xl bg-orange-600/35 pointer-events-none scale-125" />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
          style={seamlessMaskStyle}
        >
          <img
            src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=1000&auto=format&fit=crop"
            alt={cupName || "Robata Flame Roasted Peri Peri Chicken"}
            className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.12] group-hover:scale-108 transition-transform duration-700"
          />
        </motion.div>

        {/* Floating Frameless Pill Badge */}
        <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
          <div className="bg-stone-950/90 border border-orange-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-xs sm:text-sm uppercase font-extrabold text-orange-200 font-serif tracking-widest">
              {cupName || "Robata Flame Roasted Peri Peri Chicken & Skewers"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Steak Visual (Seamless Background Blended)
  if (activeType === 'steak') {
    return (
      <div className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group">
        <div className="absolute inset-0 rounded-full blur-3xl bg-red-600/30 pointer-events-none scale-125" />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
          style={seamlessMaskStyle}
        >
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop"
            alt={cupName || "Miyazaki A5 Wagyu Tomahawk Steak"}
            className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.12] group-hover:scale-108 transition-transform duration-700"
          />
        </motion.div>

        {/* Floating Frameless Pill Badge */}
        <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
          <div className="bg-stone-950/90 border border-red-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-300 animate-bounce" />
            <span className="text-xs sm:text-sm uppercase font-extrabold text-red-200 font-serif tracking-widest">
              {cupName || "Miyazaki A5 Wagyu Tomahawk Steak"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Caviar Visual (Seamless Background Blended Royal Beluga Caviar & Champagne)
  if (activeType === 'caviar') {
    return (
      <div className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group">
        <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/30 pointer-events-none scale-125" />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
          style={seamlessMaskStyle}
        >
          <img
            src={caviarDishImg}
            alt="Royal Caspian Beluga Caviar & Dom Pérignon"
            className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.12] group-hover:scale-108 transition-transform duration-700"
          />
        </motion.div>

        {/* Floating Frameless Pill Badge */}
        <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
          <div className="bg-stone-950/90 border border-amber-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs sm:text-sm uppercase font-extrabold text-amber-200 font-serif tracking-widest">
              {cupName || "Royal Caspian Beluga Caviar & Vintage Dom Pérignon"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 6. Dessert Visual (Seamless Background Blended Grand Cru Valrhona Chocolate Sphere)
  if (activeType === 'dessert') {
    return (
      <div className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none group">
        <div className="absolute inset-0 rounded-full blur-3xl bg-rose-600/35 pointer-events-none scale-125" />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
          style={seamlessMaskStyle}
        >
          <img
            src={dessertSphereImg}
            alt="Grand Cru Valrhona Gold Leaf Chocolate Sphere"
            className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.12] group-hover:scale-108 transition-transform duration-700"
          />
        </motion.div>

        {/* Floating Frameless Pill Badge */}
        <div className="absolute bottom-2 z-30 pointer-events-none px-4 w-full flex justify-center">
          <div className="bg-stone-950/90 border border-rose-400/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] text-center flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-300 animate-pulse" />
            <span className="text-xs sm:text-sm uppercase font-extrabold text-rose-200 font-serif tracking-widest">
              {cupName || "Grand Cru Valrhona Gold Leaf Chocolate Sphere"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 7. Default 5-Star Dining: Luxury Marble Dining Table with Golden Cloche (Seamless Background Blended, NO Box)
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className="relative w-full max-w-[540px] aspect-square flex flex-col items-center justify-center select-none cursor-pointer group"
    >
      <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/25 pointer-events-none scale-125" />

      {/* NO BOX / NO BORDER / SEAMLESS VIGNETTE MASKING */}
      <div 
        className="relative w-full h-full overflow-hidden pointer-events-none select-none"
        style={seamlessMaskStyle}
      >
        {/* Closed Table Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img 
            src={tableClosedImg} 
            alt="Luxury Marble Table Closed Gold Cloche" 
            className={`w-full h-full object-cover filter brightness-105 contrast-[1.08] transition-opacity duration-600 ${
              isHovered ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
            }`}
          />
        </div>

        {/* Open Table Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
          <img 
            src={tableOpenImg} 
            alt="Michelin Wagyu Steak Revealed" 
            className={`w-full h-full object-cover filter brightness-110 contrast-110 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        </div>

        {/* Floating Gold Sparkle Badges */}
        <div className="absolute bottom-4 z-30 pointer-events-none px-4 w-full flex justify-center">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="closed-table-badge"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-stone-950/85 border border-amber-500/50 backdrop-blur-md px-5 py-2 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.9)] flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="text-xs uppercase font-semibold tracking-widest text-amber-200 font-serif">
                  HOVER TO OPEN CLOCHE
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="open-table-badge"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="bg-stone-950/90 border border-amber-400/60 backdrop-blur-md px-6 py-2.5 rounded-full text-center shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center gap-2.5"
              >
                <Utensils className="w-4 h-4 text-amber-300" />
                <span className="text-xs uppercase font-bold tracking-widest text-amber-200 font-serif">
                  {cupName || 'Imperial Michelin Gastronomy'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroAnimatedElement;
