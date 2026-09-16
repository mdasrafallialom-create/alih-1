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

  const chefProfilesList: ChefProfile[] = (settings?.chefProfiles && settings.chefProfiles.length > 0)
    ? settings.chefProfiles
    : settings?.chefProfile
      ? [settings.chefProfile, ...DEFAULT_CHEF_PROFILES.slice(1)]
      : DEFAULT_CHEF_PROFILES;

  // Duplicate items 4 times to ensure a seamless infinite glide across ultra-wide monitors
  const displayList = [
    ...chefProfilesList.slice(0, 6),
    ...chefProfilesList.slice(0, 6),
    ...chefProfilesList.slice(0, 6),
    ...chefProfilesList.slice(0, 6)
  ];

  return (
    <section id="chef-showcase" className="py-16 sm:py-20 bg-[#15162B] border-t border-b border-[#C9A86A]/20 text-[#F4E7D3] relative overflow-hidden w-full select-none">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A86A]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-[10px] font-bold tracking-[0.25em] uppercase">
            <ChefHat className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>{lang === 'bn' ? 'আমাদের প্রধান শেফ' : lang === 'ar' ? 'طاقم الطهاة التنفيذيين' : 'OUR EXECUTIVE CHEFS'}</span>
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-normal text-[#F4E7D3] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Cinzel', 'Playfair Display', serif" }}
          >
            {lang === 'bn' ? 'স্বাদ ও শিল্পকলার মেলবন্ধন' : lang === 'ar' ? 'إبداع الطهي والخبرة العالمية' : 'Culinary Mastery & Passion'}
          </h2>
          <p className="text-xs sm:text-sm text-[#F4E7D3]/75 font-light leading-relaxed">
            {lang === 'bn' 
              ? 'প্রতিটি পদ প্রস্তুত করা হয় পরম যত্ন, নিখুঁত অভিজ্ঞতা ও সর্বোচ্চ আন্তর্জাতিক মান বজায় রেখে।' 
              : lang === 'ar'
                ? 'يتم إعداد كل طبق بأعلى درجات العناية والخبرة لتقديم تجربة طعام استثنائية.'
                : 'Every recipe is an artistic balance of heritage gastronomy, precision culinary craftsmanship and soul.'}
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent mx-auto mt-2" />
        </div>
      </div>

      {/* Full-Width Continuous Gliding Carousel Track (Pauses on Hover / Touch) */}
      <div 
        className="w-full relative z-10 px-0 group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex flex-row flex-nowrap gap-4 sm:gap-5 overflow-x-auto select-none scroll-smooth py-3 px-2"
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
                className="w-[280px] sm:w-[310px] shrink-0 bg-[#1B1D36]/90 rounded-3xl p-4 sm:p-5 border border-[#C9A86A]/30 shadow-2xl backdrop-blur-sm flex flex-col justify-between hover:border-[#C9A86A] hover:shadow-[#C9A86A]/20 hover:-translate-y-1.5 transition-all duration-300 group relative"
              >
                {/* Decorative Corner Accents */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#C9A86A]/50 group-hover:border-[#C9A86A] rounded-tl-lg pointer-events-none transition-colors" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#C9A86A]/50 group-hover:border-[#C9A86A] rounded-br-lg pointer-events-none transition-colors" />

                {/* Top: Compact Chef Portrait */}
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/4.6] w-full shadow-lg border-2 border-[#C9A86A]/30 bg-[#15162B]">
                    <img 
                      src={chefItem.image || DEFAULT_CHEF_PROFILES[(slotNumber - 1) % DEFAULT_CHEF_PROFILES.length].image} 
                      alt={chefItem.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15162B]/90 via-transparent to-transparent pointer-events-none" />

                    {/* Slot Tag */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs border border-[#C9A86A]/40 text-xs font-mono font-bold text-[#C9A86A] flex items-center gap-1.5 shadow-md">
                      <ChefHat className="w-3.5 h-3.5 text-[#C9A86A]" />
                      <span>Chef #{slotNumber}</span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs border border-amber-500/40 text-xs font-mono font-bold text-amber-300 flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{(chefItem.rating || 4.9).toFixed(1)}</span>
                    </div>

                    {/* Floating Role on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-[#15162B]/90 backdrop-blur-md border border-[#C9A86A]/30 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#F4E7D3] truncate">
                        {chefItem.role || 'Artisan Gastronomy Chef'}
                      </span>
                      <span className="text-[10px] font-mono text-[#C9A86A] font-bold shrink-0 ml-1.5">
                        {chefItem.experienceYears || 15}+ Yrs
                      </span>
                    </div>
                  </div>

                  {/* Chef Name & Details */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 
                        className="text-xl sm:text-2xl font-normal text-[#F4E7D3] tracking-tight group-hover:text-[#C9A86A] transition-colors leading-tight truncate"
                        style={{ fontFamily: "'Cormorant Garamond', 'Cinzel', serif" }}
                      >
                        {chefItem.name}
                      </h3>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`w-3 h-3 ${
                              s <= fullStars 
                                ? 'fill-amber-400 text-amber-400' 
                                : (s === fullStars + 1 && hasHalfStar)
                                  ? 'fill-amber-400/50 text-amber-400' 
                                  : 'text-slate-600'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Awards */}
                    {chefItem.awards && (
                      <div className="flex items-center gap-1 text-[11px] text-[#C9A86A] font-medium">
                        <Award className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                        <span className="truncate">{chefItem.awards}</span>
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-xs text-[#F4E7D3]/75 font-light leading-relaxed line-clamp-2 pt-0.5">
                      {chefItem.bio || 'Crafting evocative flavors celebrating culinary heritage and fine artisanal gastronomy.'}
                    </p>
                  </div>
                </div>

                {/* Bottom Stats & Action */}
                <div className="pt-3 mt-3 border-t border-[#C9A86A]/20 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] bg-[#15162B]/80 px-2.5 py-1.5 rounded-xl border border-[#C9A86A]/15">
                    <span className="font-mono text-[#C9A86A] text-[10px] uppercase truncate max-w-[130px]">{chefItem.speciality || 'Speciality'}</span>
                    <span className="font-mono text-emerald-400 font-bold text-[10px]">{(chefItem.ratingCount || 1280).toLocaleString()}+ reviews</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleActionClick}
                    className="w-full py-2 px-3 rounded-xl bg-[#C9A86A]/15 hover:bg-[#C9A86A] border border-[#C9A86A]/40 text-[#C9A86A] hover:text-[#15162B] font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'শেফের স্পেশাল মেনু দেখুন' : lang === 'ar' ? 'عرض القائمة الخاصة' : "View Chef's Specials"}</span>
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
