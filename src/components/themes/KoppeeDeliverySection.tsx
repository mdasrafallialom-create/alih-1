import React from 'react';
import { Truck, Banknote, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { TornPaperEdge } from './TornPaperEdge';

interface KoppeeDeliverySectionProps {
  brandName?: string;
  lang?: string;
}

export const KoppeeDeliverySection: React.FC<KoppeeDeliverySectionProps> = ({
  brandName = 'KOPPEE',
  lang = 'en'
}) => {
  return (
    <section id="delivery" className="relative w-full bg-[#FFFBF2] text-[#2c1e13] overflow-hidden">
      {/* Torn paper divider at the top transition */}
      <TornPaperEdge color="#FFFBF2" position="top" className="-mt-1" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-20">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#DA9F93] block">
            {lang === 'bn' ? 'ডেলিভারি ও ক্যাশ অন ডেলিভারি সিস্টেম' : 'DELIVERY & CASH ON DELIVERY SYSTEM'}
          </span>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1e140d] leading-tight">
            {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি ও দ্রুত হোম সার্ভিস' : 'Express Delivery & Cash On Delivery'}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[#3e2c1e]/80 leading-relaxed">
            {lang === 'bn' 
              ? 'পছন্দের খাবার সরাসরি অনলাইনে বা টেবিলে বসে অর্ডার করুন এবং সহজে ক্যাশ অন ডেলিভারি (COD) অথবা বিকাশ/নগদে নিশ্চিন্তে মূল্য পরিশোধ করুন।' 
              : `Order your favourite dishes from ${brandName} online or at table, and conveniently pay with Cash on Delivery or Mobile Banking upon receiving your hot meal.`
            }
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Cash on Delivery */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DA9F93]/30 shadow-md hover:shadow-xl transition-all space-y-3 relative group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <Banknote className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#1e140d]">
              {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash On Delivery (COD)'}
            </h4>
            <p className="text-xs sm:text-sm text-[#3e2c1e]/75 leading-relaxed">
              {lang === 'bn' ? 'খাবার হাতে পাওয়ার পর নিশ্চিন্তে ক্যাশে বা বিকাশ/নগদে বিল পরিশোধের সুবিধা।' : 'Pay conveniently upon receiving your hot meal directly at home or at table.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'bn' ? '১০০% বিশ্বস্ত পেমেন্ট' : '100% Secure Payment'}</span>
            </div>
          </div>

          {/* Card 2: Doorstep Express Delivery */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DA9F93]/30 shadow-md hover:shadow-xl transition-all space-y-3 relative group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#DA9F93]/20 text-[#3e271a] flex items-center justify-center transition-transform group-hover:scale-110">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#1e140d]">
              {lang === 'bn' ? 'হোম ও টেবিল ডেলিভারি' : 'Doorstep & Table Express'}
            </h4>
            <p className="text-xs sm:text-sm text-[#3e2c1e]/75 leading-relaxed">
              {lang === 'bn' ? 'রেস্তোরাঁর সেরা স্বাদের খাবার আপনার বাসা কিংবা রেস্তোরাঁর টেবিলে পৌঁছে যাবে দ্রুত।' : 'Fast hot delivery right to your home, office, or designated dining table.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#3e271a]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#DA9F93]" />
              <span>{lang === 'bn' ? 'সর্বোচ্চ গতি ও যত্ন' : 'Fast Kitchen Dispatch'}</span>
            </div>
          </div>

          {/* Card 3: Safe & Sealed Packaging */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DA9F93]/30 shadow-md hover:shadow-xl transition-all space-y-3 relative group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#1e140d]">
              {lang === 'bn' ? '১০০% হাইজিন প্যাকেজিং' : 'Sealed Hygienic Packaging'}
            </h4>
            <p className="text-xs sm:text-sm text-[#3e2c1e]/75 leading-relaxed">
              {lang === 'bn' ? 'পরিবেশবান্ধব ও সিলড প্যাকেজিং যা খাবারের উষ্ণতা এবং তাজা স্বাদ বজায় রাখে।' : 'Thermal eco-friendly sealed packaging preserving heat, freshness, and original flavor.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'ফুড-গ্রেড সিলড বক্স' : 'Food-Grade Sealed'}</span>
            </div>
          </div>

          {/* Card 4: Instant Status Updates */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DA9F93]/30 shadow-md hover:shadow-xl transition-all space-y-3 relative group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#1e140d]">
              {lang === 'bn' ? 'লাইভ অর্ডার ট্র্যাকিং' : 'Real-time Order Status'}
            </h4>
            <p className="text-xs sm:text-sm text-[#3e2c1e]/75 leading-relaxed">
              {lang === 'bn' ? 'রান্নাঘর থেকে ডেলিভারি পর্যন্ত প্রতিটি ধাপ সরাসরি ফোন স্ক্রিনে দেখুন।' : 'Live status tracking from kitchen chef prep to rider delivery dispatch.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-cyan-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>{lang === 'bn' ? 'রিয়েল-টাইম আপডেট' : 'Live SMS & Screen Tracking'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default KoppeeDeliverySection;
