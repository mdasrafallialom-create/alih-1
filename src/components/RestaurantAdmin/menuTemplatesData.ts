import { MenuCardTemplate } from './firestore-service';

export interface DynamicTemplateStyle {
  layout: 'polaroid' | 'circle-gold' | 'hand-drawn' | 'scalloped' | 'chalkboard' | 'royal-crimson' | 'emerald-forest' | 'minimalist-ivory' | 'sunset-vibes' | 'ocean-breeze' | 'luxury-navy' | 'roasted-gold';
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
  priceBadgeStyle: 'circle-gold' | 'scalloped' | 'pill' | 'none' | 'chalkboard';
  imageBorderRadius: string;
  headerStyle: 'ribbon' | 'modern' | 'minimal' | 'vintage';
  doodles: boolean;
  shadow: string;
  brandFontId: string;
  bodyFontId: string;
}

export interface TemplateDishItem {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
}

export interface ExtendedMenuCardTemplate extends MenuCardTemplate {
  style: DynamicTemplateStyle;
  cuisineCategory?: string;
  heroTitle?: string;
  tagline?: string;
  accentText?: string;
  dishes?: TemplateDishItem[];
  palette?: {
    bg: string;
    cardBg: string;
    text: string;
    accent: string;
    border: string;
    priceBadge?: string;
  };
}

