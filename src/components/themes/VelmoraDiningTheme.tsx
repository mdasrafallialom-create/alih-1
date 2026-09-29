import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Sparkles, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, ChevronUp, Play, Pause, ShoppingBag, ArrowUpRight, ArrowLeft,
  Menu, X, Heart, Shield, QrCode, Check, Compass, Search, Bell,
  Award, ChefHat, Utensils, Wine, Gem, Users, CheckCircle2,
  Edit3, Plus, Trash2, ArrowUp, ArrowDown, Save, Image as ImageIcon, Sliders
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import { CAFE_HERO_PRESETS } from '../../data/cafeHeroPresets';
import { LUXURY_THEMES } from '../../data/luxuryThemes';
import FooterAndLocation from '../FooterAndLocation';
import { 
  KoppeeHeroHeader, 
  THEME_HERO_CONFIGS, 
  KOPPEE_SLIDES, 
  COFFEE_SHOP_THEME_IDS, 
  LUXURY_DINING_SLIDES,
  LUXURY_ELITE_4_SLIDES,
  LUXURY_PRO_3_SLIDES,
  LUXURY_BASIC_2_SLIDES,
  COFFEE_ELITE_4_SLIDES,
  buildTierSlides
} from './KoppeeHeroHeader';
import { KoppeeAboutSection } from './KoppeeAboutSection';
import { KoppeeDeliverySection } from './KoppeeDeliverySection';
import { KoppeeFooterSection } from './KoppeeFooterSection';
import { OrivelleGeometricDivider } from './OrivelleGeometricDivider';
import { getThemeAdminButtonVisibility, checkAdminPasswordInput } from '../../lib/adminHelpers';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';
import cleanCoffeeBg from '../../assets/images/clean_coffee_bg_1790179641546.jpg';

