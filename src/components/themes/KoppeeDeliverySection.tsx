import React from 'react';
import { Truck, Banknote, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { THEME_HERO_CONFIGS, COFFEE_SHOP_THEME_IDS } from './KoppeeHeroHeader';

interface KoppeeDeliverySectionProps {
  brandName?: string;
  lang?: string;
  themePresetId?: string;
  previewDeviceView?: 'desktop' | 'tablet' | 'mobile';
}

export const KoppeeDeliverySection: React.FC<KoppeeDeliverySectionProps> = ({
  brandName = 'KOPPEE',
  lang = 'en',
  themePresetId,
  previewDeviceView
}) => {
  // All themes EXCEPT the 13 coffee shop themes receive the 5-Star Michelin Luxury styling
  const isLuxuryTheme = !COFFEE_SHOP_THEME_IDS.includes(themePresetId || '');
  const isAurelisse = themePresetId === 'aurelisse';
  const isOrivelle = isLuxuryTheme && !isAurelisse;
  const cfg = (themePresetId && THEME_HERO_CONFIGS[themePresetId]) || THEME_HERO_CONFIGS['lumivelle'];

  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = previewDeviceView === 'tablet' || (!previewDeviceView && windowWidth >= 640 && windowWidth < 1024);
  const isMobile = previewDeviceView === 'mobile' || (!previewDeviceView && windowWidth < 640);

  return (
    <section 
      id="delivery" 
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        isAurelisse
          ? 'bg-[#EDF7E7] text-[#142412] border-t border-[#2e7d32]/20'
          : isOrivelle 
            ? 'bg-[#0a0907] text-[#FBF8EE] border-t border-amber-400/30' 
            : 'bg-white text-[#2c1e13]'
      }`}
    >
      <div className={`w-full max-w-[1800px] mx-auto ${
        isMobile ? 'px-4 py-8 sm:py-10' : isTablet ? 'px-6 sm:px-8 py-10 sm:py-12' : 'px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-20'
      }`}>
        
        {/* Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
          <span 
            className={`text-xs sm:text-sm font-bold uppercase tracking-widest block ${
              isAurelisse ? 'text-[#2e7d32] font-mono tracking-[0.25em]' : isOrivelle ? 'text-amber-400 font-mono tracking-[0.25em]' : ''
            }`}
            style={{ color: isAurelisse ? '#2e7d32' : isOrivelle ? '#e5c158' : cfg.accentColor }}
          >
            {isAurelisse ? '✦ EXPRESS GOURMET DELIVERY & COD ✦' : isOrivelle ? '✦ DELIVERY & CASH ON DELIVERY ✦' : (lang === 'bn' ? 'ডেলিভারি ও ক্যাশ অন ডেলিভারি সিস্টেম' : 'DELIVERY & CASH ON DELIVERY SYSTEM')}
          </span>
          <h3 
            className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-tight ${
              isAurelisse
                ? 'text-[#142412]'
                : isOrivelle 
                ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                : 'text-[#1e140d]'
            }`}
            style={isOrivelle ? { fontFamily: "'Cinzel', serif" } : undefined}
          >
            {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি ও দ্রুত হোম সার্ভিস' : 'Express Delivery & Cash On Delivery'}
          </h3>
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            isAurelisse ? 'text-[#2a3e26] font-medium' : isOrivelle ? 'text-stone-300/80 font-light' : 'text-[#3e2c1e]/80'
          }`}>
            {lang === 'bn' 
              ? 'পছন্দের খাবার সরাসরি অনলাইনে বা টেবিলে বসে অর্ডার করুন এবং সহজে ক্যাশ অন ডেলিভারি (COD) অথবা বিকাশ/নগদে নিশ্চিন্তে মূল্য পরিশোধ করুন।' 
              : `Order your favourite dishes from ${brandName} online or at table, and conveniently pay with Cash on Delivery or Mobile Banking upon receiving your hot meal.`
            }
          </p>
        </div>

        {/* 4 Feature Cards - 1-column on Mobile, 2x2 on Tablet, 4 across on Desktop */}
        <div className={`grid gap-4 sm:gap-6 ${
          isMobile 
            ? 'grid-cols-1' 
            : isTablet 
            ? 'grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {/* Card 1: Cash on Delivery */}
          <div className={`p-6 sm:p-7 rounded-3xl transition-all space-y-3 relative group hover:-translate-y-1 ${
            isAurelisse
              ? 'bg-[#EDF7E7] border-2 border-[#2e7d32]/35 shadow-lg hover:shadow-2xl hover:border-[#2e7d32]/70 text-[#142412]'
              : isOrivelle 
              ? 'bg-stone-950/60 backdrop-blur-md border border-amber-400/25 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]' 
              : `bg-white border ${cfg.accentBorderClass} shadow-md hover:shadow-xl`
          }`}>
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                isAurelisse
                  ? 'bg-[#2e7d32]/15 text-[#2e7d32] border border-[#2e7d32]/30'
                  : isOrivelle ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : ''
              }`}
              style={!isOrivelle && !isAurelisse ? { backgroundColor: `${cfg.accentColor}20`, color: cfg.accentColor } : undefined}
            >
              <Banknote className="w-6 h-6" />
            </div>
            <h4 className={`text-base sm:text-lg font-bold ${
              isAurelisse ? 'text-[#142412] group-hover:text-[#2e7d32] transition-colors' : isOrivelle ? 'text-amber-100 group-hover:text-amber-300 transition-colors' : 'text-[#1e140d]'
            }`}>
              {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash On Delivery (COD)'}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isAurelisse ? 'text-[#2a3e26] font-normal' : isOrivelle ? 'text-stone-300/80 font-light' : 'text-[#3e2c1e]/75'
            }`}>
              {lang === 'bn' ? 'খাবার হাতে পাওয়ার পর নিশ্চিন্তে ক্যাশে বা বিকাশ/নগদে বিল পরিশোধের সুবিধা।' : 'Pay conveniently upon receiving your hot meal directly at home or at table.'}
            </p>
            <div className={`pt-2 flex items-center gap-1.5 text-[11px] font-bold ${
              isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-400' : ''
            }`} style={!isOrivelle && !isAurelisse ? { color: cfg.accentColor } : undefined}>
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: isAurelisse ? '#2e7d32' : isOrivelle ? '#fef08a' : cfg.accentColor }} />
              <span>{lang === 'bn' ? '১০০% বিশ্বস্ত পেমেন্ট' : '100% Secure Payment'}</span>
            </div>
          </div>

          {/* Card 2: Doorstep Express Delivery */}
          <div className={`p-6 sm:p-7 rounded-3xl transition-all space-y-3 relative group hover:-translate-y-1 ${
            isAurelisse
              ? 'bg-[#EDF7E7] border-2 border-[#2e7d32]/35 shadow-lg hover:shadow-2xl hover:border-[#2e7d32]/70 text-[#142412]'
              : isOrivelle 
              ? 'bg-stone-950/60 backdrop-blur-md border border-amber-400/25 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]' 
              : `bg-white border ${cfg.accentBorderClass} shadow-md hover:shadow-xl`
          }`}>
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                isAurelisse
                  ? 'bg-[#2e7d32]/15 text-[#2e7d32] border border-[#2e7d32]/30'
                  : isOrivelle ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : ''
              }`}
              style={!isOrivelle && !isAurelisse ? { backgroundColor: `${cfg.accentColor}20`, color: cfg.accentColor } : undefined}
            >
              <Truck className="w-6 h-6" />
            </div>
            <h4 className={`text-base sm:text-lg font-bold ${
              isAurelisse ? 'text-[#142412] group-hover:text-[#2e7d32] transition-colors' : isOrivelle ? 'text-amber-100 group-hover:text-amber-300 transition-colors' : 'text-[#1e140d]'
            }`}>
              {lang === 'bn' ? 'হোম ও টেবিল ডেলিভারি' : 'Doorstep & Table Express'}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isAurelisse ? 'text-[#2a3e26] font-normal' : isOrivelle ? 'text-stone-300/80 font-light' : 'text-[#3e2c1e]/75'
            }`}>
              {lang === 'bn' ? 'রেস্তোরাঁর সেরা স্বাদের খাবার আপনার বাসা কিংবা রেস্তোরাঁর টেবিলে পৌঁছে যাবে দ্রুত।' : 'Fast hot delivery right to your home, office, or designated dining table.'}
            </p>
            <div className={`pt-2 flex items-center gap-1.5 text-[11px] font-bold ${
              isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-400' : 'text-[#3e271a]'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-300' : 'text-[#DA9F93]'}`} />
              <span>{lang === 'bn' ? 'সর্বোচ্চ গতি ও যত্ন' : 'Fast Kitchen Dispatch'}</span>
            </div>
          </div>

          {/* Card 3: Safe & Sealed Packaging */}
          <div className={`p-6 sm:p-7 rounded-3xl transition-all space-y-3 relative group hover:-translate-y-1 ${
            isAurelisse
              ? 'bg-[#EDF7E7] border-2 border-[#2e7d32]/35 shadow-lg hover:shadow-2xl hover:border-[#2e7d32]/70 text-[#142412]'
              : isOrivelle 
              ? 'bg-stone-950/60 backdrop-blur-md border border-amber-400/25 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]' 
              : 'bg-white border border-[#DA9F93]/30 shadow-md hover:shadow-xl'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              isAurelisse
                ? 'bg-[#2e7d32]/15 text-[#2e7d32] border border-[#2e7d32]/30'
                : isOrivelle ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-emerald-500/15 text-emerald-700'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className={`text-base sm:text-lg font-bold ${
              isAurelisse ? 'text-[#142412] group-hover:text-[#2e7d32] transition-colors' : isOrivelle ? 'text-amber-100 group-hover:text-amber-300 transition-colors' : 'text-[#1e140d]'
            }`}>
              {lang === 'bn' ? '১০০% হাইজিন প্যাকেজিং' : 'Sealed Hygienic Packaging'}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isAurelisse ? 'text-[#2a3e26] font-normal' : isOrivelle ? 'text-stone-300/80 font-light' : 'text-[#3e2c1e]/75'
            }`}>
              {lang === 'bn' ? 'পরিবেশবান্ধব ও সিলড প্যাকেজিং যা খাবারের উষ্ণতা এবং তাজা স্বাদ বজায় রাখে।' : 'Thermal eco-friendly sealed packaging preserving heat, freshness, and original flavor.'}
            </p>
            <div className={`pt-2 flex items-center gap-1.5 text-[11px] font-bold ${
              isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-400' : 'text-emerald-800'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-300' : 'text-emerald-600'}`} />
              <span>{lang === 'bn' ? 'ফুড-গ্রেড সিলড বক্স' : 'Food-Grade Sealed'}</span>
            </div>
          </div>

          {/* Card 4: Instant Status Updates */}
          <div className={`p-6 sm:p-7 rounded-3xl transition-all space-y-3 relative group hover:-translate-y-1 ${
            isAurelisse
              ? 'bg-[#EDF7E7] border-2 border-[#2e7d32]/35 shadow-lg hover:shadow-2xl hover:border-[#2e7d32]/70 text-[#142412]'
              : isOrivelle 
              ? 'bg-stone-950/60 backdrop-blur-md border border-amber-400/25 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]' 
              : 'bg-white border border-[#DA9F93]/30 shadow-md hover:shadow-xl'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              isAurelisse
                ? 'bg-[#2e7d32]/15 text-[#2e7d32] border border-[#2e7d32]/30'
                : isOrivelle ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-cyan-500/15 text-cyan-700'
            }`}>
              <Clock className="w-6 h-6" />
            </div>
            <h4 className={`text-base sm:text-lg font-bold ${
              isAurelisse ? 'text-[#142412] group-hover:text-[#2e7d32] transition-colors' : isOrivelle ? 'text-amber-100 group-hover:text-amber-300 transition-colors' : 'text-[#1e140d]'
            }`}>
              {lang === 'bn' ? 'লাইভ অর্ডার ট্র্যাকিং' : 'Real-time Order Status'}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isAurelisse ? 'text-[#2a3e26] font-normal' : isOrivelle ? 'text-stone-300/80 font-light' : 'text-[#3e2c1e]/75'
            }`}>
              {lang === 'bn' ? 'রান্নাঘর থেকে ডেলিভারি পর্যন্ত প্রতিটি ধাপ সরাসরি ফোন স্ক্রিনে দেখুন।' : 'Live status tracking from kitchen chef prep to rider delivery dispatch.'}
            </p>
            <div className={`pt-2 flex items-center gap-1.5 text-[11px] font-bold ${
              isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-400' : 'text-cyan-800'
            }`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isAurelisse ? 'text-[#2e7d32]' : isOrivelle ? 'text-amber-300' : 'text-cyan-600'}`} />
              <span>{lang === 'bn' ? 'রিয়েল-টাইম আপডেট' : 'Live SMS & Screen Tracking'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default KoppeeDeliverySection;
