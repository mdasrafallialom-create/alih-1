import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Palette, 
  Check, 
  Sparkles, 
  Eye, 
  Star, 
  Crown, 
  Zap, 
  Sliders, 
  X, 
  ExternalLink, 
  Layers, 
  Paintbrush, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  Bookmark,
  ThumbsUp,
  Shield,
  ChevronDown,
  ChevronUp,
  Play,
  ArrowUp,
  ArrowDown,
  Video,
  Monitor,
  Utensils,
  Tablet,
  Smartphone,
  Heart,
  ShoppingCart,
  Bell,
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  Globe,
  GripVertical,
  Edit3,
  Truck,
  Lock,
  FileText,
  Award,
  Quote,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Clock,
  UserCheck,
  Camera
} from 'lucide-react';
import { AdminSettings } from '../../types';
import { LUXURY_THEMES } from '../../data/luxuryThemes';
import { DEFAULT_STORE_DISHES } from '../../data/luxuryDishes';
import CoffeeHeaderHero from '../CoffeeHeaderHero';
import LunavereTheme from '../themes/LunavereTheme';
import VelmoraDiningTheme from '../themes/VelmoraDiningTheme';

export interface ThemePreset {
  id: string;
  name: string;
  tagline: string;
  category: 'luxury' | 'cafe' | 'asian' | 'bistro' | 'casual' | 'minimal';
  categoryLabel: string;
  tier: 'basic' | 'pro' | 'elite';
  tierLabel: string;
  bgPreview: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  fontDisplay: string;
  fontBody: string;
  features: string[];
  keywords?: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export const THEME_PRESETS: ThemePreset[] = LUXURY_THEMES;

// High quality food image assets for realistic preview cards matching the user screenshot
const PREVIEW_FOOD_IMAGES = [
  {
    hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
    tag: "CHEF'S SPECIAL",
    title: 'Exquisite Culinary Journeys',
    thumbs: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    tag: 'WOOD-FIRED DAILY',
    title: 'Wood-Fired Pizza & Fresh Pasta',
    thumbs: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop',
    tag: 'PRIME CUTS',
    title: 'Dry-Aged Wagyu & Prime Chops',
    thumbs: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop',
    tag: 'FRESH CATCH',
    title: 'Wild Coastal Seafood & Raw Bar',
    thumbs: [
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop',
    tag: 'BON APPETIT',
    title: 'Haute Parisian Dining & Wines',
    thumbs: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1515443961218-a5136d888be7?w=600&auto=format&fit=crop',
    tag: 'TAPAS & VINO',
    title: 'Vibrant Spanish Tapas & Bodega',
    thumbs: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
    tag: 'ROOFTOP EXPERIENCE',
    title: 'Skyline Cocktails & Sunset Lounge',
    thumbs: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300&auto=format&fit=crop'
    ]
  },
  {
    hero: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop',
    tag: 'ISLAND FRESH',
    title: 'Flavors of the Greek Islands',
    thumbs: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop'
    ]
  }
];

// Visual Shapes & Frameworks list matching screenshot
const VISUAL_SHAPES = [
  'All Shapes & Frameworks',
  'Curved Organic Waves',
  'Sharp Diagonal / Angled Cut',
  'Luxury Arch & Heritage Crest',
  'Floating Frosted Glass',
  'Modular Bento Grid',
  'Dramatic Neon Glow',
  'Japanese Zen & Minimalist'
];

interface ThemeStoreManagerProps {
  restaurantId: string;
  brandName: string;
  settings: AdminSettings;
  onUpdateSettings: (settings: Partial<AdminSettings>) => void;
  onOpenStudio?: () => void;
  theme?: 'light' | 'dark';
  lang?: 'en' | 'bn' | 'ar';
  isStandalone?: boolean;
}

