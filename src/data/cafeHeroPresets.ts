import opaluneNitroImg from '../assets/images/opalune_nitro_cold_brew_1791021529686.jpg';
import opaluneTonicImg from '../assets/images/opalune_espresso_tonic_1791021544254.jpg';
import opaluneKyotoImg from '../assets/images/opalune_kyoto_cold_drip_1791021557503.jpg';

export interface CafeHeroSlide {
  id: number;
  number: string;
  eyebrow: string;
  heading: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  img: string;
  actionTarget?: string;
  cupImg?: string;
  cupName?: string;
  price?: string;
  type?: string;
}

export const CAFE_HERO_PRESETS: Record<string, CafeHeroSlide[]> = {
  // #01 Velmora Coffee Artisan (Cafe Starter)
  'velmora-dining': [
    {
      id: 1,
      number: '01',
      eyebrow: 'START YOUR DAY',
      heading: 'WITH COFFEE',
      description: 'Experience the rich aroma of artisanal hand-roasted Arabica beans, crafted with passion to awaken your senses every morning.',
      primaryBtn: 'Shop Now',
      secondaryBtn: 'Explore Blends',
      img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Hand-Crafted Dark Roast',
      price: '$4.50'
    }
  ],

  // #02 Orivelle House (Artisanal Wood-Fired Pizzeria & Haute Gastronomy)
  'orivelle-house': [
    {
      id: 1,
      number: '01',
      eyebrow: 'WOOD-FIRED NEAPOLITAN CRUST',
      heading: 'ARTISANAL TRUFFLE PIZZA',
      description: 'Slow-fermented sourdough crust fired at 900°F, molten buffalo mozzarella, rich San Marzano pomodoro, and aromatic shaved winter truffles.',
      primaryBtn: 'Order Pizza Now',
      secondaryBtn: 'Explore Gourmet Menu',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Artisanal Round Truffle Pizza',
      price: 'Chef Signature',
      type: 'pizza'
    }
  ],

  // #03 Lunavere Parisian Cafe (Parisian Night Cafe)
  'lunavere': [
    {
      id: 1,
      number: '01',
      eyebrow: 'PARISIAN STARLIGHT CAFE',
      heading: 'LUNAVERE NIGHTS & COFFEE',
      description: 'An intimate Parisian coffee house for slow evenings, delicate pastries, and beautifully brewed single-origin coffee.',
      primaryBtn: 'Explore Night Cafe',
      secondaryBtn: 'Book Table',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Single Origin Siphon Brew',
      price: '$5.50'
    }
  ],

  // #04 Aurelisse (Gourmet Wagyu Burgers & Flame-Grilled Feast)
  'aurelisse': [
    {
      id: 1,
      number: '01',
      eyebrow: 'FLAME-GRILLED WAGYU HOUSE',
      heading: 'SMOKEY CHEDDAR WAGYU BURGERS',
      description: 'Hand-crafted 100% Wagyu beef patties, seared over open white-oak charcoal, topped with melted Vermont cheddar, crispy bacon & house secret sauce on warm brioche.',
      primaryBtn: 'Order Burger Feast',
      secondaryBtn: 'View Burger Menu',
      img: '/src/assets/images/hero_gourmet_burger_artisan_1790839016081.jpg',
      actionTarget: 'menu',
      cupName: 'Double Flame-Grilled Wagyu Cheeseburger',
      price: '$18.50',
      type: 'burger'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'ARTISAN BRIOCHE & CRAFT SIDES',
      heading: 'LACE-EDGE DOUBLE SMASHBURGER',
      description: 'Crispy lace-edged double smashed beef patties with melted American cheese, house special sauce & dill pickles on toasted sesame brioche.',
      primaryBtn: 'Explore Gourmet Burgers',
      secondaryBtn: 'View Loaded Sides',
      img: '/src/assets/images/burger_artisan_smashburger_1790839032894.jpg',
      actionTarget: 'menu',
      cupName: 'Lace-Edge Double Smashburger',
      price: '$16.00',
      type: 'burger'
    }
  ],

  // #05 Palatiora (Savorelle Dining & Teriyaki Wings)
  'palatiora': [
    {
      id: 1,
      number: '01',
      eyebrow: 'SAVOR EVERY MOMENT WITH',
      heading: 'EVERY BITE',
      description: 'Experience gourmet dining crafted with passion, fresh ingredients, and unforgettable flavors.',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Reserve Your Table',
      img: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Teriyaki Sesame Wings',
      price: '$28.00',
      type: 'wings'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'HANDMADE SENSATIONAL PASTA',
      heading: 'BLACK TRUFFLE PASTA',
      description: 'Handmade farfalle and wild forest mushrooms tossed in shaved black truffle emulsion.',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Reserve Your Table',
      img: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Truffle Pasta',
      price: '$65.00',
      type: 'pasta'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'FRESH CASPIAN CULINARY ART',
      heading: 'SEA URCHIN RISOTTO',
      description: 'Creamy Carnaroli saffron risotto crowned with fresh sea urchin and butter-poached prawns.',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Reserve Your Table',
      img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Sea Urchin Risotto',
      price: '$90.00',
      type: 'seafood'
    },
    {
      id: 4,
      number: '04',
      eyebrow: 'HIMALAYAN SALT CAVE AGED',
      heading: '45-DAY DRY TOMAHAWK',
      description: 'Prime Black Angus Tomahawk dry-aged in Himalayan salt caves, seared over oak charcoal.',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Reserve Your Table',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: '45-Day Tomahawk Steak',
      price: '$150.00',
      type: 'steak'
    },
    {
      id: 5,
      number: '05',
      eyebrow: 'USDA PRIME SELECTION',
      heading: 'WOOD-FIRED BONE RIBEYE',
      description: 'USDA Prime ribeye brushed with roasted garlic marrow butter and Maldon smoked salt.',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Reserve Your Table',
      img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Bone-In Prime Ribeye',
      price: '$85.00',
      type: 'steak'
    },
    {
      id: 6,
      number: '06',
      eyebrow: 'CEREMONIAL UJI MATCHA',
      heading: 'MATCHA LAVA CAKE',
      description: 'Warm ceremonial Uji matcha crepe and molten lava cake served with sweet mascarpone.',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Reserve Your Table',
      img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Matcha Lava Cake',
      price: '$35.00',
      type: 'dessert'
    }
  ],

  // #06 Opalune Nitro Cold Brew (Modern Cold Brew Cafe)
  'opalune': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MINIMALIST WHITE GRANITE',
      heading: 'NITRO COLD BREW ATRIUM',
      description: 'Clean architectural lines, chilled quartz coffee bars, and nitrogen-infused slow-drip single-origin extractions.',
      primaryBtn: 'Discover Nitro Bar',
      secondaryBtn: 'Order Ahead',
      img: opaluneNitroImg,
      actionTarget: 'menu',
      cupName: 'Artisanal Nitro Cold Brew',
      price: '$6.00'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'SPARKLING CITRUS EXTRACTION',
      heading: 'CASCADE ESPRESSO TONIC',
      description: 'Effervescent tonic water poured over ice, crowned with a fresh double shot of Ethiopian Yirgacheffe and citrus essence.',
      primaryBtn: 'Explore Tonic Blends',
      secondaryBtn: 'Reserve Seat',
      img: opaluneTonicImg,
      actionTarget: 'menu',
      cupName: 'Sparkling Yuzu Espresso Tonic',
      price: '$7.50'
    },
    {
      id: 3,
      number: '03',
      eyebrow: '18-HOUR KYOTO TOWER',
      heading: 'SLOW-DRIP COLD TOWER',
      description: 'Single-drop extraction through crystal spirals for an ultra-smooth, low-acidity velvety coffee profile.',
      primaryBtn: 'View Cold Towers',
      secondaryBtn: 'Book Tasting',
      img: opaluneKyotoImg,
      actionTarget: 'menu',
      cupName: 'Kyoto Glass Slow-Drip Reserve',
      price: '$9.00'
    },
    {
      id: 4,
      number: '04',
      eyebrow: 'TAHITIAN VANILLA GELATO',
      heading: 'AFFOGATO GELATO ARTISAN',
      description: 'Hot ristretto double espresso poured tableside over artisanal Tahitian vanilla bean gelato.',
      primaryBtn: 'Try Affogato',
      secondaryBtn: 'Order Dessert',
      img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Tahitian Vanilla Affogato',
      price: '$8.50'
    },
    {
      id: 5,
      number: '05',
      eyebrow: 'OAT MILK MICROFOAM',
      heading: 'VELVET FLAT WHITE',
      description: 'Silky steam-microfoamed oat milk poured over a rich ristretto base with intricate rosette latte art.',
      primaryBtn: 'Order Latte Bar',
      secondaryBtn: 'Explore Menu',
      img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Artisanal Velvet Flat White',
      price: '$5.50'
    },
    {
      id: 6,
      number: '06',
      eyebrow: 'TOASTED NUT ESSENCE',
      heading: 'ROASTED MACADAMIA LATTE',
      description: 'House-pressed roasted macadamia nut milk, toasted organic sugar cane, and cinnamon smoke finish.',
      primaryBtn: 'Taste Specialty',
      secondaryBtn: 'Order Online',
      img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Roasted Macadamia Nut Latte',
      price: '$6.80'
    }
  ],

  // #07 Emberion (5-Star Robata & Grill)
  'emberion': [
    {
      id: 1,
      number: '01',
      eyebrow: 'JAPANESE ROBATA CHARCOAL',
      heading: 'EMBER SMOKE & ROAST',
      description: 'Fiery binchotan charcoal grills paired with smoky roasted teas, Kyoto cold drips, and sizzling A5 Wagyu skewers.',
      primaryBtn: 'Explore Robata Menu',
      secondaryBtn: 'Book Counter Seat',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Robata Binchotan Charcoal Skewers',
      price: 'Robata Masterpiece',
      type: 'chicken'
    }
  ],

  // #08 Couravelle Courtyard Cafe (French Courtyard Cafe)
  'couravelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'FRENCH PALACE COURTYARD CAFE',
      heading: 'Sunlit Terrace & Morning Cafe au Lait',
      description: 'Bask in quiet elegance under ivory parasols with pour-over coffee, house-made fruit preserves, and warm sourdough loaves.',
      primaryBtn: 'Explore Terrace Menu',
      secondaryBtn: 'Book Courtyard Seat',
      img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Pour Over Ethiopian Yirgacheffe',
      price: '$5.00'
    }
  ],

  // #09 Ivorelle (5-Star Chateau Gastronomy)
  'ivorelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'FRENCH ALABASTER CHATEAU',
      heading: 'SILK IVORY & CHAMPAGNE',
      description: 'Silky smooth alabaster architecture with champagne breakfasts, brioche French toast, and delicate cafe au lait.',
      primaryBtn: 'View Chateau Menu',
      secondaryBtn: 'Book Morning Salon',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Grand Cru Valrhona Chocolate Sphere',
      price: 'Artisanal Selection',
      type: 'dessert'
    }
  ],

  // #10 Caravelle Dining (5-Star Skyline Rooftop Dining)
  'caravelle-dining': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CELESTIAL SKYLINE ROOFTOP',
      heading: 'SAPPHIRE NIGHT & COCKTAILS',
      description: 'Glittering high-altitude views with liquid nitrogen espresso martinis, blue curaçao blends, and starlight dining.',
      primaryBtn: 'Book Rooftop Table',
      secondaryBtn: 'Explore Drinks',
      img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Starlight Skyline Tasting Platter',
      price: 'Chef Reserve',
      type: 'cloche'
    }
  ],

  // #11 Elvaris Espresso Roastery (Artisan Coffee Roastery)
  'elvaris-atelier': [
    {
      id: 1,
      number: '01',
      eyebrow: 'BORDEAUX WINE ATELIER',
      heading: 'CRIMSON CELLARS & CUISINE',
      description: 'Deep velvet red bistro with oak barrel aged coffees, grand cru pairings, and artisanal charcuterie boards.',
      primaryBtn: 'Explore Atelier',
      secondaryBtn: 'Book Wine Tasting',
      img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Oak Barrel Aged Espresso',
      price: '$5.50'
    }
  ],

  // #12 Silvarenne Titanium Cafe (High-Tech Specialty Cafe)
  'silvarenne': [
    {
      id: 1,
      number: '01',
      eyebrow: 'HIGH-FASHION TITANIUM BISTRO',
      heading: 'PRECISION ESPRESSO & MONO',
      description: 'Polished silver and titanium espresso machines delivering single-origin extractions with geometric culinary craft.',
      primaryBtn: 'Order Modern Espresso',
      secondaryBtn: 'Explore Concept',
      img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Micro-Extracted Titanium Espresso',
      price: '$4.80'
    }
  ],

  // #13 Monarchia House (5-Star Fine Dining & Platinum Society)
  'monarchia-house': [
    {
      id: 1,
      number: '01',
      eyebrow: 'PLATINUM SOCIETY & HAUTE CUISINE',
      heading: 'MONARCHIA PLATINUM GASTRONOMY',
      description: 'Pure platinum shimmer paired with dark slate for ultra-modern luxury dining, private member banquets, and grand tasting menus.',
      primaryBtn: 'Reserve Private Table',
      secondaryBtn: 'Explore Tasting Menu',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Monarchia Sovereign Platinum Feast',
      price: 'Chef Special',
      type: 'cloche'
    }
  ],

  // #14 Reservelle (Heritage Royal Banquet Hall & VIP Club)
  'reservelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'HERITAGE ROYAL BANQUET & CLUB',
      heading: 'RESERVELLE GOLD CREST DINING',
      description: 'Imperial gold crests on midnight black canvas for heritage royal banquet halls, rare sommelier vintages, and VIP dining.',
      primaryBtn: 'Book VIP Table',
      secondaryBtn: 'View Banquet Menu',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Reservelle Imperial Osetra Caviar',
      price: 'Imperial Choice',
      type: 'caviar'
    }
  ],

  // #15 VELLUNARA - THEME #15 (Artisanal Wood-Fired Stone Pizzeria)
  'vellunara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ARTISANAL WOOD-FIRED CRAFT',
      heading: 'WOOD-FIRED NEAPOLITAN PIZZA',
      description: 'Handcrafted wood-fired Neapolitan pizza with bubbling buffalo mozzarella, sweet San Marzano tomato reduction, and fresh Italian basil leaves on slow-fermented sourdough crust.',
      primaryBtn: 'Order Fresh Pizza',
      secondaryBtn: 'Explore Pizza Menu',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop',
      actionTarget: 'order',
      cupName: 'Round Wood-Fired Neapolitan Pizza',
      price: '$24.00',
      type: 'pizza'
    }
  ],

  // #16 Zafrelle Hand-Grinder Cafe (Vintage Grinder Cafe)
  'zafrelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'VINTAGE BRASS HAND-GRINDER CAFE',
      heading: 'FRESHLY GROUND AROMATICS',
      description: 'Vintage brass hand-grinders, freshly ground aromatics, single-origin bean blooms, and mesmerizing siphon alchemy.',
      primaryBtn: 'Order Fresh Grind',
      secondaryBtn: 'Explore Siphon Alchemy',
      img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Vintage Brass Hand-Ground Siphon',
      price: '$5.20'
    }
  ],

  // #17 Obscurielle (Exotic Saffron & Raw Silk Fine Dining)
  'obscurielle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'EXOTIC SAFFRON & RAW SILK',
      heading: 'OBSCURIELLE ROYAL SPICE SALON',
      description: 'Exotic saffron amber and raw silk weaves for high-end Middle Eastern and Indian royal banquets with slow-smoked claypot dishes.',
      primaryBtn: 'Reserve Royal Salon',
      secondaryBtn: 'Explore Spice Repertoire',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Royal Saffron Infused Braised Lamb',
      price: 'Chef Special',
      type: 'cloche'
    }
  ],

  // #18 Perlavia (Minimalist Modern Obsidian Matte Line-Art)
  'perlavia': [
    {
      id: 1,
      number: '01',
      eyebrow: 'DEEP MATTE OBSIDIAN BLACK',
      heading: 'PERLAVIA MODERN MINIMALISM',
      description: 'Ultra-modern deep matte obsidian canvas with metallic silver line-art, precision micro-seasoned dishes, and clean plating.',
      primaryBtn: 'Explore Modern Menu',
      secondaryBtn: 'Reserve Minimalist Table',
      img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Obsidian Cured Hamachi Tartare',
      price: 'Tasting Course',
      type: 'cloche'
    }
  ],

  // #19 Polivara (Organic Pearl White & Black Pepper Bistro)
  'polivara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'SOFT PEARL WHITE BISTRO',
      heading: 'ORGANIC COFFEE & FRESH HARVEST',
      description: 'Soft pearl white with cracked black pepper contrasts for modern organic coffee bistros and stone-ground sourdough breakfasts.',
      primaryBtn: 'Order Organic Brunch',
      secondaryBtn: 'View Daily Bakes',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Organic Pearl Velvet Cappuccino',
      price: '$4.80'
    }
  ],

  // #20 Noctavelle (Midnight Contemporary Seafood & Grill)
  'noctavelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MIDNIGHT MIRROR CHROME & GRILL',
      heading: 'NOCTAVELLE CONTEMPORARY SEAFOOD',
      description: 'Glossy polished steel and mirror chrome accents for contemporary seafood, live oyster bars, and wood-fired lobster grills.',
      primaryBtn: 'Reserve Seafood Table',
      secondaryBtn: 'Explore Raw Bar',
      img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Wood-Fired Maine Lobster Tail',
      price: 'Market Catch',
      type: 'cloche'
    }
  ],

  // #21 Marovelle Stovetop Moka (Italian Cafe)
  'marovelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'AUTHENTIC ITALIAN STOVETOP MOKA',
      heading: 'TRADITIONAL MOKA POT BREW',
      description: 'Thick velvet golden crema brewed over open flames with Italian heirloom beans, almond biscotti, and authentic Roman breakfast bakes.',
      primaryBtn: 'Order Italian Espresso',
      secondaryBtn: 'View Trattoria Bakes',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Stovetop Moka Double Crema',
      price: '$4.20'
    }
  ],

  // #22 Regavelle (Carrara White Marble & Rose Gold Dining)
  'regavelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CARRARA MARBLE & ROSE GOLD',
      heading: 'REGAVELLE LUXURY SALON',
      description: 'Carrara white marble textures with delicate rose gold metallic trims for luxury cafes, fine dining, and afternoon tea towers.',
      primaryBtn: 'Reserve Marble Salon',
      secondaryBtn: 'Explore High Tea',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Rose Gold Infused Tea & Macarons',
      price: 'Salon Choice',
      type: 'dessert'
    }
  ],

  // #23 Elysara (Imperial Emerald Green & Regal Gold)
  'elysara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'IMPERIAL EMERALD & REGAL GOLD',
      heading: 'ELYSARA STATELY DINING',
      description: 'Imperial emerald green velvet with regal gold trim for stately dining rooms, 5-star associations, and monarch tasting banquets.',
      primaryBtn: 'Book Stately Banquet',
      secondaryBtn: 'View Imperial Reserves',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Elysara Imperial Wagyu Course',
      price: 'Monarch Special',
      type: 'steak'
    }
  ],

  // #24 Cindervale (Binchotan Charcoal & Wagyu Steakhouse)
  'cindervale': [
    {
      id: 1,
      number: '01',
      eyebrow: 'BINCHOTAN CHARCOAL & WAGYU',
      heading: 'CINDERVALE EMBER STEAKHOUSE',
      description: 'Mystical golden light beaming through dark embers for experimental wood-fired gastronomy, smoked bone marrow, and prime tomahawks.',
      primaryBtn: 'Reserve Ember Table',
      secondaryBtn: 'Explore Charcoal Menu',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Charcoal Smoked Prime Tomahawk',
      price: 'Chef Selection',
      type: 'steak'
    }
  ],

  // #25 Linorelle (Volcanic Ash Black & Modern Burger Grill)
  'linorelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'VOLCANIC ASH & ARTISAN GRILL',
      heading: 'LINORELLE GOURMET BURGERS',
      description: 'Volcanic ash black with warm embers for modern wood-fired steakhouses, artisanal double wagyu smash burgers, and smoked wings.',
      primaryBtn: 'Order Wagyu Burger',
      secondaryBtn: 'View Grill Menu',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Double Truffle Wagyu Burger',
      price: '$18.50',
      type: 'burger'
    }
  ],

  // #26 Lumecourt (Crisp White Linen Coffee & Lunch Bistro)
  'lumecourt': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CRISP WHITE LINEN BISTRO',
      heading: 'LUMECOURT CAFE & LUNCH',
      description: 'Crisp starched white linen minimalism with slate grey serif typography for artisanal coffee, fresh quiches, and sunny lunch gatherings.',
      primaryBtn: 'View Lunch Menu',
      secondaryBtn: 'Book Bistro Table',
      img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Cold Drip Reserve & Brioche Toast',
      price: '$6.50'
    }
  ],

  // #27 Sapphirenne (Warm Flickering Candlelight Wine Cellar)
  'sapphirenne': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CANDLELIGHT CELLAR & TAVERN',
      heading: 'SAPPHIRENNE OAK CELLAR',
      description: 'Warm flickering candlelight glow set in dark oak dining chambers and library cellars with artisan charcuterie and aged Pinot Noir.',
      primaryBtn: 'Book Cellar Chamber',
      secondaryBtn: 'Explore Sommelier List',
      img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Grand Reserve Charcuterie Platter',
      price: '$32.00',
      type: 'cloche'
    }
  ],

  // #28 Bellavere (Midnight Ocean Sapphire Coastal Seafood)
  'bellavere': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MIDNIGHT OCEAN SAPPHIRE',
      heading: 'BELLAVERE COASTAL FINE DINING',
      description: 'Midnight ocean sapphire with star-gold accents for coastal fine dining, Mediterranean wild turbot, and chilled sea salt martinis.',
      primaryBtn: 'Reserve Ocean Table',
      secondaryBtn: 'Explore Seafood Catch',
      img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Wild Mediterranean Sea Bass',
      price: 'Market Special',
      type: 'cloche'
    }
  ],

  // #29 Copriva (French Riviera Bistro & Coffee Terrace)
  'copriva': [
    {
      id: 1,
      number: '01',
      eyebrow: 'FRENCH RIVIERA BISTRO AMBIENCE',
      heading: 'COPRIVA SUNLIT TERRACE',
      description: 'Charming French Riviera bistro ambience with warm buttercream and olive green for coffee terraces, flaky croissants, and ratatouille tarts.',
      primaryBtn: 'Explore Terrace Menu',
      secondaryBtn: 'Order Riviera Bakes',
      img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Riviera Cafe au Lait & Almond Croissant',
      price: '$5.50'
    }
  ],

  // #30 Degustara Chemex Alchemy (Specialty Chemex Coffee)
  'degustara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CHEMEX POUR-OVER ALCHEMY',
      heading: 'ARTISAN CHEMEX TASTING BAR',
      description: 'Artisan hand-blown Chemex pour-over with tasting notes of wild berries, cocoa nibs, floral jasmine, and silky single-origin coffee.',
      primaryBtn: 'Explore Chemex Flights',
      secondaryBtn: 'Reserve Bar Seat',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Panama Geisha Chemex Reserve',
      price: '$8.50'
    }
  ],

  // #31 Lumivara (Golden Aurora Fine Dining & Saffron Risotto)
  'lumivara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'VELVET PLUM & GOLDEN AMARANTH',
      heading: 'LUMIVARA BOUTIQUE FUSION',
      description: 'Vibrant velvet plum and golden amaranth flower hues for boutique fusion dining, 5-star lounges, and gold-leaf saffron risotto.',
      primaryBtn: 'Reserve Boutique Table',
      secondaryBtn: 'View Fusion Menu',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: '24K Gold Saffron Carnaroli Risotto',
      price: 'Chef Masterpiece',
      type: 'cloche'
    }
  ],

  // #32 Embrelune (Crystal Glass Teal & Cold Brew Bar)
  'embrelune': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CRYSTAL GLASS TEAL COFFEE & TEA',
      heading: 'ICY EMERALD NITRO COLD BREW',
      description: 'Sleek glassmorphic coffee bar featuring 24-hour slow-steeped cold brews, pistachio cream foams, and crystal clear icy glass aesthetics.',
      primaryBtn: 'Explore Nitro Bar',
      secondaryBtn: 'Order Cold Brews',
      img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Emerald Slow-Drip Cold Brew',
      price: '$6.20'
    }
  ],

  // #33 Figavelle Turkish Sand Cafe (Authentic Copper Cezve)
  'figavelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'TRADITIONAL HOT SAND BREWING',
      heading: 'FIGAVELLE TURKISH COPPER CEZVE',
      description: 'Authentic copper cezve brewed on sizzling golden sand beds with rich cardamom froth, Turkish delights, and pistachio baklava.',
      primaryBtn: 'Order Turkish Brew',
      secondaryBtn: 'Explore Sweet Delights',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Golden Sand Cezve Cardamom Brew',
      price: '$4.50'
    }
  ],

  // #34 Zafravia (Noble Royal Crest Navy & Gold Fine Dining)
  'zafravia': [
    {
      id: 1,
      number: '01',
      eyebrow: 'NOBLE ROYAL CREST & NAVY GOLD',
      heading: 'ZAFRAVIA 5-STAR ASSOCIATION',
      description: 'Noble royal crest badges with classic deep navy and regal gold foil typography for 5-star associations and diplomatic banquets.',
      primaryBtn: 'Book Diplomatic Salon',
      secondaryBtn: 'View Royal Menu',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Diplomatic Truffle & Duck Confit',
      price: 'Sovereign Selection',
      type: 'cloche'
    }
  ],

  // #35 Hearthora (Late Night Neon Purple & Electric Amber Supper Club)
  'hearthora': [
    {
      id: 1,
      number: '01',
      eyebrow: 'NEON PURPLE & ELECTRIC AMBER',
      heading: 'HEARTHORA LATE NIGHT SUPPER',
      description: 'Vibrant neon purple and electric amber for high-end late night supper clubs, flaming signature cocktails, and robata tapas.',
      primaryBtn: 'Book Supper Table',
      secondaryBtn: 'Explore Night Bites',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Flaming Wagyu Skewers & Truffle Dip',
      price: '$24.00',
      type: 'chicken'
    }
  ],

  // #36 Olivara (Botanical Greenhouse & Matcha Garden Bistro)
  'olivara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'BOTANICAL GREENHOUSE & GARDEN CAFE',
      heading: 'LUSH GREENERY & ICED MATCHA',
      description: 'Immerse yourself in a glass greenhouse surrounded by lush tropical plants, ceremonial Japanese matcha lattes, and farm-fresh avocado toasts.',
      primaryBtn: 'Explore Garden Bar',
      secondaryBtn: 'Reserve Glasshouse Table',
      img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Ceremonial Uji Matcha Latte',
      price: '$5.80'
    }
  ],

  // #37 Crimsera (Mediterranean Coastal Sunset & Fig Tapas)
  'crimsera': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MEDITERRANEAN SUNLIT COASTAL CAFE',
      heading: 'SUNLIT TERRACE & FIG LATTE',
      description: 'Golden Mediterranean sunlit terrace with fig infused lattes, fresh ricotta sourdough toast, and iced citrus espresso tonics.',
      primaryBtn: 'Explore Terrace Brunch',
      secondaryBtn: 'Book Sunlit Table',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Mediterranean Fig & Wild Honey Latte',
      price: '$5.40'
    }
  ],

  // #38 Luxevia (Modern Pan-Asian Omakase & Gold Leaf Nigiri)
  'luxevia': [
    {
      id: 1,
      number: '01',
      eyebrow: 'SAFFRON GOLD & WARM TERRACOTTA',
      heading: 'LUXEVIA PAN-ASIAN OMAKASE',
      description: 'Aromatic saffron gold and warm terracotta for royal Persian and modern Asian fine dining with 24k gold leaf Otoro nigiri.',
      primaryBtn: 'Book Omakase Counter',
      secondaryBtn: 'View Tasting Journey',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: '24K Gold Bluefin Otoro Nigiri',
      price: 'Omakase Course',
      type: 'cloche'
    }
  ],

  // #39 Lumivelle Barista Lounge (Hearthfire Roasted Beans)
  'lumivelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ARTISAN HEARTHFIRE COFFEE & BAKERY',
      heading: 'ROASTED BEANS & STONE OVEN BRIOCHE',
      description: 'Experience the aroma of freshly roasted single-origin Arabica paired with flaky morning butter croissants baked in our stone hearth.',
      primaryBtn: 'Explore Coffee & Pastries',
      secondaryBtn: 'Order Fresh Bakes',
      img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Hearthfire Roasted Dark Mocha',
      price: '$5.20'
    }
  ],

  // #40 Amberelle Sunset Cafe (Tuscan Sunset Trattoria)
  'amberelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'TUSCAN SUN-BLEACHED TRATTORIA CAFE',
      heading: 'AROMA OF TUSCANY ESPRESSO BAR',
      description: 'Tuscan olive grove vibes paired with dark-roasted Robusta espresso, pistachio cantucci, and velvety caramel macchiatos.',
      primaryBtn: 'View Espresso Bar',
      secondaryBtn: 'Explore Trattoria Menu',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Tuscan Salted Caramel Macchiato',
      price: '$5.00'
    }
  ],

  // #41 Rosavere (Parisian Rose Petal Pastry & Champagne Bistro)
  'rosavere': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ROSE PETAL PASTRY & CHAMPAGNE',
      heading: 'ROSAVERE PARISIAN SALON',
      description: 'Deep crimson velvet and rose petal tea infusions with sparkling French champagne, flaky strawberry tartlets, and berry eclairs.',
      primaryBtn: 'Reserve Rose Salon',
      secondaryBtn: 'Explore Pastry Boutique',
      img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Wild Berry Rose Petal Tartlet',
      price: '$7.50',
      type: 'dessert'
    }
  ],

  // #42 Harvessa (Champagne Rose Shimmer & Night Starlight Bistro)
  'harvessa': [
    {
      id: 1,
      number: '01',
      eyebrow: 'PARISIAN BOULEVARD DESSERT & COFFEE',
      heading: 'CHAMPAGNE ROSE & NIGHT BREWS',
      description: 'Romantic boulevard dining under ambient street lamps with vanilla bean latte art, dark chocolate soufflés, and champagne cocktails.',
      primaryBtn: 'Book Date Night Table',
      secondaryBtn: 'Explore Dessert Menu',
      img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Valrhona Dark Chocolate Soufflé',
      price: '$12.00',
      type: 'dessert'
    }
  ],

  // #43 Marovian (Silk Road Spiced Duck & Bamboo Tea Cafe)
  'marovian': [
    {
      id: 1,
      number: '01',
      eyebrow: 'GLOWING LANTERNS & BAMBOO TEA',
      heading: 'MAROVIAN SILK ROAD GASTRONOMY',
      description: 'Warm glowing paper lanterns and soft bamboo tones for serene Japanese and Silk Road cuisine, smoked duck breast, and matcha pots.',
      primaryBtn: 'Book Zen Table',
      secondaryBtn: 'Explore Izakaya Menu',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Silk Road Smoked Duck Breast',
      price: 'Chef Special',
      type: 'cloche'
    }
  ],

  // #44 Solarienne (Côte d'Azur Sunlit Seafood & Citrus Garden)
  'solarienne': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CÔTE D\'AZUR SUNLIT SEAFOOD',
      heading: 'SOLARIENNE CITRUS TERRACE',
      description: 'Warm amber glow and brushed bronze accents with lemon tree courtyard dining, grilled sea scallops, and iced citrus spritzers.',
      primaryBtn: 'Explore Citrus Menu',
      secondaryBtn: 'Book Terrace Lounge',
      img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Grilled Sea Scallops & Lemon Butter',
      price: '$28.00',
      type: 'cloche'
    }
  ],

  // #45 Garnivelle (Royal Pearl Tea Room & Macaron Boutique)
  'garnivelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'HIGH TEA & PEARL DESSERT BOUTIQUE',
      heading: 'ROSE LATTE & ROYAL HIGH TEA',
      description: 'Step into an enchanting pearl ivory atmosphere with artisanal French macarons, floral tea infusions, and velvet cold foam espresso.',
      primaryBtn: 'Reserve High Tea Table',
      secondaryBtn: 'View Dessert Showcase',
      img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Artisanal French Macaron Tower',
      price: '$14.00',
      type: 'dessert'
    }
  ],

  // #46 Maison Virelle (Stone Oven Bakery & Golden Honey Brews)
  'maison-virelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ORGANIC STONE OVEN BAKERY & ESPRESSO',
      heading: 'SOURDOUGH & GOLDEN HONEY BREWS',
      description: 'From golden wheat fields to your table. Enjoy slow-fermented artisan breads, Saigon cinnamon rolls, and rich double-shot espresso.',
      primaryBtn: 'Order Artisan Breads',
      secondaryBtn: 'View Today\'s Bakes',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Stone-Baked Sourdough & Honey Butter',
      price: '$8.00'
    }
  ],

  // #47 Nobravie (Black Truffle Fondue & Alpine Wine Cellar)
  'nobravie': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MAROON VELVET & ALPINE CELLAR',
      heading: 'NOBRAVIE TRUFFLE & STEAK CELLAR',
      description: 'Rich maroon velvet and golden mahogany for stately steak cellars, black truffle cheese fondue, and rare vintage cellar pairings.',
      primaryBtn: 'Reserve Cellar Booth',
      secondaryBtn: 'View Steak Cuts',
      img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: 'Black Truffle Alpine Prime Rib',
      price: 'Cellar Special',
      type: 'steak'
    }
  ],

  // #48 Veloura Table (Coastal Greek Taverna & Seafood)
  'veloura-table': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MEDITERRANEAN COASTAL SUNSHINE',
      heading: 'VELOURA AEGEAN SEAFOOD TABLE',
      description: 'Bright Mediterranean sunshine gold and sky blue for authentic coastal Aegean tavernas, char-grilled octopus, and fresh pita bread.',
      primaryBtn: 'Explore Aegean Menu',
      secondaryBtn: 'Book Sea Table',
      img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Char-Grilled Aegean Sea Octopus',
      price: '$26.00',
      type: 'cloche'
    }
  ],

  // #49 Gildara (24K Gold Leaf Omakase & Imperial Wagyu Palace)
  'gildara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'GARNET WINE & ROSE-GOLD FOIL',
      heading: 'GILDARA IMPERIAL PALACE',
      description: 'Deep garnet red wine tones with brushed rose-gold foil for haute French dining, 5-star associations, and 24k gold leaf imperial beef courses.',
      primaryBtn: 'Reserve Imperial Palace',
      secondaryBtn: 'View Grand Menu',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation',
      cupName: '24K Gold Leaf Imperial Wagyu',
      price: 'Imperial Masterpiece',
      type: 'cloche'
    }
  ],

  // #50 Ivoria Dining (Alpine Timber Chalet & Spiced Hazelnut Lounge)
  'ivoria-dining': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ALPINE TIMBER CHALET & COFFEE HOUSE',
      heading: 'FIREPLACE GLOW & SPICED HAZELNUT',
      description: 'Escape to a warm alpine cabin with crackling fireplace glow, hot cinnamon cider, maple pecan pastries, and slow pour-over brews.',
      primaryBtn: 'Warm Alpine Menu',
      secondaryBtn: 'Book Chalet Corner',
      img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=1600&auto=format&fit=crop',
      actionTarget: 'menu',
      cupName: 'Hot Spiced Hazelnut Alpine Cocoa',
      price: '$5.50'
    }
  ]
};
