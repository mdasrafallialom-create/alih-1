import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Store, 
  Phone, 
  Globe, 
  MapPin, 
  Type, 
  QrCode, 
  Sparkles, 
  Save, 
  Send, 
  Check, 
  Download, 
  AlertTriangle, 
  Bell, 
  ConciergeBell,
  FileText, 
  ExternalLink, 
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Crown,
  Share2,
  Maximize2,
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash,
  Eye,
  Info,
  Search,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  LayoutGrid,
  Filter,
  Layout,
  LayoutDashboard,
  Utensils,
  PlusCircle
} from 'lucide-react';
import { AdminSettings, MenuItem } from '../../types';
import { FONT_LIBRARY, FontItem, FontRoleMapping } from './font-library';
import FontLibrarySystem from './FontLibrarySystem';
import { checkTemplateAccess, mapPlanToSubscriptionPlan } from './subscription-entitlements';
import { 
  getMenuCardBranding, 
  saveMenuCardBranding, 
  getPublishedMenuItems, 
  getMenuCardTemplates, 
  MenuCardTemplate, 
  MenuCardBrandingSettings 
} from './firestore-service';

// Global Countries List for Searchable Location Dropdown
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

export { 
  type DynamicTemplateStyle, 
  type ExtendedMenuCardTemplate, 
  type TemplateDishItem,
  generateSingleTemplate, 
  CURATED_UNIQUE_TEMPLATES 
} from './menuTemplatesData';
import { 
  ExtendedMenuCardTemplate,
  generateSingleTemplate
} from './menuTemplatesData';

export interface PosterContentOptions {
  temp: ExtendedMenuCardTemplate;
  restaurantName?: string;
  customTagline?: string;
  phone?: string;
  website?: string;
  address?: string;
  customFoods?: MenuItem[];
  customBgColor?: string;
  customTextColor?: string;
  customAccentColor?: string;
  brandFont?: any;
  bodyFont?: any;
  headingFont?: any;
  sectionFont?: any;
  priceFont?: any;
  buttonFont?: any;
  headerTextAlign?: 'left' | 'center' | 'right';
  headerTitleFontSize?: number;
  headerTitleUpper?: boolean;
  headerTitleTracking?: string;
  onSelectFoodItem?: (item: any) => void;
  onView3D?: (item: any) => void;
  isLargePreview?: boolean;
}

