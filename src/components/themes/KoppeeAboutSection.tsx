import React from 'react';
import { Coffee, CheckCircle2, ArrowRight, Edit3, Crown, Sparkles, Award } from 'lucide-react';
import { THEME_HERO_CONFIGS, COFFEE_SHOP_THEME_IDS } from './KoppeeHeroHeader';
import luxuryInteriorImg from '../../assets/images/luxury_michelin_interior_1790508733625.jpg';
import { OrivelleGeometricDivider } from './OrivelleGeometricDivider';

interface KoppeeAboutSectionProps {
  brandName?: string;
  brandLogoUrl?: string;
  brandDescription?: string;
  aboutUsTitle?: string;
  aboutUsSubtitle?: string;
  aboutUsText?: string;
  aboutUsImage?: string;
  aboutUsFeatures?: string[];
  onReserveClick?: () => void;
  onMenuClick?: () => void;
  onOpenAdmin?: () => void;
  onEditClick?: () => void;
  lang?: string;
  themePresetId?: string;
  previewDeviceView?: 'desktop' | 'tablet' | 'mobile';
}

export const KoppeeAboutSection: React.FC<KoppeeAboutSectionProps> = ({
  brandName = 'My Restaurant',
  brandLogoUrl,
  brandDescription,
  aboutUsTitle,
  aboutUsSubtitle = 'ABOUT OUR RESTAURANT',
  aboutUsText,
  aboutUsImage,
  aboutUsFeatures,
  onReserveClick,
  onMenuClick,
  onOpenAdmin,
  onEditClick,
  lang = 'en',
  themePresetId,
  previewDeviceView
}) => {
  const isDemoOrPlaceholderBrand = (name?: string) => {
    if (!name) return true;
    const lower = name.trim().toLowerCase();
    return lower === 'sahinsh' || 
           lower === 'askul' || 
           lower === 'koppee' || 
           lower === 'velmora dining' || 
           lower === 'velmora' || 
           lower === 'lunavere' || 
           lower === "l'aura webar restaurant" ||
           lower === 'the golden fork';
  };

  const effectiveBrandName = isDemoOrPlaceholderBrand(brandName)
    ? 'My Restaurant'
    : brandName!.trim();
  
  // All themes EXCEPT the 13 coffee shop themes receive the 5-Star Michelin Luxury styling
  const isLuxuryTheme = !COFFEE_SHOP_THEME_IDS.includes(themePresetId || '');
  const isOrivelle = isLuxuryTheme;
  const cfg = (themePresetId && THEME_HERO_CONFIGS[themePresetId]) || THEME_HERO_CONFIGS['lumivelle'];
  const displayTitle = aboutUsTitle || (lang === 'bn' ? (isLuxuryTheme ? `কেন ${effectiveBrandName}-এ ডাইন করবেন?` : 'কেন আমাদের কাছে খাবেন?') : (isLuxuryTheme ? `Why Dine at ${effectiveBrandName}?` : 'Why Dine With Us?'));
  
  const defaultStory = brandDescription || (isLuxuryTheme
    ? (lang === 'bn'
        ? `মিশেলিন ৩-স্টার মাস্টার শেফদের নেতৃত্বে এক অনন্য গুরমে ডাইনিং অভিজ্ঞতা। ${effectiveBrandName}-এ উপভোগ করুন ২৪ ক্যারেট ভোজ্য গোল্ড লিফ, গ্র্যান্ড রিজার্ভ অসিয়াত্রা ক্যাভিয়ার, মিয়াজাকি এ৫ ওয়াগিউ এবং এক্সক্লুসিভ থ্রিডি ইন্টারেক্টিভ ওয়েব-এআর প্রিভিউ।`
        : `Redefining haute cuisine and 5-star Michelin luxury. Discover our exclusive master chef-curated tasting courses, 24k gold leaf infusions, and 3D interactive WebAR food previews. At ${effectiveBrandName}, we take pride in serving hand-selected, freshly prepared grand reserve meals crafted with precision and passion.`)
    : `Redefining luxury dining experiences. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews. At ${effectiveBrandName}, we take pride in serving hand-selected, freshly prepared meals crafted with precision and passion.`);
  
  const storyText = aboutUsText || defaultStory;
  const imageSrc = aboutUsImage || (isLuxuryTheme 
    ? luxuryInteriorImg 
    : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop');

  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = previewDeviceView === 'tablet' || (!previewDeviceView && windowWidth >= 640 && windowWidth < 1024);
  const isMobile = previewDeviceView === 'mobile' || (!previewDeviceView && windowWidth < 640);
  const isDesktop = previewDeviceView === 'desktop' || (!previewDeviceView && windowWidth >= 1024);

  // Default features with tick marks
  const defaultFeatures = isOrivelle
    ? (lang === 'bn'
        ? [
            '২৪ ক্যারেট গোল্ড ক্যাভিয়ার ও আলবা ট্রাফেল',
            '৩-স্টার মিশেলিন শেফ-কিউরেটেড মেনু',
            '৩ডি ইন্টারেক্টিভ ওয়েব-এআর হলোগ্রাম',
            'প্রাইভেট ভিআইপি সেলন ও সোমেলিয়ার ওয়াইন'
          ]
        : [
            '24K Gold Caviar & White Alba Truffle',
            '3-Star Michelin Chef-Curated Repertoire',
            '3D WebAR Interactive Table Holograms',
            'Private VIP Salon & Grand Reserve Sommelier'
          ])
    : (lang === 'bn' 
        ? [
            '১০০% তাজা অর্গানিক উপাদান',
            'শেফ-কিউরেটেড গুরমে মেনু',
            '৩ডি ইন্টারেক্টিভ ওয়েব-এআর ফুড প্রিভিউ',
            'দ্রুত হোম ডেলিভারি ও টেবিল অর্ডারিং'
          ]
        : [
            '100% Fresh Organic Ingredients',
            'Chef-Curated Gourmet Menu',
            '3D Interactive WebAR Food Previews',
            'Fast Home Delivery & Table Ordering'
          ]);

  const featuresList = (aboutUsFeatures && aboutUsFeatures.length > 0) ? aboutUsFeatures : defaultFeatures;

  const getLogoInitials = (name: string): [string, string] => {
    if (isOrivelle) return ["O", "H"];
    if (!name || isDemoOrPlaceholderBrand(name)) return ["M", "R"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanName || isDemoOrPlaceholderBrand(cleanName)) return ["M", "R"];
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return ["M", "R"];
  };

  const [initial1, initial2] = getLogoInitials(effectiveBrandName);

  return (
    <section id="about" className={`relative w-full overflow-hidden transition-colors duration-500 ${
      isOrivelle ? 'bg-[#0a0907] text-[#FBF8EE]' : 'bg-white text-[#2c1e13]'
    }`}>
      {isOrivelle && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,193,88,0.1),_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0907] via-[#12100d] to-[#0a0907] opacity-98 -z-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </>
      )}
      <div className={`w-full max-w-[1800px] mx-auto ${
        isTablet 
          ? 'px-6 sm:px-8 py-10 sm:py-12' 
          : isMobile 
          ? 'px-4 py-8' 
          : 'px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-20'
      }`}>
        
        {/* Quick Edit Section Top Action Bar */}
        {(onEditClick || onOpenAdmin) && (
          <div className="flex items-center justify-between pb-3.5 mb-6 sm:mb-8 border-b border-[#2c1e13]/10">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8c6d53] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{lang === 'bn' ? 'স্টোরি ও পরিচিতি সেকশন' : 'About & Story Section'}</span>
            </div>
            <button
              type="button"
              onClick={onEditClick || onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95 group"
              title={lang === 'bn' ? '"কেন আমাদের কাছে খাবেন?" সেকশনটি এডিট করুন' : 'Edit "Why Dine With Us?" Section'}
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>{lang === 'bn' ? 'এই সেকশনটি এডিট করুন' : 'Edit Section'}</span>
            </button>
          </div>
        )}

        {/* A. TABLET VIEW */}
        {isTablet ? (
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Left Column: Image with Overlay Badge */}
            <div className="col-span-5 relative">
              <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                isOrivelle 
                  ? 'border-2 border-amber-400/60 shadow-[0_0_35px_rgba(229,193,88,0.25)] bg-stone-950' 
                  : `border-2 ${cfg.accentBorderClass} bg-white`
              }`}>
                {/* 24K Gold Corner Geometric Brackets for Orivelle */}
                {isOrivelle && (
                  <>
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300 z-10 pointer-events-none" />
                  </>
                )}
                <img 
                  src={imageSrc} 
                  alt={displayTitle}
                  className="w-full h-[320px] sm:h-[360px] object-cover hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Bottom Overlay Badge: 24k Gold Imperial Crest for Orivelle vs Artisanal Badge for Theme #1 */}
                {isOrivelle ? (
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-950/95 backdrop-blur-md border border-amber-400/50 text-amber-100 shadow-2xl flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 flex items-center justify-center text-stone-950 font-black text-xs shrink-0 shadow-lg">
                      👑
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono tracking-widest text-amber-300 uppercase block truncate">
                        {lang === 'bn' ? '✦ ওরিভেল রিজার্ভ ✦' : '✦ ORIVELLE RESERVE ✦'}
                      </span>
                      <p className="text-xs font-bold text-amber-100 leading-tight line-clamp-1" style={{ fontFamily: "'Cinzel', serif" }}>
                        {lang === 'bn' ? '৩-স্টার মিশেলিন রাজকীয় স্বাদ' : '3-Star Michelin Haute Gastronomy'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#1e140d]/92 backdrop-blur-md border border-white/10 text-white shadow-lg flex items-center gap-2.5">
                    <div 
                      className="w-9 h-9 rounded-lg font-black text-xs flex items-center justify-center shrink-0 shadow select-none uppercase"
                      style={{ backgroundColor: cfg.accentColor, color: '#1e140d' }}
                    >
                      {initial1}{initial2}
                    </div>
                    <div className="min-w-0">
                      <span 
                        className="text-[9px] font-extrabold uppercase tracking-wider block truncate"
                        style={{ color: cfg.accentColor }}
                      >
                        {lang === 'bn' ? 'আর্টিসানাল কোয়ালিটি' : 'ARTISANAL QUALITY'}
                      </span>
                      <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                        {lang === 'bn' ? 'তাজা ও অর্গানিক গুরমে রেসিপি' : 'Fresh & Organic Gourmet Recipes'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Title, Features Checklist & CTA Buttons */}
            <div className="col-span-7 space-y-4 text-left pr-4">
              <div className="space-y-1.5">
                <span 
                  className={`text-xs font-bold uppercase tracking-widest block ${
                    isOrivelle ? 'text-amber-400 font-mono tracking-[0.25em]' : ''
                  }`}
                  style={{ color: isOrivelle ? '#e5c158' : cfg.accentColor }}
                >
                  {isOrivelle ? `✦ ${aboutUsSubtitle} ✦` : aboutUsSubtitle}
                </span>
                <h2 
                  className={`text-2xl sm:text-3xl font-black leading-tight ${
                    isOrivelle 
                      ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                      : 'text-[#1e140d]'
                  }`}
                  style={isOrivelle ? { fontFamily: "'Cinzel', serif" } : undefined}
                >
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isOrivelle ? 'text-stone-300 font-light' : 'text-[#3e2c1e]/85'
                  }`}>
                    {storyText}
                  </p>
                )}
              </div>

              {/* Checklist items */}
              <div className="space-y-2.5 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div 
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                        isOrivelle
                          ? 'bg-amber-400/15 border-amber-400/50 shadow-[0_0_8px_rgba(229,193,88,0.2)]'
                          : ''
                      }`}
                      style={!isOrivelle ? { backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` } : undefined}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: isOrivelle ? '#fef08a' : cfg.accentColor }} />
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${
                      isOrivelle ? 'text-amber-100/90' : 'text-[#2c1e13]'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,193,88,0.4)] hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    : `px-5 py-2.5 ${cfg.primaryBtnClass} text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer rounded-xl`
                  }
                >
                  <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-stone-950/80 border border-amber-400/50 text-amber-200 text-xs font-black uppercase tracking-wider hover:bg-stone-900 transition-all cursor-pointer"
                    : `px-5 py-2.5 ${cfg.secondaryBtnClass} text-xs font-bold transition-all cursor-pointer rounded-xl`
                  }
                >
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
                </button>

                {(onEditClick || onOpenAdmin) && (
                  <button
                    type="button"
                    onClick={onEditClick || onOpenAdmin}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    title={lang === 'bn' ? 'এই সেকশনটি এডিট করুন' : 'Edit Section'}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'bn' ? 'এডিট' : 'Edit'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : isMobile ? (
          /* B. MOBILE VIEW */
          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className={`relative rounded-2xl overflow-hidden shadow-lg ${
                isOrivelle 
                  ? 'border-2 border-amber-400/60 shadow-[0_0_25px_rgba(229,193,88,0.2)] bg-stone-950' 
                  : `border ${cfg.accentBorderClass} bg-white`
              }`}>
                {/* 24K Gold Corner Brackets for Orivelle */}
                {isOrivelle && (
                  <>
                    <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-300 z-10 pointer-events-none" />
                  </>
                )}
                <img 
                  src={imageSrc} 
                  alt={displayTitle}
                  className="w-full h-[260px] object-cover" 
                />
                {isOrivelle ? (
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-950/95 backdrop-blur-md border border-amber-400/50 text-amber-100 shadow-md flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 flex items-center justify-center text-stone-950 font-black text-xs shrink-0 shadow">
                      👑
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono tracking-widest text-amber-300 uppercase block truncate">
                        {lang === 'bn' ? '✦ ওরিভেল রিজার্ভ ✦' : '✦ ORIVELLE RESERVE ✦'}
                      </span>
                      <p className="text-[11px] font-bold text-amber-100 leading-tight truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                        {lang === 'bn' ? '৩-স্টার মিশেলিন রাজকীয় স্বাদ' : '3-Star Michelin Haute Gastronomy'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#1e140d]/92 backdrop-blur-md border border-white/10 text-white shadow-md flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center shrink-0 shadow select-none uppercase"
                      style={{ backgroundColor: cfg.accentColor, color: '#1e140d' }}
                    >
                      {initial1}{initial2}
                    </div>
                    <div className="min-w-0">
                      <span 
                        className="text-[8px] font-extrabold uppercase tracking-wider block truncate"
                        style={{ color: cfg.accentColor }}
                      >
                        {lang === 'bn' ? 'আর্টিসানাল কোয়ালিটি' : 'ARTISANAL QUALITY'}
                      </span>
                      <p className="text-[11px] font-bold text-white leading-tight truncate">
                        {lang === 'bn' ? 'তাজা ও অর্গানিক গুরমে রেসিপি' : 'Fresh & Organic Gourmet Recipes'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <span 
                  className={`text-xs font-bold uppercase tracking-widest block ${
                    isOrivelle ? 'text-amber-400 font-mono tracking-[0.2em]' : ''
                  }`}
                  style={{ color: isOrivelle ? '#e5c158' : cfg.accentColor }}
                >
                  {isOrivelle ? `✦ ${aboutUsSubtitle} ✦` : aboutUsSubtitle}
                </span>
                <h2 
                  className={`text-2xl font-black leading-tight ${
                    isOrivelle 
                      ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                      : 'text-[#1e140d]'
                  }`}
                  style={isOrivelle ? { fontFamily: "'Cinzel', serif" } : undefined}
                >
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className={`text-xs leading-relaxed pt-1 ${
                    isOrivelle ? 'text-stone-300 font-light' : 'text-[#3e2c1e]/85'
                  }`}>
                    {storyText}
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div 
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                        isOrivelle ? 'bg-amber-400/15 border-amber-400/50' : ''
                      }`}
                      style={!isOrivelle ? { backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` } : undefined}
                    >
                      <CheckCircle2 className="w-3 h-3" style={{ color: isOrivelle ? '#fef08a' : cfg.accentColor }} />
                    </div>
                    <span className={`text-xs font-bold ${
                      isOrivelle ? 'text-amber-100/90' : 'text-[#2c1e13]'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                    : `px-5 py-2.5 ${cfg.primaryBtnClass} text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer rounded-xl`
                  }
                >
                  <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-stone-950/80 border border-amber-400/50 text-amber-200 text-xs font-black uppercase tracking-wider hover:bg-stone-900 transition-all cursor-pointer"
                    : `px-5 py-2.5 ${cfg.secondaryBtnClass} text-xs font-bold transition-all cursor-pointer rounded-xl`
                  }
                >
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
                </button>

                {(onEditClick || onOpenAdmin) && (
                  <button
                    type="button"
                    onClick={onEditClick || onOpenAdmin}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    title={lang === 'bn' ? 'এই সেকশনটি এডিট করুন' : 'Edit Section'}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'bn' ? 'এডিট' : 'Edit'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* C. DESKTOP VIEW */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left Column: Image with Overlay Badge */}
            <div className="md:col-span-6 relative">
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                isOrivelle 
                  ? 'border-2 border-amber-400/60 shadow-[0_0_45px_rgba(229,193,88,0.3)] bg-stone-950' 
                  : `border-2 ${cfg.accentBorderClass} bg-white`
              }`}>
                {/* 24K Gold Corner Architectural Flourishes for Orivelle */}
                {isOrivelle && (
                  <>
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300 z-10 pointer-events-none" />
                  </>
                )}
                <img 
                  src={imageSrc} 
                  alt={displayTitle}
                  className="w-full h-[280px] min-[400px]:h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] object-cover hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Bottom Left Artisanal / Imperial Badge */}
                {isOrivelle ? (
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm p-4 rounded-2xl bg-stone-950/95 backdrop-blur-md border border-amber-400/60 text-amber-100 shadow-2xl flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 font-black text-lg flex items-center justify-center shrink-0 shadow-lg text-stone-950 select-none">
                      👑
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block font-extrabold">
                        {lang === 'bn' ? '✦ ওরিভেল রিজার্ভ ✦' : '✦ ORIVELLE RESERVE ✦'}
                      </span>
                      <p className="text-sm font-black text-amber-100 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                        {lang === 'bn' ? '৩-স্টার মিশেলিন রাজকীয় স্বাদ' : '3-Star Michelin Haute Gastronomy'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs p-3.5 sm:p-4 rounded-2xl bg-[#1e140d]/92 backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center gap-3">
                    <div 
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow select-none uppercase"
                      style={{ backgroundColor: cfg.accentColor, color: '#1e140d' }}
                    >
                      {initial1}{initial2}
                    </div>
                    <div>
                      <span 
                        className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest block"
                        style={{ color: cfg.accentColor }}
                      >
                        {lang === 'bn' ? 'আর্টিসানাল কোয়ালিটি' : 'ARTISANAL QUALITY'}
                      </span>
                      <p className="text-xs sm:text-sm font-black text-white leading-tight">
                        {lang === 'bn' ? 'তাজা ও অর্গানিক গুরমে রেসিপি' : 'Fresh & Organic Gourmet Recipes'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Title, Features Checklist & CTA Buttons */}
            <div className="md:col-span-6 space-y-5 sm:space-y-6 text-left">
              <div className="space-y-2">
                <span 
                  className={`text-xs sm:text-sm font-bold uppercase tracking-widest block ${
                    isOrivelle ? 'text-amber-400 font-mono tracking-[0.3em]' : ''
                  }`}
                  style={{ color: isOrivelle ? '#e5c158' : cfg.accentColor }}
                >
                  {isOrivelle ? `✦ ${aboutUsSubtitle} ✦` : aboutUsSubtitle}
                </span>
                <h2 
                  className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-tight ${
                    isOrivelle 
                      ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                      : 'text-[#1e140d]'
                  }`}
                  style={isOrivelle ? { fontFamily: "'Cinzel', serif" } : undefined}
                >
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className={`text-xs sm:text-sm md:text-base leading-relaxed pt-1 ${
                    isOrivelle ? 'text-stone-300 font-light' : 'text-[#3e2c1e]/80'
                  }`}>
                    {storyText}
                  </p>
                )}
              </div>

              {/* Checklist items */}
              <div className="space-y-3 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                        isOrivelle
                          ? 'bg-amber-400/15 border-amber-400/50 shadow-[0_0_10px_rgba(229,193,88,0.25)]'
                          : ''
                      }`}
                      style={!isOrivelle ? { backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` } : undefined}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: isOrivelle ? '#fef08a' : cfg.accentColor }} />
                    </div>
                    <span className={`text-xs sm:text-sm md:text-base font-bold ${
                      isOrivelle ? 'text-amber-50' : 'text-[#2c1e13]'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={isOrivelle
                    ? "px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(229,193,88,0.4)] hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95"
                    : `px-6 sm:px-8 py-3 sm:py-4 ${cfg.primaryBtnClass} text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer rounded-xl`
                  }
                >
                  <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={isOrivelle
                    ? "px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-stone-950/80 border-2 border-amber-400/60 text-amber-200 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-stone-900 transition-all hover:-translate-y-0.5 cursor-pointer"
                    : `px-6 sm:px-8 py-3 sm:py-4 ${cfg.secondaryBtnClass} text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer rounded-xl`
                  }
                >
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
                </button>

                {(onEditClick || onOpenAdmin) && (
                  <button
                    type="button"
                    onClick={onEditClick || onOpenAdmin}
                    className="px-5 sm:px-6 py-3 sm:py-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 hover:-translate-y-0.5"
                    title={lang === 'bn' ? 'এই সেকশনটি এডিট করুন' : 'Edit "Why Dine With Us?" Section'}
                  >
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'bn' ? 'এই সেকশনটি এডিট করুন' : 'Edit Section'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Intersection Divider for Theme #02 Orivelle House (transition to Tasting Menu) */}
      {isOrivelle && (
        <div className="w-full relative z-20 pointer-events-none select-none -mb-1">
          <OrivelleGeometricDivider color="#0c0b08" position="bottom" />
        </div>
      )}
    </section>
  );
};

export default KoppeeAboutSection;
