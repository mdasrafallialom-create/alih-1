import React, { useState, useEffect, useRef } from 'react';
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
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { SubscriptionPlan, BillingCycle } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { AvernaoLogo } from './AvernaoLogo';
import { LUXURY_THEMES } from '../data/luxuryThemes';

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

export interface SavedOwnerAccount {
  id: string;
  restaurantName: string;
  fullName: string;
  role: 'Owner' | 'Manager';
  email: string;
  phoneDigits: string;
  countryId: string;
  timestamp: number;
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
  const [modalStep, setModalStep] = useState<'info' | 'verification' | 'theme_selection'>('info');
  const [emailHistory, setEmailHistory] = useState<string[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const countryContainerRef = useRef<HTMLDivElement>(null);

  // States for real browser new tab launch fallback
  const [isLaunchSuccess, setIsLaunchSuccess] = useState(false);
  const [launchUrl, setLaunchUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [lastTrialData, setLastTrialData] = useState<TrialSessionData | null>(null);

  // Device-private saved profile and accounts
  const [savedAccountsList, setSavedAccountsList] = useState<SavedOwnerAccount[]>([]);
  const [isRestaurantDropdownOpen, setIsRestaurantDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Ensure form starts completely clean and empty (no auto-fill of previous account)
    setRestaurantName('');
    setFullName('');
    setRole('Owner');
    setEmail('');
    setPhoneDigits('');
    setUserEmailOtpInput('');
    setUserPhoneOtpInput('');
    setIsEmailVerified(false);
    setIsPhoneVerified(false);
    setErrorMsg('');
    setFieldErrors({});
    setModalStep('info');

    try {
      const savedList = localStorage.getItem('avernao_saved_owner_accounts');
      if (savedList) {
        setSavedAccountsList(JSON.parse(savedList));
      }
    } catch (e) {}
  }, [isOpen]);

  const matchingRestaurants = savedAccountsList.filter(acc => 
    restaurantName.trim() && acc.restaurantName.toLowerCase().includes(restaurantName.trim().toLowerCase())
  );

  const handleClearForNewAccount = () => {
    setRestaurantName('');
    setFullName('');
    setEmail('');
    setPhoneDigits('');
    setUserEmailOtpInput('');
    setUserPhoneOtpInput('');
    setIsEmailVerified(false);
    setIsPhoneVerified(false);
  };

  const handleSelectPreviousAccount = (acc: SavedOwnerAccount) => {
    setRestaurantName(acc.restaurantName || '');
    setFullName(acc.fullName || '');
    setRole(acc.role || 'Owner');
    setEmail(acc.email || '');
    setPhoneDigits(acc.phoneDigits || '');
    if (acc.countryId) {
      const foundCountry = COUNTRIES_WITH_FLAGS.find(c => c.id === acc.countryId);
      if (foundCountry) setSelectedCountry(foundCountry);
    }
    setIsEmailDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryContainerRef.current && !countryContainerRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

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

  // Dual Verification state: 1. Gmail, 2. Phone Number
  const [activeVerifyTab, setActiveVerifyTab] = useState<'email' | 'phone'>('email');

  // Gmail OTP state
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [userEmailOtpInput, setUserEmailOtpInput] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailOtpMessage, setEmailOtpMessage] = useState('');

  // Phone OTP state
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [generatedPhoneOtp, setGeneratedPhoneOtp] = useState('');
  const [userPhoneOtpInput, setUserPhoneOtpInput] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneOtpMessage, setPhoneOtpMessage] = useState('');
  
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

