import { Order } from '../types';

// Helper to create timestamp for specific day in July 2026
const getJuly2026Date = (day: number, hour: number = 14, min: number = 30): number => {
  return new Date(2026, 6, day, hour, min).getTime(); // month 6 = July (0-indexed)
};

export const SEED_ORDERS: Order[] = [
  // July 6th orders (Total ~৳11,300)
  {
    id: 'ORD-20260706-01',
    tableNumber: 4,
    customerName: 'Anisur Rahman',
    customerPhone: '01711223344',
    paymentMethod: 'bKash',
    status: 'Completed',
    timestamp: getJuly2026Date(6, 12, 15),
    total: 4500,
    items: [
      {
        menuItem: {
          id: '1',
          name: 'Truffle Mushroom Burger',
          description: 'Angus beef patty with black truffle aioli',
          price: 1500,
          category: 'Burgers',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 3
      }
    ]
  },
  {
    id: 'ORD-20260706-02',
    tableNumber: 2,
    customerName: 'Farhana Islam',
    customerPhone: '01812345678',
    paymentMethod: 'Card Payment',
    status: 'Completed',
    timestamp: getJuly2026Date(6, 15, 45),
    total: 3800,
    items: [
      {
        menuItem: {
          id: '2',
          name: 'Quattro Formaggi Pizza',
          description: 'Wood-fired four cheese artisanal pizza',
          price: 1900,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 2
      }
    ]
  },
  {
    id: 'ORD-20260706-03',
    tableNumber: 7,
    customerName: 'Tanvir Ahmed',
    customerPhone: '01998765432',
    paymentMethod: 'Nagad',
    status: 'Completed',
    timestamp: getJuly2026Date(6, 20, 10),
    total: 3000,
    items: [
      {
        menuItem: {
          id: '3',
          name: 'Signature Dragonfruit Mocktail',
          description: 'Fresh dragonfruit with mint leaves',
          price: 750,
          category: 'Drinks',
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 4
      }
    ]
  },

  // July 7th orders (Total ~৳3,700)
  {
    id: 'ORD-20260707-01',
    tableNumber: 1,
    customerName: 'Rahim Chowdhury',
    customerPhone: '01677889900',
    paymentMethod: 'Cash on Delivery',
    status: 'Completed',
    timestamp: getJuly2026Date(7, 13, 0),
    total: 2200,
    items: [
      {
        menuItem: {
          id: '4',
          name: 'Smoked Salmon Pasta',
          description: 'Creamy fettuccine with Norwegian salmon',
          price: 2200,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-20260707-02',
    tableNumber: 5,
    customerName: 'Nusrat Jahan',
    customerPhone: '01555443322',
    paymentMethod: 'bKash',
    status: 'Completed',
    timestamp: getJuly2026Date(7, 19, 30),
    total: 1500,
    items: [
      {
        menuItem: {
          id: '5',
          name: 'Chocolate Lava Cake',
          description: 'Warm molten chocolate cake with vanilla ice cream',
          price: 750,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 2
      }
    ]
  },

  // July 16th order (Total ~৳4,973)
  {
    id: 'ORD-20260716-01',
    tableNumber: 3,
    customerName: 'Kamrul Hasan',
    customerPhone: '01700112233',
    paymentMethod: 'Card Payment',
    status: 'Completed',
    timestamp: getJuly2026Date(16, 14, 20),
    total: 4973,
    items: [
      {
        menuItem: {
          id: '1',
          name: 'Truffle Mushroom Burger',
          description: 'Angus beef patty with black truffle aioli',
          price: 1500,
          category: 'Burgers',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 2
      },
      {
        menuItem: {
          id: '2',
          name: 'Quattro Formaggi Pizza',
          description: 'Wood-fired four cheese artisanal pizza',
          price: 1973,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 1
      }
    ]
  },

  // July 24th order (Recent - Yesterday)
  {
    id: 'ORD-20260724-01',
    tableNumber: 6,
    customerName: 'Shahriar Kabir',
    customerPhone: '01899001122',
    paymentMethod: 'bKash',
    status: 'Completed',
    timestamp: getJuly2026Date(24, 18, 0),
    total: 3200,
    items: [
      {
        menuItem: {
          id: '1',
          name: 'Truffle Mushroom Burger',
          description: 'Angus beef patty with black truffle aioli',
          price: 1600,
          category: 'Burgers',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 2
      }
    ]
  },

  // July 25th orders (Recent - Today)
  {
    id: 'ORD-20260725-01',
    tableNumber: 8,
    customerName: 'Mehedi Hasan',
    customerPhone: '01712345678',
    paymentMethod: 'Nagad',
    status: 'Kitchen',
    timestamp: Date.now() - 1000 * 60 * 25, // 25 mins ago
    total: 2850,
    items: [
      {
        menuItem: {
          id: '2',
          name: 'Quattro Formaggi Pizza',
          description: 'Wood-fired four cheese artisanal pizza',
          price: 1900,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 1
      },
      {
        menuItem: {
          id: '3',
          name: 'Signature Dragonfruit Mocktail',
          description: 'Fresh dragonfruit with mint leaves',
          price: 950,
          category: 'Drinks',
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-20260725-02',
    tableNumber: 2,
    customerName: 'Amina Begum',
    customerPhone: '01987654321',
    paymentMethod: 'bKash',
    status: 'Pending',
    timestamp: Date.now() - 1000 * 60 * 5, // 5 mins ago
    total: 4200,
    items: [
      {
        menuItem: {
          id: '1',
          name: 'Truffle Mushroom Burger',
          description: 'Angus beef patty with black truffle aioli',
          price: 1400,
          category: 'Burgers',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          glbUrl: ''
        },
        quantity: 3
      }
    ]
  }
];
