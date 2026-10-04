import React, { useState, useMemo } from 'react';
import coffeeBeansBg from '../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';
import coastalSunsetBg from '../assets/images/hero_coastal_1786551396930.jpg';
import pizzaArtisanBg from '../assets/images/round_artisan_pizza_1790688885051.jpg';
import michelinInteriorBg from '../assets/images/luxury_michelin_interior_1790508733625.jpg';
import caviarSeafoodBg from '../assets/images/luxury_caviar_dish_1790508696808.jpg';
import chefSteakChickenBg from '../assets/images/chef_marcus_closed_cloche_1790590238785.jpg';
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
  MapPin,
  Crown,
  Building2,
  UserCheck,
  Layers,
  Palette,
  Camera,
  Tv,
  Globe
} from 'lucide-react';

interface QrCodeManagerProps {
  brandName?: string;
  restaurantId?: string | null;
  brandLocation?: string;
  ownerName?: string;
  onUpdateSettings?: (updates: any) => void;
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
];

// Card Theme Presets for Vibrant Restaurant QR Stand Cards
type CardThemePreset = 
  | 'royal_gold' 
  | 'emerald_gold' 
  | 'sapphire_cyan' 
  | 'ruby_champagne' 
  | 'flame_crimson' 
  | 'parchment_wood';

type CardFrameShape = 'arch' | 'oval' | 'hexagon' | 'brackets' | 'double_border' | 'modern_pill';

interface ThemeConfig {
  id: CardThemePreset;
  name: string;
  badgeTag: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  subTextClass: string;
  accentBadge: string;
  qrBoxBg: string;
  qrBoxBorder: string;
  previewGradient: string;
  headerAccent: string;
  footerText: string;
  swatches: [string, string, string];
}

