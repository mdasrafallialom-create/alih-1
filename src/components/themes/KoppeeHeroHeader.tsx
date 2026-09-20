import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Menu, X, ChevronDown, Coffee, Calendar, Search, ShieldCheck } from 'lucide-react';
import { TornPaperEdge } from './TornPaperEdge';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';
import whiteCoffeeCupImg from '../../assets/images/white_coffee_cup_isolated_trimmed.png';
import whiteCupSideImg from '../../assets/images/white_cup_side_isolated.png';
import whiteCappuccinoCupImg from '../../assets/images/white_cappuccino_isolated.png';

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
  showAdminButton?: boolean;
  lang?: string;
}

const COFFEE_BEANS_BG = roastedCoffeeBeansBg;

const KOPPEE_SLIDES = [
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

export const KoppeeHeroHeader: React.FC<KoppeeHeroHeaderProps> = ({
  brandName = 'KOPPEE',
  onOrderClick,
  onReserveClick,
  onMenuClick,
  onNavigate,
  onOpenAdmin,
  showAdminButton = true,
  lang = 'en'
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [adminUnlockSuccess, setAdminUnlockSuccess] = useState(false);

  // Check admin PIN logic
  const checkAdminPin = (input: string) => {
    const raw = input.trim();
    if (!raw) return false;
    const lower = raw.toLowerCase();

    let dynamicCode = '8520';
    if (typeof window !== 'undefined') {
      dynamicCode = (localStorage.getItem('webar_admin_secret_code') || '8520').toLowerCase().trim();
    }

    const validPins = ['8520', 'admin8520', '8520admin', 'admin', dynamicCode];
    if (validPins.some((p) => p === lower)) {
      setAdminUnlockSuccess(true);
      setTimeout(() => {
        if (onOpenAdmin) {
          onOpenAdmin();
        }
        setSearchTerm('');
        setIsSearchOpenMobile(false);
        setAdminUnlockSuccess(false);
      }, 400);
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

  // Auto slide cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % KOPPEE_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? KOPPEE_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % KOPPEE_SLIDES.length);
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

  return (
    <div className="relative w-full overflow-hidden bg-[#120a06] text-white font-sans selection:bg-[#DA9F93]/30">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVBAR (KOPPEE STYLE WITH SEARCH BAR) */}
      {/* ========================================================================= */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 md:px-16 py-6 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/45 to-transparent">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider uppercase font-sans drop-shadow-md">
            {brandName || 'KOPPEE'}
          </span>
        </div>

        {/* Desktop Navigation Menu & Search Bar */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          <nav className="flex items-center space-x-5 lg:space-x-7 text-sm font-medium">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-[#DA9F93] hover:text-[#e0a89c] transition-colors cursor-pointer py-1 border-b-2 border-[#DA9F93]"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-white/90 hover:text-[#DA9F93] transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="text-white/90 hover:text-[#DA9F93] transition-colors cursor-pointer py-1"
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
              className="text-white/90 hover:text-[#DA9F93] transition-colors cursor-pointer py-1"
            >
              Menu
            </button>

            {/* Dropdown Menu for Pages */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                className="flex items-center gap-1 text-white/90 hover:text-[#DA9F93] transition-colors cursor-pointer py-1 focus:outline-none"
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
                    className="absolute right-0 mt-2 w-48 bg-[#1e140d] border border-[#DA9F93]/30 rounded-lg shadow-2xl py-2 z-50 text-left"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (onReserveClick) onReserveClick();
                        else scrollToSection('reservation');
                        setPagesDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-[#2c1e13] hover:text-[#DA9F93] transition-colors"
                    >
                      Reservation
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('testimonials')}
                      className="w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-[#2c1e13] hover:text-[#DA9F93] transition-colors"
                    >
                      Testimonials
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('specials')}
                      className="w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-[#2c1e13] hover:text-[#DA9F93] transition-colors"
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
              className="text-white/90 hover:text-[#DA9F93] transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Search Bar & Admin Button */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative flex items-center group">
                <Search className="w-4 h-4 text-[#DA9F93] absolute left-3 pointer-events-none group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    checkAdminPin(val);
                  }}
                  placeholder={lang === 'bn' ? 'খাবার খুঁজুন বা কোড (8520)...' : 'Search menu or enter PIN (8520)...'}
                  className="w-44 lg:w-56 pl-9 pr-8 py-1.5 text-xs rounded-full bg-black/60 border border-[#DA9F93]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#DA9F93] focus:ring-1 focus:ring-[#DA9F93] focus:w-60 transition-all duration-300 shadow-inner"
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

            {/* Header Admin Button Toggle (Controlled by Admin Settings) */}
            {showAdminButton !== false && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenAdmin) onOpenAdmin();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DA9F93] hover:bg-[#c88d81] text-[#120a06] font-extrabold text-xs shadow-md transition-all cursor-pointer shrink-0 active:scale-95 select-none"
                title={lang === 'bn' ? 'এডমিন প্যানেল খুলুন' : 'Open Admin Panel'}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{lang === 'bn' ? 'এডমিন' : 'Admin'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Header Controls: Admin Button + Search Icon + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {showAdminButton !== false && (
            <button
              type="button"
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="px-2.5 py-1.5 text-[#DA9F93] hover:text-white transition-colors rounded-full bg-black/60 border border-[#DA9F93]/40 flex items-center gap-1 cursor-pointer shadow-sm active:scale-90 text-xs font-bold"
              title={lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}
            >
              <ShieldCheck className="w-4 h-4 text-[#DA9F93]" />
              <span className="text-[11px] font-extrabold">{lang === 'bn' ? 'এডমিন' : 'Admin'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
            className="p-2 text-white hover:text-[#DA9F93] transition-colors rounded-full bg-black/40 border border-[#DA9F93]/20"
            title="Search or Admin Access"
          >
            <Search className="w-5 h-5 text-[#DA9F93]" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#DA9F93] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Search Overlay Bar */}
      <AnimatePresence>
        {isSearchOpenMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-4 right-4 z-50 md:hidden bg-[#1e140d]/95 border border-[#DA9F93]/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md"
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
                placeholder={lang === 'bn' ? 'খাবার খুঁজুন বা এডমিন পিন (8520)...' : 'Search menu or enter admin PIN (8520)...'}
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

      {/* Mobile Slide-down Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 z-40 bg-[#1e140d]/95 backdrop-blur-md border-b border-[#DA9F93]/20 md:hidden px-6 py-6 flex flex-col space-y-4 text-center font-medium shadow-2xl"
          >
            {/* Search input in Mobile Menu */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
              <Search className="w-4 h-4 text-[#DA9F93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  checkAdminPin(val);
                }}
                placeholder={lang === 'bn' ? 'মেনু সার্চ বা পিন (8520)...' : 'Search menu or enter PIN (8520)...'}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-black/60 border border-[#DA9F93]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#DA9F93]"
              />
            </form>

            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-[#DA9F93] py-2 text-base font-semibold border-b border-white/10"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-white py-2 text-base border-b border-white/10"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="text-white py-2 text-base border-b border-white/10"
            >
              Service
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOrderClick) onOrderClick();
                else if (onMenuClick) onMenuClick();
                else scrollToSection('menu');
                setMobileMenuOpen(false);
              }}
              className="text-white py-2 text-base border-b border-white/10"
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
              className="text-white py-2 text-base border-b border-white/10"
            >
              Reservation
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="text-white py-2 text-base"
            >
              Contact
            </button>

            {showAdminButton !== false && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenAdmin) onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-[#DA9F93] py-2.5 text-base font-bold bg-[#DA9F93]/15 border border-[#DA9F93]/40 rounded-xl active:scale-95 transition-transform mt-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#DA9F93]" />
                <span>{lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. HERO SLIDER SECTION WITH ROASTED COFFEE BEANS & COFFEE CUPS ON TOP */}
      {/* ========================================================================= */}
      <div id="hero" className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-between items-center pt-24 sm:pt-28 pb-8 overflow-hidden">
        {/* Full Coffee Beans Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={COFFEE_BEANS_BG}
            alt="Roasted Coffee Beans Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.12]"
          />
          {/* Subtle Ambient Vignette - Keeps whole espresso beans vibrant and clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(10,5,2,0.50)_100%)] pointer-events-none" />
        </div>

        {/* Center Content Overlay (Text + Coffee Cup Sitting On Beans) */}
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
              {/* Subtitle / Eyebrow */}
              <span className="text-xl sm:text-3xl md:text-4xl font-serif text-[#DA9F93] tracking-wide font-normal drop-shadow-md">
                {KOPPEE_SLIDES[activeSlide].subtitle}
              </span>

              {/* Main Title: COFFEE */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-none font-sans drop-shadow-2xl">
                {KOPPEE_SLIDES[activeSlide].title}
              </h1>

              {/* Tag / Badge: * SINCE 1950 * */}
              <span className="text-xs sm:text-base md:text-lg font-bold tracking-[0.25em] text-[#F5DEB3] uppercase drop-shadow-md">
                {KOPPEE_SLIDES[activeSlide].tag}
              </span>

              {/* Coffee Cup Display - Only the Cup itself with 100% Transparent Cutout */}
              <motion.div
                key={`cup-${activeSlide}`}
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative my-2 sm:my-3 flex flex-col items-center"
              >
                {/* Clean Floating Cup (Transparent PNG Cutout - No Box, No Frame, No Outside Beans) */}
                <div className="relative w-56 sm:w-72 md:w-84 lg:w-96 max-w-[90vw] aspect-square flex items-center justify-center">
                  {/* Real transparent PNG white coffee cup */}
                  <img
                    src={KOPPEE_SLIDES[activeSlide].cupImg}
                    alt={KOPPEE_SLIDES[activeSlide].cupName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.92)] select-none pointer-events-none transform hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle realistic animated steam rising from the hot coffee */}
                  <motion.div
                    animate={{ y: [-4, -22, -4], opacity: [0.2, 0.55, 0.2], scale: [0.95, 1.1, 0.95] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-6 w-32 h-24 bg-gradient-to-t from-white/25 via-white/10 to-transparent blur-xl pointer-events-none"
                  />
                </div>

                {/* Cup Detail Badge */}
                <div className="mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-[#DA9F93]/35 shadow-2xl backdrop-blur-md">
                  <Coffee className="w-4 h-4 text-[#DA9F93]" />
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-[#FBF8EE] uppercase">
                    {KOPPEE_SLIDES[activeSlide].cupName}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#DA9F93]">
                    {KOPPEE_SLIDES[activeSlide].price}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOrderClick || onMenuClick || (() => scrollToSection('tasting-menu'))}
                  className="px-7 py-3 rounded-full bg-[#DA9F93] hover:bg-[#c6897e] text-[#120a06] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all active:scale-95 cursor-pointer"
                >
                  Order Now
                </button>
                <button
                  type="button"
                  onClick={onReserveClick || (() => scrollToSection('reservation'))}
                  className="px-7 py-3 rounded-full bg-black/50 hover:bg-black/80 border border-[#DA9F93]/60 text-[#FBF8EE] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all active:scale-95 backdrop-blur-sm cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#DA9F93]" />
                  Book Table
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left Slider Arrow (<) */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/70 border border-white/30 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-xl active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Right Slider Arrow (>) */}
        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/70 border border-white/30 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-xl active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Torn Paper Edge at the Bottom of the Coffee Beans Hero */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none select-none">
          <TornPaperEdge color="#FFFBF2" position="top" />
        </div>
      </div>
    </div>
  );
};

export default KoppeeHeroHeader;
