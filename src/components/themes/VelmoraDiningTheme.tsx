import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Sparkles, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, Play, Pause, ShoppingBag, ArrowUpRight, 
  Menu, X, Heart, Shield, QrCode, Check, Compass, Search, Bell,
  Award, ChefHat, Utensils, Wine, Gem, Users, CheckCircle2
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import FooterAndLocation from '../FooterAndLocation';

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
  settings?: any;
  lang?: string;
}

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
    eyebrow: 'ROYAL WOOD-FIRED GRILL & ROTISSERIE',
    heading: 'Kagoshima A5 Wagyu & 24K Gold Crust',
    description: 'Dry-aged for 45 days in Himalayan pink salt chambers, finished over artisanal Japanese binchotan charcoal.',
    primaryBtn: 'Discover Cuts',
    secondaryBtn: 'Reserve Chef Table',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1600&auto=format&fit=crop',
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
  settings,
  lang = 'en'
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

  return (
    <div 
      className="w-full min-h-screen text-[#FBF8EE] selection:bg-[#D4AF37]/30 selection:text-white outline-none"
      style={{
        backgroundColor: VELMORA_PALETTE.deepObsidian,
        fontFamily: fontBody || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* DEDICATED VELMORA HERO SECTION WITH PALATIAL AURA */}
      {/* ========================================================= */}
      <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* Background Slide Carousel with Ken Burns subtle motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={VELMORA_HERO_SLIDES[activeSlide].img} 
              alt={VELMORA_HERO_SLIDES[activeSlide].heading} 
              className="w-full h-full object-cover object-center brightness-[0.38] contrast-[1.12]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Gold Radial Aura & Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#090805] via-transparent to-[#090805]/70" />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_75%)]" />

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 text-center py-16 sm:py-24 space-y-6 sm:space-y-8">
          
          {/* Michelin Stars & Royal Distinction Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#14120B]/90 border border-[#D4AF37]/40 shadow-xl shadow-black/60 backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#F3E5AB] uppercase">
              {VELMORA_HERO_SLIDES[activeSlide].eyebrow}
            </span>
          </motion.div>

          {/* Main Palatial Headline */}
          <motion.h1 
            key={`heading-${activeSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FBF8EE] leading-[1.12]"
            style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
          >
            {VELMORA_HERO_SLIDES[activeSlide].heading}
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p 
            key={`desc-${activeSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#FBF8EE]/80 leading-relaxed font-light"
          >
            {VELMORA_HERO_SLIDES[activeSlide].description}
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => setReservationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#090805] font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              <span>{VELMORA_HERO_SLIDES[activeSlide].primaryBtn}</span>
            </button>

            <a
              href="#tasting-menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#14120B]/80 border border-[#D4AF37]/50 text-[#FBF8EE] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <span>{VELMORA_HERO_SLIDES[activeSlide].secondaryBtn}</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </motion.div>

          {/* Carousel Slide Indicators & Autoplay Control */}
          <div className="flex items-center justify-center gap-3 pt-6">
            {VELMORA_HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all rounded-full ${
                  activeSlide === idx 
                    ? 'w-8 h-2 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/40' 
                    : 'w-2 h-2 bg-[#FBF8EE]/30 hover:bg-[#FBF8EE]/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-2 text-[#D4AF37]/70 hover:text-[#D4AF37] p-1"
              title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Floating Key Pillars Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#14120B]/90 border-t border-[#D4AF37]/25 backdrop-blur-md py-4">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 border-r border-[#D4AF37]/15 last:border-none">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FBF8EE]/90">3 Michelin Stars</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-r border-[#D4AF37]/15 last:border-none">
              <Wine className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FBF8EE]/90">1,200+ Rare Vintages</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-r border-[#D4AF37]/15 last:border-none">
              <ChefHat className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FBF8EE]/90">9-Course Degustation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Gem className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FBF8EE]/90">Private Grand Salons</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TASTING MENU & GOURMET CULINARY SHOWCASE */}
      {/* ========================================================= */}
      <section id="tasting-menu" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
            — THE CULINARY REPERTOIRE —
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
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#090805] shadow-lg shadow-[#D4AF37]/25 scale-105'
                  : 'bg-[#14120B] border border-[#D4AF37]/30 text-[#FBF8EE]/80 hover:border-[#D4AF37] hover:text-[#D4AF37]'
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
              className="group bg-[#14120B] rounded-2xl border border-[#D4AF37]/25 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              {/* Dish Image */}
              <div className="relative h-56 overflow-hidden bg-black/40">
                <img 
                  src={dish.img} 
                  alt={dish.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14120B] via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {dish.isChefSpecial && (
                    <span className="px-2.5 py-1 rounded-full bg-[#6B1724] text-white text-[9px] font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1 shadow-md">
                      <Crown className="w-2.5 h-2.5 text-[#D4AF37]" />
                      Chef Special
                    </span>
                  )}
                  {dish.isPopular && (
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#090805] text-[9px] font-bold uppercase tracking-wider shadow-md">
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
                      className="font-bold text-lg text-[#FBF8EE] group-hover:text-[#D4AF37] transition-colors line-clamp-1"
                      style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                    >
                      {dish.title}
                    </h3>
                    <span className="font-mono font-bold text-base text-[#D4AF37] shrink-0">
                      ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#FBF8EE]/70 line-clamp-2 leading-relaxed">
                    {dish.desc}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D4AF37]/15">
                  <button
                    onClick={() => setSelectedDishDetail(dish)}
                    className="py-2 rounded-xl bg-[#090805] border border-[#D4AF37]/30 text-[#FBF8EE] text-[11px] font-bold uppercase tracking-wider hover:border-[#D4AF37] transition-colors text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      if (onOrderDish) onOrderDish(dish);
                    }}
                    className="py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#090805] text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-1"
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
      {/* 4. GRAND EXECUTIVE CHEF SECTION */}
      {/* ========================================================= */}
      <section id="chefs" className="py-16 sm:py-24 bg-[#14120B] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              — MAESTROS OF THE PALACE —
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-bold text-[#FBF8EE]"
              style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
            >
              Executive Chef & Master Sommelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {DEFAULT_CHEF_PROFILES.slice(0, 2).map((chef, idx) => (
              <div 
                key={chef.id || idx}
                className="bg-[#090805] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center gap-6 shadow-xl"
              >
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase inline-block">
                    {chef.role}
                  </span>
                  <h3 
                    className="text-xl font-bold text-[#FBF8EE]"
                    style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
                  >
                    {chef.name}
                  </h3>
                  <p className="text-xs text-[#FBF8EE]/70 line-clamp-3 leading-relaxed">
                    {chef.bio}
                  </p>
                  <p className="text-[11px] text-[#D4AF37] font-semibold">
                    ★ Specialty: {chef.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ABOUT VELMORA DINING SECTION */}
      {/* ========================================================= */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
              — HERITAGE & PHILOSOPHY —
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF8EE] leading-tight"
              style={{ fontFamily: fontDisplay || "'Playfair Display', serif" }}
            >
              Palatial Architecture Meets Michelin Mastery
            </h2>
            <p className="text-sm sm:text-base text-[#FBF8EE]/80 leading-relaxed font-light">
              Founded on the principles of royal European banquets and contemporary French gastronomy, Velmora Dining offers an unmatched sanctuary of taste. From our caviar cellar to our Himalayan salt-aging chambers, each ingredient is honored with reverence.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/20">
              <div className="space-y-1">
                <span className="font-mono text-2xl font-bold text-[#D4AF37]">45 Days</span>
                <p className="text-xs text-[#FBF8EE]/70">Himalayan Salt Dry-Aging</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-2xl font-bold text-[#D4AF37]">100%</span>
                <p className="text-xs text-[#FBF8EE]/70">Single-Estate Provenance</p>
              </div>
            </div>

            <button
              onClick={() => setReservationModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#14120B] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090805] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Inquire for Private Salon Events
            </button>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl shadow-[#D4AF37]/15">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop" 
                alt="Velmora Dining Hall"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#090805] border border-[#D4AF37] p-5 rounded-2xl shadow-2xl max-w-xs hidden sm:block">
              <Crown className="w-6 h-6 text-[#D4AF37] mb-2" />
              <p className="text-xs text-[#FBF8EE] font-bold">
                "An unforgettable symphony of gold, truffle, and regal hospitality."
              </p>
              <span className="text-[10px] text-[#D4AF37] font-mono mt-1 block">
                — Global Gastronomy Guide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. GOOGLE MAPS & FOOTER SECTION */}
      {/* ========================================================= */}
      <section id="location">
        <FooterAndLocation 
          hideMap={settings?.showGoogleMap === false}
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
