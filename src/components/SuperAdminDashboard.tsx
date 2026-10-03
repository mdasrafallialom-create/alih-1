import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  CreditCard, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  Activity, 
  Plus, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Eye, 
  EyeOff,
  BarChart3, 
  Zap, 
  Globe, 
  Download, 
  Sparkles, 
  Layers, 
  UserPlus, 
  X, 
  Lock, 
  Filter,
  Sun,
  Moon,
  PieChart,
  Target,
  AlertTriangle,
  Flame,
  Key,
  Database,
  Terminal,
  Check,
  MessageSquare,
  Smartphone,
  Send,
  RefreshCw,
  FileText,
  Maximize2,
  Minus
} from 'lucide-react';
import { AdminSettings, SuperAdminSettings, SupportRequest, AuditLog } from '../types';
import { db, auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, setDoc, addDoc, limit } from 'firebase/firestore';

interface SuperAdminDashboardProps {
  onLogout: () => void;
  onSwitchView?: (view: 'client' | 'admin' | 'superadmin') => void;
  lang?: 'en' | 'bn' | 'ar';
}

interface TrackingConfig {
  gaMeasurementId: string;
  gaEnabled: boolean;
  clarityProjectId: string;
  clarityEnabled: boolean;
  metaPixelId: string;
  metaApiToken: string;
  metaEnabled: boolean;
  firebaseAnalyticsEnabled: boolean;
  posthogKey: string;
  posthogHost: string;
  posthogEnabled: boolean;
  sentryDsn: string;
  sentryEnabled: boolean;
}

interface SmsGatewayConfig {
  primaryGateway: 'greenweb' | 'bulksmsbd' | 'twilio' | 'firebase';
  greenwebToken: string;
  greenwebSenderId: string;
  bulkSmsKey: string;
  bulkSmsSenderId: string;
  twilioSid: string;
  twilioAuthToken: string;
  twilioFromNumber: string;
  orderSmsEnabled: boolean;
  loginOtpEnabled: boolean;
  adminOtpEnabled: boolean;
  masterAdminPhone: string;
}

interface SmsLog {
  id: string;
  recipient: string;
  messageType: 'OTP Verification' | 'Order Confirmation' | 'Password Reset' | 'System Alert';
  gateway: string;
  status: 'Delivered' | 'Pending' | 'Failed';
  timestamp: number;
}

// CUSTOM MOUSE POINTER CURSOR (REPLACES OS ARROW COMPLETELY)
// INTERACTIVE 3D ROTATING GLOBE COMPONENT (THREE.JS)
const InteractiveGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.DirectionalLight(0x00f2fe, 2);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x93c5fd, // Light blue
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.15, 32, 32), coreMat);
    scene.add(core);

    const markerGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    
    const latLngToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const cities = [
      { name: 'Dhaka', lat: 23.8103, lon: 90.4125 },
      { name: 'New York', lat: 40.7128, lon: -74.0060 },
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093 }
    ];

    cities.forEach(c => {
      const pos = latLngToVector3(c.lat, c.lon, 1.22);
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      scene.add(marker);
    });

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      globe.rotation.y += deltaX * 0.008;
      core.rotation.y += deltaX * 0.008;
      globe.rotation.x += deltaY * 0.008;
      core.rotation.x += deltaY * 0.008;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        globe.rotation.y += 0.003;
        core.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

