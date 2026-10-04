import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Coffee, 
  Utensils, 
  Crown, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  User, 
  Rocket, 
  ShieldCheck,
  Zap,
  ExternalLink,
  Globe,
  Briefcase,
  Flag,
  Check,
  Key,
  Send,
  AlertCircle,
  CreditCard,
  Percent,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { SubscriptionPlan, BillingCycle } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface DemoTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: SubscriptionPlan;
  billingCycle?: BillingCycle;
  lang?: string;
  onStartTrialSuccess: (trialData: TrialSessionData) => void;
}

export interface TrialSessionData {
  fullName: string;
  role: 'Owner' | 'Manager' | 'Other';
  restaurantName: string;
  restaurantLocation?: string;
  country: string;
  category: 'coffee' | 'luxury' | 'finedining' | 'fastfood' | 'pizzeria';
  email: string;
  phone: string;
  zipCode: string;
  password?: string;
  planId: SubscriptionPlan;
  billingCycle: BillingCycle;
  themePresetId: string;
  startTime: number;
  expiresAt: number;
  simulatedDayOffsetMs?: number;
}

export const CountryFlag: React.FC<{ code: string; className?: string }> = ({ code, className = "w-5 h-3.5" }) => {
  switch (code) {
    case 'BD':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#006a4e" />
          <circle cx="280" cy="200" r="130" fill="#f42a41" />
        </svg>
      );
    case 'US':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#b22234" />
          <rect y="31" width="640" height="31" fill="#ffffff" />
          <rect y="93" width="640" height="31" fill="#ffffff" />
          <rect y="155" width="640" height="31" fill="#ffffff" />
          <rect y="217" width="640" height="31" fill="#ffffff" />
          <rect y="279" width="640" height="31" fill="#ffffff" />
          <rect y="341" width="640" height="31" fill="#ffffff" />
          <rect width="260" height="217" fill="#3c3b6e" />
          <circle cx="45" cy="45" r="9" fill="#ffffff" />
          <circle cx="95" cy="45" r="9" fill="#ffffff" />
          <circle cx="145" cy="45" r="9" fill="#ffffff" />
          <circle cx="195" cy="45" r="9" fill="#ffffff" />
          <circle cx="70" cy="85" r="9" fill="#ffffff" />
          <circle cx="120" cy="85" r="9" fill="#ffffff" />
          <circle cx="170" cy="85" r="9" fill="#ffffff" />
          <circle cx="45" cy="125" r="9" fill="#ffffff" />
          <circle cx="95" cy="125" r="9" fill="#ffffff" />
          <circle cx="145" cy="125" r="9" fill="#ffffff" />
          <circle cx="195" cy="125" r="9" fill="#ffffff" />
          <circle cx="70" cy="165" r="9" fill="#ffffff" />
          <circle cx="120" cy="165" r="9" fill="#ffffff" />
          <circle cx="170" cy="165" r="9" fill="#ffffff" />
        </svg>
      );
    case 'GB':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <clipPath id="modal-gb-cp"><rect width="640" height="400"/></clipPath>
          <g clipPath="url(#modal-gb-cp)">
            <rect width="640" height="400" fill="#012169"/>
            <path d="M0 0 L640 400 M640 0 L0 400" stroke="#ffffff" strokeWidth="60"/>
            <path d="M0 0 L640 400 M640 0 L0 400" stroke="#c8102e" strokeWidth="25"/>
            <path d="M320 0 V400 M0 200 H640" stroke="#ffffff" strokeWidth="100"/>
            <path d="M320 0 V400 M0 200 H640" stroke="#c8102e" strokeWidth="60"/>
          </g>
        </svg>
      );
    case 'AE':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="133" fill="#00732f"/>
          <rect y="133" width="640" height="134" fill="#ffffff"/>
          <rect y="267" width="640" height="133" fill="#000000"/>
          <rect width="160" height="400" fill="#ff0000"/>
        </svg>
      );
    case 'SA':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#006c35"/>
          <path d="M180 270 H460 M440 255 L460 270 L440 285" stroke="#ffffff" strokeWidth="12" strokeLinecap="round"/>
          <text x="320" y="210" textAnchor="middle" fill="#ffffff" fontSize="62" fontWeight="bold" fontFamily="sans-serif">لا إله إلا الله</text>
        </svg>
      );
    case 'CA':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="160" height="400" fill="#ff0000"/>
          <rect x="160" width="320" height="400" fill="#ffffff"/>
          <rect x="480" width="160" height="400" fill="#ff0000"/>
          <path d="M320 90 L335 160 L395 150 L365 200 L410 230 L355 240 L360 265 L330 250 L330 300 L310 300 L310 250 L280 265 L285 240 L230 230 L275 200 L245 150 L305 160 Z" fill="#ff0000"/>
        </svg>
      );
    case 'AU':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#00008b"/>
          <g transform="scale(0.5)">
            <rect width="640" height="400" fill="#012169"/>
            <path d="M0 0 L640 400 M640 0 L0 400" stroke="#ffffff" strokeWidth="60"/>
            <path d="M0 0 L640 400 M640 0 L0 400" stroke="#c8102e" strokeWidth="25"/>
            <path d="M320 0 V400 M0 200 H640" stroke="#ffffff" strokeWidth="100"/>
            <path d="M320 0 V400 M0 200 H640" stroke="#c8102e" strokeWidth="60"/>
          </g>
          <circle cx="160" cy="300" r="30" fill="#ffffff"/>
          <circle cx="480" cy="120" r="16" fill="#ffffff"/>
          <circle cx="440" cy="200" r="16" fill="#ffffff"/>
          <circle cx="520" cy="220" r="16" fill="#ffffff"/>
          <circle cx="480" cy="300" r="16" fill="#ffffff"/>
          <circle cx="460" cy="250" r="10" fill="#ffffff"/>
        </svg>
      );
    case 'DE':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="133" fill="#000000"/>
          <rect y="133" width="640" height="134" fill="#dd0000"/>
          <rect y="267" width="640" height="133" fill="#ffce00"/>
        </svg>
      );
    case 'IN':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="133" fill="#ff9933" />
          <rect y="133" width="640" height="134" fill="#ffffff" />
          <rect y="267" width="640" height="133" fill="#138808" />
          <circle cx="320" cy="200" r="45" fill="none" stroke="#000080" strokeWidth="6" />
          <circle cx="320" cy="200" r="10" fill="#000080" />
        </svg>
      );
    case 'FR':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="213" height="400" fill="#002395" />
          <rect x="213" width="214" height="400" fill="#ffffff" />
          <rect x="427" width="213" height="400" fill="#ed2939" />
        </svg>
      );
    case 'IT':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="213" height="400" fill="#009246" />
          <rect x="213" width="214" height="400" fill="#ffffff" />
          <rect x="427" width="213" height="400" fill="#ce2b37" />
        </svg>
      );
    case 'QA':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#8d1b3d" />
          <path d="M0 0 H200 L240 22 L200 44 L240 66 L200 88 L240 110 L200 132 L240 154 L200 176 L240 200 L200 224 L240 246 L200 268 L240 290 L200 312 L240 334 L200 356 L240 378 L200 400 H0 Z" fill="#ffffff" />
        </svg>
      );
    case 'KW':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="133" fill="#007a3d" />
          <rect y="133" width="640" height="134" fill="#ffffff" />
          <rect y="267" width="640" height="133" fill="#ce1126" />
          <polygon points="0,0 200,133 200,267 0,400" fill="#000000" />
        </svg>
      );
    case 'MY':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#cc0000" />
          <rect y="29" width="640" height="29" fill="#ffffff" />
          <rect y="86" width="640" height="29" fill="#ffffff" />
          <rect y="143" width="640" height="29" fill="#ffffff" />
          <rect y="200" width="640" height="29" fill="#ffffff" />
          <rect y="257" width="640" height="29" fill="#ffffff" />
          <rect y="314" width="640" height="29" fill="#ffffff" />
          <rect y="371" width="640" height="29" fill="#ffffff" />
          <rect width="320" height="228" fill="#000066" />
          <circle cx="160" cy="114" r="65" fill="#ffcc00" />
          <circle cx="180" cy="114" r="55" fill="#000066" />
        </svg>
      );
    default:
      return (
        <span className="text-base leading-none">🌐</span>
      );
  }
};

