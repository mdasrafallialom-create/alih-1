import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, Sparkles, Moon, Star, Clock, MapPin, Phone, Calendar, 
  ChevronLeft, ChevronRight, Play, Pause, ShoppingBag, ArrowUpRight, 
  Menu, X, Heart, Shield, QrCode, Check, Compass, Volume2, Search, Bell,
  Award, ChefHat, Utensils
} from 'lucide-react';
import { DEFAULT_CHEF_PROFILES, ChefProfile } from '../../types';
import { EspressoMachineHero } from './EspressoMachineHero';
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
  settings,
  lang = 'en'
}: LunavereThemeProps) {
  // State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
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

  // Autoplay Hero Slider on Desktop only
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return; // Do not autoplay on mobile per prompt specs

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, prefersReducedMotion]);

  // Keyboard Navigation for Hero
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveSlide((prev) => (prev === 0 ? DEFAULT_SLIDES.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveSlide((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }
  };

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
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full min-h-screen text-[#F4E7D3] selection:bg-[#C9A86A]/30 selection:text-white outline-none"
      style={{
        backgroundColor: LUNAVERE_PALETTE.midnightNavy,
        fontFamily: fontBody || "'Manrope', sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* 3. TALL ANIMATED ESPRESSO EXTRACTION HERO SECTION */}
      {/* ========================================================= */}
      <section id="hero" className="relative w-full">
        <EspressoMachineHero
          brandName={brandName}
          onOrderClick={() => scrollToSection('menu')}
          onReserveClick={() => setReservationModalOpen(true)}
        />
      </section>

      {/* ========================================================= */}
      {/* 4. SIGNATURE COFFEE SECTION */}
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
            <p className="text-sm text-[#171522]/80 font-light leading-relaxed">
              From delicate espresso to slow-brewed signatures, every cup is prepared with care for Paris nights.
            </p>
            <div className="w-16 h-0.5 bg-[#C9A86A] mx-auto mt-4" />
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#C9A86A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#15162B] text-[#C9A86A] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 
                className="text-2xl font-semibold text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Espresso Ritual
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Velvety, balanced and served with care. Crafted from single-origin Arabica beans roasted in Paris.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#C9A86A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#15162B] text-[#C9A86A] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 
                className="text-2xl font-semibold text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                House Pour-Over
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                A delicate cup for unhurried moments. Slow-brewed over V60 with floral notes and subtle caramel sweetness.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#C9A86A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center group">
              <div className="w-12 h-12 rounded-full bg-[#15162B] text-[#C9A86A] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <h3 
                className="text-2xl font-semibold text-[#171522]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Lunavere Signatures
              </h3>
              <p className="text-xs text-[#171522]/75 leading-relaxed">
                Seasonal drinks inspired by Parisian evenings, infused with lavender cream, dark cacao, or spiced honey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED MENU SECTION */}
      {/* ========================================================= */}
      <section id="menu" className="py-20 px-6 sm:px-12 bg-[#15162B]">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#C9A86A]/20 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9A7BB5]">
                SELECTION DES BOISSONS & GASTRONOMIE
              </span>
              <h2 
                className="text-3xl sm:text-5xl font-normal text-[#F4E7D3]"
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold capitalize tracking-wider transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#C9A86A] text-[#15162B] shadow-md'
                      : 'bg-[#15162B] text-[#F4E7D3]/70 hover:text-[#F4E7D3] border border-[#C9A86A]/20'
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
                  className="bg-white text-[#171522] rounded-[22px] p-5 sm:p-6 border border-[#C9A86A]/30 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group space-y-4"
                >
                  {/* Image with rounded corners and spacing */}
                  <div className="relative overflow-hidden rounded-xl bg-[#15162B] aspect-[4/3] w-full">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.calories && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#15162B]/85 backdrop-blur-md text-[#F4E7D3] text-[10px] font-mono shadow-sm">
                        {item.calories}
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#B77B83] text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Content separated with padding */}
                  <div className="flex flex-col justify-between flex-1 space-y-3 pt-1">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 
                          className="text-lg sm:text-xl font-bold text-[#171522] leading-snug group-hover:text-[#C9A86A] transition-colors"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {item.title}
                        </h3>
                        <span className="text-base sm:text-lg font-bold text-[#C9A86A] font-mono shrink-0 bg-[#F4E7D3]/40 px-2.5 py-0.5 rounded-lg">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-[#171522]/75 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <button 
                        onClick={() => setSelectedDishDetail(item)}
                        className="text-xs font-semibold text-[#15162B] hover:text-[#C9A86A] underline transition-colors"
                      >
                        Details
                      </button>

                      <button 
                        onClick={() => onOrderDish && onOrderDish(item)}
                        className="px-4 py-2 rounded-full bg-[#15162B] hover:bg-[#202242] text-[#F4E7D3] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm active:scale-95"
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
            <div className="text-center py-16 px-4 bg-[#15162B]/60 rounded-2xl border border-[#C9A86A]/20 space-y-3 max-w-lg mx-auto">
              <Utensils className="w-10 h-10 text-[#C9A86A] mx-auto opacity-50" />
              <p className="text-sm font-bold text-[#F4E7D3]">
                {lang === 'bn' ? 'কোনো খাবার যুক্ত করা হয়নি' : 'No Menu Items Added Yet'}
              </p>
              <p className="text-xs text-[#F4E7D3]/60 leading-relaxed">
                {lang === 'bn' ? 'এডমিন প্যানেল থেকে মেনু বা খাবার যুক্ত করলে এখানে সুন্দরভাবে পরিবেশন হবে।' : 'Add dishes from the Admin Menu Manager to display them in this section.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PARISIAN STORY SECTION */}
      {/* ========================================================= */}
      <section id="story" className="py-20 px-6 sm:px-12 bg-[#F4E7D3] text-[#15162B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Vertical Image Left */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A86A]/40 aspect-[3/4]">
            <img 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop" 
              alt="Parisian Cafe Evening" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15162B]/40 via-transparent to-transparent" />
          </div>

          {/* Content Right */}
          <div className="space-y-6">
            <div className="w-12 h-0.5 bg-[#C9A86A]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B77B83]">
              OUR PHILOSOPHY
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-normal leading-tight text-[#15162B]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A little Paris, somewhere after sunset.
            </h2>

            <p className="text-sm sm:text-base text-[#15162B]/80 font-light leading-relaxed">
              Lunavere was created for slow conversations, beautiful coffee and the small pleasure of staying a little longer.
            </p>

            <p className="text-xs sm:text-sm text-[#15162B]/70 font-light leading-relaxed">
              Tucked under soft starlight glow, our Parisian bistro blends heritage European coffee rituals with freshly baked night pastries, warm hospitality and unhurried peace.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => scrollToSection('visit')}
                className="px-6 py-3 rounded-full bg-[#15162B] hover:bg-[#222445] text-[#F4E7D3] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <Compass className="w-4 h-4 text-[#C9A86A]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. DESSERT AND PASTRY SHOWCASE */}
      {/* ========================================================= */}
      <section id="desserts" className="py-20 px-6 sm:px-12 bg-[#15162B] border-t border-b border-[#C9A86A]/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B77B83]">
                PÂTISSERIE & DOUCEURS
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-normal text-[#F4E7D3]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                A little sweetness after sunset
              </h2>
            </div>
          </div>

          {/* Smooth Horizontal Scroll on Mobile / Grid on Desktop */}
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 sm:mx-0 sm:px-0">
            {displayDesserts.map((dessert) => (
              <div 
                key={dessert.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-[#F4E7D3] text-[#171522] rounded-2xl overflow-hidden border border-[#C9A86A]/30 shadow-lg shrink-0 flex flex-col justify-between"
              >
                <div className="h-48 overflow-hidden relative bg-[#15162B]">
                  <img 
                    src={dessert.img} 
                    alt={dessert.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#15162B] text-[#C9A86A] text-xs font-mono font-bold">
                    ${dessert.price.toFixed(2)}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-xl font-bold text-[#171522]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {dessert.title}
                    </h3>
                    <p className="text-xs text-[#171522]/75 line-clamp-2 mt-1">
                      {dessert.desc}
                    </p>
                  </div>

                  <button 
                    onClick={() => onOrderDish && onOrderDish(dessert)}
                    className="w-full py-2.5 rounded-xl bg-[#15162B] hover:bg-[#202242] text-[#F4E7D3] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>View Item</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. EVENING EXPERIENCE TIMELINE */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 bg-[#15162B] text-[#F4E7D3]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C9A86A]">
              THE LUNAVERE EVENING RITUAL
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-normal"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your table is waiting after dark.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Timeline Item 1 */}
            <div className="bg-[#15162B] border border-[#C9A86A]/30 p-8 rounded-2xl relative space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A] text-[#15162B] font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                5 PM
              </div>
              <h3 className="text-lg font-bold text-[#C9A86A] tracking-wider uppercase">First Pour</h3>
              <p className="text-xs text-[#F4E7D3]/80 leading-relaxed">
                As twilight settles over the city, our baristas prepare the evening's first pour-over brews and herbal infusions.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="bg-[#15162B] border border-[#C9A86A]/30 p-8 rounded-2xl relative space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A] text-[#15162B] font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                7 PM
              </div>
              <h3 className="text-lg font-bold text-[#C9A86A] tracking-wider uppercase">Dessert Hour</h3>
              <p className="text-xs text-[#F4E7D3]/80 leading-relaxed">
                Warm pastries, almond tarts, and artisanal chocolates served under soft candlelight and starlight sounds.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="bg-[#15162B] border border-[#C9A86A]/30 p-8 rounded-2xl relative space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A86A] text-[#15162B] font-bold text-sm flex items-center justify-center mx-auto shadow-md">
                9 PM
              </div>
              <h3 className="text-lg font-bold text-[#C9A86A] tracking-wider uppercase">After-Dark Signatures</h3>
              <p className="text-xs text-[#F4E7D3]/80 leading-relaxed">
                Intimate late-night atmosphere featuring decaf espresso martinis, lavender lattes, and quiet conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. TESTIMONIALS */}
      {/* ========================================================= */}
      <section className="py-20 px-6 sm:px-12 bg-[#9A7BB5] text-[#15162B]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-10 h-10 rounded-full bg-[#15162B] text-[#C9A86A] flex items-center justify-center mx-auto shadow-md">
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
                className="text-2xl sm:text-4xl font-normal leading-relaxed italic text-[#15162B]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "{DEFAULT_TESTIMONIALS[activeTestimonial].quote}"
              </p>

              <div>
                <h4 className="text-sm font-bold tracking-widest uppercase text-[#15162B]">
                  {DEFAULT_TESTIMONIALS[activeTestimonial].author}
                </h4>
                <p className="text-xs text-[#15162B]/70">
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
                className={`transition-all rounded-full ${
                  idx === activeTestimonial 
                    ? 'w-8 h-2.5 bg-[#15162B]' 
                    : 'w-2.5 h-2.5 bg-[#15162B]/30 hover:bg-[#15162B]/60'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* GLOBAL WEBSITE FOOTER */}
      {/* ========================================================= */}
      <FooterAndLocation 
        lang={lang}
        hideMap={settings?.showGoogleMap === false}
        onAdminAccess={onOpenAdmin}
        brandName={brandName || settings?.brandName}
        brandLogoUrl={settings?.brandLogoUrl}
        brandLocation={settings?.brandLocation || settings?.locationAddress}
        logoStyle={settings?.logoStyle}
        logoColorPrimary={settings?.logoColorPrimary}
        logoColorSecondary={settings?.logoColorSecondary}
        contactPhone={settings?.contactPhone}
        contactWhatsapp={settings?.contactWhatsapp}
        contactEmail={settings?.contactEmail}
        socialLinks={settings?.socialLinks}
      />

      {/* ========================================================= */}
      {/* QR MENU CARD MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showQrMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#15162B] border border-[#C9A86A]/40 rounded-2xl p-6 text-[#F4E7D3] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#C9A86A]/20 pb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#C9A86A]" />
                  <span 
                    className="text-xl font-bold tracking-widest text-[#F4E7D3]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    LUNAVERE QR MENU CARD
                  </span>
                </div>
                <button 
                  onClick={() => setShowQrMenuModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#B77B83] text-white text-[10px] font-bold uppercase tracking-widest">
                  Mobile Fast Scan
                </span>
                <p className="text-xs text-[#F4E7D3]/70 pt-1">
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
                          className="font-bold text-base text-[#F4E7D3]"
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
                      <p className="text-xs text-[#F4E7D3]/70 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-sm text-[#C9A86A]">
                        ${item.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => {
                          if (onOrderDish) onOrderDish(item);
                          setShowQrMenuModal(false);
                        }}
                        className="block mt-1 px-3 py-1 rounded-full bg-[#C9A86A] text-[#15162B] text-[10px] font-bold uppercase tracking-wider"
                      >
                        Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowQrMenuModal(false)}
                className="w-full py-3 rounded-full bg-[#15162B] border border-[#C9A86A]/40 text-[#F4E7D3] font-bold text-xs uppercase tracking-wider"
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#15162B] border border-[#C9A86A]/40 rounded-2xl p-6 text-[#F4E7D3] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#C9A86A]/20 pb-3">
                <h3 
                  className="text-xl font-bold text-[#F4E7D3]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Reserve a Starlight Table
                </h3>
                <button onClick={() => setReservationModalOpen(false)}>
                  <X className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
              </div>

              {reservationSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#C9A86A]">Reservation Confirmed</h4>
                  <p className="text-xs text-[#F4E7D3]/80">
                    Merci! We look forward to welcoming you at Lunavere Paris.
                  </p>
                  <button 
                    onClick={() => {
                      setReservationModalOpen(false);
                      setReservationSuccess(false);
                    }}
                    className="mt-2 px-6 py-2 rounded-full bg-[#C9A86A] text-[#15162B] font-bold text-xs uppercase"
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
                    <label className="font-bold text-[#C9A86A]">Guest Name</label>
                    <input 
                      type="text" 
                      required
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      placeholder="e.g. Colette Martin" 
                      className="w-full px-3 py-2 rounded-xl bg-[#15162B] border border-[#C9A86A]/30 text-[#F4E7D3] outline-none focus:border-[#C9A86A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-[#C9A86A]">Guests</label>
                      <select 
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#15162B] border border-[#C9A86A]/30 text-[#F4E7D3] outline-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#C9A86A]">Evening Time</label>
                      <input 
                        type="time" 
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#15162B] border border-[#C9A86A]/30 text-[#F4E7D3] outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-full bg-[#C9A86A] hover:bg-[#b89759] text-[#15162B] font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-2"
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
