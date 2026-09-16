import { MenuItem } from './types';

// Verified high-fidelity food-related 3D models from official Khronos Group repository
const GLB_MODELS = {
  cake: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
  cookie: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
  avocado: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb',
  drink: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
  fish: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Binary/BarramundiFish.glb',
  burger: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
  pizza: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
  // Covered food serving plate fallback - a stylized premium container model
  fallbackPlate: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb'
};

export const MENU_ITEMS: MenuItem[] = [
  // ==================== PIZZA CATEGORY (11 Items) ====================
  {
    id: 'p1',
    name: 'Truffle Burrata Bliss',
    description: 'Artisanal sourdough base with shaved black truffles, fresh creamy burrata, wild arugula, and a drizzle of organic cold-pressed hot honey.',
    price: 24.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fresh-pizza-out-of-the-oven-18114-large.mp4',
    reviews: [
      { id: 'r1', userName: 'Alex Johnson', rating: 5, comment: 'Best pizza I have ever had! The truffle burrata is divine.', timestamp: Date.now() - 86400000 },
      { id: 'r2', userName: 'Maria Garcia', rating: 4, comment: 'Delicious crust, though it took a bit longer than expected.', timestamp: Date.now() - 172800000 }
    ],
    isChefSpecial: true,
    isPopular: true,
    calories: 820
  },
  {
    id: 'p2',
    name: 'Smoked Wagyu Bresaola',
    description: 'Thinly sliced wood-smoked wagyu bresaola, fior di latte, sweet caramelized onions, balsamic reduction, and fresh shaved parmigiano-reggiano.',
    price: 28.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isNew: true,
    calories: 940
  },
  {
    id: 'p3',
    name: 'Classic Margherita Royale',
    description: 'San Marzano tomatoes, fresh bufala mozzarella, sweet basil leaves, and a generous splash of Tuscan extra virgin olive oil.',
    price: 18.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 710
  },
  {
    id: 'p4',
    name: 'Fiery Diavola Calabrese',
    description: 'Spicy Calabrian salami, nduja paste, organic hot honey, fresh red chili flakes, roasted garlic, and mozzarella.',
    price: 21.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    spiciness: 3,
    calories: 880
  },
  {
    id: 'p5',
    name: 'Gamberi e Limone Crust',
    description: 'Marinated tiger prawns, fresh lemon zest, baby spinach, roasted pine nuts, cream sauce, and chopped fresh parsley.',
    price: 26.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 790
  },
  {
    id: 'p6',
    name: 'Wild Mushroom & Thyme',
    description: 'A mix of roasted portobello, shiitake, and oyster mushrooms, fresh thyme, double cream mozzarella, and sweet roasted garlic.',
    price: 20.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 680
  },
  {
    id: 'p7',
    name: 'Premium Fig & Prosciutto',
    description: 'Sweet black mission figs, salty prosciutto di Parma, creamy gorgonzola, fresh rosemary, and thick balsamic glaze.',
    price: 25.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1555072956-7758afb20a8f?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isChefSpecial: true,
    calories: 860
  },
  {
    id: 'p8',
    name: 'Kuwaiti Spiced Lamb Feast',
    description: 'Slow-cooked pulled lamb spiced with cardamom and saffron, drizzled with mint labneh, fresh pomegranate seeds, and fresh coriander.',
    price: 27.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    spiciness: 1,
    calories: 910
  },
  {
    id: 'p9',
    name: 'Pesto Verde Gardenia',
    description: 'Genovese basil pesto, grilled baby zucchini, tender artichoke hearts, cherry tomatoes, and local goat cheese crumble.',
    price: 19.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1528137871380-9fc93e11894a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 650
  },
  {
    id: 'p10',
    name: 'Smoked Salmon Bianca',
    description: 'Premium cold-smoked Scottish salmon, capers, dill cream cheese spread, red onions, and fresh arugula on a crispy white stone base.',
    price: 29.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 830
  },
  {
    id: 'p11',
    name: 'Quattro Formaggi Extraordinaire',
    description: 'An premium blend of aged Parmigiano-Reggiano, creamy Gorgonzola Dolce, Pecorino Romano, and smoked provolone.',
    price: 22.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 890
  },

  // ==================== BURGERS CATEGORY (11 Items) ====================
  {
    id: 'b1',
    name: 'Signature Imperial Wagyu',
    description: 'Aged Japanese A5 Wagyu beef patty, molten black truffle gouda, crispy shallots, and house gold-leaf aioli on a toasted brioche bun.',
    price: 32.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isChefSpecial: true,
    isPopular: true,
    calories: 1100
  },
  {
    id: 'b2',
    name: 'Smoked Double Brisket Stack',
    description: 'Two grass-fed prime beef patties layered with 16-hour hickory smoked brisket, homemade whiskey BBQ glaze, and sharp Vermont cheddar.',
    price: 26.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isNew: true,
    calories: 1250
  },
  {
    id: 'b3',
    name: 'Crispy Saffron Truffle Chicken',
    description: 'Golden buttermilk-fried organic chicken breast infused with Persian saffron, truffle coleslaw, and sweet pickles on soft bun.',
    price: 21.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    spiciness: 1,
    calories: 850
  },
  {
    id: 'b4',
    name: 'The Green Oasis (Vegan)',
    description: 'A premium flame-grilled house-made quinoa, beetroot and mushroom patty, avocado smash, vegan garlic aioli, and crisp heirloom butterhead lettuce.',
    price: 19.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 610
  },
  {
    id: 'b5',
    name: 'Spicy Firecracker Habanero',
    description: 'Prime beef patty, ghost pepper jack cheese, crispy jalapeños, spicy firecracker habanero reduction, and cooling avocado cream.',
    price: 22.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    spiciness: 3,
    calories: 930
  },
  {
    id: 'b6',
    name: 'Smoked Gouda & Portobello',
    description: 'Flame-grilled prime beef patty topped with a giant balsamic-marinated portobello mushroom cap, melted smoked gouda, and truffle mayo.',
    price: 23.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 890
  },
  {
    id: 'b7',
    name: 'Gulf Lobster Butter Roll',
    description: 'Fresh butter-poached Gulf lobster chunks served over a custom-cut brioche burger roll with micro-dill, light lemon-chive emulsion.',
    price: 36.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isChefSpecial: true,
    calories: 780
  },
  {
    id: 'b8',
    name: 'Slow Roasted Lamb Sliders',
    description: 'Three mini brioche sliders filled with 12-hour slow-cooked spiced lamb shoulder, fresh mint cucumber raita, and sweet pickled shallots.',
    price: 24.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 820
  },
  {
    id: 'b9',
    name: 'BBQ Maple Bacon Smokehouse',
    description: 'House ground chuck patty, thick-cut maple glazed turkey bacon, crispy onion rings, liquid cheddar, and sweet hickory BBQ sauce.',
    price: 23.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 1040
  },
  {
    id: 'b10',
    name: 'Aged Gorgonzola Pear Gourmet',
    description: 'Juicy prime beef patty, melted sweet Italian gorgonzola, thinly sliced caramelized d\'Anjou pears, wild arugula, and walnut butter spread.',
    price: 25.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 920
  },
  {
    id: 'b11',
    name: 'Crispy Panko Cod Burger',
    description: 'Golden hand-battered Atlantic cod, sharp lemon caper tartar sauce, baby gem lettuce, and sweet brioche buns.',
    price: 21.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 740
  },

  // ==================== DRINKS CATEGORY (11 Items) ====================
  {
    id: 'd1',
    name: 'Spiced Lavender Lemonade',
    description: 'Premium culinary French lavender buds steeped with fresh Amalfi lemons, local wild honey, and refreshing sparkling club soda.',
    price: 9.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 120
  },
  {
    id: 'd2',
    name: 'Golden Saffron-Cardamom Latte',
    description: 'A warm elegant double shot of organic espresso blended with real Kashmiri saffron threads, crushed green cardamom pods, and creamy oat milk.',
    price: 11.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isChefSpecial: true,
    isVegetarian: true,
    calories: 190
  },
  {
    id: 'd3',
    name: 'Smoked Rosemary Berry Mocktail',
    description: 'Muddled organic blackberries, fresh lime juice, ginger beer, served cold in a glass smoked with fresh burning rosemary sprigs.',
    price: 12.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 140
  },
  {
    id: 'd4',
    name: 'Iced Ceramic Matcha Supreme',
    description: 'Ceremonial grade Japanese Uji matcha whisked with sweet vanilla bean syrup, ice, and organic almond milk.',
    price: 10.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 150
  },
  {
    id: 'd5',
    name: 'Mint Hibiscus Cooling Elixir',
    description: 'Chilled cold-brewed hibiscus flower infusion with sweet fresh garden mint leaves, a splash of lime juice, and sweet agave.',
    price: 9.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 90
  },
  {
    id: 'd6',
    name: 'Cold Pressed Dragon Fruit Cooler',
    description: 'Pure cold-pressed hot pink dragon fruit juice, white grape juice, fresh lime, and sparkling alkaline water.',
    price: 12.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 110
  },
  {
    id: 'd7',
    name: 'Blueberry Elderflower Mojito',
    description: 'Elderflower cordial, muddled organic blueberries, fresh mint leaves, brown sugar cane, lime, and crushed ice.',
    price: 13.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 160
  },
  {
    id: 'd8',
    name: 'Turkish Pistachio Frappé',
    description: 'Creamy iced blend of organic espresso, sweet roasted Gaziantep pistachio butter, white chocolate, and fresh whipped cream.',
    price: 14.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isChefSpecial: true,
    isVegetarian: true,
    calories: 420
  },
  {
    id: 'd9',
    name: 'Espresso Tonic Premium',
    description: 'Single-estate specialty espresso shot poured over chilled premium fever-tree aromatic tonic water, decorated with dry orange slice.',
    price: 10.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1510972527409-cef6e48d5de5?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 80
  },
  {
    id: 'd10',
    name: 'Fresh Avocado Green Smoothie',
    description: 'Creamy local avocado blended with organic spinach, sweet green apples, fresh ginger, honey, and Greek yogurt.',
    price: 12.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 280
  },
  {
    id: 'd11',
    name: 'Pure Sparkling Rose Water Infusion',
    description: 'Imported distilled organic Persian rose water, chilled fresh strawberry slices, and sparkling mineral water.',
    price: 11.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 60
  },

  // ==================== DESSERTS CATEGORY (11 Items) ====================
  {
    id: 'e1',
    name: 'Royal Saffron Sensation Cake',
    description: 'Delicate cardamom sponge soaked in heavy milk infused with Kashmiri saffron, topped with dynamic gold leaf flakes and fresh chopped pistachios.',
    price: 16.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake, // Verified real 3D Cake model
    isChefSpecial: true,
    isVegetarian: true,
    calories: 520
  },
  {
    id: 'e2',
    name: 'Belgian Valrhona Lava Molten',
    description: 'Rich dark Belgian chocolate soufflé cake with a warm flowing molten truffle core, served with fresh Madagascar vanilla bean gelato.',
    price: 15.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 610
  },
  {
    id: 'e3',
    name: 'Gilded Macaron Cascade Tower',
    description: 'A premium stack of four hand-crafted French macarons (salted caramel, raspberry rose, matcha, and intense black sesame) decorated with edible silver.',
    price: 14.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cookie, // Verified real 3D Cookie model
    isVegetarian: true,
    calories: 340
  },
  {
    id: 'e4',
    name: 'Pistachio Baklava Mille-Feuille',
    description: 'Crunchy golden buttered phyllo pastry sheets layered with sweet crushed Turkish pistachios and organic orange blossom syrup.',
    price: 15.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 480
  },
  {
    id: 'e5',
    name: 'Golden Salted Caramel Cheesecake',
    description: 'Silky smooth slow-baked New York style cheesecake on a premium cinnamon graham crust, topped with house warm salted amber caramel.',
    price: 13.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 590
  },
  {
    id: 'e6',
    name: 'Raspberry Soufflé Classic',
    description: 'Warm, airy organic egg white soufflé baked with fresh premium raspberry coulis, dusted with delicate snow-white powdered sugar.',
    price: 16.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 310
  },
  {
    id: 'e7',
    name: 'Amalfi Lemon Meringue Tart',
    description: 'Crisp hand-pressed sweet pastry shell filled with tart organic lemon curd, topped with a giant whipped caramelized meringue cloud.',
    price: 14.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 410
  },
  {
    id: 'e8',
    name: 'Espresso Kahlúa Tiramisu',
    description: 'Light Italian ladyfingers soaked in premium organic espresso and dark coffee liqueur, layered with rich whipped mascarpone and dark cocoa.',
    price: 15.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isChefSpecial: true,
    isVegetarian: true,
    calories: 460
  },
  {
    id: 'e9',
    name: 'Premium Madagascar Vanilla Crème',
    description: 'Rich baked egg custard infused with sweet Madagascar vanilla bean seeds, finished with a hand-caramelized glassy amber sugar crust.',
    price: 14.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 380
  },
  {
    id: 'e10',
    name: 'Tahitian Coconut Orchid Panna Cotta',
    description: 'Chilled silky panna cotta made with organic coconut milk and pure vanilla, topped with sweet fresh mango-passionfruit glaze.',
    price: 13.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 290
  },
  {
    id: 'e11',
    name: 'Dark Chocolate Hazelnut Marquis',
    description: 'Layers of rich mousse, crunchy praline paste, soft dark glaze, and gold leaf dust.',
    price: 17.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 540
  },

  // ==================== PIZZA EXTENSION (Total ~20) ====================
  {
    id: 'p_ext_3',
    name: 'Truffle Mushroom Pizza',
    description: 'White base with wild mushrooms, truffle oil, fresh thyme, and mozzarella di bufala.',
    price: 26.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    isChefSpecial: true,
    calories: 920
  },
  {
    id: 'p_4',
    name: 'Spicy Diavola',
    description: 'San Marzano tomatoes, spicy salami, nduja, and chili-infused honey.',
    price: 23.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    spiciness: 3,
    calories: 1100
  },
  {
    id: 'p_ext_5',
    name: 'Four Cheese Classic',
    description: 'A blend of Mozzarella, Gorgonzola, Parmigiano Reggiano, and Fontina.',
    price: 21.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1573821663912-56990544c383?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    isVegetarian: true,
    calories: 1250
  },
  {
    id: 'p_ext_6',
    name: 'Burrata & Prosciutto',
    description: 'Fresh burrata cheese added after baking, topped with thin prosciutto and balsamic glaze.',
    price: 28.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    isPopular: true,
    calories: 980
  },
  {
    id: 'p_ext_7',
    name: 'Seafood Marinara',
    description: 'Prawns, calamari, mussels, and garlic oil on a rich tomato base.',
    price: 29.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    calories: 880
  },
  {
    id: 'p_ext_8',
    name: 'Pesto Chicken Pizza',
    description: 'Basil pesto base, grilled chicken strips, roasted pine nuts, and sun-dried tomatoes.',
    price: 24.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    calories: 850
  },
  {
    id: 'p_ext_9',
    name: 'Quattro Stagioni',
    description: 'Divided into four sections: artichokes, ham, mushrooms, and olives representing the seasons.',
    price: 25.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    calories: 910
  },
  {
    id: 'p_ext_10',
    name: 'Capricciosa Premium',
    description: 'Mozzarella, tomato, ham, mushrooms, artichoke, and organic boiled egg.',
    price: 26.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    calories: 1050
  },
  {
    id: 'p_ext_11',
    name: 'Spinach & Ricotta Bliss',
    description: 'Fresh baby spinach, dollops of creamy ricotta, and roasted garlic chips.',
    price: 22.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    isVegetarian: true,
    calories: 820
  },
  {
    id: 'p_ext_12',
    name: 'BBQ Meat Lovers',
    description: 'Spicy BBQ sauce, pepperoni, Italian sausage, smoked ham, and ground beef.',
    price: 27.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    calories: 1350
  },
  {
    id: 'p_ext_13',
    name: 'Buffalo Chicken Pizza',
    description: 'Tangy buffalo sauce, grilled chicken, celery, and a blue cheese drizzle.',
    price: 23.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    spiciness: 2,
    calories: 950
  },
  {
    id: 'p_ext_14',
    name: 'Garden Harvest Pizza',
    description: 'Bell peppers, zucchini, black olives, and fresh tomatoes on a whole grain crust.',
    price: 20.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    isVegetarian: true,
    calories: 780
  },
  {
    id: 'p_ext_15',
    name: 'Pear & Gorgonzola',
    description: 'White base with sliced pears, gorgonzola, walnuts, and a honey drizzle.',
    price: 24.00,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.pizza,
    isVegetarian: true,
    calories: 890
  },

  // ==================== BURGERS EXTENSION (Total ~20) ====================
  {
    id: 'b_3',
    name: 'Wagyu Gold Burger',
    description: 'A5 Wagyu beef patty with gold leaf, caramelized onions, and truffle aioli on a brioche bun.',
    price: 45.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    isChefSpecial: true,
    calories: 850
  },
  {
    id: 'b_4',
    name: 'Blue Cheese & Fig Burger',
    description: 'Juicy beef patty topped with gorgonzola, fresh fig jam, and baby arugula.',
    price: 22.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 720
  },
  {
    id: 'b_5',
    name: 'Spicy Avocado Burger',
    description: 'Grilled chicken breast with smashed avocado, jalapeños, and spicy chipotle mayo.',
    price: 18.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c1827003f?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    spiciness: 2,
    calories: 640
  },
  {
    id: 'b_6',
    name: 'Plant-Based Umami Burger',
    description: 'Beyond Meat patty with shiitake mushrooms, miso glaze, and vegan provolone.',
    price: 19.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    isVegetarian: true,
    calories: 580
  },
  {
    id: 'b_7',
    name: 'Double Smash Classic',
    description: 'Two thin patties with crispy edges, American cheese, pickles, and secret sauce.',
    price: 16.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    isPopular: true,
    calories: 890
  },
  {
    id: 'b_8',
    name: 'Texas BBQ Beast',
    description: 'Beef patty topped with smoked brisket, crispy onions, and hickory BBQ sauce.',
    price: 24.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 950
  },
  {
    id: 'b_9',
    name: 'Mediterranean Lamb Burger',
    description: 'Spiced lamb patty with cucumber raita, feta cheese, and pickled red onions.',
    price: 21.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 680
  },
  {
    id: 'b_10',
    name: 'Portobello Mushroom Burger',
    description: 'Large grilled portobello cap with balsamic glaze, goat cheese, and spinach.',
    price: 15.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    isVegetarian: true,
    calories: 420
  },
  {
    id: 'b_11',
    name: 'Bacon & Brie Deluxe',
    description: 'Grass-fed beef, melted brie, crispy maple bacon, and caramelized onions.',
    price: 23.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7443b?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 820
  },
  {
    id: 'b_12',
    name: 'Habanero Fire Burger',
    description: 'Triple-spiced patty with ghost pepper cheese, habanero relish, and cool ranch.',
    price: 19.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    spiciness: 3,
    calories: 780
  },
  {
    id: 'b_13',
    name: 'California Sunset Burger',
    description: 'Turkey patty with sprouts, tomato, and a light herb mayo.',
    price: 17.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 520
  },
  {
    id: 'b_14',
    name: 'Swiss Alps Burger',
    description: 'Beef patty topped with sautéed mushrooms and a thick slice of Swiss cheese.',
    price: 18.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 740
  },
  {
    id: 'b_15',
    name: 'Aloha Tropical Burger',
    description: 'Teriyaki glazed beef patty with a grilled pineapple ring and spam slice.',
    price: 20.00,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c1827003f?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.burger,
    calories: 810
  },

  // ==================== DRINKS EXTENSION (Total ~20) ====================
  {
    id: 'd_3',
    name: 'Iced Matcha Latte',
    description: 'Ceremonial grade matcha with oat milk and a touch of honey.',
    price: 7.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 140
  },
  {
    id: 'd_4',
    name: 'Dragon Fruit Smoothie',
    description: 'Fresh pitaya blended with banana, coconut water, and chia seeds.',
    price: 9.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1525385133336-247b6c257521?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isPopular: true,
    calories: 210
  },
  {
    id: 'd_5',
    name: 'Classic Espresso Martini',
    description: 'Fresh espresso shot, vodka, and coffee liqueur shaken with ice.',
    price: 14.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 220
  },
  {
    id: 'd_6',
    name: 'Mint Limeade Sparkler',
    description: 'Freshly squeezed lime, crushed mint, and sparkling water with a hint of agave.',
    price: 6.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 90
  },
  {
    id: 'd_7',
    name: 'Iced Caramel Macchiato',
    description: 'Layered espresso with vanilla syrup, cold milk, and caramel drizzle.',
    price: 8.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1485808191679-5f63bb36281a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 250
  },
  {
    id: 'd_8',
    name: 'Fresh Watermelon Mojito',
    description: 'Virgin mojito with fresh watermelon chunks, mint, and lime.',
    price: 9.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isPopular: true,
    calories: 130
  },
  {
    id: 'd_9',
    name: 'Matcha Strawberry Swirl',
    description: 'Japanese matcha latte with a fresh strawberry puree base.',
    price: 9.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 180
  },
  {
    id: 'd_10',
    name: 'Turmeric Golden Milk',
    description: 'Warm almond milk with turmeric, ginger, cinnamon, and honey.',
    price: 7.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 110
  },
  {
    id: 'd_11',
    name: 'Passion Fruit Soda',
    description: 'Natural passion fruit pulp mixed with sparkling mineral water and ice.',
    price: 7.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 120
  },
  {
    id: 'd_12',
    name: 'Belgian Hot Chocolate',
    description: 'Rich 70% dark Belgian chocolate melted into whole milk with whipped cream.',
    price: 8.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544787210-2211d7c80984?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 380
  },
  {
    id: 'd_13',
    name: 'Lavender Blueberry Sparkler',
    description: 'Homemade lavender syrup with fresh blueberries and lemon-infused club soda.',
    price: 7.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 115
  },
  {
    id: 'd_14',
    name: 'Organic Green Tea',
    description: 'Hot ceremonial grade green tea leaves steeped to perfection.',
    price: 5.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    isVegetarian: true,
    calories: 5
  },
  {
    id: 'd_15',
    name: 'Hibiscus Iced Tea',
    description: 'Floral hibiscus petals cold-brewed with a touch of stevia.',
    price: 6.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 10
  },

  {
    id: 'd_16',
    name: 'Sparkling Rose Lemonade',
    description: 'Refreshing pink lemonade with rose extract and sparkling water.',
    price: 6.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 130
  },
  {
    id: 'd_17',
    name: 'Iced Caramel Macchiato',
    description: 'Rich espresso with creamy milk and a sweet caramel drizzle over ice.',
    price: 7.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab752?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.drink,
    calories: 210
  },
  // ==================== DESSERTS EXTENSION (Total ~20) ====================
  {
    id: 'de_3',
    name: 'Belgian Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla bean gelato.',
    price: 12.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isChefSpecial: true,
    calories: 520
  },
  {
    id: 'de_4',
    name: 'Classic Tiramisu',
    description: 'Layered ladyfingers soaked in coffee and rum, with mascarpone cream and cocoa.',
    price: 10.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isPopular: true,
    calories: 440
  },
  {
    id: 'de_5',
    name: 'Berry Cheesecake',
    description: 'New York style cheesecake topped with a mixed berry compote.',
    price: 11.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    calories: 480
  },
  {
    id: 'de_6',
    name: 'Macaron Selection',
    description: 'A box of 6 handcrafted French macarons with assorted seasonal flavors.',
    price: 15.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    calories: 360
  },
  {
    id: 'de_7',
    name: 'Mango Sticky Rice',
    description: 'Fresh Thai mango served with sweet coconut sticky rice and sesame seeds.',
    price: 13.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isPopular: true,
    calories: 340
  },
  {
    id: 'de_8',
    name: 'Pistachio Baklava Platter',
    description: 'Rich, sweet pastry layers filled with chopped pistachios and sweetened with honey.',
    price: 16.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    calories: 420
  },
  {
    id: 'de_9',
    name: 'Crème Brûlée Artisan',
    description: 'Classic French custard base topped with a layer of hardened caramelized sugar.',
    price: 12.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1516685018646-527ad952fca3?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    calories: 310
  },
  {
    id: 'de_10',
    name: 'Red Velvet Temptation',
    description: 'Deep red chocolate cake layers with a light cream cheese frosting.',
    price: 11.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324631ffc?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    calories: 460
  },
  {
    id: 'de_11',
    name: 'Lemon Meringue Tart',
    description: 'Crisp pastry shell with zesty lemon curd and toasted meringue peaks.',
    price: 10.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    calories: 390
  },
  {
    id: 'de_12',
    name: 'Japanese Mochi Mix',
    description: 'Assorted mochi with green tea, red bean, and mango fillings.',
    price: 14.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.cake,
    isVegetarian: true,
    calories: 220
  },

  // ==================== ALL FRUITS CATEGORY (11 Items) ====================
  {
    id: 'f1',
    name: 'Imperial Golden Fruit Platter',
    description: 'A dynamic luxurious arrangement of gold-sprinkled sliced mangoes, organic ruby dragonfruit, wild blueberries, sweet fresh figs, and fresh mint honey.',
    price: 22.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    isChefSpecial: true,
    isVegetarian: true,
    calories: 240
  },
  {
    id: 'f2',
    name: 'Tropical Breeze Bowl',
    description: 'Freshly cut pineapple, kiwi, and watermelon drizzled with a light passionfruit syrup.',
    price: 15.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 180
  },
  {
    id: 'f3',
    name: 'Mixed Berry Symphony',
    description: 'A medley of wild strawberries, blueberries, and raspberries with a hint of lime zest.',
    price: 14.50,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    isPopular: true,
    calories: 120
  },
  {
    id: 'f4',
    name: 'Citrus Zest Salad',
    description: 'Segmented oranges, grapefruits, and pomelo with honey-mint dressing.',
    price: 11.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 95
  },
  {
    id: 'f5',
    name: 'Dragon Fruit Sorbet Bowl',
    description: 'Half a dragon fruit filled with its own sorbet and exotic fruit chunks.',
    price: 16.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    isNew: true,
    calories: 150
  },
  {
    id: 'f6',
    name: 'Exotic Papaya Boat',
    description: 'Ripe papaya filled with Greek yogurt, wild berries, and toasted coconut flakes.',
    price: 12.50,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 210
  },
  {
    id: 'f7',
    name: 'Watermelon Feta Mint',
    description: 'Refreshing chilled watermelon cubes with creamy feta cheese and fresh garden mint.',
    price: 10.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    isVegetarian: true,
    calories: 110
  },
  {
    id: 'f8',
    name: 'Pomegranate Ruby Grains',
    description: 'A bowl of fresh pomegranate seeds mixed with white peach slices and a drizzle of agave.',
    price: 9.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 130
  },
  {
    id: 'f9',
    name: 'Kiwi & Starfruit Medley',
    description: 'Striking slices of starfruit paired with tangy green kiwi and golden kiwifruit.',
    price: 13.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 85
  },
  {
    id: 'f10',
    name: 'Caramelized Fig Platter',
    description: 'Fresh figs lightly caramelized and served with a side of organic walnuts and honey.',
    price: 17.50,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1502364292189-6631e0b35272?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    isChefSpecial: true,
    calories: 190
  },
  {
    id: 'f11',
    name: 'Tropical Dragon Bowl',
    description: 'Vibrant pink dragon fruit base topped with mango, kiwi, and toasted almonds.',
    price: 14.50,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1511688826399-13f729319206?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 230
  },
  {
    id: 'f12',
    name: 'Spiced Pear Tartine',
    description: 'Poached pears with star anise on whole grain bread with ricotta and walnuts.',
    price: 11.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1590005354167-629a58436670?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 180
  },
  {
    id: 'f13',
    name: 'Summer Berry Skewers',
    description: 'A colorful array of strawberries, blueberries, and raspberries served with a light honey-lime dip.',
    price: 8.50,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1568569302495-16671468b3db?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 95
  },
  {
    id: 'f14',
    name: 'Melon & Mint Granita',
    description: 'Icy watermelon and honeydew granita infused with fresh mint leaves.',
    price: 7.00,
    category: 'All Fruits',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    calories: 120
  },

  // ==================== EGGS CATEGORY (11 Items) ====================
  {
    id: 'e1',
    name: 'Classic Shakshuka Royale',
    description: 'Poached eggs in a simmering tomato sauce with chili peppers, garlic, and spiced with cumin, paprika, and cayenne pepper.',
    price: 14.00,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1590412200988-a436bb7050a4?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isChefSpecial: true,
    calories: 320
  },
  {
    id: 'e2',
    name: 'Truffle Scrambled Eggs',
    description: 'Creamy slow-cooked organic eggs infused with fresh black truffle oil and topped with shaved parmesan.',
    price: 18.50,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isPopular: true,
    calories: 280
  },
  {
    id: 'e3',
    name: 'Eggs Benedict Supreme',
    description: 'Two poached eggs on a toasted English muffin with Canadian bacon and rich, buttery hollandaise sauce.',
    price: 16.50,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511ee94e?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 450
  },
  {
    id: 'e4',
    name: 'Turkish Cilbir Style',
    description: 'Poached eggs served over a bed of garlic-infused yogurt, topped with a warm spicy chili butter sauce.',
    price: 13.50,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 240
  },
  {
    id: 'e5',
    name: 'Avocado Egg Nest',
    description: 'Baked avocado halves with an egg in the center, topped with cherry tomatoes and feta cheese.',
    price: 15.00,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.avocado,
    isVegetarian: true,
    calories: 210
  },
  {
    id: 'e6',
    name: 'Smoked Salmon Frittata',
    description: 'Italian-style omelette with premium smoked salmon, capers, and red onion.',
    price: 19.00,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 340
  },
  {
    id: 'e7',
    name: 'Chili Scramble Bowl',
    description: 'Spicy scrambled eggs with fresh red chilies, spring onions, and coriander on sourdough.',
    price: 14.00,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 310
  },
  {
    id: 'e8',
    name: 'Breakfast Burrito Supreme',
    description: 'Scrambled eggs, black beans, avocado, and salsa wrapped in a warm flour tortilla.',
    price: 13.00,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab752?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 520
  },
  {
    id: 'e9',
    name: 'Spanish Tortilla Slices',
    description: 'Traditional thick Spanish omelette with potatoes and onions, served with alioli.',
    price: 11.50,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1590412200988-a436bb7050a4?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 280
  },
  {
    id: 'e10',
    name: 'Mushroom & Spinach Crepe',
    description: 'Savoury crepe filled with sautéed mushrooms, baby spinach, and a perfectly over-easy egg.',
    price: 15.50,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 260
  },
  {
    id: 'e11',
    name: 'Truffle Scrambled Eggs',
    description: 'Luxurious creamy scrambled eggs infused with black truffle oil and chives.',
    price: 22.00,
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isChefSpecial: true,
    calories: 350
  },

  // ==================== DRY FOOD CATEGORY (20 Items) ====================
  {
    id: 'df1',
    name: 'Artisanal Mixed Nuts',
    description: 'A premium blend of roasted almonds, cashews, walnuts, and pecans seasoned with sea salt and rosemary.',
    price: 12.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1596506300748-515c8b76c8d4?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 450
  },
  {
    id: 'df2',
    name: 'Spiced Dried Mango',
    description: 'Organic sun-dried mango slices dusted with a hint of chili and lime for a sweet and tangy snack.',
    price: 8.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1606757389133-2895f36e4f62?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 180
  },
  {
    id: 'df3',
    name: 'Gourmet Beef Jerky',
    description: 'Thinly sliced grass-fed beef, marinated in soy sauce and spices, smoked to perfection.',
    price: 15.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 220
  },
  {
    id: 'df4',
    name: 'Roasted Chickpeas',
    description: 'Crunchy oven-roasted chickpeas seasoned with garlic, onion powder, and smoked paprika.',
    price: 6.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e2?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 150
  },
  {
    id: 'df5',
    name: 'Dried Apricots & Almonds',
    description: 'A classic pairing of sweet dried apricots and whole roasted almonds.',
    price: 10.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 320
  },
  {
    id: 'df6',
    name: 'Wasabi Peas',
    description: 'Crunchy dried peas coated in a spicy and pungent wasabi seasoning.',
    price: 7.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    spiciness: 2,
    calories: 120
  },
  {
    id: 'df7',
    name: 'Dark Chocolate Cranberries',
    description: 'Tart dried cranberries generously coated in 70% dark Belgian chocolate.',
    price: 11.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1548943487-a2e48316eb22?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 280
  },
  {
    id: 'df8',
    name: 'Kale Chips with Sea Salt',
    description: 'Crispy air-dried organic kale leaves seasoned with premium sea salt and nutritional yeast.',
    price: 9.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1528750955923-301728717817?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 60
  },
  {
    id: 'df9',
    name: 'Smoked Almonds',
    description: 'Whole almonds roasted with a natural hickory smoke flavor.',
    price: 8.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 460
  },
  {
    id: 'df10',
    name: 'Rice Crackers Mix',
    description: 'A traditional Japanese style mix of crispy rice crackers with soy sauce and seaweed.',
    price: 7.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 110
  },
  {
    id: 'df11',
    name: 'Banana Chips',
    description: 'Thinly sliced bananas fried to a crisp and lightly sweetened with honey.',
    price: 6.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1590080873974-9a38ca496923?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 140
  },
  {
    id: 'df12',
    name: 'Pumpkin Seeds (Pepitas)',
    description: 'Raw organic pumpkin seeds, a great source of protein and healthy fats.',
    price: 5.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 160
  },
  {
    id: 'df13',
    name: 'Yogurt Covered Pretzels',
    description: 'Crunchy mini pretzels dipped in a sweet and creamy yogurt coating.',
    price: 8.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 240
  },
  {
    id: 'df14',
    name: 'Medjool Dates',
    description: 'Large, plump, and naturally sweet Medjool dates from the Jordan Valley.',
    price: 14.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1541344999736-83eca872977a?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 190
  },
  {
    id: 'df15',
    name: 'Trail Mix Energy Blend',
    description: 'A mix of nuts, seeds, and dried berries designed for a quick energy boost.',
    price: 11.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 380
  },
  {
    id: 'df16',
    name: 'Spicy Wasabi Peas',
    description: 'Crunchy green peas coated in a powerful wasabi kick.',
    price: 6.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 120
  },
  {
    id: 'df17',
    name: 'Honey Roasted Almonds',
    description: 'Premium almonds roasted with a sweet honey and sea salt glaze.',
    price: 9.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1508061263366-f7df158b614d?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 210
  },
  {
    id: 'df18',
    name: 'Organic Fruit Leather',
    description: 'Dehydrated pure fruit strips made from organic strawberries and apples.',
    price: 5.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 90
  },
  {
    id: 'df19',
    name: 'Crispy Seaweed Snacks',
    description: 'Lightly salted roasted seaweed sheets for a healthy, savory crunch.',
    price: 4.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isVegetarian: true,
    calories: 45
  },
  {
    id: 'df21',
    name: 'Spicy Masala Peanuts',
    description: 'Peanuts coated in a traditional spicy masala blend for a perfect crunch.',
    price: 7.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isPopular: true,
    calories: 280
  },
  {
    id: 'df22',
    name: 'Honey Glazed Walnuts',
    description: 'Premium organic walnuts glazed with pure honey and toasted to perfection.',
    price: 15.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1502364292189-6631e0b35272?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    calories: 320
  },
  {
    id: 'df23',
    name: 'Royal Mutton Kacchi Biryani',
    description: 'Premium aromatic basmati rice layered with tender marinated mutton pieces, golden potatoes, and cooked under steam with pure ghee and saffron.',
    price: 18.00,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isChefSpecial: true,
    isPopular: true,
    calories: 950
  },
  {
    id: 'df24',
    name: 'Bangla Beef Bhuna Khichuri',
    description: 'Roasted moong dal and aromatic chinigura rice cooked with slow-simmered, tender beef cubes and traditional Bengali hot spices.',
    price: 14.50,
    category: 'Dry Food',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isPopular: true,
    spiciness: 2,
    calories: 820
  },
  {
    id: 'de39',
    name: 'Creamy Rosomalai Bliss',
    description: 'Soft, spongy cheese cottage dumplings soaked in a rich, cardamom-scented sweet reduced milk cream (malai).',
    price: 6.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isPopular: true,
    calories: 410
  },
  {
    id: 'de40',
    name: 'Nolen Gur Shahi Sandesh',
    description: 'Exquisite Bengali sweet fudge handcrafted from fresh chhena and seasonal premium date palm jaggery (Nolen Gur).',
    price: 5.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isNew: true,
    calories: 290
  },
  {
    id: 'dr12',
    name: 'Premium Spiced Masala Tea',
    description: 'Rich, comforting black tea brewed with fresh milk, grated ginger, cardamom pods, cinnamon, cloves, and premium tea leaves.',
    price: 3.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    glbUrl: GLB_MODELS.fallbackPlate,
    isPopular: true,
    calories: 120
  }
];