const CARD_THEMES: Record<CardThemePreset, ThemeConfig> = {
  royal_gold: {
    id: 'royal_gold',
    name: 'Royal Gold & Onyx Filigree',
    badgeTag: 'Luxury Gold Filigree',
    bgClass: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-amber-100',
    borderClass: 'border-amber-500/70 shadow-amber-500/20',
    textClass: 'text-amber-100 font-serif',
    subTextClass: 'text-amber-300/80',
    accentBadge: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 text-slate-950 font-black',
    qrBoxBg: 'bg-slate-900/90',
    qrBoxBorder: 'border-amber-500/60',
    previewGradient: 'from-amber-500 via-amber-400 to-yellow-600',
    headerAccent: 'text-amber-400',
    footerText: 'text-amber-400/80',
    swatches: ['#d4af37', '#0f172a', '#eab308']
  },
  emerald_gold: {
    id: 'emerald_gold',
    name: 'Imperial Emerald & Gold',
    badgeTag: 'Emerald Crest Filigree',
    bgClass: 'bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 text-emerald-100',
    borderClass: 'border-emerald-500/70 shadow-emerald-500/20',
    textClass: 'text-emerald-50 font-serif',
    subTextClass: 'text-emerald-200/80',
    accentBadge: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 text-slate-950 font-black',
    qrBoxBg: 'bg-emerald-950/90',
    qrBoxBorder: 'border-emerald-400/60',
    previewGradient: 'from-emerald-500 via-teal-400 to-amber-400',
    headerAccent: 'text-emerald-300',
    footerText: 'text-emerald-300/80',
    swatches: ['#10b981', '#064e3b', '#fbbf24']
  },
  sapphire_cyan: {
    id: 'sapphire_cyan',
    name: 'Electric Sapphire & Azure Wave',
    badgeTag: 'Sapphire Wave Frame',
    bgClass: 'bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-950 text-cyan-100',
    borderClass: 'border-cyan-500/70 shadow-cyan-500/20',
    textClass: 'text-cyan-50 font-sans',
    subTextClass: 'text-cyan-200/80',
    accentBadge: 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black',
    qrBoxBg: 'bg-indigo-950/90',
    qrBoxBorder: 'border-cyan-400/60',
    previewGradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    headerAccent: 'text-cyan-400',
    footerText: 'text-cyan-300/80',
    swatches: ['#06b6d4', '#1e1b4b', '#3b82f6']
  },
  ruby_champagne: {
    id: 'ruby_champagne',
    name: 'Ruby Burgundy & Champagne',
    badgeTag: 'Burgundy Velvet Frame',
    bgClass: 'bg-gradient-to-b from-purple-950 via-fuchsia-950 to-purple-950 text-pink-100',
    borderClass: 'border-pink-500/70 shadow-pink-500/20',
    textClass: 'text-pink-50 font-serif',
    subTextClass: 'text-pink-200/80',
    accentBadge: 'bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 text-slate-950 font-black',
    qrBoxBg: 'bg-purple-900/90',
    qrBoxBorder: 'border-pink-400/60',
    previewGradient: 'from-pink-500 via-rose-400 to-amber-300',
    headerAccent: 'text-amber-300',
    footerText: 'text-pink-300/80',
    swatches: ['#ec4899', '#581c87', '#fcd34d']
  },
  flame_crimson: {
    id: 'flame_crimson',
    name: 'Fiery Crimson & Copper Flame',
    badgeTag: 'Crimson Flame Crest',
    bgClass: 'bg-gradient-to-b from-rose-950 via-red-900 to-rose-950 text-rose-100',
    borderClass: 'border-rose-500/70 shadow-rose-500/20',
    textClass: 'text-rose-50 font-sans',
    subTextClass: 'text-rose-200/80',
    accentBadge: 'bg-gradient-to-r from-orange-500 to-rose-600 text-white font-black',
    qrBoxBg: 'bg-rose-950/80',
    qrBoxBorder: 'border-rose-400/60',
    previewGradient: 'from-rose-500 via-orange-500 to-amber-500',
    headerAccent: 'text-orange-400',
    footerText: 'text-rose-300/80',
    swatches: ['#f43f5e', '#881337', '#f97316']
  },
  parchment_wood: {
    id: 'parchment_wood',
    name: 'Artisanal Warm Parchment & Oak',
    badgeTag: 'Warm Parchment Crest',
    bgClass: 'bg-gradient-to-b from-[#fdfbf7] via-[#f7f2e8] to-[#f0e8d8] text-amber-950',
    borderClass: 'border-amber-800/50 shadow-amber-900/10',
    textClass: 'text-amber-950 font-serif',
    subTextClass: 'text-amber-800/80',
    accentBadge: 'bg-gradient-to-r from-amber-800 to-amber-950 text-amber-50 font-black',
    qrBoxBg: 'bg-white/90',
    qrBoxBorder: 'border-amber-700/40',
    previewGradient: 'from-amber-700 via-orange-800 to-amber-900',
    headerAccent: 'text-amber-800',
    footerText: 'text-amber-900/80',
    swatches: ['#92400e', '#fef3c7', '#78350f']
  },
};

