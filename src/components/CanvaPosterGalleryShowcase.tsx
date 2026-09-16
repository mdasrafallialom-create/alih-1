import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  Check, 
  Crown,
  Palette
} from 'lucide-react';
import { 
  generateSingleTemplate, 
  MiniMenuCardVisualPreview, 
  ExtendedMenuCardTemplate 
} from './RestaurantAdmin/MenuCardStudio';

interface CanvaPosterGalleryShowcaseProps {
  restaurantName?: string;
  selectedTemplateId?: string;
  onSelectTemplate?: (templateId: string) => void;
  onSelectFoodItem?: (dish: any) => void;
  onView3D?: (dish: any) => void;
  lang?: 'en' | 'bn';
}

export const CanvaPosterGalleryShowcase: React.FC<CanvaPosterGalleryShowcaseProps> = ({
  restaurantName = 'BORCELLE RESTAURANT',
  selectedTemplateId,
  onSelectTemplate,
  onSelectFoodItem,
  onView3D,
  lang = 'en'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Generate 80 unique designer templates for the gallery
  const allTemplates = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      return generateSingleTemplate(i + 1);
    });
  }, []);

  // Filter categories
  const CATEGORIES = [
    { id: 'All', label: 'All Categories' },
    { id: 'Fast Food', label: '🍔 Fast Food' },
    { id: 'Pizza', label: '🍕 Pizza & Italian' },
    { id: 'Coffee', label: '☕ Coffee & Bakery' },
    { id: 'Japanese', label: '🍜 Japanese & Asian' },
    { id: 'Steakhouse', label: '🥩 BBQ & Steak' },
    { id: 'Seafood', label: '🦞 Seafood' },
    { id: 'Fine Dining', label: '👑 Fine Dining' },
    { id: 'Organic', label: '🥗 Organic' },
    { id: 'Drinks', label: '🍹 Drinks' },
  ];

  const PLAN_FILTERS = [
    { id: 'All', label: 'All Plans' },
    { id: 'starter', label: '🌱 Starter / Free' },
    { id: 'professional', label: '⚡ Pro' },
    { id: 'premium', label: '👑 Premium VIP' },
  ];

  // Filter templates based on search, category & plan
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((temp) => {
      const name = temp.name.toLowerCase();
      const layout = temp.style.layout;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!name.includes(q) && !layout.includes(q) && !temp.id.includes(q)) return false;
      }

      if (selectedPlanFilter !== 'All') {
        if (!temp.allowedPlans.includes(selectedPlanFilter)) return false;
      }

      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Fast Food' && !['sunset-vibes', 'polaroid'].includes(layout) && !name.includes('burger') && !name.includes('fast')) return false;
        if (selectedCategory === 'Pizza' && !['hand-drawn', 'scalloped'].includes(layout) && !name.includes('pizza') && !name.includes('doodle')) return false;
        if (selectedCategory === 'Coffee' && !['polaroid', 'minimalist-ivory'].includes(layout) && !name.includes('cozy') && !name.includes('coffee')) return false;
        if (selectedCategory === 'Japanese' && !['chalkboard', 'circle-gold'].includes(layout) && !name.includes('japan') && !name.includes('ramen')) return false;
        if (selectedCategory === 'Steakhouse' && !['scalloped', 'sunset-vibes'].includes(layout) && !name.includes('steak') && !name.includes('bbq')) return false;
        if (selectedCategory === 'Seafood' && !['ocean-breeze', 'circle-gold'].includes(layout) && !name.includes('sea') && !name.includes('coastal')) return false;
        if (selectedCategory === 'Fine Dining' && !['royal-crimson', 'circle-gold'].includes(layout) && !name.includes('royal') && !name.includes('crimson')) return false;
        if (selectedCategory === 'Organic' && !['emerald-forest', 'minimalist-ivory'].includes(layout) && !name.includes('emerald') && !name.includes('forest')) return false;
        if (selectedCategory === 'Drinks' && !['circle-gold', 'ocean-breeze'].includes(layout) && !name.includes('gold') && !name.includes('breeze')) return false;
      }

      return true;
    });
  }, [allTemplates, selectedCategory, selectedPlanFilter, searchQuery]);

  const activeTemplateForLightbox = lightboxIndex !== null ? filteredTemplates[lightboxIndex] : null;

  // Handle Keyboard Navigation for Lightbox (Esc, Left Arrow, Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredTemplates.length) % filteredTemplates.length : 0
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredTemplates.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredTemplates.length]);

  const handleUseDesign = (templateId: string) => {
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    } else {
      // Fallback navigation
      window.location.href = `/menu-card-studio?templateId=${encodeURIComponent(templateId)}`;
    }
  };

  return (
    <div className="w-full space-y-6 select-none bg-slate-950 p-4 sm:p-8 rounded-3xl min-h-screen text-slate-100">
      
      {/* =======================================================================
          COMPACT & SIMPLE HEADER (Title, Subtitle, Search & Category Filters)
          ======================================================================= */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-amber-400" />
              <span>Menu Card Gallery</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
              Select a large, readable menu card design to customize for your restaurant.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search design by name or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Controls: Category & Plan Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Plan Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-900 p-1 rounded-2xl border border-slate-800 shrink-0">
            {PLAN_FILTERS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanFilter(plan.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedPlanFilter === plan.id
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/40 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =======================================================================
          LARGE VISUAL MENU CARD GALLERY (CSS Grid Requirement: 3 cols desktop / 4 wide / 2 tablet / 1 mobile)
          ======================================================================= */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-24 space-y-3 border border-dashed border-slate-800 rounded-3xl max-w-lg mx-auto">
          <Palette className="w-10 h-10 text-slate-600 mx-auto opacity-40" />
          <p className="text-sm text-slate-400 font-bold">No menu card designs found</p>
          <p className="text-xs text-slate-500">
            Try clearing your search query or selecting "All Templates".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="menu-card-gallery">
          {filteredTemplates.map((temp, index) => {
            const isSelected = selectedTemplateId === temp.id;

            return (
              <motion.div
                key={temp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
                className={`template-card group relative flex flex-col justify-between cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/50 shadow-2xl'
                    : 'border-slate-800/80 hover:border-amber-500/60 shadow-lg hover:shadow-2xl'
                }`}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Plan Lock / Selected Badge top-right floating inside poster corner */}
                <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none flex items-center gap-1">
                  {isSelected && (
                    <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  )}
                  {temp.allowedPlans.includes('premium') && (
                    <span className="bg-amber-500/90 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm">
                      <Crown className="w-3 h-3 text-slate-950" /> Plan Lock
                    </span>
                  )}
                </div>

                {/* Main Edge-to-Edge Visual Menu Poster */}
                <div className="w-full flex-1 relative overflow-hidden rounded-2xl">
                  <MiniMenuCardVisualPreview 
                    temp={temp} 
                    restaurantName={restaurantName} 
                    isSelected={isSelected}
                    onSelectFoodItem={onSelectFoodItem}
                    onView3D={onView3D}
                  />

                  {/* Quick Hover Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-4 z-30">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(index);
                      }}
                      className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-amber-500/40 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Preview Fullscreen</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseDesign(temp.id);
                      }}
                      className="w-full py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Use This Design</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* =======================================================================
          LIGHTBOX MODAL (Object-fit: contain preview, Prev/Next, Keyboard Esc/Left/Right)
          ======================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && activeTemplateForLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between overflow-hidden select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* 1. Modal Header Bar */}
            <div 
              className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white z-30 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 border border-amber-500/40 text-amber-400 p-2 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black tracking-tight text-white">
                      {activeTemplateForLightbox.name}
                    </h3>
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                      {activeTemplateForLightbox.style.layout}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400">
                    Design {lightboxIndex + 1} of {filteredTemplates.length} • Keyboard: Esc (Close), ← (Prev), → (Next)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleUseDesign(activeTemplateForLightbox.id);
                    setLightboxIndex(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Use This Design</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Close Lightbox (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Lightbox Stage (High-Res Card with object-fit: contain, Navigation Arrows) */}
            <div 
              className="relative flex-1 flex items-center justify-center p-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button (Left Arrow) */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredTemplates.length - 1))}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 bg-slate-900/90 hover:bg-amber-500 border border-slate-700 hover:border-amber-400 text-white hover:text-slate-950 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-200 cursor-pointer group active:scale-90"
                title="Previous Design (← Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Poster Card Container (Using aspect-ratio 3/4 with clear visual details) */}
              <motion.div
                key={activeTemplateForLightbox.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[440px] aspect-[3/4.2] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40 relative flex flex-col justify-between p-4 sm:p-5"
                style={{
                  backgroundColor: activeTemplateForLightbox.style.backgroundColor || '#0d3b36',
                  color: activeTemplateForLightbox.style.textColor || '#ffffff'
                }}
              >
                <MiniMenuCardVisualPreview 
                  temp={activeTemplateForLightbox} 
                  restaurantName={restaurantName}
                  onSelectFoodItem={onSelectFoodItem}
                  onView3D={onView3D}
                />
              </motion.div>

              {/* Next Button (Right Arrow) */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < filteredTemplates.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 bg-slate-900/90 hover:bg-amber-500 border border-slate-700 hover:border-amber-400 text-white hover:text-slate-950 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-200 cursor-pointer group active:scale-90"
                title="Next Design (Right Arrow →)"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* 3. Modal Footer Ribbon */}
            <div 
              className="p-3 bg-slate-950 border-t border-slate-800 z-30 flex items-center justify-between max-w-xl mx-auto w-full text-xs font-mono text-slate-400 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredTemplates.length - 1))}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-amber-400" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                <span className="text-amber-400 font-mono text-sm">{lightboxIndex + 1}</span>
                <span className="text-slate-600">/</span>
                <span>{filteredTemplates.length}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < filteredTemplates.length - 1 ? prev + 1 : 0))}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
