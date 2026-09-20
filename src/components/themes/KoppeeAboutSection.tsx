import React from 'react';
import { Coffee, CheckCircle2, ArrowRight } from 'lucide-react';
import { TornPaperEdge } from './TornPaperEdge';

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
}

export const KoppeeAboutSection: React.FC<KoppeeAboutSectionProps> = ({
  brandName = 'KOPPEE',
  brandLogoUrl,
  brandDescription,
  aboutUsTitle,
  aboutUsSubtitle = 'ABOUT OUR RESTAURANT',
  aboutUsText,
  aboutUsImage,
  aboutUsFeatures,
  onReserveClick,
  onMenuClick,
  lang = 'en'
}) => {
  const displayTitle = aboutUsTitle || (lang === 'bn' ? 'কেন আমাদের কাছে খাবেন?' : 'Why Dine With Us?');
  const defaultStory = brandDescription || `Redefining luxury dining experiences in Bangladesh. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews. At ${brandName}, we take pride in serving hand-selected, freshly prepared meals crafted with precision and passion.`;
  const storyText = aboutUsText || defaultStory;
  const imageSrc = aboutUsImage || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop';

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

  return (
    <section id="about" className="relative w-full bg-[#FFFBF2] text-[#2c1e13] overflow-hidden">
      {/* Torn paper top edge */}
      <TornPaperEdge color="#FFFBF2" position="top" className="-mt-1" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-20">
        
        {/* WHY DINE WITH US? (কেন আমাদের কাছে খাবেন?) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Image with Overlay Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DA9F93]/25 bg-white">
              <img 
                src={imageSrc} 
                alt={displayTitle}
                className="w-full h-[340px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Bottom Left Artisanal Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-[#1e140d]/92 backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#DA9F93] text-[#1e140d] flex items-center justify-center shrink-0 shadow">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DA9F93] block">
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
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2.5">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#DA9F93] block">
                {aboutUsSubtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e140d] leading-tight">
                {displayTitle}
              </h2>
              {storyText && (
                <p className="text-xs sm:text-sm md:text-base text-[#3e2c1e]/80 leading-relaxed pt-1">
                  {storyText}
                </p>
              )}
            </div>

            {/* Checklist items with CheckCircle2 Tick Icons */}
            <div className="space-y-3.5 pt-2">
              {featuresList.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#DA9F93]/20 text-[#DA9F93] flex items-center justify-center shrink-0 border border-[#DA9F93]/40">
                    <CheckCircle2 className="w-4 h-4 text-[#DA9F93]" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#2c1e13]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onReserveClick}
                className="px-8 py-4 rounded-full bg-[#3e271a] hover:bg-[#28180e] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'BOOK A TABLE'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onMenuClick}
                className="px-8 py-4 rounded-full border-2 border-[#3e271a] text-[#3e271a] hover:bg-[#3e271a] hover:text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'মেনু দেখুন' : 'EXPLORE MENU'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Torn paper bottom edge */}
      <TornPaperEdge color="#FFFBF2" position="bottom" className="-mb-1" />
    </section>
  );
};

export default KoppeeAboutSection;
