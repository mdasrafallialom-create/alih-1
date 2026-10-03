import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, Sparkles, Moon, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, ChevronUp, Play, Pause, ShoppingBag, ArrowUpRight, 
  Menu, X, Heart, Shield, QrCode, Check, Compass, Volume2, Search, Bell,
  Award, ChefHat, Utensils, Instagram, Facebook, Mail, ArrowRight, ArrowLeft,
  Youtube, Linkedin, Edit3, Save, ImageIcon, ShoppingCart, Plus, Minus, Trash2, CheckCircle2, Eye, Sliders, Receipt
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import portafilterTrioImg from '../../assets/images/portafilter_trio_story_1789909656642.jpg';
import { EspressoMachineHero } from './EspressoMachineHero';
import { isCustomRestaurantName } from '../../lib/adminHelpers';

interface FoodItem {
  id: string;
  title: string;
  desc: string;
  price: number;
  img: string;
  calories?: string;
  category?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
}

interface LunavereThemeProps {
  brandName?: string;
  tagline?: string;
  dishes?: FoodItem[];
  fontDisplay?: string;
  fontBody?: string;
  primaryColor?: string;
  onOrderDish?: (dish: FoodItem) => void;
  onOpenAdmin?: () => void;
  onBack?: () => void;
  onReturnToPortal?: () => void;
  settings?: any;
  lang?: string;
  deviceView?: 'desktop' | 'tablet' | 'mobile';
}

export const LUNAVERE_PALETTE = {
  midnightNavy: '#15162B',
  champagneCream: '#F4E7D3',
  softGold: '#C9A86A',
  mutedLavender: '#9A7BB5',
  warmRose: '#B77B83',
  deepText: '#171522',
};

const DEFAULT_SLIDES = [
  {
    id: 1,
    eyebrow: 'PARIS AFTER DARK',
    heading: 'Coffee for slow evenings',
    description: 'An intimate Parisian coffee house for slow evenings, delicate pastries and beautifully brewed coffee.',
    primaryBtn: 'View the Menu',
    secondaryBtn: 'Reserve a Table',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&auto=format&fit=crop',
    actionTarget: 'menu'
  },
  {
    id: 2,
    eyebrow: 'HANDCRAFTED DAILY',
    heading: 'A little sweetness after sunset',
    description: 'Delicate pastries and desserts prepared for beautiful evenings.',
    primaryBtn: 'View Desserts',
    secondaryBtn: 'View the Menu',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop',
    actionTarget: 'desserts'
  },
  {
    id: 3,
    eyebrow: 'YOUR EVENING ADDRESS',
    heading: 'Stay for one more cup',
    description: 'A quiet Parisian-inspired cafe for coffee, conversation and unhurried moments.',
    primaryBtn: 'Find Us',
    secondaryBtn: 'Reserve a Table',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop',
    actionTarget: 'visit'
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Lunavere is magic after 8 PM. The pour-over coffee paired with warm almond tart under starlight is unforgettable.",
    author: "Colette M.",
    role: "Parisian Culinary Critic"
  },
  {
    quote: "The atmosphere feels straight out of a Parisian film. Intimate, tranquil, and the signature espresso is perfection.",
    author: "Julian V.",
    role: "Architecture & Design Director"
  },
  {
    quote: "My favorite place in the city for late evening conversations, smooth jazzy ambient sounds, and exquisite pastries.",
    author: "Elena R.",
    role: "Frequent Patron"
  }
];

