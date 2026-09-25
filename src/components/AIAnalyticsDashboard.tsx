import React, { useState } from 'react';
import { 
  Search, Bell, RefreshCw, SlidersHorizontal, Calendar, 
  ChevronDown
} from 'lucide-react';

interface AIAnalyticsDashboardProps {
  theme?: 'light' | 'dark';
  brandName?: string;
  onOpenSales?: () => void;
}

interface BarData {
  id: string;
  date: string;
  value: number; // height up to 200
  percentage: string;
  salesAmount: string;
  growth: string;
  isHighlight?: boolean;
}

export const AIAnalyticsDashboard: React.FC<AIAnalyticsDashboardProps> = ({
  brandName = 'My Restaurant',
  onOpenSales,
}) => {
  // Tabs
  const [activeTrendTab, setActiveTrendTab] = useState<'revenue' | 'order' | 'avg' | 'value'>('order');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState('This Week');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Today');
  const [selectedDateRange, setSelectedDateRange] = useState('15 Mar, 2025 - 21 Mar, 2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBar, setHoveredBar] = useState<string | null>('10-04-1');

  // Bar Chart Data matching screenshot
  const initialBarData: BarData[] = [
    { id: '10-01', date: '10-01', value: 75, percentage: '55%', salesAmount: '$3,820', growth: '+15%' },
    { id: '10-02', date: '10-02', value: 165, percentage: '180%', salesAmount: '$8,450', growth: '+180%' },
    { id: '10-03', date: '10-03', value: 115, percentage: '110%', salesAmount: '$5,920', growth: '+110%' },
    { id: '10-04-1', date: '10-04', value: 195, percentage: '200%', salesAmount: '$9,4317', growth: '+200%', isHighlight: true },
    { id: '10-04-2', date: '10-04', value: 172, percentage: '190%', salesAmount: '$8,940', growth: '+190%' },
    { id: '10-05', date: '10-05', value: 155, percentage: '160%', salesAmount: '$7,830', growth: '+160%' },
    { id: '10-06', date: '10-06', value: 92, percentage: '60%', salesAmount: '$4,120', growth: '+60%' },
    { id: '10-07', date: '10-07', value: 172, percentage: '190%', salesAmount: '$8,920', growth: '+190%' },
    { id: '10-08', date: '10-08', value: 170, percentage: '190%', salesAmount: '$8,850', growth: '+190%' },
    { id: '10-09', date: '10-09', value: 182, percentage: '190%', salesAmount: '$9,100', growth: '+190%' },
    { id: '10-10', date: '10-10', value: 92, percentage: '60%', salesAmount: '$4,150', growth: '+60%' },
    { id: '10-11', date: '10-11', value: 172, percentage: '190%', salesAmount: '$8,900', growth: '+190%' },
  ];

  // Top Dishes list
  const topDishes = [
    {
      id: 1,
      name: 'Noodles',
      priceText: 'USD 690,163',
      percentage: 98,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Pizza',
      priceText: 'USD 120,163',
      percentage: 70,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Biryani',
      priceText: 'USD 1000,163',
      percentage: 60,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Pasta',
      priceText: 'USD 280,163',
      percentage: 80,
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      name: 'Steak',
      priceText: 'USD 300,163',
      percentage: 65,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      name: 'Sushi',
      priceText: 'USD 100,163',
      percentage: 50,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 7,
      name: 'Fried Chicken',
      priceText: 'USD 50,163',
      percentage: 40,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 8,
      name: 'Ice Cream',
      priceText: 'USD 500,153',
      percentage: 56,
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=120&auto=format&fit=crop&q=80',
    },
  ];

  // Category chart points
  const categoryPoints = [
    { label: 'Sushi', x: 40, y: 160, pct: '23%' },
    { label: 'Steak', x: 105, y: 145, pct: '25%' },
    { label: 'Pasta', x: 170, y: 110, pct: '30%' },
    { label: 'Biryani', x: 235, y: 125, pct: '29%' },
    { label: 'Biryani', x: 300, y: 95, pct: '33%', isTooltip: true, tooltipName: 'China', tooltipValue: '4.245B' },
    { label: 'Pizza', x: 365, y: 100, pct: '28%' },
    { label: 'Noodles', x: 430, y: 115, pct: '25%' },
  ];

  // Build SVG path for category smooth curve
  const catPathD = "M 20 170 C 35 165, 38 162, 40 160 C 70 152, 90 148, 105 145 C 135 130, 155 112, 170 110 C 195 115, 215 122, 235 125 C 265 110, 285 96, 300 95 C 330 96, 350 99, 365 100 C 395 105, 415 112, 430 115 L 450 90";

  return (
    <div className="w-full bg-white text-slate-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-200/80 font-sans space-y-6">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View or export your store's business data.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            type="button" 
            aria-label="Search analytics"
            className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <button 
            type="button" 
            aria-label="Notifications"
            className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
          </button>

          <button 
            type="button"
            onClick={onOpenSales}
            className="px-4 py-2 bg-[#f95721] hover:bg-[#e04815] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
          >
            Open Sales
          </button>
        </div>
      </div>

      {/* 2. BUSINESS DATA & DATE CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <h2 className="text-sm sm:text-base font-bold text-slate-900">
          Business Data
        </h2>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Date Range Picker pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedDateRange}</span>
          </div>

          {/* Select Data Dropdown */}
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          >
            <span>Select data</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 3. FOUR TOP KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-medium text-slate-500">
            Revenue
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            19,999.00
          </p>
          <p className="text-[11px] font-medium text-slate-400 mt-2">
            vs Last period
          </p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-medium text-slate-500">
            Total Orders
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            177
          </p>
          <p className="text-[11px] font-medium text-slate-400 mt-2">
            vs Last period
          </p>
        </div>

        {/* Card 3: Average Orders value */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-medium text-slate-500">
            Average Orders value
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            $109.00
          </p>
          <p className="text-[11px] font-medium text-slate-400 mt-2">
            vs Last period
          </p>
        </div>

        {/* Card 4: Returning Customers Ration */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-medium text-slate-500">
            Returning Customers Ration
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            29%
          </p>
          <p className="text-[11px] font-medium text-slate-400 mt-2">
            vs Last period
          </p>
        </div>
      </div>

      {/* 4. SUB-NAVIGATION TABS & SEARCH/FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar border border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveTrendTab('revenue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTrendTab === 'revenue' 
                ? 'bg-[#f95721] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Revenue Trend
          </button>

          <button
            type="button"
            onClick={() => setActiveTrendTab('order')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTrendTab === 'order' 
                ? 'bg-[#f95721] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Order Trend
          </button>

          <button
            type="button"
            onClick={() => setActiveTrendTab('avg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTrendTab === 'avg' 
                ? 'bg-[#f95721] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Average Order
          </button>

          <button
            type="button"
            onClick={() => setActiveTrendTab('value')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTrendTab === 'value' 
                ? 'bg-[#f95721] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Value Trend
          </button>
        </div>

        {/* Right Search & Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 w-44 sm:w-56 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-[#f95721] transition-colors shadow-sm"
            />
          </div>

          <button 
            type="button" 
            title="Refresh"
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button 
            type="button" 
            title="Filters"
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. SALES STATISTICS BAR CHART CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Sales Statistics
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                $9,431.42
              </h3>
            </div>
            <p className="text-xs font-medium text-slate-400">
              Number of Orders
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>{selectedWeekFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Bar Chart Area */}
        <div className="relative pt-8 pb-2">
          
          {/* Background Grid Lines with Y-Axis */}
          <div className="space-y-7 sm:space-y-9 w-full">
            {[200, 150, 100, 50, 0].map((num) => (
              <div key={num} className="flex items-center gap-3">
                <span className="w-6 text-[11px] font-medium text-slate-400 text-right shrink-0">
                  {num}
                </span>
                <div className="w-full border-b border-dashed border-slate-200" />
              </div>
            ))}
          </div>

          {/* Foreground Bars Grid */}
          <div className="absolute inset-0 left-9 right-2 flex items-end justify-between px-2 pt-10 pb-6">
            {initialBarData.map((bar) => {
              const isHighlight = bar.isHighlight;

              return (
                <div 
                  key={bar.id} 
                  className="flex flex-col items-center group relative h-full justify-end cursor-pointer"
                  onMouseEnter={() => setHoveredBar(bar.id)}
                  onMouseLeave={() => setHoveredBar('10-04-1')}
                >
                  {/* Floating Tooltip for Active Bar (like 10-04 $9,4317 +200%) */}
                  {isHighlight && (
                    <div className="absolute -top-7 z-30 flex flex-col items-center transition-all animate-bounce-subtle pointer-events-none">
                      <div className="bg-[#111827] text-white px-2.5 py-1.5 rounded-lg shadow-xl text-[10px] whitespace-nowrap text-left border border-slate-700">
                        <span className="text-slate-400 block text-[9px] font-medium">4 Sep 2025</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-bold text-white tracking-tight">{bar.salesAmount}</span>
                          <span className="text-[#22c55e] font-extrabold text-[9px] bg-emerald-950/80 px-1 py-0.5 rounded">
                            {bar.growth}
                          </span>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="w-2 h-2 bg-[#111827] rotate-45 -mt-1" />
                    </div>
                  )}

                  {/* Percentage Dot/Badge */}
                  <div className="mb-2 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#f95721] transition-colors">
                      {bar.percentage}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isHighlight ? 'bg-[#f95721]' : 'bg-[#f95721]/70'
                    }`} />
                  </div>

                  {/* Vertical Bar */}
                  <div 
                    style={{ height: `${bar.value}px` }}
                    className={`w-6 sm:w-10 lg:w-12 rounded-t-sm transition-all duration-300 ${
                      isHighlight
                        ? 'bg-[#f95721] shadow-md shadow-orange-500/20'
                        : 'bg-[#fee8df] hover:bg-[#fed6c6]'
                    }`}
                  />

                  {/* X-Axis Date Label */}
                  <div className="mt-3">
                    {isHighlight ? (
                      <span className="px-2 py-0.5 bg-[#f95721] text-white text-[10px] font-bold rounded-md shadow-xs">
                        {bar.date}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-800">
                        {bar.date}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 6. BOTTOM ROW: TOP DISHES & CATEGORIES ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Top Dishes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-base font-bold text-slate-900">
              Top Dishes
            </h3>

            <button 
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>This Week</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Dishes List with Progress Bars & Percentage badges */}
          <div className="space-y-3 pt-1">
            {topDishes.map((dish) => (
              <div key={dish.id} className="flex items-center gap-3 group">
                {/* Food Image */}
                <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Title & Price text */}
                <div className="w-28 sm:w-36 shrink-0 text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {dish.name}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                    • {dish.priceText}
                  </p>
                </div>

                {/* Gradient Progress Bar ending with pill badge */}
                <div className="flex-1 flex items-center relative">
                  <div className="w-full bg-slate-100 h-5 rounded-full overflow-hidden p-0.5 flex items-center">
                    <div 
                      style={{ width: `${dish.percentage}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-orange-100 via-orange-300 to-[#f95721] transition-all duration-500 relative flex items-center justify-end pr-1 shadow-xs"
                    >
                      <span className="text-[9px] font-black text-white px-1.5 py-0.5 bg-[#f95721] rounded-full shadow-xs leading-none">
                        {dish.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Card: Categories Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
          
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-base font-bold text-slate-900">
              Categories Analysis
            </h3>

            <button 
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>{selectedCategoryFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Area & Spline Line Chart Area */}
          <div className="relative pt-6 pb-2 flex-1 flex flex-col justify-end">
            
            {/* Background dashed horizontal lines with Y values */}
            <div className="space-y-8 w-full">
              {[50, 40, 30, 20, 10, 0].map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <span className="w-4 text-[11px] font-medium text-slate-400 text-right shrink-0">
                    {val}
                  </span>
                  <div className="w-full border-b border-dashed border-slate-100" />
                </div>
              ))}
            </div>

            {/* SVG Spline Curve & Area Gradient */}
            <div className="absolute inset-0 left-7 right-2 top-8 bottom-8 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 460 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="orangeAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f95721" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f95721" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Fill Area */}
                <path 
                  d={`${catPathD} L 450 200 L 20 200 Z`}
                  fill="url(#orangeAreaGrad)"
                />

                {/* Stroke Line */}
                <path 
                  d={catPathD}
                  fill="none"
                  stroke="#f95721"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Data points & Percentage tags */}
              {categoryPoints.map((pt, idx) => (
                <div 
                  key={idx}
                  style={{ left: `${(pt.x / 460) * 100}%`, top: `${(pt.y / 200) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto group cursor-pointer"
                >
                  {/* Floating China Tooltip */}
                  {pt.isTooltip && (
                    <div className="absolute -top-12 z-30 flex flex-col items-center">
                      <div className="bg-[#111827] text-white px-2 py-1 rounded shadow-lg text-[10px] whitespace-nowrap flex flex-col items-start border border-slate-700">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                          <span className="font-semibold text-slate-200">{pt.tooltipName}</span>
                        </div>
                        <span className="font-black text-white text-xs mt-0.5">{pt.tooltipValue}</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-[#111827] rotate-45 -mt-0.5" />
                    </div>
                  )}

                  {/* Percentage above dot */}
                  <span className="text-[10px] font-bold text-slate-500 mb-1 group-hover:text-[#f95721] transition-colors">
                    {pt.pct}
                  </span>

                  {/* Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#f95721] shadow-xs group-hover:scale-125 transition-transform" />
                </div>
              ))}

            </div>

            {/* X Axis Labels */}
            <div className="flex items-center justify-between pl-7 pr-2 pt-4">
              {categoryPoints.map((pt, idx) => (
                <span key={idx} className="text-[11px] font-medium text-slate-500 text-center">
                  {pt.label}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AIAnalyticsDashboard;
