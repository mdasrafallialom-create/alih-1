import React, { useState, useRef } from 'react';
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
  SlidersHorizontal
} from 'lucide-react';

interface QrCodeManagerProps {
  brandName?: string;
  restaurantId?: string | null;
}

export default function QrCodeManager({ brandName = "L'AURA", restaurantId }: QrCodeManagerProps) {
  // Array of active table identifiers (defaults to 1-12)
  const [tables, setTables] = useState<(string | number)[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('webar_restaurant_tables');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  });

  const [selectedTable, setSelectedTable] = useState<string | number>(() => {
    return tables[0] || 1;
  });

  const [newTableInput, setNewTableInput] = useState<string>('');
  const [customHost, setCustomHost] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return 'https://avernao-webar-restaurant.com';
  });

  const [copied, setCopied] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Customizer state
  const [qrColor, setQrColor] = useState<string>('0f172a'); // hex without hash for API
  const [qrBgColor, setQrBgColor] = useState<string>('ffffff'); // hex without hash for API
  const [qrSize, setQrSize] = useState<number>(300);

  // Helper function to get clean URL for any table
  const getComputedUrl = (tableVal: string | number) => {
    return restaurantId 
      ? `${customHost}?restaurantId=${restaurantId}&table=${encodeURIComponent(tableVal)}`
      : `${customHost}?table=${encodeURIComponent(tableVal)}`;
  };

  // Current selected table URL
  const currentComputedUrl = getComputedUrl(selectedTable);

  // Real working QR code API link
  const getQrCodeImgUrl = (tableVal: string | number, colorHex = qrColor, bgHex = qrBgColor, sizeVal = qrSize) => {
    const targetUrl = getComputedUrl(tableVal);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${sizeVal}x${sizeVal}&data=${encodeURIComponent(targetUrl)}&color=${colorHex}&bgcolor=${bgHex}&qzone=2`;
  };

  const currentQrCodeImgUrl = getQrCodeImgUrl(selectedTable);

  // Save tables state to localStorage
  const saveTables = (newTablesList: (string | number)[]) => {
    setTables(newTablesList);
    localStorage.setItem('webar_restaurant_tables', JSON.stringify(newTablesList));
  };

  // Create Table action
  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    const val = newTableInput.trim();
    if (!val) return;

    // Avoid duplicate table identifiers
    const isDuplicate = tables.some(t => t.toString().toLowerCase() === val.toLowerCase());
    if (isDuplicate) {
      alert('This table already exists!');
      return;
    }

    const updated = [...tables, val];
    saveTables(updated);
    setSelectedTable(val);
    setNewTableInput('');
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

  // Copy current table link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentComputedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download raw QR Code PNG of the selected table
  const handleDownloadPNG = async (tableVal: string | number) => {
    try {
      const url = getQrCodeImgUrl(tableVal, qrColor, qrBgColor, 500); // 500x500 high res
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
      // Fallback
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
      // Subtle delay to prevent overwhelming browser concurrent downloads
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setIsDownloadingAll(false);
  };

  // Print current stand card
  const handlePrintCurrent = () => {
    window.print();
  };

  // Print all stand cards as a gorgeous PDF booklet
  const handlePrintAllBooklet = () => {
    // We trigger window.print() but our custom stylesheet will take care of page breaks for every single table!
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
            background-color: #f8fafc;
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
            line-height: 1.6;
            font-weight: 500;
            margin: 0 0 10px 0;
            max-width: 280px;
          }
          .footnote {
            font-size: 10px;
            color: #94a3b8;
          }
          .url-text {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #f1f5f9;
            font-size: 10px;
            color: #94a3b8;
            word-break: break-all;
            width: 100%;
          }
          @media print {
            body {
              background-color: white;
            }
            .page-container {
              min-height: 100vh;
              height: 100vh;
              page-break-after: always;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .stand-card {
              box-shadow: none;
              border: 3px solid rgba(217, 119, 6, 0.15);
            }
          }
        </style>
      </head>
      <body>
        ${tables.map(t => `
          <div class="page-container">
            <div class="stand-card">
              <span class="eyebrow">Welcome to Luxurious Dining</span>
              <h1 class="title">${brandName.toUpperCase()}</h1>
              <div class="divider"></div>
              
              <div class="table-tag">TABLE ${t}</div>
              
              <div class="qr-box">
                <img class="qr-image" src="${getQrCodeImgUrl(t, qrColor, qrBgColor, 400)}" alt="Table ${t} QR">
              </div>
              
              <p class="tagline">Scan with your smartphone camera to load our immersive 3D/WebAR menu.</p>
              <span class="footnote">No App Install Required • Auto table synced</span>
              
              <div class="url-text">${getComputedUrl(t)}</div>
            </div>
          </div>
        `).join('')}
        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
            }, 1000);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="qr-code-manager-container">
      
      {/* Configuration Column */}
      <div className="lg:col-span-5 space-y-6" id="qr-config-panel">
        
        {/* Main Control Panel */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm" id="qr-engine-settings">
          <h3 className="text-xl font-display font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-cyan-600" />
            QR Generator Engine
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Instantly provision high-end scannable table links for physical table cards and menu holders.
          </p>

          {/* Create Table Form */}
          <form onSubmit={handleCreateTable} className="mb-6 space-y-2" id="create-table-form">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500">
              Create New Table
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTableInput}
                onChange={(e) => setNewTableInput(e.target.value)}
                placeholder="e.g. 13, Bar-2, VIP-1"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:border-cyan-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                id="btn-create-table"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            </div>
          </form>

          {/* Registered Tables grid */}
          <div className="space-y-2 mb-6" id="registered-tables-section">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500">
                Registered Tables
              </label>
              <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                {tables.length} Total
              </span>
            </div>
            
            <div className="max-h-[180px] overflow-y-auto pr-1 border border-slate-100 rounded-xl p-2 bg-slate-50/50">
              <div className="grid grid-cols-4 gap-2">
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
          </div>

          {/* Base App URL settings */}
          <div className="space-y-2 mb-6" id="base-app-url-settings">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500">
              Base App URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={customHost}
                onChange={(e) => setCustomHost(e.target.value)}
                placeholder="https://mysite.com/"
                className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 text-xs font-mono text-slate-900 outline-none transition-all"
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
          </div>

          {/* Active links preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3" id="active-link-preview-box">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Active Link Parameter:</span>
              <span className="font-mono text-cyan-700 font-bold">?table={selectedTable}</span>
            </div>
            
            <div className="break-all p-3 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700 select-all">
              {currentComputedUrl}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs border border-slate-200 transition-all cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>

              <a
                href={currentComputedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs border border-slate-200 transition-all cursor-pointer shadow-sm"
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
                  className="w-full text-center font-mono text-xs font-bold border border-slate-200 rounded-lg outline-none bg-slate-50"
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
                  className="w-full text-center font-mono text-xs font-bold border border-slate-200 rounded-lg outline-none bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Print Layout Preview Card & Download Actions */}
      <div className="lg:col-span-7 flex flex-col items-center gap-6" id="qr-preview-section">
        
        {/* Interactive physical look stand holder */}
        <div className="w-full max-w-sm p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden group">
          
          {/* Glass glare decoration effects */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

          {/* Printable section wrapper */}
          <div className="print-slip flex flex-col items-center text-center p-6 bg-white text-slate-900 rounded-2xl shadow-md border-4 border-amber-600/20 relative" id="table-card-print-area">
            
            {/* Elegant Luxury Headers */}
            <span className="text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase mb-1">
              Welcome to Luxurious Dining
            </span>
            <h4 className="text-xl font-display font-bold tracking-tight text-slate-900 mb-0.5">
              {brandName.toUpperCase()} RESTAURANT
            </h4>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full mb-6" />

            {/* Main Table Indicator tag */}
            <div className="px-6 py-2 rounded-full bg-slate-950 text-white font-display font-bold text-sm tracking-widest mb-6 shadow-sm">
              TABLE {selectedTable}
            </div>

            {/* QR Code Canvas Frame */}
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm mb-6 relative group">
              <img
                src={currentQrCodeImgUrl}
                alt={`QR Code to scan for table ${selectedTable}`}
                className="w-48 h-48 object-contain rounded-lg"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 border-2 border-dashed border-cyan-500/0 group-hover:border-cyan-500/30 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>

            {/* Direct guidelines */}
            <p className="text-sm font-sans text-slate-700 leading-relaxed font-semibold max-w-xs mb-3">
              Scan with your smartphone camera to load our immersive 3D/WebAR menu.
            </p>
            <span className="text-[10px] font-mono text-slate-400">
              No App Install Required • Auto table synced
            </span>

            {/* Parameter print trace */}
            <div className="mt-8 pt-4 border-t border-slate-100 w-full text-[9px] font-mono text-slate-400 break-all select-all">
              {currentComputedUrl}
            </div>
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-400 font-mono no-print">
            ✨ Interactive Live Stand Card Preview ✨
          </div>
        </div>

        {/* Dynamic Action Controls for downloading and printing */}
        <div className="w-full max-w-sm space-y-4" id="action-download-controls">
          
          {/* Main Table-Specific download grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDownloadPNG(selectedTable)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-98"
              id="btn-download-png"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              onClick={handlePrintCurrent}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all cursor-pointer active:scale-98"
              id="btn-print-single"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table Stand</span>
            </button>
          </div>

          {/* Batch operations (Print/Save booklet, and Download all zip batch) */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3" id="batch-management-box">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Batch Actions ({tables.length} tables)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePrintAllBooklet}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all"
                id="btn-print-all-booklet"
              >
                <Printer className="w-4 h-4" />
                <span>Download All PDF / Print</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAllPNGs}
                disabled={isDownloadingAll}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all ${
                  isDownloadingAll 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                }`}
                id="btn-download-all-pngs"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloadingAll ? `Downloading (${downloadProgress}%)` : 'Download All PNGs'}
                </span>
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500 text-center">
              * Booklet generation is native and creates beautiful page breaks per table.
            </p>
          </div>

        </div>

      </div>

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
          .no-print {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
