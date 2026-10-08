import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, X, Check, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';

interface InteractiveDiagonalTiltedCardsVisualProps {
  accentColor?: string;
  images?: string[];
  lang?: string;
  onEditStateChange?: (isEditing: boolean) => void;
}

const DEFAULT_BAGEL_IMAGES = [
  'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop', // 1. Smoked salmon lox with scallion cream cheese
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop', // 2. Bacon, egg & cheddar melt sandwich
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop', // 3. Toasted everything pastrami crunch bagel
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop'  // 4. Artisan hearth sourdough bread & wheat stalks
];

const PRESET_GALLERY = [
  {
    name: 'Smoked Salmon Lox',
    url: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop'
  },
  {
    name: 'Crispy Bacon & Egg Melt',
    url: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop'
  },
  {
    name: 'Toasted Pastrami Crunch',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop'
  },
  {
    name: 'Artisan Hearth Sourdough',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop'
  },
  {
    name: 'Rustic Hearth Boiled Bagel',
    url: 'https://images.unsplash.com/photo-1587538644342-fc14ab844f30?w=800&auto=format&fit=crop'
  },
  {
    name: 'Avocado & Herb Cream Cheese',
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop'
  }
];

const CARD_DATA = [
  {
    en: 'Smoked Salmon Lox',
    bn: 'Smoked Salmon Lox',
    tag: '#1 Bestseller',
    leftClass: 'left-[0%]',
    bottomClass: 'bottom-[2%]',
    zIndex: 10
  },
  {
    en: 'Bacon & Egg Melt',
    bn: 'Bacon & Egg Melt',
    tag: '#2 Signature',
    leftClass: 'left-[26%] sm:left-[27%]',
    bottomClass: 'bottom-[15%] sm:bottom-[16%]',
    zIndex: 20
  },
  {
    en: 'Toasted Pastrami',
    bn: 'Toasted Pastrami',
    tag: '#3 Chef Cut',
    leftClass: 'left-[52%] sm:left-[54%]',
    bottomClass: 'bottom-[28%] sm:bottom-[30%]',
    zIndex: 30
  },
  {
    en: 'Artisan Sourdough',
    bn: 'Artisan Sourdough',
    tag: '#4 Hearth-Boiled',
    leftClass: 'left-[76%] sm:left-[80%]',
    bottomClass: 'bottom-[41%] sm:bottom-[44%]',
    zIndex: 40
  }
];

