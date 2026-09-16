import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, 
  Check, 
  Lock, 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Crown, 
  ShieldCheck, 
  Layers, 
  Palette,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  FontItem, 
  FontCategory, 
  FontRole, 
  FontRoleMapping, 
  FontPairSuggestion, 
  FONT_CATEGORIES, 
  INITIAL_FONT_LIBRARY, 
  FONT_PAIR_SUGGESTIONS, 
  DEFAULT_FONT_MAPPING,
  injectGoogleFonts,
  applyFontCSSVariables
} from './font-library';

interface FontLibrarySystemProps {
  userPlan: 'starter' | 'professional' | 'premium';
  isMasterAdmin?: boolean;
  theme?: 'light' | 'dark';
  fontMapping: FontRoleMapping;
  onUpdateFontMapping: (newMapping: FontRoleMapping) => void;
  previewContainerRef?: React.RefObject<HTMLDivElement | null>;
  showToast?: (type: 'success' | 'error', message: string) => void;
}

export default function FontLibrarySystem({
  userPlan = 'starter',
  isMasterAdmin = false,
  theme = 'light',
  fontMapping,
  onUpdateFontMapping,
  previewContainerRef,
  showToast
}: FontLibrarySystemProps) {
  const [fontList, setFontList] = useState<FontItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('webar_font_library_custom_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return INITIAL_FONT_LIBRARY;
  });

  const [activeRole, setActiveRole] = useState<FontRole>('brandFont');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminViewOnlyActive, setAdminViewOnlyActive] = useState(false);

  // Admin Modal state for adding/editing fonts
  const [editingFont, setEditingFont] = useState<FontItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fontFormData, setFontFormData] = useState<Partial<FontItem>>({
    name: '',
    family: '',
    cssFamily: '',
    category: 'Luxury Serif',
    googleFontFamily: '',
    previewText: '',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  });

  // Inject Google Fonts dynamically on mount and library updates
  useEffect(() => {
    injectGoogleFonts(fontList);
  }, [fontList]);

  // Persist custom font additions by admin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('webar_font_library_custom_v2', JSON.stringify(fontList));
    }
  }, [fontList]);

  // Apply CSS Variables live
  useEffect(() => {
    if (previewContainerRef?.current) {
      applyFontCSSVariables(previewContainerRef.current, fontMapping, fontList);
    }
    applyFontCSSVariables(document.documentElement, fontMapping, fontList);
  }, [fontMapping, fontList, previewContainerRef]);

  const handleSelectFontForRole = (font: FontItem) => {
    const isAllowed = 
      font.allowedPlans.includes(userPlan) || 
      userPlan === 'premium' || 
      (userPlan === 'professional' && font.allowedPlans.includes('starter')) ||
      isMasterAdmin;

    if (!isAllowed) {
      if (showToast) {
        showToast('error', `This font requires ${font.allowedPlans.join('/')} subscription plan.`);
      }
      return;
    }

    const updatedMapping = { ...fontMapping, [activeRole]: font.id };
    onUpdateFontMapping(updatedMapping);

    if (showToast) {
      showToast('success', `${font.name} applied to ${getRoleLabel(activeRole)}!`);
    }
  };

  const handleApplyFontPair = (pair: FontPairSuggestion) => {
    const updatedMapping: FontRoleMapping = {
      brandFont: pair.brandFontId,
      headingFont: pair.headingFontId,
      bodyFont: pair.bodyFontId,
      sectionFont: pair.sectionFontId,
      priceFont: pair.priceFontId,
      buttonFont: pair.buttonFontId
    };
    onUpdateFontMapping(updatedMapping);

    if (showToast) {
      showToast('success', `Font Pair "${pair.name}" applied successfully!`);
    }
  };

  const getRoleLabel = (role: FontRole): string => {
    switch (role) {
      case 'brandFont': return 'Brand Font (Titles, Header, Logo Text)';
      case 'headingFont': return 'Heading Font (Category Headers & Titles)';
      case 'bodyFont': return 'Body Font (Food Names, Prices, Descriptions)';
      case 'sectionFont': return 'Section Font (Dividers & Sub-headers)';
      case 'priceFont': return 'Price Badge Font (Tag Numbers & Currency)';
      case 'buttonFont': return 'Button & Callout Font (Order Buttons)';
      default: return 'Font';
    }
  };

  const handleSaveFontAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fontFormData.name || !fontFormData.family) return;

    if (editingFont) {
      // Edit existing font
      setFontList(prev => prev.map(f => f.id === editingFont.id ? {
        ...f,
        ...fontFormData,
        cssFamily: fontFormData.cssFamily || `'${fontFormData.family}', sans-serif`
      } as FontItem : f));
      if (showToast) showToast('success', `Font ${fontFormData.name} updated!`);
    } else {
      // Add new font
      const newId = fontFormData.name.toLowerCase().replace(/\s+/g, '_');
      const newFontItem: FontItem = {
        id: newId,
        name: fontFormData.name,
        category: fontFormData.category || 'Luxury Serif',
        family: fontFormData.family,
        cssFamily: fontFormData.cssFamily || `'${fontFormData.family}', sans-serif`,
        googleFontFamily: fontFormData.googleFontFamily || fontFormData.family.replace(/\s+/g, '+'),
        previewText: fontFormData.previewText || 'Sample Menu Text',
        bengaliPreviewText: fontFormData.bengaliPreviewText || '',
        supportedScripts: fontFormData.supportedScripts || ['latin'],
        allowedPlans: fontFormData.allowedPlans || ['starter', 'professional', 'premium'],
        active: fontFormData.active !== undefined ? fontFormData.active : true
      };
      setFontList(prev => [newFontItem, ...prev]);
      if (showToast) showToast('success', `New font ${fontFormData.name} added!`);
    }

    setIsAddModalOpen(false);
    setEditingFont(null);
  };

  const handleToggleFontActive = (id: string) => {
    setFontList(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const filteredFonts = fontList.filter(f => {
    if (!isMasterAdmin && !f.active) return false;
    if (adminViewOnlyActive && !f.active) return false;
    
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.previewText.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 no-print">
      
      {/* SECTION HEADER */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <Type className="w-7 h-7 text-orange-500" />
              <span>TYPOGRAPHY & FONT SETTINGS</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium mt-1">
              Pick premium typography combinations compatible with your license plan.
            </p>
          </div>

          {/* User Plan Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              <span>Your Plan: {userPlan.toUpperCase()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 1. CURATED FONT PAIRS SUGGESTION BAR */}
      <div className={`p-5 rounded-3xl border ${theme === 'dark' ? 'bg-[#18181c] border-zinc-800' : 'bg-slate-50 border-slate-200'} space-y-3`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Curated Font Pair Suggestions (1-Click Apply)</span>
          </span>
          <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">Professional Designer Pairings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FONT_PAIR_SUGGESTIONS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => handleApplyFontPair(pair)}
              className={`p-4 rounded-2xl border text-left transition-all hover:border-orange-500 group cursor-pointer shadow-xs hover:shadow-md ${
                theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-850' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-black group-hover:text-orange-500 transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {pair.name}
                </span>
                <span className="text-[10px] font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Apply ↗
                </span>
              </div>
              <p className={`text-[11px] mt-1.5 line-clamp-2 leading-relaxed ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'
              }`}>
                {pair.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. FONT ROLES SWITCHER TABS */}
      <div className="space-y-3">
        <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
          Select Font Role to Customize:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { role: 'brandFont' as FontRole, label: 'Brand Font', desc: 'Titles & Logo' },
            { role: 'headingFont' as FontRole, label: 'Heading Font', desc: 'Category Headers' },
            { role: 'bodyFont' as FontRole, label: 'Body Font', desc: 'Descriptions & Details' },
            { role: 'sectionFont' as FontRole, label: 'Section Font', desc: 'Sub-headers' },
            { role: 'priceFont' as FontRole, label: 'Price Font', desc: 'Currency & Tags' },
            { role: 'buttonFont' as FontRole, label: 'Button Font', desc: 'Interactive Buttons' }
          ].map((r) => {
            const isActive = activeRole === r.role;
            const assignedFontId = fontMapping[r.role];
            const assignedFont = fontList.find(f => f.id === assignedFontId);

            return (
              <button
                key={r.role}
                type="button"
                onClick={() => setActiveRole(r.role)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                  isActive 
                    ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500 shadow-md shadow-orange-500/10' 
                    : theme === 'dark' ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700' : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase font-black tracking-wider text-orange-500 block">
                    {r.label}
                  </span>
                  <span className={`text-xs font-black block mt-1 truncate ${
                    isActive 
                      ? (theme === 'dark' ? 'text-orange-400' : 'text-orange-600') 
                      : (theme === 'dark' ? 'text-white' : 'text-slate-900')
                  }`}>
                    {assignedFont ? assignedFont.name : 'Default'}
                  </span>
                </div>
                <span className={`text-[10px] mt-2 block font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {r.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE ROLE INDICATOR BAR */}
      <div className={`p-3.5 rounded-2xl flex items-center justify-between text-xs border ${
        theme === 'dark' 
          ? 'bg-orange-500/10 border-orange-500/30 text-slate-200' 
          : 'bg-orange-50 border-orange-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-orange-500" />
          <span className="font-bold">
            Currently Picking: <span className="text-orange-500 uppercase font-black">{getRoleLabel(activeRole)}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => onUpdateFontMapping(DEFAULT_FONT_MAPPING)}
          className="text-[11px] font-bold text-slate-500 hover:text-orange-600 flex items-center gap-1 underline cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
        </button>
      </div>

      {/* 3. CATEGORY FILTERS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : theme === 'dark' ? 'bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories ({fontList.length})
          </button>
          {FONT_CATEGORIES.map((cat) => {
            const count = fontList.filter(f => f.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : theme === 'dark' ? 'bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search font name or style..."
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none font-bold ${
              theme === 'dark'
                ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-orange-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500'
            }`}
          />
        </div>
      </div>

      {/* MASTER ADMIN CONTROLS (Only visible if isMasterAdmin) */}
      {isMasterAdmin && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="font-black text-amber-400 uppercase tracking-wider">
              Master Admin Font Control Panel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingFont(null);
                setFontFormData({
                  name: '',
                  family: '',
                  cssFamily: '',
                  category: 'Luxury Serif',
                  googleFontFamily: '',
                  previewText: 'Royal Flame Kitchen',
                  supportedScripts: ['latin'],
                  allowedPlans: ['starter', 'professional', 'premium'],
                  active: true
                });
                setIsAddModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-[10px] tracking-wider flex items-center gap-1 cursor-pointer transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Google Font
            </button>
          </div>
        </div>
      )}

      {/* 4. MAIN FONT CARDS GRID (100% Crisp, High Contrast & Clean English) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {filteredFonts.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/30 space-y-2">
            <Type className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-400">No fonts found matching your search criteria.</p>
          </div>
        ) : (
          filteredFonts.map((font) => {
            const isSelected = fontMapping[activeRole] === font.id;
            const hasAccess = 
              font.allowedPlans.includes(userPlan) || 
              userPlan === 'premium' || 
              (userPlan === 'professional' && font.allowedPlans.includes('starter')) ||
              isMasterAdmin;

            const preset = font.canvaPreset || 'standard';

            return (
              <div
                key={font.id}
                onClick={() => handleSelectFontForRole(font)}
                style={{ fontFamily: font.family }}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group min-h-[220px] shadow-sm hover:shadow-md ${
                  isSelected 
                    ? 'border-orange-500 bg-[#f4f4f6] ring-2 ring-orange-500 shadow-lg shadow-orange-500/10' 
                    : 'border-slate-200 bg-[#f4f4f6] hover:bg-[#ebecef] hover:border-slate-300'
                } ${!hasAccess ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 z-10 font-sans">
                  <div className="flex items-center gap-1.5">
                    {isSelected ? (
                      <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" />
                        <span>Active Role</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-white/90 border border-slate-300 text-slate-800 text-[9px] font-black uppercase tracking-wider shadow-xs">
                        {font.category}
                      </span>
                    )}
                  </div>

                  {/* Plan indicator badge */}
                  <div className="flex items-center gap-1">
                    {!hasAccess ? (
                      <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Plan Lock
                      </span>
                    ) : font.allowedPlans.includes('starter') ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-black uppercase tracking-wider">
                        All Plans
                      </span>
                    ) : font.allowedPlans.includes('professional') ? (
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[9px] font-black uppercase tracking-wider">
                        Pro Tier
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[9px] font-black uppercase tracking-wider">
                        Premium
                      </span>
                    )}
                  </div>
                </div>

                {/* Center Visual Typography Showcase (100% Crisp Dark Text on Card) */}
                <div className="my-auto py-4 px-1 flex flex-col items-center justify-center text-center select-none">
                  {preset === 'royal_cuisine' && (
                    <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase leading-tight">
                      ROYAL FLAME KITCHEN
                    </span>
                  )}

                  {preset === 'fashion_icon' && (
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                        {font.previewText || 'Artisanal Dining & Bar'}
                      </span>
                      <span className="text-[10px] text-slate-600 tracking-[0.3em] uppercase mt-1 font-sans font-bold">
                        FINE CUISINE
                      </span>
                    </div>
                  )}

                  {preset === 'grand_feast' && (
                    <span className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                      The Grand Feast
                    </span>
                  )}

                  {preset === 'vintage_bistro' && (
                    <div className="flex flex-col items-center justify-center text-center leading-tight">
                      <span className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                        VINTAGE BISTRO
                      </span>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-widest mt-0.5">
                        EST. 1984
                      </span>
                    </div>
                  )}

                  {preset === 'business_model' && (
                    <div className="flex flex-col items-center justify-center text-center leading-tight">
                      <span className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                        {font.previewText.split(' ')[0] || 'EMPEROR'}
                      </span>
                      <span className="text-xl md:text-2xl font-light text-slate-800 uppercase tracking-widest mt-0.5">
                        {font.previewText.split(' ').slice(1).join(' ') || 'CUISINE'}
                      </span>
                    </div>
                  )}

                  {preset === 'marketing_proposal' && (
                    <div className="flex flex-col items-start justify-center text-left space-y-1 w-full">
                      <span className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                        {font.previewText || 'Gourmet Selection'}
                      </span>
                      <div className="pt-1.5 border-t border-slate-300 w-full">
                        <p className="text-[9px] font-mono text-slate-800 font-bold uppercase tracking-wider">Chef's Special</p>
                        <p className="text-[9px] text-slate-600 line-clamp-1 leading-snug mt-0.5 font-sans font-medium">
                          Finest hand-crafted ingredients & seasonal flavors.
                        </p>
                      </div>
                    </div>
                  )}

                  {preset === 'heading_paragraph' && (
                    <div className="flex flex-col items-center justify-center text-center space-y-1">
                      <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase leading-none">
                        HEADING
                      </span>
                      <span className="text-xs font-medium text-slate-700 font-sans">
                        Sample Menu Description
                      </span>
                    </div>
                  )}

                  {preset === 'sweet_pink' && (
                    <span className="text-4xl md:text-5xl font-normal text-pink-600 leading-tight">
                      Sweet & Savory
                    </span>
                  )}

                  {preset === 'like_subscribe' && (
                    <div className="flex flex-col items-center justify-center text-center space-y-0.5">
                      <span className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">
                        MODERN
                      </span>
                      <span className="text-xs font-black text-orange-600 tracking-widest uppercase mt-0.5 font-sans">
                        STEAKHOUSE
                      </span>
                    </div>
                  )}

                  {preset === 'congrats_michael' && (
                    <div className="flex flex-col items-center justify-center text-center leading-tight space-y-0.5">
                      <span className="text-xl md:text-2xl font-black text-slate-900 uppercase">
                        ARTISAN COFFEE
                      </span>
                      <span className="text-[10px] font-sans text-slate-600 font-bold uppercase tracking-wider">
                        Bakery & Espresso Bar
                      </span>
                    </div>
                  )}

                  {preset === 'script_thank_you' && (
                    <span className="text-4xl md:text-5xl font-normal text-rose-600 leading-tight">
                      Thank you!
                    </span>
                  )}

                  {preset === 'standard' && (
                    <span className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                      {font.previewText}
                    </span>
                  )}
                </div>

                {/* Bottom Bar: Font Name & Quick Action */}
                <div className="mt-2 pt-2.5 border-t border-slate-300/80 flex items-center justify-between text-[11px] font-sans font-bold text-slate-800">
                  <div className="flex items-center gap-1.5 truncate max-w-[65%]">
                    <Type className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-900 font-black truncate text-xs">{font.name}</span>
                  </div>

                  {/* Action Status Pill */}
                  <div className="flex items-center gap-1.5">
                    {isSelected ? (
                      <span className="text-[10px] text-orange-600 font-black uppercase flex items-center gap-1">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    ) : hasAccess ? (
                      <span className="text-[10px] text-slate-500 font-bold group-hover:text-orange-600 transition-colors">
                        Apply Font →
                      </span>
                    ) : (
                      <span className="text-[10px] text-rose-600 font-bold flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Upgrade
                      </span>
                    )}

                    {/* Master Admin Quick Actions */}
                    {isMasterAdmin && (
                      <div className="flex items-center gap-1 ml-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleToggleFontActive(font.id)}
                          className={`p-1 rounded-md ${font.active ? 'text-emerald-600 hover:bg-emerald-500/20' : 'text-slate-400 hover:bg-slate-300'}`}
                          title={font.active ? 'Deactivate' : 'Activate'}
                        >
                          {font.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFont(font);
                            setFontFormData(font);
                            setIsAddModalOpen(true);
                          }}
                          className="p-1 rounded-md text-amber-600 hover:bg-amber-500/20"
                          title="Edit Font"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MASTER ADMIN ADD/EDIT FONT MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 no-print">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5 text-white"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-black uppercase tracking-wider flex items-center gap-2 text-amber-400">
                  <Type className="w-5 h-5" />
                  <span>{editingFont ? 'Edit Font Credentials' : 'Add New Google Font'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveFontAdmin} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-slate-400 uppercase tracking-widest text-[10px]">Font Name</label>
                  <input
                    type="text"
                    required
                    value={fontFormData.name || ''}
                    onChange={(e) => setFontFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Cinzel"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 uppercase tracking-widest text-[10px]">Font Category</label>
                    <select
                      value={fontFormData.category || 'Luxury Serif'}
                      onChange={(e) => setFontFormData(prev => ({ ...prev, category: e.target.value as FontCategory }))}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500"
                    >
                      {FONT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 uppercase tracking-widest text-[10px]">CSS Family String</label>
                    <input
                      type="text"
                      required
                      value={fontFormData.family || ''}
                      onChange={(e) => setFontFormData(prev => ({ ...prev, family: e.target.value }))}
                      placeholder="e.g. 'Cinzel', serif"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase tracking-widest text-[10px]">English Preview Text</label>
                  <input
                    type="text"
                    value={fontFormData.previewText || ''}
                    onChange={(e) => setFontFormData(prev => ({ ...prev, previewText: e.target.value }))}
                    placeholder="e.g. Royal Flame Kitchen"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase tracking-widest text-[10px]">Allowed Subscription Tiers</label>
                  <div className="flex items-center gap-4 pt-1">
                    {['starter', 'professional', 'premium'].map((p) => {
                      const isChecked = fontFormData.allowedPlans?.includes(p as any);
                      return (
                        <label key={p} className="flex items-center gap-1.5 cursor-pointer text-slate-300 uppercase">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const curr = fontFormData.allowedPlans || [];
                              if (e.target.checked) {
                                setFontFormData(prev => ({ ...prev, allowedPlans: [...curr, p as any] }));
                              } else {
                                setFontFormData(prev => ({ ...prev, allowedPlans: curr.filter(x => x !== p) }));
                              }
                            }}
                            className="rounded border-zinc-700 bg-zinc-950 text-amber-500"
                          />
                          <span>{p}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-zinc-800 text-slate-300 font-bold hover:bg-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 uppercase tracking-wider"
                  >
                    Save Font
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
