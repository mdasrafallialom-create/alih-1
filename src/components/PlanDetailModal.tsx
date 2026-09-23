import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Star, 
  Crown, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight,
  ExternalLink,
  Percent,
  Layers,
  Palette,
  QrCode,
  Smartphone,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { PricingPlan, SubscriptionPlan, BillingCycle } from '../types';

interface PlanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId: SubscriptionPlan;
  initialBillingCycle?: BillingCycle;
  onSelectPlan: (plan: SubscriptionPlan, cycle: BillingCycle) => void;
  onOpenPayment: (plan: PricingPlan, cycle: BillingCycle) => void;
  lang?: string;
  isDark?: boolean;
}

export const PLAN_DATA: Record<SubscriptionPlan, {
  name: string;
  badge: string;
  tagline: string;
  monthly: number;
  biannual: number; // 6 months with discount (e.g. 15% off)
  annual: number;   // 12 months with discount (e.g. 25% off)
  biannualTotal: number;
  annualTotal: number;
  color: string;
  accentBg: string;
  borderColor: string;
  themeCount: number;
  menuTemplatesCount: number;
  storageDays: string;
  supportLevel: string;
  highlights: string[];
  allFeatures: { category: string; features: { name: string; included: boolean; note?: string }[] }[];
}> = {
  basic: {
    name: 'STARTER BASIC',
    badge: 'Standard Starter',
    tagline: 'Ideal for single cafes, small bakeries, and food trucks starting with 3D WebAR menus.',
    monthly: 15,
    biannual: 13, // $78 for 6 mo (~13% off)
    annual: 11,   // $132 for 1 yr (~26% off)
    biannualTotal: 78,
    annualTotal: 132,
    color: 'from-blue-600 to-indigo-600',
    accentBg: 'bg-blue-50 text-blue-700',
    borderColor: 'border-blue-200',
    themeCount: 10,
    menuTemplatesCount: 100,
    storageDays: '7 Days History',
    supportLevel: 'Email Support (48h)',
    highlights: [
      '10 Full High-End Themes',
      '100+ Menu Card Studio Templates',
      'Instant Live 3D Food AR Viewer',
      'Digital Food Category Manager',
      'Instagram Social Marketing Link'
    ],
    allFeatures: [
      {
        category: 'Themes & Visuals',
        features: [
          { name: '10 Premium Themes Included', included: true },
          { name: '100+ Menu Card Designs', included: true },
          { name: 'Full 3D WebAR Interactive Food Viewer', included: true },
          { name: 'Custom Restaurant Monogram Crest Logo', included: true },
          { name: 'Custom Domain Mapping', included: false, note: 'Available in Pro & Elite' },
        ]
      },
      {
        category: 'Operations & Management',
        features: [
          { name: 'Real-time Live Order Tracking', included: true },
          { name: '7-Day Order History & Storage', included: true },
          { name: 'Smart Category & Price Control', included: true },
          { name: 'Staff Waiter Call Button', included: true },
          { name: 'Advanced Multi-Branch Kitchen POS', included: false, note: 'Elite only' },
        ]
      },
      {
        category: 'Marketing & Support',
        features: [
          { name: 'Instagram Marketing Link', included: true },
          { name: 'Facebook & YouTube Link Suite', included: false, note: 'Available in Pro' },
          { name: 'QR Code Menu Generator', included: true },
          { name: 'Priority 24/7 Concierge Support', included: false, note: 'Standard Email' },
        ]
      }
    ]
  },
  pro: {
    name: 'PROFESSIONAL PRO',
    badge: 'Most Popular ⭐',
    tagline: 'Best for busy restaurants, fine dining & growing brands wanting custom domains and full theme access.',
    monthly: 49,
    biannual: 41, // $246 for 6 mo (~16% off)
    annual: 36,   // $432 for 1 yr (~26% off)
    biannualTotal: 246,
    annualTotal: 432,
    color: 'from-amber-500 to-orange-600',
    accentBg: 'bg-orange-50 text-orange-700',
    borderColor: 'border-orange-300',
    themeCount: 25,
    menuTemplatesCount: 500,
    storageDays: '90 Days History',
    supportLevel: 'Priority VIP Support (12h)',
    highlights: [
      '25 Luxury Restaurant Themes',
      '500+ Menu Card Studio Designs',
      'Advanced QR Code Management & Analytics',
      'Full Social Marketing Suite (IG, FB, YT)',
      'Custom Domain Connection Ready',
      'Priority VIP Support'
    ],
    allFeatures: [
      {
        category: 'Themes & Visuals',
        features: [
          { name: '25 Luxury Themes Included', included: true },
          { name: '500+ Menu Card Studio Designs', included: true },
          { name: 'Full 3D WebAR Interactive Food Viewer', included: true },
          { name: 'Custom Restaurant Monogram Crest Logo', included: true },
          { name: 'Custom Domain Mapping', included: true },
        ]
      },
      {
        category: 'Operations & Management',
        features: [
          { name: 'Real-time Live Order Tracking', included: true },
          { name: '90-Day Extended Order History', included: true },
          { name: 'Smart Category & Price Control', included: true },
          { name: 'Staff Waiter Call Button', included: true },
          { name: 'Advanced Multi-Branch Kitchen POS', included: false, note: 'Elite only' },
        ]
      },
      {
        category: 'Marketing & Support',
        features: [
          { name: 'Instagram Marketing Link', included: true },
          { name: 'Facebook & YouTube Link Suite', included: true },
          { name: 'QR Code Menu Generator & Analytics', included: true },
          { name: 'Priority VIP Support Desk', included: true },
        ]
      }
    ]
  },
  elite: {
    name: 'ELITE LUXURY VIP',
    badge: 'Enterprise & Luxury Chains 👑',
    tagline: 'The ultimate culinary ecosystem for luxury chains, 5-star hotels, and international restaurant groups.',
    monthly: 99,
    biannual: 82, // $492 for 6 mo (~17% off)
    annual: 69,   // $828 for 1 yr (~30% off)
    biannualTotal: 492,
    annualTotal: 828,
    color: 'from-slate-900 via-indigo-950 to-slate-900',
    accentBg: 'bg-indigo-50 text-indigo-900',
    borderColor: 'border-indigo-400',
    themeCount: 50,
    menuTemplatesCount: 1000,
    storageDays: 'Lifetime Unlimited',
    supportLevel: '24/7 Dedicated Concierge Call',
    highlights: [
      '50+ All Luxury Themes & Custom Studio',
      '1000+ Unlimited Menu Card Designs',
      'AI-Powered Revenue & Dining Analytics',
      'Full Multi-Channel Marketing (IG, FB, YT, LinkedIn)',
      'Multi-Branch & Master POS Routing',
      '24/7 Dedicated Account Concierge'
    ],
    allFeatures: [
      {
        category: 'Themes & Visuals',
        features: [
          { name: '50+ Complete Theme Collection', included: true },
          { name: '1000+ Unlimited Studio Designs', included: true },
          { name: 'Full 3D WebAR Interactive Food Viewer', included: true },
          { name: 'Custom Bespoke Crest & Branding', included: true },
          { name: 'White-Label & Custom Domains', included: true },
        ]
      },
      {
        category: 'Operations & Management',
        features: [
          { name: 'Real-time Live Order Tracking', included: true },
          { name: 'Lifetime Unlimited Cloud History', included: true },
          { name: 'Smart Category & Price Control', included: true },
          { name: 'Staff Waiter Call & Table Floor Planner', included: true },
          { name: 'Advanced Multi-Branch Kitchen POS', included: true },
        ]
      },
      {
        category: 'Marketing & Support',
        features: [
          { name: 'Full Social Ecosystem (IG, FB, YT, LinkedIn)', included: true },
          { name: 'AI Dining Analytics & Sales Reports', included: true },
          { name: 'Unlimited Dynamic QR Codes', included: true },
          { name: '24/7 Dedicated Concierge & Setup Call', included: true },
        ]
      }
    ]
  }
};

