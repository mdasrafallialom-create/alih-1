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
  ChevronRight
} from 'lucide-react';
import { AdminSettings, SuperAdminSettings, SupportRequest, AuditLog } from '../types';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, limit } from 'firebase/firestore';

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
        setPlatformSettings(snapshot.data() as SuperAdminSettings);
      }
    }, (err) => {
      console.warn("Platform settings sync warning:", err);
    });
    return () => unsubscribe();
  }, []);

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
    r.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">MASTER ADMIN</span>
        </div>

        <nav className="flex-grow px-4 space-y-1">
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

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <XCircle className="w-5 h-5" />
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
                    <th className="px-8 py-4">Restaurant</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-center">Catalog Size</th>
                    <th className="px-8 py-4">Plan</th>
                    <th className="px-8 py-4">Revenue</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black">
                            {restaurant.brandName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{restaurant.brandName}</p>
                            <p className="text-xs text-slate-500 font-medium">ID: {restaurant.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          restaurant.subscriptionStatus === 'active' ? 'bg-emerald-100 text-emerald-600' :
                          restaurant.subscriptionStatus === 'trial' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                        }`}>
                          {restaurant.subscriptionStatus === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {restaurant.subscriptionStatus}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
                          <Plus className="w-3 h-3 text-indigo-500" />
                          {restaurant.menuItemCount || 0}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-700 capitalize">{restaurant.subscriptionPlan}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-900">
                          ${restaurant.subscriptionPlan === 'elite' ? '99.00' : restaurant.subscriptionPlan === 'pro' ? '49.00' : '0.00'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/ Month</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
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
                    value={platformSettings?.platformName || 'L\'Aura WebAR'}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Version</label>
                  <input 
                    type="text" 
                    disabled
                    value="v2.4.0-premium"
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

              <div className="pt-4 border-t border-slate-100">
                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                  Save Global Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