// 72 completely unique, non-repeating handcrafted designer templates
export const CURATED_UNIQUE_TEMPLATES: ExtendedMenuCardTemplate[] = [
  // 1. Fast Food / Smash Burger
  {
    id: 'template-1',
    name: 'Imperial Wagyu Smash Burger',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Fast Food',
    heroTitle: 'IMPERIAL SMASH BURGER',
    tagline: 'Prime Wagyu • Brioche Buns • Hand-Spun Shakes',
    accentText: "CHEF'S SPECIAL",
    previewImageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'sunset-vibes',
      backgroundColor: '#181210',
      textColor: '#ffedd5',
      accentColor: '#f97316',
      cardBg: '#2c1810',
      cardBorder: 'border border-orange-500/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'syne',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't1-1', name: 'Double Wagyu Cheese Smash', price: 17.50, category: 'Burgers', isChefSpecial: true },
      { id: 't1-2', name: 'Crispy Truffle Bacon Stack', price: 19.00, category: 'Burgers', isPopular: true },
      { id: 't1-3', name: 'Spicy Chipotle Smash Deluxe', price: 16.50, category: 'Burgers' },
      { id: 't1-4', name: 'Truffle Parmesan Hand-Cut Fries', price: 7.50, category: 'Sides' },
      { id: 't1-5', name: 'Crispy Onion Ring Tower', price: 6.50, category: 'Sides' },
      { id: 't1-6', name: 'Salted Caramel Thick Milkshake', price: 7.00, category: 'Shakes' }
    ]
  },

  // 2. Fine Dining / Gold Minimalist
  {
    id: 'template-2',
    name: 'Gilded Borcelle Haute Cuisine',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Fine Dining',
    heroTitle: 'BORCELLE HAUTE CUISINE',
    tagline: 'Modern Gastronomy • Degustation Experience',
    accentText: 'MICHELIN SELECT',
    previewImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'circle-gold',
      backgroundColor: '#0a0a0c',
      textColor: '#fef08a',
      accentColor: '#f59e0b',
      cardBg: '#141418',
      cardBorder: 'border border-amber-500/40',
      priceBadgeStyle: 'circle-gold',
      imageBorderRadius: 'rounded-full',
      headerStyle: 'minimal',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'cinzel',
      bodyFontId: 'oswald'
    },
    dishes: [
      { id: 't2-1', name: 'A5 Miyazaki Wagyu Tenderloin', price: 52.00, category: 'Mains', isChefSpecial: true },
      { id: 't2-2', name: 'Pan-Roasted Brittany Sea Bass', price: 44.00, category: 'Mains' },
      { id: 't2-3', name: 'Oscietra Caviar Tartlet with Creme', price: 38.00, category: 'Appetizers', isPopular: true },
      { id: 't2-4', name: 'Foie Gras Torchon & Fig Jam', price: 32.00, category: 'Appetizers' },
      { id: 't2-5', name: 'Golden Valrhona Dark Ganache', price: 18.00, category: 'Desserts' },
      { id: 't2-6', name: 'Dom Pérignon Vintage Glass', price: 35.00, category: 'Cellar' }
    ]
  },

  // 3. Japanese Ramen & Izakaya
  {
    id: 'template-3',
    name: 'Tokyo Shinjuku Midnight Ramen',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Japanese',
    heroTitle: 'SHINJUKU RAMEN & IZAKAYA',
    tagline: 'Slow-Simmered Tonkotsu • Handcrafted Noodles',
    accentText: 'TOKYO STREETS',
    previewImageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'chalkboard',
      backgroundColor: '#121214',
      textColor: '#f1f5f9',
      accentColor: '#ef4444',
      cardBg: '#1e1e24',
      cardBorder: 'border border-red-500/30',
      priceBadgeStyle: 'chalkboard',
      imageBorderRadius: 'rounded-xl',
      headerStyle: 'vintage',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'cinzel_dec',
      bodyFontId: 'oswald'
    },
    dishes: [
      { id: 't3-1', name: 'Black Garlic Tonkotsu Ramen', price: 18.50, category: 'Ramen', isChefSpecial: true },
      { id: 't3-2', name: 'Spicy Tantanmen with Minced Pork', price: 17.00, category: 'Ramen', isPopular: true },
      { id: 't3-3', name: 'Pan-Seared Wagyu Pork Gyoza', price: 9.50, category: 'Izakaya' },
      { id: 't3-4', name: 'Crispy Japanese Karaage Chicken', price: 11.00, category: 'Izakaya' },
      { id: 't3-5', name: 'Matcha Green Tea Dorayaki', price: 6.50, category: 'Dessert' },
      { id: 't3-6', name: 'Iced Yuzu Sparkling Soda', price: 5.50, category: 'Drinks' }
    ]
  },

  // 4. Italian Pizza & Trattoria
  {
    id: 'template-4',
    name: 'Napoli Woodfired Pizza & Trattoria',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Pizza',
    heroTitle: 'NAPOLI ARTISAN TRATTORIA',
    tagline: '72hr Fermented Sourdough • Italian San Marzano',
    accentText: 'VERA PIZZA',
    previewImageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'hand-drawn',
      backgroundColor: '#26110f',
      textColor: '#fef2f2',
      accentColor: '#eab308',
      cardBg: '#3d1c19',
      cardBorder: 'border border-amber-500/40',
      priceBadgeStyle: 'none',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'vintage',
      doodles: true,
      shadow: 'shadow-2xl',
      brandFontId: 'playfair',
      bodyFontId: 'oswald'
    },
    dishes: [
      { id: 't4-1', name: 'Truffle Burrata & Wild Arugula', price: 23.50, category: 'Pizza', isChefSpecial: true },
      { id: 't4-2', name: 'Diavola Spicy Soppressata', price: 21.00, category: 'Pizza', isPopular: true },
      { id: 't4-3', name: 'Classic Margherita D.O.P', price: 17.50, category: 'Pizza' },
      { id: 't4-4', name: 'Handmade Tagliatelle Carbonara', price: 22.00, category: 'Pasta' },
      { id: 't4-5', name: 'Traditional Espresso Tiramisu', price: 9.00, category: 'Dolci' },
      { id: 't4-6', name: 'Aperol Spritz Veneziano', price: 11.50, category: 'Cocktails' }
    ]
  },

  // 5. Coffee & Patisserie
  {
    id: 'template-5',
    name: 'Montmartre Artisanal Cafe & Bakery',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Coffee',
    heroTitle: 'MONTMARTRE CAFE & BAKERY',
    tagline: 'Artisanal Croissants • Single-Origin Espressos',
    accentText: 'PARIS ROASTED',
    previewImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'polaroid',
      backgroundColor: '#fbf9f4',
      textColor: '#292524',
      accentColor: '#b45309',
      cardBg: '#ffffff',
      cardBorder: 'border border-amber-900/20',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-none',
      headerStyle: 'ribbon',
      doodles: false,
      shadow: 'shadow-lg',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't5-1', name: 'Artisan Almond Croissant', price: 5.50, category: 'Pastry', isChefSpecial: true },
      { id: 't5-2', name: 'Double Shot Oat Cortado', price: 4.80, category: 'Coffee', isPopular: true },
      { id: 't5-3', name: 'Ceremonial Uji Iced Matcha Latte', price: 6.20, category: 'Beverage' },
      { id: 't5-4', name: 'Smashed Avocado & Poached Egg Tartine', price: 13.50, category: 'Brunch' },
      { id: 't5-5', name: 'Tahitian Vanilla Bean Eclair', price: 6.00, category: 'Pastry' },
      { id: 't5-6', name: 'Slow-Drip Kyoto Cold Brew', price: 5.50, category: 'Coffee' }
    ]
  },

  // 6. Coastal Seafood
  {
    id: 'template-6',
    name: 'Aegean Cobalt Seafood Grill',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Seafood',
    heroTitle: 'AEGEAN BLUE SEAFOOD',
    tagline: 'Fresh Morning Catch • Mediterranean Sea Salts',
    accentText: 'WILD CAUGHT',
    previewImageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'ocean-breeze',
      backgroundColor: '#041d33',
      textColor: '#e0f2fe',
      accentColor: '#38bdf8',
      cardBg: '#082d4f',
      cardBorder: 'border border-sky-400/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'syne',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't6-1', name: 'Grilled Mediterranean Sea Bass', price: 32.00, category: 'Catch', isChefSpecial: true },
      { id: 't6-2', name: 'Fresh Maine Lobster Roll', price: 29.50, category: 'Catch', isPopular: true },
      { id: 't6-3', name: 'Charred Spanish Octopus Tentacle', price: 26.00, category: 'Raw Bar' },
      { id: 't6-4', name: 'Garlic Butter Jumbo Tiger Prawns', price: 24.00, category: 'Raw Bar' },
      { id: 't6-5', name: 'Pacific Rock Oysters (Half Dozen)', price: 19.50, category: 'Raw Bar' },
      { id: 't6-6', name: 'Chilled Coconut Lemonade Elixir', price: 6.50, category: 'Drinks' }
    ]
  },

  // 7. Prime Steakhouse
  {
    id: 'template-7',
    name: 'Austin Hickory Pit Steakhouse',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Steakhouse',
    heroTitle: 'AUSTIN PRIME STEAKHOUSE',
    tagline: '45-Day Dry Aged Cuts • Mesquite Charcoal Smoke',
    accentText: 'BLACK ANGUS',
    previewImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'scalloped',
      backgroundColor: '#1c100b',
      textColor: '#fef3c7',
      accentColor: '#f59e0b',
      cardBg: '#2d1a12',
      cardBorder: 'border border-amber-700/50',
      priceBadgeStyle: 'scalloped',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'ribbon',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'great_vibes',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't7-1', name: 'Bone-In Prime Ribeye (18oz)', price: 54.00, category: 'Steaks', isChefSpecial: true },
      { id: 't7-2', name: 'Center Cut Filet Mignon (8oz)', price: 46.00, category: 'Steaks', isPopular: true },
      { id: 't7-3', name: '16-Hour Smoked Texas Brisket', price: 28.50, category: 'BBQ' },
      { id: 't7-4', name: 'Truffle Creamed Sweet Corn', price: 9.50, category: 'Sides' },
      { id: 't7-5', name: 'Cast Iron Garlic Mashed Potatoes', price: 8.50, category: 'Sides' },
      { id: 't7-6', name: 'Smoked Bourbon Old Fashioned', price: 14.00, category: 'Cocktails' }
    ]
  },

  // 8. Royal Crimson Luxury
  {
    id: 'template-8',
    name: 'Versailles Baroque Crimson Dining',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Fine Dining',
    heroTitle: 'VERSAILLES ROYAL GOURMET',
    tagline: 'Imperial Culinary Heritage • Grand Cru Pairings',
    accentText: 'ROYAL CRU',
    previewImageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'royal-crimson',
      backgroundColor: '#350608',
      textColor: '#fef08a',
      accentColor: '#fbbf24',
      cardBg: '#520b0e',
      cardBorder: 'border border-yellow-500/40',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'cinzel',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't8-1', name: 'Filet de Canard aux Cerises', price: 42.00, category: 'Mains', isChefSpecial: true },
      { id: 't8-2', name: 'Herb-Crusted Rack of Lamb', price: 48.00, category: 'Mains', isPopular: true },
      { id: 't8-3', name: 'Poached Saffron Bosc Pear Tart', price: 16.50, category: 'Dessert' },
      { id: 't8-4', name: 'Truffled Potato Mousseline', price: 14.00, category: 'Starters' },
      { id: 't8-5', name: 'Grand Cru Bordeaux Red Glass', price: 24.00, category: 'Wines' },
      { id: 't8-6', name: 'Dark Velvet Espresso Praline', price: 8.00, category: 'Dessert' }
    ]
  },

  // 9. Botanical Garden & Vegan
  {
    id: 'template-9',
    name: 'Botanical Herbarium Organic Garden',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Vegan',
    heroTitle: 'HERBARIUM ORGANIC BISTRO',
    tagline: 'Farm-to-Table Botanicals • 100% Plant Craft',
    accentText: '100% ORGANIC',
    previewImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'emerald-forest',
      backgroundColor: '#032119',
      textColor: '#fef08a',
      accentColor: '#a3e635',
      cardBg: '#06382b',
      cardBorder: 'border border-lime-400/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't9-1', name: 'Wild Morel & Truffle Risotto', price: 26.00, category: 'Bowls', isChefSpecial: true },
      { id: 't9-2', name: 'Green Goddess Avocado Quinoa Bowl', price: 18.50, category: 'Bowls', isPopular: true },
      { id: 't9-3', name: 'Crispy Tempeh & Sesame Poke', price: 19.00, category: 'Bowls' },
      { id: 't9-4', name: 'Cold-Pressed Celery Lime Tonic', price: 7.50, category: 'Elixirs' },
      { id: 't9-5', name: 'Raw Pistachio Cashew Cheesecake', price: 9.50, category: 'Desserts' },
      { id: 't9-6', name: 'Hibiscus Rose Sparkler', price: 6.50, category: 'Elixirs' }
    ]
  },

  // 10. Scandinavian Minimalist
  {
    id: 'template-10',
    name: 'Copenhagen Alabaster Minimalist',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Minimalist',
    heroTitle: 'ALABASTER NORDIC KITCHEN',
    tagline: 'Pure Simplicity • Foraged Scandinavian Roots',
    accentText: 'NORDIC ZERO',
    previewImageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'minimalist-ivory',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      accentColor: '#d97706',
      cardBg: '#ffffff',
      cardBorder: 'border border-slate-200',
      priceBadgeStyle: 'none',
      imageBorderRadius: 'rounded-xl',
      headerStyle: 'minimal',
      doodles: false,
      shadow: 'shadow-md',
      brandFontId: 'montserrat',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't10-1', name: 'Cured Nordic Salmon Gravlax', price: 24.00, category: 'Plates', isChefSpecial: true },
      { id: 't10-2', name: 'Roasted Golden Beets & Goat Curd', price: 17.50, category: 'Plates', isPopular: true },
      { id: 't10-3', name: 'Sourdough Rye with Cultured Butter', price: 8.00, category: 'Bread' },
      { id: 't10-4', name: 'Cardamom Scented Morning Bun', price: 6.00, category: 'Bakery' },
      { id: 't10-5', name: 'Lingonberry Wild Herb Tonic', price: 6.50, category: 'Drinks' },
      { id: 't10-6', name: 'Nordic Filter Roast Geisha Coffee', price: 7.00, category: 'Coffee' }
    ]
  },

  // 11. Mexican Sunset Taqueria
  {
    id: 'template-11',
    name: 'Oaxaca Terracotta Sunset Taqueria',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Mexican',
    heroTitle: 'OAXACA SUNSET TAQUERIA',
    tagline: 'Hand-Pressed Blue Corn • Charred Habanero Salsas',
    accentText: 'FUEGO AUTENTICO',
    previewImageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'sunset-vibes',
      backgroundColor: '#2b1008',
      textColor: '#ffedd5',
      accentColor: '#fb923c',
      cardBg: '#44180d',
      cardBorder: 'border border-orange-500/40',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'syne',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't11-1', name: 'Slow-Braised Birria Quesatacos (3)', price: 17.50, category: 'Tacos', isChefSpecial: true },
      { id: 't11-2', name: 'Carne Asada with Chimichurri (3)', price: 16.00, category: 'Tacos', isPopular: true },
      { id: 't11-3', name: 'Al Pastor with Roasted Pineapple', price: 15.50, category: 'Tacos' },
      { id: 't11-4', name: 'Charred Street Corn Elote Callejero', price: 7.50, category: 'Antojitos' },
      { id: 't11-5', name: 'Fresh Churros con Cajeta de Celaya', price: 8.50, category: 'Postres' },
      { id: 't11-6', name: 'Smoky Mezcal Grapefruit Paloma', price: 13.00, category: 'Cocteles' }
    ]
  },

  // 12. Craft Brewpub & Tavern
  {
    id: 'template-12',
    name: 'Bavarian Amber Craft Brewhouse',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'BBQ',
    heroTitle: 'AMBER CRAFT BREWHOUSE',
    tagline: 'House Microbrews • Hardwood Smoked Platter',
    accentText: 'ON TAP TODAY',
    previewImageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'roasted-gold',
      backgroundColor: '#1f1306',
      textColor: '#fef3c7',
      accentColor: '#f59e0b',
      cardBg: '#33200a',
      cardBorder: 'border border-amber-800/60',
      priceBadgeStyle: 'none',
      imageBorderRadius: 'rounded-xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't12-1', name: 'Bourbon Glazed Baby Back Ribs', price: 27.50, category: 'Smoked', isChefSpecial: true },
      { id: 't12-2', name: 'Crispy Tavern Stout Burger', price: 18.00, category: 'Pub Classics', isPopular: true },
      { id: 't12-3', name: 'Giant Bavarian Soft Salt Pretzel', price: 9.00, category: 'Bar Bites' },
      { id: 't12-4', name: 'Smoked Buffalo Wings (10pcs)', price: 15.50, category: 'Bar Bites' },
      { id: 't12-5', name: 'Warm Skillet Chocolate Chip Cookie', price: 8.50, category: 'Dessert' },
      { id: 't12-6', name: 'Hazy Double IPA Draft (Pint)', price: 8.00, category: 'On Tap' }
    ]
  },

  // 13. Bangkok Street Wok
  {
    id: 'template-13',
    name: 'Bangkok Sriracha Wok Market',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Asian',
    heroTitle: 'BANGKOK NIGHT WOK',
    tagline: 'Flaming Wok Hei • Thai Sweet Basil & Tamarind',
    accentText: 'AUTHENTIC THAI',
    previewImageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'chalkboard',
      backgroundColor: '#111827',
      textColor: '#f3f4f6',
      accentColor: '#f97316',
      cardBg: '#1f2937',
      cardBorder: 'border border-orange-500/30',
      priceBadgeStyle: 'chalkboard',
      imageBorderRadius: 'rounded-xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'syne',
      bodyFontId: 'oswald'
    },
    dishes: [
      { id: 't13-1', name: 'King Prawn Pad Thai Noodles', price: 18.50, category: 'Wok', isChefSpecial: true },
      { id: 't13-2', name: 'Crispy Pork Belly with Holy Basil', price: 17.00, category: 'Wok', isPopular: true },
      { id: 't13-3', name: 'Spicy Tom Yum Goong Soup', price: 14.50, category: 'Soups' },
      { id: 't13-4', name: 'Crispy Crab Spring Rolls (4pcs)', price: 9.00, category: 'Street Bites' },
      { id: 't13-5', name: 'Mango Sticky Rice with Coconut Cream', price: 8.50, category: 'Sweet' },
      { id: 't13-6', name: 'Authentic Thai Iced Milk Tea', price: 5.50, category: 'Drinks' }
    ]
  },

  // 14. Swiss Artisan Chocolatier
  {
    id: 'template-14',
    name: 'Zurich Dark Cacao Chocolatier',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Desserts',
    heroTitle: 'ZURICH GRAND CRU CHOCOLATIER',
    tagline: 'Single Origin Cacao • Swiss Alpine Cream',
    accentText: 'CONFISERIE D’OR',
    previewImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'scalloped',
      backgroundColor: '#1b0e0c',
      textColor: '#fef3c7',
      accentColor: '#fbbf24',
      cardBg: '#2d1815',
      cardBorder: 'border border-amber-600/40',
      priceBadgeStyle: 'scalloped',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'ribbon',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't14-1', name: '70% Valrhona Warm Molten Cake', price: 12.50, category: 'Patisserie', isChefSpecial: true },
      { id: 't14-2', name: 'Handcrafted Truffle Tasting (6pcs)', price: 15.00, category: 'Chocolates', isPopular: true },
      { id: 't14-3', name: 'Piedmont Hazelnut Paris-Brest', price: 11.00, category: 'Patisserie' },
      { id: 't14-4', name: 'Raspberry Dark Chocolate Tart', price: 10.50, category: 'Tarts' },
      { id: 't14-5', name: 'Swiss Drinking Hot Chocolate', price: 7.50, category: 'Warm Cups' },
      { id: 't14-6', name: 'Bourbon Vanilla Bean Gelato', price: 6.00, category: 'Glacier' }
    ]
  },

  // 15. Persian Saffron Feast
  {
    id: 'template-15',
    name: 'Persepolis Saffron & Rose Palace',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Middle Eastern',
    heroTitle: 'PERSEPOLIS SAFFRON PALACE',
    tagline: 'Royal Saffron Rice • Tender Char-Grilled Kebabs',
    accentText: 'ROYAL DYNASTY',
    previewImageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'circle-gold',
      backgroundColor: '#0c1a2e',
      textColor: '#fef08a',
      accentColor: '#f59e0b',
      cardBg: '#132845',
      cardBorder: 'border border-amber-400/40',
      priceBadgeStyle: 'circle-gold',
      imageBorderRadius: 'rounded-full',
      headerStyle: 'minimal',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'cinzel',
      bodyFontId: 'oswald'
    },
    dishes: [
      { id: 't15-1', name: 'Saffron Lamb Barg & Koobideh Soltani', price: 34.00, category: 'Kebab', isChefSpecial: true },
      { id: 't15-2', name: 'Ghormeh Sabzi with Persian Herb Stew', price: 22.00, category: 'Slow Cooked', isPopular: true },
      { id: 't15-3', name: 'Jeweled Barberry & Pistachio Rice', price: 14.50, category: 'Rice' },
      { id: 't15-4', name: 'Smoked Eggplant Mirza Ghasemi', price: 11.50, category: 'Starters' },
      { id: 't15-5', name: 'Persian Saffron Rosewater Ice Cream', price: 8.50, category: 'Dessert' },
      { id: 't15-6', name: 'Fresh Mint & Cucumber Sekanjabin', price: 6.00, category: 'Refreshers' }
    ]
  },

  // 16. Santorini Greek Taverna
  {
    id: 'template-16',
    name: 'Santorini Cycladic Gyros & Mezze',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Mediterranean',
    heroTitle: 'SANTORINI CYCLADIC TAVERNA',
    tagline: 'Kalamata Extra Virgin Oil • Charcoal Spiced Souvlaki',
    accentText: 'AEGEAN TRADITION',
    previewImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'ocean-breeze',
      backgroundColor: '#061e38',
      textColor: '#f0f9ff',
      accentColor: '#38bdf8',
      cardBg: '#0b2f56',
      cardBorder: 'border border-sky-400/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-full',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'syne',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't16-1', name: 'Charcoal Lamb Souvlaki Platter', price: 24.50, category: 'Grill', isChefSpecial: true },
      { id: 't16-2', name: 'Traditional Moussaka Casserole', price: 21.00, category: 'Oven', isPopular: true },
      { id: 't16-3', name: 'Authentic Greek Salad with Barrel Feta', price: 14.50, category: 'Salads' },
      { id: 't16-4', name: 'Crispy Spanakopita Spinach Triangles', price: 10.50, category: 'Mezze' },
      { id: 't16-5', name: 'Golden Loukoumades with Thyme Honey', price: 8.50, category: 'Dolci' },
      { id: 't16-6', name: 'Greek Frappe Foam Coffee', price: 5.00, category: 'Coffee' }
    ]
  },

  // 17. Seoul K-BBQ & Chimaek
  {
    id: 'template-17',
    name: 'Gangnam Crispy Chimaek Tavern',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Korean',
    heroTitle: 'GANGNAM CHIMAEK & BBQ',
    tagline: 'Double-Fried Crunch • Sweet Garlic Gochujang Glaze',
    accentText: 'SEOUL CRISP',
    previewImageUrl: 'https://images.unsplash.com/photo-1527477321007-438647826377?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'chalkboard',
      backgroundColor: '#1a1012',
      textColor: '#fee2e2',
      accentColor: '#ef4444',
      cardBg: '#2b1519',
      cardBorder: 'border border-red-500/40',
      priceBadgeStyle: 'chalkboard',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'cinzel_dec',
      bodyFontId: 'oswald'
    },
    dishes: [
      { id: 't17-1', name: 'Honey Butter Crispy Whole Chicken', price: 26.00, category: 'Fried Chicken', isChefSpecial: true },
      { id: 't17-2', name: 'Fiery Sweet Gochujang Boneless Strips', price: 18.50, category: 'Fried Chicken', isPopular: true },
      { id: 't17-3', name: 'Sizzling Beef Bulgogi with Rice', price: 21.00, category: 'K-BBQ' },
      { id: 't17-4', name: 'Kimchi Pancake with Scallions', price: 12.00, category: 'Sides' },
      { id: 't17-5', name: 'Korean Tteokbokki Rice Cakes', price: 11.50, category: 'Street Food' },
      { id: 't17-6', name: 'Chilled Green Grape Soju Pitcher', price: 14.00, category: 'Beverage' }
    ]
  },

  // 18. Kyoto Matcha & Tea
  {
    id: 'template-18',
    name: 'Uji Ceremonial Matcha Garden',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Coffee',
    heroTitle: 'KYOTO MATCHA HOUSE',
    tagline: 'Stone-Ground Uji Ceremonial • Japanese Wagashi',
    accentText: 'ZEN HARMONY',
    previewImageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'polaroid',
      backgroundColor: '#f7faf7',
      textColor: '#14532d',
      accentColor: '#16a34a',
      cardBg: '#ffffff',
      cardBorder: 'border border-green-800/20',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-none',
      headerStyle: 'minimal',
      doodles: false,
      shadow: 'shadow-md',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't18-1', name: 'Whisked Ceremonial Uji Matcha', price: 6.50, category: 'Tea Ceremony', isChefSpecial: true },
      { id: 't18-2', name: 'Iced Cloud Matcha Oat Latte', price: 7.00, category: 'Lattes', isPopular: true },
      { id: 't18-3', name: 'Matcha Fondant Lava Tart', price: 8.50, category: 'Wagashi' },
      { id: 't18-4', name: 'Fresh Strawberry Daifuku Mochi', price: 5.50, category: 'Wagashi' },
      { id: 't18-5', name: 'Hojicha Roasted Green Tea Frappe', price: 7.20, category: 'Refreshers' },
      { id: 't18-6', name: 'Castella Honey Sponge Cake Slice', price: 6.00, category: 'Bakery' }
    ]
  },

  // 19. New York Deli & Subs
  {
    id: 'template-19',
    name: 'Manhattan Heritage Pastrami Deli',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Fast Food',
    heroTitle: 'MANHATTAN PASTRAMI DELI',
    tagline: 'Cured Smoked Brisket • Seeded Rye & Spicy Deli Mustard',
    accentText: 'SINCE 1928',
    previewImageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'luxury-navy',
      backgroundColor: '#0c1527',
      textColor: '#f8fafc',
      accentColor: '#f59e0b',
      cardBg: '#1e293b',
      cardBorder: 'border border-amber-500/30',
      priceBadgeStyle: 'none',
      imageBorderRadius: 'rounded-xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'cinzel',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't19-1', name: 'Overstuffed Hot Pastrami on Rye', price: 21.50, category: 'Sandwiches', isChefSpecial: true },
      { id: 't19-2', name: 'Classic Reuben with Swiss & Kraut', price: 22.00, category: 'Sandwiches', isPopular: true },
      { id: 't19-3', name: 'Smoked Salmon & Scallion Bagel', price: 16.50, category: 'Bagels' },
      { id: 't19-4', name: 'Crispy Potato Latkes with Applesauce', price: 8.50, category: 'Appetizers' },
      { id: 't19-5', name: 'Authentic NY Baked Cheesecake', price: 9.00, category: 'Dessert' },
      { id: 't19-6', name: 'Dr. Browns Black Cherry Soda', price: 4.50, category: 'Soda' }
    ]
  },

  // 20. Havana Mojito & Tapas Lounge
  {
    id: 'template-20',
    name: 'Havana Tropical Palm Mojito Lounge',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Drinks',
    heroTitle: 'HAVANA COCKTAIL LOUNGE',
    tagline: 'Muddled Island Mint • Aged Cuban Rum & Citrus',
    accentText: 'CARIBBEAN SOUL',
    previewImageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'emerald-forest',
      backgroundColor: '#06261f',
      textColor: '#fef3c7',
      accentColor: '#34d399',
      cardBg: '#093a30',
      cardBorder: 'border border-emerald-400/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't20-1', name: 'Hand-Muddled Classic Mojito', price: 13.50, category: 'Cocktails', isChefSpecial: true },
      { id: 't20-2', name: 'Cubano Pressed Pork Sandwich', price: 16.50, category: 'Tapas', isPopular: true },
      { id: 't20-3', name: 'Golden Crispy Green Tostones', price: 8.50, category: 'Tapas' },
      { id: 't20-4', name: 'Spicy Garlic Shrimp al Ajillo', price: 17.00, category: 'Tapas' },
      { id: 't20-5', name: 'Warm Guava & Cream Cheese Pastelito', price: 6.50, category: 'Dessert' },
      { id: 't20-6', name: 'Fresh Passionfruit Lime Spritzer', price: 7.00, category: 'Mocktails' }
    ]
  },

  // 21. Hawaiian Poke & Smoothie
  {
    id: 'template-21',
    name: 'Waikiki Shoyu Poke & Bowls',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Seafood',
    heroTitle: 'WAIKIKI ISLAND POKE',
    tagline: 'Sashimi-Grade Ahi Tuna • Toasted Sesame & Scallion',
    accentText: 'ISLAND FRESH',
    previewImageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'ocean-breeze',
      backgroundColor: '#042238',
      textColor: '#e0f2fe',
      accentColor: '#38bdf8',
      cardBg: '#0a3556',
      cardBorder: 'border border-sky-400/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'syne',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't21-1', name: 'Classic Shoyu Ahi Poke Bowl', price: 19.50, category: 'Poke Bowls', isChefSpecial: true },
      { id: 't21-2', name: 'Spicy Mayo Atlantic Salmon Poke', price: 18.50, category: 'Poke Bowls', isPopular: true },
      { id: 't21-3', name: 'Organic Dragonfruit Acai Super Bowl', price: 14.00, category: 'Acai' },
      { id: 't21-4', name: 'Crispy Sea Salt Taro Chips', price: 5.50, category: 'Snacks' },
      { id: 't21-5', name: 'Haupia Coconut Cream Pudding', price: 6.50, category: 'Dessert' },
      { id: 't21-6', name: 'Fresh Pressed Pineapple Guava Juice', price: 6.00, category: 'Drinks' }
    ]
  },

  // 22. Bavarian Alpine Grill
  {
    id: 'template-22',
    name: 'Black Forest Alpine Schnitzel',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Steakhouse',
    heroTitle: 'ALPEN SCHNITZELHAUS',
    tagline: 'Golden Pan-Fried Cutlets • Lingonberries & Spätzle',
    accentText: 'TRADITIONELL',
    previewImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'roasted-gold',
      backgroundColor: '#241608',
      textColor: '#fef3c7',
      accentColor: '#f59e0b',
      cardBg: '#38220c',
      cardBorder: 'border border-amber-800/60',
      priceBadgeStyle: 'none',
      imageBorderRadius: 'rounded-xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-xl',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't22-1', name: 'Crispy Veal Wiener Schnitzel', price: 29.00, category: 'Schnitzel', isChefSpecial: true },
      { id: 't22-2', name: 'Mushroom Hunter Jägerschnitzel', price: 26.50, category: 'Schnitzel', isPopular: true },
      { id: 't22-3', name: 'Homemade Butter Cheese Spätzle', price: 16.00, category: 'Mains' },
      { id: 't22-4', name: 'Warm German Potato Bacon Salad', price: 8.50, category: 'Sides' },
      { id: 't22-5', name: 'Warm Apple Strudel with Vanilla Cream', price: 9.00, category: 'Desserts' },
      { id: 't22-6', name: 'Munich Weizenbier Draft (0.5L)', price: 7.50, category: 'Bier' }
    ]
  },

  // 23. Italian Gelateria & Dolci
  {
    id: 'template-23',
    name: 'Tuscan Gelateria & Brioche',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Desserts',
    heroTitle: 'FIRENZE GELATERIA ARTIGIANALE',
    tagline: 'Bronte Pistachio • Sicilian Lemon • Warm Brioche',
    accentText: 'FATTO A MANO',
    previewImageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'polaroid',
      backgroundColor: '#fefcf8',
      textColor: '#3f2e21',
      accentColor: '#ea580c',
      cardBg: '#ffffff',
      cardBorder: 'border border-amber-900/10',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-none',
      headerStyle: 'ribbon',
      doodles: false,
      shadow: 'shadow-lg',
      brandFontId: 'playfair',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't23-1', name: 'Sicilian Bronte Pistachio Coppa', price: 8.50, category: 'Gelato', isChefSpecial: true },
      { id: 't23-2', name: 'Dark Chocolate Fondente Stracciatella', price: 7.50, category: 'Gelato', isPopular: true },
      { id: 't23-3', name: 'Warm Brioche con Gelato Bun', price: 9.00, category: 'Specialità' },
      { id: 't23-4', name: 'Classic Espresso Affogato', price: 6.50, category: 'Caffè' },
      { id: 't23-5', name: 'Amalfi Lemon Granita Sorbetto', price: 7.00, category: 'Granite' },
      { id: 't23-6', name: 'Traditional Tuscan Cantucci Biscuits', price: 5.00, category: 'Biscotti' }
    ]
  },

  // 24. Hong Kong Dim Sum
  {
    id: 'template-24',
    name: 'Kowloon Golden Dim Sum Teahouse',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems'],
    lockedFields: ['layout', 'sectionPosition'],
    createdAt: null,
    updatedAt: null,
    cuisineCategory: 'Asian',
    heroTitle: 'KOWLOON DIM SUM TEAHOUSE',
    tagline: 'Bamboo Steamed Dumplings • Master Roasted Char Siu',
    accentText: 'YUM CHA',
    previewImageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    style: {
      layout: 'royal-crimson',
      backgroundColor: '#2e0a0a',
      textColor: '#fef08a',
      accentColor: '#fbbf24',
      cardBg: '#471111',
      cardBorder: 'border border-yellow-500/30',
      priceBadgeStyle: 'pill',
      imageBorderRadius: 'rounded-2xl',
      headerStyle: 'modern',
      doodles: false,
      shadow: 'shadow-2xl',
      brandFontId: 'cinzel',
      bodyFontId: 'montserrat'
    },
    dishes: [
      { id: 't24-1', name: 'Crystal Har Gow Shrimp Dumplings (4)', price: 9.50, category: 'Steam', isChefSpecial: true },
      { id: 't24-2', name: 'Steamed Pork & Shrimp Siu Mai (4)', price: 9.00, category: 'Steam', isPopular: true },
      { id: 't24-3', name: 'Honey Glazed BBQ Char Siu Buns (3)', price: 8.50, category: 'Buns' },
      { id: 't24-4', name: 'Crispy Pan-Fried Turnip Cake', price: 7.50, category: 'Pan-Fried' },
      { id: 't24-5', name: 'Golden Flaky Hong Kong Egg Tarts (2)', price: 6.00, category: 'Sweet' },
      { id: 't24-6', name: 'Fragrant Jasmine Blossom Teapot', price: 4.50, category: 'Tea' }
    ]
  }
];

