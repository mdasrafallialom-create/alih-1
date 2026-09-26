import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Globe, 
  Zap, 
  Star, 
  Crown, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Smartphone, 
  Volume2, 
  Languages, 
  X, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Search,
  MessageSquare,
  Building2,
  Award
} from 'lucide-react';

interface WebAROSPortalLandingProps {
  onClose?: () => void;
  onSelectPlan?: (planId: string) => void;
  onOpenAdmin?: () => void;
  onOpenDemoRestaurant?: (restaurantId: string) => void;
  isModal?: boolean;
}

const WebAROSPortalLanding: React.FC<WebAROSPortalLandingProps> = ({
  onClose,
  onSelectPlan,
  onOpenAdmin,
  onOpenDemoRestaurant,
  isModal = false
}) => {
  const [subdomainInput, setSubdomainInput] = useState('');
  const [activeFeatureTab, setActiveFeatureTab] = useState<'3d' | 'subdomain' | 'sound' | 'multilang'>('3d');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollYRef.current;

      if (currentScrollY < 80) {
        // Always show header at the very top of the page
        setShowHeader(true);
      } else if (difference > 10) {
        // Scrolling down -> Hide header
        setShowHeader(false);
      } else if (difference < -10) {
        // Scrolling up -> Show header
        setShowHeader(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const DEMO_RESTAURANTS = [
    {
      id: 'santorinigreek',
      name: 'Santorini Greek',
      cuisine: 'Aegean Coastal Dining',
      location: 'Santorini, Greece',
      rating: '4.9',
      badge: 'POPULAR',
      tag: 'COASTAL LUXE',
      subdomain: 'santorinigreek.foodie.site',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'napagrill',
      name: 'Napa Valley Grill',
      cuisine: 'Californian Farm-to-Table',
      location: 'California, USA',
      rating: '4.9',
      badge: 'FEATURED',
      tag: 'WINE PAIRING',
      subdomain: 'napagrill.foodie.site',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'borcelle',
      name: 'Borcelle Bistro',
      cuisine: 'Modern Fusion & Grill',
      location: 'New York, USA',
      rating: '4.9',
      badge: 'TRENDING',
      tag: 'LUXURIOUS DINING',
      subdomain: 'borcelle.foodie.site',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'lepetit',
      name: 'Le Petit Paris',
      cuisine: 'French Fine Dining',
      location: 'Paris, France',
      rating: '5.0',
      badge: 'POPULAR',
      tag: '3D WEBAR ENABLED',
      subdomain: 'lepetit.foodie.site',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'tokyoramen',
      name: 'Tokyo Ramen',
      cuisine: 'Japanese Luxury & Sake Bar',
      location: 'Tokyo, Japan',
      rating: '4.9',
      badge: 'FEATURED',
      tag: 'JAPANESE LUXE',
      subdomain: 'tokyoramen.foodie.site',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const FAQS = [
    {
      q: 'How long does it take to set up my restaurant website and subdomain?',
      a: 'It takes less than 60 seconds! Once you sign in with your Gmail account and enter your restaurant name, our system instantly allocates your custom subdomain (e.g. yourname.foodie.site) with live SSL security and ready-to-use 3D WebAR menu templates.'
    },
    {
      q: 'Do my customers need to download a separate mobile app to view 3D WebAR items?',
      a: 'No download is required! Customers point their smartphone camera at table QR codes, and our web application opens directly in Safari (using iOS QuickLook) or Chrome (using Android SceneViewer) with high-fidelity 3D food models.'
    },
    {
      q: 'How do kitchen audio order alerts work?',
      a: 'When guests place orders from their table or mobile device, the WebAR OS Kitchen Display System (KDS) triggers immediate audio chimes and visual blinking order tickets so zero orders are delayed.'
    },
    {
      q: 'Can I manage multiple branches under one admin login?',
      a: 'Yes! Our Multi-Branch Luxe ($99/mo) plan lets you manage multiple restaurant branches, custom staff roles, centralized menu sync, and real-time financial reporting under one single admin account.'
    },
    {
      q: 'Is there a free trial or free tier available?',
      a: 'Yes, every new restaurant owner gets a 14-day unlimited free trial. You can test custom subdomains, 3D WebAR dish placement, and QR code printing without entering a credit card.'
    }
  ];

  const REVIEWS = [
    {
      name: 'Sophia Martinez',
      role: 'General Manager',
      subdomain: 'oasisrooftop.foodie.site',
      comment: 'Setting up our digital portal with Gmail sign-in was shockingly fast. The live table QR codes and multi-language support allowed us to seamlessly serve international tourists.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Marco Rossi',
      role: 'Head Chef & Co-Owner',
      subdomain: 'bellanapoli.foodie.site',
      comment: 'Our customers love pointing their mobile camera at the table and seeing our wood-fired pizzas in true 3D AR before ordering. Average check size went up 24%!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Amina Al-Mansoor',
      role: 'Founder & Culinary Lead',
      subdomain: 'sultanheritage.foodie.site',
      comment: 'The real-time sound chime for incoming kitchen orders is a total game changer for our busy dinner rush. Zero missed tickets, zero delayed orders!',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Carlos Silva',
      role: 'Hospitality Director',
      subdomain: 'riogrill.foodie.site',
      comment: "Avernao's $49/mo Pro plan paid for itself on day one. Managing multi-language menus and table QR billing in one click is pure luxury.",
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Kacper Lindholm',
      role: 'Co-Founder',
      subdomain: 'nordicdine.foodie.site',
      comment: 'The custom subdomains and 3D WebAR previews setup took under 60 seconds. Our staff loves the admin panel!',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'
    }
  ];

  const handleClaimSubdomain = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = subdomainInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanName) {
      setClaimStatus('Please enter a valid restaurant name.');
      return;
    }
    setClaimStatus(`🎉 Subdomain ${cleanName}.foodie.site is available! Redirecting to setup...`);
    setTimeout(() => {
      if (onOpenAdmin) onOpenAdmin();
    }, 1200);
  };

  const handlePlanClick = (plan: '15' | '49' | '99') => {
    if (onSelectPlan) {
      onSelectPlan(plan);
    } else {
      const url = `${window.location.origin}${window.location.pathname}?plan=${plan}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-sans selection:bg-amber-500 selection:text-white w-full">
      
      {/* TOP NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-amber-900/5 px-4 sm:px-8 lg:px-16 py-3.5 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="w-full flex items-center justify-between gap-4">
          
          {/* Logo & Platform Name with Premium Luxury Squircle Design and Orange Status Dot */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 select-none">
              {/* Outer Golden Squircle Container */}
              <div className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] shadow-md flex items-center justify-center">
                {/* Inner White Container */}
                <div className="w-full h-full bg-white rounded-[13px] flex flex-col items-center justify-center p-1 border border-amber-100">
                  {/* Elegant Golden Line-Art Chef Hat SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#aa7c11]" fill="currentColor">
                    {/* Delicate background crest or stars */}
                    <circle cx="50" cy="40" r="30" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
                    
                    {/* Stars on Left & Right */}
                    <path d="M 12,38 L 14,43 L 19,43 L 15,46 L 16,51 L 12,48 L 8,51 L 9,46 L 5,43 L 10,43 Z" fill="#d4af37" opacity="0.3" />
                    <path d="M 88,38 L 90,43 L 95,43 L 91,46 L 92,51 L 88,48 L 84,51 L 85,46 L 81,43 L 86,43 Z" fill="#d4af37" opacity="0.3" />

                    {/* Detailed Golden Line-Art Chef Hat */}
                    <g fill="none" stroke="#aa7c11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {/* Main puff */}
                      <path d="M 32,48 C 24,48 24,35 34,35 C 32,22 45,18 50,24 C 55,18 68,22 66,35 C 76,35 76,48 68,48 Z" />
                      {/* Base bands */}
                      <path d="M 34,48 L 66,48 L 64,56 L 36,56 Z" fill="#aa7c11" opacity="0.1" />
                      <path d="M 34,48 L 66,48 M 36,56 L 64,56" />
                      {/* Folds line details inside hat */}
                      <path d="M 42,48 C 42,38 45,34 45,34" strokeWidth="1.8" />
                      <path d="M 50,48 L 50,30" strokeWidth="1.8" />
                      <path d="M 58,48 C 58,38 55,34 55,34" strokeWidth="1.8" />
                    </g>

                    {/* Elegant Serif Text "AVERNAO" */}
                    <text 
                      x="50" 
                      y="74" 
                      textAnchor="middle" 
                      fill="#aa7c11" 
                      style={{
                        fontFamily: "'Playfair Display', 'Didot', 'Georgia', serif", 
                        fontSize: "11px", 
                        fontWeight: "900",
                        letterSpacing: "1px"
                      }}
                    >
                      AVERNAO
                    </text>

                    {/* Small Subtitle */}
                    <text 
                      x="50" 
                      y="84" 
                      textAnchor="middle" 
                      fill="#c59b27" 
                      style={{
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: "4.5px", 
                        fontWeight: "bold",
                        letterSpacing: "0.2px"
                      }}
                    >
                      PREMIUM WEBAR OS
                    </text>
                  </svg>
                </div>
              </div>
              
              {/* Pulsing Orange Dot at bottom right */}
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#ff9800] border-2 border-white shadow-md" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-slate-900 tracking-tight">Avernao</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-500/15 text-amber-700 rounded-full border border-amber-500/30">
                  V2.5 SAAS
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                Luxury Restaurant Operating System
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#features" className="hover:text-amber-600 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-amber-600 transition-colors">Showcase</a>
            <a href="#how-it-works" className="hover:text-amber-600 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-amber-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-amber-600 transition-colors">FAQ</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const target = DEMO_RESTAURANTS[0].id;
                if (onOpenDemoRestaurant) onOpenDemoRestaurant(target);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <span>EXPLORE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>GET STARTED</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO HEADER SECTION */}
      <section className="relative pt-20 sm:pt-28 pb-32 sm:pb-40 px-4 sm:px-8 text-center overflow-hidden min-h-[90vh] flex flex-col justify-between">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Empowering 1,250+ Fine Dining & Modern Restaurants Worldwide</span>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-900 rounded font-black text-[10px] uppercase">LIVE</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 leading-[1.15] tracking-tight max-w-5xl mx-auto">
            Launch Your Restaurant's <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
              3D WebAR Portal
            </span> In Under 60 Seconds
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed pt-2 pb-4">
            The all-in-one SaaS platform. Allocate custom subdomains instantly, present dishes in true-to-life 3D WebAR, receive real-time audio order alerts, and manage kitchen displays seamlessly.
          </p>

          {/* Subdomain Claim Form */}
          <form onSubmit={handleClaimSubdomain} className="max-w-2xl mx-auto py-6">
            <div className="p-3 sm:p-4 rounded-3xl bg-white border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 flex items-center px-4 py-3 w-full text-slate-400 font-mono text-sm sm:text-base">
                <span className="select-none text-slate-400 font-semibold">https://</span>
                <input
                  type="text"
                  placeholder="your-restaurant-name"
                  value={subdomainInput}
                  onChange={(e) => setSubdomainInput(e.target.value)}
                  className="w-full bg-transparent text-slate-900 font-bold focus:outline-none px-2 placeholder:text-slate-300"
                />
                <span className="select-none text-amber-600 font-bold">.foodie.site</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg whitespace-nowrap active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>CLAIM SUBDOMAIN</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
            {claimStatus && (
              <p className="text-xs font-bold text-amber-700 mt-4 animate-fade-in">{claimStatus}</p>
            )}
          </form>

          {/* Call-to-action Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <button
              onClick={onOpenAdmin}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>GET STARTED WITH GMAIL</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setShowVideoModal(true)}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>WATCH VIDEO TOUR</span>
            </button>
          </div>
        </div>

        {/* STATS METRICS BAR */}
        <div className="max-w-6xl mx-auto mt-24 sm:mt-36 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { label: 'ACTIVE RESTAURANTS', value: '1,250+' },
            { label: '3D DISHES VIEWED', value: '2.4M+' },
            { label: 'UPTIME GUARANTEE', value: '99.9%' },
            { label: 'ORDERS PROCESSED', value: '$14.2M+' }
          ].map((stat, idx) => (
            <div key={idx} className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-900/10 shadow-md text-center hover:shadow-lg transition-all">
              <p className="text-3xl sm:text-4xl font-black text-amber-600 font-display mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE SECTION: INTERACTIVE 3D GLOBE / LIVE SITES */}
      <section id="showcase" className="py-20 px-4 sm:px-8 bg-amber-500/5 border-y border-amber-900/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              INTERACTIVE 3D GLOBE SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Explore Live Restaurant Sites Running On Avernao
            </h2>
            <p className="text-sm font-medium text-slate-600">
              Every restaurant operates on its own dedicated free subdomain with live 3D WebAR menus and sound-enabled order processing.
            </p>
          </div>

          {/* Restaurant Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_RESTAURANTS.map((res) => (
              <div 
                key={res.id}
                className="bg-white rounded-2xl border border-amber-500/20 p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-400 font-bold text-[10px]">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{res.rating}</span>
                    </div>
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[9px] uppercase tracking-wider">
                      {res.badge}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded uppercase">{res.tag}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{res.location}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">{res.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-3">{res.cuisine}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-600 truncate max-w-[150px]">
                    {res.subdomain}
                  </span>
                  <button
                    onClick={() => onOpenDemoRestaurant && onOpenDemoRestaurant(res.id)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>DEMO PORTAL</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE HUB SECTION */}
      <section id="features" className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              INTERACTIVE FEATURE HUB
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Built Specifically For Modern & Luxury Restaurants
            </h2>
            <p className="text-sm font-medium text-slate-600">
              Explore the core technological features that set WebAR OS apart from traditional static restaurant builders.
            </p>
          </div>

          {/* Feature Tab Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: '3d', label: '3D WEBAR VIEWER', icon: Smartphone },
              { id: 'subdomain', label: 'FREE SUBDOMAINS', icon: Globe },
              { id: 'sound', label: 'AUDIO SOUND KDS', icon: Volume2 },
              { id: 'multilang', label: 'MULTI-LANGUAGE', icon: Languages }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeFeatureTab === tab.id
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Feature Tab Display Card */}
          <div className="p-8 rounded-3xl bg-white border border-amber-500/20 shadow-xl">
            {activeFeatureTab === '3d' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Interactive 3D WebAR Food Models</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Allow your guests to place life-sized 3D dishes directly on their dining tables using iOS QuickLook and Android SceneViewer right inside the browser. No app install required.
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {[
                      'Works smoothly on iPhone Safari and Android Chrome',
                      'Upload GLB/USDZ models or use our pre-built 3D luxury dish templates',
                      'Increases average ticket order value by up to 25%'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" alt="3D Food" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Interactive 3D Wagyu Steak</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-[9px] font-black uppercase">3D AR READY</span>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'subdomain' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Instant Free Custom Subdomains</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Every restaurant registered on Avernao receives an instant free subdomain link like <strong>yourname.foodie.site</strong> with automated SSL encryption and QR code generation.
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {[
                      'Zero technical domain setup or DNS record changes required',
                      'Connect your custom root domain (e.g. www.yourrestaurant.com) anytime',
                      'High-speed global Cloudflare CDN distribution'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 flex flex-col justify-center items-center text-center space-y-3">
                  <Globe className="w-12 h-12 text-amber-600" />
                  <p className="text-xl font-black font-mono text-slate-900">yourrestaurant.foodie.site</p>
                  <p className="text-xs font-medium text-slate-500">Free SSL Encrypted Subdomain Included with All Plans</p>
                </div>
              </div>
            )}

            {activeFeatureTab === 'sound' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Real-Time Sound Enabled Kitchen Display (KDS)</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Keep your kitchen staff notified instantly. When customers place table orders, the Kitchen Display plays loud audio alerts and updates order tickets in real-time.
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {[
                      'Live order sound alerts for incoming orders & waiter calls',
                      'Color-coded preparation timers (Preparing, Ready, Served)',
                      'Supports thermal receipt printing & tablet kitchen screens'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 animate-bounce">
                    <Volume2 className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-black text-amber-400">🔔 NEW ORDER RECEIVED!</p>
                  <p className="text-xs text-slate-400 font-mono">Table #04 • 2x Wagyu Steak • 1x Truffle Fries</p>
                </div>
              </div>
            )}

            {activeFeatureTab === 'multilang' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Languages className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Automatic Multi-Language Translation</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Serve international diners effortlessly. Avernao automatically translates your menu titles, dish descriptions, categories, and allergen alerts in real time.
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {[
                      'Full support for English, Bengali (বাংলা), Arabic (العربية), French & more',
                      'RTL (Right-to-Left) layout support for Arabic customers',
                      'Instant one-click language toggle on guest menus'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold text-slate-500">Language Selection</span>
                    <span className="text-xs font-bold text-amber-600">Auto-Detect</span>
                  </div>
                  <div className="space-y-2 text-xs font-bold">
                    <p className="p-2 bg-slate-50 rounded text-slate-800">🇬🇧 English: Gourmet Wood-Fired Pizza</p>
                    <p className="p-2 bg-amber-50 rounded text-amber-900">🇧🇩 বাংলা: সুস্বাদু উড-ফায়ার্ড পিজ্জা</p>
                    <p className="p-2 bg-slate-50 rounded text-slate-800 dir-rtl text-right">🇸🇦 العربية: بيتزا شهية على الحطب</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4 EASY STEPS SETUP PROCESS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-8 bg-amber-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              SIMPLE SETUP PROCESS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Get Up & Running In 4 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Gmail Sign-In',
                desc: 'Sign in securely with your Gmail account or receive a 6-digit email verification code.'
              },
              {
                step: '02',
                title: 'Claim Subdomain',
                desc: 'Enter your restaurant name and instantly claim your free custom link at yourname.foodie.site.'
              },
              {
                step: '03',
                title: 'Add Menu & 3D Items',
                desc: 'Upload your dishes, prices, categories, and 3D WebAR model files or high-res photos.'
              },
              {
                step: '04',
                title: 'Print QR Codes & Sell',
                desc: 'Download auto-generated table QR codes, place them on tables, and receive instant orders!'
              }
            ].map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-amber-500/20 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-black text-amber-400 font-mono block mb-3">{s.step}</span>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-8 bg-white border-y border-amber-900/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Transparent Pricing for Every Restaurant Size
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">STARTER</span>
                <h3 className="text-2xl font-black text-slate-900 mt-3 mb-1">Starter SaaS</h3>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-black text-slate-900">$15</span>
                  <span className="text-xs font-bold text-slate-500">/ month</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mb-6">Perfect for single cafes, food trucks, and new restaurants starting out.</p>
                <ul className="space-y-3 border-t pt-4">
                  {[
                    '10 Premium Themes & Designs',
                    '100+ Menu Card Designs',
                    'Free Subdomain (.foodie.site)',
                    'Digital Table QR Codes',
                    'Real-Time Order Management'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handlePlanClick('15')}
                className="mt-8 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
              >
                START FOR $15/MO
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl bg-white border-2 border-orange-500 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-md">
                MOST POPULAR CHOICE
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">PRO RESTAURANT</span>
                <h3 className="text-2xl font-black text-slate-900 mt-3 mb-1">Professional SaaS</h3>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-black text-orange-600">$49</span>
                  <span className="text-xs font-bold text-slate-500">/ month</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mb-6">Ideal for busy modern restaurants needing KDS, sound alerts, and full WebAR.</p>
                <ul className="space-y-3 border-t pt-4">
                  {[
                    '25 Premium Themes & Designs',
                    '500+ Menu Card Studio Access',
                    'QR Code Manager',
                    'Sound-Enabled Kitchen Display (KDS)',
                    'Custom Domains & Priority Support'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-4 h-4 text-orange-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handlePlanClick('49')}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer"
              >
                CLAIM PRO ACCESS ($49/MO)
              </button>
            </div>

            {/* Premium Plan */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">PREMIUM ENTERPRISE</span>
                <h3 className="text-2xl font-black text-slate-900 mt-3 mb-1">Multi-Branch Luxe</h3>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-black text-slate-900">$99</span>
                  <span className="text-xs font-bold text-slate-500">/ month</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mb-6">For multi-location restaurant chains, luxury hotel dining, and franchises.</p>
                <ul className="space-y-3 border-t pt-4">
                  {[
                    '50 Premium Themes & Designs',
                    '1000+ Menu Card Studio Access',
                    'QR Code Menu Management',
                    'Financial Control & Accounting',
                    'AI Analytics Engine',
                    '24/7 Priority Concierge'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handlePlanClick('99')}
                className="mt-8 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
              >
                GET PREMIUM LUXE ($99/MO)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20 px-4 sm:px-8 bg-amber-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              VERIFIED OWNER REVIEWS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Loved By Top Restaurant Chefs & Managers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-amber-500/20 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-auto">VERIFIED OWNER</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 italic leading-relaxed mb-4">"{rev.comment}"</p>
                </div>
                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                  <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="truncate">
                    <p className="text-xs font-black text-slate-900 truncate">{rev.name}</p>
                    <p className="text-[9px] font-medium text-slate-400 truncate">{rev.role}</p>
                    <p className="text-[9px] font-mono text-amber-600 truncate">{rev.subdomain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-5 pt-2 text-xs font-medium text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
            Ready To Launch Your Restaurant Digital Portal?
          </h2>
          <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">
            Click below to sign in with Gmail, enter your restaurant details, and go live with your custom subdomain in less than 60 seconds.
          </p>
          <button
            onClick={onOpenAdmin}
            className="px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs uppercase tracking-wider shadow-xl active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>GET STARTED WITH GMAIL</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 text-center border-t border-slate-200 bg-slate-900 text-slate-400 text-xs font-medium">
        <p>© 2026 Avernao Restaurant Platform. All rights reserved. Empowering modern dining worldwide.</p>
      </footer>

      {/* VIDEO TOUR MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 p-6 text-white text-center space-y-4">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-black">Avernao 3D WebAR OS Interactive Tour</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Discover how 1,250+ restaurants present luxury 3D dish previews, receive real-time audio kitchen orders, and manage custom table QR codes.
              </p>
              <div className="aspect-video bg-black/50 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">
                [ Interactive 3D WebAR OS Platform Tour Video Playing ]
              </div>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  if (onOpenAdmin) onOpenAdmin();
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                LAUNCH YOUR PORTAL NOW
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Utensils Icon
function UtensilsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V2" />
      <path d="M12 2v20" />
      <path d="M18 12h-3a2 2 0 0 0-2 2v8" />
    </svg>
  );
}

export default WebAROSPortalLanding;
