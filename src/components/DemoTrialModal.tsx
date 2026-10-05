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
import { AvernaoLogo } from './AvernaoLogo';

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
    case 'ES':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="100" fill="#ad1519" />
          <rect y="100" width="640" height="200" fill="#fabd00" />
          <rect y="300" width="640" height="100" fill="#ad1519" />
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
    case 'OM':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="133" fill="#ffffff" />
          <rect y="133" width="640" height="134" fill="#ff0000" />
          <rect y="267" width="640" height="133" fill="#008000" />
          <rect width="213" height="400" fill="#ff0000" />
        </svg>
      );
    case 'PK':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#01411c" />
          <rect width="160" height="400" fill="#ffffff" />
          <circle cx="400" cy="200" r="100" fill="#ffffff" />
          <circle cx="430" cy="180" r="100" fill="#01411c" />
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
        </svg>
      );
    case 'SG':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="200" fill="#ed2939" />
          <rect y="200" width="640" height="200" fill="#ffffff" />
        </svg>
      );
    case 'TR':
      return (
        <svg className={`${className} rounded-[3px] shadow-xs object-cover shrink-0 overflow-hidden inline-block border border-slate-200/60`} viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#e30a17" />
          <circle cx="280" cy="200" r="100" fill="#ffffff" />
          <circle cx="310" cy="200" r="80" fill="#e30a17" />
        </svg>
      );
    default:
      return (
        <span className="text-base leading-none">🌐</span>
      );
  }
};

