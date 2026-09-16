#!/bin/bash
cat << 'EOF' > /src/components/OrderManagementAdmin.tsx
import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { ActiveOrderCard } from './ActiveOrderCard';
import QrCodeManager from './QrCodeManager';
import { 
  Filter, 
  Search, 
  Download, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ListOrdered, 
  FileCheck2, 
  PieChart, 
  ChevronRight,
  User,
  Phone,
  CreditCard,
  Plus,
  QrCode,
  ShieldCheck,
  Lock,
  KeyRound,
  ShieldAlert,
  X,
  Settings,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Zap,
  Globe,
  LogOut,
  Home,
  Palette,
  Type,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
  Smartphone,
  ExternalLink,
  Image,
  RefreshCw,
  CloudDownload,
  Save,
  Moon,
  Sun,
  History,
  LayoutDashboard,
  Utensils,
  BarChart3
} from 'lucide-react';

interface OrderManagementAdminProps {
  orders: Order[];
  managerSession?: { name: string; email: string; role: string } | null;
  onAcceptOrder: (orderId: string) => void;
  onNextStatus: (orderId: string) => void;
  onServeOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onClearHistory: () => void;
  onUpdatePaymentStatus?: (orderId: string, status: 'Pending' | 'Paid' | 'Refunded', verifiedBy?: string, txnId?: string) => void;
  activeTablesCount?: number;
  cookingCount?: number;
  servedCount?: number;
  revenue?: number;
  settings: {
    audioEnabled: boolean;
    autoAcceptOrders: boolean;
    securityPinRequired: boolean;
    showCustomerContact: boolean;
    brandName: string;
    brandLocation: string;
    socialLinks: {
      facebook: string;
      youtube: string;
      instagram: string;
      tiktok: string;
    };
  };
  onUpdateSettings: (settings: any) => void;
  onTriggerGlobalUpdate?: () => Promise<void>;
  lang: 'en' | 'bn' | 'ar';
  setLang: (lang: 'en' | 'bn' | 'ar') => void;
  user: any;
  onLogout: () => void;
}

