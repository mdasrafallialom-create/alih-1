export type SubscriptionPlan = 'basic' | 'pro' | 'elite';

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  period: string;
  color: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  displayOrder: number;
  isVisible: boolean;
  createdAt: number;
}

export interface MenuItem {
  id: string;
  restaurantId?: string;
  categoryId?: string; // New required field for structured categories
  name: string;
  description: string;
  price: number;
  category: string; // Keeping as string for flexible names
  image: string;
  glbUrl?: string;
  videoUrl?: string;
  reviews?: Review[];
  spiciness?: number; // 0 to 3
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: number;
  isAvailable?: boolean;
  published?: boolean;
  ingredients?: string;
  is3DEnabled?: boolean;
}

export interface AdminSettings {
  id: string; // The restaurant ID
  ownerId: string;
  ownerEmail?: string;
  theme?: 'light' | 'dark';
  audioEnabled: boolean;
  autoAcceptOrders: boolean;
  securityPinRequired: boolean;
  showCustomerContact: boolean;
  showAdminButton?: boolean;
  showGoogleMap?: boolean;
  adminPassword?: string;
  brandName: string;
  brandLocation: string;
  brandLogo?: string;
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logoStyle?: 'crest' | 'minimal' | 'stamp' | 'modern';
  logoColorPrimary?: string;
  logoColorSecondary?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: 'active' | 'expired' | 'trial';
  customDomain?: string;
  activeThemeId?: string;
  createdAt: number;
  trialEndsAt: number;
  menuItemCount?: number;
  timing?: {
    open: string;
    close: string;
    days: string[];
  };
  hero?: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  heroImages?: string[];
  heroSlides?: {
    id: number;
    image: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    tag?: string;
  }[];
  socialLinks: {
    facebook: string;
    youtube: string;
    instagram: string;
    tiktok: string;
  };
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  showChefSection?: boolean;
  chefProfile?: ChefProfile;
  chefProfiles?: ChefProfile[];
}

export interface ChefProfile {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  rating: number;
  ratingCount?: number;
  experienceYears?: number;
  speciality?: string;
  awards?: string;
}

export const DEFAULT_CHEF_PROFILES: ChefProfile[] = [
  {
    id: 'chef-1',
    name: 'Chef Antoine Laurent',
    role: 'Executive Pastry & Gastronomy Chef',
    bio: 'With over 16 years of culinary mastery trained in renowned Parisian Michelin-starred kitchens, Chef Antoine crafts evocative flavors celebrating nocturnal coffee culture and artisanal pastries.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 1280,
    experienceYears: 16,
    speciality: 'Parisian Pâtisserie & Artisanal Roast',
    awards: 'Michelin Selected & Culinary Gold Medalist'
  },
  {
    id: 'chef-2',
    name: 'Chef Hélène Mercier',
    role: 'Master Chocolatier & Confectioner',
    bio: 'Specializing in single-origin bean roasts paired with tempered French chocolates, Chef Hélène brings delicate, velvety textures to our dessert salon.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=900&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 940,
    experienceYears: 14,
    speciality: 'Valrhona Ganache & Starlight Bonbons',
    awards: 'French National Pâtisserie Champion'
  },
  {
    id: 'chef-3',
    name: 'Chef Marco Valenti',
    role: 'Head Savory & Brunch Artisan',
    bio: 'Infusing Mediterranean warmth into French cafe favorites, Marco curates our celebrated savory breakfast and evening artisan platters.',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=900&auto=format&fit=crop',
    rating: 4.8,
    ratingCount: 820,
    experienceYears: 12,
    speciality: 'Truffle Brioche & Pan-Seared Delicacies',
    awards: 'European Culinary Excellence Award'
  },
  {
    id: 'chef-4',
    name: 'Chef Sophie Dubois',
    role: 'Artisan Baker & Viennoiserie Lead',
    bio: 'Starting before dawn each morning, Sophie oversees the fermentation and 27-layer butter laminations that make our viennoiserie famous across the city.',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=900&auto=format&fit=crop',
    rating: 5.0,
    ratingCount: 1150,
    experienceYears: 15,
    speciality: '72-Hour Sourdough & Laminated Croissants',
    awards: 'Grand Prix de la Baguette Finalist'
  },
  {
    id: 'chef-5',
    name: 'Chef Jean-Luc Moreau',
    role: 'Chief Barista & Beverage Alchemist',
    bio: 'A master of micro-lot extraction and botanical syrups, Jean-Luc engineers our signature moonlit brew and mocktail pairings.',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=900&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 760,
    experienceYears: 10,
    speciality: 'Cold-Drip Geisha & Smoked Infusions',
    awards: 'World Barista Championship Silver'
  },
  {
    id: 'chef-6',
    name: 'Chef Camille Riviere',
    role: 'Sous Chef & Contemporary Plating Artist',
    bio: 'Camille ensures every plate arriving at your table is visually arresting, blending edible botanicals with harmonic geometric presentation.',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=900&auto=format&fit=crop',
    rating: 4.8,
    ratingCount: 690,
    experienceYears: 9,
    speciality: 'Edible Florals & Modern Table Presentation',
    awards: 'Young Culinary Talent of the Year'
  }
];

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  restaurantId?: string;
  tableNumber: string | number;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Kitchen' | 'Serving' | 'Completed' | 'Cancelled';
  timestamp: number;
  cancelReason?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  paymentMethod?: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Refunded';
  paymentVerifiedBy?: string;
  paymentTxnId?: string;
}

export interface SuperAdminSettings {
  platformName: string;
  totalRevenue: number;
  totalRestaurants: number;
  activeSubscriptions: number;
  pendingSupportRequests: number;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  targetId: string;
  targetName: string;
  timestamp: number;
}

export interface SupportRequest {
  id: string;
  restaurantId: string;
  restaurantName: string;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  timestamp: number;
}