const PlanDetailModal: React.FC<PlanDetailModalProps> = ({
  isOpen,
  onClose,
  initialPlanId = 'pro',
  initialBillingCycle = 'monthly',
  onSelectPlan,
  onOpenPayment,
  lang = 'en',
  isDark = false
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);

  if (!isOpen) return null;

  const currentPlanData = PLAN_DATA[initialPlanId];

  const getPricePerMonth = () => {
    if (billingCycle === 'annual') return currentPlanData.annual;
    if (billingCycle === 'biannual') return currentPlanData.biannual;
    return currentPlanData.monthly;
  };

  const getTotalBill = () => {
    if (billingCycle === 'annual') return currentPlanData.annualTotal;
    if (billingCycle === 'biannual') return currentPlanData.biannualTotal;
    return currentPlanData.monthly;
  };

  const getSavingsPercent = () => {
    if (billingCycle === 'annual') return 'Save 30%';
    if (billingCycle === 'biannual') return 'Save 17%';
    return null;
  };

  const isStarter = initialPlanId === 'basic';
  const isPro = initialPlanId === 'pro';
  const isElite = initialPlanId === 'elite';

  // Lock background page scroll when plan modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 overflow-hidden bg-slate-950">
        {/* Full-Page Modal View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full h-full max-w-full max-h-screen bg-white overflow-hidden flex flex-col"
        >
          {/* Top Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between gap-4 shrink-0 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                isStarter ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                isPro ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' :
                'bg-amber-400/20 text-amber-300 border border-amber-400/30'
              }`}>
                {isStarter && <Zap className="w-7 h-7 text-blue-400" />}
                {isPro && <Star className="w-7 h-7 text-orange-400" />}
                {isElite && <Crown className="w-7 h-7 text-amber-300" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isStarter ? 'bg-blue-400/20 text-blue-300 border border-blue-400/30' :
                    isPro ? 'bg-orange-400/20 text-orange-300 border border-orange-400/30' :
                    'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  }`}>
                    {currentPlanData.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-300">
                    Avernao WebAR Ecosystem
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {currentPlanData.name}
                </h2>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
              title="Close Page"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Billing Cycle Switcher: Monthly vs 6 Months vs 1 Year */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Select Billing Term:
              </span>
              {getSavingsPercent() && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-200 animate-pulse">
                  <Percent className="w-3.5 h-3.5" /> {getSavingsPercent()}
                </span>
              )}
            </div>

            {/* Billing Cycle Switch Buttons */}
            <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer select-none ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                1 Month (Monthly)
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('biannual')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer select-none relative flex items-center gap-2 ${
                  billingCycle === 'biannual'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>6 Months</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  billingCycle === 'biannual' ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                }`}>
                  -17% OFF
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer select-none relative flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>1 Year (Annual)</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  billingCycle === 'annual' ? 'bg-emerald-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  -30% OFF
                </span>
              </button>
            </div>
          </div>

          {/* Modal Body: Scrollable Plan Breakdown exclusively for this plan */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6 max-w-7xl w-full mx-auto">
            {/* Selected Plan Hero Box */}
            <div className={`p-6 sm:p-8 rounded-[2rem] border ${currentPlanData.borderColor} bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/20 shadow-md relative overflow-hidden`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${currentPlanData.accentBg}`}>
                      {currentPlanData.badge}
                    </span>
                    {billingCycle !== 'monthly' && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        {billingCycle === 'annual' ? 'Annual 30% Savings Applied' : '6-Month 17% Savings Applied'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentPlanData.name}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1 max-w-xl">
                    {currentPlanData.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="lg:text-right shrink-0 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm min-w-[240px]">
                  <div className="flex items-baseline lg:justify-end gap-2">
                    <span className="text-4xl sm:text-5xl font-display font-black text-slate-900">
                      ${getPricePerMonth()}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      / Month
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {billingCycle === 'monthly' ? (
                      <span>Billed monthly at <strong>${currentPlanData.monthly}</strong>/mo</span>
                    ) : billingCycle === 'biannual' ? (
                      <span>Total 6-Month term: <strong className="text-indigo-600 font-black">${currentPlanData.biannualTotal}</strong> (Save 17%)</span>
                    ) : (
                      <span>Total 1-Year term: <strong className="text-emerald-600 font-black">${currentPlanData.annualTotal}</strong> (Save 30%)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 3 Core Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <Palette className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Themes Included</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {currentPlanData.themeCount} Luxury Themes
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">High-end 3D WebAR UI systems</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-500 mb-1">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Menu Studio</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {currentPlanData.menuTemplatesCount}+ Templates
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Studio & Canva food card designs</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Support Level</span>
                  </div>
                  <div className="text-base font-black text-slate-900 truncate">
                    {currentPlanData.supportLevel}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Continuous platform maintenance</div>
                </div>
              </div>
            </div>

            {/* Categorized Detailed Feature Checklist */}
            <div className="space-y-4">
              <h4 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Included in {currentPlanData.name}:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {currentPlanData.allFeatures.map((cat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between">
                      <span>{cat.category}</span>
                      <span className="text-[10px] text-slate-400 font-bold">Category {idx + 1}</span>
                    </h5>
                    <div className="space-y-2.5">
                      {cat.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                          {feat.included ? (
                            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-3 h-3 text-slate-400" />
                            </div>
                          )}
                          <div>
                            <span className={feat.included ? 'font-bold text-slate-800' : 'text-slate-400 line-through'}>
                              {feat.name}
                            </span>
                            {feat.note && (
                              <span className="block text-[10px] text-indigo-600 font-semibold mt-0.5">
                                {feat.note}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-slate-500 block">
                Selected Package & Term:
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900">
                {currentPlanData.name} ({billingCycle === 'annual' ? '1 Year' : billingCycle === 'biannual' ? '6 Months' : '1 Month'}) — ${getTotalBill()}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  const planIdKey: SubscriptionPlan = (initialPlanId as SubscriptionPlan) || 'pro';
                  const pricingObj: PricingPlan = {
                    id: planIdKey,
                    name: currentPlanData.name,
                    price: getTotalBill(),
                    period: billingCycle === 'annual' ? 'YEAR' : billingCycle === 'biannual' ? '6 MONTHS' : 'MONTH',
                    color: planIdKey === 'basic' ? 'blue' : planIdKey === 'pro' ? 'orange' : 'slate',
                    description: currentPlanData.tagline,
                    features: currentPlanData.highlights
                  };
                  onSelectPlan(planIdKey, billingCycle);
                  onOpenPayment(pricingObj, billingCycle);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 select-none"
              >
                <CreditCard className="w-4 h-4" />
                <span>SUBSCRIBE & CHECKOUT (${getTotalBill()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PlanDetailModal;
