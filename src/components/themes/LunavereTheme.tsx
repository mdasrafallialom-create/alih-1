import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, Sparkles, Moon, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, Play, Pause, ShoppingBag, ArrowUpRight, 
  Menu, X, Heart, Shield, QrCode, Check, Compass, Volume2, Search, Bell,
  Award, ChefHat, Utensils, Instagram, Facebook, Mail, ArrowRight, ArrowLeft,
  Youtube, Linkedin
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import portafilterTrioImg from '../../assets/images/portafilter_trio_story_1789909656642.jpg';
import { EspressoMachineHero } from './EspressoMachineHero';

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
  settings?: any;
  lang?: string;
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
  { id: '1', title: 'Artisan Caramel Macchiato', price: 6.50, calories: '180 kcal', desc: 'Single-origin espresso with steamed vanilla oat milk & Madagascar caramel drizzle', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: '2', title: 'Flaky Butter Almond Croissant', price: 4.50, calories: '290 kcal', desc: 'Freshly baked daily with French butter, roasted almond flakes & powdered sugar', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop', category: 'pastries', isPopular: true },
  { id: '3', title: 'Pistachio Velvet Cold Brew', price: 5.50, calories: '150 kcal', desc: '24-hour slow-steeped Arabica cold brew topped with sweet pistachio cream foam', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop', category: 'coffee', isPopular: true },
  { id: '4', title: 'Smoked Salmon Avocado Sourdough', price: 12.00, calories: '380 kcal', desc: 'Stone-baked sourdough toast, wild smoked salmon, poached egg & micro-herbs', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop', category: 'brunch', isPopular: true },
  { id: '5', title: 'Double Shot Velvet Espresso', price: 4.00, calories: '10 kcal', desc: 'Rich golden crema with notes of dark cocoa, roasted hazelnut & wild honey', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop', category: 'coffee' },
  { id: '6', title: 'Wild Berry Almond Custard Tart', price: 7.50, calories: '310 kcal', desc: 'Crispy butter pastry filled with organic berries and vanilla bean custard', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop', category: 'desserts', isPopular: true },
  { id: '7', title: 'Honey Glazed Cinnamon Brioche Roll', price: 5.00, calories: '340 kcal', desc: 'Warm fluffy brioche roll swirled with Saigon cinnamon & organic honey glaze', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop', category: 'pastries' },
  { id: '8', title: 'Rustic Sourdough Artisan Loaf', price: 8.00, calories: '420 kcal', desc: 'Handcrafted stone-baked sourdough loaf served with cultured whipped butter', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&auto=format&fit=crop', category: 'pastries' },
  { id: '9', title: 'Lavender Starlight Latte', price: 6.00, calories: '190 kcal', desc: 'Espresso infused with French culinary lavender, vanilla bean & silky micro-foam', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop', category: 'coffee' },
  { id: '10', title: 'Truffle Prosciutto Burrata Panini', price: 13.50, calories: '490 kcal', desc: 'Crispy ciabatta, aged prosciutto di Parma, creamy burrata & black truffle glaze', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop', category: 'brunch' },
  { id: '11', title: 'Truffle Burrata Artisan Pizza', price: 19.50, calories: '820 kcal', desc: 'Artisanal sourdough base with shaved black truffles, fresh creamy burrata & arugula', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop', category: 'brunch', isPopular: true },
  { id: '12', title: 'Belgian Dark Chocolate Fondant', price: 8.50, calories: '450 kcal', desc: 'Warm molten chocolate core served with Madagascar vanilla bean gelato', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop', category: 'desserts' },
  { id: '13', title: 'Parisian Rose Macarons Box', price: 9.00, calories: '260 kcal', desc: 'Artisanal box of 6 handcrafted macarons: raspberry, salted caramel, pistachio & dark cacao', img: 'https://images.unsplash.com/photo-1569864321390-dc872714c382?w=600&auto=format&fit=crop', category: 'desserts' },
  { id: '14', title: 'Organic Jasmine Pearl Green Tea', price: 4.50, calories: '0 kcal', desc: 'Hand-rolled young green tea pearls scented with fresh night-blooming jasmine flowers', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop', category: 'tea' }
];

export default function LunavereTheme({
  brandName = 'LUNAVERE',
  tagline = 'Parisian Starlight Cafe',
  dishes = [],
  fontDisplay,
  fontBody,
  primaryColor,
  onOrderDish,
  onOpenAdmin,
  onBack,
  settings,
  lang = 'en'
}: LunavereThemeProps) {
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQrMenuModal, setShowQrMenuModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedDishDetail, setSelectedDishDetail] = useState<FoodItem | null>(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [resName, setResName] = useState('');
  const [resGuests, setResGuests] = useState('2');
  const [resTime, setResTime] = useState('20:00');

  // Detect motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isChefHovered, setIsChefHovered] = useState(false);

  // Chef section visibility logic: Controlled by theme admin settings
  const isChefSectionVisible = settings?.themeShowChefSection !== false;
  const rawChefs: ChefProfile[] = (settings?.chefProfiles && settings.chefProfiles.length > 0)
    ? settings.chefProfiles
    : DEFAULT_CHEF_PROFILES;
  const chefs = rawChefs.slice(0, 6);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 40);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
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

  const effectiveDishes = (dishes && dishes.length > 0) ? dishes : DEFAULT_LUNAVERE_DISHES;

  const filteredDishes = activeCategory === 'all' 
    ? effectiveDishes 
    : effectiveDishes.filter(d => d.category?.toLowerCase().includes(activeCategory) || d.title.toLowerCase().includes(activeCategory));

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
        className="absolute top-0 left-0 right-0 z-30 w-full transition-all duration-300 bg-[#F4E7D3]/90 backdrop-blur-md border-b border-[#C9A86A]/25 py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#C9A86A]/60 flex items-center justify-center text-[#96722d] shadow-sm group-hover:border-[#96722d] transition-colors shrink-0">
                <Moon className="w-5 h-5 text-[#96722d]" />
              </div>
              <div>
                <span 
                  className="text-lg sm:text-2xl font-normal tracking-wider text-[#171522] group-hover:text-[#96722d] transition-colors block leading-tight"
                  style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                >
                  {brandName || 'LUNAVERE'}
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#96722d] uppercase block font-bold">
                  {tagline || 'Parisian Starlight Cafe'}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-[#171522]/80">
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

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* QR Menu Card */}
            <button 
              onClick={() => setShowQrMenuModal(true)}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-white/80 border border-[#C9A86A]/50 text-[#171522] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-[#96722d]" />
              <span>QR Menu</span>
            </button>

            {/* Reserve Button */}
            <button 
              onClick={() => setReservationModalOpen(true)}
              className="px-5 py-2 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Reserve Table
            </button>

            {/* Admin Key Button if enabled */}
            {settings?.showAdminButton !== false && onOpenAdmin && (
              <button 
                onClick={onOpenAdmin}
                title="Admin Control"
                className="w-8 h-8 rounded-full border border-[#C9A86A]/40 text-[#96722d] hover:border-[#96722d] flex items-center justify-center transition-colors text-xs cursor-pointer bg-white/80"
              >
                ⚙️
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setReservationModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#171522] text-white text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-sm"
            >
              {lang === 'bn' ? 'বুক' : 'Book'}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171522] hover:text-[#96722d] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#F4E7D3] border-b border-[#C9A86A]/30 px-6 py-5 space-y-4 shadow-xl text-[#171522]"
            >
              <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wider">
                <button onClick={() => scrollToSection('menu')} className="text-left text-[#171522] hover:text-[#96722d]">
                  Menu
                </button>
                <button onClick={() => scrollToSection('story')} className="text-left text-[#171522] hover:text-[#96722d]">
                  Story & Philosophy
                </button>
                <button onClick={() => scrollToSection('desserts')} className="text-left text-[#171522] hover:text-[#96722d]">
                  Pâtisserie & Desserts
                </button>
                {isChefSectionVisible && (
                  <button onClick={() => scrollToSection('chefs')} className="text-left text-[#171522] hover:text-[#96722d]">
                    Artisanal Masters
                  </button>
                )}
                <button onClick={() => scrollToSection('timeline')} className="text-left text-[#171522] hover:text-[#96722d]">
                  Evening Ritual
                </button>
                <button onClick={() => scrollToSection('visit')} className="text-left text-[#171522] hover:text-[#96722d]">
                  Visit & Hours
                </button>
              </div>

              <div className="pt-3 border-t border-[#C9A86A]/20 flex items-center justify-between">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowQrMenuModal(true);
                  }}
                  className="text-xs font-bold text-[#96722d] flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Scan QR Menu</span>
                </button>

                {settings?.showAdminButton === true && onOpenAdmin && (
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="text-xs text-[#171522]/70 hover:text-[#96722d]"
                  >
                    Admin Access
                  </button>
                )}
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
      />

      {/* ========================================================= */}
      {/* 3. OUR PHILOSOPHY & STORY SECTION */}
      {/* ========================================================= */}
      <section id="story" className="py-20 lg:py-28 px-6 sm:px-12 bg-[#F4E7D3] text-[#171522] scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
        <div className="max-w-7xl mx-auto space-y-12">
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

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white text-[#171522] rounded-2xl p-8 border border-[#C9A86A]/30 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 
                className="text-2xl font-semibold text-[#171522] group-hover:text-[#96722d] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Espresso Ritual
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Velvety, balanced and served with care. Crafted from single-origin Arabica beans extracted under commercial bar pressure.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-[#171522] rounded-2xl p-8 border border-[#C9A86A]/30 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 
                className="text-2xl font-semibold text-[#171522] group-hover:text-[#96722d] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                House Pour-Over
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                A delicate cup for unhurried moments. Slow-brewed over V60 with floral notes and subtle caramel sweetness.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-[#171522] rounded-2xl p-8 border border-[#C9A86A]/30 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A]/20 text-[#96722d] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <h3 
                className="text-2xl font-semibold text-[#171522] group-hover:text-[#96722d] transition-colors"
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
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#C9A86A]/30 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#96722d]">
                SELECTION DES BOISSONS & GASTRONOMIE
              </span>
              <h2 
                className="text-3xl sm:text-5xl font-normal text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Favourites after dark
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold capitalize tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#171522] text-white font-bold shadow-md'
                      : 'bg-white text-[#171522]/80 hover:text-[#171522] border border-[#C9A86A]/40 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Food Cards Layout with Spacing */}
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredDishes.map((item) => (
                <div
                  key={item.id}
                  className="bg-white text-[#171522] rounded-[22px] p-5 sm:p-6 border border-[#C9A86A]/35 shadow-lg hover:border-[#96722d] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group space-y-4"
                >
                  {/* Image with rounded corners and spacing */}
                  <div className="relative overflow-hidden rounded-xl bg-[#FAF3E8] aspect-[4/3] w-full">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.calories && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#171522]/85 backdrop-blur-md text-white text-[10px] font-mono shadow-sm border border-[#C9A86A]/30">
                        {item.calories}
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#C9A86A] text-[#171522] text-[10px] font-black tracking-wider uppercase shadow-md">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Content separated with padding */}
                  <div className="flex flex-col justify-between flex-1 space-y-3 pt-1">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 
                          className="text-lg sm:text-xl font-medium text-[#171522] leading-snug group-hover:text-[#96722d] transition-colors"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {item.title}
                        </h3>
                        <span className="text-base sm:text-lg font-bold text-[#96722d] font-mono shrink-0 bg-[#F4E7D3]/70 border border-[#C9A86A]/40 px-2.5 py-0.5 rounded-lg">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-[#171522]/75 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C9A86A]/20 flex items-center justify-between mt-auto">
                      <button 
                        onClick={() => setSelectedDishDetail(item)}
                        className="text-xs font-semibold text-[#171522]/80 hover:text-[#96722d] underline underline-offset-4 cursor-pointer"
                      >
                        Details
                      </button>

                      <button 
                        onClick={() => onOrderDish && onOrderDish(item)}
                        className="px-4 py-2 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C9A86A]" />
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
        <div className="max-w-7xl mx-auto space-y-10">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {displayDesserts.slice(0, 3).map((dessert) => (
              <div 
                key={dessert.id}
                className="bg-white text-[#171522] rounded-2xl overflow-hidden shadow-lg border border-[#C9A86A]/30 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group text-left"
              >
                <div className="h-60 sm:h-64 overflow-hidden relative bg-[#FAF3E8]">
                  <img 
                    src={dessert.img} 
                    alt={dessert.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dessert.calories && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#171522]/85 text-white/90 text-[11px] font-mono font-medium backdrop-blur-sm shadow">
                      {dessert.calories}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 
                        className="text-xl sm:text-2xl font-normal text-[#171522] leading-snug group-hover:text-[#96722d] transition-colors"
                        style={{ fontFamily: fontDisplay || "'Cormorant Garamond', serif" }}
                      >
                        {dessert.title}
                      </h3>
                      <span className="text-lg font-bold text-[#96722d] font-mono shrink-0">
                        ${dessert.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#171522]/70 leading-relaxed mt-2 line-clamp-2">
                      {dessert.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedDishDetail(dessert)}
                      className="text-xs font-semibold text-[#171522]/80 hover:text-[#96722d] underline underline-offset-4 cursor-pointer"
                    >
                      Details
                    </button>

                    <button 
                      onClick={() => onOrderDish && onOrderDish(dessert)}
                      className="px-5 py-2.5 rounded-full bg-[#171522] hover:bg-[#2e2a42] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C9A86A]" />
                      <span>ORDER NOW</span>
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
          <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
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
              {[...chefs, ...chefs].map((chef, idx) => (
                <div 
                  key={`${chef.id || idx}-${idx}`}
                  className="w-[340px] sm:w-[380px] md:w-[410px] shrink-0 bg-white border border-[#C9A86A]/30 hover:border-[#96722d] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-lg transition-all duration-300 group cursor-pointer text-[#171522]"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
      {/* 9. TESTIMONIALS */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 bg-[#EDE2D0] text-[#171522]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-12 h-12 rounded-full bg-[#171522] text-[#C9A86A] flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <p 
                className="text-2xl sm:text-4xl font-normal leading-relaxed italic text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "{DEFAULT_TESTIMONIALS[activeTestimonial].quote}"
              </p>

              <div>
                <h4 className="text-sm font-bold tracking-widest uppercase text-[#171522]">
                  {DEFAULT_TESTIMONIALS[activeTestimonial].author}
                </h4>
                <p className="text-xs text-[#171522]/75 mt-0.5">
                  {DEFAULT_TESTIMONIALS[activeTestimonial].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Accessible Controls */}
          <div className="flex items-center justify-center gap-3 pt-4">
            {DEFAULT_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === activeTestimonial 
                    ? 'w-8 h-2.5 bg-[#171522]' 
                    : 'w-2.5 h-2.5 bg-[#171522]/30 hover:bg-[#171522]/60'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. LUNAVERE PARISIAN STARLIGHT FOOTER */}
      {/* ========================================================= */}
      <footer id="visit" className="bg-[#0f101d] text-white border-t border-white/20 pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
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
                    {brandName || settings?.brandName || 'askul'}
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
                <a 
                  href={settings?.socialLinks?.instagram ? (settings.socialLinks.instagram.startsWith('http') ? settings.socialLinks.instagram : `https://${settings.socialLinks.instagram}`) : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.socialLinks?.youtube ? (settings.socialLinks.youtube.startsWith('http') ? settings.socialLinks.youtube : `https://${settings.socialLinks.youtube}`) : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.socialLinks?.facebook ? (settings.socialLinks.facebook.startsWith('http') ? settings.socialLinks.facebook : `https://${settings.socialLinks.facebook}`) : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.socialLinks?.linkedin ? (settings.socialLinks.linkedin.startsWith('http') ? settings.socialLinks.linkedin : `https://${settings.socialLinks.linkedin}`) : 'https://linkedin.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-[#0f101d] transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Contact & Enquiries */}
            {(settings?.brandLocation || settings?.contactPhone) && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                  {settings?.brandLocation ? 'LOCATION & ENQUIRIES' : 'CONTACT & ENQUIRIES'}
                </h4>
                <div className="space-y-3 text-xs text-white/90">
                  {settings?.brandLocation && (
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {settings.brandLocation}
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
            <p>© {new Date().getFullYear()} {brandName || settings?.brandName || 'askul'}. All Parisian rights reserved.</p>
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
    </div>
  );
}