export const InteractiveDiagonalTiltedCardsVisual: React.FC<InteractiveDiagonalTiltedCardsVisualProps> = ({
  accentColor = '#b91c1c',
  images = DEFAULT_BAGEL_IMAGES,
  lang = 'en',
  onEditStateChange
}) => {
  const [cardImages, setCardImages] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('emberion_hero_card_images');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 4) {
            return parsed;
          }
        }
      } catch {
        // Ignore fallback
      }
    }
    return images && images.length >= 4 ? images : DEFAULT_BAGEL_IMAGES;
  });

  const [activeEditingIndex, setActiveEditingIndex] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent component about upload/edit focus mode to hide header/navbar
  useEffect(() => {
    if (onEditStateChange) {
      onEditStateChange(activeEditingIndex !== null);
    }
  }, [activeEditingIndex, onEditStateChange]);

  useEffect(() => {
    return () => {
      if (onEditStateChange) {
        onEditStateChange(false);
      }
    };
  }, [onEditStateChange]);

  // Sync to localStorage
  const saveImages = (newImgs: string[]) => {
    setCardImages(newImgs);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('emberion_hero_card_images', JSON.stringify(newImgs));
      } catch {
        // Ignore
      }
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleOpenEdit = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveEditingIndex(index);
    setUrlInput(cardImages[index] || '');
  };

  const handleCloseEdit = () => {
    setActiveEditingIndex(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeEditingIndex === null) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const updated = [...cardImages];
        updated[activeEditingIndex] = result;
        saveImages(updated);
        showToast('Photo uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim() || activeEditingIndex === null) return;
    const updated = [...cardImages];
    updated[activeEditingIndex] = urlInput.trim();
    saveImages(updated);
    showToast('Image URL applied successfully!');
  };

  const handlePickPreset = (presetUrl: string) => {
    if (activeEditingIndex === null) return;
    const updated = [...cardImages];
    updated[activeEditingIndex] = presetUrl;
    saveImages(updated);
    showToast('Preset image selected!');
  };

  const handleResetCards = () => {
    saveImages(DEFAULT_BAGEL_IMAGES);
    showToast('Reset to default photos');
  };

  return (
    <div className="relative w-full min-h-[420px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[600px] max-w-[850px] flex items-center justify-center select-none overflow-visible py-4 sm:py-6">
      {/* Hidden File Input for direct uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Warm Ambient Glow behind the rising parallel diagonal cards */}
      <div className="absolute inset-0 rounded-full blur-3xl bg-amber-500/10 pointer-events-none scale-110" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100000] px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-amber-400/50 backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ========================================================================================
        4 PARALLEL DIAGONAL CARDS (MATCHING USER SCREENSHOT 1):
        - Ascending from bottom-left corner up towards top-right corner.
        - Spaced out ("ফাঁকা ফাঁকা") so each card is clearly visible and not overcrowded.
        - ALL 4 CARDS TILTED UNIFORMLY AT THE EXACT SAME PARALLEL ANGLE (-13°).
        - Edge-to-edge bright food imagery with solid white border and soft drop shadow.
        - Click card or sleek "আপলোড ফটো" pill to open full upload mode.
        ========================================================================================
      */}
      <div className="relative w-full h-[400px] sm:h-[460px] md:h-[520px] lg:h-[580px] flex items-center justify-start overflow-visible">
        {CARD_DATA.map((card, index) => {
          const imgSrc = cardImages[index] || DEFAULT_BAGEL_IMAGES[index];
          return (
            <motion.div
              key={index}
              onClick={(e) => handleOpenEdit(index, e)}
              initial={{ opacity: 0, scale: 0.88, y: 40, rotate: -13 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -13 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.07, 
                y: -14, 
                rotate: -11,
                zIndex: 60,
                boxShadow: '0 28px 60px -10px rgba(15,41,66,0.38)'
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: index * 0.08 }}
              style={{ zIndex: card.zIndex }}
              className={`group absolute ${card.leftClass} ${card.bottomClass} w-[115px] sm:w-[145px] md:w-[170px] lg:w-[195px] aspect-[9/13.5] rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden border-[3px] border-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] bg-[#f8fafc] cursor-pointer transition-shadow duration-300`}
            >
              {/* Food Image */}
              <img 
                src={imgSrc} 
                alt={card.en} 
                className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.04] group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />

              {/* Gentle bottom shade for subtle contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none" />

              {/* Top Tag Badge */}
              <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                <span className="px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-[8px] sm:text-[9px] font-mono font-bold text-amber-300 border border-white/20 shadow-xs">
                  {card.tag}
                </span>
              </div>

              {/* UPLOAD PHOTO SLEEK PILL BUTTON */}
              <button
                type="button"
                onClick={(e) => handleOpenEdit(index, e)}
                className="absolute top-2.5 right-2.5 z-30 px-2 sm:px-2.5 py-1 rounded-full bg-black/60 hover:bg-[#b91c1c] text-white font-extrabold text-[8px] sm:text-[9px] uppercase tracking-wider shadow-md flex items-center gap-1 border border-white/35 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 group/btn"
                title={'Upload Photo'}
              >
                <Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 group-hover/btn:scale-110" />
                <span className="hidden min-[380px]:inline font-extrabold">
                  {'Upload'}
                </span>
              </button>

              {/* Bottom Card Title */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
                <p className="text-[10px] sm:text-xs font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                  {card.en}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= FOCUSED EXPANDED UPLOAD PHOTO VIEW ================= */}
      {/* When clicked, card becomes BIG, top header navbar is hidden, and "আপলোড ছবি" is prominent */}
      <AnimatePresence>
        {activeEditingIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#07111e]/95 backdrop-blur-2xl flex flex-col items-center justify-start overflow-y-auto px-4 py-6 sm:py-8"
            onClick={handleCloseEdit}
          >
            {/* Top Bar with Clear "আপলোড ছবি" Headline & Close */}
            <div 
              className="w-full max-w-5xl flex items-center justify-between pb-4 border-b border-white/10 mb-6 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#b91c1c] text-white flex items-center justify-center shadow-lg shadow-red-950/50">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide flex items-center gap-2">
                    <span>{'Upload Image'}</span>
                    <span className="text-xs sm:text-sm font-mono font-normal px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                      Card #{activeEditingIndex + 1}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    {'Card enlarged for upload — choose from device or select a preset'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{'Back'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-red-600 text-white transition-all cursor-pointer border border-white/20"
                  title={'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Grid: BIG ENLARGED CARD on Left, Upload Controls on Right */}
            <div 
              className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center my-auto py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* LEFT: BIG ENLARGED CARD */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group/big relative w-[250px] sm:w-[290px] md:w-[320px] aspect-[9/13.5] rounded-[2.5rem] overflow-hidden border-4 border-white/90 shadow-[0_30px_70px_rgba(0,0,0,0.7)] bg-[#0f2942] cursor-pointer transition-all hover:scale-[1.02]"
                  title={'Click to change photo'}
                >
                  <img
                    src={cardImages[activeEditingIndex]}
                    alt="Enlarged Card"
                    className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 group-hover/big:via-black/40 transition-colors" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-950/90 text-xs font-mono font-bold text-amber-300 border border-white/25 shadow-lg">
                      {CARD_DATA[activeEditingIndex]?.tag}
                    </span>
                  </div>

                  {/* Center Hover Action Banner */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-80 group-hover/big:opacity-100 transition-opacity p-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#b91c1c] text-white flex items-center justify-center shadow-2xl border-2 border-white group-hover/big:scale-110 transition-transform">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-white bg-black/60 px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm shadow-md">
                      {'Tap to Upload Photo'}
                    </span>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
                    <p className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-lg">
                      {CARD_DATA[activeEditingIndex]?.en}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 font-medium text-center">
                  {'Click directly on the photo above to upload from device'}
                </p>
              </div>

              {/* RIGHT: UPLOAD OPTIONS PANEL */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-[#0f2942] space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0f2942]">
                    {'Photo Upload Options'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {'Choose one of the methods below to update this card photo'}
                  </p>
                </div>

                {/* Method 1: Upload from Device (Highlighted Primary Button) */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#b91c1c] text-white text-xs font-black flex items-center justify-center">১</span>
                    <label className="text-xs sm:text-sm font-extrabold text-[#0f2942] uppercase tracking-wide">
                      {'Direct Device File Upload'}
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#0f2942] hover:bg-[#1a3d60] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>{'Browse & Upload Photo'}</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center">
                    <span>Supports JPG, PNG, WEBP images</span>
                  </p>
                </div>

                {/* Method 2: Image URL input */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-black flex items-center justify-center">২</span>
                    <label className="text-xs sm:text-sm font-extrabold text-[#0f2942] uppercase tracking-wide">
                      {'Paste Image Web Link (URL)'}
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-[#0f2942] focus:outline-none focus:border-[#0f2942] focus:ring-2 focus:ring-[#0f2942]/20"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrl}
                      className="px-4 py-2.5 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      {'Apply'}
                    </button>
                  </div>
                </div>

                {/* Method 3: Handpicked Bakery Presets */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center">৩</span>
                      <label className="text-xs sm:text-sm font-extrabold text-[#0f2942] uppercase tracking-wide flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>{'Pick From Preset Gallery'}</span>
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetCards}
                      className="text-xs font-bold text-slate-500 hover:text-[#b91c1c] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{'Reset All'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_GALLERY.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePickPreset(item.url)}
                        className="group/thumb relative aspect-square rounded-xl overflow-hidden border-2 border-slate-200 hover:border-[#b91c1c] transition-all hover:scale-105 shadow-xs cursor-pointer"
                        title={item.name}
                      >
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                          <span className="text-[8px] font-bold text-white leading-tight">{item.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Done / Close Button */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseEdit}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{'Save & Finish'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveDiagonalTiltedCardsVisual;
