import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  Star, 
  Crown, 
  Check, 
  Smartphone,
  QrCode,
  ShieldCheck,
  Video,
  Play,
  ExternalLink,
  CreditCard,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { PricingPlan, SubscriptionPlan } from '../types';
import PaymentModal from './PaymentModal';

interface AboutAndPricingProps {
  onPlanSelected?: (plan: SubscriptionPlan) => void;
  onStartTrial?: (plan: SubscriptionPlan) => void;
  currentPlan?: SubscriptionPlan;
  isDark?: boolean;
  lang?: string;
  brandName?: string;
  brandLocation?: string;
  brandDescription?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  aboutUsTitle?: string;
  aboutUsSubtitle?: string;
  aboutUsText?: string;
  aboutUsImage?: string;
  logoStyle?: string;
  logoColorPrimary?: string;
  logoColorSecondary?: string;
  hidePricing?: boolean;
  hideOutletCard?: boolean;
  themePalette?: {
    bg?: string;
    cardBg?: string;
    borderColor?: string;
    textColor?: string;
    mutedTextColor?: string;
    accentColor?: string;
  };
}

const AboutAndPricing: React.FC<AboutAndPricingProps> = ({ 
  onPlanSelected, 
  onStartTrial, 
  currentPlan, 
  isDark,
  lang = 'en',
  brandName,
  brandLocation,
  brandDescription,
  contactPhone,
  contactWhatsapp,
  contactEmail,
  socialLinks,
  aboutUsTitle,
  aboutUsSubtitle,
  aboutUsText,
  aboutUsImage,
  logoStyle,
  logoColorPrimary,
  logoColorSecondary,
  hidePricing = false,
  hideOutletCard = false,
  themePalette
}) => {
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);

  const t = (en: string, bn: string, ar: string) => {
    if (lang === 'ar') return ar;
    if (lang === 'bn') return bn;
    return en;
  };

  // Helper to extract exactly 2 initials
  const getLogoInitials = (name: string) => {
    if (!name) return ["L", "A"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanName) return ["L", "A"];
    const parts = cleanName.split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return [cleanName[0].toUpperCase(), "A"];
  };

  const renderLogo = () => {
    const [c1, c2] = getLogoInitials(brandName || 'Luxury App');
    const style = logoStyle || 'crest';
    const primaryColor = logoColorPrimary || (isDark ? '#cbd5e1' : '#475569');
    const secondaryColor = logoColorSecondary || (isDark ? '#22d3ee' : '#0284c7');

    return (
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${isDark ? 'from-slate-950 to-slate-900 border-slate-800' : 'from-white to-slate-50 border-slate-200 shadow-sm'} border flex items-center justify-center relative overflow-hidden shrink-0 select-none hover:scale-105 transition-transform duration-300`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
          {style === 'crest' && (
            <>
              <circle cx="50" cy="50" r="41" stroke={secondaryColor} strokeWidth="0.8" fill="none" opacity={0.35} />
              <text x="36" y="52" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", fontSize: "45px", fontWeight: 300, fontStyle: "italic", opacity: 0.95 }}>{c1}</text>
              <line x1="26" y1="74" x2="74" y2="26" stroke={secondaryColor} strokeWidth="1.2" opacity={0.5} />
              <text x="64" y="68" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", fontSize: "47px", fontWeight: 800 }}>{c2}</text>
            </>
          )}
          {style === 'minimal' && (
            <>
              <text x="34" y="50" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", fontSize: "49px", fontWeight: 400 }}>{c1}</text>
              <text x="64" y="68" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", fontSize: "52px", fontWeight: 700, fontStyle: "italic" }}>{c2}</text>
            </>
          )}
          {style === 'stamp' && (
            <>
              <circle cx="50" cy="50" r="42" stroke={primaryColor} strokeWidth="1" strokeDasharray="4,3" fill="none" opacity={0.5} />
              <circle cx="50" cy="50" r="38" stroke={secondaryColor} strokeWidth="0.6" fill="none" opacity={0.3} />
              <text x="44" y="48" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", fontSize: "44px", fontWeight: 300 }}>{c1}</text>
              <text x="56" y="62" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", fontSize: "44px", fontWeight: 700 }}>{c2}</text>
            </>
          )}
          {style === 'modern' && (
            <>
              <path d="M15,35 L15,15 L35,15 M65,15 L85,15 L85,35 M85,65 L85,85 L65,85 M35,85 L15,85 L15,65" stroke={primaryColor} strokeWidth="1" fill="none" opacity={0.4} />
              <text x="35" y="48" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Space Grotesk', 'Montserrat', sans-serif", fontSize: "42px", fontWeight: 900, letterSpacing: "-2px" }}>{c1}</text>
              <text x="65" y="66" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Space Grotesk', 'Montserrat', sans-serif", fontSize: "45px", fontWeight: 900, letterSpacing: "-2px" }}>{c2}</text>
            </>
          )}
        </svg>
      </div>
    );
  };

  const PRICING_PLANS: PricingPlan[] = [
    {
      id: 'basic',
      name: 'STARTER',
      price: 15,
      period: 'MONTH',
      color: 'blue',
      description: '10 Premium Themes & 100+ Menu Card Designs included for single cafes and small restaurants.',
      features: [
        '10 Premium Themes & Designs',
        '100+ Menu Card Designs',
        'Active Dashboard',
        'Order History (7 Days)',
        'Menu Categories',
        'Instagram Marketing Link',
        'Email Support'
      ]
    },
    {
      id: 'pro',
      name: 'PROFESSIONAL',
      price: 49,
      period: 'MONTH',
      color: 'orange',
      isPopular: true,
      description: '25 Premium Themes & 500+ Menu Card Studio Designs included for growing businesses.',
      features: [
        '25 Premium Themes & Designs',
        '500+ Menu Card Studio Access',
        'QR Code Management',
        'Instagram Marketing Link',
        'Facebook Marketing Link',
        'YouTube Marketing Link',
        'Custom Domains',
        'Priority Support'
      ]
    },
    {
      id: 'elite',
      name: 'ELITE LUXURY',
      price: 99,
      period: 'MONTH',
      color: 'slate',
      description: '50 Premium Themes & 1000+ Menu Card Studio Designs for world-class brands.',
      features: [
        '50 Premium Themes & Designs',
        '1000+ Menu Card Studio Access',
        'QR Code Menu Management',
        'Instagram Marketing Link',
        'Facebook Marketing Link',
        'YouTube Marketing Link',
        'LinkedIn Marketing Link',
        'Financial Control',
        'AI Analytics Engine',
        '24/7 Priority Concierge'
      ]
    }
  ];

  // Check if a specific plan has been selected via URL parameter or explicit selection
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const planParam = urlParams?.get('plan')?.toLowerCase();
  
  const isPlanExplicitlySelected = Boolean(
    planParam === '15' || planParam === '49' || planParam === '99' ||
    planParam === 'basic' || planParam === 'pro' || planParam === 'elite'
  );

  // Always display subscription plans when browsing general plans without a selected plan
  const displayedPlans = PRICING_PLANS;

  const getPlanUrl = (planId: string) => {
    const planParam = planId === 'basic' ? '15' : planId === 'pro' ? '49' : '99';
    if (typeof window !== 'undefined') {
      try {
        const u = new URL(window.location.href);
        u.searchParams.set('plan', planParam);
        u.searchParams.delete('admin');
        return u.toString();
      } catch (e) {
        return `?plan=${planParam}`;
      }
    }
    return `?plan=${planParam}`;
  };

  const handleOpenWebsite = (plan: PricingPlan) => {
    const targetPlan = plan.id as SubscriptionPlan;
    if (onPlanSelected) {
      onPlanSelected(targetPlan);
    }
    const sectionMap: Record<string, string> = {
      basic: 'plan1',
      pro: 'plan2',
      elite: 'plan3'
    };
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('switch-work-section', { detail: sectionMap[plan.id] || 'plan1' }));
      const targetUrl = getPlanUrl(plan.id);
      try {
        const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          const link = document.createElement('a');
          link.href = targetUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (e) {
        window.location.href = targetUrl;
      }
    }
  };

  const featureItems = [
    { 
      icon: Smartphone, 
      text: lang === 'bn' 
        ? 'ইমারসিভ এআর মেনু: অর্ডার করার পূর্বে খাবার ত্রিমাত্রিক ৩ডি আকারে দেখুন।' 
        : 'Immersive AR Menu: Visualize dishes in stunning 3D before ordering.' 
    },
    { 
      icon: QrCode, 
      text: lang === 'bn' 
        ? 'স্মার্ট কিউআর ইন্টিগ্রেশন: যেকোনো টেবিল থেকে সরাসরি স্ক্যান, অর্ডার ও পে করুন।' 
        : 'Seamless QR Integration: Scan, order, and pay instantly from any table.' 
    },
    { 
      icon: Video, 
      text: lang === 'bn' 
        ? 'সিনেমাটিক এক্সপেরিয়েন্স: সিগনেচার খাবারের আকর্ষণীয় আল্ট্রা-এইচডি ভিডিও শোকেস।' 
        : 'Cinematic Experience: High-quality video showcases of your signature dishes.' 
    },
    { 
      icon: ShieldCheck, 
      text: lang === 'bn' 
        ? 'অ্যাডভান্সড কিচেন পাইপলাইন: কোনো প্রকার বিলম্ব ছাড়াই দ্রুত খাবার প্রস্তুতি ও পরিবেশন।' 
        : 'Advanced Pipeline: Optimized kitchen management for zero delays.' 
    }
  ];

  const formatUrl = (url?: string, fallback: string = '#') => {
    if (!url || !url.trim()) return fallback;
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  };

  const rawPhone = contactPhone || '';
  const rawWhatsapp = contactWhatsapp || contactPhone || '';
  const rawEmail = contactEmail || '';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');
  const locationText = brandLocation || '';

  const socialItemList = [
    {
      key: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      url: formatUrl(socialLinks?.instagram, '#'),
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10',
    },
    {
      key: 'youtube',
      label: 'YouTube',
      icon: Youtube,
      url: formatUrl(socialLinks?.youtube, '#'),
      color: 'hover:text-[#FF0000] hover:border-[#FF0000]/60 hover:bg-[#FF0000]/10',
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      url: formatUrl(socialLinks?.facebook, '#'),
      color: 'hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      url: formatUrl(socialLinks?.linkedin, '#'),
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10',
    }
  ];

  const bgColor = themePalette?.bg || (isDark ? 'bg-[#121324]' : 'bg-white');
  const cardBgColor = themePalette?.cardBg || (isDark ? 'bg-[#15162B]' : 'bg-slate-50');
  const borderColor = themePalette?.borderColor || (isDark ? 'border-[#C9A86A]/20' : 'border-slate-100');
  const textColor = themePalette?.textColor || (isDark ? 'text-[#F4E7D3]' : 'text-slate-900');
  const mutedColor = themePalette?.mutedTextColor || (isDark ? 'text-[#F4E7D3]/75' : 'text-slate-600');
  const accentColor = themePalette?.accentColor || (isDark ? '#C9A86A' : '#0891b2');

  const displayHeroImage = aboutUsImage || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80';

  return (
    <section 
      id={hidePricing ? "about" : "about-pricing"} 
      className={`relative py-24 px-4 ${bgColor} border-t ${borderColor} transition-colors duration-300`}
    >
      {/* Invisible anchor for #story navigation */}
      <div id="story" className="absolute -top-24 left-0 w-0 h-0 pointer-events-none" />

      <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* About Info */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${hidePricing ? 'mb-0' : 'mb-32'}`}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
              {aboutUsSubtitle || (lang === 'bn' ? 'রেস্টুরেন্ট এক্সিলেন্স' : 'Restaurant Excellence')}
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-black mb-8 leading-tight ${textColor}`}>
              {aboutUsTitle ? (
                <span>{aboutUsTitle}</span>
              ) : lang === 'bn' ? (
                <>বিশ্বের সর্বাধুনিক <span style={{ color: accentColor }}>লাক্সারি</span> <br/>ডিজিটাল ডাইনিং প্ল্যাটফর্ম</>
              ) : (
                <>The World's Most <span style={{ color: accentColor }}>Luxurious</span> <br/> Digital Dining System</>
              )}
            </h2>
            <div className="space-y-6">
              {featureItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div 
                    className="mt-1 p-2.5 rounded-xl shrink-0"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(201, 168, 106, 0.12)' : 'rgba(8, 145, 178, 0.1)',
                      color: accentColor,
                      border: `1px solid ${isDark ? 'rgba(201, 168, 106, 0.25)' : 'rgba(8, 145, 178, 0.2)'}`
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <p className={`text-sm font-medium leading-relaxed ${mutedColor}`}>{item.text}</p>
                </div>
              ))}
            </div>


          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border"
            style={{ borderColor: isDark ? 'rgba(201, 168, 106, 0.3)' : 'rgba(226, 232, 240, 0.8)' }}
          >
            <img 
              src={displayHeroImage} 
              alt="Luxury Dining"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-10">
              <div className="flex items-center gap-4 text-white">
                <div 
                  className="w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(201, 168, 106, 0.3)' : 'rgba(255, 255, 255, 0.25)',
                    border: `1px solid ${isDark ? '#C9A86A' : 'rgba(255, 255, 255, 0.4)'}`
                  }}
                >
                  <Play className="w-6 h-6 fill-current text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 text-amber-300">
                    {aboutUsSubtitle || (lang === 'bn' ? 'ফিচার্ড স্টোরি' : 'Featured Story')}
                  </p>
                  <p className="text-xl font-bold">
                    {aboutUsTitle || (lang === 'bn' ? 'ভবিষ্যতের ডাইনিং অভিজ্ঞতা' : 'Experience the Future')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pricing Section: Only displayed when hidePricing is false and no specific plan has been selected */}
        {!hidePricing && !isPlanExplicitlySelected && (
          <div>
            <div className="text-center mb-16 relative">
              <h2 className="text-4xl font-display font-black mb-4 text-slate-900">
                {lang === 'bn' ? 'সাবস্ক্রিপশন প্ল্যানসমূহ' : 'Subscription Plans'}
              </h2>
              <p className="text-slate-500 font-medium">
                {lang === 'bn' ? 'আপনার রেস্টুরেন্ট ব্যবসার জন্য উপযুক্ত প্ল্যানটি বেছে নিন।' : 'Choose the perfect plan for your business needs.'}
              </p>
            </div>

            <div className="grid gap-8 items-stretch grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
              {displayedPlans.map((plan) => {
                const isCurrentActive = (currentPlan || 'basic') === plan.id;
                const isStarter = plan.id === 'basic';
                const isPro = plan.id === 'pro';
                const isElite = plan.id === 'elite';

                return (
                  <motion.div 
                    key={plan.id}
                    whileHover={{ y: -8 }}
                    className={`relative p-8 sm:p-10 rounded-[2.5rem] flex flex-col justify-between h-full transition-all duration-300 bg-white text-slate-900 border ${
                      isCurrentActive ? 'border-emerald-500 shadow-emerald-500/10' : 'border-slate-200/80'
                    } shadow-xl`}
                  >
                    {/* Current Active Plan Badge */}
                    {isCurrentActive && (
                      <div className="absolute -top-3.5 left-6 sm:left-8 px-3.5 py-1 bg-[#059669] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 z-10 select-none">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>CURRENT ACTIVE PLAN</span>
                      </div>
                    )}

                    {/* Professional: Most Popular Badge */}
                    {isPro && !isCurrentActive && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#ea580c] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/30 z-10 whitespace-nowrap select-none">
                        <span>MOST POPULAR</span>
                      </div>
                    )}

                    {/* Top Section: Icon, Name, Description */}
                    <div>
                      <div className="mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isStarter ? 'bg-blue-50 text-blue-600' :
                          isPro ? 'bg-blue-50 text-blue-600' :
                          'bg-amber-50 text-amber-500'
                        }`}>
                          {isStarter && <Zap className="w-6 h-6 text-blue-600 fill-blue-600/20" />}
                          {isPro && <Star className="w-6 h-6 text-blue-600" />}
                          {isElite && <Crown className="w-6 h-6 text-amber-500" />}
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-black mb-3 uppercase tracking-tight text-slate-900">
                        {plan.name}
                      </h3>

                      <p className="text-sm font-medium leading-relaxed mb-6 text-slate-500">
                        {plan.description}
                      </p>

                      {/* Price Block */}
                      <div className="flex items-baseline gap-1.5 mb-8">
                        <span className="text-5xl font-display font-black text-slate-900">
                          ${plan.price}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          / {plan.period}
                        </span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3.5 mb-10">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm font-medium">
                            <Check className="w-4 h-4 shrink-0 stroke-[2.5] text-emerald-500" />
                            <span className="text-slate-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="mt-auto pt-2">
                      {isStarter ? (
                        <div className="space-y-2">
                          <a
                            href={getPlanUrl(plan.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (onPlanSelected) onPlanSelected(plan.id as SubscriptionPlan);
                            }}
                            className="w-full py-4 px-5 rounded-2xl bg-[#1a56db] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all select-none"
                          >
                            <span>{lang === 'bn' ? 'নতুন ট্যাবে খুলুন ($১৫/মাস)' : 'OPEN IN NEW TAB ($15/MO)'}</span>
                            <ExternalLink className="w-4 h-4 ml-0.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedPlanForPayment(plan)}
                            className="w-full flex items-center justify-center gap-1.5 py-1 text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>SUBSCRIBE DIRECT</span>
                          </button>
                        </div>
                      ) : isPro ? (
                        <div className="space-y-2">
                          <a
                            href={getPlanUrl(plan.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (onPlanSelected) onPlanSelected(plan.id as SubscriptionPlan);
                            }}
                            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all select-none"
                          >
                            <span>{lang === 'bn' ? 'নতুন ট্যাবে খুলুন ($৪৯/মাস)' : 'OPEN IN NEW TAB ($49/MO)'}</span>
                            <ExternalLink className="w-4 h-4 ml-0.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedPlanForPayment(plan)}
                            className="w-full flex items-center justify-center gap-1.5 py-1 text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>SUBSCRIBE DIRECT</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <a
                            href={getPlanUrl(plan.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (onPlanSelected) onPlanSelected(plan.id as SubscriptionPlan);
                            }}
                            className="w-full py-4 px-5 rounded-2xl bg-[#0c192c] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all select-none"
                          >
                            <span>{lang === 'bn' ? 'নতুন ট্যাবে খুলুন ($৯৯/মাস)' : 'OPEN IN NEW TAB ($99/MO)'}</span>
                            <ExternalLink className="w-4 h-4 ml-0.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedPlanForPayment(plan)}
                            className="w-full flex items-center justify-center gap-1.5 py-1 text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>SUBSCRIBE DIRECT</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedPlanForPayment && (
        <PaymentModal
          isOpen={!!selectedPlanForPayment}
          onClose={() => setSelectedPlanForPayment(null)}
          onSuccess={(planId) => {
            onPlanSelected(planId as SubscriptionPlan);
            setSelectedPlanForPayment(null);
          }}
          plan={selectedPlanForPayment}
          theme={isDark ? 'dark' : 'light'}
        />
      )}
    </section>
  );
};

export default AboutAndPricing;
