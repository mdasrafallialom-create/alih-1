import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Sparkles, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, Play, Pause, ShoppingBag, ArrowUpRight, 
  Menu, X, Heart, Shield, QrCode, Check, Compass, Search, Bell,
  Award, ChefHat, Utensils, Wine, Gem, Users, CheckCircle2
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import { CAFE_HERO_PRESETS } from '../../data/cafeHeroPresets';
import FooterAndLocation from '../FooterAndLocation';
import { KoppeeHeroHeader } from './KoppeeHeroHeader';
import { KoppeeAboutSection } from './KoppeeAboutSection';
import { KoppeeDeliverySection } from './KoppeeDeliverySection';
import { KoppeeFooterSection } from './KoppeeFooterSection';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';

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
  isChefSpecial?: boolean;
}

interface VelmoraDiningThemeProps {
  brandName?: string;
  tagline?: string;
  dishes?: FoodItem[];
  fontDisplay?: string;
  fontBody?: string;
  primaryColor?: string;
  onOrderDish?: (dish: FoodItem) => void;
  onOpenAdmin?: () => void;
  onBack?: () => void;
  settings?: any;
  lang?: string;
  themePresetId?: string;
}

export interface ThemePageConfig {
  pageBgStyle: React.CSSProperties;
  accentColor: string;
  accentGradient: string;
  cardBg: string;
  cardBorderClass: string;
  cardHoverGlowClass: string;
  badgeBgClass: string;
  repertoireTag: string;
}