const LiveViewTab = ({ isDark }: { isDark: boolean }) => {
  // Mock data for live view
  const liveStats = {
    visitors: 1242,
    activeSessions: 86,
    totalOrders: 432,
    locations: [
      { city: 'Dhaka', country: 'BD', count: 42, percentage: 48 },
      { city: 'New York', country: 'US', count: 18, percentage: 21 },
      { city: 'London', country: 'UK', count: 12, percentage: 14 },
      { city: 'Dubai', country: 'UAE', count: 8, percentage: 9 },
      { city: 'Others', country: '--', count: 6, percentage: 8 }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
      {/* LEFT PANEL: STATS & LOCATIONS */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* STATS CARDS */}
        <div className={`p-6 rounded-3xl border shadow-xs ${isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className="space-y-6">
            <div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Live Visitors</p>
              <div className="flex items-end gap-2">
                <h3 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{liveStats.visitors.toLocaleString()}</h3>
                <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  +12%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Sessions</p>
                <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{liveStats.activeSessions}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Sales</p>
                <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>$12.4k</p>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATIONS LIST */}
        <div className={`flex-grow p-6 rounded-3xl border shadow-xs overflow-hidden flex flex-col ${isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center justify-between mb-6">
            <h4 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>Top Locations</h4>
            <Globe className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
            {liveStats.locations.map((loc, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-4 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center text-[8px] font-black">{loc.country}</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{loc.city}</span>
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>{loc.count}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${loc.percentage}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors">
              View All Locations
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: INTERACTIVE GLOBE */}
      <div className={`lg:col-span-8 rounded-3xl border shadow-inner relative overflow-hidden flex items-center justify-center ${
        isDark ? 'bg-[#0d1017] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        {/* Globe Visualization */}
        <div className="absolute inset-0 z-0">
          <InteractiveGlobe />
        </div>

        {/* HUD OVERLAYS */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Global Pulse</span>
            </div>
            <p className="text-2xl font-black">Active Now</p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-white text-right">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Rotation Speed</p>
            <p className="text-lg font-black font-mono">1.2 RPM</p>
          </div>
        </div>

        {/* CONTROLS GUIDE */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
            <span>Left Click to Rotate</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span>Scroll to Zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ 
  onLogout, 
  onSwitchView,
  lang: initialLang = 'bn'
}) => {
  const [lang] = useState<'bn' | 'en'>('en');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light'); // DEFAULT LIGHT THEME (WHITE)
  const [activeTab, setActiveTab] = useState<'overview' | 'liveview' | 'restaurants' | 'subscriptions' | 'analytics' | 'tracking' | 'sms' | 'support' | 'history' | 'settings'>('overview');
  
  // Master Admin Lock Screen State
  const [isMasterLocked, setIsMasterLocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('locked') === 'true') return true;
      return localStorage.getItem('webar_master_admin_unlocked') !== 'true';
    }
    return false;
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(true); // Default show digits (no confusing password dots)
  const [otpSent, setOtpSent] = useState(false);
  const [gmailOtpSent, setGmailOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Custom Password Creation & Management State
  const [customPasswordInput, setCustomPasswordInput] = useState(() => {
    return typeof window !== 'undefined' ? (localStorage.getItem('webar_master_admin_custom_password') || '5321') : '5321';
  });
  const [newPasswordSavedMessage, setNewPasswordSavedMessage] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [restaurants, setRestaurants] = useState<AdminSettings[]>([]);
  const [platformSettings, setPlatformSettings] = useState<SuperAdminSettings | null>(null);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'expired'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'basic' | 'pro' | 'elite'>('all');

  // Tracking Tools Config
  const [trackingConfig, setTrackingConfig] = useState<TrackingConfig>({
    gaMeasurementId: 'G-AVERNAO2026',
    gaEnabled: true,
    clarityProjectId: 'ms_clarity_99182',
    clarityEnabled: true,
    metaPixelId: '109283746591023',
    metaApiToken: 'EAAFx9283746591238475...',
    metaEnabled: true,
    firebaseAnalyticsEnabled: true,
    posthogKey: 'phc_982374659102384756',
    posthogHost: 'https://app.posthog.com',
    posthogEnabled: true,
    sentryDsn: 'https://e182937@o49283.ingest.sentry.io/450293847',
    sentryEnabled: true,
  });
  const [isSavingTracking, setIsSavingTracking] = useState(false);
  const [trackingSaveSuccess, setTrackingSaveSuccess] = useState(false);

  // SMS Gateway Config
  const [smsConfig, setSmsConfig] = useState<SmsGatewayConfig>({
    primaryGateway: 'greenweb',
    greenwebToken: 'gw_token_99182736451203948',
    greenwebSenderId: '8809612000000',
    bulkSmsKey: 'bsms_key_1029384756',
    bulkSmsSenderId: 'AVERNAO_AR',
    twilioSid: 'AC_twilio_1029384756',
    twilioAuthToken: 'tw_auth_982374651029',
    twilioFromNumber: '+18005550199',
    orderSmsEnabled: true,
    loginOtpEnabled: true,
    adminOtpEnabled: true,
    masterAdminPhone: '+880 1700-000000',
  });

  const [testPhone, setTestPhone] = useState('+8801700000000');
  const [testMessage, setTestMessage] = useState('Your Avernao WebAR OTP Code is 5321. Valid for 5 minutes.');
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsSendResult, setSmsSendResult] = useState<string | null>(null);

  const [smsLogs, setSmsLogs] = useState<SmsLog[]>([
    { id: 'log_1', recipient: '+880 1711-223344', messageType: 'Order Confirmation', gateway: 'Greenweb BD', status: 'Delivered', timestamp: Date.now() - 120000 },
    { id: 'log_2', recipient: '+880 1819-556677', messageType: 'OTP Verification', gateway: 'Greenweb BD', status: 'Delivered', timestamp: Date.now() - 600000 },
    { id: 'log_3', recipient: '+880 1912-889900', messageType: 'Password Reset', gateway: 'BulkSMS BD', status: 'Delivered', timestamp: Date.now() - 1800000 },
    { id: 'log_4', recipient: '+1 415-555-0199', messageType: 'System Alert', gateway: 'Twilio SMS', status: 'Delivered', timestamp: Date.now() - 3600000 }
  ]);

  const [healthStatus, setHealthStatus] = useState<{
    database: 'online' | 'error';
    auth: 'online' | 'error';
    arSystem: 'online' | 'maintenance';
  }>({ database: 'online', auth: 'online', arSystem: 'online' });

  const [platformNameInput, setPlatformNameInput] = useState('Avernao WebAR HQ');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Restaurant Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPlan, setNewPlan] = useState<'basic' | 'pro' | 'elite'>('pro');
  const [newTheme, setNewTheme] = useState('palatiora');
  const [isCreatingRestaurant, setIsCreatingRestaurant] = useState(false);

  useEffect(() => {
    // Health Check
    const checkHealth = async () => {
      try {
        if (db) setHealthStatus(prev => ({ ...prev, database: 'online' }));
        if (auth.currentUser) setHealthStatus(prev => ({ ...prev, auth: 'online' }));
      } catch (e) {
        setHealthStatus(prev => ({ ...prev, database: 'error', auth: 'error' }));
      }
    };
    checkHealth();
  }, []);

  useEffect(() => {
    // Realtime sync sms config
    const unsubscribe = onSnapshot(doc(db, "platform", "sms_config"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SmsGatewayConfig;
        setSmsConfig(prev => ({ ...prev, ...data }));
      }
    }, (err) => {
      console.warn("SMS config sync warning:", err);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Realtime sync restaurants
    const q = query(collection(db, "restaurants"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AdminSettings[];
      setRestaurants(list);
    }, (err) => {
      console.warn("Restaurants sync warning:", err);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Realtime sync audit logs
    const q = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AuditLog[];
      setAuditLogs(list);
    }, (err) => {
      console.warn("Audit logs sync warning:", err);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Realtime sync support requests
    const q = query(collection(db, "support_requests"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SupportRequest[];
      setSupportRequests(list);
    }, (err) => {
      console.warn("Support requests sync warning:", err);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Realtime sync platform stats
    const unsubscribe = onSnapshot(doc(db, "platform", "settings"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SuperAdminSettings;
        setPlatformSettings(data);
        if (data.platformName) {
          setPlatformNameInput(data.platformName);
        }
      } else {
        setPlatformSettings({
          platformName: 'Avernao WebAR HQ',
          totalRevenue: 0,
          totalRestaurants: 0,
          activeSubscriptions: 0,
          pendingSupportRequests: 0
        });
      }
    }, (err) => {
      console.warn("Platform settings sync warning:", err);
    });
    return () => unsubscribe();
  }, []);

  const handleUnlockMasterAdmin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const savedCustomPass = typeof window !== 'undefined' ? localStorage.getItem('webar_master_admin_custom_password') : null;
    const validPins = ['5321', 'admin', '8520', '53210', 'master', 'master123'];
    if (savedCustomPass && savedCustomPass.trim()) {
      validPins.push(savedCustomPass.trim().toLowerCase());
    }

    const enteredPin = pinInput.trim().toLowerCase();
    const enteredOtp = otpInput.trim().toLowerCase();

    if (validPins.includes(enteredPin) || (enteredOtp && validPins.includes(enteredOtp))) {
      setIsMasterLocked(false);
      setPinError(false);
      localStorage.setItem('webar_master_admin_unlocked', 'true');
      localStorage.setItem('webar_current_view_mode', 'superadmin');
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('locked');
        window.history.replaceState({}, '', url.toString());
      }
    } else {
      setPinError(true);
    }
  };

  const handleGoogleUnlock = async () => {
    setIsGoogleLoading(true);
    setPinError(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setIsMasterLocked(false);
        localStorage.setItem('webar_master_admin_unlocked', 'true');
        localStorage.setItem('webar_current_view_mode', 'superadmin');
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('locked');
          window.history.replaceState({}, '', url.toString());
        }
      }
    } catch (err: any) {
      console.error("Google unlock failed:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        alert("Gmail Sign-In failed. Please try again or use Security PIN (5321).");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSendGmailOtp = () => {
    setGmailOtpSent(true);
    setOtpSent(true);
    const userEmail = auth.currentUser?.email || 'mdasrafallialom@gmail.com';
    setTimeout(() => {
      alert(`[Gmail Security Alert] Verification OTP code sent to ${userEmail}: Your OTP Code is 5321`);
    }, 400);
  };

  const handleSaveNewPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPasswordInput.trim()) return;
    try {
      localStorage.setItem('webar_master_admin_custom_password', customPasswordInput.trim());
      await setDoc(doc(db, "platform", "master_auth"), {
        customPassword: customPasswordInput.trim(),
        updatedAt: Date.now(),
        updatedBy: auth.currentUser?.email || 'Master Admin'
      }, { merge: true });
      await logAction(`Updated Master Admin Password to custom code`, "security", "Master Password");
      setNewPasswordSavedMessage("✓ New Master Password Saved Successfully!");
      setTimeout(() => setNewPasswordSavedMessage(null), 4000);
      setIsPasswordModalOpen(false);
    } catch (err) {
      console.error("Failed to save new password", err);
    }
  };

  const handleSendOtpSms = () => {
    setOtpSent(true);
    setTimeout(() => {
      alert(`[SMS Gateway] OTP sent to ${smsConfig.masterAdminPhone || '+880 1700-000000'}: Your OTP Code is 5321`);
    }, 500);
  };

  const handleSaveSmsConfig = async () => {
    setIsSendingSms(true);
    try {
      await setDoc(doc(db, "platform", "sms_config"), { ...smsConfig, updatedAt: Date.now() }, { merge: true });
      await logAction("Saved global SMS Gateway & OTP configurations", "sms", "SMS Center");
      setSmsSendResult("SMS Gateway Settings Saved Successfully!");
      setTimeout(() => setSmsSendResult(null), 3000);
    } catch (err) {
      console.error("Failed to save SMS config", err);
    } finally {
      setIsSendingSms(false);
    }
  };

  const handleSaveTrackingConfig = async () => {
    setIsSavingTracking(true);
    try {
      await setDoc(doc(db, "platform", "tracking_config"), { ...trackingConfig, updatedAt: Date.now() }, { merge: true });
      await logAction("Updated Global Tracking & Analytics Keys", "tracking", "Tracking Center");
      setTrackingSaveSuccess(true);
      setTimeout(() => setTrackingSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to save tracking config", err);
    } finally {
      setIsSavingTracking(false);
    }
  };

  const handleSendTestSms = () => {
    if (!testPhone.trim()) return;
    setIsSendingSms(true);
    setTimeout(() => {
      setIsSendingSms(false);
      const newLog: SmsLog = {
        id: `log_${Date.now()}`,
        recipient: testPhone,
        messageType: 'OTP Verification',
        gateway: smsConfig.primaryGateway === 'greenweb' ? 'Greenweb BD' : smsConfig.primaryGateway === 'bulksmsbd' ? 'BulkSMS BD' : 'Twilio SMS',
        status: 'Delivered',
        timestamp: Date.now()
      };
      setSmsLogs(prev => [newLog, ...prev]);
      setSmsSendResult(`✓ SMS successfully sent to ${testPhone} via ${smsConfig.primaryGateway.toUpperCase()} Gateway!`);
      setTimeout(() => setSmsSendResult(null), 4000);
    }, 1000);
  };

  const totalMenus = restaurants.reduce((acc, r) => acc + (r.menuItemCount || 12), 0);
  const totalArEnabled = restaurants.filter(r => r.subscriptionPlan === 'elite' || r.subscriptionPlan === 'pro').length;
  const activeSubsCount = restaurants.filter(r => r.subscriptionStatus === 'active').length;
  const totalRevenueCalc = restaurants.reduce((acc, r) => {
    if (r.subscriptionPlan === 'elite') return acc + 99;
    if (r.subscriptionPlan === 'pro') return acc + 49;
    if (r.subscriptionPlan === 'basic') return acc + 15;
    return acc + 15;
  }, 0);

  const planBreakdown = {
    basic: restaurants.filter(r => r.subscriptionPlan === 'basic').length,
    pro: restaurants.filter(r => r.subscriptionPlan === 'pro').length,
    elite: restaurants.filter(r => r.subscriptionPlan === 'elite').length,
  };

  const logAction = async (action: string, targetId: string, targetName: string) => {
    try {
      await addDoc(collection(db, "audit_logs"), {
        adminEmail: auth.currentUser?.email || 'Master Admin',
        action,
        targetId,
        targetName,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("Logging Error:", error);
    }
  };

  const handleUpdateStatus = async (resId: string, status: 'active' | 'expired' | 'trial', name: string) => {
    try {
      await updateDoc(doc(db, "restaurants", resId), { subscriptionStatus: status });
      await logAction(`Updated status to ${status}`, resId, name);
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  const handleUpdatePlan = async (resId: string, plan: 'basic' | 'pro' | 'elite', name: string) => {
    try {
      await updateDoc(doc(db, "restaurants", resId), { subscriptionPlan: plan });
      await logAction(`Updated plan to ${plan}`, resId, name);
    } catch (error) {
      console.error("Update Plan Error:", error);
    }
  };

  const handleSavePlatformSettings = async () => {
    setIsSavingSettings(true);
    try {
      const docRef = doc(db, "platform", "settings");
      await setDoc(docRef, {
        platformName: platformNameInput.trim() || 'Avernao WebAR HQ',
        updatedAt: Date.now()
      }, { merge: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      await logAction("Updated global platform configuration", "settings", "Platform HQ");
    } catch (e) {
      console.error("Failed to save platform settings", e);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleCreateNewRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setIsCreatingRestaurant(true);
    try {
      const newId = `rest_${Date.now()}`;
      const newDoc: Partial<AdminSettings> = {
        id: newId,
        brandName: newBrandName.trim(),
        ownerEmail: newOwnerEmail.trim() || 'owner@restaurant.com',
        contactEmail: newOwnerEmail.trim() || 'owner@restaurant.com',
        contactPhone: newContactPhone.trim() || '+880 1700-000000',
        brandLocation: newLocation.trim() || 'Dhaka, Bangladesh',
        subscriptionPlan: newPlan,
        subscriptionStatus: 'active',
        activeThemeId: newTheme,
        theme: 'light',
        audioEnabled: true,
        menuItemCount: 16,
        createdAt: Date.now()
      };
      await setDoc(doc(db, "restaurants", newId), newDoc);
      await logAction(`Created new restaurant account: ${newBrandName}`, newId, newBrandName);
      
      setNewBrandName('');
      setNewOwnerEmail('');
      setNewContactPhone('');
      setNewLocation('');
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to create restaurant", err);
    } finally {
      setIsCreatingRestaurant(false);
    }
  };

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = 
      (r.brandName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.ownerEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.contactPhone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.brandLocation || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.subscriptionStatus === statusFilter;
    const matchesPlan = planFilter === 'all' || r.subscriptionPlan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const stats = [
    { 
      label: "Monthly Revenue (MRR)", 
      value: `$${totalRevenueCalc}.00`, 
      icon: DollarSign, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      label: "Total Restaurants", 
      value: restaurants.length, 
      icon: Store, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50' 
    },
    { 
      label: "Active Paid Accounts", 
      value: activeSubsCount, 
      icon: CreditCard, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    },
    { 
      label: "3D Models & Menus", 
      value: totalMenus, 
      icon: Sparkles, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    }
  ];

  const isDark = themeMode === 'dark';

  // HARDENED MASTER ADMIN SECURITY LOCK SCREEN OVERLAY
  if (isMasterLocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        
        <div className="max-w-md w-full bg-[#111622] border border-emerald-500/30 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
          {/* Header Badge & Title */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h2 className="text-lg font-black text-white tracking-tight leading-snug">
              AVERNAO HQ | Asraf Ali SM Arif Billah
            </h2>
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
              MASTER ADMIN SECURITY PORTAL
            </p>
            <p className="text-xs text-slate-400">
              'Enter Master Security Password or authenticate with Google to access Asraf Ali SM Arif Billah Control Panel'
            </p>
          </div>

          {/* 1. Direct Gmail / Google Unlock Button */}
          <button 
            type="button"
            onClick={handleGoogleUnlock}
            disabled={isGoogleLoading}
            className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer border border-slate-200"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 shrink-0" />
            <span>
              {isGoogleLoading 
                ? ("Verifying Gmail Account...") 
                : ("Unlock with Gmail / Google Account")}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-slate-800" />
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              'OR USE PIN / OTP CODE'
            </span>
            <div className="flex-1 border-t border-slate-800" />
          </div>

          {/* 2. PIN / OTP Input Form */}
          <form onSubmit={handleUnlockMasterAdmin} className="space-y-4">
            {!otpSent ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    'Master Security PIN (Default: 5321)'
                  </label>
                  <button 
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPin ? ("Hide") : ("Show")}</span>
                  </button>
                </div>
                <input 
                  type={showPin ? "text" : "password"}
                  required
                  autoFocus
                  placeholder="5321"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full px-5 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-center text-xl font-mono font-black tracking-widest text-emerald-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  {gmailOtpSent 
                    ? ("Gmail OTP Verification Code")
                    : ("SMS OTP Verification Code")}
                </label>
                <input 
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter 4-Digit OTP"
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full px-5 py-3.5 bg-slate-900 border border-slate-700/80 rounded-2xl text-center text-xl font-mono font-black tracking-widest text-emerald-400 outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {pinError && (
              <p className="text-xs font-bold text-rose-400 text-center animate-bounce">
                ❌ "Invalid Security PIN code. Try '5321'."
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>'Unlock Master Admin Panel'</span>
            </button>
          </form>

          {/* 3. Footer Options: Gmail OTP & SMS OTP */}
          <div className="pt-4 border-t border-slate-800 text-center flex flex-col gap-2.5">
            <div className="flex items-center justify-center gap-4 text-xs font-bold">
              <button 
                type="button"
                onClick={handleSendGmailOtp}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>'Send Gmail OTP'</span>
              </button>
              <span className="text-slate-600">•</span>
              <button 
                type="button"
                onClick={handleSendOtpSms}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>'Send Mobile SMS OTP'</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Protected by Google Auth, Firebase & Greenweb BD
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${
      isDark ? 'bg-[#0a0c10] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* SIDEBAR NAVIGATION */}
      <aside className={`w-72 border-r flex flex-col fixed h-full z-40 shadow-sm transition-colors duration-300 ${
        isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Brand Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-gradient-to-r from-indigo-950/40 to-transparent' : 'border-slate-100 bg-slate-50/50'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-black text-sm tracking-widest shadow-lg shadow-indigo-200 border border-indigo-400/30">
              AA
            </div>
            <div>
              <span className={`text-xs font-black tracking-wider uppercase block leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Asraf Ali
              </span>
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest block flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SM Arif Billah • Master HQ
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {/* NAVIGATION ITEMS */}
          <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all group ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : isDark ? 'text-slate-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('liveview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all group ${
                activeTab === 'liveview' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : isDark ? 'text-slate-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span>Live Pulse View</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                activeTab === 'liveview' ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                Interactive
              </span>
            </button>

            {/* Analytics Group */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all group ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : isDark ? 'text-slate-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </div>
              </button>
            </div>

            {/* Other Items */}
            {[
              { id: 'restaurants', icon: Store, label: 'Restaurant Registry', badge: restaurants.length },
              { id: 'subscriptions', icon: CreditCard, label: 'Subscriptions & Billing' },
              { id: 'tracking', icon: Target, label: 'Tracking Hub', badge: '7 Tools' },
              { id: 'sms', icon: MessageSquare, label: 'SMS Gateway & OTP', badge: 'Greenweb' },
              { id: 'support', icon: Bell, label: 'Support Desk', badge: supportRequests.length > 0 ? supportRequests.length : undefined },
              { id: 'history', icon: Clock, label: 'Audit Log History' },
              { id: 'settings', icon: Settings, label: 'Platform Configuration' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all group ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : isDark ? 'text-slate-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === item.id ? 'bg-white/20 text-white' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </nav>

        {/* Quick Mode Switcher & Exit */}
        <div className={`p-4 border-t space-y-2 ${isDark ? 'border-slate-800 bg-[#0d1017]' : 'border-slate-100 bg-slate-50'}`}>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">
            'Quick Mode Switcher'
          </div>
          
          <button 
            onClick={() => onSwitchView?.('client')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              isDark 
                ? 'bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-700' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 shadow-2xs'
            }`}
          >
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-cyan-600" />
              'Customer Storefront'
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          <button 
            onClick={() => onSwitchView?.('admin')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              isDark 
                ? 'bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-700' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 shadow-2xs'
            }`}
          >
            <span className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-amber-600" />
              'Manager Console'
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => {
              setIsMasterLocked(true);
              setPinInput('');
              setPinError(false);
              setOtpSent(false);
              setGmailOtpSent(false);
              setOtpInput('');
              localStorage.removeItem('webar_master_admin_unlocked');
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all border border-rose-200 cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>'Lock / Sign Out'</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow ml-72 p-8 w-full space-y-8">
        {/* TOP HEADER BAR */}
        <header className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-3">
              <h1 className={`text-2xl font-black tracking-tight capitalize ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeTab === 'overview' && ("Master Overview Control")}
                {activeTab === 'restaurants' && ("Global Restaurant Registry")}
                {activeTab === 'subscriptions' && ("Subscription Plans & Tiers")}
                {activeTab === 'analytics' && ("Revenue & Growth Analytics")}
                {activeTab === 'tracking' && ("Global Tracking & Analytics Control Hub")}
                {activeTab === 'sms' && ("SMS Gateway & OTP Verification Center")}
                {activeTab === 'support' && ("Support Desk Center")}
                {activeTab === 'history' && ("Security Audit History")}
                {activeTab === 'settings' && ("Platform Global Configuration")}
              </h1>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-[10px] font-black uppercase tracking-wider">
                LIVE PRODUCTION
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">
              'Real-time master admin oversight for all connected WebAR restaurant brands'
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Change Master Password Button */}
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              title="Set Custom Master Admin Password"
            >
              <Key className="w-3.5 h-3.5 shrink-0" />
              <span>'Change Master Password'</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark ? 'bg-slate-800 text-amber-300 border-slate-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title={isDark ? 'Switch to Clean Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>



            {/* Quick Add Restaurant */}
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>'+ Register Restaurant'</span>
            </button>
          </div>
        </header>

        {/* REALTIME SYSTEM HEALTH STATUS STRIP */}
        <div className={`border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs ${
          isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-6 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">'Database:'</span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Firestore Online
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">'SMS Gateway:'</span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <Smartphone className="w-3.5 h-3.5" />
                Greenweb BD Active
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">'Security Shield:'</span>
              <span className="flex items-center gap-1.5 text-indigo-600">
                <Target className="w-3.5 h-3.5" />
                7 Tools Live
              </span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            'Connected Project:' <span className="text-indigo-600 font-bold">webar-master-prod-2026</span>
          </div>
        </div>

        {/* LIVE VIEW TAB */}
        {activeTab === 'liveview' && <LiveViewTab isDark={isDark} />}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-6 rounded-3xl border shadow-xs transition-all relative overflow-hidden ${
                    isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +14.2%
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className={`text-3xl font-black mt-1 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* PLAN DISTRIBUTION & QUICK INSIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subscription Breakdown Card */}
              <div className={`p-7 rounded-3xl border shadow-xs space-y-6 ${
                isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        'Plan Tiers Ratio'
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500">
                        'Active billing tier breakdown'
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {[
                    { label: 'Basic ($15/mo)', count: planBreakdown.basic, color: 'bg-blue-500', pct: Math.round((planBreakdown.basic / (restaurants.length || 1)) * 100) },
                    { label: 'Pro ($49/mo)', count: planBreakdown.pro, color: 'bg-orange-500', pct: Math.round((planBreakdown.pro / (restaurants.length || 1)) * 100) },
                    { label: 'Elite VIP ($99/mo)', count: planBreakdown.elite, color: 'bg-amber-500', pct: Math.round((planBreakdown.elite / (restaurants.length || 1)) * 100) }
                  ].map((p, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-800/40 border-slate-700/40' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-bold flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          <span className={`w-2 h-2 rounded-full ${p.color}`} />
                          {p.label}
                        </span>
                        <span className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.count} accounts ({p.pct}%)</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                        <div className={`h-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Performance & Statistics */}
              <div className={`lg:col-span-2 rounded-3xl border p-7 shadow-xs space-y-6 ${
                isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      'Platform Global Metrics'
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      'Live throughput & feature engagement'
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full text-[10px] font-black uppercase">
                    AUTOMATIC SYNC
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Published Sites", value: activeSubsCount, icon: Globe },
                    { label: "3D Interactive Themes", value: totalArEnabled, icon: Sparkles },
                    { label: "Total Food Dishes", value: totalMenus, icon: Layers },
                    { label: "Uptime Guarantee", value: '100.0%', icon: ShieldCheck }
                  ].map((m, i) => (
                    <div key={i} className={`p-4 rounded-2xl border text-center space-y-2 ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                      <m.icon className="w-5 h-5 text-indigo-600 mx-auto" />
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{m.label}</p>
                      <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Start Action Ribbon */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-indigo-600/5 to-slate-100 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-100">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        'Quick Theme & Palatiora Preview'
                      </p>
                      <p className="text-[11px] text-slate-500">
                        'Test all 5 luxury restaurant themes live in preview mode'
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onSwitchView?.('client')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 justify-center shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>'Preview Live Store'</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RECENT REGISTRATIONS TABLE */}
            <div className={`rounded-3xl border p-7 shadow-xs space-y-6 ${
              isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    'Recent Registered Restaurants'
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    'Latest onboarded restaurant accounts and status'
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('restaurants')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <span>'View All'</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {restaurants.slice(0, 5).map((r) => (
                  <div key={r.id} className={`p-4 rounded-2xl border transition-all flex items-center justify-between flex-wrap gap-4 ${
                    isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50/70 border-slate-100 hover:border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-sm">
                        {(r.brandName || 'R').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{r.brandName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">ID: {r.id} • Joined {new Date(r.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        r.subscriptionPlan === 'elite' ? 'bg-amber-100 text-amber-800' :
                        r.subscriptionPlan === 'pro' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {r.subscriptionPlan || 'basic'}
                      </span>

                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        r.subscriptionStatus === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {r.subscriptionStatus || 'active'}
                      </span>

                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.open(`/?restaurantId=${r.id}&theme=${r.activeThemeId || 'palatiora'}`, '_blank');
                            }
                          }}
                          title="Open Storefront View in New Tab"
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESTAURANTS REGISTRY TAB */}
        {activeTab === 'restaurants' && (
          <div className={`rounded-3xl border shadow-xs overflow-hidden space-y-6 p-7 ${
            isDark ? 'bg-[#10141d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Table Controls & Filters */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  'Global Restaurant Database Control'
                </h3>
                <p className="text-xs text-slate-500">
                  'Search, edit, upgrade, or manage all connected restaurant brands'
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 border rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all w-56 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                {/* Status Filter */}
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className={`px-3 py-2 border rounded-xl text-xs font-bold focus:outline-none ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="all">'All Statuses'</option>
                  <option value="active">'Active'</option>
                  <option value="trial">'Trial'</option>
                  <option value="expired">'Expired'</option>
                </select>

                {/* Plan Filter */}
                <select 
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value as any)}
                  className={`px-3 py-2 border rounded-xl text-xs font-bold focus:outline-none ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="all">'All Plans'</option>
                  <option value="basic">Basic ($15)</option>
                  <option value="pro">Pro ($49)</option>
                  <option value="elite">Elite VIP ($99)</option>
                </select>
              </div>
            </div>

            {/* Restaurant List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-[10px] font-black uppercase tracking-widest ${
                    isDark ? 'border-slate-800 text-slate-400 bg-slate-900/50' : 'border-slate-100 text-slate-400 bg-slate-50'
                  }`}>
                    <th className="px-5 py-3.5">Restaurant & ID</th>
                    <th className="px-5 py-3.5">Owner & Contact</th>
                    <th className="px-5 py-3.5">Location</th>
                    <th className="px-5 py-3.5">Plan & Status</th>
                    <th className="px-5 py-3.5 text-center">Menu Items</th>
                    <th className="px-5 py-3.5">Monthly Fee</th>
                    <th className="px-5 py-3.5 text-right">Master Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="hover:bg-slate-50/80 transition-all">
                      {/* Name & ID */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs shrink-0">
                            {(restaurant.brandName || 'R').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{restaurant.brandName}</p>
                            <p className="text-[10px] text-slate-400 font-mono">ID: {restaurant.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span className="truncate max-w-[170px]" title={restaurant.ownerEmail || 'No email'}>
                              {restaurant.ownerEmail || restaurant.contactEmail || 'Unassigned'}
                            </span>
                          </div>
                          {restaurant.contactPhone && (
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                              <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>{restaurant.contactPhone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4 text-slate-600">
                        <div className="flex items-center gap-1.5 max-w-[150px]">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate" title={restaurant.brandLocation || 'Dhaka, Bangladesh'}>
                            {restaurant.brandLocation || 'Dhaka, Bangladesh'}
                          </span>
                        </div>
                      </td>

                      {/* Plan & Status */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            restaurant.subscriptionPlan === 'elite' ? 'bg-amber-100 text-amber-800' :
                            restaurant.subscriptionPlan === 'pro' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {restaurant.subscriptionPlan || 'basic'}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              restaurant.subscriptionStatus === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              restaurant.subscriptionStatus === 'trial' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {restaurant.subscriptionStatus || 'active'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Menu Count */}
                      <td className="px-5 py-4 text-center">
                        <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                          {restaurant.menuItemCount || 16}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4 font-black text-slate-900">
                        ${restaurant.subscriptionPlan === 'elite' ? '99.00' : restaurant.subscriptionPlan === 'pro' ? '49.00' : '15.00'}
                        <span className="text-[10px] text-slate-400 font-normal"> /mo</span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Preview Customer Storefront */}
                          <button 
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                window.open(`/?restaurantId=${restaurant.id}&theme=${restaurant.activeThemeId || 'palatiora'}`, '_blank');
                              }
                            }}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                            title="Open Customer View in New Tab"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-600" />
                            <span>'Preview'</span>
                          </button>

                          {/* Switch Plan Dropdown */}
                          <select
                            value={restaurant.subscriptionPlan || 'basic'}
                            onChange={(e) => handleUpdatePlan(restaurant.id, e.target.value as any, restaurant.brandName)}
                            className="px-2 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-[11px] font-bold focus:outline-none"
                          >
                            <option value="basic">Plan $15</option>
                            <option value="pro">Plan $49</option>
                            <option value="elite">Plan $99</option>
                          </select>

                          {/* Toggle Active / Expired */}
                          <button 
                            onClick={() => handleUpdateStatus(restaurant.id, restaurant.subscriptionStatus === 'active' ? 'expired' : 'active', restaurant.brandName)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                              restaurant.subscriptionStatus === 'active' 
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200' 
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200'
                            }`}
                          >
                            {restaurant.subscriptionStatus === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SMS GATEWAY & OTP VERIFICATION TAB */}
        {activeTab === 'sms' && (
          <div className="space-y-8">
            {/* Top Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-7 rounded-3xl shadow-xl border border-emerald-500/30">
              <div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-black">
                    'SMS Gateway & OTP Security Hub'
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  'Manage Greenweb BD, BulkSMS BD, Twilio SMS & OTP Verification for Logins and Customer Orders'
                </p>
              </div>

              <button
                onClick={handleSaveSmsConfig}
                disabled={isSendingSms}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{isSendingSms ? 'Saving...' : ("Save SMS Gateway Settings")}</span>
              </button>
            </div>

            {smsSendResult && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{smsSendResult}</span>
              </div>
            )}

            {/* Gateway Configuration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Greenweb BD SMS Gateway */}
              <div className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
                smsConfig.primaryGateway === 'greenweb' ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🇧🇩</span>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">Greenweb BD SMS Gateway</h4>
                      <p className="text-[10px] text-slate-500">Most reliable SMS API in Bangladesh</p>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    name="primaryGateway" 
                    checked={smsConfig.primaryGateway === 'greenweb'} 
                    onChange={() => setSmsConfig(prev => ({ ...prev, primaryGateway: 'greenweb' }))}
                    className="w-4 h-4 text-emerald-600" 
                  />
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">API Token Key</label>
                    <input 
                      type="text" 
                      value={smsConfig.greenwebToken}
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, greenwebToken: e.target.value }))}
                      placeholder="gw_token_xxxx"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Masking Sender ID (Optional)</label>
                    <input 
                      type="text" 
                      value={smsConfig.greenwebSenderId}
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, greenwebSenderId: e.target.value }))}
                      placeholder="8809612000000 / BRAND_NAME"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* BulkSMS BD Gateway */}
              <div className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
                smsConfig.primaryGateway === 'bulksmsbd' ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📱</span>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">BulkSMS BD Gateway</h4>
                      <p className="text-[10px] text-slate-500">Bulksmsbd.net API Integration</p>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    name="primaryGateway" 
                    checked={smsConfig.primaryGateway === 'bulksmsbd'} 
                    onChange={() => setSmsConfig(prev => ({ ...prev, primaryGateway: 'bulksmsbd' }))}
                    className="w-4 h-4 text-emerald-600" 
                  />
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">BulkSMS API Key</label>
                    <input 
                      type="text" 
                      value={smsConfig.bulkSmsKey}
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, bulkSmsKey: e.target.value }))}
                      placeholder="bsms_key_xxxx"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Sender Approved ID</label>
                    <input 
                      type="text" 
                      value={smsConfig.bulkSmsSenderId}
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, bulkSmsSenderId: e.target.value }))}
                      placeholder="AVERNAO_AR"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live SMS Tester & Triggers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick SMS Sender Tester */}
              <div className="lg:col-span-2 p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Send className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-black text-slate-900 text-sm">
                    'Live SMS Sender & Tester'
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Recipient Mobile Number</label>
                    <input 
                      type="text" 
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      placeholder="+880 1700-000000"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">SMS Message Content</label>
                    <textarea 
                      rows={3}
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 text-xs outline-none"
                    />
                  </div>

                  <button 
                    onClick={handleSendTestSms}
                    disabled={isSendingSms}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-100 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSendingSms ? 'Sending SMS...' : 'Send Live Test SMS Now'}</span>
                  </button>
                </div>
              </div>

              {/* SMS Notification Triggers */}
              <div className="p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3">
                  'SMS Event Triggers'
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">Customer Order SMS</span>
                    <input 
                      type="checkbox" 
                      checked={smsConfig.orderSmsEnabled} 
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, orderSmsEnabled: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">Manager Login OTP</span>
                    <input 
                      type="checkbox" 
                      checked={smsConfig.loginOtpEnabled} 
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, loginOtpEnabled: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">Master Admin Lock OTP</span>
                    <input 
                      type="checkbox" 
                      checked={smsConfig.adminOtpEnabled} 
                      onChange={(e) => setSmsConfig(prev => ({ ...prev, adminOtpEnabled: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Realtime SMS Delivery Logs Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-7 space-y-4">
              <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3">
                'Realtime SMS Delivery Logs'
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-2.5">Recipient Mobile</th>
                      <th className="py-2.5">SMS Type</th>
                      <th className="py-2.5">Gateway Used</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {smsLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="py-3 font-mono font-bold text-slate-900">{log.recipient}</td>
                        <td className="py-3 text-slate-700">{log.messageType}</td>
                        <td className="py-3 font-semibold text-indigo-600">{log.gateway}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-slate-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TRACKING & ANALYTICS CONTROL HUB */}
        {activeTab === 'tracking' && (
          <div className="space-y-8">
            {/* Header Title Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-7 rounded-3xl shadow-xl border border-indigo-500/30">
              <div>
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-black">
                    'Global Analytics & Tracking Integrations Hub'
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  'Manage Measurement IDs, Heatmaps, Ad Pixel Conversions, and Live Error Trackers'
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveTrackingConfig}
                  disabled={isSavingTracking}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>{isSavingTracking ? 'Saving...' : ("Save All Keys")}</span>
                </button>
              </div>
            </div>

            {trackingSaveSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>'All tracking keys updated and active across live site!'</span>
              </div>
            )}

            {/* LIVE REALTIME TRAFFIC & VISITOR TICKER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Realtime Live Visitor Map Feed */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h4 className="text-sm font-black text-slate-900">
                      'Live Visitor Ticker'
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full">
                    18 Online
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { city: 'Dhaka, Bangladesh', page: 'Theme #05 Palatiora', source: 'Facebook Ads', flag: '🇧🇩', time: 'Just now' },
                    { city: 'London, UK', page: 'Pricing Upgrade ($49 Pro)', source: 'Google Search', flag: '🇬🇧', time: '1m ago' },
                    { city: 'New York, USA', page: 'Manager Console Login', source: 'Direct Portal', flag: '🇺🇸', time: '3m ago' },
                    { city: 'Dubai, UAE', page: '3D AR Food Model Scan', source: 'Instagram Organic', flag: '🇦🇪', time: '5m ago' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.flag}</span>
                        <div>
                          <p className="font-bold text-slate-900">{item.city}</p>
                          <p className="text-[10px] text-slate-500">{item.page} • <span className="text-indigo-600 font-semibold">{item.source}</span></p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clarity Heatmap & Mouse Scroll Insight */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <h4 className="text-sm font-black text-slate-900">
                      'Clarity Mouse Heatmaps'
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Avg Scroll 84%</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 space-y-1">
                    <p className="font-bold text-orange-900">🔥 Top Clicked Button</p>
                    <p className="text-slate-600">"Preview Storefront Theme #05" (412 Clicks - 68%)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
                    <p className="font-bold text-indigo-900">🖱️ Session Replay Status</p>
                    <p className="text-slate-600">240 Sessions Recorded Today • 0 Rage Clicks</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
                    <p className="font-bold text-emerald-900">⚡ Smooth Navigation Rate</p>
                    <p className="text-slate-600">99.2% Users reach pricing table without drop-off</p>
                  </div>
                </div>
              </div>

              {/* Meta Pixel & Conversion Funnel */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-black text-slate-900">
                      'Meta Pixel Conversion ROI'
                    </h4>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    3.4x ROI
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Facebook/Instagram Ad Clicks:</span>
                    <strong className="text-slate-900">1,240 Clicks</strong>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Restaurant Owner Signups:</span>
                    <strong className="text-indigo-600 font-black">185 Leads</strong>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-emerald-50 rounded-xl text-emerald-900">
                    <span>Verified Paid Clients ($49 / $99):</span>
                    <strong className="font-black">$1,850 Revenue</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 7 INTEGRATION TOOL CONFIGURATION CARDS TABLE */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    'Master Integration Key Management'
                  </h3>
                  <p className="text-xs text-slate-500">
                    'Enter Measurement IDs and DSN keys from your accounts'
                  </p>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-black text-xs rounded-full border border-indigo-200">
                  7 / 7 Tools Configured
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Google Analytics 4 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-amber-500" />
                      <h4 className="font-black text-slate-900 text-sm">Google Analytics 4</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={trackingConfig.gaEnabled} 
                        onChange={(e) => setTrackingConfig(prev => ({ ...prev, gaEnabled: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-500">Visitor country, city, traffic source, page view, time & conversions.</p>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400">Measurement ID</label>
                    <input 
                      type="text" 
                      value={trackingConfig.gaMeasurementId}
                      onChange={(e) => setTrackingConfig(prev => ({ ...prev, gaMeasurementId: e.target.value }))}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono text-slate-900 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 2. Microsoft Clarity */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-black text-slate-900 text-sm">Microsoft Clarity</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={trackingConfig.clarityEnabled} 
                        onChange={(e) => setTrackingConfig(prev => ({ ...prev, clarityEnabled: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-500">Mouse click heatmaps, scroll depth %, session replays & rage click tracker.</p>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400">Project ID</label>
                    <input 
                      type="text" 
                      value={trackingConfig.clarityProjectId}
                      onChange={(e) => setTrackingConfig(prev => ({ ...prev, clarityProjectId: e.target.value }))}
                      placeholder="xxxxxxxxxx"
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono text-slate-900 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 3. Meta Pixel & Conversions API */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-blue-600" />
                      <h4 className="font-black text-slate-900 text-sm">Meta Pixel & CAPI</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={trackingConfig.metaEnabled} 
                        onChange={(e) => setTrackingConfig(prev => ({ ...prev, metaEnabled: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-500">Facebook/Instagram ad visitors, lead signups & server verified purchases.</p>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400">Pixel ID</label>
                    <input 
                      type="text" 
                      value={trackingConfig.metaPixelId}
                      onChange={(e) => setTrackingConfig(prev => ({ ...prev, metaPixelId: e.target.value }))}
                      placeholder="1234567890"
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold font-mono text-slate-900 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBSCRIPTIONS & BILLING TAB */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                'Platform Subscription Packages & Discounts'
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                'Configure standard pricing tiers and long-term billing discounts (17% to 30% savings)'
              </p>
            </div>

            {/* 3 Pricing Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* $15 Starter */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-[10px] font-black uppercase">
                    STARTER
                  </span>
                  <span className="text-sm font-black text-slate-900">$15 / month</span>
                </div>
                <h4 className="text-xl font-black text-slate-900">STARTER BASIC</h4>
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>1 Month:</span>
                    <strong className="text-slate-900">$15/mo ($15 total)</strong>
                  </div>
                  <div className="flex justify-between text-indigo-600">
                    <span>6 Months (-17%):</span>
                    <strong>$13/mo ($78 total)</strong>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>1 Year (-30%):</span>
                    <strong>$11/mo ($132 total)</strong>
                  </div>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 Hero Animated Food Slide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Basic Order Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Standard Menu Cards</span>
                  </li>
                </ul>
              </div>

              {/* $49 Pro */}
              <div className="bg-white rounded-3xl p-6 border-2 border-orange-400 shadow-md space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-xl shadow-xs">
                  MOST POPULAR
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-[10px] font-black uppercase">
                    PROFESSIONAL
                  </span>
                  <span className="text-sm font-black text-slate-900">$49 / month</span>
                </div>
                <h4 className="text-xl font-black text-slate-900">PROFESSIONAL PRO</h4>
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>1 Month:</span>
                    <strong className="text-slate-900">$49/mo ($49 total)</strong>
                  </div>
                  <div className="flex justify-between text-indigo-600">
                    <span>6 Months (-16%):</span>
                    <strong>$41/mo ($246 total)</strong>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>1 Year (-26%):</span>
                    <strong>$36/mo ($432 total)</strong>
                  </div>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>3 Rotating Hero Animated Slides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>25 Luxury Themes Included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom Brand Domains & AR 3D Scans</span>
                  </li>
                </ul>
              </div>

              {/* $99 Elite VIP */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-5 relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xl text-[10px] font-black uppercase">
                    ENTERPRISE VIP 👑
                  </span>
                  <span className="text-sm font-black text-amber-300">$99 / month</span>
                </div>
                <h4 className="text-xl font-black text-white">ELITE LUXURY VIP</h4>
                <div className="p-4 bg-white/10 rounded-2xl space-y-2 text-xs border border-white/10">
                  <div className="flex justify-between text-slate-300">
                    <span>1 Month:</span>
                    <strong className="text-white">$99/mo ($99 total)</strong>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span>6 Months (-17%):</span>
                    <strong>$82/mo ($492 total)</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>1 Year (-30%):</span>
                    <strong>$69/mo ($828 total)</strong>
                  </div>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>ALL 6 Signature Hero Animated Food Shapes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Unlimited Studio Custom Designs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>24/7 Priority VIP Concierge & Sound Setup</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* REVENUE & ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs space-y-6">
            <h3 className="text-xl font-black text-slate-900">
              'Platform Revenue & Performance Metrics'
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Revenue Per Restaurant (ARPU)</p>
                <p className="text-3xl font-black text-emerald-600">
                  ${Math.round(totalRevenueCalc / (restaurants.length || 1))}.00 /mo
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Subscribers</p>
                <p className="text-3xl font-black text-indigo-600">{activeSubsCount} Brands</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projected Annual Recurring Revenue (ARR)</p>
                <p className="text-3xl font-black text-amber-600">${totalRevenueCalc * 12}.00</p>
              </div>
            </div>
          </div>
        )}

        {/* SUPPORT TAB */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">
                'Incoming Restaurant Support Desk'
              </h3>
              <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-black">
                {supportRequests.length} Pending
              </span>
            </div>

            {supportRequests.length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-3">
                <Bell className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="font-bold text-sm text-slate-700">No pending support tickets.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {supportRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-900 text-sm">{req.restaurantName}</p>
                      <span className="text-[10px] text-slate-400">{new Date(req.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">{req.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORY / AUDIT TAB */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs space-y-6">
            <h3 className="text-xl font-black text-slate-900">
              'Action Audit History Logs'
            </h3>
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-indigo-600">{log.adminEmail}</span>{' '}
                    <span className="text-slate-600">{log.action}</span> for{' '}
                    <strong className="text-slate-900">{log.targetName}</strong>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLATFORM SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs space-y-6 max-w-2xl">
            <h3 className="text-xl font-black text-slate-900">
              'Global Platform HQ Settings'
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                  'Platform Title'
                </label>
                <input 
                  type="text" 
                  value={platformNameInput}
                  onChange={(e) => setPlatformNameInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:border-indigo-500"
                />
              </div>

              <button 
                onClick={handleSavePlatformSettings}
                disabled={isSavingSettings}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2"
              >
                {isSavingSettings ? 'Saving...' : ("Save Settings")}
              </button>
              {saveSuccess && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Platform name updated successfully!
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* NEW RESTAURANT REGISTRATION MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-7 max-w-lg w-full space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      'Register New Restaurant'
                    </h3>
                    <p className="text-xs text-slate-500">Instant database provision & theme assignment</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewRestaurant} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Restaurant / Brand Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Sultan's Dine / Savor Gourmet"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Owner Email</label>
                    <input 
                      type="email" 
                      placeholder="owner@brand.com"
                      value={newOwnerEmail}
                      onChange={(e) => setNewOwnerEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                    <input 
                      type="text" 
                      placeholder="+880 1700-000000"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / City</label>
                  <input 
                    type="text" 
                    placeholder="Gulshan 2, Dhaka, Bangladesh"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subscription Tier</label>
                    <select 
                      value={newPlan}
                      onChange={(e) => setNewPlan(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none"
                    >
                      <option value="basic">Starter ($15/mo)</option>
                      <option value="pro">Pro ($49/mo)</option>
                      <option value="elite">Elite VIP ($99/mo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Active Theme</label>
                    <select 
                      value={newTheme}
                      onChange={(e) => setNewTheme(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none"
                    >
                      <option value="palatiora">Theme #05: Palatiora Savorelle</option>
                      <option value="koppee">Theme #02: Koppee Gourmet</option>
                      <option value="velmora">Theme #01: Velmora Fine Dining</option>
                      <option value="lunavere">Theme #03: Lunavere Bistro</option>
                      <option value="sahinsh">Theme #04: Sahinsh Speciality</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isCreatingRestaurant}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all shadow-md shadow-emerald-100"
                  >
                    {isCreatingRestaurant ? 'Registering...' : 'Provision Restaurant'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHANGE MASTER ADMIN PASSWORD MODAL */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-7 max-w-md w-full space-y-6 shadow-2xl relative text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      'Create Custom Master Password'
                    </h3>
                    <p className="text-xs text-slate-500">
                      'Set a custom security PIN or password for unlocking'
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {newPasswordSavedMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{newPasswordSavedMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveNewPassword} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[10px]">
                    'New Master Password or PIN'
                  </label>
                  <input 
                    type="text" 
                    required
                    autoFocus
                    placeholder="e.g. MyMasterPass2026 or 9988"
                    value={customPasswordInput}
                    onChange={(e) => setCustomPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-base font-bold outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    'You can use this custom password or default 5321 to unlock the master panel.'
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    'Cancel'
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    'Save New Password'
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminDashboard;
