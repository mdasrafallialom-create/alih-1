export interface StoreDish {
  id: string;
  title: string;
  name?: string;
  desc: string;
  description?: string;
  price: number;
  img: string;
  image?: string;
  calories?: string;
  category: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  isVegetarian?: boolean;
  prepTime?: string;
}

export const DEFAULT_STORE_DISHES: StoreDish[] = [
  // ==================== 1. ESPRESSO & COFFEE SPECIALTIES ====================
  {
    id: 'dish-cf-1',
    title: 'Artisan Caramel Macchiato',
    name: 'Artisan Caramel Macchiato',
    desc: 'Single-origin espresso with steamed vanilla oat milk & Madagascar caramel drizzle',
    description: 'Single-origin espresso with steamed vanilla oat milk & Madagascar caramel drizzle',
    price: 6.50,
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop',
    calories: '180 kcal',
    category: 'Espresso Bar',
    isPopular: true,
    prepTime: '4 mins'
  },
  {
    id: 'dish-cf-2',
    title: 'Pistachio Velvet Cold Brew',
    name: 'Pistachio Velvet Cold Brew',
    desc: '24-hour slow-steeped Arabica cold brew topped with sweet pistachio cream foam',
    description: '24-hour slow-steeped Arabica cold brew topped with sweet pistachio cream foam',
    price: 5.50,
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop',
    calories: '150 kcal',
    category: 'Cold Brews',
    isPopular: true,
    prepTime: '2 mins'
  },
  {
    id: 'dish-cf-3',
    title: 'Double Shot Velvet Espresso',
    name: 'Double Shot Velvet Espresso',
    desc: 'Rich golden crema with notes of dark cocoa, roasted hazelnut & wild honey',
    description: 'Rich golden crema with notes of dark cocoa, roasted hazelnut & wild honey',
    price: 4.00,
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop',
    calories: '10 kcal',
    category: 'Espresso Bar',
    prepTime: '3 mins'
  },
  {
    id: 'dish-cf-4',
    title: 'Lavender Starlight Latte',
    name: 'Lavender Starlight Latte',
    desc: 'Espresso infused with French culinary lavender, vanilla bean & silky micro-foam',
    description: 'Espresso infused with French culinary lavender, vanilla bean & silky micro-foam',
    price: 6.00,
    img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop',
    calories: '190 kcal',
    category: 'Espresso Bar',
    isNew: true,
    prepTime: '5 mins'
  },

  // ==================== 2. FRESH BAKERY & VIENNOISERIE ====================
  {
    id: 'dish-bk-1',
    title: 'Flaky Butter Almond Croissant',
    name: 'Flaky Butter Almond Croissant',
    desc: 'Freshly baked daily with French butter, roasted almond flakes & powdered sugar',
    description: 'Freshly baked daily with French butter, roasted almond flakes & powdered sugar',
    price: 4.50,
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop',
    calories: '290 kcal',
    category: 'Fresh Bakery',
    isPopular: true,
    prepTime: 'Instant'
  },
  {
    id: 'dish-bk-2',
    title: 'Honey Glazed Cinnamon Brioche Roll',
    name: 'Honey Glazed Cinnamon Brioche Roll',
    desc: 'Warm fluffy brioche roll swirled with Saigon cinnamon & organic honey glaze',
    description: 'Warm fluffy brioche roll swirled with Saigon cinnamon & organic honey glaze',
    price: 5.00,
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
    calories: '340 kcal',
    category: 'Fresh Bakery',
    prepTime: 'Instant'
  },
  {
    id: 'dish-bk-3',
    title: 'Rustic Sourdough Artisan Loaf',
    name: 'Rustic Sourdough Artisan Loaf',
    desc: 'Handcrafted stone-baked sourdough loaf served with cultured whipped butter',
    description: 'Handcrafted stone-baked sourdough loaf served with cultured whipped butter',
    price: 8.00,
    img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&auto=format&fit=crop',
    calories: '420 kcal',
    category: 'Fresh Bakery',
    prepTime: 'Instant'
  },

  // ==================== 3. BRUNCH & GOURMET SAVORY ====================
  {
    id: 'dish-br-1',
    title: 'Smoked Salmon Avocado Sourdough',
    name: 'Smoked Salmon Avocado Sourdough',
    desc: 'Stone-baked sourdough toast, wild smoked salmon, poached egg & micro-herbs',
    description: 'Stone-baked sourdough toast, wild smoked salmon, poached egg & micro-herbs',
    price: 12.00,
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop',
    calories: '380 kcal',
    category: 'Brunch & Toast',
    isChefSpecial: true,
    isPopular: true,
    prepTime: '8 mins'
  },
  {
    id: 'dish-br-2',
    title: 'Truffle Prosciutto Burrata Panini',
    name: 'Truffle Prosciutto Burrata Panini',
    desc: 'Crispy ciabatta, aged prosciutto di Parma, creamy burrata & black truffle glaze',
    description: 'Crispy ciabatta, aged prosciutto di Parma, creamy burrata & black truffle glaze',
    price: 13.50,
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop',
    calories: '490 kcal',
    category: 'Brunch & Toast',
    prepTime: '7 mins'
  },
  {
    id: 'dish-pz-1',
    title: 'Truffle Burrata Artisan Pizza',
    name: 'Truffle Burrata Artisan Pizza',
    desc: 'Artisanal sourdough base with shaved black truffles, fresh creamy burrata & arugula',
    description: 'Artisanal sourdough base with shaved black truffles, fresh creamy burrata & arugula',
    price: 19.50,
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    calories: '820 kcal',
    category: 'Pizza',
    isPopular: true,
    prepTime: '12 mins'
  },
  {
    id: 'dish-bg-1',
    title: 'Prime Wagyu Truffle Burger',
    name: 'Prime Wagyu Truffle Burger',
    desc: 'Premium wagyu beef patty, melted gruyere cheese, caramelized onions & brioche bun',
    description: 'Premium wagyu beef patty, melted gruyere cheese, caramelized onions & brioche bun',
    price: 18.00,
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    calories: '860 kcal',
    category: 'Chef Specials',
    isChefSpecial: true,
    prepTime: '10 mins'
  },

  // ==================== 4. PASTRY & DESSERT SHOWCASE ====================
  {
    id: 'dish-ds-1',
    title: 'Wild Berry Almond Custard Tart',
    name: 'Wild Berry Almond Custard Tart',
    desc: 'Crispy butter pastry filled with organic berries and vanilla bean custard',
    description: 'Crispy butter pastry filled with organic berries and vanilla bean custard',
    price: 7.50,
    img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop',
    calories: '310 kcal',
    category: 'Pastry Showcase',
    isPopular: true,
    prepTime: 'Instant'
  },
  {
    id: 'dish-ds-2',
    title: 'Belgian Dark Chocolate Fondant',
    name: 'Belgian Dark Chocolate Fondant',
    desc: 'Warm molten chocolate core served with Madagascar vanilla bean gelato',
    description: 'Warm molten chocolate core served with Madagascar vanilla bean gelato',
    price: 8.50,
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    calories: '450 kcal',
    category: 'Desserts',
    prepTime: '6 mins'
  },
  {
    id: 'dish-ds-3',
    title: 'Parisian Rose Macarons Box',
    name: 'Parisian Rose Macarons Box',
    desc: 'Artisanal box of 6 handcrafted macarons: raspberry, salted caramel, pistachio & dark cacao',
    description: 'Artisanal box of 6 handcrafted macarons: raspberry, salted caramel, pistachio & dark cacao',
    price: 9.00,
    img: 'https://images.unsplash.com/photo-1569864321390-dc872714c382?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1569864321390-dc872714c382?w=600&auto=format&fit=crop',
    calories: '260 kcal',
    category: 'Pastry Showcase',
    prepTime: 'Instant'
  },
  {
    id: 'dish-tea-1',
    title: 'Organic Jasmine Pearl Green Tea',
    name: 'Organic Jasmine Pearl Green Tea',
    desc: 'Hand-rolled young green tea pearls scented with fresh night-blooming jasmine flowers',
    description: 'Hand-rolled young green tea pearls scented with fresh night-blooming jasmine flowers',
    price: 4.50,
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
    calories: '0 kcal',
    category: 'Cold Brews',
    prepTime: '3 mins'
  }
];