export const THEME_PAGE_CONFIGS: Record<string, ThemePageConfig> = {
  'lumivelle': {
    pageBgStyle: {
      backgroundColor: '#120a06',
      backgroundImage: `linear-gradient(to bottom, rgba(18, 10, 6, 0.78), rgba(10, 6, 3, 0.88)), url('${roastedCoffeeBeansBg}')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#F59E0B',
    accentGradient: 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-stone-950',
    cardBg: 'bg-[#18120b]/90',
    cardBorderClass: 'border-amber-500/25 hover:border-amber-400',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    badgeBgClass: 'bg-amber-500 text-stone-950',
    repertoireTag: '🔥 — HEARTHFIRE BAKERY & ROASTED BEANS —',
  },
  'garnivelle': {
    pageBgStyle: {
      backgroundColor: '#180812',
      backgroundImage: `linear-gradient(to bottom, rgba(35, 12, 28, 0.85), rgba(18, 5, 15, 0.92)), url('https://images.unsplash.com/photo-1534778101976-62847782c213?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#F472B6',
    accentGradient: 'bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white',
    cardBg: 'bg-[#230d1a]/90',
    cardBorderClass: 'border-pink-400/30 hover:border-pink-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]',
    badgeBgClass: 'bg-pink-500 text-white',
    repertoireTag: '🌸 — ROYAL PEARL TEA ROOM & ROSE LATTE —',
  },
  'couravelle': {
    pageBgStyle: {
      backgroundColor: '#1c1608',
      backgroundImage: `linear-gradient(to bottom, rgba(28, 20, 8, 0.82), rgba(14, 10, 4, 0.9)), url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#FACC15',
    accentGradient: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-stone-950',
    cardBg: 'bg-[#1a1408]/90',
    cardBorderClass: 'border-yellow-400/30 hover:border-yellow-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(250,204,21,0.25)]',
    badgeBgClass: 'bg-yellow-400 text-stone-950',
    repertoireTag: '🏛️ — FRENCH COURTYARD & TERRACE —',
  },
  'maison-virelle': {
    pageBgStyle: {
      backgroundColor: '#1a1006',
      backgroundImage: `linear-gradient(to bottom, rgba(28, 16, 8, 0.82), rgba(16, 9, 4, 0.9)), url('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#F59E0B',
    accentGradient: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-stone-950',
    cardBg: 'bg-[#20140a]/90',
    cardBorderClass: 'border-amber-400/30 hover:border-amber-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    badgeBgClass: 'bg-amber-500 text-stone-950',
    repertoireTag: '🥐 — ORGANIC SOURDOUGH & HONEY BREWS —',
  },
  'amberelle': {
    pageBgStyle: {
      backgroundColor: '#200c06',
      backgroundImage: `linear-gradient(to bottom, rgba(32, 12, 6, 0.85), rgba(18, 6, 3, 0.92)), url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#EA580C',
    accentGradient: 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white',
    cardBg: 'bg-[#240e08]/90',
    cardBorderClass: 'border-orange-500/30 hover:border-orange-400',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(234,88,12,0.3)]',
    badgeBgClass: 'bg-orange-600 text-white',
    repertoireTag: '☕ — TUSCAN MAHOGANY ESPRESSO BAR —',
  },
  'harvessa': {
    pageBgStyle: {
      backgroundColor: '#0e0a1e',
      backgroundImage: `linear-gradient(to bottom, rgba(20, 12, 38, 0.88), rgba(10, 5, 20, 0.94)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#F43F5E',
    accentGradient: 'bg-gradient-to-r from-rose-500 via-pink-600 to-red-600 text-white',
    cardBg: 'bg-[#18102a]/90',
    cardBorderClass: 'border-rose-400/30 hover:border-rose-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]',
    badgeBgClass: 'bg-rose-500 text-white',
    repertoireTag: '✨ — CHAMPAGNE ROSE & STARLIGHT NIGHT —',
  },
  'ivoria-dining': {
    pageBgStyle: {
      backgroundColor: '#1c1008',
      backgroundImage: `linear-gradient(to bottom, rgba(28, 16, 10, 0.85), rgba(14, 8, 4, 0.92)), url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#D97706',
    accentGradient: 'bg-gradient-to-r from-amber-600 via-orange-600 to-stone-800 text-white',
    cardBg: 'bg-[#22130a]/90',
    cardBorderClass: 'border-amber-500/30 hover:border-amber-400',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(217,119,6,0.3)]',
    badgeBgClass: 'bg-amber-600 text-white',
    repertoireTag: '🏔️ — ALPINE TIMBER FIREPLACE & HAZELNUT —',
  },
  'olivara': {
    pageBgStyle: {
      backgroundColor: '#061c12',
      backgroundImage: `linear-gradient(to bottom, rgba(8, 32, 20, 0.88), rgba(4, 18, 10, 0.94)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#10B981',
    accentGradient: 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-stone-950',
    cardBg: 'bg-[#082216]/90',
    cardBorderClass: 'border-emerald-400/30 hover:border-emerald-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    badgeBgClass: 'bg-emerald-500 text-stone-950',
    repertoireTag: '🌿 — BOTANICAL GLASSHOUSE & ICED MATCHA —',
  },
  'embrelune': {
    pageBgStyle: {
      backgroundColor: '#041824',
      backgroundImage: `linear-gradient(to bottom, rgba(6, 28, 40, 0.88), rgba(2, 14, 20, 0.94)), url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#06B6D4',
    accentGradient: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 text-stone-950',
    cardBg: 'bg-[#062030]/90',
    cardBorderClass: 'border-teal-400/30 hover:border-teal-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
    badgeBgClass: 'bg-cyan-500 text-stone-950',
    repertoireTag: '🧊 — CRYSTAL GLASS & NITRO COLD BREW —',
  },
  'crimsera': {
    pageBgStyle: {
      backgroundColor: '#240a10',
      backgroundImage: `linear-gradient(to bottom, rgba(38, 10, 16, 0.88), rgba(20, 4, 8, 0.94)), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#E11D48',
    accentGradient: 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white',
    cardBg: 'bg-[#260a12]/90',
    cardBorderClass: 'border-rose-400/30 hover:border-rose-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(225,29,72,0.35)]',
    badgeBgClass: 'bg-rose-600 text-white',
    repertoireTag: '🌅 — MEDITERRANEAN COASTAL SUNSET —',
  }
};

export const VELMORA_PALETTE = {
  deepObsidian: '#090805',
  richGold: '#D4AF37',
  lightChampagne: '#FBF8EE',
  mutedGold: '#9E8233',
  darkSurface: '#14120B',
  royalBurgundy: '#6B1724',
  borderGold: 'rgba(212, 175, 55, 0.25)',
};

const VELMORA_HERO_SLIDES = [
  {
    id: 1,
    number: '01',
    eyebrow: 'MICHELIN THREE STARS 2024–2026',
    heading: 'The Art of Palatial Gastronomy',
    description: 'Where culinary mastery meets regal grandeur. Experience our signature 9-course seasonal degustation curated by World Master Chefs.',
    primaryBtn: 'Reserve Grand Salon',
    secondaryBtn: 'Explore Tasting Menu',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop',
    actionTarget: 'reservation'
  },
  {
    id: 2,
    number: '02',
    eyebrow: 'SOMMELIER GRAND CRU COLLECTION',
    heading: 'Over 1,200 Rare Vintages & Cellars',
    description: 'Hand-selected Bordeaux, Burgundy, and vintage champagnes paired flawlessly with every single palate progression.',
    primaryBtn: 'View Wine Pairing',
    secondaryBtn: 'Book Cellar Tasting',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop',
    actionTarget: 'menu'
  },
  {
    id: 3,
    number: '03',
    eyebrow: 'ROYAL WOOD-FIRED GRILL & ROTISSERIE',
    heading: 'Kagoshima A5 Wagyu & 24K Gold Crust',
    description: 'Dry-aged for 45 days in Himalayan pink salt chambers, finished over artisanal Japanese binchotan charcoal.',
    primaryBtn: 'Discover Cuts',
    secondaryBtn: 'Reserve Chef Table',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1600&auto=format&fit=crop',
    actionTarget: 'menu'
  },
  {
    id: 4,
    number: '04',
    eyebrow: 'IMPERIAL SEAFOOD & CAVIAR CELLAR',
    heading: 'Grand Oscietra & Saffron Thermidor',
    description: 'Wild Caspian Oscietra sturgeon caviar and live Atlantic blue lobster poached in Cognac reduction with white truffles.',
    primaryBtn: 'Explore Seafood',
    secondaryBtn: 'Reserve Alcove',
    img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=1600&auto=format&fit=crop',
    actionTarget: 'menu'
  }
];

export const DEFAULT_VELMORA_DISHES: FoodItem[] = [
  { 
    id: 'vm-1', 
    title: '24K Edible Gold Wagyu Tomahawk', 
    price: 135.00, 
    calories: '680 kcal', 
    desc: 'Himalayan salt dry-aged 45-day Prime Ribeye wrapped in 24K edible gold leaf, served with black Périgord truffle jus.', 
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop', 
    category: 'steaks', 
    isPopular: true,
    isChefSpecial: true
  },
  { 
    id: 'vm-2', 
    title: 'Royal Saffron Lobster Thermidor', 
    price: 78.00, 
    calories: '540 kcal', 
    desc: 'Live Atlantic lobster tail poached in Cognac saffron reduction with Gruyère gratin and caviar pearls.', 
    img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop', 
    category: 'seafood', 
    isPopular: true 
  },
  { 
    id: 'vm-3', 
    title: 'Oscietra Royal Caviar & Blinis', 
    price: 95.00, 
    calories: '220 kcal', 
    desc: 'Grand Reserve Oscietra sturgeon caviar served on warm buckwheat blinis with crème fraîche and chives.', 
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop', 
    category: 'caviar', 
    isPopular: true 
  },
  { 
    id: 'vm-4', 
    title: 'Pan-Seared Hokkaido Scallops', 
    price: 46.00, 
    calories: '280 kcal', 
    desc: 'Colossal wild scallops, cauliflower silk purée, crispy Jamón Ibérico chips and white truffle oil.', 
    img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&auto=format&fit=crop', 
    category: 'seafood', 
    isChefSpecial: true 
  },
  { 
    id: 'vm-5', 
    title: 'Black Périgord Truffle Tagliolini', 
    price: 42.00, 
    calories: '490 kcal', 
    desc: 'Hand-rolled 30-yolk pasta tossed in 36-month aged Parmigiano-Reggiano emulsion and freshly shaved black truffles.', 
    img: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop', 
    category: 'pasta', 
    isVegetarian: true, 
    isPopular: true 
  },
  { 
    id: 'vm-6', 
    title: 'Château Smoked Duck Breast', 
    price: 52.00, 
    calories: '480 kcal', 
    desc: 'Dry-aged Barbary duck breast smoked with grapevine cuttings, sour cherry glaze and parsnip mousseline.', 
    img: 'https://images.unsplash.com/photo-1514944298352-78d123e4299b?w=600&auto=format&fit=crop', 
    category: 'steaks' 
  },
  { 
    id: 'vm-7', 
    title: 'Grand Cru Valrhona Chocolate Soufflé', 
    price: 24.00, 
    calories: '360 kcal', 
    desc: '70% Guanaja dark chocolate molten soufflé, served tableside with Madagascar Bourbon vanilla crème anglaise.', 
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop', 
    category: 'desserts', 
    isPopular: true 
  },
  { 
    id: 'vm-8', 
    title: 'Golden Honey Velvet Sphere', 
    price: 26.00, 
    calories: '310 kcal', 
    desc: 'Manuka honey mousse encased in a delicate blown sugar sphere with edible gold dust and raspberry coulis.', 
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop', 
    category: 'desserts', 
    isChefSpecial: true 
  }
];

export default function VelmoraDiningTheme({
  brandName = 'VELMORA DINING',
  tagline = 'Palatial Gastronomy & Fine Dining',
  dishes = [],
  fontDisplay,
  fontBody,
  primaryColor = '#D4AF37',
  onOrderDish,
  onOpenAdmin,
  onBack,
  settings,
  lang = 'en',
  themePresetId
}: VelmoraDiningThemeProps) {
  // State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQrMenuModal, setShowQrMenuModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDishDetail, setSelectedDishDetail] = useState<FoodItem | null>(null);
  
  // Reservation Modal
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resGuests, setResGuests] = useState('2');
  const [resDate, setResDate] = useState('2026-09-20');
  const [resTime, setResTime] = useState('19:30');
  const [resSalon, setResSalon] = useState('Grand Royal Ballroom');

  // Search & secret code
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Marquee pause-on-hover state
  const [isChefHovered, setIsChefHovered] = useState(false);

  // Chef section visibility logic: Controlled by theme admin settings
  const isChefSectionVisible = settings?.themeShowChefSection !== false;
  const rawChefs: ChefProfile[] = (settings?.chefProfiles && settings.chefProfiles.length > 0)
    ? settings.chefProfiles
    : DEFAULT_CHEF_PROFILES;
  const chefs = rawChefs.slice(0, 6);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slide autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % VELMORA_HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const effectiveDishes = (dishes && dishes.length > 0) ? dishes : DEFAULT_VELMORA_DISHES;

  const categories = [
    { id: 'all', label: 'Full Gastronomy' },
    { id: 'caviar', label: 'Caviar & Starters' },
    { id: 'seafood', label: 'Oceanic & Crustacean' },
    { id: 'steaks', label: 'Prime Wagyu & Cuts' },
    { id: 'pasta', label: 'Handmade Pasta' },
    { id: 'desserts', label: 'Palatial Desserts' },
  ];

  const filteredDishes = activeCategory === 'all' 
    ? effectiveDishes 
    : effectiveDishes.filter(d => 
        (d.category && d.category.toLowerCase().includes(activeCategory)) || 
        d.title.toLowerCase().includes(activeCategory)
      );

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSuccess(true);
    setTimeout(() => {
      setReservationSuccess(false);
      setReservationModalOpen(false);
      setResName('');
      setResPhone('');
    }, 3000);
  };

  const handleSearchCheck = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '8520' || text.trim().toLowerCase() === 'admin8520') {
      if (onOpenAdmin) onOpenAdmin();
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const activePresetId = themePresetId || settings?.activeThemeId || 'lumivelle';
  const pageCfg = THEME_PAGE_CONFIGS[activePresetId] || THEME_PAGE_CONFIGS['lumivelle'];

  return (
    <div 
      className="w-full min-h-screen text-[#FBF8EE] selection:bg-[#DA9F93]/30 selection:text-white outline-none"
      style={{
        ...pageCfg.pageBgStyle,
        fontFamily: fontBody || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* 1. KOPPEE HERO HEADER WITH COFFEE BEANS & CAROUSEL */}
      {/* ========================================================= */}
      <section id="hero">
        <KoppeeHeroHeader
          brandName={brandName || settings?.brandName || 'KOPPEE'}
          heroTitle={settings?.heroTitle || settings?.hero?.title}
          heroSubtitle={settings?.heroSubtitle || settings?.hero?.subtitle}
          heroBackgroundImage={settings?.heroBackgroundImage || settings?.hero?.backgroundImage}
          heroSlides={(themePresetId && CAFE_HERO_PRESETS[themePresetId]) || (settings?.activeThemeId && CAFE_HERO_PRESETS[settings.activeThemeId]) || settings?.heroSlides}
          onReserveClick={() => setReservationModalOpen(true)}
          onMenuClick={() => {
            const el = document.getElementById('tasting-menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAdmin={onOpenAdmin}
          onBack={onBack}
          showAdminButton={settings?.showAdminButton !== false}
          lang={lang}
          themePresetId={activePresetId}
        />
      </section>

      {/* ========================================================= */}
      {/* 2. KOPPEE ABOUT US SECTION WITH TORN PAPER DIVIDER */}
      {/* ========================================================= */}
      <KoppeeAboutSection
        brandName={brandName || settings?.brandName || 'KOPPEE'}
        aboutUsTitle={settings?.aboutUsTitle || settings?.hero?.title}
        aboutUsSubtitle={settings?.aboutUsSubtitle || 'ABOUT US'}
        aboutUsText={settings?.aboutUsText || settings?.brandStory}
        aboutUsImage={settings?.aboutUsImage || settings?.hero?.backgroundImage}
        aboutUsFeatures={settings?.aboutUsFeatures}
        onReserveClick={() => setReservationModalOpen(true)}
        onMenuClick={() => {
          const el = document.getElementById('tasting-menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
        themePresetId={activePresetId}
      />

      {/* ========================================================= */}
      {/* 3. TASTING MENU & GOURMET CULINARY SHOWCASE */}
      {/* ========================================================= */}
      <section id="tasting-menu" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase block" style={{ color: pageCfg.accentColor }}>
            {pageCfg.repertoireTag}
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF8EE]"
            style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
          >
            Haute Cuisine & Tasting Courses
          </h2>
          <p className="text-sm text-[#FBF8EE]/70 font-light">
            Every dish is an architectural composition of rare seasonal provenance, wild herbs, and culinary precision.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? `${pageCfg.accentGradient} shadow-lg scale-105`
                  : 'bg-[#14120B] border border-white/20 text-[#FBF8EE]/80 hover:border-white/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group ${pageCfg.cardBg} rounded-2xl border ${pageCfg.cardBorderClass} overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${pageCfg.cardHoverGlowClass}`}
            >
              {/* Dish Image */}
              <div className="relative h-56 overflow-hidden bg-black/40">
                <img 
                  src={dish.img} 
                  alt={dish.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {dish.isChefSpecial && (
                    <span className="px-2.5 py-1 rounded-full bg-[#6B1724] text-white text-[9px] font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1 shadow-md">
                      <Crown className="w-2.5 h-2.5 text-[#D4AF37]" />
                      Chef Special
                    </span>
                  )}
                  {dish.isPopular && (
                    <span className={`px-2.5 py-1 rounded-full ${pageCfg.badgeBgClass} text-[9px] font-bold uppercase tracking-wider shadow-md`}>
                      Signature
                    </span>
                  )}
                </div>

                {/* Calories */}
                {dish.calories && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[10px] text-[#F3E5AB] font-mono border border-white/10">
                    {dish.calories}
                  </span>
                )}
              </div>

              {/* Dish Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      className="font-bold text-lg text-[#FBF8EE] transition-colors line-clamp-1"
                      style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                    >
                      {dish.title}
                    </h3>
                    <span className="font-mono font-bold text-base shrink-0" style={{ color: pageCfg.accentColor }}>
                      ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#FBF8EE]/70 line-clamp-2 leading-relaxed">
                    {dish.desc}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => setSelectedDishDetail(dish)}
                    className="py-2 rounded-xl bg-black/40 border border-white/20 text-[#FBF8EE] text-[11px] font-bold uppercase tracking-wider hover:border-white/50 transition-colors text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      if (onOrderDish) onOrderDish(dish);
                    }}
                    className={`py-2 rounded-xl ${pageCfg.accentGradient} text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-1`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GRAND EXECUTIVE CHEF SECTION (HORIZONTAL CONTINUOUS MARQUEE ON CREAM-WHITE) */}
      {/* ========================================================= */}
      {isChefSectionVisible && (
        <section id="chefs" className="py-16 sm:py-24 bg-[#FFFBF2] border-y border-[#DA9F93]/30 scroll-mt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#B8860B] uppercase flex items-center justify-center gap-2">
                <ChefHat className="w-4 h-4 text-[#B8860B]" />
                {lang === 'bn' ? '— রাজকীয় রন্ধনশিল্পী ও মাস্টার শেফ —' : '— MAESTROS OF THE PALACE —'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2C1810]"
                style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
              >
                {lang === 'bn' ? 'এক্সিকিউটিভ শেফ ও কালিনারি মাস্টার্স' : 'Executive Chefs & Master Sommeliers'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4033]/80 max-w-xl mx-auto font-medium">
                {lang === 'bn'
                  ? 'আন্তর্জাতিক রন্ধনশিল্পের অনন্য স্বাদ ও রাজকীয় পরিবেশনার পেছনের কারিগরগণ।'
                  : 'Where culinary mastery meets regal grandeur curated by world-renowned gastronomy masters.'}
              </p>
            </div>
          </div>

          {/* Continuous Auto-Scrolling Horizontal Marquee with Pause on Hover */}
          <div 
            className="mt-12 relative w-full overflow-hidden marquee-container py-4 select-none"
            onMouseEnter={() => setIsChefHovered(true)}
            onMouseLeave={() => setIsChefHovered(false)}
            onTouchStart={() => setIsChefHovered(true)}
            onTouchEnd={() => setIsChefHovered(false)}
          >
            {/* Soft Edge Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#FFFBF2] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#FFFBF2] to-transparent" />

            {/* Marquee Track: duplicated to guarantee seamless continuous infinite loop */}
            <div 
              className="animate-marquee-track flex gap-6 px-4"
              style={{
                animationPlayState: isChefHovered ? 'paused' : 'running'
              }}
            >
              {[...chefs, ...chefs].map((chef, idx) => (
                <div 
                  key={`${chef.id || idx}-${idx}`}
                  className="w-[340px] sm:w-[380px] md:w-[410px] shrink-0 bg-white p-6 rounded-2xl border border-[#DA9F93]/30 hover:border-[#B8860B] flex flex-col justify-between gap-5 shadow-lg shadow-[#2C1810]/5 hover:shadow-2xl hover:shadow-[#B8860B]/15 transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img 
                          src={chef.image} 
                          alt={chef.name} 
                          className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-2 border-[#D4AF37] shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center text-xs font-black shadow">
                          ★
                        </div>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#DA9F93]/20 text-[#8C584B] text-[10px] font-bold tracking-widest uppercase inline-block truncate max-w-full">
                          {chef.role}
                        </span>
                        <h3 
                          className="text-lg font-bold text-slate-900 group-hover:text-[#B8860B] transition-colors truncate"
                          style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                        >
                          {chef.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 text-xs">
                          {'★'.repeat(Math.min(5, Math.round(chef.rating || 5)))}
                          <span className="text-[11px] text-slate-500 ml-1">({chef.rating?.toFixed(1) || '5.0'})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {chef.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DA9F93]/20 flex items-center justify-between text-[11px]">
                    <span className="text-[#8C584B] font-bold truncate">
                      ★ {chef.speciality || (chef as any).specialty || 'Master Gastronomy'}
                    </span>
                    {chef.experienceYears && (
                      <span className="text-slate-500 text-[10px] shrink-0 font-mono ml-2">
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
      {/* EXPRESS DELIVERY & CASH ON DELIVERY (COD) SYSTEM SECTION */}
      {/* ========================================================= */}
      <KoppeeDeliverySection
        brandName={brandName || settings?.brandName || 'KOPPEE'}
        lang={lang}
        themePresetId={activePresetId}
      />

      {/* ========================================================= */}
      {/* 5. KOPPEE FOOTER SECTION WITH TORN PAPER EDGE & COFFEE BEANS */}
      {/* ========================================================= */}
      <section id="location">
        <KoppeeFooterSection
          brandName={brandName || settings?.brandName || 'askul'}
          brandLogoUrl={settings?.brandLogoUrl}
          brandDescription={settings?.aboutUsText || settings?.brandDescription}
          brandLocation={settings?.brandLocation}
          contactPhone={settings?.contactPhone}
          contactWhatsapp={settings?.contactWhatsapp}
          contactEmail={settings?.contactEmail}
          timingOpen={settings?.timingOpen}
          timingClose={settings?.timingClose}
          socialLinks={settings?.socialLinks}
          showGoogleMap={settings?.showGoogleMap !== false}
          lang={lang}
          themePresetId={activePresetId}
        />
      </section>

      {/* ========================================================= */}
      {/* 7. INTERACTIVE QR MENU MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showQrMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#14120B] border border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl shadow-[#D4AF37]/20"
            >
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                  <h3 
                    className="text-xl font-bold text-[#FBF8EE]"
                    style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                  >
                    Velmora Table QR Menu
                  </h3>
                </div>
                <button
                  onClick={() => setShowQrMenuModal(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FBF8EE]/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code Illustration & Fast Order Note */}
              <div className="p-4 rounded-2xl bg-[#090805] border border-[#D4AF37]/30 text-center space-y-2">
                <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-black" />
                </div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Scan for Instant Table Ordering
                </span>
                <p className="text-[11px] text-[#FBF8EE]/60">
                  Point your mobile camera at this card to browse & order directly to your table salon.
                </p>
              </div>

              {/* Dish List in QR Menu */}
              <div className="space-y-3 divide-y divide-[#D4AF37]/15 max-h-60 overflow-y-auto pr-1">
                {effectiveDishes.map((item) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-[#FBF8EE]">{item.title}</h4>
                      <p className="text-[11px] text-[#FBF8EE]/60 line-clamp-1">{item.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-[#D4AF37] block">
                        ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                      </span>
                      <button
                        onClick={() => {
                          if (onOrderDish) onOrderDish(item);
                          setShowQrMenuModal(false);
                        }}
                        className="mt-1 px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#090805] text-[10px] font-bold uppercase"
                      >
                        Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowQrMenuModal(false)}
                className="w-full py-3 rounded-full bg-[#090805] border border-[#D4AF37]/50 text-[#FBF8EE] font-bold text-xs uppercase tracking-wider"
              >
                Close QR Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 8. GRAND SALON RESERVATION MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {reservationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#14120B] border border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl shadow-[#D4AF37]/20"
            >
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <h3 
                    className="text-xl font-bold text-[#FBF8EE]"
                    style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                  >
                    Reserve Grand Salon
                  </h3>
                </div>
                <button
                  onClick={() => setReservationModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FBF8EE]/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reservationSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#FBF8EE]">Reservation Confirmed!</h4>
                  <p className="text-xs text-[#FBF8EE]/70">
                    Your salon reservation has been successfully booked at Velmora Dining. Our Maître d' will greet you upon arrival.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[#D4AF37] uppercase tracking-wider font-semibold block">Guest Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Full Name"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-[#FBF8EE] outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#D4AF37] uppercase tracking-wider font-semibold block">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-[#FBF8EE] outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[#D4AF37] uppercase tracking-wider font-semibold block">Party Size</label>
                      <select
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-3 py-2.5 text-[#FBF8EE] outline-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests (Table Salon)</option>
                        <option value="4">4 Guests (Royal Booth)</option>
                        <option value="6">6 Guests (Private Alcove)</option>
                        <option value="10">10+ Guests (Grand Salon)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#D4AF37] uppercase tracking-wider font-semibold block">Time Slot</label>
                      <select
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-3 py-2.5 text-[#FBF8EE] outline-none"
                      >
                        <option value="18:00">18:00 (Sunset Seating)</option>
                        <option value="19:30">19:30 (Prime Evening)</option>
                        <option value="21:00">21:00 (Late Gastronomy)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#D4AF37] uppercase tracking-wider font-semibold block">Seating Zone</label>
                    <select
                      value={resSalon}
                      onChange={(e) => setResSalon(e.target.value)}
                      className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-3 py-2.5 text-[#FBF8EE] outline-none"
                    >
                      <option value="Grand Royal Ballroom">Grand Royal Ballroom</option>
                      <option value="Sommelier Wine Cellar">Sommelier Private Cellar</option>
                      <option value="Chef Tasting Counter">Chef Tasting Counter</option>
                      <option value="Balcony Terrace">Moonlit Balcony Terrace</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#090805] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:opacity-95 transition-all mt-4"
                  >
                    Confirm Grand Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 9. DISH DETAIL MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedDishDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#14120B] border border-[#D4AF37] rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="relative h-64 bg-black">
                <img 
                  src={selectedDishDetail.img} 
                  alt={selectedDishDetail.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedDishDetail(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 
                      className="text-2xl font-bold text-[#FBF8EE]"
                      style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                    >
                      {selectedDishDetail.title}
                    </h3>
                    <span className="text-xs text-[#D4AF37] font-mono">
                      Category: {selectedDishDetail.category || 'Palatial Selection'}
                    </span>
                  </div>
                  <span className="font-mono text-xl font-bold text-[#D4AF37]">
                    ${typeof selectedDishDetail.price === 'number' ? selectedDishDetail.price.toFixed(2) : selectedDishDetail.price}
                  </span>
                </div>

                <p className="text-sm text-[#FBF8EE]/80 leading-relaxed">
                  {selectedDishDetail.desc}
                </p>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      if (onOrderDish) onOrderDish(selectedDishDetail);
                      setSelectedDishDetail(null);
                    }}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#090805] font-black text-xs uppercase tracking-wider shadow-lg"
                  >
                    Add to Table Order
                  </button>
                  <button
                    onClick={() => setSelectedDishDetail(null)}
                    className="px-6 py-3 rounded-full bg-[#090805] border border-[#D4AF37]/40 text-[#FBF8EE] text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