  // Auto-fill and auto-verify simulation for Gmail OTP in demo
  useEffect(() => {
    if (emailOtpSent && generatedEmailOtp && modalStep === 'verification' && !isEmailVerified && activeVerifyTab === 'email') {
      const timer = setTimeout(() => {
        setUserEmailOtpInput(generatedEmailOtp);
        setTimeout(() => {
          setIsEmailVerified(true);
          setEmailOtpMessage('✓ Gmail successfully verified with Avernao!');
          // Smoothly advance to phone verification
          setTimeout(() => {
            if (!isPhoneVerified) {
              setActiveVerifyTab('phone');
            }
          }, 600);
        }, 500);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [emailOtpSent, generatedEmailOtp, modalStep, isEmailVerified, activeVerifyTab, isPhoneVerified]);

  // Auto-fill and auto-verify simulation for Phone OTP in demo
  useEffect(() => {
    if (phoneOtpSent && generatedPhoneOtp && modalStep === 'verification' && !isPhoneVerified && activeVerifyTab === 'phone') {
      const timer = setTimeout(() => {
        setUserPhoneOtpInput(generatedPhoneOtp);
        setTimeout(() => {
          setIsPhoneVerified(true);
          setPhoneOtpMessage('✓ Phone Number successfully verified with Avernao SMS!');
        }, 500);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [phoneOtpSent, generatedPhoneOtp, modalStep, isPhoneVerified, activeVerifyTab]);

  const handleBack = () => {
    if (modalStep === 'verification') {
      if (activeVerifyTab === 'phone' && !isPhoneVerified) {
        setActiveVerifyTab('email');
        return;
      }
      setModalStep('info');
      return;
    }
    // Simply close modal without kicking user out or navigating to plan popups
    onClose();
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

  const handleSendEmailOtp = (targetEmail?: string) => {
    const toEmail = targetEmail || email;
    if (!toEmail || !toEmail.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address.');
      return;
    }
    setErrorMsg('');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedEmailOtp(code);
    setEmailOtpSent(true);
    setUserEmailOtpInput('');
    setIsEmailVerified(false);
    setEmailOtpMessage(`Avernao Verification Code sent to ${toEmail}: ${code}`);
  };

  const handleSendPhoneOtp = (countryCode?: string, digits?: string) => {
    const codePrefix = countryCode || selectedCountry.code;
    const phoneNum = digits || phoneDigits;
    if (!phoneNum || phoneNum.trim().length < 5) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    setErrorMsg('');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedPhoneOtp(code);
    setPhoneOtpSent(true);
    setUserPhoneOtpInput('');
    setIsPhoneVerified(false);
    setPhoneOtpMessage(`Avernao SMS Verification Code sent to ${codePrefix} ${phoneNum}: ${code}`);
  };

  const handleVerifyEmailManual = () => {
    setIsEmailVerified(true);
    setEmailOtpMessage('✓ Gmail successfully verified with Avernao!');
    setErrorMsg('');
    if (!isPhoneVerified) {
      setActiveVerifyTab('phone');
    }
  };

  const handleVerifyPhoneManual = () => {
    setIsPhoneVerified(true);
    setPhoneOtpMessage('✓ Phone Number successfully verified with Avernao SMS!');
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
      if (!phoneDigits.trim()) {
        errs.phoneDigits = 'Please enter a valid phone number.';
      }

      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }

      setFieldErrors({});
      setErrorMsg('');
      handleSendEmailOtp(email.trim());
      handleSendPhoneOtp(selectedCountry.code, phoneDigits.trim());
      setActiveVerifyTab('email');
      setModalStep('verification');
      return;
    }

    // Step 2: Verification step validation
    if (!isEmailVerified) {
      setErrorMsg('Please verify your Gmail address first.');
      setActiveVerifyTab('email');
      return;
    }
    if (!isPhoneVerified) {
      setErrorMsg('Please verify your phone number (SMS code) to continue.');
      setActiveVerifyTab('phone');
      return;
    }

    setErrorMsg('');
    setIsCreating(true);

    // Save email to history
    if (email.trim() && !emailHistory.includes(email.trim())) {
      const newHistory = [email.trim(), ...emailHistory].slice(0, 3);
      setEmailHistory(newHistory);
      localStorage.setItem('demo_email_history', JSON.stringify(newHistory));
    }

    // Securely save this user's owner profile and account to their private local device storage
    const accountProfile: SavedOwnerAccount = {
      id: email.trim().toLowerCase() || `acc_${Date.now()}`,
      restaurantName: restaurantName.trim(),
      fullName: fullName.trim(),
      role,
      email: email.trim(),
      phoneDigits: phoneDigits.trim(),
      countryId: selectedCountry.id,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem('avernao_last_active_account', JSON.stringify(accountProfile));
      const existingListStr = localStorage.getItem('avernao_saved_owner_accounts');
      let existingList: SavedOwnerAccount[] = existingListStr ? JSON.parse(existingListStr) : [];
      existingList = existingList.filter(a => a.email.toLowerCase() !== accountProfile.email.toLowerCase());
      existingList.unshift(accountProfile);
      existingList = existingList.slice(0, 5);
      localStorage.setItem('avernao_saved_owner_accounts', JSON.stringify(existingList));
    } catch (e) {}

    setTimeout(() => {
      setIsCreating(false);
      setModalStep('theme_selection');
    }, 1000);
  };

  const handleThemeSelect = async (themeId: string) => {
    setIsCreating(true);
    setErrorMsg('');

    const fullPhone = `${selectedCountry.code} ${phoneDigits}`;
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
      themePresetId: themeId,
      startTime: now,
      expiresAt: now + threeDaysMs
    };

    // Save to Firestore!
    const resId = `res_trial_${Date.now()}`;
    
    // Background non-blocking Firestore saves for instant loading responsiveness
    (async () => {
      try {
        await setDoc(doc(db, "restaurants", resId), {
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
          createdAt: now,
          activeThemeId: themeId
        }, { merge: true });

        // Save log entry to Firestore so it shows up in Master Admin Panel!
        await setDoc(doc(db, "audit_logs", `log_${Date.now()}`), {
          id: `log_${Date.now()}`,
          adminEmail: email.trim(),
          action: `Registered new trial account and selected theme "${themeId}" for ${restaurantName.trim()}`,
          targetId: resId,
          targetName: restaurantName.trim(),
          timestamp: now
        });
      } catch (err) {
        console.warn("Firestore save error:", err);
      }
    })();

    // Save the active session so App.tsx loads it!
    localStorage.setItem('webar_trial_session', JSON.stringify(trialData));
    localStorage.setItem('webar_active_theme_id', themeId);

    // Save manager session so App.tsx recognizes them as logged-in authenticated owners
    const managerSessionObj = {
      name: fullName.trim(),
      email: email.trim(),
      role: role || 'Owner',
      restaurantId: resId
    };
    localStorage.setItem('webar_active_manager_session', JSON.stringify(managerSessionObj));
    localStorage.setItem('webar_admin_authenticated', 'true');
    localStorage.setItem('webar_active_restaurant_id', resId);

    // Success call
    onStartTrialSuccess(trialData);

    const newTabUrl = `${window.location.origin}/?demo=true&trial=active&theme=${themeId}&plan=${selectedPlan}&onboarding=completed&r=${resId}&loading=true`;

    setIsCreating(false);

    // Open in a real browser tab automatically!
    const win = window.open(newTabUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // Fallback if blocked
      window.location.href = newTabUrl;
    } else {
      // Close modal in the current tab so they return to the clean main Avernao landing page
      onClose();
    }
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
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 space-y-4 max-h-[82vh] overflow-y-auto custom-scrollbar">
            {isCreating ? (
              <div className="py-14 text-center space-y-8 animate-fade-in text-slate-900">
                <style>{`
                  @keyframes bounceAcross {
                    0% {
                      left: 6%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    8% {
                      left: 14%;
                      top: -46px;
                      animation-timing-function: ease-in;
                    }
                    16% {
                      left: 22%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    24% {
                      left: 30%;
                      top: -46px;
                      animation-timing-function: ease-in;
                    }
                    32% {
                      left: 38%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    40% {
                      left: 46%;
                      top: -46px;
                      animation-timing-function: ease-in;
                    }
                    48% {
                      left: 54%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    56% {
                      left: 62%;
                      top: -46px;
                      animation-timing-function: ease-in;
                    }
                    64% {
                      left: 70%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    72% {
                      left: 78%;
                      top: -46px;
                      animation-timing-function: ease-in;
                    }
                    80% {
                      left: 86%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    88% {
                      left: 93%;
                      top: -46px;
                      animation-timing-function: ease-in;
                    }
                    96% {
                      left: 98%;
                      top: -6px;
                      animation-timing-function: ease-out;
                    }
                    100% {
                      left: 6%;
                      top: -6px;
                    }
                  }
                `}</style>

                {/* Animated Spaced-out Brand Title with Bouncing Ball */}
                <div className="relative w-72 h-20 mx-auto flex items-end justify-center select-none pb-4 border-b border-slate-100">
                  {/* Bouncing Ball */}
                  <div 
                    className="absolute w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 shadow-md shadow-orange-500/30"
                    style={{
                      animation: 'bounceAcross 3s infinite linear'
                    }}
                  />
                  
                  {/* Letters */}
                  <div className="flex justify-between w-full px-2 text-2xl font-black tracking-widest text-slate-900 uppercase font-sans">
                    <span>A</span>
                    <span>v</span>
                    <span>e</span>
                    <span>r</span>
                    <span>n</span>
                    <span>a</span>
                    <span>o</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <h4 className="text-lg font-black text-slate-900">
                    Loading Theme...
                  </h4>
                  <p className="text-xs font-bold text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your trial website is being prepared in a new tab.
                  </p>
                </div>
              </div>
            ) : modalStep === 'theme_selection' ? (
              // Beautiful Premium Theme Selection Sheet
              <div className="py-2 space-y-5 animate-fade-in text-slate-900">
                <div className="text-center space-y-1.5">
                  <div className="w-11 h-11 mx-auto rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shadow-xs border border-amber-500/20">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">
                    Select Your Theme
                  </h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Choose one theme to launch directly in a new tab
                  </p>
                  <p className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200/80 py-1 px-2.5 rounded-full inline-block">
                    Your {selectedPlan === 'basic' ? '$15 Plan' : selectedPlan === 'pro' ? '$49 Plan' : '$99 Plan'} has {selectedPlan === 'basic' ? '10 Themes' : selectedPlan === 'pro' ? '25 Themes' : '50 Themes'} available
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 max-h-[48vh] overflow-y-auto p-3 custom-scrollbar bg-slate-50/60 rounded-3xl border border-slate-100">
                  {LUXURY_THEMES.filter(t => {
                    const basicThemes = LUXURY_THEMES.filter(x => x.tier === 'basic');
                    const proThemes = LUXURY_THEMES.filter(x => x.tier === 'pro');
                    const eliteThemes = LUXURY_THEMES.filter(x => x.tier === 'elite');
                    
                    if (selectedPlan === 'basic') {
                      return basicThemes.slice(0, 10).some(x => x.id === t.id);
                    } else if (selectedPlan === 'pro') {
                      return [...basicThemes, ...proThemes].slice(0, 25).some(x => x.id === t.id);
                    } else {
                      return [...basicThemes, ...proThemes, ...eliteThemes].slice(0, 50).some(x => x.id === t.id);
                    }
                  }).map((theme, index) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleThemeSelect(theme.id)}
                      className="group w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white hover:bg-indigo-50/30 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xs transition-all duration-200 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 animate-fade-in"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Theme index block */}
                        <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50/50 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        
                        <div className="min-w-0">
                          {/* Theme name with clean index */}
                          <div className="text-sm sm:text-base font-black text-slate-900 group-hover:text-indigo-950 transition-colors flex flex-wrap items-center gap-2">
                            <span>Theme {String(index + 1).padStart(2, '0')} — {theme.name}</span>
                            {theme.isPopular && (
                              <span className="text-[9px] font-black tracking-widest text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50 shrink-0">
                                Popular
                              </span>
                            )}
                          </div>
                          
                          {/* Unboxed inline metadata / tagline */}
                          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-1 group-hover:text-slate-600 transition-colors">
                            {theme.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-3.5 shrink-0 pl-12 sm:pl-0">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">
                          {theme.categoryLabel || theme.category}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1.5 transition-all duration-300" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Back button and Info banner */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalStep('verification')}
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs tracking-wide shadow-2xs active:scale-95 transition-all cursor-pointer select-none"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                    <span>Back to Verification</span>
                  </button>

                  <p className="text-[10px] font-bold text-slate-400 text-right leading-tight max-w-[200px]">
                    Clicking any card launches theme directly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLaunchTrial} className="space-y-4" noValidate>
                {modalStep === 'info' ? (
                  <>
                    {/* 1. Restaurant Name with Typeahead Suggestion Dropdown */}
                    <div className="relative">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Restaurant Name *</span>
                      </label>
                      <input
                        type="text"
                        value={restaurantName}
                        onFocus={() => {
                          if (restaurantName.trim()) setIsRestaurantDropdownOpen(true);
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRestaurantName(val);
                          setIsRestaurantDropdownOpen(val.trim().length > 0);
                          if (fieldErrors.restaurantName) {
                            setFieldErrors(prev => ({ ...prev, restaurantName: undefined }));
                          }
                        }}
                        placeholder="e.g. Opalune Nitro Cold Brew"
                        className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none font-bold text-slate-900 bg-white transition-all ${
                          fieldErrors.restaurantName 
                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' 
                            : 'border-slate-300 focus:border-indigo-600'
                        }`}
                      />

                      <AnimatePresence>
                        {isRestaurantDropdownOpen && matchingRestaurants.length > 0 && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsRestaurantDropdownOpen(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="absolute top-full left-0 right-0 mt-1 bg-white border border-indigo-200 rounded-2xl shadow-xl z-20 overflow-hidden"
                            >
                              <div className="p-2 border-b border-slate-100 bg-indigo-50 text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center justify-between px-3">
                                <span>Existing Restaurant Matches</span>
                                <span className="text-[9px] text-indigo-600 font-semibold">Already Registered</span>
                              </div>
                              <div className="max-h-40 overflow-y-auto custom-scrollbar">
                                {matchingRestaurants.map((acc) => (
                                  <button
                                    key={acc.id}
                                    type="button"
                                    onClick={() => {
                                      setRestaurantName(acc.restaurantName);
                                      if (acc.fullName) setFullName(acc.fullName);
                                      if (acc.email) setEmail(acc.email);
                                      if (acc.phoneDigits) setPhoneDigits(acc.phoneDigits);
                                      setIsRestaurantDropdownOpen(false);
                                    }}
                                    className="w-full px-3.5 py-2 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors flex items-center justify-between border-b border-slate-50 cursor-pointer"
                                  >
                                    <div>
                                      <span className="font-black text-indigo-950">{acc.restaurantName}</span>
                                      <span className="text-[10px] text-slate-400 block">{acc.email}</span>
                                    </div>
                                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-bold">
                                      Select / Used
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

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
                            setIsEmailVerified(false);
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
                          {isEmailDropdownOpen && (savedAccountsList.length > 0 || emailHistory.length > 0) && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setIsEmailDropdownOpen(false)} />
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 overflow-hidden"
                              >
                                {savedAccountsList.length > 0 ? (
                                  <>
                                    <div className="p-2 border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-tight flex items-center justify-between">
                                      <span>Your Previous Registrations</span>
                                      <span className="text-[9px] text-indigo-600 font-bold">{savedAccountsList.length} Saved</span>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                      {savedAccountsList.map((acc) => (
                                        <button
                                          key={acc.id}
                                          type="button"
                                          onClick={() => handleSelectPreviousAccount(acc)}
                                          className="w-full px-3.5 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-between gap-2 border-b border-slate-50 cursor-pointer"
                                        >
                                          <div className="flex items-center gap-2.5 truncate">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black shrink-0">
                                              {acc.fullName ? acc.fullName[0].toUpperCase() : 'U'}
                                            </div>
                                            <div className="truncate">
                                              <div className="font-extrabold text-slate-900 text-xs truncate">
                                                {acc.fullName} • <span className="font-semibold text-slate-500">{acc.restaurantName}</span>
                                              </div>
                                              <div className="text-[10px] text-slate-400 font-mono truncate">{acc.email}</div>
                                            </div>
                                          </div>
                                          <span className="text-[10px] text-indigo-600 font-extrabold shrink-0 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200/60">
                                            Auto-fill
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="p-2 border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-tight">Recent Gmails</div>
                                    {emailHistory.map((hEmail) => (
                                      <button
                                        key={hEmail}
                                        type="button"
                                        onClick={() => {
                                          setEmail(hEmail);
                                          setIsEmailDropdownOpen(false);
                                          setIsEmailVerified(false);
                                          if (fieldErrors.email) {
                                            setFieldErrors(prev => ({ ...prev, email: undefined }));
                                          }
                                        }}
                                        className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2 cursor-pointer"
                                      >
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-600 shrink-0">
                                          {hEmail[0].toUpperCase()}
                                        </div>
                                        <span className="truncate">{hEmail}</span>
                                      </button>
                                    ))}
                                  </>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsEmailDropdownOpen(false);
                                    handleClearForNewAccount();
                                  }}
                                  className="w-full px-4 py-2 text-center text-[10px] font-black text-indigo-600 hover:bg-indigo-50 border-t border-slate-50 cursor-pointer"
                                >
                                  + USE NEW GMAIL / FRESH REGISTRATION
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

                    {/* 4. Country & Phone Number (Dynamic layout: stacked normally, shifts to side on dropdown open) */}
                    <motion.div 
                      layout
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={`transition-all duration-300 ${
                        isCountryDropdownOpen 
                          ? 'grid grid-cols-2 gap-2.5 sm:gap-3 items-start' 
                          : 'flex flex-col gap-3'
                      }`}
                    >
                      {/* Country / Region */}
                      <motion.div 
                        ref={countryContainerRef}
                        layout 
                        className="w-full flex flex-col"
                      >
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <Flag className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="truncate">Country / Region *</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCountryDropdownOpen(!isCountryDropdownOpen);
                            setIsRoleDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 hover:border-indigo-400 focus:border-indigo-600 focus:outline-none font-bold text-slate-900 bg-white flex items-center justify-between shadow-xs transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <CountryFlag code={selectedCountry.id} className="w-5 h-3.5" />
                            <span className="truncate">{selectedCountry.name}</span>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0">({selectedCountry.code})</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-1 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* In-flow Country List in this left empty space (বাম সাইডের ফাঁকা জায়গায়) */}
                        <AnimatePresence>
                          {isCountryDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -4 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2.5 w-full bg-white rounded-2xl shadow-lg border border-indigo-200/90 overflow-hidden ring-1 ring-black/5"
                            >
                              <div className="p-2 border-b border-slate-100 bg-indigo-50/70 text-[10px] font-bold text-indigo-900 uppercase tracking-wider px-3 flex items-center justify-between">
                                <span>Select Your Country</span>
                                <span className="text-[9px] text-indigo-600 font-semibold">{COUNTRIES_WITH_FLAGS.length} Countries</span>
                              </div>
                              <div className="max-h-52 overflow-y-auto p-1.5 custom-scrollbar space-y-1">
                                {COUNTRIES_WITH_FLAGS.map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setIsCountryDropdownOpen(false);
                                      setPhoneDigits(''); // Reset phone digits on country change
                                    }}
                                    className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer min-h-[38px] ${
                                      selectedCountry.id === c.id 
                                        ? 'bg-indigo-600 text-white font-black shadow-xs' 
                                        : 'text-slate-800 hover:bg-slate-100 hover:text-indigo-900'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <div className="shrink-0">
                                        <CountryFlag code={c.id} className="w-6 h-4" />
                                      </div>
                                      <span className="truncate">{c.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <span className={`font-mono text-[11px] ${selectedCountry.id === c.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                                        {c.code}
                                      </span>
                                      {selectedCountry.id === c.id && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Phone Number - Moves to side when dropdown opens, stays in place normally */}
                      <motion.div 
                        layout 
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="w-full"
                      >
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="truncate">Phone Number *</span>
                        </label>
                        <div className={`flex items-center rounded-2xl border bg-white overflow-hidden shadow-xs transition-all ${
                          fieldErrors.phoneDigits 
                            ? 'border-rose-500 ring-2 ring-rose-500/20' 
                            : 'border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20'
                        }`}>
                          <div className="pl-3 sm:pl-4 pr-2 py-2.5 flex items-center gap-1.5 sm:gap-2 shrink-0 border-r border-slate-100 bg-slate-50/30">
                            <CountryFlag code={selectedCountry.id} className="w-5 h-3.5" />
                            <span className="text-xs sm:text-sm font-bold text-slate-700">{selectedCountry.code}</span>
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
                            className="w-full min-w-0 px-3 sm:px-4 py-2.5 text-xs sm:text-sm focus:outline-none font-bold text-slate-900 bg-white placeholder:text-slate-300"
                          />
                        </div>
                        {fieldErrors.phoneDigits && (
                          <p className="mt-1 text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-fade-in pl-1">
                            <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{fieldErrors.phoneDigits}</span>
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  </>
                ) : (
                  <div className="py-2 space-y-4 animate-fade-in">
                    {/* Security Sub-Step Selector / Status Pills */}
                    <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setActiveVerifyTab('email')}
                        className={`flex-1 py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          activeVerifyTab === 'email'
                            ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5 text-indigo-600" />
                        <span>1. Gmail Verification</span>
                        {isEmailVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveVerifyTab('phone')}
                        className={`flex-1 py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          activeVerifyTab === 'phone'
                            ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Phone className="w-3.5 h-3.5 text-indigo-600" />
                        <span>2. Phone Verification</span>
                        {isPhoneVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    </div>

                    {/* SUB-STEP 1: GMAIL VERIFICATION */}
                    {activeVerifyTab === 'email' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="text-center space-y-1">
                          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                            <Mail className="w-6 h-6" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900">Verify your Gmail Account</h4>
                          <p className="text-xs font-semibold text-slate-500">
                            Verification code sent from <span className="font-extrabold text-indigo-600">Avernao Platform</span> to <span className="font-bold text-slate-800">{email}</span>
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={6}
                              value={userEmailOtpInput}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setUserEmailOtpInput(val);
                                setErrorMsg('');
                                if (val.length === 6) {
                                  handleVerifyEmailManual();
                                }
                              }}
                              placeholder=""
                              className="w-full px-4 py-3 text-2xl font-mono tracking-[0.4em] text-center font-black rounded-2xl border-2 border-indigo-200 focus:border-indigo-600 focus:outline-none text-slate-900 bg-white shadow-md transition-all"
                            />
                            {isEmailVerified && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-bounce" />
                              </div>
                            )}
                          </div>

                          {emailOtpSent && (
                            <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center justify-between gap-2 shadow-2xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                                <span className="truncate">Avernao Gmail Verification Code: <strong className="font-mono text-sm text-indigo-700 bg-white px-2 py-0.5 rounded-lg border border-indigo-200">{generatedEmailOtp || '737654'}</strong></span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setUserEmailOtpInput(generatedEmailOtp);
                                  handleVerifyEmailManual();
                                }}
                                className="px-2.5 py-1 rounded-xl bg-white text-indigo-700 hover:bg-indigo-100 font-extrabold text-[11px] border border-indigo-200 shadow-2xs cursor-pointer shrink-0"
                              >
                                Fill Code
                              </button>
                            </div>
                          )}

                          {isEmailVerified && (
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Gmail Verified! ({email})</span>
                              </div>
                              {!isPhoneVerified && (
                                <button
                                  type="button"
                                  onClick={() => setActiveVerifyTab('phone')}
                                  className="text-indigo-600 hover:text-indigo-800 font-black text-xs underline cursor-pointer"
                                >
                                  Go to Step 2 →
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SUB-STEP 2: PHONE NUMBER VERIFICATION */}
                    {activeVerifyTab === 'phone' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="text-center space-y-1">
                          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                            <Phone className="w-6 h-6" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900">Verify your Phone Number</h4>
                          <p className="text-xs font-semibold text-slate-500">
                            SMS verification code sent from <span className="font-extrabold text-indigo-600">Avernao SMS</span> to <span className="font-bold text-slate-800">{selectedCountry.code} {phoneDigits}</span>
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={6}
                              value={userPhoneOtpInput}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setUserPhoneOtpInput(val);
                                setErrorMsg('');
                                if (val.length === 6) {
                                  handleVerifyPhoneManual();
                                }
                              }}
                              placeholder=""
                              className="w-full px-4 py-3 text-2xl font-mono tracking-[0.4em] text-center font-black rounded-2xl border-2 border-indigo-200 focus:border-indigo-600 focus:outline-none text-slate-900 bg-white shadow-md transition-all"
                            />
                            {isPhoneVerified && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-bounce" />
                              </div>
                            )}
                          </div>

                          {phoneOtpSent && (
                            <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center justify-between gap-2 shadow-2xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                                <span className="truncate">Avernao SMS Verification Code: <strong className="font-mono text-sm text-indigo-700 bg-white px-2 py-0.5 rounded-lg border border-indigo-200">{generatedPhoneOtp || '482910'}</strong></span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setUserPhoneOtpInput(generatedPhoneOtp);
                                  handleVerifyPhoneManual();
                                }}
                                className="px-2.5 py-1 rounded-xl bg-white text-indigo-700 hover:bg-indigo-100 font-extrabold text-[11px] border border-indigo-200 shadow-2xs cursor-pointer shrink-0"
                              >
                                Fill SMS Code
                              </button>
                            </div>
                          )}

                          {isPhoneVerified && (
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Phone Number Verified! ({selectedCountry.code} {phoneDigits})</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Both Verified Celebration Banner */}
                    {isEmailVerified && isPhoneVerified && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-2xs animate-fade-in"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>✓ Gmail and Phone Number are fully verified with Avernao Platform!</span>
                      </motion.div>
                    )}

                    {errorMsg && (
                      <p className="text-center text-xs font-bold text-rose-600 flex items-center justify-center gap-1.5 animate-fade-in">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{errorMsg}</span>
                      </p>
                    )}
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between gap-3 w-full">
                  <button
                    key="modal-back-btn"
                    type="button"
                    onClick={handleBack}
                    className="relative overflow-hidden flex items-center gap-2.5 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm tracking-wide bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 hover:from-slate-800 hover:via-indigo-900 hover:to-indigo-950 border border-slate-700/80 hover:border-indigo-400/70 shadow-lg shadow-slate-950/30 hover:shadow-xl hover:shadow-indigo-950/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 ease-out cursor-pointer group shrink-0 select-none ring-1 ring-white/10 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:transition-transform before:duration-700"
                  >
                    <ArrowLeft className="w-4 h-4 text-indigo-300 group-hover:text-white transition-all duration-300 group-hover:-translate-x-1.5 group-hover:scale-115" />
                    <span className="transition-transform duration-300 group-hover:scale-105">Back</span>
                  </button>

                  <motion.button
                    layout
                    type="submit"
                    disabled={isCreating}
                    className="ml-auto relative overflow-hidden py-4 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white rounded-2xl font-black text-sm uppercase tracking-widest group-hover:tracking-[0.16em] shadow-xl shadow-indigo-600/35 hover:shadow-2xl hover:shadow-indigo-600/55 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 ease-out flex items-center justify-center gap-3 cursor-pointer select-none disabled:opacity-50 ring-1 ring-white/25 group before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-105">
                      {modalStep === 'info'
                        ? 'NEXT'
                        : isEmailVerified && isPhoneVerified
                        ? 'VERIFY & LAUNCH'
                        : activeVerifyTab === 'email'
                        ? isEmailVerified
                          ? 'NEXT: PHONE OTP'
                          : 'VERIFY GMAIL'
                        : isPhoneVerified
                        ? 'VERIFY & LAUNCH'
                        : 'VERIFY PHONE'}
                    </span>
                    {modalStep === 'info' ? (
                      <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:text-white transition-all duration-300 group-hover:translate-x-2 group-hover:scale-120" />
                    ) : isEmailVerified && isPhoneVerified ? (
                      <Rocket className="w-4 h-4 text-emerald-200 group-hover:text-white transition-all duration-300 group-hover:scale-120" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:text-white transition-all duration-300 group-hover:translate-x-2 group-hover:scale-120" />
                    )}
                  </motion.button>
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
