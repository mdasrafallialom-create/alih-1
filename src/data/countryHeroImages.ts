export interface HeroSlideData {
  id: number;
  image: string;
  title: string;
  highlight: string;
  subtitle: string;
  tag: string;
}

export interface CountryHeroPreset {
  country: string;
  aliases: string[];
  description: string;
  slides: HeroSlideData[];
}

export const COUNTRY_HERO_PRESETS: CountryHeroPreset[] = [
  {
    country: 'Pakistan',
    aliases: ['pakistan', 'pk', 'lahore', 'karachi', 'islamabad', 'rawalpindi', 'peshawar', 'quetta', 'faisalabad', 'multan', 'sindh', 'punjab', 'kpk', 'balochistan'],
    description: 'Luxurious Pakistani heritage and fine dining ambiance featuring royal grills, rooftop vistas, and lavish feasts.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85', // Luxury Grand Restaurant Ambiance
        title: 'Royal Mughal & Modern Gastronomy',
        highlight: 'Luxury Dining Experience',
        subtitle: 'Experience royal Pakistani barbecue, fragrant biryanis, and chef-curated continental delights in WebAR 3D.',
        tag: '🇵🇰 Top-Rated Luxury Dining in Pakistan'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85', // Gourmet Grill & Steaks
        title: 'Artisan Charcoal Grill & Shinwari',
        highlight: 'Live Flame Masterpiece',
        subtitle: 'Handcrafted premium cuts, wood-fired naan, and signature clay-oven specialties prepared fresh daily.',
        tag: '🔥 Signature Gourmet Flame Grill'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85', // Warm Ambience Rooftop Dining
        title: 'Exquisite Karak Chai & Royal Desserts',
        highlight: 'Artisanal Sweet Collection',
        subtitle: 'Pair your gourmet feast with handcrafted mocktails, saffron kulfi, and European pastry fusions.',
        tag: '✨ Signature Refreshments & Desserts'
      }
    ]
  },
  {
    country: 'Japan',
    aliases: ['japan', 'jp', 'tokyo', 'kyoto', 'osaka', 'yokohama', 'nagoya', 'sapporo', 'fukuoka', 'kobe'],
    description: 'High-end Japanese Kaiseki, Michelin-star sushi bars, and panoramic Tokyo skyline dining aesthetics.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1600&q=85', // Japanese Luxury Dining
        title: 'Master-Crafted Omakase & Wagyu',
        highlight: 'Michelin Star Aesthetics',
        subtitle: 'Immerse in authentic Japanese culinary precision and interactive 3D WebAR menu previews.',
        tag: '🇯🇵 Tokyo & Kyoto Fine Dining'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1600&q=85', // Elegant Japanese Table Setting
        title: 'Artisanal Sushi & Robata Grill',
        highlight: 'Chef’s Secret Selection',
        subtitle: 'Wild-caught sashimi and A5 Miyazaki Wagyu grilled over binchotan white charcoal.',
        tag: '🍣 Authentic Japanese Robatayaki'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85', // Tokyo Skyline Ambience
        title: 'Zen Garden Mocktails & Matcha Craft',
        highlight: 'Skyline Tea & Dessert Lounge',
        subtitle: 'Artisan Uji matcha pastries and botanical non-alcoholic mixology overlooking city lights.',
        tag: '🍵 Kyoto Tea & Modern Mixology'
      }
    ]
  },
  {
    country: 'Indonesia',
    aliases: ['indonesia', 'id', 'jakarta', 'bali', 'surabaya', 'bandung', 'medan', 'seminyak', 'ubud', 'denpasar'],
    description: 'Exotic Bali luxury pavilions, modern Jakarta rooftop dining, and tropical island culinary masterpieces.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1600&q=85', // Bali Luxury Tropical Restaurant
        title: 'Tropical Luxury Pavilion & Heritage Dining',
        highlight: 'Exotic Indonesian Cuisine',
        subtitle: 'Savor world-acclaimed Rendang, gourmet Satay, and fresh seafood in an open-air luxury oasis.',
        tag: '🇮🇩 Bali & Jakarta Luxury Dining'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85', // Modern High-End Restaurant
        title: 'Chef-Curated Jimbaran Seafood Feast',
        highlight: 'Oceanfront Flame Grills',
        subtitle: 'Fresh lobsters, king prawns, and island spices grilled over coconut husks with sambal pairings.',
        tag: '🦐 Jimbaran Style Seafood Lounge'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85', // Warm Island Ambience
        title: 'Tropical Botanical Elixirs & Es Teler',
        highlight: 'Luxury Island Refreshments',
        subtitle: 'Cool down with handcrafted dragonfruit mocktails, organic coconuts, and traditional sweet delicacies.',
        tag: '🥥 Island Mixology & Gourmet Desserts'
      }
    ]
  },
  {
    country: 'Bangladesh',
    aliases: ['bangladesh', 'bd', 'dhaka', 'dinajpur', 'chittagong', 'sylhet', 'rajshahi', 'khulna', 'barisal', 'rangpur', 'comilla', 'mymensingh'],
    description: 'Five-star Dhaka luxury dining, gourmet Kacchi, tandoori feasts, and waterfront dining spaces.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85', // Luxury Grand Interior
        title: 'Savor Premium Gourmet Cuisine',
        highlight: 'In WebAR 3D Reality',
        subtitle: 'Explore our certified 3D food models inside your table space directly from your browser before ordering.',
        tag: '🇧🇩 3D WebAR Gourmet Dining'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85', // Artisanal Grill
        title: 'Artisan Wood-Fired Pizza & Burgers',
        highlight: 'Chef’s Masterpiece Collection',
        subtitle: 'Handcrafted with organic, premium ingredients and freshly baked every single day by lead chefs.',
        tag: '🔥 Freshly Baked & Grilled Daily'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85', // Cozy Fine Dining
        title: 'Exquisite Refreshing Cocktails',
        highlight: '& Decadent Desserts',
        subtitle: 'Pair your dining experience with custom mixology mocktails and handcrafted European pastries.',
        tag: '✨ Signature Beverages & Desserts'
      }
    ]
  },
  {
    country: 'UAE / Middle East',
    aliases: ['uae', 'united arab emirates', 'dubai', 'abu dhabi', 'sharjah', 'saudi arabia', 'saudi', 'riyadh', 'jeddah', 'qatar', 'doha', 'kuwait', 'oman', 'bahrain'],
    description: 'Ultra-luxurious Dubai golden palace lounges, skyline rooftop fine dining, and royal Arabian banquets.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85', // Luxury Palace Dining
        title: 'Royal Arabian Palace Dining',
        highlight: 'Golden Luxury Ambiance',
        subtitle: 'Experience world-class luxury dining, 24k gold-infused gourmet creations, and WebAR 3D food previews.',
        tag: '🇦🇪 Dubai & Gulf Luxury Dining'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85', // Prime Steaks & Grills
        title: 'Prime Wagyu & Charcoal Mesquite Grill',
        highlight: 'Chef’s Royal Cuts',
        subtitle: 'Premium dry-aged steaks and royal grilled skewers prepared with imported middle-eastern aromatics.',
        tag: '🥩 Five-Star Steakhouse & Grills'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85', // Skyline Lounge
        title: 'Signature Arabic Mocktails & Baklava Atelier',
        highlight: 'Artisanal Dessert Lounge',
        subtitle: 'Indulge in pistachio baklava towers, saffron tea, and smoke-infused mocktails with skyline views.',
        tag: '🍹 Skyline Mixology & Pastries'
      }
    ]
  },
  {
    country: 'India',
    aliases: ['india', 'in', 'delhi', 'mumbai', 'bangalore', 'kolkata', 'hyderabad', 'chennai', 'jaipur', 'pune', 'ahmedabad', 'goa'],
    description: 'Grand royal palace heritage dining, contemporary Michelin-style Indian gastronomy, and festive feasts.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=85', // Indian Fine Dining
        title: 'Royal Heritage Indian Dining',
        highlight: 'Modern Gastronomy Experience',
        subtitle: 'Taste centuries of royal recipes reinvented with modern culinary flair and 3D WebAR menu previews.',
        tag: '🇮🇳 Royal Heritage Fine Dining'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85', // Tandoor & Grills
        title: 'Authentic Clay Oven & Copper Tandoor',
        highlight: 'Slow-Cooked Signature Delights',
        subtitle: 'Marinated for 24 hours with hand-ground spices and roasted to perfection in traditional clay ovens.',
        tag: '🥘 Royal Tandoori & Mughlai'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85', // Warm Ambience
        title: 'Saffron Lassi & Handcrafted Mithai',
        highlight: 'Decadent Royal Sweet Bar',
        subtitle: 'Complete your luxury dining experience with royal rabri, gold-leaf rasmalai, and botanical mocktails.',
        tag: '✨ Saffron Elixirs & Desserts'
      }
    ]
  },
  {
    country: 'United States & Global',
    aliases: ['usa', 'united states', 'america', 'uk', 'united kingdom', 'london', 'canada', 'australia', 'france', 'paris', 'italy', 'rome', 'germany', 'singapore', 'new york', 'los angeles', 'chicago'],
    description: 'Contemporary Michelin star fine dining, artisan wood-fired culinary lounges, and rooftop bistros.',
    slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
        title: 'Savor Premium Gourmet Cuisine',
        highlight: 'In WebAR 3D Reality',
        subtitle: 'Explore our certified 3D food models inside your table space directly from your browser before ordering.',
        tag: '🌟 3D WebAR Dining Experience'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85',
        title: 'Artisan Wood-Fired Pizza & Burgers',
        highlight: 'Chef’s Masterpiece Collection',
        subtitle: 'Handcrafted with organic, premium ingredients and freshly baked every single day by lead chefs.',
        tag: '🔥 Freshly Baked & Grilled Daily'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
        title: 'Exquisite Refreshing Mocktails',
        highlight: '& Decadent Desserts',
        subtitle: 'Pair your dining experience with custom mixology mocktails and handcrafted European pastries.',
        tag: '🍸 Signature Beverages & Desserts'
      }
    ]
  }
];

/**
 * Intelligent helper to resolve the appropriate 3 luxury hero slides for a given country name or address string
 */
export function getHeroSlidesForLocation(locationString: string = '', brandName?: string): HeroSlideData[] {
  if (!locationString) {
    return COUNTRY_HERO_PRESETS[0].slides;
  }

  const normalized = locationString.toLowerCase();
  
  // Find matching preset by country or alias
  const matched = COUNTRY_HERO_PRESETS.find(preset => {
    if (preset.country.toLowerCase() === normalized) return true;
    return preset.aliases.some(alias => normalized.includes(alias));
  });

  const baseSlides = matched ? matched.slides : COUNTRY_HERO_PRESETS[0].slides;

  if (brandName && brandName.trim() && brandName !== "L'Aura") {
    return baseSlides.map((slide, i) => ({
      ...slide,
      title: i === 0 ? `Welcome to ${brandName}` : slide.title
    }));
  }

  return baseSlides;
}