const DEFAULT_LUNAVERE_DISHES: FoodItem[] = [
  { id: '1', title: 'Artisan Caramel Macchiato', price: 6.50, calories: '180 kcal', desc: 'Single-origin espresso with steamed vanilla oat milk & Madagascar caramel drizzle', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: '2', title: 'Flaky Butter Almond Croissant', price: 4.50, calories: '290 kcal', desc: 'Freshly baked daily with French butter, roasted almond flakes & powdered sugar', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop', category: 'pastries', isPopular: true },
  { id: '3', title: 'Pistachio Velvet Cold Brew', price: 5.50, calories: '150 kcal', desc: '24-hour slow-steeped Arabica cold brew topped with sweet pistachio cream foam', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: '4', title: 'Double Shot Velvet Espresso', price: 4.00, calories: '10 kcal', desc: 'Rich golden crema with notes of dark cocoa, roasted hazelnut & wild honey', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop', category: 'coffee' },
  { id: '5', title: 'Lavender Starlight Latte', price: 6.00, calories: '190 kcal', desc: 'Espresso infused with French culinary lavender, vanilla bean & silky micro-foam', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop', category: 'coffee' },
  { id: '6', title: 'Parisian Glass Siphon Brew', price: 9.50, calories: '40 kcal', desc: 'Single-origin Ethiopian Yirgacheffe slow-brewed through a glass siphon, infused with gold dust', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: '7', title: 'Honey Glazed Cinnamon Brioche Roll', price: 5.00, calories: '340 kcal', desc: 'Warm fluffy brioche roll swirled with Saigon cinnamon & organic honey glaze', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop', category: 'pastries' },
  { id: '8', title: 'Parisian Rose Macarons Box', price: 9.00, calories: '260 kcal', desc: 'Artisanal box of 6 handcrafted macarons: raspberry, salted caramel, pistachio & dark cacao', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop', category: 'desserts' },
  { id: '9', title: 'Organic Jasmine Pearl Green Tea', price: 4.50, calories: '0 kcal', desc: 'Hand-rolled young green tea pearls scented with fresh night-blooming jasmine flowers', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop', category: 'tea' }
];

export default function LunavereTheme({
  brandName = 'My Restaurant',
  tagline = 'Parisian Starlight Cafe',
  dishes = [],
  fontDisplay,
  fontBody,
  primaryColor,
  onOrderDish,
  onOpenAdmin,
  onBack,
  onReturnToPortal,
  settings,
  lang = 'en',
  deviceView
}: LunavereThemeProps) {
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = deviceView === 'mobile' || (deviceView !== 'desktop' && deviceView !== 'tablet' && windowWidth < 640);
  const isTablet = deviceView === 'tablet' || (deviceView !== 'desktop' && (windowWidth >= 640 && windowWidth < 1024));
  const isDesktop = !isMobile && !isTablet;
  const effectiveBrandName = (() => {
    const raw = (brandName || settings?.restaurantName || settings?.brandName || '').trim();
    if (raw && isCustomRestaurantName(raw)) {
      return raw;
    }
    return 'Lunavere';
  })();
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQrMenuModal, setShowQrMenuModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishDetail, setSelectedDishDetail] = useState<FoodItem | null>(null);
  const [editingSingleDish, setEditingSingleDish] = useState<FoodItem | null>(null);
  const [detailOrderQty, setDetailOrderQty] = useState(1);
  const [detailSpecialNote, setDetailSpecialNote] = useState('');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'GBP' | 'BDT' | 'EUR'>('USD');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [resName, setResName] = useState('');
  const [resGuests, setResGuests] = useState('2');
  const [resTime, setResTime] = useState('20:00');

  // View Mode: 'customer' (clean customer view without edit buttons) vs 'edit' (owner edit mode with EDIT buttons)
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Table Order System State
  interface CartItem {
    dish: FoodItem;
    qty: number;
    specialNote?: string;
  }
  const [orderCart, setOrderCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lunavere_order_cart');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [orderTableNumber, setOrderTableNumber] = useState('Table 3');
  const [orderCustomerName, setOrderCustomerName] = useState('');
  const [orderCustomerPhone, setOrderCustomerPhone] = useState('');
  const [orderSpecialNotes, setOrderSpecialNotes] = useState('');
  const [orderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<any>(null);

  // Sync orderCart with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lunavere_order_cart', JSON.stringify(orderCart));
      } catch (e) {}
    }
  }, [orderCart]);

  // Sanitize brandLocation to ensure no accidental "Pakistan", "Hyderabad", or "Sindh" remains
  const getSanitizedLocation = (loc?: string) => {
    if (!loc) return '';
    let cleaned = loc
      .replace(/Hyderabad,?\s*Sindh,?\s*Pakistan,?\s*/gi, '')
      .replace(/Hyderabad,?\s*/gi, '')
      .replace(/Sindh,?\s*/gi, '')
      .replace(/Pakistan,?\s*/gi, '')
      .replace(/^,\s*/, '')
      .replace(/,\s*$/, '')
      .trim();
    if (!cleaned || cleaned.toLowerCase() === 'location not set') {
      return '742 Evergreen Terrace, New York, NY 10001';
    }
    return cleaned;
  };
  const sanitizedBrandLocation = getSanitizedLocation(settings?.brandLocation);

  // Subscription Plan & Social Access:
  // $15 Basic Plan: ONLY Instagram
  // $49 Pro Plan: Instagram, Facebook, YouTube
  // $99 Elite Plan: Instagram, Facebook, YouTube, LinkedIn
  const currentPlan = String(settings?.subscriptionPlan || 'basic').toLowerCase();
  const isEliteTier = currentPlan === 'elite' || currentPlan === 'plan3' || currentPlan === '99';
  const isProTier = currentPlan === 'pro' || currentPlan === 'plan2' || currentPlan === '49';
  const isProOrElite = isProTier || isEliteTier;

  // Auto-slide testimonial slider every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setSlideDirection(1);
      setActiveTestimonial((prev) => (prev + 1) % DEFAULT_TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isTestimonialHovered]);

  const handlePrevTestimonial = () => {
    setSlideDirection(-1);
    setActiveTestimonial((prev) => (prev - 1 + DEFAULT_TESTIMONIALS.length) % DEFAULT_TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setSlideDirection(1);
    setActiveTestimonial((prev) => (prev + 1) % DEFAULT_TESTIMONIALS.length);
  };

  const handleSelectTestimonial = (idx: number) => {
    setSlideDirection(idx > activeTestimonial ? 1 : -1);
    setActiveTestimonial(idx);
  };

  // Detect motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isChefHovered, setIsChefHovered] = useState(false);

  // Chef section visibility logic: Controlled by theme admin settings
  const isChefSectionVisible = settings?.themeShowChefSection !== false;
  let themeChefsList: ChefProfile[] | null = settings?.themeSettings?.['lunavere']?.chefProfiles || null;
  if (!themeChefsList && typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('theme_chefs_lunavere');
      if (saved) themeChefsList = JSON.parse(saved);
    } catch (e) {}
  }

  const rawChefs: ChefProfile[] = (themeChefsList && themeChefsList.length > 0)
    ? themeChefsList
    : (settings?.chefProfiles && settings.chefProfiles.length > 0)
      ? settings.chefProfiles
      : DEFAULT_CHEF_PROFILES;
  const chefs = rawChefs.filter(c => c.active !== false).slice(0, 6);
  const repeatCount = chefs.length > 0 ? Math.max(2, Math.ceil(12 / chefs.length)) : 0;
  const marqueeChefs = chefs.length > 0 ? Array.from({ length: repeatCount }, () => chefs).flat() : [];

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      const scrollables = document.querySelectorAll('.overflow-y-auto, .overflow-auto, main');
      scrollables.forEach(el => {
        try {
          el.scrollTo({ top: 0, behavior: 'smooth' });
          el.scrollTop = 0;
        } catch (e) {}
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleScroll = (e?: Event) => {
      let maxScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (e && e.target && (e.target as HTMLElement).scrollTop !== undefined) {
        maxScroll = Math.max(maxScroll, (e.target as HTMLElement).scrollTop);
      }
      const scrollables = document.querySelectorAll('.overflow-y-auto, .overflow-auto');
      scrollables.forEach(el => {
        if (el.scrollTop > maxScroll) maxScroll = el.scrollTop;
      });
      setIsScrolled(maxScroll > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Categories
  const categories = ['all', 'coffee', 'pastries', 'brunch', 'desserts', 'tea'];

  // Currency & Price Formatter
  const formatPrice = (val: number, cur: string = selectedCurrency) => {
    const sym = cur === 'BDT' ? '৳' : cur === 'GBP' ? '£' : cur === 'EUR' ? '€' : '$';
    return cur === 'BDT' ? `${sym}${val.toFixed(0)}` : `${sym}${val.toFixed(2)}`;
  };

  // State-managed custom dishes with local persistence
  const [customDishes, setCustomDishes] = useState<FoodItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lunavere_custom_dishes');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return (dishes && dishes.length > 0) ? dishes : DEFAULT_LUNAVERE_DISHES;
  });

  useEffect(() => {
    if (dishes && dishes.length > 0) {
      setCustomDishes(prev => {
        return dishes.map(d => prev.find(p => p.id === d.id) || d);
      });
    }
  }, [dishes]);

  const effectiveDishes = customDishes;

  // File upload helper for live photo change from gallery
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Saved Dish IDs so EDIT button disappears after saving an item
  const [savedDishIds, setSavedDishIds] = useState<Set<string>>(new Set());

  // Save modified dish to customDishes and localStorage
  const handleSaveDish = () => {
    if (!editingSingleDish) return;
    const updated = effectiveDishes.map(d => d.id === editingSingleDish.id ? editingSingleDish : d);
    setCustomDishes(updated);
    setSavedDishIds(prev => new Set(prev).add(editingSingleDish.id));
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lunavere_custom_dishes', JSON.stringify(updated));
      } catch (e) {}
    }
    if (selectedDishDetail?.id === editingSingleDish.id) {
      setSelectedDishDetail(editingSingleDish);
    }
    setEditingSingleDish(null);
    setToastMsg(lang === 'bn' ? '✅ সেভ হয়েছে (Saved successfully)!' : '✅ Saved successfully!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Add dish to order with quantity and special note
  const handleOrderDish = (dish: FoodItem, qty: number = 1, note: string = '') => {
    setOrderCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item => item.dish.id === dish.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { dish, qty, specialNote: note }];
    });

    if (onOrderDish) {
      for (let i = 0; i < qty; i++) {
        onOrderDish(dish);
      }
    }
    setToastMsg(lang === 'bn' ? `অর্ডারে ${qty}x "${dish.title}" যুক্ত হয়েছে!` : `Added ${qty}x "${dish.title}" to Table Order!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const updateCartQty = (dishId: string, delta: number) => {
    setOrderCart(prev => {
      return prev.map(item => {
        if (item.dish.id === dishId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeCartItem = (dishId: string) => {
    setOrderCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const handleConfirmOrder = () => {
    if (orderCart.length === 0) return;
    const orderId = `#LUN-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = orderCart.reduce((sum, item) => sum + (item.dish.price * item.qty), 0);
    const newOrder = {
      id: orderId,
      table: orderTableNumber,
      customerName: orderCustomerName || (lang === 'bn' ? 'টেবিল গেস্ট' : 'Table Guest'),
      customerPhone: orderCustomerPhone,
      items: [...orderCart],
      totalAmount,
      currency: selectedCurrency,
      specialNotes: orderSpecialNotes,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      status: 'received'
    };

    setLatestPlacedOrder(newOrder);
    setOrderCart([]);
    setIsOrderDrawerOpen(false);
    setOrderSuccessModalOpen(true);
  };

  const filteredDishes = effectiveDishes.filter(d => {
    const matchesCategory = activeCategory === 'all' 
      ? true 
      : (d.category?.toLowerCase().includes(activeCategory) || d.title.toLowerCase().includes(activeCategory));
    
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return d.title.toLowerCase().includes(q) || 
      (d.desc && d.desc.toLowerCase().includes(q)) ||
      (d.category && d.category.toLowerCase().includes(q));
  });

  const dessertDishes = effectiveDishes.filter(d => 
    d.category?.toLowerCase().includes('dessert') || 
    d.category?.toLowerCase().includes('pastry') || 
    d.category?.toLowerCase().includes('bakery') ||
    d.title.toLowerCase().includes('croissant') ||
    d.title.toLowerCase().includes('tart') ||
    d.title.toLowerCase().includes('cake') ||
    d.title.toLowerCase().includes('velvet') ||
    d.title.toLowerCase().includes('sweet')
  );

  const displayDesserts = dessertDishes.length > 0 ? dessertDishes : effectiveDishes.slice(0, 5);

  return (
    <div 
      className="relative w-full min-h-screen text-[#171522] selection:bg-[#C9A86A]/30 selection:text-[#171522] outline-none"
      style={{
        backgroundColor: '#F4E7D3',
        fontFamily: fontBody || "'Manrope', sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* 1. LUNAVERE PARISIAN NAVIGATION BAR */}
      {/* ========================================================= */}
      <header 
        className="absolute top-0 left-0 right-0 z-30 w-full transition-all duration-300 bg-[#F4E7D3]/95 backdrop-blur-md border-b border-[#C9A86A]/25 py-3 sm:py-4"
      >
        <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Name (Width-constrained to prevent pushing right controls off screen) */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 max-w-[55%] sm:max-w-[50%] md:max-w-[48%] lg:max-w-none">
            <a href="#hero" className="flex items-center gap-2 sm:gap-2.5 min-w-0 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#C9A86A]/60 flex items-center justify-center text-[#96722d] shadow-sm group-hover:border-[#96722d] transition-colors shrink-0">
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#96722d]" />
              </div>
              <div className="min-w-0">
                <span 
                  className="text-base sm:text-xl lg:text-2xl font-normal tracking-wider text-[#171522] group-hover:text-[#96722d] transition-colors block leading-tight truncate"
                  style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                >
                  {effectiveBrandName}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.14em] sm:tracking-[0.2em] text-[#96722d] uppercase block font-bold truncate">
                  {tagline || 'Parisian Starlight Cafe'}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links - Only displayed on spacious desktop screens */}
          {!isMobile && !isTablet && (
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-semibold tracking-widest uppercase text-[#171522]/80">
              <button onClick={() => scrollToSection('menu')} className="hover:text-[#96722d] transition-colors cursor-pointer">
                {lang === 'bn' ? 'মেনু' : 'Menu'}
              </button>
              <button onClick={() => scrollToSection('story')} className="hover:text-[#96722d] transition-colors cursor-pointer">
                {lang === 'bn' ? 'গল্প' : 'Story'}
              </button>
              <button onClick={() => scrollToSection('desserts')} className="hover:text-[#96722d] transition-colors cursor-pointer">
                {lang === 'bn' ? 'প্যাটিসারি' : 'Pâtisserie'}
              </button>
              {isChefSectionVisible && (
                <button onClick={() => scrollToSection('chefs')} className="hover:text-[#96722d] transition-colors cursor-pointer">
                  {lang === 'bn' ? 'মাস্টার শেফ' : 'Sommeliers'}
                </button>
              )}
              <button onClick={() => scrollToSection('timeline')} className="hover:text-[#96722d] transition-colors cursor-pointer">
                {lang === 'bn' ? 'অভিজ্ঞতা' : 'Ritual'}
              </button>
              <button onClick={() => scrollToSection('visit')} className="hover:text-[#96722d] transition-colors cursor-pointer">
                {lang === 'bn' ? 'যোগাযোগ' : 'Visit'}
              </button>
            </nav>
          )}

          {/* Action Buttons: Desktop Search / Reserve & Mobile/Tablet Dropdown Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-20">
            {/* Desktop-only Search Bar */}
            {!isMobile && !isTablet && (
              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-[#96722d] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.trim().length > 0) {
                        const menuEl = document.getElementById('menu');
                        if (menuEl && window.scrollY < 300) {
                          menuEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    placeholder={lang === 'bn' ? 'খুঁজুন...' : 'Search...'}
                    className="pl-8 pr-6 py-2 rounded-full bg-white hover:bg-white/95 border border-[#C9A86A]/50 focus:border-[#96722d] focus:ring-1 focus:ring-[#96722d]/40 text-xs text-[#171522] placeholder-[#171522]/50 shadow-sm focus:outline-none transition-all w-44 md:w-56"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 w-4 h-4 rounded-full bg-[#171522]/10 hover:bg-[#171522]/20 text-[#171522] flex items-center justify-center text-[10px] leading-none transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}





            {/* Cart / Order Drawer Trigger Button */}
            <button 
              type="button"
              onClick={() => setIsOrderDrawerOpen(true)}
              className="relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white border border-[#C9A86A]/50 flex items-center gap-1.5 sm:gap-2 shadow-md transition-all cursor-pointer active:scale-95 shrink-0"
              title={lang === 'bn' ? 'টেবিল অর্ডার ও কার্ট দেখুন' : 'View Table Order & Cart'}
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A86A]" />
              <span className="text-[11px] sm:text-xs font-bold font-mono">
                {lang === 'bn' ? 'অর্ডার' : 'Cart'}
              </span>
              {orderCart.length > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {orderCart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </button>

            {/* Reserve Button (Visible on desktop & tablet, compact on mobile) */}
            <button 
              onClick={() => setReservationModalOpen(true)}
              className={`rounded-full bg-white hover:bg-white/90 border border-[#C9A86A]/60 text-[#171522] font-black uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                isMobile ? 'hidden sm:inline-flex px-3 py-1.5 text-[11px]' : 'px-4 sm:px-5 py-2 text-xs'
              }`}
            >
              {lang === 'bn' ? 'টেবিল বুকিং' : 'Reserve'}
            </button>

            {/* Mobile & Tablet Dropdown Menu Trigger Button */}
            {(isMobile || isTablet) && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#C9A86A]/60 flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0 ${
                  mobileMenuOpen 
                    ? 'bg-[#171522] text-[#F4E7D3] border-[#171522]' 
                    : 'bg-white hover:bg-white/90 text-[#171522]'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-[#C9A86A]" />
                ) : (
                  <Menu className="w-4 h-4 text-[#96722d]" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  {mobileMenuOpen ? (lang === 'bn' ? 'বন্ধ' : 'Close') : (lang === 'bn' ? 'মেনু' : 'Menu')}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full bg-[#FAF3E8] border-b border-[#C9A86A]/35 shadow-2xl overflow-hidden text-[#171522]"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-5 space-y-5">
                {/* 1. Search Bar inside Dropdown */}
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-[#96722d] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.trim().length > 0) {
                        const menuEl = document.getElementById('menu');
                        if (menuEl) {
                          menuEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    placeholder={lang === 'bn' ? 'মেনু, কফি বা খাবার খুঁজুন...' : 'Search menu, coffee, pâtisserie...'}
                    className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#C9A86A]/50 focus:border-[#96722d] focus:ring-1 focus:ring-[#96722d]/40 text-xs text-[#171522] placeholder-[#171522]/50 shadow-sm focus:outline-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 w-4 h-4 rounded-full bg-[#171522]/10 hover:bg-[#171522]/20 text-[#171522] flex items-center justify-center text-[10px] leading-none transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 2. All Navigation Links inside Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1 border-t border-[#C9A86A]/20">
                  {/* Menu */}
                  <button 
                    onClick={() => scrollToSection('menu')} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-[#C9A86A]/30 text-left transition-all group cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#171522] group-hover:text-[#96722d] block transition-colors">
                        {lang === 'bn' ? 'মেনু' : 'Menu'}
                      </span>
                      <span className="text-[11px] text-[#171522]/65 truncate block">
                        {lang === 'bn' ? 'সিগনেচার কফি ও ড্রিংকস' : 'Signature Parisian Coffees'}
                      </span>
                    </div>
                  </button>

                  {/* Story */}
                  <button 
                    onClick={() => scrollToSection('story')} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-[#C9A86A]/30 text-left transition-all group cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#171522] group-hover:text-[#96722d] block transition-colors">
                        {lang === 'bn' ? 'গল্প' : 'Story'}
                      </span>
                      <span className="text-[11px] text-[#171522]/65 truncate block">
                        {lang === 'bn' ? 'আমাদের দর্শন ও গল্প' : 'Philosophy & Rue de l\'Étoile'}
                      </span>
                    </div>
                  </button>

                  {/* Pâtisserie */}
                  <button 
                    onClick={() => scrollToSection('desserts')} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-[#C9A86A]/30 text-left transition-all group cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#171522] group-hover:text-[#96722d] block transition-colors">
                        {lang === 'bn' ? 'প্যাটিসারি' : 'Pâtisserie'}
                      </span>
                      <span className="text-[11px] text-[#171522]/65 truncate block">
                        {lang === 'bn' ? 'ফ্রেঞ্চ পেস্ট্রি ও ডেজার্ট' : 'Artisan Pastries & Desserts'}
                      </span>
                    </div>
                  </button>

                  {/* Sommeliers */}
                  {isChefSectionVisible && (
                    <button 
                      onClick={() => scrollToSection('chefs')} 
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-[#C9A86A]/30 text-left transition-all group cursor-pointer shadow-xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ChefHat className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#171522] group-hover:text-[#96722d] block transition-colors">
                          {lang === 'bn' ? 'মাস্টার শেফ' : 'Sommeliers'}
                        </span>
                        <span className="text-[11px] text-[#171522]/65 truncate block">
                          {lang === 'bn' ? 'সোমেলিয়ার ও মাস্টার বারিস্তা' : 'Artisanal Masters & Roasters'}
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Ritual */}
                  <button 
                    onClick={() => scrollToSection('timeline')} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-[#C9A86A]/30 text-left transition-all group cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#171522] group-hover:text-[#96722d] block transition-colors">
                        {lang === 'bn' ? 'অভিজ্ঞতা' : 'Ritual'}
                      </span>
                      <span className="text-[11px] text-[#171522]/65 truncate block">
                        {lang === 'bn' ? 'সান্ধ্যকালীন রিচুয়াল (৫-৯ PM)' : 'Evening Starlight Ritual'}
                      </span>
                    </div>
                  </button>

                  {/* Visit */}
                  <button 
                    onClick={() => scrollToSection('visit')} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-[#C9A86A]/30 text-left transition-all group cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#171522] group-hover:text-[#96722d] block transition-colors">
                        {lang === 'bn' ? 'যোগাযোগ' : 'Visit'}
                      </span>
                      <span className="text-[11px] text-[#171522]/65 truncate block">
                        {lang === 'bn' ? 'ঠিকানা ও সময়' : 'Hours, Location & Enquiries'}
                      </span>
                    </div>
                  </button>
                </div>

                {/* 3. Dropdown Quick Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setReservationModalOpen(true);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#171522] hover:bg-[#2e2a42] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>{lang === 'bn' ? 'টেবিল রিজার্ভেশন করুন' : 'Reserve Evening Table'}</span>
                  </button>

                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowQrMenuModal(true);
                    }}
                    className="flex-1 py-3 rounded-xl bg-white hover:bg-white/90 border border-[#C9A86A]/50 text-[#171522] font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#96722d]" />
                    <span>{lang === 'bn' ? 'ডিজিটাল কিউআর মেনু' : 'Digital QR Menu Card'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================= */}
      {/* 2. LUNAVERE PARISIAN STARLIGHT HERO (Espresso Machine Extraction) */}
      {/* ========================================================= */}
      <EspressoMachineHero 
        brandName={brandName || settings?.brandName}
        tagline={settings?.brandTagline}
        onOrderClick={() => scrollToSection('menu')}
        onReserveClick={() => setReservationModalOpen(true)}
        lang={lang}
        deviceView={deviceView}
      />

      {/* ========================================================= */}
      {/* 3. OUR PHILOSOPHY & STORY SECTION */}
      {/* ========================================================= */}
      <section id="story" className="py-20 lg:py-28 px-6 sm:px-12 bg-[#F4E7D3] text-[#171522] scroll-mt-20">
        <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with 3 Portafilters (latte art, ground coffee, coffee beans) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#15162B] aspect-[3/4] max-w-md sm:max-w-lg mx-auto lg:max-w-none group border border-[#C9A86A]/30">
              <img 
                src={portafilterTrioImg} 
                alt="Parisian Portafilter Coffee Ritual" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left space-y-1">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#C9A86A] uppercase font-bold block">
                  EST. RUE DE L'ÉTOILE
                </span>
                <span className="text-sm sm:text-base italic text-[#F4E7D3] font-serif block leading-tight">
                  Parisian night ambience
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy Content */}
          <div className="lg:col-span-6 space-y-6 text-left max-w-xl mx-auto lg:mx-0">
            <div className="w-14 h-0.5 bg-[#C9A86A]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B77B83] block">
              OUR PHILOSOPHY
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171522] tracking-tight leading-[1.15]"
              style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
            >
              A little slow, sunset sanctuary.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#171522]/80 font-light leading-relaxed">
              <p>
                Lunavere was born from a simple desire: to slow down and savor the quiet pleasure of starlight, exquisite coffee, and authentic French conversation.
              </p>
              <p>
                Tucked under starlight on Rue de l'Étoile, our sanctuary welcomes you with freshly baked morning brioche and velvet evening pour-overs.
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => scrollToSection('menu')}
                className="px-8 py-3.5 rounded-full bg-[#15162B] hover:bg-[#202242] text-[#F4E7D3] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                DISCOVER COFFEE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SIGNATURE COFFEE SECTION */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 bg-[#F4E7D3] text-[#171522]">
        <div className="w-full max-w-[1800px] mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B77B83]">
              BREWED WITH INTENTION
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#171522] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Every cup has its own evening
            </h2>
            <p className="text-sm text-[#171522]/75 font-light leading-relaxed">
              From delicate espresso to slow-brewed signatures, every cup is prepared with care for Paris nights.
            </p>
            <div className="w-16 h-0.5 bg-[#C9A86A] mx-auto mt-4" />
          </div>

          {/* Feature Cards Grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className={`grid gap-6 sm:gap-8 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'
          }`}>
            {/* Card 1 */}
            <div className="bg-white text-[#171522] rounded-2xl p-6 sm:p-8 border border-[#C9A86A]/30 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 
                className="text-xl sm:text-2xl font-semibold text-[#171522] group-hover:text-[#96722d] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Espresso Ritual
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Velvety, balanced and served with care. Crafted from single-origin Arabica beans extracted under commercial bar pressure.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-[#171522] rounded-2xl p-6 sm:p-8 border border-[#C9A86A]/30 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 
                className="text-xl sm:text-2xl font-semibold text-[#171522] group-hover:text-[#96722d] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                House Pour-Over
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                A delicate cup for unhurried moments. Slow-brewed over V60 with floral notes and subtle caramel sweetness.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-[#171522] rounded-2xl p-6 sm:p-8 border border-[#C9A86A]/30 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <h3 
                className="text-xl sm:text-2xl font-semibold text-[#171522] group-hover:text-[#96722d] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Lunavere Signatures
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Seasonal drinks inspired by Parisian evenings, infused with lavender cream, dark cacao, or spiced wildflower honey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED MENU SECTION */}
      {/* ========================================================= */}
      <section id="menu" className="py-20 px-6 sm:px-12 bg-[#F4E7D3] text-[#171522]">
        <div className="w-full max-w-[1800px] mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-5 sm:gap-6 border-b border-[#C9A86A]/30 pb-6 sm:pb-8">
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#96722d]">
                SELECTION DES BOISSONS & GASTRONOMIE
              </span>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Favourites after dark
              </h2>
            </div>

            {/* Category Filter Pills (Fully visible on mobile & tablet without any clipping or text truncation) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full xl:w-auto pt-1 xl:pt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold capitalize tracking-wider transition-all cursor-pointer select-none active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-[#171522] text-white font-bold shadow-md'
                      : 'bg-white text-[#171522]/85 hover:text-[#171522] hover:bg-white/95 border border-[#C9A86A]/40 shadow-sm'
                  }`}
                >
                  {lang === 'bn' ? (
                    cat === 'all' ? 'সবগুলো' :
                    cat === 'coffee' ? 'কফি' :
                    cat === 'pastries' ? 'পেস্ট্রি' :
                    cat === 'brunch' ? 'ব্রাঞ্চ' :
                    cat === 'desserts' ? 'ডেজার্ট' :
                    cat === 'tea' ? 'চা' : cat
                  ) : (
                    cat.charAt(0).toUpperCase() + cat.slice(1)
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Food Cards Layout with Spacing: 1 col on mobile, 2 on tablet, 3 on desktop (Screenshot 5) */}
          {filteredDishes.length > 0 ? (
            <div className={`grid gap-6 sm:gap-8 lg:gap-8 ${
              isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {filteredDishes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setDetailOrderQty(1);
                    setDetailSpecialNote('');
                    setSelectedDishDetail(item);
                  }}
                  className="bg-[#15162B] text-white rounded-[22px] overflow-hidden border border-[#C9A86A]/40 shadow-xl hover:border-[#C9A86A] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Image with rounded corners and centered EDIT button (Screenshot 5) */}
                  <div className="relative overflow-hidden aspect-[4/3] w-full bg-black/60">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15162B] via-transparent to-transparent pointer-events-none" />

                    {/* Top-left Artisan Roast / Category badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#C9A86A] text-[9px] font-mono font-bold uppercase tracking-widest border border-[#C9A86A]/40 shadow-md flex items-center gap-1">
                        ☕ {item.category?.toUpperCase() || 'ARTISAN ROAST'}
                      </span>
                    </div>

                    {/* Floating Center EDIT Button - Automatically disappears when item is saved */}
                    {isEditMode && !savedDishIds.has(item.id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] opacity-90 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto animate-fade-in">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingSingleDish(item);
                          }}
                          className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5 border border-white/50 cursor-pointer backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                          title={lang === 'bn' ? 'খাবারটি এডিট করুন' : 'Click to edit this food item'}
                        >
                          <Edit3 className="w-3.5 h-3.5 text-stone-950 stroke-[2.5]" />
                          <span>EDIT</span>
                        </button>
                      </div>
                    )}

                    {/* Calorie badge bottom-right */}
                    {item.calories && (
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-[#C9A86A] text-[10px] font-mono border border-[#C9A86A]/40 backdrop-blur-md shadow-sm pointer-events-none">
                        {item.calories}
                      </span>
                    )}
                  </div>

                  {/* Content below image */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 
                          className="font-bold text-lg sm:text-xl text-[#F4E7D3] group-hover:text-[#C9A86A] transition-colors line-clamp-2 leading-snug"
                          style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                        >
                          {item.title}
                        </h3>
                        <span className="font-mono font-black text-base sm:text-lg shrink-0 text-[#C9A86A]">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    {/* Action button: Full-Width ORDER Button (Clicking anywhere else opens details) */}
                    <div className="pt-3 border-t border-[#C9A86A]/25 mt-auto">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderDish(item, 1);
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white/80 rounded-2xl border border-[#C9A86A]/30 space-y-3 max-w-lg mx-auto shadow-sm">
              <Utensils className="w-10 h-10 text-[#96722d] mx-auto opacity-60" />
              <p className="text-sm font-bold text-[#171522]">
                {lang === 'bn' ? 'কোনো খাবার যুক্ত করা হয়নি' : 'No Menu Items Added Yet'}
              </p>
              <p className="text-xs text-[#171522]/70 leading-relaxed">
                {lang === 'bn' ? 'এডমিন প্যানেল থেকে মেনু বা খাবার যুক্ত করলে এখানে সুন্দরভাবে পরিবেশন হবে।' : 'Add dishes from the Admin Menu Manager to display them in this section.'}
              </p>
            </div>
          )}
        </div>
      </section>



      {/* ========================================================= */}
      {/* 7. DESSERT AND PASTRY SHOWCASE */}
      {/* ========================================================= */}
      <section id="desserts" className="py-20 px-6 sm:px-12 bg-[#FAF3E8] border-t border-b border-[#C9A86A]/25 text-[#171522]">
        <div className="w-full max-w-[1800px] mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#96722d]">
                PÂTISSERIE & DOUCEURS
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-normal text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                A little sweetness after sunset
              </h2>
            </div>
          </div>

          {/* 3-column card grid matching screenshot */}
          <div className={`grid gap-6 lg:gap-8 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
          }`}>
            {displayDesserts.slice(0, 3).map((dessert) => (
              <div 
                key={dessert.id}
                onClick={() => {
                  setDetailOrderQty(1);
                  setDetailSpecialNote('');
                  setSelectedDishDetail(dessert);
                }}
                className="bg-[#15162B] text-white rounded-[22px] overflow-hidden shadow-xl border border-[#C9A86A]/40 flex flex-col justify-between transition-all duration-300 hover:border-[#C9A86A] hover:shadow-2xl group text-left cursor-pointer"
              >
                <div className="h-60 sm:h-64 overflow-hidden relative bg-black/60">
                  <img 
                    src={dessert.img} 
                    alt={dessert.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15162B] via-transparent to-transparent pointer-events-none" />

                  {/* Floating EDIT button - Automatically disappears when item is saved */}
                  {isEditMode && !savedDishIds.has(dessert.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] opacity-90 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto animate-fade-in">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSingleDish(dessert);
                        }}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5 border border-white/50 cursor-pointer backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                        title={lang === 'bn' ? 'খাবারটি এডিট করুন' : 'Click to edit this food item'}
                      >
                        <Edit3 className="w-3.5 h-3.5 text-stone-950 stroke-[2.5]" />
                        <span>EDIT</span>
                      </button>
                    </div>
                  )}

                  {dessert.calories && (
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-[#C9A86A] text-[10px] font-mono border border-[#C9A86A]/40 backdrop-blur-md shadow-sm pointer-events-none">
                      {dessert.calories}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 
                        className="text-lg sm:text-xl font-normal text-[#F4E7D3] group-hover:text-[#C9A86A] leading-snug transition-colors line-clamp-2"
                        style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                      >
                        {dessert.title}
                      </h3>
                      <span className="text-base sm:text-lg font-bold text-[#C9A86A] font-mono shrink-0">
                        {formatPrice(dessert.price)}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed line-clamp-2 font-light">
                      {dessert.desc}
                    </p>
                  </div>

                  {/* Action button: Full-Width ORDER Button (Clicking anywhere else opens details) */}
                  <div className="pt-3 border-t border-[#C9A86A]/25 mt-auto">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderDish(dessert, 1);
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7.5 MASTER CHEF & COFFEE SOMMELIER SHOWCASE */}
      {/* ========================================================= */}
      {isChefSectionVisible && (
        <section id="chefs" className="py-20 bg-[#F4E7D3] border-b border-[#C9A86A]/20 scroll-mt-20 overflow-hidden text-[#171522]">
          <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#96722d] flex items-center justify-center gap-2">
                <ChefHat className="w-4 h-4 text-[#96722d]" />
                {lang === 'bn' ? 'মাস্টার শেফ ও সোমেলিয়ার' : 'ARTISANAL MASTERS & SOMMELIERS'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#171522] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {lang === 'bn' ? 'রন্ধন ও কফি শিল্পের মাস্টারগণ' : 'Behind Every Pour & Pastry'}
              </h2>
              <p className="text-sm text-[#171522]/75 font-light leading-relaxed">
                {lang === 'bn' 
                  ? 'বিশ্বমানের দক্ষ শেফ ও বারিস্তাদের নিখুঁত পরিবেশনা, যা আপনার প্রতিটি সন্ধ্যাকে করে তোলে অনন্য।'
                  : 'Meet our world-class pastry chefs, roasters, and culinary artisans crafting evocative evenings.'}
              </p>
            </div>
          </div>

          {/* Continuous Auto-scrolling Marquee Track with Pause on Hover */}
          <div 
            className="mt-12 relative w-full overflow-hidden marquee-container py-4 select-none"
            onMouseEnter={() => setIsChefHovered(true)}
            onMouseLeave={() => setIsChefHovered(false)}
            onTouchStart={() => setIsChefHovered(true)}
            onTouchEnd={() => setIsChefHovered(false)}
          >
            {/* Soft Edge Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F4E7D3] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F4E7D3] to-transparent" />

            <div 
              className="animate-marquee-track flex gap-6 px-4"
              style={{
                animationPlayState: isChefHovered ? 'paused' : 'running'
              }}
            >
              {marqueeChefs.map((chef, idx) => (
                <div 
                  key={`${chef.id || idx}-${idx}`}
                  className="w-[285px] xs:w-[330px] sm:w-[380px] md:w-[410px] shrink-0 bg-white border border-[#C9A86A]/30 hover:border-[#96722d] rounded-2xl p-5 sm:p-7 flex flex-col justify-between space-y-4 sm:space-y-5 shadow-lg transition-all duration-300 group cursor-pointer text-[#171522]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img 
                          src={chef.image} 
                          alt={chef.name} 
                          className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-2 border-[#C9A86A] shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C9A86A] text-[#171522] flex items-center justify-center text-xs font-black shadow">
                          ★
                        </div>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F4E7D3] text-[#96722d] border border-[#C9A86A]/30 text-[10px] font-bold tracking-wider uppercase inline-block truncate max-w-full">
                          {chef.role}
                        </span>
                        <h3 
                          className="text-lg sm:text-xl font-normal text-[#171522] group-hover:text-[#96722d] transition-colors truncate"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {chef.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[#96722d] text-xs">
                          {'★'.repeat(Math.min(5, Math.round(chef.rating || 5)))}
                          <span className="text-[11px] text-[#171522]/60 ml-1">({chef.rating?.toFixed(1) || '5.0'})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#171522]/75 font-light leading-relaxed line-clamp-3">
                      {chef.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#96722d]">
                    <span className="font-semibold text-[11px] truncate">
                      ✦ {chef.speciality || (chef as any).specialty || 'Signature Gastronomy'}
                    </span>
                    {chef.experienceYears && (
                      <span className="text-[#171522]/60 text-[10px] shrink-0 font-mono ml-2">
                        {chef.experienceYears}+ {lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Yrs Exp'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 8. EVENING EXPERIENCE TIMELINE */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 bg-[#FAF3E8] text-[#171522]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#96722d]">
              THE LUNAVERE EVENING RITUAL
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-normal text-[#171522]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your table is waiting after dark.
            </h2>
          </div>

          <div className={`grid gap-6 sm:gap-8 relative ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
          }`}>
            {/* Timeline Item 1 */}
            <div className="bg-white border border-[#C9A86A]/30 p-8 rounded-2xl relative space-y-3 text-center shadow-md text-[#171522]">
              <div className="w-12 h-12 rounded-full bg-[#171522] text-white font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                5 PM
              </div>
              <h3 className="text-lg font-bold text-[#96722d] tracking-wider uppercase">First Pour</h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                As twilight settles over the city, our baristas prepare the evening's first pour-over brews and herbal infusions.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="bg-white border border-[#C9A86A]/30 p-8 rounded-2xl relative space-y-3 text-center shadow-md text-[#171522]">
              <div className="w-12 h-12 rounded-full bg-[#171522] text-white font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                7 PM
              </div>
              <h3 className="text-lg font-bold text-[#96722d] tracking-wider uppercase">Dessert Hour</h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Warm pastries, almond tarts, and artisanal chocolates served under soft candlelight and starlight sounds.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="bg-white border border-[#C9A86A]/30 p-8 rounded-2xl relative space-y-3 text-center shadow-md text-[#171522]">
              <div className="w-12 h-12 rounded-full bg-[#171522] text-white font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                9 PM
              </div>
              <h3 className="text-lg font-bold text-[#96722d] tracking-wider uppercase">After-Dark Signatures</h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Intimate late-night atmosphere featuring decaf espresso martinis, lavender lattes, and quiet conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. TESTIMONIALS / QUOTE SLIDER */}
      {/* ========================================================= */}
      <section 
        className="py-20 px-6 sm:px-12 bg-[#EDE2D0] text-[#171522] overflow-hidden select-none"
        onMouseEnter={() => setIsTestimonialHovered(true)}
        onMouseLeave={() => setIsTestimonialHovered(false)}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="w-12 h-12 rounded-full bg-[#171522] text-[#C9A86A] flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="relative flex items-center justify-center min-h-[220px] sm:min-h-[180px] overflow-hidden px-10 sm:px-14">
            {/* Left Nav Arrow Button */}
            <button
              onClick={handlePrevTestimonial}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#171522]/10 hover:bg-[#171522] text-[#171522] hover:text-[#EDE2D0] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Sliding Quote Content */}
            <div className="w-full max-w-2xl mx-auto overflow-hidden py-2 px-1">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={activeTestimonial}
                  custom={slideDirection}
                  initial={{ opacity: 0, x: slideDirection > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection > 0 ? -80 : 80 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -30 || info.velocity.x < -400) {
                      handleNextTestimonial();
                    } else if (info.offset.x > 30 || info.velocity.x > 400) {
                      handlePrevTestimonial();
                    }
                  }}
                  className="space-y-3 sm:space-y-4 cursor-grab active:cursor-grabbing"
                >
                  <p 
                    className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-normal leading-relaxed italic text-[#171522]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    "{DEFAULT_TESTIMONIALS[activeTestimonial].quote}"
                  </p>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#171522]">
                      {DEFAULT_TESTIMONIALS[activeTestimonial].author}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#171522]/75 mt-0.5">
                      {DEFAULT_TESTIMONIALS[activeTestimonial].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Nav Arrow Button */}
            <button
              onClick={handleNextTestimonial}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#171522]/10 hover:bg-[#171522] text-[#171522] hover:text-[#EDE2D0] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Accessible Controls / Indicators */}
          <div className="flex items-center justify-center gap-3 pt-4">
            {DEFAULT_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectTestimonial(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === activeTestimonial 
                    ? 'w-8 h-2.5 bg-[#171522]' 
                    : 'w-2.5 h-2.5 bg-[#171522]/30 hover:bg-[#171522]/60'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. LUNAVERE PARISIAN STARLIGHT FOOTER */}
      {/* ========================================================= */}
      <footer id="visit" className="bg-[#0f101d] text-white border-t border-white/20 pt-16 pb-12 px-6 sm:px-12">
        <div className="w-full max-w-[1800px] mx-auto space-y-12">
          <div className={`grid gap-8 lg:gap-14 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
          }`}>
            {/* Col 1: Brand & Socials (White styling, no email) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/40 flex items-center justify-center text-white shrink-0">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-2xl font-normal text-white tracking-wide"
                    style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                  >
                    {effectiveBrandName}
                  </h3>
                  <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase block">
                    {settings?.lunavereFooterSubtitle || settings?.brandTagline || 'PARISIAN STARLIGHT CAFE'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/85 font-light leading-relaxed">
                {settings?.lunavereFooterDesc || 'An intimate Parisian coffee house for slow evenings, delicate pastries, and beautifully brewed single-origin coffee.'}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {/* Instagram: Always available in all tiers ($15 Basic, $49 Pro, $99 Elite) */}
                <a 
                  href={settings?.socialLinks?.instagram ? (settings.socialLinks.instagram.startsWith('http') ? settings.socialLinks.instagram : `https://${settings.socialLinks.instagram}`) : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* YouTube: Available in $49 Pro & $99 Elite tiers only */}
                {isProOrElite && (
                  <a 
                    href={settings?.socialLinks?.youtube ? (settings.socialLinks.youtube.startsWith('http') ? settings.socialLinks.youtube : `https://${settings.socialLinks.youtube}`) : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="YouTube ($49 Pro / $99 Elite)"
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}

                {/* Facebook: Available in $49 Pro & $99 Elite tiers only */}
                {isProOrElite && (
                  <a 
                    href={settings?.socialLinks?.facebook ? (settings.socialLinks.facebook.startsWith('http') ? settings.socialLinks.facebook : `https://${settings.socialLinks.facebook}`) : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Facebook ($49 Pro / $99 Elite)"
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}

                {/* LinkedIn: Available in $99 Elite tier only */}
                {isEliteTier && (
                  <a 
                    href={settings?.socialLinks?.linkedin ? (settings.socialLinks.linkedin.startsWith('http') ? settings.socialLinks.linkedin : `https://${settings.socialLinks.linkedin}`) : 'https://linkedin.com'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="LinkedIn ($99 Elite)"
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Contact & Enquiries */}
            {(sanitizedBrandLocation || settings?.contactPhone) && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                  {sanitizedBrandLocation ? 'LOCATION & ENQUIRIES' : 'CONTACT & ENQUIRIES'}
                </h4>
                <div className="space-y-3 text-xs text-white/90">
                  {sanitizedBrandLocation && (
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {sanitizedBrandLocation}
                      </span>
                    </p>
                  )}
                  {settings?.contactPhone && (
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-white shrink-0" />
                      <span className="font-mono">
                        {settings.contactPhone}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Col 3: Starlight Table / Quick Actions (All White styling & configurable) */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                {settings?.lunavereReservationTitle || 'STARLIGHT TABLE'}
              </h4>
              <p className="text-xs text-white/85 leading-relaxed">
                {settings?.lunavereReservationDesc || 'Reservations are recommended for late evenings, terrace tables, and tasting flights.'}
              </p>
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => setReservationModalOpen(true)}
                  className="w-full py-3 rounded-full bg-white hover:bg-white/90 text-[#0f101d] text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-white/10 active:scale-95 cursor-pointer"
                >
                  {settings?.lunavereReserveBtnText || (lang === 'bn' ? 'টেবিল রিজার্ভ করুন' : 'RESERVE A TABLE')}
                </button>
                <button
                  onClick={() => setShowQrMenuModal(true)}
                  className="w-full py-2.5 rounded-full border border-white/60 hover:border-white text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {settings?.lunavereQrBtnText || (lang === 'bn' ? 'ডিজিটাল কিউআর মেনু' : 'OPEN QR DIGITAL MENU')}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>© {new Date().getFullYear()} {effectiveBrandName}. All Parisian rights reserved.</p>
            <p className="font-mono text-[11px] text-white/70">Parisian Starlight Cafe • Theme #03</p>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* QR MENU CARD MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showQrMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white border border-[#C9A86A]/40 rounded-2xl p-6 text-[#171522] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#C9A86A]/20 pb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#96722d]" />
                  <span 
                    className="text-xl font-bold tracking-widest text-[#171522]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    LUNAVERE QR MENU CARD
                  </span>
                </div>
                <button 
                  onClick={() => setShowQrMenuModal(false)}
                  className="p-1 rounded-full text-gray-500 hover:text-[#171522] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#B77B83] text-white text-[10px] font-bold uppercase tracking-widest">
                  Mobile Fast Scan
                </span>
                <p className="text-xs text-[#171522]/70 pt-1">
                  Parisian Starlight Cafe • Table Menu
                </p>
              </div>

              {/* QR Food List */}
              <div className="space-y-4 divide-y divide-[#C9A86A]/20">
                {effectiveDishes.map((item) => (
                  <div key={item.id} className="pt-3 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 
                          className="font-bold text-base text-[#171522]"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {item.title}
                        </h4>
                        {item.isPopular && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#B77B83] text-white font-mono">
                            Hot
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#171522]/70 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-sm text-[#96722d]">
                        ${item.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => {
                          if (onOrderDish) onOrderDish(item);
                          setShowQrMenuModal(false);
                        }}
                        className="block mt-1 px-3 py-1 rounded-full bg-[#171522] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#2e2a42] cursor-pointer"
                      >
                        Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowQrMenuModal(false)}
                className="w-full py-3 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                Close QR Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* RESERVATION MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {reservationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white border border-[#C9A86A]/40 rounded-2xl p-6 text-[#171522] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#C9A86A]/20 pb-3">
                <h3 
                  className="text-xl font-bold text-[#171522]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Reserve a Starlight Table
                </h3>
                <button onClick={() => setReservationModalOpen(false)} className="cursor-pointer">
                  <X className="w-5 h-5 text-gray-500 hover:text-[#171522]" />
                </button>
              </div>

              {reservationSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#96722d]">Reservation Confirmed</h4>
                  <p className="text-xs text-[#171522]/80">
                    Merci! We look forward to welcoming you at Lunavere Paris.
                  </p>
                  <button 
                    onClick={() => {
                      setReservationModalOpen(false);
                      setReservationSuccess(false);
                    }}
                    className="mt-2 px-6 py-2 rounded-full bg-[#171522] text-white font-bold text-xs uppercase cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReservationSuccess(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="space-y-1">
                    <label className="font-bold text-[#96722d]">Guest Name</label>
                    <input 
                      type="text" 
                      required
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      placeholder="e.g. Colette Martin" 
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF3E8] border border-[#C9A86A]/40 text-[#171522] outline-none focus:border-[#96722d]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-[#96722d]">Guests</label>
                      <select 
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF3E8] border border-[#C9A86A]/40 text-[#171522] outline-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#96722d]">Evening Time</label>
                      <input 
                        type="time" 
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF3E8] border border-[#C9A86A]/40 text-[#171522] outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-2 cursor-pointer"
                  >
                    Confirm Table
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* CUSTOMER FOOD ITEM DETAIL & ORDERING MODAL (Screenshots 1 & 2) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedDishDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-start overflow-hidden text-slate-900"
          >
            {/* Top Bar with Back, Search, Prev/Next Counter, Close */}
            <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 shrink-0 shadow-xs w-full max-w-[1800px] mx-auto">
              <button
                type="button"
                onClick={() => setSelectedDishDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ব্যাক' : 'Back'}</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Quick dish search */}
                <div className="relative hidden md:block w-48 lg:w-60">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? "খাবার খুঁজুন..." : "Find dish..."}
                    value={modalSearchTerm}
                    onChange={(e) => {
                      const q = e.target.value;
                      setModalSearchTerm(q);
                      if (q.trim()) {
                        const match = effectiveDishes.find(d => 
                          d.title.toLowerCase().includes(q.toLowerCase()) || 
                          (d.category && d.category.toLowerCase().includes(q.toLowerCase()))
                        );
                        if (match) {
                          setSelectedDishDetail(match);
                          setDetailOrderQty(1);
                        }
                      }
                    }}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 transition-all shadow-xs"
                  />
                </div>

                {/* Prev / Counter / Next Controls */}
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (effectiveDishes.length <= 1) return;
                      const idx = effectiveDishes.findIndex(d => d.id === selectedDishDetail.id);
                      const prevIdx = idx > 0 ? idx - 1 : effectiveDishes.length - 1;
                      setSelectedDishDetail(effectiveDishes[prevIdx]);
                      setDetailOrderQty(1);
                    }}
                    className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-xs"
                    title="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-2 sm:px-3 text-xs font-mono font-bold text-slate-700 whitespace-nowrap">
                    {Math.max(1, effectiveDishes.findIndex(d => d.id === selectedDishDetail.id) + 1)} / {effectiveDishes.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (effectiveDishes.length <= 1) return;
                      const idx = effectiveDishes.findIndex(d => d.id === selectedDishDetail.id);
                      const nextIdx = idx < effectiveDishes.length - 1 ? idx + 1 : 0;
                      setSelectedDishDetail(effectiveDishes[nextIdx]);
                      setDetailOrderQty(1);
                    }}
                    className="px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-xs"
                    title="Next"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDishDetail(null)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200 shadow-xs"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div id="dish-modal-scroll-body" className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto space-y-10 scrollbar-thin bg-white max-w-[1800px] mx-auto w-full">
              {/* 2-Column Main View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Image with Floating Arrows */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 md:h-[440px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group select-none">
                  <img 
                    src={selectedDishDetail.img} 
                    alt={selectedDishDetail.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Left & Right floating click arrows directly on the image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (effectiveDishes.length <= 1) return;
                      const idx = effectiveDishes.findIndex(d => d.id === selectedDishDetail.id);
                      const prevIdx = idx > 0 ? idx - 1 : effectiveDishes.length - 1;
                      setSelectedDishDetail(effectiveDishes[prevIdx]);
                      setDetailOrderQty(1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-slate-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl z-20"
                    title="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (effectiveDishes.length <= 1) return;
                      const idx = effectiveDishes.findIndex(d => d.id === selectedDishDetail.id);
                      const nextIdx = idx < effectiveDishes.length - 1 ? idx + 1 : 0;
                      setSelectedDishDetail(effectiveDishes[nextIdx]);
                      setDetailOrderQty(1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-slate-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl z-20"
                    title="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-800 font-mono text-xs font-bold shadow-sm">
                    📸 High-Res Gourmet Selection
                  </div>
                </div>

                {/* Right Column: Title, Details & Ordering */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 
                        className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight"
                        style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                      >
                        {selectedDishDetail.title}
                      </h3>
                      <span className="font-mono text-2xl sm:text-3xl font-black text-amber-600 shrink-0">
                        {formatPrice(selectedDishDetail.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600 font-mono bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 w-fit">
                      <span>🔥 {selectedDishDetail.calories || '180 kcal'}</span>
                      <span>•</span>
                      <span>⏱️ Prep Time: 5-8 mins</span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {selectedDishDetail.desc}
                    </p>
                  </div>

                  {/* Quantity Controls & Order Button (Screenshot 2) */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">ORDER QUANTITY</span>
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 shadow-2xs">
                        <button 
                          type="button"
                          onClick={() => setDetailOrderQty(prev => Math.max(1, prev - 1))}
                          className="text-slate-600 font-bold text-lg hover:text-slate-900 px-2 cursor-pointer active:scale-95 transition-transform"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm font-black text-slate-900 w-6 text-center">{detailOrderQty}</span>
                        <button 
                          type="button"
                          onClick={() => setDetailOrderQty(prev => prev + 1)}
                          className="text-slate-600 font-bold text-lg hover:text-slate-900 px-2 cursor-pointer active:scale-95 transition-transform"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleOrderDish(selectedDishDetail, detailOrderQty);
                        setSelectedDishDetail(null);
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO ORDER ({formatPrice(selectedDishDetail.price * detailOrderQty)})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MORE DELICACIES GRID (Screenshot 1 & 2) */}
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      ✨ MORE DELICACIES — TAP ANY ITEM TO VIEW ENLARGED
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">Scroll down to explore all gourmet selections in our menu</p>
                  </div>
                  <span className="text-xs text-amber-700 font-mono bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit font-bold">
                    {effectiveDishes.length - 1} More Items Available
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                  {effectiveDishes
                    .filter(d => d.id !== selectedDishDetail.id)
                    .map((otherDish) => (
                      <div
                        key={otherDish.id}
                        onClick={() => {
                          setSelectedDishDetail(otherDish);
                          setDetailOrderQty(1);
                          const scrollEl = document.getElementById('dish-modal-scroll-body');
                          if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                          <img src={otherDish.img} alt={otherDish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[10px] font-bold">
                            {formatPrice(otherDish.price)}
                          </span>
                        </div>
                        <div className="p-3.5 space-y-1">
                          <h5 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                            {otherDish.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {otherDish.desc}
                          </p>
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block pt-1">
                            TAP TO VIEW →
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* EDIT FOOD ITEM MODAL (Screenshots 3 & 4) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingSingleDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setEditingSingleDish(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-stone-900 border-2 border-[#C9A86A] rounded-3xl p-6 sm:p-8 max-w-2xl md:max-w-3xl w-full shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              {/* Modal Header (Screenshot 3 & 4) */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700">
                    <Edit3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">Edit Food Item</h3>
                    <p className="text-xs text-stone-500 font-medium">Modify photo, title, price, and description</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSingleDish(null)}
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Hidden File Input for Photo Upload */}
              <input
                id="lunavere-single-dish-file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, (url) => setEditingSingleDish({ ...editingSingleDish, img: url }))}
              />

              {/* TOP LIVE IMAGE PREVIEW WITH UPLOAD BUTTON (Screenshot 3 & 4) */}
              <div className="space-y-2">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-400 shadow-xl flex items-center justify-center group">
                  <img 
                    src={editingSingleDish.img} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                  
                  {/* OVERLAY UPLOAD BUTTON INSIDE IMAGE BOX */}
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('lunavere-single-dish-file-input');
                      if (el) el.click();
                    }}
                    className="absolute z-20 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl flex items-center gap-2.5 border-2 border-amber-200 cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <ImageIcon className="w-5 h-5 text-stone-950" />
                    <span>📁 UPLOAD PHOTO FROM GALLERY</span>
                  </button>

                  {/* BOTTOM LIVE OVERLAY TITLE & PRICE */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between z-10 pointer-events-none">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-stone-950 font-bold text-[10px] uppercase mb-1 inline-block shadow-md">
                        {editingSingleDish.calories || '150 kcal'}
                      </span>
                      <h4 className="text-lg sm:text-2xl font-bold text-white drop-shadow-md leading-tight">
                        {editingSingleDish.title || 'Untitled Item'}
                      </h4>
                    </div>
                    <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 drop-shadow-lg shrink-0">
                      {formatPrice(editingSingleDish.price || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* FORM FIELDS (Screenshot 3 & 4) */}
              <div className="space-y-4 text-xs">
                {/* Store Display Currency */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💱</span>
                    <div>
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">STORE DISPLAY CURRENCY</span>
                      <span className="text-[10px] text-stone-500 font-medium">Select currency symbol for prices</span>
                    </div>
                  </div>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as any)}
                    className="bg-white text-stone-900 text-xs font-bold rounded-xl px-4 py-2 outline-none border-2 border-amber-400 cursor-pointer hover:border-amber-500 transition-colors shadow-sm"
                  >
                    <option value="USD">us US Dollar ($)</option>
                    <option value="GBP">uk UK Pound (£)</option>
                    <option value="BDT">bd BD Taka (৳)</option>
                    <option value="EUR">eu Euro (€)</option>
                  </select>
                </div>

                {/* Dish Title */}
                <div className="space-y-1.5">
                  <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">DISH TITLE</label>
                  <input
                    type="text"
                    value={editingSingleDish.title}
                    onChange={(e) => setEditingSingleDish({ ...editingSingleDish, title: e.target.value })}
                    placeholder="Enter dish name..."
                    className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-900 font-semibold text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Base Price */}
                  <div className="space-y-1.5">
                    <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">BASE PRICE (USD $)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editingSingleDish.price}
                      onChange={(e) => setEditingSingleDish({ ...editingSingleDish, price: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-900 font-mono font-bold text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Calories / Tag */}
                  <div className="space-y-1.5">
                    <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">CALORIES / TAG</label>
                    <input
                      type="text"
                      value={editingSingleDish.calories || ''}
                      onChange={(e) => setEditingSingleDish({ ...editingSingleDish, calories: e.target.value })}
                      placeholder="e.g. 150 kcal"
                      className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-900 font-medium text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={editingSingleDish.desc}
                    onChange={(e) => setEditingSingleDish({ ...editingSingleDish, desc: e.target.value })}
                    placeholder="Describe ingredients and flavor notes..."
                    className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-900 font-normal outline-none resize-none text-xs leading-relaxed transition-colors"
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200 gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSingleDish(null)}
                  className="px-6 py-2.5 rounded-xl bg-transparent border-2 border-red-500 text-red-600 font-bold text-xs uppercase hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDish}
                  className="px-8 py-2.5 rounded-xl bg-amber-500 border-2 border-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-amber-600 hover:border-amber-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* FLOATING ORDER SUMMARY BAR */}
      {/* ========================================================= */}
      <AnimatePresence>
        {orderCart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 left-4 right-20 sm:left-auto sm:right-22 z-40 max-w-md w-full bg-[#15162B] text-white p-3.5 sm:p-4 rounded-2xl border-2 border-[#C9A86A] shadow-2xl backdrop-blur-md flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#C9A86A] text-[#15162B] flex items-center justify-center shrink-0 font-black shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#C9A86A] uppercase tracking-wider truncate">
                    {orderTableNumber}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] shrink-0" />
                  <span className="text-xs font-bold text-[#F4E7D3] truncate">
                    {orderCart.reduce((sum, i) => sum + i.qty, 0)} {lang === 'bn' ? 'টি আইটেম' : 'items'}
                  </span>
                </div>
                <span className="text-sm font-black font-mono text-white block">
                  {formatPrice(orderCart.reduce((sum, i) => sum + (i.dish.price * i.qty), 0))}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOrderDrawerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>{lang === 'bn' ? 'বিল ও অর্ডার' : 'View Order'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* TABLE ORDER DRAWER / MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOrderDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex justify-end"
            onClick={() => setIsOrderDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#15162B] text-white h-full shadow-2xl flex flex-col justify-between border-l-2 border-[#C9A86A]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#C9A86A]/30 flex items-center justify-between bg-[#111222]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 text-[#C9A86A]">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F4E7D3] uppercase tracking-wider font-serif">
                      {lang === 'bn' ? 'টেবিল অর্ডার ও বিল' : 'Table Order & Checkout'}
                    </h3>
                    <p className="text-[11px] text-white/60 font-mono">
                      Lunavere Starlight Table Service
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOrderDrawerOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-5 scrollbar-thin">
                {/* Table & Guest Selector */}
                <div className="p-4 rounded-2xl bg-white/5 border border-[#C9A86A]/30 space-y-3">
                  <label className="text-[11px] font-bold text-[#C9A86A] uppercase tracking-widest block">
                    {lang === 'bn' ? 'টেবিল নম্বর সিলেক্ট করুন' : 'SELECT TABLE / LOCATION'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={orderTableNumber}
                      onChange={(e) => setOrderTableNumber(e.target.value)}
                      className="bg-[#15162B] text-[#F4E7D3] font-bold text-xs rounded-xl px-3 py-2.5 border border-[#C9A86A]/50 outline-none cursor-pointer focus:border-[#C9A86A]"
                    >
                      <option value="Table 1">🪑 Table 1 (Window)</option>
                      <option value="Table 2">🪑 Table 2 (Starlight)</option>
                      <option value="Table 3">🪑 Table 3 (Garden)</option>
                      <option value="Table 4">🪑 Table 4 (VIP Booth)</option>
                      <option value="Table 5">🪑 Table 5 (Terrace)</option>
                      <option value="Takeaway Counter">🛍️ Takeaway / Counter</option>
                    </select>

                    <input
                      type="text"
                      value={orderCustomerName}
                      onChange={(e) => setOrderCustomerName(e.target.value)}
                      placeholder={lang === 'bn' ? 'গেস্ট এর নাম...' : 'Guest Name (Optional)'}
                      className="bg-[#15162B] text-white text-xs rounded-xl px-3 py-2.5 border border-[#C9A86A]/30 outline-none focus:border-[#C9A86A]"
                    />
                  </div>
                </div>

                {/* Cart Items List */}
                {orderCart.length === 0 ? (
                  <div className="py-16 text-center space-y-3 bg-white/5 rounded-2xl border border-dashed border-[#C9A86A]/20">
                    <ShoppingBag className="w-12 h-12 text-[#C9A86A]/50 mx-auto" />
                    <p className="text-sm font-bold text-[#F4E7D3]">
                      {lang === 'bn' ? 'অর্ডারে কোনো খাবার যুক্ত করা হয়নি' : 'Your order tray is currently empty'}
                    </p>
                    <p className="text-xs text-white/50">
                      {lang === 'bn' ? 'মেনু থেকে খাবারের "Order" বাটনে ক্লিক করুন' : 'Click "Order" on menu cards to add items.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                      {lang === 'bn' ? 'অর্ডারকৃত আইটেমসমূহ:' : 'ORDERED ITEMS'}
                    </span>
                    {orderCart.map((item) => (
                      <div key={item.dish.id} className="p-3.5 rounded-2xl bg-white/5 border border-[#C9A86A]/30 flex items-center justify-between gap-3">
                        <img src={item.dish.img} alt={item.dish.title} className="w-14 h-14 rounded-xl object-cover bg-black/60 shrink-0 border border-[#C9A86A]/30" />
                        
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#F4E7D3] truncate">{item.dish.title}</h4>
                          <p className="text-[11px] text-[#C9A86A] font-mono font-bold">{formatPrice(item.dish.price)}</p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.dish.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold font-mono text-[#F4E7D3] w-5 text-center">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.dish.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCartItem(item.dish.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 cursor-pointer ml-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Special Instructions Input */}
                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-[#C9A86A] uppercase tracking-wider block mb-1">
                        {lang === 'bn' ? 'বিশেষ বার্তা / রিকোয়েস্ট' : 'SPECIAL INSTRUCTIONS'}
                      </label>
                      <input
                        type="text"
                        value={orderSpecialNotes}
                        onChange={(e) => setOrderSpecialNotes(e.target.value)}
                        placeholder={lang === 'bn' ? 'যেমন: চিনি কম, এক্সট্রা হট...' : 'e.g. Less sugar, extra hot, oat milk...'}
                        className="w-full bg-white/5 border border-[#C9A86A]/30 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#C9A86A]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Checkout */}
              {orderCart.length > 0 && (
                <div className="p-5 border-t border-[#C9A86A]/30 bg-[#111222] space-y-3">
                  <div className="flex justify-between items-center text-xs text-white/70">
                    <span>{lang === 'bn' ? 'আইটেম মোট:' : 'Subtotal:'}</span>
                    <span className="font-mono font-bold text-[#F4E7D3]">
                      {formatPrice(orderCart.reduce((sum, item) => sum + (item.dish.price * item.qty), 0))}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold text-white pt-1 border-t border-white/10">
                    <span>{lang === 'bn' ? 'সর্বমোট প্রদেয় বিল:' : 'Total Payable:'}</span>
                    <span className="font-mono text-lg text-[#C9A86A] font-black">
                      {formatPrice(orderCart.reduce((sum, item) => sum + (item.dish.price * item.qty), 0))}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmOrder}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-stone-950" />
                    <span>{lang === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm & Send Order to Kitchen'}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* ORDER CONFIRMATION & LIVE TRACKER MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {orderSuccessModalOpen && latestPlacedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setOrderSuccessModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#15162B] text-white border-2 border-[#C9A86A] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#C9A86A] uppercase tracking-widest block">
                  ORDER CONFIRMED • {latestPlacedOrder.id}
                </span>
                <h3 className="text-2xl font-bold text-[#F4E7D3] font-serif">
                  {lang === 'bn' ? 'অর্ডার সফলভাবে গ্রহন করা হয়েছে!' : 'Order Sent to Kitchen!'}
                </h3>
                <p className="text-xs text-white/70 font-light">
                  {lang === 'bn' ? 'আপনার টেবিলে বারিস্তা খাবার পরিবেশন করবে।' : `Thank you! Your order for ${latestPlacedOrder.table} is being prepared.`}
                </p>
              </div>

              {/* Status Tracker Steps */}
              <div className="p-4 rounded-2xl bg-white/5 border border-[#C9A86A]/30 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Order Received</h4>
                    <p className="text-[10px] text-white/50">{latestPlacedOrder.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C9A86A] text-stone-950 font-black text-xs flex items-center justify-center animate-pulse">☕</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#C9A86A]">Barista Brewing & Crafting</h4>
                    <p className="text-[10px] text-white/50">Est. 8-12 mins</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center">🛎️</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Served to Table</h4>
                    <p className="text-[10px] text-white/50">{latestPlacedOrder.table}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#C9A86A]/20">
                <span className="text-white/70">Total Bill:</span>
                <span className="font-mono text-base font-black text-[#C9A86A]">
                  {formatPrice(latestPlacedOrder.totalAmount, latestPlacedOrder.currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOrderSuccessModalOpen(false)}
                className="w-full py-3 rounded-xl bg-[#C9A86A] hover:bg-[#b89557] text-[#15162B] font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                {lang === 'bn' ? 'ঠিক আছে (মেনুতে ফিরুন)' : 'Back to Menu'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3 rounded-2xl bg-amber-500 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl border-2 border-amber-300 flex items-center gap-2.5 pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* FLOATING SCROLL TO TOP BUTTON (Matching User's Screenshot 2) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isScrolled && (
          <div className={
            deviceView === 'mobile' || (!deviceView && isMobile)
              ? "sticky bottom-3.5 flex justify-end px-3 pointer-events-none z-50 -mt-12 w-full"
              : deviceView === 'tablet'
              ? "sticky bottom-5 flex justify-end px-4 sm:px-6 pointer-events-none z-50 -mt-16 w-full"
              : "fixed bottom-6 right-6 z-[99999]"
          }>
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className={
                isMobile
                  ? "w-8 h-8 rounded-full bg-[#DE9E93] hover:bg-[#d68f83] text-[#171522] flex items-center justify-center shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer border border-[#DE9E93]/40 pointer-events-auto"
                  : "w-12 h-12 rounded-2xl bg-[#DE9E93] hover:bg-[#d68f83] text-[#171522] flex items-center justify-center shadow-2xl hover:-translate-y-1 active:scale-95 transition-all cursor-pointer border border-[#DE9E93]/40 pointer-events-auto"
              }
              aria-label="Scroll to top"
              title={lang === 'bn' ? 'উপরে যান' : 'Scroll to top'}
            >
              <ChevronUp className={isMobile ? "w-4 h-4 stroke-[2.5]" : "w-6 h-6 stroke-[2.5]"} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
