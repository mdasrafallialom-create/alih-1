import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import { MenuItem, OrderItem, Order, SubscriptionPlan, AdminSettings, MenuCategory } from './types';
import { MENU_ITEMS } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  startAlertLoop, 
  stopAlertLoop, 
  playOrderChime,
  hasActiveAlert 
} from './audio';
import { ActiveOrderCard } from './components/ActiveOrderCard';
import FooterAndLocation from './components/FooterAndLocation';
import HeroSlider from './components/HeroSlider';
import { MenuItemCard } from './components/MenuItemCard';

// Lazy load heavy components for high-speed initial rendering & optimal bundle code-splitting
const ThreeDViewer = lazy(() => import('./components/ThreeDViewer'));
const ManagerAuthModal = lazy(() => import('./components/ManagerAuthModal'));
const RestaurantAdminPanel = lazy(() => import('./components/RestaurantAdmin/RestaurantAdminPanel'));
const SuperAdminDashboard = lazy(() => import('./components/SuperAdminDashboard'));
const CustomerOrderTracking = lazy(() => import('./components/CustomerOrderTracking'));
const FoodDetailView = lazy(() => import('./components/FoodDetailView'));
const AboutAndPricing = lazy(() => import('./components/AboutAndPricing'));
const ChefSection = lazy(() => import('./components/ChefSection'));
const WebAROSPortalLanding = lazy(() => import('./components/WebAROSPortalLanding'));

// High-speed lightweight spinner fallback
const LazyFallback = () => (
  <div className="w-full flex items-center justify-center p-8 text-cyan-600">
    <div className="w-6 h-6 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
  </div>
);

// Firebase
import { db, auth, googleProvider } from './lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  setDoc,
  updateDoc, 
  doc, 
  query, 
  orderBy,
  deleteDoc,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  User
} from 'firebase/auth';

import { Language, translations } from './lib/translations';
import LunavereTheme from './components/themes/LunavereTheme';
import VelmoraDiningTheme from './components/themes/VelmoraDiningTheme';

// Lucide Icons
import { 
  Utensils, 
  ShoppingBag, 
  ChefHat, 
  AlertCircle, 
  Bell,
  Plus, 
  Minus, 
  Trash2, 
  Volume2, 
  VolumeX, 
  QrCode, 
  ListOrdered, 
  FileCheck2, 
  Search, 
  Sparkles,
  ListFilter,
  Info,
  Clock,
  ShieldCheck,
  LogOut,
  User as UserIcon,
  X,
  Home,
  Heart,
  UtensilsCrossed,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Languages,
  Globe,
  RefreshCw,
  List,
  CheckCircle2,
  Palette,
  Tag,
  CreditCard,
  Check
} from 'lucide-react';

const SUPER_ADMIN_EMAILS = ['mdasrafallialom@gmail.com'];

