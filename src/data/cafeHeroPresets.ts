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
}

export const CAFE_HERO_PRESETS: Record<string, CafeHeroSlide[]> = {
  'lumivelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ARTISAN HEARTHFIRE COFFEE & BAKERY',
      heading: 'Roasted Beans & Stone Oven Brioche',
      description: 'Experience the aroma of freshly roasted single-origin Arabica paired with flaky morning butter croissants baked in our stone hearth.',
      primaryBtn: 'Explore Coffee & Pastries',
      secondaryBtn: 'Order Fresh Bakes',
      img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'FRESH DAILY HEARTH BAKERY',
      heading: 'Flaky Butter Almond Croissants & Latte Art',
      description: 'Baked fresh every morning with French cultured butter, roasted almond flakes, and served with rich Madagascar caramel latte.',
      primaryBtn: 'View Bakery Menu',
      secondaryBtn: 'Reserve Morning Table',
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'COZY BRICK & TIMBER AMBIANCE',
      heading: 'Warm Hearth Fires & Slow Brewed Coffee',
      description: 'Relax in our warm wooden coffee lounge with vintage brick walls, crackling hearth fires, and handcrafted pour-over brews.',
      primaryBtn: 'Explore Lounge',
      secondaryBtn: 'Book Corner Lounge',
      img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation'
    }
  ],
  'garnivelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'HIGH TEA & PEARL DESSERT BOUTIQUE',
      heading: 'Elegance in Every Cup — Rose Latte & High Tea',
      description: 'Step into an enchanting pearl ivory atmosphere with artisanal French macarons, floral tea infusions, and velvet cold foam espresso.',
      primaryBtn: 'Reserve High Tea Table',
      secondaryBtn: 'View Dessert Showcase',
      img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'FRENCH PASTRY SHOWCASE',
      heading: 'Artisanal Macarons & Strawberry Tartlets',
      description: 'Delicate pink macarons, organic berry custards, and blown sugar decorations crafted daily by master pastry chefs.',
      primaryBtn: 'Explore Pastries',
      secondaryBtn: 'Order Custom Box',
      img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'ROYAL PEARL TEA ROOM',
      heading: 'High Tea Towers & Velvet Pistachio Cold Foam',
      description: 'Indulge in 3-tier high tea stands with smoked salmon savory canapés, scones with clotted cream, and specialty lattes.',
      primaryBtn: 'View Tea Menu',
      secondaryBtn: 'Reserve Tea Salon',
      img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation'
    }
  ],
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
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'SINGLE-ORIGIN POUR OVER BAR',
      heading: 'Artisanal Drip Coffee & Organic Preserves',
      description: 'Hand-selected Ethiopian Yirgacheffe beans dripped to perfection, served with warm cultured butter and brioche.',
      primaryBtn: 'View Coffee List',
      secondaryBtn: 'Reserve Courtyard',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'PARISIAN GARDEN DINING',
      heading: 'Stone-Baked Sourdough & Fresh Garden Salads',
      description: 'Rustic sourdough bread baked daily in traditional wood ovens, served with poached eggs and heirloom tomato tartine.',
      primaryBtn: 'Explore Food Menu',
      secondaryBtn: 'Reserve Garden Table',
      img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    }
  ],
  'maison-virelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ORGANIC STONE OVEN BAKERY & ESPRESSO',
      heading: 'Handcrafted Sourdough & Golden Honey Brews',
      description: 'From golden wheat fields to your table. Enjoy slow-fermented artisan breads, Saigon cinnamon rolls, and rich double-shot espresso.',
      primaryBtn: 'Order Artisan Breads',
      secondaryBtn: 'View Today\'s Bakes',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'SAIGON CINNAMON BRIOCHE',
      heading: 'Warm Fluffy Rolls & Caramel Drizzle',
      description: 'Warm brioche rolls swirled with organic Saigon cinnamon, glazed with Madagascar honey cream and paired with hot cappuccinos.',
      primaryBtn: 'Explore Pastries',
      secondaryBtn: 'Order Bakery Box',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'GOLDEN CREMA ESPRESSO BAR',
      heading: 'Double Shot Velvet Espresso & Nitro Brews',
      description: 'Rich golden crema with tasting notes of dark cocoa, roasted hazelnut, and wild wildflower honey.',
      primaryBtn: 'View Coffee Menu',
      secondaryBtn: 'Visit Bakery Shop',
      img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    }
  ],
  'amberelle': [
    {
      id: 1,
      number: '01',
      eyebrow: 'TUSCAN SUN-BLEACHED TRATTORIA CAFE',
      heading: 'Aroma of Tuscany — Authentic Espresso Bar',
      description: 'Tuscan olive grove vibes paired with dark-roasted Robusta espresso, pistachio cantucci, and velvety caramel macchiatos.',
      primaryBtn: 'View Espresso Bar',
      secondaryBtn: 'Explore Trattoria Menu',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'ARTISAN CARAMEL MACCHIATO',
      heading: 'Madagascar Vanilla Oat Milk & Caramel Drizzle',
      description: 'Single-origin espresso layered over steamed oat milk, topped with Madagascar caramel and almond biscotti.',
      primaryBtn: 'Explore Beverages',
      secondaryBtn: 'Reserve Tuscan Table',
      img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'SUNLIT OUTDOOR TERRACE',
      heading: 'Affogato al Caffè & Italian Gelato',
      description: 'Double espresso shot poured hot over artisanal Fior di Latte vanilla gelato and roasted hazelnut crunch.',
      primaryBtn: 'View Desserts',
      secondaryBtn: 'Book Outdoor Seat',
      img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation'
    }
  ],
  'harvessa': [
    {
      id: 1,
      number: '01',
      eyebrow: 'PARISIAN BOULEVARD DESSERT & COFFEE BISTRO',
      heading: 'Champagne Rose Shimmer & Night Starlight Brews',
      description: 'Romantic boulevard dining under ambient street lamps with vanilla bean latte art, dark chocolate soufflés, and champagne cocktails.',
      primaryBtn: 'Book Date Night Table',
      secondaryBtn: 'Explore Dessert Menu',
      img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'VELVET LATTE ART & CHOCOLATE',
      heading: 'Valrhona Chocolate Tarts & Hearts in Foam',
      description: 'Rich dark chocolate ganache tarts, dusted with cocoa powder and served alongside steaming heart latte art cappuccinos.',
      primaryBtn: 'View Sweet Menu',
      secondaryBtn: 'Order To-Go',
      img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'DECADENT BERRY CUSTARD TARTS',
      heading: 'Wild Berry Almond Custard Tarts',
      description: 'Crispy French butter pastry filled with organic blackberries, raspberries, and vanilla bean custard.',
      primaryBtn: 'Explore Bakery',
      secondaryBtn: 'Reserve Terrace',
      img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    }
  ],
  'ivoria-dining': [
    {
      id: 1,
      number: '01',
      eyebrow: 'ALPINE TIMBER CHALET & COFFEE HOUSE',
      heading: 'Cozy Fireplace Glow & Spiced Hazelnut Latte',
      description: 'Escape to a warm alpine cabin with crackling fireplace glow, hot cinnamon cider, maple pecan pastries, and slow pour-over brews.',
      primaryBtn: 'Warm Alpine Menu',
      secondaryBtn: 'Book Chalet Corner',
      img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'TIMBER CABIN HOT CHOCOLATE',
      heading: 'Warm Alpine Cocoa with Marshmallow Cream',
      description: 'Thick Swiss dark chocolate cocoa topped with toasted marshmallow cream, chocolate shavings, and cinnamon sticks.',
      primaryBtn: 'View Warm Drinks',
      secondaryBtn: 'Reserve Fireplace Table',
      img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'FRESH BERRY DANISH BAKERY',
      heading: 'Flaky Maple Berry Pastries',
      description: 'Warm out of the cabin oven: flaky puff pastry filled with organic mountain blueberries and maple glaze.',
      primaryBtn: 'Explore Bakery Items',
      secondaryBtn: 'Visit Chalet Shop',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    }
  ],
  'olivara': [
    {
      id: 1,
      number: '01',
      eyebrow: 'BOTANICAL GREENHOUSE & GARDEN CAFE',
      heading: 'Lush Botanical Greenery & Iced Matcha Bar',
      description: 'Immerse yourself in a glass greenhouse surrounded by lush tropical plants, ceremonial Japanese matcha lattes, and farm-fresh avocado toasts.',
      primaryBtn: 'Explore Garden Bar',
      secondaryBtn: 'Reserve Glasshouse Table',
      img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'FARM-TO-TABLE BRUNCH & TOAST',
      heading: 'Wild Smoked Salmon & Avocado Sourdough',
      description: 'Stone-baked sourdough toast topped with wild smoked salmon, poached egg, avocado mash, and micro-herbs.',
      primaryBtn: 'View Brunch Menu',
      secondaryBtn: 'Book Garden Seat',
      img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'TROPICAL GLASSHOUSE AMBIANCE',
      heading: 'Organic Herbal Teas & Iced Cold Brews',
      description: 'Sip on cold brew coffees and organic chamomile mint tea infusions surrounded by blooming tropical flora.',
      primaryBtn: 'Explore Teas & Drinks',
      secondaryBtn: 'Reserve Green House',
      img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&auto=format&fit=crop',
      actionTarget: 'reservation'
    }
  ],
  'embrelune': [
    {
      id: 1,
      number: '01',
      eyebrow: 'CRYSTAL GLASS TEAL COFFEE & TEA BAR',
      heading: 'Icy Emerald Nitro Cold Brew & Glass Aesthetics',
      description: 'Sleek glassmorphic coffee bar featuring 24-hour slow-steeped cold brews, pistachio cream foams, and iced blue butterfly pea teas.',
      primaryBtn: 'Explore Nitro Bar',
      secondaryBtn: 'Order Cold Brews',
      img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'REFLECTIVE EMERALD COFFEE BAR',
      heading: 'Single-Origin Slow Drip Brews & Espresso',
      description: 'Cold-extracted coffee served over hand-carved ice crystal spheres in crystal glass cups.',
      primaryBtn: 'View Cold Drinks',
      secondaryBtn: 'Reserve Glass Bar',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'PASTRY & COFFEE PAIRING',
      heading: 'Organic Berry Tartlets & Pistachio Foam',
      description: 'Crispy butter pastry paired with velvety iced espresso and sweet cold foam cream.',
      primaryBtn: 'Explore Pastries',
      secondaryBtn: 'Order Online',
      img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    }
  ],
  'crimsera': [
    {
      id: 1,
      number: '01',
      eyebrow: 'MEDITERRANEAN SUNLIT COASTAL CAFE',
      heading: 'Sunlit Terrace Brunch & Golden Fig Latte',
      description: 'Golden Mediterranean sunlit terrace with fig infused lattes, fresh ricotta sourdough toast, and iced citrus espresso tonics.',
      primaryBtn: 'Explore Terrace Brunch',
      secondaryBtn: 'Book Sunlit Table',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'ORGANIC RICOTTA TARTINE',
      heading: 'Sourdough Toast with Figs & Wild Honey',
      description: 'Warm stone-baked sourdough toast topped with fresh whipped ricotta, roasted Mediterranean figs, and organic thyme honey.',
      primaryBtn: 'View Brunch Items',
      secondaryBtn: 'Order To-Go',
      img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'ICED CITRUS ESPRESSO BAR',
      heading: 'Single Origin Espresso & Lemon Tonic',
      description: 'Sparkling tonic water poured over fresh lemon peel, layered with dark roast espresso shots.',
      primaryBtn: 'Explore Drinks',
      secondaryBtn: 'Reserve Terrace',
      img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1600&auto=format&fit=crop',
      actionTarget: 'menu'
    }
  ]
};
