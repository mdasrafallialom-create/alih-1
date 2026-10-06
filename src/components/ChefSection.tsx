import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Star, Award, Utensils } from 'lucide-react';
import { AdminSettings, ChefProfile, DEFAULT_CHEF_PROFILES } from '../types';

interface ChefSectionProps {
  settings?: AdminSettings;
  lang?: string;
  onViewSpecials?: () => void;
  isDark?: boolean;
}

export default function ChefSection({
  settings,
  lang = 'en',
  onViewSpecials,
  isDark = false
}: ChefSectionProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Continuous horizontal gliding auto-scroll to the right
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.85;

    const step = () => {
      if (container) {
        container.scrollLeft += scrollSpeed;
        // Seamless wrap when reaching halfway through duplicated items
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, prefersReducedMotion]);

  const handleActionClick = () => {
    if (onViewSpecials) {
      onViewSpecials();
    } else {
      const menuElem = document.getElementById('menu') || document.getElementById('menu-items');
      if (menuElem) {
        menuElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }
    }
  };

  const activeThemeId = settings?.activeThemeId || 'palatiora';
  let themeChefsList: ChefProfile[] | null = settings?.themeSettings?.[activeThemeId]?.chefProfiles || null;
  if (!themeChefsList && typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`theme_chefs_${activeThemeId}`);
      if (saved) themeChefsList = JSON.parse(saved);
    } catch (e) {}
  }

  const chefProfilesList: ChefProfile[] = ((themeChefsList && themeChefsList.length > 0)
    ? themeChefsList
    : (settings?.chefProfiles && settings.chefProfiles.length > 0)
      ? settings.chefProfiles
      : DEFAULT_CHEF_PROFILES).filter(c => c.active !== false);

  // We disable centering to enforce a seamless, continuous, infinite marquee track.
  // This guarantees that there are NEVER any empty gaps on the right or left sides of any screen size.
  const isCenteredGrid = false;
  const repeatCount = chefProfilesList.length > 0 ? Math.max(4, Math.ceil(24 / chefProfilesList.length)) : 1;
  const displayList = chefProfilesList.length > 0 
    ? Array.from({ length: repeatCount }, () => chefProfilesList).flat()
    : [];

  if (displayList.length === 0) return null;

  return (
    <section id="chef-showcase" className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EC] to-[#EFE7D8] border-t border-b border-[#C9A86A]/40 text-[#1C1815] relative overflow-hidden w-full select-none">
      {/* Warm Ambient Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10px] font-black tracking-[0.25em] uppercase shadow-xs">
            <ChefHat className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'ar' ? 'طاقم الطهاة التنفيذيين' : 'OUR EXECUTIVE CHEFS'}</span>
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Cinzel', 'Playfair Display', serif" }}
          >
            {lang === 'ar' ? 'إبداع الطهي والخبرة العالمية' : 'Culinary Mastery & Passion'}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554E] font-medium leading-relaxed">
            {lang === 'ar'
                ? 'يتم إعداد كل طبق بأعلى درجات العناية والخبرة لتقديم تجربة طعام استثنائية.'
                : 'Every recipe is an artistic balance of heritage gastronomy, precision culinary craftsmanship and soul.'}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent mx-auto mt-2" />
        </div>
      </div>

      {/* Full-Width Carousel Track or Centered Grid */}
      <div 
        className="w-full relative z-10 px-4 group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className={`flex flex-row ${isCenteredGrid ? 'justify-center flex-wrap max-w-7xl mx-auto gap-6 sm:gap-8' : 'flex-nowrap overflow-x-auto gap-5 sm:gap-6 px-2'} select-none scroll-smooth py-4`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayList.map((chefItem, idx) => {
            const slotNumber = (idx % 6) + 1;
            const fullStars = Math.floor(chefItem.rating || 5);
            const hasHalfStar = (chefItem.rating || 5) % 1 >= 0.3;

            return (
              <div
                key={idx}
                className="w-[285px] sm:w-[320px] shrink-0 bg-white rounded-3xl p-5 border-2 border-[#E7DECD] shadow-[0_12px_36px_rgba(180,140,80,0.12)] hover:border-[#C9A86A] hover:shadow-[0_20px_45px_rgba(201,168,106,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Decorative Corner Accents */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#C9A86A]/70 group-hover:border-[#96722D] rounded-tl-lg pointer-events-none transition-colors" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#C9A86A]/70 group-hover:border-[#96722D] rounded-br-lg pointer-events-none transition-colors" />

                {/* Top: Compact Chef Portrait */}
                <div className="space-y-3.5">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/4.6] w-full shadow-md border-2 border-[#E7DECD] group-hover:border-[#C9A86A]/60 bg-[#F8F4EC]">
                    <img 
                      src={chefItem.image || DEFAULT_CHEF_PROFILES[(slotNumber - 1) % DEFAULT_CHEF_PROFILES.length].image} 
                      alt={chefItem.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                    {/* Slot Tag */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-amber-300/90 text-xs font-mono font-black text-amber-900 flex items-center gap-1.5 shadow-md">
                      <ChefHat className="w-3.5 h-3.5 text-amber-700" />
                      <span>Chef #{slotNumber}</span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-amber-300/90 text-xs font-mono font-black text-amber-900 flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{(chefItem.rating || 4.9).toFixed(1)}</span>
                    </div>

                    {/* Floating Role on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-md flex items-center justify-between">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#1C1815] truncate">
                        {chefItem.role || 'Artisan Gastronomy Chef'}
                      </span>
                      <span className="text-[10px] font-mono text-amber-800 font-black shrink-0 ml-1.5">
                        {chefItem.experienceYears || 15}+ Yrs
                      </span>
                    </div>
                  </div>

                  {/* Chef Name & Details */}
                  <div className="space-y-2 pt-0.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 
                        className="text-xl sm:text-2xl font-normal text-[#1C1815] tracking-tight group-hover:text-amber-800 transition-colors leading-tight truncate"
                        style={{ fontFamily: "'Cormorant Garamond', 'Cinzel', serif" }}
                      >
                        {chefItem.name}
                      </h3>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`w-3.5 h-3.5 ${
                              s <= fullStars 
                                ? 'fill-amber-400 text-amber-500' 
                                : (s === fullStars + 1 && hasHalfStar)
                                  ? 'fill-amber-400/50 text-amber-500' 
                                  : 'text-stone-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Awards */}
                    {chefItem.awards && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 w-fit max-w-full">
                        <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{chefItem.awards}</span>
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-xs text-[#5C554E] font-medium leading-relaxed line-clamp-2 pt-0.5">
                      {chefItem.bio || 'Crafting evocative flavors celebrating culinary heritage and fine artisanal gastronomy.'}
                    </p>
                  </div>
                </div>

                {/* Bottom Stats & Action */}
                <div className="pt-3.5 mt-3.5 border-t border-[#E7DECD] space-y-3">
                  <div className="flex items-center justify-between text-[11px] bg-[#FAF7F2] px-3 py-2 rounded-xl border border-[#E7DECD]">
                    <span className="font-mono text-amber-900 text-[10px] font-bold uppercase truncate max-w-[130px]">{chefItem.speciality || 'Speciality'}</span>
                    <span className="font-mono text-emerald-700 font-black text-[10px]">{(chefItem.ratingCount || 1280).toLocaleString()}+ reviews</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleActionClick}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'عرض القائمة الخاصة' : "View Chef's Specials"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
