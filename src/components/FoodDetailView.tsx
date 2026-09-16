import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Star, 
  Clock, 
  Info, 
  ArrowLeft,
  ChevronRight,
  QrCode,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { MenuItem, SubscriptionPlan } from '../types';
import { Language, translations } from '../lib/translations';
import QrCodeManager from './QrCodeManager';
import { Play, MessageCircle, User as UserIcon } from 'lucide-react';

interface FoodDetailViewProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onView3D?: (item: MenuItem) => void;
  onSelectRelated: (item: MenuItem) => void;
  relatedItems: MenuItem[];
  lang: Language;
  plan: SubscriptionPlan;
}

const FoodDetailView: React.FC<FoodDetailViewProps> = ({ 
  item, 
  onClose, 
  onAddToCart, 
  onView3D,
  onSelectRelated,
  relatedItems,
  lang,
  plan
}) => {
  const t = (key: keyof typeof translations['bn']) => {
    return translations[lang][key] || translations['bn'][key];
  };

  const isElite = plan === 'elite';
  const isPro = plan === 'pro';
  const showAdvanced = plan !== 'basic';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [item]);

  const bgColor = isPro ? 'bg-[#f0f9ff]' : 'bg-[#f8f1e9]';
  const textColor = 'text-slate-900';
  const accentColor = isElite ? 'text-amber-500' : 'text-cyan-600';
  const cardBg = 'bg-white';

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className={`fixed inset-0 z-[100] ${bgColor} flex flex-col overflow-y-auto transition-colors duration-500`}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#f8f1e9]/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-amber-900/5">
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full shadow-sm border bg-white border-slate-200 text-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className={`font-display font-bold ${textColor}`}>{t('food_details' as any) || (lang === 'bn' ? 'খাবারের বিস্তারিত' : 'Food Details')}</h2>
        <div className="w-10" />
      </header>

      <div className="max-w-4xl mx-auto w-full flex-grow pb-24">
        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
          <div className="space-y-4">
            <motion.div 
              layoutId={`food-img-${item.id}`}
              className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.isChefSpecial && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {t('filter_special')}
                </div>
              )}
            </motion.div>

            {/* Video Section (Pro/Elite) */}
            {showAdvanced && item.videoUrl && (
              <div className={`rounded-3xl overflow-hidden shadow-xl ${cardBg} border ${isElite ? 'border-white/10' : 'border-slate-100'}`}>
                <div className="p-4 border-b border-inherit flex items-center gap-2">
                  <Play className={`w-4 h-4 ${isElite ? 'text-amber-500' : 'text-blue-500'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isElite ? 'text-slate-400' : 'text-slate-500'}`}>Experience the dish</span>
                </div>
                <video 
                  src={item.videoUrl} 
                  controls 
                  className="w-full h-auto aspect-video"
                  poster={item.image}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h1 className={`text-3xl font-display font-black ${textColor}`}>{item.name}</h1>
              <div className={`text-2xl font-display font-bold ${accentColor}`}>${item.price}</div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`flex items-center gap-1.5 ${isElite ? 'text-slate-400' : 'text-slate-500'} text-xs font-bold`}>
                <Clock className="w-3.5 h-3.5" />
                <span>15-20 Min</span>
              </div>
              <div className={`flex items-center gap-1.5 ${isElite ? 'text-slate-400' : 'text-slate-500'} text-xs font-bold`}>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>4.8 (120+ Reviews)</span>
              </div>
            </div>

            <p className={`${isElite ? 'text-slate-300' : 'text-slate-600'} leading-relaxed mb-8`}>
              {item.description}
            </p>

            {/* Benefits Section */}
            <div className={`${cardBg} rounded-3xl p-6 border ${isElite ? 'border-white/10' : 'border-amber-900/5'} shadow-sm mb-8`}>
              <h3 className={`font-display font-bold ${textColor} mb-4 flex items-center gap-2`}>
                <Info className={`w-4 h-4 ${isElite ? 'text-amber-500' : 'text-cyan-500'}`} />
                {lang === 'bn' ? 'কেন এই খাবারটি স্পেশাল?' : 'Why is this dish special?'}
              </h3>
              <ul className="space-y-3">
                {[
                  (lang === 'bn' ? 'তাজা উপকরণ দিয়ে তৈরি' : 'Made with fresh ingredients'),
                  (lang === 'bn' ? 'সেরা স্বাদের নিশ্চয়তা' : 'Best taste guaranteed'),
                  (lang === 'bn' ? 'স্বাস্থ্যসম্মত উপায়ে পরিবেশন' : 'Hygienically served')
                ].map((benefit, i) => (
                  <li key={i} className={`flex items-center gap-3 ${isElite ? 'text-slate-300' : 'text-slate-600'} text-sm`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section (Pro/Elite) */}
            {showAdvanced && item.reviews && (
              <div className={`${cardBg} rounded-3xl p-6 border ${isElite ? 'border-white/10' : 'border-amber-900/5'} shadow-sm mb-8`}>
                <h3 className={`font-display font-bold ${textColor} mb-6 flex items-center gap-2`}>
                  <MessageCircle className={`w-4 h-4 ${isElite ? 'text-amber-500' : 'text-blue-500'}`} />
                  {lang === 'bn' ? 'কাস্টমার রিভিউ' : 'Customer Reviews'}
                </h3>
                <div className="space-y-6">
                  {item.reviews.map(review => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isElite ? 'bg-slate-700' : 'bg-slate-100'}`}>
                            <UserIcon className={`w-4 h-4 ${isElite ? 'text-slate-400' : 'text-slate-500'}`} />
                          </div>
                          <span className={`text-sm font-black ${textColor}`}>{review.userName}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'opacity-20'}`} />
                          ))}
                        </div>
                      </div>
                      <p className={`text-xs ${isElite ? 'text-slate-400' : 'text-slate-600'} italic`}>"{review.comment}"</p>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-6 py-2 rounded-xl border ${isElite ? 'border-white/10 text-amber-500 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'} text-[10px] font-black uppercase tracking-widest transition-all`}>
                  {lang === 'bn' ? 'সব রিভিউ দেখুন' : 'View all reviews'}
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => onAddToCart(item)}
                className={`flex items-center justify-center gap-2 ${isElite ? 'bg-amber-500 text-slate-900' : 'bg-slate-900 text-white'} py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all`}
              >
                <ShoppingBag className="w-5 h-5" />
                {t('order_now')}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onView3D?.(item)}
                  className={`flex items-center justify-center gap-2 ${isElite ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-purple-50 text-purple-700 border border-purple-100'} py-4 rounded-2xl font-bold shadow-sm active:scale-95 transition-all cursor-pointer`}
                >
                  <QrCode className="w-5 h-5" />
                  {lang === 'bn' ? 'থ্রিডিতে দেখুন' : 'View in 3D AR'}
                </button>
                
                <div className={`flex items-center justify-center gap-2 ${isElite ? 'bg-slate-800 text-white border border-white/10' : 'bg-slate-100 text-slate-600 border border-slate-200'} py-4 rounded-2xl font-bold shadow-sm active:scale-95 transition-all cursor-pointer`}>
                  <QrCode className="w-5 h-5" />
                  {lang === 'bn' ? 'কিউআর কোড' : 'QR Menu'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Food Items Section */}
        <div className="mt-12 px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-display font-bold ${textColor}`}>
              {lang === 'bn' ? 'আরও সুস্বাদু খাবার' : 'More Delicious Food'}
            </h2>
            <div className={`h-px flex-grow mx-4 ${isElite ? 'bg-white/10' : 'bg-slate-200'}`} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedItems.filter(i => i.id !== item.id).slice(0, 4).map((related) => (
              <motion.div
                key={related.id}
                onClick={() => onSelectRelated(related)}
                whileHover={{ y: -5 }}
                className={`${cardBg} rounded-2xl p-3 border ${isElite ? 'border-white/10' : 'border-slate-100'} shadow-sm cursor-pointer group`}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-3">
                  <img src={related.image} alt={related.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <h4 className={`text-[11px] font-bold ${textColor} truncate`}>{related.name}</h4>
                <div className={`text-[10px] font-bold ${accentColor}`}>${related.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodDetailView;
