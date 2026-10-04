import React from 'react';
import { motion } from 'motion/react';
import { Coffee, CheckCircle2, ArrowRight, Edit3, Crown, Sparkles, Award } from 'lucide-react';
import { THEME_HERO_CONFIGS, COFFEE_SHOP_THEME_IDS } from './KoppeeHeroHeader';
import luxuryInteriorImg from '../../assets/images/luxury_michelin_interior_1790508733625.jpg';
import realAssembledPlateImg from '../../assets/images/real_assembled_wagyu_plate_1790864314074.jpg';
import { OrivelleGeometricDivider } from './OrivelleGeometricDivider';
import { getThemeDisplayName, isCustomRestaurantName } from '../../lib/adminHelpers';

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
  brandName = 'Avernao',
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
  const effectiveBrandName = isCustomRestaurantName(brandName)
    ? brandName!.trim()
    : getThemeDisplayName(themePresetId);
  
  // All themes EXCEPT the 13 coffee shop themes receive the 5-Star Michelin Luxury styling
  const isLuxuryTheme = !COFFEE_SHOP_THEME_IDS.includes(themePresetId || '');
  const isOrivelle = isLuxuryTheme && themePresetId !== 'palatiora';
  const isAurelisse = themePresetId === 'aurelisse';
  const isPalatiora = themePresetId === 'palatiora';
  const isEmberion = themePresetId === 'emberion';
  const cfg = (themePresetId && THEME_HERO_CONFIGS[themePresetId]) || THEME_HERO_CONFIGS['lumivelle'];
  
  const displayTitle = isEmberion
    ? ('Why Feast at Our Artisan Bagel Bakery & Cafe?')
    : isAurelisse
    ? ('Why Feast at Aurelisse Gourmet Burger Lounge?')
    : isPalatiora
    ? (`Why Dine at ${effectiveBrandName}?`)
    : (aboutUsTitle || (isLuxuryTheme ? `Why Dine at ${effectiveBrandName}?` : 'Why Dine With Us?'));
  
  const displaySubtitle = isEmberion
    ? ('✦ THE ARTISAN KETTLE-BOILED TRADITION ✦')
    : isAurelisse
    ? ('✦ THE FLAME-GRILLED LEGEND ✦')
    : isPalatiora
    ? ('✦ THE SAVORELLE EXPERIENCE ✦')
    : aboutUsSubtitle;

  const defaultStory = isEmberion
    ? (`We do not bake ordinary bagels. At our bakery & cafe, every single batch begins with 36-hour cold-fermented heirloom dough, traditionally kettle-boiled in barley malt water, and blistered on wet cedar planks inside hot stone hearths. This delivers that coveted crisp, crackly golden exterior with an irresistibly tender, dense, chewy interior — paired with whipped artisanal schmears and micro-batch coffees.`)
    : isAurelisse
    ? (`We do not serve ordinary fast food. At Aurelisse, we craft the world's most luxurious, oak-charcoal seared Wagyu burgers. Each premium patty is freshly ground daily from 100% Japanese A5 Wagyu beef and seared over natural wood fires for a perfect, smokey crunch.`)
    : isPalatiora
    ? (`At ${effectiveBrandName}, dining is an elevated art of flavor and passion. Our culinary team hand-selects daily fresh ingredients, blending artisanal sauces and wood-fire techniques to craft unforgettable taste sensations.`)
    : (brandDescription || (isLuxuryTheme
        ? (`Redefining haute cuisine and 5-star Michelin luxury. Discover our exclusive master chef-curated tasting courses, 24k gold leaf infusions, and 3D interactive WebAR food previews. At ${effectiveBrandName}, we take pride in serving hand-selected, freshly prepared grand reserve meals crafted with precision and passion.`)
        : `Redefining luxury dining experiences. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews. At ${effectiveBrandName}, we take pride in serving hand-selected, freshly prepared meals crafted with precision and passion.`));
  
  const storyText = aboutUsText || defaultStory;
  const imageSrc = aboutUsImage || (isEmberion
    ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop'
    : isPalatiora
    ? 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop'
    : isLuxuryTheme 
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
  const emberionFeatures = lang === 'bn'
    ? [
        '৩৬ ঘণ্টার স্লো কোল্ড-ফার্মেন্টেড খাঁটি মাস্টার ডো',
        'মল্ট ওয়াটার কেটলে বয়েল্ড ও স্টোন হার্থ-বেকড কারিগরী',
        'হোমমেড ক্রিম চিজ, প্রিমিয়াম নোভা স্যামন ও ক্রিস্পি বেকন',
        'প্রতিদিন ভোরে ওভেন থেকে গরম গরম ফ্রেশ বেকিং নিশ্চয়তা'
      ]
    : [
        '36-Hour Slow Cold-Fermented Heirloom Master Dough',
        'Traditional Barley Malt Kettle-Boiled & Stone Hearth-Baked',
        'Whipped Farm-Fresh Cream Cheeses, Nova Lox & Hardwood Bacon',
        'Fresh-From-The-Oven Hot Bagels Baked Scratch Every Morning'
      ];

  const aurelisseFeatures = lang === 'bn'
    ? [
        '100% Japanese A5 Wagyu Beef (Fresh Daily)',
        'Artisan Gold-Dusted Brioche Buns',
        '12-Hour Oak-Charcoal Flame Sear',
        'Chef\'s Signature Truffle Cheese Infusion'
      ]
    : [
        '100% Authentic Japanese A5 Wagyu Beef',
        'House-Baked Gold-Dusted Sesame Brioche Buns',
        '12-Hour Oak-Charcoal Flame Sear & Smokey Flavor',
        'Pitmaster Signature Black Truffle Cheese Infusion'
      ];

  const palatioraFeatures = lang === 'bn'
    ? [
        'Signature Crispy Teriyaki Wings & Premium Steak',
        '100% Fresh Organic Ingredients & Secret House Sauces',
        'Live Front-Row Culinary Artistry by Master Chefs',
        'Instant QR Table Ordering & Fast Express Delivery'
      ]
    : [
        'Signature Crispy Teriyaki Wings & Flame-Seared Steaks',
        '100% Fresh Daily Organic Ingredients & Secret Glaze',
        'Front-Row Culinary Artistry & Chef-Curated Specials',
        'Instant Table QR Ordering & Rapid Express Delivery'
      ];

  const defaultFeatures = isEmberion
    ? emberionFeatures
    : isAurelisse
    ? aurelisseFeatures
    : isPalatiora
    ? palatioraFeatures
    : (isOrivelle
        ? (lang === 'bn'
            ? [
                '24K Gold Caviar & Alba Truffles',
                '3-Star Michelin Chef-Curated Menu',
                '3D Interactive WebAR Hologram Previews',
                'Private VIP Dining Salon & Sommelier Cellar'
              ]
            : [
                '24K Gold Caviar & White Alba Truffle',
                '3-Star Michelin Chef-Curated Repertoire',
                '3D WebAR Interactive Table Holograms',
                'Private VIP Salon & Grand Reserve Sommelier'
              ])
        : (lang === 'bn' 
            ? [
                '100% Fresh Organic Ingredients',
                'Chef-Curated Gourmet Menu',
                '3D Interactive WebAR Food Preview',
                'Fast Express Delivery & QR Table Ordering'
              ]
            : [
                '100% Fresh Organic Ingredients',
                'Chef-Curated Gourmet Menu',
                '3D Interactive WebAR Food Previews',
                'Fast Home Delivery & Table Ordering'
              ]));

  const featuresList = (aboutUsFeatures && aboutUsFeatures.length > 0) ? aboutUsFeatures : defaultFeatures;

  const getLogoInitials = (name: string): [string, string] => {
    if (isOrivelle) return ["O", "H"];
    if (!name) return ["V", "D"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanName) return ["V", "D"];
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return [cleanName[0].toUpperCase(), cleanName[0].toUpperCase()];
  };

  const [initial1, initial2] = getLogoInitials(effectiveBrandName);

  return (
    <section id="about" className={`relative w-full overflow-hidden transition-colors duration-500 ${
      isAurelisse ? 'bg-[#EDF7E7] text-[#142412]' : isPalatiora ? 'bg-[#0B0B0E] text-white' : isOrivelle ? 'bg-[#0a0907] text-[#FBF8EE]' : isEmberion ? 'bg-[#fdf4e7] text-[#0f2942] border-b border-[#0f2942]/10' : 'bg-white text-[#2c1e13]'
    }`}>
      {isEmberion && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(185,28,28,0.06),_transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b91c1c]/25 to-transparent" />
        </>
      )}
      {isAurelisse && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(129,199,132,0.15),_transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-600/20 to-transparent" />
        </>
      )}
      {isPalatiora && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.08),_transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </>
      )}
      {(isOrivelle && !isAurelisse && !isPalatiora) && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,193,88,0.1),_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0907] via-[#12100d] to-[#0a0907] opacity-98 -z-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </>
      )}
      <div className={`w-full max-w-[1800px] mx-auto ${
        isTablet 
          ? 'px-6 sm:px-8 py-16 sm:py-20' 
          : isMobile 
          ? 'px-4 py-12 sm:py-16' 
          : 'px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-20 sm:py-28 lg:py-36'
      }`}>
        
        {/* Quick Edit Section Top Action Bar */}
        {(onEditClick || onOpenAdmin) && (
          <div className="flex items-center justify-between pb-3.5 mb-6 sm:mb-8 border-b border-[#2c1e13]/10">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8c6d53] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{'About & Story Section'}</span>
            </div>
            <button
              type="button"
              onClick={onEditClick || onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95 group"
              title={'Edit "Why Dine With Us?" Section'}
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>{'Edit Section'}</span>
            </button>
          </div>
        )}

        {/* A. TABLET VIEW */}
        {isTablet ? (
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Left Column: Image with Overlay Badge */}
            <div className="col-span-5 relative flex items-center justify-center p-4">
              {isAurelisse ? (
                /* PRESTINE FLOATING RECTANGULAR WAGYU BURGER PHOTO CARD FOR AURELISSE TABLET */
                <motion.div 
                  animate={{ y: [-6, 6, -8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#2e7d32]/25 shadow-[0_15px_35px_rgba(46,125,50,0.18)] bg-white w-full group cursor-pointer"
                >
                  <img 
                    src={imageSrc || realAssembledPlateImg} 
                    alt={displayTitle}
                    className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent pointer-events-none" />
                  
                  {/* Floating Luxury Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-950/95 backdrop-blur-md border border-[#2e7d32]/40 text-white shadow-xl flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2e7d32] flex items-center justify-center text-white text-xs font-black shrink-0 shadow-md">
                      🍔
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase block truncate font-bold">
                        {'✦ AURELISSE CHEF RESERVE ✦'}
                      </span>
                      <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                        {'100% Flame-Grilled A5 Wagyu'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : isPalatiora ? (
                /* DELUXE FLOATING TASTING CARD FOR SAVORELLE TABLET */
                <motion.div 
                  animate={{ y: [-6, 6, -8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 shadow-[0_15px_35px_rgba(249,115,22,0.18)] bg-[#151518] w-full group cursor-pointer"
                >
                  <img 
                    src={imageSrc} 
                    alt={displayTitle}
                    className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Luxury Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#0e0e11]/95 backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#F97316] flex items-center justify-center text-white text-xs font-black shrink-0 shadow-md">
                      🔥
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono tracking-widest text-[#F97316] uppercase block truncate font-bold">
                        {'✦ SAVORELLE EXCLUSIVE ✦'}
                      </span>
                      <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                        {'Gourmet Flavors & Artisanal Craft'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : isEmberion ? (
                /* DELUXE FLOATING ARTISAN BAGEL PHOTO CARD FOR EMBERION TABLET */
                <motion.div 
                  animate={{ y: [-6, 6, -8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#0f2942]/20 shadow-[0_15px_35px_rgba(15,41,66,0.18)] bg-white w-full group cursor-pointer"
                >
                  <img 
                    src={imageSrc} 
                    alt={displayTitle}
                    className="w-full h-[320px] sm:h-[360px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Luxury Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0f2942]/15 text-[#0f2942] shadow-xl flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#b91c1c] flex items-center justify-center text-white text-xs font-black shrink-0 shadow-md">
                      🥯
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono tracking-widest text-[#b91c1c] uppercase block truncate font-bold">
                        {'✦ KETTLE-BOILED TRADITION ✦'}
                      </span>
                      <p className="text-xs font-bold text-[#0f2942] leading-tight line-clamp-1">
                        {'Locally World Famous Bagels'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
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
                          {'✦ ORIVELLE RESERVE ✦'}
                        </span>
                        <p className="text-xs font-bold text-amber-100 leading-tight line-clamp-1" style={{ fontFamily: "'Cinzel', serif" }}>
                          {'3-Star Michelin Haute Gastronomy'}
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
                          {'ARTISANAL QUALITY'}
                        </span>
                        <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                          {'Fresh & Organic Gourmet Recipes'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Title, Features Checklist & CTA Buttons */}
            <div className="col-span-7 space-y-4 text-left pr-4">
              <div className="space-y-1.5">
                <span 
                  className={`text-xs font-bold uppercase tracking-widest block ${
                    isPalatiora ? 'text-[#F97316] font-mono tracking-[0.25em]' : isOrivelle ? 'text-amber-400 font-mono tracking-[0.25em]' : ''
                  }`}
                  style={!isPalatiora && !isOrivelle ? { color: cfg.accentColor } : undefined}
                >
                  {isAurelisse ? displaySubtitle : isPalatiora ? displaySubtitle : (isOrivelle ? `✦ ${aboutUsSubtitle} ✦` : aboutUsSubtitle)}
                </span>
                <h2 
                  className={`text-2xl sm:text-3xl font-black leading-tight ${
                    isPalatiora
                      ? 'text-white'
                      : isOrivelle 
                      ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                      : 'text-[#1e140d]'
                  }`}
                  style={isPalatiora ? { fontFamily: "'DM Serif Display', 'Playfair Display', serif" } : isOrivelle ? { fontFamily: "'Cinzel', serif" } : undefined}
                >
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isPalatiora ? 'text-stone-300 font-normal' : isOrivelle ? 'text-stone-300 font-light' : 'text-[#3e2c1e]/85'
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
                        isPalatiora
                          ? 'bg-[#F97316]/15 border-[#F97316]/40'
                          : isOrivelle
                          ? 'bg-amber-400/15 border-amber-400/50 shadow-[0_0_8px_rgba(229,193,88,0.2)]'
                          : ''
                      }`}
                      style={(!isOrivelle && !isPalatiora) ? { backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` } : undefined}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: isPalatiora ? '#F97316' : isOrivelle ? '#fef08a' : cfg.accentColor }} />
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${
                      isPalatiora ? 'text-stone-100' : isOrivelle ? 'text-amber-100/90' : 'text-[#2c1e13]'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* SPECIAL CHEF'S NOTE & BAKERY PROMISE CALLOUT (TABLET) */}
              <div className={`p-3.5 sm:p-4 rounded-2xl border flex items-start gap-3 shadow-xs ${
                isEmberion
                  ? 'bg-white border-[#b91c1c]/25 text-[#0f2942]'
                  : isAurelisse
                  ? 'bg-white/80 border-[#2e7d32]/30 text-[#142412]'
                  : isPalatiora
                  ? 'bg-white/5 border-[#F97316]/30 text-white'
                  : isOrivelle
                  ? 'bg-stone-900/90 border-amber-400/40 text-amber-100'
                  : 'bg-amber-50/80 border-amber-400/30 text-[#2c1e13]'
              }`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isEmberion ? 'bg-[#b91c1c] text-white' : isAurelisse ? 'bg-[#2e7d32] text-white' : isPalatiora ? 'bg-[#F97316] text-white' : 'bg-amber-500 text-stone-950'
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-left min-w-0">
                  <h4 className={`text-xs font-black uppercase tracking-wider ${
                    isEmberion ? 'text-[#b91c1c]' : isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : 'text-amber-700'
                  }`}>
                    ★ {"CHEF'S SPECIAL NOTE & PROMISE"}
                  </h4>
                  <p className="text-[11px] sm:text-xs leading-relaxed opacity-90 line-clamp-2">
                    {'100% natural heritage ingredients, zero preservatives, kettle-boiled fresh every morning.'}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={isPalatiora
                    ? "px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    : isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,193,88,0.4)] hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    : `px-5 py-2.5 ${cfg.primaryBtnClass} text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer rounded-xl`
                  }
                >
                  <span>{'BOOK A TABLE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={isPalatiora
                    ? "px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    : isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-stone-950/80 border border-amber-400/50 text-amber-200 text-xs font-black uppercase tracking-wider hover:bg-stone-900 transition-all cursor-pointer"
                    : `px-5 py-2.5 ${cfg.secondaryBtnClass} text-xs font-bold transition-all cursor-pointer rounded-xl`
                  }
                >
                  <span>{'EXPLORE MENU'}</span>
                </button>

                {(onEditClick || onOpenAdmin) && (
                  <button
                    type="button"
                    onClick={onEditClick || onOpenAdmin}
                    className={`px-3.5 py-2.5 rounded-xl ${isPalatiora ? 'bg-white/10 hover:bg-white/20 text-[#F97316] border border-white/20' : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40'} text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95`}
                    title={'Edit Section'}
                  >
                    <Edit3 className={`w-3.5 h-3.5 ${isPalatiora ? 'text-[#F97316]' : 'text-amber-400'}`} />
                    <span>{'Edit'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : isMobile ? (
          /* B. MOBILE VIEW */
          <div className="flex flex-col gap-6">
            <div className="relative flex items-center justify-center p-4">
              {isAurelisse ? (
                /* PRESTINE FLOATING WAGYU BURGER PHOTO CARD FOR AURELISSE MOBILE */
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#2e7d32]/25 shadow-[0_10px_25px_rgba(46,125,50,0.15)] bg-white w-full group cursor-pointer"
                >
                  <img 
                    src={imageSrc || realAssembledPlateImg} 
                    alt={displayTitle}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent pointer-events-none" />
                  
                  {/* Floating Luxury Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-stone-950/95 backdrop-blur-md border border-[#2e7d32]/40 text-white shadow-lg flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#2e7d32] flex items-center justify-center text-white text-xs font-black shrink-0">
                      🍔
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono tracking-widest text-emerald-400 uppercase block truncate font-bold">
                        {'✦ AURELISSE CHEF RESERVE ✦'}
                      </span>
                      <p className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                        {'100% Flame-Grilled A5 Wagyu'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : isPalatiora ? (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl border border-white/15 shadow-[0_10px_25px_rgba(249,115,22,0.15)] bg-[#151518] w-full group cursor-pointer"
                >
                  <img 
                    src={imageSrc} 
                    alt={displayTitle}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-[#0e0e11]/95 backdrop-blur-md border border-white/10 text-white shadow-lg flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center text-white text-xs font-black shrink-0">
                      🔥
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono tracking-widest text-[#F97316] uppercase block truncate font-bold">
                        {'✦ SAVORELLE EXCLUSIVE ✦'}
                      </span>
                      <p className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                        {'Gourmet Flavors & Artisanal Craft'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : isEmberion ? (
                /* DELUXE FLOATING ARTISAN BAGEL PHOTO CARD FOR EMBERION MOBILE */
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#0f2942]/20 shadow-[0_10px_25px_rgba(15,41,66,0.15)] bg-white w-full group cursor-pointer"
                >
                  <img 
                    src={imageSrc} 
                    alt={displayTitle}
                    className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0f2942]/15 text-[#0f2942] shadow-lg flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#b91c1c] flex items-center justify-center text-white text-xs font-black shrink-0">
                      🥯
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono tracking-widest text-[#b91c1c] uppercase block truncate font-bold">
                        {'✦ KETTLE-BOILED TRADITION ✦'}
                      </span>
                      <p className="text-[11px] font-bold text-[#0f2942] leading-tight line-clamp-1">
                        {'Locally World Famous Bagels'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
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
                          {'✦ ORIVELLE RESERVE ✦'}
                        </span>
                        <p className="text-[11px] font-bold text-amber-100 leading-tight truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                          {'3-Star Michelin Haute Gastronomy'}
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
                          {'ARTISANAL QUALITY'}
                        </span>
                        <p className="text-[11px] font-bold text-white leading-tight truncate">
                          {'Fresh & Organic Gourmet Recipes'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <span 
                  className={`text-xs font-bold uppercase tracking-widest block ${
                    isPalatiora ? 'text-[#F97316] font-mono tracking-[0.2em]' : isOrivelle ? 'text-amber-400 font-mono tracking-[0.2em]' : ''
                  }`}
                  style={!isPalatiora && !isOrivelle ? { color: cfg.accentColor } : undefined}
                >
                  {isAurelisse ? displaySubtitle : isPalatiora ? displaySubtitle : (isOrivelle ? `✦ ${aboutUsSubtitle} ✦` : aboutUsSubtitle)}
                </span>
                <h2 
                  className={`text-2xl font-black leading-tight ${
                    isPalatiora
                      ? 'text-white'
                      : isOrivelle 
                      ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                      : 'text-[#1e140d]'
                  }`}
                  style={isPalatiora ? { fontFamily: "'DM Serif Display', 'Playfair Display', serif" } : isOrivelle ? { fontFamily: "'Cinzel', serif" } : undefined}
                >
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className={`text-xs leading-relaxed pt-1 ${
                    isPalatiora ? 'text-stone-300 font-normal' : isOrivelle ? 'text-stone-300 font-light' : 'text-[#3e2c1e]/85'
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
                        isPalatiora ? 'bg-[#F97316]/15 border-[#F97316]/40' : isOrivelle ? 'bg-amber-400/15 border-amber-400/50' : ''
                      }`}
                      style={(!isOrivelle && !isPalatiora) ? { backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` } : undefined}
                    >
                      <CheckCircle2 className="w-3 h-3" style={{ color: isPalatiora ? '#F97316' : isOrivelle ? '#fef08a' : cfg.accentColor }} />
                    </div>
                    <span className={`text-xs font-bold ${
                      isPalatiora ? 'text-stone-100' : isOrivelle ? 'text-amber-100/90' : 'text-[#2c1e13]'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* SPECIAL CHEF'S NOTE & BAKERY PROMISE CALLOUT (MOBILE) */}
              <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 shadow-xs ${
                isEmberion
                  ? 'bg-white border-[#b91c1c]/25 text-[#0f2942]'
                  : isAurelisse
                  ? 'bg-white/80 border-[#2e7d32]/30 text-[#142412]'
                  : isPalatiora
                  ? 'bg-white/5 border-[#F97316]/30 text-white'
                  : isOrivelle
                  ? 'bg-stone-900/90 border-amber-400/40 text-amber-100'
                  : 'bg-amber-50/80 border-amber-400/30 text-[#2c1e13]'
              }`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                  isEmberion ? 'bg-[#b91c1c] text-white' : isAurelisse ? 'bg-[#2e7d32] text-white' : isPalatiora ? 'bg-[#F97316] text-white' : 'bg-amber-500 text-stone-950'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 text-left min-w-0">
                  <h4 className={`text-[11px] font-black uppercase tracking-wider ${
                    isEmberion ? 'text-[#b91c1c]' : isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : 'text-amber-700'
                  }`}>
                    ★ {"CHEF'S SPECIAL NOTE"}
                  </h4>
                  <p className="text-[11px] leading-relaxed opacity-90 line-clamp-2">
                    {'100% natural heritage ingredients, zero preservatives, kettle-boiled fresh every morning.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={isPalatiora
                    ? "px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                    : isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                    : `px-5 py-2.5 ${cfg.primaryBtnClass} text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer rounded-xl`
                  }
                >
                  <span>{'BOOK A TABLE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={isPalatiora
                    ? "px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    : isOrivelle
                    ? "px-5 py-2.5 rounded-xl bg-stone-950/80 border border-amber-400/50 text-amber-200 text-xs font-black uppercase tracking-wider hover:bg-stone-900 transition-all cursor-pointer"
                    : `px-5 py-2.5 ${cfg.secondaryBtnClass} text-xs font-bold transition-all cursor-pointer rounded-xl`
                  }
                >
                  <span>{'EXPLORE MENU'}</span>
                </button>

                {(onEditClick || onOpenAdmin) && (
                  <button
                    type="button"
                    onClick={onEditClick || onOpenAdmin}
                    className={`px-3.5 py-2.5 rounded-xl ${isPalatiora ? 'bg-white/10 hover:bg-white/20 text-[#F97316] border border-white/20' : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40'} text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95`}
                    title={'Edit Section'}
                  >
                    <Edit3 className={`w-3.5 h-3.5 ${isPalatiora ? 'text-[#F97316]' : 'text-amber-400'}`} />
                    <span>{'Edit'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* C. DESKTOP VIEW */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left Column: Image with Overlay Badge */}
            <div className="md:col-span-6 relative flex items-center justify-center p-8">
              {isAurelisse ? (
                /* DELUXE FLOATING WAGYU BURGER PHOTO CARD FOR AURELISSE DESKTOP */
                <motion.div 
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2e7d32]/25 shadow-[0_20px_50px_rgba(46,125,50,0.18)] bg-white w-full max-w-[540px] group cursor-pointer mx-auto"
                >
                  <img 
                    src={imageSrc || realAssembledPlateImg} 
                    alt={displayTitle}
                    className="w-full h-[380px] lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent pointer-events-none" />
                  
                  {/* Luxury Corner Accents */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#2e7d32]/60 z-10 pointer-events-none rounded-tl" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#2e7d32]/60 z-10 pointer-events-none rounded-tr" />
                  
                  {/* Floating Luxury Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-stone-950/95 backdrop-blur-md border border-[#2e7d32]/40 text-white shadow-2xl flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#2e7d32] to-[#43a047] flex items-center justify-center text-white text-xl font-black shrink-0 shadow-lg select-none">
                      🍔
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block font-extrabold">
                        {'✦ AURELISSE CHEF RESERVE ✦'}
                      </span>
                      <p className="text-sm font-black text-white leading-tight">
                        {'100% Oak-Smoked A5 Wagyu Burger'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : isPalatiora ? (
                /* DELUXE FLOATING TASTING CARD FOR SAVORELLE DESKTOP */
                <motion.div 
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 shadow-[0_20px_50px_rgba(249,115,22,0.18)] bg-[#151518] w-full max-w-[540px] group cursor-pointer mx-auto"
                >
                  <img 
                    src={imageSrc} 
                    alt={displayTitle}
                    className="w-full h-[380px] lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Luxury Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0e0e11]/95 backdrop-blur-md border border-white/10 text-white shadow-2xl flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#F97316] flex items-center justify-center text-white text-xl font-black shrink-0 shadow-lg select-none">
                      🔥
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#F97316] uppercase block font-extrabold">
                        {'✦ SAVORELLE EXCLUSIVE ✦'}
                      </span>
                      <p className="text-sm font-black text-white leading-tight">
                        {'Gourmet Flavors & Unmatched Culinary Art'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : isEmberion ? (
                /* DELUXE FLOATING ARTISAN BAGEL PHOTO CARD FOR EMBERION DESKTOP */
                <motion.div 
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                  className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-[#0f2942]/20 shadow-[0_25px_60px_rgba(15,41,66,0.18)] bg-white w-full max-w-[580px] group cursor-pointer mx-auto"
                >
                  <img 
                    src={imageSrc} 
                    alt={displayTitle}
                    className="w-full h-[420px] lg:h-[480px] xl:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Luxury Bagel Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0f2942]/15 text-[#0f2942] shadow-2xl flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-lg select-none">
                      🥯
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#b91c1c] uppercase block font-extrabold">
                        {'✦ KETTLE-BOILED TRADITION ✦'}
                      </span>
                      <p className="text-sm font-black text-[#0f2942] leading-tight">
                        {'Locally World Famous Hand-Rolled Bagels'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
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
                          {'✦ ORIVELLE RESERVE ✦'}
                        </span>
                        <p className="text-sm font-black text-amber-100 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                          {'3-Star Michelin Haute Gastronomy'}
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
                          {'ARTISANAL QUALITY'}
                        </span>
                        <p className="text-xs sm:text-sm font-black text-white leading-tight">
                          {'Fresh & Organic Gourmet Recipes'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Title, Features Checklist & CTA Buttons */}
            <div className="md:col-span-6 space-y-6 sm:space-y-7 text-left">
              <div className="space-y-2.5">
                <span 
                  className={`text-xs sm:text-sm font-bold uppercase tracking-widest block ${
                    isEmberion
                      ? 'text-[#b91c1c] font-mono tracking-[0.25em]'
                      : isAurelisse 
                      ? 'text-[#2e7d32] font-mono tracking-[0.25em]' 
                      : isPalatiora ? 'text-[#F97316] font-mono tracking-[0.25em]' : isOrivelle ? 'text-amber-400 font-mono tracking-[0.3em]' : ''
                  }`}
                  style={(!isAurelisse && !isPalatiora && !isEmberion) ? { color: isOrivelle ? '#e5c158' : cfg.accentColor } : undefined}
                >
                  {isEmberion ? displaySubtitle : isAurelisse ? displaySubtitle : isPalatiora ? displaySubtitle : (isOrivelle ? `✦ ${aboutUsSubtitle} ✦` : aboutUsSubtitle)}
                </span>
                <h2 
                  className={`text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${
                    isEmberion
                      ? 'text-[#0f2942]'
                      : isAurelisse
                      ? 'text-[#142412]'
                      : isPalatiora
                      ? 'text-white'
                      : isOrivelle 
                        ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent' 
                        : 'text-[#1e140d]'
                  }`}
                  style={isPalatiora ? { fontFamily: "'DM Serif Display', 'Playfair Display', serif" } : (!isAurelisse && isOrivelle) ? { fontFamily: "'Cinzel', serif" } : undefined}
                >
                  {displayTitle}
                </h2>
                {storyText && (
                  <p className={`text-sm sm:text-base md:text-lg leading-relaxed pt-2 ${
                    isEmberion
                      ? 'text-[#334155] font-normal'
                      : isAurelisse 
                      ? 'text-[#2a3e26] font-medium' 
                      : isPalatiora ? 'text-stone-300 font-normal' : isOrivelle ? 'text-stone-300 font-light' : 'text-[#3e2c1e]/80'
                  }`}>
                    {storyText}
                  </p>
                )}
              </div>

              {/* Checklist items */}
              <div className="space-y-3.5 pt-1">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                        isEmberion
                          ? 'bg-red-50 border-[#b91c1c]/30'
                          : isAurelisse
                          ? 'bg-emerald-100 border-emerald-600/30'
                          : isPalatiora
                            ? 'bg-[#F97316]/15 border-[#F97316]/40'
                            : isOrivelle
                            ? 'bg-amber-400/15 border-amber-400/50 shadow-[0_0_10px_rgba(229,193,88,0.25)]'
                            : ''
                      }`}
                      style={(!isOrivelle && !isAurelisse && !isPalatiora && !isEmberion) ? { backgroundColor: `${cfg.accentColor}20`, borderColor: `${cfg.accentColor}50` } : undefined}
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: isEmberion ? '#b91c1c' : isAurelisse ? '#2e7d32' : isPalatiora ? '#F97316' : isOrivelle ? '#fef08a' : cfg.accentColor }} />
                    </div>
                    <span className={`text-sm sm:text-base font-bold ${
                      isEmberion
                        ? 'text-[#0f2942]'
                        : isAurelisse 
                        ? 'text-[#142412]' 
                        : isPalatiora ? 'text-white' : isOrivelle ? 'text-amber-50' : 'text-[#2c1e13]'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* SPECIAL CHEF'S NOTE & QUALITY PROMISE CALLOUT (DESKTOP) */}
              <div className={`p-5 sm:p-6 rounded-3xl border-2 flex items-start gap-4 shadow-sm ${
                isEmberion
                  ? 'bg-white border-[#b91c1c]/30 text-[#0f2942] shadow-[0_12px_32px_rgba(185,28,28,0.08)]'
                  : isAurelisse
                  ? 'bg-white/80 border-[#2e7d32]/30 text-[#142412]'
                  : isPalatiora
                  ? 'bg-white/5 border-[#F97316]/30 text-white'
                  : isOrivelle
                  ? 'bg-stone-900/90 border-amber-400/40 text-amber-100'
                  : 'bg-amber-50/80 border-amber-400/30 text-[#2c1e13]'
              }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                  isEmberion
                    ? 'bg-[#b91c1c] text-white'
                    : isAurelisse
                    ? 'bg-[#2e7d32] text-white'
                    : isPalatiora
                    ? 'bg-[#F97316] text-white'
                    : isOrivelle
                    ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-stone-950'
                    : 'bg-amber-500 text-stone-950'
                }`}>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 text-left min-w-0">
                  <h4 className={`text-sm sm:text-base font-black uppercase tracking-wider flex items-center gap-2 ${
                    isEmberion ? 'text-[#b91c1c]' : isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : isOrivelle ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    <span>★ {"CHEF'S SPECIAL NOTE & BAKERY PROMISE"}</span>
                  </h4>
                  <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                    isEmberion ? 'text-[#334155] font-medium' : isPalatiora ? 'text-stone-300' : isOrivelle ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    {'Zero preservatives, zero artificial additives. Hand-crafted daily from scratch using authentic heritage techniques to preserve maximum freshness and genuine crackly, chewy texture.'}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onReserveClick}
                  className={isEmberion
                    ? "px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-[#b91c1c] hover:bg-[#991b1b] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-700/25 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95"
                    : isAurelisse
                    ? "px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95"
                    : isPalatiora
                      ? "px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-600/30 hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95"
                      : isOrivelle
                      ? "px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(229,193,88,0.4)] hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95"
                      : `px-6 sm:px-8 py-3 sm:py-4 ${cfg.primaryBtnClass} text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer rounded-xl`
                  }
                >
                  <span>{'BOOK A TABLE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onMenuClick}
                  className={isEmberion
                    ? "px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-[#0f2942]/20 text-[#0f2942] text-xs sm:text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
                    : isAurelisse
                    ? "px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-white border-2 border-[#2e7d32]/40 text-[#1b5e20] text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-emerald-50 transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
                    : isPalatiora
                    ? "px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
                    : isOrivelle
                    ? "px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-stone-950/80 border-2 border-amber-400/60 text-amber-200 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-stone-900 transition-all hover:-translate-y-0.5 cursor-pointer"
                    : `px-6 sm:px-8 py-3 sm:py-4 ${cfg.secondaryBtnClass} text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer rounded-xl`
                  }
                >
                  <span>{'EXPLORE MENU'}</span>
                </button>

                {(onEditClick || onOpenAdmin) && (
                  <button
                    type="button"
                    onClick={onEditClick || onOpenAdmin}
                    className={`px-5 sm:px-6 py-3 sm:py-4 rounded-2xl ${isEmberion ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border border-white/60 shadow-md' : isAurelisse ? 'bg-[#2e7d32]/10 hover:bg-[#2e7d32]/20 text-[#2e7d32] border border-[#2e7d32]/30' : isPalatiora ? 'bg-white/10 hover:bg-white/20 text-[#F97316] border border-white/20' : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40'} text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 hover:-translate-y-0.5`}
                    title={'Edit "Why Dine With Us?" Section'}
                  >
                    <Edit3 className={`w-4 h-4 ${isEmberion ? 'text-slate-950' : isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : 'text-amber-400'}`} />
                    <span>{'Edit Section'}</span>
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
