import React from 'react';
import { Heart, Sparkles, QrCode, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { Language } from '../lib/translations';

interface MenuItemCardProps {
  item: MenuItem;
  lang: Language;
  onAddToCart: (item: MenuItem) => void;
  onOpenAR: (item: MenuItem) => void;
  onSelectFood: (item: MenuItem) => void;
  salesCount?: number;
  isRecentlySold?: boolean;
  recentlySoldTable?: string | number | null;
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  Pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
  Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  Drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  Desserts: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
  'Dry Food': 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=600&q=80',
  'All Fruits': 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80',
  Eggs: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
};

const DEFAULT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

export const MenuItemCard = React.memo(function MenuItemCard({
  item,
  lang,
  onAddToCart,
  onOpenAR,
  onSelectFood,
  salesCount = 0,
  isRecentlySold = false,
  recentlySoldTable = null
}: MenuItemCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const fallback = CATEGORY_FALLBACKS[item.category] || DEFAULT_IMAGE_FALLBACK;
    if (e.currentTarget.src !== fallback) {
      e.currentTarget.src = fallback;
    }
  };

  const detailsLabel = lang === 'en' ? 'View Details' : lang === 'ar' ? 'عرض التفاصيل' : 'বিস্তারিত দেখুন';
  const popularLabel = lang === 'en' ? 'Popular' : lang === 'ar' ? 'مميز' : 'জনপ্রিয়';
  const newLabel = lang === 'en' ? 'New' : lang === 'ar' ? 'جديد' : 'নতুন';
  const specialLabel = lang === 'en' ? 'Special' : lang === 'ar' ? 'خاص' : 'স্পেশাল';
  const arLabel = lang === 'en' ? 'View in 3D AR' : lang === 'ar' ? 'عرض ثلاثي الأبعاد' : '3D AR দেখুন';
  const orderLabel = lang === 'en' ? 'Add to Order' : lang === 'ar' ? 'أضف للطلب' : 'অর্ডার করুন';

  return (
    <div
      className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-cyan-500/40 transition-all duration-200 flex flex-col hover:shadow-md hover:-translate-y-0.5 contain-content"
    >
      {/* Item Image Container */}
      <div 
        onClick={() => onSelectFood(item)}
        className="relative h-28 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer group/img"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 transform-gpu"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        
        {/* Calories */}
        <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-1.5 py-0.5 rounded bg-white/95 border border-slate-200 text-[9px] sm:text-[10px] font-mono text-slate-700 shadow-xs">
          {item.calories || 250} kcal
        </span>

        {/* Flag badges (chef choice, veg, spice) */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 items-end">
          {item.isPopular && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[8px] sm:text-[9px] font-display font-bold tracking-wider uppercase shadow-xs flex items-center gap-0.5">
              <Heart className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
              <span className="hidden xs:inline">{popularLabel}</span>
            </span>
          )}
          {item.isNew && (
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[8px] sm:text-[9px] font-display font-bold tracking-wider uppercase shadow-xs flex items-center gap-0.5">
              <Sparkles className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
              <span className="hidden xs:inline">{newLabel}</span>
            </span>
          )}
          {item.isChefSpecial && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[8px] sm:text-[9px] font-display font-bold tracking-wider uppercase shadow-xs flex items-center gap-0.5">
              <Sparkles className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-slate-950" />
              <span className="hidden xs:inline">{specialLabel}</span>
            </span>
          )}
          {item.isVegetarian && (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] sm:text-[9px] font-display font-bold tracking-wider uppercase shadow-xs">
              Veg
            </span>
          )}
          {item.spiciness && item.spiciness > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase shadow-xs">
              {'🔥'.repeat(item.spiciness)}
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
            {detailsLabel}
          </span>
        </div>
      </div>

      {/* Content text */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div className="space-y-1">
          <div className="flex flex-col xs:flex-row justify-between items-start gap-0.5 sm:gap-1">
            <h4 className="font-display font-bold text-slate-900 text-[11px] sm:text-base group-hover:text-cyan-600 transition-colors line-clamp-1">
              {item.name}
            </h4>
            <span className="font-mono text-cyan-700 font-bold text-[11px] sm:text-base flex-shrink-0">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-slate-600 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Card Buttons: 3D AR view and Add to Order */}
        <div className="flex flex-col gap-1.5 mt-3 sm:mt-5">
          <button
            onClick={() => onOpenAR(item)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[10px] sm:text-[11px] font-display font-bold tracking-wider text-purple-700 transition-colors cursor-pointer active:scale-98"
          >
            <QrCode className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-600" />
            <span>{arLabel}</span>
          </button>

          <button
            onClick={() => onAddToCart(item)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] sm:text-[11px] font-display font-bold tracking-wider transition-colors cursor-pointer active:scale-98 shadow-xs"
          >
            <Plus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>{orderLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default MenuItemCard;
