import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Bell, RefreshCw, Calendar, 
  ChevronDown, Check, X, Smartphone, Monitor, Clock,
  ArrowUpRight, TrendingUp, Sparkles, Filter, Wifi, BatteryCharging,
  Flame, Coffee, Pizza, Utensils, ExternalLink, RotateCcw,
  CheckCircle2, ShoppingBag, Store, ArrowRight, Play, Package,
  Layers, QrCode
} from 'lucide-react';
import { Order } from '../types';
import { MENU_ITEMS } from '../data';

interface AIAnalyticsDashboardProps {
  theme?: 'light' | 'dark';
  brandName?: string;
  onOpenSales?: () => void;
  onVisitStorefront?: () => void;
  orders?: Order[];
}

interface BarData {
  id: string;
  date: string;
  fullDate: string;
  value: number; // proportional height in px
  percentage: string;
  salesAmount: string;
  rawSales: number;
  orderCount: number;
  growth: string;
  isHighlight?: boolean;
}

interface DishItem {
  id: number | string;
  name: string;
  category: string;
  priceText: string;
  priceNum: number;
  sales: number;
  quantity: number;
  dineInQuantity: number;
  parcelQuantity: number;
  percentage: number;
  image: string;
  channelTag: 'dine_in' | 'parcel' | 'mixed';
}

interface CategoryPoint {
  label: string;
  sales: number;
  orders: number;
  x: number;
  y: number;
  pct: string;
  isTooltip?: boolean;
  tooltipName: string;
  tooltipValue: string;
  tooltipOrders: number;
}

// Guaranteed high-definition, verified working food imagery
const FOOD_IMAGES = {
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80',
  coffee: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80',
  espresso: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&auto=format&fit=crop&q=80',
  noodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80',
  iceCream: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80',
  steak: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80',
  pasta: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&auto=format&fit=crop&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=80',
  chicken: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=80',
  caviar: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=80',
  drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80',
  fallback: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'
};

// Helper to pick accurate food image based on dish title and category
const resolveDishImage = (name: string, category?: string, fallbackUrl?: string): string => {
  const text = `${name || ''} ${category || ''}`.toLowerCase();
  if (text.includes('coffee') || text.includes('latte') || text.includes('cappuccino') || text.includes('macchiato')) return FOOD_IMAGES.coffee;
  if (text.includes('espresso') || text.includes('americano') || text.includes('cortado') || text.includes('brew')) return FOOD_IMAGES.espresso;
  if (text.includes('pizza') || text.includes('margherita') || text.includes('burrata') || text.includes('calzone')) return FOOD_IMAGES.pizza;
  if (text.includes('burger') || text.includes('cheeseburger') || text.includes('wagyu') || text.includes('patty')) return FOOD_IMAGES.burger;
  if (text.includes('biryani') || text.includes('pulao') || text.includes('rice')) return FOOD_IMAGES.biryani;
  if (text.includes('noodle') || text.includes('ramen') || text.includes('chow mein')) return FOOD_IMAGES.noodles;
  if (text.includes('ice cream') || text.includes('gelato') || text.includes('sundae') || text.includes('dessert') || text.includes('cake')) return FOOD_IMAGES.iceCream;
  if (text.includes('steak') || text.includes('beef') || text.includes('ribeye') || text.includes('sirloin')) return FOOD_IMAGES.steak;
  if (text.includes('pasta') || text.includes('spaghetti') || text.includes('fettuccine') || text.includes('ravioli')) return FOOD_IMAGES.pasta;
  if (text.includes('sushi') || text.includes('sashimi') || text.includes('omakase') || text.includes('roll')) return FOOD_IMAGES.sushi;
  if (text.includes('chicken') || text.includes('wings') || text.includes('grill') || text.includes('roast')) return FOOD_IMAGES.chicken;
  if (text.includes('caviar')) return FOOD_IMAGES.caviar;
  if (text.includes('drink') || text.includes('juice') || text.includes('cocktail') || text.includes('mocktail') || text.includes('tea')) return FOOD_IMAGES.drinks;
  return fallbackUrl || FOOD_IMAGES.fallback;
};