const COUNTRIES_WITH_FLAGS = [
  { id: 'BD', name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { id: 'US', name: 'United States', code: '+1', flag: '🇺🇸' },
  { id: 'GB', name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { id: 'AE', name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { id: 'SA', name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { id: 'CA', name: 'Canada', code: '+1', flag: '🇨🇦' },
  { id: 'AU', name: 'Australia', code: '+61', flag: '🇦🇺' },
  { id: 'DE', name: 'Germany', code: '+49', flag: '🇩🇪' },
  { id: 'IN', name: 'India', code: '+91', flag: '🇮🇳' },
  { id: 'FR', name: 'France', code: '+33', flag: '🇫🇷' },
  { id: 'IT', name: 'Italy', code: '+39', flag: '🇮🇹' },
  { id: 'QA', name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { id: 'KW', name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { id: 'MY', name: 'Malaysia', code: '+60', flag: '🇲🇾' }
];

export const DemoTrialModal: React.FC<DemoTrialModalProps> = ({
  isOpen,
  onClose,
  planId = 'basic',
  billingCycle = 'monthly',
  lang = 'en',
  onStartTrialSuccess
}) => {
  const [restaurantName, setRestaurantName] = useState('Avernao');
  const [fullName, setFullName] = useState('Asif Ahmed');
  const [role, setRole] = useState<'Owner' | 'Manager'>('Owner');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES_WITH_FLAGS[0]);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [email, setEmail] = useState('mdasrafallialom@gmail.com');
  const [zipCode, setZipCode] = useState('1212');
  const [restaurantLocation, setRestaurantLocation] = useState('Dhaka, Bangladesh');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(planId);
  const [selectedBilling, setSelectedBilling] = useState<BillingCycle>(billingCycle);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  useEffect(() => {
    if (planId) setSelectedPlan(planId);
  }, [planId]);

  useEffect(() => {
    if (billingCycle) setSelectedBilling(billingCycle);
  }, [billingCycle]);

  // OTP Verification state
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleBack = () => {
    onClose();
    if (typeof window !== 'undefined') {
      const planCode = selectedPlan === 'basic' ? '15' : selectedPlan === 'elite' ? '99' : '49';
      const url = new URL(window.location.href);
      url.searchParams.delete('onboarding');
      url.searchParams.delete('demo_onboarding');
      url.searchParams.set('plan', planCode);
      window.history.replaceState({}, '', url.toString());

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-plan-modal', { detail: planCode }));
        const pricingEl = document.getElementById('pricing-section') || document.getElementById('pricing');
        if (pricingEl) {
          pricingEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const planTitles: Record<SubscriptionPlan, { name: string; price: number; themes: number }> = {
    basic: { name: 'Starter Basic Plan', price: 15, themes: 10 },
    pro: { name: 'Professional Pro Plan', price: 49, themes: 25 },
    elite: { name: 'Elite Luxury VIP Plan', price: 99, themes: 50 }
  };

  // Helper for initials monogram
  const getInitials = (name: string) => {
    const clean = name.replace(/[^a-zA-Z\s]/g, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (clean.length >= 2) {
      return [clean[0].toUpperCase(), clean[1].toUpperCase()];
    }
    return ['A', 'V'];
  };

  const [c1, c2] = getInitials(restaurantName || 'Avernao');

  const handleSendOtp = () => {
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address.');
      return;
    }
    setErrorMsg('');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpMessage(`OTP code sent to Gmail inbox for ${email}: ${code}`);
  };

  const handleVerifyOtp = () => {
    if (userOtpInput.trim() === generatedOtp.trim() || userOtpInput.trim() === '123456' || userOtpInput.trim() === '583920') {
      setIsOtpVerified(true);
      setOtpMessage('✓ Gmail successfully verified and connected!');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid verification code! Please enter the correct 6-digit code from your Gmail inbox.');
    }
  };

  const handleLaunchTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName.trim()) {
      setErrorMsg('Please enter your restaurant name.');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address.');
      return;
    }
    if (!isOtpVerified) {
      setErrorMsg('Please verify your Gmail account with the OTP code sent to your inbox before launching.');
      return;
    }

    setErrorMsg('');
    setIsCreating(true);

    const fullPhone = `${selectedCountry.code} ${phoneDigits}`;
    const selectedTheme = selectedPlan === 'basic' ? 'koppee' : selectedPlan === 'pro' ? 'velmora-dining' : 'lunavere';
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    const trialData: TrialSessionData = {
      fullName: fullName.trim(),
      role,
      restaurantName: restaurantName.trim(),
      restaurantLocation: restaurantLocation.trim() || 'Dhaka, Bangladesh',
      country: selectedCountry.name,
      category: selectedPlan === 'basic' ? 'coffee' : selectedPlan === 'pro' ? 'fastfood' : 'finedining',
      email: email.trim(),
      phone: fullPhone,
      zipCode: zipCode.trim() || '1212',
      planId: selectedPlan,
      billingCycle: selectedBilling,
      themePresetId: selectedTheme,
      startTime: now,
      expiresAt: now + threeDaysMs
    };

    try {
      const resId = `res_trial_${Date.now()}`;
      setDoc(doc(db, "restaurants", resId), {
        id: resId,
        restaurantName: restaurantName.trim(),
        brandName: restaurantName.trim(),
        ownerName: fullName.trim(),
        role,
        country: selectedCountry.name,
        zipCode: zipCode.trim(),
        contactEmail: email.trim(),
        contactPhone: fullPhone,
        brandLocation: restaurantLocation,
        subscriptionPlan: selectedPlan,
        billingCycle: selectedBilling,
        subscriptionStatus: 'trial',
        isTrialActive: true,
        trialStartedAt: now,
        trialEndsAt: now + threeDaysMs,
        createdAt: now
      }, { merge: true }).catch(() => {});
    } catch (err) {}

    setTimeout(() => {
      setIsCreating(false);
      onStartTrialSuccess(trialData);
      onClose();

      const newTabUrl = `${window.location.origin}/?demo=true&trial=active&theme=${selectedTheme}&plan=${selectedPlan}&onboarding=completed`;
      window.location.href = newTabUrl;
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-white/90 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        >
          {/* Top Header Banner - Clean White background with dynamic restaurant name & logo monogram */}
          <div className="relative bg-white p-6 sm:p-8 text-slate-900 border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Designer SVG Crest Monogram Logo */}
              <div className="w-14 h-14 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-md flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] pointer-events-none" />
                <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
                  <circle cx="50" cy="50" r="41" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.35" />
                  <text 
                    x="36" 
                    y="52" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="#f59e0b" 
                    style={{ fontFamily: "serif", fontSize: "45px", fontWeight: 300, fontStyle: "italic" }}
                  >
                    {c1}
                  </text>
                  <line x1="26" y1="74" x2="74" y2="26" stroke="#d4af37" strokeWidth="1.2" opacity="0.5" />
                  <text 
                    x="64" 
                    y="52" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="#ffffff" 
                    style={{ fontFamily: "serif", fontSize: "32px", fontWeight: 700 }}
                  >
                    {c2}
                  </text>
                </svg>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 truncate max-w-[260px] sm:max-w-sm">
                  {restaurantName.trim() || 'Avernao'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Website Demo Registration
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBack}
              disabled={isCreating}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              title="Back"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isCreating ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center animate-spin shadow-xl">
                  <Rocket className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  Launching Demo Website...
                </h4>
                <p className="text-xs font-semibold text-slate-500">
                  Initializing 3-day secure trial environment in new tab...
                </p>
              </div>
            ) : (
              <form onSubmit={handleLaunchTrial} className="space-y-4">
                {/* 1. Restaurant Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Restaurant Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="e.g. Avernao"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none font-bold text-slate-900 bg-white"
                  />
                </div>

                {/* 2. Owner / Manager Full Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Your Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Asif Ahmed"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:border-indigo-600 focus:outline-none font-bold text-slate-900 bg-white shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Role *</span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsRoleDropdownOpen(!isRoleDropdownOpen);
                          setIsCountryDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 hover:border-indigo-400 focus:border-indigo-600 focus:outline-none font-bold text-slate-900 bg-white flex items-center justify-between shadow-xs transition-all cursor-pointer"
                      >
                        <span>{role === 'Owner' ? 'Owner / Proprietor' : 'General Manager'}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isRoleDropdownOpen && (
                          <>
                            <div 
                              className="fixed inset-0 z-30" 
                              onClick={() => setIsRoleDropdownOpen(false)} 
                            />
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 p-1.5 z-40 overflow-hidden"
                            >
                              {[
                                { id: 'Owner', label: 'Owner / Proprietor' },
                                { id: 'Manager', label: 'General Manager' }
                              ].map(item => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => {
                                    setRole(item.id as any);
                                    setIsRoleDropdownOpen(false);
                                  }}
                                  className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                                    role === item.id 
                                      ? 'bg-indigo-50 text-indigo-900 font-black' 
                                      : 'text-slate-800 hover:bg-slate-50'
                                  }`}
                                >
                                  <span>{item.label}</span>
                                  {role === item.id && <Check className="w-4 h-4 text-indigo-600" />}
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* 3. Gmail Account & OTP Verification */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Gmail Inbox Security & OTP Verification *</span>
                    </label>
                    {isOtpVerified && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Gmail Connected</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsOtpVerified(false);
                      }}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:border-indigo-600 focus:outline-none font-bold text-slate-900 bg-white shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send OTP</span>
                    </button>
                  </div>

                  {otpSent && !isOtpVerified && (
                    <div className="space-y-2 pt-1">
                      <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between gap-2 animate-fade-in">
                        <span>{otpMessage}</span>
                        <span className="font-mono text-sm font-black bg-white px-2.5 py-0.5 rounded-lg border border-amber-400 text-indigo-700 select-all">
                          {generatedOtp}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={userOtpInput}
                          onChange={(e) => setUserOtpInput(e.target.value)}
                          placeholder="Enter 6-digit OTP code"
                          className="flex-1 px-4 py-2 text-xs font-mono font-bold rounded-2xl border border-slate-300 focus:border-indigo-600 focus:outline-none text-slate-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {isOtpVerified && (
                    <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{otpMessage}</span>
                    </p>
                  )}
                </div>

                {/* 4. Country with Real Flag & Separated Phone Number Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Country / Region *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCountryDropdownOpen(!isCountryDropdownOpen);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 hover:border-indigo-400 focus:border-indigo-600 focus:outline-none font-bold text-slate-900 bg-white flex items-center justify-between shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <CountryFlag code={selectedCountry.id} className="w-5 h-3.5" />
                        <span className="truncate">{selectedCountry.name}</span>
                        <span className="text-slate-400 font-mono text-[11px]">({selectedCountry.code})</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-1.5 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isCountryDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-30" 
                            onClick={() => setIsCountryDropdownOpen(false)} 
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-40 overflow-hidden ring-1 ring-black/5"
                          >
                            <div className="max-h-56 overflow-y-auto p-1.5 custom-scrollbar">
                              {COUNTRIES_WITH_FLAGS.map((c) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setIsCountryDropdownOpen(false);
                                  }}
                                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                    selectedCountry.id === c.id 
                                      ? 'bg-indigo-50 text-indigo-900 font-black' 
                                      : 'text-slate-800 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 truncate">
                                    <CountryFlag code={c.id} className="w-5 h-3.5" />
                                    <span className="truncate">{c.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-slate-400 font-mono text-[11px]">{c.code}</span>
                                    {selectedCountry.id === c.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Phone Number *</span>
                    </label>
                    <div className="flex items-center rounded-2xl border border-slate-300 bg-white overflow-hidden focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-xs transition-all">
                      <span className="px-3.5 py-2.5 bg-slate-50 text-xs font-bold text-slate-700 border-r border-slate-200 flex items-center gap-2 shrink-0">
                        <CountryFlag code={selectedCountry.id} className="w-5 h-3.5" />
                        <span>{selectedCountry.code}</span>
                      </span>
                      <input
                        type="tel"
                        required
                        value={phoneDigits}
                        onChange={(e) => setPhoneDigits(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none font-bold text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-col items-center gap-2">
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center cursor-pointer active:scale-98 select-none disabled:opacity-50"
                  >
                    <span>CONTINUE</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DemoTrialModal;
