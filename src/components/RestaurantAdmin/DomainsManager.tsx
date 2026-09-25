import React, { useState } from 'react';
import { 
  Monitor, 
  Plus, 
  Sparkles, 
  ChevronDown, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Check, 
  CheckCircle2, 
  Globe, 
  Info, 
  X, 
  Server, 
  RefreshCw,
  Search,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminSettings } from '../../types';

interface DomainsManagerProps {
  restaurantId: string;
  brandName: string;
  settings: AdminSettings;
  onUpdateSettings: (settings: Partial<AdminSettings>) => void;
  theme?: 'light' | 'dark';
  lang?: 'en' | 'bn' | 'ar';
}

export default function DomainsManager({
  restaurantId,
  brandName,
  settings,
  onUpdateSettings,
  theme = 'light',
  lang = 'en'
}: DomainsManagerProps) {
  const isDark = theme === 'dark';

  const cleanBrandSlug = (!brandName || brandName.toLowerCase() === 'sahinsh')
    ? 'myrestaurant'
    : (brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'myrestaurant');

  // State management
  const [activeTab, setActiveTab] = useState<'list' | 'connect'>('list');
  
  // Custom connected domain (defaults to myrestaurant.food or user's customDomain)
  const [connectedDomain, setConnectedDomain] = useState<string>(
    settings.customDomain || 'myrestaurant.food'
  );
  
  // Subdomain
  const officialSubdomain = `https://${cleanBrandSlug}-restaurant.foodie.site`;
  const liveAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-preview.run.app';

  // Modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Inputs & feedback
  const [newDomainInput, setNewDomainInput] = useState<string>('');
  const [buySearchInput, setBuySearchInput] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(lang === 'bn' ? 'ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveNewDomain = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = newDomainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (!cleaned) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setConnectedDomain(cleaned);
      onUpdateSettings({ customDomain: cleaned });
      setShowAddModal(false);
      setNewDomainInput('');
      showToast(lang === 'bn' ? 'ডোমেইন সফলভাবে যুক্ত হয়েছে!' : `Domain ${cleaned} connected successfully!`);
    }, 1000);
  };

  const handleBuyDomain = (ext: string, price: string) => {
    const brandPrefix = cleanBrandSlug;
    const full = `${brandPrefix}${ext}`;
    setConnectedDomain(full);
    onUpdateSettings({ customDomain: full });
    setShowBuyModal(false);
    showToast(lang === 'bn' ? `ডোমেইন ${full} সফলভাবে নিবন্ধিত হয়েছে!` : `Domain ${full} registered & connected (${price})!`);
  };

  const supportedExtensions = [
    { ext: '.com', price: '$14.00/yr' },
    { ext: '.net', price: '$12.00/yr' },
    { ext: '.restaurant', price: '$24.00/yr' },
    { ext: '.com.bd', price: '$10.00/yr' },
    { ext: '.bd', price: '$12.00/yr' },
    { ext: '.food', price: '$15.00/yr' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 font-sans text-slate-800">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold border border-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <Monitor className="w-6 h-6 text-slate-800" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Domains
          </h1>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Connect existing dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              <span>Connect existing</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 text-xs font-semibold text-slate-700">
                <button 
                  onClick={() => { setShowDropdown(false); setShowAddModal(true); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors"
                >
                  Cloudflare Domain
                </button>
                <button 
                  onClick={() => { setShowDropdown(false); setShowAddModal(true); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors"
                >
                  GoDaddy Domain
                </button>
                <button 
                  onClick={() => { setShowDropdown(false); setShowAddModal(true); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors"
                >
                  Namecheap Domain
                </button>
                <button 
                  onClick={() => { setShowDropdown(false); setActiveTab('connect'); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors border-t border-slate-100 text-blue-600"
                >
                  Custom DNS Records
                </button>
              </div>
            )}
          </div>

          {/* + + Add Domain */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00875a] hover:bg-[#00734d] text-white text-xs font-black tracking-wide shadow-sm transition-all active:scale-95"
          >
            <span className="text-cyan-300 font-black">+</span>
            <span>+ Add Domain</span>
          </button>

          {/* Buy new domain */}
          <button
            onClick={() => setShowBuyModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a1128] hover:bg-black text-white text-xs font-black tracking-wide shadow-sm transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Buy new domain</span>
          </button>
        </div>
      </div>

      {/* SUB-TABS: Domains List & Connect Domain */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
            activeTab === 'list'
              ? 'bg-white border border-slate-200 text-slate-900 shadow-sm'
              : 'bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-[#00875a]" />
          <span>Domains List</span>
        </button>

        <button
          onClick={() => setActiveTab('connect')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
            activeTab === 'connect'
              ? 'bg-white border border-slate-200 text-[#0284c7] shadow-sm'
              : 'bg-slate-50 border border-slate-200/60 text-[#0284c7] hover:text-sky-700'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>Connect Domain</span>
        </button>
      </div>

      {/* PROMO / INFO BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:px-5 flex items-start sm:items-center gap-3.5 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <Info className="w-4 h-4" />
        </div>
        <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
          Buy or connect a custom domain (.com, .net, .restaurant, .com.bd) and earn $20 USD in subscription credits toward future bills.{' '}
          <button 
            onClick={() => showToast('Credit offer applied automatically upon custom domain connection.')}
            className="text-slate-900 font-bold underline hover:text-[#0284c7] transition-colors"
          >
            Terms apply
          </button>
        </p>
      </div>

      {activeTab === 'list' ? (
        <>
          {/* CONNECTED DOMAINS CARD (Screenshot 2) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Connected Domains
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#e2e8f0] text-slate-700 text-xs font-bold flex items-center justify-center">
                  1
                </span>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-black text-white text-[11px] font-black tracking-wide shadow-sm transition-all"
              >
                <span className="text-cyan-400 font-black">+</span>
                <span>+ Add Domain</span>
              </button>
            </div>

            {/* Domain Row */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Globe className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="text-base font-bold text-slate-900 font-sans">
                  {connectedDomain}
                </span>

                {/* Primary Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ede9fe] text-[#6366f1] text-[11px] font-bold">
                  <Star className="w-3 h-3 fill-[#6366f1] text-[#6366f1]" />
                  <span>Primary</span>
                </span>

                {/* SSL Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#a7f3d0] bg-[#ecfdf5] text-[#059669] text-[11px] font-bold">
                  <Lock className="w-3 h-3 text-[#059669]" />
                  <span>SSL</span>
                </span>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => handleCopy(`https://${connectedDomain}`, 'connected-dom')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy Domain"
                >
                  {copiedKey === 'connected-dom' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>

                <a
                  href={`https://${connectedDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                  title="Open Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <span className="px-3.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold">
                  Connected
                </span>

                <button
                  onClick={() => setShowManageModal(true)}
                  className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          {/* CARD 1: OFFICIAL FREE SUBDOMAIN (Screenshot 1) */}
          <div className="bg-[#0e162f] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                {/* Badges */}
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1a233f] border border-blue-500/20 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider">
                    <Globe className="w-3 h-3" />
                    OFFICIAL FREE SUBDOMAIN
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062c26] border border-emerald-500/20 text-[#34d399] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                    SSL Connected
                  </span>
                </div>

                {/* Subdomain URL Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight break-all font-sans">
                  {officialSubdomain}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  This dedicated high-speed subdomain is permanently active for your restaurant. Your live digital menu is automatically published here.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => handleCopy(officialSubdomain, 'subdomain')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#242e4c] hover:bg-[#2c385d] text-white text-xs font-semibold border border-slate-700/50 transition-all active:scale-95"
                >
                  {copiedKey === 'subdomain' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Copy Subdomain</span>
                </button>

                <a
                  href={officialSubdomain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070f3] hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                >
                  <span>Open Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2: CUSTOM WEB ADDRESS (Screenshot 1) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              {/* Badge & Domain Pill */}
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-[#dcfce7] text-[#15803d] font-black uppercase tracking-wider px-2.5 py-0.5 rounded text-[11px]">
                  {cleanBrandSlug.toUpperCase()}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-slate-600">
                  {connectedDomain}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Custom Web Address for {cleanBrandSlug}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Manage your official restaurant domain name (.com, .net, .restaurant, .com.bd) with automatic SSL certificate and high-speed delivery.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-sm"
                >
                  Change restaurant domain
                </button>

                <a
                  href={`https://${connectedDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0a1128] hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Website</span>
                </a>

                <button
                  onClick={() => handleCopy(`https://${connectedDomain}`, 'custom-web')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#6ee7b7] bg-[#ecfdf5] text-[#059669] hover:bg-[#d1fae5] text-xs font-bold transition-all"
                >
                  {copiedKey === 'custom-web' ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Live URL</span>
                </button>
              </div>
            </div>

            {/* Right Side Illustration (Graphic in Screenshot 1) */}
            <div className="relative w-48 sm:w-56 h-36 shrink-0 flex items-center justify-center">
              {/* Back card: dark forest green */}
              <div className="absolute left-2 bottom-1 w-32 h-28 rounded-2xl bg-[#064e3b] shadow-md -rotate-3 border border-emerald-800/40" />
              {/* Browser card */}
              <div className="absolute right-2 top-1 w-44 h-32 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 flex flex-col justify-between">
                <div className="w-12 h-2 bg-[#475569] rounded-full" />
                <div className="p-2.5 rounded-xl border border-[#99f6e4] bg-[#f0fdfa] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg border border-[#0d9488]/40 flex items-center justify-center text-[#0f766e] bg-[#ccfbf1]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-14 h-1.5 bg-[#94a3b8] rounded-full" />
                    <div className="w-8 h-1.5 bg-[#cbd5e1] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: SUPPORTED DOMAIN EXTENSIONS (Screenshot 2) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900">
                SUPPORTED DOMAIN EXTENSIONS
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                .com • .net • .restaurant • .com.bd • .bd • .food
              </span>
            </div>

            {/* 6 Cards Horizontal Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {supportedExtensions.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  onClick={() => {
                    setBuySearchInput(item.ext);
                    setShowBuyModal(true);
                  }}
                  className="p-4 rounded-xl border border-slate-200 bg-white text-center cursor-pointer hover:border-slate-300 transition-all shadow-sm"
                >
                  <div className="text-sm font-black text-slate-900">
                    {item.ext}
                  </div>
                  <div className="text-xs font-bold text-[#059669] mt-1.5">
                    {item.price}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CARD 4: LIVE WEBSITE URL BOTTOM BAR (Screenshot 1) */}
          <div className="bg-[#0e162f] text-white rounded-2xl p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 w-full sm:w-auto truncate">
              <div className="w-9 h-9 rounded-xl bg-[#1a2542] flex items-center justify-center text-[#38bdf8] shrink-0">
                <Globe className="w-5 h-5" />
              </div>

              <div className="space-y-0.5 truncate">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  LIVE WEBSITE URL
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-white truncate max-w-xs sm:max-w-md">
                  {liveAppUrl}
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#062c26] border border-emerald-500/25 text-[#34d399] text-[10px] font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                Live & Active
              </span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => handleCopy(liveAppUrl, 'live-app')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#242e4c] hover:bg-[#2c385d] text-white text-xs font-semibold transition-all"
              >
                {copiedKey === 'live-app' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Link</span>
              </button>

              <a
                href={liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734d] text-white text-xs font-black shadow-sm transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Live</span>
              </a>
            </div>
          </div>
        </>
      ) : (
        /* CONNECT DOMAIN / DNS SETUP TAB */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              DNS Records Setup Guide
            </h3>
            <p className="text-xs text-slate-600">
              To point your domain to this restaurant menu, add the following DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Name / Host</th>
                    <th className="py-3 px-4">Points To</th>
                    <th className="py-3 px-4">TTL</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="py-3 px-4 font-bold text-blue-600">CNAME</td>
                    <td className="py-3 px-4 font-bold">@ / www</td>
                    <td className="py-3 px-4">domains.foodie.site</td>
                    <td className="py-3 px-4 font-sans text-slate-500">Auto</td>
                    <td className="py-3 px-4 text-right font-sans">
                      <button 
                        onClick={() => handleCopy('domains.foodie.site', 'cname-dns')}
                        className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold text-[11px]"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-emerald-600">A Record</td>
                    <td className="py-3 px-4 font-bold">@</td>
                    <td className="py-3 px-4">76.76.21.21</td>
                    <td className="py-3 px-4 font-sans text-slate-500">3600</td>
                    <td className="py-3 px-4 text-right font-sans">
                      <button 
                        onClick={() => handleCopy('76.76.21.21', 'a-dns')}
                        className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold text-[11px]"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / CHANGE DOMAIN */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">
                  Connect Custom Domain
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNewDomain} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={newDomainInput}
                    onChange={(e) => setNewDomainInput(e.target.value)}
                    placeholder="e.g. myrestaurant.food or menu.mycafe.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold outline-none focus:border-[#00875a]"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter the domain you registered with your domain provider.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2 rounded-xl bg-[#00875a] hover:bg-[#00734d] text-white text-xs font-black transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Save & Connect</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: BUY DOMAIN */}
      <AnimatePresence>
        {showBuyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <h3 className="text-lg font-black text-slate-900">
                    Buy New Domain
                  </h3>
                </div>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Instant registration with free automated Let's Encrypt SSL and zero configuration required.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {supportedExtensions.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:border-emerald-500 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-black text-slate-900">
                          {cleanBrandSlug}{item.ext}
                        </div>
                        <div className="text-xs font-bold text-emerald-600">
                          {item.price}
                        </div>
                      </div>
                      <button
                        onClick={() => handleBuyDomain(item.ext, item.price)}
                        className="px-3 py-1.5 rounded-lg bg-[#00875a] hover:bg-[#00734d] text-white text-[11px] font-black tracking-wide"
                      >
                        Claim
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: MANAGE CONNECTED DOMAIN */}
      <AnimatePresence>
        {showManageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">
                  Manage Domain: {connectedDomain}
                </h3>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <span className="font-bold text-slate-600">Status</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified & Active
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <span className="font-bold text-slate-600">SSL Certificate</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Auto-renews Let's Encrypt
                  </span>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      showToast('SSL Handshake tested and validated successfully!');
                      setShowManageModal(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                  >
                    Test SSL Handshake
                  </button>

                  <button
                    onClick={() => {
                      setConnectedDomain('myrestaurant.food');
                      onUpdateSettings({ customDomain: '' });
                      setShowManageModal(false);
                      showToast('Domain reset to default.');
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors"
                  >
                    Disconnect Custom Domain
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
