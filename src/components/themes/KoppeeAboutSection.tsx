import React from 'react';
import { Coffee, CheckCircle2, ArrowRight } from 'lucide-react';
import { THEME_HERO_CONFIGS } from './KoppeeHeroHeader';

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
  const cfg = (themePresetId && THEME_HERO_CONFIGS[themePresetId]) || THEME_HERO_CONFIGS['lumivelle'];
  const displayTitle = aboutUsTitle || (lang === 'bn' ? 'কেন আমাদের কাছে খাবেন?' : 'Why Dine With Us?');
  const defaultStory = brandDescription || `Redefining luxury dining experiences. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews. At ${effectiveBrandName}, we take pride in serving hand-selected, freshly prepared meals crafted with precision and passion.`;
  const storyText = aboutUsText || defaultStory;
  const imageSrc = aboutUsImage || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop';

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
  const defaultFeatures = lang === 'bn' 
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
      ];

  const featuresList = (aboutUsFeatures && aboutUsFeatures.length > 0) ? aboutUsFeatures : defaultFeatures;

  const getLogoInitials = (name: string): [string, string] => {
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
    <section id="about" className="relative w-full bg-white text-[#2c1e13] overflow-hidden">
      <div className={`w-full max-w-[1800px] mx-auto ${
        isTablet 
          ? 'px-6 sm:px-8 py-10 sm:py-12' 
          : isMobile 
          ? 'px-4 py-8' 
          : 'px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-20'
      }`}>
        
        {/* A. TABLET VIEW (Clean 5:7 column split with comfortable padding preventing right edge overflow) */}
        {isTablet ? (
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Left Column: Image with Overlay Badge */}
            <div className="col-span-5 relative">
              <div className={`relative rounded-2xl overflow-hidden shadow-xl border-2 ${cfg.accentBorderClass} bg-white`}>
                <img 
                  src={imageSrc} 
                  alt={displayTitle}
                  className="w-full h-[320px] sm:h-[360px] object-cover hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Bottom Left Artisanal Badge */}
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
              </div>
            </div>

            {/* Right Column: Title, Features Checklist & CTA Buttons with safe right margin */}
            <div className="col-span-7 space-y-4 text-left pr-4">
              <div className="space-y-1.5">
                <span 
                  className="text-xs font-bold uppercase tracking-widest block"
                  style={{ color: cfg.accentColor }}
                >
                  {aboutUsSubtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1e140d] leading-tight">
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className="text-xs sm:text-sm text-[#3e2c1e]/85 leading-relaxed pt-1">
                    {storyText}
                  </p>
                )}
              </div>

              {/* Checklist items with CheckCircle2 Tick Icons */}
              <div className="space-y-2.5 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                      style={{ backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: cfg.accentColor }} />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#2c1e13]">
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
                  className={`px-5 py-2.5 ${cfg.primaryBtnClass} text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer rounded-xl`}
                >
                  <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={`px-5 py-2.5 ${cfg.secondaryBtnClass} text-xs font-bold transition-all cursor-pointer rounded-xl`}
                >
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : isMobile ? (
          /* B. MOBILE VIEW (Vertically stacked) */
          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className={`relative rounded-2xl overflow-hidden shadow-lg border ${cfg.accentBorderClass} bg-white`}>
                <img 
                  src={imageSrc} 
                  alt={displayTitle}
                  className="w-full h-[260px] object-cover" 
                />
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
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <span 
                  className="text-xs font-bold uppercase tracking-widest block"
                  style={{ color: cfg.accentColor }}
                >
                  {aboutUsSubtitle}
                </span>
                <h2 className="text-2xl font-black text-[#1e140d] leading-tight">
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className="text-xs text-[#3e2c1e]/85 leading-relaxed pt-1">
                    {storyText}
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                      style={{ backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` }}
                    >
                      <CheckCircle2 className="w-3 h-3" style={{ color: cfg.accentColor }} />
                    </div>
                    <span className="text-xs font-bold text-[#2c1e13]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={`px-5 py-2.5 ${cfg.primaryBtnClass} text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer rounded-xl`}
                >
                  <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={`px-5 py-2.5 ${cfg.secondaryBtnClass} text-xs font-bold transition-all cursor-pointer rounded-xl`}
                >
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* C. DESKTOP VIEW (Exact original untouched layout) */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left Column: Image with Overlay Badge */}
            <div className="md:col-span-6 relative">
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 ${cfg.accentBorderClass} bg-white`}>
                <img 
                  src={imageSrc} 
                  alt={displayTitle}
                  className="w-full h-[280px] min-[400px]:h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] object-cover hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Bottom Left Artisanal Badge */}
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
              </div>
            </div>

            {/* Right Column: Title, Features Checklist & CTA Buttons */}
            <div className="md:col-span-6 space-y-5 sm:space-y-6 text-left">
              <div className="space-y-2">
                <span 
                  className="text-xs sm:text-sm font-bold uppercase tracking-widest block"
                  style={{ color: cfg.accentColor }}
                >
                  {aboutUsSubtitle}
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1e140d] leading-tight">
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className="text-xs sm:text-sm md:text-base text-[#3e2c1e]/80 leading-relaxed pt-1">
                    {storyText}
                  </p>
                )}
              </div>

              {/* Checklist items with CheckCircle2 Tick Icons */}
              <div className="space-y-3 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 border"
                      style={{ backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: cfg.accentColor }} />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-[#2c1e13]">
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
                  className={`px-6 sm:px-8 py-3 sm:py-4 ${cfg.primaryBtnClass} text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer rounded-xl`}
                >
                  <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={`px-6 sm:px-8 py-3 sm:py-4 ${cfg.secondaryBtnClass} text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer rounded-xl`}
                >
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default KoppeeAboutSection;
