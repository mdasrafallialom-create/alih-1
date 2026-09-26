import React, { useState, useMemo } from 'react';
import { 
  QrCode, 
  Printer, 
  Check, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Download, 
  Plus, 
  Trash2, 
  FileText,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  CheckCircle2,
  UtensilsCrossed,
  Flame,
  Search,
  ShieldCheck,
  Grid,
  Link as LinkIcon,
  Palette
} from 'lucide-react';

interface QrCodeManagerProps {
  brandName?: string;
  restaurantId?: string | null;
}

interface BoundDish {
  id: string;
  title: string;
  price: number;
  calories?: string;
  desc?: string;
  img: string;
  category?: string;
  popular?: boolean;
}

const DEFAULT_BOUND_DISHES: BoundDish[] = [
  {
    id: '1',
    title: 'Truffle Glazed Wagyu Steak',
    price: 48.00,
    calories: '420 kcal',
    desc: 'A5 Wagyu with wild forest mushrooms, truffle butter, and micro-herbs.',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop',
    category: 'Steaks',
    popular: true,
  },
  {
    id: '2',
    title: 'Artisanal Smoked Burrata',
    price: 22.00,
    calories: '310 kcal',
    desc: 'Heirloom tomatoes, aged balsamic reduction & cold-pressed olive oil.',
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop',
    category: 'Appetizers',
    popular: true,
  },
  {
    id: '3',
    title: 'Wood-Fired Truffle Pizza',
    price: 34.00,
    calories: '580 kcal',
    desc: 'San Marzano tomatoes, buffalo mozzarella, black truffle shavings.',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop',
    category: 'Pizza',
    popular: true,
  },
  {
    id: '4',
    title: 'Royal Saffron Lobster Thermidor',
    price: 65.00,
    calories: '520 kcal',
    desc: 'Fresh Atlantic lobster in cognac saffron gratin with gruyere cheese.',
    img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&auto=format&fit=crop',
    category: 'Seafood',
    popular: true,
  },
  {
    id: '5',
    title: '24K Edible Gold Tomahawk',
    price: 120.00,
    calories: '650 kcal',
    desc: 'Signature gold-infused dry-aged Prime Ribeye served with chimichurri.',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&auto=format&fit=crop',
    category: 'Chef Specials',
    popular: true,
  },
  {
    id: '6',
    title: 'Pan-Seared Hokkaido Scallops',
    price: 38.00,
    calories: '280 kcal',
    desc: 'Cauliflower velvet puree, crispy prosciutto chips & micro greens.',
    img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop',
    category: 'Appetizers',
    popular: false,
  },
  {
    id: '7',
    title: 'Golden Honey Velvet Cheesecake',
    price: 18.00,
    calories: '340 kcal',
    desc: 'Organic wild berry compote, honey drizzle & 24k edible gold leaf crust.',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop',
    category: 'Desserts',
    popular: false,
  },
];

