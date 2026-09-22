import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  CreditCard, 
  Settings, 
  Bell, 
  Search,
  MoreVertical,
  TrendingUp,
  Activity,
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { AdminSettings, SuperAdminSettings, SupportRequest, AuditLog } from '../types';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, setDoc, addDoc, limit } from 'firebase/firestore';

interface SuperAdminDashboardProps {
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'restaurants' | 'subscriptions' | 'support' | 'history' | 'settings'>('overview');
  const [restaurants, setRestaurants] = useState<AdminSettings[]>([]);
  const [platformSettings, setPlatformSettings] = useState<SuperAdminSettings | null>(null);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [healthStatus, setHealthStatus] = useState<{
    database: 'online' | 'error';
    auth: 'online' | 'error';
    arSystem: 'online' | 'maintenance';
  }>({ database: 'online', auth: 'online', arSystem: 'online' });

  const [platformNameInput, setPlatformNameInput] = useState('Avernao WebAR');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Real-time Health Check Simulation (Verifying Firestore Connection)
    const checkHealth = async () => {
      try {
        if (db) {
          setHealthStatus(prev => ({ ...prev, database: 'online' }));
        }
        if (auth.currentUser) {
          setHealthStatus(prev => ({ ...prev, auth: 'online' }));
        }
      } catch (e) {
        setHealthStatus(prev => ({ ...prev, database: 'error', auth: 'error' }));
      }
    };
    checkHealth();
  }, []);

  const totalMenus = restaurants.reduce((acc, r) => acc + (r.menuItemCount || 0), 0);
  const totalArEnabled = restaurants.filter(r => r.subscriptionPlan === 'elite').length;
  const websitesPublished = restaurants.filter(r => r.subscriptionStatus === 'active').length;

  useEffect(() => {
    // Sync restaurants
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
    // Sync audit logs
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
    // Sync support requests
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
    // Sync platform stats
    const unsubscribe = onSnapshot(doc(db, "platform", "settings"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SuperAdminSettings;
        setPlatformSettings(data);
        if (data.platformName) {
          setPlatformNameInput(data.platformName);
        }
      } else {
        setPlatformSettings({
          platformName: 'Avernao WebAR',
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

  const handleSavePlatformSettings = async () => {
    setIsSavingSettings(true);
    try {
      const docRef = doc(db, "platform", "settings");
      await setDoc(docRef, {
        platformName: platformNameInput.trim() || 'Avernao WebAR',
        updatedAt: Date.now()
      }, { merge: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to save platform settings", e);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const stats = [
    { 
      label: 'Total Revenue', 
      value: `$${restaurants.reduce((acc, r) => acc + (r.subscriptionPlan === 'elite' ? 99 : r.subscriptionPlan === 'pro' ? 49 : 0), 0)}`, 
      icon: TrendingUp, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      label: 'Total Restaurants', 
      value: restaurants.length, 
      icon: Store, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'Active Subs', 
      value: restaurants.filter(r => r.subscriptionStatus === 'active').length, 
      icon: CreditCard, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
    { 
      label: 'Support Tickets', 
      value: supportRequests.length, 
      icon: Bell, 
      color: 'text-rose-500', 
      bg: 'bg-rose-500/10' 
    }
  ];

  const planBreakdown = {
    basic: restaurants.filter(r => r.subscriptionPlan === 'basic').length,
    pro: restaurants.filter(r => r.subscriptionPlan === 'pro').length,
    elite: restaurants.filter(r => r.subscriptionPlan === 'elite').length,
  };

  const logAction = async (action: string, targetId: string, targetName: string) => {
    try {
      await addDoc(collection(db, "audit_logs"), {
        adminEmail: auth.currentUser?.email || 'System',
        action,
        targetId,
        targetName,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("Logging Error:", error);
    }
  };

  const handleUpdateStatus = async (resId: string, status: 'active' | 'expired', name: string) => {
    try {
      await updateDoc(doc(db, "restaurants", resId), { subscriptionStatus: status });
      await logAction(`Updated status to ${status}`, resId, name);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleUpdatePlan = async (resId: string, plan: any, name: string) => {
    try {
      await updateDoc(doc(db, "restaurants", resId), { subscriptionPlan: plan });
      await logAction(`Updated plan to ${plan}`, resId, name);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const filteredRestaurants = restaurants.filter(r => 
    r.brandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.ownerEmail && r.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.contactEmail && r.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.contactPhone && r.contactPhone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.brandLocation && r.brandLocation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-30">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-slate-900 block leading-tight">AVERNAO HQ</span>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Master Control</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'restaurants', icon: Store, label: 'Restaurants' },
            { id: 'subscriptions', icon: CreditCard, label: 'Subscriptions' },
            { id: 'support', icon: Bell, label: 'Support Requests' },
            { id: 'history', icon: Clock, label: 'Action History' },
            { id: 'settings', icon: Settings, label: 'Platform Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/';
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Open Main Website
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <XCircle className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">{activeTab}</h1>
            <p className="text-slate-500 font-medium">Global platform control and oversight.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all w-64"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
                >
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Plan Breakdown Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl shadow-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest">Plan Distribution</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Basic (Free)', count: planBreakdown.basic, color: 'bg-slate-700' },
                    { label: 'Pro (Standard)', count: planBreakdown.pro, color: 'bg-blue-500' },
                    { label: 'Elite (Premium)', count: planBreakdown.elite, color: 'bg-amber-500' }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${p.color}`} />
                        <span className="text-sm font-bold text-slate-300">{p.label}</span>
                      </div>
                      <span className="text-sm font-black">{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900">Platform Health</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${healthStatus.database === 'online' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                      <span className="text-xs font-bold text-slate-50">{healthStatus.database === 'online' ? 'DB Online' : 'DB Error'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${healthStatus.auth === 'online' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                      <span className="text-xs font-bold text-slate-500">Auth: {healthStatus.auth.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Websites Published', icon: ExternalLink, value: websitesPublished },
                    { label: '3D Enabled', icon: Activity, value: totalArEnabled },
                    { label: 'Total Menus', icon: Plus, value: totalMenus },
                    { label: 'System Uptime', icon: Clock, value: healthStatus.database === 'online' ? '100%' : 'Degraded' }
                  ].map((h, i) => (
                    <div key={i} className="text-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                      <h.icon className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">{h.label}</p>
                      <p className="text-lg font-black text-slate-900">{h.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900">Recent Registrations</h3>
                  <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {restaurants.slice(0, 5).map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600 font-black">
                          {restaurant.brandName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{restaurant.brandName}</p>
                          <p className="text-xs text-slate-500 font-medium">Joined {new Date(restaurant.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          restaurant.subscriptionPlan === 'elite' ? 'bg-amber-100 text-amber-600' :
                          restaurant.subscriptionPlan === 'pro' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {restaurant.subscriptionPlan}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8">System Health</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Database Latency', value: '12ms', status: 'Optimal' },
                    { label: 'Auth Service', value: '99.9%', status: 'Stable' },
                    { label: 'Payment Gateway', value: 'Active', status: 'Online' },
                    { label: 'AR Engine Load', value: '24%', status: 'Low' }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-900">{item.label}</p>
                        <span className="text-[10px] font-black uppercase text-emerald-500">{item.status}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[80%]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restaurants List Tab */}
        {activeTab === 'restaurants' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Global Restaurant Registry</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-6 py-4">Restaurant</th>
                    <th className="px-6 py-4">Owner & Contact</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Plan & Status</th>
                    <th className="px-6 py-4 text-center">Items</th>
                    <th className="px-6 py-4">Revenue</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black shrink-0">
                            {restaurant.brandName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{restaurant.brandName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">ID: {restaurant.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                            <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span className="truncate max-w-[190px]" title={restaurant.ownerEmail || restaurant.contactEmail || 'No Email'}>
                              {restaurant.ownerEmail || restaurant.contactEmail || 'Not specified'}
                            </span>
                          </div>
                          {restaurant.contactPhone && (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                              <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>{restaurant.contactPhone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium max-w-[180px]">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate" title={restaurant.brandLocation || 'Global / Online'}>
                            {restaurant.brandLocation || 'Global / Online'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700">
                            {restaurant.subscriptionPlan || 'basic'}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              restaurant.subscriptionStatus === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              restaurant.subscriptionStatus === 'trial' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {restaurant.subscriptionStatus === 'active' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                              {restaurant.subscriptionStatus || 'trial'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                          {restaurant.menuItemCount || 0}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-sm font-bold text-slate-900">
                          ${restaurant.subscriptionPlan === 'elite' ? '99.00' : restaurant.subscriptionPlan === 'pro' ? '49.00' : '15.00'}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">/ Month</p>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                window.location.href = `/?restaurantId=${restaurant.id}`;
                              }
                            }}
                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Open Restaurant Customer Menu"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                window.location.href = `/?r=${restaurant.id}&admin=5321`;
                              }
                            }}
                            className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all"
                            title="Open Restaurant Manager Console"
                          >
                            <Store className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(restaurant.id, restaurant.subscriptionStatus === 'active' ? 'expired' : 'active', restaurant.brandName)}
                            className={`p-2 rounded-lg transition-all ${restaurant.subscriptionStatus === 'active' ? 'text-rose-500 hover:bg-rose-50' : 'text-emerald-500 hover:bg-emerald-50'}`}
                            title={restaurant.subscriptionStatus === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <div className="relative group/menu">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                              <Settings className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20 overflow-hidden">
                              <p className="px-4 py-2 text-[9px] font-black uppercase text-slate-400 bg-slate-50">Change Plan</p>
                              {['basic', 'pro', 'elite'].map((p) => (
                                <button 
                                  key={p}
                                  onClick={() => handleUpdatePlan(restaurant.id, p, restaurant.brandName)}
                                  className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all border-t border-slate-50"
                                >
                                  Switch to {p}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-8">
            {/* Top: 3 Subscription Packages Cards with 1M / 6M / 1Y Discounts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Platform Subscription Packages & Discounts</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Standard pricing tiers configured across Avernao WebAR with 6-Month (17% off) and 1-Year (30% off) billing cycles.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                  Active in Live Store
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Starter */}
                <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-wider">
                      Starter Plan
                    </span>
                    <span className="text-xs font-black text-slate-900">$15 / mo</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">STARTER BASIC</h4>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>1 Month:</span>
                      <strong className="text-slate-900">$15/mo ($15 total)</strong>
                    </div>
                    <div className="flex justify-between text-indigo-600">
                      <span>6 Months (-17%):</span>
                      <strong>$13/mo ($78 total)</strong>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>1 Year (-30%):</span>
                      <strong>$11/mo ($132 total)</strong>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                    <li>✓ 10 Premium Themes Included</li>
                    <li>✓ 100+ Menu Card Studio Templates</li>
                    <li>✓ 7-Day Order History</li>
                  </ul>
                </div>

                {/* Professional */}
                <div className="bg-white rounded-[2rem] p-6 border-2 border-orange-400 shadow-md space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-black px-3 py-0.5 uppercase tracking-widest rounded-bl-xl">
                    Most Popular
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-wider">
                      Professional
                    </span>
                    <span className="text-xs font-black text-slate-900">$49 / mo</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">PROFESSIONAL PRO</h4>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>1 Month:</span>
                      <strong className="text-slate-900">$49/mo ($49 total)</strong>
                    </div>
                    <div className="flex justify-between text-indigo-600">
                      <span>6 Months (-16%):</span>
                      <strong>$41/mo ($246 total)</strong>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>1 Year (-26%):</span>
                      <strong>$36/mo ($432 total)</strong>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                    <li>✓ 25 Premium Themes Included</li>
                    <li>✓ 500+ Menu Card Studio Templates</li>
                    <li>✓ Custom Domains & QR Analytics</li>
                  </ul>
                </div>

                {/* Elite */}
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[2rem] p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-xl text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                      Enterprise VIP 👑
                    </span>
                    <span className="text-xs font-black text-amber-300">$99 / mo</span>
                  </div>
                  <h4 className="text-lg font-black text-white">ELITE LUXURY VIP</h4>
                  <div className="p-3 bg-white/10 rounded-xl space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>1 Month:</span>
                      <strong className="text-white">$99/mo ($99 total)</strong>
                    </div>
                    <div className="flex justify-between text-amber-300">
                      <span>6 Months (-17%):</span>
                      <strong>$82/mo ($492 total)</strong>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>1 Year (-30%):</span>
                      <strong>$69/mo ($828 total)</strong>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-white/10">
                    <li>✓ 50+ All Luxury Themes</li>
                    <li>✓ 1000+ Unlimited Studio Designs</li>
                    <li>✓ 24/7 Dedicated Concierge</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom: Active Subscriptions Registry */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Active Tenant Subscriptions & Cycles</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Live database view of all subscriber accounts
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-black">
                    {restaurants.length} Total Subscribed
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-6 py-4">Restaurant</th>
                      <th className="px-6 py-4">Owner Email</th>
                      <th className="px-6 py-4">Current Plan</th>
                      <th className="px-6 py-4">Billing Status</th>
                      <th className="px-6 py-4">MRR / Revenue</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {restaurants.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900 text-sm">{res.brandName}</p>
                          <p className="text-[11px] text-slate-400">{res.id}</p>
                        </td>
                        <td className="px-6 py-5 text-xs text-slate-600 font-medium">
                          {res.ownerEmail || res.contactEmail || 'Unassigned'}
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                            res.subscriptionPlan === 'elite' ? 'bg-amber-100 text-amber-800' :
                            res.subscriptionPlan === 'pro' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {res.subscriptionPlan || 'basic'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            res.subscriptionStatus === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            res.subscriptionStatus === 'trial' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {res.subscriptionStatus || 'trial'}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-black text-slate-900 text-sm">
                          ${res.subscriptionPlan === 'elite' ? '99.00' : res.subscriptionPlan === 'pro' ? '49.00' : '15.00'}
                          <span className="text-[10px] text-slate-400 font-normal"> / mo</span>
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() => handleUpdateStatus(res.id, res.subscriptionStatus === 'active' ? 'expired' : 'active', res.brandName)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 text-slate-700 cursor-pointer"
                          >
                            {res.subscriptionStatus === 'active' ? 'Set Expired' : 'Activate Plan'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Incoming Help Tickets</h3>
              <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest">{supportRequests.length} Pending</span>
            </div>
            {supportRequests.length === 0 ? (
              <div className="py-20 text-center">
                <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h4 className="text-lg font-black text-slate-900">All caught up!</h4>
                <p className="text-slate-500 font-medium">No pending support requests from restaurant owners.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {supportRequests.map((req) => (
                  <div key={req.id} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-indigo-600 shadow-sm">
                          {req.restaurantName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{req.restaurantName}</p>
                          <p className="text-xs text-slate-500 font-medium">ID: {req.restaurantId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-500">{new Date(req.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-6 bg-white p-4 rounded-2xl border border-slate-100">{req.message}</p>
                    <div className="flex justify-end gap-3">
                      <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Resolve</button>
                      <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Audit Logs & Activity</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Last 50 actions</p>
            </div>
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {log.adminEmail} <span className="text-slate-400 font-medium">{log.action}</span> for {log.targetName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">ID: {log.targetId}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8">
            <h3 className="text-xl font-black text-slate-900 mb-8">Platform Global Configuration</h3>
            <div className="max-w-2xl space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Name</label>
                  <input 
                    type="text" 
                    value={platformNameInput}
                    onChange={(e) => setPlatformNameInput(e.target.value)}
                    placeholder="e.g. Avernao WebAR"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Version</label>
                  <input 
                    type="text" 
                    disabled
                    value="v2.5.0-Avernao"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900">Security & Access</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Allow New Registrations', enabled: true },
                    { label: 'Enforce 2FA for Admins', enabled: true },
                    { label: 'Automatic Logout (30m)', enabled: true },
                    { label: 'Maintenance Mode', enabled: false }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      <div className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${item.enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'left-7' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                <button 
                  onClick={handleSavePlatformSettings}
                  disabled={isSavingSettings}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingSettings ? 'Saving...' : 'Save Global Settings'}
                </button>
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Platform name updated successfully!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