export default function QrCodeManager({ 
  brandName = "Velmora Fine Dining", 
  restaurantId,
  brandLocation = "123 Culinary Boulevard, Downtown",
  ownerName = "Md Ashraful",
  onUpdateSettings
}: QrCodeManagerProps) {
  // Master Section Tabs
  const [activeTabMode, setActiveTabMode] = useState<'binding_center' | 'classic_generator'>('binding_center');

  // Editable Restaurant Branding Information (Synced from System Settings Hub)
  const [restaurantNameInput, setRestaurantNameInput] = useState<string>(brandName);
  const [ownerNameInput, setOwnerNameInput] = useState<string>(ownerName);
  const [restaurantLocationInput, setRestaurantLocationInput] = useState<string>(brandLocation);
  const [taglineInput, setTaglineInput] = useState<string>("Scan with smartphone camera to view live 3D menu & order");

  React.useEffect(() => {
    if (brandName) setRestaurantNameInput(brandName);
    if (ownerName) setOwnerNameInput(ownerName);
    if (brandLocation) setRestaurantLocationInput(brandLocation);
  }, [brandName, ownerName, brandLocation]);

  // Selected Card Theme Preset
  const [cardTheme, setCardTheme] = useState<CardThemePreset>('royal_gold');
  // Interactive Frame & Card Shape Style state
  const [cardFrameShape, setCardFrameShape] = useState<CardFrameShape>('arch');
  // Table prefix: Table | TV Screen | VIP Table | Patio | Bar
  const [tableTypePrefix, setTableTypePrefix] = useState<string>('Table');

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

  const [selectedTable, setSelectedTable] = useState<string | number>(() => tables[0] || 1);
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
  const [selectedZone, setSelectedZone] = useState<'all' | 'indoor' | 'vip' | 'rooftop' | 'tv'>('all');

  // Customizer state for QR colors
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
    setSyncSuccessToast(`Added ${tableTypePrefix} #${val} successfully!`);
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

  // Sync settings when inputs change
  const handleSaveBranding = () => {
    if (onUpdateSettings) {
      onUpdateSettings({
        restaurantName: restaurantNameInput,
        ownerName: ownerNameInput,
        brandLocation: restaurantLocationInput,
      });
    }
    setSyncSuccessToast('Saved Restaurant & Owner Details!');
    setTimeout(() => setSyncSuccessToast(null), 2500);
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
      link.download = `${restaurantNameInput.replace(/\s+/g, '_')}_${tableTypePrefix}_${tableVal}_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(getQrCodeImgUrl(tableVal, qrColor, qrBgColor, 500), '_blank');
    }
  };

  // Batch download PNGs for ALL tables
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

  // Print all stand cards as a PDF booklet with selected Theme Preset!
  const handlePrintAllBooklet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the print booklet!');
      return;
    }

    const theme = CARD_THEMES[cardTheme];

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${restaurantNameInput} - Table Stand Booklet</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #090805;
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
            padding: 20px;
          }
          .stand-card {
            width: 420px;
            background: #0f172a;
            border: 4px solid #d97706;
            border-radius: 28px;
            padding: 36px 30px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            color: #fef3c7;
          }
          .emblem {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #d97706, #b45309);
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 12px;
            box-shadow: 0 4px 12px rgba(217,119,6,0.3);
          }
          .owner-tag {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: #fbbf24;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            font-weight: 900;
            color: #ffffff;
            margin: 0 0 6px 0;
            letter-spacing: -0.02em;
            line-height: 1.1;
          }
          .divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #f59e0b, #d97706);
            border-radius: 2px;
            margin-bottom: 20px;
          }
          .table-badge {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #020617;
            font-weight: 900;
            padding: 8px 28px;
            border-radius: 50px;
            font-size: 15px;
            letter-spacing: 0.15em;
            margin-bottom: 22px;
            box-shadow: 0 4px 14px rgba(245,158,11,0.3);
            text-transform: uppercase;
          }
          .qr-container {
            padding: 16px;
            background: #ffffff;
            border: 3px solid #f59e0b;
            border-radius: 20px;
            margin-bottom: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          }
          .qr-image {
            width: 220px;
            height: 220px;
            object-fit: contain;
            display: block;
          }
          .tagline {
            font-size: 13px;
            color: #fde68a;
            font-weight: 700;
            line-height: 1.4;
            margin-bottom: 12px;
            max-width: 320px;
          }
          .location-footer {
            font-size: 11px;
            color: #fbbf24;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            justify-content: center;
            border-top: 1px solid rgba(245,158,11,0.2);
            padding-top: 14px;
            width: 100%;
          }
          .meta {
            font-size: 9px;
            color: #94a3b8;
            font-mono;
            margin-top: 6px;
          }
        </style>
      </head>
      <body>
        ${tables.map(t => `
          <div class="page-container">
            <div class="stand-card">
              <div class="emblem">👑</div>
              <div class="title">${restaurantNameInput.toUpperCase()}</div>
              <div class="divider"></div>
              <div class="table-badge">${tableTypePrefix.toUpperCase()} #${t}</div>
              <div class="qr-container">
                <img src="${getQrCodeImgUrl(t, qrColor, qrBgColor, 450)}" class="qr-image" alt="${tableTypePrefix} ${t} QR" />
              </div>
              <div class="tagline">📷 ${taglineInput}</div>
              <div class="location-footer">
                📍 ${restaurantLocationInput}
              </div>
              <div class="meta">⚡ Instant WebAR Live Sync • Powered by WebAR OS</div>
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

  const activeTheme = CARD_THEMES[cardTheme];

  return (
    <div className="w-full bg-white text-slate-800 font-sans space-y-6">
      
      {/* 1. MASTER HEADER & BRANDING CONTROLLER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                QR & Menu Binding Engine v3.5
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                100% Synced ({tables.length} {tableTypePrefix}s Active)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              QR & Menu Card Binding Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Design vibrant table QR stands, customize restaurant location & owner details, and instantly bind your WebAR menu across all tables.
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
              <span>{isSyncing ? 'Synchronizing All QR Codes...' : `⚡ Sync Menu to All ${tables.length} ${tableTypePrefix}s`}</span>
            </button>

            {/* Print Booklet Button */}
            <button
              type="button"
              onClick={handlePrintAllBooklet}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print All Stand Cards</span>
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

        {/* Master Navigation Tabs */}
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
              <Palette className="w-4 h-4 text-cyan-600" />
              <span>2. QR Stand Card Studio & Design Presets</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Last Synced: <strong className="text-slate-700">{lastSyncTime}</strong></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: QR & MENU CARD BINDING CENTER */}
      {/* ========================================================================= */}
      {activeTabMode === 'binding_center' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 7 COLS: TABLE CONTROLLER & GRID */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Table Presets */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Grid className="w-4 h-4 text-amber-500" />
                  Quick Table Capacity Presets
                </span>
                <span className="text-[11px] text-slate-400">
                  Configure active tables in 1-click
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
                  <span className="text-[9px] opacity-80">Bistro / Cafe</span>
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

            {/* Table Matrix */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Dining Table Matrix ({filteredTables.length} active)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any table to view live phone menu preview.
                  </p>
                </div>

                {/* Table Prefix Type Switcher */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-[11px] font-bold border border-slate-200/60">
                  {['Table', 'TV Screen', 'VIP Table', 'Patio'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTableTypePrefix(type)}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        tableTypePrefix === type 
                          ? 'bg-slate-900 text-white shadow-xs font-black' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Custom Table Form */}
              <form onSubmit={handleCreateTable} className="flex gap-2">
                <input
                  type="text"
                  value={newTableInput}
                  onChange={(e) => setNewTableInput(e.target.value)}
                  placeholder={`e.g. 26 or ${tableTypePrefix}-A`}
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-amber-500 transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add {tableTypePrefix}</span>
                </button>
              </form>

              {/* Table Grid Cards */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[420px] overflow-y-auto p-1 pr-2 no-scrollbar">
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
                      {/* Delete button */}
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
                        {tableTypePrefix} #{tableVal}
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
                  <span className="text-slate-500">QR Link Parameter:</span>
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
              <div className="relative mx-auto border-[10px] border-[#1e1c18] rounded-[3rem] shadow-2xl bg-[#090805] text-[#FBF8EE] overflow-hidden flex flex-col h-[640px] w-full max-w-[340px] select-none">
                
                {/* Speaker Notch */}
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

                {/* Mini Top Bar inside Phone */}
                <div className="px-4 py-2.5 bg-[#14120B] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 z-20">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-black text-[10px] shrink-0">
                      👑
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-white block leading-none truncate max-w-[120px]">
                        {restaurantNameInput}
                      </span>
                    </div>
                  </div>

                  {/* Active Table Badge */}
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-[9px] uppercase tracking-wider shrink-0 shadow-xs">
                    {tableTypePrefix} #{selectedTable}
                  </span>
                </div>

                {/* Search Bar */}
                <div className="p-3 bg-[#0d0c08] border-b border-stone-800 shrink-0">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={previewFoodSearch}
                      onChange={(e) => setPreviewFoodSearch(e.target.value)}
                      placeholder="Search live food items..."
                      className="w-full pl-7 pr-3 py-1.5 text-[10px] bg-stone-900 border border-stone-800 rounded-lg text-white placeholder-stone-500 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Scrollable Menu Items */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5 no-scrollbar">
                  <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[9px] text-amber-200/90 leading-tight">
                    🔥 <strong>Live WebAR Sync:</strong> Customers scanning {tableTypePrefix} #{selectedTable} see this instant menu.
                  </div>

                  {phonePreviewDishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="p-2 rounded-xl bg-[#14120B] border border-stone-800/80 hover:border-amber-500/40 transition-all flex gap-2.5 items-center group"
                    >
                      <div className="w-13 h-13 rounded-lg overflow-hidden shrink-0 border border-stone-800">
                        <img 
                          src={dish.img} 
                          alt={dish.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {dish.popular && (
                            <span className="px-1 py-0.2 rounded bg-orange-950 border border-orange-500/50 text-[7px] font-bold text-orange-400 flex items-center gap-0.5">
                              <Flame className="w-2 h-2" /> Popular
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
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[8px] font-bold cursor-pointer hover:bg-amber-400">
                            + Order
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div className="p-3 bg-[#14120B] border-t border-stone-800 shrink-0">
                  <div className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Send Order To {tableTypePrefix} #{selectedTable}</span>
                  </div>
                </div>

              </div>

              {/* QR Under Phone */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
                    <img 
                      src={currentQrCodeImgUrl} 
                      alt={`${tableTypePrefix} ${selectedTable} QR`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      {tableTypePrefix} #{selectedTable} QR Code
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
      {/* SECTION 2: QR STAND CARD STUDIO & COLORFUL PRESETS */}
      {/* ========================================================================= */}
      {activeTabMode === 'classic_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Card Theme Color & Luxury Presets */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-600" />
                  Select Stand Card Theme Preset
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(CARD_THEMES).map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setCardTheme(theme.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                      cardTheme === theme.id
                        ? 'border-amber-500 ring-2 ring-amber-400/60 bg-amber-50/40 shadow-sm scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 block leading-tight">
                          {theme.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 block">
                        {theme.badgeTag}
                      </span>

                      {/* Compact Square Color Swatches */}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 w-full">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Swatches:</span>
                        <div className="flex items-center gap-1.5">
                          {theme.swatches.map((colorHex, idx) => (
                            <div 
                              key={idx} 
                              style={{ backgroundColor: colorHex }} 
                              className="w-4 h-4 rounded-md border border-slate-300 shadow-2xs shrink-0" 
                              title={colorHex}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interactive Card & QR Frame Shape Customizer */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Grid className="w-4 h-4 text-amber-500" />
                Select Frame & Shape Geometry 
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'arch', name: 'Royal Arch', desc: 'Curved Arch Top', icon: '🏛️' },
                  { id: 'oval', name: 'Luxury Oval', desc: 'Filigree Oval Emblem', icon: '⭕' },
                  { id: 'hexagon', name: 'Hexagon Shape', desc: 'Chiseled Hexagon', icon: '⬡' },
                  { id: 'brackets', name: 'Corner Brackets', desc: 'Metallic Corner Brackets', icon: '📐' },
                  { id: 'double_border', name: 'Double Gold Line', desc: 'Dual Border Line', icon: '🖼️' },
                  { id: 'modern_pill', name: 'Modern Pill', desc: 'Rounded Curved Pill', icon: '📱' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCardFrameShape(s.id as CardFrameShape)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      cardFrameShape === s.id
                        ? 'border-amber-500 ring-2 ring-amber-400/60 bg-amber-50/50 shadow-sm font-black text-amber-900'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                    }`}
                  >
                    <span className="text-xl select-none">{s.icon}</span>
                    <span className="text-xs block leading-tight">{s.name}</span>
                    <span className="text-[9px] text-slate-400 font-normal">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. QR Code Colors */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
                QR Code Foreground & Background Color
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

          {/* Right Column: Printable Stand Preview (Live Rich Design Card) */}
          <div className="lg:col-span-7 flex flex-col items-center gap-6">
            
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden group">
              
              {/* Vibrant Decorative Table Stand Card with Selected Shape & Frame */}
              <div 
                id="table-card-print-area"
                className={`w-full p-8 ${
                  cardFrameShape === 'arch' ? 'rounded-t-[3.5rem] rounded-b-2xl border-4' :
                  cardFrameShape === 'oval' ? 'rounded-[3rem] border-4' :
                  cardFrameShape === 'hexagon' ? 'rounded-3xl border-4' :
                  cardFrameShape === 'brackets' ? 'rounded-2xl border-4 relative' :
                  cardFrameShape === 'double_border' ? 'rounded-2xl border-4 ring-2 ring-amber-400/50' :
                  'rounded-[2.5rem] border-4'
                } ${activeTheme.bgClass} ${activeTheme.borderClass} relative overflow-hidden flex flex-col items-center text-center shadow-2xl transition-all duration-300`}
              >
                {/* Background Filigree Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

                {/* Badge Tag */}
                <div className="relative z-10 px-3.5 py-1 rounded-full bg-slate-900/90 border border-amber-400/40 text-[10px] font-black uppercase tracking-widest text-amber-300 mb-3 shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{activeTheme.badgeTag}</span>
                </div>

                {/* Top Emblem / Monogram Logo */}
                <div className="relative z-10 flex flex-col items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg border border-amber-300 mb-2">
                    👑
                  </div>
                  
                  {/* Restaurant Name */}
                  <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mt-1 mb-1 ${activeTheme.textClass}`}>
                    {restaurantNameInput.toUpperCase()}
                  </h3>

                  <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full my-1.5" />
                </div>

                {/* Table / TV Screen Badge */}
                <div className={`px-7 py-2.5 rounded-full ${activeTheme.accentBadge} text-sm tracking-widest uppercase mb-6 shadow-md border border-white/20`}>
                  {tableTypePrefix} #{selectedTable}
                </div>

                {/* QR Code Container Box with Dynamic Shape Frame */}
                <div className={`p-4 ${
                  cardFrameShape === 'arch' ? 'rounded-t-3xl rounded-b-xl border-2' :
                  cardFrameShape === 'oval' ? 'rounded-[2rem] border-2' :
                  cardFrameShape === 'hexagon' ? 'rounded-xl border-2 ring-2 ring-amber-400/30' :
                  cardFrameShape === 'brackets' ? 'rounded-xl border-2 outline outline-2 outline-amber-400/40 outline-offset-2' :
                  cardFrameShape === 'double_border' ? 'rounded-xl border-4 ring-2 ring-amber-400/40' :
                  'rounded-2xl border-2'
                } ${activeTheme.qrBoxBg} ${activeTheme.qrBoxBorder} shadow-2xl relative mb-5 transition-all duration-300`}>
                  
                  {/* Camera Icon Banner Above QR */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-md z-20">
                    <Camera className="w-3 h-3" />
                    <span>SCAN HERE</span>
                  </div>

                  <div className="p-2 bg-white rounded-xl shadow-inner mt-1">
                    <img
                      src={currentQrCodeImgUrl}
                      alt={`QR Code for ${tableTypePrefix} ${selectedTable}`}
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>

                {/* Tagline Instructions */}
                <p className={`text-xs sm:text-sm font-bold leading-relaxed max-w-xs mb-4 ${activeTheme.subTextClass}`}>
                  📷 {taglineInput}
                </p>

                {/* Restaurant Location Footer */}
                <div className="w-full pt-4 border-t border-amber-500/30 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{restaurantLocationInput}</span>
                </div>

                {/* Tech Badge */}
                <span className="text-[9px] font-mono text-slate-400 mt-2 block">
                  ⚡ Instant WebAR Live Sync • Powered by WebAR OS
                </span>

              </div>

            </div>

            {/* Print & Download Buttons */}
            <div className="w-full max-w-md grid grid-cols-2 gap-3">
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
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Table Stand</span>
              </button>
            </div>

            {/* Batch Booklet Actions */}
            <div className="w-full max-w-md p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                Batch Booklet Actions ({tables.length} {tableTypePrefix}s)
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
            transform: translate(-50%, -50%) scale(1.1);
            width: 400px;
            box-shadow: none !important;
          }
        }
      `}</style>

    </div>
  );
}