export default function QrCodeManager({ brandName = "My Restaurant", restaurantId }: QrCodeManagerProps) {
  // Master Section Tabs:
  // 1: 'binding_center' (QR & Menu Card Binding Center)
  // 2: 'classic_generator' (Classic QR Code Generator & Stand Studio)
  const [activeTabMode, setActiveTabMode] = useState<'binding_center' | 'classic_generator'>('binding_center');

  // Array of active table identifiers
  const [tables, setTables] = useState<(string | number)[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('webar_restaurant_tables');
      if (saved) {
        try { 
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) { /* fallback */ }
      }
    }
    return Array.from({ length: 25 }, (_, i) => i + 1);
  });

  const [selectedTable, setSelectedTable] = useState<string | number>(() => {
    return tables[0] || 1;
  });

  const [newTableInput, setNewTableInput] = useState<string>('');
  const [customHost, setCustomHost] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return 'https://myrestaurant.foodie.site';
  });

  const [copied, setCopied] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessToast, setSyncSuccessToast] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Table search & zone filter
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<'all' | 'indoor' | 'vip' | 'rooftop'>('all');

  // Customizer state for printable cards
  const [qrColor, setQrColor] = useState<string>('0f172a');
  const [qrBgColor, setQrBgColor] = useState<string>('ffffff');
  const [qrSize, setQrSize] = useState<number>(300);

  // Phone preview search
  const [previewFoodSearch, setPreviewFoodSearch] = useState('');

  // Save tables state to localStorage
  const saveTables = (newTablesList: (string | number)[]) => {
    setTables(newTablesList);
    localStorage.setItem('webar_restaurant_tables', JSON.stringify(newTablesList));
  };

  // Preset table counts: 15, 25, 40 tables
  const handleApplyPresetTableCount = (count: number) => {
    const newTables = Array.from({ length: count }, (_, i) => i + 1);
    saveTables(newTables);
    setSelectedTable(1);
    setSyncSuccessToast(`Configured ${count} Tables! All QR codes mapped.`);
    setTimeout(() => setSyncSuccessToast(null), 3000);
  };

  // Helper function to get clean URL for any table
  const getComputedUrl = (tableVal: string | number) => {
    return restaurantId 
      ? `${customHost}?restaurantId=${restaurantId}&table=${encodeURIComponent(tableVal)}`
      : `${customHost}?table=${encodeURIComponent(tableVal)}`;
  };

  // Current selected table URL
  const currentComputedUrl = getComputedUrl(selectedTable);

  // QR code API link
  const getQrCodeImgUrl = (tableVal: string | number, colorHex = qrColor, bgHex = qrBgColor, sizeVal = qrSize) => {
    const targetUrl = getComputedUrl(tableVal);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${sizeVal}x${sizeVal}&data=${encodeURIComponent(targetUrl)}&color=${colorHex}&bgcolor=${bgHex}&qzone=2`;
  };

  const currentQrCodeImgUrl = getQrCodeImgUrl(selectedTable);

  // Create Table action
  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    const val = newTableInput.trim();
    if (!val) return;

    const isDuplicate = tables.some(t => t.toString().toLowerCase() === val.toLowerCase());
    if (isDuplicate) {
      alert('This table already exists!');
      return;
    }

    const updated = [...tables, val];
    saveTables(updated);
    setSelectedTable(val);
    setNewTableInput('');
    setSyncSuccessToast(`Added Table #${val} successfully!`);
    setTimeout(() => setSyncSuccessToast(null), 2500);
  };

  // Delete Table action
  const handleDeleteTable = (tableVal: string | number) => {
    if (tables.length <= 1) {
      alert('You must have at least one table registered.');
      return;
    }
    const filtered = tables.filter(t => t !== tableVal);
    saveTables(filtered);
    if (selectedTable === tableVal) {
      setSelectedTable(filtered[0]);
    }
  };

  // One-Click Sync All Tables
  const handleSyncAllTables = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(`Today at ${timeStr}`);
      setSyncSuccessToast(`Successfully synced active Menu Card across all ${tables.length} tables!`);
      setTimeout(() => setSyncSuccessToast(null), 4000);
    }, 1200);
  };

  // Copy current table link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentComputedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download raw QR Code PNG of the selected table
  const handleDownloadPNG = async (tableVal: string | number) => {
    try {
      const url = getQrCodeImgUrl(tableVal, qrColor, qrBgColor, 500);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${brandName.replace(/\s+/g, '_')}_Table_${tableVal}_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(getQrCodeImgUrl(tableVal, qrColor, qrBgColor, 500), '_blank');
    }
  };

  // Batch download PNGs for ALL tables in a loop
  const handleDownloadAllPNGs = async () => {
    if (isDownloadingAll) return;
    setIsDownloadingAll(true);
    setDownloadProgress(0);

    for (let i = 0; i < tables.length; i++) {
      const tableVal = tables[i];
      await handleDownloadPNG(tableVal);
      setDownloadProgress(Math.round(((i + 1) / tables.length) * 100));
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsDownloadingAll(false);
  };

  // Print single stand card
  const handlePrintCurrent = () => {
    window.print();
  };

  // Print all stand cards as a PDF booklet
  const handlePrintAllBooklet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the print booklet!');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Dining Stands - All Tables Booklet</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            page-break-after: always;
            box-sizing: border-box;
            padding: 40px;
          }
          .stand-card {
            width: 380px;
            background: white;
            border: 4px solid rgba(217, 119, 6, 0.2);
            border-radius: 24px;
            padding: 35px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .eyebrow {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: #64748b;
            margin-bottom: 6px;
            font-weight: 600;
          }
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 4px 0;
          }
          .divider {
            width: 50px;
            height: 4px;
            background: linear-gradient(90deg, #d97706, #b45309);
            border-radius: 2px;
            margin-bottom: 24px;
          }
          .table-tag {
            background-color: #0f172a;
            color: white;
            font-weight: 700;
            padding: 8px 24px;
            border-radius: 50px;
            font-size: 14px;
            letter-spacing: 0.15em;
            margin-bottom: 24px;
          }
          .qr-box {
            padding: 16px;
            background: white;
            border: 2px solid #f1f5f9;
            border-radius: 16px;
            margin-bottom: 24px;
          }
          .qr-image {
            width: 200px;
            height: 200px;
            object-fit: contain;
          }
          .tagline {
            font-size: 14px;
            color: #334155;
            font-weight: 600;
            line-height: 1.5;
            margin-bottom: 6px;
          }
          .meta {
            font-size: 10px;
            color: #94a3b8;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        ${tables.map(t => `
          <div class="page-container">
            <div class="stand-card">
              <div class="eyebrow">Welcome To</div>
              <div class="title">${brandName.toUpperCase()}</div>
              <div class="divider"></div>
              <div class="table-tag">TABLE ${t}</div>
              <div class="qr-box">
                <img src="${getQrCodeImgUrl(t, qrColor, qrBgColor, 400)}" class="qr-image" alt="QR Table ${t}" />
              </div>
              <div class="tagline">Scan with smartphone camera to view live 3D/WebAR menu & order.</div>
              <div class="meta">Instant Table Synchronization • Powered by WebAR OS</div>
            </div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 600);
  };

  // Filtered dishes for phone preview
  const phonePreviewDishes = useMemo(() => {
    const sorted = [...DEFAULT_BOUND_DISHES].sort((a, b) => {
      const aPop = a.popular ? 1 : 0;
      const bPop = b.popular ? 1 : 0;
      return bPop - aPop;
    });

    if (!previewFoodSearch.trim()) return sorted;
    const q = previewFoodSearch.toLowerCase();
    return sorted.filter(d => 
      d.title.toLowerCase().includes(q) || 
      (d.category && d.category.toLowerCase().includes(q))
    );
  }, [previewFoodSearch]);

  // Filtered tables list
  const filteredTables = useMemo(() => {
    return tables.filter(t => {
      const str = t.toString().toLowerCase();
      const matchesSearch = !tableSearchQuery || str.includes(tableSearchQuery.toLowerCase());
      
      const num = typeof t === 'number' ? t : parseInt(t) || 0;
      if (selectedZone === 'vip') return matchesSearch && num > 18;
      if (selectedZone === 'rooftop') return matchesSearch && (num >= 13 && num <= 18);
      if (selectedZone === 'indoor') return matchesSearch && num <= 12;
      return matchesSearch;
    });
  }, [tables, tableSearchQuery, selectedZone]);

  return (
    <div className="w-full bg-white text-slate-800 font-sans space-y-6">
      
      {/* 1. MASTER HEADER & TOP BANNER (PURE WHITE STYLE) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-500" />
                QR & Menu Binding Engine v3.2
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                100% Synced ({tables.length} Tables Active)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              QR & Menu Card Binding Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Live table QR binding, menu card sync engine, and interactive scan preview. Whenever you update your menu card or dishes, one click guarantees every table QR is instantly linked.
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* 1-Click Sync Button */}
            <button
              type="button"
              onClick={handleSyncAllTables}
              disabled={isSyncing}
              className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer active:scale-95 ${
                isSyncing
                  ? 'bg-amber-100 text-amber-800 border border-amber-300 cursor-wait'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-orange-500/20'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing All QR Codes...' : `⚡ Sync Menu to All ${tables.length} Tables`}</span>
            </button>

            {/* Print Booklet Button */}
            <button
              type="button"
              onClick={handlePrintAllBooklet}
              className="px-4 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-200 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print All Stands</span>
            </button>
          </div>
        </div>

        {/* Sync Success Toast */}
        {syncSuccessToast && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs text-emerald-900 animate-slide-up shadow-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">{syncSuccessToast}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700">
              Verified Parameter: ?table=X
            </span>
          </div>
        )}

        {/* The Two Master Navigation Sections (White Styled) */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveTabMode('binding_center')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTabMode === 'binding_center'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4 text-amber-500" />
              <span>1. QR & Menu Card Binding Center</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTabMode('classic_generator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTabMode === 'classic_generator'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4 text-cyan-600" />
              <span>2. QR Code Generator & Stand Studio</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Last Synced: <strong className="text-slate-700">{lastSyncTime}</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: QR & MENU CARD BINDING CENTER (PURE WHITE BACKGROUND) */}
      {/* ========================================================================= */}
      {activeTabMode === 'binding_center' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 7 COLS: TABLE CONTROLLER & GRID (WHITE CARDS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Table Presets (15, 25, 40 Tables) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Grid className="w-4 h-4 text-amber-500" />
                  Quick Table Count Presets
                </span>
                <span className="text-[11px] text-slate-400">
                  Select your restaurant's capacity in 1-click
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleApplyPresetTableCount(15)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    tables.length === 15
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-sm font-black">15 Tables</span>
                  <span className="text-[9px] opacity-80">Cafe & Bistro</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyPresetTableCount(25)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    tables.length === 25
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-sm font-black">25 Tables</span>
                  <span className="text-[9px] opacity-80">Fine Dining</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyPresetTableCount(40)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    tables.length === 40
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-sm font-black">40 Tables</span>
                  <span className="text-[9px] opacity-80">Grand Banquet</span>
                </button>
              </div>
            </div>

            {/* Table Selector & Search Bar (White Background with clean white table tiles) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Dining Table Matrix ({filteredTables.length} shown)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any table to view its live phone menu preview on the right.
                  </p>
                </div>

                {/* Zone Filter pills */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-[11px] font-bold border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setSelectedZone('all')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      selectedZone === 'all' 
                        ? 'bg-white text-slate-900 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedZone('indoor')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      selectedZone === 'indoor' 
                        ? 'bg-white text-slate-900 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Indoor
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedZone('rooftop')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      selectedZone === 'rooftop' 
                        ? 'bg-white text-slate-900 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Rooftop
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedZone('vip')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      selectedZone === 'vip' 
                        ? 'bg-white text-slate-900 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    VIP Lounge
                  </button>
                </div>
              </div>

              {/* Add Custom Table Input */}
              <form onSubmit={handleCreateTable} className="flex gap-2">
                <input
                  type="text"
                  value={newTableInput}
                  onChange={(e) => setNewTableInput(e.target.value)}
                  placeholder="e.g. 26 or VIP-A or Patio-2"
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-amber-500 transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Table</span>
                </button>
              </form>

              {/* Table Grid Cards (Clean White Tiles, Highlight in Warm Amber) */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[440px] overflow-y-auto p-1 pr-2 no-scrollbar">
                {filteredTables.map((tableVal) => {
                  const isSelected = selectedTable === tableVal;
                  return (
                    <div
                      key={tableVal}
                      onClick={() => setSelectedTable(tableVal)}
                      className={`relative p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer group flex flex-col items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                          : 'bg-white hover:bg-amber-50/40 border-slate-200 text-slate-800 shadow-xs'
                      }`}
                    >
                      {/* Delete button on hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTable(tableVal);
                        }}
                        className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer shadow-sm ${
                          isSelected ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600 hover:bg-red-200'
                        }`}
                        title="Delete table"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>

                      {/* Mini QR icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}>
                        <QrCode className="w-4 h-4" />
                      </div>

                      {/* Table Name */}
                      <span className={`text-xs font-black block leading-tight ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}>
                        Table #{tableVal}
                      </span>

                      {/* Status indicator */}
                      <span className={`text-[9px] font-mono mt-1 flex items-center gap-1 font-bold ${
                        isSelected ? 'text-white/90' : 'text-emerald-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'} animate-pulse`} />
                        Live Synced
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* URL & Parameter bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">QR Binding Parameter:</span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-mono font-bold text-[11px]">
                    ?table={selectedTable}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <a
                    href={currentComputedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Test in Browser</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT 5 COLS: INTERACTIVE SMARTPHONE LIVE MENU PREVIEW */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full max-w-sm">
              
              {/* Smartphone Case Mockup */}
              <div className="relative mx-auto border-[10px] border-[#1e1c18] rounded-[3rem] shadow-2xl bg-[#090805] text-[#FBF8EE] overflow-hidden flex flex-col h-[650px] w-full max-w-[340px] select-none">
                
                {/* Speaker Ear Notch / Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#1e1c18] rounded-full z-40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#090805] -mr-8" />
                </div>

                {/* Status Bar */}
                <div className="pt-3 px-6 pb-1 flex justify-between items-center text-[10px] text-stone-400 font-mono z-30 shrink-0">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span className="w-3.5 h-2 border border-stone-400 rounded-xs inline-block" />
                  </div>
                </div>

                {/* Mini Top Bar inside Phone: Table Banner */}
                <div className="px-4 py-2.5 bg-[#14120B] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-black text-[10px]">
                      MR
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white block leading-none truncate max-w-[120px]">
                        {brandName}
                      </span>
                      <span className="text-[8px] text-amber-400 font-mono">
                        Active WebAR Menu
                      </span>
                    </div>
                  </div>

                  {/* Active Table Badge inside Phone */}
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-[9px] uppercase tracking-wider shadow-xs">
                    Table #{selectedTable}
                  </span>
                </div>

                {/* Phone Search Bar */}
                <div className="p-3 bg-[#0d0c08] border-b border-stone-800 shrink-0">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={previewFoodSearch}
                      onChange={(e) => setPreviewFoodSearch(e.target.value)}
                      placeholder="Search food by name..."
                      className="w-full pl-7 pr-3 py-1.5 text-[10px] bg-stone-900 border border-stone-800 rounded-lg text-white placeholder-stone-500 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Phone Scrollable Menu Items Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
                  
                  {/* Notice banner */}
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[10px] text-amber-200/90 leading-tight">
                    🔥 <strong>Popular First:</strong> Top dishes appear automatically at the top for customers scanning Table #{selectedTable}.
                  </div>

                  {phonePreviewDishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="p-2 rounded-xl bg-[#14120B] border border-stone-800/80 hover:border-amber-500/40 transition-all flex gap-2.5 items-center group"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-800">
                        <img 
                          src={dish.img} 
                          alt={dish.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {dish.popular && (
                            <span className="px-1.5 py-0.5 rounded bg-orange-950 border border-orange-500/50 text-[8px] font-bold text-orange-400 flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5" /> Popular
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-white truncate block">
                            {dish.title}
                          </span>
                        </div>

                        <p className="text-[8px] text-stone-400 line-clamp-1 mt-0.5">
                          {dish.desc}
                        </p>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] font-mono font-black text-amber-400">
                            ${dish.price.toFixed(2)}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[9px] font-bold cursor-pointer hover:bg-amber-400">
                            + Add
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                {/* Bottom Phone Action bar */}
                <div className="p-3 bg-[#14120B] border-t border-stone-800 shrink-0">
                  <div className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Order To Table #{selectedTable}</span>
                  </div>
                </div>

              </div>

              {/* QR Under Phone (Clean White Box) */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
                    <img 
                      src={currentQrCodeImgUrl} 
                      alt={`Table ${selectedTable} QR`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      Table #{selectedTable} QR Code
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[160px]">
                      {currentComputedUrl}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadPNG(selectedTable)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                  title="Download PNG"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CLASSIC QR GENERATOR, CUSTOMIZER & STAND STUDIO (ALL WHITE) */}
      {/* ========================================================================= */}
      {activeTabMode === 'classic_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="qr-manager-grid">
          
          {/* Controls Column (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6" id="qr-controls-sidebar">
            
            {/* Table Registration & Add Table */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-cyan-600" />
                  Table Identifiers ({tables.length} Registered)
                </h3>
              </div>

              {/* Add Table Form */}
              <form onSubmit={handleCreateTable} className="flex gap-2">
                <input
                  type="text"
                  value={newTableInput}
                  onChange={(e) => setNewTableInput(e.target.value)}
                  placeholder="e.g. 13 or VIP-1"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:border-cyan-500 text-slate-900 outline-none transition-all shadow-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Table</span>
                </button>
              </form>

              {/* Table Selector Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-56 overflow-y-auto p-1 pr-2 no-scrollbar">
                {tables.map((tableVal) => (
                  <div key={tableVal} className="relative group">
                    <button
                      type="button"
                      onClick={() => setSelectedTable(tableVal)}
                      className={`w-full py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer truncate ${
                        selectedTable === tableVal
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                      }`}
                    >
                      T-{tableVal}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTable(tableVal)}
                      className="absolute -top-1 -right-1 p-0.5 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 cursor-pointer"
                      title="Delete table"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Base App URL settings */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500">
                Base App URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customHost}
                  onChange={(e) => setCustomHost(e.target.value)}
                  placeholder="https://mysite.com/"
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-cyan-500 text-xs font-mono text-slate-900 outline-none transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setCustomHost(window.location.origin + window.location.pathname)}
                  className="absolute right-2.5 top-2 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                  title="Reset to current live app URL"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Active link preview */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Active Link Parameter:</span>
                  <span className="font-mono text-cyan-700 font-bold">?table={selectedTable}</span>
                </div>
                
                <div className="break-all p-2.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700 select-all">
                  {currentComputedUrl}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs border border-slate-200 transition-all cursor-pointer shadow-xs"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={currentComputedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs border border-slate-200 transition-all cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Test Link</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Customizer Panel */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4" id="qr-color-customizer">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
                Customize QR Code Design
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Foreground</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={`#${qrColor}`}
                      onChange={(e) => setQrColor(e.target.value.substring(1))}
                      className="w-8 h-8 rounded-lg cursor-pointer shrink-0 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={`#${qrColor}`}
                      onChange={(e) => setQrColor(e.target.value.replace('#',''))}
                      className="w-full text-center font-mono text-xs font-bold border border-slate-200 rounded-lg outline-none bg-white shadow-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Background</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={`#${qrBgColor}`}
                      onChange={(e) => setQrBgColor(e.target.value.substring(1))}
                      className="w-8 h-8 rounded-lg cursor-pointer shrink-0 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={`#${qrBgColor}`}
                      onChange={(e) => setQrBgColor(e.target.value.replace('#',''))}
                      className="w-full text-center font-mono text-xs font-bold border border-slate-200 rounded-lg outline-none bg-white shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Printable Stand Preview (White Paper Stand Style) */}
          <div className="lg:col-span-7 flex flex-col items-center gap-6">
            
            <div className="w-full max-w-sm p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden group">
              
              <div className="print-slip flex flex-col items-center text-center p-6 bg-white text-slate-900 rounded-2xl shadow-md border-4 border-amber-600/20 relative" id="table-card-print-area">
                <span className="text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase mb-1">
                  Welcome to Luxurious Dining
                </span>
                <h4 className="text-xl font-display font-bold tracking-tight text-slate-900 mb-0.5">
                  {brandName.toUpperCase()} RESTAURANT
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full mb-6" />

                <div className="px-6 py-2 rounded-full bg-slate-950 text-white font-display font-bold text-sm tracking-widest mb-6 shadow-sm">
                  TABLE {selectedTable}
                </div>

                <div className="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm mb-6 relative">
                  <img
                    src={currentQrCodeImgUrl}
                    alt={`QR Code to scan for table ${selectedTable}`}
                    className="w-48 h-48 object-contain rounded-lg"
                    crossOrigin="anonymous"
                  />
                </div>

                <p className="text-sm font-sans text-slate-700 leading-relaxed font-semibold max-w-xs mb-3">
                  Scan with your smartphone camera to load our immersive 3D/WebAR menu.
                </p>
                <span className="text-[10px] font-mono text-slate-400">
                  No App Install Required • Auto table synced
                </span>

                <div className="mt-8 pt-4 border-t border-slate-100 w-full text-[9px] font-mono text-slate-400 break-all select-all">
                  {currentComputedUrl}
                </div>
              </div>

            </div>

            {/* Print & Download Buttons */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDownloadPNG(selectedTable)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <button
                type="button"
                onClick={handlePrintCurrent}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Table Stand</span>
              </button>
            </div>

            {/* Batch actions (Booklet & Download all PNGs) */}
            <div className="w-full max-w-sm p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                Batch Actions ({tables.length} tables)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handlePrintAllBooklet}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download All PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAllPNGs}
                  disabled={isDownloadingAll}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDownloadingAll 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isDownloadingAll ? `Downloading (${downloadProgress}%)` : 'Download All PNGs'}
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Embedded print media overrides */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #table-card-print-area, #table-card-print-area * {
            visibility: visible;
          }
          #table-card-print-area {
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%) scale(1.15);
            width: 380px;
            border: 4px solid rgba(217, 119, 6, 0.15) !important;
            box-shadow: none !important;
            background: white !important;
          }
        }
      `}</style>

    </div>
  );
}
