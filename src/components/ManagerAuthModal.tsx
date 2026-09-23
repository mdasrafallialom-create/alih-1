import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  Mail, 
  LogIn, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  X,
  Plus,
  Store,
  ChevronRight,
  Globe,
  Sparkles,
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup, User } from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  setDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { AdminSettings, SubscriptionPlan } from '../types';

interface ManagerAuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLoginSuccess: (session: { name: string; email: string; role: string; restaurantId: string }) => void;
  onCancel?: () => void;
  initialPlan?: SubscriptionPlan;
}

export default function ManagerAuthModal({ 
  isOpen = true, 
  onClose, 
  onLoginSuccess, 
  onCancel,
  initialPlan = 'basic'
}: ManagerAuthModalProps) {
  const [step, setStep] = useState<'auth' | 'selection' | 'create'>('auth');
  const [authMode, setAuthMode] = useState<'password' | 'google'>('password');
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRestaurants, setUserRestaurants] = useState<AdminSettings[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const savedCode = typeof window !== 'undefined' ? localStorage.getItem('webar_admin_secret_code') : null;
    const activePass = (savedCode || '8520').trim();

    // Accept custom active password OR default initial codes (8520, admin5321)
    const validCodes = Array.from(new Set([
      activePass.toLowerCase(),
      '8520',
      'admin5321'
    ]));

    if (validCodes.includes(pinInput.trim().toLowerCase())) {
      onLoginSuccess({
        name: 'Restaurant Owner',
        email: 'owner@restaurant.com',
        role: 'Owner',
        restaurantId: 'demo-restaurant'
      });
      if (onClose) onClose();
    } else {
      setErrorMsg('ভুল এডমিন পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখুন। (Incorrect Admin Password)');
    }
  };

  // New restaurant form state
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [newRestaurantLocation, setNewRestaurantLocation] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      
      // Check for existing restaurants
      const q = query(collection(db, "restaurants"), where("ownerId", "==", result.user.uid));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        setStep('create');
      } else {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AdminSettings[];
        setUserRestaurants(list);
        if (list.length === 1) {
          handleSelectRestaurant(list[0]);
        } else {
          setStep('selection');
        }
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMsg("Login cancelled. Please try again.");
      } else {
        setErrorMsg("Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newRestaurantName.trim()) return;

    setIsLoading(true);
    try {
      const restaurantData: Omit<AdminSettings, 'id'> = {
        ownerId: user.uid,
        ownerEmail: user.email || '',
        brandName: newRestaurantName,
        brandLocation: newRestaurantLocation,
        subscriptionPlan: initialPlan === 'basic' ? 'pro' : initialPlan,
        subscriptionStatus: 'active',
        audioEnabled: true,
        autoAcceptOrders: false,
        securityPinRequired: true,
        showCustomerContact: true,
        createdAt: Date.now(),
        trialEndsAt: Date.now() + (3650 * 24 * 60 * 60 * 1000), // 10 years unlimited trial
        socialLinks: { facebook: '', youtube: '', instagram: '', tiktok: '' }
      };

      const docRef = await addDoc(collection(db, "restaurants"), restaurantData);
      
      // Initialize empty menu and orders collection
      // (Optional: seed with default items if needed)
      
      onLoginSuccess({
        name: user.displayName || 'Owner',
        email: user.email || '',
        role: 'Owner',
        restaurantId: docRef.id
      });
    } catch (error: any) {
      console.error("Creation Error:", error);
      setErrorMsg("Failed to create restaurant profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRestaurant = (restaurant: AdminSettings) => {
    if (!user) return;
    onLoginSuccess({
      name: user.displayName || 'Owner',
      email: user.email || '',
      role: 'Owner',
      restaurantId: restaurant.id
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        
        {/* Banner */}
        <div className="bg-[#0f172a] p-10 text-white relative">
          <button 
            onClick={onCancel}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Restaurant Portal</h2>
          <p className="text-slate-400 font-medium">Manage your digital presence with ease.</p>
        </div>

        <div className="p-10 space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              {errorMsg}
            </div>
          )}

          {step === 'auth' && (
            <div className="space-y-6">
              {/* Login Method Toggle Pills */}
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('password');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authMode === 'password'
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <span>Admin Password / PIN</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('google');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authMode === 'google'
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3.5 h-3.5" />
                  <span>Google Account</span>
                </button>
              </div>

              {authMode === 'password' ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                      Enter Admin Password or PIN
                    </label>
                    <div className="relative">
                      <input 
                        type={showPin ? "text" : "password"} 
                        required
                        autoFocus
                        value={pinInput}
                        onChange={e => setPinInput(e.target.value)}
                        placeholder="e.g. 8520 or your custom password"
                        className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold font-mono text-slate-900 focus:border-indigo-600 transition-all text-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium pt-1">
                      Initial default activation PIN is <span className="font-mono font-bold text-indigo-600">8520</span>. You can change this anytime inside Admin Settings.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlock Admin Panel (এডমিন প্যানেলে ঢুকুন)</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-xs font-medium">Use your Google account to access your restaurant dashboard.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-900 hover:bg-slate-50 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                    ) : (
                      <>
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                        <span>Continue with Google</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'selection' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">Your Restaurants</h3>
                <p className="text-slate-500 text-sm font-medium">Select a restaurant to manage.</p>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {userRestaurants.map(r => (
                  <button 
                    key={r.id}
                    onClick={() => handleSelectRestaurant(r)}
                    className="w-full flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black shadow-sm">
                        {r.brandName.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-900">{r.brandName}</p>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{r.subscriptionPlan} Plan</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setStep('create')}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add New Restaurant
              </button>
            </div>
          )}

          {step === 'create' && (
            <form onSubmit={handleCreateRestaurant} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">Create Restaurant Profile</h3>
                <p className="text-slate-500 text-sm font-medium">Let's set up your new digital menu.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Restaurant Name</label>
                  <input 
                    type="text" 
                    required
                    value={newRestaurantName}
                    onChange={e => setNewRestaurantName(e.target.value)}
                    placeholder="e.g. L'Aura Fine Dining"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-900 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City / Location</label>
                  <input 
                    type="text" 
                    value={newRestaurantLocation}
                    onChange={e => setNewRestaurantLocation(e.target.value)}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-900 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => userRestaurants.length > 0 ? setStep('selection') : setStep('auth')}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Store className="w-5 h-5" />}
                  Launch Restaurant
                </button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Powered by WebAR Enterprise</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);