export default function App() {
  // ---------------------------------------------------------------------------
  // 1. STATE & STORAGE MANAGEMENT
  // ---------------------------------------------------------------------------
  
  // Active viewing modes: 'client' (Customer portal), 'admin' (Enterprise console), or 'superadmin'
  const [viewMode, setViewMode] = useState<'client' | 'admin' | 'superadmin'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('admin') === 'true' || 
        params.get('admin') === '5321' || 
        params.get('portal') === 'manager' ||
        window.location.pathname === '/admin5321' || 
        window.location.hash === '#admin5321'
      ) {
        return 'admin';
      }
      // If user was previously authenticated in admin mode and refreshed
      const savedAuth = localStorage.getItem('webar_admin_authenticated');
      const savedSession = localStorage.getItem('webar_active_manager_session');
      const savedView = localStorage.getItem('webar_current_view_mode');
      if (savedAuth === 'true' && savedSession && savedView === 'admin') {
        return 'admin';
      }
    }
    return 'client';
  });
  // Persist current viewMode to avoid flicker on page reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('webar_current_view_mode', viewMode);
      } catch (e) {}
    }
  }, [viewMode]);

  // ---------------------------------------------------------------------------
  // 4 SECTIONS WORKFLOW:
  // 1: 'edit'  - Edit Section (Everything visible, including WebAR OS Portal & Theme Workshop)
  // 2: 'plan1' - Plan 1 ($15 Basic - buttons removed)
  // 3: 'plan2' - Plan 2 ($49 Pro - buttons removed)
  // 4: 'plan3' - Plan 3 ($99 Elite - buttons removed)
  // ---------------------------------------------------------------------------
  const [activeWorkSection, setActiveWorkSection] = useState<'edit' | 'plan1' | 'plan2' | 'plan3'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan')?.toLowerCase();
      if (plan === '15' || plan === 'basic') return 'plan1';
      if (plan === '49' || plan === 'pro') return 'plan2';
      if (plan === '99' || plan === 'elite') return 'plan3';
    }
    return 'edit';
  });

  const [showTopPlanPopup, setShowTopPlanPopup] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan')?.toLowerCase();
      return Boolean(plan === '15' || plan === '49' || plan === '99' || plan === 'basic' || plan === 'pro' || plan === 'elite');
    }
    return false;
  });

  const handleSwitchSection = useCallback((section: 'edit' | 'plan1' | 'plan2' | 'plan3') => {
    setActiveWorkSection(section);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (section === 'edit') {
        url.searchParams.delete('plan');
      } else if (section === 'plan1') {
        url.searchParams.set('plan', '15');
      } else if (section === 'plan2') {
        url.searchParams.set('plan', '49');
      } else if (section === 'plan3') {
        url.searchParams.set('plan', '99');
      }
      window.history.pushState({}, '', url.toString());
    }

    if (section === 'edit') {
      setViewMode('admin');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('admin-switch-tab', { detail: 'menu_studio' }));
      }, 100);
    } else if (section === 'plan1') {
      setViewMode('client');
      setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: 'basic' }) : prev);
      setShowTopPlanPopup(true);
    } else if (section === 'plan2') {
      setViewMode('client');
      setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: 'pro' }) : prev);
      setShowTopPlanPopup(true);
    } else if (section === 'plan3') {
      setViewMode('client');
      setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: 'elite' }) : prev);
      setShowTopPlanPopup(true);
    }
  }, []);

  useEffect(() => {
    const handleSwitchEvent = (e: any) => {
      if (e.detail && ['edit', 'plan1', 'plan2', 'plan3'].includes(e.detail)) {
        handleSwitchSection(e.detail);
      }
    };
    const handlePortalEvent = () => setShowWebARPortal(true);
    window.addEventListener('switch-work-section', handleSwitchEvent);
    window.addEventListener('open-webar-portal', handlePortalEvent);
    return () => {
      window.removeEventListener('switch-work-section', handleSwitchEvent);
      window.removeEventListener('open-webar-portal', handlePortalEvent);
    };
  }, [handleSwitchSection]);

  const [initialPlan, setInitialPlan] = useState<SubscriptionPlan>('basic');
  const [showWebARPortal, setShowWebARPortal] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('portal') === 'webar' || params.get('view') === 'portal';
    }
    return false;
  });
  
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      // Check for saved manager session first to avoid flickering between IDs
      const saved = localStorage.getItem('webar_active_manager_session');
      if (saved) {
        try {
          const session = JSON.parse(saved);
          if (session.restaurantId) return session.restaurantId;
        } catch (e) {}
      }

      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('restaurantId') || params.get('r');
      if (urlId) {
        localStorage.setItem('webar_active_restaurant_id', urlId);
        return urlId;
      }

      const savedId = localStorage.getItem('webar_active_restaurant_id');
      if (savedId) return savedId;

      return 'demo-restaurant';
    }
    return 'demo-restaurant';
  });
  
  // Manager Authentication Session state
  const [managerSession, setManagerSession] = useState<{ name: string; email: string; role: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('webar_active_manager_session');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Custom interactive Mega Menu state
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLElement>(null);
  const megaMenuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMegaMenuOpen && 
        megaMenuRef.current && 
        !megaMenuRef.current.contains(event.target as Node) &&
        megaMenuBtnRef.current &&
        !megaMenuBtnRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMegaMenuOpen]);

  // Customer Authentication state
  const [user, setUser] = useState<User | null>(null);
  const isLoggingIn = useRef(false);

  // Sync Custom profile avatar from localStorage across admin/client views
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    const syncAvatar = () => {
      if (typeof window !== 'undefined') {
        setCustomAvatarUrl(localStorage.getItem('webar_custom_user_avatar'));
      }
    };
    syncAvatar();
    window.addEventListener('storage', syncAvatar);
    window.addEventListener('webar_avatar_changed', syncAvatar);
    return () => {
      window.removeEventListener('storage', syncAvatar);
      window.removeEventListener('webar_avatar_changed', syncAvatar);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    if (isLoggingIn.current) return null;
    isLoggingIn.current = true;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      if (error.code !== 'auth/cancelled-popup-request') {
        console.error("Login failed", error);
      }
      return null;
    } finally {
      isLoggingIn.current = false;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    handleManagerLogout();
  };

  const handleManagerLoginSuccess = (session: { name: string; email: string; role: string; restaurantId: string }) => {
    setManagerSession(session);
    setIsAdminAuthenticated(true);
    localStorage.setItem('webar_active_manager_session', JSON.stringify(session));
    localStorage.setItem('webar_admin_authenticated', 'true');
    
    // Ensure the URL has the correct restaurant ID
    if (!activeRestaurantId || activeRestaurantId !== session.restaurantId) {
      const url = new URL(window.location.href);
      url.searchParams.set('r', session.restaurantId);
      window.history.replaceState({}, '', url.toString());
      setActiveRestaurantId(session.restaurantId);
    }
    
    setViewMode('admin');
  };

  const handleManagerLogout = () => {
    setManagerSession(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem('webar_active_manager_session');
    localStorage.removeItem('webar_admin_authenticated');
    setViewMode('client');
  };

  // One-click instant entry to Admin Panel
  const enterAdminPanel = () => {
    if (!isAdminAuthenticated || !managerSession) {
      const existingSession = localStorage.getItem('webar_active_manager_session');
      if (existingSession) {
        try {
          const parsed = JSON.parse(existingSession);
          handleManagerLoginSuccess(parsed);
          return;
        } catch (e) {
          // ignore error and proceed with default session
        }
      }
      const session = {
        name: user?.displayName || 'Restaurant Manager',
        email: user?.email || 'admin@restaurant.com',
        role: 'Owner',
        restaurantId: activeRestaurantId || 'demo-restaurant'
      };
      handleManagerLoginSuccess(session);
    } else {
      setViewMode('admin');
    }
  };
  
  // App-wide orders state, synced with Firestore
  const [orders, setOrders] = useState<Order[]>([]);
  const [dynamicKeywords, setDynamicKeywords] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    if (!activeRestaurantId) return;

    const q = query(collection(db, "restaurants", activeRestaurantId, "keywords"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as { id: string; text: string }[];
      const sorted = [...list].sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0));
      setDynamicKeywords(sorted);
    }, (err) => {
      console.error("Keywords subscription error", err);
    });

    return () => unsubscribe();
  }, [activeRestaurantId]);

  useEffect(() => {
    if (!activeRestaurantId && viewMode !== 'superadmin') return;
    
    let q;
    if (viewMode === 'superadmin') {
      q = query(collection(db, "all_orders"));
    } else {
      q = query(collection(db, "restaurants", activeRestaurantId!, "orders"));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      // Sort in memory to avoid missing index errors
      const sortedOrders = [...ordersList].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setOrders(sortedOrders);
    }, (err) => {
      console.warn("Orders subscription warning:", err);
    });
    return () => unsubscribe();
  }, [activeRestaurantId, viewMode]);

  // Menu items synced with Firestore
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Auto-Seeding Logic disabled per user request to keep menu empty until user adds food
  const seedMenuIfEmpty = async (_restaurantId: string, _currentItems: MenuItem[]) => {
    return; // User requested strictly empty state until real items are added
  };

  useEffect(() => {
    if (!activeRestaurantId || activeRestaurantId.trim() === "") return;
    
    // Remove orderBy to avoid missing index or field issues that cause flickering
    const q = query(collection(db, "restaurants", activeRestaurantId, "menu"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[];
      
      // Sort in memory instead
      const sortedList = [...list].sort((a, b) => (a.category || "").localeCompare(b.category || ""));
      setMenuItems(sortedList);
      
      // Improved trigger: Only seed if the menu is very low on items and we haven't seeded this session
      const seededKey = `seeded_v14_${activeRestaurantId}`;
      if (list.length < 5 && !sessionStorage.getItem(seededKey)) {
        seedMenuIfEmpty(activeRestaurantId, list);
      }
    }, (err) => {
      console.warn("Menu onSnapshot warning:", err);
    });
    return () => unsubscribe();
  }, [activeRestaurantId]);

  // Active customer cart items
  const [cart, setCart] = useState<OrderItem[]>([]);
  
  // Cart overlay visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // 1.5 Language & RTL Management
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('webar_preferred_lang') || localStorage.getItem('laura_preferred_lang');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  const t = (key: keyof typeof translations['en']) => {
    return (translations[lang] as any)[key] || translations['en'][key];
  };

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('webar_preferred_lang', newLang);
  };

  // Table number detection: 1) URL Parameter, 2) Saved LocalStorage, 3) Null
  const [tableNumber, setTableNumber] = useState<string | number | null>(() => {
    if (typeof window !== 'undefined') {
      // Priority 1: ?table=X in URL
      const urlTable = new URLSearchParams(window.location.search).get('table');
      if (urlTable) {
        localStorage.setItem('webar_locked_table_by_url', urlTable);
        localStorage.setItem('webar_locked_table', urlTable);
        return urlTable;
      }
      // Priority 2: Lock from previous sessions
      const savedTable = localStorage.getItem('webar_locked_table');
      return savedTable ? savedTable : null;
    }
    return null;
  });

  // Keeps track of whether the table number was locked via URL (cannot be manually bypassed)
  const [isTableFromUrl, setIsTableFromUrl] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!new URLSearchParams(window.location.search).get('table') || 
             !!localStorage.getItem('webar_locked_table_by_url');
    }
    return false;
  });

  // Keep activeRestaurantId and tableNumber in sync with URL search params when they change (dynamic QR scan)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRestaurantId = params.get('restaurantId') || params.get('r');
      const urlTable = params.get('table');

      if (urlRestaurantId && urlRestaurantId !== activeRestaurantId) {
        localStorage.setItem('webar_active_restaurant_id', urlRestaurantId);
        setActiveRestaurantId(urlRestaurantId);
      }

      if (urlTable && String(urlTable) !== String(tableNumber)) {
        localStorage.setItem('webar_locked_table_by_url', urlTable);
        localStorage.setItem('webar_locked_table', String(urlTable));
        setTableNumber(urlTable);
      }
    }
  }, [typeof window !== 'undefined' ? window.location.search : '']);

  // Table Selection popup state (visible when tableNumber is null)
  const [showTableModal, setShowTableModal] = useState<boolean>(!tableNumber);

  const [isAllDishesOpen, setIsAllDishesOpen] = useState(false);
  // Active client-side menu category tab
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [waiterRequests, setWaiterRequests] = useState<any[]>([]);

  // Fetch Waiter Requests for Admin
  useEffect(() => {
    if (!activeRestaurantId || viewMode !== 'admin') return;

    const q = query(
      collection(db, "restaurants", activeRestaurantId, "waiter_requests"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWaiterRequests(list);
    }, (err) => {
      console.warn("Waiter requests onSnapshot warning:", err);
    });

    return () => unsubscribe();
  }, [activeRestaurantId, viewMode]);

  const handleRequestWaiter = async () => {
    if (!activeRestaurantId) return;
    if (!tableNumber) {
      setShowTableModal(true);
      return;
    }

    try {
      const waiterRef = collection(db, "restaurants", activeRestaurantId, "waiter_requests");
      await addDoc(waiterRef, {
        tableNumber,
        status: 'pending',
        timestamp: Date.now(),
        restaurantId: activeRestaurantId,
        type: 'General'
      });
      alert(lang === 'bn' ? 'ওয়েটারকে খবর দেওয়া হয়েছে। দয়া করে অপেক্ষা করুন।' : 'Waiter has been requested. Please wait.');
    } catch (error) {
      console.error("Error requesting waiter:", error);
    }
  };

  const handleResolveWaiter = async (requestId: string, action: 'confirm' | 'resolve' = 'resolve') => {
    if (!activeRestaurantId) return;
    try {
      if (action === 'confirm') {
        await updateDoc(doc(db, "restaurants", activeRestaurantId, "waiter_requests", requestId), {
          status: 'confirmed'
        });
      } else {
        await deleteDoc(doc(db, "restaurants", activeRestaurantId, "waiter_requests", requestId));
      }
    } catch (error) {
      console.error("Error resolving waiter request:", error);
    }
  };

  // Fetch Categories from Firestore
  useEffect(() => {
    if (!activeRestaurantId) return;

    const q = query(
      collection(db, "restaurants", activeRestaurantId, "categories"),
      orderBy("displayOrder", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuCategory[];
      setCategories(list);
    }, (err) => {
      console.error("Categories subscription error", err);
    });

    return () => unsubscribe();
  }, [activeRestaurantId]);

  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'cart' | 'wishlist'>('home');
  const [adminHeaderTitle, setAdminHeaderTitle] = useState<string>('ACTIVE DASHBOARD');

  useEffect(() => {
    const handleAdminTabChange = (e: any) => {
      if (e.detail && e.detail.label) {
        setAdminHeaderTitle(e.detail.label);
      }
    };
    window.addEventListener('admin-active-tab-change', handleAdminTabChange);
    return () => window.removeEventListener('admin-active-tab-change', handleAdminTabChange);
  }, []);

  // Customer filters & searches
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Click outside listener to collapse search bar
  useEffect(() => {
    if (!isSearchExpanded) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isDesktopOutside = !searchContainerRef.current || !searchContainerRef.current.contains(target);
      const isMobileOutside = !mobileSearchRef.current || !mobileSearchRef.current.contains(target);

      if (isDesktopOutside && isMobileOutside) {
        setIsSearchExpanded(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSearchExpanded]);
  const [isMobileCategoryMenuOpen, setIsMobileCategoryMenuOpen] = useState(false);
  const [onlyChefSpecial, setOnlyChefSpecial] = useState(false);
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  // Active 3D preview item
  const [activeARItem, setActiveARItem] = useState<MenuItem | null>(null);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [menuDisplayMode, setMenuDisplayMode] = useState<'poster' | 'grid'>('poster');

  // Hidden Manager Portal Access
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isManagerAuthOpen, setIsManagerAuthOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('tab') === 'theme_store') {
        return true;
      }
      return localStorage.getItem('webar_admin_authenticated') === 'true';
    }
    return false;
  });

  // Software Version Control
  const APP_VERSION = "2.1.0-STABLE";
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [globalConfig, setGlobalConfig] = useState<{ version: string } | null>(null);
  const [isAutoUpdating, setIsAutoUpdating] = useState(false);
  const [autoUpdateCountdown, setAutoUpdateCountdown] = useState(3);

  // Sync Global Config from Firestore
  useEffect(() => {
    const configDoc = doc(db, "config", "system");
    let isInitialLoad = true;
    const unsubscribe = onSnapshot(configDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as { version: string };
        setGlobalConfig(data);
        
        // Save the current active database version on load so we don't display
        // an update prompt immediately.
        if (isInitialLoad) {
          localStorage.setItem('webar_applied_version', data.version);
          isInitialLoad = false;
        } else {
          // If the version changes while the user is actively using the page, show the update toast
          const lastAppliedVersion = localStorage.getItem('webar_applied_version') || APP_VERSION;
          if (data.version !== lastAppliedVersion) {
            setShowUpdateToast(true);
          }
        }
      } else {
        // Initialize config if it doesn't exist
        setDoc(configDoc, { version: APP_VERSION });
      }
    }, (err) => {
      console.warn("Config onSnapshot warning:", err);
    });
    return () => unsubscribe();
  }, []);

  // Automated client update when idle
  useEffect(() => {
    if (!showUpdateToast || !globalConfig) return;
    
    // Auto-update triggers automatically only for clients/customers
    if (viewMode === 'client') {
      const isIdle = cart.length === 0 && !showTracking && !activeARItem && !selectedFood;
      if (isIdle) {
        setIsAutoUpdating(true);
        let count = 3;
        const interval = setInterval(() => {
          count -= 1;
          setAutoUpdateCountdown(count);
          if (count <= 0) {
            clearInterval(interval);
            localStorage.setItem('webar_applied_version', globalConfig.version);
            window.location.reload();
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [showUpdateToast, viewMode, cart.length, showTracking, activeARItem, selectedFood, globalConfig]);

  const handleApplyUpdate = () => {
    if (globalConfig) {
      localStorage.setItem('webar_applied_version', globalConfig.version);
    }
    setShowUpdateToast(false);
    window.location.reload();
  };

  const handleTriggerGlobalUpdate = async () => {
    const newVersion = `v${Date.now()}`;
    const configDoc = doc(db, "config", "system");
    await updateDoc(configDoc, { version: newVersion });
  };

  // Secret Path/URL access check (admin5321)
  useEffect(() => {
    // Check if the current URL path is /admin5321 or hash is #admin5321
    const checkSecret = () => {
      if (window.location.pathname === '/admin5321' || window.location.hash === '#admin5321') {
        if (isAdminAuthenticated && user) {
          setViewMode('admin');
        } else {
          setIsManagerAuthOpen(true);
        }
      }
    };

    checkSecret();
    window.addEventListener('hashchange', checkSecret);
    
    // Legacy param check for backward compatibility
    const params = new URLSearchParams(window.location.search);
    if (params.get('portal') === 'manager' || params.get('admin') === '5321') {
      if (isAdminAuthenticated && user) {
        setViewMode('admin');
      } else {
        setIsManagerAuthOpen(true);
      }
      const newUrl = window.location.pathname + window.location.search.replace(/[?&](portal=manager|admin=5321)/, '');
      window.history.replaceState({}, '', newUrl);
    }

    return () => window.removeEventListener('hashchange', checkSecret);
  }, []);

  // Listen for back-navigation request to exit admin panel back to client view
  useEffect(() => {
    const handleExitAdmin = () => {
      setViewMode('client');
    };
    window.addEventListener('exit-admin-panel', handleExitAdmin);
    return () => {
      window.removeEventListener('exit-admin-panel', handleExitAdmin);
    };
  }, []);

  // Admin System Settings
  const [adminSettings, setAdminSettings] = useState<AdminSettings | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get('plan')?.toLowerCase();
      let enforcedPlan: SubscriptionPlan | null = null;
      if (planParam === '15' || planParam === 'basic') enforcedPlan = 'basic';
      else if (planParam === '49' || planParam === 'pro') enforcedPlan = 'pro';
      else if (planParam === '99' || planParam === 'elite' || planParam === 'premium') enforcedPlan = 'elite';

      const savedSettings = localStorage.getItem('webar_admin_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed && !parsed.theme) {
            parsed.theme = 'light';
          }
          if (enforcedPlan) {
            parsed.subscriptionPlan = enforcedPlan;
          }
          return parsed;
        } catch (e) {
          console.error('Failed to parse admin settings', e);
        }
      }

      if (enforcedPlan) {
        return {
          id: 'demo-restaurant',
          restaurantName: "L'Aura WebAR Restaurant",
          brandName: "sahinsh",
          brandLocation: "PAKISTAN",
          subscriptionPlan: enforcedPlan,
          subscriptionStatus: 'active',
          theme: 'light',
          audioEnabled: true,
          autoAcceptOrders: false,
          securityPinRequired: true,
          whatsappNumber: '+923000000000',
          currency: 'USD',
          taxRate: 5,
          customDomain: ''
        } as unknown as AdminSettings;
      }
    }
    return null;
  });

  // Sync plan parameter from URL into adminSettings, maintaining Client view initially
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get('plan');
      if (planParam) {
        const targetPlan: SubscriptionPlan = 
          planParam === '99' || planParam === 'elite' || planParam === 'premium' ? 'elite' :
          planParam === '49' || planParam === 'pro' ? 'pro' : 'basic';
        
        setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: targetPlan }) : {
          restaurantName: "L'Aura WebAR Restaurant",
          brandName: "sahinsh",
          brandLocation: "PAKISTAN",
          subscriptionPlan: targetPlan,
          subscriptionStatus: 'active',
          theme: 'light',
          audioEnabled: true,
          autoAcceptOrders: false,
          securityPinRequired: true,
          whatsappNumber: '+923000000000',
          currency: 'USD',
          taxRate: 5,
          customDomain: ''
        });
      }
    }
  }, []);

  // Dynamic Secret Admin code (PIN) loaded from localStorage (default: 8520)
  const [adminSecretCode, setAdminSecretCode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webar_admin_secret_code') || '8520';
    }
    return '8520';
  });

  useEffect(() => {
    const syncSecretCode = () => {
      if (typeof window !== 'undefined') {
        setAdminSecretCode(localStorage.getItem('webar_admin_secret_code') || '8520');
      }
    };
    window.addEventListener('storage', syncSecretCode);
    window.addEventListener('webar_secret_code_changed', syncSecretCode);
    return () => {
      window.removeEventListener('storage', syncSecretCode);
      window.removeEventListener('webar_secret_code_changed', syncSecretCode);
    };
  }, []);

  // Secret "Search" Trigger: Typing the secret admin password (8520) in the search bar opens the admin panel
  useEffect(() => {
    if (!searchTerm) return;
    const normalizedCode = adminSecretCode.toLowerCase().trim();
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const configuredPass = ((adminSettings as any)?.adminPassword || '').toLowerCase().trim();
    
    // MUST be exact match of 8520 or the configured secret PIN! Generic 'admin' is NOT allowed.
    const validPasswords = [
      '8520',
      'admin8520',
      '8520admin',
      normalizedCode,
      configuredPass
    ].filter(Boolean);
    
    if (validPasswords.some(pass => normalizedSearch === pass)) {
      enterAdminPanel();
      setSearchTerm(''); 
      setIsSearchExpanded(false);
    }
  }, [searchTerm, enterAdminPanel, adminSecretCode, adminSettings]);

  // Global Keyboard Listener (Secret Typing anywhere on the page)
  useEffect(() => {
    let keys = '';
    const normalizedCode = adminSecretCode.toLowerCase().trim();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      keys += e.key;
      const cleanKeys = keys.toLowerCase();
      if (cleanKeys.includes(normalizedCode) || cleanKeys.includes(normalizedCode.replace(/\s+/g, ''))) {
        if (isAdminAuthenticated && user) {
          setViewMode('admin');
        } else {
          setIsManagerAuthOpen(true);
        }
        keys = '';
      }
      if (keys.length > 30) keys = keys.slice(-30);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated, user, adminSecretCode]);

  // Admin section sub-tab: 'orders' | 'history' | 'qrcodes' | 'settings'
  const [adminTab, setAdminTab] = useState<'orders' | 'history' | 'qrcodes' | 'settings'>('orders');
  const [trialDismissed, setTrialDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (!activeRestaurantId) return;
    
    const unsubscribe = onSnapshot(doc(db, "restaurants", activeRestaurantId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as AdminSettings;
        const params = new URLSearchParams(window.location.search);
        const planParam = params.get('plan')?.toLowerCase();
        if (planParam === '15' || planParam === 'basic') {
          data.subscriptionPlan = 'basic';
        } else if (planParam === '49' || planParam === 'pro') {
          data.subscriptionPlan = 'pro';
        } else if (planParam === '99' || planParam === 'elite' || planParam === 'premium') {
          data.subscriptionPlan = 'elite';
        }
        setAdminSettings(data);
        localStorage.setItem('webar_admin_settings', JSON.stringify(data));
      }
    }, (err) => {
      console.warn("Restaurant settings onSnapshot warning:", err);
    });
    return () => unsubscribe();
  }, [activeRestaurantId]);

  const isSuperAdmin = user && SUPER_ADMIN_EMAILS.includes(user.email || '');

  // Handle Super Admin View
  // (Handled via top-level conditional return for strict isolation)

  // Subscription Tier Theme Configuration
  const getThemeConfig = (plan: SubscriptionPlan) => {
    switch (plan) {
      case 'pro':
        return {
          bgColor: '#f0f9ff',
          accentColor: '#0ea5e9',
          cardBg: 'bg-white',
          textColor: 'text-slate-900',
          animationPreset: 'smooth'
        };
      case 'elite':
        return {
          bgColor: '#faf6f0',
          accentColor: '#f59e0b',
          cardBg: 'bg-white',
          textColor: 'text-slate-900',
          animationPreset: 'rich'
        };
      default:
        return {
          bgColor: '#f8f1e9',
          accentColor: '#06b6d4',
          cardBg: 'bg-white',
          textColor: 'text-slate-900',
          animationPreset: 'standard'
        };
    }
  };

  const themeConfig = getThemeConfig(adminSettings?.subscriptionPlan || 'basic');
  const isTrialExpired = false;

  const activePlanPrice = useMemo(() => {
    if (adminSettings?.subscriptionPlan === 'elite' || activeWorkSection === 'plan3') return 99;
    if (adminSettings?.subscriptionPlan === 'pro' || activeWorkSection === 'plan2') return 49;
    if (adminSettings?.subscriptionPlan === 'basic' || activeWorkSection === 'plan1') return 15;
    if (typeof window !== 'undefined') {
      const plan = new URLSearchParams(window.location.search).get('plan')?.toLowerCase();
      if (plan === '99' || plan === 'elite') return 99;
      if (plan === '49' || plan === 'pro') return 49;
      if (plan === '15' || plan === 'basic') return 15;
    }
    return null;
  }, [adminSettings?.subscriptionPlan, activeWorkSection]);

  const handleBypassTrial = async () => {
    setTrialDismissed(true);
    if (activeRestaurantId) {
      try {
        const resRef = doc(db, "restaurants", activeRestaurantId);
        await updateDoc(resRef, {
          subscriptionPlan: 'pro',
          subscriptionStatus: 'active',
          trialEndsAt: Date.now() + (3650 * 24 * 60 * 60 * 1000)
        });
        setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: 'pro', subscriptionStatus: 'active', trialEndsAt: Date.now() + (3650 * 24 * 60 * 60 * 1000) }) : null);
      } catch (e) {
        console.error("Failed to upgrade plan", e);
      }
    }
  };

  // COMPLETELY ISOLATED SUPER ADMIN VIEW
  if (window.location.pathname === '/superadmin') {
    if (!isSuperAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md w-full space-y-4">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Access Restricted</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              This area is reserved for platform administrators only. Please log in with an authorized account or return to the main site.
            </p>
            <div className="pt-6">
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Suspense fallback={<LazyFallback />}>
        <SuperAdminDashboard onLogout={handleLogout} />
      </Suspense>
    );
  }

  // Helper to extract exactly 2 initials for the monogram logo
  const getLogoInitials = (name: string) => {
    if (!name) return ["L", "A"];
    
    // Remove non-alphanumeric characters except spaces
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanName) return ["L", "A"];
    
    const parts = cleanName.split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    
    return [cleanName[0].toUpperCase(), "A"];
  };

  // Helper to render a high-end designer SVG monogram logo
  const renderMonogramLogo = (brandName: string, isLight: boolean = false, size: 'sm' | 'md' | 'lg' = 'md') => {
    const [c1, c2] = getLogoInitials(brandName || 'sahinsh');
    const style = adminSettings?.logoStyle || 'crest';
    const primaryColor = adminSettings?.logoColorPrimary || '#f59e0b';
    const secondaryColor = adminSettings?.logoColorSecondary || '#d4af37';
    
    // Size classes
    const sizeClasses = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11';
    const roundedClass = size === 'sm' ? 'rounded-lg' : 'rounded-2xl';

    return (
      <div className={`${sizeClasses} ${roundedClass} bg-[#0b1329] border border-slate-800 shadow-md flex items-center justify-center relative overflow-hidden shrink-0 select-none group-hover:scale-105 transition-transform duration-300`}>
        {/* Decorative background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0%,transparent_70%)] pointer-events-none" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
          {/* STYLE 1: CREST */}
          {style === 'crest' && (
            <>
              <circle 
                cx="50" 
                cy="50" 
                r="41" 
                stroke={secondaryColor} 
                strokeWidth="0.8" 
                fill="none" 
                opacity={0.35}
              />
              <text 
                x="36" 
                y="52" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "45px", 
                  fontWeight: 300, 
                  fontStyle: "italic",
                  opacity: 0.95
                }}
              >
                {c1}
              </text>
              <line 
                x1="26" 
                y1="74" 
                x2="74" 
                y2="26" 
                stroke={secondaryColor} 
                strokeWidth="1.2" 
                opacity={0.5}
              />
              <text 
                x="64" 
                y="68" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "47px", 
                  fontWeight: 800,
                  filter: isLight ? "none" : `drop-shadow(1px 2px 3px rgba(0,0,0,0.5))`
                }}
              >
                {c2}
              </text>
            </>
          )}

          {/* STYLE 2: MINIMAL */}
          {style === 'minimal' && (
            <>
              <text 
                x="34" 
                y="50" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "49px", 
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                {c1}
              </text>
              <text 
                x="64" 
                y="68" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "52px", 
                  fontWeight: 700,
                  fontStyle: "italic",
                  filter: isLight ? "none" : `drop-shadow(2px 2px 4px rgba(0,0,0,0.4))`
                }}
              >
                {c2}
              </text>
            </>
          )}

          {/* STYLE 3: STAMP */}
          {style === 'stamp' && (
            <>
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                stroke={primaryColor} 
                strokeWidth="1" 
                strokeDasharray="4,3"
                fill="none" 
                opacity={0.5}
              />
              <circle 
                cx="50" 
                cy="50" 
                r="38" 
                stroke={secondaryColor} 
                strokeWidth="0.6" 
                fill="none" 
                opacity={0.3}
              />
              <text 
                x="44" 
                y="48" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "44px", 
                  fontWeight: 300,
                }}
              >
                {c1}
              </text>
              <text 
                x="56" 
                y="62" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif", 
                  fontSize: "44px", 
                  fontWeight: 700,
                }}
              >
                {c2}
              </text>
            </>
          )}

          {/* STYLE 4: MODERN */}
          {style === 'modern' && (
            <>
              <path 
                d="M15,35 L15,15 L35,15 M65,15 L85,15 L85,35 M85,65 L85,85 L65,85 M35,85 L15,85 L15,65" 
                stroke={primaryColor} 
                strokeWidth="1" 
                fill="none" 
                opacity={0.4} 
              />
              <text 
                x="35" 
                y="48" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={primaryColor} 
                style={{
                  fontFamily: "'Space Grotesk', 'Montserrat', sans-serif", 
                  fontSize: "42px", 
                  fontWeight: 900,
                  letterSpacing: "-2px"
                }}
              >
                {c1}
              </text>
              <text 
                x="65" 
                y="66" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={secondaryColor} 
                style={{
                  fontFamily: "'Space Grotesk', 'Montserrat', sans-serif", 
                  fontSize: "45px", 
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  filter: `drop-shadow(0px 0px 8px ${secondaryColor})`
                }}
              >
                {c2}
              </text>
            </>
          )}
        </svg>
      </div>
    );
  };

  const handleUpdateAdminSettings = async (newSettings: Partial<AdminSettings>) => {
    // Synchronously update local state and localStorage for instant theme response
    setAdminSettings(prev => {
      const updated = prev ? { ...prev, ...newSettings } : ({ ...newSettings } as AdminSettings);
      localStorage.setItem('webar_admin_settings', JSON.stringify(updated));
      return updated;
    });

    if (!activeRestaurantId) return;
    
    try {
      const docRef = doc(db, "restaurants", activeRestaurantId);
      await updateDoc(docRef, newSettings);
    } catch (e) {
      console.error('Failed to update admin settings in Firestore', e);
    }
  };

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('webar_admin_settings');
    if (savedSettings) {
      try {
        setAdminSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse admin settings', e);
      }
    }
  }, []);

  // Shared order persistence to localStorage to prevent data loss on page refreshes
  useEffect(() => {
    localStorage.setItem('webar_restaurant_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync state between client/admin across browser tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'webar_restaurant_orders' && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ---------------------------------------------------------------------------
  // 2. DUAL-LEVEL AUDIO ALERT SYSTEM (3-Sec Chime Control)
  // ---------------------------------------------------------------------------
  
  // Count how many orders are currently 'Pending'
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  useEffect(() => {
    if (pendingOrdersCount > 0 && adminSettings?.audioEnabled && viewMode === 'admin') {
      // Loop a beautiful native audio chime every 3 seconds
      startAlertLoop();
    } else {
      stopAlertLoop();
    }
    // Cleanup on unmount or mode toggle
    return () => stopAlertLoop();
  }, [pendingOrdersCount, adminSettings?.audioEnabled, viewMode]);

  // ---------------------------------------------------------------------------
  // 3. TABLE SELECTION METHODS
  // ---------------------------------------------------------------------------
  
  const handleLockTable = (tNum: number | string) => {
    setTableNumber(tNum);
    localStorage.setItem('webar_locked_table', String(tNum));
    setShowTableModal(false);
    playOrderChime(); // Gentle confirmation chime
  };

  const handleResetTable = () => {
    if (isTableFromUrl) {
      alert("This table is locked by QR scan parameter (?table=X). It cannot be manually changed.");
      return;
    }
    setTableNumber(null);
    localStorage.removeItem('webar_locked_table');
    setShowTableModal(true);
  };

  // ---------------------------------------------------------------------------
  // 4. CART & ORDER ACTIONS (CUSTOMER PORTAL)
  // ---------------------------------------------------------------------------
  
  const sendStatusEmail = async (order: Order) => {
    if (!order.customerEmail) return;
    try {
      await fetch('/api/send-status-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: order.customerEmail,
          orderId: order.id,
          status: order.status,
          tableNumber: order.tableNumber,
          items: order.items
        })
      });
    } catch (error) {
      console.error("Failed to send status email", error);
    }
  };

  // Filter menu items based on subscription plan with high performance memoization
  const tierFilteredItems = useMemo(() => {
    const plan = adminSettings?.subscriptionPlan || 'basic';
    // Only show items that are available and published
    const visibleItems = menuItems.filter(item => item.isAvailable !== false && item.published !== false);
    
    if (plan === 'basic') return visibleItems.slice(0, 150);
    if (plan === 'pro') return visibleItems.slice(0, 300);
    return visibleItems;
  }, [adminSettings?.subscriptionPlan, menuItems]);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.menuItem.id === item.id);
      if (exists) {
        return prev.map(i => i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1, notes: '' }];
    });
    
    // Play micro scale UI click chime
    playOrderChime();
  }, []);

  const handleOpenAR = useCallback((item: MenuItem) => {
    const plan = adminSettings?.subscriptionPlan || 'basic';
    const limit = plan === 'basic' ? 10 : plan === 'pro' ? 25 : 999;
    const itemIndex = menuItems.findIndex(i => i.id === item.id);
    if (itemIndex >= limit) {
      alert(
        lang === 'bn' 
          ? `আপনার বর্তমান ${plan === 'basic' ? 'Starter ($15)' : plan === 'pro' ? 'Professional ($49)' : 'Enterprise ($99)'} প্ল্যানে প্রথম ${limit}টি খাবারের জন্য WebAR 3D কার্ড নির্ধারিত রয়েছে। পরবর্তী খাবারগুলোর ৩ডি ফিচার আনলক করতে প্ল্যান আপগ্রেড করুন।` 
          : `Your current ${plan === 'basic' ? 'Starter ($15)' : plan === 'pro' ? 'Professional ($49)' : 'Enterprise ($99)'} plan includes WebAR 3D Cards for the first ${limit} items. Upgrade your subscription to unlock AR for more items!`
      );
      return;
    }
    setActiveARItem(item);
  }, [adminSettings?.subscriptionPlan, menuItems, lang]);

  const handleSelectFood = useCallback((item: MenuItem) => {
    setSelectedFood(item);
  }, []);

  const handleUpdateQuantity = (itemId: string, amount: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.menuItem.id === itemId) {
          const newQty = i.quantity + amount;
          return newQty > 0 ? { ...i, quantity: newQty } : i;
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const handleUpdateItemNotes = (itemId: string, notes: string) => {
    setCart(prev => prev.map(i => i.menuItem.id === itemId ? { ...i, notes } : i));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.menuItem.id !== itemId));
  };

  const handleConfirmOrder = async () => {
    if (cart.length === 0 || isPlacingOrder) return;
    
    if (!tableNumber) {
      setShowTableModal(true);
      return;
    }

    // Tier check: Basic plan limits
    if (adminSettings?.subscriptionPlan === 'basic') {
      const activeOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
      if (activeOrdersCount >= 5) {
        alert(lang === 'bn' ? 'বেসিক প্ল্যানে এক সাথে ৫টির বেশি অর্ডার নেওয়া সম্ভব নয়।' : 'Basic plan is limited to 5 active orders at a time.');
        return;
      }
    }

    setIsPlacingOrder(true);

    try {
      const activeUser = user;
      const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
      const tax = subtotal * 0.05; // 5% premium VAT
      const grandTotal = subtotal + tax;

      // 1. Generate path: restaurants/{restaurantId}/orders
      if (!activeRestaurantId) throw new Error("Restaurant ID is missing");
      
      const ordersRef = collection(db, "restaurants", activeRestaurantId, "orders");
      const newDocRef = doc(ordersRef); 
      const orderId = newDocRef.id;

      const newOrderData = {
        restaurantId: activeRestaurantId,
        tableNumber: tableNumber,
        items: [...cart],
        total: grandTotal,
        status: 'Pending',
        paymentMethod: 'Cash at Counter',
        paymentStatus: 'Pending',
        timestamp: Date.now(),
        customerName: activeUser?.displayName || 'Guest Customer',
        customerEmail: activeUser?.email || 'guest@example.com',
      };

      const createdOrder = { id: orderId, ...newOrderData } as Order;
      
      // 2. OPTIMISTIC UI: Instantly clear cart and show tracking
      // Manually add to orders state for zero-latency feedback
      setOrders(prev => [createdOrder, ...prev]);
      
      setCart([]);
      setIsCartOpen(false);
      setShowTracking(true);
      playOrderChime();
      
      // We set placing order to false immediately as the transition is done
      setIsPlacingOrder(false);

      // 3. BACKGROUND PERSISTENCE: Save to Restaurant Orders AND Global Orders
      const globalOrderRef = doc(db, "all_orders", orderId);
      
      Promise.all([
        setDoc(newDocRef, newOrderData),
        setDoc(globalOrderRef, newOrderData)
      ]).catch(error => {
        console.error("Delayed Error adding order: ", error);
      });
      
      // 4. BACKGROUND EMAIL
      if (activeUser?.email) {
        sendStatusEmail(createdOrder).catch(err => console.error("Email failed", err));
      }
      
    } catch (error) {
      console.error("Error initiating order: ", error);
      alert("অর্ডার দিতে সমস্যা হয়েছে। (Error initiating order)");
      setIsPlacingOrder(false);
    }
  };

  // Sync viewMode with managerSession
  useEffect(() => {
    if (viewMode === 'admin' && !managerSession) {
      setViewMode('client');
    }
  }, [viewMode, managerSession]);

  // ---------------------------------------------------------------------------
  // 5. MANAGER / PIPELINE ACTIONS (ENTERPRISE CONSOLE)
  // ---------------------------------------------------------------------------

  const handleAcceptOrder = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || !activeRestaurantId) return;

    try {
      const newStatus = 'Confirmed';
      const updateData = { status: newStatus };
      await updateDoc(doc(db, "restaurants", activeRestaurantId, "orders", orderId), updateData);
      await updateDoc(doc(db, "all_orders", orderId), updateData);
      
      playOrderChime();
      await sendStatusEmail({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleNextStatus = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || !activeRestaurantId) return;

    let nextStatus: Order['status'] = order.status;
    if (order.status === 'Confirmed') nextStatus = 'Kitchen';
    else if (order.status === 'Kitchen') nextStatus = 'Serving';
    else if (order.status === 'Serving') nextStatus = 'Completed';
    
    if (nextStatus === order.status) return;

    try {
      const updateData = { status: nextStatus };
      await updateDoc(doc(db, "restaurants", activeRestaurantId, "orders", orderId), updateData);
      await updateDoc(doc(db, "all_orders", orderId), updateData);
      
      playOrderChime();
      await sendStatusEmail({ ...order, status: nextStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleServeOrder = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || !activeRestaurantId) return;

    try {
      const newStatus = 'Completed';
      const updateData = { status: newStatus };
      await updateDoc(doc(db, "restaurants", activeRestaurantId, "orders", orderId), updateData);
      await updateDoc(doc(db, "all_orders", orderId), updateData);
      
      playOrderChime();
      await sendStatusEmail({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCancelOrder = async (orderId: string, reason: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || !activeRestaurantId) return;

    try {
      const newStatus = 'Cancelled';
      const updateData = { 
        status: newStatus, 
        cancelReason: reason 
      };
      await updateDoc(doc(db, "restaurants", activeRestaurantId, "orders", orderId), updateData);
      await updateDoc(doc(db, "all_orders", orderId), updateData);
      
      playOrderChime();
      await sendStatusEmail({ ...order, status: newStatus, cancelReason: reason });
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to permanently delete this order record?") && activeRestaurantId) {
      try {
        await deleteDoc(doc(db, "restaurants", activeRestaurantId, "orders", orderId));
        await deleteDoc(doc(db, "all_orders", orderId));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear completed & cancelled orders logs?") && activeRestaurantId) {
      const toDelete = orders.filter(o => o.status === 'Completed' || o.status === 'Cancelled');
      toDelete.forEach(async (o) => {
        await deleteDoc(doc(db, "restaurants", activeRestaurantId, "orders", o.id));
        await deleteDoc(doc(db, "all_orders", o.id));
      });
    }
  };

  // Manager Payment Security Action Handler
  const handleUpdatePaymentStatus = async (
    orderId: string,
    status: 'Pending' | 'Paid' | 'Refunded',
    verifiedBy?: string,
    txnId?: string
  ) => {
    if (!activeRestaurantId) return;

    const updateData = {
      paymentStatus: status,
      paymentVerifiedBy: verifiedBy || managerSession?.name || 'Authorized Manager',
      paymentTxnId: txnId || `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    };

    try {
      await updateDoc(doc(db, "restaurants", activeRestaurantId, "orders", orderId), updateData);
      await updateDoc(doc(db, "all_orders", orderId), updateData);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  // ---------------------------------------------------------------------------
  // 6. MENU GRID FILTER LOGIC & SCROLL TRACKING
  // ---------------------------------------------------------------------------
  
  // Tracking scroll direction for the category nav with requestAnimationFrame throttle
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = Math.abs(currentScrollY - lastScrollY.current);
          if (diff >= 20) {
            const nextVisible = currentScrollY <= 80 || currentScrollY < lastScrollY.current;
            setIsNavVisible(prev => (prev !== nextVisible ? nextVisible : prev));
            lastScrollY.current = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [visibleItemCount, setVisibleItemCount] = useState(24);

  // Reset pagination when filter criteria changes
  useEffect(() => {
    setVisibleItemCount(24);
  }, [activeCategory, searchTerm, onlyChefSpecial, onlyVegetarian, onlyPopular, onlyNew]);

  const filteredMenuItems = useMemo(() => {
    return tierFilteredItems.filter(item => {
      // robust category matching - treat "All" as showing everything
      const itemCatId = (item.categoryId || item.category || '').toLowerCase().trim().replace(/s$/, '').replace(/-/g, ' ');
      const activeCatId = activeCategory.toLowerCase().trim().replace(/s$/, '').replace(/-/g, ' ');
      
      const isKeywordCategory = activeCategory.startsWith('kw_');
      const keywordText = isKeywordCategory ? activeCategory.substring(3).toLowerCase() : '';

      // "All" shows all active and published items
      // Robust mapping for categories to handle variations (singular/plural, whitespace, hyphens)
      const matchesCategory = activeCategory === 'All' || 
                              isKeywordCategory ||
                              itemCatId === activeCatId ||
                              (activeCatId === 'drink' && itemCatId === 'drink') ||
                              (activeCatId === 'pizza' && itemCatId === 'pizza') ||
                              (activeCatId === 'burger' && itemCatId === 'burger') ||
                              (activeCatId === 'dry food' && (itemCatId === 'dry food' || itemCatId === 'dryfood' || itemCatId === 'dry-food'));

      const matchesSearch = !searchTerm.trim() || 
                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.category || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesKeyword = !isKeywordCategory ||
                             item.name.toLowerCase().includes(keywordText) ||
                             item.description.toLowerCase().includes(keywordText) ||
                             (item.category || '').toLowerCase().includes(keywordText);

      const matchesChef = !onlyChefSpecial || item.isChefSpecial;
      const matchesVeg = !onlyVegetarian || item.isVegetarian;
      const matchesPopular = !onlyPopular || item.isPopular;
      const matchesNew = !onlyNew || item.isNew;

      // When searching, we match globally; otherwise we match the chosen category
      const categoryCheck = searchTerm.trim() ? true : (matchesCategory && matchesKeyword);
      
      return categoryCheck && matchesSearch && matchesChef && matchesVeg && matchesPopular && matchesNew;
    });
  }, [tierFilteredItems, activeCategory, searchTerm, onlyChefSpecial, onlyVegetarian, onlyPopular, onlyNew]);

  // Helper Stats calculations for the Enterprise Row (Memoized for zero render lag)
  const { activeOrders, inProgressCount, completedCount, activeTablesCount, totalRevenue } = useMemo(() => {
    if (viewMode !== 'admin') {
      return { activeOrders: [], inProgressCount: 0, completedCount: 0, activeTablesCount: 0, totalRevenue: 0 };
    }
    const active = orders.filter(o => o.status === 'Pending' || ['Confirmed', 'Kitchen', 'Serving'].includes(o.status));
    const inProg = orders.filter(o => ['Confirmed', 'Kitchen', 'Serving'].includes(o.status)).length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const tables = Array.from(new Set(active.map(o => o.tableNumber))).length;
    const revenue = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + o.total, 0);

    return {
      activeOrders: active,
      inProgressCount: inProg,
      completedCount: completed,
      activeTablesCount: tables,
      totalRevenue: revenue
    };
  }, [orders, viewMode]);

  const allAvailableCategories = useMemo(() => [...categories], [categories]);

  const displayCategories = useMemo(() => [
    { id: 'All', name: 'All Foods', translationKey: 'cat_all', isKeyword: false },
    ...allAvailableCategories
      .filter(c => c.isVisible)
      .map(c => ({
        id: c.name,
        name: c.name,
        translationKey: `cat_${c.name.toLowerCase().replace(' ', '_')}`,
        isKeyword: false
      }))
  ], [allAvailableCategories]);

  const displayTopKeywords = useMemo(() => [
    { id: 'All', name: 'All Foods', translationKey: 'cat_all' },
    ...(dynamicKeywords || []).map(kw => ({
      id: kw.id,
      name: kw.text,
      translationKey: `kw_${kw.text.toLowerCase().replace(' ', '_')}`
    }))
  ], [dynamicKeywords]);

  // Helper to get items grouped by category for the "All" view (Memoized)
  const groupedItems: Record<string, MenuItem[]> | null = useMemo(() => {
    if (activeCategory !== 'All' || searchTerm.trim()) return null;
    
    const groups: Record<string, MenuItem[]> = {};
    const catsToShow = displayCategories.filter(c => c.id !== 'All' && !c.isKeyword);
    
    catsToShow.forEach(cat => {
      const items = tierFilteredItems
        .filter(item => {
          const itemCat = (item.categoryId || item.category || '').toLowerCase().trim().replace(/s$/, '').replace(/-/g, ' ');
          const targetCat = cat.name.toLowerCase().trim().replace(/s$/, '').replace(/-/g, ' ');
          
          return itemCat === targetCat || 
                 (targetCat === 'burger' && itemCat === 'burger') ||
                 (targetCat === 'drink' && itemCat === 'drink');
        })
        .slice(0, 8);
      if (items.length > 0) {
        groups[cat.name] = items;
      }
    });
    
    return groups;
  }, [activeCategory, searchTerm, displayCategories, tierFilteredItems]);

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-800 transition-colors duration-700 ${viewMode === 'admin' ? (adminSettings?.theme === 'dark' ? 'bg-[#0f0f0f] text-slate-100' : 'bg-[#faf6f0] text-slate-900') : themeConfig.textColor} ${lang === 'ar' ? 'font-arabic' : ''}`}
      style={{ 
        backgroundColor: viewMode === 'admin' ? (adminSettings?.theme === 'dark' ? '#0f0f0f' : '#faf6f0') : ((adminSettings as any)?.activeThemeId === 'lunavere' ? '#15162B' : (themeConfig.bgColor || '#ffffff')),
        backgroundImage: 'none'
      }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Automatic System Update Overlay */}
      {isAutoUpdating && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 select-none animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 flex items-center justify-center animate-spin" style={{ animationDuration: '1.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
          
          <div className="max-w-md space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
              {lang === 'bn' ? 'লাইভ সিস্টেম আপডেট' : lang === 'ar' ? 'تحديث النظام المباشر' : 'Live System Update'}
            </span>
            <h2 className="text-2xl font-black text-white leading-tight">
              {lang === 'bn' ? 'ওয়েবসাইট স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে' : lang === 'ar' ? 'يتم تحديث الموقع تلقائياً' : 'Website Updating Automatically'}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              {lang === 'bn' ? 'সিস্টেমটি নতুন ফিচার ও সুরক্ষার সাথে সফলভাবে সিঙ্ক হচ্ছে। ২ সেকেন্ডের মধ্যে রিলোড হবে।' : 
               lang === 'ar' ? 'يتزامن النظام بنجاح مع الميزات الجديدة والأمان. سيتم إعادة التحميل خلال ثوانٍ.' : 
               'The system is successfully syncing with the latest features and security updates. Reloading in a few seconds.'}
            </p>
            
            <div className="pt-4">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-white font-mono text-sm font-bold">
                  {lang === 'bn' ? `রিলোড হচ্ছে: ${autoUpdateCountdown} সেকেন্ড` : 
                   lang === 'ar' ? `إعادة التحميل: ${autoUpdateCountdown} ثانية` : 
                   `Reloading in: ${autoUpdateCountdown}s`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Notification Banner */}
      {showUpdateToast && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-fade-in no-print">
          <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <RefreshCw className="w-5 h-5 text-white animate-spin-slow" />
              </div>
              <div className="text-left">
                <h5 className="text-white text-sm font-bold leading-tight">System Update Available</h5>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-0.5">New features & performance optimizations are ready</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowUpdateToast(false)}
                className="px-4 py-2 rounded-lg text-slate-400 text-xs font-bold hover:text-white transition-colors"
              >
                Later
              </button>
              <button 
                onClick={handleApplyUpdate}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          TOP POPUP: SELECTED PLAN NOTIFICATION MODAL ($15, $49, or $99)
          ======================================================================= */}
      <AnimatePresence>
        {showTopPlanPopup && activePlanPrice && (
          <div className="fixed inset-0 z-[120] flex items-start justify-center pt-5 sm:pt-8 px-4 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTopPlanPopup(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs pointer-events-auto"
            />

            {/* Popup Card */}
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-[2.5rem] border-2 shadow-2xl bg-white text-slate-900 pointer-events-auto z-10 ${
                activePlanPrice === 99
                  ? 'border-amber-400 shadow-amber-500/25'
                  : activePlanPrice === 49
                  ? 'border-orange-500 shadow-orange-500/25'
                  : 'border-blue-600 shadow-blue-500/25'
              }`}
            >
              {/* Top Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'বর্তমান সক্রিয় প্ল্যান' : 'CURRENT ACTIVE PLAN'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTopPlanPopup(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  title={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Huge Dollar Price Display */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
                  ${activePlanPrice}
                </span>
                <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-slate-400">
                  / {lang === 'bn' ? 'প্রতি মাস' : 'MONTH'}
                </span>
              </div>

              {/* Plan Title */}
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 uppercase tracking-tight mb-2">
                {activePlanPrice === 99
                  ? (lang === 'bn' ? 'এলিট লাক্সারি প্ল্যান ($৯৯/মাস)' : 'Elite Luxury Plan ($99/mo)')
                  : activePlanPrice === 49
                  ? (lang === 'bn' ? 'প্রফেশনাল প্ল্যান ($৪৯/মাস)' : 'Professional Plan ($49/mo)')
                  : (lang === 'bn' ? 'স্টার্টার প্ল্যান ($১৫/মাস)' : 'Starter Plan ($15/mo)')}
              </h3>

              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-5 leading-relaxed">
                {activePlanPrice === 99
                  ? (lang === 'bn'
                      ? '৫০টি প্রিমিয়াম থিম, ১০০০+ মেনু কার্ড স্টুডিও ডিজাইন ও বিশ্বমানের রেস্টুরেন্টের জন্য বিশেষ আয়োজন।'
                      : '50 Premium Themes & 1000+ Menu Card Studio Designs for world-class brands.')
                  : activePlanPrice === 49
                  ? (lang === 'bn'
                      ? '২৫টি প্রিমিয়াম থিম ও ৩০০+ মেনু কার্ড ডিজাইন সহ ক্রমবর্ধমান রেস্তোরাঁ ও ক্যাফের জন্য আদর্শ।'
                      : '25 Premium Themes & 300+ Menu Card Designs for growing dining establishments.')
                  : (lang === 'bn'
                      ? '১০টি প্রিমিয়াম থিম ও ১০০+ মেনু কার্ড ডিজাইন সহ একক ক্যাফে ও ছোট রেস্টুরেন্টের জন্য অন্তর্ভুক্ত।'
                      : '10 Premium Themes & 100+ Menu Card Designs included for single cafes and small restaurants.')}
              </p>

              {/* Features List (Exact 2-column layout matching plan card) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {(activePlanPrice === 99
                  ? [
                      lang === 'bn' ? '৫০টি প্রিমিয়াম থিম ও ডিজাইন' : '50 Premium Themes & Designs',
                      lang === 'bn' ? '১০০০+ মেনু কার্ড স্টুডিও' : '1000+ Menu Card Studio Access',
                      lang === 'bn' ? 'সব ৫০+ ৩ডি WebAR ফুড কার্ড' : '50+ 3D WebAR Food Cards',
                      lang === 'bn' ? 'কিউআর কোড মেনু ম্যানেজমেন্ট' : 'QR Code Menu Management',
                      lang === 'bn' ? 'ফাইন্যান্সিয়াল ও কিচেন কন্ট্রোল' : 'Financial & Kitchen Control',
                      lang === 'bn' ? '২৪/৭ ডেডিকেটেড ভিআইপি সাপোর্ট' : '24/7 Priority VIP Concierge'
                    ]
                  : activePlanPrice === 49
                  ? [
                      lang === 'bn' ? '২৫টি প্রিমিয়াম থিম ও ডিজাইন' : '25 Premium Themes & Designs',
                      lang === 'bn' ? '৩০০+ মেনু কার্ড ডিজাইন' : '300+ Menu Card Designs',
                      lang === 'bn' ? '২৫টি ৩ডি WebAR ফুড কার্ড' : '25 3D WebAR Food Cards',
                      lang === 'bn' ? 'হোয়াটসঅ্যাপ ও সরাসরি কিউআর অর্ডার' : 'WhatsApp & QR Fast Ordering',
                      lang === 'bn' ? 'অ্যানালিটিক্স ও সেলস রিপোর্টস' : 'Analytics & Sales Engine',
                      lang === 'bn' ? 'অগ্রাধিকার গ্রাহক সহায়তা' : 'Priority Customer Support'
                    ]
                  : [
                      lang === 'bn' ? '১০টি প্রিমিয়াম থিম ও ডিজাইন' : '10 Premium Themes & Designs',
                      lang === 'bn' ? '১০০+ মেনু কার্ড ডিজাইন' : '100+ Menu Card Designs',
                      lang === 'bn' ? 'অ্যাক্টিভ ড্যাশবোর্ড' : 'Active Dashboard',
                      lang === 'bn' ? 'অর্ডার হিস্ট্রি (৭ দিন)' : 'Order History (7 Days)',
                      lang === 'bn' ? 'মেনু ক্যাটাগরি ম্যানেজমেন্ট' : 'Menu Categories',
                      lang === 'bn' ? 'ইমেইল সাপোর্ট' : 'Email Support'
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* ===============================================================
                  FUTURE EXTENSION SLOT:
                  You can easily add new options, custom add-ons, or input fields
                  inside this container later!
                  =============================================================== */}
              <div id="plan-popup-custom-extensions" className="empty:hidden mb-4" />

              {/* Confirm / Continue Button */}
              <button
                type="button"
                onClick={() => setShowTopPlanPopup(false)}
                className={`w-full py-4 px-5 rounded-2xl font-black text-xs uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 ${
                  activePlanPrice === 99
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-amber-500/20'
                    : activePlanPrice === 49
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/20'
                }`}
              >
                <span>{lang === 'bn' ? '✓ ঠিক আছে (মেনু দেখুন)' : '✓ GOT IT (CONTINUE TO MENU)'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          TOP BAR: BRANDING & QUICK ACCESS
          ======================================================================= */}
      <header 
        className={`sticky top-0 z-50 w-full backdrop-blur-md border-b no-print transition-colors duration-700 ${viewMode === 'admin' ? (adminSettings?.theme === 'dark' ? 'bg-[#0f0f0f] border-slate-800 text-white shadow-md' : 'bg-[#faf6f0] border-slate-200/80 text-slate-900 shadow-sm') : 'bg-white border-slate-200 text-slate-900 shadow-xs'}`} 
        style={{ backgroundColor: viewMode === 'client' ? '#ffffff' : (adminSettings?.theme === 'dark' ? '#0f0f0f' : '#faf6f0') }}
      >
        <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-3 flex items-center justify-between relative">
          
          {/* TOP LEFT: Back / Track Orders Buttons & Restaurant Branding (Client Mode) */}
          <div className="flex items-center gap-3.5 z-10">
            {viewMode === 'admin' && (
              <div className="flex items-center gap-2.5 flex-wrap">
                <motion.button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('admin-back-button'));
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 rounded-xl transition-all cursor-pointer border border-cyan-500/20 shrink-0 font-bold text-xs shadow-sm"
                  title={lang === 'bn' ? 'পিছনে যান / ব্যাক' : 'Go Back'}
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{lang === 'bn' ? 'ব্যাক' : lang === 'ar' ? 'رجوع' : 'Back'}</span>
                </motion.button>
              </div>
            )}

            {/* Restaurant Branding (Logo + Name + Location) & Quick Action Pills in Client Mode */}
            {viewMode === 'client' && (
              <div className="flex items-center gap-2 sm:gap-3.5 select-none">
                {/* Brand Logo & Name */}
                <div 
                  className="flex items-center gap-3 cursor-pointer group shrink-0" 
                  onClick={() => setLogoClickCount(prev => prev + 1)}
                >
                  {renderMonogramLogo(adminSettings?.brandName || 'sahinsh')}
                  <div className="flex flex-col items-start leading-none">
                    <div className="flex items-center gap-2">
                      <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none group-hover:text-cyan-600 transition-colors">
                        {adminSettings?.brandName || "sahinsh"}
                      </h1>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-500 tracking-wider uppercase leading-none mt-1">
                      {adminSettings?.brandLocation || "PAKISTAN"}
                    </span>
                  </div>
                </div>

                {/* List / Order Tracking Icon Button (≡) */}
                <button
                  onClick={() => setShowTracking(!showTracking)}
                  className={`flex items-center justify-center w-9 h-9 rounded-full border text-slate-700 shadow-sm transition-all cursor-pointer active:scale-95 select-none ${
                    showTracking 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white hover:bg-slate-100 border-slate-200'
                  }`}
                  title={lang === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Orders'}
                >
                  <List className="w-4 h-4" />
                </button>

                {/* Admin Pill Button (🛡️ Admin) */}
                {adminSettings?.showAdminButton !== false && (
                  <button
                    id="header-admin-pill-btn"
                    onClick={enterAdminPanel}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c192c] hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 select-none"
                    title="Admin"
                  >
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Admin</span>
                  </button>
                )}

                {/* WebAR OS Portal Pill Button */}
                {activeWorkSection === 'edit' && (
                  <button
                    onClick={() => setShowWebARPortal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 select-none"
                    title="WebAR OS Portal"
                  >
                    <Globe className="w-4 h-4 text-white" />
                    <span>WebAR OS Portal</span>
                  </button>
                )}

                {/* Theme Workshop Pill Button */}
                {activeWorkSection === 'edit' && (
                  <button
                    onClick={() => {
                      setViewMode('admin');
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('admin-switch-tab', { detail: 'theme_store' }));
                      }, 50);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 select-none"
                    title="Theme Workshop"
                  >
                    <Palette className="w-4 h-4 text-white" />
                    <span>Theme Workshop</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* TOP CENTER: Dynamic Section Title in Admin mode */}
          <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center gap-2 select-none z-10">
            {viewMode === 'admin' && (
              <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-inherit">
                {adminHeaderTitle}
              </h1>
            )}
          </div>

          {/* TOP RIGHT: Restaurant Branding in Admin Mode / User Avatar in Client Mode */}
          <div className="flex items-center gap-3.5 z-10 min-w-[40px] justify-end">
            {/* Restaurant Branding (Admin Mode Only) */}
            {viewMode === 'admin' && (
              <div className="flex items-center gap-3 select-none group cursor-pointer" onClick={() => setLogoClickCount(prev => prev + 1)}>
                {renderMonogramLogo(adminSettings?.brandName || '')}
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-display font-black tracking-tight text-inherit group-hover:text-cyan-600 transition-colors leading-none">
                      {adminSettings?.brandName || "sahinsh"}
                    </h1>
                    {adminSettings?.subscriptionPlan && (
                      <div className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        adminSettings?.subscriptionPlan === 'elite' 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 shadow-amber-500/20' 
                          : adminSettings?.subscriptionPlan === 'pro'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/20'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {adminSettings?.subscriptionPlan === 'elite' ? 'Elite ($99)' : adminSettings?.subscriptionPlan === 'pro' ? 'Pro ($49)' : 'Starter ($15)'}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-[9px] font-mono font-bold text-cyan-600 tracking-widest uppercase leading-none mt-1">
                      {adminSettings?.brandLocation || "PAKISTAN"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Client User Avatar (Client Mode Only) */}
            {viewMode === 'client' && (
              <div className="flex items-center gap-2 pl-1">
                {customAvatarUrl || user ? (
                  <img 
                    src={customAvatarUrl || user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                    alt="User" 
                    onClick={enterAdminPanel}
                    title="Admin Panel"
                    className="w-10 h-10 rounded-full border border-slate-200 shadow-sm object-cover select-none cursor-pointer hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div 
                    onClick={enterAdminPanel}
                    title="Admin Panel"
                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center shadow-sm select-none cursor-pointer hover:scale-105 transition-transform"
                  >
                    <UserIcon className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =======================================================================
          SMART DESKTOP CATEGORY NAV (Hides on Scroll Down)
          ======================================================================= */}
      {viewMode === 'client' && (
        <nav
          ref={megaMenuRef}
          className={`sticky top-[56px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print transition-all duration-300 transform-gpu ${
            isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between gap-4 py-2.5 overflow-x-auto no-scrollbar">
            
            {/* Left: All Foods ▾ Button */}
            <div className="relative shrink-0">
              <button
                ref={megaMenuBtnRef}
                type="button"
                onClick={() => {
                  setIsMegaMenuOpen(prev => !prev);
                  setActiveCategory('All');
                  setSearchTerm('');
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0c192c] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap select-none active:scale-95"
              >
                <span>All Foods</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
            </div>

            {/* Right: Search, Waiter, Divider, Popular, New Arrival, Special, Vegetarian, Cart */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
              {/* Search Bar - Circular by default, expanding dynamically on click */}
              <div ref={searchContainerRef} className="relative flex items-center">
                <AnimatePresence>
                  {isSearchExpanded ? (
                    <motion.div
                      initial={{ width: 36, opacity: 0.5 }}
                      animate={{ width: 170, opacity: 1 }}
                      exit={{ width: 36, opacity: 0 }}
                      className="relative flex items-center"
                    >
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSearchTerm(val);
                          const lower = val.toLowerCase().trim();
                          const configuredPass = ((adminSettings as any)?.adminPassword || '').toLowerCase().trim();
                          const savedCode = adminSecretCode.toLowerCase().trim();
                          const isPassMatch = 
                            lower === '8520' ||
                            lower === 'admin8520' ||
                            lower === '8520admin' ||
                            (savedCode && lower === savedCode) ||
                            (configuredPass && lower === configuredPass);

                          if (isPassMatch) {
                            enterAdminPanel();
                            setSearchTerm('');
                            setIsSearchExpanded(false);
                          }
                        }}
                        placeholder={lang === 'bn' ? "খাবার বা পাসওয়ার্ড..." : "Search foods or password..."}
                        autoFocus
                        className="w-[170px] pl-8 pr-7 py-1.5 rounded-full bg-slate-100 border border-cyan-500/50 text-xs text-slate-900 focus:ring-1 focus:ring-cyan-500 outline-none focus:bg-white shadow-sm"
                      />
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-cyan-500" />
                      <button 
                        onClick={() => {
                          setIsSearchExpanded(false);
                          setSearchTerm('');
                        }}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setIsSearchExpanded(true)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer shadow-xs active:scale-95 select-none"
                      title="Search"
                    >
                      <Search className="w-4 h-4 text-slate-500" />
                    </button>
                  )}
                </AnimatePresence>
              </div>

              {/* Waiter Button */}
              <button
                onClick={handleRequestWaiter}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fff5ee] hover:bg-[#ffeadd] border border-[#ffddc7] text-[#e05600] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs whitespace-nowrap active:scale-95 select-none"
              >
                <Bell className="w-4 h-4 text-[#e05600]" />
                <span>Waiter</span>
              </button>

              {/* Divider */}
              <div className="h-5 w-px bg-slate-200 mx-0.5 shrink-0 hidden sm:block" />

              {/* Popular Pill */}
              <button
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer whitespace-nowrap select-none active:scale-95 ${
                  onlyPopular
                    ? 'bg-rose-500 text-white border-rose-400 shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyPopular ? 'text-white fill-current' : 'text-slate-400'}`} />
                <span>Popular</span>
              </button>

              {/* New Arrival Pill */}
              <button
                onClick={() => setOnlyNew(!onlyNew)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer whitespace-nowrap select-none active:scale-95 ${
                  onlyNew
                    ? 'bg-blue-500 text-white border-blue-400 shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>New Arrival</span>
              </button>

              {/* Special Pill */}
              <button
                onClick={() => setOnlyChefSpecial(!onlyChefSpecial)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer whitespace-nowrap select-none active:scale-95 ${
                  onlyChefSpecial
                    ? 'bg-amber-500 text-white border-amber-400 shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <ChefHat className={`w-3.5 h-3.5 ${onlyChefSpecial ? 'text-white' : 'text-slate-500'}`} />
                <span>Special</span>
              </button>

              {/* Vegetarian Pill */}
              <button
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer whitespace-nowrap select-none active:scale-95 ${
                  onlyVegetarian
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${onlyVegetarian ? 'bg-white' : 'bg-emerald-500'}`} />
                <span>Vegetarian</span>
              </button>

              {/* Cart Pill */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all cursor-pointer whitespace-nowrap active:scale-95 select-none"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="w-4 h-4 bg-red-500 text-white text-[9px] font-mono font-bold flex items-center justify-center rounded-full border border-white">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* MEGA DROPDOWN POPUP PANEL (Attitude Fashion Style) */}
          <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 py-8 px-4 sm:px-8 md:px-12 lg:px-16"
                  >
                    <div className="max-w-7xl mx-auto space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-h-[50vh] overflow-y-auto no-scrollbar pt-2">
                        {allAvailableCategories.filter(c => c.isVisible).map((cat, idx) => {
                          const catItems = tierFilteredItems.filter(item => {
                            const itemCat = (item.categoryId || item.category || '').toLowerCase().trim().replace(/s$/, '').replace(/-/g, ' ');
                            const targetCat = cat.name.toLowerCase().trim().replace(/s$/, '').replace(/-/g, ' ');
                            return itemCat === targetCat;
                          });

                          const emojiMap: Record<string, string> = {
                            'pizza': '🍕',
                            'burger': '🍔',
                            'burgers': '🍔',
                            'drinks': '🍹',
                            'drink': '🍹',
                            'dry food': '🍛',
                            'all fruits': '🍎',
                            'desserts': '🍨'
                          };
                          const catLower = cat.name.toLowerCase().trim();
                          const emoji = emojiMap[catLower] || '🍲';

                          return (
                            <div key={cat.id || idx} className="space-y-3">
                              <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                                <span>{emoji}</span>
                                <span>{cat.name}</span>
                              </h4>
                              <div className="flex flex-col gap-2">
                                {catItems.slice(0, 5).map(item => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setSearchTerm(item.name);
                                      setIsMegaMenuOpen(false);
                                    }}
                                    className="text-left text-xs text-slate-600 hover:text-cyan-500 transition-colors font-medium hover:translate-x-1 duration-150 cursor-pointer"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                                {catItems.length === 0 && (
                                  <span className="text-[10px] text-slate-400 italic">No items yet</span>
                                )}
                                <button
                                  onClick={() => {
                                    setActiveCategory(cat.name);
                                    setIsMegaMenuOpen(false);
                                    setSearchTerm('');
                                  }}
                                  className="text-left text-[10px] font-bold text-cyan-600 uppercase hover:text-cyan-500 mt-1 cursor-pointer"
                                >
                                  {lang === 'bn' ? `সব ${cat.name} দেখুন →` : `View All ${cat.name} →`}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
        </nav>
      )}

      {/* =======================================================================
          SMART MOBILE BOTTOM NAVIGATION (Dishes & Cart Only)
          ======================================================================= */}
      {viewMode === 'client' && (
        <nav
          className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] no-print pb-safe transition-all duration-300 transform-gpu ${
            isNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col">
            {/* Main Navigation Controls */}
            <div className="flex items-center justify-around py-4 px-4">
              {/* Dishes (Shop) */}
              <button
                onClick={() => {
                  if (activeTab !== 'menu') {
                    setActiveTab('menu');
                    const menuSection = document.getElementById('main-menu-grid');
                    if (menuSection) {
                      const yOffset = -220;
                      const y = menuSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'menu' ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold">{lang === 'en' ? 'Dishes' : lang === 'ar' ? 'أطباق' : 'খাবার'}</span>
              </button>

              {/* Cart Action */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-slate-900">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <span className="text-xs">{lang === 'en' ? 'Cart' : lang === 'ar' ? 'سلة' : 'কার্ট'}</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* =======================================================================
          MAIN WORKSPACE ROOT
          ======================================================================= */}
      <main className={`flex-1 max-w-full mx-auto w-full ${viewMode === 'client' && ((adminSettings as any)?.activeThemeId === 'lunavere' || (adminSettings as any)?.activeThemeId === 'velmora-dining' || (adminSettings as any)?.activeThemeId === 'velmora') ? 'p-0' : 'px-4 sm:px-8 md:px-12 lg:px-16 py-6 pb-24'}`}>
        
        {/* =====================================================================
            VIEW 1: CUSTOMER PORTAL & MULTI-CATEGORY MENU
            ===================================================================== */}
        {viewMode === 'client' && (
          (adminSettings as any)?.activeThemeId === 'velmora-dining' || (adminSettings as any)?.activeThemeId === 'velmora' ? (
            <VelmoraDiningTheme 
              brandName={adminSettings?.brandName || 'VELMORA DINING'}
              tagline={adminSettings?.tagline || 'Palatial Gastronomy & Fine Dining'}
              dishes={menuItems || []}
              onOrderDish={(dish) => {
                handleAddToCart(dish as any);
              }}
              onOpenAdmin={enterAdminPanel}
              settings={adminSettings || {}}
              lang={lang}
            />
          ) : (adminSettings as any)?.activeThemeId === 'lunavere' ? (
            <LunavereTheme 
              brandName={adminSettings?.brandName || 'LUNAVERE'}
              tagline={adminSettings?.tagline || 'Parisian Starlight Cafe'}
              dishes={menuItems || []}
              onOrderDish={(dish) => {
                handleAddToCart(dish as any);
              }}
              onOpenAdmin={enterAdminPanel}
              settings={adminSettings || {}}
              lang={lang}
            />
          ) : (
          <div className="space-y-8 animate-fade-in no-print">
            
            {showTracking ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <button 
                    onClick={() => setShowTracking(false)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>
                  <h2 className="text-xs font-display font-black text-slate-900 uppercase tracking-tight">
                    {lang === 'en' ? 'Orders' : lang === 'ar' ? 'طلباتك' : 'অর্ডারসমূহ'}
                  </h2>
                </div>
                <Suspense fallback={<LazyFallback />}>
                  <CustomerOrderTracking orders={orders} tableNumber={tableNumber} lang={lang} />
                </Suspense>
              </div>
            ) : (
              <>
                {/* Hero Interactive 3-Image Auto Slider (Changes every 3 seconds) */}
                <HeroSlider 
                  lang={lang} 
                  brandLocation={adminSettings?.brandLocation}
                  brandName={adminSettings?.brandName}
                  heroImages={adminSettings?.heroImages}
                  heroSlides={adminSettings?.heroSlides}
                />

                <div className="space-y-4">
                  <div id="main-menu-grid" className="scroll-mt-40">
                    {activeCategory === 'All' && groupedItems && !searchTerm.trim() ? (
                      <div className="space-y-12">
                        {Object.entries(groupedItems).map(([categoryName, items]) => (
                          <div key={categoryName} className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                                  <ShoppingBag className="w-5 h-5" />
                                </div>
                                <div>
                                  <h2 className="text-2xl font-display font-black text-slate-900">
                                    {(translations[lang] as any)[`cat_${categoryName.toLowerCase().replace(' ', '_')}`] || categoryName}
                                  </h2>
                                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">
                                    {items.length} {lang === 'en' ? 'Items Available' : 'খাবার আছে'}
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => {
                                  setActiveCategory(categoryName);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                              >
                                {lang === 'en' ? 'View All' : 'সব দেখুন'}
                              </button>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                              {items.map((item) => (
                                <MenuItemCard
                                  key={item.id}
                                  item={item}
                                  lang={lang}
                                  onAddToCart={handleAddToCart}
                                  onOpenAR={handleOpenAR}
                                  onSelectFood={handleSelectFood}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : filteredMenuItems.length === 0 ? (
                      <div className="text-center py-24 bg-white/50 border border-slate-200 rounded-[2rem] shadow-sm flex flex-col items-center justify-center px-4 animate-fade-in">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                          <AlertCircle className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-display font-black text-slate-900 leading-tight">
                          {searchTerm.trim() || onlyChefSpecial || onlyVegetarian || onlyPopular || onlyNew
                            ? (lang === 'en' ? 'No items match your criteria' : lang === 'ar' ? 'لا توجد أصناف تطابق بحثক' : 'আপনার অনুসন্ধানের সাথে মিলছে এমন কিছু পাওয়া যায়নি')
                            : ""
                          }
                        </h3>

                        <p className="text-slate-500 font-medium mt-6 mb-8 max-w-xs mx-auto text-sm">
                          {lang === 'en' ? 'Try resetting search query or filter settings' : lang === 'ar' ? 'حاول إعادة ضبط البحث أو الفلاتر' : 'অনুগ্রহ করে ফিল্টার পরিবর্তন করে চেষ্টা করুন'}
                        </p>
                        <button 
                          onClick={() => {
                            setSearchTerm('');
                            setOnlyChefSpecial(false);
                            setOnlyVegetarian(false);
                            setOnlyPopular(false);
                            setOnlyNew(false);
                            setActiveCategory('All');
                          }}
                          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                        >
                          {lang === 'en' ? 'Reset All Filters' : lang === 'ar' ? 'إعادة ضبط كافة الفلاتر' : 'সব ফিল্টার রিসেট করুন'}
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                          {filteredMenuItems.slice(0, visibleItemCount).map((item) => (
                            <MenuItemCard
                              key={item.id}
                              item={item}
                              lang={lang}
                              onAddToCart={handleAddToCart}
                              onOpenAR={handleOpenAR}
                              onSelectFood={handleSelectFood}
                            />
                          ))}
                        </div>

                        {filteredMenuItems.length > visibleItemCount && (
                          <div className="mt-8 flex justify-center">
                            <button
                              onClick={() => setVisibleItemCount(prev => prev + 24)}
                              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500/50 text-slate-800 font-display font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                            >
                              <span>{lang === 'en' ? 'Load More Foods' : lang === 'ar' ? 'تحميل المزيد من الأطباق' : 'আরও খাবার দেখুন'}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono font-bold">
                                +{filteredMenuItems.length - visibleItemCount}
                              </span>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Floating Quick Action Cart Button */}
            {cart.length > 0 && (
              <div className="fixed bottom-6 right-6 z-40">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-2xl active:scale-95 transition-all cursor-pointer group border border-purple-400/20"
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-red-600 text-[10px] font-mono font-bold rounded-full flex items-center justify-center border border-white">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  </div>
                  <div className="text-left border-l border-white/20 pl-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-100">Current Cart</p>
                    <p className="text-sm font-bold font-mono">
                      ${cart.reduce((sum, i) => sum + (i.menuItem.price * i.quantity), 0).toFixed(2)}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        )
      )}

        {/* =====================================================================
            VIEW 2: ENTERPRISE MANAGER DASHBOARD (ADMIN CONSOLE - PROTECTED)
            ===================================================================== */}
        {viewMode === 'admin' && (
          <Suspense fallback={<LazyFallback />}>
            {!isAdminAuthenticated ? (
              <ManagerAuthModal 
                initialPlan={initialPlan}
                onLoginSuccess={handleManagerLoginSuccess}
                onCancel={() => setViewMode('client')}
              />
            ) : (
              <RestaurantAdminPanel
                restaurantId={activeRestaurantId || ''}
                user={user || ({
                  uid: managerSession?.restaurantId || 'manager-owner',
                  email: managerSession?.email || 'admin@restaurant.com',
                  displayName: managerSession?.name || 'Restaurant Admin',
                  photoURL: customAvatarUrl || null
                } as any)}
                settings={adminSettings || {
                  id: activeRestaurantId || '',
                  ownerId: user?.uid || 'manager-owner',
                  brandName: "My Restaurant",
                  brandLocation: "",
                  subscriptionPlan: 'basic',
                  subscriptionStatus: 'trial',
                  theme: 'light',
                  audioEnabled: true,
                  autoAcceptOrders: false,
                  securityPinRequired: true,
                  showCustomerContact: true,
                  createdAt: Date.now(),
                  trialEndsAt: Date.now() + 86400000,
                  socialLinks: { facebook: '', youtube: '', instagram: '', tiktok: '' }
                }}
                orders={orders}
                onLogout={handleManagerLogout}
                onExitAdmin={() => setViewMode('client')}
                onUpdateSettings={handleUpdateAdminSettings}
                lang={lang}
                setLang={setLang}
                onAcceptOrder={handleAcceptOrder}
                onNextStatus={handleNextStatus}
                onServeOrder={handleServeOrder}
                onCancelOrder={handleCancelOrder}
                onDeleteOrder={handleDeleteOrder}
                onClearHistory={handleClearHistory}
                onUpdatePaymentStatus={handleUpdatePaymentStatus}
                activeTablesCount={activeTablesCount}
                cookingCount={inProgressCount}
                servedCount={completedCount}
                revenue={totalRevenue}
                waiterRequests={waiterRequests}
                onResolveWaiter={handleResolveWaiter}
                onTriggerGlobalUpdate={handleTriggerGlobalUpdate}
              />
            )}
          </Suspense>
        )}

      </main>

      {/* =======================================================================
          SLIDING DRAWER: CUSTOMER SHOPPING CART
          ======================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in no-print">
          
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)} 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-md h-full bg-white border-l border-slate-200 shadow-2xl p-6 flex flex-col justify-between animate-slide-left">
            
            <div className="space-y-6 flex-1 flex flex-col overflow-hidden">
              
              {/* Header drawer */}
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-600" />
                  <span>{t('cart_title')}</span>
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-600">
                      {lang === 'en' ? 'Your order is empty' : lang === 'ar' ? 'طلبك فارغ' : 'আপনার অর্ডার খালি'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'en' ? 'Add items from the menu to start' : lang === 'ar' ? 'أضف أصنافًا من القائمة للبدء' : 'মেনু থেকে আইটেম যোগ করুন'}
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h4 className="font-display font-semibold text-sm text-slate-900">
                            {item.menuItem.name}
                          </h4>
                          <span className="font-mono text-xs text-cyan-700 font-bold">
                            ${(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity manipulators */}
                        <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200">
                          <button
                            onClick={() => handleUpdateQuantity(item.menuItem.id, -1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs text-slate-900 font-semibold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.menuItem.id, 1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Custom Kitchen Instructions / Cooking Notes for this specific item */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                          {t('kitchen_notes')}
                        </label>
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => handleUpdateItemNotes(item.menuItem.id, e.target.value)}
                          placeholder={lang === 'en' ? 'e.g. No cheese, extra spicy' : lang === 'ar' ? 'مثلاً: بدون جبن، حار جداً' : 'যেমন: পনির ছাড়া, বেশি ঝাল'}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.menuItem.id)}
                        className={`flex items-center gap-1 text-[10px] font-mono text-red-600 hover:text-red-700 transition-colors cursor-pointer ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{t('remove')}</span>
                      </button>

                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Calculations & Order Confirmation */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 pt-5 space-y-4">
                
                <div className="space-y-2 text-sm font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span>৳ {cart.reduce((sum, i) => sum + (i.menuItem.price * i.quantity), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('vat')}</span>
                    <span>৳ {(cart.reduce((sum, i) => sum + (i.menuItem.price * i.quantity), 0) * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-base pt-2 border-t border-slate-200">
                    <span>{t('total')}</span>
                    <span>
                      ৳ {(cart.reduce((sum, i) => sum + (i.menuItem.price * i.quantity), 0) * 1.05).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={isPlacingOrder}
                  className={`w-full py-3.5 rounded-xl text-white font-display font-semibold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                    isPlacingOrder 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500'
                  }`}
                >
                  {isPlacingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t('placing_order')}</span>
                    </>
                  ) : (
                    <>
                      <Utensils className="w-4 h-4 text-cyan-100" />
                      <span>{t('confirm_order')} {tableNumber ? `(Table ${tableNumber})` : ''}</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL: MANUAL TABLE SELECTION POPUP (Shown if tableNumber is null)
          ======================================================================= */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in no-print">
          <div className="w-full max-w-lg p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden text-center">
            
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Welcome to Avernao WebAR
              </span>
              <h3 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? 'Select Your Dining Table' : lang === 'ar' ? 'حدد طاولة الطعام الخاصة بك' : 'আপনার ডাইনিং টেবিল নির্বাচন করুন'}
              </h3>
              <p className="text-slate-600 text-xs max-w-sm mx-auto">
                {lang === 'en' ? 'Please select your table number from the list below' : lang === 'ar' ? 'يرجى اختيار رقم طاولتك من القائمة أدناه' : 'নিচের তালিকা থেকে আপনার টেবিল নম্বর নির্বাচন করুন'}
              </p>
            </div>

            {/* Quick table list 1-50 */}
            <div className="grid grid-cols-5 gap-3 max-h-60 overflow-y-auto pr-1 relative z-10 py-1">
              {Array.from({ length: 50 }, (_, i) => i + 1).map((tNum) => (
                <button
                  key={tNum}
                  onClick={() => handleLockTable(tNum)}
                  className="py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-cyan-500 text-slate-800 font-mono font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-0.5"
                >
                  <span className="text-[9px] font-normal text-slate-500 tracking-wider">
                    {lang === 'en' ? 'TABLE' : lang === 'ar' ? 'طاولة' : 'টেবিল'}
                  </span>
                  <span className="text-base text-cyan-700">{tNum}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-start gap-2.5 text-left text-[11px] text-slate-500 max-w-sm mx-auto">
              <Info className="w-4 h-4 flex-shrink-0 text-slate-400 mt-0.5" />
              <span>
                Alternatively, scan the physical QR code on your dining table stand to automatically lock the parameters.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 3D AR PORTAL VIEW OVERLAY (model-viewer)
          ======================================================================= */}
      {activeARItem && (
        <Suspense fallback={<LazyFallback />}>
          <ThreeDViewer
            item={activeARItem}
            onClose={() => setActiveARItem(null)}
            onAddToOrder={handleAddToCart}
          />
        </Suspense>
      )}

      {/* Trial Expired Overlay */}
      {isTrialExpired && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-[3rem] p-8 text-center shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={handleBypassTrial}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
              title="Close & Continue"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Trial Period Notice</h2>
            <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed">
              Your free trial status is being managed. Click below to instantly activate unlimited admin access and continue editing your restaurant name and menu card without any restriction.
            </p>

            <div className="space-y-2.5">
              <button 
                onClick={handleBypassTrial}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Unlock Unlimited Access (আনলিমিটেড অ্যাক্সেস)</span>
              </button>

              <button 
                onClick={handleBypassTrial}
                className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 cursor-pointer"
              >
                Close & Continue Editing (বন্ধ করুন)
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* AUTH MODALS */}
      {isManagerAuthOpen && (
        <Suspense fallback={<LazyFallback />}>
          <ManagerAuthModal 
            isOpen={isManagerAuthOpen}
            initialPlan={initialPlan}
            onClose={() => setIsManagerAuthOpen(false)}
            onCancel={() => setIsManagerAuthOpen(false)}
            onLoginSuccess={handleManagerLoginSuccess}
          />
        </Suspense>
      )}

      {/* Pricing Plans Section Hidden per User Request */}
      {/* {viewMode === 'client' && <PricingPlans lang={lang} />} */}

      {/* About & Pricing Section (Consolidated to main render block) */}

      {/* =======================================================================
          FOOTER & GOOGLE MAPS LOCATION SECTION (Customer view only)
          ======================================================================= */}
      {viewMode === 'client' && (
        <>
          <Suspense fallback={<LazyFallback />}>
            <AboutAndPricing 
              isDark={false} 
              currentPlan={adminSettings?.subscriptionPlan || 'basic'}
              lang={lang}
              brandName={adminSettings?.brandName}
              brandLocation={adminSettings?.brandLocation}
              logoStyle={adminSettings?.logoStyle}
              logoColorPrimary={adminSettings?.logoColorPrimary}
              logoColorSecondary={adminSettings?.logoColorSecondary}
              onPlanSelected={(newPlan) => {
                setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: newPlan }) : prev);
                setShowTopPlanPopup(true);
              }}
            />
          </Suspense>

          {/* =======================================================================
              MASTER CHEFS SHOWCASE (Directly Below Plans, Above Store Location)
              ======================================================================= */}
          {(adminSettings?.showChefSection ?? true) && (
            <Suspense fallback={<LazyFallback />}>
              <ChefSection 
                settings={adminSettings}
                lang={lang}
                onViewSpecials={() => {
                  const menuElem = document.getElementById('menu') || document.getElementById('menu-items');
                  if (menuElem) {
                    menuElem.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }
                }}
              />
            </Suspense>
          )}

          <FooterAndLocation 
            user={user}
            onLogin={handleGoogleLogin}
            onLogout={() => auth.signOut()}
            lang={lang}
            hideMap={adminSettings?.showGoogleMap === false}
            onAdminAccess={managerSession ? () => setViewMode('admin') : undefined}
            brandName={adminSettings?.brandName}
            brandLogoUrl={adminSettings?.brandLogoUrl}
            brandLocation={adminSettings?.brandLocation}
            logoStyle={adminSettings?.logoStyle}
            logoColorPrimary={adminSettings?.logoColorPrimary}
            logoColorSecondary={adminSettings?.logoColorSecondary}
            contactPhone={adminSettings?.contactPhone}
            contactWhatsapp={adminSettings?.contactWhatsapp}
            contactEmail={adminSettings?.contactEmail}
            socialLinks={adminSettings?.socialLinks}
          />
        </>
      )}

      <AnimatePresence>
        {selectedFood && (
          <Suspense fallback={<LazyFallback />}>
            <FoodDetailView 
              item={selectedFood}
              onClose={() => setSelectedFood(null)}
              onAddToCart={(item) => {
                handleAddToCart(item);
                setSelectedFood(null);
              }}
              onView3D={(item) => {
                setActiveARItem(item);
                setSelectedFood(null);
              }}
              onSelectRelated={(item) => setSelectedFood(item)}
              relatedItems={tierFilteredItems}
              lang={lang}
              plan={adminSettings?.subscriptionPlan || 'basic'}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* WEB AR OS PORTAL MODAL / SHOWCASE */}
      <AnimatePresence>
        {showWebARPortal && (
          <div className="fixed inset-0 z-50 bg-[#faf8f5] overflow-y-auto w-full h-full animate-fade-in no-print">
            <Suspense fallback={<LazyFallback />}>
              <WebAROSPortalLanding 
                isModal={false}
                onClose={() => setShowWebARPortal(false)}
                onOpenDemoRestaurant={() => {
                  setShowWebARPortal(false);
                  setViewMode('client');
                }}
                onOpenAdmin={() => {
                  setShowWebARPortal(false);
                  enterAdminPanel();
                }}
                onSelectPlan={(planId) => {
                  setShowWebARPortal(false);
                  const targetPlan: SubscriptionPlan = 
                    planId === '99' || planId === 'elite' || planId === 'premium' ? 'elite' :
                    planId === '49' || planId === 'pro' ? 'pro' : 'basic';
                  setAdminSettings(prev => prev ? ({ ...prev, subscriptionPlan: targetPlan }) : {
                    restaurantName: "L'Aura WebAR Restaurant",
                    brandName: "sahinsh",
                    brandLocation: "PAKISTAN",
                    subscriptionPlan: targetPlan,
                    subscriptionStatus: 'active',
                    theme: 'light',
                    audioEnabled: true,
                    autoAcceptOrders: false,
                    securityPinRequired: true,
                    whatsappNumber: '+923000000000',
                    currency: 'USD',
                    taxRate: 5,
                    customDomain: ''
                  });
                  setViewMode('client');
                }}
              />
            </Suspense>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
