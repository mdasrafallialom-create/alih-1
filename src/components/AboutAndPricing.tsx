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
  CreditCard
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
  logoStyle?: string;
  logoColorPrimary?: string;
  logoColorSecondary?: string;
}

const AboutAndPricing: React.FC<AboutAndPricingProps> = ({ 
  onPlanSelected, 
  onStartTrial, 
  currentPlan, 
  isDark,
  lang = 'en',
  brandName,
  brandLocation,
  logoStyle,
  logoColorPrimary,
  logoColorSecondary
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

  return (
    <section id="about-pricing" className="py-24 px-4 bg-white border-t border-slate-100">
      <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* About Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-4 h-4" />
              Restaurant Excellence
            </div>
            <h2 className="text-4xl font-display font-black mb-8 leading-tight text-slate-900">
              The World's Most <span className="text-cyan-600">Luxurious</span> <br/> Digital Dining System
            </h2>
            <div className="space-y-6">
              {['facebook', 'instagram', 'youtube', 'tiktok'].map(s => {
                const url = ""; // handled externally
              })}
              {[
                { icon: Smartphone, text: 'Immersive AR Menu: Visualize dishes in stunning 3D before ordering.' },
                { icon: QrCode, text: 'Seamless QR Integration: Scan, order, and pay instantly from any table.' },
                { icon: Video, text: 'Cinematic Experience: High-quality video showcases of your signature dishes.' },
                { icon: ShieldCheck, text: 'Advanced Pipeline: Optimized kitchen management for zero delays.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-xl bg-cyan-50 text-cyan-600">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Premium Dynamic Location Card (Auto-populated from Brand Identity Settings) */}
            <div className="mt-10 p-6 rounded-3xl border transition-all duration-500 bg-slate-50 border-slate-100">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      {lang === 'bn' ? 'আমাদের আউটলেট ও ঠিকানা' : 'Our Outlet & Venue'}
                    </h4>
                  </div>
                  <p className="text-lg font-black mb-1 text-cyan-700">
                    {brandName || (lang === 'bn' ? 'আমাদের রেস্টুরেন্ট' : 'Our Restaurant Venue')}
                  </p>
                </div>
                {/* Dynamically Rendered Premium Brand Logo Monogram */}
                <div className="shrink-0">
                  {renderLogo()}
                </div>
              </div>
              <p className="text-xs leading-relaxed font-medium text-slate-600">
                {lang === 'bn' 
                  ? `আমরা আনন্দের সাথে জানাচ্ছি যে ${brandName || 'আমাদের রেস্টুরেন্ট'} অত্যন্ত সফলভাবে ${brandLocation || 'আপনার এলাকায়'} অবস্থিত। আমরা আপনাদের জন্য বিশ্বের সেরা ডিজিটাল ডাইনিং ও ত্রিমাত্রিক ৩ডি এআর মেনু নিয়ে এসেছি।`
                  : `We are proudly established in the premium hub of ${brandLocation || 'your region'}. Welcome to ${brandName || 'our restaurant'}, where we pair world-class luxury dining with interactive 3D AR technology.`
                }
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury Dining"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
              <div className="flex items-center gap-4 text-white">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Featured Story</p>
                  <p className="text-xl font-bold">Experience the Future</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pricing Section: Only displayed when no specific plan has been selected */}
        {!isPlanExplicitlySelected && (
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