// Helper function to render authentic, visually distinct Canva/Pinterest menu poster previews per archetype
export function renderPosterContent(
  tempOrOptions: ExtendedMenuCardTemplate | PosterContentOptions, 
  restaurantNameParam?: string,
  onSelectFoodItemParam?: (item: any) => void,
  onView3DParam?: (item: any) => void
) {
  let temp: ExtendedMenuCardTemplate;
  let restaurantName: string | undefined;
  let customTagline: string | undefined;
  let phone: string | undefined;
  let website: string | undefined;
  let address: string | undefined;
  let customFoods: MenuItem[] | undefined;
  let customBgColor: string | undefined;
  let customTextColor: string | undefined;
  let customAccentColor: string | undefined;
  let brandFont: any;
  let bodyFont: any;
  let onSelectFoodItem: ((item: any) => void) | undefined;
  let onView3D: ((item: any) => void) | undefined;
  let isLarge = false;
  let headerTextAlign: 'left' | 'center' | 'right' = 'center';
  let headerTitleFontSize: number | undefined;
  let headerTitleUpper = true;
  let headerTitleTracking = 'tracking-tight';

  if (tempOrOptions && 'temp' in tempOrOptions) {
    const opts = tempOrOptions as PosterContentOptions;
    temp = opts.temp;
    restaurantName = opts.restaurantName;
    customTagline = opts.customTagline;
    phone = opts.phone;
    website = opts.website;
    address = opts.address;
    customFoods = opts.customFoods;
    customBgColor = opts.customBgColor;
    customTextColor = opts.customTextColor;
    customAccentColor = opts.customAccentColor;
    brandFont = opts.brandFont;
    bodyFont = opts.bodyFont;
    onSelectFoodItem = opts.onSelectFoodItem;
    onView3D = opts.onView3D;
    isLarge = !!opts.isLargePreview;
    headerTextAlign = opts.headerTextAlign || 'center';
    headerTitleFontSize = opts.headerTitleFontSize;
    headerTitleUpper = opts.headerTitleUpper !== undefined ? opts.headerTitleUpper : true;
    headerTitleTracking = opts.headerTitleTracking || 'tracking-tight';
  } else {
    temp = tempOrOptions as ExtendedMenuCardTemplate;
    restaurantName = restaurantNameParam;
    onSelectFoodItem = onSelectFoodItemParam;
    onView3D = onView3DParam;
  }

  const alignClass = headerTextAlign === 'left' ? 'text-left items-start' : headerTextAlign === 'right' ? 'text-right items-end' : 'text-center items-center';
  const textAlignClass = headerTextAlign === 'left' ? 'text-left' : headerTextAlign === 'right' ? 'text-right' : 'text-center';
  const justifyClass = headerTextAlign === 'left' ? 'justify-start' : headerTextAlign === 'right' ? 'justify-end' : 'justify-center';
  const transformClass = headerTitleUpper ? 'uppercase' : 'normal-case';

  const titleSizeStyle = headerTitleFontSize 
    ? { fontSize: isLarge ? `${headerTitleFontSize}px` : `${Math.max(13, Math.round(headerTitleFontSize * 0.55))}px` }
    : undefined;

  const subtitleSizeStyle = headerTitleFontSize
    ? { fontSize: isLarge ? `${Math.max(14, Math.round(headerTitleFontSize * 0.55))}px` : `${Math.max(8, Math.round(headerTitleFontSize * 0.35))}px` }
    : undefined;

  const layout = temp?.style?.layout || 'circle-gold';
  const nameLower = (temp?.name || '').toLowerCase();
  const rName = restaurantName || 'Asikul Restaurant';
  const webSiteUrl = website || 'www.reallygreatsite.com';
  const contactPhone = phone || '+123-456-7890';
  
  const templateDishes = temp?.dishes;
  const cardHeroTitle = temp?.heroTitle || (temp?.name ? temp.name.replace(/\(Design #\d+\)/, '').replace(/Poster #\d+/, '').trim() : '');
  const cardTagline = customTagline || temp?.tagline;
  const cardHeroImg = temp?.previewImageUrl;

  // Specific Unsplash photos matching food categories:
  const burgerImg = cardHeroImg || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80';
  const ramenImg = cardHeroImg || 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80';
  const pizzaImg = cardHeroImg || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80';
  const coffeeImg = cardHeroImg || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80';
  const seafoodImg = cardHeroImg || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80';
  const steakImg = cardHeroImg || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
  const fineImg = cardHeroImg || 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80';
  const saladImg = cardHeroImg || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackUrl;
  };

  // Helper to determine if a hex color is light or dark for high-contrast rendering
  const checkIsLightBg = (hexColor?: string): boolean => {
    if (!hexColor) return false;
    const hex = hexColor.replace('#', '');
    if (hex.length !== 6) return false;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return ((r * 299 + g * 587 + b * 114) / 1000) > 160;
  };

  // Helper dish click handler
  const handleItemClick = (e: React.MouseEvent, dish: any) => {
    if (onSelectFoodItem) {
      e.stopPropagation();
      onSelectFoodItem(dish);
    }
  };

  // 1. BURGER RESTAURANT CHALKBOARD POSTER (Exact match for user uploaded reference image: 1035w-t_IX1CQkfkc.jpg)
  if (layout === 'sunset-vibes') {
    let foodMenu: any[] = [
      { id: 'bm1', name: 'Imperial Beef Burger', price: 18.00, category: 'Food Menu', image: burgerImg },
      { id: 'bm2', name: 'Double Bacon Cheese Burger', price: 22.00, category: 'Food Menu', image: burgerImg },
      { id: 'bm3', name: 'Spicy Zinger Chicken Burger', price: 16.50, category: 'Food Menu', image: burgerImg },
      { id: 'bm4', name: 'Original Truffle Burger', price: 19.00, category: 'Food Menu', image: burgerImg },
      { id: 'bm5', name: 'Egg & Cheddar Breakfast Burger', price: 14.00, category: 'Food Menu', image: burgerImg }
    ];
    let appetizers: any[] = [
      { id: 'ba1', name: 'Crispy Golden French Fries', price: 8.50, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80' },
      { id: 'ba2', name: 'Fresh Avocado Garden Salad', price: 12.00, category: 'Appetizers', image: saladImg },
      { id: 'ba3', name: 'Loaded Garlic Mashed Potatoes', price: 9.00, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1514944288352-18f9e04f79b8?auto=format&fit=crop&w=400&q=80' },
      { id: 'ba4', name: 'Artisan Garlic Cheese Toast', price: 7.50, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' }
    ];
    let beverages: any[] = [
      { id: 'bb1', name: 'Fresh Pressed Orange Juice', price: 6.50, category: 'Beverages', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80' },
      { id: 'bb2', name: 'Iced Peach Lemon Tea', price: 5.50, category: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80' },
      { id: 'bb3', name: 'Specialty Cold Brew Coffee', price: 6.00, category: 'Beverages', image: coffeeImg }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('burger') || (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('food'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('appetizer') || (f.category || '').toLowerCase().includes('starter') || (f.category || '').toLowerCase().includes('salad') || (f.category || '').toLowerCase().includes('side'));
      const drinks = customFoods.filter(f => (f.category || '').toLowerCase().includes('beverage') || (f.category || '').toLowerCase().includes('drink') || (f.category || '').toLowerCase().includes('coffee') || (f.category || '').toLowerCase().includes('juice'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f) && !drinks.includes(f));
      if (mains.length > 0) foodMenu = mains;
      else if (rem.length > 0) foodMenu = rem.slice(0, 5);
      if (apps.length > 0) appetizers = apps;
      else if (rem.length > 5) appetizers = rem.slice(5, 9);
      if (drinks.length > 0) beverages = drinks;
      else if (rem.length > 9) beverages = rem.slice(9, 12);
    } else if (templateDishes && templateDishes.length > 0) {
      foodMenu = templateDishes.slice(0, 5);
      appetizers = templateDishes.slice(2, 5);
      beverages = templateDishes.slice(4, 6);
      if (appetizers.length === 0) appetizers = templateDishes.slice(1, 3);
      if (beverages.length === 0) beverages = templateDishes.slice(2, 4);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#111113';
    const accent = customAccentColor || temp?.style?.accentColor || '#f97316';
    const isLight = checkIsLightBg(bgColor);
    const mainTextColor = customTextColor || (isLight ? '#0f172a' : '#ffffff');
    const priceTextColor = isLight ? '#ea580c' : '#f59e0b';
    const borderColor = isLight ? 'border-slate-300' : 'border-white/20';

    return (
      <div 
        style={{ backgroundColor: bgColor, color: mainTextColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-zinc-800 select-none`}
      >
        {/* Top Header Row with Green Arc & Juicy Burger Cutout */}
        <div className={`relative ${isLarge ? 'h-32 -mx-6 -mt-6 mb-2' : 'h-20 -mx-2 -mt-2 mb-1'} overflow-hidden`}>
          {/* Green Arc Slice */}
          <div className={`absolute top-0 left-0 ${isLarge ? 'w-52 h-52' : 'w-36 h-36'} bg-[#8cc63f] rounded-br-full z-10 flex items-center justify-center p-2 shadow-lg`}>
            <div 
              onClick={(e) => handleItemClick(e, foodMenu[0])}
              className={`${isLarge ? 'w-36 h-36 border-4' : 'w-24 h-24 border-2'} rounded-full overflow-hidden border-white/90 shadow-2xl cursor-pointer hover:scale-105 transition-transform translate-x-1 translate-y-1 bg-zinc-900`}
            >
              <img src={foodMenu[0]?.image || burgerImg} alt="Burger" onError={(e) => handleImageError(e, burgerImg)} className="w-full h-full object-cover scale-110" />
            </div>
          </div>

          {/* Top Right Header Text */}
          <div className={`absolute ${isLarge ? 'top-4 right-6' : 'top-2 right-3'} ${textAlignClass} z-20`}>
            <div className={`flex items-center ${justifyClass} gap-1.5 mb-0.5`}>
              <span className={isLarge ? 'text-3xl' : 'text-xl'}>🍔</span>
            </div>
            <h1 
              style={{ fontFamily: brandFont?.family, color: mainTextColor, ...titleSizeStyle }} 
              className={`${isLarge ? 'text-3xl sm:text-4xl font-extrabold' : 'text-2xl font-black'} ${headerTitleTracking} ${transformClass} leading-none`}
            >
              {cardHeroTitle || 'BURGER & GRILL'}
            </h1>
            <div 
              style={{ fontFamily: bodyFont?.family, ...subtitleSizeStyle }} 
              className={`${isLarge ? 'text-base sm:text-lg' : 'text-sm'} font-serif italic text-red-500 font-extrabold tracking-wide ${transformClass}`}
            >
              {rName}
            </div>
            {cardTagline && (
              <div className={`${isLarge ? 'text-xs' : 'text-[6px]'} text-amber-400 font-bold tracking-wider ${transformClass}`}>
                {cardTagline}
              </div>
            )}
          </div>
        </div>

        {/* Main 2-Column Content Layout */}
        <div className={`flex-1 grid grid-cols-2 gap-3 relative z-20 border-t ${borderColor} ${isLarge ? 'pt-4 text-xs sm:text-sm' : 'pt-1 text-[6px]'}`}>
          {/* Column 1 (Left) */}
          <div className={`space-y-3 border-r ${borderColor} pr-3`}>
            <div>
              <h3 
                style={{ color: accent }} 
                className={`${isLarge ? 'text-xs sm:text-sm font-black mb-2' : 'text-[7.5px] font-bold mb-0.5'} uppercase tracking-wider border-b ${borderColor} pb-1`}
              >
                BURGER SPECIALS
              </h3>
              <div className={isLarge ? 'space-y-2' : 'space-y-[1px]'}>
                {foodMenu.map(dish => (
                  <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="flex justify-between items-center cursor-pointer transition-colors font-bold">
                    <span className="truncate font-bold" style={{ color: mainTextColor }}>{dish.name}</span>
                    <span className="font-mono font-bold ml-1 shrink-0" style={{ color: priceTextColor }}>${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 (Right) */}
          <div className="space-y-3 pl-1">
            <div>
              <h3 
                style={{ color: accent }} 
                className={`${isLarge ? 'text-xs sm:text-sm font-black mb-2' : 'text-[7.5px] font-bold mb-0.5'} uppercase tracking-wider border-b ${borderColor} pb-1`}
              >
                APPETIZERS & SIDES
              </h3>
              <div className={isLarge ? 'space-y-2' : 'space-y-[1px]'}>
                {appetizers.map(dish => (
                  <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="flex justify-between items-center cursor-pointer transition-colors font-bold">
                    <span className="truncate font-bold" style={{ color: mainTextColor }}>{dish.name}</span>
                    <span className="font-mono font-bold ml-1 shrink-0" style={{ color: priceTextColor }}>${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 
                style={{ color: accent }} 
                className={`${isLarge ? 'text-xs sm:text-sm font-black mb-2' : 'text-[7.5px] font-bold mb-0.5'} uppercase tracking-wider border-b ${borderColor} pb-1`}
              >
                BEVERAGES & COFFEE
              </h3>
              <div className={isLarge ? 'space-y-2' : 'space-y-[1px]'}>
                {beverages.map(dish => (
                  <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="flex justify-between items-center cursor-pointer transition-colors font-bold">
                    <span className="truncate font-bold" style={{ color: mainTextColor }}>{dish.name}</span>
                    <span className="font-mono font-bold ml-1 shrink-0" style={{ color: priceTextColor }}>${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} font-mono font-bold border-t ${borderColor} flex justify-between items-center px-2`} style={{ color: priceTextColor }}>
          <span>ORDER ONLINE • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 2. BORCELLE RESTAURANT CANVA POSTER (Exact match for user uploaded reference image: 1131w-ohRNgqoJW40.webp)
  if (layout === 'circle-gold') {
    let mainCourse: any[] = [
      { id: 'b1', name: 'Cheeseburger', price: 34, category: 'Main Course', image: burgerImg },
      { id: 'b2', name: 'Cheese Sandwich', price: 22, category: 'Main Course', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
      { id: 'b3', name: 'Chicken Burgers', price: 24, category: 'Main Course', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
      { id: 'b4', name: 'Spicy Chicken', price: 33, category: 'Main Course', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
      { id: 'b5', name: 'Hot Dog', price: 23, category: 'Main Course', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80' }
    ];
    let appetizers: any[] = [
      { id: 'a1', name: 'Fruit Salad', price: 13, category: 'Appetizers', image: saladImg },
      { id: 'a2', name: 'Cocktails', price: 12, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' },
      { id: 'a3', name: 'Nuggets', price: 14, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
      { id: 'a4', name: 'Sandwich', price: 13, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
      { id: 'a5', name: 'French Fries', price: 15, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80' }
    ];
    let beverages: any[] = [
      { id: 'd1', name: 'Milk Shake', price: 34, category: 'Beverage', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80' },
      { id: 'd2', name: 'Iced Tea', price: 22, category: 'Beverage', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80' },
      { id: 'd3', name: 'Orange Juice', price: 24, category: 'Beverage', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80' },
      { id: 'd4', name: 'Lemon Tea', price: 33, category: 'Beverage', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80' },
      { id: 'd5', name: 'Iced Coffee', price: 23, category: 'Beverage', image: coffeeImg }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('pizza') || (f.category || '').toLowerCase().includes('burger'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('appetizer') || (f.category || '').toLowerCase().includes('starter') || (f.category || '').toLowerCase().includes('salad'));
      const drinks = customFoods.filter(f => (f.category || '').toLowerCase().includes('beverage') || (f.category || '').toLowerCase().includes('drink') || (f.category || '').toLowerCase().includes('coffee'));
      const remaining = customFoods.filter(f => !mains.includes(f) && !apps.includes(f) && !drinks.includes(f));
      
      if (mains.length > 0) mainCourse = mains;
      else if (remaining.length > 0) mainCourse = remaining.slice(0, 5);

      if (apps.length > 0) appetizers = apps;
      else if (remaining.length > 5) appetizers = remaining.slice(5, 10);

      if (drinks.length > 0) beverages = drinks;
      else if (remaining.length > 10) beverages = remaining.slice(10, 15);
    } else if (templateDishes && templateDishes.length > 0) {
      mainCourse = templateDishes.slice(0, 5);
      appetizers = templateDishes.slice(2, 5);
      beverages = templateDishes.slice(4, 6);
      if (appetizers.length === 0) appetizers = templateDishes.slice(1, 3);
      if (beverages.length === 0) beverages = templateDishes.slice(2, 4);
    }

    const circleImages = [
      cardHeroImg || mainCourse[0]?.image || 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80',
      appetizers[0]?.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
      beverages[0]?.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80'
    ];

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#1c1d22';
    const accentColor = customAccentColor || temp?.style?.accentColor || '#fbbf24';
    const isLight = checkIsLightBg(bgColor);
    const mainTextColor = customTextColor || (isLight ? '#0f172a' : '#ffffff');
    const priceTextColor = isLight ? '#0284c7' : '#f59e0b';
    const borderColor = isLight ? 'border-slate-300' : 'border-white/20';

    return (
      <div 
        style={{ backgroundColor: bgColor, color: mainTextColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl border border-amber-500/20'} overflow-hidden shadow-2xl select-none`}
      >
        {/* Gold Floral Vine Ornaments in Corners */}
        <div className={`absolute top-2 left-2 opacity-80 pointer-events-none ${isLarge ? 'text-xl' : 'text-xs'}`} style={{ color: priceTextColor }}>🌿</div>
        <div className={`absolute top-2 right-2 opacity-80 pointer-events-none ${isLarge ? 'text-xl' : 'text-xs'}`} style={{ color: priceTextColor }}>🌿</div>
        <div className={`absolute bottom-2 left-2 opacity-80 pointer-events-none ${isLarge ? 'text-xl' : 'text-xs'}`} style={{ color: priceTextColor }}>🌿</div>
        <div className={`absolute bottom-2 right-2 opacity-80 pointer-events-none ${isLarge ? 'text-xl' : 'text-xs'}`} style={{ color: priceTextColor }}>🌿</div>

        {/* Top Header */}
        <div className={`space-y-1 relative z-20 mt-1 flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[5px] font-mono'} block font-bold ${textAlignClass}`} style={{ color: priceTextColor }}>
            {webSiteUrl}
          </span>
          <h1 
            style={{ fontFamily: brandFont?.family, color: mainTextColor, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-3xl sm:text-4xl font-extrabold' : 'text-xl font-black'} ${transformClass} ${headerTitleTracking} leading-none ${textAlignClass}`}
          >
            {cardHeroTitle || 'FOOD MENU'}
          </h1>
          <div 
            style={{ fontFamily: bodyFont?.family, color: priceTextColor, ...subtitleSizeStyle }} 
            className={`${isLarge ? 'text-base sm:text-lg' : 'text-[11px]'} font-serif italic font-bold tracking-wide leading-none ${transformClass} ${textAlignClass}`}
          >
            {rName}
          </div>
          {cardTagline && (
            <div className={`${isLarge ? 'text-xs' : 'text-[6px]'} opacity-80 font-medium tracking-wide ${transformClass} ${textAlignClass}`} style={{ color: mainTextColor }}>
              {customTagline}
            </div>
          )}
        </div>

        {/* 3 Circular Cutouts with White Rings & Leaf Accents */}
        <div 
          onClick={(e) => handleItemClick(e, mainCourse[0])}
          className={`absolute ${isLarge ? 'top-20 right-4 w-28 h-28 border-4' : 'top-12 right-1 w-12 h-12 border-2'} rounded-full border-white overflow-hidden shadow-2xl z-20 cursor-pointer hover:scale-105 transition-transform bg-zinc-800`}
        >
          <img src={circleImages[0]} alt="" onError={(e) => handleImageError(e, burgerImg)} className="w-full h-full object-cover" />
          <span className={`absolute -bottom-1 -right-1 ${isLarge ? 'text-lg' : 'text-[10px]'}`}>🍃</span>
        </div>

        <div 
          onClick={(e) => handleItemClick(e, appetizers[0])}
          className={`absolute ${isLarge ? 'top-56 left-4 w-28 h-28 border-4' : 'top-28 left-1 w-12 h-12 border-2'} rounded-full border-white overflow-hidden shadow-2xl z-20 cursor-pointer hover:scale-105 transition-transform bg-zinc-800`}
        >
          <img src={circleImages[1]} alt="" onError={(e) => handleImageError(e, saladImg)} className="w-full h-full object-cover" />
          <span className={`absolute -top-1 -left-1 ${isLarge ? 'text-lg' : 'text-[10px]'}`}>🍃</span>
        </div>

        <div 
          onClick={(e) => handleItemClick(e, beverages[0])}
          className={`absolute ${isLarge ? 'bottom-16 right-4 w-28 h-28 border-4' : 'bottom-6 right-1 w-12 h-12 border-2'} rounded-full border-white overflow-hidden shadow-2xl z-20 cursor-pointer hover:scale-105 transition-transform bg-zinc-800`}
        >
          <img src={circleImages[2]} alt="" onError={(e) => handleImageError(e, coffeeImg)} className="w-full h-full object-cover" />
          <span className={`absolute -top-1 -right-1 ${isLarge ? 'text-lg' : 'text-[10px]'}`}>🍃</span>
        </div>

        {/* Content Section with Yellow Category Badges */}
        <div className={`flex-1 flex flex-col justify-around relative z-20 ${isLarge ? 'py-4 px-2 space-y-4' : 'py-1 px-1 space-y-1'}`}>
          {/* MAIN COURSE */}
          <div className="w-[60%]">
            <div 
              style={{ backgroundColor: accentColor }} 
              className={`text-slate-950 font-black uppercase tracking-wider ${isLarge ? 'text-xs px-3 py-1.5 rounded-lg shadow-md mb-2' : 'text-[6.5px] px-2 py-0.5 rounded shadow mb-0.5'} inline-block`}
            >
              MAIN COURSE
            </div>
            <div className={isLarge ? 'space-y-1.5' : 'space-y-[1px]'}>
              {mainCourse.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className={`flex justify-between items-center ${isLarge ? 'text-xs sm:text-sm border-b ' + borderColor + ' pb-1' : 'text-[6px]'} font-bold cursor-pointer transition-colors`}>
                  <span className="truncate" style={{ color: mainTextColor }}>{dish.name}</span>
                  <span className="font-mono ml-2 shrink-0 font-bold" style={{ color: priceTextColor }}>${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* APPETIZERS */}
          <div className="w-[60%] ml-auto text-left">
            <div 
              style={{ backgroundColor: accentColor }} 
              className={`text-slate-950 font-black uppercase tracking-wider ${isLarge ? 'text-xs px-3 py-1.5 rounded-lg shadow-md mb-2' : 'text-[6.5px] px-2 py-0.5 rounded shadow mb-0.5'} inline-block`}
            >
              APPETIZERS
            </div>
            <div className={isLarge ? 'space-y-1.5' : 'space-y-[1px]'}>
              {appetizers.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className={`flex justify-between items-center ${isLarge ? 'text-xs sm:text-sm border-b ' + borderColor + ' pb-1' : 'text-[6px]'} font-bold cursor-pointer transition-colors`}>
                  <span className="truncate" style={{ color: mainTextColor }}>{dish.name}</span>
                  <span className="font-mono ml-2 shrink-0 font-bold" style={{ color: priceTextColor }}>${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BEVERAGE */}
          <div className="w-[60%]">
            <div 
              style={{ backgroundColor: accentColor }} 
              className={`text-slate-950 font-black uppercase tracking-wider ${isLarge ? 'text-xs px-3 py-1.5 rounded-lg shadow-md mb-2' : 'text-[6.5px] px-2 py-0.5 rounded shadow mb-0.5'} inline-block`}
            >
              BEVERAGE
            </div>
            <div className={isLarge ? 'space-y-1.5' : 'space-y-[1px]'}>
              {beverages.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className={`flex justify-between items-center ${isLarge ? 'text-xs sm:text-sm border-b ' + borderColor + ' pb-1' : 'text-[6px]'} font-bold cursor-pointer transition-colors`}>
                  <span className="truncate" style={{ color: mainTextColor }}>{dish.name}</span>
                  <span className="font-mono ml-2 shrink-0 font-bold" style={{ color: priceTextColor }}>${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} font-mono font-bold border-t ${borderColor} flex justify-between items-center px-2`} style={{ color: priceTextColor }}>
          <span>ORDER ONLINE • SCAN QR</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 2. JAPANESE / SUSHI / RAMEN POSTER (Chalkboard)
  if (layout === 'chalkboard') {
    let ramenDishes: any[] = [
      { id: 'j1', name: 'Spicy Tonkotsu Ramen', price: 16.50, description: 'Rich pork broth ramen with chashu & soft egg.', category: 'Ramen', image: ramenImg, isChefSpecial: true },
      { id: 'j3', name: 'Crispy Pork Gyoza (6pcs)', price: 8.50, description: 'Pan-fried Japanese dumplings with ponzu.', category: 'Side', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80' },
      { id: 'j5', name: 'Shoyu Chicken Ramen', price: 15.00, description: 'Soy broth with braised chicken & bamboo shoots.', category: 'Ramen', image: ramenImg }
    ];
    let sushiDishes: any[] = [
      { id: 'j2', name: 'Salmon Aburi Nigiri (4pcs)', price: 14.00, description: 'Torch-seared salmon nigiri with unagi glaze.', category: 'Sushi', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80', isPopular: true },
      { id: 'j4', name: 'Dragon Sushi Roll (8pcs)', price: 15.50, description: 'Eel, avocado, cucumber & flying fish roe.', category: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80' },
      { id: 'j6', name: 'Matcha Green Tea Float', price: 6.50, description: 'Uji ceremonial matcha with vanilla bean ice cream.', category: 'Beverage', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('ramen') || (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('noodle'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('sushi') || (f.category || '').toLowerCase().includes('side') || (f.category || '').toLowerCase().includes('appetizer') || (f.category || '').toLowerCase().includes('drink'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
      if (mains.length > 0) ramenDishes = mains;
      else if (rem.length > 0) ramenDishes = rem.slice(0, 4);
      if (apps.length > 0) sushiDishes = apps;
      else if (rem.length > 4) sushiDishes = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      ramenDishes = templateDishes.slice(0, 3);
      sushiDishes = templateDishes.slice(3, 6);
      if (sushiDishes.length === 0) sushiDishes = templateDishes.slice(1, 4);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#0d0d0f';
    const accent = customAccentColor || temp?.style?.accentColor || '#ef4444';

    return (
      <div 
        style={{ backgroundColor: bgColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full text-white ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-red-950 select-none`}
      >
        {/* Header Ribbon */}
        <div className={`bg-zinc-950/90 ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-red-500/60 shadow-xl flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[6.5px] font-mono'} font-bold text-red-400 block ${textAlignClass} ${transformClass}`}>
            日 本 料 理 • {rName}
          </span>
          <h3 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} text-amber-200 leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'JAPANESE CUISINE'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs font-mono' : 'text-[6px] font-mono'} text-zinc-300 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        {/* Hero Ramen Photo */}
        <div 
          onClick={(e) => handleItemClick(e, ramenDishes[0])}
          className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-red-500/60 shadow-2xl cursor-pointer group/hero hover:ring-2 hover:ring-red-500 transition-all shrink-0 bg-zinc-900`}
        >
          <img src={cardHeroImg || ramenDishes[0]?.image || ramenImg} alt="Ramen" onError={(e) => handleImageError(e, ramenImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
          <div className={`absolute top-2 left-2 bg-red-600 text-white ${isLarge ? 'text-xs px-2.5 py-1' : 'text-[5.5px] px-1.5 py-0.5'} font-black rounded shadow`}>
            CHEF'S SPECIAL
          </div>
          <div className="absolute bottom-2 left-3 text-white">
            <h4 className={`${isLarge ? 'text-base font-black' : 'text-[9px] font-bold'} uppercase tracking-widest text-amber-300`}>
              {ramenDishes[0]?.name || 'Tonkotsu Ramen'}
            </h4>
          </div>
        </div>

        {/* Menu Section */}
        <div className={`space-y-2 bg-zinc-900/90 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-red-900/50 flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-black' : 'text-[6.5px] font-bold'} uppercase text-red-400 border-b border-red-900/60 pb-1 block tracking-wider`}>
            RAMEN & NOODLES
          </span>
          {ramenDishes.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
            >
              <span className="text-amber-100 truncate flex items-center gap-1.5">
                {i === 0 ? '🍜' : '🥟'} {dish.name}
              </span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-500/30">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-black pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase text-red-400 border-b border-red-900/60 pb-1 block tracking-wider`}>
            SUSHI, SASHIMI & DRINKS
          </span>
          {sushiDishes.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
            >
              <span className="text-amber-100 truncate flex items-center gap-1.5">
                🍣 {dish.name}
              </span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-500/30">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-amber-300 font-mono font-bold border-t border-white/20 flex justify-between items-center px-2`}>
          <span>ORDER ONLINE • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 3. PIZZA & ITALIAN BISTRO POSTER
  if (layout === 'hand-drawn') {
    let pizzaMains: any[] = [
      { id: 'p1', name: 'Truffle Burrata Pizza', price: 22.00, description: 'Sourdough pizza with burrata & black truffle.', category: 'Pizza', image: pizzaImg, isChefSpecial: true },
      { id: 'p2', name: 'Tagliatelle Carbonara', price: 18.50, description: 'Fresh pasta with guanciale & pecorino.', category: 'Pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80', isPopular: true },
      { id: 'p5', name: 'Classic Margherita Supreme', price: 16.00, description: 'San Marzano tomatoes, fresh mozzarella & basil.', category: 'Pizza', image: pizzaImg }
    ];
    let pizzaStarters: any[] = [
      { id: 'p3', name: 'Classic Caesar Salad', price: 12.00, description: 'Romaine hearts, garlic sourdough croutons & parmesan.', category: 'Starters', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80' },
      { id: 'p4', name: 'Tiramisu Tradizionale', price: 8.50, description: 'Espresso-soaked ladyfingers & mascarpone.', category: 'Dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80' },
      { id: 'p6', name: 'Aperol Spritz / Italian Soda', price: 9.00, description: 'Prosecco, Aperol & soda water.', category: 'Beverage', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('pizza') || (f.category || '').toLowerCase().includes('pasta') || (f.category || '').toLowerCase().includes('main'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('starter') || (f.category || '').toLowerCase().includes('salad') || (f.category || '').toLowerCase().includes('dessert') || (f.category || '').toLowerCase().includes('drink'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
      if (mains.length > 0) pizzaMains = mains;
      else if (rem.length > 0) pizzaMains = rem.slice(0, 4);
      if (apps.length > 0) pizzaStarters = apps;
      else if (rem.length > 4) pizzaStarters = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      pizzaMains = templateDishes.slice(0, 3);
      pizzaStarters = templateDishes.slice(3, 6);
      if (pizzaStarters.length === 0) pizzaStarters = templateDishes.slice(1, 4);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#220b0b';
    const accent = customAccentColor || temp?.style?.accentColor || '#eab308';

    return (
      <div 
        style={{ backgroundColor: bgColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full text-white ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-amber-900/60 select-none`}
      >
        {/* Italian Header */}
        <div className={`bg-amber-950/90 ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-amber-500/40 relative overflow-hidden shadow-xl flex flex-col ${alignClass}`}>
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-white to-red-600" />
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest mt-1' : 'text-[6.5px] font-mono'} font-bold text-amber-300 ${transformClass} block ${textAlignClass}`}>
            {rName} ITALIANO
          </span>
          <h3 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} text-white leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'WOODFIRED BISTRO'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs' : 'text-[6px]'} text-amber-200 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        {/* Hero Pizza Photo */}
        <div 
          onClick={(e) => handleItemClick(e, pizzaMains[0])}
          className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-amber-500/50 shadow-2xl cursor-pointer group/hero hover:ring-2 hover:ring-amber-400 transition-all shrink-0 bg-zinc-900`}
        >
          <img src={cardHeroImg || pizzaMains[0]?.image || pizzaImg} alt="Pizza" onError={(e) => handleImageError(e, pizzaImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
          <div className="absolute bottom-2 left-3 text-white">
            <h4 className={`${isLarge ? 'text-base font-black' : 'text-[9px] font-bold'} uppercase tracking-wider text-amber-300`}>
              {pizzaMains[0]?.name || 'Truffle Burrata Pizza'}
            </h4>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`space-y-2 bg-black/60 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-amber-500/30 flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-black' : 'text-[6.5px] font-bold'} uppercase text-amber-400 border-b border-amber-500/30 pb-1 block tracking-wider`}>
            PIZZA & PASTA
          </span>
          {pizzaMains.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
            >
              <span className="truncate flex items-center gap-1.5 text-white">
                {i === 0 ? '🍕' : '🍝'} {dish.name}
              </span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-black pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase text-amber-400 border-b border-amber-500/30 pb-1 block tracking-wider`}>
            STARTERS, DESSERT & DRINKS
          </span>
          {pizzaStarters.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
            >
              <span className="truncate flex items-center gap-1.5 text-amber-100">
                {i === 0 ? '🥗' : '🍰'} {dish.name}
              </span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-amber-300 font-mono font-bold border-t border-white/20 flex justify-between items-center px-2`}>
          <span>ORDER ONLINE • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 4. CAFE, COFFEE & BAKERY POSTER (Polaroid / Warm Parchment Cream)
  if (layout === 'polaroid') {
    let cafeDrinks: any[] = [
      { id: 'c1', name: 'Specialty Oat Milk Flat White', price: 5.50, description: 'Velvety espresso with oat milk.', category: 'Drinks', image: coffeeImg, isPopular: true },
      { id: 'c4', name: 'Uji Ceremonial Iced Matcha Latte', price: 6.00, description: 'Uji ceremonial matcha with cold milk.', category: 'Drinks', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80' },
      { id: 'c5', name: 'Cold Brew Single Origin Coffee', price: 5.00, description: 'Slow steeped for 24 hours.', category: 'Drinks', image: coffeeImg }
    ];
    let cafePastries: any[] = [
      { id: 'c2', name: 'Warm Almond Frangipane Croissant', price: 4.50, description: 'Butter croissant with almond frangipane.', category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', isChefSpecial: true },
      { id: 'c3', name: 'Artisan Avocado & Poached Egg Toast', price: 12.50, description: 'Smashed Hass avocado on toasted sourdough.', category: 'Breakfast', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const drinks = customFoods.filter(f => (f.category || '').toLowerCase().includes('coffee') || (f.category || '').toLowerCase().includes('drink') || (f.category || '').toLowerCase().includes('beverage') || (f.category || '').toLowerCase().includes('tea'));
      const bakery = customFoods.filter(f => (f.category || '').toLowerCase().includes('bakery') || (f.category || '').toLowerCase().includes('pastry') || (f.category || '').toLowerCase().includes('toast') || (f.category || '').toLowerCase().includes('breakfast'));
      const rem = customFoods.filter(f => !drinks.includes(f) && !bakery.includes(f));
      if (drinks.length > 0) cafeDrinks = drinks;
      else if (rem.length > 0) cafeDrinks = rem.slice(0, 4);
      if (bakery.length > 0) cafePastries = bakery;
      else if (rem.length > 4) cafePastries = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      cafeDrinks = templateDishes.slice(0, 3);
      cafePastries = templateDishes.slice(3, 5);
      if (cafePastries.length === 0) cafePastries = templateDishes.slice(1, 3);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#fdfbf7';
    const textColor = customTextColor || temp?.style?.textColor || '#271c19';

    return (
      <div 
        style={{ backgroundColor: bgColor, color: textColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-amber-900/20 select-none`}
      >
        {/* Header */}
        <div className={`bg-amber-900 text-amber-50 ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-amber-800 shadow-xl flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-serif' : 'text-[6.5px] font-serif'} italic text-amber-200 block ${textAlignClass} ${transformClass}`}>
            {rName} Coffee House
          </span>
          <h3 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-serif font-black' : 'text-[11px] font-serif font-black'} ${transformClass} ${headerTitleTracking} text-white leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'COFFEE & BAKERY'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs font-serif' : 'text-[6px] font-serif'} text-amber-100/90 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        {/* Hero Coffee Image */}
        <div 
          onClick={(e) => handleItemClick(e, cafeDrinks[0])}
          className={`relative rounded-2xl overflow-hidden aspect-[16/7] border border-amber-800/30 shadow-2xl bg-white p-1 cursor-pointer group/hero hover:ring-2 hover:ring-amber-700 transition-all shrink-0`}
        >
          <img src={cardHeroImg || cafeDrinks[0]?.image || coffeeImg} alt="Coffee" onError={(e) => handleImageError(e, coffeeImg)} className="w-full h-full object-cover rounded-xl group-hover/hero:scale-105 transition-transform duration-300" />
          <span className={`absolute bottom-2 right-2 bg-amber-900 text-amber-100 ${isLarge ? 'text-xs px-2.5 py-1' : 'text-[5.5px] px-1 py-0.5'} font-serif rounded shadow font-bold`}>
            FRESHLY BREWED
          </span>
        </div>

        {/* Menu Items */}
        <div className={`space-y-2 bg-amber-100/90 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-amber-800/20 flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-serif font-bold' : 'text-[6.5px] font-serif font-bold'} uppercase text-amber-900 border-b border-amber-800/20 pb-1 block tracking-wider`}>
            SPECIALTY COFFEE & BEVERAGES
          </span>
          {cafeDrinks.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-amber-200 cursor-pointer transition-colors`}
            >
              <span className="text-zinc-900 flex items-center gap-1.5">
                {i === 0 ? '☕' : '🍵'} {dish.name}
              </span>
              <span className="font-mono text-amber-950 font-black shrink-0 bg-amber-200 px-1.5 py-0.5 rounded border border-amber-400/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-serif font-bold pt-2' : 'text-[6.5px] font-serif font-bold mt-1'} uppercase text-amber-900 border-b border-amber-800/20 pb-1 block tracking-wider`}>
            ARTISAN BAKERY & BREAKFAST
          </span>
          {cafePastries.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-amber-200 cursor-pointer transition-colors`}
            >
              <span className="text-zinc-900 flex items-center gap-1.5">
                {i === 0 ? '🥐' : '🥑'} {dish.name}
              </span>
              <span className="font-mono text-amber-950 font-black shrink-0 bg-amber-200 px-1.5 py-0.5 rounded border border-amber-400/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-amber-950 font-mono font-bold border-t border-amber-900/20 flex justify-between items-center px-2`}>
          <span>VISIT US • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 5. OCEAN SEAFOOD CATCH POSTER (Ocean-Breeze)
  if (layout === 'ocean-breeze') {
    let seafoodMains: any[] = [
      { id: 's1', name: 'Maine Lobster Roll', price: 28.00, description: 'Fresh Maine lobster on brioche roll.', category: 'Seafood', image: seafoodImg, isChefSpecial: true },
      { id: 's2', name: 'Pan-Seared Atlantic Salmon', price: 24.50, description: 'Crispy Atlantic salmon over asparagus risotto.', category: 'Seafood', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80', isPopular: true },
      { id: 's5', name: 'Grilled King Sea Bass', price: 26.00, description: 'Charred lemon & Mediterranean herbs.', category: 'Seafood', image: seafoodImg }
    ];
    let seafoodStarters: any[] = [
      { id: 's3', name: 'Pacific Oysters (6pcs)', price: 16.00, description: 'Fresh shucked Pacific oysters with mignonette.', category: 'Raw Bar', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80' },
      { id: 's4', name: 'Sautéed Tiger Prawns', price: 18.00, description: 'Garlic butter white wine glaze.', category: 'Sides', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80' },
      { id: 's6', name: 'Chilled Coconut Lemonade', price: 6.50, description: 'Fresh coconut water & Meyer lemon.', category: 'Beverage', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('seafood') || (f.category || '').toLowerCase().includes('fish') || (f.category || '').toLowerCase().includes('main'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('raw') || (f.category || '').toLowerCase().includes('starter') || (f.category || '').toLowerCase().includes('drink'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
      if (mains.length > 0) seafoodMains = mains;
      else if (rem.length > 0) seafoodMains = rem.slice(0, 4);
      if (apps.length > 0) seafoodStarters = apps;
      else if (rem.length > 4) seafoodStarters = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      seafoodMains = templateDishes.slice(0, 3);
      seafoodStarters = templateDishes.slice(3, 6);
      if (seafoodStarters.length === 0) seafoodStarters = templateDishes.slice(1, 4);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#062038';
    const isLight = checkIsLightBg(bgColor);
    const mainTextColor = customTextColor || (isLight ? '#022c22' : '#ffffff');
    const headerBgClass = isLight ? 'bg-white/90 border-emerald-600/40 text-[#022c22]' : 'bg-sky-950/90 border-sky-400/50 text-white';
    const panelBgClass = isLight ? 'bg-emerald-50/90 border-emerald-600/30 text-[#022c22]' : 'bg-sky-950/80 border-sky-400/30 text-white';
    const priceBgClass = isLight ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-sky-900 text-amber-300 border-sky-400/40';

    return (
      <div 
        style={{ backgroundColor: bgColor, color: mainTextColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-sky-900 select-none`}
      >
        {/* Header */}
        <div className={`${headerBgClass} ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} shadow-xl flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[6.5px] font-mono'} font-bold ${isLight ? 'text-emerald-800' : 'text-sky-300'} ${transformClass} block ${textAlignClass}`}>
            {rName} OCEAN
          </span>
          <h3 
            style={{ fontFamily: brandFont?.family, color: mainTextColor, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'FRESH SEAFOOD CATCH'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs' : 'text-[6px]'} ${isLight ? 'text-emerald-700' : 'text-sky-200'} block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        {/* Hero Photo */}
        <div 
          onClick={(e) => handleItemClick(e, seafoodMains[0])}
          className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-sky-400/40 shadow-2xl cursor-pointer group/hero hover:ring-2 hover:ring-sky-400 transition-all shrink-0 bg-zinc-900`}
        >
          <img src={cardHeroImg || seafoodMains[0]?.image || seafoodImg} alt="Seafood" onError={(e) => handleImageError(e, seafoodImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
          <div className="absolute bottom-2 left-3 text-white">
            <h4 className={`${isLarge ? 'text-base font-black' : 'text-[9px] font-bold'} uppercase text-amber-300 drop-shadow-md`}>
              {seafoodMains[0]?.name || 'Maine Lobster Roll'}
            </h4>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`space-y-2 ${panelBgClass} ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-black' : 'text-[6.5px] font-bold'} uppercase ${isLight ? 'text-emerald-900 border-emerald-600/40' : 'text-sky-300 border-sky-400/30'} border-b pb-1 block tracking-wider`}>
            OCEAN MAINS & GRILL
          </span>
          {seafoodMains.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-emerald-500/10 cursor-pointer transition-colors`}
            >
              <span className="truncate flex items-center gap-1.5" style={{ color: mainTextColor }}>
                {i === 0 ? '🦞' : '🐟'} {dish.name}
              </span>
              <span className={`font-mono font-bold shrink-0 ${priceBgClass} px-1.5 py-0.5 rounded border`}>
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-black pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase ${isLight ? 'text-emerald-900 border-emerald-600/40' : 'text-sky-300 border-sky-400/30'} border-b pb-1 block tracking-wider`}>
            RAW BAR, SIDES & DRINKS
          </span>
          {seafoodStarters.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-emerald-500/10 cursor-pointer transition-colors`}
            >
              <span className="truncate flex items-center gap-1.5" style={{ color: mainTextColor }}>
                {i === 0 ? '🦪' : '🦐'} {dish.name}
              </span>
              <span className={`font-mono font-bold shrink-0 ${priceBgClass} px-1.5 py-0.5 rounded border`}>
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-sky-200 font-mono font-bold border-t border-sky-400/20 flex justify-between items-center px-2`}>
          <span>ORDER ONLINE • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 6. BBQ & STEAKHOUSE POSTER (Scalloped / Smoked Charcoal)
  if (layout === 'scalloped') {
    let steakMains: any[] = [
      { id: 'st1', name: 'Prime Ribeye 14oz', price: 36.00, description: 'USD Prime 28-day dry-aged ribeye.', category: 'Steakhouse', image: steakImg, isChefSpecial: true },
      { id: 'st2', name: 'BBQ Baby Back Pork Ribs', price: 26.00, description: 'Hickory smoked slow-roasted ribs.', category: 'Steakhouse', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', isPopular: true },
      { id: 'st5', name: 'Smoked Beef Brisket Platter', price: 28.00, description: '12-hour oak smoked Texas brisket.', category: 'Steakhouse', image: steakImg }
    ];
    let steakSides: any[] = [
      { id: 'st3', name: 'Beer-Battered Onion Rings', price: 8.00, description: 'Thick cut onion rings with paprika aioli.', category: 'Sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=400&q=80' },
      { id: 'st4', name: 'Loaded Garlic Potato Wedges', price: 7.50, description: 'Crispy wedges with bacon bits & cheddar.', category: 'Sides', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80' },
      { id: 'st6', name: 'Aged Bourbon Old Fashioned', price: 12.00, description: 'Small batch bourbon & bitters.', category: 'Beverage', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('steak') || (f.category || '').toLowerCase().includes('bbq') || (f.category || '').toLowerCase().includes('main'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('side') || (f.category || '').toLowerCase().includes('starter') || (f.category || '').toLowerCase().includes('drink'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
      if (mains.length > 0) steakMains = mains;
      else if (rem.length > 0) steakMains = rem.slice(0, 4);
      if (apps.length > 0) steakSides = apps;
      else if (rem.length > 4) steakSides = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      steakMains = templateDishes.slice(0, 3);
      steakSides = templateDishes.slice(3, 6);
      if (steakSides.length === 0) steakSides = templateDishes.slice(1, 4);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#1a0e0a';

    return (
      <div 
        style={{ backgroundColor: bgColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full text-white ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-amber-950 select-none`}
      >
        {/* Header */}
        <div className={`bg-zinc-950/90 ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-amber-800/50 shadow-xl flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[6.5px] font-mono'} font-bold text-amber-400 ${transformClass} block ${textAlignClass}`}>
            {rName} GRILL
          </span>
          <h3 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} text-white leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'PRIME STEAKHOUSE'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs font-mono' : 'text-[6px] font-mono'} text-amber-300/90 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        {/* Hero Photo */}
        <div 
          onClick={(e) => handleItemClick(e, steakMains[0])}
          className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-amber-700/50 shadow-2xl cursor-pointer group/hero hover:ring-2 hover:ring-amber-500 transition-all shrink-0 bg-zinc-900`}
        >
          <img src={cardHeroImg || steakMains[0]?.image || steakImg} alt="Steak" onError={(e) => handleImageError(e, steakImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
          <span className={`absolute top-2 left-2 bg-amber-600 text-slate-950 ${isLarge ? 'text-xs px-2.5 py-1' : 'text-[5.5px] px-1.5 py-0.5'} font-black uppercase rounded shadow`}>
            SMOKED & GRILLED
          </span>
          <div className="absolute bottom-2 left-3 text-white">
            <h4 className={`${isLarge ? 'text-base font-black' : 'text-[9px] font-bold'} uppercase text-amber-300`}>
              {steakMains[0]?.name || 'Prime Ribeye 14oz'}
            </h4>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`space-y-2 bg-black/70 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-amber-900/40 flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-black' : 'text-[6.5px] font-bold'} uppercase text-amber-400 border-b border-amber-900/40 pb-1 block tracking-wider`}>
            STEAKS & SMOKED RIBS
          </span>
          {steakMains.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
            >
              <span className="text-amber-100 truncate flex items-center gap-1.5">
                {i === 0 ? '🥩' : '🍖'} {dish.name}
              </span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-amber-900/60 px-1.5 py-0.5 rounded border border-amber-500/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-black pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase text-amber-400 border-b border-amber-900/40 pb-1 block tracking-wider`}>
            STARTERS, SIDES & DRINKS
          </span>
          {steakSides.map((dish, i) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
            >
              <span className="text-amber-100 truncate flex items-center gap-1.5">
                {i === 0 ? '🧅' : '🥔'} {dish.name}
              </span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-amber-900/60 px-1.5 py-0.5 rounded border border-amber-500/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-amber-300 font-mono font-bold border-t border-white/20 flex justify-between items-center px-2`}>
          <span>RESERVATIONS • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 7. ROYAL CRIMSON FINE DINING POSTER
  if (layout === 'royal-crimson') {
    let fineMains: any[] = [
      { id: 'f1', name: 'Wagyu Filet Mignon A5', price: 48.00, description: 'Japanese A5 Wagyu with truffle puree.', category: 'Fine Dining', image: fineImg, isChefSpecial: true },
      { id: 'f2', name: 'Crispy Duck Confit', price: 38.00, description: 'Slow-cooked duck leg with cherry glaze.', category: 'Fine Dining', image: 'https://images.unsplash.com/photo-1514944288352-18f9e04f79b8?auto=format&fit=crop&w=400&q=80', isPopular: true },
      { id: 'f5', name: 'Wild Chanterelle Truffle Risotto', price: 32.00, description: 'Carnaroli rice with aged parmesan & truffle.', category: 'Fine Dining', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=400&q=80' }
    ];
    let fineDesserts: any[] = [
      { id: 'f3', name: 'Dark Chocolate Fondant', price: 16.00, description: 'Valrhona chocolate with Madagascar vanilla.', category: 'Dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80' },
      { id: 'f4', name: 'Sommelier Grand Cru Pairing', price: 25.00, description: 'Vintage red & white wine pairing.', category: 'Wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('fine') || (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('chef'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('dessert') || (f.category || '').toLowerCase().includes('wine') || (f.category || '').toLowerCase().includes('starter'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
      if (mains.length > 0) fineMains = mains;
      else if (rem.length > 0) fineMains = rem.slice(0, 4);
      if (apps.length > 0) fineDesserts = apps;
      else if (rem.length > 4) fineDesserts = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      fineMains = templateDishes.slice(0, 3);
      fineDesserts = templateDishes.slice(3, 5);
      if (fineDesserts.length === 0) fineDesserts = templateDishes.slice(1, 3);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#3a0606';

    return (
      <div 
        style={{ backgroundColor: bgColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full text-white ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-amber-500/40 select-none`}
      >
        {/* Header */}
        <div className={`space-y-2 bg-red-950/80 ${isLarge ? 'p-4 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-amber-400/50 shadow-xl flex flex-col ${alignClass}`}>
          <div className={`${isLarge ? 'w-16 h-16 border-2' : 'w-9 h-9 border'} rounded-full border-amber-400 p-0.5 overflow-hidden shadow-xl bg-black`}>
            <img src={cardHeroImg || fineMains[0]?.image || fineImg} alt="Fine Dining" onError={(e) => handleImageError(e, fineImg)} className="w-full h-full object-cover rounded-full" />
          </div>
          <span className={`${isLarge ? 'text-xs font-serif tracking-[0.25em]' : 'text-[6px] font-serif tracking-[0.2em]'} font-black uppercase text-amber-300 block ${textAlignClass} ${transformClass}`}>
            {rName}
          </span>
          <h4 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-serif font-black' : 'text-[10px] font-serif font-black'} ${transformClass} ${headerTitleTracking} text-amber-100 leading-none ${textAlignClass}`}
          >
            {cardHeroTitle || 'ROYAL FINE DINING'}
          </h4>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs font-serif' : 'text-[6px] font-serif'} text-amber-200/80 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        {/* Structured Items */}
        <div className={`space-y-2 bg-black/60 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-amber-400/30 flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-serif font-bold' : 'text-[6.5px] font-serif font-bold'} uppercase text-amber-300 border-b border-amber-400/30 pb-1 block text-center tracking-wider`}>
            CHEF'S SIGNATURE ENTRÉES
          </span>
          {fineMains.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-serif ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-amber-400/20 cursor-pointer transition-colors`}
            >
              <span className="text-amber-100 truncate">{dish.name}</span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-red-900/80 px-1.5 py-0.5 rounded border border-amber-400/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-serif font-bold pt-2' : 'text-[6.5px] font-serif font-bold mt-1'} uppercase text-amber-300 border-b border-amber-400/30 pb-1 block text-center tracking-wider`}>
            FINE DESSERTS & SOMMELIER WINE
          </span>
          {fineDesserts.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-serif ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-amber-400/20 cursor-pointer transition-colors`}
            >
              <span className="text-amber-100 truncate">{dish.name}</span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-red-900/80 px-1.5 py-0.5 rounded border border-amber-400/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-amber-300 font-mono font-bold border-t border-white/20 flex justify-between items-center px-2`}>
          <span>RESERVATIONS • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 8. BOTANICAL EMERALD ORGANIC POSTER
  if (layout === 'emerald-forest') {
    let emeraldDishes: any[] = [
      { id: 'e1', name: 'Avocado Wild Salmon Bowl', price: 16.50, description: 'Fresh Atlantic salmon, Hass avocado & organic brown rice.', category: 'Organic', image: saladImg, isChefSpecial: true },
      { id: 'e2', name: 'Quinoa Power Kale Salad', price: 13.00, description: 'Organic quinoa, kale, roasted chickpeas & tahini.', category: 'Organic', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
      { id: 'e5', name: 'Roasted Sweet Potato Buddha Bowl', price: 14.50, description: 'Tahini lemon dressing, roasted beets & pumpkin seeds.', category: 'Organic', image: saladImg }
    ];
    let emeraldDrinks: any[] = [
      { id: 'e3', name: 'Green Detox Cold-Pressed Juice', price: 7.50, description: 'Spinach, green apple, ginger & coconut water.', category: 'Smoothies', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=400&q=80' },
      { id: 'e4', name: 'Organic Berry Acai Bowl', price: 9.50, description: 'Organic acai, chia seeds & fresh berries.', category: 'Smoothies', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('bowl') || (f.category || '').toLowerCase().includes('salad') || (f.category || '').toLowerCase().includes('organic'));
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('smoothie') || (f.category || '').toLowerCase().includes('juice') || (f.category || '').toLowerCase().includes('drink'));
      const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
      if (mains.length > 0) emeraldDishes = mains;
      else if (rem.length > 0) emeraldDishes = rem.slice(0, 4);
      if (apps.length > 0) emeraldDrinks = apps;
      else if (rem.length > 4) emeraldDrinks = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      emeraldDishes = templateDishes.slice(0, 3);
      emeraldDrinks = templateDishes.slice(3, 5);
      if (emeraldDrinks.length === 0) emeraldDrinks = templateDishes.slice(1, 3);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#02261d';

    return (
      <div 
        style={{ backgroundColor: bgColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full text-white ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-emerald-900 select-none`}
      >
        <div className={`bg-emerald-950/90 ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-emerald-400/50 shadow-xl flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[6.5px] font-mono'} font-bold text-emerald-300 ${transformClass} block font-sans ${textAlignClass}`}>
            🌿 {rName}
          </span>
          <h3 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} text-emerald-100 leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'BOTANICAL ORGANIC'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs font-sans' : 'text-[6px] font-sans'} text-emerald-200 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        <div 
          onClick={(e) => handleItemClick(e, emeraldDishes[0])}
          className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-emerald-400/40 shadow-2xl cursor-pointer group/hero hover:ring-2 hover:ring-emerald-400 transition-all shrink-0 bg-zinc-900`}
        >
          <img src={cardHeroImg || emeraldDishes[0]?.image || saladImg} alt="Salad" onError={(e) => handleImageError(e, saladImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
          <div className="absolute bottom-2 left-3 text-white">
            <h4 className={`${isLarge ? 'text-base font-black' : 'text-[9px] font-bold'} uppercase text-emerald-200`}>
              {emeraldDishes[0]?.name || 'Avocado Salmon Bowl'}
            </h4>
          </div>
        </div>

        <div className={`space-y-2 bg-emerald-950/80 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-emerald-400/30 flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-black' : 'text-[6.5px] font-bold'} uppercase text-emerald-300 border-b border-emerald-400/30 pb-1 block tracking-wider`}>
            ORGANIC SIGNATURE BOWLS
          </span>
          {emeraldDishes.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-emerald-500/20 cursor-pointer transition-colors`}
            >
              <span className="text-emerald-100 truncate flex items-center gap-1.5">🥑 {dish.name}</span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-emerald-900 px-1.5 py-0.5 rounded border border-emerald-400/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-black pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase text-emerald-300 border-b border-emerald-400/30 pb-1 block tracking-wider`}>
            DETOX SMOOTHIES & ACAI
          </span>
          {emeraldDrinks.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-emerald-500/20 cursor-pointer transition-colors`}
            >
              <span className="text-emerald-100 truncate flex items-center gap-1.5">🥤 {dish.name}</span>
              <span className="font-mono text-amber-300 font-bold shrink-0 bg-emerald-900 px-1.5 py-0.5 rounded border border-emerald-400/40">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-emerald-300 font-mono font-bold border-t border-emerald-400/20 flex justify-between items-center px-2`}>
          <span>EAT CLEAN • {webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 9. MINIMALIST IVORY / ALABASTER POSTER
  if (layout === 'minimalist-ivory') {
    let minimalMains: any[] = [
      { id: 'm1', name: 'Truffle Egg Benedict', price: 15.00, description: 'Poached eggs, black truffle & hollandaise on brioche.', category: 'Brunch', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', isChefSpecial: true },
      { id: 'm2', name: 'Smoked Salmon Toast', price: 14.50, description: 'Norwegian salmon, dill cream cheese & capers.', category: 'Brunch', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80' }
    ];
    let minimalDrinks: any[] = [
      { id: 'm3', name: 'Specialty Cold Brew Coffee', price: 5.00, description: 'Slow-steeped single origin cold brew.', category: 'Drinks', image: coffeeImg },
      { id: 'm4', name: 'Fresh Cold-Pressed Orange Juice', price: 4.50, description: '100% cold pressed Valencia orange juice.', category: 'Drinks', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('brunch') || (f.category || '').toLowerCase().includes('main'));
      const drinks = customFoods.filter(f => (f.category || '').toLowerCase().includes('drink') || (f.category || '').toLowerCase().includes('coffee'));
      const rem = customFoods.filter(f => !mains.includes(f) && !drinks.includes(f));
      if (mains.length > 0) minimalMains = mains;
      else if (rem.length > 0) minimalMains = rem.slice(0, 4);
      if (drinks.length > 0) minimalDrinks = drinks;
      else if (rem.length > 4) minimalDrinks = rem.slice(4, 8);
    } else if (templateDishes && templateDishes.length > 0) {
      minimalMains = templateDishes.slice(0, 2);
      minimalDrinks = templateDishes.slice(2, 4);
      if (minimalDrinks.length === 0) minimalDrinks = templateDishes.slice(1, 3);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#fcfbf7';
    const textColor = customTextColor || temp?.style?.textColor || '#18181b';

    return (
      <div 
        style={{ backgroundColor: bgColor, color: textColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-zinc-200 select-none`}
      >
        <div className={`bg-zinc-900 text-white ${isLarge ? 'p-3 rounded-2xl' : 'p-1.5 rounded-xl'} shadow-xl flex flex-col ${alignClass}`}>
          <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[6.5px] font-mono'} font-bold ${transformClass} text-zinc-400 block ${textAlignClass}`}>{rName}</span>
          <h3 
            style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
            className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} leading-tight ${textAlignClass}`}
          >
            {cardHeroTitle || 'MINIMALIST BRUNCH'}
          </h3>
          {cardTagline && (
            <span className={`${isLarge ? 'text-xs font-mono' : 'text-[6px] font-mono'} text-zinc-300 block ${textAlignClass} ${transformClass}`}>
              {cardTagline}
            </span>
          )}
        </div>

        <div 
          onClick={(e) => handleItemClick(e, minimalMains[0])}
          className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-zinc-200 shadow-xl bg-white cursor-pointer group/hero hover:ring-2 hover:ring-zinc-900 transition-all shrink-0`}
        >
          <img src={cardHeroImg || minimalMains[0]?.image || coffeeImg} alt="Brunch" onError={(e) => handleImageError(e, coffeeImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
        </div>

        <div className={`space-y-2 bg-white ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-zinc-200 shadow-sm flex-1 flex flex-col justify-center`}>
          <span className={`${isLarge ? 'text-xs font-bold' : 'text-[6.5px] font-bold'} uppercase text-zinc-900 border-b border-zinc-200 pb-1 block tracking-wider`}>
            BRUNCH SPECIALS
          </span>
          {minimalMains.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-zinc-100 cursor-pointer transition-colors`}
            >
              <span className="text-zinc-800 truncate">{dish.name}</span>
              <span className="font-mono text-zinc-900 font-black shrink-0 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-300">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}

          <span className={`${isLarge ? 'text-xs font-bold pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase text-zinc-900 border-b border-zinc-200 pb-1 block tracking-wider`}>
            BEVERAGES & JUICES
          </span>
          {minimalDrinks.map((dish) => (
            <div 
              key={dish.id} 
              onClick={(e) => handleItemClick(e, dish)}
              className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-zinc-100 cursor-pointer transition-colors`}
            >
              <span className="text-zinc-800 truncate">{dish.name}</span>
              <span className="font-mono text-zinc-900 font-black shrink-0 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-300">
                ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-zinc-800 font-mono font-bold border-t border-zinc-200 flex justify-between items-center px-2`}>
          <span>{webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 11. LUXURY SLATE / NAVY EDITORIAL MENU POSTER (Exact replica of User Reference Image 1)
  if (layout === 'luxury-navy') {
    let appetizers: any[] = [
      { id: 'ln_a1', name: 'Caesar Salad', price: 10, description: 'Crisp romaine lettuce with parmesan cheese & croutons.' },
      { id: 'ln_a2', name: 'Creamy Mushroom Soup', price: 10, description: 'Smooth and rich mushroom soup with cream.' },
      { id: 'ln_a3', name: 'Smoked Salmon Bruschetta', price: 10, description: 'Toasted bread topped with smoked salmon & herbs.' },
      { id: 'ln_a4', name: 'Caprese Salad', price: 10, description: 'Fresh tomatoes, mozzarella cheese & basil.' }
    ];
    let mainCourse: any[] = [
      { id: 'ln_m1', name: 'Grilled Beef Steak', price: 10, description: 'Juicy grilled beef steak with vegetables.' },
      { id: 'ln_m2', name: 'Herb Roasted Chicken', price: 10, description: 'Tender roasted chicken with aromatic herbs.' },
      { id: 'ln_m3', name: 'Pan-Seared Salmon', price: 10, description: 'Seared salmon with a delicate finish.' },
      { id: 'ln_m4', name: 'Truffle Pasta', price: 10, description: 'Creamy pasta infused with rich truffle flavor.' }
    ];
    let desserts: any[] = [
      { id: 'ln_d1', name: 'Chocolate Lava Cake', price: 5 },
      { id: 'ln_d2', name: 'Cheesecake', price: 5 },
      { id: 'ln_d3', name: 'Panna Cotta', price: 5 },
      { id: 'ln_d4', name: 'Fruit Tart', price: 5 }
    ];
    let beverages: any[] = [
      { id: 'ln_b1', name: 'Sparkling Water', price: 5 },
      { id: 'ln_b2', name: 'Fresh Juice', price: 5 },
      { id: 'ln_b3', name: 'Premium Tea', price: 5 },
      { id: 'ln_b4', name: 'Signature Coffee', price: 5 }
    ];

    if (customFoods && customFoods.length > 0) {
      const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('appetizer') || (f.category || '').toLowerCase().includes('salad') || (f.category || '').toLowerCase().includes('soup'));
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('steak') || (f.category || '').toLowerCase().includes('pasta'));
      const des = customFoods.filter(f => (f.category || '').toLowerCase().includes('dessert') || (f.category || '').toLowerCase().includes('cake') || (f.category || '').toLowerCase().includes('sweet'));
      const drinks = customFoods.filter(f => (f.category || '').toLowerCase().includes('beverage') || (f.category || '').toLowerCase().includes('drink') || (f.category || '').toLowerCase().includes('coffee') || (f.category || '').toLowerCase().includes('water'));
      const rem = customFoods.filter(f => !apps.includes(f) && !mains.includes(f) && !des.includes(f) && !drinks.includes(f));
      
      if (apps.length > 0) appetizers = apps; else if (rem.length > 0) appetizers = rem.slice(0, 4);
      if (mains.length > 0) mainCourse = mains; else if (rem.length > 4) mainCourse = rem.slice(4, 8);
      if (des.length > 0) desserts = des; else if (rem.length > 8) desserts = rem.slice(8, 12);
      if (drinks.length > 0) beverages = drinks; else if (rem.length > 12) beverages = rem.slice(12, 16);
    } else if (templateDishes && templateDishes.length > 0) {
      appetizers = templateDishes.slice(0, 4);
      mainCourse = templateDishes.slice(4, 8);
      desserts = templateDishes.slice(8, 12);
      beverages = templateDishes.slice(12, 16);
      if (mainCourse.length === 0) mainCourse = templateDishes.slice(0, 4);
      if (desserts.length === 0) desserts = templateDishes.slice(1, 4);
      if (beverages.length === 0) beverages = templateDishes.slice(2, 5);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#0c1622';
    const textColor = customTextColor || temp?.style?.textColor || '#ffffff';

    return (
      <div 
        style={{ backgroundColor: bgColor, color: textColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full ${isLarge ? 'p-8 rounded-3xl min-h-[720px] space-y-6' : 'p-2.5 rounded-xl space-y-2'} overflow-hidden shadow-2xl border border-slate-800 select-none font-serif`}
      >
        {/* Subtle Wave Watermark Line Accents in Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M -100 100 Q 200 400 500 100 T 1100 200" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <path d="M -100 150 Q 200 450 500 150 T 1100 250" fill="none" stroke="#ffffff" strokeWidth="1" />
          <path d="M -100 600 Q 300 800 700 500 T 1200 700" fill="none" stroke="#38bdf8" strokeWidth="2" />
        </svg>

        {/* Top Header */}
        <div className={`relative z-10 flex flex-col ${alignClass}`}>
          <div className="w-full flex justify-between items-center text-[7px] sm:text-xs tracking-wider border-b border-slate-700/60 pb-1">
            <span className="italic opacity-80">{cardTagline || 'Where Every Dish Tells a Story'}</span>
            <span className={`font-sans font-bold flex items-center gap-1 ${transformClass} tracking-widest text-sky-300`}>
              {rName} <span className="text-emerald-400">❇️</span>
            </span>
          </div>
          <h1 
            style={{ fontFamily: brandFont?.family || 'serif', ...titleSizeStyle }} 
            className={`${textAlignClass} font-serif ${transformClass} ${headerTitleTracking} text-white font-extrabold ${isLarge ? 'text-4xl my-3' : 'text-xl my-1'}`}
          >
            {cardHeroTitle || 'MENU'}
          </h1>
        </div>

        {/* Section 1: APPETIZER */}
        <div className="relative z-10 space-y-1">
          <h3 className={`font-serif uppercase tracking-wider text-sky-200 border-b border-slate-700/80 pb-0.5 font-bold ${isLarge ? 'text-sm mb-2' : 'text-[8px] mb-1'}`}>
            APPETIZER
          </h3>
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* 2 Photos side-by-side */}
            <div className="grid grid-cols-2 gap-1">
              <div className="aspect-[4/3] rounded border-2 border-white/80 overflow-hidden shadow-md">
                <img src={saladImg} alt="Appetizer" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded border-2 border-white/80 overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" alt="Appetizer" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Menu items */}
            <div className={isLarge ? 'space-y-2' : 'space-y-0.5'}>
              {appetizers.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="cursor-pointer hover:text-sky-300 transition-colors">
                  <div className="flex justify-between items-baseline font-sans font-bold text-[7px] sm:text-xs">
                    <span className="uppercase text-white truncate mr-1">{dish.name}</span>
                    <span className="border-b border-dotted border-slate-500 flex-1 mx-1 opacity-40"></span>
                    <span className="font-mono text-sky-300 shrink-0">${typeof dish.price === 'number' ? dish.price : dish.price}</span>
                  </div>
                  {dish.description && (
                    <p className="text-[5.5px] sm:text-[10px] text-slate-300 line-clamp-1 leading-tight font-sans font-normal opacity-80">
                      {dish.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: MAIN COURSE */}
        <div className="relative z-10 space-y-1">
          <h3 className={`font-serif uppercase tracking-wider text-sky-200 border-b border-slate-700/80 pb-0.5 font-bold text-right ${isLarge ? 'text-sm mb-2' : 'text-[8px] mb-1'}`}>
            MAIN COURSE
          </h3>
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* Menu items */}
            <div className={isLarge ? 'space-y-2' : 'space-y-0.5'}>
              {mainCourse.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="cursor-pointer hover:text-sky-300 transition-colors">
                  <div className="flex justify-between items-baseline font-sans font-bold text-[7px] sm:text-xs">
                    <span className="uppercase text-white truncate mr-1">{dish.name}</span>
                    <span className="border-b border-dotted border-slate-500 flex-1 mx-1 opacity-40"></span>
                    <span className="font-mono text-sky-300 shrink-0">${typeof dish.price === 'number' ? dish.price : dish.price}</span>
                  </div>
                  {dish.description && (
                    <p className="text-[5.5px] sm:text-[10px] text-slate-300 line-clamp-1 leading-tight font-sans font-normal opacity-80">
                      {dish.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/* 2 Photos side-by-side */}
            <div className="grid grid-cols-2 gap-1">
              <div className="aspect-[4/3] rounded border-2 border-white/80 overflow-hidden shadow-md">
                <img src={fineImg} alt="Main" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded border-2 border-white/80 overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80" alt="Main" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: DESSERT & BEVERAGES (Bottom split) */}
        <div className="relative z-10 grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
          {/* Dessert */}
          <div>
            <h4 className={`font-serif uppercase tracking-wider text-sky-200 border-b border-slate-700/80 pb-0.5 font-bold ${isLarge ? 'text-xs mb-1.5' : 'text-[7.5px] mb-1'}`}>
              DESSERT
            </h4>
            <div className="flex gap-1.5 items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded border-2 border-white/80 overflow-hidden shrink-0 shadow-md">
                <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80" alt="Dessert" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-0.5">
                {desserts.map(dish => (
                  <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="flex justify-between items-center text-[6px] sm:text-[11px] font-sans font-bold hover:text-sky-300 cursor-pointer">
                    <span className="uppercase truncate text-slate-200">{dish.name}</span>
                    <span className="font-mono text-sky-300 ml-1">${dish.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Beverages */}
          <div>
            <h4 className={`font-serif uppercase tracking-wider text-sky-200 border-b border-slate-700/80 pb-0.5 font-bold text-right ${isLarge ? 'text-xs mb-1.5' : 'text-[7.5px] mb-1'}`}>
              BEVERAGES
            </h4>
            <div className="flex gap-1.5 items-center">
              <div className="flex-1 space-y-0.5">
                {beverages.map(dish => (
                  <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="flex justify-between items-center text-[6px] sm:text-[11px] font-sans font-bold hover:text-sky-300 cursor-pointer">
                    <span className="uppercase truncate text-slate-200">{dish.name}</span>
                    <span className="font-mono text-sky-300 ml-1">${dish.price}</span>
                  </div>
                ))}
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded border-2 border-white/80 overflow-hidden shrink-0 shadow-md">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80" alt="Beverage" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center text-[6px] sm:text-xs font-mono font-bold text-slate-400 border-t border-slate-800 pt-1 flex justify-between">
          <span>{webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 12. ROASTED LEATHER & STEAKHOUSE POSTER (Exact replica of User Reference Image 2)
  if (layout === 'roasted-gold') {
    let mainCourse: any[] = [
      { id: 'rg_m1', name: 'Grilled Salmon', price: 12, description: 'Soy sauce & brown sugar marinade with hints of lemon.' },
      { id: 'rg_m2', name: 'Roast Beef', price: 14, description: 'Roast beef dish served as a main course with gravy.' },
      { id: 'rg_m3', name: 'Chicken Mushroom Pie', price: 11, description: 'Savory British savory pie with cream & herbs.' },
      { id: 'rg_m4', name: 'Marrakesh Curry', price: 11, description: 'Marrakech vegetable curry loaded with beans & spices.' }
    ];
    let desserts: any[] = [
      { id: 'rg_d1', name: 'Apple Pie with Cream', price: 7, description: 'German style apple cream pie with cinnamon.' },
      { id: 'rg_d2', name: 'Lemon Meringue Pie', price: 7, description: 'Shortbread pie filled with lemon curd.' },
      { id: 'rg_d3', name: 'Vanilla Ice Cream', price: 5, description: 'Made from fresh milk, cream & vanilla bean.' },
      { id: 'rg_d4', name: 'Crepe Suzette', price: 6, description: 'French crepe with beurre suzette orange glaze.' }
    ];
    let beverages: any[] = [
      { id: 'rg_b1', name: 'Cappuccino', price: 3, description: 'Rich espresso with frothed milk.' },
      { id: 'rg_b2', name: 'Fruit Juice', price: 3, description: 'Freshly squeezed whole fruit juice.' },
      { id: 'rg_b3', name: 'Lemonade', price: 4, description: 'Fresh lemon juice, sugar & sparkling water.' }
    ];

    if (customFoods && customFoods.length > 0) {
      const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('steak') || (f.category || '').toLowerCase().includes('roast'));
      const des = customFoods.filter(f => (f.category || '').toLowerCase().includes('dessert') || (f.category || '').toLowerCase().includes('pie') || (f.category || '').toLowerCase().includes('sweet'));
      const drinks = customFoods.filter(f => (f.category || '').toLowerCase().includes('beverage') || (f.category || '').toLowerCase().includes('drink') || (f.category || '').toLowerCase().includes('coffee'));
      const rem = customFoods.filter(f => !mains.includes(f) && !des.includes(f) && !drinks.includes(f));

      if (mains.length > 0) mainCourse = mains; else if (rem.length > 0) mainCourse = rem.slice(0, 4);
      if (des.length > 0) desserts = des; else if (rem.length > 4) desserts = rem.slice(4, 8);
      if (drinks.length > 0) beverages = drinks; else if (rem.length > 8) beverages = rem.slice(8, 12);
    } else if (templateDishes && templateDishes.length > 0) {
      mainCourse = templateDishes.slice(0, 4);
      desserts = templateDishes.slice(4, 8);
      beverages = templateDishes.slice(8, 11);
      if (desserts.length === 0) desserts = templateDishes.slice(1, 4);
      if (beverages.length === 0) beverages = templateDishes.slice(2, 5);
    }

    const bgColor = customBgColor || temp?.style?.backgroundColor || '#33200b';

    return (
      <div 
        style={{ backgroundColor: bgColor }} 
        className={`flex-1 flex flex-col justify-between relative z-10 h-full text-amber-100 ${isLarge ? 'p-8 rounded-3xl min-h-[720px] space-y-6' : 'p-2.5 rounded-xl space-y-1.5'} overflow-hidden shadow-2xl border border-amber-800/80 select-none`}
      >
        {/* Floating Corner Food Cutout Elements */}
        {/* Top-Left Smoked Ribs Cutout */}
        <div className={`absolute top-0 left-0 ${isLarge ? 'w-28 h-20' : 'w-14 h-10'} -translate-x-3 -translate-y-2 pointer-events-none z-20 drop-shadow-xl`}>
          <img src={cardHeroImg || steakImg} alt="Ribs" className="w-full h-full object-cover rounded-br-2xl border-b-2 border-r-2 border-amber-500/40" />
        </div>
        {/* Top-Right Parsley Sprig */}
        <div className={`absolute top-2 right-2 ${isLarge ? 'text-3xl' : 'text-base'} pointer-events-none z-20`}>
          🌿
        </div>
        {/* Bottom-Left Tomato Slice */}
        <div className={`absolute bottom-3 left-2 ${isLarge ? 'text-2xl' : 'text-sm'} pointer-events-none z-20`}>
          🍅
        </div>
        {/* Bottom-Right Steak Platter */}
        <div className={`absolute bottom-0 right-0 ${isLarge ? 'w-44 h-32' : 'w-20 h-14'} translate-x-2 translate-y-2 pointer-events-none z-20 drop-shadow-2xl`}>
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" alt="Steak Platter" className="w-full h-full object-cover rounded-tl-3xl border-t-2 border-l-2 border-amber-500/60" />
        </div>

        {/* Header */}
        <div className={`relative z-10 mt-1 flex flex-col ${alignClass}`}>
          <span className={`uppercase font-sans font-bold tracking-widest text-amber-300 block ${textAlignClass} ${isLarge ? 'text-xs' : 'text-[6.5px]'}`}>
            RESTAURANT
          </span>
          <h1 
            style={{ fontFamily: brandFont?.family || 'serif', ...titleSizeStyle }} 
            className={`font-black ${transformClass} ${headerTitleTracking} text-white leading-none ${textAlignClass} ${isLarge ? 'text-4xl my-1' : 'text-2xl'}`}
          >
            {cardHeroTitle || 'MENU'}
          </h1>
          <div className="w-24 h-0.5 bg-amber-400 my-1" />
          <p className={`font-serif italic text-amber-200/90 ${textAlignClass} ${transformClass} ${isLarge ? 'text-sm' : 'text-[7.5px]'}`}>
            {cardTagline || `Recommended & Best Quality Restaurant • ${rName}`}
          </p>
        </div>

        {/* 2-Column Split: MAIN COURSE vs DESSERT */}
        <div className="grid grid-cols-2 gap-3 relative z-10 flex-1 items-start my-1">
          {/* Column 1: MAIN COURSE */}
          <div className="space-y-1 pr-2 border-r border-amber-700/60">
            <h3 className={`font-black uppercase tracking-wider text-amber-300 border-b border-amber-600/50 pb-0.5 ${isLarge ? 'text-sm mb-2' : 'text-[8px] mb-1'}`}>
              MAIN COURSE
            </h3>
            <div className={isLarge ? 'space-y-3' : 'space-y-1'}>
              {mainCourse.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="cursor-pointer hover:text-amber-200 transition-colors">
                  <div className="flex justify-between items-baseline font-bold text-[7px] sm:text-xs">
                    <span className="uppercase text-amber-100 truncate mr-1">{dish.name}</span>
                    <span className="font-mono text-amber-300 font-extrabold shrink-0">${dish.price}</span>
                  </div>
                  {dish.description && (
                    <p className="text-[5.5px] sm:text-[9.5px] text-amber-200/80 line-clamp-2 leading-tight font-sans">
                      {dish.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: DESSERT */}
          <div className="space-y-1 pl-1">
            <h3 className={`font-black uppercase tracking-wider text-amber-300 border-b border-amber-600/50 pb-0.5 ${isLarge ? 'text-sm mb-2' : 'text-[8px] mb-1'}`}>
              DESSERT
            </h3>
            <div className={isLarge ? 'space-y-3' : 'space-y-1'}>
              {desserts.map(dish => (
                <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="cursor-pointer hover:text-amber-200 transition-colors">
                  <div className="flex justify-between items-baseline font-bold text-[7px] sm:text-xs">
                    <span className="uppercase text-amber-100 truncate mr-1">{dish.name}</span>
                    <span className="font-mono text-amber-300 font-extrabold shrink-0">${dish.price}</span>
                  </div>
                  {dish.description && (
                    <p className="text-[5.5px] sm:text-[9.5px] text-amber-200/80 line-clamp-2 leading-tight font-sans">
                      {dish.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BEVERAGES Section (Centered Bottom) */}
        <div className="relative z-10 pt-1 border-t border-amber-700/60 text-center max-w-[85%] mx-auto w-full">
          <h4 className={`font-black uppercase tracking-widest text-amber-300 ${isLarge ? 'text-xs mb-2' : 'text-[7.5px] mb-1'}`}>
            BEVERAGES
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {beverages.map(dish => (
              <div key={dish.id} onClick={(e) => handleItemClick(e, dish)} className="flex justify-between items-center text-[6px] sm:text-[11px] font-bold hover:text-amber-200 cursor-pointer">
                <span className="uppercase truncate text-amber-100">{dish.name}</span>
                <span className="font-mono text-amber-300 font-extrabold ml-1">${dish.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center text-[6px] sm:text-xs font-mono font-bold text-amber-400 border-t border-amber-800/60 pt-1 flex justify-between px-1">
          <span>{webSiteUrl}</span>
          <span>{contactPhone}</span>
        </div>
      </div>
    );
  }

  // 10. LUXURY GOLD & BLACK BISTRO POSTER (Circle-Gold / Default Fallback)
  let defaultMains: any[] = [
    { id: 'd1', name: 'Carne de Sol Special', price: 17.00, description: 'Sun-dried cured beef with fried cassava.', category: 'Specials', image: saladImg, isChefSpecial: true },
    { id: 'd2', name: 'Milanesa Cutlet', price: 15.50, description: 'Crispy breaded veal cutlet with fries.', category: 'Specials', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80', isPopular: true },
    { id: 'd5', name: 'Gourmet Grilled Pork Loin', price: 19.00, description: 'Herb roasted with garlic butter sauce.', category: 'Specials', image: steakImg }
  ];
  let defaultSides: any[] = [
    { id: 'd3', name: 'Chicken Karaage', price: 12.50, description: 'Japanese crispy ginger fried chicken.', category: 'Starters', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80' },
    { id: 'd4', name: 'Fresh Garden Salad', price: 9.00, description: 'Mixed greens with balsamic reduction.', category: 'Starters', image: saladImg },
    { id: 'd6', name: 'Artisan Signature Mocktail', price: 6.00, description: 'Fresh mint, lime & sparkling water.', category: 'Beverage', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80' }
  ];

  if (customFoods && customFoods.length > 0) {
    const mains = customFoods.filter(f => (f.category || '').toLowerCase().includes('special') || (f.category || '').toLowerCase().includes('main') || (f.category || '').toLowerCase().includes('chef'));
    const apps = customFoods.filter(f => (f.category || '').toLowerCase().includes('starter') || (f.category || '').toLowerCase().includes('side') || (f.category || '').toLowerCase().includes('drink'));
    const rem = customFoods.filter(f => !mains.includes(f) && !apps.includes(f));
    if (mains.length > 0) defaultMains = mains;
    else if (rem.length > 0) defaultMains = rem.slice(0, 4);
    if (apps.length > 0) defaultSides = apps;
    else if (rem.length > 4) defaultSides = rem.slice(4, 8);
  }

  const bgColor = customBgColor || temp?.style?.backgroundColor || '#09090b';

  return (
    <div 
      style={{ backgroundColor: bgColor }} 
      className={`flex-1 flex flex-col justify-between relative z-10 h-full text-white ${isLarge ? 'p-6 rounded-3xl min-h-[640px] space-y-4' : 'p-2 rounded-xl'} overflow-hidden shadow-2xl border border-amber-500/30 select-none`}
    >
      {/* Header */}
      <div className={`bg-black/90 ${isLarge ? 'p-3 rounded-2xl border-2' : 'p-1.5 rounded-xl border'} border-amber-400/60 shadow-xl flex flex-col ${alignClass}`}>
        <span className={`${isLarge ? 'text-xs font-mono tracking-widest' : 'text-[6.5px] font-mono'} font-bold text-amber-400 ${transformClass} block ${textAlignClass}`}>{rName}</span>
        <h4 
          style={{ fontFamily: brandFont?.family, ...titleSizeStyle }} 
          className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-[11px] font-black'} ${transformClass} ${headerTitleTracking} leading-none text-white ${textAlignClass}`}
        >
          LUXURY GOURMET BISTRO
        </h4>
        {customTagline && (
          <span className={`${isLarge ? 'text-xs font-mono' : 'text-[6px] font-mono'} text-amber-200/80 block ${textAlignClass} ${transformClass}`}>
            {customTagline}
          </span>
        )}
      </div>

      {/* Hero Image */}
      <div 
        onClick={(e) => handleItemClick(e, defaultMains[0])}
        className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[16/7] border-2' : 'aspect-[16/8] border'} border-amber-400/50 shadow-2xl cursor-pointer group/hero hover:ring-2 hover:ring-amber-400 transition-all shrink-0 bg-zinc-900`}
      >
        <img src={defaultMains[0]?.image || saladImg} alt="Specialty" onError={(e) => handleImageError(e, saladImg)} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-300" />
        <div className="absolute bottom-2 left-3 text-white">
          <h4 className={`${isLarge ? 'text-base font-black' : 'text-[9px] font-bold'} uppercase text-amber-300`}>
            {defaultMains[0]?.name || 'Chef Specials'}
          </h4>
        </div>
      </div>

      {/* Structured Menu */}
      <div className={`space-y-2 bg-black/80 ${isLarge ? 'p-4 rounded-2xl border-2 text-xs sm:text-sm space-y-3' : 'p-2 rounded-xl text-[7.5px] space-y-1'} border-amber-400/30 flex-1 flex flex-col justify-center`}>
        <span className={`${isLarge ? 'text-xs font-black' : 'text-[6.5px] font-bold'} uppercase text-amber-400 border-b border-amber-400/30 pb-1 block tracking-wider`}>
          MAIN SPECIALS
        </span>
        {defaultMains.map((dish) => (
          <div 
            key={dish.id} 
            onClick={(e) => handleItemClick(e, dish)}
            className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
          >
            <span className="truncate text-white">{dish.name}</span>
            <span className="font-mono text-amber-300 font-bold shrink-0 bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/40">
              ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
            </span>
          </div>
        ))}

        <span className={`${isLarge ? 'text-xs font-black pt-2' : 'text-[6.5px] font-bold mt-1'} uppercase text-amber-400 border-b border-amber-400/30 pb-1 block tracking-wider`}>
          STARTERS & APPETIZERS
        </span>
        {defaultSides.map((dish) => (
          <div 
            key={dish.id} 
            onClick={(e) => handleItemClick(e, dish)}
            className={`flex justify-between items-center font-bold ${isLarge ? 'p-1.5' : 'p-1'} rounded hover:bg-white/10 cursor-pointer transition-colors`}
          >
            <span className="truncate text-white">{dish.name}</span>
            <span className="font-mono text-amber-300 font-bold shrink-0 bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/40">
              ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`relative z-20 text-center ${isLarge ? 'text-xs py-2' : 'text-[6px] pt-0.5'} text-amber-300 font-mono font-bold border-t border-amber-400/20 flex justify-between items-center px-2`}>
        <span>{webSiteUrl}</span>
        <span>{contactPhone}</span>
      </div>
    </div>
  );
}

export function MiniMenuCardVisualPreview({ 
  temp, 
  restaurantName, 
  isSelected,
  onSelectFoodItem,
  onView3D
}: { 
  temp: ExtendedMenuCardTemplate; 
  restaurantName?: string; 
  isSelected?: boolean;
  onSelectFoodItem?: (dish: any) => void;
  onView3D?: (dish: any) => void;
}) {
  const layout = temp?.style?.layout || 'polaroid';
  const isPolaroid = layout === 'polaroid';
  const isScalloped = layout === 'scalloped';

  // Explicit solid background color mapping per theme to prevent dark mode transparency bugs
  const posterBgColors: Record<string, string> = {
    'sunset-vibes': '#3a1106',
    'chalkboard': '#0d0d0f',
    'hand-drawn': '#220b0b',
    'polaroid': '#fdfbf7',
    'ocean-breeze': '#062038',
    'scalloped': '#1a0e0a',
    'royal-crimson': '#3a0606',
    'emerald-forest': '#02261d',
    'minimalist-ivory': '#ffffff',
    'circle-gold': '#0d0d0f',
    'luxury-navy': '#0c1622',
    'roasted-gold': '#33200b'
  };

  const bgColor = posterBgColors[layout] || temp?.style?.backgroundColor || '#0d0d0f';
  const borderColor = isSelected ? '#f59e0b' : 'rgba(255,255,255,0.18)';

  return (
    <div 
      className={`relative w-full aspect-[1/1.55] rounded-2xl overflow-hidden flex flex-col justify-between p-2.5 sm:p-3 select-none transition-all duration-300 border-2 shadow-lg group-hover:shadow-2xl antialiased ${
        isSelected ? 'ring-2 ring-amber-400/80 ring-offset-2 ring-offset-zinc-950 scale-[1.01]' : 'hover:scale-[1.008]'
      }`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor
      }}
    >
      {/* Top Decorative Border Accents */}
      {isPolaroid && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 opacity-95 [clip-path:polygon(0_0,100%_0,100%_100%,90%_40%,80%_100%,70%_40%,60%_100%,50%_40%,40%_100%,30%_40%,20%_100%,10%_40%,0_100%)] z-10 shadow-xs" />
      )}
      {isScalloped && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 z-10 shadow-xs" />
      )}

      {/* Render Dynamic Archetype Poster Content */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden relative z-10">
        {renderPosterContent(temp, restaurantName, onSelectFoodItem, onView3D)}
      </div>

      {/* Printable Poster Footer Ribbon */}
      <div className="pt-1 mt-1 border-t border-white/20 relative z-10 flex items-center justify-between text-[6.5px] font-mono uppercase tracking-wider text-slate-300/90 shrink-0">
        <span className="truncate font-semibold tracking-wide">ORDER ONLINE • SCAN QR</span>
        <span className="font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shrink-0 shadow-xs">TABLE QR</span>
      </div>
    </div>
  );
}

export function MenuCardFoodGridRenderer({
  template,
  items,
  brandFont,
  bodyFont,
  onSelectItem,
  isFullScreen = false
}: {
  template: ExtendedMenuCardTemplate;
  items: MenuItem[];
  brandFont: FontItem;
  bodyFont: FontItem;
  onSelectItem: (item: MenuItem) => void;
  isFullScreen?: boolean;
}) {
  const layout = template?.style?.layout || 'polaroid';
  const isPolaroid = layout === 'polaroid';
  const isCircleGold = layout === 'circle-gold';
  const isChalkboard = layout === 'chalkboard';
  const isCrimson = layout === 'royal-crimson';
  const isEmerald = layout === 'emerald-forest';
  const isHandDrawn = layout === 'hand-drawn';
  const isScalloped = layout === 'scalloped';
  const isSunset = layout === 'sunset-vibes';
  const isOcean = layout === 'ocean-breeze';

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-zinc-400/30">
        <p className="text-xs text-zinc-500 font-medium">No menu items published in this category.</p>
      </div>
    );
  }

  // 1. Polaroid Grid Layout (Polaroid white frame + yellow pill badge tag underneath photo)
  if (isPolaroid) {
    return (
      <div className="space-y-3">
        {/* Torn paper yellow wave accent band */}
        <div className="w-full h-3 bg-amber-400 [clip-path:polygon(0_0,100%_0,100%_100%,90%_40%,80%_100%,70%_40%,60%_100%,50%_40%,40%_100%,30%_40%,20%_100%,10%_40%,0_100%)] opacity-90 my-1 shadow-xs" />
        
        <div className={`grid ${isFullScreen ? 'grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5' : 'grid-cols-2 gap-3'}`}>
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white p-2.5 sm:p-3 rounded-lg shadow-md border border-zinc-200 hover:shadow-xl hover:-rotate-1 transition-all duration-300 flex flex-col items-center cursor-pointer group select-none"
            >
              {/* Polaroid Photo Box */}
              <div className="w-full aspect-square overflow-hidden rounded-xs border border-zinc-100 shadow-inner bg-zinc-100 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {item.glbUrl && (
                  <span className="absolute top-1 right-1 bg-amber-400 text-zinc-950 font-black text-[8px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" /> 3D
                  </span>
                )}
              </div>

              {/* Yellow Pill Badge Tag Underneath Photo */}
              <div className="bg-amber-400 text-zinc-950 font-black text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full text-center truncate max-w-full my-2 shadow-xs group-hover:scale-105 transition-transform">
                {item.name}
              </div>

              {/* Price & Description */}
              <div className="text-center space-y-0.5 w-full">
                <div style={{ fontFamily: bodyFont.family }} className="font-black text-amber-900 text-xs sm:text-sm">
                  ${item.price.toFixed(2)}
                </div>
                {item.description && (
                  <p style={{ fontFamily: bodyFont.family }} className="text-zinc-600 text-[10px] sm:text-xs line-clamp-2 leading-tight px-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-3 bg-amber-400 [clip-path:polygon(0_100%,100%_100%,100%_0,90%_60%,80%_0,70%_60%,60%_0,50%_60%,40%_0,30%_60%,20%_0,10%_60%,0_0)] opacity-90 my-1 shadow-xs" />
      </div>
    );
  }

  // 2. Gold Circle Minimalist Layout
  if (isCircleGold) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5' : 'grid-cols-2 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-zinc-900/90 border border-amber-500/40 p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center shadow-md hover:border-amber-400 hover:bg-zinc-800/90 transition-all cursor-pointer group select-none"
          >
            {/* Circle Photo with Double Gold Ring */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-amber-400 p-0.5 shadow-md overflow-hidden bg-black/40 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
            </div>

            {/* Title */}
            <h4 style={{ fontFamily: brandFont.family }} className="text-amber-100 font-bold text-xs sm:text-sm uppercase tracking-wider mt-2 line-clamp-1 leading-tight">
              {item.name}
            </h4>

            {/* Gold Pill Badge */}
            <span style={{ fontFamily: bodyFont.family }} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-mono font-black text-xs px-3 py-0.5 rounded-full mt-1.5 shadow-xs">
              ${item.price.toFixed(2)}
            </span>

            {/* Description */}
            {item.description && (
              <p style={{ fontFamily: bodyFont.family }} className="text-zinc-300 text-[10px] sm:text-xs line-clamp-2 mt-1 leading-normal">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 3. Chalkboard Slate Layout
  if (isChalkboard) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-zinc-900/90 border-2 border-dashed border-zinc-700 p-3 sm:p-4 rounded-xl shadow-lg hover:border-amber-400/80 transition-all cursor-pointer flex items-center gap-3.5 group select-none"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-zinc-600 overflow-hidden shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow space-y-1 overflow-hidden">
              <div className="flex justify-between items-start gap-1">
                <h4 style={{ fontFamily: brandFont.family }} className="text-zinc-100 font-bold text-xs sm:text-sm font-mono leading-tight group-hover:text-amber-300 transition-colors truncate">
                  {item.name}
                </h4>
                <span style={{ fontFamily: bodyFont.family }} className="bg-amber-400 text-zinc-950 font-mono font-black text-xs px-2.5 py-0.5 rounded-md shrink-0 shadow-xs">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p style={{ fontFamily: bodyFont.family }} className="text-zinc-400 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 4. Royal Crimson Layout
  if (isCrimson) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-red-950/80 border border-amber-500/30 p-3 sm:p-4 rounded-2xl shadow-xl hover:border-amber-400/80 transition-all cursor-pointer flex items-center gap-3.5 group select-none"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-amber-400/60 overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow space-y-1 overflow-hidden">
              <div className="flex justify-between items-start gap-1">
                <h4 style={{ fontFamily: brandFont.family }} className="text-amber-200 font-bold text-xs sm:text-sm leading-tight group-hover:text-yellow-300 transition-colors truncate">
                  {item.name}
                </h4>
                <span style={{ fontFamily: bodyFont.family }} className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-zinc-950 font-black text-xs px-2.5 py-0.5 rounded-md shrink-0 shadow-md">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p style={{ fontFamily: bodyFont.family }} className="text-amber-100/70 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 5. Emerald Forest Layout
  if (isEmerald) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3.5'}`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-emerald-950/90 border border-amber-400/40 p-3.5 sm:p-4 rounded-2xl shadow-xl hover:border-amber-400 transition-all cursor-pointer flex items-center gap-3.5 group select-none relative overflow-hidden"
          >
            {/* Number Circle Badge matching sample */}
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center shadow-md z-10 border border-emerald-900">
              {idx + 1}
            </div>

            {/* Food Image with Plate look */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-amber-400/60 overflow-hidden shrink-0 shadow-xl group-hover:scale-105 transition-transform bg-black/40 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
              {idx === 0 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-emerald-950 font-black text-[7px] uppercase tracking-wider px-2 py-0.5 rounded-t-md shadow-md whitespace-nowrap">
                  ★ Best Seller
                </div>
              )}
            </div>

            <div className="flex-grow space-y-1 overflow-hidden pl-2">
              <div className="flex justify-between items-start gap-1">
                <h4 style={{ fontFamily: brandFont.family }} className="text-amber-100 font-bold text-xs sm:text-sm leading-tight group-hover:text-yellow-300 transition-colors truncate">
                  {item.name}
                </h4>
                <span style={{ fontFamily: bodyFont.family }} className="bg-gradient-to-r from-amber-400 to-yellow-500 text-emerald-950 font-mono font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-full shrink-0 shadow-md">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p style={{ fontFamily: bodyFont.family }} className="text-emerald-200/80 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 6. Whimsical Hand-Drawn Doodle Layout
  if (isHandDrawn) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5' : 'grid-cols-2 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white border-2 border-zinc-900 p-3 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col items-center text-center group select-none"
          >
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-zinc-900 overflow-hidden shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <h4 style={{ fontFamily: brandFont.family }} className="text-zinc-900 font-black text-xs sm:text-sm tracking-tight mt-2 line-clamp-1 leading-tight">
              {item.name}
            </h4>

            <span style={{ fontFamily: bodyFont.family }} className="bg-red-500 text-white font-black text-xs px-2.5 py-0.5 rounded-lg border border-zinc-900 mt-1 shadow-xs">
              ${item.price.toFixed(2)}
            </span>

            {item.description && (
              <p style={{ fontFamily: bodyFont.family }} className="text-zinc-700 text-[10px] sm:text-xs line-clamp-2 mt-1 leading-normal">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 7. Scalloped Vintage Layout
  if (isScalloped) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-[#faf5eb] border border-amber-900/20 p-3 sm:p-4 rounded-2xl shadow-sm hover:border-amber-800/50 hover:bg-[#f7efe0] transition-all cursor-pointer flex items-center gap-3.5 group select-none"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-900/40 overflow-hidden shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow space-y-1 overflow-hidden">
              <div className="flex justify-between items-start gap-1">
                <h4 style={{ fontFamily: brandFont.family }} className="text-[#3b2314] font-bold text-xs sm:text-sm leading-tight group-hover:text-amber-800 transition-colors truncate">
                  {item.name}
                </h4>
                <span style={{ fontFamily: bodyFont.family }} className="bg-amber-800 text-amber-50 font-black text-xs px-2.5 py-0.5 rounded-full shrink-0 shadow-xs">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p style={{ fontFamily: bodyFont.family }} className="text-amber-950/70 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 8. Sunset Peach Vibe Layout
  if (isSunset) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5' : 'grid-cols-2 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-[#ffedd5] border border-orange-300 p-3 rounded-3xl shadow-md hover:shadow-lg hover:border-orange-400 transition-all cursor-pointer flex flex-col items-center text-center group select-none"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border border-orange-400/50 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <h4 style={{ fontFamily: brandFont.family }} className="text-[#431407] font-bold text-xs sm:text-sm tracking-tight mt-2 line-clamp-1 leading-tight">
              {item.name}
            </h4>

            <span style={{ fontFamily: bodyFont.family }} className="bg-orange-600 text-white font-bold text-xs px-3 py-0.5 rounded-full mt-1 shadow-xs">
              ${item.price.toFixed(2)}
            </span>

            {item.description && (
              <p style={{ fontFamily: bodyFont.family }} className="text-orange-950/70 text-[10px] sm:text-xs line-clamp-2 mt-1 leading-normal">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 9. Ocean Coastal Breeze Layout
  if (isOcean) {
    return (
      <div className={`grid ${isFullScreen ? 'grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5' : 'grid-cols-2 gap-3'}`}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-[#e0f2fe] border border-sky-200 p-3 rounded-2xl shadow-sm hover:border-sky-300 transition-all cursor-pointer flex flex-col items-center text-center group select-none"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-sky-400 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <h4 style={{ fontFamily: brandFont.family }} className="text-[#0c4a6e] font-bold text-xs sm:text-sm tracking-tight mt-2 line-clamp-1 leading-tight">
              {item.name}
            </h4>

            <span style={{ fontFamily: bodyFont.family }} className="bg-sky-600 text-white font-bold text-xs px-3 py-0.5 rounded-full mt-1 shadow-xs">
              ${item.price.toFixed(2)}
            </span>

            {item.description && (
              <p style={{ fontFamily: bodyFont.family }} className="text-sky-950/70 text-[10px] sm:text-xs line-clamp-2 mt-1 leading-normal">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 10. Default / Minimalist Ivory Layout
  return (
    <div className={`grid ${isFullScreen ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3'}`}>
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="bg-zinc-50 border border-zinc-200 p-3 sm:p-4 rounded-xl shadow-2xs hover:border-zinc-400 hover:bg-white transition-all cursor-pointer flex items-center gap-3.5 group select-none"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-zinc-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-grow space-y-1 overflow-hidden">
            <div className="flex justify-between items-start gap-1">
              <h4 style={{ fontFamily: brandFont.family }} className="text-zinc-900 font-bold text-xs sm:text-sm leading-tight group-hover:text-blue-600 transition-colors truncate">
                {item.name}
              </h4>
              <span style={{ fontFamily: bodyFont.family }} className="text-blue-600 font-bold text-xs shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <p style={{ fontFamily: bodyFont.family }} className="text-zinc-500 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface MenuCardStudioProps {
  restaurantId: string;
  settings: AdminSettings;
  theme: 'light' | 'dark';
  lang?: 'en' | 'bn' | 'ar';
  onUpdateSettings?: (settings: Partial<AdminSettings>) => void;
  onExitToDashboard?: () => void;
}

export default function MenuCardStudio({ restaurantId, settings, theme, lang = 'en', onUpdateSettings, onExitToDashboard }: MenuCardStudioProps) {
  // ---------------------------------------------------------------------------
  // 1. STATE VARIABLES
  // ---------------------------------------------------------------------------
  const [activeStudioTab, setActiveStudioTab] = useState<'design' | 'fonts' | 'colors' | 'items' | 'addItem'>('design');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);
  const [dishSearchTerm, setDishSearchTerm] = useState<string>('');

  // Synchronize back actions: return to studio module overview first if in a module, else return to admin dashboard
  useEffect(() => {
    const handleStudioBack = () => {
      if (isModuleOpen) {
        setIsModuleOpen(false);
      } else if (onExitToDashboard) {
        onExitToDashboard();
      }
    };
    window.addEventListener('studio-back-event', handleStudioBack);
    return () => window.removeEventListener('studio-back-event', handleStudioBack);
  }, [isModuleOpen, onExitToDashboard]);
  const [templates, setTemplates] = useState<MenuCardTemplate[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('premium-orange-001');
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [customTagline, setCustomTagline] = useState<string>('Gourmet Culinary Art & Fine Dining');
  const [headerTextAlign, setHeaderTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [headerTitleFontSize, setHeaderTitleFontSize] = useState<number>(32);
  const [headerTitleTracking, setHeaderTitleTracking] = useState<string>('tracking-widest');
  const [headerTitleUpper, setHeaderTitleUpper] = useState<boolean>(true);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [heroImageUrl, setHeroImageUrl] = useState<string>('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80');
  const [brandFontId, setBrandFontId] = useState<string>('cinzel');
  const [bodyFontId, setBodyFontId] = useState<string>('oswald');
  const [customBgColor, setCustomBgColor] = useState<string>('');
  const [customTextColor, setCustomTextColor] = useState<string>('');
  const [customAccentColor, setCustomAccentColor] = useState<string>('');
  const [customPriceBadgeStyle, setCustomPriceBadgeStyle] = useState<'pill' | 'circle-gold' | 'scalloped' | 'chalkboard' | 'none'>('pill');
  const [customHeaderStyle, setCustomHeaderStyle] = useState<'ribbon' | 'modern' | 'minimal' | 'vintage'>('ribbon');
  const [cardZoom, setCardZoom] = useState<number>(1);
  const [fontMapping, setFontMapping] = useState<FontRoleMapping>({
    brandFont: 'cinzel',
    headingFont: 'playfair',
    bodyFont: 'montserrat',
    sectionFont: 'oswald',
    priceFont: 'outfit',
    buttonFont: 'poppins'
  });
  
  // New Food Item Quick Creator
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<string>('Main Course');
  const [newItemDesc, setNewItemDesc] = useState<string>('');
  const [newItemImage, setNewItemImage] = useState<string>('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80');
  const previewCardRef = React.useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Country Dropdown States
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('');

  // Preview options
  const [previewCategory, setPreviewCategory] = useState<string>('All');
  const [tableId, setTableId] = useState<string>('table-12');
  const [tableNumber, setTableNumber] = useState<string>('T-12');
  
  // UI Status
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Interactive Customer Simulation Modals
  const [selectedDetailFood, setSelectedDetailFood] = useState<MenuItem | null>(null);
  const [showFullScreenMenu, setShowFullScreenMenu] = useState<boolean>(false);
  const [mockCart, setMockCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [showMockCartModal, setShowMockCartModal] = useState<boolean>(false);

  // Dynamic template browser states
  const ownerMappedPlan = mapPlanToSubscriptionPlan(settings?.subscriptionPlan);
  const [selectedPlanTab, setSelectedPlanTab] = useState<'starter' | 'professional' | 'premium'>(ownerMappedPlan || 'starter');
  const [templateSearchText, setTemplateSearchText] = useState<string>('');
  const [templateLayoutFilter, setTemplateLayoutFilter] = useState<string>('All');
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>('All');
  const [templateCurrentPage, setTemplateCurrentPage] = useState<number>(1);
  const [showFullGalleryPage, setShowFullGalleryPage] = useState<boolean>(false);
  const [galleryCurrentPage, setGalleryCurrentPage] = useState<number>(1);
  const [lightboxTemplateIndex, setLightboxTemplateIndex] = useState<number | null>(null);
  const [galleryVisibleCount, setGalleryVisibleCount] = useState<number>(30);
  const [galleryDensity, setGalleryDensity] = useState<'4col' | '5col' | '6col'>('5col');
  const templatesPerPage = 12;
  const galleryItemsPerPage = 12;

  // Reset batch rendering visible count when filter criteria changes
  useEffect(() => {
    setGalleryVisibleCount(30);
  }, [selectedPlanTab, templateSearchText, templateLayoutFilter, templateCategoryFilter]);

  // Initialize selected tab based on current subscription plan
  useEffect(() => {
    if (ownerMappedPlan) {
      setSelectedPlanTab(ownerMappedPlan);
    }
  }, [ownerMappedPlan]);

  // Keep restaurant name in sync if settings brandName updates
  useEffect(() => {
    if (settings?.brandName && !restaurantName) {
      setRestaurantName(settings.brandName);
    }
  }, [settings?.brandName]);

  // Generate 100, 500, or 1000 templates memoized for maximum rendering performance
  const allGeneratedTemplates = React.useMemo(() => {
    const result: ExtendedMenuCardTemplate[] = [];
    for (let i = 1; i <= 1000; i++) {
      result.push(generateSingleTemplate(i));
    }
    return result;
  }, []);

  // ---------------------------------------------------------------------------
  // 2. LOADING DATA & INTEGRATION
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function loadStudioData() {
      try {
        // Load Templates
        const temps = await getMenuCardTemplates();
        setTemplates(temps || []);

        // Load existing branding config or fallback to restaurant defaults
        const savedConfig = await getMenuCardBranding(restaurantId);
        if (savedConfig) {
          setSelectedTemplateId(savedConfig.templateId || 'premium-orange-001');
          setRestaurantName(savedConfig.restaurantName || settings?.brandName || '');
          setLogoUrl(savedConfig.logoUrl || settings?.brandLogo || '');
          setPhone(savedConfig.phone || '123-456-7890');
          setWebsite(savedConfig.website || 'www.yourrestaurant.com');
          setAddress(savedConfig.address || settings?.brandLocation || '123 Anywhere St, Any City');
          setHeroImageUrl(savedConfig.heroImageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80');
          setBrandFontId(savedConfig.brandFontId || 'cinzel');
          setBodyFontId(savedConfig.bodyFontId || 'oswald');
          setStatus(savedConfig.status || 'draft');
        } else {
          // Defaults
          setRestaurantName(settings?.brandName || '');
          setLogoUrl(settings?.brandLogo || '');
          setPhone('123-456-7890');
          setWebsite('www.yourrestaurant.com');
          setAddress(settings?.brandLocation || '123 Anywhere St, Any City');
          setHeroImageUrl('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80');
        }

        // Load menu items
        const items = await getPublishedMenuItems(restaurantId);
        // Fallback if empty
        if (items && items.length > 0) {
          setMenuItems(items as MenuItem[]);
        } else {
          // Load default mock/standard foods
          setMenuItems([
            { id: '1', name: 'Premium Truffle Burrata Pizza', description: 'Fresh sourdough base with gourmet creamy burrata, shaved truffles, and wild arugula.', price: 24.50, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80', isAvailable: true, published: true },
            { id: '2', name: 'Imperial Wagyu Cheeseburger', description: 'Double-stacked prime wagyu patty with mature gold cheddar, secret truffle glaze.', price: 18.00, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80', isAvailable: true, published: true, glbUrl: 'has-3d-model' },
            { id: '3', name: 'Fresh Rosemary Ginger Fizz', description: 'Zesty organic ginger syrup, rosemary sprigs, carbonated mineral water splash.', price: 6.50, category: 'Drinks', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=150&q=80', isAvailable: true, published: true }
          ]);
        }
      } catch (err) {
        console.error('MenuCardStudio: Gracefully handled studio data load exception:', err);
        // Guarantee defaults are loaded even in complete firestore network failures
        setRestaurantName(settings?.brandName || 'My Restaurant');
        setLogoUrl(settings?.brandLogo || '');
        setPhone('123-456-7890');
        setWebsite('www.yourrestaurant.com');
        setAddress(settings?.brandLocation || '123 Anywhere St, Any City');
        setHeroImageUrl('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80');
        setMenuItems([
          { id: '1', name: 'Premium Truffle Burrata Pizza', description: 'Fresh sourdough base with gourmet creamy burrata, shaved truffles, and wild arugula.', price: 24.50, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80', isAvailable: true, published: true },
          { id: '2', name: 'Imperial Wagyu Cheeseburger', description: 'Double-stacked prime wagyu patty with mature gold cheddar, secret truffle glaze.', price: 18.00, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80', isAvailable: true, published: true, glbUrl: 'has-3d-model' },
          { id: '3', name: 'Fresh Rosemary Ginger Fizz', description: 'Zesty organic ginger syrup, rosemary sprigs, carbonated mineral water splash.', price: 6.50, category: 'Drinks', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=150&q=80', isAvailable: true, published: true }
        ]);
      }
    }
    loadStudioData();
  }, [restaurantId, settings]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  // Computed variables
  const selectedTemplate = React.useMemo(() => {
    const found = allGeneratedTemplates.find(t => t.id === selectedTemplateId);
    if (found) return found;
    return templates.find(t => t.id === selectedTemplateId) || allGeneratedTemplates[0];
  }, [allGeneratedTemplates, templates, selectedTemplateId]);

  const brandFont = React.useMemo(() => {
    const activeStyle = selectedTemplate?.style;
    const fontId = activeStyle?.brandFontId || brandFontId;
    return FONT_LIBRARY.find(f => f.id === fontId) || FONT_LIBRARY[0];
  }, [selectedTemplate, brandFontId]);

  const bodyFont = React.useMemo(() => {
    const activeStyle = selectedTemplate?.style;
    const fontId = activeStyle?.bodyFontId || bodyFontId;
    return FONT_LIBRARY.find(f => f.id === fontId) || FONT_LIBRARY[1];
  }, [selectedTemplate, bodyFontId]);

  const handleApplyTemplate = (temp: ExtendedMenuCardTemplate, message?: string) => {
    setSelectedTemplateId(temp.id);
    if (temp?.style) {
      if (temp.style.backgroundColor) setCustomBgColor(temp.style.backgroundColor);
      if (temp.style.textColor) setCustomTextColor(temp.style.textColor);
      if (temp.style.accentColor) setCustomAccentColor(temp.style.accentColor);
      if (temp.style.brandFontId) setBrandFontId(temp.style.brandFontId);
      if (temp.style.bodyFontId) setBodyFontId(temp.style.bodyFontId);
    }
    if (message) {
      showToast('success', message);
    }
  };

  const isDarkBg = React.useMemo(() => {
    const bg = customBgColor || selectedTemplate?.style?.backgroundColor;
    if (!bg) return false;
    const lower = bg.toLowerCase();
    const darkHexes = ['#0f0f11', '#141416', '#450a0a', '#022c22', '#18181b', '#09090b', '#1a1a1e', '#7f1d1d', '#064e3b', '#0d0d0f', '#3a1106', '#220b0b', '#062038', '#1a0e0a', '#3a0606', '#02261d', '#27272a', '#171717'];
    if (darkHexes.includes(lower)) return true;
    if (lower.startsWith('#') && lower.length === 7) {
      const r = parseInt(lower.slice(1, 3), 16);
      const g = parseInt(lower.slice(3, 5), 16);
      const b = parseInt(lower.slice(5, 7), 16);
      return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
    }
    return false;
  }, [selectedTemplate, customBgColor]);

  // Computed variables for template searching, layout style filtering and pagination
  const filteredTemplates = React.useMemo(() => {
    let list = allGeneratedTemplates;
    
    // Tier Inheritance Filter:
    if (selectedPlanTab === 'starter') {
      list = list.filter(temp => temp.allowedPlans.includes('starter'));
    } else if (selectedPlanTab === 'professional') {
      list = list.filter(temp => temp.allowedPlans.includes('professional'));
    } else if (selectedPlanTab === 'premium') {
      list = list.filter(temp => temp.allowedPlans.includes('premium'));
    }
    
    if (templateSearchText.trim()) {
      const searchLower = templateSearchText.toLowerCase();
      list = list.filter(temp => 
        temp.name.toLowerCase().includes(searchLower) || 
        temp.id.toLowerCase().includes(searchLower)
      );
    }

    if (templateLayoutFilter !== 'All') {
      list = list.filter(temp => temp?.style?.layout === templateLayoutFilter);
    }

    if (templateCategoryFilter !== 'All') {
      const catLower = templateCategoryFilter.toLowerCase();
      list = list.filter(temp => {
        const layout = temp?.style?.layout || '';
        const isDark = ['chalkboard', 'royal-crimson', 'emerald-forest', 'luxury-navy', 'roasted-gold'].includes(layout);
        const isLight = !isDark;
        const isSingle = ['polaroid', 'circle-gold', 'chalkboard', 'minimalist-ivory', 'sunset-vibes', 'ocean-breeze'].includes(layout);
        const isMulti = !isSingle;

        if (catLower === 'luxury') return ['circle-gold', 'royal-crimson', 'emerald-forest', 'scalloped', 'luxury-navy'].includes(layout);
        if (catLower === 'minimal') return ['circle-gold', 'minimalist-ivory', 'polaroid'].includes(layout);
        if (catLower === 'modern') return ['minimalist-ivory', 'sunset-vibes', 'ocean-breeze'].includes(layout);
        if (catLower === 'cafe') return ['hand-drawn', 'polaroid', 'sunset-vibes'].includes(layout);
        if (catLower === 'fast food') return ['chalkboard', 'sunset-vibes'].includes(layout);
        if (catLower === 'pizza') return ['chalkboard', 'polaroid'].includes(layout);
        if (catLower === 'burger') return ['chalkboard', 'sunset-vibes', 'roasted-gold'].includes(layout);
        if (catLower === 'seafood') return ['ocean-breeze', 'emerald-forest'].includes(layout);
        if (catLower === 'bakery') return ['hand-drawn', 'scalloped'].includes(layout);
        if (catLower === 'fine dining') return ['royal-crimson', 'circle-gold', 'emerald-forest', 'luxury-navy'].includes(layout);
        if (catLower === 'dark') return isDark;
        if (catLower === 'light') return isLight;
        if (catLower === 'book menu' || catLower === 'multi page') return isMulti;
        if (catLower === 'single page') return isSingle;

        return temp.name.toLowerCase().includes(catLower);
      });
    }

    return list;
  }, [allGeneratedTemplates, selectedPlanTab, templateSearchText, templateLayoutFilter, templateCategoryFilter]);

  // Lightbox keyboard navigation (Next / Prev / Esc)
  useEffect(() => {
    if (lightboxTemplateIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxTemplateIndex(prev => 
          prev !== null ? (prev + 1) % filteredTemplates.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxTemplateIndex(prev => 
          prev !== null ? (prev - 1 + filteredTemplates.length) % filteredTemplates.length : 0
        );
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxTemplateIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxTemplateIndex, filteredTemplates]);

  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

  const paginatedTemplates = React.useMemo(() => {
    const safePage = Math.min(Math.max(1, templateCurrentPage), totalPages || 1);
    const startIndex = (safePage - 1) * templatesPerPage;
    return filteredTemplates.slice(startIndex, startIndex + templatesPerPage);
  }, [filteredTemplates, templateCurrentPage, totalPages, templatesPerPage]);

  const galleryTotalPages = Math.ceil(filteredTemplates.length / galleryItemsPerPage);

  const galleryPaginatedTemplates = React.useMemo(() => {
    const safePage = Math.min(Math.max(1, galleryCurrentPage), galleryTotalPages || 1);
    const startIndex = (safePage - 1) * galleryItemsPerPage;
    return filteredTemplates.slice(startIndex, startIndex + galleryItemsPerPage);
  }, [filteredTemplates, galleryCurrentPage, galleryTotalPages, galleryItemsPerPage]);

  // Dynamic QR URL computation
  const computedMenuUrl = `${window.location.origin}/menu?restaurantId=${encodeURIComponent(restaurantId)}&tableId=${encodeURIComponent(tableId)}&table=${encodeURIComponent(tableNumber)}`;
  const computedQrImg = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(computedMenuUrl)}&color=09090b&bgcolor=ffffff&qzone=2`;

  // ---------------------------------------------------------------------------
  // 3. ACTION EVENT HANDLERS
  // ---------------------------------------------------------------------------
  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
  };

  const handleSaveBrandInfo = async () => {
    setIsSaving(true);
    try {
      const nameToSave = restaurantName.trim() || settings?.brandName || 'My Restaurant';
      const data: Partial<MenuCardBrandingSettings> = {
        templateId: selectedTemplateId,
        restaurantName: nameToSave,
        logoUrl,
        phone,
        website,
        address,
        heroImageUrl,
        brandFontId,
        bodyFontId,
        status
      };
      await saveMenuCardBranding(restaurantId, data, false);
      if (onUpdateSettings) {
        onUpdateSettings({
          brandName: nameToSave,
          brandLogo: logoUrl,
          brandLocation: address
        });
      }
      showToast('success', `Restaurant name updated & saved as "${nameToSave}"!`);
    } catch (e: any) {
      showToast('error', `Failed to save restaurant name: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const nameToSave = restaurantName.trim() || settings?.brandName || 'My Restaurant';
      const data: Partial<MenuCardBrandingSettings> = {
        templateId: selectedTemplateId,
        restaurantName: nameToSave,
        logoUrl,
        phone,
        website,
        address,
        heroImageUrl,
        brandFontId,
        bodyFontId,
        status: 'draft'
      };
      await saveMenuCardBranding(restaurantId, data, false);
      if (onUpdateSettings) {
        onUpdateSettings({
          brandName: nameToSave,
          brandLogo: logoUrl,
          brandLocation: address
        });
      }
      setStatus('draft');
      showToast('success', 'Studio template draft configurations saved successfully.');
    } catch (e: any) {
      showToast('error', `Failed to save draft settings: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishMenu = async () => {
    setIsPublishing(true);
    try {
      // 1. Subscription verification limit checks on publish
      if (!selectedTemplate) {
        throw new Error('Please select a valid design template.');
      }
      const accessCheck = checkTemplateAccess(settings?.subscriptionPlan, selectedTemplate.allowedPlans);
      if (!accessCheck.allowed) {
        throw new Error(accessCheck.message);
      }

      const nameToSave = restaurantName.trim() || settings?.brandName || 'My Restaurant';
      const data: Partial<MenuCardBrandingSettings> = {
        templateId: selectedTemplateId,
        restaurantName: nameToSave,
        logoUrl,
        phone,
        website,
        address,
        heroImageUrl,
        brandFontId,
        bodyFontId,
        status: 'published'
      };
      await saveMenuCardBranding(restaurantId, data, true);
      if (onUpdateSettings) {
        onUpdateSettings({
          brandName: nameToSave,
          brandLogo: logoUrl,
          brandLocation: address
        });
      }
      setStatus('published');
      showToast('success', 'Bravo! Your digital QR menu layout is published and active.');
    } catch (e: any) {
      showToast('error', e.message || 'Validation failed during publish.');
    } finally {
      setIsPublishing(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 4. PREVIEW COMPONENT GENERATOR
  // ---------------------------------------------------------------------------
  // Filter active category foods
  const filteredPreviewFoods = menuItems.filter(item => {
    if (previewCategory === 'All') return true;
    return item.category?.toLowerCase() === previewCategory.toLowerCase();
  });

  const uniqueCategories = ['All', ...Array.from(new Set(menuItems.map(item => item.category).filter(Boolean)))];

  // Filter dishes for Menu Builder
  const filteredDishes = menuItems.filter(item => {
    const matchesCategory = previewCategory === 'All' || item.category?.toLowerCase() === previewCategory.toLowerCase();
    const matchesSearch = !dishSearchTerm.trim() ||
      item.name.toLowerCase().includes(dishSearchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(dishSearchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(dishSearchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const studioModules = [
    { 
      id: 'design' as const, 
      label: 'Templates', 
      title: 'Templates & Layouts', 
      icon: Palette, 
      sub: 'Browse 1000+ Layouts',
      desc: 'Pick from pre-built layouts authorized for your subscription level.',
    },
    { 
      id: 'fonts' as const, 
      label: 'Text & Fonts', 
      title: 'Restaurant Name & Typography', 
      icon: Type, 
      sub: 'Restaurant Name & Fonts',
      desc: 'Edit restaurant title, tagline, alignment, font sizing & typography.',
    },
    { 
      id: 'colors' as const, 
      label: 'Colors & Style', 
      title: 'Colors & Palette Presets', 
      icon: Sparkles, 
      sub: 'Palettes & Badge Style',
      desc: 'Choose 1-click palettes or customize background, text & accent colors.',
    },
    { 
      id: 'items' as const, 
      label: 'Menu Builder', 
      title: 'Menu Food Dishes', 
      icon: Utensils, 
      sub: 'Manage & Edit Dishes',
      desc: 'Manage food items, prices, descriptions, images and categories.',
    },
    { 
      id: 'addItem' as const, 
      label: 'Add New Item', 
      title: 'Add New Dish to Menu', 
      icon: PlusCircle, 
      sub: 'Create New Food Dish',
      desc: 'Quickly create and publish new dishes with images and prices.',
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in pb-20 max-w-[1600px] mx-auto -mt-2">
      
      {!isModuleOpen ? (
        /* ========================================================================= */
        /* 1. STUDIO MODULE OVERVIEW HUB (VERTICAL LINE-BY-LINE LIST & LIVE MENU)   */
        /* ========================================================================= */
        <div className="space-y-6 animate-fade-in">
          {/* Main 2-Column Layout: Left Vertical Line-by-Line Module List | Right Live Food Menu Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (5 Cols): Stacked Vertical Line-by-Line Module Buttons */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="p-0 sm:p-1 space-y-4 bg-transparent">
                <div className="flex items-start justify-between gap-4 pb-1">
                  <div>
                    <h2 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-black">
                      Menu Card Studio
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                      Click any module below to open full page editor
                    </p>
                  </div>
                </div>

                {/* Thin horizontal line matching screenshot */}
                <div className="h-[1.5px] bg-black/90 w-full my-2" />

                {/* 5 Studio Modules Stacked Line-by-Line matching screenshot */}
                <div 
                  className="space-y-1.5 pt-1"
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  {studioModules.map(tab => {
                    const isHighlighted = hoveredModule ? hoveredModule === tab.id : activeStudioTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onMouseEnter={() => setHoveredModule(tab.id)}
                        onClick={() => {
                          setActiveStudioTab(tab.id as any);
                          setIsModuleOpen(true);
                        }}
                        className={`w-full group rounded-2xl px-5 py-3.5 text-left flex items-center gap-4 transition-colors duration-150 cursor-pointer select-none ${
                          isHighlighted
                            ? 'bg-[#1a6dfd] text-white shadow-md shadow-blue-500/25 font-bold'
                            : 'bg-transparent text-black font-extrabold hover:text-black'
                        }`}
                      >
                        <tab.icon className={`w-5 h-5 shrink-0 transition-colors ${
                          isHighlighted ? 'text-white' : 'text-black'
                        }`} />
                        <span className={`text-[15px] sm:text-base font-extrabold tracking-tight transition-colors ${
                          isHighlighted ? 'text-white' : 'text-black'
                        }`}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): Live Food Menu Preview Card */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center space-y-4 lg:sticky lg:top-4">
              <div className="w-full max-w-[480px] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden bg-white dark:bg-zinc-900 ring-1 ring-slate-900/10">
                {renderPosterContent({
                  temp: selectedTemplate,
                  restaurantName: restaurantName || 'Asikul Restaurant',
                  customTagline: customTagline,
                  phone: phone,
                  website: website,
                  address: address,
                  customFoods: filteredPreviewFoods,
                  customBgColor: customBgColor,
                  customTextColor: customTextColor,
                  customAccentColor: customAccentColor,
                  brandFont: brandFont,
                  bodyFont: bodyFont,
                  headerTextAlign: headerTextAlign,
                  headerTitleFontSize: headerTitleFontSize,
                  headerTitleUpper: headerTitleUpper,
                  headerTitleTracking: headerTitleTracking,
                  onSelectFoodItem: (item) => setSelectedDetailFood(item),
                  isLargePreview: true
                })}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. DEDICATED FULL PAGE MODULE WORKSPACE (WHEN A MODULE IS CLICKED)        */
        /* ========================================================================= */
        <div className="space-y-6 animate-fade-in">
          {/* Dedicated Workstation Grid: 2 Columns (Left 7 Cols Editor | Right 5 Cols Food Menu Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (7 Cols): Control Center Panel Forms */}
            <div className={`lg:col-span-7 xl:col-span-7 rounded-[1.5rem] sm:rounded-[2.5rem] border shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden ${
              theme === 'dark' ? 'bg-[#121214] border-slate-800/80' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-6">
                {/* Module Workspace Navigation Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setIsModuleOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95 select-none"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'স্টুডিও ওভারভিউ' : 'Studio Overview'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 overflow-x-auto no-scrollbar">
                    {studioModules.map(tab => {
                      const isCurrent = activeStudioTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveStudioTab(tab.id as any)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
                            isCurrent
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <tab.icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStudioTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
              
              {/* TAB 1: DESIGN SELECTION */}
              {activeStudioTab === 'design' && (
              <div className="space-y-6">
                {/* Header with Full Screen Gallery Action */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md inline-block mb-1">
                      Step 1 of 5 • Layout Gallery
                    </span>
                    <h3 className={`text-lg font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      Select Menu Card Template
                    </h3>
                    <p className="text-xs text-slate-500">Pick from pre-built layouts authorized for your subscription level.</p>
                  </div>
                </div>

                {/* Subscription Plans & Limits Overview */}
                {(() => {
                  const urlPlan = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('plan') : null;
                  const showStarter = !urlPlan || urlPlan === 'all' || urlPlan === '15' || urlPlan === 'basic';
                  const showPro = !urlPlan || urlPlan === 'all' || urlPlan === '49' || urlPlan === 'pro';
                  const showElite = !urlPlan || urlPlan === 'all' || urlPlan === '99' || urlPlan === 'elite';

                  return (
                    <div className={`grid gap-3 ${
                      (urlPlan && urlPlan !== 'all') ? 'grid-cols-1 max-w-md' : 'grid-cols-1 sm:grid-cols-3'
                    }`}>
                      {/* STARTER CARD - 100 DESIGNS */}
                      {showStarter && (
                        <div 
                          onClick={() => {
                            setSelectedPlanTab('starter');
                            setTemplateCurrentPage(1);
                            setGalleryCurrentPage(1);
                            setShowFullGalleryPage(true);
                            showToast('success', '100 Starter designs gallery opened.');
                          }}
                          className={`p-4 rounded-2xl border text-center relative flex flex-col justify-between transition-all cursor-pointer group hover:border-orange-500/80 hover:shadow-xl ${
                            selectedPlanTab === 'starter' 
                              ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500 shadow-lg shadow-orange-500/10' 
                              : theme === 'dark' ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                          }`}
                        >
                          {ownerMappedPlan === 'starter' && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-md z-10 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Active Plan
                            </span>
                          )}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 block">Starter Plan ($15/mo)</span>
                            <span className="text-xl font-black text-orange-500 block">100+ Designs</span>
                            <span className="text-[10px] text-slate-400 font-medium block">10 Themes & 100+ Designs</span>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-700/20 flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold text-orange-400 group-hover:underline flex items-center gap-1">
                              <span>View 100 Designs in Full Page</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                            <span className="text-[9px] text-slate-500 font-medium">Click to open full page gallery</span>
                          </div>
                        </div>
                      )}

                      {/* MEDIUM CARD - 500 DESIGNS */}
                      {showPro && (
                        <div 
                          onClick={() => {
                            setSelectedPlanTab('professional');
                            setTemplateCurrentPage(1);
                            setGalleryCurrentPage(1);
                            setShowFullGalleryPage(true);
                            showToast('success', '500 Medium designs gallery opened.');
                          }}
                          className={`p-4 rounded-2xl border text-center relative flex flex-col justify-between transition-all cursor-pointer group hover:border-orange-500/80 hover:shadow-xl ${
                            selectedPlanTab === 'professional' 
                              ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500 shadow-lg shadow-orange-500/10' 
                              : theme === 'dark' ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                          }`}
                        >
                          {ownerMappedPlan === 'professional' && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-md z-10 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Active Plan
                            </span>
                          )}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 block">Professional Plan ($49/mo)</span>
                            <span className="text-xl font-black text-orange-500 block">500+ Designs</span>
                            <span className="text-[10px] text-slate-400 font-medium block">25 Themes & 500+ Designs</span>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-700/20 flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold text-orange-400 group-hover:underline flex items-center gap-1">
                              <span>View 500 Designs in Full Page</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                            <span className="text-[9px] text-slate-500 font-medium">Click to open full page gallery</span>
                          </div>
                        </div>
                      )}

                      {/* PREMIUM CARD - UNLIMITED DESIGNS */}
                      {showElite && (
                        <div 
                          onClick={() => {
                            setSelectedPlanTab('premium');
                            setTemplateCurrentPage(1);
                            setGalleryCurrentPage(1);
                            setShowFullGalleryPage(true);
                            showToast('success', 'Unlimited designs collection opened.');
                          }}
                          className={`p-4 rounded-2xl border text-center relative flex flex-col justify-between transition-all cursor-pointer group hover:border-orange-500/80 hover:shadow-xl ${
                            selectedPlanTab === 'premium' 
                              ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500 shadow-lg shadow-orange-500/10' 
                              : theme === 'dark' ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                          }`}
                        >
                          {ownerMappedPlan === 'premium' && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-md z-10 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Active Plan
                            </span>
                          )}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 block">Elite Luxury Plan ($99/mo)</span>
                            <span className="text-xl font-black text-orange-500 block">1,000+ Designs</span>
                            <span className="text-[10px] text-slate-400 font-medium block">50 Themes & 1,000+ Designs</span>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-700/20 flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold text-orange-400 group-hover:underline flex items-center gap-1">
                              <span>View Unlimited in Full Page</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                            <span className="text-[9px] text-slate-500 font-medium">Click to open full page gallery</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Active Filter Info Banner */}
                <div className="bg-orange-500/10 border border-orange-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300 font-medium">
                      {selectedPlanTab === 'starter' && 'Currently browsing Starter (100 Designs) collection.'}
                      {selectedPlanTab === 'professional' && 'Currently browsing Medium (500 Designs) collection.'}
                      {selectedPlanTab === 'premium' && 'Currently browsing Premium (Unlimited 1,000+ Designs) collection.'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold font-mono text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-lg flex-shrink-0 ml-2">
                    {filteredTemplates.length} Designs
                  </span>
                </div>

                {/* Search and Layout Filter Row */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search design by name or ID..."
                      value={templateSearchText}
                      onChange={(e) => {
                        setTemplateSearchText(e.target.value);
                        setTemplateCurrentPage(1);
                      }}
                      className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                        theme === 'dark' 
                          ? 'bg-zinc-950 border-zinc-800 text-white placeholder-slate-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <select
                    value={templateLayoutFilter}
                    onChange={(e) => {
                      setTemplateLayoutFilter(e.target.value);
                      setTemplateCurrentPage(1);
                    }}
                    className={`px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                      theme === 'dark' 
                        ? 'bg-zinc-950 border-zinc-800 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="All">All Layout Styles</option>
                    <option value="polaroid">Polaroid Retro Frame</option>
                    <option value="circle-gold">Circular Minimalist Gold</option>
                    <option value="hand-drawn">Borcelle Whimsical Doodle</option>
                    <option value="scalloped">Dining Option Scalloped Gold</option>
                    <option value="chalkboard">Midnight Blackboard Chalk</option>
                    <option value="royal-crimson">Royal Velvet Crimson</option>
                    <option value="emerald-forest">Emerald Forest Luxury</option>
                    <option value="minimalist-ivory">Clean Alabaster Minimal</option>
                    <option value="sunset-vibes">Sunset Peach Vibe</option>
                    <option value="ocean-breeze">Ocean Coastal Breeze</option>
                  </select>
                </div>

                {/* Filtered Templates Grid with Clean Pagination */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
                  {paginatedTemplates.length === 0 ? (
                    <div className="col-span-full text-center py-12 border border-dashed border-zinc-800/40 rounded-3xl">
                      <p className="text-xs text-slate-500">No designs match your search/filter criteria.</p>
                    </div>
                  ) : (
                    paginatedTemplates.map(temp => {
                      const accessCheck = checkTemplateAccess(settings?.subscriptionPlan, temp.allowedPlans);
                      const isSelected = temp.id === selectedTemplateId;
                      const globalIndex = filteredTemplates.findIndex(t => t.id === temp.id);

                      return (
                        <div 
                          key={temp.id}
                          className={`group relative rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'border-orange-500 shadow-xl scale-[1.01]' 
                              : 'border-transparent opacity-90 hover:opacity-100 bg-zinc-900/10'
                          }`}
                        >
                          {/* Inspect Lightbox Overlay Button */}
                          <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxTemplateIndex(globalIndex >= 0 ? globalIndex : 0);
                              }}
                              className="bg-black/80 hover:bg-orange-600 text-white px-2.5 py-1 rounded-xl text-[9px] font-bold flex items-center gap-1 shadow-lg border border-white/20 transition-all cursor-pointer"
                              title="Open in Lightbox Modal"
                            >
                              <Eye className="w-3 h-3 text-amber-300" />
                              <span>Lightbox</span>
                            </button>
                          </div>

                          {/* Miniature Menu Card Visual Preview */}
                          <div 
                            onClick={() => {
                              handleApplyTemplate(temp, accessCheck.allowed ? `'${temp.name}' applied to live preview.` : `'${temp.name}' applied (${accessCheck.message})`);
                            }}
                          >
                            <MiniMenuCardVisualPreview 
                              temp={temp} 
                              restaurantName={restaurantName} 
                              isSelected={isSelected} 
                            />
                          </div>

                          {/* Overlaid details */}
                          <div className="p-3 bg-zinc-950 text-white flex items-center justify-between border-t border-zinc-800">
                            <div>
                              <h4 className="font-bold text-xs tracking-tight text-white truncate max-w-[100px]">{temp.name}</h4>
                              <p className="text-[9px] text-slate-400 mt-0.5 uppercase font-mono tracking-wider">
                                {temp?.style?.layout || 'SINGLE PAGE'}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setLightboxTemplateIndex(globalIndex >= 0 ? globalIndex : 0)}
                                className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 cursor-pointer"
                                title="Inspect in Lightbox Modal"
                              >
                                <Maximize2 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleApplyTemplate(temp, `'${temp.name}' applied.`);
                                }}
                                className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer ${
                                  isSelected ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-slate-300 hover:bg-zinc-700'
                                }`}
                              >
                                {isSelected ? 'Applied' : 'Apply'}
                              </button>
                            </div>
                          </div>

                          {!accessCheck.allowed && (
                            <div className="p-2 bg-red-950/80 border-t border-red-900/40 text-[9px] text-red-300 flex items-center gap-1">
                              <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0" />
                              <span className="truncate">{accessCheck.message}</span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Pagination Controls for High-Speed Browsing */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800 text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      Showing {(Math.min(Math.max(1, templateCurrentPage), totalPages) - 1) * templatesPerPage + 1} - {Math.min(Math.min(Math.max(1, templateCurrentPage), totalPages) * templatesPerPage, filteredTemplates.length)} of {filteredTemplates.length} designs
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTemplateCurrentPage(p => Math.max(1, p - 1))}
                        disabled={templateCurrentPage <= 1}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer"
                      >
                        Prev
                      </button>
                      <span className="px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-500 font-bold font-mono text-xs">
                        {templateCurrentPage} / {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTemplateCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={templateCurrentPage >= totalPages}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: DESIGN & COLORS UTILITY */}
            {activeStudioTab === 'colors' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className={`text-lg font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Colors & Palette Presets
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Pick high-contrast 1-click theme palettes or customize exact brand colors.
                  </p>
                </div>

                {/* 1-Click Color Presets */}
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-800'}`}>
                    1-Click Theme Presets
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: 'Classic Cream', bg: '#fffbeb', text: '#1c1917', accent: '#d97706', tag: 'Light Cream' },
                      { name: 'Midnight Chalk', bg: '#09090b', text: '#f4f4f5', accent: '#f59e0b', tag: 'Dark Zinc' },
                      { name: 'Emerald Palace', bg: '#022c22', text: '#f0fdf4', accent: '#34d399', tag: 'Dark Emerald' },
                      { name: 'Crimson Velvet', bg: '#450a0a', text: '#fff1f2', accent: '#f87171', tag: 'Dark Red' },
                      { name: 'Royal Gold', bg: '#0d0d0f', text: '#fef08a', accent: '#eab308', tag: 'Luxury Gold' },
                      { name: 'Sunset Peach', bg: '#fff7ed', text: '#431407', accent: '#ea580c', tag: 'Warm Peach' },
                      { name: 'Ocean Breeze', bg: '#f0fdf4', text: '#022c22', accent: '#047857', tag: 'Mint & Green' },
                      { name: 'Minimal White', bg: '#ffffff', text: '#09090b', accent: '#1d4ed8', tag: 'Pure White' },
                    ].map(preset => {
                      const isSelected = customBgColor === preset.bg && customTextColor === preset.text;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setCustomBgColor(preset.bg);
                            setCustomTextColor(preset.text);
                            setCustomAccentColor(preset.accent);
                            showToast('success', `${preset.name} theme palette applied!`);
                          }}
                          className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer shadow-sm hover:scale-[1.02] ${
                            isSelected 
                              ? 'ring-2 ring-orange-500 border-orange-500 bg-orange-500/10' 
                              : theme === 'dark' 
                                ? 'border-zinc-700/80 bg-zinc-900 hover:bg-zinc-800' 
                                : 'border-slate-300 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {preset.name}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-orange-500" />}
                            </div>
                            <span className={`text-[10px] font-semibold block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                              {preset.tag}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-zinc-800 mt-2">
                            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">Colors:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full border border-black/30 shadow-xs" style={{ backgroundColor: preset.bg }} title="Background" />
                              <span className="w-4 h-4 rounded-full border border-black/30 shadow-xs" style={{ backgroundColor: preset.text }} title="Text" />
                              <span className="w-4 h-4 rounded-full border border-black/30 shadow-xs" style={{ backgroundColor: preset.accent }} title="Accent" />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-800'}`}>Background Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={customBgColor || '#fffbeb'} onChange={(e) => setCustomBgColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent shrink-0" />
                      <input 
                        type="text" 
                        value={customBgColor || '#fffbeb'} 
                        onChange={(e) => setCustomBgColor(e.target.value)} 
                        className={`flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl outline-none border transition-all ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-white border-2 border-slate-300 text-slate-900'
                        }`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-800'}`}>Text Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={customTextColor || '#18181b'} onChange={(e) => setCustomTextColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent shrink-0" />
                      <input 
                        type="text" 
                        value={customTextColor || '#18181b'} 
                        onChange={(e) => setCustomTextColor(e.target.value)} 
                        className={`flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl outline-none border transition-all ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-white border-2 border-slate-300 text-slate-900'
                        }`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-800'}`}>Accent Highlight</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={customAccentColor || '#d97706'} onChange={(e) => setCustomAccentColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent shrink-0" />
                      <input 
                        type="text" 
                        value={customAccentColor || '#d97706'} 
                        onChange={(e) => setCustomAccentColor(e.target.value)} 
                        className={`flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl outline-none border transition-all ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-white border-2 border-slate-300 text-slate-900'
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Price Badge Style */}
                <div className="space-y-2 pt-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-800'}`}>
                    Price Tag Badge Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'pill', label: 'Pill Badge' },
                      { id: 'circle-gold', label: 'Circle Gold' },
                      { id: 'scalloped', label: 'Scalloped Border' },
                      { id: 'chalkboard', label: 'Box Frame' },
                    ].map(badge => (
                      <button
                        key={badge.id}
                        type="button"
                        onClick={() => {
                          setCustomPriceBadgeStyle(badge.id as any);
                          showToast('success', `Price badge style: ${badge.label}`);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                          customPriceBadgeStyle === badge.id 
                            ? 'bg-orange-500 text-white border-orange-500 shadow-md ring-2 ring-orange-500/30' 
                            : theme === 'dark' 
                              ? 'bg-zinc-900 border-zinc-700 text-slate-200 hover:bg-zinc-800' 
                              : 'bg-slate-100 border-2 border-slate-300 text-slate-800 hover:bg-slate-200'
                        }`}
                      >
                        {badge.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MENU ITEMS MANAGER */}
            {activeStudioTab === 'items' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      Menu Food Items Manager
                    </h3>
                    <p className="text-xs text-slate-500">Edit prices, titles, or add new dishes to your menu card instantly.</p>
                  </div>
                </div>

                {/* Quick Add New Food Form */}
                <div className={`p-4 rounded-2xl border space-y-3 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className="text-xs font-black uppercase text-orange-500 tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add New Dish / Item
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Dish Name (e.g. Truffle Steak)"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500"
                    />
                    <input
                      type="number"
                      placeholder="Price ($ e.g. 19.99)"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="Category (e.g. Main Course)"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newItemImage}
                      onChange={(e) => setNewItemImage(e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="Short Description"
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                      className="sm:col-span-2 px-3 py-2 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newItemName || !newItemPrice) {
                        showToast('error', 'Please enter Dish Name and Price');
                        return;
                      }
                      const newItem: MenuItem = {
                        id: `item-${Date.now()}`,
                        name: newItemName,
                        price: parseFloat(newItemPrice) || 0,
                        category: newItemCategory || 'Main Course',
                        description: newItemDesc || 'Chef special artisanal dish',
                        image: newItemImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
                        isAvailable: true,
                        published: true
                      };
                      setMenuItems(prev => [newItem, ...prev]);
                      setNewItemName('');
                      setNewItemPrice('');
                      setNewItemDesc('');
                      showToast('success', `"${newItem.name}" added to menu!`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-md"
                  >
                    + Add Dish to Menu Card
                  </button>
                </div>

                {/* List of Existing Menu Items */}
                <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                  {menuItems.map((item, idx) => (
                    <div key={item.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-700 shrink-0" />
                        <div className="overflow-hidden">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMenuItems(prev => prev.map((p, i) => i === idx ? { ...p, name: val } : p));
                            }}
                            className="bg-transparent text-xs font-bold text-white outline-none truncate w-full"
                          />
                          <p className="text-[10px] text-slate-400 font-mono">{item.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-orange-400 font-mono">$</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setMenuItems(prev => prev.map((p, i) => i === idx ? { ...p, price: val } : p));
                          }}
                          className="w-16 px-2 py-1 text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 rounded text-orange-400 outline-none text-right"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setMenuItems(prev => prev.filter((_, i) => i !== idx));
                            showToast('success', `Removed "${item.name}"`);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-all"
                          title="Delete Item"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TYPOGRAPHY, TEXT & CANVA-STYLE STUDIO */}
            {activeStudioTab === 'fonts' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className={`text-lg font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    Text & Typography Studio
                  </h3>
                  <p className="text-xs text-slate-500">Edit restaurant title, alignment (Left/Center/Right), position, and preset text blocks.</p>
                </div>

                {/* Canva-style Top Alignment & Formatting Toolbar */}
                <div className={`p-4 rounded-2xl border space-y-4 shadow-xl ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-700/40 dark:border-zinc-800/60 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1.5">
                      <Type className="w-4 h-4" /> Canva-Style Text Toolbar
                    </span>

                    {/* Alignment Buttons with Clear Name Labels */}
                    <div className={`flex items-center gap-1.5 p-1 rounded-xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-100 border-slate-300'}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setHeaderTextAlign('left');
                          showToast('success', 'Title aligned to Left (বামপাশে)');
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          headerTextAlign === 'left' ? 'bg-orange-500 text-white shadow-md' : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Align Left (বামপাশে)"
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                        <span>Left</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHeaderTextAlign('center');
                          showToast('success', 'Title aligned to Center (মাঝখানে)');
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          headerTextAlign === 'center' ? 'bg-orange-500 text-white shadow-md' : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Align Center (মাঝখানে)"
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                        <span>Center</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHeaderTextAlign('right');
                          showToast('success', 'Title aligned to Right (ডানপাশে)');
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          headerTextAlign === 'right' ? 'bg-orange-500 text-white shadow-md' : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Align Right (ডানপাশে)"
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                        <span>Right</span>
                      </button>
                    </div>

                    {/* Size Steppers */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-100 border-slate-300'}`}>
                      <span className={`text-[10px] font-mono uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Size:</span>
                      <button
                        type="button"
                        onClick={() => setHeaderTitleFontSize(prev => Math.max(18, prev - 2))}
                        className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-orange-500 font-mono w-6 text-center">{headerTitleFontSize}</span>
                      <button
                        type="button"
                        onClick={() => setHeaderTitleFontSize(prev => Math.min(64, prev + 2))}
                        className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Uppercase toggle */}
                    <button
                      type="button"
                      onClick={() => setHeaderTitleUpper(!headerTitleUpper)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        headerTitleUpper 
                          ? 'bg-orange-500/20 border-orange-500 text-orange-500' 
                          : theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'
                      }`}
                    >
                      aA {headerTitleUpper ? 'UPPER' : 'Normal'}
                    </button>
                  </div>

                  {/* Input Fields for Restaurant Name & Tagline */}
                  <div className="grid grid-cols-1 gap-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          <Type className="w-3.5 h-3.5 text-orange-500" />
                          <span>Restaurant Title / Header Text</span>
                        </label>
                        <span className="text-[10px] text-orange-500 font-mono font-bold">Live on preview</span>
                      </div>
                      <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="e.g. ROYAL FLAME KITCHEN"
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-bold outline-none focus:border-orange-500 transition-all ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Sub-Heading / Tagline Text</span>
                      </label>
                      <input
                        type="text"
                        value={customTagline}
                        onChange={(e) => setCustomTagline(e.target.value)}
                        placeholder="e.g. AUTHENTIC FINE DINING & CULINARY ART"
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-bold outline-none focus:border-orange-500 transition-all ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Canva-style Pre-designed Text Style Presets (Like screenshot!) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Canva Pre-designed Text Combinations
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'TITLE HEADING', font: 'cinzel', tracking: 'tracking-widest', align: 'center', upper: true, tag: 'BOLD DISPLAY' },
                      { name: 'ELEGANT SERIF', font: 'playfair', tracking: 'tracking-wider', align: 'left', upper: true, tag: 'FINE DINING' },
                      { name: 'ARTISANAL CAFE', font: 'greatvibes', tracking: 'tracking-normal', align: 'center', upper: false, tag: 'HANDWRITTEN' },
                      { name: 'MODERN MINIMAL', font: 'montserrat', tracking: 'tracking-widest', align: 'right', upper: true, tag: 'GEOMETRIC SANS' },
                      { name: 'GOLD EMBOSSED', font: 'cinzel', tracking: 'tracking-[0.3em]', align: 'center', upper: true, tag: 'ROYAL CREST' },
                      { name: 'VINTAGE BISTRO', font: 'oswald', tracking: 'tracking-wider', align: 'left', upper: true, tag: 'CLASSIC BISTRO' },
                    ].map(preset => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setBrandFontId(preset.font);
                          setHeaderTextAlign(preset.align as any);
                          setHeaderTitleTracking(preset.tracking);
                          setHeaderTitleUpper(preset.upper);
                          setFontMapping(prev => ({ ...prev, brandFont: preset.font }));
                          showToast('success', `'${preset.name}' text style applied!`);
                        }}
                        className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/60 text-left transition-all cursor-pointer group hover:scale-[1.02] shadow-md flex flex-col justify-between h-28"
                      >
                        <span className="text-[9px] font-mono text-orange-400 font-bold uppercase">{preset.tag}</span>
                        <div className={`my-auto ${preset.align === 'left' ? 'text-left' : preset.align === 'right' ? 'text-right' : 'text-center'}`}>
                          <h4 className={`text-base font-black text-white ${preset.upper ? 'uppercase' : ''} ${preset.tracking} leading-tight`}>
                            {preset.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Sample Subtitle Text</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Role Library Component */}
                <div className="pt-4 border-t border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Advanced Google Fonts Manager & Role Mapping
                  </h4>
                  <FontLibrarySystem
                    userPlan={ownerMappedPlan}
                    isMasterAdmin={ownerMappedPlan === 'premium'}
                    theme={theme}
                    fontMapping={fontMapping}
                    onUpdateFontMapping={(newMapping) => {
                      setFontMapping(newMapping);
                      setBrandFontId(newMapping.brandFont);
                      setBodyFontId(newMapping.bodyFont);
                    }}
                    previewContainerRef={previewCardRef}
                    showToast={showToast}
                  />
                </div>
              </div>
            )}

            {/* TAB 5: ADD NEW DISH / ITEM STUDIO */}
            {activeStudioTab === 'addItem' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      Step 5 of 5 • Food Item Creator
                    </span>
                    <h3 className={`text-lg font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      Add New Food Item
                    </h3>
                    <p className="text-xs text-slate-500">Create delicious food items with photo, category, description, and prices.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStudioTab('items')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>View Menu Builder ({menuItems.length} dishes)</span>
                  </button>
                </div>

                <div className={`p-6 rounded-2xl border space-y-5 shadow-lg ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-slate-200'}`}>
                  {/* Dish Name & Price Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
                          Food / Dish Name <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          {newItemName.length} / 60
                        </span>
                      </div>
                      <div className="relative">
                        <Utensils className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="e.g. Grilled Wagyu Steak with Truffle Herb Butter"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value.slice(0, 60))}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none transition-all font-bold ${
                            theme === 'dark'
                              ? 'bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500'
                              : 'bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-orange-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="text-xs font-bold text-orange-500 absolute left-3 top-1/2 -translate-y-1/2 font-mono">$</span>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="18.50"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(e.target.value)}
                          className={`w-full pl-8 pr-3 py-2.5 rounded-xl text-xs outline-none transition-all font-bold ${
                            theme === 'dark'
                              ? 'bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500'
                              : 'bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-orange-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
                      Select Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Starters', 'Main Course', 'Appetizers', 'Salads', 'Seafood', 'Pasta & Pizza', 'Desserts', 'Beverages', 'Chef Specials'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewItemCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            newItemCategory === cat
                              ? 'bg-orange-500 text-white shadow-md'
                              : theme === 'dark'
                                ? 'bg-zinc-950 border border-zinc-800 text-slate-400 hover:text-white'
                                : 'bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Or type custom category name..."
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl text-xs outline-none font-bold ${
                          theme === 'dark'
                            ? 'bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:border-orange-500'
                            : 'bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 focus:border-orange-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
                        Short Description / Ingredients
                      </label>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        {newItemDesc.length} / 120
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Prime aged tenderloin served with seasonal greens and chimichurri"
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value.slice(0, 120))}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all font-bold ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500'
                          : 'bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-orange-500'
                      }`}
                    />
                  </div>

                  {/* 1-Click HD Food Photo Presets */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>
                        Food Image (1-Click Presets or Custom URL)
                      </label>
                      <span className="text-[10px] font-mono text-orange-500 font-bold">10 High-Res Presets</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { label: 'Prime Steak', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Wood-Fired Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Gourmet Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Fresh Sushi', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Artisan Pasta', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Crispy Salad', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Ocean Seafood', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Sweet Dessert', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Special Coffee', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80' },
                        { label: 'Cocktail Drink', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' },
                      ].map(preset => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setNewItemImage(preset.url);
                            showToast('success', `Photo set to ${preset.label}`);
                          }}
                          className={`relative h-14 rounded-xl overflow-hidden border transition-all cursor-pointer group ${
                            newItemImage === preset.url ? 'ring-2 ring-orange-500 border-orange-500 scale-[1.02]' : 'border-zinc-800 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1">
                            <span className="text-[9px] font-bold text-white leading-tight truncate">{preset.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="relative pt-1">
                      <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Or paste custom dish image URL..."
                        value={newItemImage}
                        onChange={(e) => setNewItemImage(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs outline-none font-bold ${
                          theme === 'dark'
                            ? 'bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:border-orange-500'
                            : 'bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 focus:border-orange-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 border-t border-zinc-800/40 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                        <img src={newItemImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-slate-400 font-bold truncate max-w-[200px]">
                        {newItemName ? newItemName : 'New Dish Preview'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!newItemName.trim() || !newItemPrice) {
                          showToast('error', 'Please provide Dish Name and Price');
                          return;
                        }
                        const newItem: MenuItem = {
                          id: `item-${Date.now()}`,
                          name: newItemName.trim(),
                          price: parseFloat(newItemPrice) || 0,
                          category: newItemCategory.trim() || 'Main Course',
                          description: newItemDesc.trim() || 'Chef special artisanal dish',
                          image: newItemImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
                          isAvailable: true,
                          published: true
                        };
                        setMenuItems(prev => [newItem, ...prev]);
                        setNewItemName('');
                        setNewItemPrice('');
                        setNewItemDesc('');
                        showToast('success', `"${newItem.name}" added to menu successfully!`);
                        setActiveStudioTab('items');
                      }}
                      className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Save & Add Dish to Menu</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            </motion.div>
          </AnimatePresence>
          </div>

          {/* Subpage Action Panel Footer */}
          <div className="pt-6 border-t border-slate-800/20 flex flex-wrap gap-3 items-center justify-end">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveDraft}
                className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-amber-400" />}
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                disabled={isPublishing}
                onClick={handlePublishMenu}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-orange-500/10"
              >
                {isPublishing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Publish Menu</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Live Preview Column (5 Cols) - Sticky on Desktop so it is ALWAYS visible alongside the active editor */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center space-y-3 w-full lg:sticky lg:top-4 z-20">

          {/* Printable Physical Restaurant Menu Card Frame Structure */}
          <div ref={previewCardRef} className="w-full max-w-[500px] rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col bg-white dark:bg-zinc-900 ring-1 ring-slate-900/10 transition-all">

            {/* Inner Menu Card Body - Renders exact authentic template poster content */}
            {renderPosterContent({
              temp: selectedTemplate,
              restaurantName: restaurantName || 'Asikul Restaurant',
              customTagline: customTagline,
              phone: phone,
              website: website,
              address: address,
              customFoods: filteredPreviewFoods,
              customBgColor: customBgColor,
              customTextColor: customTextColor,
              customAccentColor: customAccentColor,
              brandFont: brandFont,
              bodyFont: bodyFont,
              headerTextAlign: headerTextAlign,
              headerTitleFontSize: headerTitleFontSize,
              headerTitleUpper: headerTitleUpper,
              headerTitleTracking: headerTitleTracking,
              onSelectFoodItem: (item) => setSelectedDetailFood(item),
              isLargePreview: true
            })}

          </div>

          {/* Helper caption under preview */}
          <div className="text-center text-[10px] text-slate-400 font-medium">
            ✨ This live card remains visible on all tabs (Templates, Text, Colors, Brand, Items, QR)
          </div>

        </div>

      </div>
      </div>
      )}

      {/* Dynamic Slide-in Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className={`fixed bottom-8 right-8 px-5 py-4 rounded-2xl shadow-2xl border z-50 flex items-center gap-3 max-w-sm ${
              toastMessage.type === 'success' 
                ? 'bg-slate-950 text-white border-emerald-500/30' 
                : 'bg-slate-950 text-white border-red-500/30'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${toastMessage.type === 'success' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              {toastMessage.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              )}
            </div>
            <p className="text-xs font-bold leading-normal">{toastMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Interactive Food Detail Modal */}
      <AnimatePresence>
        {selectedDetailFood && (
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`max-w-md w-full rounded-[2.5rem] overflow-hidden border shadow-2xl relative flex flex-col ${
                theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDetailFood(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full z-10 transition-all cursor-pointer border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Delicious Hero Food Image */}
              <div className="h-60 w-full relative">
                <img 
                  src={selectedDetailFood.image} 
                  alt={selectedDetailFood.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/10 to-transparent" />
                
                {/* 3D Tag if exists */}
                {selectedDetailFood.glbUrl && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400/30 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg shadow-orange-500/20">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>Interactive 3D Available</span>
                  </span>
                )}
              </div>

              {/* Details Content Panel */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span style={{ fontFamily: brandFont.family }} className="text-[10px] font-mono font-bold uppercase text-orange-400 tracking-wider">
                      {selectedDetailFood.category} Specialty
                    </span>
                    <h3 style={{ fontFamily: brandFont.family }} className="text-xl font-black uppercase tracking-tight leading-tight">
                      {selectedDetailFood.name}
                    </h3>
                  </div>
                  <span style={{ fontFamily: bodyFont.family }} className="text-xl font-bold text-orange-400 whitespace-nowrap bg-orange-50/10 dark:bg-orange-500/10 px-3.5 py-1.5 rounded-2xl border border-orange-500/20">
                    ${selectedDetailFood.price.toFixed(2)}
                  </span>
                </div>

                <p style={{ fontFamily: bodyFont.family }} className="text-xs text-slate-400 leading-relaxed">
                  {selectedDetailFood.description || 'Gourmet preparation utilizing organic local crops and hand-picked premium seasoning blends.'}
                </p>

                {/* High-Fidelity Simulated Specifications */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-3 rounded-2xl bg-zinc-900/40 border border-white/[0.03] space-y-0.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Prep Time</span>
                    <span className="text-xs font-bold text-slate-200 block">12-15 mins</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-900/40 border border-white/[0.03] space-y-0.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Calories</span>
                    <span className="text-xs font-bold text-slate-200 block">380 kcal</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-900/40 border border-white/[0.03] space-y-0.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Spicy Level</span>
                    <span className="text-xs font-bold text-slate-200 block">Medium 🔥</span>
                  </div>
                </div>

                {/* Simulated Customization Choice */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">Chef Customization</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-orange-500/20 text-[10px] font-bold text-orange-400">Regular Portion</span>
                    <span className="px-3 py-1 rounded-lg bg-zinc-900/40 border border-transparent text-[10px] text-slate-400">Extra Cheese (+$1.50)</span>
                    <span className="px-3 py-1 rounded-lg bg-zinc-900/40 border border-transparent text-[10px] text-slate-400">Gluten Free</span>
                  </div>
                </div>

                {/* Action button simulator */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMockCart(prev => {
                        const existing = prev.find(c => c.item.id === selectedDetailFood.id);
                        if (existing) {
                          return prev.map(c => c.item.id === selectedDetailFood.id ? { ...c, quantity: c.quantity + 1 } : c);
                        }
                        return [...prev, { item: selectedDetailFood, quantity: 1 }];
                      });
                      showToast('success', `${selectedDetailFood.name} added to cart!`);
                      setSelectedDetailFood(null);
                    }}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Order Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Full Immersive Menu Card Simulator */}
      <AnimatePresence>
        {showFullScreenMenu && (
          <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-40 flex flex-col overflow-hidden text-slate-200">
            
            {/* Top Interactive Banner / Header */}
            <div className="bg-zinc-950 border-b border-zinc-900 px-6 py-4 flex flex-wrap gap-4 items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-4">
                {/* Dedicated Break / Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowFullScreenMenu(false);
                    setMockCart([]);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-md select-none group/back"
                  title="Back to Studio"
                >
                  <ChevronLeft className="w-4 h-4 text-orange-500 group-hover/back:-translate-x-0.5 transition-transform" />
                  <span>{lang === 'bn' ? 'এডমিন স্টুডিওতে ফিরুন' : 'Back to Admin Studio'}</span>
                </button>

                <div className="h-6 w-[1px] bg-zinc-800 hidden xs:block" />

                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 style={{ fontFamily: brandFont.family }} className="text-base font-black uppercase tracking-wider text-white leading-tight">
                      {restaurantName || 'ROYAL FLAME KITCHEN'}
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">
                      Interactive Customer Menu Preview • Table: {tableNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Live Site Link */}
                <button
                  type="button"
                  onClick={() => window.open(computedMenuUrl, '_blank')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all border border-zinc-800"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
                  <span>Open Live Website</span>
                </button>

                {/* Close Fullscreen Preview */}
                <button
                  type="button"
                  onClick={() => {
                    setShowFullScreenMenu(false);
                    setMockCart([]);
                  }}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-550/20 transition-all cursor-pointer border border-red-500/20 flex items-center justify-center"
                  title="Close Full Screen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Immersive Client Body Grid */}
            <div 
              style={{ 
                backgroundColor: selectedTemplate?.style?.backgroundColor || '#09090b', 
                color: selectedTemplate?.style?.textColor || '#f1f5f9' 
              }} 
              className="flex-grow overflow-y-auto no-scrollbar p-6 flex justify-center items-start"
            >
              <div className="max-w-2xl w-full space-y-8 pb-20">
                
                {/* Pure Typography & Logo Header in FullScreen Mode */}
                <div 
                  className="w-full pt-10 pb-8 px-8 text-center rounded-[2rem] border border-white/10 shadow-xl relative overflow-hidden"
                  style={{ 
                    backgroundColor: selectedTemplate?.style?.backgroundColor || '#0d3b36', 
                    color: selectedTemplate?.style?.textColor || '#ffffff' 
                  }}
                >
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="max-h-20 w-auto mx-auto mb-4 rounded-2xl border border-white/20 p-2 bg-black/30 shadow-lg" />
                  ) : (
                    <div className="space-y-1 mb-3">
                      <span className="text-xs uppercase font-black tracking-[0.3em] opacity-80 block" style={{ color: selectedTemplate?.style?.accentColor || '#fbbf24' }}>
                        {restaurantName || 'ATIKUL & CO'}
                      </span>
                      <h2 
                        style={{ fontFamily: brandFont.family }} 
                        className="text-4xl sm:text-5xl font-black uppercase tracking-widest leading-none drop-shadow-sm"
                      >
                        M E N U
                      </h2>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 mt-4 opacity-80">
                    <span className="h-[1px] w-16 bg-current opacity-40" />
                    <span className="text-xs font-mono tracking-widest uppercase opacity-75">FINE DINING SPECIALTIES</span>
                    <span className="h-[1px] w-16 bg-current opacity-40" />
                  </div>
                </div>

                {/* Sticky Interactive Filters */}
                <div className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-[1.8rem] border border-white/[0.04] sticky top-0 z-20 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {uniqueCategories.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPreviewCategory(cat || 'All')}
                        className={`px-5 py-2 rounded-full text-xs font-bold font-mono transition-all border whitespace-nowrap cursor-pointer ${
                          previewCategory === cat 
                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                            : isDarkBg
                            ? 'bg-zinc-950/80 border-white/10 text-slate-300 hover:text-white'
                            : 'bg-white/90 border-zinc-300 text-zinc-800 hover:bg-zinc-100 shadow-2xs'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Cart Button with Count */}
                  <button
                    type="button"
                    onClick={() => setShowMockCartModal(true)}
                    className="relative p-2.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 transition-all cursor-pointer flex items-center justify-center"
                    title="Open Order Basket"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {mockCart.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white font-black font-mono text-[9px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce border border-black shadow-md">
                        {mockCart.reduce((acc, c) => acc + c.quantity, 0)}
                      </span>
                    )}
                  </button>
                </div>

                {/* Specialties Grid */}
                <div className="space-y-4">
                  <div className="border-b border-orange-500/20 pb-2.5 flex items-center justify-between">
                    <span style={{ fontFamily: brandFont.family }} className="text-lg uppercase font-black text-amber-500 tracking-wider">
                      {previewCategory} Specialties
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Showing {filteredPreviewFoods.length} premium delicacies
                    </span>
                  </div>

                  <MenuCardFoodGridRenderer
                    template={selectedTemplate}
                    items={filteredPreviewFoods}
                    brandFont={brandFont}
                    bodyFont={bodyFont}
                    onSelectItem={(item) => setSelectedDetailFood(item)}
                    isFullScreen={true}
                  />
                </div>

                {/* Immersive Contact Panel */}
                <div 
                  style={{ fontFamily: bodyFont.family }} 
                  className={`p-6 rounded-[2rem] text-center space-y-4 ${
                    isDarkBg 
                      ? 'bg-zinc-900/40 border border-dashed border-amber-500/20 text-slate-200' 
                      : 'bg-white/90 border border-dashed border-amber-900/20 text-zinc-800 shadow-md'
                  }`}
                >
                  <h4 style={{ fontFamily: brandFont.family }} className="text-amber-500 font-bold uppercase tracking-widest text-sm">Fine Dining Locations & Reservations</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    <div className={`p-3 rounded-xl space-y-1 ${isDarkBg ? 'bg-zinc-950/40' : 'bg-zinc-100/80'}`}>
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block">Telephone</span>
                      <span className={`text-xs font-bold block truncate ${isDarkBg ? 'text-slate-200' : 'text-zinc-900'}`}>{phone || '123-456-7890'}</span>
                    </div>
                    <div className={`p-3 rounded-xl space-y-1 ${isDarkBg ? 'bg-zinc-950/40' : 'bg-zinc-100/80'}`}>
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block">Web Portal</span>
                      <span className={`text-xs font-bold block truncate ${isDarkBg ? 'text-slate-200' : 'text-zinc-900'}`}>{website || 'www.restaurant.com'}</span>
                    </div>
                    <div className={`p-3 rounded-xl space-y-1 ${isDarkBg ? 'bg-zinc-950/40' : 'bg-zinc-100/80'}`}>
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block">Physical Address</span>
                      <span className={`text-xs font-bold block truncate ${isDarkBg ? 'text-slate-200' : 'text-zinc-900'}`}>{address || '123 Anywhere St'}</span>
                    </div>
                  </div>
                </div>

                {/* Immersive Live assistance scan QR */}
                <div className="bg-zinc-950 p-6 rounded-[2.5rem] border border-white/[0.02] flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {/* Dynamic QR */}
                    <div className="bg-white p-3 rounded-2xl flex flex-col items-center gap-1 shrink-0 shadow-2xl">
                      <img src={computedQrImg} alt="Table QR Link" className="w-24 h-24" />
                      <span className="text-[9px] font-mono font-black text-slate-900 tracking-tight uppercase">Table: {tableNumber}</span>
                    </div>
                    <div className="space-y-1 max-w-sm text-left">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-orange-400" />
                        <span>Interactive Desk QR Core</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        This digital QR is mapped to physical Table {tableNumber}. Customers scanning this will land instantly on your active digital menu!
                      </p>
                    </div>
                  </div>

                  {/* Waiter button */}
                  <div className="space-y-2 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      style={{ fontFamily: bodyFont.family }}
                      onClick={() => showToast('success', `Table ${tableNumber} assistance request simulated!`)}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Bell className="w-4 h-4 animate-bounce" />
                      <span>Call Simulated Waiter</span>
                    </button>
                    <span className="text-[9px] text-slate-500 text-center block uppercase tracking-wider">Direct Table Alert Synchronization</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Interactive Mock Cart Modal Sheet */}
      <AnimatePresence>
        {showMockCartModal && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex justify-end text-slate-200">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="max-w-md w-full h-full bg-zinc-950 border-l border-zinc-800 text-white flex flex-col"
            >
              <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                  <h3 className="font-black text-base uppercase tracking-wider">Order Cart Simulation</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMockCartModal(false)}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-grow overflow-y-auto no-scrollbar p-6 space-y-4">
                {mockCart.length === 0 ? (
                  <div className="text-center py-24 space-y-3">
                    <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto opacity-30" />
                    <p className="text-sm text-slate-500 font-bold">Your simulated order cart is empty.</p>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                      Go back to the immersive preview list and select premium delicacies to build a test checkout order!
                    </p>
                  </div>
                ) : (
                  mockCart.map(c => (
                    <div key={c.item.id} className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.02] flex items-center gap-4">
                      <img src={c.item.image} alt={c.item.name} className="w-12 h-12 rounded-full border border-orange-500/40 object-cover" />
                      <div className="flex-grow space-y-0.5 overflow-hidden text-left">
                        <h4 className="font-bold text-xs text-slate-100 truncate">{c.item.name}</h4>
                        <span className="text-[11px] font-bold text-orange-400 font-mono">${c.item.price.toFixed(2)} each</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setMockCart(prev => {
                              if (c.quantity === 1) {
                                return prev.filter(p => p.item.id !== c.item.id);
                              }
                              return prev.map(p => p.item.id === c.item.id ? { ...p, quantity: p.quantity - 1 } : p);
                            });
                          }}
                          className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-400 flex items-center justify-center cursor-pointer transition-all text-xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black font-mono w-4 text-center">{c.quantity}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMockCart(prev => prev.map(p => p.item.id === c.item.id ? { ...p, quantity: p.quantity + 1 } : p));
                          }}
                          className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-400 flex items-center justify-center cursor-pointer transition-all text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary with Mock Checkout */}
              {mockCart.length > 0 && (
                <div className="p-6 bg-zinc-950 border-t border-zinc-900 space-y-4">
                  <div className="space-y-1.5 font-mono text-xs text-slate-400 text-left">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-slate-200 font-bold">${mockCart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Simulated Tax (8%)</span>
                      <span>${(mockCart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0) * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-zinc-900 pt-2 flex justify-between text-sm text-orange-400 font-black">
                      <span>Total Invoice</span>
                      <span>${(mockCart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0) * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      showToast('success', `Simulated Order for Table ${tableNumber} placed successfully!`);
                      setMockCart([]);
                      setShowMockCartModal(false);
                      setShowFullScreenMenu(false);
                    }}
                    className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simulate Checkout (Place Order)</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Separate Full-Page Template Gallery View Overlay ("Full Page Gallery") */}
      <AnimatePresence>
        {showFullGalleryPage && (
          <div className="fixed inset-0 bg-zinc-950/98 backdrop-blur-xl z-50 flex flex-col text-white overflow-hidden animate-in fade-in duration-200">
            {/* Top Navigation Bar */}
            <div className="p-4 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFullGalleryPage(false)}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-slate-200 hover:text-white transition-all flex items-center gap-2 text-xs font-bold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Studio</span>
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                      {selectedPlanTab === 'starter' && '100 Starter Designs Gallery'}
                      {selectedPlanTab === 'professional' && '500 Medium Designs Gallery'}
                      {selectedPlanTab === 'premium' && 'Unlimited Premium Designs Gallery (1,000+)'}
                    </h2>
                    <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                      {filteredTemplates.length} Designs Total
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Browse all menu cards in full screen. Click any design card to select and apply to your live menu.
                  </p>
                </div>
              </div>

              {/* Plan Switchers Inside Full Page */}
              <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanTab('starter');
                    setTemplateCurrentPage(1);
                    setGalleryCurrentPage(1);
                    showToast('success', '100 Starter designs loaded');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedPlanTab === 'starter'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  100 (Starter)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanTab('professional');
                    setTemplateCurrentPage(1);
                    setGalleryCurrentPage(1);
                    showToast('success', '500 Medium designs loaded');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedPlanTab === 'professional'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  500 (Medium)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanTab('premium');
                    setTemplateCurrentPage(1);
                    setGalleryCurrentPage(1);
                    showToast('success', 'Unlimited Premium designs loaded');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedPlanTab === 'premium'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Unlimited (Premium)
                </button>
              </div>
            </div>

            {/* Filter & Search Navigation Bar Toolbar */}
            <div className="p-3 sm:px-6 bg-zinc-900/60 border-b border-zinc-800 flex-shrink-0">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                {/* Search Bar Input */}
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search design by name or ID..."
                    value={templateSearchText}
                    onChange={(e) => {
                      setTemplateSearchText(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Filter Dropdowns & Density Selector */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
                  {/* Category Dropdown */}
                  <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                    <Filter className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <select
                      value={templateCategoryFilter}
                      onChange={(e) => setTemplateCategoryFilter(e.target.value)}
                      className="bg-transparent text-xs text-slate-200 font-bold focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="All" className="bg-zinc-900 text-slate-200">All Categories</option>
                      <option value="Luxury" className="bg-zinc-900 text-slate-200">Luxury Fine Dining</option>
                      <option value="Minimal" className="bg-zinc-900 text-slate-200">Minimalist & Clean</option>
                      <option value="Modern" className="bg-zinc-900 text-slate-200">Modern Bistro</option>
                      <option value="Cafe" className="bg-zinc-900 text-slate-200">Café & Coffee Shop</option>
                      <option value="Fast Food" className="bg-zinc-900 text-slate-200">Fast Food Express</option>
                      <option value="Pizza" className="bg-zinc-900 text-slate-200">Pizza & Italian</option>
                      <option value="Burger" className="bg-zinc-900 text-slate-200">Burger & Steak Grill</option>
                      <option value="Seafood" className="bg-zinc-900 text-slate-200">Seafood & Ocean Catch</option>
                      <option value="Bakery" className="bg-zinc-900 text-slate-200">Bakery & Desserts</option>
                      <option value="Fine Dining" className="bg-zinc-900 text-slate-200">Fine Dining & Steakhouse</option>
                      <option value="Dark" className="bg-zinc-900 text-slate-200">Dark Mode Themes</option>
                      <option value="Light" className="bg-zinc-900 text-slate-200">Light Mode Themes</option>
                      <option value="Single Page" className="bg-zinc-900 text-slate-200">Single Page Layouts</option>
                      <option value="Multi Page" className="bg-zinc-900 text-slate-200">Multi Page Layouts</option>
                    </select>
                  </div>

                  {/* Layout Style Dropdown */}
                  <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                    <Layout className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <select
                      value={templateLayoutFilter}
                      onChange={(e) => setTemplateLayoutFilter(e.target.value)}
                      className="bg-transparent text-xs text-slate-200 font-bold focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="All" className="bg-zinc-900 text-slate-200">All Layout Styles</option>
                      <option value="polaroid" className="bg-zinc-900 text-slate-200">Polaroid Retro Frame</option>
                      <option value="circle-gold" className="bg-zinc-900 text-slate-200">Circular Minimalist Gold</option>
                      <option value="hand-drawn" className="bg-zinc-900 text-slate-200">Borcelle Whimsical Doodle</option>
                      <option value="scalloped" className="bg-zinc-900 text-slate-200">Dining Option Scalloped Gold</option>
                      <option value="chalkboard" className="bg-zinc-900 text-slate-200">Midnight Blackboard Chalk</option>
                      <option value="royal-crimson" className="bg-zinc-900 text-slate-200">Royal Velvet Crimson</option>
                      <option value="emerald-forest" className="bg-zinc-900 text-slate-200">Emerald Forest Luxury</option>
                      <option value="minimalist-ivory" className="bg-zinc-900 text-slate-200">Clean Alabaster Minimal</option>
                      <option value="sunset-vibes" className="bg-zinc-900 text-slate-200">Sunset Peach Vibe</option>
                      <option value="ocean-breeze" className="bg-zinc-900 text-slate-200">Ocean Coastal Breeze</option>
                    </select>
                  </div>

                  {/* Density Grid Selector */}
                  <div className="hidden sm:flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setGalleryDensity('5col')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        galleryDensity === '5col' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      5 Per Row
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryDensity('6col')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        galleryDensity === '6col' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      6 Per Row
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryDensity('4col')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        galleryDensity === '4col' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      4 Per Row
                    </button>
                  </div>

                  <span className="text-xs text-orange-400 font-mono font-bold bg-orange-500/10 px-2.5 py-1.5 rounded-xl border border-orange-500/20">
                    {filteredTemplates.length} Designs
                  </span>
                </div>
              </div>
            </div>

            {/* Main Full Page Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 no-scrollbar">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-24 space-y-3 border border-dashed border-zinc-800 rounded-3xl max-w-lg mx-auto">
                  <Search className="w-10 h-10 text-slate-600 mx-auto opacity-40" />
                  <p className="text-sm text-slate-400 font-bold">No designs found</p>
                  <p className="text-xs text-slate-500">
                    Please try changing your filter criteria or search keyword.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`grid gap-3 ${
                    galleryDensity === '6col' 
                      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6' 
                      : galleryDensity === '4col' 
                      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4' 
                      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'
                  }`}>
                    {filteredTemplates.slice(0, galleryVisibleCount).map(temp => {
                      const accessCheck = checkTemplateAccess(settings?.subscriptionPlan, temp.allowedPlans);
                      const isSelected = temp.id === selectedTemplateId;
                      const globalIndex = filteredTemplates.findIndex(t => t.id === temp.id);

                      return (
                        <div
                          key={temp.id}
                          className={`template-card group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 aspect-[3/4] flex flex-col justify-between ${
                            isSelected
                              ? 'border-orange-500 shadow-2xl ring-2 ring-orange-500/50'
                              : 'border-zinc-800/80 hover:border-orange-500/60 shadow-md hover:shadow-2xl'
                          }`}
                          onClick={() => {
                            handleApplyTemplate(temp, `'${temp.name}' selected. Customizing in Studio!`);
                            setShowFullGalleryPage(false);
                          }}
                        >
                          {/* Plan Lock / Selected Badge top-right inside poster corner */}
                          <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none flex items-center gap-1">
                            {isSelected && (
                              <span className="bg-orange-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                                <Check className="w-3 h-3" /> Selected
                              </span>
                            )}
                            {!accessCheck.allowed && (
                              <span className="bg-amber-500/90 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm">
                                <Crown className="w-3 h-3 text-slate-950" /> Plan Lock
                              </span>
                            )}
                          </div>

                          {/* Visual Edge-to-Edge Miniature Menu Card Poster */}
                          <div className="w-full h-full relative overflow-hidden rounded-2xl">
                            <MiniMenuCardVisualPreview 
                              temp={temp} 
                              restaurantName={restaurantName} 
                              isSelected={isSelected} 
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3 z-30">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxTemplateIndex(globalIndex >= 0 ? globalIndex : 0);
                                }}
                                className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-bold text-xs border border-amber-500/40 shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                              >
                                <Eye className="w-3.5 h-3.5 text-amber-400" />
                                <span>Preview Fullscreen</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyTemplate(temp, `'${temp.name}' selected. Customizing in Studio!`);
                                  setShowFullGalleryPage(false);
                                }}
                                className="w-full py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                <span>Use Design</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Load More Button for Batch Loading without Lag */}
                  {galleryVisibleCount < filteredTemplates.length && (
                    <div className="py-6 text-center">
                      <button
                        type="button"
                        onClick={() => setGalleryVisibleCount(prev => prev + 30)}
                        className="px-6 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-orange-400 font-bold text-xs border border-orange-500/30 shadow-xl transition-all cursor-pointer hover:border-orange-500 active:scale-95"
                      >
                        Load More Designs ({galleryVisibleCount} of {filteredTemplates.length} Loaded)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Responsive Menu Card Gallery Lightbox Modal with Next/Previous Navigation */}
      <AnimatePresence>
        {lightboxTemplateIndex !== null && filteredTemplates[lightboxTemplateIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between overflow-hidden select-none"
          >
            {/* 1. Lightbox Header Bar */}
            <div className="p-4 bg-zinc-950/90 border-b border-zinc-800/80 flex items-center justify-between text-white z-30">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 border border-amber-500/40 text-amber-400 p-2 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black tracking-tight text-white">
                      {filteredTemplates[lightboxTemplateIndex]?.name || 'Template'}
                    </h3>
                    <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                      {filteredTemplates[lightboxTemplateIndex]?.style?.layout || 'SINGLE PAGE'}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400">
                    Design {lightboxTemplateIndex + 1} of {filteredTemplates.length} • Keyboard: Use ← Left / Right → Arrows
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const temp = filteredTemplates[lightboxTemplateIndex];
                    handleApplyTemplate(temp, `'${temp.name}' applied! Customizing in Studio.`);
                    setLightboxTemplateIndex(null);
                    setShowFullGalleryPage(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 ${
                    selectedTemplateId === filteredTemplates[lightboxTemplateIndex].id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{selectedTemplateId === filteredTemplates[lightboxTemplateIndex].id ? 'Currently Editing' : 'Use & Customize Design'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxTemplateIndex(null)}
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-zinc-700 transition-all cursor-pointer"
                  title="Close Lightbox (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Lightbox Main Visual Stage with Left & Right Navigation Buttons */}
            <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
              {/* Previous Button (Left Navigation) */}
              <button
                type="button"
                onClick={() => setLightboxTemplateIndex(prev => prev !== null ? (prev - 1 + filteredTemplates.length) % filteredTemplates.length : 0)}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 bg-zinc-900/90 hover:bg-orange-500 border border-zinc-700 hover:border-orange-400 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-200 cursor-pointer group active:scale-90"
                title="Previous Template (Left Arrow ←)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Main Poster Preview Card */}
              <motion.div
                key={filteredTemplates[lightboxTemplateIndex]?.id || 'lightbox-card'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[420px] aspect-[3/4.2] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40 flex flex-col justify-between p-4 sm:p-5 relative select-none"
                style={{
                  backgroundColor: filteredTemplates[lightboxTemplateIndex]?.style?.backgroundColor || '#0d3b36',
                  color: filteredTemplates[lightboxTemplateIndex]?.style?.textColor || '#ffffff'
                }}
              >
                {/* Dynamic Archetype Poster Visuals */}
                {filteredTemplates[lightboxTemplateIndex] && renderPosterContent(filteredTemplates[lightboxTemplateIndex], restaurantName)}

                {/* Printable Poster Footer Ribbon */}
                <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[7px] font-mono uppercase tracking-wider opacity-80 mt-2">
                  <span className="truncate">{website || 'WWW.REALLYGREATSITE.COM'}</span>
                  <span className="font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0">TABLE QR</span>
                </div>
              </motion.div>

              {/* Next Button (Right Navigation) */}
              <button
                type="button"
                onClick={() => setLightboxTemplateIndex(prev => prev !== null ? (prev + 1) % filteredTemplates.length : 0)}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 bg-zinc-900/90 hover:bg-orange-500 border border-zinc-700 hover:border-orange-400 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-200 cursor-pointer group active:scale-90"
                title="Next Template (Right Arrow →)"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* 3. Bottom Thumbnail Ribbon & Keyboard Hints Bar */}
            <div className="p-3 bg-zinc-950/90 border-t border-zinc-800/80 z-30 flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar max-w-2xl mx-auto py-1">
                {filteredTemplates.slice(Math.max(0, lightboxTemplateIndex - 3), Math.min(filteredTemplates.length, lightboxTemplateIndex + 4)).map((temp) => {
                  const idx = filteredTemplates.findIndex(t => t.id === temp.id);
                  const isCurrent = idx === lightboxTemplateIndex;
                  return (
                    <button
                      key={temp.id}
                      type="button"
                      onClick={() => setLightboxTemplateIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isCurrent
                          ? 'bg-orange-500 border-orange-400 text-white shadow-md scale-105'
                          : 'bg-zinc-900 border-zinc-700 text-slate-400 hover:text-white hover:border-zinc-500'
                      }`}
                    >
                      #{idx + 1} {temp.name.slice(0, 15)}...
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between max-w-xl mx-auto w-full text-[10px] font-mono text-slate-400 pt-1 border-t border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold border border-zinc-700">←</span>
                  <span>Previous</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300 font-bold">
                  <span>{lightboxTemplateIndex + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span>{filteredTemplates.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Next</span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold border border-zinc-700">→</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
