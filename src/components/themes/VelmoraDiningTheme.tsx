import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Sparkles, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, ChevronUp, Play, Pause, ShoppingBag, ArrowUpRight, 
  Menu, X, Heart, Shield, QrCode, Check, Compass, Search, Bell,
  Award, ChefHat, Utensils, Wine, Gem, Users, CheckCircle2,
  Edit3, Plus, Trash2, ArrowUp, ArrowDown, Save, Image as ImageIcon, Sliders
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import { CAFE_HERO_PRESETS } from '../../data/cafeHeroPresets';
import FooterAndLocation from '../FooterAndLocation';
import { KoppeeHeroHeader, THEME_HERO_CONFIGS, KOPPEE_SLIDES } from './KoppeeHeroHeader';
import { KoppeeAboutSection } from './KoppeeAboutSection';
import { KoppeeDeliverySection } from './KoppeeDeliverySection';
import { KoppeeFooterSection } from './KoppeeFooterSection';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';
import cleanCoffeeBg from '../../assets/images/clean_coffee_bg_1790179641546.jpg';

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
      backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.92), rgba(18, 18, 18, 0.97)), url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&auto=format&fit=crop')`,
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
      backgroundImage: `linear-gradient(to bottom, rgba(18, 13, 10, 0.90), rgba(10, 7, 5, 0.96)), url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&auto=format&fit=crop')`,
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
    title: 'Oscietra Caviar & 24k Gold Blinis', 
    price: 110.00, 
    calories: '210 kcal', 
    desc: 'Grand Reserve Oscietra sturgeon caviar served on warm buckwheat blinis with 24k edible gold leaf and crème fraîche.', 
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop', 
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
    title: 'A5 Miyazaki Wagyu Ribeye & Bone Marrow', 
    price: 145.00, 
    calories: '680 kcal', 
    desc: 'Miyazaki A5 Wagyu tenderloin with roasted bone marrow, black Périgord truffle jus and smoked Maldon salt.', 
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop', 
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
    title: '24k Gold Flake Valrhona Chocolate Sphere', 
    price: 32.00, 
    calories: '380 kcal', 
    desc: '70% Guanaja dark chocolate molten sphere served with Madagascar Bourbon vanilla anglaise and edible 24k gold flakes.', 
    img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop', 
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

  // Compute effective brand name (default to 'My Restaurant' until customized)
  const effectiveThemeBrandName = (() => {
    const custom = brandName || settings?.brandName;
    if (isDemoOrPlaceholderBrand(custom)) {
      return 'My Restaurant';
    }
    return custom!.trim();
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
  const [editorActiveTab, setEditorActiveTab] = useState<'dishes' | 'headings'>('dishes');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Single Card Editor & Card Mode
  const [editingSingleDish, setEditingSingleDish] = useState<FoodItem | null>(null);
  const [isCardEditMode, setIsCardEditMode] = useState<boolean>(true);
  const [savedDishIds, setSavedDishIds] = useState<Set<string>>(new Set());

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

  const activePresetId = themePresetId || settings?.activeThemeId || 'velmora-dining';
  const pageCfg = THEME_PAGE_CONFIGS[activePresetId] || THEME_PAGE_CONFIGS['velmora-dining'] || THEME_PAGE_CONFIGS['lumivelle'];

  // Read theme-specific edits if they exist for activePresetId ONLY
  const themeEdits = typeof window !== 'undefined' ? (() => {
    try {
      const raw = localStorage.getItem(`theme_edits_${activePresetId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })() : null;

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

  const categories = activePresetId === 'velmora-dining' ? [
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

  const defaultMenuTitle = activePresetId === 'orivelle-house'
    ? 'Orivelle Haute Gastronomy & Private Cellar'
    : 'Haute Cuisine & Tasting Courses';

  const defaultMenuSubtitle = activePresetId === 'orivelle-house'
    ? 'An exclusive repertoire of haute gastronomy, 24k gold leaf infusions, and private cellar reserves.'
    : 'Every dish is an architectural composition of rare seasonal provenance, wild herbs, and culinary precision.';

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

  const activeHeroBgImage = 
    themeEdits?.heroBackgroundImage ||
    settings?.themeSettings?.[activePresetId]?.heroBackgroundImage ||
    THEME_HERO_CONFIGS[activePresetId]?.heroBgImage ||
    cleanCoffeeBg;

  const activeHeroSlides = 
    themeEdits?.heroSlides ||
    settings?.themeSettings?.[activePresetId]?.heroSlides ||
    CAFE_HERO_PRESETS[activePresetId] ||
    KOPPEE_SLIDES;

  const activeAboutUsImage = 
    themeEdits?.aboutUsImage ||
    settings?.themeSettings?.[activePresetId]?.aboutUsImage ||
    THEME_HERO_CONFIGS[activePresetId]?.heroBgImage ||
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop';

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
          heroTitle={themeEdits?.heroTitle || settings?.themeSettings?.[activePresetId]?.heroTitle || settings?.heroTitle || settings?.hero?.title}
          heroSubtitle={themeEdits?.heroSubtitle || settings?.themeSettings?.[activePresetId]?.heroSubtitle || settings?.heroSubtitle || settings?.hero?.subtitle}
          heroBackgroundImage={activeHeroBgImage}
          heroSlides={activeHeroSlides}
          onReserveClick={() => setReservationModalOpen(true)}
          onMenuClick={() => {
            const el = document.getElementById('tasting-menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAdmin={onOpenAdmin}
          showAdminButton={settings?.showAdminButton === true}
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
        lang={lang}
        themePresetId={activePresetId}
        previewDeviceView={previewDeviceView}
      />

      {/* ========================================================= */}
      {/* 3. TASTING MENU & GOURMET CULINARY SHOWCASE */}
      {/* ========================================================= */}
      <section id="tasting-menu" className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-[1800px] mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto relative group">
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase block" style={{ color: pageCfg.accentColor }}>
            {themeEdits?.menuSectionTagline || settings?.menuSectionTagline || pageCfg.repertoireTag}
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF8EE]"
            style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
          >
            {themeEdits?.menuSectionTitle || settings?.menuSectionTitle || defaultMenuTitle}
          </h2>
          <p className="text-sm text-[#FBF8EE]/70 font-light">
            {themeEdits?.menuSectionSubtitle || settings?.menuSectionSubtitle || defaultMenuSubtitle}
          </p>
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
            onClick={() => setIsMenuEditorOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-[#14120B] hover:bg-stone-800 border border-[#D4AF37]/60 text-amber-300 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Edit Food Section & Menu Items"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Edit Section</span>
          </button>
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
            ) : activePresetId === 'orivelle-house' ? (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-b from-[#18181c] via-[#0f0f12] to-[#0a0a0c] border-2 border-amber-400/50 rounded-tl-3xl rounded-br-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-amber-300 hover:shadow-[0_0_35px_rgba(229,193,88,0.45)] hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-300 via-amber-500 to-transparent opacity-80 pointer-events-none z-10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                <div className="relative h-56 overflow-hidden bg-black">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {dish.isChefSpecial && <span className="px-3 py-1 rounded-tl-lg rounded-br-lg bg-gradient-to-r from-red-900 to-amber-900 text-amber-200 text-[9px] font-black uppercase tracking-widest border border-amber-400/60 flex items-center gap-1 shadow-lg backdrop-blur-sm"><Crown className="w-3 h-3 text-amber-300" /> Michelin Chef</span>}
                    {dish.isPopular && <span className="px-3 py-1 rounded-tl-lg rounded-br-lg bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 text-stone-950 text-[9px] font-black uppercase tracking-widest shadow-lg">👑 24K Signature</span>}
                  </div>
                  {dish.calories && <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-[10px] text-amber-300 font-mono border border-amber-400/40 backdrop-blur-md">{dish.calories}</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-lg sm:text-xl text-amber-100 transition-colors line-clamp-2 leading-snug break-words tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>{dish.title}</h3>
                      <span className="font-serif font-black text-lg shrink-0 text-[#e5c158] drop-shadow-[0_0_8px_rgba(229,193,88,0.4)]">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed font-light">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-amber-400/20">
                    <button onClick={() => setSelectedDishDetail(dish)} className="py-2.5 rounded-tl-xl rounded-br-xl bg-stone-950/90 border border-amber-400/40 text-amber-200 text-[11px] font-black uppercase tracking-wider hover:bg-stone-900 hover:border-amber-300 transition-all text-center cursor-pointer">Details</button>
                    <button onClick={() => { if (onOrderDish) onOrderDish(dish); }} className="py-2.5 rounded-tl-xl rounded-br-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-stone-950 text-[11px] font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(229,193,88,0.35)] cursor-pointer"><ShoppingBag className="w-3.5 h-3.5" /><span>Order</span></button>
                  </div>
                </div>
              </motion.div>
            ) : activePresetId === 'aurelisse' ? (
              <motion.div key={dish.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative bg-[#1c082e] border-2 border-purple-500/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:border-purple-300">
                <div className="relative h-56 overflow-hidden bg-black/60">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c082e] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3"><span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[9px] font-black uppercase tracking-widest shadow-md">⚜️ Royal Crest</span></div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-purple-100" style={{ fontFamily: "'Prata', serif" }}>{dish.title}</h3>
                      <span className="font-mono font-bold text-base text-purple-300">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-purple-200/70 line-clamp-2">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-500/20">
                    <button onClick={() => setSelectedDishDetail(dish)} className="py-2 rounded-xl bg-purple-950/80 border border-purple-400/40 text-purple-200 text-[11px] font-bold">Details</button>
                    <button onClick={() => { if (onOrderDish) onOrderDish(dish); }} className="py-2 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500 text-white text-[11px] font-black flex items-center justify-center gap-1"><ShoppingBag className="w-3 h-3" /><span>Order</span></button>
                  </div>
                </div>
              </motion.div>
            ) : activePresetId === 'palatiora' ? (
              <motion.div key={dish.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative bg-[#1c1410] border-2 border-amber-600/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:border-amber-400">
                <div className="relative h-56 overflow-hidden bg-black/60">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1410] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded bg-amber-600 text-stone-950 text-[9px] font-black uppercase tracking-wider">🥩 Dry-Aged Prime</span></div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-amber-100" style={{ fontFamily: "'DM Serif Display', serif" }}>{dish.title}</h3>
                      <span className="font-mono font-bold text-base text-amber-400">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-amber-200/70 line-clamp-2">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-600/20">
                    <button onClick={() => setSelectedDishDetail(dish)} className="py-2 rounded bg-stone-950 border border-amber-600/40 text-amber-200 text-[11px] font-bold">Details</button>
                    <button onClick={() => { if (onOrderDish) onOrderDish(dish); }} className="py-2 rounded bg-amber-500 text-stone-950 text-[11px] font-black flex items-center justify-center gap-1"><ShoppingBag className="w-3 h-3" /><span>Order</span></button>
                  </div>
                </div>
              </motion.div>
            ) : activePresetId === 'opalune' ? (
              <motion.div key={dish.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative bg-[#0a1826]/90 border-2 border-cyan-400/50 rounded-2xl overflow-hidden flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] hover:border-cyan-300">
                <div className="relative h-56 overflow-hidden bg-black/60">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1826] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-black uppercase tracking-wider">❄️ Nitro Ice</span></div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-cyan-100">{dish.title}</h3>
                      <span className="font-mono font-bold text-base text-cyan-300">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-cyan-200/70 line-clamp-2">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-500/20">
                    <button onClick={() => setSelectedDishDetail(dish)} className="py-2 rounded-xl bg-slate-950 border border-cyan-400/40 text-cyan-200 text-[11px] font-bold">Details</button>
                    <button onClick={() => { if (onOrderDish) onOrderDish(dish); }} className="py-2 rounded-xl bg-cyan-400 text-slate-950 text-[11px] font-black flex items-center justify-center gap-1"><ShoppingBag className="w-3 h-3" /><span>Order</span></button>
                  </div>
                </div>
              </motion.div>
            ) : activePresetId === 'emberion' ? (
              <motion.div key={dish.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative bg-[#1f0a0a] border-2 border-orange-500/60 rounded-tr-3xl rounded-bl-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(249,115,22,0.4)] hover:border-orange-400">
                <div className="relative h-56 overflow-hidden bg-black/60">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f0a0a] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded bg-orange-600 text-white text-[9px] font-black uppercase tracking-wider">🔥 Wood-Fired</span></div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-orange-100">{dish.title}</h3>
                      <span className="font-mono font-bold text-base text-orange-400">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-orange-200/70 line-clamp-2">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-orange-500/20">
                    <button onClick={() => setSelectedDishDetail(dish)} className="py-2 rounded bg-black border border-orange-500/40 text-orange-200 text-[11px] font-bold">Details</button>
                    <button onClick={() => { if (onOrderDish) onOrderDish(dish); }} className="py-2 rounded bg-gradient-to-r from-orange-500 to-red-600 text-white text-[11px] font-black flex items-center justify-center gap-1"><ShoppingBag className="w-3 h-3" /><span>Order</span></button>
                  </div>
                </div>
              </motion.div>
            ) : activePresetId === 'couravelle' ? (
              <motion.div key={dish.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative bg-[#0c1c14] border-2 border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:border-emerald-400">
                <div className="relative h-56 overflow-hidden bg-black/60">
                  <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1c14] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded-full bg-emerald-500 text-stone-950 text-[9px] font-black uppercase tracking-wider">🌿 Tuscan Garden</span></div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-emerald-100">{dish.title}</h3>
                      <span className="font-mono font-bold text-base text-emerald-400">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-xs text-emerald-200/70 line-clamp-2">{dish.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20">
                    <button onClick={() => setSelectedDishDetail(dish)} className="py-2 rounded-xl bg-stone-950 border border-emerald-500/40 text-emerald-200 text-[11px] font-bold">Details</button>
                    <button onClick={() => { if (onOrderDish) onOrderDish(dish); }} className="py-2 rounded-xl bg-emerald-500 text-stone-950 text-[11px] font-black flex items-center justify-center gap-1"><ShoppingBag className="w-3 h-3" /><span>Order</span></button>
                  </div>
                </div>
              </motion.div>
            ) : (
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
            )
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GRAND EXECUTIVE CHEF SECTION (HORIZONTAL CONTINUOUS MARQUEE ON WHITE) */}
      {/* ========================================================= */}
      {isChefSectionVisible && (
        <section id="chefs" className="py-16 sm:py-24 bg-white border-y border-[#DA9F93]/30 scroll-mt-20 overflow-hidden">
          <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 space-y-4">
            
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
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

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
      <AnimatePresence>
        {selectedDishDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            onClick={() => setSelectedDishDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14120B] border-2 border-[#D4AF37] rounded-3xl overflow-hidden max-w-4xl md:max-w-5xl w-full shadow-2xl flex flex-col max-h-[92vh] my-auto relative"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#090805] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b58f27] text-stone-950 font-black text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    {selectedDishDetail.category || 'Specialty'}
                  </span>
                  {selectedDishDetail.isChefSpecial && (
                    <span className="px-3 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-200 text-[10px] font-bold uppercase tracking-wider">
                      Chef's Special
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const d = selectedDishDetail;
                      setSelectedDishDetail(null);
                      setEditingSingleDish(d);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-stone-950 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Item</span>
                  </button>
                  <button
                    onClick={() => setSelectedDishDetail(null)}
                    className="p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer border border-white/20"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Container */}
              <div id="dish-modal-scroll-body" className="p-5 sm:p-8 overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-amber-500/30">
                
                {/* 2-Column Main Item View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                  
                  {/* Left Column: Food Image */}
                  <div className="relative h-64 sm:h-80 md:h-[380px] w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-black group">
                    <img 
                      src={selectedDishDetail.img} 
                      alt={selectedDishDetail.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14120B] via-transparent to-black/40" />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/50 text-amber-300 font-mono text-xs font-bold">
                      📸 High-Res Gourmet Selection
                    </div>
                  </div>

                  {/* Right Column: Title, Details & Ordering */}
                  <div className="space-y-5 flex flex-col justify-between h-full">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 
                          className="text-2xl sm:text-3xl font-bold text-[#FBF8EE] leading-tight"
                          style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                        >
                          {selectedDishDetail.title}
                        </h3>
                        <span className="font-mono text-2xl sm:text-3xl font-black text-[#D4AF37] shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                          {formatPrice(selectedDishDetail.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#D4AF37] font-mono bg-[#090805] px-3 py-1.5 rounded-xl border border-white/10 w-fit">
                        <span>🔥 {selectedDishDetail.calories || '180 kcal'}</span>
                        <span>•</span>
                        <span>⏱️ Prep Time: 5-8 mins</span>
                      </div>

                      <p className="text-sm text-[#FBF8EE]/85 leading-relaxed font-light">
                        {selectedDishDetail.desc}
                      </p>

                      {/* Barista / Chef Notes */}
                      <div className="p-4 rounded-2xl bg-[#090805] border border-[#D4AF37]/40 text-xs space-y-1 shadow-inner">
                        <span className="font-bold text-[#D4AF37] uppercase tracking-wider block text-[11px] flex items-center gap-1">
                          ✨ Artisanal Recipe & Barista Notes
                        </span>
                        <p className="text-[#FBF8EE]/75 font-light text-[11px] leading-relaxed">
                          Prepared fresh on demand using single-origin premium beans, micro-filtered mountain spring water, and signature organic froth.
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Order Note Controls */}
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FBF8EE] uppercase tracking-wider">Order Quantity</span>
                        <div className="flex items-center gap-3 bg-[#090805] border border-[#D4AF37]/50 rounded-full px-4 py-1.5 shadow-md">
                          <button 
                            type="button"
                            onClick={() => setDetailOrderQty(prev => Math.max(1, prev - 1))}
                            className="text-amber-400 font-bold text-lg hover:text-white px-2 cursor-pointer active:scale-95 transition-transform"
                          >
                            -
                          </button>
                          <span className="font-mono text-sm font-bold text-white w-6 text-center">{detailOrderQty}</span>
                          <button 
                            type="button"
                            onClick={() => setDetailOrderQty(prev => prev + 1)}
                            className="text-amber-400 font-bold text-lg hover:text-white px-2 cursor-pointer active:scale-95 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Special instructions (e.g. Less sugar, oat milk, extra hot)..."
                        value={detailSpecialNote}
                        onChange={(e) => setDetailSpecialNote(e.target.value)}
                        className="w-full bg-[#090805] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-xs text-[#FBF8EE] outline-none focus:border-[#D4AF37] placeholder:text-stone-500 font-sans"
                      />

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
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#090805] font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-98 cursor-pointer flex items-center justify-center gap-2 transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Order ({formatPrice((typeof selectedDishDetail.price === 'number' ? selectedDishDetail.price : parseFloat(selectedDishDetail.price as any) || 0) * detailOrderQty)})</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Scroll Down Section: More Delicacies / Related Items Grid */}
                <div className="pt-6 border-t-2 border-[#D4AF37]/30 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                        ✨ More Delicacies — Tap Any Item to View Enlarged
                      </h4>
                      <p className="text-xs text-stone-400 font-light">Scroll down to explore all gourmet selections in our menu</p>
                    </div>
                    <span className="text-xs text-amber-300 font-mono bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full w-fit">
                      {effectiveDishes.length - 1} More Items Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
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
                          className="bg-[#090805] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] group shadow-lg flex flex-col justify-between"
                        >
                          <div className="h-28 sm:h-32 overflow-hidden relative">
                            <img 
                              src={otherDish.img} 
                              alt={otherDish.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/85 border border-amber-400/50 text-[10px] font-mono font-bold text-amber-300">
                              {formatPrice(otherDish.price)}
                            </span>
                          </div>
                          <div className="p-2.5 space-y-1">
                            <h5 className="font-bold text-xs text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                              {otherDish.title}
                            </h5>
                            <p className="text-[10px] text-stone-400 line-clamp-1 font-light">
                              {otherDish.desc}
                            </p>
                            <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block pt-1">
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
                      dishes: editingDishes
                    };
                    if (typeof window !== 'undefined') {
                      try {
                        localStorage.setItem(`theme_edits_${activePresetId}`, JSON.stringify(payload));
                        localStorage.setItem(`theme_dishes_${activePresetId}`, JSON.stringify(editingDishes));
                      } catch {}
                    }
                    setIsMenuEditorOpen(false);
                    setToastMsg(lang === 'bn' ? '✅ সেভ হয়েছে (Saved successfully)!' : '✅ Saved successfully!');
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

      {/* Floating Toast Notification */}
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