import caviarDishImg from '../../assets/images/luxury_caviar_dish_1790508696808.jpg';
import wagyuPlatedImg from '../../assets/images/luxury_michelin_dish_1790508680735.jpg';
import dessertSphereImg from '../../assets/images/luxury_dessert_dish_1790508714022.jpg';

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
  previewDeviceView?: 'desktop' | 'tablet' | 'mobile';
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
  'velmora-dining': {
    pageBgStyle: {
      backgroundColor: '#120a06',
      backgroundImage: `linear-gradient(to bottom, rgba(18, 10, 6, 0.85), rgba(10, 6, 3, 0.94)), url('${cleanCoffeeBg}')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#d4a373',
    accentGradient: 'bg-gradient-to-r from-[#d4a373] via-[#c89666] to-[#b37d4e] text-[#1a0f08]',
    cardBg: 'bg-[#180e07]/90',
    cardBorderClass: 'border-[#d4a373]/25 hover:border-[#d4a373]',
    cardHoverGlowClass: 'hover:shadow-[0_0_25px_rgba(212,163,115,0.3)]',
    badgeBgClass: 'bg-[#c89666] text-[#1a0f08]',
    repertoireTag: '☕ — ARTISAN HAND-ROASTED SPECIALTY COFFEE —',
  },
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
  },
  'orivelle-house': {
    pageBgStyle: {
      backgroundColor: '#0a0a0a',
      backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.92), rgba(18, 18, 18, 0.97)), url('https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#e5c158',
    accentGradient: 'bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 text-stone-950 font-black',
    cardBg: 'bg-[#141414]/95 backdrop-blur-md',
    cardBorderClass: 'border-amber-400/40 hover:border-amber-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_35px_rgba(229,193,88,0.4)]',
    badgeBgClass: 'bg-gradient-to-r from-amber-300 to-yellow-500 text-stone-950 font-black',
    repertoireTag: '👑 — 24K GOLD LEAF & PRIVATE SOMMELIER HAUTE CUISINE —',
  },
  'lunavere': {
    pageBgStyle: {
      backgroundColor: '#15162B',
      backgroundImage: `linear-gradient(to bottom, rgba(21, 22, 43, 0.88), rgba(11, 12, 22, 0.95)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#C9A86A',
    accentGradient: 'bg-gradient-to-r from-[#C9A86A] via-[#d6b77b] to-[#a8864b] text-[#120a06]',
    cardBg: 'bg-[#1c1d38]/90 backdrop-blur-md',
    cardBorderClass: 'border-[#9A7BB5]/40 hover:border-[#C9A86A]',
    cardHoverGlowClass: 'hover:shadow-[0_0_30px_rgba(154,123,181,0.35)]',
    badgeBgClass: 'bg-gradient-to-r from-[#9A7BB5] to-[#7B5999] text-white',
    repertoireTag: '✨ — PARISIAN STARLIGHT NIGHT CAFE & SIPHON BREW —',
  },
  'aurelisse': {
    pageBgStyle: {
      backgroundColor: '#1e1b4b',
      backgroundImage: `linear-gradient(to bottom, rgba(30, 27, 75, 0.90), rgba(15, 12, 45, 0.96)), url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#a855f7',
    accentGradient: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-amber-500 text-white',
    cardBg: 'bg-[#2e1065]/85 backdrop-blur-md',
    cardBorderClass: 'border-purple-400/40 hover:border-amber-400',
    cardHoverGlowClass: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]',
    badgeBgClass: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white',
    repertoireTag: '⚜️ — IMPERIAL MONARCH VELVET BANQUET & CAVIAR —',
  },
  'palatiora': {
    pageBgStyle: {
      backgroundColor: '#1c1917',
      backgroundImage: `linear-gradient(to bottom, rgba(28, 25, 23, 0.88), rgba(15, 13, 12, 0.95)), url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#f59e0b',
    accentGradient: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700 text-stone-950',
    cardBg: 'bg-[#292524]/90',
    cardBorderClass: 'border-amber-500/35 hover:border-amber-400',
    cardHoverGlowClass: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]',
    badgeBgClass: 'bg-amber-500 text-stone-950',
    repertoireTag: '🍷 — VINTAGE CELLAR & AGED STEAKHOUSE LOUNGE —',
  },
  'celestique': {
    pageBgStyle: {
      backgroundColor: '#0a1128',
      backgroundImage: `linear-gradient(to bottom, rgba(10, 17, 40, 0.90), rgba(5, 8, 20, 0.96)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#38bdf8',
    accentGradient: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-stone-950',
    cardBg: 'bg-[#0f172a]/90 backdrop-blur-md',
    cardBorderClass: 'border-sky-400/40 hover:border-sky-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.4)]',
    badgeBgClass: 'bg-sky-400 text-stone-950 font-bold',
    repertoireTag: '🌌 — CELESTIAL SAPPHIRE ROOFTOP & SKY LOUNGE —',
  },
  'caravelle-dining': {
    pageBgStyle: {
      backgroundColor: '#081220',
      backgroundImage: `linear-gradient(to bottom, rgba(8, 18, 32, 0.90), rgba(4, 9, 16, 0.96)), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#38bdf8',
    accentGradient: 'bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600 text-white',
    cardBg: 'bg-[#0a1628]/90',
    cardBorderClass: 'border-sky-400/35 hover:border-sky-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]',
    badgeBgClass: 'bg-sky-500 text-white',
    repertoireTag: '🛥️ — ROYAL NAVY & PEARL OCEAN CUISINE —',
  },
  'elvaris-atelier': {
    pageBgStyle: {
      backgroundColor: '#1c080d',
      backgroundImage: `linear-gradient(to bottom, rgba(28, 8, 13, 0.90), rgba(14, 4, 6, 0.96)), url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#e11d48',
    accentGradient: 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white',
    cardBg: 'bg-[#230a10]/90',
    cardBorderClass: 'border-rose-400/35 hover:border-rose-300',
    cardHoverGlowClass: 'hover:shadow-[0_0_30px_rgba(225,29,72,0.35)]',
    badgeBgClass: 'bg-rose-600 text-white',
    repertoireTag: '🍇 — GRAND CRU BORDEAUX & OAK CASKS —',
  },
  'silvarenne': {
    pageBgStyle: {
      backgroundColor: '#121215',
      backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 21, 0.92), rgba(10, 10, 12, 0.97)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#e4e4e7',
    accentGradient: 'bg-gradient-to-r from-zinc-200 via-stone-300 to-zinc-400 text-stone-950 font-black',
    cardBg: 'bg-[#18181c]/95',
    cardBorderClass: 'border-zinc-400/40 hover:border-white',
    cardHoverGlowClass: 'hover:shadow-[0_0_30px_rgba(228,228,231,0.3)]',
    badgeBgClass: 'bg-zinc-200 text-stone-950 font-bold',
    repertoireTag: '⚙️ — POLISHED TITANIUM OBSIDIAN & ESPRESSO —',
  },
  'solvence-chateau': {
    pageBgStyle: {
      backgroundColor: '#120d0a',
      backgroundImage: `linear-gradient(to bottom, rgba(18, 13, 10, 0.90), rgba(10, 7, 5, 0.96)), url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },
    accentColor: '#d97706',
    accentGradient: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white',
    cardBg: 'bg-[#1a130e]/90',
    cardBorderClass: 'border-amber-500/35 hover:border-amber-400',
    cardHoverGlowClass: 'hover:shadow-[0_0_30px_rgba(217,119,6,0.35)]',
    badgeBgClass: 'bg-amber-600 text-white',
    repertoireTag: '🏰 — FRENCH CHATEAU & TRUFFLE CELLAR —',
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
    title: 'Artisan Caramel Macchiato', 
    price: 6.50, 
    calories: '180 kcal', 
    desc: 'Single-origin Arabica espresso with steamed vanilla oat milk & Madagascar caramel drizzle.', 
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop', 
    category: 'coffee', 
    isPopular: true,
    isChefSpecial: true
  },
  { 
    id: 'vm-2', 
    title: 'Pistachio Velvet Cold Brew', 
    price: 5.50, 
    calories: '150 kcal', 
    desc: '24-hour slow-steeped Arabica cold brew topped with sweet pistachio cream foam.', 
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop', 
    category: 'coffee', 
    isPopular: true 
  },
  { 
    id: 'vm-3', 
    title: 'Double Shot Velvet Espresso', 
    price: 4.00, 
    calories: '10 kcal', 
    desc: 'Rich golden crema with notes of dark cocoa, roasted hazelnut & wild honey.', 
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop', 
    category: 'coffee', 
    isPopular: true 
  },
  { 
    id: 'vm-4', 
    title: 'Lavender Starlight Latte', 
    price: 6.00, 
    calories: '190 kcal', 
    desc: 'Espresso infused with French culinary lavender, vanilla bean & silky micro-foam.', 
    img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop', 
    category: 'coffee', 
    isChefSpecial: true 
  },
  { 
    id: 'vm-5', 
    title: 'Spanish Iced Vanilla Latte', 
    price: 5.80, 
    calories: '160 kcal', 
    desc: 'Double shot Arabica espresso layered with sweetened condensed milk, organic vanilla & ice.', 
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop', 
    category: 'coffee', 
    isPopular: true 
  },
  { 
    id: 'vm-6', 
    title: 'Honey Cinnamon Mocha Latte', 
    price: 6.20, 
    calories: '210 kcal', 
    desc: 'Dark Valrhona cacao blended with espresso, steamed milk, organic honey & cinnamon dust.', 
    img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&auto=format&fit=crop', 
    category: 'coffee',
    isChefSpecial: true
  },
  { 
    id: 'vm-7', 
    title: 'Affogato Peak Vanilla Espresso', 
    price: 5.50, 
    calories: '220 kcal', 
    desc: 'Double shot hot espresso poured over Madagascar vanilla bean gelato & crushed cacao nibs.', 
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop', 
    category: 'coffee'
  },
  { 
    id: 'vm-8', 
    title: 'Nitro Cascade Cream Cold Brew', 
    price: 6.00, 
    calories: '120 kcal', 
    desc: 'Nitrogen-infused slow brew with velvety cascading foam, vanilla whip & roasted cocoa.', 
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop', 
    category: 'coffee',
    isPopular: true
  },
  { 
    id: 'vm-9', 
    title: 'Royal Siphon Yirgacheffe Brew', 
    price: 7.00, 
    calories: '15 kcal', 
    desc: 'Single-origin Ethiopian Yirgacheffe vacuum-extracted through a glass siphon with jasmine floral notes.', 
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop', 
    category: 'coffee',
    isChefSpecial: true
  },
  { 
    id: 'vm-10', 
    title: 'Hazelnut Dark Roast Iced Latte', 
    price: 5.90, 
    calories: '170 kcal', 
    desc: 'Roasted hazelnut reduction with espresso & chilled almond milk over artisanal crystal ice.', 
    img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop', 
    category: 'coffee'
  }
];

const ORIVELLE_NOIR_DISHES: FoodItem[] = [
  { 
    id: 'or-1', 
    title: 'Oscietra Caviar & 24k Gold Carpaccio', 
    price: 110.00, 
    calories: '210 kcal', 
    desc: 'Grand Reserve Oscietra sturgeon caviar atop smoked sea scallop carpaccio with 24k edible gold leaf flecks and micro borage flowers.', 
    img: caviarDishImg, 
    category: 'caviar', 
    isPopular: true 
  },
  { 
    id: 'or-2', 
    title: 'Pan-Seared Wild Hokkaido Scallops', 
    price: 58.00, 
    calories: '290 kcal', 
    desc: 'Colossal wild scallops, cauliflower silk purée, Jamón Ibérico crisp and white truffle oil emulsion.', 
    img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop', 
    category: 'seafood', 
    isChefSpecial: true 
  },
  { 
    id: 'or-3', 
    title: 'A5 Miyazaki Wagyu Ribeye & Périgord Truffle', 
    price: 145.00, 
    calories: '680 kcal', 
    desc: 'Miyazaki A5 Wagyu tenderloin with black Périgord winter truffle shavings, red wine reduction and smoked Maldon 24k gold salt.', 
    img: wagyuPlatedImg, 
    category: 'steaks', 
    isPopular: true 
  },
  { 
    id: 'or-4', 
    title: 'Black Périgord Truffle Tagliolini', 
    price: 54.00, 
    calories: '490 kcal', 
    desc: '30-yolk fresh hand-rolled pasta tossed in 36-month aged Parmigiano-Reggiano emulsion and shaved black truffles.', 
    img: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281328?w=800&auto=format&fit=crop', 
    category: 'pasta', 
    isVegetarian: true, 
    isChefSpecial: true 
  },
  { 
    id: 'or-5', 
    title: 'Château Smoked Barbary Duck Breast', 
    price: 62.00, 
    calories: '510 kcal', 
    desc: 'Dry-aged duck breast smoked over French grapevine woods with sour cherry glaze and parsnip mousseline.', 
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop', 
    category: 'steaks' 
  },
  { 
    id: 'or-6', 
    title: '24k Gold Valrhona Caramel Sphere', 
    price: 32.00, 
    calories: '380 kcal', 
    desc: '70% Guanaja dark chocolate sphere with warm molten salted caramel, edible 24k gold flakes and smoked vanilla gelato.', 
    img: dessertSphereImg, 
    category: 'desserts', 
    isPopular: true 
  }
];

const DEFAULT_LUNAVERE_DISHES: FoodItem[] = [
  { id: 'lun-1', title: 'Parisian Siphon Brew & Gold Flakes', price: 9.50, calories: '40 kcal', desc: 'Single-origin Ethiopian Yirgacheffe slow-brewed through a glass siphon, infused with edible gold dust.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: 'lun-2', title: 'Vanilla Bean Brioche French Toast', price: 14.00, calories: '320 kcal', desc: 'Thick cut brioche soaked in Madagascar vanilla custard, caramelized figs & organic maple drizzle.', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&auto=format&fit=crop', category: 'brunch', isPopular: true },
  { id: 'lun-3', title: 'Saint-Honoré Rose & Raspberry Pastry', price: 8.50, calories: '280 kcal', desc: 'Choux pastry puff filled with rosewater crème chantiily and fresh raspberries on a caramelized puff pastry base.', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop', category: 'desserts', isChefSpecial: true },
  { id: 'lun-4', title: 'Truffled Croque Monsieur', price: 16.50, calories: '510 kcal', desc: 'Toasted sourdough with Parisian ham, aged Gruyère, black truffle bechamel sauce & Dijon mustard.', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop', category: 'brunch' }
];

const AURELISSE_ROYAL_DISHES: FoodItem[] = [
  { id: 'aur-1', title: 'Imperial Caviar & Tartlet Duo', price: 125.00, calories: '240 kcal', desc: 'Beluga caviar served in gold-dusted crisp tartlets with crème fraiche and chives.', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop', category: 'caviar', isPopular: true },
  { id: 'aur-2', title: 'Royal Maine Lobster Thermidor', price: 88.00, calories: '520 kcal', desc: 'Whole poached Atlantic lobster gratinéed with Cognac cream, Gruyère and micro tarragon.', img: 'https://images.unsplash.com/photo-1553240799-36bbf332a5c3?w=600&auto=format&fit=crop', category: 'seafood', isChefSpecial: true },
  { id: 'aur-3', title: 'Monarch Wagyu Chateaubriand', price: 160.00, calories: '720 kcal', desc: 'Center-cut Wagyu tenderloin roast with Périgord truffle jus and roasted heirloom vegetables.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop', category: 'steaks', isPopular: true },
  { id: 'aur-4', title: 'Saffron Royal Carnaroli Risotto', price: 48.00, calories: '440 kcal', desc: 'Acquerello Carnaroli rice infused with Persian saffron, bone marrow butter and 24k leaf.', img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop', category: 'pasta' }
];

const PALATIORA_CELLAR_DISHES: FoodItem[] = [
  { id: 'pal-1', title: '45-Day Dry-Aged Tomahawk Steak', price: 150.00, calories: '950 kcal', desc: 'Prime Black Angus Tomahawk dry-aged in oak salt caves, seared over white oak charcoal.', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop', category: 'steaks', isPopular: true },
  { id: 'pal-2', title: 'Wood-Fired Prime Bone-In Ribeye', price: 85.00, calories: '810 kcal', desc: 'USDA Prime ribeye brushed with roasted garlic marrow butter and Maldon smoked salt.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop', category: 'steaks', isChefSpecial: true },
  { id: 'pal-3', title: 'Cellar Reserve Cabernet Lamb Chops', price: 68.00, calories: '610 kcal', desc: 'Colorado lamb rack glazed with vintage Cabernet reduction and mint herb gremolata.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop', category: 'steaks' }
];

const CELESTIQUE_OCEAN_DISHES: FoodItem[] = [
  { id: 'cel-1', title: 'Celestial Sapphire Seafood Tower', price: 130.00, calories: '420 kcal', desc: 'Chilled oysters, King Crab legs, Jumbo Gulf prawns, and sea urchin with champagne mignonette.', img: 'https://images.unsplash.com/photo-1535567465397-7523840f2ae9?w=600&auto=format&fit=crop', category: 'seafood', isPopular: true },
  { id: 'cel-2', title: 'Wild Chilean Sea Bass en Papillote', price: 64.00, calories: '480 kcal', desc: 'Oven-baked sea bass with lemongrass ginger dashi broth and crisp sea beans.', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop', category: 'seafood', isChefSpecial: true }
];

const OPALUNE_NITRO_DISHES: FoodItem[] = [
  { id: 'opa-1', title: 'Nitrogen Cascade Cold Brew', price: 7.50, calories: '15 kcal', desc: 'Micro-filtered Arabica cold brew charged with liquid nitrogen for a velvet cascading head.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: 'opa-2', title: 'Frost Ice Affogato & Gelato', price: 8.50, calories: '220 kcal', desc: 'Double espresso shot poured over frozen Madagascar vanilla bean gelato & cocoa nibs.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop', category: 'desserts' }
];

const EMBERION_GRILL_DISHES: FoodItem[] = [
  { id: 'emb-1', title: 'Wood-Fired Oak Smoked Prime Ribs', price: 78.00, calories: '880 kcal', desc: 'Slow-smoked St. Louis cut pork ribs glazed with bourbon cherry reduction and jalapeno slaw.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop', category: 'steaks', isPopular: true },
  { id: 'emb-2', title: 'Flame-Seared Neapolitan Truffle Pizza', price: 26.00, calories: '720 kcal', desc: '800°F wood-oven charred sourdough pizza with San Marzano tomatoes, buffalo mozzarella & black truffle.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop', category: 'pizza', isChefSpecial: true }
];

const COURAVELLE_GARDEN_DISHES: FoodItem[] = [
  { id: 'cou-1', title: 'Tuscan Garden Pesto Burrata', price: 22.00, calories: '340 kcal', desc: 'Creamy fresh burrata with heirloom tomatoes, wild basil pesto, pine nuts and aged balsamic glaze.', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop', category: 'starters', isPopular: true },
  { id: 'cou-2', title: 'Hand-Rolled Spinach Ricotta Ravioli', price: 28.00, calories: '410 kcal', desc: 'Fresh pasta parcels filled with sheep milk ricotta, sage brown butter and shaved Parmigiano.', img: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop', category: 'pasta' }
];

const IVORELLE_BISTRO_DISHES: FoodItem[] = [
  { id: 'ivo-1', title: 'Grand Grand Marnier Soufflé Flambé', price: 18.00, calories: '290 kcal', desc: 'Warm airy French soufflé infused with orange liqueur and served with crème anglaise.', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop', category: 'desserts', isPopular: true },
  { id: 'ivo-2', title: 'Champagne Poached Lobster Tail', price: 54.00, calories: '360 kcal', desc: 'Butter-poached cold water lobster tail with saffron tarragon emulsion and potato silk.', img: 'https://images.unsplash.com/photo-1553240799-36bbf332a5c3?w=600&auto=format&fit=crop', category: 'seafood' }
];

const ELVARIS_BORDEAUX_DISHES: FoodItem[] = [
  { id: 'elv-1', title: 'Grand Cru Bordeaux Duck Confit', price: 46.00, calories: '620 kcal', desc: 'Slow-cooked duck leg with crispy skin, Bordeaux wine reduction, and duck-fat roasted fingerlings.', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop', category: 'steaks', isPopular: true },
  { id: 'elv-2', title: 'Dark Cacao & Pinot Noir Truffles', price: 16.00, calories: '210 kcal', desc: 'Valrhona 85% dark chocolate ganache infused with vintage Pinot Noir and cocoa powder.', img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop', category: 'desserts' }
];

const SILVARENNE_TITANIUM_DISHES: FoodItem[] = [
  { id: 'sil-1', title: 'Titanium Espresso Double Shot', price: 4.80, calories: '10 kcal', desc: 'High-pressure extraction of single-origin Colombian beans with velvet golden crema.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: 'sil-2', title: 'Smoked Obsidian Wagyu Tapas Sliders', price: 24.00, calories: '480 kcal', desc: 'Mini brioche buns with seared Wagyu beef patty, truffle mayo & smoked cheddar.', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop', category: 'tapas' }
];

export default function VelmoraDiningTheme({
  brandName = 'My Restaurant',
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
  themePresetId,
  previewDeviceView
}: VelmoraDiningThemeProps) {
  // State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDemoOrPlaceholderBrand = (name?: string) => {
    if (!name) return true;
    const lower = name.trim().toLowerCase();
    return lower === 'sahinsh' || 
           lower === 'askul' || 
           lower === 'koppee' || 
           lower === 'velmora dining' || 
           lower === 'velmora' || 
           lower === 'lunavere' || 
           lower === "l'aura webar restaurant" ||
           lower === 'the golden fork';
  };

  const activePresetId = themePresetId || settings?.activeThemeId || 'velmora-dining';
  const matchedTheme = LUXURY_THEMES.find(t => t.id === activePresetId);

  // Compute effective brand name (never use owner personal name in theme header)
  const effectiveThemeBrandName = (() => {
    const owner = (settings?.ownerName || '').trim().toLowerCase();
    const custom = (brandName || settings?.restaurantName || settings?.brandName || '').trim();
    const lowerCustom = custom.toLowerCase();
    
    // If brandName is empty, demo placeholder, or matches owner's personal name, fallback to preset theme name
    if (!custom || isDemoOrPlaceholderBrand(custom) || (owner && lowerCustom === owner) || lowerCustom === 'md asraful' || lowerCustom === 'mdasrafallialom') {
      return matchedTheme?.name || 'Velmora Dining';
    }
    return custom;
  })();
  // Currency Switcher State: USD ($), GBP (£), BDT (৳), EUR (€)
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'GBP' | 'BDT' | 'EUR'>('USD');
  const CURRENCY_MAP: Record<string, { symbol: string; label: string; rate: number }> = {
    USD: { symbol: '$', label: 'US ($)', rate: 1.0 },
    GBP: { symbol: '£', label: 'UK (£)', rate: 0.78 },
    BDT: { symbol: '৳', label: 'BD (৳)', rate: 118.0 },
    EUR: { symbol: '€', label: 'EU (€)', rate: 0.92 }
  };
  const activeCurrency = CURRENCY_MAP[selectedCurrency] || CURRENCY_MAP.USD;

  const formatPrice = (priceInUsd: number | string) => {
    const num = typeof priceInUsd === 'number' ? priceInUsd : parseFloat(priceInUsd as string) || 0;
    const converted = num * activeCurrency.rate;
    if (selectedCurrency === 'BDT') {
      return `${Math.round(converted)} ${activeCurrency.symbol}`;
    }
    return `${activeCurrency.symbol}${converted.toFixed(2)}`;
  };

  const SAMPLE_COFFEE_IMAGES = [
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64Url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          callback(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [showQrMenuModal, setShowQrMenuModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDishDetail, setSelectedDishDetail] = useState<FoodItem | null>(null);
  const [detailOrderQty, setDetailOrderQty] = useState<number>(1);
  const [detailSpecialNote, setDetailSpecialNote] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Menu Editor Modal State
  const [isMenuEditorOpen, setIsMenuEditorOpen] = useState<boolean>(false);
  const [editingDishes, setEditingDishes] = useState<FoodItem[]>([]);
  const [editingSectionTagline, setEditingSectionTagline] = useState<string>('');
  const [editingSectionTitle, setEditingSectionTitle] = useState<string>('');
  const [editingSectionSubtitle, setEditingSectionSubtitle] = useState<string>('');
  const [editingCategories, setEditingCategories] = useState<{ id: string; label: string }[]>([]);
  const [editorActiveTab, setEditorActiveTab] = useState<'dishes' | 'headings'>('headings');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Single Card Editor & Card Mode
  const [editingSingleDish, setEditingSingleDish] = useState<FoodItem | null>(null);
  const [isCardEditMode, setIsCardEditMode] = useState<boolean>(true);
  const [savedDishIds, setSavedDishIds] = useState<Set<string>>(new Set());

  // About Us Section Live In-Place Editor Modal State
  const [isAboutUsEditorOpen, setIsAboutUsEditorOpen] = useState<boolean>(false);
  const [editingAboutUsSubtitle, setEditingAboutUsSubtitle] = useState<string>('');
  const [editingAboutUsTitle, setEditingAboutUsTitle] = useState<string>('');
  const [editingAboutUsText, setEditingAboutUsText] = useState<string>('');
  const [editingAboutUsImage, setEditingAboutUsImage] = useState<string>('');
  const [editingAboutUsFeatures, setEditingAboutUsFeatures] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = previewDeviceView === 'tablet' || (!previewDeviceView && windowWidth >= 640 && windowWidth < 1024);
  const isMobile = previewDeviceView === 'mobile' || (!previewDeviceView && windowWidth < 640);
  const isDesktop = previewDeviceView === 'desktop' || (!previewDeviceView && windowWidth >= 1024);
  
  // Reservation Modal
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resGuests, setResGuests] = useState('2');
  const [resDate, setResDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [resTime, setResTime] = useState('19:30');
  const [resSalon, setResSalon] = useState('Grand Royal Ballroom');

  // Search & secret code
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [modalSearchTerm, setModalSearchTerm] = useState('');

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

  const pageCfg = THEME_PAGE_CONFIGS[activePresetId] || THEME_PAGE_CONFIGS['velmora-dining'] || THEME_PAGE_CONFIGS['lumivelle'];

  // Read theme-specific edits if they exist for activePresetId ONLY with reactive state
  const [themeEditsState, setThemeEditsState] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(`theme_edits_${activePresetId}`);
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    }
    return null;
  });

  const themeEdits = themeEditsState;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(`theme_edits_${activePresetId}`);
        setThemeEditsState(raw ? JSON.parse(raw) : null);
      } catch { }
    }
  }, [activePresetId]);

  // Check if dishes were specifically edited or saved for this activePresetId
  const themeSpecificDishes = (themeEdits?.dishes && themeEdits.dishes.length > 0)
    ? themeEdits.dishes
    : typeof window !== 'undefined' ? (() => {
        try {
          const raw = localStorage.getItem(`theme_dishes_${activePresetId}`);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          return (Array.isArray(parsed) && parsed.length > 0) ? parsed : null;
        } catch { return null; }
      })()
    : null;

  const getPresetDefaultDishes = (presetId: string) => {
    switch (presetId) {
      case 'orivelle-house':
        return ORIVELLE_NOIR_DISHES;
      case 'lunavere':
        return DEFAULT_LUNAVERE_DISHES;
      case 'aurelisse':
        return AURELISSE_ROYAL_DISHES;
      case 'palatiora':
        return PALATIORA_CELLAR_DISHES;
      case 'opalune':
        return OPALUNE_NITRO_DISHES;
      case 'emberion':
        return EMBERION_GRILL_DISHES;
      case 'couravelle':
        return COURAVELLE_GARDEN_DISHES;
      case 'ivorelle':
        return IVORELLE_BISTRO_DISHES;
      case 'celestique':
      case 'caravelle-dining':
        return CELESTIQUE_OCEAN_DISHES;
      case 'elvaris-atelier':
        return ELVARIS_BORDEAUX_DISHES;
      case 'silvarenne':
        return SILVARENNE_TITANIUM_DISHES;
      case 'velmora-dining':
      default: {
        const coffeeOnly = dishes ? dishes.filter(d => 
          (d.category && (d.category.toLowerCase().includes('coffee') || d.category.toLowerCase().includes('cafe') || d.category.toLowerCase().includes('espresso') || d.category.toLowerCase().includes('brew'))) ||
          d.title.toLowerCase().includes('coffee') ||
          d.title.toLowerCase().includes('latte') ||
          d.title.toLowerCase().includes('espresso') ||
          d.title.toLowerCase().includes('brew') ||
          d.title.toLowerCase().includes('macchiato') ||
          d.title.toLowerCase().includes('cappuccino') ||
          d.title.toLowerCase().includes('mocha')
        ) : [];
        return (coffeeOnly && coffeeOnly.length > 0) ? coffeeOnly : DEFAULT_VELMORA_DISHES;
      }
    }
  };

  const effectiveDishes = themeSpecificDishes || getPresetDefaultDishes(activePresetId);

  const presetCategories = activePresetId === 'velmora-dining' ? [
    { id: 'all', label: 'Coffee Repertoire' },
    { id: 'coffee', label: 'Artisan Espresso' },
    { id: 'coldbrew', label: 'Cold Brew & Iced' },
    { id: 'latte', label: 'Specialty Lattes' }
  ] : activePresetId === 'orivelle-house' ? [
    { id: 'all', label: 'Noir Repertoire' },
    { id: 'caviar', label: '24K Caviar & Starters' },
    { id: 'seafood', label: 'Oceanic Crustacean' },
    { id: 'steaks', label: 'A5 Wagyu & Reserve' },
    { id: 'pasta', label: 'Handmade Truffle Pasta' },
    { id: 'desserts', label: 'Haute Patisserie' },
  ] : activePresetId === 'lunavere' ? [
    { id: 'all', label: 'Starlight Menu' },
    { id: 'coffee', label: 'Siphon Brews' },
    { id: 'brunch', label: 'French Toast & Savory' },
    { id: 'desserts', label: 'Pastries & Macarons' }
  ] : activePresetId === 'aurelisse' ? [
    { id: 'all', label: 'Monarch Banquets' },
    { id: 'caviar', label: 'Beluga Caviar' },
    { id: 'seafood', label: 'Lobster & Ocean' },
    { id: 'steaks', label: 'Royal Cuts & Wagyu' }
  ] : activePresetId === 'palatiora' ? [
    { id: 'all', label: 'Cellar Repertoire' },
    { id: 'steaks', label: '45-Day Dry-Aged Steaks' },
    { id: 'wine', label: 'Cabernet Reductions' }
  ] : activePresetId === 'opalune' ? [
    { id: 'all', label: 'Nitro Cold Brews' },
    { id: 'coffee', label: 'Cascade Nitro' },
    { id: 'desserts', label: 'Affogato Gelato' }
  ] : activePresetId === 'emberion' ? [
    { id: 'all', label: 'Wood-Fired Grill' },
    { id: 'steaks', label: 'Oak Smoked Ribs' },
    { id: 'pizza', label: 'Flame Truffle Pizza' }
  ] : activePresetId === 'couravelle' ? [
    { id: 'all', label: 'Tuscan Garden' },
    { id: 'starters', label: 'Pesto Burrata' },
    { id: 'pasta', label: 'Handmade Ravioli' }
  ] : activePresetId === 'ivorelle' ? [
    { id: 'all', label: 'Ivory Pearl Bistro' },
    { id: 'seafood', label: 'Lobster Tail' },
    { id: 'desserts', label: 'Grand Soufflé' }
  ] : activePresetId === 'elvaris-atelier' ? [
    { id: 'all', label: 'Grand Cru Cellar' },
    { id: 'steaks', label: 'Bordeaux Duck Confit' },
    { id: 'desserts', label: 'Pinot Noir Truffles' }
  ] : activePresetId === 'silvarenne' ? [
    { id: 'all', label: 'Titanium Espresso' },
    { id: 'coffee', label: 'High Pressure Shot' },
    { id: 'tapas', label: 'Wagyu Tapas' }
  ] : [
    { id: 'all', label: 'Full Gastronomy' },
    { id: 'caviar', label: 'Caviar & Starters' },
    { id: 'seafood', label: 'Oceanic & Crustacean' },
    { id: 'steaks', label: 'Prime Wagyu & Cuts' },
    { id: 'pasta', label: 'Handmade Pasta' },
    { id: 'desserts', label: 'Palatial Desserts' },
  ];

  const categories = (themeEdits?.categories && themeEdits.categories.length > 0)
    ? themeEdits.categories
    : presetCategories;

  const defaultMenuTitle = activePresetId === 'orivelle-house'
    ? 'Orivelle Haute Gastronomy & Private Cellar'
    : 'Haute Cuisine & Tasting Courses';

  const defaultMenuSubtitle = activePresetId === 'orivelle-house'
    ? 'An exclusive repertoire of haute gastronomy, 24k gold leaf infusions, and private cellar reserves.'
    : 'Every dish is an architectural composition of rare seasonal provenance, wild herbs, and culinary precision.';

  // Priority sorting: Popular items come first!
  const sortedDishes = React.useMemo(() => {
    return [...effectiveDishes].sort((a, b) => {
      const aPop = (a as any).popular || (a as any).isPopular ? 1 : 0;
      const bPop = (b as any).popular || (b as any).isPopular ? 1 : 0;
      return bPop - aPop;
    });
  }, [effectiveDishes]);

  const filteredDishes = React.useMemo(() => {
    return sortedDishes.filter(d => {
      const matchesCat = activeCategory === 'all' || 
        (d.category && d.category.toLowerCase().includes(activeCategory.toLowerCase())) || 
        d.title.toLowerCase().includes(activeCategory.toLowerCase());
      const query = menuSearchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        d.title.toLowerCase().includes(query) || 
        (d.desc && d.desc.toLowerCase().includes(query)) ||
        (d.category && d.category.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [sortedDishes, activeCategory, menuSearchQuery]);

  // Keyboard navigation for Menu Card modal (Arrow Left / Right to flip next/prev card)
  useEffect(() => {
    if (!selectedDishDetail) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const idx = filteredDishes.findIndex(d => d.id === selectedDishDetail.id);
        if (idx !== -1 && filteredDishes.length > 1) {
          const nextIdx = idx < filteredDishes.length - 1 ? idx + 1 : 0;
          setSelectedDishDetail(filteredDishes[nextIdx]);
          setDetailOrderQty(1);
          setDetailSpecialNote('');
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = filteredDishes.findIndex(d => d.id === selectedDishDetail.id);
        if (idx !== -1 && filteredDishes.length > 1) {
          const prevIdx = idx > 0 ? idx - 1 : filteredDishes.length - 1;
          setSelectedDishDetail(filteredDishes[prevIdx]);
          setDetailOrderQty(1);
          setDetailSpecialNote('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDishDetail, filteredDishes]);

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
    if (checkAdminPasswordInput(text, settings)) {
      if (onOpenAdmin) onOpenAdmin();
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isCoffeeTheme = COFFEE_SHOP_THEME_IDS.includes(activePresetId);

  const activeHeroBgImage = 
    themeEdits?.heroBackgroundImage ||
    settings?.themeSettings?.[activePresetId]?.heroBackgroundImage ||
    THEME_HERO_CONFIGS[activePresetId]?.heroBgImage ||
    (isCoffeeTheme ? cleanCoffeeBg : 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1600&auto=format&fit=crop');

  const activeTier = (activePresetId === 'vellunara') ? 'basic' : (matchedTheme?.tier || 'basic');
  const defaultTierSlides = buildTierSlides(activePresetId, activeTier, isCoffeeTheme);

  const activeHeroSlides = 
    (themeEdits?.heroSlides && themeEdits.heroSlides.length > 0)
      ? themeEdits.heroSlides
      : (settings?.themeSettings?.[activePresetId]?.heroSlides && settings.themeSettings[activePresetId].heroSlides.length > 0)
      ? settings.themeSettings[activePresetId].heroSlides
      : defaultTierSlides;

  const activeAboutUsImage = 
    themeEdits?.aboutUsImage ||
    settings?.themeSettings?.[activePresetId]?.aboutUsImage ||
    THEME_HERO_CONFIGS[activePresetId]?.heroBgImage ||
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop';

  const defaultAboutStory = `Redefining luxury dining experiences. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews. At ${effectiveThemeBrandName}, we take pride in serving hand-selected, freshly prepared meals crafted with precision and passion.`;

  const openAboutUsEditor = () => {
    setEditingAboutUsSubtitle(themeEdits?.aboutUsSubtitle || settings?.themeSettings?.[activePresetId]?.aboutUsSubtitle || settings?.aboutUsSubtitle || 'ABOUT US');
    setEditingAboutUsTitle(themeEdits?.aboutUsTitle || settings?.themeSettings?.[activePresetId]?.aboutUsTitle || settings?.aboutUsTitle || (lang === 'bn' ? 'কেন আমাদের কাছে খাবেন?' : 'Why Dine With Us?'));
    setEditingAboutUsText(themeEdits?.aboutUsText || settings?.themeSettings?.[activePresetId]?.aboutUsText || settings?.aboutUsText || defaultAboutStory);
    setEditingAboutUsImage(activeAboutUsImage);
    const existingFeatures = themeEdits?.aboutUsFeatures || settings?.themeSettings?.[activePresetId]?.aboutUsFeatures || settings?.aboutUsFeatures;
    setEditingAboutUsFeatures(existingFeatures && existingFeatures.length > 0 ? [...existingFeatures] : [
      '100% Fresh Organic Ingredients',
      'Chef-Curated Gourmet Menu',
      '3D Interactive WebAR Food Previews',
      'Fast Home Delivery & Table Ordering'
    ]);
    setIsAboutUsEditorOpen(true);
  };

  const saveAboutUsEdits = () => {
    const payload = {
      ...(themeEdits || {}),
      aboutUsSubtitle: editingAboutUsSubtitle,
      aboutUsTitle: editingAboutUsTitle,
      aboutUsText: editingAboutUsText,
      aboutUsImage: editingAboutUsImage,
      aboutUsFeatures: editingAboutUsFeatures,
    };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`theme_edits_${activePresetId}`, JSON.stringify(payload));
        const rawAdmin = localStorage.getItem('webar_restaurant_admin_settings');
        if (rawAdmin) {
          const parsedAdmin = JSON.parse(rawAdmin);
          parsedAdmin.aboutUsSubtitle = editingAboutUsSubtitle;
          parsedAdmin.aboutUsTitle = editingAboutUsTitle;
          parsedAdmin.aboutUsText = editingAboutUsText;
          parsedAdmin.aboutUsImage = editingAboutUsImage;
          parsedAdmin.aboutUsFeatures = editingAboutUsFeatures;
          localStorage.setItem('webar_restaurant_admin_settings', JSON.stringify(parsedAdmin));
        }
      } catch (err) {
        console.error('Failed to save theme edits:', err);
      }
    }
    setThemeEditsState(payload);
    setIsAboutUsEditorOpen(false);
    setToastMsg(lang === 'bn' ? '"কেন আমাদের কাছে খাবেন?" সেকশনটি সফলভাবে আপডেট হয়েছে!' : '"Why Dine With Us?" section updated successfully!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openMenuSectionEditor = (targetTab: 'headings' | 'dishes' = 'headings') => {
    const currentTagline = themeEdits?.menuSectionTagline || settings?.menuSectionTagline || pageCfg.repertoireTag || '☕ — ARTISAN HAND-ROASTED SPECIALTY COFFEE —';
    const currentTitle = themeEdits?.menuSectionTitle || settings?.menuSectionTitle || defaultMenuTitle;
    const currentSubtitle = themeEdits?.menuSectionSubtitle || settings?.menuSectionSubtitle || defaultMenuSubtitle;
    const currentCategories = (themeEdits?.categories && themeEdits.categories.length > 0) ? themeEdits.categories : categories;

    setEditingSectionTagline(currentTagline);
    setEditingSectionTitle(currentTitle);
    setEditingSectionSubtitle(currentSubtitle);
    setEditingCategories([...currentCategories]);
    setEditingDishes([...effectiveDishes]);
    setEditorActiveTab(targetTab);
    setIsMenuEditorOpen(true);
  };

  return (
    <div 
      className="w-full min-h-screen text-[#FBF8EE] selection:bg-[#DA9F93]/30 selection:text-white outline-none relative"
      style={{
        ...pageCfg.pageBgStyle,
        backgroundAttachment: (previewDeviceView || isTablet || isMobile) ? 'scroll' : (pageCfg.pageBgStyle.backgroundAttachment || 'scroll'),
        backgroundSize: 'cover',
        fontFamily: fontBody || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* 1. KOPPEE HERO HEADER WITH COFFEE BEANS & CAROUSEL */}
      {/* ========================================================= */}
      <section id="hero">
        <KoppeeHeroHeader
          brandName={effectiveThemeBrandName}
          heroTitle={themeEdits?.heroTitle || settings?.themeSettings?.[activePresetId]?.heroTitle || (isCoffeeTheme ? (settings?.heroTitle || settings?.hero?.title) : undefined)}
          heroSubtitle={themeEdits?.heroSubtitle || settings?.themeSettings?.[activePresetId]?.heroSubtitle || (isCoffeeTheme ? (settings?.heroSubtitle || settings?.hero?.subtitle) : undefined)}
          heroBackgroundImage={activeHeroBgImage}
          heroSlides={activeHeroSlides}
          onReserveClick={() => setReservationModalOpen(true)}
          onMenuClick={() => {
            const el = document.getElementById('tasting-menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAdmin={onOpenAdmin}
          showAdminButton={getThemeAdminButtonVisibility(activePresetId, settings)}
          lang={lang}
          themePresetId={activePresetId}
          previewDeviceView={previewDeviceView}
        />
      </section>

      {/* ========================================================= */}
      {/* 2. KOPPEE ABOUT US SECTION WITH TORN PAPER DIVIDER */}
      {/* ========================================================= */}
      <KoppeeAboutSection
        brandName={effectiveThemeBrandName}
        aboutUsTitle={themeEdits?.aboutUsTitle || settings?.themeSettings?.[activePresetId]?.aboutUsTitle || settings?.aboutUsTitle || settings?.hero?.title}
        aboutUsSubtitle={themeEdits?.aboutUsSubtitle || settings?.themeSettings?.[activePresetId]?.aboutUsSubtitle || settings?.aboutUsSubtitle || 'ABOUT US'}
        aboutUsText={themeEdits?.aboutUsText || settings?.themeSettings?.[activePresetId]?.aboutUsText || settings?.aboutUsText || settings?.brandStory}
        aboutUsImage={activeAboutUsImage}
        aboutUsFeatures={themeEdits?.aboutUsFeatures || settings?.themeSettings?.[activePresetId]?.aboutUsFeatures || settings?.aboutUsFeatures}
        onReserveClick={() => setReservationModalOpen(true)}
        onMenuClick={() => {
          const el = document.getElementById('tasting-menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onEditClick={openAboutUsEditor}
        onOpenAdmin={onOpenAdmin}
        lang={lang}
        themePresetId={activePresetId}
        previewDeviceView={previewDeviceView}
      />

      {/* ========================================================= */}
      {/* 3. TASTING MENU & GOURMET CULINARY SHOWCASE */}
      {/* ========================================================= */}
      <section id="tasting-menu" className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-[1800px] mx-auto space-y-12">
        
        {/* Section Heading with Direct In-Place Edit Trigger */}
        <div className="text-center space-y-3 max-w-3xl mx-auto relative group">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase block" style={{ color: pageCfg.accentColor }}>
              {themeEdits?.menuSectionTagline || settings?.menuSectionTagline || pageCfg.repertoireTag}
            </span>
            <button
              type="button"
              onClick={() => openMenuSectionEditor('headings')}
              className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all cursor-pointer opacity-70 group-hover:opacity-100"
              title={lang === 'bn' ? 'ট্যাগলাইন ও শিরোনাম এডিট করুন' : 'Edit Tagline & Heading'}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative inline-block group/title">
            <h2 
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF8EE] transition-colors"
              style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
            >
              {themeEdits?.menuSectionTitle || settings?.menuSectionTitle || defaultMenuTitle}
            </h2>
          </div>

          <p className="text-sm text-[#FBF8EE]/70 font-light max-w-2xl mx-auto">
            {themeEdits?.menuSectionSubtitle || settings?.menuSectionSubtitle || defaultMenuSubtitle}
          </p>

          {/* Quick Edit Heading & Categories Trigger */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => openMenuSectionEditor('headings')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title={lang === 'bn' ? 'শিরোনাম, বিবরণ ও ক্যাটাগরি এডিট করুন' : 'Edit Title, Tagline & Categories'}
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'শিরোনাম ও ক্যাটাগরি এডিট করুন' : 'Edit Section & Categories'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills & Compact Side Edit Menu Trigger */}
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 flex-nowrap sm:flex-wrap max-w-full">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto flex-nowrap sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? `${pageCfg.accentGradient} shadow-lg scale-105`
                    : 'bg-[#14120B] border border-white/20 text-[#FBF8EE]/80 hover:border-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openMenuSectionEditor('headings')}
            className="px-4 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/80 text-amber-300 text-xs font-black uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
            title={lang === 'bn' ? 'এই সেকশনটি এডিট করুন' : 'Edit Section Headings & Menu Items'}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs">{lang === 'bn' ? 'সেকশন এডিট' : 'EDIT SECTION'}</span>
          </button>
        </div>

        {/* Live Search Bar for Menu Cards */}
        <div className="max-w-md mx-auto w-full px-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-4 text-amber-400 pointer-events-none" />
            <input
              type="text"
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? "খাবারের নাম লিখে সরাসরি মেনু কার্ড খুঁজুন..." : "Search menu cards by food name..."}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-[#14120B]/90 border border-[#D4AF37]/40 text-xs sm:text-sm text-[#FBF8EE] placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner backdrop-blur-md"
            />
            {menuSearchQuery && (
              <button
                type="button"
                onClick={() => setMenuSearchQuery('')}
                className="absolute right-3.5 p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {menuSearchQuery && (
            <p className="text-center text-xs text-amber-300/80 mt-2 font-mono">
              Found {filteredDishes.length} menu card{filteredDishes.length !== 1 ? 's' : ''} for "{menuSearchQuery}"
            </p>
          )}
        </div>

        {/* Food Items Grid */}
        <div className={`grid gap-5 sm:gap-6 lg:gap-8 ${
          isMobile 
            ? 'grid-cols-1' 
            : isTablet 
            ? 'grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredDishes.map((dish) => (
            activePresetId === 'velmora-dining' ? (
              <motion.div
                key={dish.id}
                onClick={() => {
                  setDetailOrderQty(1);
                  setDetailSpecialNote('');
                  setSelectedDishDetail(dish);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-b from-[#21140c] via-[#180e08] to-[#120a05] border-2 border-[#d4a373]/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#f3d5b5] hover:shadow-[0_0_30px_rgba(212,163,115,0.4)] hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-black/80">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120a05] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c89666] via-[#b37d4e] to-[#4a2810] text-[#fff8f0] text-[9px] font-black uppercase tracking-widest border border-[#f3d5b5]/40 shadow-lg flex items-center gap-1">
                      ☕ Artisan Roast
                    </span>
                  </div>

                  {/* Center Edit Overlay Button (Automatically disappears after item is saved) */}
                  {!savedDishIds.has(dish.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] opacity-90 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSingleDish(dish);
                        }}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-stone-950 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5 border border-white/40 cursor-pointer backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                        title="Click to edit this food item"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-stone-950" />
                        <span>EDIT</span>
                      </button>
                    </div>
                  )}

                  {dish.calories && <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-[10px] text-[#d4a373] font-mono border border-[#d4a373]/30 backdrop-blur-md">{dish.calories}</span>}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-lg text-[#fff8f0] transition-colors line-clamp-2 leading-snug break-words tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{dish.title}</h3>
                      <span className="font-mono font-black text-base shrink-0 text-[#d4a373]">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-[#f3d5b5]/80 line-clamp-2 leading-relaxed font-light">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#d4a373]/20">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailOrderQty(1);
                        setDetailSpecialNote('');
                        setSelectedDishDetail(dish);
                      }} 
                      className="py-2.5 rounded-xl bg-[#120a05] border border-[#d4a373]/40 text-[#f3d5b5] text-[11px] font-bold uppercase tracking-wider hover:bg-[#1a0f08] transition-all text-center cursor-pointer"
                    >
                      Details
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (onOrderDish) onOrderDish(dish); 
                        setToastMsg(`"${dish.title}" added to order!`);
                        setTimeout(() => setToastMsg(null), 2500);
                      }} 
                      className="py-2.5 rounded-xl bg-gradient-to-r from-[#c89666] via-[#b37d4e] to-[#8c592b] text-[#fff8f0] text-[11px] font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(200,150,102,0.35)] cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : !isCoffeeTheme ? (
              /* ========================================================================= */
              /* ULTRA-LUXURY 5-STAR MICHELIN BORDERLESS CULINARY MASTERPIECE PRESENTATION  */
              /* 100% Seamless background-blended radial vignette - ZERO hard 4-corner box */
              /* ========================================================================= */
              <motion.div
                key={dish.id}
                onClick={() => {
                  setDetailOrderQty(1);
                  setDetailSpecialNote('');
                  setSelectedDishDetail(dish);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer p-2 sm:p-3 select-none bg-transparent"
              >
                {/* 24K Gold Corner Sparkle Accent */}
                <div className="absolute top-2 right-2 text-amber-400 font-serif text-sm opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all">✦</div>

                {/* Dish Platter with Soft Radial Mask - Melts seamlessly into background, NO 4-corner box */}
                <div className="relative w-full aspect-square max-h-72 mx-auto overflow-visible flex items-center justify-center select-none my-1">
                  {/* Ambient Glow Halo behind the dish */}
                  <div className="absolute inset-0 rounded-full blur-3xl bg-radial from-amber-500/25 via-yellow-600/10 to-transparent group-hover:bg-amber-400/35 transition-all duration-700 scale-110 pointer-events-none" />
                  
                  <div 
                    className="relative w-full h-full flex items-center justify-center pointer-events-none"
                    style={{
                      maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 48%, rgba(0,0,0,0) 95%)',
                      WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 48%, rgba(0,0,0,0) 95%)'
                    }}
                  >
                    <img 
                      src={dish.img} 
                      alt={dish.title} 
                      className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-700 filter brightness-105 contrast-110" 
                    />
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute top-1 left-1 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-400/40 shadow-xl backdrop-blur-md flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-300" />
                      <span>{dish.isChefSpecial ? 'Michelin Special' : '24K Haute Reserve'}</span>
                    </span>
                    {dish.isPopular && (
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-stone-950 text-[10px] font-black uppercase tracking-widest shadow-lg">
                        ★ Signature
                      </span>
                    )}
                  </div>

                  {/* Center In-Place Edit Trigger */}
                  {!savedDishIds.has(dish.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSingleDish(dish);
                        }}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5 border border-white/50 cursor-pointer backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                        title="Click to edit this food item"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-stone-950" />
                        <span>EDIT</span>
                      </button>
                    </div>
                  )}

                  {dish.calories && (
                    <span className="absolute bottom-1 right-1 px-2.5 py-0.5 rounded-full bg-stone-950/80 text-[10px] text-amber-300 font-mono border border-amber-400/30 backdrop-blur-md">
                      {dish.calories}
                    </span>
                  )}
                </div>

                {/* Dish Info & Luxury Pricing */}
                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-400/90 font-mono font-bold">
                      <span>★ 5-STAR MICHELIN GASTRONOMY ★</span>
                    </div>
                    <h3 
                      className="font-bold text-lg sm:text-xl text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug break-words tracking-tight"
                      style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                    >
                      {dish.title}
                    </h3>
                    <p className="text-xs text-stone-300/80 line-clamp-2 leading-relaxed font-light">
                      {dish.desc}
                    </p>
                    <div className="pt-1.5 flex items-center justify-center">
                      <span className="font-serif font-black text-2xl text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailOrderQty(1);
                        setDetailSpecialNote('');
                        setSelectedDishDetail(dish);
                      }} 
                      className="py-2.5 rounded-full bg-stone-950/80 hover:bg-stone-900 border border-amber-400/40 text-amber-200 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all text-center cursor-pointer active:scale-95 shadow-md"
                    >
                      Details
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (onOrderDish) onOrderDish(dish); 
                        setToastMsg(`"${dish.title}" added to order!`);
                        setTimeout(() => setToastMsg(null), 2500);
                      }} 
                      className="py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-stone-950 text-[11px] font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.45)] cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-stone-950" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Coffee Shop Themes Minimalist Modern Card */
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group ${pageCfg.cardBg} rounded-2xl border ${pageCfg.cardBorderClass} overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${pageCfg.cardHoverGlowClass}`}
              >
                <div className="relative h-56 overflow-hidden bg-black/40">
                  <img 
                    src={dish.img} 
                    alt={dish.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full ${pageCfg.badgeBgClass} text-[9px] font-bold uppercase tracking-wider shadow-md`}>
                      ☕ Cafe Reserve
                    </span>
                  </div>

                  {dish.calories && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[10px] text-[#F3E5AB] font-mono border border-white/10">
                      {dish.calories}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        className="font-bold text-base sm:text-lg text-[#FBF8EE] transition-colors line-clamp-2 min-h-[3rem] leading-snug break-words"
                        style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                      >
                        {dish.title}
                      </h3>
                      <span className="font-mono font-bold text-base shrink-0" style={{ color: pageCfg.accentColor }}>
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#FBF8EE]/70 line-clamp-2 leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>

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
            )
          ))}
        </div>
      </section>

      {/* Intersection Divider for Theme #02 Orivelle House (transition to Chefs & Delivery) */}
      {activePresetId === 'orivelle-house' && (
        <div className="w-full relative z-20 pointer-events-none select-none -mb-1">
          <OrivelleGeometricDivider color="#0a0907" position="top" />
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. GRAND EXECUTIVE CHEF SECTION (HORIZONTAL CONTINUOUS MARQUEE) */}
      {/* ========================================================= */}
      {isChefSectionVisible && (
        <section 
          id="chefs" 
          className={`py-16 sm:py-24 scroll-mt-20 overflow-hidden ${
            !isCoffeeTheme || activePresetId === 'orivelle-house'
              ? 'bg-[#0a0806] border-y border-amber-400/40 text-[#FBF8EE]'
              : 'bg-white border-y border-[#DA9F93]/30'
          }`}
        >
          <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 space-y-4">
            
            <div className="text-center space-y-3">
              <span className={`text-xs font-mono font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2 ${
                activePresetId === 'orivelle-house' ? 'text-amber-400' : 'text-[#B8860B]'
              }`}>
                <ChefHat className={`w-4 h-4 ${activePresetId === 'orivelle-house' ? 'text-amber-400' : 'text-[#B8860B]'}`} />
                {lang === 'bn' ? '— রাজকীয় রন্ধনশিল্পী ও মাস্টার শেফ —' : '— MAESTROS OF THE PALACE —'}
              </span>
              <h2 
                className={`text-3xl sm:text-4xl md:text-5xl font-black ${
                  activePresetId === 'orivelle-house'
                    ? 'bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent'
                    : 'text-[#2C1810]'
                }`}
                style={{ fontFamily: activePresetId === 'orivelle-house' ? "'Cinzel', serif" : (fontDisplay || "'Playfair Display', serif") }}
              >
                {lang === 'bn' ? 'এক্সিকিউটিভ শেফ ও কালিনারি মাস্টার্স' : 'Executive Chefs & Master Sommeliers'}
              </h2>
              <p className={`text-xs sm:text-sm max-w-xl mx-auto font-medium ${
                activePresetId === 'orivelle-house' ? 'text-stone-300/80 font-light' : 'text-[#5C4033]/80'
              }`}>
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
            <div className={`absolute left-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-r ${
              activePresetId === 'orivelle-house' ? 'from-[#0a0907] to-transparent' : 'from-white to-transparent'
            }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-l ${
              activePresetId === 'orivelle-house' ? 'from-[#0a0907] to-transparent' : 'from-white to-transparent'
            }`} />

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
                  className={`w-[340px] sm:w-[380px] md:w-[410px] shrink-0 p-6 rounded-3xl flex flex-col justify-between gap-5 transition-all duration-300 group cursor-pointer ${
                    !isCoffeeTheme || activePresetId === 'orivelle-house'
                      ? 'bg-stone-950/60 backdrop-blur-md border border-amber-400/25 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]'
                      : 'bg-white border border-[#DA9F93]/30 hover:border-[#B8860B] shadow-lg shadow-[#2C1810]/5 hover:shadow-2xl hover:shadow-[#B8860B]/15'
                  }`}
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
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase inline-block truncate max-w-full ${
                          !isCoffeeTheme || activePresetId === 'orivelle-house'
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : 'bg-[#DA9F93]/20 text-[#8C584B]'
                        }`}>
                          {chef.role}
                        </span>
                        <h3 
                          className={`text-lg font-bold transition-colors truncate ${
                            !isCoffeeTheme || activePresetId === 'orivelle-house'
                              ? 'text-amber-100 group-hover:text-amber-300'
                              : 'text-slate-900 group-hover:text-[#B8860B]'
                          }`}
                          style={{ fontFamily: !isCoffeeTheme || activePresetId === 'orivelle-house' ? "'Cinzel', serif" : (fontDisplay || "'Playfair Display', serif") }}
                        >
                          {chef.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                          {'★'.repeat(Math.min(5, Math.round(chef.rating || 5)))}
                          <span className={`text-[11px] ml-1 ${!isCoffeeTheme || activePresetId === 'orivelle-house' ? 'text-amber-300/70 font-mono' : 'text-slate-500'}`}>
                            ({chef.rating?.toFixed(1) || '5.0'})
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-xs line-clamp-3 leading-relaxed ${
                      !isCoffeeTheme || activePresetId === 'orivelle-house' ? 'text-stone-300/80 font-light' : 'text-slate-600'
                    }`}>
                      {chef.bio}
                    </p>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                    !isCoffeeTheme || activePresetId === 'orivelle-house' ? 'border-amber-400/20' : 'border-[#DA9F93]/20'
                  }`}>
                    <span className={`font-bold truncate ${
                      !isCoffeeTheme || activePresetId === 'orivelle-house' ? 'text-amber-400' : 'text-[#8C584B]'
                    }`}>
                      ★ {chef.speciality || (chef as any).specialty || 'Master Gastronomy'}
                    </span>
                    {chef.experienceYears && (
                      <span className={`text-[10px] shrink-0 font-mono ml-2 ${
                        !isCoffeeTheme || activePresetId === 'orivelle-house' ? 'text-stone-400' : 'text-slate-500'
                      }`}>
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
        brandName={effectiveThemeBrandName}
        lang={lang}
        themePresetId={activePresetId}
        previewDeviceView={previewDeviceView}
      />

      {/* ========================================================= */}
      {/* 5. KOPPEE FOOTER SECTION WITH TORN PAPER EDGE & COFFEE BEANS */}
      {/* ========================================================= */}
      <section id="location">
        <KoppeeFooterSection
          brandName={effectiveThemeBrandName}
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
          onOpenAdmin={onOpenAdmin}
          previewDeviceView={previewDeviceView}
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
      {/* 9. RICH FOOD DISH DETAIL MODAL (Desktop 2-Column + Scrollable Related Items Grid) */}
      {/* ========================================================= */}
      {/* FULL-PAGE ENLARGED FOOD CARD VIEW / MODAL */}
      <AnimatePresence>
        {selectedDishDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden w-full h-full"
            onClick={() => setSelectedDishDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full h-full flex flex-col overflow-hidden relative select-text text-slate-900"
            >
              {/* Top Navigation Bar with Next/Prev Card Controls & Fast Search */}
              <div className="px-4 sm:px-8 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0 z-10 shadow-2xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedDishDetail(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer active:scale-95"
                    title={lang === 'bn' ? 'মেনু পেজে ফিরে যান' : 'Back to menu'}
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-700" />
                    <span className="font-extrabold">{lang === 'bn' ? 'ব্যাক' : 'Back'}</span>
                  </button>
                </div>

                {/* Card-by-Card Next & Prev Navigation Bar */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Quick Card Search */}
                  <div className="relative hidden md:block w-48">
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
                            setDetailSpecialNote('');
                          }
                        }
                      }}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 transition-all shadow-2xs"
                    />
                  </div>

                  {/* Prev / Counter / Next Controls */}
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => {
                        if (filteredDishes.length <= 1) return;
                        const idx = filteredDishes.findIndex(d => d.id === selectedDishDetail.id);
                        const prevIdx = idx > 0 ? idx - 1 : filteredDishes.length - 1;
                        setSelectedDishDetail(filteredDishes[prevIdx]);
                        setDetailOrderQty(1);
                        setDetailSpecialNote('');
                        const scrollEl = document.getElementById('dish-modal-scroll-body');
                        if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
                      title="Previous Menu Card (Left Arrow)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden xs:inline">Prev</span>
                    </button>

                    <span className="px-3 text-xs font-mono font-bold text-slate-700 whitespace-nowrap">
                      {Math.max(1, filteredDishes.findIndex(d => d.id === selectedDishDetail.id) + 1)} / {filteredDishes.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        if (filteredDishes.length <= 1) return;
                        const idx = filteredDishes.findIndex(d => d.id === selectedDishDetail.id);
                        const nextIdx = idx < filteredDishes.length - 1 ? idx + 1 : 0;
                        setSelectedDishDetail(filteredDishes[nextIdx]);
                        setDetailOrderQty(1);
                        setDetailSpecialNote('');
                        const scrollEl = document.getElementById('dish-modal-scroll-body');
                        if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
                      title="Next Menu Card (Right Arrow)"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const d = selectedDishDetail;
                      setSelectedDishDetail(null);
                      setEditingSingleDish(d);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider hidden sm:flex items-center gap-1.5 hover:bg-slate-200 transition-all cursor-pointer shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setSelectedDishDetail(null)}
                    className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Full-Page Scrollable Container */}
              <div id="dish-modal-scroll-body" className="flex-1 p-6 sm:p-10 md:p-12 overflow-y-auto space-y-10 scrollbar-thin scrollbar-thumb-slate-300 max-w-7xl mx-auto w-full">
                
                {/* 2-Column Main Item View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column: Food Image with Next/Prev Arrow Overlays */}
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
                        if (filteredDishes.length <= 1) return;
                        const idx = filteredDishes.findIndex(d => d.id === selectedDishDetail.id);
                        const prevIdx = idx > 0 ? idx - 1 : filteredDishes.length - 1;
                        setSelectedDishDetail(filteredDishes[prevIdx]);
                        setDetailOrderQty(1);
                        setDetailSpecialNote('');
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-slate-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl z-20"
                      title="Previous Card"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (filteredDishes.length <= 1) return;
                        const idx = filteredDishes.findIndex(d => d.id === selectedDishDetail.id);
                        const nextIdx = idx < filteredDishes.length - 1 ? idx + 1 : 0;
                        setSelectedDishDetail(filteredDishes[nextIdx]);
                        setDetailOrderQty(1);
                        setDetailSpecialNote('');
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-slate-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl z-20"
                      title="Next Card"
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
                          style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
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

                    {/* Quantity Controls & Order Button */}
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Order Quantity</span>
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
                          if (onOrderDish) {
                            for (let i = 0; i < detailOrderQty; i++) {
                              onOrderDish({
                                ...selectedDishDetail,
                                desc: detailSpecialNote ? `${selectedDishDetail.desc} (Note: ${detailSpecialNote})` : selectedDishDetail.desc
                              });
                            }
                          }
                          setToastMsg(`Added ${detailOrderQty}x "${selectedDishDetail.title}" to Table Order!`);
                          setTimeout(() => setToastMsg(null), 3000);
                          setSelectedDishDetail(null);
                        }}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2 transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Order ({formatPrice((typeof selectedDishDetail.price === 'number' ? selectedDishDetail.price : parseFloat(selectedDishDetail.price as any) || 0) * detailOrderQty)})</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Scroll Down Section: More Delicacies / Related Items Grid */}
                <div className="pt-8 border-t border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        ✨ More Delicacies — Tap Any Item to View Enlarged
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
                            setDetailOrderQty(1);
                            setDetailSpecialNote('');
                            setSelectedDishDetail(otherDish);
                            const scrollEl = document.getElementById('dish-modal-scroll-body');
                            if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-white border border-slate-200 hover:border-amber-500 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-2xs hover:shadow-md flex flex-col justify-between"
                        >
                          <div className="h-28 sm:h-36 overflow-hidden relative bg-slate-100">
                            <img 
                              src={otherDish.img} 
                              alt={otherDish.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-xs border border-slate-200 text-[10px] font-mono font-bold text-slate-900 shadow-2xs">
                              {formatPrice(otherDish.price)}
                            </span>
                          </div>
                          <div className="p-3 space-y-1">
                            <h5 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                              {otherDish.title}
                            </h5>
                            <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">
                              {otherDish.desc}
                            </p>
                            <span className="text-[9px] text-amber-600 font-bold uppercase tracking-wider block pt-1">
                              Tap to View ➔
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 9.5 SINGLE CARD ITEM EDIT MODAL (White Background, Image-Overlay Upload Button, High Contrast) */}
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
              className="bg-white text-stone-900 border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-2xl md:max-w-3xl w-full shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              {/* Modal Header */}
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
                id="single-dish-file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, (url) => setEditingSingleDish({ ...editingSingleDish, img: url }))}
              />

              {/* TOP PROMINENT FULL-WIDTH LIVE IMAGE PREVIEW WITH DIRECT OVERLAY UPLOAD BUTTON */}
              <div className="space-y-2">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-400 shadow-xl flex items-center justify-center group">
                  <img 
                    src={editingSingleDish.img || SAMPLE_COFFEE_IMAGES[0]} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = SAMPLE_COFFEE_IMAGES[0];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                  
                  {/* OVERLAY UPLOAD BUTTON INSIDE THE IMAGE BOX */}
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('single-dish-file-input');
                      if (el) el.click();
                    }}
                    className="absolute z-20 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl flex items-center gap-2.5 border-2 border-amber-200 cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <ImageIcon className="w-5 h-5 text-stone-950" />
                    <span>📁 Upload Photo from Gallery</span>
                  </button>

                  {/* BOTTOM LIVE OVERLAY TITLE & PRICE */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between z-10 pointer-events-none">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-stone-950 font-bold text-[10px] uppercase mb-1 inline-block shadow-md">
                        {editingSingleDish.calories || '180 kcal'}
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

              {/* FORM FIELDS ON WHITE BACKGROUND */}
              <div className="space-y-4 text-xs">
                
                {/* Currency Selection inside Edit Modal */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💱</span>
                    <div>
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">Store Display Currency</span>
                      <span className="text-[10px] text-stone-500 font-medium">Select currency symbol for prices</span>
                    </div>
                  </div>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as any)}
                    className="bg-white text-stone-900 text-xs font-bold rounded-xl px-4 py-2 outline-none border-2 border-amber-400 cursor-pointer hover:border-amber-500 transition-colors shadow-sm"
                  >
                    <option value="USD">🇺🇸 US Dollar ($)</option>
                    <option value="GBP">🇬🇧 UK Pound (£)</option>
                    <option value="BDT">🇧🇩 BD Taka (৳)</option>
                    <option value="EUR">🇪🇺 Euro (€)</option>
                  </select>
                </div>

                {/* Dish Title */}
                <div className="space-y-1.5">
                  <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">Dish Title</label>
                  <input
                    type="text"
                    value={editingSingleDish.title}
                    onChange={(e) => setEditingSingleDish({ ...editingSingleDish, title: e.target.value })}
                    placeholder="Enter dish name..."
                    className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-900 font-semibold text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">Base Price (USD $)</label>
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
                    <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">Calories / Tag</label>
                    <input
                      type="text"
                      value={editingSingleDish.calories || ''}
                      onChange={(e) => setEditingSingleDish({ ...editingSingleDish, calories: e.target.value })}
                      placeholder="e.g. 180 kcal"
                      className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-900 font-medium text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-stone-800 font-bold uppercase tracking-wider block text-[11px]">Description</label>
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
                  onClick={() => {
                    const updated = effectiveDishes.map(d => d.id === editingSingleDish.id ? editingSingleDish : d);
                    const payload = {
                      ...(themeEdits || {}),
                      dishes: updated
                    };
                    if (typeof window !== 'undefined') {
                      try {
                        localStorage.setItem(`theme_edits_${activePresetId}`, JSON.stringify(payload));
                        localStorage.setItem(`theme_dishes_${activePresetId}`, JSON.stringify(updated));
                      } catch {}
                    }
                    setSavedDishIds(prev => new Set(prev).add(editingSingleDish.id));
                    setEditingSingleDish(null);
                    setToastMsg(lang === 'bn' ? '✅ সেভ হয়েছে (Saved successfully)!' : '✅ Saved successfully!');
                    setTimeout(() => setToastMsg(null), 3000);
                  }}
                  className="px-8 py-2.5 rounded-xl bg-amber-500 border-2 border-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-amber-600 hover:border-amber-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
      {/* 10. THEME FOOD MENU STUDIO EDITOR MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMenuEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#14120B] border-2 border-[#D4AF37] rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-[#090805] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#FBF8EE]">
                      {lang === 'bn' ? 'মেন্যু কার্ড ও খাবার এডিটর' : 'Food Menu Studio Editor'}
                    </h3>
                    <p className="text-xs text-[#FBF8EE]/60 font-light">
                      Customize dishes, titles, prices, images & badges for "{activePresetId}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuEditorOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 shrink-0 bg-[#0d0b07]">
                <button
                  onClick={() => setEditorActiveTab('dishes')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    editorActiveTab === 'dishes'
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-stone-400 hover:text-white'
                  }`}
                >
                  🍔 Dishes & Food Items ({editingDishes.length})
                </button>
                <button
                  onClick={() => setEditorActiveTab('headings')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    editorActiveTab === 'headings'
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-stone-400 hover:text-white'
                  }`}
                >
                  🏷️ Section Titles & Tagline
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {editorActiveTab === 'headings' ? (
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <div className="space-y-1.5">
                      <label className="text-[#D4AF37] font-bold uppercase tracking-wider block">Store Display Currency</label>
                      <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value as any)}
                        className="w-full bg-[#090805] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-white font-bold outline-none focus:border-[#D4AF37] cursor-pointer"
                      >
                        <option value="USD">🇺🇸 US Dollar ($)</option>
                        <option value="GBP">🇬🇧 UK Pound (£)</option>
                        <option value="BDT">🇧🇩 BD Taka (৳)</option>
                        <option value="EUR">🇪🇺 Euro (€)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[#D4AF37] font-bold uppercase tracking-wider block">Section Tagline</label>
                      <input
                        type="text"
                        value={editingSectionTagline}
                        onChange={(e) => setEditingSectionTagline(e.target.value)}
                        placeholder="e.g. ☕ — ARTISAN HAND-ROASTED SPECIALTY COFFEE —"
                        className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[#D4AF37] font-bold uppercase tracking-wider block">Section Main Title</label>
                      <input
                        type="text"
                        value={editingSectionTitle}
                        onChange={(e) => setEditingSectionTitle(e.target.value)}
                        placeholder="e.g. Velmora Coffee Artisan Repertoire"
                        className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[#D4AF37] font-bold uppercase tracking-wider block">Section Subtitle / Description</label>
                      <textarea
                        rows={3}
                        value={editingSectionSubtitle}
                        onChange={(e) => setEditingSectionSubtitle(e.target.value)}
                        placeholder="e.g. Handcrafted single-origin Arabica roasts & specialty barista drinks"
                        className="w-full bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] resize-none"
                      />
                    </div>

                    {/* Category Tabs Customizer */}
                    <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
                      <div className="flex items-center justify-between">
                        <label className="text-[#D4AF37] font-bold uppercase tracking-wider block">
                          {lang === 'bn' ? 'ক্যাটাগরি পিল বাটন সমূহ (Category Tabs)' : 'Category Filter Buttons'}
                        </label>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {editingCategories.length} tabs
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {editingCategories.map((cat, idx) => (
                          <div key={cat.id || idx} className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border border-amber-500/30">
                              {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={cat.label}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingCategories(prev => prev.map((c, i) => i === idx ? { ...c, label: val } : c));
                              }}
                              placeholder="Category Label"
                              className="flex-1 bg-[#090805] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-white font-medium outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Heading Presets */}
                    <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
                      <span className="text-[10px] font-bold text-stone-400 block">{lang === 'bn' ? 'তাত্ক্ষণিক প্রিসেট সমূহ:' : 'Quick Heading Presets:'}</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {[
                          {
                            label: '☕ Specialty Coffee',
                            tagline: '☕ — ARTISAN HAND-ROASTED SPECIALTY COFFEE —',
                            title: 'Artisan Roasts & Espresso Flights',
                            sub: 'Handcrafted single-origin Arabica roasts, micro-foam lattes, and slow drip cold brews.'
                          },
                          {
                            label: '🍽️ Haute Gastronomy',
                            tagline: '✨ — MICHELIN-INSPIRED TASTING COURSES —',
                            title: 'Haute Cuisine & Tasting Courses',
                            sub: 'Every dish is an architectural composition of rare seasonal provenance, wild herbs, and culinary precision.'
                          },
                          {
                            label: '🥩 Reserve Steakhouse',
                            tagline: '🔥 — WOOD-FIRED CHARCOAL & DRY-AGED CUTS —',
                            title: 'Prime Wagyu & Reserve Grill',
                            sub: '45-day dry-aged cuts seared over wild white oak charcoal and finished with Himalayan smoked salt.'
                          },
                          {
                            label: '🍕 Italian Trattoria',
                            tagline: '🌿 — STONE-OVEN ARTISAN RECIPES —',
                            title: 'Handmade Pasta & Wood-Fired Pizza',
                            sub: 'Authentic stone-oven delicacies crafted with Italian San Marzano tomatoes and creamy burrata.'
                          }
                        ].map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => {
                              setEditingSectionTagline(preset.tagline);
                              setEditingSectionTitle(preset.title);
                              setEditingSectionSubtitle(preset.sub);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#090805] hover:bg-[#D4AF37] text-amber-200 hover:text-stone-950 transition-all cursor-pointer border border-[#D4AF37]/30"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-300 font-medium">Manage theme food items & prices:</span>
                      <button
                        onClick={() => {
                          const newDish: FoodItem = {
                            id: `custom-${Date.now()}`,
                            title: 'New Artisan Signature Drink',
                            price: 6.50,
                            calories: '160 kcal',
                            desc: 'Handcrafted espresso drink made with premium Arabica beans & organic milk.',
                            img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop',
                            category: 'coffee',
                            isPopular: true
                          };
                          setEditingDishes(prev => [newDish, ...prev]);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-stone-950 font-bold text-xs hover:brightness-110 cursor-pointer shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Food Item</span>
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                      {editingDishes.map((dish, idx) => (
                        <div key={dish.id} className="p-4 rounded-2xl bg-[#090805] border border-white/10 space-y-3">
                          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                            <span className="font-mono text-[#D4AF37] font-bold text-xs">Item #{idx + 1}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  if (idx === 0) return;
                                  const copy = [...editingDishes];
                                  const temp = copy[idx];
                                  copy[idx] = copy[idx - 1];
                                  copy[idx - 1] = temp;
                                  setEditingDishes(copy);
                                }}
                                disabled={idx === 0}
                                className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (idx === editingDishes.length - 1) return;
                                  const copy = [...editingDishes];
                                  const temp = copy[idx];
                                  copy[idx] = copy[idx + 1];
                                  copy[idx + 1] = temp;
                                  setEditingDishes(copy);
                                }}
                                disabled={idx === editingDishes.length - 1}
                                className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingDishes(prev => prev.filter(d => d.id !== dish.id))}
                                className="p-1.5 rounded bg-red-950 hover:bg-red-900 text-red-200 cursor-pointer ml-2"
                                title="Delete Food Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2 space-y-1">
                              <label className="text-stone-400 font-medium text-[11px] block">Title</label>
                              <input
                                type="text"
                                value={dish.title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, title: val } : d));
                                }}
                                className="w-full bg-[#14120B] border border-white/20 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#D4AF37]"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-stone-400 font-medium text-[11px] block">Price ($)</label>
                              <input
                                type="number"
                                step="0.5"
                                value={dish.price}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, price: val } : d));
                                }}
                                className="w-full bg-[#14120B] border border-white/20 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#D4AF37]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-stone-400 font-medium text-[11px] block">Image URL</label>
                              <input
                                type="text"
                                value={dish.img}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, img: val } : d));
                                }}
                                className="w-full bg-[#14120B] border border-white/20 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#D4AF37] font-mono text-[11px]"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-stone-400 font-medium text-[11px] block">Calories / Tag</label>
                              <input
                                type="text"
                                value={dish.calories || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, calories: val } : d));
                                }}
                                placeholder="e.g. 180 kcal"
                                className="w-full bg-[#14120B] border border-white/20 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#D4AF37]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-stone-400 font-medium text-[11px] block">Description</label>
                            <input
                              type="text"
                              value={dish.desc}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, desc: val } : d));
                              }}
                              className="w-full bg-[#14120B] border border-white/20 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>

                          <div className="flex items-center gap-4 pt-1">
                            <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!dish.isChefSpecial}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, isChefSpecial: checked } : d));
                                }}
                                className="rounded text-[#D4AF37]"
                              />
                              <span>Chef Special Badge</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!dish.isPopular}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setEditingDishes(prev => prev.map(d => d.id === dish.id ? { ...d, isPopular: checked } : d));
                                }}
                                className="rounded text-[#D4AF37]"
                              />
                              <span>Signature / Popular Badge</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-[#090805] border-t border-[#D4AF37]/30 flex items-center justify-between shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => setIsMenuEditorOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-transparent border border-red-500/50 text-red-400 font-bold text-xs uppercase hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 cursor-pointer shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const payload = {
                      ...(themeEdits || {}),
                      menuSectionTagline: editingSectionTagline,
                      menuSectionTitle: editingSectionTitle,
                      menuSectionSubtitle: editingSectionSubtitle,
                      categories: editingCategories,
                      dishes: editingDishes
                    };
                    if (typeof window !== 'undefined') {
                      try {
                        localStorage.setItem(`theme_edits_${activePresetId}`, JSON.stringify(payload));
                        localStorage.setItem(`theme_dishes_${activePresetId}`, JSON.stringify(editingDishes));
                        const rawAdmin = localStorage.getItem('webar_restaurant_admin_settings');
                        if (rawAdmin) {
                          const parsedAdmin = JSON.parse(rawAdmin);
                          parsedAdmin.menuSectionTagline = editingSectionTagline;
                          parsedAdmin.menuSectionTitle = editingSectionTitle;
                          parsedAdmin.menuSectionSubtitle = editingSectionSubtitle;
                          parsedAdmin.themeCategories = editingCategories;
                          localStorage.setItem('webar_restaurant_admin_settings', JSON.stringify(parsedAdmin));
                        }
                      } catch (err) {
                        console.error('Failed to save menu theme edits:', err);
                      }
                    }
                    setThemeEditsState(payload);
                    setIsMenuEditorOpen(false);
                    setToastMsg(lang === 'bn' ? '✅ মেনু সেকশন ও শিরোনাম সফলভাবে আপডেট হয়েছে!' : '✅ Menu section & headings updated successfully!');
                    setTimeout(() => setToastMsg(null), 3000);
                  }}
                  className="px-7 py-2.5 rounded-xl bg-transparent border border-white/30 text-white font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer hover:bg-[#D4AF37] hover:text-stone-950 hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-2"
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
      {/* 10. ABOUT US / "WHY DINE WITH US?" LIVE IN-PLACE EDITOR MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAboutUsEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            onClick={() => setIsAboutUsEditorOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14120B] border-2 border-[#D4AF37] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl flex flex-col max-h-[92vh] my-auto select-text"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-[#090805] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-[#FBF8EE] uppercase tracking-wider">
                      {lang === 'bn' ? '"কেন আমাদের কাছে খাবেন?" সেকশন এডিটর' : 'Edit "Why Dine With Us?" (About Us) Section'}
                    </h3>
                    <p className="text-[11px] text-[#FBF8EE]/60 font-light">
                      {lang === 'bn' ? 'শিরোনাম, বিবরণ, ছবি ও ৪টি মূল ফিচার পরিবর্তন করুন' : 'Edit badge, title, story, image & 4 feature bullet points'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutUsEditorOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-amber-500/30">
                {/* 1. Subtitle & Main Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                      {lang === 'bn' ? 'টপ সাবটাইটেল ব্যাজ (Badge)' : 'Top Subtitle Badge'}
                    </label>
                    <input
                      type="text"
                      value={editingAboutUsSubtitle}
                      onChange={(e) => setEditingAboutUsSubtitle(e.target.value)}
                      placeholder="ABOUT US"
                      className="w-full bg-[#090805] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-xs text-[#FBF8EE] outline-none focus:border-[#D4AF37] font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                      {lang === 'bn' ? 'প্রধান শিরোনাম (Main Title)' : 'Main Title Heading'}
                    </label>
                    <input
                      type="text"
                      value={editingAboutUsTitle}
                      onChange={(e) => setEditingAboutUsTitle(e.target.value)}
                      placeholder="Why Dine With Us?"
                      className="w-full bg-[#090805] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-xs text-[#FBF8EE] outline-none focus:border-[#D4AF37] font-bold"
                    />
                  </div>
                </div>

                {/* 2. Story / Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                    {lang === 'bn' ? 'পরিচিতি বিবরণ / গল্প (Story Description)' : 'Story Description'}
                  </label>
                  <textarea
                    rows={3}
                    value={editingAboutUsText}
                    onChange={(e) => setEditingAboutUsText(e.target.value)}
                    placeholder="Redefining luxury dining experiences..."
                    className="w-full bg-[#090805] border border-[#D4AF37]/40 rounded-xl p-3.5 text-xs text-[#FBF8EE] outline-none focus:border-[#D4AF37] leading-relaxed resize-none"
                  />
                </div>

                {/* 3. Section Image */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                    {lang === 'bn' ? 'সেকশনের ছবি (Section Image)' : 'Section Image URL'}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black border border-[#D4AF37]/40 shrink-0 shadow-md">
                      <img 
                        src={editingAboutUsImage || activeAboutUsImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={editingAboutUsImage}
                        onChange={(e) => setEditingAboutUsImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#090805] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-xs text-[#FBF8EE] outline-none focus:border-[#D4AF37] font-mono"
                      />
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-stone-400 font-bold">{lang === 'bn' ? 'প্রিসেট ছবি:' : 'Presets:'}</span>
                        {[
                          { label: '☕ Coffee Barista', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop' },
                          { label: '🍽️ Luxury Dining', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop' },
                          { label: '👨‍🍳 Master Chef', url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1000&auto=format&fit=crop' },
                          { label: '🥐 Fresh Bakery', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop' }
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setEditingAboutUsImage(preset.url)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#090805] hover:bg-[#D4AF37] text-amber-200 hover:text-stone-950 transition-all cursor-pointer border border-[#D4AF37]/30"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. 4 Feature Bullet Points */}
                <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
                  <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center justify-between">
                    <span>{lang === 'bn' ? '৪টি মূল বৈশিষ্ট্য (4 Features Checklist)' : '4 Key Feature Bullet Points'}</span>
                    <span className="text-[10px] font-normal text-amber-300">4 Points</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((index) => {
                      const currentFeatures = editingAboutUsFeatures.length > 0 ? editingAboutUsFeatures : [
                        '100% Fresh Organic Ingredients',
                        'Chef-Curated Gourmet Menu',
                        '3D Interactive WebAR Food Previews',
                        'Fast Home Delivery & Table Ordering'
                      ];
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40 font-mono text-xs font-black">
                            {index + 1}
                          </div>
                          <input
                            type="text"
                            value={currentFeatures[index] || ''}
                            onChange={(e) => {
                              const updated = [...currentFeatures];
                              updated[index] = e.target.value;
                              setEditingAboutUsFeatures(updated);
                            }}
                            placeholder={`Feature ${index + 1}`}
                            className="flex-1 bg-[#090805] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#FBF8EE] outline-none focus:border-[#D4AF37] font-bold"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 bg-[#090805] border-t border-[#D4AF37]/30 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAboutUsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveAboutUsEdits}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#b58f27] hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সংরক্ষণ করুন (Save)' : 'Save Changes'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#D4AF37] text-stone-950 font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-white/40"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Floating Scroll To Top Button (Hidden when any modal is open) */}
      {!editingSingleDish && !selectedDishDetail && !isMenuEditorOpen && (
        <div className={
          previewDeviceView 
            ? "sticky bottom-5 flex justify-end px-5 pointer-events-none z-50 -mt-16 w-full" 
            : "fixed bottom-5 right-5 z-50"
        }>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              const heroEl = document.getElementById('hero');
              if (heroEl) {
                heroEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-11 h-11 bg-[#DA9F93] hover:bg-[#c88d81] text-[#120a06] flex items-center justify-center rounded-xl transition-transform active:scale-90 cursor-pointer shadow-2xl border border-white/20 pointer-events-auto"
            title={lang === 'bn' ? 'উপরে যান' : 'Scroll to top'}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      )}

    </div>
  );
}
