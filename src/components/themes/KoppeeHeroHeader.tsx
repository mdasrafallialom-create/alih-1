import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Menu, X, ChevronDown, Calendar, Search, ShieldCheck, ArrowLeft, Utensils, Sparkles, MoreVertical, MoreHorizontal, PhoneCall } from 'lucide-react';
import { TornPaperEdge } from './TornPaperEdge';
import { OrivelleGeometricDivider } from './OrivelleGeometricDivider';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';
import cleanCoffeeBg from '../../assets/images/clean_coffee_bg_1790179641546.jpg';
import whiteCoffeeCupImg from '../../assets/images/white_coffee_cup_isolated_trimmed.png';
import whiteCupSideImg from '../../assets/images/white_cup_side_isolated.png';
import whiteCappuccinoCupImg from '../../assets/images/white_cappuccino_isolated.png';
import { HeroAnimatedElement } from './HeroAnimatedElement';
import { BotanicalCoffeeLeaves } from './BotanicalCoffeeLeaves';
import { checkAdminPasswordInput, getThemeAdminButtonVisibility } from '../../lib/adminHelpers';
import { LUXURY_THEMES } from '../../data/luxuryThemes';
import { CAFE_HERO_PRESETS } from '../../data/cafeHeroPresets';

interface KoppeeHeroHeaderProps {
  brandName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: string;
  heroSlides?: any[];
  onOrderClick?: () => void;
  onReserveClick?: () => void;
  onMenuClick?: () => void;
  onNavigate?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  onBack?: () => void;
  showAdminButton?: boolean;
  lang?: string;
  themePresetId?: string;
  previewDeviceView?: 'desktop' | 'tablet' | 'mobile';
}

export interface ThemeHeroConfig {
  accentColor: string;
  accentTextClass: string;
  accentBorderClass: string;
  logoBadgeClass: string;
  heroBadgeTag: string;
  navHoverClass: string;
  navActiveClass: string;
  primaryBtnClass: string;
  secondaryBtnClass: string;
  imageFrameClass: string;
  searchFocusClass: string;
  bgGradientOverlay: string;
  headerBg: string;
  heroBgImage: string;
}