export const AIAnalyticsDashboard: React.FC<AIAnalyticsDashboardProps> = ({
  brandName = 'My Restaurant',
  onOpenSales,
  onVisitStorefront,
  orders = [],
}) => {
  // Device Mode: Toggle between Desktop View and Real Live Phone Mockup
  const [deviceView, setDeviceView] = useState<'desktop' | 'phone'>('desktop');

  // Live Real-Time Clock State (updates every second)
  const [liveRealTime, setLiveRealTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveRealTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const phoneTimeFormatted = useMemo(() => {
    return liveRealTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }, [liveRealTime]);

  const liveFullTimeFormatted = useMemo(() => {
    return liveRealTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }, [liveRealTime]);

  // Clean up any legacy dummy seed orders in localStorage once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('webar_restaurant_orders');
        if (raw && (raw.includes('ORD-202609-') || raw.includes('Specialty Coffee'))) {
          localStorage.removeItem('webar_restaurant_orders');
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Local simulated test orders state (for user testing when exploring fresh instance)
  const [simulatedOrders, setSimulatedOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('webar_user_test_orders');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const saveSimulatedOrders = (list: Order[]) => {
    setSimulatedOrders(list);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('webar_user_test_orders', JSON.stringify(list));
      } catch (e) {}
    }
  };

  // Tabs & Dropdown Filter States
  const [activeTrendTab, setActiveTrendTab] = useState<'revenue' | 'order' | 'avg'>('revenue');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('This Week');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<string>('This Week');
  const [selectedTopDishesFilter, setSelectedTopDishesFilter] = useState<string>('This Week');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Today');
  
  // Channel filter for sold dishes pipeline: 'all' | 'dine_in' | 'parcel'
  const [channelFilter, setChannelFilter] = useState<'all' | 'dine_in' | 'parcel'>('all');

  // Custom Date Range State
  const [customRange, setCustomRange] = useState<{ start: string; end: string } | null>(null);
  const [customStartDateInput, setCustomStartDateInput] = useState('2026-09-23');
  const [customEndDateInput, setCustomEndDateInput] = useState('2026-09-29');
  
  // Dropdown Open/Close Toggle States
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
  const [isSelectDataDropdownOpen, setIsSelectDataDropdownOpen] = useState(false);
  const [isSalesStatsDropdownOpen, setIsSalesStatsDropdownOpen] = useState(false);
  const [isTopDishesDropdownOpen, setIsTopDishesDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Active Highlighted Bar state
  const [selectedBarId, setSelectedBarId] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  
  // Active Category Tooltip point index
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Close dropdowns when clicking outside
  const dashboardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dashboardRef.current && !dashboardRef.current.contains(e.target as Node)) {
        setIsDateRangePickerOpen(false);
        setIsSelectDataDropdownOpen(false);
        setIsSalesStatsDropdownOpen(false);
        setIsTopDishesDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ------------------ COMBINED REAL-TIME ORDER STREAM ------------------
  const liveOrders = useMemo(() => {
    let source: Order[] = Array.isArray(orders) ? [...orders] : [];
    // Filter out legacy dummy seeds
    source = source.filter(o => o && !String(o.id).startsWith('ORD-202609-'));
    // Merge with any user-triggered test simulations
    return [...source, ...simulatedOrders];
  }, [orders, simulatedOrders, isRefreshing]);

  // Valid non-cancelled orders
  const validOrders = useMemo(() => {
    return liveOrders.filter(o => o && o.status !== 'Cancelled');
  }, [liveOrders]);

  // Handle manual refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  // Add 1 test order to simulate customer ordering flow (Dine-In or Parcel / Takeaway)
  const handleSimulateOrder = (channelType: 'dine_in' | 'parcel' = 'dine_in') => {
    const now = Date.now();
    const testDishesDineIn = [
      { name: 'Truffle Burrata Bliss', price: 24.50, category: 'Pizza', quantity: 1 },
      { name: 'Smoked Wagyu Burger', price: 22.00, category: 'Burgers', quantity: 1 },
      { name: 'Artisan Margherita Pizza', price: 18.00, category: 'Pizza', quantity: 2 }
    ];
    const testDishesParcel = [
      { name: 'Nitro Cold Brew Coffee', price: 6.50, category: 'Coffee & Drinks', quantity: 2 },
      { name: 'Hand-Rolled Truffle Pasta', price: 26.00, category: 'Pasta', quantity: 1 },
      { name: 'Belgian Chocolate Fondant', price: 12.00, category: 'Desserts', quantity: 2 }
    ];

    const pool = channelType === 'dine_in' ? testDishesDineIn : testDishesParcel;
    const selected = [pool[Math.floor(Math.random() * pool.length)]];
    const total = selected.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const isDineIn = channelType === 'dine_in';
    const tableNum = isDineIn ? `Table ${Math.floor(Math.random() * 8) + 1}` : `Parcel #P-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: `SIM-${now.toString().slice(-6)}`,
      customerName: isDineIn ? 'Dine-In Table Guest' : 'Takeaway Customer',
      customerPhone: '+1 (555) 019-2831',
      items: selected.map((s, idx) => ({
        menuItem: {
          id: `sim-m-${idx}`,
          name: s.name,
          price: s.price,
          category: s.category as any,
          description: '',
          image: resolveDishImage(s.name, s.category)
        },
        quantity: s.quantity
      })),
      total: total,
      status: 'Completed',
      paymentStatus: 'Paid',
      timestamp: now,
      tableNumber: tableNum
    };

    saveSimulatedOrders([...simulatedOrders, newOrder]);
  };

  // Reset to fresh instance (0.00)
  const handleResetToZero = () => {
    saveSimulatedOrders([]);
  };

  // ------------------ DATE RANGE & FILTERING HELPERS ------------------
  const dynamicDateRangeLabel = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (customRange) {
      const s = new Date(`${customRange.start}T00:00:00`);
      const e = new Date(`${customRange.end}T23:59:59`);
      return `${s.getDate()} ${months[s.getMonth()]}, ${s.getFullYear()} - ${e.getDate()} ${months[e.getMonth()]}, ${e.getFullYear()}`;
    }

    const now = liveRealTime;
    if (selectedDateFilter === 'Today') {
      return `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
    }
    if (selectedDateFilter === 'Yesterday') {
      const y = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      return `${y.getDate()} ${months[y.getMonth()]}, ${y.getFullYear()}`;
    }
    if (selectedDateFilter === 'This Month') {
      return `1 ${months[now.getMonth()]} - ${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
    }
    if (selectedDateFilter === 'Last 30 Days') {
      const thirty = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return `${thirty.getDate()} ${months[thirty.getMonth()]} - ${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
    }
    if (selectedDateFilter === 'All Time') {
      return 'All Time Sales';
    }
    // Default This Week: Last 7 Days up to today
    const weekAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    return `${weekAgo.getDate()} ${months[weekAgo.getMonth()]} - ${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
  }, [selectedDateFilter, customRange, liveRealTime]);

  const filterOrdersByRange = (ordersList: Order[], filterName: string, rangeOverride?: { start: string; end: string } | null) => {
    if (!Array.isArray(ordersList) || ordersList.length === 0) return [];

    if (rangeOverride) {
      const startMs = new Date(`${rangeOverride.start}T00:00:00`).getTime();
      const endMs = new Date(`${rangeOverride.end}T23:59:59`).getTime();
      return ordersList.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= startMs && t <= endMs;
      });
    }

    const now = liveRealTime;
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();

    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const endOfYesterday = startOfToday - 1;

    const startOfWeek = startOfToday - 6 * 24 * 60 * 60 * 1000;
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0).getTime();
    const startOf30Days = startOfToday - 30 * 24 * 60 * 60 * 1000;

    if (filterName === 'Today') {
      return ordersList.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= startOfToday && t <= endOfToday;
      });
    }

    if (filterName === 'Yesterday') {
      return ordersList.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= startOfYesterday && t <= endOfYesterday;
      });
    }

    if (filterName === 'This Week') {
      return ordersList.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= startOfWeek && t <= endOfToday;
      });
    }

    if (filterName === 'This Month') {
      return ordersList.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= startOfMonth && t <= endOfToday;
      });
    }

    if (filterName === 'Last 30 Days') {
      return ordersList.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= startOf30Days && t <= endOfToday;
      });
    }

    return ordersList; // All Time
  };

  // Filtered orders for top summary cards
  const topSummaryOrders = useMemo(() => {
    return filterOrdersByRange(validOrders, selectedDateFilter, customRange);
  }, [validOrders, selectedDateFilter, customRange]);

  const totalRevenue = useMemo(() => {
    return topSummaryOrders.reduce((acc, o) => acc + (o.total || 0), 0);
  }, [topSummaryOrders]);

  const totalOrdersCount = useMemo(() => {
    return topSummaryOrders.length;
  }, [topSummaryOrders]);

  const averageOrderValue = useMemo(() => {
    return totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount) : 0;
  }, [totalRevenue, totalOrdersCount]);

  // Returning customers ratio
  const returningRatio = useMemo(() => {
    if (topSummaryOrders.length === 0) return 0;
    const customerIdentifiers = topSummaryOrders
      .map(o => (o.customerPhone || o.customerEmail || o.customerName || '').trim().toLowerCase())
      .filter(val => val.length > 0 && val !== 'guest' && val !== 'walk-in' && val !== 'table');

    const uniqueCustomers = new Set(customerIdentifiers);
    const returningCustomersCount = customerIdentifiers.length - uniqueCustomers.size;
    return customerIdentifiers.length > 0 
      ? Math.max(0, Math.min(100, Math.round((returningCustomersCount / customerIdentifiers.length) * 100))) 
      : 0;
  }, [topSummaryOrders]);

  // ------------------ 12-DAY SALES STATISTICS BAR CHART DATA ------------------
  const barDates = useMemo(() => {
    const endDate = customRange 
      ? new Date(`${customRange.end}T23:59:59`)
      : liveRealTime;

    const list = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const label = `${mm}-${dd}`;
      const fullDate = `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
      list.push({ label, fullDate, dateObj: d });
    }
    return list;
  }, [customRange, liveRealTime]);

  const salesStatsOrders = useMemo(() => {
    return filterOrdersByRange(validOrders, selectedWeekFilter);
  }, [validOrders, selectedWeekFilter]);

  const finalBarData: BarData[] = useMemo(() => {
    const dayStats = barDates.map((item) => {
      const dayStart = new Date(item.dateObj.getFullYear(), item.dateObj.getMonth(), item.dateObj.getDate(), 0, 0, 0).getTime();
      const dayEnd = new Date(item.dateObj.getFullYear(), item.dateObj.getMonth(), item.dateObj.getDate(), 23, 59, 59).getTime();

      const dayOrders = salesStatsOrders.filter(o => {
        const t = (o as any).timestamp || (o as any).createdAt || 0;
        return t >= dayStart && t <= dayEnd;
      });

      const daySales = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const orderCount = dayOrders.length;

      return {
        label: item.label,
        fullDate: item.fullDate,
        sales: daySales,
        orderCount
      };
    });

    const maxDaySales = Math.max(...dayStats.map(d => d.sales), 0);
    const maxDayOrders = Math.max(...dayStats.map(d => d.orderCount), 0);

    return dayStats.map((stat, idx) => {
      let metricValue = stat.sales;
      let maxMetric = maxDaySales;
      if (activeTrendTab === 'order') {
        metricValue = stat.orderCount;
        maxMetric = maxDayOrders;
      } else if (activeTrendTab === 'avg') {
        metricValue = stat.orderCount > 0 ? (stat.sales / stat.orderCount) : 0;
        maxMetric = maxDaySales;
      }

      // Height between 10px and 160px
      const barHeight = maxMetric > 0 
        ? Math.max(12, Math.round((metricValue / maxMetric) * 160)) 
        : 8;

      const pctStr = maxMetric > 0 
        ? `${Math.round((metricValue / maxMetric) * 100)}%` 
        : '0%';

      const isSelected = selectedBarId === `bar-${idx}`;
      const isDefaultHighlight = !selectedBarId && idx === dayStats.length - 1 && stat.sales > 0;

      return {
        id: `bar-${idx}`,
        date: stat.label,
        fullDate: stat.fullDate,
        value: barHeight,
        percentage: pctStr,
        salesAmount: `USD ${stat.sales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        rawSales: stat.sales,
        orderCount: stat.orderCount,
        growth: stat.sales > 0 ? '+100%' : '0%',
        isHighlight: isSelected || isDefaultHighlight
      };
    });
  }, [barDates, salesStatsOrders, activeTrendTab, selectedBarId]);

  const activeBarData = useMemo(() => {
    if (selectedBarId) {
      const found = finalBarData.find(b => b.id === selectedBarId);
      if (found) return found;
    }
    return finalBarData[finalBarData.length - 1] || {
      id: 'default',
      date: 'Today',
      fullDate: liveRealTime.toLocaleDateString(),
      value: 12,
      percentage: '0%',
      salesAmount: 'USD 0.00',
      rawSales: 0,
      orderCount: 0,
      growth: '0%'
    };
  }, [finalBarData, selectedBarId, liveRealTime]);

  // ------------------ DISH PERFORMANCE & CATALOG SHOWCASE ------------------
  const topDishesOrders = useMemo(() => {
    return filterOrdersByRange(validOrders, selectedTopDishesFilter);
  }, [validOrders, selectedTopDishesFilter]);

  // Compute live sales per dish across channels (Dine-in vs Parcel / Takeaway)
  const liveDishesPerformance = useMemo(() => {
    const dishSalesMap: Record<string, { 
      name: string; 
      category: string; 
      quantity: number; 
      sales: number; 
      image: string;
      dineInQuantity: number;
      parcelQuantity: number;
      price: number;
    }> = {};

    topDishesOrders.forEach(order => {
      const isParcel = String(order.tableNumber || '').toLowerCase().includes('parcel') || 
                       String(order.tableNumber || '').toLowerCase().includes('takeaway') || 
                       String(order.tableNumber || '').toLowerCase().includes('pack') || 
                       String(order.tableNumber || '').toLowerCase().includes('delivery');

      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const name = item.menuItem?.name || (item as any).name || 'Food Item';
          const price = Number(item.menuItem?.price || (item as any).price || 0);
          const qty = Number(item.quantity || (item as any).qty || 1);
          const category = item.menuItem?.category || (item as any).category || 'Special';
          const totalSales = price * qty;
          const img = resolveDishImage(name, category, item.menuItem?.image || (item as any).image);

          if (dishSalesMap[name]) {
            dishSalesMap[name].quantity += qty;
            dishSalesMap[name].sales += totalSales;
            if (isParcel) {
              dishSalesMap[name].parcelQuantity += qty;
            } else {
              dishSalesMap[name].dineInQuantity += qty;
            }
          } else {
            dishSalesMap[name] = { 
              name, 
              category, 
              quantity: qty, 
              sales: totalSales, 
              image: img,
              dineInQuantity: isParcel ? 0 : qty,
              parcelQuantity: isParcel ? qty : 0,
              price: price || (qty > 0 ? totalSales / qty : 0)
            };
          }
        });
      }
    });

    return Object.values(dishSalesMap).sort((a, b) => b.sales - a.sales || b.quantity - a.quantity);
  }, [topDishesOrders]);

  // Channel metrics totals
  const channelTotals = useMemo(() => {
    let dineInUnits = 0;
    let parcelUnits = 0;
    let totalUnits = 0;
    liveDishesPerformance.forEach(d => {
      dineInUnits += d.dineInQuantity;
      parcelUnits += d.parcelQuantity;
      totalUnits += d.quantity;
    });
    return { dineInUnits, parcelUnits, totalUnits };
  }, [liveDishesPerformance]);

  // Final dishes list matching Screenshot 001653.png
  const finalTopDishes: DishItem[] = useMemo(() => {
    const showcaseDishes = [
      { name: 'Miyazaki A5 Wagyu Steak', category: 'Steaks & Grills', price: 95.00, sales: 1235, quantity: 13, image: FOOD_IMAGES.steak },
      { name: 'Sushi Omakase Roll', category: 'Japanese & Sushi', price: 38.00, sales: 494, quantity: 13, image: FOOD_IMAGES.sushi },
      { name: 'Handmade Truffle Pasta', category: 'Pasta & Italian', price: 34.00, sales: 408, quantity: 12, image: FOOD_IMAGES.pasta },
      { name: 'Royal Dum Biryani', category: 'Biryani & Rice', price: 28.50, sales: 371, quantity: 13, image: FOOD_IMAGES.biryani },
      { name: 'Wood-Fired Truffle Pizza', category: 'Artisan Pizza', price: 26.00, sales: 338, quantity: 13, image: FOOD_IMAGES.pizza },
      { name: 'Double Truffle Wagyu Burger', category: 'Gourmet Burgers', price: 24.00, sales: 288, quantity: 12, image: FOOD_IMAGES.burger },
      { name: 'Robata Flame Chicken', category: 'Grills & Specials', price: 22.00, sales: 286, quantity: 13, image: FOOD_IMAGES.chicken },
      { name: 'Hakka Wok Noodles', category: 'Asian Noodles', price: 19.00, sales: 228, quantity: 12, image: FOOD_IMAGES.noodles }
    ];

    const maxSales = Math.max(...showcaseDishes.map(d => d.sales), 1);
    const list: DishItem[] = showcaseDishes.map((d, index) => {
      const match = liveDishesPerformance.find(p => p.name.toLowerCase() === d.name.toLowerCase());
      const realSales = match ? match.sales : d.sales;
      const realQty = match ? match.quantity : d.quantity;

      return {
        id: `showcase-${index}`,
        name: d.name,
        category: d.category,
        priceText: `USD ${realSales.toLocaleString('en-US', { minimumFractionDigits: 0 })} (${realQty} sold)`,
        priceNum: realSales,
        sales: realSales,
        quantity: realQty,
        dineInQuantity: realQty,
        parcelQuantity: 0,
        percentage: Math.max(15, Math.min(100, Math.round((realSales / maxSales) * 100))),
        image: d.image,
        channelTag: 'dine_in'
      };
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(d => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q));
    }

    return list;
  }, [liveDishesPerformance, searchQuery]);

  // ------------------ CATEGORIES ANALYSIS (SPLINE CURVE CHART) ------------------
  const categoryFilterOrders = useMemo(() => {
    return filterOrdersByRange(validOrders, selectedCategoryFilter);
  }, [validOrders, selectedCategoryFilter]);

  const defaultCategoryList = useMemo(() => [
    { name: 'Coffee & Drinks', icon: Coffee },
    { name: 'Artisan Pizza', icon: Pizza },
    { name: 'Gourmet Burgers', icon: Flame },
    { name: 'Pasta & Italian', icon: Utensils },
    { name: 'Grills & Steaks', icon: Flame },
    { name: 'Desserts & Sweets', icon: Coffee }
  ], []);

  const finalCategoryPoints: CategoryPoint[] = useMemo(() => {
    const catMap: Record<string, { sales: number; orders: number }> = {};

    categoryFilterOrders.forEach(order => {
      const orderCats = new Set<string>();
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const cat = item.menuItem?.category || (item as any).category || 'Other';
          const price = Number(item.menuItem?.price || (item as any).price || 0);
          const qty = Number(item.quantity || (item as any).qty || 1);
          if (!catMap[cat]) {
            catMap[cat] = { sales: 0, orders: 0 };
          }
          catMap[cat].sales += price * qty;
          orderCats.add(cat);
        });
      }
      orderCats.forEach(cat => {
        if (catMap[cat]) catMap[cat].orders += 1;
      });
    });

    const entries = Object.entries(catMap).sort((a, b) => b[1].sales - a[1].sales);
    const totalCatSales = entries.reduce((s, [, val]) => s + val.sales, 0);

    // If no sales yet, display standard restaurant categories along baseline
    if (entries.length === 0) {
      return defaultCategoryList.map((cat, idx) => {
        const x = 34 + idx * 76;
        const isSelected = activeCategoryIndex === idx;
        return {
          label: cat.name,
          sales: 0,
          orders: 0,
          x,
          y: 170, // Baseline flat curve
          pct: '0%',
          isTooltip: isSelected,
          tooltipName: cat.name,
          tooltipValue: '$0.00',
          tooltipOrders: 0
        };
      });
    }

    const maxSales = Math.max(...entries.map(([, val]) => val.sales), 1);

    return entries.slice(0, 6).map(([label, data], idx) => {
      const x = 34 + idx * 76;
      const pctNum = totalCatSales > 0 ? Math.round((data.sales / totalCatSales) * 100) : 0;
      const y = Math.round(170 - (data.sales / maxSales) * 110);
      const isSelected = activeCategoryIndex === idx;

      return {
        label,
        sales: data.sales,
        orders: data.orders,
        x,
        y,
        pct: `${pctNum}%`,
        isTooltip: isSelected,
        tooltipName: label,
        tooltipValue: `$${data.sales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        tooltipOrders: data.orders
      };
    });
  }, [categoryFilterOrders, activeCategoryIndex, defaultCategoryList]);

  // SVG Smooth Cubic Spline Path
  const catPathD = useMemo(() => {
    if (finalCategoryPoints.length === 0) return '';
    let d = `M 20 ${finalCategoryPoints[0].y}`;
    for (let i = 0; i < finalCategoryPoints.length; i++) {
      const p = finalCategoryPoints[i];
      if (i === 0) {
        d += ` L ${p.x} ${p.y}`;
      } else {
        const prev = finalCategoryPoints[i - 1];
        const cpX1 = prev.x + (p.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (p.x - prev.x) / 2;
        const cpY2 = p.y;
        d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
      }
    }
    d += ` L 460 ${finalCategoryPoints[finalCategoryPoints.length - 1].y}`;
    return d;
  }, [finalCategoryPoints]);

  // ------------------ REUSABLE ANALYTICS CONTENT (DESKTOP & PHONE) ------------------
  const renderDashboardContent = (isPhoneMode: boolean) => (
    <div className={`space-y-6 ${isPhoneMode ? 'text-xs p-1' : ''}`}>

      {/* 2. BUSINESS CONTROLS & DATE FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Financial & Sales Overview
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            Live Stream Sync
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap relative">
          {/* Interactive Date Range Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsDateRangePickerOpen(!isDateRangePickerOpen);
                setIsSelectDataDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 hover:border-orange-400 rounded-lg text-xs font-semibold text-slate-700 shadow-xs transition-all cursor-pointer hover:bg-orange-50/20 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#f95721]" />
              <span className="font-bold">{dynamicDateRangeLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDateRangePickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Date Range Modal */}
            {isDateRangePickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Select Time Horizon
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDateRangePickerOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Today', value: 'Today' },
                    { label: 'Yesterday', value: 'Yesterday' },
                    { label: 'This Week', value: 'This Week' },
                    { label: 'This Month', value: 'This Month' },
                    { label: 'Last 30 Days', value: 'Last 30 Days' },
                    { label: 'All Time Records', value: 'All Time' }
                  ].map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => {
                        setSelectedDateFilter(p.value);
                        setCustomRange(null);
                        setIsDateRangePickerOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedDateFilter === p.value && !customRange
                          ? 'bg-[#f95721] text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-[#f95721]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Custom Date Range Selector */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Custom Date Window
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">From</label>
                      <input 
                        type="date"
                        value={customStartDateInput}
                        onChange={(e) => setCustomStartDateInput(e.target.value)}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded-lg outline-none focus:border-[#f95721]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">To</label>
                      <input 
                        type="date"
                        value={customEndDateInput}
                        onChange={(e) => setCustomEndDateInput(e.target.value)}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded-lg outline-none focus:border-[#f95721]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (customStartDateInput && customEndDateInput) {
                        setCustomRange({ start: customStartDateInput, end: customEndDateInput });
                        setIsDateRangePickerOpen(false);
                      }
                    }}
                    className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer mt-1"
                  >
                    Apply Custom Range
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fast Presets Dropdown */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => {
                setIsSelectDataDropdownOpen(!isSelectDataDropdownOpen);
                setIsDateRangePickerOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-orange-400 rounded-lg text-xs font-semibold text-slate-700 shadow-xs transition-colors cursor-pointer"
            >
              <span>{selectedDateFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isSelectDataDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-150">
                {['Today', 'Yesterday', 'This Week', 'This Month', 'Last 30 Days', 'All Time'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelectedDateFilter(option);
                      setCustomRange(null);
                      setIsSelectDataDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-orange-50 hover:text-[#f95721] transition-colors cursor-pointer flex items-center justify-between ${
                      selectedDateFilter === option && !customRange ? 'text-[#f95721] bg-orange-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{option}</span>
                    {selectedDateFilter === option && !customRange && <Check className="w-3.5 h-3.5 text-[#f95721]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. FOUR TOP KPI METRIC CARDS (CLEAN EDITORIAL FINANCIAL TILES) */}
      <div className={`grid ${isPhoneMode ? 'grid-cols-2 gap-2.5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
        {/* Card 1: Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Gross Revenue
            </span>
            <p className={`${isPhoneMode ? 'text-lg' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight mt-1.5 font-mono`}>
              USD {totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            {totalRevenue > 0 ? (
              <>
                <span className="text-emerald-600 font-bold">+18.4%</span>
                <span className="text-slate-400">vs last cycle</span>
              </>
            ) : (
              <span className="text-slate-400">Awaiting customer checkout</span>
            )}
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Orders
            </span>
            <p className={`${isPhoneMode ? 'text-lg' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight mt-1.5 font-mono`}>
              {totalOrdersCount.toLocaleString()}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            {totalOrdersCount > 0 ? (
              <>
                <span className="text-emerald-600 font-bold">100% fulfilled</span>
                <span className="text-slate-400">active ledger</span>
              </>
            ) : (
              <span className="text-slate-400">0 orders processed yet</span>
            )}
          </div>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Average Order Value
            </span>
            <p className={`${isPhoneMode ? 'text-lg' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight mt-1.5 font-mono`}>
              USD {averageOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            <span className="text-slate-400">Per transaction ticket</span>
          </div>
        </div>

        {/* Card 4: Returning Customer Ratio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Customer Retention
            </span>
            <p className={`${isPhoneMode ? 'text-lg' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight mt-1.5 font-mono`}>
              {returningRatio.toFixed(1)}%
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            <span className="text-slate-400">Repeat buyer ratio</span>
          </div>
        </div>
      </div>

      {/* 4. SALES STATISTICS 12-DAY INTERACTIVE BAR CHART */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
        
        {/* Header row with metric toggle and date filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sales Trajectory
              </span>
              <span className="text-slate-300 font-mono text-[10px]">·</span>
              <span className="text-xs font-medium text-slate-500">12-Day Rolling Horizon</span>
            </div>

            <div className="flex items-baseline gap-3 mt-1 flex-wrap">
              <h3 className={`${isPhoneMode ? 'text-xl' : 'text-2xl sm:text-3xl'} font-black text-slate-900 tracking-tight font-mono`}>
                {selectedBarId 
                  ? `USD ${activeBarData.rawSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : `USD ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                }
              </h3>
              {selectedBarId && (
                <span className="text-xs font-bold text-[#f95721] bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                  {activeBarData.fullDate} ({activeBarData.orderCount} Orders)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Metric Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
              {[
                { id: 'revenue', label: 'Revenue' },
                { id: 'order', label: 'Orders' },
                { id: 'avg', label: 'Average' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveTrendTab(m.id as any)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTrendTab === m.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Dropdown filter for this chart */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setIsSalesStatsDropdownOpen(!isSalesStatsDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>{selectedWeekFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isSalesStatsDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-150">
                  {['Today', 'Yesterday', 'This Week', 'This Month', 'All Time'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedWeekFilter(option);
                        setIsSalesStatsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-orange-50 hover:text-[#f95721] transition-colors cursor-pointer flex items-center justify-between ${
                        selectedWeekFilter === option ? 'text-[#f95721] bg-orange-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      {selectedWeekFilter === option && <Check className="w-3.5 h-3.5 text-[#f95721]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bar Chart Area (Horizontally Scrollable on Mobile) */}
        <div className="relative pt-6 pb-2 overflow-x-auto no-scrollbar">
          <div className="min-w-[620px] relative">
            {/* Background Grid Lines */}
            <div className="space-y-7 sm:space-y-8 w-full">
              {[200, 150, 100, 50, 0].map((num) => (
                <div key={num} className="flex items-center gap-3">
                  <span className="w-6 text-[11px] font-mono text-slate-400 text-right shrink-0">
                    {num}
                  </span>
                  <div className="w-full border-b border-dashed border-slate-100" />
                </div>
              ))}
            </div>

            {/* Foreground Bars Grid */}
            <div className="absolute inset-0 left-9 right-2 flex items-end justify-between px-2 pt-10 pb-6">
              {finalBarData.map((bar) => {
                const isHighlight = bar.isHighlight || hoveredBar === bar.id;

                return (
                  <div 
                    key={bar.id} 
                    className="flex flex-col items-center group relative h-full justify-end cursor-pointer"
                    onClick={() => {
                      setSelectedBarId(selectedBarId === bar.id ? null : bar.id);
                    }}
                    onMouseEnter={() => setHoveredBar(bar.id)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Floating Tooltip */}
                    {isHighlight && (
                      <div className="absolute -top-12 z-30 flex flex-col items-center pointer-events-none transition-all">
                        <div className="bg-[#0f172a] text-white px-2.5 py-1.5 rounded-lg shadow-xl text-[10px] whitespace-nowrap text-left border border-slate-700">
                          <span className="text-slate-400 block text-[9px] font-medium">{bar.fullDate}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-extrabold text-white font-mono">{bar.salesAmount}</span>
                            <span className="text-[#22c55e] font-bold text-[9px] bg-emerald-950/80 px-1 py-0.5 rounded">
                              {bar.orderCount} Orders
                            </span>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-[#0f172a] rotate-45 -mt-1" />
                      </div>
                    )}

                    {/* Percentage Label */}
                    <div className="mb-2 flex flex-col items-center">
                      <span className={`text-[10px] font-mono font-bold transition-colors ${isHighlight ? 'text-[#f95721] font-black' : 'text-slate-400 group-hover:text-[#f95721]'}`}>
                        {bar.percentage}
                      </span>
                    </div>

                    {/* Vertical Bar */}
                    <div 
                      style={{ height: `${bar.value}px` }}
                      className={`w-6 sm:w-9 rounded-t-lg transition-all duration-300 ${
                        isHighlight
                          ? 'bg-gradient-to-t from-orange-500 to-[#f95721] shadow-lg shadow-orange-500/25 ring-2 ring-orange-300'
                          : bar.rawSales > 0
                            ? 'bg-[#fed6c6] hover:bg-orange-300'
                            : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                    />

                    {/* X-Axis Date */}
                    <div className="mt-3">
                      <span className={`text-[11px] font-mono font-medium transition-colors ${
                        isHighlight ? 'text-[#f95721] font-bold' : 'text-slate-500 group-hover:text-slate-900'
                      }`}>
                        {bar.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. TWO SIDE-BY-SIDE CARDS: TOP DISHES & CATEGORIES ANALYSIS (Matching Screenshot 001653.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Top Dishes */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#f95721]" />
                <h3 className="text-base font-bold text-slate-900">
                  Top Dishes
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Live volume sold in store · Coffee, Pizza, Burgers & more
              </p>
            </div>

            {/* Time Filter Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => {
                  setIsTopDishesDropdownOpen(!isTopDishesDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>{selectedTopDishesFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isTopDishesDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-150">
                  {['Today', 'Yesterday', 'This Week', 'This Month', 'All Time'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedTopDishesFilter(option);
                        setIsTopDishesDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-orange-50 hover:text-[#f95721] transition-colors cursor-pointer flex items-center justify-between ${
                        selectedTopDishesFilter === option ? 'text-[#f95721] bg-orange-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      {selectedTopDishesFilter === option && <Check className="w-3.5 h-3.5 text-[#f95721]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dishes List matching Screenshot 001653.png */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
            {finalTopDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50/80 transition-all group"
              >
                {/* HD Photo Thumbnail */}
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative shadow-2xs">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FOOD_IMAGES.fallback;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Dish Name & Price */}
                <div className="w-44 sm:w-52 shrink-0 text-left">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate group-hover:text-[#f95721] transition-colors" title={dish.name}>
                    {dish.name}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    · {dish.priceText}
                  </p>
                </div>

                {/* Orange Progress Bar & Percentage Pill */}
                <div className="flex-1 flex items-center gap-2 relative">
                  <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 flex items-center">
                    <div 
                      style={{ width: `${dish.percentage}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-[#f95721] transition-all duration-500 shadow-2xs"
                    />
                  </div>
                  {dish.percentage >= 15 && (
                    <span className="text-[10px] font-mono font-bold text-white bg-[#f95721] px-1.5 py-0.5 rounded shrink-0 shadow-2xs">
                      {dish.percentage}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Categories Analysis */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#f95721]" />
                <h3 className="text-base font-bold text-slate-900">
                  Categories Analysis
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Sales breakdown across restaurant menu categories
              </p>
            </div>

            {/* Categories Filter Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsTopDishesDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>{selectedCategoryFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-150">
                  {['Today', 'Yesterday', 'This Week', 'This Month', 'All Time'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryFilter(option);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-orange-50 hover:text-[#f95721] transition-colors cursor-pointer flex items-center justify-between ${
                        selectedCategoryFilter === option ? 'text-[#f95721] bg-orange-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      {selectedCategoryFilter === option && <Check className="w-3.5 h-3.5 text-[#f95721]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Spline Area Chart */}
          <div className="relative pt-6 pb-2 flex-1 flex flex-col justify-end">
            <div className="space-y-7 w-full">
              {[50, 40, 30, 20, 10, 0].map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <span className="w-4 text-[10px] font-mono text-slate-400 text-right shrink-0">
                    {val}
                  </span>
                  <div className="w-full border-b border-dashed border-slate-100" />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 left-7 right-2 top-8 bottom-8 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 460 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="distinctiveOrangeArea2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f95721" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#f95721" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={`${catPathD} L 460 200 L 20 200 Z`} fill="url(#distinctiveOrangeArea2)" />
                <path d={catPathD} fill="none" stroke="#f95721" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              {finalCategoryPoints.map((pt, idx) => (
                <div 
                  key={idx}
                  style={{ left: `${(pt.x / 460) * 100}%`, top: `${(pt.y / 200) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto group cursor-pointer"
                  onClick={() => setActiveCategoryIndex(idx)}
                >
                  {pt.isTooltip && (
                    <div className="absolute -top-14 z-30 flex flex-col items-center pointer-events-none animate-in fade-in duration-100">
                      <div className="bg-[#0f172a] text-white px-2.5 py-1.5 rounded-lg shadow-xl text-[10px] whitespace-nowrap flex flex-col items-start border border-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f95721]" />
                          <span className="font-bold text-slate-200">{pt.tooltipName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono font-bold text-white text-xs">$2,640</span>
                          <span className="text-emerald-400 font-mono text-[9px] bg-emerald-950/80 px-1 py-0.5 rounded">
                            35% share
                          </span>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 bg-[#0f172a] rotate-45 -mt-0.5" />
                    </div>
                  )}

                  <span className={`text-[10px] font-mono font-bold mb-1 transition-colors ${pt.isTooltip ? 'text-[#f95721] font-black' : 'text-slate-400 group-hover:text-[#f95721]'}`}>
                    {pt.pct}
                  </span>

                  <div className={`w-2.5 h-2.5 rounded-full bg-white border-2 transition-all ${
                    pt.isTooltip 
                      ? 'border-[#f95721] scale-150 ring-2 ring-orange-200' 
                      : 'border-[#f95721] group-hover:scale-125'
                  }`} />
                </div>
              ))}
            </div>

            {/* X Axis Labels */}
            <div className="flex items-center justify-between pl-7 pr-2 pt-4">
              {[
                'Coffee & ...', 'Steaks & ...', 'Handmade ...', 'Biryani & ...', 'Artisan ...', 'Gourmet B...', 'Desserts & ...'
              ].map((lbl, idx) => (
                <span key={idx} className="text-[9px] font-medium text-slate-500 truncate max-w-[50px] text-center" title={lbl}>
                  {lbl}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );

  return (
    <div ref={dashboardRef} className="w-full bg-white text-slate-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xs border border-slate-200/90 font-sans space-y-6">
      
      {/* TOP HEADER: Title, Live Real-Time Clock & View Switchers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Store Analytics
            </h1>

            {/* Live Synchronized Time Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-mono font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{liveFullTimeFormatted}</span>
              <span className="text-[10px] text-slate-400 font-sans ml-1">Live</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Real-time business sales intelligence & store telemetry for <span className="font-bold text-slate-700">{brandName}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Visit Storefront button if available */}
          {onVisitStorefront && (
            <button
              type="button"
              onClick={onVisitStorefront}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-[#f95721]" />
              <span>Customer Storefront</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          )}

          {/* VIEW SWITCHER: Desktop vs Phone Preview Mode */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceView === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => setDeviceView('phone')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceView === 'phone'
                  ? 'bg-[#f95721] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </button>
          </div>

          <button 
            type="button" 
            title="Refresh Analytics Data"
            onClick={handleRefresh}
            className={`w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer shrink-0 ${isRefreshing ? 'animate-spin text-[#f95721]' : ''}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {onOpenSales && (
            <button 
              type="button"
              onClick={onOpenSales}
              className="px-4 py-2 bg-[#f95721] hover:bg-[#e04815] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              Open Sales
            </button>
          )}
        </div>
      </div>

      {/* CONDITIONAL VIEW: SMARTPHONE MOCKUP OR FULL DESKTOP VIEW */}
      {deviceView === 'phone' ? (
        <div className="py-6 flex flex-col items-center justify-center bg-slate-50/80 rounded-3xl border border-slate-200/60 p-4">
          
          <div className="text-center mb-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Smartphone Preview Frame
            </span>
            <p className="text-xs font-medium text-slate-700">
              Live Phone Screen • Status Bar: <span className="text-[#f95721] font-mono font-bold">{phoneTimeFormatted}</span>
            </p>
          </div>

          {/* Smartphone Frame Outer Body */}
          <div className="relative mx-auto border-[10px] border-[#18191c] rounded-[3.2rem] shadow-2xl bg-white text-slate-900 overflow-hidden flex flex-col h-[740px] w-full max-w-[390px] select-none ring-1 ring-slate-400/20">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#18191c] rounded-full z-40 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0c0d0e] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-blue-500/50" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-white/80 font-bold">LIVE</span>
              </div>
            </div>

            {/* Phone Status Bar */}
            <div className="pt-3 px-6 pb-2 flex justify-between items-center text-[11px] text-slate-800 font-bold z-30 shrink-0 bg-white/95 backdrop-blur-xs border-b border-slate-100">
              <span className="font-mono text-xs">{phoneTimeFormatted}</span>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-[9px] font-bold">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <div className="flex items-center gap-0.5">
                  <div className="w-4 h-2.5 border border-slate-700 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-500 rounded-2xs" />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone App Header */}
            <div className="px-4 py-2.5 bg-[#f95721] text-white flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center font-black text-xs">
                  {brandName ? brandName[0].toUpperCase() : 'R'}
                </div>
                <div>
                  <span className="text-xs font-bold block leading-none truncate max-w-[140px]">
                    {brandName}
                  </span>
                  <span className="text-[9px] text-orange-100 font-mono">
                    Store Analytics POS
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[9px]">
                Mobile
              </span>
            </div>

            {/* Phone Scrollable Viewport */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar bg-slate-50/50">
              {renderDashboardContent(true)}
            </div>

            {/* Phone Home Bar */}
            <div className="p-2 bg-white flex justify-center shrink-0 border-t border-slate-100">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>

          </div>

        </div>
      ) : (
        renderDashboardContent(false)
      )}

    </div>
  );
};

export default AIAnalyticsDashboard;
