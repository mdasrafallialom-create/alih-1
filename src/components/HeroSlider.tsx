import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../lib/translations';

import heroWaterfront from '../assets/images/hero_waterfront_1786551372791.jpg';
import heroCoastal from '../assets/images/hero_coastal_1786551396930.jpg';
import heroDining from '../assets/images/hero_dining_1786551419424.jpg';

import { getHeroSlidesForLocation } from '../data/countryHeroImages';

interface SlideItem {
  id: number;
  image: string;
  title: string;
  highlight: string;
  subtitle: string;
  tag: string;
}

interface HeroSliderProps {
  lang: Language;
  brandLocation?: string;
  brandName?: string;
  heroImages?: string[];
  heroSlides?: {
    id: number;
    image: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    tag?: string;
  }[];
  plan?: string;
}

export function HeroSlider({ 
  lang, 
  brandLocation = '', 
  brandName = '', 
  heroImages,
  heroSlides,
  plan = 'basic'
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Compute active slides dynamically based on location or custom admin slides and restrict by plan tier
  const activeSlides: SlideItem[] = React.useMemo(() => {
    let slides: SlideItem[] = [];

    // 1. If explicit custom heroSlides are configured in admin
    if (heroSlides && heroSlides.length >= 1 && heroSlides.some(s => s && s.image)) {
      slides = heroSlides.map((s, idx) => ({
        id: s.id || idx + 1,
        image: s.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
        title: s.title || `Gourmet Specialty #${idx + 1}`,
        highlight: s.highlight || '3D WebAR Experience',
        subtitle: s.subtitle || 'Explore our chef-curated culinary creations and virtual menu in WebAR.',
        tag: s.tag || 'Luxury Dining Experience'
      }));
    } else if (heroImages && heroImages.length >= 1 && heroImages.some(img => !!img)) {
      // 2. If explicit heroImages array is provided
      const locationDefaults = getHeroSlidesForLocation(brandLocation, brandName);
      slides = locationDefaults.map((def, idx) => ({
        ...def,
        image: heroImages[idx] || def.image
      }));
    } else {
      // 3. Automatic country-based luxury restaurant slides
      slides = getHeroSlidesForLocation(brandLocation, brandName);
    }

    // Strictly enforce plan-based limits: $15 Basic = 1 slide, $49 Pro = 3 slides, $99 Elite = 4 slides
    const maxAllowed = plan === 'basic' ? 1 : plan === 'pro' ? 3 : 4;
    return slides.slice(0, maxAllowed);
  }, [brandLocation, brandName, heroImages, heroSlides, plan]);

  const getLocalizedHero = (index: number) => {
    const slide = activeSlides[index] || activeSlides[0];
    if (lang === 'bn') {
      const bnSlides = [
        { 
          title: brandName ? `${brandName}-এ স্বাগতম` : 'সেরা স্বাদের অভিজাত খাবার', 
          highlight: 'WebAR 3D রিয়ালিটিতে', 
          subtitle: 'অর্ডার করার আগে আপনার টেবিলের উপর সরাসরি ব্রাউজার থেকে আমাদের থ্রিডি ফুড মডেলগুলো দেখুন।', 
          tag: slide.tag || '3D WebAR ডাইনিং অভিজ্ঞতা' 
        },
        { 
          title: 'আর্টিসান উড-ফায়ার্ড পিজ্জা ও বার্গার', 
          highlight: 'শেফের সেরা মাস্টারপিস কালেকশন', 
          subtitle: 'সেরা অর্গানিক উপাদান দিয়ে আমাদের দক্ষ শেফদের হাতে প্রতিদিন তৈরি করা হয় টাটকা খাবার।', 
          tag: slide.tag || 'প্রতিদিন টাটকা তৈরি ও গ্রিল করা' 
        },
        { 
          title: 'অসাধারণ রিফ্রেশিং ককটেল', 
          highlight: 'ও মুখরোচক ডেজার্ট', 
          subtitle: 'আপনার ডাইনিং অভিজ্ঞতাকে আরও আনন্দদায়ক করতে উপভোগ করুন আমাদের স্পেশাল মকটেল ও ইউরোপীয় পেস্ট্রি।', 
          tag: slide.tag || 'সিগনেচার বেভারেজ ও ডেজার্ট' 
        }
      ];
      return bnSlides[index] || slide;
    }
    if (lang === 'ar') {
      const arSlides = [
        { title: 'تذوق المأكولات الفاخرة', highlight: 'بتقنية الواقع المعزز WebAR', subtitle: 'استكشف نماذج طعام ثلاثية الأبعاد معتمدة داخل مساحة طاولتك مباشرة من متصفحك قبل الطلب.', tag: slide.tag || 'تجربة تناول طعام ثلاثية الأبعاد' },
        { title: 'بيتزا وبرغر على الحطب', highlight: 'مجموعة روائع الشيف', subtitle: 'مصنوعة يدوياً بمكونات عضوية ومتميزة ومخبوزة طازجة يومياً من قبل كبار الطهاة.', tag: slide.tag || 'مخبوز ومشوي طازج يومياً' },
        { title: 'كوكتيلات منعشة رائعة', highlight: 'وحلويات فاخرة', subtitle: 'قم بإقران تجربة تناول الطعام الخاصة بك مع موكتيلات مخصصة ومعجنات أوروبية مصنوعة يدوياً.', tag: slide.tag || 'مشروبات وحلويات مميزة' }
      ];
      return arSlides[index] || slide;
    }
    // Default English
    return {
      title: slide.title,
      highlight: slide.highlight,
      subtitle: slide.subtitle,
      tag: slide.tag
    };
  };

  // Calm Auto-slide effect every 6.5 seconds (6500ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group h-[380px] sm:h-[440px] lg:h-[480px]">
      
      {/* 3 SLIDE IMAGES WITH SMOOTH CROSSFADE */}
      {activeSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        const localized = getLocalizedHero(index);
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out transform-gpu backface-hidden ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image without jittery scaling */}
            <img
              src={slide.image}
              alt={localized.title}
              referrerPolicy="no-referrer"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80';
              }}
              className="w-full h-full object-cover select-none"
            />

            {/* Gradient Overlays for High Contrast Readability */}
            <div className={`absolute inset-0 bg-gradient-to-r ${lang === 'ar' ? 'from-transparent via-slate-950/60 to-slate-950/90' : 'from-slate-950/90 via-slate-950/60 to-transparent'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

            {/* Slide Content Overlay */}
            <div className={`absolute inset-0 p-6 sm:p-12 flex flex-col justify-center max-w-2xl text-white space-y-4 z-20 ${lang === 'ar' ? 'mr-auto text-right' : ''}`}>
              
              {/* Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold backdrop-blur-md w-fit ${lang === 'ar' ? 'mr-auto' : ''}`}>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{localized.tag}</span>
              </div>

              {/* Title & Highlight */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight select-none">
                {localized.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300">
                  {localized.highlight}
                </span>
              </h2>

              {/* Subtitle */}
              <p className={`text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg select-none ${lang === 'ar' ? 'mr-auto' : ''}`}>
                {localized.subtitle}
              </p>

            </div>
          </div>
        );
      })}

      {/* MANUAL NAVIGATION ARROWS */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
        title="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
        title="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default React.memo(HeroSlider);