export default function ThemeStoreManager({
  restaurantId,
  brandName,
  settings,
  onUpdateSettings,
  onOpenStudio,
  theme = 'light',
  lang = 'en',
  isStandalone = false
}: ThemeStoreManagerProps) {
  const isDark = theme === 'dark';
  
  const currentThemeId = (settings as any).activeThemeId || 'aurelisse';
  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedActive = localStorage.getItem('webar_active_theme_id');
      if (savedActive) return savedActive;
    }
    return currentThemeId;
  });
  const [usedThemeIds, setUsedThemeIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('webar_used_theme_ids');
        const parsed: string[] = saved ? JSON.parse(saved) : [];
        const initialActive = localStorage.getItem('webar_active_theme_id') || currentThemeId;
        if (initialActive && !parsed.includes(initialActive)) {
          parsed.push(initialActive);
        }
        return parsed;
      } catch {
        return [currentThemeId];
      }
    }
    return [currentThemeId];
  });
  const [previewTheme, setPreviewTheme] = useState<ThemePreset | null>(null);
  const [selectedPlanModalTheme, setSelectedPlanModalTheme] = useState<ThemePreset | null>(null);
  const [previewDeviceView, setPreviewDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likedThemeIds, setLikedThemeIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('user_liked_themes');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const handleToggleLike = (themeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setLikedThemeIds((prev) => {
      const isLiked = prev.includes(themeId);
      const updated = isLiked ? prev.filter((id) => id !== themeId) : [...prev, themeId];
      try {
        localStorage.setItem('user_liked_themes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Interactive Reorderable Food Items State for Modal
  const GENERAL_GOURMET_DISHES = [
    { id: '1', title: 'Truffle Glazed Wagyu Steak', price: 48.00, calories: '420 kcal', desc: 'A5 Wagyu with wild forest mushrooms, truffle butter, and micro-herbs', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop', category: 'Steaks', popular: true, newArrival: false },
    { id: '2', title: 'Artisanal Smoked Burrata', price: 22.00, calories: '310 kcal', desc: 'Heirloom tomatoes, aged balsamic reduction & cold-pressed olive oil', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop', category: 'Appetizers', popular: false, newArrival: true },
    { id: '3', title: 'Wood-Fired Truffle Pizza', price: 34.00, calories: '580 kcal', desc: 'San Marzano tomatoes, buffalo mozzarella, black truffle shavings', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop', category: 'Pizza', popular: true, newArrival: false },
    { id: '4', title: 'Wild Coastal Sea Bass', price: 42.00, calories: '380 kcal', desc: 'Pan-seared sea bass with saffron risotto and citrus emulsion', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop', category: 'Seafood', popular: false, newArrival: false },
    { id: '5', title: '24K Edible Gold Tomahawk', price: 120.00, calories: '650 kcal', desc: 'Signature gold-infused dry-aged Prime Ribeye served with chimichurri', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&auto=format&fit=crop', category: 'Chef Specials', popular: true, newArrival: true },
    { id: '6', title: 'Pan-Seared Hokkaido Scallops', price: 38.00, calories: '280 kcal', desc: 'Cauliflower velvet puree, crispy prosciutto chips & truffle micro greens', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop', category: 'Appetizers', popular: false, newArrival: false },
    { id: '7', title: 'Royal Saffron Lobster Thermidor', price: 65.00, calories: '520 kcal', desc: 'Fresh Atlantic lobster in cognac saffron gratin with gruyere cheese', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&auto=format&fit=crop', category: 'Seafood', popular: true, newArrival: true },
    { id: '8', title: 'Golden Honey Velvet Cheesecake', price: 18.00, calories: '340 kcal', desc: 'Organic wild berry compote, honey drizzle & 24k edible gold leaf crust', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop', category: 'Desserts', popular: false, newArrival: false }
  ];

  const COFFEE_SHOP_DISHES = [
    { id: '1', title: 'Artisan Caramel Macchiato', price: 6.50, calories: '180 kcal', desc: 'Single-origin espresso with steamed vanilla oat milk & Madagascar caramel drizzle', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop', category: 'Espresso Bar', popular: true, newArrival: false },
    { id: '2', title: 'Flaky Butter Almond Croissant', price: 4.50, calories: '290 kcal', desc: 'Freshly baked daily with French butter, roasted almond flakes & powdered sugar', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop', category: 'Fresh Bakery', popular: true, newArrival: true },
    { id: '3', title: 'Pistachio Velvet Cold Brew', price: 5.50, calories: '150 kcal', desc: '24-hour slow-steeped Arabica cold brew topped with sweet pistachio cream foam', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop', category: 'Cold Brews', popular: false, newArrival: true },
    { id: '4', title: 'Smoked Salmon Avocado Sourdough', price: 12.00, calories: '380 kcal', desc: 'Stone-baked sourdough toast, wild smoked salmon, poached egg & micro-herbs', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop', category: 'Brunch & Toast', popular: true, newArrival: false },
    { id: '5', title: 'Double Shot Velvet Espresso', price: 4.00, calories: '10 kcal', desc: 'Rich golden crema with notes of dark cocoa, roasted hazelnut & wild honey', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&auto=format&fit=crop', category: 'Espresso Bar', popular: false, newArrival: false },
    { id: '6', title: 'Wild Berry Almond Custard Tart', price: 7.50, calories: '310 kcal', desc: 'Crispy butter pastry filled with organic berries and vanilla bean custard', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop', category: 'Pastry Showcase', popular: false, newArrival: true },
    { id: '7', title: 'Honey Glazed Cinnamon Brioche Roll', price: 5.00, calories: '340 kcal', desc: 'Warm fluffy brioche roll swirled with Saigon cinnamon & organic honey glaze', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop', category: 'Fresh Bakery', popular: true, newArrival: false },
    { id: '8', title: 'Rustic Sourdough Artisan Loaf', price: 8.00, calories: '420 kcal', desc: 'Handcrafted stone-baked sourdough loaf served with cultured whipped butter', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop', category: 'Artisan Breads', popular: false, newArrival: false }
  ];

  const COFFEE_THEME_IDS = [
    'velmora-dining',
    'lunavere',
    'opalune',
    'couravelle',
    'elvaris-atelier',
    'silvarenne',
    'zafrelle',
    'marovelle',
    'degustara',
    'figavelle',
    'lumivelle',
    'amberelle'
  ];

  // Real user added dishes state (seeded with gourmet collection by default)
  const [userAddedDishes, setUserAddedDishes] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('webar_custom_added_dishes');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        return DEFAULT_STORE_DISHES;
      }
    }
    return DEFAULT_STORE_DISHES;
  });

  const [modalDishes, setModalDishes] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('webar_custom_added_dishes');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return DEFAULT_STORE_DISHES;
  });

  const [previewTagline, setPreviewTagline] = useState<string>('');
  const [previewHeaderOption, setPreviewHeaderOption] = useState<'cover' | 'beans' | 'both'>('both');
  const [previewPrimaryColor, setPreviewPrimaryColor] = useState<string>('#f97316');
  const [previewBrandName, setPreviewBrandName] = useState<string>('');
  const [previewFontDisplay, setPreviewFontDisplay] = useState<string>('Cormorant Garamond');
  const [previewFontBody, setPreviewFontBody] = useState<string>('Manrope');
  const [isEditingThemeDetails, setIsEditingThemeDetails] = useState<boolean>(false);
  const [newDishTitle, setNewDishTitle] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishCategory, setNewDishCategory] = useState('Espresso Bar');
  const [newDishDesc, setNewDishDesc] = useState('');

  // Preview Header Interactive Controls State
  const [isPreviewMegaMenuOpen, setIsPreviewMegaMenuOpen] = useState(false);
  const [isPreviewSearchExpanded, setIsPreviewSearchExpanded] = useState(false);
  const [previewSearchText, setPreviewSearchText] = useState('');
  const [previewActiveFilter, setPreviewActiveFilter] = useState<'all' | 'popular' | 'newArrival' | 'special' | 'vegetarian'>('all');
  const [isPreviewCartOpen, setIsPreviewCartOpen] = useState(false);
  const [previewCartItems, setPreviewCartItems] = useState<{ dish: any; count: number }[]>([]);
  const [previewWaiterCalled, setPreviewWaiterCalled] = useState(false);

  // Refs for click outside handling in ThemeStoreManager preview header
  const previewMegaMenuRef = useRef<HTMLDivElement>(null);
  const previewMegaMenuBtnRef = useRef<HTMLButtonElement>(null);
  const previewSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (isPreviewSearchExpanded && previewSearchRef.current && !previewSearchRef.current.contains(target)) {
        setIsPreviewSearchExpanded(false);
        setPreviewSearchText('');
      }
      if (isPreviewMegaMenuOpen) {
        if (
          previewMegaMenuRef.current && 
          !previewMegaMenuRef.current.contains(target) &&
          previewMegaMenuBtnRef.current && 
          !previewMegaMenuBtnRef.current.contains(target)
        ) {
          setIsPreviewMegaMenuOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isPreviewSearchExpanded, isPreviewMegaMenuOpen]);

  // Search input password detector to automatically open Admin Panel ONLY when exact password (e.g. 8520) is entered
  const checkAndTriggerAdminPassword = (text: string) => {
    if (!text) return false;
    const lower = text.toLowerCase().trim();
    const configuredPass = ((settings as any)?.adminPassword || '').toLowerCase().trim();
    const savedCode = (typeof window !== 'undefined' ? (localStorage.getItem('webar_admin_secret_code') || '8520') : '8520').toLowerCase().trim();

    // MUST be exact match of 8520 or the actual configured password. Generic 'admin' or '1234' is NOT allowed!
    const isPassMatch = 
      lower === '8520' ||
      lower === 'admin8520' ||
      lower === '8520admin' ||
      (savedCode && lower === savedCode) ||
      (configuredPass && lower === configuredPass);

    if (isPassMatch) {
      if (onOpenStudio) {
        onOpenStudio();
      }
      // Dispatch events to switch view mode / section to overview
      window.dispatchEvent(new CustomEvent('switch-work-section', { detail: 'overview' }));
      window.dispatchEvent(new CustomEvent('admin-active-tab-change', { detail: { label: 'ACTIVE DASHBOARD' } }));
      setPreviewSearchText('');
      setIsPreviewSearchExpanded(false);
      setSuccessToast(lang === 'bn' ? '🔑 এডমিন পাসওয়ার্ড (8520) সঠিক! এডমিন প্যানেল অন করা হচ্ছে...' : '🔑 Admin password (8520) verified! Opening Admin Panel...');
      setTimeout(() => setSuccessToast(null), 3000);
      return true;
    }
    return false;
  };

  useEffect(() => {
    checkAndTriggerAdminPassword(previewSearchText);
  }, [previewSearchText]);

  // Compute filtered dishes based on preview search and quick filters
  const getFilteredPreviewDishes = () => {
    let items = modalDishes;
    if (previewActiveFilter === 'popular') {
      items = items.filter(d => (d as any).popular || (d as any).isPopular);
    } else if (previewActiveFilter === 'newArrival') {
      items = items.filter(d => (d as any).newArrival || (d as any).isNew);
    } else if (previewActiveFilter === 'special') {
      items = items.filter(d => d.category === 'Chef Specials' || (d as any).isSpecial || d.title.toLowerCase().includes('gold') || d.title.toLowerCase().includes('truffle') || d.title.toLowerCase().includes('special'));
    } else if (previewActiveFilter === 'vegetarian') {
      items = items.filter(d => (d as any).isVegetarian || d.category === 'Fresh Bakery' || d.category === 'Pastry Showcase' || d.title.toLowerCase().includes('avocado') || d.title.toLowerCase().includes('salad') || d.title.toLowerCase().includes('cheese'));
    }

    if (previewSearchText.trim()) {
      const term = previewSearchText.toLowerCase().trim();
      items = items.filter(d => 
        d.title.toLowerCase().includes(term) || 
        d.desc.toLowerCase().includes(term) || 
        (d.category && d.category.toLowerCase().includes(term))
      );
    }

    return items;
  };

  const handleAddToCartInPreview = (dish: any) => {
    setPreviewCartItems(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item => item.dish.id === dish.id ? { ...item, count: item.count + 1 } : item);
      }
      return [...prev, { dish, count: 1 }];
    });
    setSuccessToast(lang === 'bn' ? `"${dish.title}" কার্টে যুক্ত হয়েছে!` : `Added "${dish.title}" to cart!`);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const saveCustomThemeEdits = (overrides?: Partial<{
    tagline: string;
    headerOption: 'cover' | 'beans' | 'both';
    primaryColor: string;
    brandName: string;
    fontDisplay: string;
    fontBody: string;
    dishes: any[];
  }>) => {
    if (!previewTheme) return;
    const payload = {
      tagline: overrides?.tagline ?? previewTagline,
      headerOption: overrides?.headerOption ?? previewHeaderOption,
      primaryColor: overrides?.primaryColor ?? previewPrimaryColor,
      brandName: overrides?.brandName ?? previewBrandName,
      fontDisplay: overrides?.fontDisplay ?? previewFontDisplay,
      fontBody: overrides?.fontBody ?? previewFontBody,
      dishes: overrides?.dishes ?? modalDishes
    };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`theme_edits_${previewTheme.id}`, JSON.stringify(payload));
        localStorage.setItem('webar_custom_added_dishes', JSON.stringify(payload.dishes));
      } catch {}
    }
    setUserAddedDishes(payload.dishes);
    setSuccessToast(lang === 'bn' ? 'থিম কাস্টমাইজেশন ও ফন্ট সেটিংস সেভ হয়েছে!' : 'Theme customization & font settings saved!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleOpenPreviewTheme = (preset: ThemePreset | null) => {
    if (preset) {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('admin_active_nav_tab', 'theme_store');
          localStorage.setItem('active_preview_theme_id', preset.id);
          localStorage.setItem('last_active_preview_theme_id', preset.id);
          localStorage.setItem('is_theme_preview_open', 'true');
        } catch {}
      }

      let savedEdits: any = null;
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem(`theme_edits_${preset.id}`);
          if (raw) savedEdits = JSON.parse(raw);
        } catch {}
      }
      
      setPreviewTagline(savedEdits?.tagline || preset.tagline);
      setPreviewHeaderOption(savedEdits?.headerOption || 'both');
      setPreviewPrimaryColor(savedEdits?.primaryColor || preset.primaryColor);
      setPreviewBrandName(savedEdits?.brandName || brandName || 'SAHINSH');
      setPreviewFontDisplay(savedEdits?.fontDisplay || preset.fontDisplay || 'Cormorant Garamond');
      setPreviewFontBody(savedEdits?.fontBody || preset.fontBody || 'Manrope');
      setModalDishes(savedEdits?.dishes || userAddedDishes);
      setPreviewTheme(preset);
    } else {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('is_theme_preview_open');
        } catch {}
      }
      setPreviewTheme(null);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const isPreviewOpen = localStorage.getItem('is_theme_preview_open') === 'true';
        if (isPreviewOpen) {
          const savedPreviewId = localStorage.getItem('active_preview_theme_id');
          const found = THEME_PRESETS.find(t => t.id === savedPreviewId);
          if (found) {
            handleOpenPreviewTheme(found);
          }
        }
      } catch {}
    }
  }, []);

  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingPrice, setEditingPrice] = useState<string>('');

  const handleMoveDishUp = (index: number) => {
    if (index <= 0) return;
    const copy = [...modalDishes];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    setModalDishes(copy);
    saveCustomThemeEdits({ dishes: copy });
  };

  const handleMoveDishDown = (index: number) => {
    if (index >= modalDishes.length - 1) return;
    const copy = [...modalDishes];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    setModalDishes(copy);
    saveCustomThemeEdits({ dishes: copy });
  };

  const handleStartEditDish = (dish: typeof modalDishes[0]) => {
    setEditingDishId(dish.id);
    setEditingTitle(dish.title);
    setEditingPrice(String(dish.price));
  };

  const handleSaveEditDish = () => {
    if (!editingDishId) return;
    const updated = modalDishes.map(d => d.id === editingDishId ? { ...d, title: editingTitle, price: parseFloat(editingPrice) || d.price } : d);
    setModalDishes(updated);
    setEditingDishId(null);
    saveCustomThemeEdits({ dishes: updated });
  };
  
  // Read initial plan from URL if opened in a standalone tab
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialUrlPlan = urlParams?.get('plan');
  const isUrlStandalone = !!initialUrlPlan || urlParams?.get('standalone') === 'true';
  const hidePlanSwitcher = isStandalone || isUrlStandalone;

  const [selectedPlan, setSelectedPlan] = useState<'all' | '15' | '49' | '99'>(() => {
    if (initialUrlPlan && ['15', '49', '99', 'all'].includes(initialUrlPlan)) {
      return initialUrlPlan as any;
    }
    return 'all';
  });
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Accordion toggle states for left sidebar filters
  const [openThemesFilter, setOpenThemesFilter] = useState(true);
  const [openPriceFilter, setOpenPriceFilter] = useState(true);
  const [openIndustryFilter, setOpenIndustryFilter] = useState(true);

  const activeTheme = THEME_PRESETS.find(t => t.id === activeThemeId) || THEME_PRESETS[0];

  const handleActivateTheme = (preset: ThemePreset) => {
    // Determine plan tier based on theme index: #01-#10 => $15 basic, #11-#25 => $49 pro, #26-#50 => $99 elite
    const themeIndex = THEME_PRESETS.findIndex(t => t.id === preset.id);
    const serialNumber = themeIndex >= 0 ? themeIndex + 1 : 1;
    const targetPlan: 'basic' | 'pro' | 'elite' = serialNumber <= 10 ? 'basic' : serialNumber <= 25 ? 'pro' : 'elite';

    setActiveThemeId(preset.id);
    setUsedThemeIds((prev) => {
      const updated = prev.includes(preset.id) ? prev : [...prev, preset.id];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('webar_used_theme_ids', JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });
    onUpdateSettings({
      ...(settings as any),
      activeThemeId: preset.id,
      subscriptionPlan: targetPlan,
      brandColors: {
        primary: preset.primaryColor,
        secondary: preset.secondaryColor,
        accent: preset.accentColor
      }
    });

    const planLabel = targetPlan === 'basic' ? '$15 Starter' : targetPlan === 'pro' ? '$49 Pro' : '$99 Elite';

    setSuccessToast(
      lang === 'bn' 
        ? `"${preset.name}" থিমটি সক্রিয় হয়েছে! নতুন ট্যাবে থিমটি ওপেন হচ্ছে...` 
        : `Theme "${preset.name}" deployed! Opening in new tab...`
    );

    try {
      const planVal = (preset as any).planPrice || (targetPlan === 'basic' ? 15 : targetPlan === 'pro' ? 49 : 99);
      const themeUrl = `${window.location.origin}/?theme=${preset.id}&standalone=true&plan=${planVal}`;
      window.open(themeUrl, '_blank');
    } catch (e) {
      console.error('Window open failed:', e);
    }

    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleSelectPlan = (planId: 'all' | '15' | '49' | '99') => {
    setSelectedPlan(planId);
    if (planId !== 'all') {
      const mappedPlan: 'basic' | 'pro' | 'elite' = planId === '15' ? 'basic' : planId === '49' ? 'pro' : 'elite';
      onUpdateSettings({
        ...(settings as any),
        subscriptionPlan: mappedPlan
      });
      const planLabel = planId === '15' ? '$15 Starter (10 Themes)' : planId === '49' ? '$49 Pro (25 Themes)' : '$99 Elite (50 Themes)';
      setSuccessToast(
        lang === 'bn' 
          ? `অটোমেটিক ${planLabel} প্ল্যানে আপডেট করা হয়েছে!` 
          : `Subscription automatically synced to ${planLabel}!`
      );
      setTimeout(() => setSuccessToast(null), 3500);
    }
  };

  // Assign shape, plan tier & meta for each theme strictly preserving 1 to 50 numbering
  const themesWithMeta = THEME_PRESETS.map((t, idx) => {
    const serialNumber = idx + 1;
    const shapeLabel = VISUAL_SHAPES[(idx % (VISUAL_SHAPES.length - 1)) + 1];
    const isLiked = likedThemeIds.includes(t.id);
    const baseLikes = 0; // All theme likes start at 0
    const likesCount = isLiked ? 1 : 0;
    // All themes are "NEW" by default. 
    // When a theme is used/activated, its "NEW" tag automatically disappears.
    // Viewing/previewing does NOT remove the "NEW" tag. Only applying/activating removes it.
    const isUsed = activeThemeId === t.id || usedThemeIds.includes(t.id);
    const isNew = !isUsed;
    const mockImages = PREVIEW_FOOD_IMAGES[idx % PREVIEW_FOOD_IMAGES.length];
    
    // Assign strict plan tier based on requested limits:
    // $15 Plan: 10 themes (#01 - #10)
    // $49 Plan: 25 themes (#01 - #25)
    // $99 Plan: 50 themes (#01 - #50)
    const planPrice = serialNumber <= 10 ? 15 : serialNumber <= 25 ? 49 : 99;
    const planLabel = serialNumber <= 10 ? '$15 Starter (10 Themes)' : serialNumber <= 25 ? '$49 Pro (25 Themes)' : '$99 Elite (50 Themes)';

    return {
      ...t,
      serialNumber,
      formattedSerial: `#${String(serialNumber).padStart(2, '0')}`,
      shapeLabel,
      isLiked,
      likesCount,
      isNew,
      mockImages,
      planPrice,
      planLabel
    };
  });

  // Filter themes strictly by selected plan tier & search
  const planFilteredThemes = themesWithMeta.filter((t) => {
    if (selectedPlan === '15') return t.serialNumber <= 10; // Exactly 10 themes max
    if (selectedPlan === '49') return t.serialNumber <= 25; // Exactly 25 themes max
    if (selectedPlan === '99') return t.serialNumber <= 50; // Exactly 50 themes max
    return true; // All 50 themes
  });

  const filteredThemes = planFilteredThemes.filter((t) => {
    const rawQuery = searchQuery.toLowerCase().trim();
    if (!rawQuery) return selectedThemeFilter === 'all' || t.id === selectedThemeFilter;

    // Bangla to English keyword mapping dictionary
    const banglaSynonyms: Record<string, string[]> = {
      'কফি': ['coffee', 'cafe', 'espresso', 'bakery', 'pastry', 'latte', 'cappuccino', 'breakfast', 'tea', 'bistro'],
      'কফিশপ': ['coffee', 'cafe', 'espresso', 'bakery', 'pastry'],
      'ক্যাফে': ['cafe', 'coffee', 'bistro', 'bakery', 'lounge'],
      'ফাইভ স্টার': ['5 star', 'five star', 'michelin', 'fine dining', 'luxury', 'elite', 'palatial', 'vip', 'royale', 'exclusive'],
      'ফাইভস্টার': ['5 star', 'five star', 'michelin', 'fine dining', 'luxury', 'elite'],
      'লাইব্রেরি': ['library', 'cellar', 'wine', 'heritage', 'vintage', 'reserve', 'chateau', 'atelier'],
      'লাইব্রেরী': ['library', 'cellar', 'wine', 'heritage', 'vintage', 'reserve'],
      'অ্যাসোসিয়েশন': ['association', 'club', 'supper club', 'monarch', 'guild', 'society', 'sovereign', 'house'],
      'এসোসিয়েশন': ['association', 'club', 'supper club', 'monarch', 'guild'],
      'রেস্তোরাঁ': ['restaurant', 'dining', 'gastronomy', 'bistro', 'house', 'table'],
      'রেস্টুরেন্ট': ['restaurant', 'dining', 'gastronomy', 'bistro', 'house'],
      'পিজ্জা': ['pizza', 'bistro', 'wood-fired', 'trattoria', 'italian'],
      'বার্গার': ['burger', 'steak', 'grill', 'barbecue', 'robata'],
      'স্টেক': ['steak', 'wagyu', 'prime', 'chops', 'ribeye', 'grill'],
      'সীফুড': ['seafood', 'fish', 'sea bass', 'lobster', 'scallops', 'coastal', 'raw bar'],
      'এশিয়ান': ['asian', 'japanese', 'sushi', 'robata', 'zen', 'izakaya', 'spice'],
      'ডেজার্ট': ['dessert', 'bakery', 'pastry', 'cheesecake', 'high tea', 'sweet']
    };

    // Build expandable search terms (original words + mapped English terms)
    let searchTerms: string[] = [rawQuery];
    
    // Tokenize space-separated words
    const tokens = rawQuery.split(/\s+/).filter(Boolean);
    searchTerms.push(...tokens);

    // Expand Bangla tokens into English equivalents
    for (const token of tokens) {
      for (const [banglaKey, enArray] of Object.entries(banglaSynonyms)) {
        if (token.includes(banglaKey) || banglaKey.includes(token)) {
          searchTerms.push(...enArray);
        }
      }
    }

    // Clean and deduplicate search terms
    searchTerms = Array.from(new Set(searchTerms.map(s => s.toLowerCase().trim()).filter(Boolean)));

    // Target text pool for matching
    const nameStr = t.name.toLowerCase();
    const idStr = t.id.toLowerCase();
    const taglineStr = t.tagline.toLowerCase();
    const catStr = t.categoryLabel.toLowerCase();
    const serialStr = t.formattedSerial.toLowerCase();
    const numStr = String(t.serialNumber);
    const shapeStr = t.shapeLabel ? t.shapeLabel.toLowerCase() : '';
    const featuresStr = t.features ? t.features.join(' ').toLowerCase() : '';
    const keywordsStr = t.keywords ? t.keywords.join(' ').toLowerCase() : '';

    const fullTextPool = `${nameStr} ${idStr} ${taglineStr} ${catStr} ${serialStr} ${numStr} ${shapeStr} ${featuresStr} ${keywordsStr}`;

    // Check if any search term matches the theme's text pool
    const matchesSearch = searchTerms.some((term) => {
      if (term.startsWith('#')) {
        return serialStr.includes(term);
      }
      return fullTextPool.includes(term);
    });

    const matchesThemeFilter = rawQuery !== '' ? true : (selectedThemeFilter === 'all' || t.id === selectedThemeFilter);

    return matchesSearch && matchesThemeFilter;
  });

  const sidebarThemes = planFilteredThemes.filter((t) => {
    if (!searchQuery.trim()) return true;
    return filteredThemes.some(ft => ft.id === t.id);
  });

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-display font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'bn' ? '৫০টি লাক্সারি থিম গ্যালারি (#১ - #৫০)' : '50 Luxury Restaurant Themes (#01 - #50)'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {lang === 'bn'
                  ? 'প্ল্যান অনুযায়ী: $১৫ প্ল্যানে ১০টি, $৪৯ প্ল্যানে ২৫টি এবং $৯৯ প্ল্যানে ৫০টি থিম।'
                  : 'Subscription breakdown: 10 themes in $15 plan, 25 themes in $49 plan, and 50 themes in $99 plan.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val.trim()) {
                  setSelectedThemeFilter('all');
                }
              }}
              placeholder="Search theme #01 - #50..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-semibold outline-none border transition-all ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                  : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
              }`}
            />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 text-xs font-black shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{planFilteredThemes.length} / 50 Themes Available</span>
          </span>
        </div>
      </div>

      {/* Auto-Sync Subscription Plan Bar */}
      {!hidePlanSwitcher && (
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                  {lang === 'bn' ? 'অটোমেটিক প্ল্যান সিঙ্ক:' : 'Auto-Sync Subscription Plan:'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Active: {((settings as any).subscriptionPlan || 'basic').toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {lang === 'bn'
                  ? 'যেকোনো প্ল্যান ফিল্টার বা থিম নির্বাচন করলে তা স্বয়ংক্রিয়ভাবে প্ল্যানে আপডেট হয়ে যাবে।'
                  : 'Selecting or deploying any theme automatically updates & unlocks features in your active plan.'}
              </p>
            </div>
          </div>

          {/* Plan Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 shrink-0 overflow-x-auto">
            <button
              onClick={() => handleSelectPlan('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlan === 'all'
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Plans (50 Themes)
            </button>

            <button
              onClick={() => handleSelectPlan('15')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedPlan === '15'
                  ? 'bg-emerald-500 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>$15 Starter</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono">10 Themes</span>
            </button>

            <button
              onClick={() => handleSelectPlan('49')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedPlan === '49'
                  ? 'bg-blue-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>$49 Pro</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono">25 Themes</span>
            </button>

            <button
              onClick={() => handleSelectPlan('99')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedPlan === '99'
                  ? 'bg-purple-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>$99 Elite</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono">50 Themes</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Layout: Left Sidebar Filters + Right Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Sidebar Filters (50 Luxury Themes List) - Seamless background with individual item boxes */}
        <div className="w-full sm:w-72 lg:w-80 shrink-0 space-y-3 transition-all bg-transparent border-0 shadow-none">
          {/* 50 Luxury Themes Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white pb-2.5 border-b border-slate-300 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-extrabold text-slate-900 dark:text-white">Theme Selection List</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-extrabold">
                {planFilteredThemes.length}
              </span>
            </div>

            <div className="mt-3 space-y-0.5 text-xs max-h-[720px] overflow-y-auto pr-1">
              <div
                onClick={() => setSelectedThemeFilter('all')}
                className={`relative pl-3 pr-2.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-2.5 cursor-pointer select-none group ${
                  selectedThemeFilter === 'all' 
                    ? 'bg-blue-600 text-white font-black shadow-sm' 
                    : isDark
                      ? 'bg-transparent text-slate-300 font-bold hover:text-white hover:translate-x-1.5'
                      : 'bg-transparent text-slate-800 font-bold hover:text-blue-600 hover:translate-x-1.5'
                }`}
              >
                {/* Left Active/Hover Animated Indicator Line */}
                <span 
                  className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full transition-all duration-300 ${
                    selectedThemeFilter === 'all' 
                      ? 'bg-white scale-y-100 opacity-100 shadow-sm' 
                      : 'bg-blue-600 scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100'
                  }`} 
                />
                <span className={`flex-1 min-w-0 text-xs font-black truncate ${
                  selectedThemeFilter === 'all' ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  All Available ({planFilteredThemes.length} Themes)
                </span>
              </div>

              {sidebarThemes.map((t) => {
                const isChecked = selectedThemeFilter === t.id;
                const numStr = `${t.serialNumber}.`;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedThemeFilter(t.id)}
                    onDoubleClick={() => handleOpenPreviewTheme(t)}
                    title={`${t.name} — Single-click to select, Double-click to open theme`}
                    className={`relative pl-3 pr-2 py-2 rounded-lg transition-all duration-200 flex items-center gap-2.5 cursor-pointer select-none group ${
                      isChecked 
                        ? 'bg-blue-600 text-white font-black shadow-sm' 
                        : isDark
                          ? 'bg-transparent text-slate-300 font-bold hover:text-white hover:translate-x-1.5'
                          : 'bg-transparent text-slate-800 font-bold hover:text-blue-600 hover:translate-x-1.5'
                    }`}
                  >
                    {/* Left Active/Hover Animated Indicator Line */}
                    <span 
                      className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full transition-all duration-300 ${
                        isChecked 
                          ? 'bg-white scale-y-100 opacity-100 shadow-sm' 
                          : 'bg-blue-600 scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100'
                      }`} 
                    />
                    <span className={`text-xs font-mono shrink-0 font-black transition-colors ${
                      isChecked 
                        ? 'text-white' 
                        : isDark 
                          ? 'text-slate-400 group-hover:text-blue-400' 
                          : 'text-slate-500 group-hover:text-blue-600'
                    }`}>
                      {numStr}
                    </span>
                    <span className={`flex-1 min-w-0 text-xs truncate font-black transition-colors ${
                      isChecked 
                        ? 'text-white' 
                        : isDark 
                          ? 'text-slate-200 group-hover:text-white' 
                          : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {t.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Section: Theme Cards Grid (#01 to #50) */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredThemes.length} of 50 Luxury Restaurant Themes
            </span>

            {(selectedThemeFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedThemeFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Grid of Theme Cards matching reference screenshot (Max 4 cards per row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredThemes.map((preset) => {
              const isSelected = activeThemeId === preset.id;

              return (
                <motion.div
                  key={preset.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col justify-between select-none"
                >
                  {/* Top Preview Card Frame (Dark Theme Frame as seen in screenshot 2 - separate box) */}
                  <div 
                    onClick={() => handleOpenPreviewTheme(preset)}
                    className={`p-3 bg-[#0c0d10] relative flex flex-col justify-between rounded-[20px] border transition-all cursor-pointer space-y-2 shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                    title="Click to preview theme"
                  >
                    {/* Pill Badges Row */}
                    <div className="flex items-center justify-between gap-1 z-10">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        preset.planPrice === 15
                          ? 'bg-emerald-500 text-white'
                          : preset.planPrice === 49
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-500 text-slate-950'
                      }`}>
                        <Crown className="w-2.5 h-2.5" />
                        ${preset.planPrice} Plan
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-600/90 text-white text-[9px] font-bold flex items-center gap-1">
                          <Bookmark className="w-2.5 h-2.5" />
                          Saved Theme
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hero Banner Box inside preview */}
                    <div className="relative h-28 rounded-xl overflow-hidden border border-white/10 group">
                      <img 
                        src={preset.mockImages.hero} 
                        alt={preset.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2.5 flex flex-col justify-end">
                        <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest block">
                          {preset.mockImages.tag}
                        </span>
                        <h4 className="text-[11px] font-bold text-white line-clamp-1">
                          {preset.mockImages.title}
                        </h4>
                      </div>
                    </div>

                    {/* 3 Food Thumbnails Grid */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {preset.mockImages.thumbs.map((imgUrl, tIdx) => (
                        <div key={tIdx} className="h-14 rounded-lg overflow-hidden border border-white/10 relative">
                          <img 
                            src={imgUrl} 
                            alt="Dish thumbnail" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Info Section (Clean standalone text layout below preview box, matching reference screenshot 1 & 2) */}
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    onDoubleClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                    className="pt-3 space-y-1.5 text-slate-900 bg-transparent"
                  >
                    {/* Theme Name + Serial Number (#01 to #50) */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base truncate">
                        {preset.name}
                      </h3>
                      <span className="px-1.5 py-0.5 text-[10px] font-black text-slate-600 bg-slate-100 border border-slate-300 rounded shrink-0">
                        {preset.formattedSerial}
                      </span>
                    </div>

                    {/* Subtitle / Visual Shape label */}
                    <div className="flex items-center gap-1.5 text-xs text-[#c2410c] font-bold truncate">
                      <Sparkles className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                      <span className="truncate">{preset.shapeLabel}</span>
                    </div>

                    {/* Likes count, NEW badge & Category label */}
                    <div className="flex items-center justify-between gap-2 text-xs pt-1">
                      {/* Left: Like button & NEW tag (Clean inline icon & count matching screenshot) */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => handleToggleLike(preset.id, e)}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer select-none py-0.5 group/like ${
                            preset.isLiked
                              ? 'text-blue-600 font-black'
                              : 'text-slate-800 hover:text-blue-600 font-bold'
                          }`}
                          title={preset.isLiked ? 'Unlike theme' : 'Like theme'}
                        >
                          <motion.div
                            key={preset.isLiked ? 'liked' : 'unliked'}
                            initial={false}
                            animate={{ scale: preset.isLiked ? [1, 1.45, 0.9, 1] : [1, 0.85, 1] }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="flex items-center justify-center"
                          >
                            <ThumbsUp className={`w-4 h-4 transition-transform duration-200 group-hover/like:scale-110 ${preset.isLiked ? 'fill-blue-600 text-blue-600' : 'text-slate-800'}`} />
                          </motion.div>
                          <motion.span 
                            key={`${preset.id}-${preset.likesCount}`}
                            initial={{ scale: 1.3, opacity: 0.7 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="font-bold text-xs"
                          >
                            {preset.likesCount}
                          </motion.span>
                        </motion.button>
                        {preset.isNew && (
                          <span className="bg-[#ff8f00] text-white font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Right: Category label */}
                      <span className="font-bold text-slate-700 truncate max-w-[130px] text-xs">
                        {preset.categoryLabel.split('&')[0]}
                      </span>
                    </div>

                    {/* Horizontal Divider Line matching screenshot 2 */}
                    <div className="w-full border-b border-black my-2" />

                    {/* Action Buttons Row BELOW the line: Right-aligned Active or Apply Theme */}
                    <div className="flex items-center justify-end pt-1">
                      {isSelected ? (
                        <div className="py-1.5 px-4 rounded-xl bg-[#e6fffa] text-[#00b894] border border-[#a7f3d0] text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPlanModalTheme(preset);
                          }}
                          className="py-1.5 px-5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-extrabold text-xs transition-all shadow-xs active:scale-95 flex items-center justify-center cursor-pointer"
                        >
                          <span>Apply Theme</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FULL-PAGE HIGH-FIDELITY LIVE WEBSITE PREVIEW MODAL */}
      <AnimatePresence>
        {previewTheme && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full bg-slate-900 overflow-hidden flex flex-col rounded-none border-none"
            >
              {/* Modal Top Control Header */}
              <div className="px-6 py-3.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0 text-white">
                <div className="flex items-center gap-3">
                  {/* Theme Preview Back Button to return to themes list */}
                  <button
                    type="button"
                    onClick={() => handleOpenPreviewTheme(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b] hover:bg-[#334155] text-white font-bold text-xs shadow-md border border-slate-700/60 cursor-pointer transition-all active:scale-95 shrink-0"
                    title="Back to Themes"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Back</span>
                  </button>

                  <span className="px-2.5 py-1 rounded-lg bg-orange-500 font-mono font-black text-xs text-white">
                    {(previewTheme as any).formattedSerial || '#01'}
                  </span>
                  <div>
                    <h3 className="text-base font-black flex items-center gap-2 font-display">
                      <span>{previewTheme.name}</span>
                      <span className="text-xs font-normal text-amber-400">({(previewTheme as any).shapeLabel || 'Luxury Theme'})</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {previewTheme.categoryLabel} • {previewTheme.tierLabel}
                    </p>
                  </div>
                </div>

                {/* Device View Frame Switcher */}
                <div className="hidden sm:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                  <button
                    onClick={() => setPreviewDeviceView('desktop')}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      previewDeviceView === 'desktop' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setPreviewDeviceView('tablet')}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      previewDeviceView === 'tablet' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                    <span>Tablet</span>
                  </button>
                  <button
                    onClick={() => setPreviewDeviceView('mobile')}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      previewDeviceView === 'mobile' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      saveCustomThemeEdits();
                      handleActivateTheme(previewTheme);
                      handleOpenPreviewTheme(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply This Theme</span>
                  </button>

                  <button
                    onClick={() => handleOpenPreviewTheme(null)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-slate-300 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Website Canvas */}
              <div className="flex-1 overflow-y-auto bg-slate-950 p-0 flex justify-center scroll-smooth min-h-0">
                <div 
                  className={`transition-all duration-300 w-full flex flex-col min-h-full relative ${
                    previewDeviceView === 'mobile' 
                      ? 'max-w-md my-4 rounded-2xl shadow-2xl border border-slate-800 overflow-x-clip' 
                      : previewDeviceView === 'tablet' 
                      ? 'max-w-3xl my-4 rounded-2xl shadow-2xl border border-slate-800 overflow-x-clip' 
                      : 'w-full max-w-none rounded-none'
                  }`}
                  style={{ 
                    transform: previewDeviceView !== 'desktop' ? 'translateZ(0)' : undefined,
                    backgroundColor: previewTheme.surfaceColor,
                    color: previewTheme.textColor,
                    fontFamily: previewTheme.fontBody
                  }}
                >
                  {/* ===================================================================== */}
                  {/* 1. COMMON TOP HEADER BAR (Only for default preview, omitted for custom themes) */}
                  {/* ===================================================================== */}
                  {!(previewTheme.id === 'velmora-dining' || previewTheme.id === 'velmora' || previewTheme.id === 'lunavere') && (
                  <header ref={previewMegaMenuRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200/90 px-4 sm:px-8 py-3.5 flex flex-col gap-3 shadow-md transition-all duration-300">
                    {/* Top Row: Logo + Brand + Location & Admin Avatar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 font-black text-xl shadow-md">
                          SA
                        </div>
                        <div>
                          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight font-display">
                            {previewBrandName || brandName || 'SAHINSH'}
                          </h1>
                          {settings?.brandLocation && (
                            <p className="text-xs text-slate-500 font-bold tracking-wide">
                              {settings.brandLocation}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {settings?.showAdminButton === true && (
                          <button
                            type="button"
                            onClick={() => {
                              if (onOpenStudio) {
                                onOpenStudio();
                              }
                            }}
                            className="px-4 py-2 rounded-2xl bg-zinc-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer select-none border border-zinc-800"
                            title="Admin Portal"
                          >
                            <Shield className="w-4 h-4 text-cyan-400" />
                            <span>Admin</span>
                          </button>
                        )}
                        <div 
                          onClick={() => {
                            if (onOpenStudio) {
                              onOpenStudio();
                            }
                          }}
                          className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald-500 overflow-hidden relative shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                          title="Admin Portal"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" 
                            alt="User avatar" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Quick Navigation & Filter Buttons */}
                    <div className="relative flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
                      {/* Left: All Foods Button */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          ref={previewMegaMenuBtnRef}
                          onClick={() => setIsPreviewMegaMenuOpen(prev => !prev)}
                          className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                        >
                          <span>All Foods</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isPreviewMegaMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                        </button>
                      </div>

                      {/* Right: Search, Waiter, Popular, New Arrival, Special, Vegetarian, Cart */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Search Input Button */}
                        <div ref={previewSearchRef} className="relative flex items-center">
                          <AnimatePresence>
                            {isPreviewSearchExpanded ? (
                              <motion.div
                                initial={{ width: 36, opacity: 0 }}
                                animate={{ width: 220, opacity: 1 }}
                                exit={{ width: 36, opacity: 0 }}
                                className="relative flex items-center"
                              >
                                <input
                                  type="text"
                                  value={previewSearchText}
                                  onChange={(e) => setPreviewSearchText(e.target.value)}
                                  placeholder={lang === 'bn' ? "খাবারের নাম বা পাসওয়ার্ড..." : "Search foods or password..."}
                                  autoFocus
                                  className="w-[220px] pl-8 pr-7 py-1.5 rounded-full bg-slate-100 border border-cyan-500 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm font-medium"
                                />
                                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-cyan-500" />
                                <button 
                                  onClick={() => {
                                    setIsPreviewSearchExpanded(false);
                                    setPreviewSearchText('');
                                  }}
                                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </motion.div>
                            ) : (
                              <button 
                                onClick={() => setIsPreviewSearchExpanded(true)}
                                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
                                title="Search"
                              >
                                <Search className="w-4 h-4 text-slate-600" />
                              </button>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Waiter Button */}
                        <button 
                          onClick={() => {
                            setPreviewWaiterCalled(true);
                            setSuccessToast(lang === 'bn' ? 'ওয়েটারকে খবর দেওয়া হয়েছে! (টেবিল #১)' : 'Waiter notified! Staff will arrive shortly.');
                            setTimeout(() => {
                              setSuccessToast(null);
                              setPreviewWaiterCalled(false);
                            }, 3000);
                          }}
                          className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 border transition-all cursor-pointer active:scale-95 ${
                            previewWaiterCalled ? 'bg-amber-500 text-white border-amber-600 animate-bounce' : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                          }`}
                        >
                          <Bell className="w-3.5 h-3.5 text-amber-600" />
                          <span>Waiter</span>
                        </button>

                        {/* Popular Button */}
                        <button 
                          onClick={() => setPreviewActiveFilter(prev => prev === 'popular' ? 'all' : 'popular')}
                          className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 border transition-all cursor-pointer active:scale-95 ${
                            previewActiveFilter === 'popular' ? 'bg-rose-500 text-white border-rose-600 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${previewActiveFilter === 'popular' ? 'text-white' : 'text-rose-500'}`} />
                          <span>Popular</span>
                        </button>

                        {/* New Arrival Button */}
                        <button 
                          onClick={() => setPreviewActiveFilter(prev => prev === 'newArrival' ? 'all' : 'newArrival')}
                          className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 border transition-all cursor-pointer active:scale-95 ${
                            previewActiveFilter === 'newArrival' ? 'bg-amber-500 text-white border-amber-600 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                          }`}
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${previewActiveFilter === 'newArrival' ? 'text-white' : 'text-amber-500'}`} />
                          <span>New Arrival</span>
                        </button>

                        {/* Special Button */}
                        <button 
                          onClick={() => setPreviewActiveFilter(prev => prev === 'special' ? 'all' : 'special')}
                          className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 border transition-all cursor-pointer active:scale-95 ${
                            previewActiveFilter === 'special' ? 'bg-purple-600 text-white border-purple-700 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                          }`}
                        >
                          <Search className={`w-3.5 h-3.5 ${previewActiveFilter === 'special' ? 'text-white' : 'text-purple-500'}`} />
                          <span>Special</span>
                        </button>

                        {/* Vegetarian Button */}
                        <button 
                          onClick={() => setPreviewActiveFilter(prev => prev === 'vegetarian' ? 'all' : 'vegetarian')}
                          className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 border transition-all cursor-pointer active:scale-95 ${
                            previewActiveFilter === 'vegetarian' ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${previewActiveFilter === 'vegetarian' ? 'bg-white' : 'bg-emerald-500'}`}></span>
                          <span>Vegetarian</span>
                        </button>

                        {/* Cart Button */}
                        <button 
                          onClick={() => setIsPreviewCartOpen(true)}
                          className="px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95 relative"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Cart</span>
                          {previewCartItems.length > 0 && (
                            <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center -mr-1">
                              {previewCartItems.reduce((acc, curr) => acc + curr.count, 0)}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* FULL WIDTH LONG MEGA DROPDOWN MENU PANEL (Matching Screenshot 2026-09-16 164222.png) */}
                    <AnimatePresence>
                      {isPreviewMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          ref={previewMegaMenuRef}
                          className="absolute top-full left-0 right-0 w-full bg-white border-b-2 border-slate-900 shadow-2xl z-50 py-5 px-4 sm:px-8 text-slate-800"
                        >
                          <div className="max-w-7xl mx-auto space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-display">
                                  {lang === 'bn' ? 'ALL CATEGORIES & FOOD CATALOG' : 'ALL CATEGORIES & FOOD CATALOG'}
                                </h3>
                              </div>
                            </div>

                            {modalDishes.length === 0 ? (
                              <div 
                                onClick={() => {
                                  setIsEditingThemeDetails(true);
                                  setIsPreviewMegaMenuOpen(false);
                                }}
                                className="py-8 px-4 text-center cursor-pointer bg-slate-50 hover:bg-cyan-50/50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-cyan-400 transition-all group space-y-3"
                              >
                                <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                  <Utensils className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                  <button
                                    type="button"
                                    className="px-6 py-2.5 bg-cyan-500 group-hover:bg-cyan-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                                  >
                                    <span>{lang === 'bn' ? 'ক্যাটাগরি এবং খাবার অপশনে যান (Category Options)' : 'Go to Category Options & Add Foods'}</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              /* Long Grid layout for categories (matching screenshot 2026-09-16 164222.png) */
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar pt-1">
                                {Array.from(new Set(modalDishes.map(d => d.category || 'General'))).map((catName, idx) => {
                                  const catItems = modalDishes.filter(d => (d.category || 'General') === catName);
                                  const categoryIcons: Record<string, string> = {
                                    'Espresso Bar': '☕',
                                    'Fresh Bakery': '🥐',
                                    'Cold Brews': '🧊',
                                    'Brunch & Toast': '🥪',
                                    'Artisan Breads': '🥖',
                                    'Pastry Showcase': '🍰',
                                    'Steaks': '🥩',
                                    'Appetizers': '🥗',
                                    'Pizza': '🍕',
                                    'Seafood': '🦞',
                                    'Chef Specials': '👑',
                                    'Desserts': '🍨'
                                  };
                                  const icon = (categoryIcons as Record<string, string>)[catName as string] || '🍲';

                                  return (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
                                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 pb-1.5 border-b border-slate-200 flex items-center justify-between">
                                        <span className="flex items-center gap-1.5">
                                          <span>{icon}</span>
                                          <span>{catName}</span>
                                        </span>
                                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                                          {catItems.length}
                                        </span>
                                      </h4>
                                      <div className="flex flex-col gap-1.5">
                                        {catItems.map((item, itemIdx) => (
                                          <button
                                            key={item.id || itemIdx}
                                            onClick={() => {
                                              setPreviewSearchText(item.title || item.name || '');
                                              setIsPreviewMegaMenuOpen(false);
                                            }}
                                            className="text-left text-xs text-slate-700 hover:text-cyan-600 transition-colors font-medium flex items-center justify-between py-1 px-1.5 rounded hover:bg-white cursor-pointer group"
                                          >
                                            <span className="truncate pr-2 group-hover:font-bold">{item.title || item.name}</span>
                                            <span className="text-[10px] font-bold text-slate-900 shrink-0 font-mono">
                                              ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                            </span>
                                          </button>
                                        ))}
                                        {catItems.length === 0 && (
                                          <span className="text-[10px] text-slate-400 italic">No items added</span>
                                        )}
                                        <button
                                          onClick={() => {
                                            setPreviewSearchText(catName as string);
                                            setIsPreviewMegaMenuOpen(false);
                                          }}
                                          className="text-left text-[11px] font-bold text-cyan-600 hover:text-cyan-700 uppercase mt-1 cursor-pointer"
                                        >
                                          {lang === 'bn' ? `VIEW ALL ${catName} →` : `VIEW ALL ${catName} →`}
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </header>
                  )}

                  {previewTheme.id === 'lunavere' ? (
                    <LunavereTheme 
                      brandName={previewBrandName || brandName || 'LUNAVERE'}
                      tagline={previewTagline || previewTheme.tagline}
                      dishes={modalDishes && modalDishes.length > 0 ? modalDishes : DEFAULT_STORE_DISHES}
                      onOrderDish={(dish) => {
                        setPreviewCartItems(prev => {
                          const existing = prev.find(i => i.dish.id === dish.id);
                          if (existing) {
                            return prev.map(i => i.dish.id === dish.id ? { ...i, count: i.count + 1 } : i);
                          }
                          return [...prev, { dish, count: 1 }];
                        });
                        setIsPreviewCartOpen(true);
                      }}
                      onOpenAdmin={() => {
                        if (onOpenStudio) onOpenStudio();
                      }}
                      settings={settings}
                      lang={lang}
                    />
                  ) : (
                    <VelmoraDiningTheme 
                      brandName={previewBrandName || brandName || previewTheme.name}
                      tagline={previewTagline || previewTheme.tagline}
                      dishes={modalDishes && modalDishes.length > 0 ? modalDishes : DEFAULT_STORE_DISHES}
                      onOrderDish={(dish) => {
                        setPreviewCartItems(prev => {
                          const existing = prev.find(i => i.dish.id === dish.id);
                          if (existing) {
                            return prev.map(i => i.dish.id === dish.id ? { ...i, count: i.count + 1 } : i);
                          }
                          return [...prev, { dish, count: 1 }];
                        });
                        setIsPreviewCartOpen(true);
                      }}
                      onOpenAdmin={() => {
                        if (onOpenStudio) onOpenStudio();
                      }}
                      settings={settings}
                      lang={lang}
                      themePresetId={previewTheme.id}
                      previewDeviceView={previewDeviceView}
                    />
                  )}

                  {false && (
                    <>
                  {/* 2. DUAL ANIMATED THEME HERO SECTION (Coffee & Gourmet Dual Headers) */}
                  {/* ===================================================================== */}
                  <section 
                    className="p-4 sm:p-8 relative overflow-hidden flex flex-col items-center text-center justify-center gap-6"
                    style={{ 
                      background: previewTheme.surfaceColor === '#ffffff' 
                        ? 'linear-gradient(135deg, #18181b 0%, #27272a 100%)' 
                        : previewTheme.surfaceColor,
                      color: previewTheme.surfaceColor === '#ffffff' ? '#ffffff' : previewTheme.textColor
                    }}
                  >
                    {/* Render Dual Coffee Animated Header (Cover Banner from Top & Floating Coffee Beans Beats) */}
                    <div className="w-full max-w-5xl">
                      <CoffeeHeaderHero 
                        brandName={previewBrandName || brandName || 'SAHINSH'}
                        tagline={previewTagline || previewTheme.tagline}
                        themeStyle={{
                          ...previewTheme,
                          primaryColor: previewPrimaryColor || previewTheme.primaryColor
                        }}
                        activeHeaderOption={previewHeaderOption}
                        onHeaderOptionChange={(opt) => {
                          setPreviewHeaderOption(opt);
                          saveCustomThemeEdits({ headerOption: opt });
                        }}
                        lang={lang}
                      />
                    </div>

                    {/* Subdomain Dedicated Box */}
                    <div className="w-full max-w-4xl bg-zinc-950 text-white p-4 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 font-mono font-bold text-amber-400">
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span>https://askul-restaurant.foodie.site</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-zinc-800 text-[10px] font-bold text-slate-300">
                          Subdomain Live Preview
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 3. FOOD ITEMS SECTION (Interactive Reorder & Edit Controls) */}
                  {/* ===================================================================== */}
                  <section className="p-6 sm:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                      <div>
                        <h3 className="text-xl font-black font-display flex items-center gap-2">
                          <span>Gourmet Menu Items</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 font-mono">
                            Reorderable
                          </span>
                        </h3>
                        <p className="text-xs opacity-75">
                          Use the Up ▲ and Down ▼ controls below to reorder food positions live in this theme layout.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="px-3 py-1 rounded-xl bg-black/10 dark:bg-white/10">
                          {modalDishes.length} Items Available
                        </span>
                      </div>
                    </div>

                    {/* Food Items List with Move Up/Down Controls */}
                    {modalDishes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {modalDishes.map((dish, index) => (
                          <div 
                            key={dish.id} 
                            className="rounded-2xl p-4 border flex gap-4 transition-all relative group shadow-sm hover:shadow-md"
                            style={{ 
                              backgroundColor: previewTheme.surfaceColor === '#ffffff' ? '#fafafa' : 'rgba(255,255,255,0.04)',
                              borderColor: 'rgba(128,128,128,0.2)'
                            }}
                          >
                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-800">
                              <img 
                                src={dish.img} 
                                alt={dish.title} 
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 left-1 text-[8px] font-mono px-1 py-0.5 rounded bg-black/80 text-white">
                                {dish.calories}
                              </span>
                            </div>

                            <div className="flex-1 flex flex-col justify-between space-y-1">
                              <div>
                                <div className="flex justify-between items-start gap-2">
                                  {editingDishId === dish.id ? (
                                    <input 
                                      type="text" 
                                      value={editingTitle} 
                                      onChange={(e) => setEditingTitle(e.target.value)}
                                      className="text-xs font-bold p-1 rounded border border-orange-500 bg-white text-slate-900 w-full"
                                    />
                                  ) : (
                                    <h4 
                                      className="font-bold text-sm line-clamp-1"
                                      style={{ fontFamily: previewTheme.fontDisplay }}
                                    >
                                      {dish.title}
                                    </h4>
                                  )}

                                  {editingDishId === dish.id ? (
                                    <input 
                                      type="text" 
                                      value={editingPrice} 
                                      onChange={(e) => setEditingPrice(e.target.value)}
                                      className="text-xs font-mono font-bold p-1 rounded border border-orange-500 bg-white text-slate-900 w-16"
                                    />
                                  ) : (
                                    <span 
                                      className="font-mono font-bold text-sm px-2 py-0.5 rounded text-white"
                                      style={{ backgroundColor: previewTheme.primaryColor }}
                                    >
                                      ${dish.price.toFixed(2)}
                                    </span>
                                  )}
                                </div>

                                <p className="text-[11px] opacity-75 line-clamp-2 mt-1">
                                  {dish.desc}
                                </p>
                              </div>

                              {/* Reorder and Edit Buttons */}
                              <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                                {editingDishId === dish.id ? (
                                  <button 
                                    onClick={handleSaveEditDish}
                                    className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold"
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handleStartEditDish(dish)}
                                    className="text-[10px] font-bold opacity-60 hover:opacity-100 flex items-center gap-1"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                )}

                                {/* Up / Down Reorder Buttons requested by user */}
                                <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-1 rounded-lg">
                                  <button
                                    disabled={index === 0}
                                    onClick={() => handleMoveDishUp(index)}
                                    className="p-1 rounded hover:bg-orange-500 hover:text-white disabled:opacity-30 transition-all"
                                    title="Move Up"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-[10px] font-mono font-bold px-1">
                                    #{index + 1}
                                  </span>
                                  <button
                                    disabled={index === modalDishes.length - 1}
                                    onClick={() => handleMoveDishDown(index)}
                                    className="p-1 rounded hover:bg-orange-500 hover:text-white disabled:opacity-30 transition-all"
                                    title="Move Down"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center space-y-2 bg-zinc-50 dark:bg-zinc-900/50">
                        <Utensils className="w-8 h-8 text-zinc-400 mx-auto" />
                        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                          {lang === 'bn' ? 'কোনো খাবার তালিকাভুক্ত নেই' : 'No Menu Items Listed'}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {lang === 'bn' ? 'এডমিন প্যানেল থেকে খাবার যোগ করলে এখানে এবং থিমে সেগুলো ভেসে উঠবে।' : 'Items added from the admin menu manager will appear here and inside the live theme.'}
                        </p>
                      </div>
                    )}
                  </section>

                  {/* ===================================================================== */}
                  {/* 4. VIDEO SHOWCASE SECTION (Video Section requested) */}
                  {/* ===================================================================== */}
                  <section className="p-6 sm:p-10 bg-zinc-950 text-white space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-orange-500" />
                        <h3 className="text-lg font-black font-display">
                          Chef's Culinary Video Showcase
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono bg-zinc-800 px-2.5 py-1 rounded-full text-slate-400">
                        HD Promotional Video
                      </span>
                    </div>

                    <div className="relative h-56 sm:h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group cursor-pointer shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop" 
                        alt="Chef video thumbnail" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                        <span className="font-black text-xs uppercase tracking-widest text-white drop-shadow">
                          Watch Kitchen Behind-The-Scenes
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 4.1 CULINARY HERITAGE & ABOUT STORY SECTION */}
                  {/* ===================================================================== */}
                  <section 
                    className="p-8 sm:p-14 space-y-8 border-t border-black/10 dark:border-white/10"
                    style={{ 
                      backgroundColor: previewTheme.surfaceColor === '#ffffff' ? '#f8fafc' : 'rgba(0,0,0,0.2)'
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-widest">
                          <Award className="w-4 h-4" />
                          <span>Heritage & Fine Craftsmanship</span>
                        </div>

                        <h3 
                          className="text-2xl sm:text-4xl font-black tracking-tight leading-tight"
                          style={{ fontFamily: previewTheme.fontDisplay }}
                        >
                          Crafting Unforgettable Gourmet Experiences
                        </h3>

                        <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                          At {brandName || 'SAHINSH'}, every recipe is a celebration of authentic flavors, master culinary techniques, and hand-selected organic ingredients sourced directly from artisanal farms.
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
                            <span className="text-xl sm:text-2xl font-black block text-amber-500">100%</span>
                            <span className="text-[10px] font-bold opacity-70 uppercase tracking-wider">Organic Ingredients</span>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
                            <span className="text-xl sm:text-2xl font-black block text-emerald-500">15+</span>
                            <span className="text-[10px] font-bold opacity-70 uppercase tracking-wider">Master Chefs</span>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
                            <span className="text-xl sm:text-2xl font-black block text-cyan-500">4.9★</span>
                            <span className="text-[10px] font-bold opacity-70 uppercase tracking-wider">Guest Rating</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl h-72 sm:h-96">
                        <img 
                          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop" 
                          alt="Executive Chef" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end text-white space-y-1">
                          <Quote className="w-8 h-8 text-amber-400 opacity-60" />
                          <p className="text-xs italic font-medium opacity-90">
                            "Gastronomy is an art form where passion meets precision. We craft dishes that feed both soul and body."
                          </p>
                          <span className="text-xs font-bold text-amber-400 font-mono pt-1">— Chef Executive Officer</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 4.2 SPECIAL PROMOTIONAL OFFERS & TASTING FLIGHTS */}
                  {/* ===================================================================== */}
                  <section className="p-8 sm:p-12 space-y-6">
                    <div className="text-center space-y-2 max-w-xl mx-auto">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                        Exclusive Dining Events
                      </span>
                      <h3 
                        className="text-2xl sm:text-3xl font-black tracking-tight"
                        style={{ fontFamily: previewTheme.fontDisplay }}
                      >
                        Special Chef's Specials & Offers
                      </h3>
                      <p className="text-xs opacity-70">
                        Reserve your table for our limited-edition weekend gourmet tasting flights.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-3xl p-6 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent space-y-4 relative overflow-hidden">
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider inline-block">
                          Weekend Exclusive
                        </span>
                        <h4 className="text-xl font-black font-display">24K Gold Wagyu Tasting Night</h4>
                        <p className="text-xs opacity-80 leading-relaxed">
                          Indulge in our signature A5 Wagyu tenderloin infused with 24-karat edible gold leaves, truffle glaze, and aged vintage reductions.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-black font-mono text-amber-500">$99 / Guest</span>
                          <button className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors">
                            Book Table
                          </button>
                        </div>
                      </div>

                      <div className="rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent space-y-4 relative overflow-hidden">
                        <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider inline-block">
                          Chef's Selection
                        </span>
                        <h4 className="text-xl font-black font-display">5-Course Artisanal Seafood Flight</h4>
                        <p className="text-xs opacity-80 leading-relaxed">
                          Hand-caught wild coastal sea bass, king crab legs, roasted lobster tail, and saffron risotto created fresh daily.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-black font-mono text-cyan-400">$75 / Guest</span>
                          <button className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors">
                            Book Table
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 4.3 VERIFIED GUEST REVIEWS & TESTIMONIALS */}
                  {/* ===================================================================== */}
                  <section 
                    className="p-8 sm:p-12 space-y-8 border-t border-black/10 dark:border-white/10"
                    style={{ 
                      backgroundColor: previewTheme.surfaceColor === '#ffffff' ? '#f1f5f9' : 'rgba(0,0,0,0.3)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 
                          className="text-2xl font-black tracking-tight font-display"
                          style={{ fontFamily: previewTheme.fontDisplay }}
                        >
                          What Our Diners Say
                        </h3>
                        <p className="text-xs opacity-75">
                          Verified guest reviews from Michelin critics and gourmet enthusiasts.
                        </p>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-500 text-xs font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        <span>4.9 out of 5.0 Rating</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          name: 'Farhan Ahmed',
                          role: 'Food Critic',
                          review: 'The Truffle Glazed Wagyu Steak is beyond extraordinary. The 3D WebAR preview gave us an exact realistic preview before ordering!',
                          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop'
                        },
                        {
                          name: 'Sarah Rahman',
                          role: 'Gourmet Enthusiast',
                          review: 'A truly world-class dining ambience. Staff is attentive, table ordering is seamless, and the desserts are phenomenal.',
                          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop'
                        },
                        {
                          name: 'Kamran Malik',
                          role: 'VIP Member',
                          review: 'Easily the top luxury dining destination in the region. The live kitchen KDS ensures hot food arrives instantly.',
                          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop'
                        }
                      ].map((rev, rIdx) => (
                        <div 
                          key={rIdx} 
                          className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 space-y-3 shadow-sm"
                        >
                          <div className="flex items-center gap-1 text-amber-500">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs opacity-80 leading-relaxed italic">
                            "{rev.review}"
                          </p>
                          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-zinc-800">
                            <img src={rev.avatar} alt={rev.name} className="w-9 h-9 rounded-full object-cover" />
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-none">{rev.name}</h5>
                              <span className="text-[10px] text-slate-500 font-medium">{rev.role}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 4.4 INSTAGRAM GOURMET GALLERY GRID */}
                  {/* ===================================================================== */}
                  <section className="p-8 sm:p-12 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-orange-500" />
                        <h3 className="text-xl font-black font-display">
                          Gourmet Instagram Gallery
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-orange-500 font-bold">
                        @sahinsh.gourmet
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {[
                        'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop'
                      ].map((imgUrl, gIdx) => (
                        <div key={gIdx} className="h-32 rounded-2xl overflow-hidden relative group cursor-pointer border border-black/10 dark:border-white/10">
                          <img src={imgUrl} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Instagram className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 4.5 TABLE RESERVATION CTA BLOCK */}
                  {/* ===================================================================== */}
                  <section 
                    className="p-8 sm:p-12 bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-950 text-white space-y-6"
                  >
                    <div className="max-w-3xl mx-auto text-center space-y-3">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-widest inline-block border border-orange-500/30">
                        Reserve Your Table Online
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
                        Experience Dining Luxury Today
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                        Select your preferred date, time, and guest count for instant table confirmation.
                      </p>
                    </div>

                    <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800">
                      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-300 font-mono">Select Date</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-300 font-mono">07:30 PM</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                        <UserCheck className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-300 font-mono">2 Guests</span>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <button className="px-8 py-3 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95">
                        Confirm Reservation
                      </button>
                    </div>
                  </section>

                  {/* ===================================================================== */}
                  {/* 5. COMMON FOOTER (Exact match to Screenshot 3) */}
                  {/* ===================================================================== */}
                  <footer className="bg-[#050814] text-white p-8 sm:p-12 border-t border-slate-800 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      {/* Column 1: Brand Logo & Socials */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 font-black text-lg">
                            SA
                          </div>
                          <h3 className="text-lg font-black text-white font-display">
                            {brandName ? brandName.toLowerCase() : 'sahinsh'}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {settings?.aboutUsText || `${brandName || 'Our restaurant'} is a gourmet dining venue serving signature dishes and fresh home-style taste.`}
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                          <button className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-slate-300">
                            <Facebook className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-slate-300">
                            <Instagram className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-slate-300">
                            <Youtube className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Column 2: Gourmet Menu */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          Gourmet Menu
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                          <li>Pizza & Appetizers</li>
                          <li>Artisanal Burgers</li>
                          <li>Refreshing Beverages</li>
                          <li>Gourmet Desserts</li>
                          <li>Fresh Tropical Fruits</li>
                          <li>Chef's Specials</li>
                        </ul>
                      </div>

                      {/* Column 3: Support & Dining */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          Support & Dining
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                          <li className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Help & User Guide</li>
                          <li className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Frequently Asked Questions</li>
                          <li className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-cyan-400" /> Table Service & Delivery</li>
                          <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> Order Status Tracking</li>
                          <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan-400" /> Privacy Policy</li>
                          <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" /> Terms & Conditions</li>
                        </ul>
                      </div>

                      {/* Column 4: Contact & Location */}
                      {(settings?.brandLocation || settings?.contactPhone || settings?.contactWhatsapp || settings?.contactEmail) && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-white">
                            Contact & Location
                          </h4>
                          <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                            {settings?.brandLocation && (
                              <li className="flex items-center gap-2 text-slate-300">
                                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>{settings.brandLocation}</span>
                              </li>
                            )}
                            {settings?.contactPhone && (
                              <li className="flex items-center gap-2 text-slate-300">
                                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>{settings.contactPhone}</span>
                              </li>
                            )}
                            {settings?.contactWhatsapp && (
                              <li className="flex items-center gap-2 text-slate-300">
                                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{settings.contactWhatsapp}</span>
                              </li>
                            )}
                            {settings?.contactEmail && (
                              <li className="flex items-center gap-2 text-slate-300">
                                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>{settings.contactEmail}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </footer>
                  </>
                  )}
                </div>
              </div>

              {/* PREVIEW CART DRAWER MODAL */}
              <AnimatePresence>
                {isPreviewCartOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-end"
                    onClick={() => setIsPreviewCartOpen(false)}
                  >
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="w-full max-w-md bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-zinc-900 text-white">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-cyan-400" />
                          <h3 className="text-base font-black uppercase tracking-wider font-display">
                            {lang === 'bn' ? 'আপনার ফুড কার্ট' : 'Your Food Cart'}
                          </h3>
                        </div>
                        <button
                          onClick={() => setIsPreviewCartOpen(false)}
                          className="p-1 rounded-full hover:bg-zinc-800 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="p-6 flex-1 overflow-y-auto space-y-4">
                        {previewCartItems.length === 0 ? (
                          <div className="py-16 text-center space-y-3">
                            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                            <p className="text-sm font-bold text-slate-500">
                              {lang === 'bn' ? 'আপনার কার্ট এখন খালি।' : 'Your cart is currently empty.'}
                            </p>
                            <p className="text-xs text-slate-400">
                              {lang === 'bn' ? 'মেনু থেকে খাবার সিলেক্ট করুন' : 'Select items from the menu to add to cart.'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {previewCartItems.map((item, idx) => (
                              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <img src={item.dish.img} alt={item.dish.title} className="w-12 h-12 rounded-lg object-cover bg-slate-200" />
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-black text-slate-900 truncate">{item.dish.title}</h4>
                                    <p className="text-[11px] text-cyan-600 font-bold">${item.dish.price.toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => {
                                      setPreviewCartItems(prev => prev.map((it, i) => i === idx ? { ...it, count: Math.max(1, it.count - 1) } : it));
                                    }}
                                    className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-bold font-mono px-1">{item.count}</span>
                                  <button
                                    onClick={() => {
                                      setPreviewCartItems(prev => prev.map((it, i) => i === idx ? { ...it, count: it.count + 1 } : it));
                                    }}
                                    className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setPreviewCartItems(prev => prev.filter((_, i) => i !== idx));
                                    }}
                                    className="p-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-600 ml-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {previewCartItems.length > 0 && (
                        <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
                          <div className="flex justify-between items-center font-bold text-sm">
                            <span className="text-slate-600">{lang === 'bn' ? 'মোট মূল্য:' : 'Subtotal:'}</span>
                            <span className="text-slate-900 font-mono text-base font-black">
                              ${previewCartItems.reduce((acc, curr) => acc + (curr.dish.price * curr.count), 0).toFixed(2)}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setSuccessToast(lang === 'bn' ? 'অর্ডার সফলভাবে সাবমিট করা হয়েছে!' : 'Order submitted successfully!');
                              setPreviewCartItems([]);
                              setIsPreviewCartOpen(false);
                              setTimeout(() => setSuccessToast(null), 3000);
                            }}
                            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
                          >
                            {lang === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm & Checkout Order'}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================================= */}
      {/* PLAN CONFIRMATION POPUP MODAL (Triggers BEFORE applying/previewing theme) */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedPlanModalTheme && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                    selectedPlanModalTheme.planPrice === 15 ? 'bg-emerald-600' : selectedPlanModalTheme.planPrice === 49 ? 'bg-blue-600' : 'bg-amber-500 text-slate-950'
                  }`}>
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        {selectedPlanModalTheme.formattedSerial}
                      </span>
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full text-white uppercase ${
                        selectedPlanModalTheme.planPrice === 15 ? 'bg-emerald-600' : selectedPlanModalTheme.planPrice === 49 ? 'bg-blue-600' : 'bg-amber-600'
                      }`}>
                        ${selectedPlanModalTheme.planPrice} Plan Theme
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-black text-slate-900 dark:text-white mt-1">
                      {selectedPlanModalTheme.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlanModalTheme(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Plan Details & Features */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Subscription Tier:</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {selectedPlanModalTheme.planPrice === 15 ? '$15 Starter Plan (Themes #01 - #10)' : selectedPlanModalTheme.planPrice === 49 ? '$49 Pro Plan (Themes #11 - #25)' : '$99 Elite Plan (Themes #26 - #50)'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {selectedPlanModalTheme.tagline}
                </p>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Theme Plan Features Included:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Premium Responsive Layout</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 3D AR Interactive Dish Views</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Multi-Language & Currency</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Custom Branding Engine</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-1">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const themeUrl = `/?theme=${selectedPlanModalTheme.id}&standalone=true&plan=${selectedPlanModalTheme.planPrice}`;
                      window.open(themeUrl, '_blank');
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>নতুন ট্যাবে দেখুন (Open in New Tab)</span>
                  </button>

                  <button
                    onClick={() => {
                      saveCustomThemeEdits();
                      handleActivateTheme(selectedPlanModalTheme);
                      const themeUrl = `/?theme=${selectedPlanModalTheme.id}&standalone=true&plan=${selectedPlanModalTheme.planPrice}`;
                      window.open(themeUrl, '_blank');
                      setSelectedPlanModalTheme(null);
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>এই থিমটি এপ্লাই করুন (Apply Theme)</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    const themeToPreview = selectedPlanModalTheme;
                    setSelectedPlanModalTheme(null);
                    handleOpenPreviewTheme(themeToPreview);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>লাইভ ফুলস্ক্রিন প্রিভিউ দেখুন (Full Screen Preview)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