export const THEME_HERO_CONFIGS: Record<string, ThemeHeroConfig> = {
  // #01 Velmora Dining (Artisan Coffee Theme matching user's requested coffee bean background & sculpted cup)
  'velmora-dining': {
    accentColor: '#d4a373',
    accentTextClass: 'text-[#d4a373]',
    accentBorderClass: 'border-[#d4a373]/50',
    logoBadgeClass: 'bg-gradient-to-br from-[#c89666] via-[#b37d4e] to-[#4a2810] text-[#fff8f0] font-black border border-[#f3d5b5]/40 shadow-lg shadow-black/70',
    heroBadgeTag: '☕ ARTISAN HAND-ROASTED SPECIALTY COFFEE',
    navHoverClass: 'hover:text-[#d4a373]',
    navActiveClass: 'text-[#d4a373] border-b-2 border-[#d4a373]',
    primaryBtnClass: 'bg-[#c89666] hover:bg-[#b58253] text-[#1a0f08] font-black rounded-lg shadow-[0_0_25px_rgba(200,150,102,0.5)] border border-[#f3d5b5]/40',
    secondaryBtnClass: 'bg-black/70 hover:bg-black/90 text-[#f5ebe0] border border-[#d4a373]/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-[#d4a373]/50 rounded-2xl shadow-2xl',
    searchFocusClass: 'focus:border-[#d4a373] focus:ring-[#d4a373]',
    bgGradientOverlay: 'from-[#120a06]/70 via-[#180e07]/80 to-[#0d0704]/95',
    headerBg: 'bg-gradient-to-b from-black/90 via-black/50 to-transparent',
    heroBgImage: cleanCoffeeBg
  },
  // #02 Orivelle House (Wood-Fired Artisanal Pizzeria & Haute Gastronomy)
  'orivelle-house': {
    accentColor: '#e5c158',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 text-stone-950 font-black border border-amber-200 shadow-xl shadow-black/80',
    heroBadgeTag: '🍕 ARTISANAL WOOD-FIRED GOURMET PIZZA',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-black rounded-lg shadow-[0_0_30px_rgba(229,193,88,0.5)] border border-yellow-200/50',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-black text-amber-200 border border-amber-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_35px_rgba(229,193,88,0.4)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-black/75 via-stone-950/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-black/90 via-black/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1600&auto=format&fit=crop'
  },
  // #03 Lunavere (Parisian Starlight Cafe)
  'lunavere': {
    accentColor: '#C9A86A',
    accentTextClass: 'text-[#C9A86A]',
    accentBorderClass: 'border-[#C9A86A]/50',
    logoBadgeClass: 'bg-gradient-to-br from-[#9A7BB5] via-[#7B5999] to-[#15162B] text-white font-black border border-purple-300/40 shadow-xl',
    heroBadgeTag: '✨ PARISIAN STARLIGHT NIGHT CAFE',
    navHoverClass: 'hover:text-[#C9A86A]',
    navActiveClass: 'text-[#C9A86A] border-b-2 border-[#C9A86A]',
    primaryBtnClass: 'bg-gradient-to-r from-[#C9A86A] to-[#a8864b] hover:from-[#d6b77b] hover:to-[#b89456] text-[#120a06] font-black rounded-xl shadow-[0_0_25px_rgba(201,168,106,0.45)] border border-[#f3e5ab]/40',
    secondaryBtnClass: 'bg-[#15162B]/85 hover:bg-[#1c1d38] text-[#F4E7D3] border border-[#9A7BB5]/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-[#C9A86A]/50 rounded-2xl shadow-[0_0_35px_rgba(154,123,181,0.35)]',
    searchFocusClass: 'focus:border-[#C9A86A] focus:ring-[#C9A86A]',
    bgGradientOverlay: 'from-[#15162B]/80 via-[#1c1d38]/85 to-[#0b0c16]/95',
    headerBg: 'bg-gradient-to-b from-[#15162B]/95 via-[#15162B]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop'
  },
  // #04 Aurelisse (Imperial Monarch Velvet & Caviar)
  'aurelisse': {
    accentColor: '#a855f7',
    accentTextClass: 'text-purple-300',
    accentBorderClass: 'border-purple-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-900 text-white font-black border border-purple-300/50 shadow-xl',
    heroBadgeTag: '⚜️ ROYAL MONARCH DINING & CAVIAR',
    navHoverClass: 'hover:text-purple-300',
    navActiveClass: 'text-purple-400 border-b-2 border-purple-400',
    primaryBtnClass: 'bg-gradient-to-r from-purple-500 via-fuchsia-600 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-black rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-purple-200/40',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-black text-purple-200 border border-purple-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-purple-400/60 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.4)]',
    searchFocusClass: 'focus:border-purple-400 focus:ring-purple-400',
    bgGradientOverlay: 'from-purple-950/75 via-stone-950/85 to-black/95',
    headerBg: 'bg-gradient-to-b from-purple-950/90 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #05 Palatiora (Heritage Cellar & Dry-Aged Wagyu)
  'palatiora': {
    accentColor: '#f59e0b',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-600 via-stone-800 to-stone-950 text-amber-100 font-black border border-amber-400/50 shadow-xl',
    heroBadgeTag: '🍷 DRY-AGED WAGYU & VINTAGE CELLAR',
    navHoverClass: 'hover:text-amber-400',
    navActiveClass: 'text-amber-500 border-b-2 border-amber-500',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-700 hover:from-amber-600 hover:to-orange-800 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(245,158,11,0.45)] border border-amber-300/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    searchFocusClass: 'focus:border-amber-500 focus:ring-amber-500',
    bgGradientOverlay: 'from-stone-950/75 via-amber-950/65 to-black/95',
    headerBg: 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop'
  },
  // #06 Opalune (Modern White Granite & Nitro Cold Brew)
  'opalune': {
    accentColor: '#0d9488',
    accentTextClass: 'text-teal-300',
    accentBorderClass: 'border-teal-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-teal-400 via-cyan-600 to-slate-900 text-white font-black border border-teal-200/50 shadow-xl',
    heroBadgeTag: '💎 MODERN WHITE GRANITE & COLD BREW',
    navHoverClass: 'hover:text-teal-300',
    navActiveClass: 'text-teal-400 border-b-2 border-teal-400',
    primaryBtnClass: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 hover:from-teal-500 hover:to-cyan-600 text-stone-950 font-black rounded-xl shadow-[0_0_30px_rgba(13,148,136,0.5)] border border-teal-200/50',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-stone-900 text-teal-200 border border-teal-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-teal-400/60 rounded-2xl shadow-[0_0_35px_rgba(13,148,136,0.35)]',
    searchFocusClass: 'focus:border-teal-400 focus:ring-teal-400',
    bgGradientOverlay: 'from-slate-950/75 via-teal-950/65 to-black/95',
    headerBg: 'bg-gradient-to-b from-slate-950/90 via-teal-950/40 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop'
  },
  // #07 Emberion (Robata Charcoal & Flame Embers)
  'emberion': {
    accentColor: '#ea580c',
    accentTextClass: 'text-orange-400',
    accentBorderClass: 'border-orange-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-orange-500 via-red-600 to-stone-950 text-white font-black border border-orange-300/50 shadow-xl shadow-orange-950/70',
    heroBadgeTag: '🔥 FIERY COPPER & ROBATA SMOKE',
    navHoverClass: 'hover:text-orange-400',
    navActiveClass: 'text-orange-500 border-b-2 border-orange-500',
    primaryBtnClass: 'bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 hover:from-orange-700 hover:to-red-700 text-white font-black rounded-lg shadow-[0_0_30px_rgba(234,88,12,0.5)] border border-orange-300/40',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-orange-200 border border-orange-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-orange-500/60 rounded-2xl shadow-[0_0_40px_rgba(234,88,12,0.4)]',
    searchFocusClass: 'focus:border-orange-500 focus:ring-orange-500',
    bgGradientOverlay: 'from-orange-950/65 via-stone-950/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-orange-950/90 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop'
  },
  // #08 Couravelle (French Palace Courtyard & Terrace)
  'couravelle': {
    accentColor: '#b45309',
    accentTextClass: 'text-yellow-400',
    accentBorderClass: 'border-yellow-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 text-stone-950 font-black border border-yellow-100 shadow-xl',
    heroBadgeTag: '🏛️ FRENCH PALACE COURTYARD & TERRACE',
    navHoverClass: 'hover:text-yellow-300',
    navActiveClass: 'text-yellow-400 border-b-2 border-yellow-400',
    primaryBtnClass: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(250,204,21,0.45)] border border-yellow-200/60',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-black text-yellow-200 border border-yellow-400/50 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-yellow-400/60 rounded-2xl shadow-[0_0_35px_rgba(250,204,21,0.35)]',
    searchFocusClass: 'focus:border-yellow-400 focus:ring-yellow-400',
    bgGradientOverlay: 'from-amber-950/55 via-stone-950/75 to-black/90',
    headerBg: 'bg-gradient-to-b from-amber-950/80 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&auto=format&fit=crop'
  },
  // #09 Ivorelle (Silk Alabaster Chateau & Champagne)
  'ivorelle': {
    accentColor: '#ca8a04',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-300 via-yellow-400 to-stone-800 text-stone-950 font-black border border-amber-200 shadow-xl',
    heroBadgeTag: '🥂 CHATEAU VINTAGE & CHAMPAGNE',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-black rounded-xl shadow-[0_0_25px_rgba(202,138,4,0.45)] border border-yellow-200/50',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-black text-amber-200 border border-amber-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_35px_rgba(202,138,4,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-stone-950/70 via-stone-900/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop'
  },
  // #10 Caravelle Dining (Celestial Sapphire Skyline)
  'caravelle-dining': {
    accentColor: '#38bdf8',
    accentTextClass: 'text-sky-300',
    accentBorderClass: 'border-sky-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-950 text-white font-black border border-sky-300/50 shadow-xl',
    heroBadgeTag: '🌌 CELESTIAL SAPPHIRE ROOFTOP',
    navHoverClass: 'hover:text-sky-300',
    navActiveClass: 'text-sky-400 border-b-2 border-sky-400',
    primaryBtnClass: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-500 hover:to-blue-600 text-stone-950 font-black rounded-xl shadow-[0_0_30px_rgba(56,189,248,0.5)] border border-sky-200/50',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-sky-200 border border-sky-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-sky-400/60 rounded-2xl shadow-[0_0_40px_rgba(56,189,248,0.4)]',
    searchFocusClass: 'focus:border-sky-400 focus:ring-sky-400',
    bgGradientOverlay: 'from-slate-950/75 via-indigo-950/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-slate-950/90 via-indigo-950/40 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop'
  },
  // #11 Elvaris Atelier (Grand Cru Bordeaux & Oak Casks)
  'elvaris-atelier': {
    accentColor: '#e11d48',
    accentTextClass: 'text-rose-400',
    accentBorderClass: 'border-rose-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-rose-500 via-red-600 to-amber-700 text-white font-black border border-rose-300/60 shadow-xl',
    heroBadgeTag: '🍇 GRAND CRU BORDEAUX & CELLAR',
    navHoverClass: 'hover:text-rose-400',
    navActiveClass: 'text-rose-500 border-b-2 border-rose-500',
    primaryBtnClass: 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-black rounded-lg shadow-[0_0_30px_rgba(225,29,72,0.5)] border border-rose-300/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-rose-200 border border-rose-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-rose-400/60 rounded-2xl shadow-[0_0_40px_rgba(225,29,72,0.4)]',
    searchFocusClass: 'focus:border-rose-400 focus:ring-rose-400',
    bgGradientOverlay: 'from-rose-950/65 via-stone-950/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-rose-950/85 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&auto=format&fit=crop'
  },
  // #12 Silvarenne (Polished Titanium Obsidian & Espresso)
  'silvarenne': {
    accentColor: '#e4e4e7',
    accentTextClass: 'text-zinc-200',
    accentBorderClass: 'border-zinc-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-900 text-stone-950 font-black border border-white/60 shadow-xl',
    heroBadgeTag: '⚡ POLISHED TITANIUM & ESPRESSO',
    navHoverClass: 'hover:text-white',
    navActiveClass: 'text-white border-b-2 border-white',
    primaryBtnClass: 'bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-400 hover:from-white hover:to-zinc-200 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(228,228,231,0.5)] border border-white/60',
    secondaryBtnClass: 'bg-zinc-950/85 hover:bg-black text-zinc-100 border border-zinc-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-zinc-400/60 rounded-2xl shadow-[0_0_35px_rgba(228,228,231,0.35)]',
    searchFocusClass: 'focus:border-zinc-300 focus:ring-zinc-300',
    bgGradientOverlay: 'from-zinc-950/75 via-black/85 to-black/95',
    headerBg: 'bg-gradient-to-b from-black/90 via-black/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&auto=format&fit=crop'
  },
  'lumivelle': {
    accentColor: '#F59E0B',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-800 text-stone-950 font-black border border-amber-300/40 shadow-lg shadow-amber-900/50',
    heroBadgeTag: '🔥 HEARTHFIRE STONE OVEN & ROASTED BEANS',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.45)] border border-amber-300/50',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-stone-900 text-amber-200 border border-amber-500/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-3xl shadow-[0_0_35px_rgba(217,119,6,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-amber-950/45 via-stone-950/65 to-black/85',
    headerBg: 'bg-gradient-to-b from-stone-950/90 via-amber-950/40 to-transparent',
    heroBgImage: roastedCoffeeBeansBg
  },
  'garnivelle': {
    accentColor: '#F472B6',
    accentTextClass: 'text-pink-300',
    accentBorderClass: 'border-pink-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-pink-400 via-rose-500 to-pink-700 text-white font-black border border-pink-200/60 shadow-lg shadow-pink-900/50',
    heroBadgeTag: '🌸 ROYAL PEARL TEA ROOM & ROSE LATTE',
    navHoverClass: 'hover:text-pink-300',
    navActiveClass: 'text-pink-400 border-b-2 border-pink-400',
    primaryBtnClass: 'bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 hover:from-pink-600 hover:to-rose-500 text-white font-black rounded-full shadow-[0_0_25px_rgba(244,114,182,0.5)] border border-pink-200/50',
    secondaryBtnClass: 'bg-stone-950/75 hover:bg-stone-900 text-pink-200 border border-pink-400/40 rounded-full backdrop-blur-md',
    imageFrameClass: 'border-2 border-pink-300/60 rounded-[2.5rem] shadow-[0_0_40px_rgba(244,114,182,0.4)]',
    searchFocusClass: 'focus:border-pink-400 focus:ring-pink-400',
    bgGradientOverlay: 'from-pink-950/45 via-stone-950/75 to-black/90',
    headerBg: 'bg-gradient-to-b from-pink-950/80 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=1600&auto=format&fit=crop'
  },
  'maison-virelle': {
    accentColor: '#F59E0B',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 text-stone-950 font-black border border-amber-200 shadow-lg shadow-amber-950/50',
    heroBadgeTag: '🥐 ORGANIC STONE OVEN BAKERY & HONEY BREWS',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-300/50',
    secondaryBtnClass: 'bg-stone-900/80 hover:bg-stone-950 text-amber-100 border border-amber-400/40 rounded-2xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-amber-950/45 via-stone-950/65 to-black/90',
    headerBg: 'bg-gradient-to-b from-amber-950/80 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop'
  },
  'amberelle': {
    accentColor: '#EA580C',
    accentTextClass: 'text-orange-400',
    accentBorderClass: 'border-orange-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-orange-500 via-amber-600 to-stone-900 text-orange-100 font-black border border-orange-400/50 shadow-lg shadow-orange-950/60',
    heroBadgeTag: '🇮🇹 TUSCAN OLIVE GROVE & ESPRESSO TRATTORIA',
    navHoverClass: 'hover:text-orange-400',
    navActiveClass: 'text-orange-500 border-b-2 border-orange-500',
    primaryBtnClass: 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-amber-700 text-white font-black rounded-full shadow-[0_0_25px_rgba(234,88,12,0.45)] border border-orange-300/40',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-black text-orange-200 border border-orange-500/40 rounded-full backdrop-blur-md',
    imageFrameClass: 'border-2 border-orange-500/60 rounded-t-[3.5rem] rounded-b-xl shadow-[0_0_35px_rgba(234,88,12,0.35)]',
    searchFocusClass: 'focus:border-orange-500 focus:ring-orange-500',
    bgGradientOverlay: 'from-orange-950/45 via-stone-950/75 to-black/90',
    headerBg: 'bg-gradient-to-b from-orange-950/80 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&auto=format&fit=crop'
  },
  'harvessa': {
    accentColor: '#F43F5E',
    accentTextClass: 'text-rose-300',
    accentBorderClass: 'border-rose-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-rose-500 via-red-600 to-indigo-950 text-white font-black border border-rose-300/60 shadow-xl shadow-rose-950/70',
    heroBadgeTag: '✨ CHAMPAGNE ROSE & STARLIGHT NIGHT BREWS',
    navHoverClass: 'hover:text-rose-300',
    navActiveClass: 'text-rose-400 border-b-2 border-rose-400',
    primaryBtnClass: 'bg-gradient-to-r from-rose-500 via-pink-600 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black rounded-xl shadow-[0_0_30px_rgba(244,63,94,0.5)] border border-rose-300/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-rose-200 border border-rose-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-rose-400/60 rounded-3xl shadow-[0_0_45px_rgba(244,63,94,0.4)]',
    searchFocusClass: 'focus:border-rose-400 focus:ring-rose-400',
    bgGradientOverlay: 'from-indigo-950/50 via-stone-950/75 to-black/95',
    headerBg: 'bg-gradient-to-b from-indigo-950/85 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop'
  },
  'ivoria-dining': {
    accentColor: '#EA580C',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-600 via-orange-700 to-stone-950 text-amber-100 font-black border border-amber-400/50 shadow-lg shadow-orange-950/60',
    heroBadgeTag: '🏔️ ALPINE TIMBER CHALET & COZY FIREPLACE',
    navHoverClass: 'hover:text-amber-400',
    navActiveClass: 'text-amber-500 border-b-2 border-amber-500',
    primaryBtnClass: 'bg-gradient-to-r from-amber-600 via-orange-600 to-stone-800 hover:from-amber-700 hover:to-orange-700 text-white font-black rounded-lg shadow-[0_0_25px_rgba(234,88,12,0.4)] border border-orange-400/40',
    secondaryBtnClass: 'bg-stone-900/80 hover:bg-stone-950 text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-600/60 rounded-2xl shadow-[0_0_35px_rgba(217,119,6,0.35)]',
    searchFocusClass: 'focus:border-amber-500 focus:ring-amber-500',
    bgGradientOverlay: 'from-amber-950/45 via-stone-950/70 to-black/90',
    headerBg: 'bg-gradient-to-b from-amber-950/80 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  'olivara': {
    accentColor: '#22C55E',
    accentTextClass: 'text-emerald-400',
    accentBorderClass: 'border-emerald-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-emerald-400 via-green-600 to-emerald-900 text-white font-black border border-emerald-300/50 shadow-lg shadow-emerald-950/60',
    heroBadgeTag: '🌿 BOTANICAL GLASSHOUSE & ICED MATCHA BAR',
    navHoverClass: 'hover:text-emerald-400',
    navActiveClass: 'text-emerald-400 border-b-2 border-emerald-400',
    primaryBtnClass: 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-stone-950 font-black rounded-full shadow-[0_0_25px_rgba(34,197,94,0.45)] border border-emerald-200/50',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-black text-emerald-200 border border-emerald-500/40 rounded-full backdrop-blur-md',
    imageFrameClass: 'border-2 border-emerald-400/60 rounded-3xl shadow-[0_0_35px_rgba(34,197,94,0.35)]',
    searchFocusClass: 'focus:border-emerald-400 focus:ring-emerald-400',
    bgGradientOverlay: 'from-emerald-950/40 via-stone-950/70 to-black/90',
    headerBg: 'bg-gradient-to-b from-emerald-950/80 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop'
  },
  'embrelune': {
    accentColor: '#14B8A6',
    accentTextClass: 'text-teal-300',
    accentBorderClass: 'border-teal-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-teal-400 via-cyan-600 to-slate-900 text-white font-black border border-teal-200/60 shadow-lg shadow-teal-950/60',
    heroBadgeTag: '❄️ CRYSTAL GLASS TEAL & NITRO COLD BREW',
    navHoverClass: 'hover:text-teal-300',
    navActiveClass: 'text-teal-400 border-b-2 border-teal-400',
    primaryBtnClass: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 hover:from-teal-500 hover:to-cyan-600 text-stone-950 font-black rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.5)] border border-teal-200/60',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-stone-900 text-teal-200 border border-teal-400/40 rounded-2xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-teal-300/60 rounded-3xl shadow-[0_0_45px_rgba(20,184,166,0.4)] backdrop-blur-md',
    searchFocusClass: 'focus:border-teal-400 focus:ring-teal-400',
    bgGradientOverlay: 'from-teal-950/40 via-stone-950/75 to-black/95',
    headerBg: 'bg-gradient-to-b from-teal-950/85 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&auto=format&fit=crop'
  },
  'crimsera': {
    accentColor: '#E11D48',
    accentTextClass: 'text-rose-400',
    accentBorderClass: 'border-rose-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-rose-500 via-red-600 to-amber-700 text-white font-black border border-rose-300/60 shadow-xl shadow-rose-950/70',
    heroBadgeTag: '🌅 MEDITERRANEAN COASTAL SUNSET & FIG LATTE',
    navHoverClass: 'hover:text-rose-400',
    navActiveClass: 'text-rose-500 border-b-2 border-rose-500',
    primaryBtnClass: 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-black rounded-full shadow-[0_0_30px_rgba(225,29,72,0.5)] border border-rose-300/50',
    secondaryBtnClass: 'bg-stone-950/80 hover:bg-stone-900 text-rose-200 border border-rose-500/40 rounded-full backdrop-blur-md',
    imageFrameClass: 'border-2 border-rose-400/60 rounded-t-[4rem] rounded-b-2xl shadow-[0_0_40px_rgba(225,29,72,0.4)]',
    searchFocusClass: 'focus:border-rose-400 focus:ring-rose-400',
    bgGradientOverlay: 'from-rose-950/45 via-stone-950/75 to-black/95',
    headerBg: 'bg-gradient-to-b from-rose-950/85 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop'
  },
  // #13 Monarchia House (Platinum Society & Haute Cuisine)
  'monarchia-house': {
    accentColor: '#94a3b8',
    accentTextClass: 'text-slate-200',
    accentBorderClass: 'border-slate-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-slate-400 via-slate-600 to-slate-900 text-white font-black border border-slate-300/50 shadow-xl',
    heroBadgeTag: '👑 PLATINUM SOCIETY & HAUTE CUISINE',
    navHoverClass: 'hover:text-slate-200',
    navActiveClass: 'text-slate-300 border-b-2 border-slate-300',
    primaryBtnClass: 'bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 hover:from-slate-200 hover:to-slate-400 text-slate-950 font-black rounded-lg shadow-[0_0_25px_rgba(148,163,184,0.45)] border border-white/40',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-slate-200 border border-slate-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-slate-400/60 rounded-2xl shadow-[0_0_35px_rgba(148,163,184,0.35)]',
    searchFocusClass: 'focus:border-slate-300 focus:ring-slate-300',
    bgGradientOverlay: 'from-[#020617]/80 via-[#0f172a]/75 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#020617]/95 via-[#0f172a]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #14 Reservelle (Heritage Royal Banquet & VIP Club)
  'reservelle': {
    accentColor: '#facc15',
    accentTextClass: 'text-yellow-300',
    accentBorderClass: 'border-yellow-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-stone-900 text-stone-950 font-black border border-yellow-200 shadow-xl',
    heroBadgeTag: '🏛️ HERITAGE ROYAL BANQUET & VIP CLUB',
    navHoverClass: 'hover:text-yellow-300',
    navActiveClass: 'text-yellow-400 border-b-2 border-yellow-400',
    primaryBtnClass: 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-300 hover:to-amber-400 text-stone-950 font-black rounded-xl shadow-[0_0_30px_rgba(250,204,21,0.5)] border border-yellow-200/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-yellow-200 border border-yellow-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-yellow-400/60 rounded-3xl shadow-[0_0_35px_rgba(250,204,21,0.35)]',
    searchFocusClass: 'focus:border-yellow-400 focus:ring-yellow-400',
    bgGradientOverlay: 'from-black/85 via-[#121212]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-black/95 via-stone-950/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop'
  },
  // #15 VELLUNARA - THEME #15 (Artisanal Wood-Fired Stone Pizzeria)
  'vellunara': {
    accentColor: '#d97706',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-600 via-[#451a03] to-[#1c0d02] text-amber-100 font-black border border-amber-400/50 shadow-xl shadow-amber-950/80',
    heroBadgeTag: '🍕 WOOD-FIRED ARTISANAL PIZZERIA',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-700 hover:to-amber-600 text-stone-950 font-black rounded-lg shadow-[0_0_30px_rgba(217,119,6,0.5)] border border-amber-300/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(217,119,6,0.35)]',
    searchFocusClass: 'focus:border-amber-500 focus:ring-amber-500',
    bgGradientOverlay: 'from-[#1c0d02]/85 via-[#261204]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#1c0d02]/95 via-[#1c0d02]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop'
  },
  // #16 Zafrelle Hand-Grinder Cafe
  'zafrelle': {
    accentColor: '#fbbf24',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-400 via-amber-600 to-stone-900 text-stone-950 font-black border border-amber-300/50 shadow-xl',
    heroBadgeTag: '☕ VINTAGE BRASS HAND-GRINDER CAFE',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-black rounded-xl shadow-[0_0_25px_rgba(251,191,36,0.45)] border border-yellow-200/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-400/40 rounded-xl backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_35px_rgba(251,191,36,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#310710]/75 via-[#4a0e17]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#310710]/90 via-[#310710]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&auto=format&fit=crop'
  },
  // #17 Obscurielle (Exotic Saffron & Raw Silk Salon)
  'obscurielle': {
    accentColor: '#f97316',
    accentTextClass: 'text-orange-400',
    accentBorderClass: 'border-orange-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-orange-500 via-amber-700 to-stone-950 text-white font-black border border-orange-300/50 shadow-xl',
    heroBadgeTag: '✨ EXOTIC SAFFRON & RAW SILK SALON',
    navHoverClass: 'hover:text-orange-400',
    navActiveClass: 'text-orange-500 border-b-2 border-orange-500',
    primaryBtnClass: 'bg-gradient-to-r from-orange-500 via-amber-600 to-orange-700 hover:from-orange-600 hover:to-amber-700 text-white font-black rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.5)] border border-orange-300/50',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-orange-200 border border-orange-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-orange-500/60 rounded-2xl shadow-[0_0_35px_rgba(249,115,22,0.35)]',
    searchFocusClass: 'focus:border-orange-500 focus:ring-orange-500',
    bgGradientOverlay: 'from-[#2a1200]/80 via-[#3d1b00]/75 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2a1200]/95 via-[#2a1200]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop'
  },
  // #18 Perlavia (Minimalist Obsidian & Silver)
  'perlavia': {
    accentColor: '#cbd5e1',
    accentTextClass: 'text-slate-300',
    accentBorderClass: 'border-slate-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-slate-400 via-slate-600 to-slate-900 text-white font-black border border-slate-300/40 shadow-xl',
    heroBadgeTag: '✦ OBSIDIAN BLACK & SILVER MINIMALISM',
    navHoverClass: 'hover:text-slate-300',
    navActiveClass: 'text-slate-200 border-b-2 border-slate-200',
    primaryBtnClass: 'bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 hover:from-white hover:to-slate-300 text-slate-950 font-black rounded-lg shadow-[0_0_25px_rgba(203,213,225,0.4)]',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-slate-200 border border-slate-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-slate-400/50 rounded-2xl shadow-[0_0_35px_rgba(203,213,225,0.25)]',
    searchFocusClass: 'focus:border-slate-300 focus:ring-slate-300',
    bgGradientOverlay: 'from-[#0b0f17]/85 via-[#111827]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#0b0f17]/95 via-[#0b0f17]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #19 Polivara (Soft Pearl White & Cracked Pepper)
  'polivara': {
    accentColor: '#38bdf8',
    accentTextClass: 'text-sky-300',
    accentBorderClass: 'border-sky-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-slate-200 via-slate-400 to-slate-800 text-slate-950 font-black border border-white/60 shadow-xl',
    heroBadgeTag: '☕ SOFT PEARL WHITE & CRACKED PEPPER',
    navHoverClass: 'hover:text-sky-300',
    navActiveClass: 'text-sky-400 border-b-2 border-sky-400',
    primaryBtnClass: 'bg-gradient-to-r from-sky-400 via-sky-300 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-black rounded-lg shadow-[0_0_25px_rgba(56,189,248,0.45)]',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-sky-200 border border-sky-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-sky-400/50 rounded-2xl shadow-[0_0_35px_rgba(56,189,248,0.3)]',
    searchFocusClass: 'focus:border-sky-400 focus:ring-sky-400',
    bgGradientOverlay: 'from-[#0a1120]/80 via-[#0f172a]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#0a1120]/95 via-[#0a1120]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop'
  },
  // #20 Noctavelle (Mirror Chrome & Contemporary Seafood)
  'noctavelle': {
    accentColor: '#38bdf8',
    accentTextClass: 'text-cyan-300',
    accentBorderClass: 'border-cyan-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-cyan-400 via-sky-600 to-slate-950 text-white font-black border border-cyan-300/40 shadow-xl',
    heroBadgeTag: '🐟 MIRROR CHROME & CONTEMPORARY SEAFOOD',
    navHoverClass: 'hover:text-cyan-300',
    navActiveClass: 'text-cyan-400 border-b-2 border-cyan-400',
    primaryBtnClass: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black rounded-lg shadow-[0_0_25px_rgba(6,182,212,0.5)]',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-cyan-200 border border-cyan-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-cyan-400/60 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.35)]',
    searchFocusClass: 'focus:border-cyan-400 focus:ring-cyan-400',
    bgGradientOverlay: 'from-[#031525]/85 via-[#062035]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#031525]/95 via-[#031525]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop'
  },
  // #21 Marovelle (Italian Stovetop Moka)
  'marovelle': {
    accentColor: '#fb923c',
    accentTextClass: 'text-orange-400',
    accentBorderClass: 'border-orange-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-orange-400 via-amber-600 to-red-950 text-white font-black border border-orange-300/40 shadow-xl',
    heroBadgeTag: '☕ ITALIAN STOVETOP MOKA & THICK CREMA',
    navHoverClass: 'hover:text-orange-300',
    navActiveClass: 'text-orange-400 border-b-2 border-orange-400',
    primaryBtnClass: 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black rounded-lg shadow-[0_0_25px_rgba(251,146,60,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-orange-200 border border-orange-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-orange-500/60 rounded-2xl shadow-[0_0_35px_rgba(251,146,60,0.35)]',
    searchFocusClass: 'focus:border-orange-400 focus:ring-orange-400',
    bgGradientOverlay: 'from-[#2d1109]/80 via-[#3a150c]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2d1109]/95 via-[#2d1109]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop'
  },
  // #22 Regavelle (Carrara White Marble & Rose Gold)
  'regavelle': {
    accentColor: '#f43f5e',
    accentTextClass: 'text-rose-400',
    accentBorderClass: 'border-rose-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-rose-300 via-pink-500 to-rose-900 text-white font-black border border-rose-200/50 shadow-xl',
    heroBadgeTag: '👑 CARRARA MARBLE & ROSE GOLD GASTRONOMY',
    navHoverClass: 'hover:text-rose-300',
    navActiveClass: 'text-rose-400 border-b-2 border-rose-400',
    primaryBtnClass: 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 hover:from-rose-300 hover:to-pink-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(244,63,94,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-rose-200 border border-rose-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-rose-400/60 rounded-2xl shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    searchFocusClass: 'focus:border-rose-400 focus:ring-rose-400',
    bgGradientOverlay: 'from-[#2b0b14]/80 via-[#350d19]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2b0b14]/95 via-[#2b0b14]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&auto=format&fit=crop'
  },
  // #23 Elysara (Emerald Green Velvet & Regal Gold)
  'elysara': {
    accentColor: '#10b981',
    accentTextClass: 'text-emerald-400',
    accentBorderClass: 'border-emerald-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-emerald-500 via-teal-700 to-[#022c22] text-white font-black border border-emerald-300/40 shadow-xl',
    heroBadgeTag: '💎 IMPERIAL EMERALD VELVET & REGAL GOLD',
    navHoverClass: 'hover:text-emerald-300',
    navActiveClass: 'text-emerald-400 border-b-2 border-emerald-400',
    primaryBtnClass: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(16,185,129,0.5)]',
    secondaryBtnClass: 'bg-[#022c22]/85 hover:bg-black text-emerald-200 border border-emerald-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-emerald-400/60 rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.35)]',
    searchFocusClass: 'focus:border-emerald-400 focus:ring-emerald-400',
    bgGradientOverlay: 'from-[#022019]/85 via-[#033126]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#022019]/95 via-[#022019]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop'
  },
  // #24 Cindervale (Mystical Golden Light & Experimental Gastronomy)
  'cindervale': {
    accentColor: '#eab308',
    accentTextClass: 'text-yellow-400',
    accentBorderClass: 'border-yellow-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-yellow-400 via-amber-600 to-stone-950 text-stone-950 font-black border border-yellow-200/50 shadow-xl',
    heroBadgeTag: '✨ MYSTICAL GOLDEN MIST EXPERIMENTAL DINING',
    navHoverClass: 'hover:text-yellow-300',
    navActiveClass: 'text-yellow-400 border-b-2 border-yellow-400',
    primaryBtnClass: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(234,179,8,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-yellow-200 border border-yellow-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-yellow-400/60 rounded-2xl shadow-[0_0_35px_rgba(234,179,8,0.35)]',
    searchFocusClass: 'focus:border-yellow-400 focus:ring-yellow-400',
    bgGradientOverlay: 'from-[#1c180e]/85 via-[#292212]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#1c180e]/95 via-[#1c180e]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #25 Linorelle (Volcanic Ash Black & Wood-Fired Burger/Steak)
  'linorelle': {
    accentColor: '#ef4444',
    accentTextClass: 'text-red-400',
    accentBorderClass: 'border-red-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-red-500 via-rose-700 to-stone-950 text-white font-black border border-red-300/40 shadow-xl',
    heroBadgeTag: '🔥 VOLCANIC ASH & WOOD-FIRED PRIME STEAKS',
    navHoverClass: 'hover:text-red-300',
    navActiveClass: 'text-red-400 border-b-2 border-red-400',
    primaryBtnClass: 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-400 hover:to-rose-400 text-white font-black rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-red-200 border border-red-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-red-500/60 rounded-2xl shadow-[0_0_35px_rgba(239,68,68,0.35)]',
    searchFocusClass: 'focus:border-red-400 focus:ring-red-400',
    bgGradientOverlay: 'from-[#2b0d0d]/85 via-[#381111]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2b0d0d]/95 via-[#2b0d0d]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #26 Lumecourt (Crisp White Linen & Slate Grey Typography)
  'lumecourt': {
    accentColor: '#a1a1aa',
    accentTextClass: 'text-zinc-300',
    accentBorderClass: 'border-zinc-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-800 text-zinc-950 font-black border border-white/60 shadow-xl',
    heroBadgeTag: '✦ STARCHED WHITE LINEN & SLATE SERIF BISTRO',
    navHoverClass: 'hover:text-zinc-200',
    navActiveClass: 'text-zinc-100 border-b-2 border-zinc-100',
    primaryBtnClass: 'bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 hover:from-white hover:to-zinc-200 text-zinc-950 font-black rounded-lg shadow-[0_0_25px_rgba(161,161,170,0.4)]',
    secondaryBtnClass: 'bg-zinc-950/85 hover:bg-black text-zinc-200 border border-zinc-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-zinc-400/50 rounded-2xl shadow-[0_0_35px_rgba(161,161,170,0.25)]',
    searchFocusClass: 'focus:border-zinc-300 focus:ring-zinc-300',
    bgGradientOverlay: 'from-[#121215]/85 via-[#18181b]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#121215]/95 via-[#121215]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop'
  },
  // #27 Sapphirenne (Flickering Candlelight & Dark Oak Chambers)
  'sapphirenne': {
    accentColor: '#f59e0b',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-500 via-[#451a03] to-[#1c0d02] text-amber-200 font-black border border-amber-400/50 shadow-xl',
    heroBadgeTag: '🕯️ FLICKERING CANDLELIGHT & DARK OAK CELLARS',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(245,158,11,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#1e1005]/85 via-[#2b1708]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#1e1005]/95 via-[#1e1005]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop'
  },
  // #28 Bellavere (Midnight Ocean Sapphire & Star Gold)
  'bellavere': {
    accentColor: '#38bdf8',
    accentTextClass: 'text-sky-300',
    accentBorderClass: 'border-sky-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-sky-400 via-blue-600 to-slate-950 text-white font-black border border-sky-300/40 shadow-xl',
    heroBadgeTag: '🌊 MIDNIGHT SAPPHIRE & COASTAL GASTRONOMY',
    navHoverClass: 'hover:text-sky-300',
    navActiveClass: 'text-sky-400 border-b-2 border-sky-400',
    primaryBtnClass: 'bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black rounded-lg shadow-[0_0_25px_rgba(56,189,248,0.5)]',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-sky-200 border border-sky-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-sky-400/60 rounded-2xl shadow-[0_0_35px_rgba(56,189,248,0.35)]',
    searchFocusClass: 'focus:border-sky-400 focus:ring-sky-400',
    bgGradientOverlay: 'from-[#071d33]/85 via-[#0b2847]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#071d33]/95 via-[#071d33]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop'
  },
  // #29 Copriva (French Riviera Buttercream & Olive Green Terrace)
  'copriva': {
    accentColor: '#84cc16',
    accentTextClass: 'text-lime-300',
    accentBorderClass: 'border-lime-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-lime-400 via-emerald-600 to-stone-900 text-stone-950 font-black border border-lime-300/50 shadow-xl',
    heroBadgeTag: '🌿 FRENCH RIVIERA BISTRO & OLIVE TERRACE',
    navHoverClass: 'hover:text-lime-300',
    navActiveClass: 'text-lime-400 border-b-2 border-lime-400',
    primaryBtnClass: 'bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500 hover:from-lime-300 hover:to-emerald-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(132,204,22,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-lime-200 border border-lime-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-lime-500/60 rounded-2xl shadow-[0_0_35px_rgba(132,204,22,0.35)]',
    searchFocusClass: 'focus:border-lime-400 focus:ring-lime-400',
    bgGradientOverlay: 'from-[#17230b]/80 via-[#213210]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#17230b]/95 via-[#17230b]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&auto=format&fit=crop'
  },
  // #30 Degustara (Artisan Chemex Alchemy & Wild Berries)
  'degustara': {
    accentColor: '#ea580c',
    accentTextClass: 'text-orange-400',
    accentBorderClass: 'border-orange-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-orange-500 via-amber-700 to-stone-950 text-white font-black border border-orange-300/40 shadow-xl',
    heroBadgeTag: '☕ HAND-BLOWN CHEMEX ALCHEMY & WILD BERRIES',
    navHoverClass: 'hover:text-orange-300',
    navActiveClass: 'text-orange-400 border-b-2 border-orange-400',
    primaryBtnClass: 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(234,88,12,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-orange-200 border border-orange-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-orange-500/60 rounded-2xl shadow-[0_0_35px_rgba(234,88,12,0.35)]',
    searchFocusClass: 'focus:border-orange-400 focus:ring-orange-400',
    bgGradientOverlay: 'from-[#2a0e05]/80 via-[#3a1408]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2a0e05]/95 via-[#2a0e05]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&auto=format&fit=crop'
  },
  // #31 Lumivara (Velvet Plum & Amaranth Golden Lounge)
  'lumivara': {
    accentColor: '#f43f5e',
    accentTextClass: 'text-rose-400',
    accentBorderClass: 'border-rose-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-rose-400 via-purple-700 to-[#3b0724] text-white font-black border border-rose-300/40 shadow-xl',
    heroBadgeTag: '🍷 VELVET PLUM & GOLDEN AMARANTH LOUNGE',
    navHoverClass: 'hover:text-rose-300',
    navActiveClass: 'text-rose-400 border-b-2 border-rose-400',
    primaryBtnClass: 'bg-gradient-to-r from-rose-400 via-purple-400 to-rose-500 hover:from-rose-300 hover:to-purple-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(244,63,94,0.5)]',
    secondaryBtnClass: 'bg-[#3b0724]/85 hover:bg-black text-rose-200 border border-rose-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-rose-400/60 rounded-2xl shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    searchFocusClass: 'focus:border-rose-400 focus:ring-rose-400',
    bgGradientOverlay: 'from-[#2e051c]/85 via-[#420828]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2e051c]/95 via-[#2e051c]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&auto=format&fit=crop'
  },
  // #32 Figavelle (Copper Cezve Brewed on Hot Golden Sands)
  'figavelle': {
    accentColor: '#d97706',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-500 via-amber-700 to-stone-950 text-white font-black border border-amber-300/50 shadow-xl',
    heroBadgeTag: '☕ COPPER CEZVE ON HOT GOLDEN SANDS',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(217,119,6,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(217,119,6,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#231206]/85 via-[#311a09]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#231206]/95 via-[#231206]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&auto=format&fit=crop'
  },
  // #33 Zafravia (Noble Royal Crest & Navy Gold Foil)
  'zafravia': {
    accentColor: '#eab308',
    accentTextClass: 'text-yellow-400',
    accentBorderClass: 'border-yellow-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-yellow-400 via-blue-900 to-slate-950 text-yellow-300 font-black border border-yellow-200/50 shadow-xl',
    heroBadgeTag: '👑 NOBLE ROYAL CREST & REGAL GOLD FOIL',
    navHoverClass: 'hover:text-yellow-300',
    navActiveClass: 'text-yellow-400 border-b-2 border-yellow-400',
    primaryBtnClass: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(234,179,8,0.5)]',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-yellow-200 border border-yellow-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-yellow-400/60 rounded-2xl shadow-[0_0_35px_rgba(234,179,8,0.35)]',
    searchFocusClass: 'focus:border-yellow-400 focus:ring-yellow-400',
    bgGradientOverlay: 'from-[#0e1329]/85 via-[#161d3d]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#0e1329]/95 via-[#0e1329]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop'
  },
  // #34 Hearthora (Electric Neon Purple & Late Night Supper Club)
  'hearthora': {
    accentColor: '#d946ef',
    accentTextClass: 'text-fuchsia-400',
    accentBorderClass: 'border-fuchsia-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-fuchsia-500 via-purple-700 to-stone-950 text-white font-black border border-fuchsia-300/40 shadow-xl',
    heroBadgeTag: '✨ ELECTRIC NEON PURPLE SUPPER CLUB',
    navHoverClass: 'hover:text-fuchsia-300',
    navActiveClass: 'text-fuchsia-400 border-b-2 border-fuchsia-400',
    primaryBtnClass: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-600 hover:from-fuchsia-400 hover:to-purple-400 text-white font-black rounded-lg shadow-[0_0_25px_rgba(217,70,239,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-fuchsia-200 border border-fuchsia-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-fuchsia-500/60 rounded-2xl shadow-[0_0_35px_rgba(217,70,239,0.35)]',
    searchFocusClass: 'focus:border-fuchsia-400 focus:ring-fuchsia-400',
    bgGradientOverlay: 'from-[#2b0838]/85 via-[#3a0a4c]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2b0838]/95 via-[#2b0838]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop'
  },
  // #35 Luxevia (Aromatic Saffron Gold & Royal Persian Dining)
  'luxevia': {
    accentColor: '#fb923c',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-400 via-orange-600 to-[#2c0e03] text-stone-950 font-black border border-amber-200/50 shadow-xl',
    heroBadgeTag: '👑 ROYAL PERSIAN SAFFRON & TERRACOTTA',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(251,146,60,0.5)]',
    secondaryBtnClass: 'bg-[#2c0e03]/85 hover:bg-black text-amber-200 border border-amber-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_35px_rgba(251,146,60,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#270b02]/85 via-[#381003]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#270b02]/95 via-[#270b02]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop'
  },
  // #36 Rosavere (Deep Crimson Velvet & Irish Steak Cellar)
  'rosavere': {
    accentColor: '#f43f5e',
    accentTextClass: 'text-rose-400',
    accentBorderClass: 'border-rose-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-rose-500 via-red-800 to-stone-950 text-white font-black border border-rose-300/40 shadow-xl',
    heroBadgeTag: '☘️ CRIMSON VELVET & IRISH STEAK CELLAR',
    navHoverClass: 'hover:text-rose-300',
    navActiveClass: 'text-rose-400 border-b-2 border-rose-400',
    primaryBtnClass: 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-400 hover:to-red-400 text-white font-black rounded-lg shadow-[0_0_25px_rgba(244,63,94,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-rose-200 border border-rose-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-rose-400/60 rounded-2xl shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    searchFocusClass: 'focus:border-rose-400 focus:ring-rose-400',
    bgGradientOverlay: 'from-[#330816]/85 via-[#450a1e]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#330816]/95 via-[#330816]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #37 Marovian (Paper Lanterns & Serene Tea Izakaya)
  'marovian': {
    accentColor: '#fbbf24',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-400 via-yellow-600 to-stone-900 text-stone-950 font-black border border-amber-200/50 shadow-xl',
    heroBadgeTag: '🏮 PAPER LANTERNS & SERENE TEA IZAKAYA',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(251,191,36,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_35px_rgba(251,191,36,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#231505]/85 via-[#331f08]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#231505]/95 via-[#231505]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop'
  },
  // #38 Solarienne (Warm Amber Glow & American Tavern)
  'solarienne': {
    accentColor: '#f59e0b',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-500 via-amber-700 to-stone-950 text-white font-black border border-amber-300/40 shadow-xl',
    heroBadgeTag: '🍺 WARM AMBER GLOW & AMERICAN TAVERN',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(245,158,11,0.5)]',
    secondaryBtnClass: 'bg-stone-950/85 hover:bg-black text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#271505]/85 via-[#381e07]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#271505]/95 via-[#271505]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop'
  },
  // #39 Nobravie (Maroon Velvet Steak Cellar & 5-Star Club)
  'nobravie': {
    accentColor: '#f59e0b',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-500/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-500 via-rose-900 to-[#3b0817] text-white font-black border border-amber-300/50 shadow-xl',
    heroBadgeTag: '🥩 MAROON VELVET STEAK CELLAR & 5-STAR CLUB',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(245,158,11,0.5)]',
    secondaryBtnClass: 'bg-[#3b0817]/85 hover:bg-black text-amber-200 border border-amber-500/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#300612]/85 via-[#44081a]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#300612]/95 via-[#300612]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop'
  },
  // #40 Veloura Table (Mediterranean Sunshine & Coastal Taverna)
  'veloura-table': {
    accentColor: '#facc15',
    accentTextClass: 'text-yellow-300',
    accentBorderClass: 'border-yellow-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-yellow-400 via-sky-600 to-blue-950 text-stone-950 font-black border border-yellow-200/50 shadow-xl',
    heroBadgeTag: '☀️ MEDITERRANEAN SUNSHINE & COASTAL TAVERNA',
    navHoverClass: 'hover:text-yellow-300',
    navActiveClass: 'text-yellow-400 border-b-2 border-yellow-400',
    primaryBtnClass: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(250,204,21,0.5)]',
    secondaryBtnClass: 'bg-slate-950/85 hover:bg-black text-yellow-200 border border-yellow-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-yellow-400/60 rounded-2xl shadow-[0_0_35px_rgba(250,204,21,0.35)]',
    searchFocusClass: 'focus:border-yellow-400 focus:ring-yellow-400',
    bgGradientOverlay: 'from-[#07243d]/85 via-[#0c3559]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#07243d]/95 via-[#07243d]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop'
  },
  // #41 Gildara (Garnet Red Wine & Haute French Dining)
  'gildara': {
    accentColor: '#fbbf24',
    accentTextClass: 'text-amber-300',
    accentBorderClass: 'border-amber-400/50',
    logoBadgeClass: 'bg-gradient-to-br from-amber-300 via-rose-800 to-[#3b0817] text-amber-100 font-black border border-amber-200/50 shadow-xl',
    heroBadgeTag: '🍷 GARNET RED WINE & HAUTE FRENCH DINING',
    navHoverClass: 'hover:text-amber-300',
    navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
    primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black rounded-lg shadow-[0_0_25px_rgba(251,191,36,0.5)]',
    secondaryBtnClass: 'bg-[#3b0817]/85 hover:bg-black text-amber-200 border border-amber-400/40 rounded-lg backdrop-blur-md',
    imageFrameClass: 'border-2 border-amber-400/60 rounded-2xl shadow-[0_0_35px_rgba(251,191,36,0.35)]',
    searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
    bgGradientOverlay: 'from-[#2e0513]/85 via-[#42081c]/80 to-black/95',
    headerBg: 'bg-gradient-to-b from-[#2e0513]/95 via-[#2e0513]/50 to-transparent',
    heroBgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop'
  }
};

const DEFAULT_HERO_CONFIG: ThemeHeroConfig = {
  accentColor: '#e5c158',
  accentTextClass: 'text-amber-300',
  accentBorderClass: 'border-amber-400/40',
  logoBadgeClass: 'bg-gradient-to-br from-amber-400 to-yellow-600 text-stone-950 font-black border border-white/20 shadow-lg',
  heroBadgeTag: '★ 5-STAR MICHELIN LUXURY GASTRONOMY ★',
  navHoverClass: 'hover:text-amber-300',
  navActiveClass: 'text-amber-400 border-b-2 border-amber-400',
  primaryBtnClass: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-black rounded-full shadow-xl',
  secondaryBtnClass: 'bg-black/60 hover:bg-black/80 border border-amber-400/60 text-[#FBF8EE] font-black rounded-full backdrop-blur-sm',
  imageFrameClass: 'border-2 border-amber-400/40 rounded-2xl shadow-2xl',
  searchFocusClass: 'focus:border-amber-400 focus:ring-amber-400',
  bgGradientOverlay: 'from-black/75 via-stone-950/80 to-black/95',
  headerBg: 'bg-gradient-to-b from-black/85 via-black/45 to-transparent',
  heroBgImage: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1600&auto=format&fit=crop'
};

const COFFEE_BEANS_BG = 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1600&auto=format&fit=crop';

export const COFFEE_SHOP_THEME_IDS = [
  'velmora-dining', // #1
  'lunavere',       // #3
  'opalune',        // #6
  'couravelle',     // #8
  'elvaris-atelier',// #11
  'silvarenne',     // #12
  'zafrelle',       // #16
  'marovelle',      // #21
  'degustara',      // #23
  'figavelle',      // #30
  'garnivelle',     // #33
  'amberelle',      // #39
  'lumivelle'       // #40
];

export const LUXURY_ELITE_4_SLIDES = [
  {
    id: 1,
    subtitle: 'Michelin Gastronomy & Fine Dining',
    title: 'HAUTE CUISINE',
    tag: '★ 5-STAR MICHELIN LUXURY ★',
    cupName: 'Miyazaki A5 Wagyu & Black Truffle',
    price: 'Chef Special',
    type: 'cloche',
    primaryBtn: 'Reserve Table',
    secondaryBtn: 'View Menu'
  },
  {
    id: 2,
    subtitle: "Chef's Signature Omakase & Caviar",
    title: 'ROYAL BANQUET',
    tag: '★ PRIVATE SOMMELIER ★',
    cupName: 'Royal Caspian Osetra Caviar',
    price: 'Imperial Choice',
    type: 'caviar',
    primaryBtn: 'Reserve Table',
    secondaryBtn: 'View Menu'
  },
  {
    id: 3,
    subtitle: 'Wood-Fired Artisanal Specialty',
    title: 'NEAPOLITAN PIZZA',
    tag: '★ TRUFFLE & BUFALA PIZZA ★',
    cupName: 'Artisanal Black Truffle Pizza',
    price: 'Gourmet Selection',
    type: 'pizza',
    primaryBtn: 'Order Pizza',
    secondaryBtn: 'View Menu'
  },
  {
    id: 4,
    subtitle: 'Gourmet Wagyu Burger & Wings',
    title: 'WAGYU BURGER',
    tag: '★ CHEF SIGNATURE BURGER & WINGS ★',
    cupName: 'Double Truffle Wagyu Burger',
    price: 'Masterpiece',
    type: 'burger',
    primaryBtn: 'Order Burger',
    secondaryBtn: 'View Menu'
  }
];

export const LUXURY_PRO_3_SLIDES = [
  {
    id: 1,
    subtitle: 'Michelin Gastronomy & Fine Dining',
    title: 'HAUTE CUISINE',
    tag: '★ 5-STAR MICHELIN LUXURY ★',
    cupName: 'Miyazaki A5 Wagyu & Black Truffle',
    price: 'Chef Special',
    type: 'cloche',
    primaryBtn: 'Reserve Table',
    secondaryBtn: 'View Menu'
  },
  {
    id: 2,
    subtitle: "Chef's Signature Omakase & Caviar",
    title: 'ROYAL BANQUET',
    tag: '★ PRIVATE SOMMELIER ★',
    cupName: 'Royal Caspian Osetra Caviar',
    price: 'Imperial Choice',
    type: 'caviar',
    primaryBtn: 'Reserve Table',
    secondaryBtn: 'View Menu'
  },
  {
    id: 3,
    subtitle: 'Artisanal Pastry & Dessert Sphere',
    title: 'GOURMET DESSERT',
    tag: '★ 24K GOLD LEAF ★',
    cupName: 'Grand Cru Valrhona Chocolate Sphere',
    price: 'Artisanal Selection',
    type: 'dessert',
    primaryBtn: 'Reserve Table',
    secondaryBtn: 'View Menu'
  }
];

export const LUXURY_DINING_SLIDES = LUXURY_PRO_3_SLIDES;

export const LUXURY_BASIC_2_SLIDES = [
  {
    id: 1,
    subtitle: 'Michelin Gastronomy & Fine Dining',
    title: 'HAUTE CUISINE',
    tag: '★ 5-STAR MICHELIN LUXURY ★',
    cupName: 'Miyazaki A5 Wagyu & Black Truffle',
    price: 'Chef Special',
    type: 'cloche',
    primaryBtn: 'Reserve Table',
    secondaryBtn: 'View Menu'
  },
  {
    id: 2,
    subtitle: 'Wood-Fired Artisanal Specialty',
    title: 'TRUFFLE PIZZA',
    tag: '★ ARTISANAL SPECIALTY ★',
    cupName: 'Wood-Fired Truffle Pizza',
    price: 'Gourmet Selection',
    type: 'pizza',
    primaryBtn: 'Order Online',
    secondaryBtn: 'View Menu'
  }
];

export const COFFEE_ELITE_4_SLIDES = [
  {
    id: 1,
    subtitle: 'We Have Been Serving',
    title: 'SPECIALTY COFFEE',
    tag: '* SINCE 1950 *',
    cupImg: whiteCupSideImg,
    cupName: 'Hand-Crafted Dark Roast',
    price: '$4.50'
  },
  {
    id: 2,
    subtitle: 'Hand-Poured Velvet Espresso',
    title: 'BARISTA RESERVE',
    tag: '* BARISTA CHAMPION *',
    cupImg: whiteCoffeeCupImg,
    cupName: 'Double Shot Velvet Cappuccino',
    price: '$5.20'
  },
  {
    id: 3,
    subtitle: 'Siphon Brew & Latte Art',
    title: 'PARISIAN LATTE',
    tag: '* SILK FROTH *',
    cupImg: whiteCappuccinoCupImg,
    cupName: 'Vanilla Caramel Silk Latte',
    price: '$5.80'
  },
  {
    id: 4,
    subtitle: 'Nitro Cold Brew & Glassware',
    title: 'NITRO COLD BREW',
    tag: '* CRYSTAL ICE *',
    cupImg: whiteCupSideImg,
    cupName: 'Artisanal Nitro Cold Brew',
    price: '$6.00'
  }
];

export const KOPPEE_SLIDES = [
  {
    id: 1,
    subtitle: 'We Have Been Serving',
    title: 'COFFEE',
    tag: '* SINCE 1950 *',
    cupImg: whiteCupSideImg,
    cupName: 'Hand-Crafted Dark Roast',
    price: '$4.50'
  },
  {
    id: 2,
    subtitle: 'Freshly Roasted Artisanal Beans',
    title: 'ESPRESSO',
    tag: '* CRAFTED DAILY *',
    cupImg: whiteCoffeeCupImg,
    cupName: 'Velvet Crema Double Shot',
    price: '$3.80'
  },
  {
    id: 3,
    subtitle: 'Hand-Selected Single Origin',
    title: 'CAPPUCCINO',
    tag: '* 100% ORGANIC BEANS *',
    cupImg: whiteCappuccinoCupImg,
    cupName: 'Silky Microfoam Latte Art',
    price: '$5.20'
  }
];

export function buildTierSlides(
  presetId: string, 
  tier: 'basic' | 'pro' | 'elite' | string, 
  isCoffee: boolean
): any[] {
  // Option #15 / 15-number theme (Vellunara) or Basic ($15) tier:
  // EXACTLY 1 hero section system (clean static presentation, no slider)
  if (presetId === 'vellunara' || tier === 'basic' || tier === 'starter') {
    const base = (CAFE_HERO_PRESETS[presetId] && CAFE_HERO_PRESETS[presetId][0]) 
      ? CAFE_HERO_PRESETS[presetId][0] 
      : (isCoffee ? KOPPEE_SLIDES[0] : LUXURY_PRO_3_SLIDES[0]);
    return [{ ...base, id: 1, number: '01' }];
  }

  // 39 Dollar Plan / Pro tier:
  // EXACTLY 3 hero section slides that slide through in rotation
  if (tier === 'pro' || tier === 'professional') {
    const slide1 = (CAFE_HERO_PRESETS[presetId] && CAFE_HERO_PRESETS[presetId][0]) 
      ? { ...CAFE_HERO_PRESETS[presetId][0], id: 1, number: '01' } 
      : (isCoffee ? KOPPEE_SLIDES[0] : LUXURY_PRO_3_SLIDES[0]);

    if (isCoffee) {
      return [
        slide1,
        { ...KOPPEE_SLIDES[1], id: 2, number: '02' },
        { ...KOPPEE_SLIDES[2], id: 3, number: '03' }
      ];
    }

    return [
      slide1,
      { ...LUXURY_PRO_3_SLIDES[1], id: 2, number: '02' },
      { ...LUXURY_PRO_3_SLIDES[2], id: 3, number: '03' }
    ];
  }

  // 99 Dollar Plan / Elite tier:
  // EXACTLY 4 hero section slides that slide through in rotation
  const slide1 = (CAFE_HERO_PRESETS[presetId] && CAFE_HERO_PRESETS[presetId][0]) 
    ? { ...CAFE_HERO_PRESETS[presetId][0], id: 1, number: '01' } 
    : (isCoffee ? COFFEE_ELITE_4_SLIDES[0] : LUXURY_ELITE_4_SLIDES[0]);

  if (isCoffee) {
    return [
      slide1,
      { ...COFFEE_ELITE_4_SLIDES[1], id: 2, number: '02' },
      { ...COFFEE_ELITE_4_SLIDES[2], id: 3, number: '03' },
      { ...COFFEE_ELITE_4_SLIDES[3], id: 4, number: '04' }
    ];
  }

  return [
    slide1,
    { ...LUXURY_ELITE_4_SLIDES[1], id: 2, number: '02' },
    { ...LUXURY_ELITE_4_SLIDES[2], id: 3, number: '03' },
    { ...LUXURY_ELITE_4_SLIDES[3], id: 4, number: '04' }
  ];
}

export const KoppeeHeroHeader: React.FC<KoppeeHeroHeaderProps> = ({
  brandName = 'My Restaurant',
  heroBackgroundImage,
  heroSlides,
  onOrderClick,
  onReserveClick,
  onMenuClick,
  onNavigate,
  onOpenAdmin,
  onBack,
  showAdminButton = true,
  lang = 'en',
  themePresetId,
  previewDeviceView
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [tabletMoreDropdownOpen, setTabletMoreDropdownOpen] = useState(false);
  const [tabletSearchOpen, setTabletSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [adminUnlockSuccess, setAdminUnlockSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const tabletSearchRef = useRef<HTMLDivElement>(null);
  const tabletMoreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabletSearchRef.current && !tabletSearchRef.current.contains(event.target as Node)) {
        setTabletSearchOpen(false);
      }
      if (tabletMoreDropdownRef.current && !tabletMoreDropdownRef.current.contains(event.target as Node)) {
        setTabletMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTablet = previewDeviceView === 'tablet' || (!previewDeviceView && windowWidth >= 640 && windowWidth < 1280);
  const isMobile = previewDeviceView === 'mobile' || (!previewDeviceView && windowWidth < 640);
  const isDesktop = previewDeviceView === 'desktop' || (!previewDeviceView && windowWidth >= 1280);

  const activePresetId = themePresetId || 'velmora-dining';
  const cfg = (themePresetId && THEME_HERO_CONFIGS[themePresetId]) ? THEME_HERO_CONFIGS[themePresetId] : (THEME_HERO_CONFIGS['velmora-dining'] || DEFAULT_HERO_CONFIG);
  const isClassicTheme = false;

  const isCoffeeTheme = COFFEE_SHOP_THEME_IDS.includes(activePresetId);
  const matchedTheme = LUXURY_THEMES.find(t => t.id === activePresetId);
  // Option #15 (Vellunara) is strictly basic/1-slide tier
  const activeTier = (activePresetId === 'vellunara') ? 'basic' : (matchedTheme?.tier || 'basic'); // 'basic' ($15), 'pro' ($39), 'elite' ($99)

  // Reset activeSlide whenever active theme changes
  useEffect(() => {
    setActiveSlide(0);
  }, [activePresetId]);

  const defaultSlidesForTheme = buildTierSlides(activePresetId, activeTier, isCoffeeTheme);

  const currentSlides = (heroSlides && heroSlides.length > 0)
    ? heroSlides
    : defaultSlidesForTheme;
  const slide = currentSlides[activeSlide] || currentSlides[0] || defaultSlidesForTheme[0];

  // Check admin PIN/password logic (supports text, letters, numbers, symbols)
  const checkAdminPin = (input: string) => {
    if (!input || !input.trim()) return false;

    if (checkAdminPasswordInput(input)) {
      setAdminUnlockSuccess(true);
      setTimeout(() => {
        if (onOpenAdmin) {
          onOpenAdmin();
        }
        setSearchTerm('');
        setIsSearchOpenMobile(false);
        setMobileMenuOpen(false);
        setTabletSearchOpen(false);
        setAdminUnlockSuccess(false);
      }, 300);
      return true;
    }
    return false;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (checkAdminPin(searchTerm)) {
      return;
    }

    // Normal menu search: smooth scroll to menu section
    if (onMenuClick) {
      onMenuClick();
    } else {
      scrollToSection('menu');
    }
    setMobileMenuOpen(false);
    setIsSearchOpenMobile(false);
  };

  // Auto slide cycle - Automatically glides through slides every 4.5 seconds
  useEffect(() => {
    if (currentSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % currentSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? currentSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % currentSlides.length);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const effectiveBrandName = isDemoOrPlaceholderBrand(brandName)
    ? 'My Restaurant'
    : brandName!.trim();

  const getLogoInitials = (name: string): [string, string] => {
    if (!name || isDemoOrPlaceholderBrand(name)) return ["M", "R"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanName || isDemoOrPlaceholderBrand(cleanName)) return ["M", "R"];
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return ["M", "R"];
  };

  const [initial1, initial2] = getLogoInitials(effectiveBrandName);

  return (
    <div className="relative w-full overflow-x-clip bg-[#120a06] text-white font-sans selection:bg-[#DA9F93]/30">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVBAR (KOPPEE STYLE WITH SEARCH BAR) */}
      {/* ========================================================================= */}
      <header className={`absolute top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 md:px-16 py-6 flex items-center justify-between ${cfg.headerBg}`}>
        {/* Brand Logo with 2-Letter Initials Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0" onClick={() => scrollToSection('hero')}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${cfg.logoBadgeClass} text-[10px] sm:text-xs flex items-center justify-center shrink-0 shadow-lg border uppercase select-none`}>
              {initial1}{initial2}
            </div>
            <span className={`font-black text-white tracking-wider uppercase font-sans drop-shadow-md truncate ${
              isMobile ? 'text-xs sm:text-sm max-w-[120px] sm:max-w-[180px]' : isTablet ? 'text-sm sm:text-base md:text-lg max-w-[180px] sm:max-w-[260px]' : 'text-xl sm:text-2xl md:text-3xl'
            }`}>
              {effectiveBrandName}
            </span>
          </div>
        </div>

        {/* A. TABLET NAVIGATION MENU (Home & About on Bar, Service & Menu in Dropdown) */}
        {isTablet && (
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* The Core Links (Home & About) & Admin Button */}
            <nav className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => scrollToSection('hero')}
                className={`${cfg.navActiveClass} transition-colors cursor-pointer py-1`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className={`text-white/90 ${cfg.navHoverClass} transition-colors cursor-pointer py-1`}
              >
                About
              </button>

              {/* Admin Button (visible only when showAdminButton is true) */}
              {showAdminButton === true && (
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${cfg.primaryBtnClass} text-xs font-extrabold shadow-md transition-all cursor-pointer shrink-0 active:scale-95 select-none ml-1`}
                  title="Open Admin Panel"
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Admin</span>
                </button>
              )}
            </nav>

            {/* Right Controls: Compact Expandable Search + Corner 3-Dot Button */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Expandable Search Button */}
              <div ref={tabletSearchRef} className="relative flex items-center">
                <AnimatePresence initial={false}>
                  {!tabletSearchOpen ? (
                    <motion.button
                      key="search-btn"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.15 }}
                      type="button"
                      onClick={() => setTabletSearchOpen(true)}
                      className="p-1.5 sm:p-2 text-white/90 hover:text-white rounded-full bg-black/60 hover:bg-black/80 border border-white/20 shadow-sm transition-all cursor-pointer flex items-center justify-center active:scale-95"
                      title={lang === 'bn' ? 'সার্চ করুন' : 'Search'}
                    >
                      <Search className={`w-4 h-4 ${cfg.accentTextClass}`} />
                    </motion.button>
                  ) : (
                    <motion.form
                      key="search-form"
                      initial={{ width: 36, opacity: 0 }}
                      animate={{ width: 175, opacity: 1 }}
                      exit={{ width: 36, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSearchSubmit}
                      className="relative flex items-center"
                    >
                      <Search className={`w-3.5 h-3.5 ${cfg.accentTextClass} absolute left-2.5 pointer-events-none`} />
                      <input
                        type="text"
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSearchTerm(val);
                          checkAdminPin(val);
                        }}
                        placeholder={lang === 'bn' ? 'খাবার বা পাসওয়ার্ড...' : 'Search foods or password...'}
                        className={`w-full pl-8 pr-7 py-1 text-xs rounded-full bg-black/85 border ${cfg.accentBorderClass} text-white placeholder-white/50 focus:outline-none ${cfg.searchFocusClass} shadow-lg`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm('');
                          setTabletSearchOpen(false);
                        }}
                        className="absolute right-2 text-white/50 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Three Dots Button & Dropdown (includes Service & Menu for Tablet) */}
              <div ref={tabletMoreDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setTabletMoreDropdownOpen(!tabletMoreDropdownOpen)}
                  className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-[#DA9F93] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
                  title="More Pages"
                >
                  <MoreHorizontal className="w-4 h-4 text-[#DA9F93]" />
                </button>

                <AnimatePresence>
                  {tabletMoreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 mt-2 w-48 bg-[#1e140d]/98 backdrop-blur-xl border ${cfg.accentBorderClass} rounded-xl shadow-2xl py-1.5 z-50 text-left space-y-0.5`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          scrollToSection('services');
                          setTabletMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 ${cfg.navHoverClass} transition-colors flex items-center gap-2.5`}
                      >
                        <Sparkles className="w-4 h-4 text-[#DA9F93] shrink-0" />
                        <span>Service</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (onOrderClick) onOrderClick();
                          else if (onMenuClick) onMenuClick();
                          else scrollToSection('menu');
                          setTabletMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 ${cfg.navHoverClass} transition-colors flex items-center gap-2.5`}
                      >
                        <Utensils className="w-4 h-4 text-[#DA9F93] shrink-0" />
                        <span>Menu</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (onReserveClick) onReserveClick();
                          else scrollToSection('reservation');
                          setTabletMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 ${cfg.navHoverClass} transition-colors flex items-center gap-2.5`}
                      >
                        <Calendar className="w-4 h-4 text-[#DA9F93] shrink-0" />
                        <span>Reservation</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          scrollToSection('testimonials');
                          setTabletMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 ${cfg.navHoverClass} transition-colors flex items-center gap-2.5`}
                      >
                        <Sparkles className="w-4 h-4 text-[#DA9F93] shrink-0" />
                        <span>Testimonials</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          scrollToSection('specials');
                          setTabletMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 ${cfg.navHoverClass} transition-colors flex items-center gap-2.5`}
                      >
                        <Utensils className="w-4 h-4 text-[#DA9F93] shrink-0" />
                        <span>Chef's Specials</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          scrollToSection('contact');
                          setTabletMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 ${cfg.navHoverClass} transition-colors flex items-center gap-2.5`}
                      >
                        <PhoneCall className="w-4 h-4 text-[#DA9F93] shrink-0" />
                        <span>Contact</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* B. DESKTOP NAVIGATION MENU & SEARCH BAR */}
        {isDesktop && (
          <div className="flex items-center gap-5 lg:gap-7">
            <nav className="flex items-center space-x-5 lg:space-x-7 text-sm font-medium">
              <button
                type="button"
                onClick={() => scrollToSection('hero')}
                className={`${cfg.navActiveClass} transition-colors cursor-pointer py-1`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className={`text-white/90 ${cfg.navHoverClass} transition-colors cursor-pointer py-1`}
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className={`text-white/90 ${cfg.navHoverClass} transition-colors cursor-pointer py-1`}
              >
                Service
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onOrderClick) onOrderClick();
                  else if (onMenuClick) onMenuClick();
                  else scrollToSection('menu');
                }}
                className={`text-white/90 ${cfg.navHoverClass} transition-colors cursor-pointer py-1`}
              >
                Menu
              </button>

              {/* Dropdown Menu for Pages */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                  className={`flex items-center gap-1 text-white/90 ${cfg.navHoverClass} transition-colors cursor-pointer py-1 focus:outline-none`}
                >
                  <span>Pages</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {pagesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 mt-2 w-48 bg-[#1e140d] border ${cfg.accentBorderClass} rounded-lg shadow-2xl py-2 z-50 text-left`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (onReserveClick) onReserveClick();
                          else scrollToSection('reservation');
                          setPagesDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-[#2c1e13] ${cfg.navHoverClass} transition-colors`}
                      >
                        Reservation
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('testimonials')}
                        className={`w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-[#2c1e13] ${cfg.navHoverClass} transition-colors`}
                      >
                        Testimonials
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('specials')}
                        className={`w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-[#2c1e13] ${cfg.navHoverClass} transition-colors`}
                      >
                        Chef's Specials
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={`text-white/90 ${cfg.navHoverClass} transition-colors cursor-pointer py-1`}
              >
                Contact
              </button>
            </nav>

            {/* Desktop Search Bar & Admin Button */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="relative flex items-center group">
                  <Search className={`w-4 h-4 ${cfg.accentTextClass} absolute left-3 pointer-events-none group-focus-within:text-white transition-colors`} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchTerm(val);
                      checkAdminPin(val);
                    }}
                    placeholder={lang === 'bn' ? 'খাবার বা পাসওয়ার্ড...' : 'Search menu or password...'}
                    className={`w-44 lg:w-56 pl-9 pr-8 py-1.5 text-xs rounded-full bg-black/60 border ${cfg.accentBorderClass} text-white placeholder-white/40 focus:outline-none ${cfg.searchFocusClass} focus:ring-1 focus:w-60 transition-all duration-300 shadow-inner`}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 text-white/50 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Header Admin Button */}
              {showAdminButton === true && (
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${cfg.primaryBtnClass} text-xs font-extrabold shadow-md transition-all cursor-pointer shrink-0 active:scale-95 select-none`}
                  title="Open Admin Panel"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* C. MOBILE HEADER CONTROLS (Only for Mobile) */}
        {isMobile && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
              className="p-2 text-white hover:text-[#DA9F93] transition-colors rounded-full bg-black/50 border border-[#DA9F93]/30 shadow-md"
              title="Search or Admin Access"
            >
              <Search className="w-5 h-5 text-[#DA9F93]" />
            </button>

          {/* Three Dots / Menu Drawer Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#DA9F93] transition-colors rounded-full bg-black/60 border border-[#DA9F93]/40 flex items-center justify-center shadow-md active:scale-90 cursor-pointer"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#DA9F93]" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#DA9F93]" />
            )}
          </button>
        </div>
        )}
      </header>

      {/* Mobile & Tablet Search Overlay Bar */}
      <AnimatePresence>
        {isSearchOpenMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-4 right-4 z-50 bg-[#1e140d]/95 border border-[#DA9F93]/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#DA9F93] absolute left-3" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  checkAdminPin(val);
                }}
                placeholder={lang === 'bn' ? 'খাবার খুঁজুন বা পাসওয়ার্ড...' : 'Search menu or password...'}
                className="w-full pl-9 pr-10 py-2 text-sm rounded-xl bg-black/70 border border-[#DA9F93]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#DA9F93]"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpenMobile(false)}
                className="absolute right-3 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Unlock Success Toast */}
      <AnimatePresence>
        {adminUnlockSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 bg-[#DA9F93] text-[#120a06] px-5 py-2.5 rounded-full font-bold shadow-2xl text-xs uppercase tracking-wider"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Panel Unlocked! Opening...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile & Tablet Slide-down Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 z-50 bg-[#180e07]/98 backdrop-blur-2xl border-b border-[#DA9F93]/30 px-5 py-5 flex flex-col space-y-2.5 text-center font-medium shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Search input in Mobile/Tablet Menu */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-1">
              <Search className="w-4 h-4 text-[#DA9F93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  checkAdminPin(val);
                }}
                placeholder={lang === 'bn' ? 'খাবার খুঁজুন বা পাসওয়ার্ড...' : 'Search menu or password...'}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-black/70 border border-[#DA9F93]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#DA9F93]"
              />
            </form>

            <button
              type="button"
              onClick={() => {
                scrollToSection('hero');
                setMobileMenuOpen(false);
              }}
              className="text-[#DA9F93] py-2.5 text-sm font-bold bg-white/5 rounded-xl transition-colors border border-[#DA9F93]/20"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                scrollToSection('about');
                setMobileMenuOpen(false);
              }}
              className="text-white py-2.5 text-sm font-semibold hover:bg-white/5 rounded-xl transition-colors border border-white/5"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => {
                scrollToSection('services');
                setMobileMenuOpen(false);
              }}
              className="text-white py-2.5 text-sm font-semibold hover:bg-white/5 rounded-xl transition-colors border border-white/5"
            >
              Service
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOrderClick) onOrderClick();
                else if (onMenuClick) onMenuClick();
                else scrollToSection('tasting-menu');
                setMobileMenuOpen(false);
              }}
              className="text-white py-2.5 text-sm font-semibold hover:bg-white/5 rounded-xl transition-colors border border-white/5"
            >
              Menu
            </button>
            <button
              type="button"
              onClick={() => {
                if (onReserveClick) onReserveClick();
                else scrollToSection('reservation');
                setMobileMenuOpen(false);
              }}
              className="text-white py-2.5 text-sm font-semibold hover:bg-white/5 rounded-xl transition-colors border border-white/5"
            >
              Reservation
            </button>
            <button
              type="button"
              onClick={() => {
                scrollToSection('contact');
                setMobileMenuOpen(false);
              }}
              className="text-white py-2.5 text-sm font-semibold hover:bg-white/5 rounded-xl transition-colors border border-white/5"
            >
              Contact
            </button>

            {showAdminButton === true && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenAdmin) onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-[#DA9F93] py-3 text-sm font-bold bg-[#DA9F93]/20 border border-[#DA9F93]/50 rounded-xl active:scale-95 transition-transform mt-1"
              >
                <ShieldCheck className="w-4 h-4 text-[#DA9F93]" />
                <span>{lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. HERO SLIDER SECTION WITH ROASTED COFFEE BEANS & COFFEE CUPS ON TOP */}
      {/* ========================================================================= */}
      <div id="hero" className={`relative w-full ${
        isMobile 
          ? 'min-h-[520px] pt-20 pb-10' 
          : isTablet 
          ? 'min-h-[580px] sm:min-h-[620px] pt-20 sm:pt-24 pb-8' 
          : 'min-h-[90vh] sm:min-h-screen pt-24 sm:pt-28 pb-12'
      } flex flex-col justify-between items-center overflow-hidden`}>
        {/* Full Theme Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroBackgroundImage || cfg.heroBgImage || COFFEE_BEANS_BG}
            alt="Theme Hero Background"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${
              isMobile 
                ? 'object-center' 
                : isTablet 
                ? 'object-center' 
                : 'object-center filter brightness-[0.88] contrast-[1.12]'
            }`}
          />
          {/* Botanical Coffee Leaves in Bottom-Left Corner for Coffee Theme #01 */}
          {activePresetId === 'velmora-dining' && (
            <div className="absolute bottom-0 left-0 z-10 pointer-events-none">
              <BotanicalCoffeeLeaves className="w-56 sm:w-72 md:w-84 h-auto opacity-45 drop-shadow-lg" color="#f5ebe0" />
            </div>
          )}
          {/* Subtle Ambient Vignette - Styled dynamically per theme */}
          <div className={`absolute inset-0 bg-gradient-to-b ${cfg.bgGradientOverlay} pointer-events-none`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(10,5,2,0.60)_100%)] pointer-events-none" />
        </div>

        {/* HERO CONTENT AREA */}
        {isClassicTheme ? (
          /* CLASSIC KOPPEE CENTERED LAYOUT (UNTOUCHED FOR THEME 1 & THEME 3) */
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto space-y-3 sm:space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center space-y-2 sm:space-y-3"
              >
                {/* Theme Badge Tag */}
                <div className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 border ${cfg.accentBorderClass} text-[10px] sm:text-xs font-bold uppercase tracking-wider ${cfg.accentTextClass} shadow-lg backdrop-blur-md mb-1 max-w-[92vw] text-center`}>
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="leading-tight">{cfg.heroBadgeTag}</span>
                </div>

                {/* Subtitle / Eyebrow */}
                <span className={`text-xl sm:text-2xl md:text-3xl font-serif ${cfg.accentTextClass} tracking-wide font-normal drop-shadow-md`}>
                  {(slide as any).eyebrow || (slide as any).subtitle}
                </span>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-none font-sans drop-shadow-2xl max-w-4xl">
                  {(slide as any).heading || (slide as any).title}
                </h1>

                {/* Tag / Description */}
                {((slide as any).description || (slide as any).tag) && (
                  <p className="text-xs sm:text-sm md:text-base text-[#FBF8EE]/90 max-w-2xl font-medium leading-relaxed drop-shadow">
                    {(slide as any).description || (slide as any).tag}
                  </p>
                )}

                {/* Floating Coffee Cup Display */}
                <motion.div
                  key={`media-${activeSlide}`}
                  initial={{ scale: 0.92, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative my-2 sm:my-3 flex flex-col items-center w-full"
                >
                  <div className="relative w-56 sm:w-72 md:w-84 lg:w-96 max-w-[90vw] aspect-square flex items-center justify-center">
                    <img
                      src={(slide as any).cupImg || whiteCupSideImg}
                      alt={(slide as any).cupName || brandName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.92)] select-none pointer-events-none transform hover:scale-105 transition-transform duration-500"
                    />
                    <motion.div
                      animate={{ y: [-4, -22, -4], opacity: [0.2, 0.55, 0.2], scale: [0.95, 1.1, 0.95] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-6 w-32 h-24 bg-gradient-to-t from-white/25 via-white/10 to-transparent blur-xl pointer-events-none"
                    />
                  </div>

                  {/* Cup or Detail Badge if available */}
                  {((slide as any).cupName || (slide as any).price) && (
                    <div className={`mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border ${cfg.accentBorderClass} shadow-2xl backdrop-blur-md`}>
                      <Sparkles className={`w-4 h-4 ${cfg.accentTextClass}`} />
                      {(slide as any).cupName && (
                        <span className="text-xs sm:text-sm font-bold tracking-wider text-[#FBF8EE] uppercase">
                          {(slide as any).cupName}
                        </span>
                      )}
                      {(slide as any).price && (
                        <span className={`text-xs sm:text-sm font-extrabold ${cfg.accentTextClass}`}>
                          {(slide as any).price}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOrderClick || onMenuClick || (() => scrollToSection('tasting-menu'))}
                    className={`px-7 py-3 ${cfg.primaryBtnClass} uppercase tracking-wider text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer`}
                  >
                    {(slide as any).primaryBtn || "Order Now"}
                  </button>
                  <button
                    type="button"
                    onClick={onReserveClick || (() => scrollToSection('reservation'))}
                    className={`px-7 py-3 ${cfg.secondaryBtnClass} uppercase tracking-wider text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2`}
                  >
                    <Calendar className={`w-4 h-4 ${cfg.accentTextClass}`} />
                    {(slide as any).secondaryBtn || "Book Table"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* 2-COLUMN LAYOUT FOR ALL OTHER THEMES (#2, #4, #5, #6, #7, #8, #9, #10) */
          /* Text on Left, Animated Floating Visual on Right with Directional Sliding */
          <div className="relative z-10 max-w-[1800px] mx-auto w-full px-4 sm:px-8 md:px-10 lg:px-16 xl:px-20 my-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`split-${activeSlide}`}
                initial={
                  activeSlide % 2 === 0
                    ? { opacity: 0, x: 120, y: 0 }
                    : { opacity: 0, x: 0, y: 90 }
                }
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={
                  activeSlide % 2 === 0
                    ? { opacity: 0, x: -120, y: 0 }
                    : { opacity: 0, x: 0, y: -70 }
                }
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={
                  isMobile
                    ? "flex flex-col items-center text-center gap-5 w-full"
                    : isTablet
                    ? "grid grid-cols-12 gap-4 items-center w-full"
                    : "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center w-full"
                }
              >
                {/* LEFT COLUMN: Text, Badges & Actions */}
                <div className={
                  isMobile
                    ? "w-full text-center flex flex-col items-center space-y-3 px-1"
                    : isTablet
                    ? "col-span-7 text-left flex flex-col items-start space-y-3 pr-2"
                    : "md:col-span-7 lg:col-span-6 text-center md:text-left flex flex-col items-center md:items-start space-y-3 sm:space-y-4 md:pr-4 lg:pr-8"
                }>
                  {/* Theme Badge Tag */}
                  <div className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/80 border ${cfg.accentBorderClass} text-[10px] sm:text-xs font-bold uppercase tracking-wider ${cfg.accentTextClass} shadow-xl backdrop-blur-md max-w-[92vw] text-center`}>
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span className="leading-tight">{cfg.heroBadgeTag}</span>
                  </div>

                  {/* Subtitle / Eyebrow */}
                  <span className={`text-base sm:text-2xl md:text-2xl lg:text-3xl font-serif ${cfg.accentTextClass} tracking-wide font-normal drop-shadow-md block`}>
                    {(slide as any).eyebrow || (slide as any).subtitle}
                  </span>

                  {/* Main Title */}
                  <h1 className={`${
                    isMobile 
                      ? 'text-3xl sm:text-4xl' 
                      : isTablet 
                      ? 'text-4xl sm:text-5xl' 
                      : 'text-3xl sm:text-5xl md:text-5xl lg:text-7xl'
                  } font-black text-white tracking-tight uppercase leading-tight md:leading-none font-sans drop-shadow-2xl`}>
                    {(slide as any).heading || (slide as any).title}
                  </h1>

                  {/* Description / Tagline */}
                  {((slide as any).description || (slide as any).tag) && (
                    <p className="text-xs sm:text-sm md:text-base text-[#FBF8EE]/90 max-w-xl font-medium leading-relaxed drop-shadow">
                      {(slide as any).description || (slide as any).tag}
                    </p>
                  )}

                  {/* Item / Price Badge if available */}
                  {((slide as any).cupName || (slide as any).price) && (
                    <div className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/80 border ${cfg.accentBorderClass} shadow-2xl backdrop-blur-md`}>
                      <Sparkles className={`w-3.5 h-3.5 ${cfg.accentTextClass}`} />
                      {(slide as any).cupName && (
                        <span className="text-xs sm:text-sm font-bold tracking-wider text-[#FBF8EE] uppercase">
                          {(slide as any).cupName}
                        </span>
                      )}
                      {(slide as any).price && (
                        <span className={`text-xs sm:text-sm font-extrabold ${cfg.accentTextClass}`}>
                          {(slide as any).price}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className={`flex flex-wrap items-center justify-center ${isMobile ? 'w-full gap-2.5' : 'md:justify-start gap-2.5 sm:gap-3.5'} pt-2 w-full`}>
                    <button
                      type="button"
                      onClick={onOrderClick || onMenuClick || (() => scrollToSection('tasting-menu'))}
                      className={`px-6 sm:px-8 py-3 sm:py-3.5 ${cfg.primaryBtnClass} uppercase tracking-wider text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer ${isMobile ? 'flex-1 min-w-[140px]' : ''}`}
                    >
                      {(slide as any).primaryBtn || "Shop Now"}
                    </button>
                    <button
                      type="button"
                      onClick={onReserveClick || (() => scrollToSection('reservation'))}
                      className={`px-6 sm:px-8 py-3 sm:py-3.5 ${cfg.secondaryBtnClass} uppercase tracking-wider text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${isMobile ? 'flex-1 min-w-[140px]' : ''}`}
                    >
                      <Calendar className={`w-4 h-4 ${cfg.accentTextClass}`} />
                      {(slide as any).secondaryBtn || "Explore Blends"}
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Theme-Specific Animated Visual Element */}
                <div className={
                  isMobile
                    ? "w-full flex items-center justify-center my-1 max-w-[280px] mx-auto"
                    : isTablet
                    ? "col-span-5 flex items-center justify-center relative my-1"
                    : "md:col-span-5 lg:col-span-6 flex items-center justify-center md:justify-end relative my-2 md:my-0 md:translate-x-0 lg:translate-x-6 xl:translate-x-12"
                }>
                  <HeroAnimatedElement
                    themeId={activePresetId}
                    accentColor={cfg.accentColor}
                    cupImg={(slide as any).cupImg}
                    cupName={(slide as any).cupName}
                    slideType={(slide as any).type}
                    slideIndex={activeSlide}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Left & Right Slider Arrows rendered for ALL themes when multiple slides exist */}
        {currentSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevSlide}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-amber-400/40 text-amber-200 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-2xl active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-amber-400/40 text-amber-200 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-2xl active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Bottom Slider Pagination Indicator Dots */}
            <div className="absolute bottom-6 z-30 flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
              {currentSlides.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === idx
                      ? 'w-7 h-2.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom divider: Theme #01 Velmora uses Torn Paper Edge; Theme #02 Orivelle House uses Architectural 24K Gold Geometric Divider */}
        {themePresetId === 'orivelle-house' ? (
          <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none select-none">
            <OrivelleGeometricDivider color="#0a0907" position="top" />
          </div>
        ) : isDesktop ? (
          <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none select-none hidden lg:block">
            <TornPaperEdge color="#ffffff" position="top" />
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-30 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default KoppeeHeroHeader;
