import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Lock,
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { AdminSettings } from '../../types';
import { auth, googleProvider, db } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface RestaurantOnboardingGateProps {
  restaurantId: string;
  settings: AdminSettings;
  userEmail?: string;
  userName?: string;
  onUpdateSettings: (updates: Partial<AdminSettings>) => void;
  onComplete: () => void;
  lang?: 'en' | 'bn' | 'ar';
}

export default function RestaurantOnboardingGate({
  restaurantId,
  settings,
  userEmail = '',
  userName = '',
  onUpdateSettings,
  onComplete,
  lang = 'en'
}: RestaurantOnboardingGateProps) {
  // Serialized form fields as requested
  const [gmailEmail, setGmailEmail] = useState(userEmail || 'owner@restaurant.com');
  const [password, setPassword] = useState('');
  const [usPhone, setUsPhone] = useState(settings?.usPhoneNumber || settings?.contactPhone || '+1 (555) 234-5678');
  const [ownerName, setOwnerName] = useState(settings?.ownerName || userName || 'Chef / Owner');
  const [restaurantName, setRestaurantName] = useState(settings?.restaurantName || settings?.brandName || 'Avernao');
  const [locationAndZip, setLocationAndZip] = useState(settings?.brandLocation || '742 Evergreen Terrace, New York, NY 10001');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrorMsg(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email) setGmailEmail(result.user.email);
      if (result.user.displayName) setOwnerName(result.user.displayName);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('Failed to sign in with Google.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName.trim()) {
      setErrorMsg('Please enter your restaurant name.');
      return;
    }
    if (!ownerName.trim()) {
      setErrorMsg('Please enter the owner name.');
      return;
    }
    if (!locationAndZip.trim()) {
      setErrorMsg('Please enter location and ZIP code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const updates: Partial<AdminSettings> = {
      ownerName: ownerName.trim(),
      restaurantName: restaurantName.trim(),
      brandName: restaurantName.trim(),
      brandLocation: locationAndZip.trim(),
      usPhoneNumber: usPhone.trim(),
      contactPhone: usPhone.trim(),
      contactEmail: gmailEmail.trim(),
      ownerEmail: gmailEmail.trim(),
      isProfileComplete: true,
      brandColors: settings?.brandColors || {
        primary: '#0ea5e9',
        secondary: '#0f172a',
        accent: '#f59e0b'
      }
    };

    try {
      if (restaurantId) {
        const restRef = doc(db, 'restaurants', restaurantId);
        await setDoc(restRef, updates, { merge: true });
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(`webar_onboarding_completed_${restaurantId}`, 'true');
        localStorage.setItem('webar_owner_name', ownerName.trim());
      }

      onUpdateSettings(updates);
      onComplete();
    } catch (err: any) {
      console.error('Failed to save setup details:', err);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`webar_onboarding_completed_${restaurantId}`, 'true');
      }
      onUpdateSettings(updates);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      {/* Clean White Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto text-slate-900">
        
        {/* Crisp Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 p-6 sm:p-8 text-white relative">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              <span>🇺🇸</span> USA Target Market Setup
            </span>
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secure Portal
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-400 shrink-0" />
            <span>{'Restaurant Registration & Profile Setup'}</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
            {'Sign in with Gmail and complete your restaurant details below.'}
          </p>
        </div>

        {/* Serialized Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Google Gmail Quick Sign-In Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isGoogleLoading ? 'Connecting Google...' : 'Continue / Sign in with Gmail'}</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 font-semibold">Or enter login credentials & details manually</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 2. Gmail / Email Address */}
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Gmail / Email</span>
              </label>
              <input
                type="email"
                required
                value={gmailEmail}
                onChange={(e) => setGmailEmail(e.target.value)}
                placeholder="owner@gmail.com"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 text-slate-900 font-bold outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 text-slate-900 font-bold outline-none transition-all"
              />
            </div>

            {/* 3. US Phone Number */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-600" />
                <span>US Phone Number (+1)</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono font-black text-slate-700 shrink-0">
                  🇺🇸 +1
                </span>
                <input
                  type="text"
                  required
                  value={usPhone}
                  onChange={(e) => setUsPhone(e.target.value)}
                  placeholder="(555) 234-5678"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-purple-600 text-slate-900 font-mono font-bold outline-none transition-all"
                />
              </div>
            </div>

            {/* 4. Restaurant Owner Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Restaurant Owner Name</span>
              </label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. Chef Rahat Islam"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 text-slate-900 font-bold outline-none transition-all"
              />
            </div>

            {/* 5. Restaurant Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Restaurant Name</span>
              </label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="e.g. My Restaurant"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-600 text-slate-900 font-bold outline-none transition-all"
              />
            </div>

            {/* 6. Combined Restaurant Location & ZIP Code */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Location & US ZIP Code</span>
              </label>
              <input
                type="text"
                required
                value={locationAndZip}
                onChange={(e) => setLocationAndZip(e.target.value)}
                placeholder="e.g. 742 Evergreen Terrace, New York, NY 10001"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-rose-600 text-slate-900 font-bold outline-none transition-all"
              />
            </div>

          </div>

          {/* Clean White Primary Action Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Saving Setup Details...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-blue-200" />
                  <span>Save Setup & Complete Registration</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