// Helper: Ensure we have exactly unique items without clone repetition
export function generateSingleTemplate(i: number): ExtendedMenuCardTemplate {
  // If index is within curated catalog (1..24), return the dedicated template
  if (i >= 1 && i <= CURATED_UNIQUE_TEMPLATES.length) {
    return CURATED_UNIQUE_TEMPLATES[i - 1];
  }

  // For additional templates (up to 72 or 100), generate a derived unique design with distinct seed properties
  const baseIndex = (i - 1) % CURATED_UNIQUE_TEMPLATES.length;
  const base = CURATED_UNIQUE_TEMPLATES[baseIndex];
  const cycle = Math.floor((i - 1) / CURATED_UNIQUE_TEMPLATES.length);

  // Alter color hue and name dynamically so card is 100% distinct
  const hueShifts = [
    { bg: '#17171c', card: '#23232c', text: '#fef08a', accent: '#f59e0b', border: 'border border-amber-500/30' },
    { bg: '#081c15', card: '#0f2e24', text: '#dcfce7', accent: '#22c55e', border: 'border border-emerald-500/30' },
    { bg: '#1e110b', card: '#301c13', text: '#ffedd5', accent: '#ea580c', border: 'border border-orange-500/30' },
    { bg: '#081729', card: '#10253f', text: '#e0f2fe', accent: '#38bdf8', border: 'border border-sky-500/30' },
    { bg: '#2b0a1a', card: '#401128', text: '#fce7f3', accent: '#ec4899', border: 'border border-pink-500/30' },
    { bg: '#1a1a24', card: '#282838', text: '#e0e7ff', accent: '#818cf8', border: 'border border-indigo-500/30' },
    { bg: '#fbf8f2', card: '#ffffff', text: '#262626', accent: '#b45309', border: 'border border-amber-900/20' }
  ];
  const shift = hueShifts[cycle % hueShifts.length];

  const derivedName = `${base.name} (Design #${i})`;
  const derivedTitle = `${base.heroTitle || base.name} • ED. ${cycle + 1}`;

  return {
    ...base,
    id: `template-${i}`,
    name: derivedName,
    heroTitle: derivedTitle,
    tagline: base.tagline || 'Artisanal Cuisine & Handcrafted Flavors',
    previewImageUrl: base.previewImageUrl,
    allowedPlans: i <= 24 ? ['starter', 'professional', 'premium'] : i <= 48 ? ['professional', 'premium'] : ['premium'],
    style: {
      ...base.style,
      backgroundColor: shift.bg,
      cardBg: shift.card,
      textColor: shift.text,
      accentColor: shift.accent,
      cardBorder: shift.border
    },
    dishes: (base.dishes || []).map((dish, dIdx) => ({
      ...dish,
      id: `t${i}-${dIdx + 1}`,
      // Modulate price slightly to ensure variation
      price: Number((dish.price + (cycle * 1.25)).toFixed(2))
    }))
  };
}
