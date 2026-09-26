import React, { useState, useEffect, useRef } from 'react';
import { Order, AdminSettings, SubscriptionPlan, PricingPlan, ChefProfile, DEFAULT_CHEF_PROFILES } from '../types';
import { ActiveOrderCard } from './ActiveOrderCard';
import QrCodeManager from './QrCodeManager';
import MenuBuilder from './MenuBuilder';
import CategoryManager from './CategoryManager';
import PaymentModal from './PaymentModal';
import MenuCardStudio from './RestaurantAdmin/MenuCardStudio';
import DomainsManager from './RestaurantAdmin/DomainsManager';
import ThemeStoreManager from './RestaurantAdmin/ThemeStoreManager';
import AIAnalyticsDashboard from './AIAnalyticsDashboard';
import financialImage from '../assets/images/financial_control_full_dashboard_1786529698199.jpg';
import analyticsWatermark from '../assets/images/analytics_watermark_1786531181027.jpg';
import { GEO_COUNTRIES } from '../data/geoData';
import { countriesWithCodes } from '../data/countries';
import { 
  Filter, 
  Search, 
  Download, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ListOrdered, 
  FileCheck2, 
  PieChart, 
  ChevronRight,
  ChevronDown,
  User,
  Camera,
  Upload,
  Phone,
  MapPin,
  CreditCard,
  Plus,
  QrCode,
  ShieldCheck,
  Lock,
  KeyRound,
  ShieldAlert,
  X,
  Settings,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Zap,
  Globe,
  LogOut,
  Home,
  Palette,
  Type,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Music,
  MessageSquare,
  MessageCircle,
  Smartphone,
  ExternalLink,
  Image,
  RefreshCw,
  CloudDownload,
  Save,
  Moon,
  Sun,
  History,
  LayoutDashboard,
  Utensils,
  BarChart3,
  Star,
  Maximize2,
  Crown,
  Check,
  ListTree,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  ChefHat,
  Award
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { getHeroSlidesForLocation, COUNTRY_HERO_PRESETS, HeroSlideData } from '../data/countryHeroImages';

// High-fidelity country flag badge with CDN image & graceful emoji fallback
export const CountryFlagBadge: React.FC<{ code: string; name?: string; flag?: string; className?: string }> = ({ 
  code, 
  name = '', 
  flag = '🌐', 
  className = "w-5 h-3.5" 
}) => {
  const [hasError, setHasError] = useState(false);
  const countryCode = code ? code.toLowerCase() : '';
  
  if (hasError || !countryCode) {
    return <span className="text-base leading-none select-none shrink-0">{flag}</span>;
  }
  
  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      alt={name || code}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`${className} object-cover rounded-[3px] shadow-sm border border-slate-300/60 dark:border-slate-700 shrink-0 select-none inline-block align-middle`}
    />
  );
};

// Admin section sub-tab: 'orders' | 'history' | 'qrcodes' | 'settings'
interface OrderManagementAdminProps {
  restaurantId: string;
  orders: Order[];
  managerSession?: { name: string; email: string; role: string } | null;
  onAcceptOrder: (orderId: string) => void;
  onNextStatus: (orderId: string) => void;
  onServeOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onClearHistory: () => void;
  onUpdatePaymentStatus?: (orderId: string, status: 'Pending' | 'Paid' | 'Refunded', verifiedBy?: string, txnId?: string) => void;
  activeTablesCount?: number;
  cookingCount?: number;
  servedCount?: number;
  revenue?: number;
  settings: AdminSettings;
  onUpdateSettings: (settings: Partial<AdminSettings>) => void;
  onTriggerGlobalUpdate?: () => Promise<void>;
  lang: 'en' | 'bn' | 'ar';
  setLang: (lang: 'en' | 'bn' | 'ar') => void;
  user: any;
  onLogout: () => void;
  onExitAdmin?: () => void;
  activeTab?: 'recent' | 'history' | 'menu' | 'categories' | 'financial' | 'analytics' | 'pipelines' | 'qrcodes' | 'support' | 'settings' | 'waiter' | 'menu_studio' | 'domains' | 'theme_store';
  showSidebar?: boolean;
  waiterRequests?: any[];
  onResolveWaiter?: (id: string, action?: 'confirm' | 'resolve') => void;
}