export default function OrderManagementAdmin({
  orders,
  managerSession,
  onAcceptOrder,
  onNextStatus,
  onServeOrder,
  onCancelOrder,
  onDeleteOrder,
  onClearHistory,
  onUpdatePaymentStatus,
  activeTablesCount,
  cookingCount,
  servedCount,
  revenue,
  settings,
  onUpdateSettings,
  onTriggerGlobalUpdate,
  lang,
  setLang,
  user,
  onLogout
}: OrderManagementAdminProps) {
  const [activeNavTab, setActiveNavTab] = useState<'recent' | 'history' | 'financial' | 'analytics' | 'pipelines' | 'qrcodes' | 'settings'>('recent');
  const [activeSettingsTab, setActiveSettingsTab] = useState<'main' | 'general' | 'brand' | 'profile' | 'software'>('main');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Confirmed' | 'Completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [localBrandSettings, setLocalBrandSettings] = useState({
    brandName: settings.brandName || '',
    brandLocation: settings.brandLocation || '',
    socialLinks: settings.socialLinks || { facebook: '', instagram: '', youtube: '', tiktok: '' }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [verifyingOrder, setVerifyingOrder] = useState<Order | null>(null);
  const [managerPinInput, setManagerPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleUpdateStatus = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    if (order.status === 'Pending') onAcceptOrder(orderId);
    else if (order.status === 'Confirmed') onNextStatus(orderId);
    else if (order.status === 'Kitchen') onNextStatus(orderId);
    else if (order.status === 'Serving') onServeOrder(orderId);
  };

  const handleCancelOrder = (orderId: string) => {
    const reason = window.prompt('Enter cancellation reason:');
    if (reason) onCancelOrder(orderId, reason);
  };

  const handleAuthorizePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (managerPinInput === 'admin123' && verifyingOrder && onUpdatePaymentStatus) {
      onUpdatePaymentStatus(verifyingOrder.id, 'Paid');
      setVerifyingOrder(null);
      setManagerPinInput('');
    } else {
      setPinError('Invalid PIN');
    }
  };

  const now = Date.now();
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
  const currentOrdersPool = activeNavTab === 'recent' ? orders.filter(o => o.timestamp >= threeDaysAgo) : orders.filter(o => o.timestamp < threeDaysAgo);

  const filteredOrders = currentOrdersPool.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (o.customerName && o.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const daysInSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const dailyLedgerRows = Array.from({ length: daysInSelectedMonth }, (_, i) => {
    const day = i + 1;
    const dayOrders = orders.filter(o => {
      const d = new Date(o.timestamp);
      return d.getDate() === day && d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });
    return {
      dayNumber: day,
      formattedDate: `${day} ${monthNames[selectedMonth]} ${selectedYear}`,
      receivedCount: dayOrders.length,
      deliveredCount: dayOrders.filter(o => o.status === 'Completed').length,
      dailyRevenue: dayOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)
    };
  });

  const totalMonthlyRevenue = dailyLedgerRows.reduce((sum, r) => sum + r.dailyRevenue, 0);
  const totalMonthlyOrders = dailyLedgerRows.reduce((sum, r) => sum + r.receivedCount, 0);
  const totalMonthlyDelivered = dailyLedgerRows.reduce((sum, r) => sum + r.deliveredCount, 0);

  const handleSaveBrandSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateSettings({
        brandName: localBrandSettings.brandName,
        brandLocation: localBrandSettings.brandLocation,
        socialLinks: localBrandSettings.socialLinks
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f0f0f] text-slate-100' : 'bg-[#f3f3f3] text-slate-900'} no-print font-sans`}>
      <div className="flex h-screen overflow-hidden">
        <aside className={`w-72 flex-shrink-0 flex flex-col border-r transition-colors duration-500 ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-[#ebebeb] border-slate-200'}`}>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
              <img src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm truncate w-32">{user?.displayName || "Admin"}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Session</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {[
              { id: 'recent', label: 'Active Dashboard', icon: LayoutDashboard },
              { id: 'history', label: 'Order History', icon: History },
              { id: 'financial', label: 'Financial Control', icon: BarChart3 },
              { id: 'analytics', label: 'AI Analytics', icon: TrendingUp },
              { id: 'pipelines', label: 'Kitchen Pipeline', icon: Utensils },
              { id: 'qrcodes', label: 'QR Management', icon: QrCode },
              { id: 'settings', label: 'System Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNavTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeNavTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-5xl mx-auto">
            {activeNavTab === 'recent' && (
              <div className="space-y-12">
                <header className="space-y-2">
                  <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Active Orders</h1>
                  <p className="text-slate-500 font-medium text-sm">Real-time fulfillment tracking.</p>
                </header>
                <div className="flex gap-2">
                  {['all', 'Pending', 'Confirmed', 'Completed'].map(s => (
                    <button key={s} onClick={() => setFilterStatus(s as any)} className={`px-4 py-2 rounded-xl text-xs font-bold ${filterStatus === s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOrders.map(o => (
                    <ActiveOrderCard key={o.id} order={o} onUpdateStatus={handleUpdateStatus} onCancelOrder={handleCancelOrder} />
                  ))}
                </div>
              </div>
            )}

            {activeNavTab === 'history' && (
               <div className="space-y-12">
                <header className="space-y-2">
                  <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Order Logs</h1>
                  <p className="text-slate-500 font-medium text-sm">Historical archive of transactions.</p>
                </header>
                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'} overflow-hidden`}>
                  <table className="w-full text-left text-sm">
                    <thead className={`border-b ${theme === 'dark' ? 'bg-[#2d2d2d] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500'} font-black uppercase text-[10px] tracking-widest`}>
                      <tr>
                        <th className="py-4 px-6">ID</th>
                        <th className="py-4 px-6">Timestamp</th>
                        <th className="py-4 px-6">Customer</th>
                        <th className="py-4 px-6 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-100'}`}>
                      {orders.slice().reverse().map(o => (
                        <tr key={o.id}>
                          <td className="py-4 px-6 font-mono font-bold text-blue-500">#{o.id.slice(-6).toUpperCase()}</td>
                          <td className="py-4 px-6 text-slate-500">{new Date(o.timestamp).toLocaleString()}</td>
                          <td className="py-4 px-6 font-bold">{o.customerName}</td>
                          <td className="py-4 px-6 text-right font-black">৳{o.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeNavTab === 'financial' && (
              <div className="space-y-12">
                <header className="space-y-2">
                  <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Financial Control</h1>
                  <p className="text-slate-500 font-medium text-sm">Revenue tracking and historical ledger.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-8 rounded-[2rem] border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-black uppercase text-slate-400">Monthly Revenue</span>
                    <p className="text-4xl font-black mt-2">৳{totalMonthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className={`p-8 rounded-[2rem] border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-black uppercase text-slate-400">Order Volume</span>
                    <p className="text-4xl font-black mt-2">{totalMonthlyOrders}</p>
                  </div>
                  <div className={`p-8 rounded-[2rem] border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-black uppercase text-slate-400">Fulfillment</span>
                    <p className="text-4xl font-black mt-2">{totalMonthlyOrders > 0 ? Math.round((totalMonthlyDelivered/totalMonthlyOrders)*100) : 0}%</p>
                  </div>
                </div>
                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'} overflow-hidden`}>
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-inherit font-black uppercase text-[10px] text-slate-500">
                      <tr>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6">Orders</th>
                        <th className="py-4 px-6 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-inherit">
                      {dailyLedgerRows.map(r => (
                        <tr key={r.dayNumber}>
                          <td className="py-4 px-6 font-bold">{r.formattedDate}</td>
                          <td className="py-4 px-6">{r.receivedCount}</td>
                          <td className="py-4 px-6 text-right font-black">৳{r.dailyRevenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeNavTab === 'analytics' && (
              <div className="py-40 flex flex-col items-center justify-center opacity-10">
                <TrendingUp className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-black">AI Analytics stand-by</h3>
              </div>
            )}

            {activeNavTab === 'pipelines' && (
              <div className="py-40 flex flex-col items-center justify-center opacity-10">
                <Utensils className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-black">Kitchen Pipeline stand-by</h3>
              </div>
            )}

            {activeNavTab === 'qrcodes' && <QrCodeManager />}

            {activeNavTab === 'settings' && (
              <div className="space-y-12">
                <header className="space-y-2">
                  <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>System Settings</h1>
                  <p className="text-slate-500 font-medium text-sm">Configure restaurant identity and behavior.</p>
                </header>

                <div className={`rounded-3xl border ${theme === 'dark' ? 'bg-[#1c1c1c] border-slate-800' : 'bg-white border-slate-200'} shadow-sm overflow-hidden`}>
                  <div className="p-8 space-y-8 border-b border-inherit">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black">Brand Identity</h2>
                      <button onClick={handleSaveBrandSettings} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Restaurant Name</label>
                        <input 
                          type="text" 
                          value={localBrandSettings.brandName} 
                          onChange={e => setLocalBrandSettings(prev => ({ ...prev, brandName: e.target.value }))}
                          className={`w-full px-5 py-3 rounded-xl outline-none font-bold ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-700'} border`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                        <input 
                          type="text" 
                          value={localBrandSettings.brandLocation} 
                          onChange={e => setLocalBrandSettings(prev => ({ ...prev, brandLocation: e.target.value }))}
                          className={`w-full px-5 py-3 rounded-xl outline-none font-bold ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-700'} border`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {['facebook', 'instagram', 'youtube', 'tiktok'].map(s => (
                        <div key={s} className={`flex items-center gap-2 p-2 rounded-xl border ${theme === 'dark' ? 'bg-[#2d2d2d] border-transparent' : 'bg-slate-50 border-slate-100'}`}>
                          <Globe className="w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            value={localBrandSettings.socialLinks[s as keyof typeof localBrandSettings.socialLinks]}
                            onChange={e => setLocalBrandSettings(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [s]: e.target.value } }))}
                            placeholder={s}
                            className="w-full bg-transparent text-xs font-bold outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </div>
                      <div>
                        <h2 className="text-lg font-black">Personalization</h2>
                        <p className="text-xs text-slate-500">Toggle dark and light modes.</p>
                      </div>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => setTheme('light')} className={`px-6 py-2 rounded-lg font-bold text-xs ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Light</button>
                      <button onClick={() => setTheme('dark')} className={`px-6 py-2 rounded-lg font-bold text-xs ${theme === 'dark' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}>Dark</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {verifyingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setVerifyingOrder(null)} />
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Authorize Payment</h2>
            <form onSubmit={handleAuthorizePayment} className="space-y-4">
              <input 
                type="password" 
                value={managerPinInput} 
                onChange={e => setManagerPinInput(e.target.value)} 
                placeholder="Manager PIN" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-mono"
              />
              {pinError && <p className="text-red-600 text-xs font-bold">{pinError}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setVerifyingOrder(null)} className="flex-1 py-3 rounded-xl bg-slate-100 font-bold text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">Authorize</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
EOF
rm /src/components/temp_rewrite.sh