const COUNTRIES_WITH_FLAGS = [
  { id: 'US', name: 'United States', code: '+1', flag: '🇺🇸' },
  { id: 'GB', name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { id: 'AE', name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { id: 'SA', name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { id: 'CA', name: 'Canada', code: '+1', flag: '🇨🇦' },
  { id: 'AU', name: 'Australia', code: '+61', flag: '🇦🇺' },
  { id: 'DE', name: 'Germany', code: '+49', flag: '🇩🇪' },
  { id: 'FR', name: 'France', code: '+33', flag: '🇫🇷' },
  { id: 'IT', name: 'Italy', code: '+39', flag: '🇮🇹' },
  { id: 'ES', name: 'Spain', code: '+34', flag: '🇪🇸' },
  { id: 'QA', name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { id: 'KW', name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { id: 'OM', name: 'Oman', code: '+968', flag: '🇴🇲' },
  { id: 'PK', name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { id: 'MY', name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { id: 'SG', name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { id: 'TR', name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { id: 'IN', name: 'India', code: '+91', flag: '🇮🇳' },
  { id: 'BD', name: 'Bangladesh', code: '+880', flag: '🇧🇩' }
];

export const DemoTrialModal: React.FC<DemoTrialModalProps> = ({
  isOpen,
  onClose,
  planId = 'basic',
  billingCycle = 'monthly',
  lang = 'en',
  onStartTrialSuccess
}) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'Owner' | 'Manager'>('Owner');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES_WITH_FLAGS[0]);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('10001');
  const [restaurantLocation, setRestaurantLocation] = useState('New York, USA');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(planId);
  const [selectedBilling, setSelectedBilling] = useState<BillingCycle>(billingCycle);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'info' | 'verification'>('info');
  const [emailHistory, setEmailHistory] = useState<string[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);

  useEffect(() => {
    // Load email history from localStorage
    const history = localStorage.getItem('demo_email_history');
    if (history) {
      try {
        setEmailHistory(JSON.parse(history));
      } catch (e) {
        setEmailHistory([]);
      }
    }
  }, []);

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
  const [fieldErrors, setFieldErrors] = useState<{
    restaurantName?: string;
    fullName?: string;
    email?: string;
    zipCode?: string;
    phoneDigits?: string;
  }>({});
  const [isCreating, setIsCreating] = useState(false);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-fill and auto-verify OTP simulation for smooth demo flow
  useEffect(() => {
    if (otpSent && generatedOtp && modalStep === 'verification' && !isOtpVerified) {
      const timer = setTimeout(() => {
        setUserOtpInput(generatedOtp);
        // Small additional delay to show the "filling" happened before auto-submitting
        setTimeout(() => {
          setIsOtpVerified(true);
          setOtpMessage('✓ Gmail successfully verified!');
          
          // Auto-trigger the launch after verification
          setTimeout(() => {
            const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
            handleLaunchTrial(fakeEvent);
          }, 800);
        }, 800);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [otpSent, generatedOtp, modalStep, isOtpVerified]);

  const handleBack = () => {
    if (modalStep === 'verification') {
      setModalStep('info');
      setOtpSent(false);
      setUserOtpInput('');
      setIsOtpVerified(false);
      return;
    }
    if (typeof window !== 'undefined') {
      const planCode = selectedPlan === 'basic' ? '15' : selectedPlan === 'elite' ? '99' : '49';
      const url = new URL(window.location.href);
      url.searchParams.delete('onboarding');
      url.searchParams.delete('demo_onboarding');
      url.searchParams.set('plan', planCode);
      window.history.replaceState({}, '', url.toString());

      // Open the plan modal first so it's ready behind or on top
      window.dispatchEvent(new CustomEvent('open-plan-modal', { detail: planCode }));
      
      const pricingEl = document.getElementById('pricing-section') || document.getElementById('pricing');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'auto' });
      }

      // Smooth handover: close this modal after a tiny delay so the transition is fluid
      setTimeout(() => {
        onClose();
      }, 50);
    } else {
      onClose();
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
    setUserOtpInput('');
    setIsOtpVerified(false);
    setOtpMessage(`Avernao Verification Code sent to ${email}: ${code}`);

    // Auto-receive code into input after 800ms
    setTimeout(() => {
      setUserOtpInput(code);
      setIsOtpVerified(true);
      setErrorMsg('');
    }, 800);
  };

  const handleVerifyOtp = () => {
    // Any code or typed 6 digits is accepted and verified seamlessly
    setIsOtpVerified(true);
    setOtpMessage('✓ Gmail successfully verified!');
    setErrorMsg('');
  };

  const handleLaunchTrial = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalStep === 'info') {
      const errs: typeof fieldErrors = {};
      if (!restaurantName.trim()) {
        errs.restaurantName = 'Please enter your restaurant brand name.';
      }
      if (!fullName.trim()) {
        errs.fullName = 'Please enter the owner or manager name.';
      }
      if (!email.trim() || !email.includes('@')) {
        errs.email = 'Please enter a valid Gmail address.';
      }
      if (!zipCode.trim()) {
        errs.zipCode = 'Please enter ZIP / Postal code.';
      }
      if (!phoneDigits.trim()) {
        errs.phoneDigits = 'Please enter a valid phone number.';
      }

      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }

      setFieldErrors({});
      setErrorMsg('');
      handleSendOtp();
      setModalStep('verification');
      return;
    }

    // Verification step
    setIsOtpVerified(true);
    setErrorMsg('');
    setIsCreating(true);

    // Save email to history
    if (email.trim() && !emailHistory.includes(email.trim())) {
      const newHistory = [email.trim(), ...emailHistory].slice(0, 3);
      setEmailHistory(newHistory);
      localStorage.setItem('demo_email_history', JSON.stringify(newHistory));
    }

    const fullPhone = `${selectedCountry.code} ${phoneDigits}`;
    const selectedTheme = selectedPlan === 'basic' ? 'koppee' : selectedPlan === 'pro' ? 'velmora-dining' : 'lunavere';
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    const trialData: TrialSessionData = {
      fullName: fullName.trim(),
      role,
      restaurantName: restaurantName.trim(),
      restaurantLocation: restaurantLocation.trim() || 'New York, United States',
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
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-white select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        >
          {/* Top Header Banner - Clean White background with official Avernao Logo & fixed platform title */}
          <div className="relative bg-white p-5 sm:p-7 text-slate-900 border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Official Gold AVERNAO Badge Logo */}
              <AvernaoLogo className="w-12 h-12 sm:w-14 sm:h-14 shadow-lg hover:scale-105 transition-transform" />

              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 truncate">
                  Avernao
                </h3>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5">
                  Website Demo Registration
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBack}
              disabled={isCreating}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              title="Back"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 space-y-4 max-h-[82vh] overflow-y-auto custom-scrollbar">
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
              <form onSubmit={handleLaunchTrial} className="space-y-4" noValidate>
                {modalStep === 'info' ? (
                  <>
                    {/* 1. Restaurant Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Restaurant Name *</span>
                      </label>
                      <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => {
                          setRestaurantName(e.target.value);
                          if (fieldErrors.restaurantName) {
                            setFieldErrors(prev => ({ ...prev, restaurantName: undefined }));
                          }
                        }}
                        placeholder=""
                        className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none font-bold text-slate-900 bg-white transition-all ${
                          fieldErrors.restaurantName 
                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' 
                            : 'border-slate-300 focus:border-indigo-600'
                        }`}
                      />
                      {fieldErrors.restaurantName && (
                        <p className="mt-1 text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-fade-in pl-1">
                          <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                          <span>{fieldErrors.restaurantName}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Owner / Manager Full Name & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Owner / Manager Full Name *</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (fieldErrors.fullName) {
                              setFieldErrors(prev => ({ ...prev, fullName: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border focus:outline-none font-bold text-slate-900 bg-white shadow-xs transition-all ${
                            fieldErrors.fullName 
                              ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' 
                              : 'border-slate-300 focus:border-indigo-600'
                          }`}
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-1 text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-fade-in pl-1">
                            <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{fieldErrors.fullName}</span>
                          </p>
                        )}
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

                    {/* 3. Gmail Account */}
                    <div className={`p-4 rounded-2xl bg-indigo-50/70 border space-y-2 relative transition-all ${
                      fieldErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-indigo-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Gmail Inbox Security *</span>
                        </label>
                      </div>

                      <div className="flex flex-col items-center gap-2 relative">
                        <input
                          type="email"
                          value={email}
                          onFocus={() => setIsEmailDropdownOpen(true)}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setIsOtpVerified(false);
                            if (!e.target.value) setIsEmailDropdownOpen(true);
                            if (fieldErrors.email) {
                              setFieldErrors(prev => ({ ...prev, email: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl border focus:outline-none font-bold text-slate-900 bg-white shadow-xs transition-all ${
                            fieldErrors.email 
                              ? 'border-rose-500 ring-2 ring-rose-500/20' 
                              : 'border-slate-300 focus:border-indigo-600'
                          }`}
                        />
                        
                        <AnimatePresence>
                          {isEmailDropdownOpen && emailHistory.length > 0 && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setIsEmailDropdownOpen(false)} />
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden"
                              >
                                <div className="p-2 border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-tight">Recent Gmails</div>
                                {emailHistory.map((hEmail) => (
                                  <button
                                    key={hEmail}
                                    type="button"
                                    onClick={() => {
                                      setEmail(hEmail);
                                      setIsEmailDropdownOpen(false);
                                      setIsOtpVerified(false);
                                      if (fieldErrors.email) {
                                        setFieldErrors(prev => ({ ...prev, email: undefined }));
                                      }
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-600 shrink-0">
                                      {hEmail[0].toUpperCase()}
                                    </div>
                                    <span className="truncate">{hEmail}</span>
                                  </button>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => setIsEmailDropdownOpen(false)}
                                  className="w-full px-4 py-2 text-center text-[10px] font-black text-indigo-600 hover:bg-indigo-50 border-t border-slate-50"
                                >
                                  + USE NEW GMAIL
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                      {fieldErrors.email && (
                        <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-fade-in pl-1">
                          <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* 4. Country & Phone */}
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
                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-200 z-40 overflow-hidden ring-1 ring-black/5"
                              >
                                <div className="max-h-64 overflow-y-auto p-2 custom-scrollbar">
                                  {COUNTRIES_WITH_FLAGS.map((c) => (
                                    <button
                                      key={c.id}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCountry(c);
                                        setIsCountryDropdownOpen(false);
                                        setPhoneDigits(''); // Reset phone digits on country change
                                      }}
                                      className={`w-full px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all flex items-center justify-between gap-3 cursor-pointer min-h-[48px] ${
                                        selectedCountry.id === c.id 
                                          ? 'bg-indigo-50 text-indigo-900 font-black' 
                                          : 'text-slate-800 hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 truncate">
                                        <div className="shrink-0">
                                          <CountryFlag code={c.id} className="w-6 h-4" />
                                        </div>
                                        <span className="truncate">{c.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-slate-400 font-mono text-xs">{c.code}</span>
                                        {selectedCountry.id === c.id && <Check className="w-4 h-4 text-indigo-600" />}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* ZIP / Postal Code */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                          <span>ZIP / Postal Code *</span>
                        </label>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => {
                            setZipCode(e.target.value);
                            if (fieldErrors.zipCode) {
                              setFieldErrors(prev => ({ ...prev, zipCode: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border focus:outline-none font-bold text-slate-900 bg-white shadow-xs transition-all ${
                            fieldErrors.zipCode 
                              ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' 
                              : 'border-slate-300 focus:border-indigo-600'
                          }`}
                        />
                        {fieldErrors.zipCode && (
                          <p className="mt-1 text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-fade-in pl-1">
                            <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{fieldErrors.zipCode}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 5. Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Phone Number *</span>
                      </label>
                        <div className={`flex items-center rounded-2xl border bg-white overflow-hidden shadow-xs transition-all ${
                          fieldErrors.phoneDigits 
                            ? 'border-rose-500 ring-2 ring-rose-500/20' 
                            : 'border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20'
                        }`}>
                          <div className="pl-4 pr-2 py-2.5 flex items-center gap-2 shrink-0 border-r border-slate-100 bg-slate-50/30">
                            <CountryFlag code={selectedCountry.id} className="w-5 h-3.5" />
                            <span className="text-sm font-bold text-slate-700">{selectedCountry.code}</span>
                          </div>
                          <input
                            type="tel"
                            value={phoneDigits}
                            onChange={(e) => {
                              let digits = e.target.value.replace(/\D/g, '');
                              // Strip leading zeros (e.g. 017... -> 17...)
                              while (digits.startsWith('0')) {
                                digits = digits.substring(1);
                              }
                              // Strip leading '1' if country prefix is +1 to avoid duplicate +1 1...
                              if ((selectedCountry.code === '+1' || selectedCountry.id === 'US' || selectedCountry.id === 'CA') && digits.startsWith('1') && digits.length > 1) {
                                digits = digits.substring(1);
                              }
                              setPhoneDigits(digits);
                              if (fieldErrors.phoneDigits) {
                                setFieldErrors(prev => ({ ...prev, phoneDigits: undefined }));
                              }
                            }}
                            placeholder=""
                            className="w-full min-w-0 px-4 py-2.5 text-sm focus:outline-none font-bold text-slate-900 bg-white placeholder:text-slate-300"
                          />
                        </div>
                        {fieldErrors.phoneDigits && (
                          <p className="mt-1 text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-fade-in pl-1">
                            <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{fieldErrors.phoneDigits}</span>
                          </p>
                        )}
                      </div>
                  </>
                ) : (
                  <div className="py-4 space-y-5 animate-fade-in">
                    <div className="text-center space-y-1.5">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                        <Mail className="w-7 h-7" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Verify your Gmail Inbox</h4>
                      <p className="text-xs font-semibold text-slate-500">
                        Verification code sent from <span className="font-extrabold text-indigo-600">Avernao Platform</span> to <span className="font-bold text-slate-800">{email}</span>
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={6}
                          value={userOtpInput}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setUserOtpInput(val);
                            setErrorMsg('');
                            if (val.length === 6) {
                              setIsOtpVerified(true);
                            }
                          }}
                          placeholder=""
                          className="w-full px-6 py-3.5 text-3xl font-mono tracking-[0.5em] text-center font-black rounded-2xl border-2 border-indigo-200 focus:border-indigo-600 focus:outline-none text-slate-900 bg-white shadow-lg transition-all"
                        />
                        {isOtpVerified && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                          </div>
                        )}
                      </div>

                      {otpSent && (
                        <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs">
                          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span>Avernao Gmail Verification Code: <strong className="font-mono text-sm text-indigo-700 bg-white px-2 py-0.5 rounded-lg border border-indigo-200">{generatedOtp || '737654'}</strong></span>
                        </div>
                      )}

                      {isOtpVerified && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Gmail Verified! Proceeding to launch site...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between gap-4 w-full">
                  {modalStep === 'info' ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2.5 py-3.5 px-6 rounded-2xl text-slate-100 hover:text-white bg-[linear-gradient(135deg,#1e293b_0%,#334155_50%,#0f172a_100%)] bg-[length:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] font-bold text-sm shadow-md hover:shadow-indigo-500/20 transition-all duration-500 ease-in-out cursor-pointer active:scale-95 group shrink-0 select-none"
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:scale-110" />
                      <span className="transition-transform duration-300 group-hover:scale-105">Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isCreating}
                    className={`${modalStep === 'info' ? 'ml-auto' : 'w-full'} py-4 px-8 bg-[linear-gradient(to_bottom,#2563eb_0%,#4f46e5_50%,#7c3aed_100%)] bg-[length:100%_200%] bg-[position:0%_0%] hover:bg-[position:0%_100%] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/40 transition-all duration-500 ease-in-out flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 select-none disabled:opacity-50 group`}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-105">{modalStep === 'info' ? 'NEXT' : 'VERIFY & LAUNCH'}</span>
                    {modalStep === 'info' && <ArrowLeft className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-110" />}
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