export default function OrderManagementAdmin({
  restaurantId,
  orders,
  managerSession,
  onAcceptOrder,
  onNextStatus,
  onServeOrder,
  onCancelOrder,
  onDeleteOrder,
  onClearHistory,
  onUpdatePaymentStatus,
  activeTablesCount,
  cookingCount,
  servedCount,
  revenue,
  settings,
  onUpdateSettings,
  onTriggerGlobalUpdate,
  lang,
  setLang,
  user,
  onLogout,
  onExitAdmin,
  activeTab,
  showSidebar = true,
  waiterRequests,
  onResolveWaiter
}: OrderManagementAdminProps) {
  const [activeNavTab, setActiveNavTab] = useState<'recent' | 'history' | 'menu' | 'categories' | 'financial' | 'analytics' | 'pipelines' | 'qrcodes' | 'support' | 'settings' | 'waiter' | 'menu_studio' | 'domains' | 'theme_store'>(() => {
    if (typeof window !== 'undefined') {
      const urlTab = new URLSearchParams(window.location.search).get('tab');
      if (urlTab && ['recent', 'history', 'menu', 'categories', 'financial', 'analytics', 'pipelines', 'qrcodes', 'support', 'settings', 'waiter', 'menu_studio', 'domains', 'theme_store'].includes(urlTab)) {
        return urlTab as any;
      }
    }
    return 'recent';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('admin_active_nav_tab', activeNavTab);
      } catch {}
    }
  }, [activeNavTab]);
  const [isFullScreenPage, setIsFullScreenPage] = useState<boolean>(false);
  const [mobileShowMenu, setMobileShowMenu] = useState<boolean>(false);
  const [liveClock, setLiveClock] = useState<Date>(new Date());
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Helper to extract exactly 2 initials for the monogram logo
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

  // Helper to render a high-end designer SVG monogram logo
  const renderMonogramLogo = (brandName: string, isLight: boolean = false, size: 'sm' | 'md' | 'lg' = 'md') => {
    const [c1, c2] = getLogoInitials(brandName);
    const style = localBrandSettings.logoStyle || settings.logoStyle || 'crest';
    const primaryColor = localBrandSettings.logoColorPrimary || settings.logoColorPrimary || (isLight ? '#475569' : '#94a3b8');
    const secondaryColor = localBrandSettings.logoColorSecondary || settings.logoColorSecondary || (isLight ? '#0284c7' : '#22d3ee');
    
    // Size classes
    const sizeClasses = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-14 h-14';
    const roundedClass = size === 'sm' ? 'rounded-lg' : 'rounded-2xl';

    return (
      <div className={`${sizeClasses} ${roundedClass} bg-gradient-to-br ${isLight ? 'from-white to-slate-50 border-slate-200 shadow-sm' : 'from-slate-950 to-slate-900 border-slate-800 shadow-md'} border flex items-center justify-center relative overflow-hidden shrink-0 select-none hover:scale-105 transition-all duration-300`}>
        {/* Decorative background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
          {/* STYLE 1: CREST */}
          {style === 'crest' && (
            <>
              <circle 
                cx="50" 
                cy="50" 
                r="41" 
                stroke={secondaryColor} 
                strokeWidth="0.8" 
                fill="none" 
                opacity={0.35}
              />
              <text 
                x="36" 
                y="52" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "45px", 
                  fontWeight: 300, 
                  fontStyle: "italic",
                  opacity: 0.95
                }}
              >
                {c1}
              </text>
              <line 
                x1="26" 
                y1="74" 
                x2="74" 
                y2="26" 
                stroke={secondaryColor} 
                strokeWidth="1.2" 
                opacity={0.5}
              />
              <text 
                x="64" 
                y="68" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "47px", 
                  fontWeight: 800,
                  filter: isLight ? "none" : `drop-shadow(1px 2px 3px rgba(0,0,0,0.5))`
                }}
              >
                {c2}
              </text>
            </>
          )}

          {/* STYLE 2: MINIMAL */}
          {style === 'minimal' && (
            <>
              <text 
                x="34" 
                y="50" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "49px", 
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                {c1}
              </text>
              <text 
                x="64" 
                y="68" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "52px", 
                  fontWeight: 700,
                  fontStyle: "italic",
                  filter: isLight ? "none" : `drop-shadow(2px 2px 4px rgba(0,0,0,0.4))`
                }}
              >
                {c2}
              </text>
            </>
          )}

          {/* STYLE 3: STAMP */}
          {style === 'stamp' && (
            <>
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                stroke={primaryColor} 
                strokeWidth="1" 
                strokeDasharray="4,3"
                fill="none" 
                opacity={0.5}
              />
              <circle 
                cx="50" 
                cy="50" 
                r="38" 
                stroke={secondaryColor} 
                strokeWidth="0.6" 
                fill="none" 
                opacity={0.3}
              />
              <text 
                x="44" 
                y="48" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "44px", 
                  fontWeight: 300,
                }}
              >
                {c1}
              </text>
              <text 
                x="56" 
                y="62" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "44px", 
                  fontWeight: 700,
                }}
              >
                {c2}
              </text>
            </>
          )}

          {/* STYLE 4: MODERN */}
          {style === 'modern' && (
            <>
              <path 
                d="M15,35 L15,15 L35,15 M65,15 L85,15 L85,35 M85,65 L85,85 L65,85 M35,85 L15,85 L15,65" 
                stroke={primaryColor} 
                strokeWidth="1" 
                fill="none" 
                opacity={0.4} 
              />
              <text 
                x="35" 
                y="48" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Space Grotesk', 'Montserrat', sans-serif", 
                  fontSize: "42px", 
                  fontWeight: 900,
                  letterSpacing: "-2px"
                }}
              >
                {c1}
              </text>
              <text 
                x="65" 
                y="66" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Space Grotesk', 'Montserrat', sans-serif", 
                  fontSize: "45px", 
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  filter: `drop-shadow(0px 0px 8px ${secondaryColor})`
                }}
              >
                {c2}
              </text>
            </>
          )}
        </svg>
      </div>
    );
  };

  // Synchronize admin tabs with browser history and handle admin back-button transitions
  const isPopStateRef = useRef<boolean>(false);
  const activeNavTabRef = useRef(activeNavTab);
  activeNavTabRef.current = activeNavTab;
  const isFullScreenPageRef = useRef(isFullScreenPage);
  isFullScreenPageRef.current = isFullScreenPage;

  // Modular Settings Hub categories, search, and accordion states
  const [settingsCategoryTab, setSettingsCategoryTab] = useState<'list' | 'brand' | 'security' | 'features' | 'chef' | 'social' | 'deploy' | 'domains'>('brand');
  const settingsCategoryTabRef = useRef(settingsCategoryTab);
  settingsCategoryTabRef.current = settingsCategoryTab;

  const openSettingsCategory = (tabId: 'list' | 'brand' | 'security' | 'features' | 'chef' | 'social' | 'deploy' | 'domains') => {
    setSettingsCategoryTab(tabId);
    setSettingsSearchQuery('');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleAdminBack = () => {
      // 1. If in Settings, back out to Active Dashboard with sidebar visible
      if (activeNavTabRef.current === 'settings') {
        setActiveNavTab('recent');
        setIsFullScreenPage(false);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // 2. If in Menu Card Studio
      if (activeNavTabRef.current === 'menu_studio') {
        window.dispatchEvent(new CustomEvent('studio-back-event'));
        setIsFullScreenPage(false);
        return;
      }

      // 3. If in any other admin tab (history, categories, etc.), back out to Active Dashboard with sidebar visible
      if (activeNavTabRef.current !== 'recent') {
        setActiveNavTab('recent');
        setIsFullScreenPage(false);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // 4. If already on Active Dashboard ('recent') and full screen is true, reset it
      if (isFullScreenPageRef.current) {
        setIsFullScreenPage(false);
        return;
      }

      // 5. If already on Active Dashboard ('recent') and normal layout, exit admin mode to client portal
      if (onExitAdmin) {
        onExitAdmin();
      }
    };
    const handleSwitchTab = (e: any) => {
      if (e.detail) {
        setActiveNavTab(e.detail);
      }
    };
    window.addEventListener('admin-back-button', handleAdminBack);
    window.addEventListener('admin-switch-tab', handleSwitchTab);
    return () => {
      window.removeEventListener('admin-back-button', handleAdminBack);
      window.removeEventListener('admin-switch-tab', handleSwitchTab);
    };
  }, [onExitAdmin]);

  useEffect(() => {
    const initialTab = activeTab || 'recent';
    // Replace current state so we don't have blank history
    window.history.replaceState({ view: 'admin', tab: initialTab }, '');

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view === 'admin' && e.state.tab) {
        isPopStateRef.current = true;
        setActiveNavTab(e.state.tab);
      } else {
        isPopStateRef.current = true;
        if (onExitAdmin) {
          onExitAdmin();
        } else {
          setActiveNavTab('recent');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeTab, onExitAdmin]);

  useEffect(() => {
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      return;
    }

    // Push new history state when changing tab manually
    const currentState = window.history.state;
    if (!currentState || currentState.view !== 'admin' || currentState.tab !== activeNavTab) {
      window.history.pushState({ view: 'admin', tab: activeNavTab }, '');
    }
  }, [activeNavTab]);

  useEffect(() => {
    const timer = setInterval(() => setLiveClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeTab) {
      setActiveNavTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const labels: Record<string, string> = {
      recent: 'ACTIVE DASHBOARD',
      history: 'ORDER HISTORY',
      categories: 'CATEGORIES',
      menu: 'MENU BUILDER',
      menu_studio: 'MENU CARD STUDIO',
      qrcodes: 'QR & MENU BINDING',
      financial: 'FINANCIAL CONTROL',
      analytics: 'AI ANALYTICS',
      waiter: 'WAITER REQUESTS',
      support: 'GET SUPPORT',
      settings: 'SYSTEM SETTINGS'
    };
    const title = labels[activeNavTab] || 'ACTIVE DASHBOARD';
    window.dispatchEvent(new CustomEvent('admin-active-tab-change', { detail: { tab: activeNavTab, label: title } }));
  }, [activeNavTab]);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'main' | 'general' | 'brand' | 'timing' | 'profile' | 'software'>('main');
  const [isLogoGalleryOpen, setIsLogoGalleryOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Confirmed' | 'Completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(settings?.theme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    if (settings?.theme) {
      setTheme(settings.theme);
    } else {
      setTheme('light');
    }
  }, [settings?.theme]);

  const getNormalizedPlan = (p?: string): 'basic' | 'pro' | 'elite' => {
    if (typeof window !== 'undefined') {
      const searchPlan = new URLSearchParams(window.location.search).get('plan')?.toLowerCase();
      if (searchPlan === '99' || searchPlan === 'elite' || searchPlan === 'enterprise' || searchPlan === 'plan3') return 'elite';
      if (searchPlan === '49' || searchPlan === 'pro' || searchPlan === 'plan2') return 'pro';
      if (searchPlan === '15' || searchPlan === 'basic' || searchPlan === 'plan1') return 'basic';
    }
    if (!p) return 'basic';
    const val = p.toString().toLowerCase().trim();
    if (val === 'elite' || val === '99' || val === 'enterprise' || val === 'premium' || val === 'plan3') return 'elite';
    if (val === 'pro' || val === '49' || val === 'plan2') return 'pro';
    return 'basic';
  };

  const [localBrandSettings, setLocalBrandSettings] = useState({
    brandName: settings.brandName || '',
    brandLocation: settings.brandLocation || '',
    brandLogo: settings.brandLogo || '',
    brandColors: settings.brandColors || { primary: '#0ea5e9', secondary: '#0f172a', accent: '#f59e0b' },
    subscriptionPlan: getNormalizedPlan(settings.subscriptionPlan),
    socialLinks: settings.socialLinks || { facebook: '', instagram: '', youtube: '', linkedin: '', tiktok: '' },
    logoStyle: settings.logoStyle || 'crest',
    logoColorPrimary: settings.logoColorPrimary || '#94a3b8',
    logoColorSecondary: settings.logoColorSecondary || '#22d3ee',
    contactPhone: settings.contactPhone || '',
    contactWhatsapp: settings.contactWhatsapp || settings.contactPhone || '',
    contactEmail: settings.contactEmail || '',
    heroImages: settings.heroImages || (settings.heroSlides ? settings.heroSlides.map(s => s.image) : ['', '', '']),
    heroSlides: settings.heroSlides || [],
    showGoogleMap: settings.showGoogleMap ?? true,
    showChefSection: settings.showChefSection ?? true,
    themeShowChefSection: settings.themeShowChefSection ?? true,
    chefProfiles: (() => {
      if (settings.chefProfiles && settings.chefProfiles.length > 0) {
        const list = [...settings.chefProfiles];
        while (list.length < 6) {
          const fallback = DEFAULT_CHEF_PROFILES[list.length] || DEFAULT_CHEF_PROFILES[0];
          list.push({ ...fallback, id: `chef-${list.length + 1}` });
        }
        return list.slice(0, 6);
      }
      if (settings.chefProfile) {
        const list = [settings.chefProfile, ...DEFAULT_CHEF_PROFILES.slice(1)];
        return list.slice(0, 6);
      }
      return [...DEFAULT_CHEF_PROFILES];
    })(),
    chefProfile: settings.chefProfile || DEFAULT_CHEF_PROFILES[0],
    aboutUsTitle: settings.aboutUsTitle || '',
    aboutUsSubtitle: settings.aboutUsSubtitle || 'ABOUT US',
    aboutUsText: settings.aboutUsText || '',
    aboutUsImage: settings.aboutUsImage || '',
    lunavereFooterSubtitle: settings.lunavereFooterSubtitle || 'PARISIAN STARLIGHT CAFE',
    lunavereFooterDesc: settings.lunavereFooterDesc || 'An intimate Parisian coffee house for slow evenings, delicate pastries, and beautifully brewed single-origin coffee.',
    lunavereReservationTitle: settings.lunavereReservationTitle || 'STARLIGHT TABLE',
    lunavereReservationDesc: settings.lunavereReservationDesc || 'Reservations are recommended for late evenings, terrace tables, and tasting flights.',
    lunavereReserveBtnText: settings.lunavereReserveBtnText || 'RESERVE A TABLE',
    lunavereQrBtnText: settings.lunavereQrBtnText || 'OPEN QR DIGITAL MENU',
    menuSectionTagline: settings.menuSectionTagline || '☕ — ARTISAN HAND-ROASTED SPECIALTY COFFEE —',
    menuSectionTitle: settings.menuSectionTitle || 'Haute Cuisine & Tasting Courses',
    menuSectionSubtitle: settings.menuSectionSubtitle || 'Every dish is an architectural composition of rare seasonal provenance, wild herbs, and culinary precision.'
  });

  // Keep subscriptionPlan synchronized when props change
  useEffect(() => {
    if (settings?.subscriptionPlan) {
      setLocalBrandSettings(prev => ({
        ...prev,
        subscriptionPlan: getNormalizedPlan(settings.subscriptionPlan)
      }));
    }
  }, [settings?.subscriptionPlan]);

  // Active selected chef index (0 to 5 for 6 chefs)
  const [selectedChefIndex, setSelectedChefIndex] = useState<number>(0);

  const [settingsSearchQuery, setSettingsSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brand: true,
    security: true,
    features: true,
    chef: true,
    social: true,
    deploy: true
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isSectionVisible = (sectionKey: string, keywords: string[]) => {
    if (settingsCategoryTab !== sectionKey) {
      return false;
    }
    if (!settingsSearchQuery.trim()) return true;
    const q = settingsSearchQuery.toLowerCase().trim();
    return keywords.some(k => k.toLowerCase().includes(q));
  };

  const isExpanded = (sectionKey: string) => {
    if (settingsSearchQuery.trim().length > 0) return true;
    return expandedSections[sectionKey] !== false;
  };

  // Geographic Location details state
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const loc = settings.brandLocation || '';
    const parts = loc.split(',').map(s => s.trim());
    if (parts.length >= 3) return parts[2];
    if (parts.length === 2) return parts[1];
    return parts[0] || '';
  });

  const [selectedState, setSelectedState] = useState(() => {
    const loc = settings.brandLocation || '';
    const parts = loc.split(',').map(s => s.trim());
    if (parts.length >= 3) return parts[1];
    if (parts.length === 2) return parts[0];
    return '';
  });

  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const loc = settings.brandLocation || '';
    const parts = loc.split(',').map(s => s.trim());
    if (parts.length >= 3) return parts[0];
    return '';
  });

  // Automatically update the main brandLocation field and sync hero images when country changes
  useEffect(() => {
    const parts = [selectedDistrict.trim(), selectedState.trim(), selectedCountry.trim()].filter(Boolean);
    const combined = parts.join(', ');
    const countrySlides = getHeroSlidesForLocation(selectedCountry || combined, localBrandSettings.brandName);
    setLocalBrandSettings(prev => {
      const hasUploadedCustom = prev.heroImages && prev.heroImages.some(img => img && img.startsWith('data:image'));
      return {
        ...prev,
        brandLocation: combined,
        heroSlides: hasUploadedCustom ? prev.heroSlides : countrySlides,
        heroImages: hasUploadedCustom ? prev.heroImages : countrySlides.map(s => s.image)
      };
    });
  }, [selectedCountry, selectedState, selectedDistrict]);

  const [selectedPhonePrefix, setSelectedPhonePrefix] = useState(() => {
    const phone = settings.contactPhone || '';
    const sortedCountries = [...countriesWithCodes].sort((a, b) => b.prefix.length - a.prefix.length);
    const match = sortedCountries.find(c => phone.startsWith(c.prefix));
    return match ? match.prefix : '+880';
  });

  const [localPhoneSuffix, setLocalPhoneSuffix] = useState(() => {
    const phone = settings.contactPhone || '';
    const sortedCountries = [...countriesWithCodes].sort((a, b) => b.prefix.length - a.prefix.length);
    const match = sortedCountries.find(c => phone.startsWith(c.prefix));
    if (match) {
      return phone.slice(match.prefix.length).trim();
    }
    return phone;
  });

  const [isPhonePrefixOpen, setIsPhonePrefixOpen] = useState(false);
  const [phoneSearchQuery, setPhoneSearchQuery] = useState('');
  const phonePrefixRef = useRef<HTMLDivElement>(null);

  // Automatically update localBrandSettings.contactPhone when prefix or suffix changes
  useEffect(() => {
    setLocalBrandSettings(prev => ({
      ...prev,
      contactPhone: localPhoneSuffix ? `${selectedPhonePrefix} ${localPhoneSuffix}`.trim() : ''
    }));
  }, [selectedPhonePrefix, localPhoneSuffix]);

  // WhatsApp Dial Prefix & Suffix State
  const [selectedWhatsappPrefix, setSelectedWhatsappPrefix] = useState(() => {
    const phone = settings.contactWhatsapp || settings.contactPhone || '';
    const sortedCountries = [...countriesWithCodes].sort((a, b) => b.prefix.length - a.prefix.length);
    const match = sortedCountries.find(c => phone.startsWith(c.prefix));
    return match ? match.prefix : '+880';
  });

  const [localWhatsappSuffix, setLocalWhatsappSuffix] = useState(() => {
    const phone = settings.contactWhatsapp || settings.contactPhone || '';
    const sortedCountries = [...countriesWithCodes].sort((a, b) => b.prefix.length - a.prefix.length);
    const match = sortedCountries.find(c => phone.startsWith(c.prefix));
    if (match) {
      return phone.slice(match.prefix.length).trim();
    }
    return phone;
  });

  const [isWhatsappPrefixOpen, setIsWhatsappPrefixOpen] = useState(false);
  const [whatsappSearchQuery, setWhatsappSearchQuery] = useState('');
  const whatsappPrefixRef = useRef<HTMLDivElement>(null);

  // Automatically update localBrandSettings.contactWhatsapp when prefix or suffix changes
  useEffect(() => {
    setLocalBrandSettings(prev => ({
      ...prev,
      contactWhatsapp: localWhatsappSuffix ? `${selectedWhatsappPrefix} ${localWhatsappSuffix}`.trim() : ''
    }));
  }, [selectedWhatsappPrefix, localWhatsappSuffix]);

  // Search-select custom dropdown states & refs
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);

  const countryInputRef = useRef<HTMLInputElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);
  const districtInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (countryInputRef.current && !countryInputRef.current.contains(target)) {
        setIsCountryDropdownOpen(false);
      }
      if (stateInputRef.current && !stateInputRef.current.contains(target)) {
        setIsStateDropdownOpen(false);
      }
      if (districtInputRef.current && !districtInputRef.current.contains(target)) {
        setIsDistrictDropdownOpen(false);
      }
      if (phonePrefixRef.current && !phonePrefixRef.current.contains(target)) {
        setIsPhonePrefixOpen(false);
      }
      if (whatsappPrefixRef.current && !whatsappPrefixRef.current.contains(target)) {
        setIsWhatsappPrefixOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Saved instantly on hitting the 'Enter' key inside any input element
  const handleKeyDownSave = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Temporarily blur the input to hide virtual keyboard on mobile and show feedback
      (e.target as HTMLInputElement).blur();
      handleSaveBrandSettings();
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [isAvatarZoomed, setIsAvatarZoomed] = useState(false);
  
  // Custom Profile Avatar / Photo Gallery Upload State
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const cameraFileInputRef = useRef<HTMLInputElement>(null);
  const [showGooglePhotos, setShowGooglePhotos] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webar_custom_user_avatar') || null;
    }
    return null;
  });
  const [avatarSuccessMsg, setAvatarSuccessMsg] = useState<string | null>(null);

  const matchedCountry = GEO_COUNTRIES.find(c => c.name.toLowerCase() === selectedCountry.toLowerCase());
  const stateOptions = matchedCountry ? matchedCountry.states : [];
  const filteredStates = stateOptions.filter(s => 
    s.name.toLowerCase().includes(selectedState.toLowerCase())
  );

  const matchedState = stateOptions.find(s => s.name.toLowerCase() === selectedState.toLowerCase());
  const districtOptions = matchedState ? matchedState.districts : [];
  const filteredDistricts = districtOptions.filter(d => 
    d.toLowerCase().includes(selectedDistrict.toLowerCase())
  );

  const filteredCountries = GEO_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(selectedCountry.toLowerCase())
  );

  // Secret Admin PIN/Password Change state
  const [currentSecretCode, setCurrentSecretCode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webar_admin_secret_code') || 'admin5321';
    }
    return 'admin5321';
  });
  const [newSecretCode, setNewSecretCode] = useState('');
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [secretCodeSuccessMsg, setSecretCodeSuccessMsg] = useState<string | null>(null);

  // Admin Button Toggle & Password Modal state
  const [isConfirmAdminBtnModalOpen, setIsConfirmAdminBtnModalOpen] = useState(false);
  const [targetAdminBtnVisibility, setTargetAdminBtnVisibility] = useState(true);
  const [adminConfirmPasswordInput, setAdminConfirmPasswordInput] = useState('');
  const [adminConfirmPasswordError, setAdminConfirmPasswordError] = useState('');
  const [adminToggleSuccessMsg, setAdminToggleSuccessMsg] = useState<string | null>(null);
  const [showModalPassword, setShowModalPassword] = useState(false);

  const handleConfirmAdminButtonToggle = (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = currentSecretCode || settings?.adminPassword || localStorage.getItem('webar_admin_secret_code') || 'admin5321';
    
    if (adminConfirmPasswordInput.trim() !== validPassword.trim()) {
      setAdminConfirmPasswordError(lang === 'bn' ? 'ভুল পাসওয়ার্ড! সঠিক এডমিন পাসওয়ার্ড দিন।' : 'Incorrect password! Enter valid admin password.');
      return;
    }

    onUpdateSettings({ showAdminButton: targetAdminBtnVisibility });
    setIsConfirmAdminBtnModalOpen(false);
    setAdminConfirmPasswordInput('');
    setAdminConfirmPasswordError('');
    
    const msg = targetAdminBtnVisibility
      ? (lang === 'bn' ? 'ওয়েবসাইট হেডারে এডমিন বাটন অন (দৃশ্যমান) করা হয়েছে!' : 'Header Admin button is now ON (Visible)!')
      : (lang === 'bn' ? 'ওয়েবসাইট হেডারে এডমিন বাটন অফ (লুকানো) করা হয়েছে! এডমিন প্যানেলে ফিরতে পাসওয়ার্ড টাইপ করতে হবে।' : 'Header Admin button is now OFF (Hidden)! Password required to return to admin.');

    setAdminToggleSuccessMsg(msg);
    setTimeout(() => setAdminToggleSuccessMsg(null), 5000);
  };

  const handleSaveSecretCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecretCode.trim()) return;
    
    const newCode = newSecretCode.trim();
    localStorage.setItem('webar_admin_secret_code', newCode);
    setCurrentSecretCode(newCode);
    setNewSecretCode('');
    setSecretCodeSuccessMsg(lang === 'bn' ? 'অ্যাডমিন সিক্রেট কোড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Admin secret password successfully updated!');
    setTimeout(() => setSecretCodeSuccessMsg(null), 4000);
    // Dispatch event so App.tsx can update its key listeners instantly
    window.dispatchEvent(new Event('webar_secret_code_changed'));
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert(lang === 'bn' ? 'ছবি ১০ মেগাবাইটের মধ্যে হতে হবে!' : 'Image file size must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCustomAvatarUrl(dataUrl);
        localStorage.setItem('webar_custom_user_avatar', dataUrl);
        setAvatarSuccessMsg(lang === 'bn' ? 'প্রোফাইল ছবি সফলভাবে আপডেট করা হয়েছে!' : 'Profile picture updated from gallery!');
        setTimeout(() => setAvatarSuccessMsg(null), 4000);
        window.dispatchEvent(new Event('webar_avatar_changed'));
      }
    };
    reader.readAsDataURL(file);
  };

  const brandLogoFileInputRef = useRef<HTMLInputElement>(null);

  const handleBrandLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(lang === 'bn' ? 'লোগো ছবি ৫ মেগাবাইটের মধ্যে হতে হবে!' : 'Logo file size must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLocalBrandSettings(prev => ({ ...prev, brandLogo: dataUrl }));
        if (onUpdateSettings) {
          onUpdateSettings({ brandLogo: dataUrl });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBrandLogo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLocalBrandSettings(prev => ({ ...prev, brandLogo: '' }));
    if (onUpdateSettings) {
      onUpdateSettings({ brandLogo: '' });
    }
  };

  const handleResetAvatar = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCustomAvatarUrl(null);
    localStorage.removeItem('webar_custom_user_avatar');
    setAvatarSuccessMsg(lang === 'bn' ? 'ডিফল্ট ছবিতে রিসেট করা হয়েছে' : 'Profile photo reset');
    setTimeout(() => setAvatarSuccessMsg(null), 3000);
    window.dispatchEvent(new Event('webar_avatar_changed'));
  };

  // Hero Slider Customization Refs & Handlers
  const slide1FileInputRef = useRef<HTMLInputElement>(null);
  const slide2FileInputRef = useRef<HTMLInputElement>(null);
  const slide3FileInputRef = useRef<HTMLInputElement>(null);
  const slide4FileInputRef = useRef<HTMLInputElement>(null);
  const [slideNotificationMsg, setSlideNotificationMsg] = useState<string | null>(null);

  // Sync hero slider images automatically based on current country or preset selection
  const handleSyncCountryHeroSlides = (countryToSync?: string) => {
    const targetCountry = countryToSync || selectedCountry || localBrandSettings.brandLocation || 'Global';
    const slides = getHeroSlidesForLocation(targetCountry, localBrandSettings.brandName);
    setLocalBrandSettings(prev => ({
      ...prev,
      heroSlides: slides,
      heroImages: slides.map(s => s.image)
    }));
    setSlideNotificationMsg(
      lang === 'bn' 
        ? `${targetCountry} লাক্সারি রেস্টুরেন্ট ছবি স্লাইডারে যুক্ত হয়েছে!` 
        : `Applied ${targetCountry} luxury restaurant images!`
    );
    setTimeout(() => setSlideNotificationMsg(null), 4000);
  };

  const handleUpdateSlideImage = (index: number, newImageUrl: string) => {
    setLocalBrandSettings(prev => {
      const defaultSlides = getHeroSlidesForLocation(selectedCountry || prev.brandLocation, prev.brandName);
      const currentSlides = prev.heroSlides && prev.heroSlides.length >= 1 
        ? [...prev.heroSlides] 
        : [...defaultSlides];
      
      // Ensure currentSlides has items up to index
      while (currentSlides.length <= index) {
        const fallback = defaultSlides[currentSlides.length] || defaultSlides[0];
        currentSlides.push({ ...fallback, id: currentSlides.length + 1 });
      }

      currentSlides[index] = {
        ...currentSlides[index],
        image: newImageUrl
      };

      const updatedImages = currentSlides.map(s => s.image);
      return {
        ...prev,
        heroSlides: currentSlides,
        heroImages: updatedImages
      };
    });
  };

  const handleSlideFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert(lang === 'bn' ? 'ছবি ১০ মেগাবাইটের মধ্যে হতে হবে!' : 'Image file size must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        handleUpdateSlideImage(index, dataUrl);
        setSlideNotificationMsg(
          lang === 'bn' 
            ? `স্লাইড #${index + 1} সফলভাবে আপডেট হয়েছে!` 
            : `Slide #${index + 1} image updated!`
        );
        setTimeout(() => setSlideNotificationMsg(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetSlide = (index: number) => {
    const defaults = getHeroSlidesForLocation(selectedCountry || localBrandSettings.brandLocation, localBrandSettings.brandName);
    if (defaults[index]) {
      handleUpdateSlideImage(index, defaults[index].image);
    }
  };

  const currentAvatarSrc = customAvatarUrl || user?.photoURL || settings?.brandLogo || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [verifyingOrder, setVerifyingOrder] = useState<Order | null>(null);
  const [managerPinInput, setManagerPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);
  
  // Support state
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [isSendingSupport, setIsSendingSupport] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);

  const isElite = settings.subscriptionPlan === 'elite';
  const isPro = settings.subscriptionPlan === 'pro';

  const tierColors = {
    elite: {
      sidebar: theme === 'dark' ? 'bg-[#0f172a] text-white' : 'bg-white border-r border-slate-200 text-slate-900 shadow-sm',
      navActive: 'bg-amber-500 text-slate-900 font-bold shadow-md',
      navInactive: theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
      accent: 'text-amber-500'
    },
    pro: {
      sidebar: theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white border-r border-slate-200 text-slate-900 shadow-sm',
      navActive: 'bg-blue-600 text-white font-bold shadow-md',
      navInactive: theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
      accent: 'text-blue-400'
    },
    basic: {
      sidebar: theme === 'dark' ? 'bg-[#1c1c1c] text-white' : 'bg-white border-r border-slate-200 text-slate-900 shadow-sm',
      navActive: 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20',
      navInactive: theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
      accent: 'text-blue-600'
    }
  };

  const currentTierStyle = tierColors[settings.subscriptionPlan || 'basic'];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'tiktok': return <Music className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleExportToExcel = () => {
    const filteredOrders = orders.filter(o => {
      const d = new Date(o.timestamp);
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });

    const headers = [
      'Order ID',
      'Date & Time',
      'Customer Name',
      'Phone',
      'Table Number',
      'Items Ordered',
      'Total Amount (BDT)',
      'Status',
      'Payment Method',
      'Payment Status',
      'Transaction ID'
    ];

    const rows = filteredOrders.map(o => {
      const dateTime = new Date(o.timestamp).toLocaleString();
      const customerName = o.customerName || 'N/A';
      const customerPhone = o.customerPhone || 'N/A';
      const itemsString = o.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(' | ');
      
      return [
        o.id,
        dateTime,
        customerName,
        customerPhone,
        `Table ${o.tableNumber}`,
        itemsString,
        o.total,
        o.status,
        o.paymentMethod || 'Cash',
        o.paymentStatus || 'Pending',
        o.paymentTxnId || 'N/A'
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Order_Report_${monthNames[selectedMonth]}_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    if (order.status === 'Pending') onAcceptOrder(orderId);
    else if (order.status === 'Confirmed') onNextStatus(orderId);
    else if (order.status === 'Kitchen') onNextStatus(orderId);
    else if (order.status === 'Serving') onServeOrder(orderId);
  };

  const handleCancelOrder = (orderId: string) => {
    const reason = window.prompt('Enter cancellation reason:');
    if (reason) onCancelOrder(orderId, reason);
  };

  const handleAuthorizePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (managerPinInput === 'admin123' && verifyingOrder && onUpdatePaymentStatus) {
      onUpdatePaymentStatus(verifyingOrder.id, 'Paid');
      setVerifyingOrder(null);
      setManagerPinInput('');
    } else {
      setPinError('Invalid PIN');
    }
  };

  const now = Date.now();
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
  const currentOrdersPool = activeNavTab === 'recent' ? orders.filter(o => o.timestamp >= threeDaysAgo) : orders.filter(o => o.timestamp < threeDaysAgo);

  const filteredOrders = currentOrdersPool.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (o.customerName && o.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const daysInSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const dailyLedgerRows = Array.from({ length: daysInSelectedMonth }, (_, i) => {
    const day = i + 1;
    const dayOrders = orders.filter(o => {
      const d = new Date(o.timestamp);
      return d.getDate() === day && d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });
    return {
      dayNumber: day,
      formattedDate: `${day} ${monthNames[selectedMonth]} ${selectedYear}`,
      receivedCount: dayOrders.length,
      deliveredCount: dayOrders.filter(o => o.status === 'Completed').length,
      dailyRevenue: dayOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)
    };
  });

  const totalMonthlyRevenue = dailyLedgerRows.reduce((sum, r) => sum + r.dailyRevenue, 0);
  const totalMonthlyOrders = dailyLedgerRows.reduce((sum, r) => sum + r.receivedCount, 0);
  const totalMonthlyDelivered = dailyLedgerRows.reduce((sum, r) => sum + r.deliveredCount, 0);

  const handleSaveBrandSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateSettings({
        brandName: localBrandSettings.brandName,
        brandLocation: localBrandSettings.brandLocation,
        brandLogo: localBrandSettings.brandLogo,
        brandColors: localBrandSettings.brandColors,
        subscriptionPlan: localBrandSettings.subscriptionPlan as SubscriptionPlan,
        socialLinks: localBrandSettings.socialLinks,
        logoStyle: localBrandSettings.logoStyle,
        logoColorPrimary: localBrandSettings.logoColorPrimary,
        logoColorSecondary: localBrandSettings.logoColorSecondary,
        contactPhone: localBrandSettings.contactPhone,
        contactWhatsapp: localBrandSettings.contactWhatsapp,
        contactEmail: localBrandSettings.contactEmail,
        heroImages: localBrandSettings.heroImages,
        heroSlides: localBrandSettings.heroSlides,
        showGoogleMap: localBrandSettings.showGoogleMap,
        showChefSection: localBrandSettings.showChefSection,
        themeShowChefSection: localBrandSettings.themeShowChefSection,
        aboutUsTitle: localBrandSettings.aboutUsTitle,
        aboutUsSubtitle: localBrandSettings.aboutUsSubtitle,
        aboutUsText: localBrandSettings.aboutUsText,
        aboutUsImage: localBrandSettings.aboutUsImage,
        chefProfiles: localBrandSettings.chefProfiles,
        chefProfile: localBrandSettings.chefProfiles?.[selectedChefIndex] || localBrandSettings.chefProfiles?.[0] || localBrandSettings.chefProfile,
        lunavereFooterSubtitle: localBrandSettings.lunavereFooterSubtitle,
        lunavereFooterDesc: localBrandSettings.lunavereFooterDesc,
        lunavereReservationTitle: localBrandSettings.lunavereReservationTitle,
        lunavereReservationDesc: localBrandSettings.lunavereReservationDesc,
        lunavereReserveBtnText: localBrandSettings.lunavereReserveBtnText,
        lunavereQrBtnText: localBrandSettings.lunavereQrBtnText,
        menuSectionTagline: localBrandSettings.menuSectionTagline,
        menuSectionTitle: localBrandSettings.menuSectionTitle,
        menuSectionSubtitle: localBrandSettings.menuSectionSubtitle
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleSendSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    
    setIsSendingSupport(true);
    try {
      await addDoc(collection(db, "support_requests"), {
        restaurantId,
        restaurantName: settings.brandName,
        subject: supportSubject || "General Support",
        message: supportMessage,
        status: 'open',
        timestamp: Date.now(),
        createdAt: serverTimestamp()
      });
      setSupportSubject('');
      setSupportMessage('');
      setSupportSuccess(true);
      setTimeout(() => setSupportSuccess(false), 5000);
    } catch (error) {
      console.error("Support Error:", error);
    } finally {
      setIsSendingSupport(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f0f0f] text-slate-100' : 'bg-white text-slate-900'} no-print font-sans`}>
      <div className="flex h-screen overflow-hidden">
        {showSidebar && (
          <aside className={`w-72 flex-shrink-0 ${(isFullScreenPage || activeNavTab === 'menu_studio' || (activeNavTab === 'settings' && settingsCategoryTab !== 'list')) ? 'hidden' : 'flex'} flex-col border-r transition-all duration-300 ${isElite || isPro ? 'border-white/5' : theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} ${currentTierStyle.sidebar} h-full overflow-y-auto`}>
            {/* Premium Header Profile Block at the top */}
            <div className={`p-6 border-b ${isElite || isPro ? 'border-white/5' : theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} flex flex-col items-center text-center relative overflow-hidden group/profileCard`}>
              {/* Hidden input to pick image from files/gallery */}
              <input 
                type="file" 
                ref={avatarFileInputRef} 
                accept="image/*" 
                onChange={handleAvatarFileUpload} 
                style={{ display: 'none' }}
                aria-hidden="true"
                tabIndex={-1}
              />

              {/* Interactive Avatar - clicking it opens the zoom modal to upload/delete photo */}
              <div className="relative z-10 mb-3 cursor-pointer select-none">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAvatarZoomed(true)}
                  className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg overflow-hidden active:scale-95 transition-transform relative border-0 outline-none ring-0"
                  title={lang === 'bn' ? 'ছবি বড় করে দেখতে ও পরিবর্তন করতে ক্লিক করুন' : 'Click to view and change picture'}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-white/20 relative">
                    <img 
                      src={currentAvatarSrc} 
                      alt="User Profile" 
                      className="w-full h-full object-cover select-none" 
                    />
                  </div>
                </motion.div>
                
                {/* Pulsing online status indicator at the bottom-right */}
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
              </div>

              <div className="relative z-10 space-y-1 w-full overflow-hidden">
                <h4 className="font-black text-sm text-inherit leading-tight tracking-tight truncate max-w-full px-1">
                  {user?.displayName || "Mdasrafalli Alom"}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono tracking-normal truncate max-w-full px-1 leading-none">
                  {user?.email || "mdasrafallialom@gmail.com"}
                </p>
                
                {avatarSuccessMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 py-0.5 px-2 rounded-md mt-1 inline-block"
                  >
                    {avatarSuccessMsg}
                  </motion.div>
                )}

                {/* Elegant Admin Badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-wider">
                    <Crown className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{lang === 'bn' ? 'রেস্টুরেন্ট ওনার' : 'Owner'}</span>
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {[
                { id: 'recent', label: 'Active Dashboard', icon: LayoutDashboard },
                { id: 'history', label: 'Order History', icon: History },
                { id: 'categories', label: 'Categories', icon: ListTree },
                { id: 'menu_studio', label: 'Menu Card Studio', icon: Palette },
                { id: 'qrcodes', label: 'QR & Menu Binding', icon: QrCode },
                { id: 'financial', label: 'Financial Control', icon: BarChart3 },
                { id: 'analytics', label: 'AI Analytics', icon: TrendingUp },
                { id: 'theme_store', label: 'Theme Store', icon: ShoppingBag },
                { id: 'support', label: 'Get Support', icon: MessageSquare },
                { id: 'settings', label: 'System Settings', icon: Settings }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveNavTab(item.id as any);
                    if (item.id === 'settings') {
                      setSettingsCategoryTab('brand');
                    }
                    setIsFullScreenPage(false);
                    window.dispatchEvent(new CustomEvent('admin-tab-change', { detail: { label: item.label.toUpperCase() } }));
                  }}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                    activeNavTab === item.id 
                      ? theme === 'dark' 
                        ? 'bg-slate-800 text-white font-bold shadow-sm' 
                        : 'bg-[#f0f4f9] text-[#1e293b] font-bold shadow-none'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-white/5 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <item.icon className={`w-[18px] h-[18px] shrink-0 ${
                    activeNavTab === item.id 
                      ? theme === 'dark' ? 'text-white' : 'text-[#1e293b]' 
                      : theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`} />
                  <span className="text-[14px] tracking-tight">{item.label}</span>
                </motion.button>
              ))}
            </nav>

             {/* Sidebar Footer with Logout */}
            <div className={`p-4 border-t ${isElite || isPro ? 'border-white/5' : theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all text-xs font-bold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লগআউট' : lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
              </button>
            </div>
          </aside>
        )}

        <main className={`flex-1 overflow-y-auto w-full ${activeNavTab === 'analytics' || activeNavTab === 'qrcodes' ? 'bg-white text-slate-900' : theme === 'dark' ? 'bg-[#0f0f0f] text-slate-100' : 'bg-white text-slate-900'} px-4 sm:px-6 lg:px-8 py-4 pb-16`}>
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNavTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {activeNavTab === 'recent' && (
                  <div className="space-y-12">
                    <header className="space-y-2">
                      <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Active Orders</h1>
                      <p className="text-slate-500 font-medium text-sm">Real-time fulfillment tracking.</p>
                    </header>
                    <div className="flex gap-2">
                      {['all', 'Pending', 'Confirmed', 'Completed'].map(s => (
                        <button key={s} onClick={() => setFilterStatus(s as any)} className={`px-4 py-2 rounded-xl text-xs font-bold ${filterStatus === s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence mode="popLayout">
                        {filteredOrders.map((o, idx) => (
                          <motion.div
                            key={o.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -15 }}
                            transition={{ duration: 0.2, delay: idx * 0.02 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ActiveOrderCard 
                              order={o} 
                              onAccept={onAcceptOrder}
                              onNextStatus={onNextStatus}
                              onServe={onServeOrder}
                              onCancel={onCancelOrder}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

            {activeNavTab === 'history' && (
               <div className="space-y-12">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Order Logs</h1>
                    <p className="text-slate-500 font-medium text-sm">Historical archive of transactions.</p>
                  </div>
                  <button
                    onClick={() => {
                      const headers = [
                        'Order ID',
                        'Date & Time',
                        'Customer Name',
                        'Phone',
                        'Table Number',
                        'Items Ordered',
                        'Total Amount (BDT)',
                        'Status',
                        'Payment Method',
                        'Payment Status',
                        'Transaction ID'
                      ];

                      const rows = orders.map(o => {
                        const dateTime = new Date(o.timestamp).toLocaleString();
                        const customerName = o.customerName || 'N/A';
                        const customerPhone = o.customerPhone || 'N/A';
                        const itemsString = o.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(' | ');
                        
                        return [
                          o.id,
                          dateTime,
                          customerName,
                          customerPhone,
                          `Table ${o.tableNumber}`,
                          itemsString,
                          o.total,
                          o.status,
                          o.paymentMethod || 'Cash',
                          o.paymentStatus || 'Pending',
                          o.paymentTxnId || 'N/A'
                        ];
                      });

                      const csvContent = [
                        headers.join(','),
                        ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
                      ].join('\n');

                      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', `Entire_Order_Logs_Report.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/20 active:scale-95 cursor-pointer self-start sm:self-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'এক্সেল ডাউনলোড করুন' : 'Export Entire History'}</span>
                  </button>
                </header>
                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'} overflow-hidden`}>
                  <table className="w-full text-left text-sm">
                    <thead className={`border-b ${theme === 'dark' ? 'bg-[#2d2d2d] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500'} font-black uppercase text-[10px] tracking-widest`}>
                      <tr>
                        <th className="py-4 px-6">ID</th>
                        <th className="py-4 px-6">Timestamp</th>
                        <th className="py-4 px-6">Customer</th>
                        <th className="py-4 px-6 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-100'}`}>
                      {orders.slice().reverse().map(o => (
                        <tr key={o.id}>
                          <td className="py-4 px-6 font-mono font-bold text-blue-500">#{o.id.slice(-6).toUpperCase()}</td>
                          <td className="py-4 px-6 text-slate-500">{new Date(o.timestamp).toLocaleString()}</td>
                          <td className="py-4 px-6 font-bold">{o.customerName}</td>
                          <td className="py-4 px-6 text-right font-black">৳{o.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeNavTab === 'financial' && (
              <div className="space-y-8 animate-fade-in">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Financial Control</h1>
                    <p className="text-slate-500 font-medium text-sm">Real-time revenue tracking and historical ledger.</p>
                  </div>
                  {/* Month & Year Selectors */}
                  <div className="flex gap-2">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="text-xs font-bold bg-slate-100 dark:bg-slate-800 border-none outline-none rounded-xl px-3 py-2 cursor-pointer transition-all hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      {monthNames.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="text-xs font-bold bg-slate-100 dark:bg-slate-800 border-none outline-none rounded-xl px-3 py-2 cursor-pointer transition-all hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      {[2023, 2024, 2025, 2026, 2027].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleExportToExcel}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/20 active:scale-95 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'এক্সেল ডাউনলোড' : 'Excel Export'}</span>
                    </button>
                  </div>
                </header>

                {/* Complete Interactive Dashboard Container */}
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 dark:border-white/5 shadow-2xl bg-[#0b0f19] text-white p-6 md:p-8 space-y-6">
                  {/* Top Header of the inner dashboard */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                        RESTAURANT FINANCIAL CONTROL | <span className="text-yellow-400">{settings.brandName || 'THE GOLDEN FORK'}</span>
                      </span>
                    </div>
                    {/* Time & User Photo */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-400 font-mono">
                        {liveClock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} | {liveClock.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' })}
                      </span>
                      <img 
                        src={currentAvatarSrc} 
                        alt="User Profile" 
                        className="w-8 h-8 rounded-full border-2 border-cyan-500/30 object-cover shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                        onClick={() => setIsAvatarZoomed(true)}
                        title={lang === 'bn' ? 'ছবি পরিবর্তন করতে ক্লিক করুন' : 'Click to change photo'}
                      />
                    </div>
                  </div>

                  {/* Main Grid: Left Side Chart (2/3 width), Right Side Live Orders (1/3 width) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Revenue Spline Chart */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Revenue Overview</h3>
                          <p className="text-xs text-slate-500 font-medium">Daily income performance curve for {monthNames[selectedMonth]}</p>
                        </div>
                        {/* Selected Month Indicator */}
                        <span className="text-[10px] font-black uppercase bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-md">
                          Live Active Mode
                        </span>
                      </div>

                      {/* SVG Spline Plot Area */}
                      <div className="relative bg-slate-900/40 border border-white/5 rounded-2xl p-4 min-h-[250px] flex items-center justify-center">
                        {/* Define SVG dimensions */}
                        {(() => {
                          const svgWidth = 720;
                          const svgHeight = 250;
                          const padL = 50;
                          const padR = 20;
                          const padT = 20;
                          const padB = 35;

                          const revenues = dailyLedgerRows.map(r => r.dailyRevenue);
                          const maxDailyRev = Math.max(...revenues, 5000);
                          const yMaxValue = maxDailyRev * 1.15; // 15% head space

                          const points = dailyLedgerRows.map((r, i) => {
                            const x = padL + (i / (dailyLedgerRows.length - 1)) * (svgWidth - padL - padR);
                            const y = svgHeight - padB - (r.dailyRevenue / yMaxValue) * (svgHeight - padT - padB);
                            return { x, y, day: r.dayNumber, revenue: r.dailyRevenue, formattedDate: r.formattedDate };
                          });

                          let splinePath = '';
                          if (points.length > 0) {
                            splinePath = `M ${points[0].x} ${points[0].y}`;
                            for (let i = 0; i < points.length - 1; i++) {
                              const p0 = points[i];
                              const p1 = points[i + 1];
                              const cpX1 = p0.x + (p1.x - p0.x) / 2;
                              const cpY1 = p0.y;
                              const cpX2 = p0.x + (p1.x - p0.x) / 2;
                              const cpY2 = p1.y;
                              splinePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
                            }
                          }

                          const fillPath = points.length > 0
                            ? `${splinePath} L ${points[points.length - 1].x} ${svgHeight - padB} L ${points[0].x} ${svgHeight - padB} Z`
                            : '';

                          const yGridLines = Array.from({ length: 5 }, (_, idx) => {
                            const val = (yMaxValue / 4) * idx;
                            const y = svgHeight - padB - (val / yMaxValue) * (svgHeight - padT - padB);
                            return { val, y };
                          });

                          const xTicks = points.filter((_, idx) => idx === 0 || idx === 4 || idx === 9 || idx === 14 || idx === 19 || idx === 24 || idx === points.length - 1);

                          return (
                            <>
                              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                                <defs>
                                  {/* Golden gradient fill under curve */}
                                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                                  </linearGradient>
                                  {/* Filter for subtle golden glow around the stroke */}
                                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                  </filter>
                                </defs>

                                {/* Y-axis gridlines and labels */}
                                {yGridLines.map((line, idx) => (
                                  <g key={idx} className="opacity-40">
                                    <line 
                                      x1={padL} 
                                      y1={line.y} 
                                      x2={svgWidth - padR} 
                                      y2={line.y} 
                                      stroke="#ffffff" 
                                      strokeWidth="0.5" 
                                      strokeDasharray="3,3"
                                    />
                                    <text 
                                      x={padL - 10} 
                                      y={line.y + 4} 
                                      fill="#94a3b8" 
                                      fontSize="9" 
                                      fontWeight="bold"
                                      textAnchor="end"
                                      className="font-mono"
                                    >
                                      ৳{line.val >= 1000 ? `${(line.val / 1000).toFixed(1)}K` : line.val.toFixed(0)}
                                    </text>
                                  </g>
                                ))}

                                {/* Area Under Curve */}
                                {fillPath && (
                                  <path d={fillPath} fill="url(#goldGradient)" />
                                )}

                                {/* Smooth Spline Curve Line */}
                                {splinePath && (
                                  <path 
                                    d={splinePath} 
                                    fill="none" 
                                    stroke="#f59e0b" 
                                    strokeWidth="2.5" 
                                    filter="url(#goldGlow)"
                                    strokeLinecap="round"
                                  />
                                )}

                                {/* X-axis ticks (Days labels) */}
                                {xTicks.map((pt, idx) => (
                                  <g key={idx} className="opacity-50">
                                    <text 
                                      x={pt.x} 
                                      y={svgHeight - 12} 
                                      fill="#94a3b8" 
                                      fontSize="9" 
                                      fontWeight="bold"
                                      textAnchor="middle"
                                      className="font-mono"
                                    >
                                      {pt.day}
                                    </text>
                                  </g>
                                ))}

                                {/* Interactive dashed guideline for hovered point */}
                                {hoveredPointIndex !== null && points[hoveredPointIndex] && (
                                  <g>
                                    <line 
                                      x1={points[hoveredPointIndex].x} 
                                      y1={padT} 
                                      x2={points[hoveredPointIndex].x} 
                                      y2={svgHeight - padB} 
                                      stroke="#f59e0b" 
                                      strokeWidth="1" 
                                      strokeDasharray="4,4"
                                      className="opacity-70 animate-pulse"
                                    />
                                    <circle 
                                      cx={points[hoveredPointIndex].x} 
                                      cy={points[hoveredPointIndex].y} 
                                      r="6" 
                                      fill="#fbbf24" 
                                      stroke="#ffffff" 
                                      strokeWidth="2" 
                                      className="shadow-xl"
                                    />
                                  </g>
                                )}

                                {/* Hover Triggers */}
                                {points.map((p, idx) => (
                                  <rect
                                    key={idx}
                                    x={p.x - (svgWidth - padL - padR) / (points.length * 2)}
                                    y={0}
                                    width={(svgWidth - padL - padR) / points.length}
                                    height={svgHeight - padB}
                                    fill="transparent"
                                    className="cursor-pointer"
                                    onMouseEnter={() => setHoveredPointIndex(idx)}
                                    onMouseLeave={() => setHoveredPointIndex(null)}
                                  />
                                ))}
                              </svg>

                              {/* Hover Tooltip Overlay */}
                              {hoveredPointIndex !== null && points[hoveredPointIndex] && (
                                <div className="absolute top-4 right-4 bg-slate-900/90 border border-yellow-400/20 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl animate-fade-in text-left">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                    {points[hoveredPointIndex].formattedDate}
                                  </span>
                                  <p className="text-sm font-black text-yellow-400 mt-0.5">
                                    ৳{points[hoveredPointIndex].revenue.toLocaleString()}
                                  </p>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                      {/* X-Axis Legend */}
                      <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        {monthNames[selectedMonth]} Days
                      </p>
                    </div>

                    {/* Right Column: Live Orders List */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Live Orders</h3>
                          <p className="text-xs text-slate-500 font-medium">Real-time stream of incoming orders</p>
                        </div>
                        <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md animate-pulse">
                          Live
                        </span>
                      </div>

                      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 h-[250px] overflow-y-auto space-y-3 custom-scrollbar">
                        {(() => {
                          const demoLiveOrders = [
                            { id: '1024', status: 'Preparing', time: '10m 4s', total: 4900, items: 'Chicken Burger x2' },
                            { id: '1025', status: 'Ready', time: '10m 1s', total: 3950, items: 'Truffle Pizza x3' },
                            { id: '1026', status: 'Cooking', time: '10m 4s', total: 1600, items: 'Pasta Alfredo x1' },
                            { id: '1027', status: 'Ready', time: '1h 5m', total: 4900, items: 'Caesar Salad x2' },
                            { id: '1028', status: 'Ready', time: '1h 2m', total: 3300, items: 'Grilled Salmon x2' }
                          ];

                          const activeLiveOrdersToShow = orders.length > 0
                            ? orders.slice().reverse().slice(0, 6).map(o => {
                                const elapsedMs = Date.now() - o.timestamp;
                                const mins = Math.floor(elapsedMs / 60000);
                                const secs = Math.floor((elapsedMs % 60000) / 1000);
                                const timeStr = mins > 60 
                                  ? `${Math.floor(mins/60)}h ${mins % 60}m` 
                                  : `${mins}m ${secs}s`;
                                  
                                let displayStatus: string = o.status;
                                if (o.status === 'Pending') displayStatus = 'Pending';
                                else if (o.status === 'Confirmed') displayStatus = 'Cooking';
                                else if (o.status === 'Kitchen') displayStatus = 'Preparing';
                                else if (o.status === 'Serving') displayStatus = 'Ready';
                                else if (o.status === 'Completed') displayStatus = 'Served';

                                return {
                                  id: o.id.slice(-4).toUpperCase(),
                                  status: displayStatus,
                                  time: timeStr,
                                  total: o.total,
                                  items: o.items?.map(it => `${it.menuItem?.name || 'Item'} x${it.quantity || 1}`).join(', ') || 'Menu Item'
                                };
                              })
                            : demoLiveOrders;

                          return (
                            <>
                              {activeLiveOrdersToShow.map((ord, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2.5 last:border-b-0 last:pb-0">
                                  <div className="space-y-0.5 text-left">
                                    <p className="text-xs font-bold text-slate-200">
                                      Order <span className="font-mono text-yellow-400">#{ord.id}</span>
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-medium truncate max-w-[140px]" title={ord.items}>
                                      {ord.items}
                                    </p>
                                  </div>
                                  <div className="text-right flex items-center gap-3">
                                    <div className="space-y-0.5">
                                      <span className={`inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                        ord.status === 'Ready' || ord.status === 'Served'
                                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                          : ord.status === 'Cooking' || ord.status === 'Preparing'
                                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                      }`}>
                                        {ord.status}
                                      </span>
                                      <p className="text-[9px] text-slate-500 font-medium font-mono">{ord.time}</p>
                                    </div>
                                    <p className="text-xs font-black text-slate-200 min-w-[50px] text-right">
                                      ৳{ord.total.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats Grid: Live Glassmorphic Stat Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between text-left">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Monthly Revenue</span>
                      <p className="text-3xl font-black mt-2 text-yellow-400">৳{totalMonthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between text-left">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Order Volume</span>
                      <p className="text-3xl font-black mt-2 text-white">{totalMonthlyOrders}</p>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between text-left">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Fulfillment Rate</span>
                      <p className="text-3xl font-black mt-2 text-cyan-400">
                        {totalMonthlyOrders > 0 ? Math.round((totalMonthlyDelivered / totalMonthlyOrders) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Ledger Table & Stats Grid */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Historical Ledger Records</h2>
                    <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                      Live Database Sync
                    </span>
                  </div>

                  <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'} overflow-hidden shadow-sm`}>
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-inherit font-black uppercase text-[10px] text-slate-500 bg-slate-50/50 dark:bg-white/5">
                        <tr>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Orders Count</th>
                          <th className="py-4 px-6 text-right">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-inherit">
                        {dailyLedgerRows.map(r => (
                          <tr key={r.dayNumber} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                            <td className="py-4 px-6 font-bold">{r.formattedDate}</td>
                            <td className="py-4 px-6">{r.receivedCount}</td>
                            <td className="py-4 px-6 text-right font-black text-blue-600 dark:text-blue-400">৳{r.dailyRevenue.toLocaleString()}</td>
                          </tr>
                        ))}
                        {dailyLedgerRows.length === 0 && (
                          <tr>
                            <td colSpan={3} className="py-8 text-center text-slate-500 font-bold">No ledger rows found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeNavTab === 'analytics' && (
              <div className="space-y-6 animate-fade-in bg-white text-slate-900 rounded-2xl">
                <AIAnalyticsDashboard
                  theme="light"
                  brandName={settings.brandName || "My Restaurant"}
                  onOpenSales={() => setActiveNavTab('financial')}
                  orders={orders}
                />
              </div>
            )}

            {activeNavTab === 'pipelines' && (
              <div className="h-full flex flex-col items-center justify-center py-32 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                  <span className="text-[25vw] font-black leading-none tracking-tighter uppercase whitespace-nowrap">
                    {settings.brandName || "LA"}
                  </span>
                </div>
                <div className="relative z-10 flex flex-col items-center opacity-[0.05] select-none pointer-events-none text-center">
                  <span className="text-[12rem] font-black leading-none tracking-tighter">
                    {settings.brandName?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || "LA"}
                  </span>
                  <span className="text-4xl font-black uppercase tracking-[0.8em] mt-[-1.5rem] whitespace-nowrap">
                    {settings.brandName}
                  </span>
                </div>
                <div className="mt-16 text-center space-y-4 opacity-30 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest">Kitchen Pipeline</h3>
                  <p className="text-sm font-bold text-slate-500 max-w-sm mx-auto">Synchronizing real-time order flow across all active preparation stations for maximum efficiency.</p>
                </div>
              </div>
            )}

            {activeNavTab === 'menu_studio' && (
              <MenuCardStudio 
                restaurantId={restaurantId} 
                settings={settings} 
                theme={theme} 
                lang={lang}
                onUpdateSettings={onUpdateSettings}
                onExitToDashboard={() => setActiveNavTab('recent')}
              />
            )}

            {activeNavTab === 'qrcodes' && (
              <div className="space-y-6 animate-fade-in bg-white text-slate-900 rounded-2xl">
                <QrCodeManager restaurantId={restaurantId} brandName={settings.brandName || "My Restaurant"} />
              </div>
            )}

            {activeNavTab === 'domains' && (
              <div className="max-w-5xl mx-auto">
                <DomainsManager
                  restaurantId={restaurantId}
                  brandName={settings.brandName || ''}
                  settings={settings}
                  onUpdateSettings={onUpdateSettings}
                  theme={theme}
                  lang={lang}
                />
              </div>
            )}

            {activeNavTab === 'theme_store' && (
              <ThemeStoreManager
                restaurantId={restaurantId}
                brandName={settings.brandName || ''}
                settings={settings}
                onUpdateSettings={onUpdateSettings}
                onOpenStudio={() => setActiveNavTab('recent')}
                theme={theme}
                lang={lang}
              />
            )}

            {activeNavTab === 'categories' && (
              <CategoryManager 
                restaurantId={restaurantId} 
                theme={theme}
              />
            )}

            {activeNavTab === 'menu' && (
              <MenuBuilder 
                restaurantId={restaurantId} 
                theme={theme}
              />
            )}

            {activeNavTab === 'waiter' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'bn' ? 'ওয়েটার অনুরোধ' : 'Waiter Requests'}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">Active assistance requests from tables.</p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                    {waiterRequests ? waiterRequests.length : 0} Pending
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {!waiterRequests || waiterRequests.length === 0 ? (
                    <div className={`col-span-full py-20 text-center rounded-[2rem] border-2 border-dashed ${theme === 'dark' ? 'bg-[#1c1c1c] border-[#2d2d2d]' : 'bg-white border-slate-200'}`}>
                      <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-bold">No active waiter requests.</p>
                    </div>
                  ) : (
                    waiterRequests.map((req) => {
                      const isConfirmed = req.status === 'confirmed';
                      return (
                        <motion.div
                          key={req.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800 text-white' : 'bg-white border-slate-200'} shadow-sm flex flex-col justify-between`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl">
                                {req.tableNumber}
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                {isConfirmed ? (
                                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider">
                                    Confirmed
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider animate-pulse">
                                    Pending
                                  </span>
                                )}
                                <span className="text-[10px] font-mono text-slate-400">
                                  {new Date(req.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1 mb-6">
                              <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>Table {req.tableNumber} is requesting assistance</p>
                              <p className="text-xs text-slate-500">
                                {isConfirmed ? 'Waiter is on the way' : 'Requested a few moments ago'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {!isConfirmed ? (
                              <>
                                <button
                                  onClick={() => onResolveWaiter && onResolveWaiter(req.id, 'confirm')}
                                  className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-100 dark:shadow-none active:scale-95"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => onResolveWaiter && onResolveWaiter(req.id, 'resolve')}
                                  className={`px-4 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-rose-950/30 hover:text-rose-400' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600'}`}
                                >
                                  Dismiss
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => onResolveWaiter && onResolveWaiter(req.id, 'resolve')}
                                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95 flex items-center justify-center gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Mark Handled (Next)
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeNavTab === 'support' && (
              <div className="space-y-12">
                <header className="space-y-2">
                  <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Platform Support</h1>
                  <p className="text-slate-500 font-medium text-sm">Need help? Send a message to the master administrator.</p>
                </header>

                <div className={`max-w-2xl rounded-3xl border p-10 ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
                  {supportSuccess ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">Request Sent!</h3>
                      <p className="text-slate-500 font-medium">The master admin has been notified. We will get back to you soon.</p>
                      <button 
                        onClick={() => setSupportSuccess(false)}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendSupport} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</label>
                        <input 
                          type="text"
                          value={supportSubject}
                          onChange={e => setSupportSubject(e.target.value)}
                          placeholder="e.g. Menu Builder Issue"
                          className={`w-full px-5 py-4 rounded-2xl outline-none font-bold ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-700'} border focus:border-blue-500 transition-all`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                        <textarea 
                          required
                          value={supportMessage}
                          onChange={e => setSupportMessage(e.target.value)}
                          rows={6}
                          placeholder="Describe your problem or request in detail..."
                          className={`w-full px-5 py-4 rounded-2xl outline-none font-bold ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-700'} border focus:border-blue-500 transition-all resize-none`}
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isSendingSupport}
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                      >
                        {isSendingSupport ? <RefreshCw className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
                        Submit Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {activeNavTab === 'settings' && (
              <div className="space-y-8">
                {/* Header Banner */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {lang === 'bn' ? 'সিস্টেম কন্ট্রোল সেন্টার' : 'System Control Hub'}
                      </span>
                    </div>
                    <h1 className={`text-3xl md:text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'bn' ? 'সেটিংস সেন্টার' : 'System Settings Hub'}
                    </h1>
                    <p className="text-slate-500 font-medium text-xs md:text-sm mt-1">
                      {lang === 'bn' 
                        ? 'রেস্টুরেন্টের নাম, ফোন, লোগো, পাসওয়ার্ড, থিম, গুগল ম্যাপস ও ক্যাটাগরি অনুযায়ী সেটিংস।' 
                        : 'Manage restaurant identity, contacts, security access, maps, chef profiles & updates.'}
                    </p>
                  </div>

                  {/* Top Action Save Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button 
                      type="button"
                      onClick={handleSaveBrandSettings} 
                      disabled={isSaving}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? (lang === 'bn' ? 'সংরক্ষিত হচ্ছে...' : 'Saving...') : (lang === 'bn' ? 'সকল সেটিংস সেভ করুন' : 'Save All Settings')}</span>
                    </button>
                  </div>
                </header>

                {/* Two-Column Split Layout for Settings */}
                <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
                  
                  {/* Left Column: Settings Navigation Sidebar */}
                  <div className="w-full lg:w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 pr-0 lg:pr-8 space-y-6 pb-6 lg:pb-0">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                        {lang === 'bn' ? 'সেটিংস নেভিগেশন' : 'Settings Navigation'}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-mono">
                        {lang === 'bn' ? '৭টি সেকশন' : '7 Sections'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {[
                        { id: 'brand', label: lang === 'bn' ? 'ব্র্যান্ড ও ফোন' : 'Brand & Contact', icon: Utensils },
                        { id: 'security', label: lang === 'bn' ? 'সিকিউরিটি ও পিন' : 'Security & PIN', icon: Lock },
                        { id: 'features', label: lang === 'bn' ? 'থিম ও ম্যাপস' : 'Theme & Maps', icon: Globe },
                        { id: 'chef', label: lang === 'bn' ? 'শেফ গ্যালারি' : 'Chef Showcase', icon: ChefHat },
                        { id: 'social', label: lang === 'bn' ? 'সোশ্যাল ও ব্যানার' : 'Social & Banners', icon: Sparkles },
                        { id: 'deploy', label: lang === 'bn' ? 'সিস্টেম আপডেট' : 'System Update', icon: Zap },
                        { id: 'domains', label: lang === 'bn' ? 'ডোমেইন ও কাস্টম লিংক' : 'Domains & Custom URL', icon: Globe }
                      ].map(item => {
                        const Icon = item.icon;
                        const isSelected = settingsCategoryTab === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => openSettingsCategory(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all text-left cursor-pointer ${
                              isSelected
                                ? theme === 'dark' 
                                  ? 'bg-slate-800 text-white font-black shadow-sm' 
                                  : 'bg-slate-100 text-slate-900 font-black shadow-none'
                                : theme === 'dark'
                                  ? 'text-slate-400 hover:text-white hover:bg-white/5 font-semibold'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold'
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${
                              isSelected 
                                ? theme === 'dark' ? 'text-white' : 'text-slate-900' 
                                : 'text-slate-500'
                            }`} />
                            <span className="text-sm tracking-tight">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Settings Content Form */}
                  <div className="flex-1 w-full space-y-8">

                {/* 1. BRAND, IDENTITY, CONTACT & MENU TAGLINES CARD */}
                {isSectionVisible('brand', ['brand', 'identity', 'name', 'নাম', 'রেস্টুরেন্ট', 'logo', 'লোগো', 'phone', 'ফোন', 'whatsapp', 'হোয়াটসঅ্যাপ', 'email', 'ইমেইল', 'color', 'কালার', 'menu', 'মেনু', 'tagline', 'title']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    {/* Header bar */}
                    <div className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent">
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0">
                          <Utensils className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'রেস্টুরেন্ট ব্র্যান্ড, লোগো ও যোগাযোগ' : 'Restaurant Brand, Logo & Contact'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                              {localBrandSettings.brandName || 'My Restaurant'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'রেস্টুরেন্টের নাম, লোগো গ্যালারি, কন্টাক্ট নম্বর, হোয়াটসঅ্যাপ, সাপোর্ট ইমেইল ও থিম কালার।' : 'Restaurant name, custom logo gallery, phone, WhatsApp, email & theme colors.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-8">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-black flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span>{lang === 'bn' ? 'ব্র্যান্ড আইডেন্টিটি এডিটর' : 'Brand Identity Editor'}</span>
                          </h3>
                          <button onClick={handleSaveBrandSettings} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer">
                            {isSaving ? (lang === 'bn' ? 'সেভ হচ্ছে...' : 'Saving...') : (lang === 'bn' ? 'পরিবর্তন সেভ করুন' : 'Save Changes')}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column: Name & Logo Preview */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Restaurant Name</label>
                          <input 
                            type="text" 
                            value={localBrandSettings.brandName} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, brandName: e.target.value }))}
                            onKeyDown={handleKeyDownSave}
                            className={`w-full px-5 py-3 rounded-xl outline-none font-bold ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-700'} border focus:border-blue-500 transition-colors`}
                          />
                        </div>

                        {/* Restaurant Logo Gallery (Clickable Card directly under Restaurant Name) */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {lang === 'bn' ? 'রেস্টুরেন্ট লোগো গ্যালারি' : 'Restaurant Logo Gallery'}
                          </label>

                          <div 
                            onClick={() => setIsLogoGalleryOpen(true)}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group cursor-pointer ${
                              theme === 'dark' 
                                ? 'bg-[#252525] border-slate-800 hover:border-cyan-500/50 hover:bg-[#2d2d2d]' 
                                : 'bg-slate-50 border-slate-200 hover:border-cyan-500/50 hover:bg-slate-100/70'
                            } shadow-sm hover:shadow-md`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="shrink-0 relative">
                                {renderMonogramLogo(localBrandSettings.brandName || 'AR', theme === 'light', 'md')}
                              </div>
                              <div className="space-y-1">
                                <h4 className={`text-sm font-black flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-800'} group-hover:text-cyan-500 transition-colors`}>
                                  <span>{lang === 'bn' ? 'রেস্টুরেন্ট লোগো গ্যালারি' : 'Restaurant Logo Gallery'}</span>
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                                </h4>
                                <p className="text-[11px] text-slate-500 font-bold group-hover:text-cyan-600 transition-colors">
                                  {lang === 'bn' ? 'ক্লিক করে লোগো গ্যালারি, মনোগ্রাম স্টাইল ও কাস্টম কালার পরিবর্তন করুন' : 'Click to Open Logo Gallery & Custom Colors'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Communication Channels */}
                      <div className="space-y-6">
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#252525] border-slate-800' : 'bg-slate-50 border-slate-100'} space-y-4`}>
                          <div className="border-b border-inherit pb-2">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            {lang === 'bn' ? 'যোগাযোগ ও সাপোর্ট ডিটেইলস' : 'Communication & Support Channels'}
                          </h4>
                        </div>

                        {/* Country Code Prefix & Phone Line */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                            {lang === 'bn' ? 'অফিসিয়াল ফোন নম্বর' : 'Official Phone Line'}
                          </label>
                          <div className="flex gap-2">
                            {/* Custom Flags Dropdown Select */}
                            <div className="relative shrink-0" ref={phonePrefixRef}>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsPhonePrefixOpen(!isPhonePrefixOpen);
                                  setPhoneSearchQuery('');
                                }}
                                className={`px-3 py-2.5 rounded-lg outline-none font-bold text-xs flex items-center gap-2 ${
                                  theme === 'dark' ? 'bg-[#2d2d2d] text-white border-slate-700' : 'bg-white border-slate-300 text-black'
                                } border hover:border-blue-500 transition-all h-10 cursor-pointer shadow-sm`}
                              >
                                {(() => {
                                  const c = countriesWithCodes.find(item => item.prefix === selectedPhonePrefix) || { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', prefix: '+880' };
                                  return (
                                    <>
                                      <CountryFlagBadge code={c.code} name={c.name} flag={c.flag} className="w-5 h-3.5" />
                                      <span className={`font-mono font-black text-xs ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        {selectedPhonePrefix}
                                      </span>
                                    </>
                                  );
                                })()}
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 transition-transform shrink-0" />
                              </button>

                              {isPhonePrefixOpen && (() => {
                                const filteredCountries = countriesWithCodes.filter(c =>
                                  c.name.toLowerCase().includes(phoneSearchQuery.toLowerCase()) ||
                                  c.prefix.includes(phoneSearchQuery) ||
                                  c.code.toLowerCase().includes(phoneSearchQuery.toLowerCase())
                                );
                                return (
                                  <div className={`absolute left-0 mt-1 w-72 sm:w-80 rounded-xl shadow-2xl border z-[120] flex flex-col overflow-hidden ${
                                    theme === 'dark' ? 'bg-[#1e1e1e] border-slate-700 text-white' : 'bg-white border-slate-300 text-black'
                                  }`}>
                                    {/* Sticky Search bar */}
                                    <div className={`p-2.5 border-b ${theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-slate-50 border-slate-200'} shrink-0`}>
                                      <div className="relative">
                                        <input
                                          type="text"
                                          placeholder="Search country / dial code..."
                                          value={phoneSearchQuery}
                                          onChange={e => setPhoneSearchQuery(e.target.value)}
                                          className={`w-full px-2.5 py-1.5 pl-7 rounded-lg outline-none font-bold text-xs ${
                                            theme === 'dark' ? 'bg-[#2d2d2d] text-white border-slate-700' : 'bg-white border-slate-300 text-black placeholder-slate-400'
                                          } border focus:border-blue-500`}
                                          autoFocus
                                        />
                                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
                                      </div>
                                    </div>

                                    {/* Scrollable list */}
                                    <div className="max-h-64 overflow-y-auto py-1 divide-y divide-slate-100 dark:divide-slate-800/60">
                                      {filteredCountries.length > 0 ? (
                                        filteredCountries.map(c => {
                                          const isSelected = selectedPhonePrefix === c.prefix;
                                          return (
                                            <button
                                              key={c.code}
                                              type="button"
                                              onClick={() => {
                                                setSelectedPhonePrefix(c.prefix);
                                                setIsPhonePrefixOpen(false);
                                                setPhoneSearchQuery('');
                                              }}
                                              className={`w-full text-left px-3.5 py-2.5 text-xs font-bold transition-all group flex items-center gap-3 ${
                                                isSelected
                                                  ? (theme === 'dark' ? 'bg-blue-900/40 text-white' : 'bg-slate-100 text-black font-black')
                                                  : (theme === 'dark' ? 'text-slate-200 hover:bg-slate-800 hover:text-white' : 'text-black hover:bg-slate-100 hover:text-black')
                                              }`}
                                            >
                                              {/* 1. Flag on the front */}
                                              <CountryFlagBadge code={c.code} name={c.name} flag={c.flag} className="w-5 h-3.5" />
                                              
                                              {/* 2. Number / Dial Prefix directly next to the Flag - SOLID BLACK */}
                                              <span className={`font-mono font-black text-xs w-14 shrink-0 ${
                                                theme === 'dark' ? 'text-white' : 'text-black'
                                              }`}>
                                                {c.prefix}
                                              </span>

                                              {/* 3. Country Name behind the Number - SOLID BLACK */}
                                              <span className={`font-bold text-xs truncate flex-1 ${
                                                theme === 'dark' ? 'text-slate-100' : 'text-black'
                                              }`}>
                                                {c.name}
                                              </span>

                                              {/* 4. Checkmark if selected */}
                                              {isSelected && (
                                                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 ml-auto" />
                                              )}
                                            </button>
                                          );
                                        })
                                      ) : (
                                        <div className="px-4 py-4 text-xs text-slate-500 italic text-center">
                                          No country matched
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Local Phone Suffix Input */}
                            <input
                              type="text"
                              value={localPhoneSuffix}
                              onChange={e => setLocalPhoneSuffix(e.target.value)}
                              onKeyDown={handleKeyDownSave}
                              className={`flex-1 px-4 py-2.5 rounded-lg outline-none font-bold text-xs ${
                                theme === 'dark' ? 'bg-[#2d2d2d] text-white border-slate-700' : 'bg-white border-slate-300 text-black'
                              } border focus:border-blue-500 transition-colors h-10`}
                            />
                          </div>
                        </div>

                        {/* WhatsApp Number Line */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              <MessageCircle className="w-3 h-3 text-emerald-500" />
                              {lang === 'bn' ? 'অফিসিয়াল হোয়াটসঅ্যাপ নম্বর' : 'Official WhatsApp Number'}
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedWhatsappPrefix(selectedPhonePrefix);
                                setLocalWhatsappSuffix(localPhoneSuffix);
                              }}
                              className="text-[9px] font-bold text-emerald-600 hover:text-emerald-500 hover:underline cursor-pointer"
                            >
                              {lang === 'bn' ? 'ফোন নম্বর থেকে কপি করুন' : 'Same as Phone'}
                            </button>
                          </div>
                          <div className="flex gap-2">
                            {/* WhatsApp Flags Dropdown Select */}
                            <div className="relative shrink-0" ref={whatsappPrefixRef}>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsWhatsappPrefixOpen(!isWhatsappPrefixOpen);
                                  setWhatsappSearchQuery('');
                                }}
                                className={`px-3 py-2.5 rounded-lg outline-none font-bold text-xs flex items-center gap-2 ${
                                  theme === 'dark' ? 'bg-[#2d2d2d] text-white border-slate-700' : 'bg-white border-slate-300 text-black'
                                } border hover:border-emerald-500 transition-all h-10 cursor-pointer shadow-sm`}
                              >
                                {(() => {
                                  const c = countriesWithCodes.find(item => item.prefix === selectedWhatsappPrefix) || { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', prefix: '+880' };
                                  return (
                                    <>
                                      <CountryFlagBadge code={c.code} name={c.name} flag={c.flag} className="w-5 h-3.5" />
                                      <span className={`font-mono font-black text-xs ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        {selectedWhatsappPrefix}
                                      </span>
                                    </>
                                  );
                                })()}
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 transition-transform shrink-0" />
                              </button>

                              {isWhatsappPrefixOpen && (() => {
                                const filteredCountries = countriesWithCodes.filter(c =>
                                  c.name.toLowerCase().includes(whatsappSearchQuery.toLowerCase()) ||
                                  c.prefix.includes(whatsappSearchQuery) ||
                                  c.code.toLowerCase().includes(whatsappSearchQuery.toLowerCase())
                                );
                                return (
                                  <div className={`absolute left-0 mt-1 w-72 sm:w-80 rounded-xl shadow-2xl border z-[120] flex flex-col overflow-hidden ${
                                    theme === 'dark' ? 'bg-[#1e1e1e] border-slate-700 text-white' : 'bg-white border-slate-300 text-black'
                                  }`}>
                                    {/* Sticky Search bar */}
                                    <div className={`p-2.5 border-b ${theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-slate-50 border-slate-200'} shrink-0`}>
                                      <div className="relative">
                                        <input
                                          type="text"
                                          placeholder="Search country / dial code..."
                                          value={whatsappSearchQuery}
                                          onChange={e => setWhatsappSearchQuery(e.target.value)}
                                          className={`w-full px-2.5 py-1.5 pl-7 rounded-lg outline-none font-bold text-xs ${
                                            theme === 'dark' ? 'bg-[#2d2d2d] text-white border-slate-700' : 'bg-white border-slate-300 text-black placeholder-slate-400'
                                          } border focus:border-emerald-500`}
                                          autoFocus
                                        />
                                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
                                      </div>
                                    </div>

                                    {/* Scrollable list */}
                                    <div className="max-h-64 overflow-y-auto py-1 divide-y divide-slate-100 dark:divide-slate-800/60">
                                      {filteredCountries.length > 0 ? (
                                        filteredCountries.map(c => {
                                          const isSelected = selectedWhatsappPrefix === c.prefix;
                                          return (
                                            <button
                                              key={c.code}
                                              type="button"
                                              onClick={() => {
                                                setSelectedWhatsappPrefix(c.prefix);
                                                setIsWhatsappPrefixOpen(false);
                                                setWhatsappSearchQuery('');
                                              }}
                                              className={`w-full text-left px-3.5 py-2.5 text-xs font-bold transition-all group flex items-center gap-3 ${
                                                isSelected
                                                  ? (theme === 'dark' ? 'bg-emerald-900/40 text-white' : 'bg-slate-100 text-black font-black')
                                                  : (theme === 'dark' ? 'text-slate-200 hover:bg-slate-800 hover:text-white' : 'text-black hover:bg-slate-100 hover:text-black')
                                              }`}
                                            >
                                              {/* 1. Flag on the front */}
                                              <CountryFlagBadge code={c.code} name={c.name} flag={c.flag} className="w-5 h-3.5" />
                                              
                                              {/* 2. Number / Dial Prefix directly next to the Flag - SOLID BLACK */}
                                              <span className={`font-mono font-black text-xs w-14 shrink-0 ${
                                                theme === 'dark' ? 'text-white' : 'text-black'
                                              }`}>
                                                {c.prefix}
                                              </span>

                                              {/* 3. Country Name behind the Number - SOLID BLACK */}
                                              <span className={`font-bold text-xs truncate flex-1 ${
                                                theme === 'dark' ? 'text-slate-100' : 'text-black'
                                              }`}>
                                                {c.name}
                                              </span>

                                              {/* 4. Checkmark if selected */}
                                              {isSelected && (
                                                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-auto" />
                                              )}
                                            </button>
                                          );
                                        })
                                      ) : (
                                        <div className="px-4 py-4 text-xs text-slate-500 italic text-center">
                                          No country matched
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Local WhatsApp Suffix Input */}
                            <input
                              type="text"
                              value={localWhatsappSuffix}
                              onChange={e => setLocalWhatsappSuffix(e.target.value)}
                              onKeyDown={handleKeyDownSave}
                              className={`flex-1 px-4 py-2.5 rounded-lg outline-none font-bold text-xs ${
                                theme === 'dark' ? 'bg-[#2d2d2d] text-white border-slate-700' : 'bg-white border-slate-300 text-black'
                              } border focus:border-emerald-500 transition-colors h-10`}
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                            {lang === 'bn' ? 'অফিসিয়াল ইমেইল (জিমেইল)' : 'Official Support Email'}
                          </label>
                          <input
                            type="email"
                            value={localBrandSettings.contactEmail || ''}
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                            onKeyDown={handleKeyDownSave}
                            placeholder="asrafali.com@gmail.com"
                            className={`w-full px-4 py-2.5 rounded-lg outline-none font-bold text-xs ${
                              theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-white border-slate-200 text-slate-700'
                            } border focus:border-blue-500 transition-colors h-10`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Brand Colors & Social Media Links */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {lang === 'bn' ? 'ব্র্যান্ড থিম কালার' : 'Primary Brand Color'}
                        </label>
                        <div className="flex gap-4 items-center">
                          <input 
                            type="color" 
                            value={localBrandSettings.brandColors.primary} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, brandColors: { ...prev.brandColors, primary: e.target.value } }))}
                            className="h-11 w-16 rounded-xl cursor-pointer bg-transparent border-none shrink-0"
                          />
                          <input 
                            type="text" 
                            value={localBrandSettings.brandColors.primary} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, brandColors: { ...prev.brandColors, primary: e.target.value } }))}
                            onKeyDown={handleKeyDownSave}
                            className={`flex-1 px-5 py-2.5 rounded-xl outline-none font-bold text-xs font-mono ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-700'} border`}
                          />
                        </div>
                      </div>

                      {/* Menu Section Heading & Subtitle Customization */}
                      <div className="p-5 rounded-2xl border space-y-4 bg-amber-500/5 border-amber-500/20">
                        <div className="flex items-center gap-2 text-amber-500">
                          <ChefHat className="w-5 h-5" />
                          <h4 className="font-black text-xs uppercase tracking-wider">
                            {lang === 'bn' ? 'মেনু সেকশন হেডিং ও সাবটাইটেল সম্পাদনা' : 'Menu Section Heading & Subtitle Editor'}
                          </h4>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {lang === 'bn' ? 'মেনু ট্যাগলাইন (ক্ষুদ্র হেডার)' : 'Menu Tagline (Small Header)'}
                            </label>
                            <input
                              type="text"
                              value={localBrandSettings.menuSectionTagline || ''}
                              onChange={e => setLocalBrandSettings(prev => ({ ...prev, menuSectionTagline: e.target.value }))}
                              onKeyDown={handleKeyDownSave}
                              placeholder="☕ — ARTISAN HAND-ROASTED SPECIALTY COFFEE —"
                              className={`w-full px-4 py-2.5 rounded-xl outline-none font-bold text-xs ${
                                theme === 'dark' ? 'bg-[#252525] text-white border-slate-700' : 'bg-white border-slate-200 text-slate-700'
                              } border focus:border-amber-500 transition-colors`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {lang === 'bn' ? 'প্রধান মেনু শিরোনাম (Main Heading)' : 'Main Menu Title'}
                            </label>
                            <input
                              type="text"
                              value={localBrandSettings.menuSectionTitle || ''}
                              onChange={e => setLocalBrandSettings(prev => ({ ...prev, menuSectionTitle: e.target.value }))}
                              onKeyDown={handleKeyDownSave}
                              placeholder="Haute Cuisine & Tasting Courses"
                              className={`w-full px-4 py-2.5 rounded-xl outline-none font-bold text-xs ${
                                theme === 'dark' ? 'bg-[#252525] text-white border-slate-700' : 'bg-white border-slate-200 text-slate-700'
                              } border focus:border-amber-500 transition-colors`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {lang === 'bn' ? 'মেনু বিবরণ (Subtitle Description)' : 'Menu Description (Subtitle)'}
                            </label>
                            <textarea
                              rows={2}
                              value={localBrandSettings.menuSectionSubtitle || ''}
                              onChange={e => setLocalBrandSettings(prev => ({ ...prev, menuSectionSubtitle: e.target.value }))}
                              placeholder="Every dish is an architectural composition of rare seasonal provenance, wild herbs, and culinary precision."
                              className={`w-full p-3 rounded-xl outline-none font-medium text-xs ${
                                theme === 'dark' ? 'bg-[#252525] text-white border-slate-700' : 'bg-white border-slate-200 text-slate-700'
                              } border focus:border-amber-500 transition-colors resize-none`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

                {/* 2. ADMIN SECURITY, PASSWORD & PUBLIC BUTTON LOCK CARD */}
                {isSectionVisible('security', ['security', 'password', 'পাসওয়ার্ড', 'pin', 'পিন', 'lock', 'লক', 'secret', 'admin button', 'বাটন', 'কাস্টমার', 'public']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    <div 
                      className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'সিকিউরিটি পাসওয়ার্ড ও এক্সেস পিন' : 'Admin Security Password & PIN Lock'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                              🔑 Protected
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'অ্যাডমিন প্যানেলে ঢোকার গোপন পাসওয়ার্ড এবং কাস্টমারদের জন্য "Admin" বাটন বন্ধ বা চালু রাখা।' : 'Change owner secret password and toggle public customer Admin button.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-8">
                        {/* Security PIN / Admin Password Configuration */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                              <Lock className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-base font-black">{lang === 'bn' ? 'অ্যাডমিন সিকিউরিটি পাসওয়ার্ড পরিবর্তন' : 'Change Secret Password'}</h3>
                              <p className="text-xs text-slate-500 font-medium">
                                {lang === 'bn' ? 'অ্যাডমিন প্যানেল আনলক করার গোপন পাসওয়ার্ড আপডেট করুন।' : 'Update the secret PIN or passphrase used to access owner dashboard.'}
                              </p>
                            </div>
                          </div>

                          <form onSubmit={handleSaveSecretCode} className="flex flex-col gap-5 pt-2 max-w-xl w-full">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Active Password'}</label>
                              <div className="relative">
                                <input 
                                  type={showSecretCode ? "text" : "password"} 
                                  readOnly
                                  value={currentSecretCode} 
                                  className={`w-full pl-5 pr-12 py-3.5 rounded-xl font-mono font-bold ${theme === 'dark' ? 'bg-[#2d2d2d] text-slate-300 border-transparent' : 'bg-slate-50 border-slate-100 text-slate-600'} border select-all outline-none`}
                                />
                                <button 
                                  type="button" 
                                  onClick={() => setShowSecretCode(!showSecretCode)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-cyan-500 text-slate-400 transition-colors cursor-pointer"
                                >
                                  {showSecretCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'নতুন পাসওয়ার্ড লিখুন' : 'Create New Password'}</label>
                              <div className="flex gap-3">
                                <input 
                                  type="text" 
                                  required
                                  value={newSecretCode}
                                  onChange={e => setNewSecretCode(e.target.value)}
                                  className={`flex-1 px-5 py-3.5 rounded-xl outline-none font-bold font-mono ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent focus:border-cyan-500' : 'bg-slate-50 border-slate-100 text-slate-800 focus:border-blue-500'} border transition-all`}
                                />
                                <button 
                                  type="submit" 
                                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95 whitespace-nowrap cursor-pointer shadow-md hover:shadow-blue-500/20"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>{lang === 'bn' ? 'পরিবর্তন করুন' : 'Change'}</span>
                                </button>
                              </div>
                            </div>
                          </form>

                          {secretCodeSuccessMsg && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold leading-relaxed flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                              <span>{secretCodeSuccessMsg}</span>
                            </motion.div>
                          )}
                        </div>

                        {/* Public Admin Button Toggle */}
                        <div className="pt-6 border-t border-inherit space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>
                                <ShieldCheck className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-base font-black">
                                  {lang === 'bn' ? 'কাস্টমারের জন্য এডমিন বাটন প্রদর্শন (Public Admin Button)' : 'Public Customer Admin Button Toggle'}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium max-w-xl mt-0.5">
                                  {lang === 'bn' 
                                    ? 'কাস্টমারদের জন্য ডিফল্টভাবে ওয়েবসাইটে "Admin" বাটনটি বন্ধ রাখা হয়। এডমিন ঢুকতে পিন (৮৫২০) বা ফুটারে 🔒 ব্যবহার করুন।' 
                                    : 'By default, Admin button is hidden from public customers. Staff can enter PIN (8520) in search bar or click 🔒 in footer.'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`text-xs font-black uppercase tracking-wider ${settings?.showAdminButton === true ? 'text-emerald-500' : 'text-slate-400'}`}>
                                {settings?.showAdminButton === true ? (lang === 'bn' ? 'অন (দৃশ্যমান)' : 'ON (Visible)') : (lang === 'bn' ? 'অফ (লুকানো)' : 'OFF (Hidden)')}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetAdminBtnVisibility(settings?.showAdminButton === true ? false : true);
                                  setIsConfirmAdminBtnModalOpen(true);
                                  setAdminConfirmPasswordInput('');
                                  setAdminConfirmPasswordError('');
                                }}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                  settings?.showAdminButton === true ? 'bg-emerald-500 justify-end shadow-md' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                                }`}
                              >
                                <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" />
                              </button>
                            </div>
                          </div>

                          {adminToggleSuccessMsg && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold leading-relaxed flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 shrink-0 text-cyan-500" />
                              <span>{adminToggleSuccessMsg}</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                )}

                {/* 3. WEBSITE DARK/LIGHT THEME & GOOGLE MAPS LOCATION DISPLAY CARD */}
                {isSectionVisible('features', ['theme', 'থিম', 'dark', 'light', 'কালো', 'সাদা', 'map', 'ম্যাপ', 'google map', 'গুগল ম্যাপ', 'location', 'লোケーション', 'personalization']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    <div 
                      className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'ওয়েবসাইট থিম ও গুগল ম্যাপস ডিসপ্লে' : 'Website Theme & Google Maps Display'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              {localBrandSettings.showGoogleMap !== false ? (lang === 'bn' ? 'ম্যাপ চালু' : 'Map Active') : (lang === 'bn' ? 'ম্যাপ বন্ধ' : 'Map Off')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'অ্যাডমিন প্যানেলের ডার্ক/লাইট মোড এবং কাস্টমার ওয়েবসাইটে গুগল ম্যাপস ও লাইভ লোকেশন প্রদর্শন।' : 'Toggle dark/light mode and turn Google Maps live location on/off.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-8">
                        {/* Dark/Light Mode */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </div>
                            <div>
                              <h3 className="text-base font-black">{lang === 'bn' ? 'এডমিন ড্যাশবোর্ড মোড' : 'Admin Theme Mode'}</h3>
                              <p className="text-xs text-slate-500 font-medium">{lang === 'bn' ? 'ডার্ক মোড অথবা ক্লিন হোয়াইট ড্যাশবোর্ড সিলেক্ট করুন।' : 'Switch between clean light and dark admin background.'}</p>
                            </div>
                          </div>
                          <div className={`flex p-1 rounded-xl transition-colors ${theme === 'dark' ? 'bg-[#252525]' : 'bg-slate-200'}`}>
                            <button 
                              type="button"
                              onClick={() => {
                                setTheme('light');
                                onUpdateSettings({ theme: 'light' });
                              }} 
                              className={`px-5 py-2 rounded-lg font-black text-xs transition-all cursor-pointer ${theme === 'light' ? 'bg-white text-blue-600 shadow-md' : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                              Light
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                setTheme('dark');
                                onUpdateSettings({ theme: 'dark' });
                              }} 
                              className={`px-5 py-2 rounded-lg font-black text-xs transition-all cursor-pointer ${theme === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                              Dark
                            </button>
                          </div>
                        </div>

                        {/* Google Maps Toggle */}
                        <div className="pt-6 border-t border-inherit space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                                <Globe className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-base font-black">
                                  {lang === 'bn' ? 'গুগল ম্যাপ ও লাইভ লোকেশন প্রদর্শন (Google Maps)' : 'Google Maps & Live Location Display'}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium max-w-xl mt-0.5">
                                  {lang === 'bn' 
                                    ? 'থিমের ফুটারে এবং ওয়েবসাইটে লাইভ গুগল ম্যাপ ও ডিরেকশন সেকশন অন বা অফ রাখুন।' 
                                    : 'Controls embedded Google Map and navigation on theme footer.'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`text-xs font-black uppercase tracking-wider ${localBrandSettings.showGoogleMap !== false ? 'text-emerald-500' : 'text-slate-400'}`}>
                                {localBrandSettings.showGoogleMap !== false ? (lang === 'bn' ? 'অন (দৃশ্যমান)' : 'ON (Visible)') : (lang === 'bn' ? 'অফ (লুকানো)' : 'OFF (Hidden)')}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newStatus = localBrandSettings.showGoogleMap === false ? true : false;
                                  setLocalBrandSettings(prev => ({ ...prev, showGoogleMap: newStatus }));
                                  onUpdateSettings({ showGoogleMap: newStatus });
                                }}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                  localBrandSettings.showGoogleMap !== false ? 'bg-emerald-500 justify-end shadow-md' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                                }`}
                              >
                                <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                )}
                {/* 4. CHEF SHOWCASE & 6 CHEF PROFILES CARD */}
                {isSectionVisible('chef', ['chef', 'শেফ', 'profile', 'প্রোফাইল', 'cook', 'রাঁধুনী', 'rating', 'রেটিং', 'experience', 'অভিজ্ঞতা', 'bio']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    <div 
                      className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                          <ChefHat className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'শেফ প্রোফাইল গ্যালারি' : 'Chef Profile Showcase & Gallery'}</h2>
                            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                              localBrandSettings.themeShowChefSection !== false
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                              {localBrandSettings.themeShowChefSection !== false ? (lang === 'bn' ? '৬ শেফ অ্যাক্টিভ' : '6 Chefs Active') : (lang === 'bn' ? 'বন্ধ' : 'Disabled')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'শেফ সেকশন চালু/বন্ধ রাখুন এবং ৬ জন দক্ষ শেফের ছবি, নাম, পদবী, রেটিং ও অভিজ্ঞতা এডিট করুন।' : 'Enable or disable chef section and manage 6 professional chef profiles.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                          <ChefHat className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black">
                              {lang === 'bn' ? 'শেফ সেকশন প্রদর্শন ও কন্ট্রোল (Chef Profile Section)' : 'Chef Profile Showcase & Toggle'}
                            </h2>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              localBrandSettings.themeShowChefSection !== false
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                              {localBrandSettings.themeShowChefSection !== false 
                                ? (lang === 'bn' ? 'শেফ অ্যাক্টিভ' : 'Chef Active') 
                                : (lang === 'bn' ? 'শেফ ডিসেবল' : 'Chef Disabled')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium max-w-xl mt-0.5">
                            {lang === 'bn' 
                              ? 'শেফ সেকশন চালু বা বন্ধ রাখুন এবং ৬ জন দক্ষ শেফের ছবি, নাম, স্পেশালিটি, রেটিং ও অভিজ্ঞতা এডিট করুন।' 
                              : 'Enable or disable the chef showcase section and customize chef photos, specialties, ratings, and experience.'}
                          </p>
                        </div>
                      </div>

                      {/* Single Direct Toggle On/Off Switch */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-xs font-black uppercase tracking-wider ${
                          localBrandSettings.themeShowChefSection !== false ? 'text-emerald-500' : 'text-slate-400'
                        }`}>
                          {localBrandSettings.themeShowChefSection !== false 
                            ? (lang === 'bn' ? 'অন (চালু)' : 'ON (Active)') 
                            : (lang === 'bn' ? 'অফ (বন্ধ)' : 'OFF (Disabled)')}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newStatus = localBrandSettings.themeShowChefSection === false ? true : false;
                            setLocalBrandSettings(prev => ({ ...prev, themeShowChefSection: newStatus }));
                            onUpdateSettings({ themeShowChefSection: newStatus });
                          }}
                          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            localBrandSettings.themeShowChefSection !== false ? 'bg-emerald-500 justify-end shadow-md' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                          }`}
                          title={localBrandSettings.themeShowChefSection !== false ? 'Disable Chef Section' : 'Enable Chef Section'}
                        >
                          <motion.div 
                            layout 
                            className="w-6 h-6 bg-white rounded-full shadow-md" 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Detailed 6-Chef Settings Form (Expands when toggle is active) */}
                    {localBrandSettings.themeShowChefSection !== false && (() => {
                      const chefList = (localBrandSettings.chefProfiles && localBrandSettings.chefProfiles.length === 6)
                        ? localBrandSettings.chefProfiles
                        : (() => {
                            const list = [...(localBrandSettings.chefProfiles || [])];
                            while (list.length < 6) {
                              const fallback = DEFAULT_CHEF_PROFILES[list.length] || DEFAULT_CHEF_PROFILES[0];
                              list.push({ ...fallback, id: `chef-${list.length + 1}` });
                            }
                            return list.slice(0, 6);
                          })();

                      const activeChef = chefList[selectedChefIndex] || chefList[0];

                      const handleUpdateCurrentChef = (fields: Partial<ChefProfile>) => {
                        setLocalBrandSettings(prev => {
                          const updatedList = [...chefList];
                          updatedList[selectedChefIndex] = {
                            ...updatedList[selectedChefIndex],
                            ...fields
                          };
                          return {
                            ...prev,
                            chefProfiles: updatedList,
                            chefProfile: updatedList[0]
                          };
                        });
                      };

                      return (
                        <div className={`mt-6 p-6 rounded-2xl border space-y-6 ${theme === 'dark' ? 'bg-[#242424] border-slate-700/60' : 'bg-slate-50 border-slate-200/80'}`}>
                          
                          {/* 6-Photo Line Grid Selector */}
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <label className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                                  <ChefHat className="w-4 h-4 text-amber-500" />
                                  <span>{lang === 'bn' ? '৬ জন শেফের ফটো ও প্রোফাইল (যেকোনো ফটোতে ক্লিক করুন):' : '6 Chef Profiles (Click any photo to edit):'}</span>
                                </label>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-500/15 text-amber-500 border border-amber-500/30">
                                  6 Slots
                                </span>
                              </div>
                              <span className="text-xs font-bold text-amber-500 font-mono flex items-center gap-1.5 self-start sm:self-auto">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                {lang === 'bn' ? `শেফ #${selectedChefIndex + 1} নির্বাচিত` : `Chef #${selectedChefIndex + 1} Active`}
                              </span>
                            </div>

                            {/* Line of 6 Photos */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                              {chefList.map((chefItem, idx) => {
                                const isSelected = selectedChefIndex === idx;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedChefIndex(idx)}
                                    className={`relative rounded-2xl overflow-hidden p-1.5 text-left transition-all duration-300 group cursor-pointer flex flex-col ${
                                      isSelected 
                                        ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/25 bg-amber-500/10 border-2 border-amber-500 scale-[1.03]' 
                                        : theme === 'dark'
                                          ? 'border border-slate-700/70 hover:border-amber-500/50 bg-[#1a1a1a] hover:bg-[#222] opacity-85 hover:opacity-100'
                                          : 'border border-slate-300 hover:border-amber-500/50 bg-white hover:bg-slate-50 opacity-90 hover:opacity-100'
                                    }`}
                                  >
                                    {/* Photo thumbnail */}
                                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative bg-slate-900 shadow-inner">
                                      <img 
                                        src={chefItem.image || DEFAULT_CHEF_PROFILES[idx % DEFAULT_CHEF_PROFILES.length].image} 
                                        alt={chefItem.name || `Chef ${idx + 1}`}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                      
                                      {/* Slot badge */}
                                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-xs border border-white/20 text-[9px] font-black font-mono text-amber-400">
                                        #{idx + 1}
                                      </div>

                                      {/* Selected checkmark */}
                                      {isSelected && (
                                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                      )}

                                      {/* Hover click hint */}
                                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <span className="text-[10px] font-bold text-white bg-amber-600/90 px-2 py-0.5 rounded-md shadow-xs">
                                          {lang === 'bn' ? 'ক্লিক করে এডিট' : 'Edit'}
                                        </span>
                                      </div>

                                      {/* Bottom rating */}
                                      <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between text-[9px] font-mono text-amber-300">
                                        <span className="truncate max-w-[65px] font-semibold text-white/90">{chefItem.role?.split(' ')[0] || 'Chef'}</span>
                                        <span className="flex items-center gap-0.5 font-bold">
                                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                          {chefItem.rating || 4.9}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Name & Role below thumbnail */}
                                    <div className="mt-1.5 px-1 pb-0.5">
                                      <p className={`text-[11px] font-extrabold truncate leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                                        {chefItem.name || `Chef ${idx + 1}`}
                                      </p>
                                      <p className={`text-[9px] font-semibold truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {chefItem.speciality || chefItem.role || 'Artisan Chef'}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Active Chef Banner */}
                          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border ${
                            theme === 'dark' ? 'bg-[#1b1b1b] border-amber-500/30' : 'bg-amber-50/80 border-amber-300'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-md">
                                #{selectedChefIndex + 1}
                              </div>
                              <div>
                                <h3 className={`text-sm font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                                  <span>{lang === 'bn' ? `শেফ #${selectedChefIndex + 1} এডিট করছেন:` : `Editing Chef #${selectedChefIndex + 1}:`}</span>
                                  <span className="text-amber-600 dark:text-amber-400 font-black">{activeChef.name}</span>
                                </h3>
                                <p className={`text-[11px] font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                                  {lang === 'bn' 
                                    ? 'এই শেফের ফটো, নাম, পদবী, রেটিং, অভিজ্ঞতা ও বায়ো নিচে এডিট করতে পারবেন।' 
                                    : 'Customize this chef’s photo, name, designation, rating, experience, and bio below.'}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-black self-end sm:self-center">
                              Slot {selectedChefIndex + 1} of 6
                            </div>
                          </div>

                          {/* Selected Chef Profile Editor Form */}
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Chef Photo Preview & Upload */}
                            <div className="shrink-0 space-y-3 text-center w-full md:w-48">
                              <div className="relative w-36 h-44 sm:w-44 sm:h-52 mx-auto rounded-2xl overflow-hidden border-2 border-[#C9A86A]/50 shadow-md bg-slate-900 group">
                                <img 
                                  src={activeChef.image || DEFAULT_CHEF_PROFILES[selectedChefIndex % DEFAULT_CHEF_PROFILES.length].image} 
                                  alt={activeChef.name || 'Chef'}
                                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" 
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs border border-white/20 text-[10px] font-mono font-bold text-amber-400">
                                  #{selectedChefIndex + 1}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                                  <span className="text-[11px] text-white font-bold bg-black/60 px-2.5 py-1 rounded-lg">
                                    {lang === 'bn' ? 'ছবি পরিবর্তন' : 'Change Photo'}
                                  </span>
                                </div>
                              </div>

                              {/* Image URL Input & File Upload */}
                              <div className="space-y-1.5">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'শেফের ছবি লিংক বা ফাইল' : 'Chef Photo URL / File'}
                                </label>
                                <input 
                                  type="text"
                                  value={activeChef.image || ''}
                                  onChange={e => handleUpdateCurrentChef({ image: e.target.value })}
                                  onKeyDown={handleKeyDownSave}
                                  className={`w-full px-3 py-2 text-xs rounded-xl font-mono ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-semibold'} border outline-none`}
                                />
                                <label className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>{lang === 'bn' ? 'ডিভাইস থেকে ফটো আপলোড' : 'Upload Image'}</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={e => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = ev => {
                                          const result = ev.target?.result as string;
                                          handleUpdateCurrentChef({ image: result });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Chef Fields Grid */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                              {/* Chef Name */}
                              <div className="space-y-1.5 sm:col-span-2">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'শেফের পুরো নাম' : "Chef's Full Name"}
                                </label>
                                <input 
                                  type="text"
                                  value={activeChef.name || ''}
                                  onChange={e => handleUpdateCurrentChef({ name: e.target.value })}
                                  onKeyDown={handleKeyDownSave}
                                  className={`w-full px-4 py-2.5 rounded-xl font-bold text-sm ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                />
                              </div>

                              {/* Chef Role / Designation */}
                              <div className="space-y-1.5">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'পদবী / রোল' : 'Designation / Role'}
                                </label>
                                <input 
                                  type="text"
                                  value={activeChef.role || ''}
                                  onChange={e => handleUpdateCurrentChef({ role: e.target.value })}
                                  onKeyDown={handleKeyDownSave}
                                  className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                />
                              </div>

                              {/* Star Rating & Review Count */}
                              <div className="space-y-1.5">
                                <label className={`text-[11px] font-black uppercase tracking-wider flex items-center justify-between ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  <span>{lang === 'bn' ? 'রেটিং স্টার (১ থেকে ৫)' : 'Star Rating (1 - 5)'}</span>
                                  <span className="text-amber-600 dark:text-amber-400 font-black flex items-center gap-1 font-mono">
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    {activeChef.rating || 4.9}
                                  </span>
                                </label>
                                <div className="flex gap-2 items-center">
                                  <input 
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    value={activeChef.rating || 4.9}
                                    onChange={e => handleUpdateCurrentChef({ rating: parseFloat(e.target.value) || 5 })}
                                    onKeyDown={handleKeyDownSave}
                                    className={`w-28 px-3 py-2.5 rounded-xl font-mono font-bold text-xs ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                  />
                                  <input 
                                    type="number"
                                    value={activeChef.ratingCount || 1280}
                                    onChange={e => handleUpdateCurrentChef({ ratingCount: parseInt(e.target.value) || 0 })}
                                    onKeyDown={handleKeyDownSave}
                                    className={`flex-1 px-3 py-2.5 rounded-xl font-mono font-bold text-xs ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                  />
                                </div>
                              </div>

                              {/* Experience Years */}
                              <div className="space-y-1.5">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'অভিজ্ঞতা (বছর)' : 'Experience (Years)'}
                                </label>
                                <input 
                                  type="number"
                                  value={activeChef.experienceYears || 16}
                                  onChange={e => handleUpdateCurrentChef({ experienceYears: parseInt(e.target.value) || 0 })}
                                  onKeyDown={handleKeyDownSave}
                                  className={`w-full px-4 py-2.5 rounded-xl font-bold font-mono text-xs ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                />
                              </div>

                              {/* Speciality */}
                              <div className="space-y-1.5">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'স্পেশালিটি' : 'Speciality'}
                                </label>
                                <input 
                                  type="text"
                                  value={activeChef.speciality || ''}
                                  onChange={e => handleUpdateCurrentChef({ speciality: e.target.value })}
                                  onKeyDown={handleKeyDownSave}
                                  className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                />
                              </div>

                              {/* Awards / Recognition */}
                              <div className="space-y-1.5 sm:col-span-2">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'স্বীকৃতি ও পুরস্কার' : 'Awards & Recognition'}
                                </label>
                                <input 
                                  type="text"
                                  value={activeChef.awards || ''}
                                  onChange={e => handleUpdateCurrentChef({ awards: e.target.value })}
                                  onKeyDown={handleKeyDownSave}
                                  className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-extrabold'} border outline-none`}
                                />
                              </div>

                              {/* Biography / Description */}
                              <div className="space-y-1.5 sm:col-span-2">
                                <label className={`text-[11px] font-black uppercase tracking-wider block ${theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}`}>
                                  {lang === 'bn' ? 'শেফের সংক্ষিপ্ত পরিচিতি ও বিবরণ' : 'Chef Bio / Story'}
                                </label>
                                <textarea 
                                  rows={3}
                                  value={activeChef.bio || ''}
                                  onChange={e => handleUpdateCurrentChef({ bio: e.target.value })}
                                  className={`w-full px-4 py-2.5 rounded-xl font-medium text-xs leading-relaxed ${theme === 'dark' ? 'bg-[#1b1b1b] text-white border-slate-700' : 'bg-white text-slate-950 border-slate-300 font-bold'} border outline-none resize-none`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Save Chef Changes Button */}
                          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-700/30">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-emerald-500" />
                              <span>{lang === 'bn' ? 'সকল ৬ জন শেফের তথ্য একসাথে সংরক্ষিত হবে।' : 'All 6 chef profile updates will be saved.'}</span>
                            </div>
                            <button
                              type="button"
                              onClick={handleSaveBrandSettings}
                              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                            >
                              <Save className="w-4 h-4" />
                              <span>{lang === 'bn' ? 'সকল ৬ জন শেফের তথ্য সেভ করুন' : 'Save 6 Chef Settings'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                      </div>
                  </div>
                )}

                {/* 5. SOCIAL MEDIA LINKS & HERO SLIDER BANNERS CARD */}
                {isSectionVisible('social', ['social', 'সোশ্যাল', 'facebook', 'instagram', 'youtube', 'linkedin', 'banner', 'ব্যনার', 'hero', 'হিরো', 'slide', 'স্লাইডার', 'plan', 'প্ল্যান']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    <div 
                      className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'সোশ্যাল মিডিয়া ও হিরো ব্যানার স্লাইডার' : 'Social Media & Hero Banner Slider'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase">
                              {localBrandSettings.subscriptionPlan || 'Basic'} Plan
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'ইনস্টাগ্রাম, ফেসবুক, ইউটিউব, লিঙ্কডইন পেজ এবং হেডার স্লাইডারের কাভার ফটো কাস্টমাইজেশন।' : 'Social media channel links and homepage hero slider cover photo uploads.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-6">
                        
                        {/* DEDICATED ISOLATED PLAN CONTAINER */}
                      {(() => {
                        const plansToRender = [
                          {
                            id: 'basic',
                            price: '$15',
                            name: lang === 'bn' ? '$15 Basic Plan' : '$15 Basic Plan',
                            socials: [
                              { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/your-brand' }
                            ],
                            slideIndices: [0]
                          },
                          {
                            id: 'pro',
                            price: '$49',
                            name: lang === 'bn' ? '$49 Pro Plan' : '$49 Pro Plan',
                            socials: [
                              { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/your-brand' },
                              { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/your-page' },
                              { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@your-channel' }
                            ],
                            slideIndices: [0, 1, 2]
                          },
                          {
                            id: 'elite',
                            price: '$99',
                            name: lang === 'bn' ? '$99 Elite Plan' : '$99 Elite Plan',
                            socials: [
                              { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/your-brand' },
                              { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/your-page' },
                              { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@your-channel' },
                              { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/your-profile' }
                            ],
                            slideIndices: [0, 1, 2, 3]
                          }
                        ];

                        const currentPlanId = localBrandSettings.subscriptionPlan || 'basic';
                        const activePlanObj = plansToRender.find(p => p.id === currentPlanId) || plansToRender[0];
                        const isBasic = activePlanObj.id === 'basic';

                        return (
                          <div key={activePlanObj.id} className={`p-6 md:p-8 rounded-3xl border ${theme === 'dark' ? 'border-slate-800 bg-[#222222] text-white' : 'border-slate-200 bg-white text-slate-900'} space-y-8 shadow-sm relative overflow-hidden`}>
                            
                            {/* Dedicated Clean Header (Without plan names/dollar labels) */}
                            <div className="flex items-center justify-between border-b border-[#e8e2d8] pb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-700 border border-amber-500/30">
                                  <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-black text-slate-900">
                                    {lang === 'bn' ? 'সোশ্যাল লিংক ও হিরো মিডিয়া সেটিংস' : 'Social Links & Hero Media Settings'}
                                  </h3>
                                </div>
                              </div>
                            </div>

                            {/* PART 1: SOCIAL MEDIA URL INPUTS */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                                  <span>🌐</span>
                                  <span>{lang === 'bn' ? 'সোশ্যাল মিডিয়া লিংক' : 'Social Media Links'}</span>
                                </h4>
                              </div>

                              <div className={isBasic ? 'max-w-2xl mx-auto' : `grid grid-cols-1 ${
                                activePlanObj.socials.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'
                              } gap-5`}>
                                {activePlanObj.socials.map((item) => {
                                  const url = localBrandSettings.socialLinks[item.key as keyof typeof localBrandSettings.socialLinks];
                                  return (
                                    <div 
                                      key={item.key} 
                                      className={`p-4 md:p-5 rounded-2xl border border-[#e5dfd5] bg-white shadow-sm flex flex-col gap-3 relative overflow-hidden ${isBasic ? 'w-full' : ''}`}
                                    >
                                      <div className="flex items-center justify-between gap-1">
                                        <div className="flex items-center gap-2.5">
                                          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
                                            {getSocialIcon(item.key)}
                                          </div>
                                          <span className="text-sm font-black capitalize text-slate-900">{item.label}</span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 bg-[#f8f6f0] p-2 rounded-xl border border-[#e2dcd2] focus-within:border-amber-600 focus-within:bg-white transition-colors">
                                        <input 
                                          type="text" 
                                          value={url || ''}
                                          onChange={e => setLocalBrandSettings(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [item.key]: e.target.value } }))}
                                          onKeyDown={handleKeyDownSave}
                                          placeholder={item.placeholder}
                                          className="w-full bg-transparent text-xs font-bold outline-none text-slate-900 placeholder:text-slate-400 px-2 py-1"
                                        />
                                        {url && (
                                          <button 
                                            type="button"
                                            onClick={() => window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')}
                                            className="p-1.5 rounded-lg hover:bg-blue-500/15 text-blue-600 transition-colors shrink-0"
                                            title={`Open ${item.label}`}
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* PART 2: HERO COVER PHOTO SLIDES */}
                            <div className="space-y-5 pt-6 border-t border-[#e8e2d8]">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-700 border border-amber-500/30">
                                    <Sparkles className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                                      <span>{lang === 'bn' ? 'হিরো স্লাইডার কাভার ফটো' : 'Hero Slider Cover Images'}</span>
                                    </h4>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleSyncCountryHeroSlides()}
                                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer self-start sm:self-auto shrink-0 active:scale-95"
                                >
                                  <Sparkles className="w-4 h-4 text-slate-950" />
                                  <span>{lang === 'bn' ? `অটো-সিঙ্ক (${selectedCountry || 'Country'})` : `Auto-Sync (${selectedCountry || 'Country'})`}</span>
                                </button>
                              </div>

                              {slideNotificationMsg && (
                                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 font-bold text-xs flex items-center gap-2">
                                  <Check className="w-4 h-4 shrink-0" />
                                  <span>{slideNotificationMsg}</span>
                                </div>
                              )}

                              <div className={isBasic ? 'max-w-2xl mx-auto' : `grid grid-cols-1 ${
                                activePlanObj.slideIndices.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                              } gap-6`}>
                                {activePlanObj.slideIndices.map((idx) => {
                                  const defaultSlides = getHeroSlidesForLocation(selectedCountry || localBrandSettings.brandLocation, localBrandSettings.brandName);
                                  const fallbackSlide = defaultSlides[idx] || defaultSlides[0];
                                  const currentSlide = (localBrandSettings.heroSlides && localBrandSettings.heroSlides[idx]) || fallbackSlide;
                                  const currentImg = (localBrandSettings.heroImages && localBrandSettings.heroImages[idx]) || currentSlide.image || fallbackSlide.image;

                                  const fileRef = idx === 0 ? slide1FileInputRef : idx === 1 ? slide2FileInputRef : idx === 2 ? slide3FileInputRef : slide4FileInputRef;

                                  return (
                                    <div 
                                      key={idx}
                                      className={`p-5 rounded-2xl border border-[#e5dfd5] bg-white space-y-4 flex flex-col justify-between relative overflow-hidden shadow-sm ${isBasic ? 'w-full' : ''}`}
                                    >
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <span className="px-3 py-1 rounded-xl text-xs font-black bg-slate-900 text-white border border-slate-800">
                                            Slide #{idx + 1}
                                          </span>
                                        </div>

                                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
                                          <img 
                                            src={currentImg} 
                                            alt={`Slide ${idx + 1}`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3 pointer-events-none">
                                            <p className="text-xs font-black text-white line-clamp-1">
                                              {fallbackSlide.title}
                                            </p>
                                            <p className="text-[10px] text-slate-300 line-clamp-1">
                                              {fallbackSlide.subtitle}
                                            </p>
                                          </div>
                                        </div>

                                        <input 
                                          type="file" 
                                          ref={fileRef}
                                          onChange={(e) => handleSlideFileUpload(idx, e)}
                                          accept="image/*"
                                          className="hidden"
                                        />

                                        <div className="space-y-1.5">
                                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                                            {lang === 'bn' ? 'ছবির ইউআরএল (Image URL)' : 'Image URL'}
                                          </label>
                                          <input 
                                            type="text" 
                                            value={localBrandSettings.heroImages?.[idx] || ''} 
                                            onChange={(e) => handleUpdateSlideImage(idx, e.target.value)}
                                            placeholder={fallbackSlide.image}
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none font-medium bg-[#f8f6f0] text-slate-900 border border-[#e2dcd2] focus:border-amber-600 focus:bg-white transition-colors"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex gap-2.5 pt-3 border-t border-[#e8e2d8]">
                                        <button
                                          type="button"
                                          onClick={() => fileRef.current?.click()}
                                          className="flex-1 py-2.5 px-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all bg-cyan-600 hover:bg-cyan-500 text-slate-950 active:scale-95 cursor-pointer shadow-md"
                                        >
                                          <Camera className="w-3.5 h-3.5" />
                                          <span>{lang === 'bn' ? 'আপলোড' : 'Upload'}</span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => handleResetSlide(idx)}
                                          className="py-2.5 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all border border-slate-200 text-slate-800 hover:bg-slate-50 cursor-pointer active:scale-95 bg-white shadow-xs"
                                        >
                                          <RefreshCw className="w-3.5 h-3.5" />
                                          <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        );
                      })()}
                    </div>
                </div>
              )}

                {/* 6. LIVE SYSTEM UPDATE & DEPLOYMENT CARD */}
                {isSectionVisible('deploy', ['deploy', 'ডিপ্লয়', 'update', 'আপডেট', 'push', 'live', 'সরাসরি', 'shield', 'সিস্টেম']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    <div 
                      className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'সরাসরি সিস্টেম আপডেট ডিপ্লয় (Push Update)' : 'Live System Update & Deployments'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                              ⚡ Push Ready
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'এক ক্লিকে সমস্ত সচল কাস্টমার ও ডিভাইসগুলোর ওয়েবসাইট লাইভ আপডেট করুন।' : 'Instantly trigger system-wide live code updates to all connected client screens.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>
                              <Zap className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-base font-black">
                                {lang === 'bn' ? 'সরাসরি আপডেট সুবিধা' : 'Instant Push Update'}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {lang === 'bn' ? 'ওয়েবসাইটে হওয়া সমস্ত পরিবর্তন সাথে সাথে ব্রাউজারে রিফ্লেক্ট করান।' : 'Sync brand changes instantly across active browsers.'}
                              </p>
                            </div>
                          </div>
                          
                          <button 
                            type="button"
                            onClick={async () => {
                              if (onTriggerGlobalUpdate) {
                                setIsDeploying(true);
                                try {
                                  await onTriggerGlobalUpdate();
                                  setDeploySuccess(true);
                                  setTimeout(() => setDeploySuccess(false), 5000);
                                } catch (e) {
                                  console.error(e);
                                } finally {
                                  setIsDeploying(false);
                                }
                              } else {
                                alert("Update trigger not available in current mode.");
                              }
                            }}
                            disabled={isDeploying}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                              deploySuccess 
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10'
                                : theme === 'dark'
                                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20 active:scale-95'
                                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10 active:scale-95'
                            }`}
                          >
                            {isDeploying ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>{lang === 'bn' ? 'ডিপ্লয় হচ্ছে...' : 'Deploying...'}</span>
                              </>
                            ) : deploySuccess ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>{lang === 'bn' ? 'আপডেট সম্পন্ন!' : 'Successfully Pushed!'}</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span>{lang === 'bn' ? 'সরাসরি আপডেট করুন' : 'Push Live Update'}</span>
                              </>
                            )}
                          </button>
                        </div>

                        {deploySuccess && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold leading-relaxed flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                            <span>
                              {lang === 'bn' 
                                ? 'সরাসরি সিস্টেম আপডেট সফলভাবে রিলিজ করা হয়েছে! কাস্টমারের ব্রাউজার ৩ সেকেন্ডের মধ্যে স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।' 
                                : 'Live update released! Idle client devices will reload automatically in 3 seconds.'}
                            </span>
                          </motion.div>
                        )}

                        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-[#252525]/50 border-slate-800' : 'bg-slate-50 border-slate-100'} text-xs space-y-3`}>
                          <div className="flex items-center gap-2 font-black text-slate-400 uppercase tracking-widest text-[10px]">
                            <ShieldCheck className="w-4 h-4 text-cyan-500" />
                            <span>{lang === 'bn' ? 'নিরাপদ স্বয়ংক্রিয়-হালনাগাদ বিধি' : 'Intelligent Auto-Update Shield'}</span>
                          </div>
                          <p className="text-slate-500 leading-relaxed font-medium">
                            {lang === 'bn' 
                              ? 'গ্রাহকদের অর্ডার করার সুবিধার্থে সিস্টেমে স্মার্ট আইডল-ট্র্যাকিং যুক্ত রয়েছে। কাস্টমারের কার্ট ফাঁকা থাকলে এবং কোনো লাইভ ট্র্যাকিং সচল না থাকলেই কেবল ব্রাউজারটি নিজে থেকে রিফ্রেশ হবে।' 
                              : 'To protect client transactions, client devices will only automatically trigger a browser reload when idle.'}
                          </p>
                        </div>
                      </div>
                  </div>
                )}

                {/* 7. CUSTOM DOMAINS & WEB URL CARD */}
                {isSectionVisible('domains', ['domain', 'domains', 'ডোমেইন', 'url', 'লিংক', 'custom domain', 'dns', 'cname', 'ssl', 'hostname']) && (
                  <div className="transition-all duration-300 w-full bg-transparent">
                    <div 
                      className="w-full pb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-transparent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">{lang === 'bn' ? 'ডোমেইন ও কাস্টম ওয়েবসাইট লিংক' : 'Domains & Custom Web Address'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                              🌐 Custom Domains
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'রেস্টুরেন্টের নিজস্ব ব্র্যান্ডেড ডোমেইন (যেমন: myrestaurant.com) এবং কাস্টম সাব-ডোমেইন কানেক্ট করুন।' : 'Connect custom root domains, SSL certificates and DNS hostnames.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-6">
                      <DomainsManager
                        restaurantId={restaurantId}
                        brandName={settings.brandName || ''}
                        settings={settings}
                        onUpdateSettings={onUpdateSettings}
                        theme={theme}
                        lang={lang}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </motion.div>
      </AnimatePresence>
    </div>
  </main>
      </div>

      {verifyingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setVerifyingOrder(null)} />
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Authorize Payment</h2>
            <form onSubmit={handleAuthorizePayment} className="space-y-4">
              <input 
                type="password" 
                value={managerPinInput} 
                onChange={e => setManagerPinInput(e.target.value)} 
                placeholder="Manager PIN" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-mono"
              />
              {pinError && <p className="text-red-600 text-xs font-bold">{pinError}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setVerifyingOrder(null)} className="flex-1 py-3 rounded-xl bg-slate-100 font-bold text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">Authorize</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Payment Modal */}
      {selectedPlanForPayment && (
        <PaymentModal
          isOpen={!!selectedPlanForPayment}
          onClose={() => setSelectedPlanForPayment(null)}
          onSuccess={(planId) => {
            onUpdateSettings({ subscriptionPlan: planId as SubscriptionPlan });
            setSelectedPlanForPayment(null);
          }}
          plan={selectedPlanForPayment}
          theme={theme}
        />
      )}

      {/* Hidden camera capture input */}
      <input 
        type="file" 
        ref={cameraFileInputRef} 
        accept="image/*" 
        capture="user" 
        onChange={handleAvatarFileUpload} 
        className="hidden" 
      />

      {/* Interactive Profile Picture Zoom Modal */}
      <AnimatePresence>
        {isAvatarZoomed && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 no-print">
            {/* Darkened blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAvatarZoomed(false);
                setShowGooglePhotos(false);
              }}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
            />
            
            {/* Google Account Change Profile Card Design with standard butter-smooth spring entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 p-8 rounded-[2.5rem] bg-white text-slate-800 shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-slate-100"
            >
              {!showGooglePhotos ? (
                <>
                  {/* Centered Circular Profile Picture with overlap silhouette icon */}
                  <div className="relative w-44 h-44 rounded-full border-4 border-slate-100 shadow-md mb-8 flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                      <img 
                        src={currentAvatarSrc} 
                        alt="Zoomed Avatar" 
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                    
                    {/* Silhouette overlapping badge icon in bottom-right corner */}
                    <div className="absolute bottom-1 right-1 bg-white border border-slate-200 text-slate-700 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                  </div>

                  {/* Clean Google Account Options Menu List */}
                  <div className="w-full space-y-1">
                    {/* 1. Upload from device */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAvatarZoomed(false);
                        setTimeout(() => avatarFileInputRef.current?.click(), 150);
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-slate-700 active:scale-98 transition-all text-left cursor-pointer border border-transparent hover:border-slate-100"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <Upload className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-800">{lang === 'bn' ? 'ডিভাইস থেকে আপলোড' : 'Upload from device'}</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{lang === 'bn' ? 'গ্যালারি বা ফাইল থেকে ছবি নিন' : 'Choose photo from device files'}</p>
                      </div>
                    </button>

                    {/* 2. Take a picture */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAvatarZoomed(false);
                        setTimeout(() => cameraFileInputRef.current?.click(), 150);
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-slate-700 active:scale-98 transition-all text-left cursor-pointer border border-transparent hover:border-slate-100"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <Camera className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-800">{lang === 'bn' ? 'ছবি তুলুন' : 'Take a picture'}</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{lang === 'bn' ? 'সরাসরি ক্যামেরা ওপেন করুন' : 'Open camera to snap photo'}</p>
                      </div>
                    </button>

                    {/* 3. Google Photos preset gallery */}
                    <button
                      type="button"
                      onClick={() => setShowGooglePhotos(true)}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-slate-700 active:scale-98 transition-all text-left cursor-pointer border border-transparent hover:border-slate-100"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                        {/* Custom multi-colored Google Photos windmill logo block */}
                        <div className="grid grid-cols-2 gap-0.5 w-5 h-5 rotate-12">
                          <span className="bg-[#ea4335] rounded-tl-full rounded-tr-full rounded-bl-full" />
                          <span className="bg-[#4285f4] rounded-tl-full rounded-tr-full rounded-br-full" />
                          <span className="bg-[#fbbc05] rounded-bl-full rounded-tl-full rounded-br-full" />
                          <span className="bg-[#34a853] rounded-tr-full rounded-br-full rounded-bl-full" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-800">{lang === 'bn' ? 'গুগল ফটোজ' : 'Google Photos'}</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{lang === 'bn' ? 'পছন্দসই ফটোজ কালেকশন' : 'Select from beautiful presets'}</p>
                      </div>
                    </button>
                  </div>

                  {/* Secondary actions at the bottom */}
                  <div className="w-full pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    {customAvatarUrl ? (
                      <button
                        type="button"
                        onClick={() => {
                          handleResetAvatar();
                          setIsAvatarZoomed(false);
                        }}
                        className="text-xs font-bold text-red-500 hover:text-red-600 transition-all cursor-pointer"
                      >
                        {lang === 'bn' ? 'ছবি ডিলিট করুন' : 'Delete Photo'}
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">{lang === 'bn' ? 'ডিফল্ট প্রোফাইল' : 'Default Profile'}</span>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => setIsAvatarZoomed(false)}
                      className="px-4 py-1.5 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-bold text-xs transition-all cursor-pointer"
                    >
                      {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                    </button>
                  </div>
                </>
              ) : (
                /* Google Photos beautiful working selector view */
                <div className="w-full flex flex-col items-center">
                  <div className="w-full flex items-center gap-2 mb-4">
                    {/* Stylized Google Photos Windmill */}
                    <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0">
                      <span className="bg-[#ea4335] rounded-tl-full rounded-tr-full rounded-bl-full" />
                      <span className="bg-[#4285f4] rounded-tl-full rounded-tr-full rounded-br-full" />
                      <span className="bg-[#fbbc05] rounded-bl-full rounded-tl-full rounded-br-full" />
                      <span className="bg-[#34a853] rounded-tr-full rounded-br-full rounded-bl-full" />
                    </div>
                    <span className="font-bold text-sm text-slate-800">{lang === 'bn' ? 'ফটোজ কালেকশন' : 'Google Photos Presets'}</span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mb-4 text-center">
                    {lang === 'bn' ? 'আপনার রেস্টুরেন্ট ব্র্যান্ডের জন্য একটি প্রোফাইল পিকচার সিলেক্ট করুন:' : 'Select a beautiful profile picture for your restaurant brand:'}
                  </p>

                  {/* Grid of 6 stunning presets */}
                  <div className="grid grid-cols-3 gap-3 w-full mb-6">
                    {[
                      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop", // Chef
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", // Restaurateur
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", // Manager
                      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop", // Owner
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", // Female Chef
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"  // Founder
                    ].map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCustomAvatarUrl(url);
                          localStorage.setItem('webar_custom_user_avatar', url);
                          setIsAvatarZoomed(false);
                          setShowGooglePhotos(false);
                          setAvatarSuccessMsg(lang === 'bn' ? 'প্রোফাইল ছবি সফলভাবে পরিবর্তন করা হয়েছে!' : 'Profile picture updated successfully!');
                          setTimeout(() => setAvatarSuccessMsg(null), 4000);
                          window.dispatchEvent(new Event('webar_avatar_changed'));
                        }}
                        className="w-full aspect-square rounded-xl overflow-hidden hover:scale-105 active:scale-95 transition-all border border-slate-200 hover:border-cyan-500 hover:shadow-md cursor-pointer"
                      >
                        <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="w-full flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowGooglePhotos(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      {lang === 'bn' ? 'ফিরে যান' : 'Back'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          LOGO GALLERY & CUSTOM COLOR PICKER MODAL (Opened from Column 1 Logo card)
          ======================================================================= */}
      <AnimatePresence>
        {isLogoGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={() => setIsLogoGalleryOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`w-full max-w-4xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden border relative ${
                theme === 'dark' ? 'bg-[#181818] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setIsLogoGalleryOpen(false)}
                className={`absolute top-6 right-6 p-2 rounded-full hover:scale-105 transition-all ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Close Gallery"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-8 pr-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 text-cyan-500 rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{lang === 'bn' ? 'রেস্টুরেন্ট লোগো গ্যালারি' : 'Restaurant Logo Gallery'}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight font-display">
                  {lang === 'bn' ? 'রেস্টুরেন্ট লোগো গ্যালারি ও মনোগ্রাম আর্কিটেক্ট' : 'Restaurant Logo Gallery & Monogram Architect'}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {lang === 'bn' ? 'আপনার রেস্টুরেন্টের জন্য পছন্দসই মনোগ্রাম টেমপ্লেট ও কালার সিলেক্ট করুন।' : "Select your monogram's template archetype, configure primary/accent colors, or apply professional elite color presets."}
                </p>
              </div>

              {/* Form Wrapper to support instant save on Enter key */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveBrandSettings();
                  setIsLogoGalleryOpen(false);
                }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Style Gallery Grid (7 Columns) */}
                  <div className="lg:col-span-7 space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Logo Style Templates</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'crest', name: 'Elite Crest', desc: 'Serif crest with diagonal sash' },
                        { id: 'minimal', name: 'Minimalist', desc: 'Clean, sleek overlap' },
                        { id: 'stamp', name: 'Vintage Stamp', desc: 'Dashed postal circular seal' },
                        { id: 'modern', name: 'Modern Tech', desc: 'Glow tech monogram frame' }
                      ].map((styleItem) => {
                        const isActive = (localBrandSettings.logoStyle || 'crest') === styleItem.id;

                        return (
                          <button
                            key={styleItem.id}
                            type="button"
                            onClick={() => setLocalBrandSettings(prev => ({ ...prev, logoStyle: styleItem.id as any }))}
                            className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-between text-center cursor-pointer relative h-36 ${
                              isActive 
                                ? 'bg-blue-600/15 border-blue-500 text-blue-500 shadow-lg scale-[1.02]' 
                                : theme === 'dark' ? 'bg-[#222] border-slate-800 hover:border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            {/* Custom miniature preview of the monogram in this style */}
                            <div className="mb-2 shrink-0">
                              {renderMonogramLogo(localBrandSettings.brandName || '', theme === 'light', 'sm')}
                            </div>
                            <div>
                              <p className="text-xs font-black tracking-tight">{styleItem.name}</p>
                              <p className="text-[9px] text-slate-400 mt-0.5 leading-tight font-medium">{styleItem.desc}</p>
                            </div>

                            {isActive && (
                              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <Check className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Color Tuning Controls (5 Columns) */}
                  <div className="lg:col-span-5 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Monogram Colors</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Primary Character</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={localBrandSettings.logoColorPrimary} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, logoColorPrimary: e.target.value }))}
                            className="h-10 w-10 rounded-lg cursor-pointer bg-transparent border-none shrink-0"
                          />
                          <input 
                            type="text" 
                            value={localBrandSettings.logoColorPrimary} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, logoColorPrimary: e.target.value }))}
                            className={`w-full px-3 py-2 rounded-lg text-xs font-mono outline-none font-bold ${theme === 'dark' ? 'bg-[#222] text-white border-slate-800' : 'bg-white border-slate-200 text-slate-700'} border`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Secondary Accent</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={localBrandSettings.logoColorSecondary} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, logoColorSecondary: e.target.value }))}
                            className="h-10 w-10 rounded-lg cursor-pointer bg-transparent border-none shrink-0"
                          />
                          <input 
                            type="text" 
                            value={localBrandSettings.logoColorSecondary} 
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, logoColorSecondary: e.target.value }))}
                            className={`w-full px-3 py-2 rounded-lg text-xs font-mono outline-none font-bold ${theme === 'dark' ? 'bg-[#222] text-white border-slate-800' : 'bg-white border-slate-200 text-slate-700'} border`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Swatch Presets */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Elite Designer Presets</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Imperial Gold', primary: '#cbd5e1', secondary: '#f59e0b' },
                          { name: 'Rose Gold', primary: '#cbd5e1', secondary: '#f43f5e' },
                          { name: 'Emerald Mist', primary: '#94a3b8', secondary: '#10b981' },
                          { name: 'Electric Cyan', primary: '#94a3b8', secondary: '#06b6d4' },
                          { name: 'Royal Velvet', primary: '#f1f5f9', secondary: '#8b5cf6' },
                          { name: 'Platinum Noir', primary: '#f1f5f9', secondary: '#334155' }
                        ].map((preset) => {
                          const isSelected = localBrandSettings.logoColorPrimary === preset.primary && localBrandSettings.logoColorSecondary === preset.secondary;
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setLocalBrandSettings(prev => ({
                                ...prev,
                                logoColorPrimary: preset.primary,
                                logoColorSecondary: preset.secondary
                              }))}
                              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all flex items-center gap-1.5 border active:scale-95 ${
                                isSelected 
                                  ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-md' 
                                  : theme === 'dark' ? 'bg-[#222] border-slate-800 text-slate-400 hover:text-slate-300' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <span className="flex gap-1">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.primary }} />
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.secondary }} />
                              </span>
                              <span>{preset.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsLogoGalleryOpen(false)}
                    className={`px-6 py-3 rounded-xl font-bold text-xs hover:scale-102 transition-all cursor-pointer ${
                      theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs hover:scale-102 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/15"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save & Apply Design</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden camera capture input */}

      {/* Admin Button Toggle Password Confirmation Modal */}
      <AnimatePresence>
        {isConfirmAdminBtnModalOpen && (
          <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border ${
                theme === 'dark' ? 'bg-[#18181b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              } space-y-6 relative overflow-hidden`}
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">
                    {lang === 'bn' ? 'এডমিন সিকিউরিটি ভেরিফিকেশন' : 'Admin Password Verification'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium pt-0.5">
                    {targetAdminBtnVisibility
                      ? (lang === 'bn' ? 'বাটন অন করতে এডমিন পাসওয়ার্ড দিন:' : 'Enter password to turn ON admin button:')
                      : (lang === 'bn' ? 'বাটন অফ (হাইড) করতে এডমিন পাসওয়ার্ড দিন:' : 'Enter password to turn OFF (hide) admin button:')
                    }
                  </p>
                </div>
              </div>

              <form onSubmit={handleConfirmAdminButtonToggle} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {lang === 'bn' ? 'এডমিন পাসওয়ার্ড' : 'Admin Password'}
                  </label>
                  <div className="relative">
                    <input 
                      type={showModalPassword ? "text" : "password"}
                      value={adminConfirmPasswordInput}
                      onChange={e => {
                        setAdminConfirmPasswordInput(e.target.value);
                        setAdminConfirmPasswordError('');
                      }}
                      autoFocus
                      placeholder={lang === 'bn' ? 'পাসওয়ার্ড লিখুন (যেমন: admin5321)...' : 'Enter admin password...'}
                      className={`w-full pl-5 pr-12 py-3.5 rounded-2xl outline-none font-bold text-sm border ${
                        theme === 'dark' ? 'bg-[#27272a] text-white border-slate-700 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-cyan-500'
                      } transition-colors`}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowModalPassword(!showModalPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer"
                    >
                      {showModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {adminConfirmPasswordError && (
                    <p className="text-xs font-bold text-rose-500 flex items-center gap-1.5 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{adminConfirmPasswordError}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsConfirmAdminBtnModalOpen(false);
                      setAdminConfirmPasswordInput('');
                      setAdminConfirmPasswordError('');
                    }}
                    className={`flex-1 py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer border ${
                      theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{lang === 'bn' ? 'কনফার্ম' : 'Confirm'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


