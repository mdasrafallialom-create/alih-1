import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Settings, 
  CreditCard, 
  X, 
  ChevronUp, 
  ChevronDown,
  Building2,
  CheckCircle2,
  Zap,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';
import { TrialSessionData } from './DemoTrialModal';

interface TrialTimerBannerProps {
  trialSession: TrialSessionData;
  onOpenAdmin: () => void;
  onOpenCheckout: () => void;
  onOpenThemeStore?: () => void;
  onUpdateTrialSession?: (updatedSession: TrialSessionData) => void;
  lang?: string;
}

export const TrialTimerBanner: React.FC<TrialTimerBannerProps> = ({
  trialSession,
  onOpenAdmin,
  onOpenCheckout,
  onOpenThemeStore,
  onUpdateTrialSession,
  lang = 'en'
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  
  // Calculate simulated offset if any
  const simulatedOffsetMs = trialSession.simulatedDayOffsetMs || 0;
  const effectiveNow = Date.now() + simulatedOffsetMs;
  const timeRemainingMs = Math.max(0, trialSession.expiresAt - effectiveNow);
  const msPassed = Math.max(0, effectiveNow - trialSession.startTime);

  // Re-render tick every second
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time into Hours, Minutes, Seconds
  const hours = Math.floor(timeRemainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);
  const formattedTime = `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;

  // Determine current day state based on msPassed
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  let dayLabel = '';
  let dayBadge = '';
  let currentDayNumber = 1;
  let isExpired = timeRemainingMs <= 0 || msPassed >= 3 * ONE_DAY_MS;

  if (msPassed < ONE_DAY_MS) {
    currentDayNumber = 1;
    dayBadge = 'Day 1 Active';
    dayLabel = 'Day 1 in Progress (0 Days Passed, 2 Days Remaining)';
  } else if (msPassed >= ONE_DAY_MS && msPassed < 2 * ONE_DAY_MS) {
    currentDayNumber = 2;
    dayBadge = 'Day 2 Active';
    dayLabel = '1 Day Passed (Day 2 Active, 1 Day Remaining)';
  } else if (msPassed >= 2 * ONE_DAY_MS && msPassed < 3 * ONE_DAY_MS) {
    currentDayNumber = 3;
    dayBadge = 'Day 3 Active';
    dayLabel = '2 Days Passed (Day 3 Active - Trial Ending Soon)';
  } else {
    currentDayNumber = 4;
    isExpired = true;
    dayBadge = 'Trial Expired';
    dayLabel = '3 Days Passed! Your 3-Day Free Demo Trial has expired.';
  }

  // Set simulated day offset function
  const handleSetSimulatedDay = (dayIndex: 1 | 2 | 3 | 4) => {
    let offset = 0;
    if (dayIndex === 1) offset = 0; // Day 1
    if (dayIndex === 2) offset = ONE_DAY_MS + 1000; // 1 Day passed (Day 2)
    if (dayIndex === 3) offset = 2 * ONE_DAY_MS + 1000; // 2 Days passed (Day 3)
    if (dayIndex === 4) offset = 3 * ONE_DAY_MS + 1000; // 3 Days passed (Expired)

    const updated = {
      ...trialSession,
      simulatedDayOffsetMs: offset
    };
    if (onUpdateTrialSession) {
      onUpdateTrialSession(updated);
    }
    try {
      localStorage.setItem('webar_trial_session', JSON.stringify(updated));
    } catch (e) {}

    if (dayIndex === 4) {
      onOpenCheckout();
    }
  };

  if (isExpired) {
    return (
      <div className="sticky top-0 z-[1050] w-full bg-gradient-to-r from-red-600 via-rose-700 to-pink-700 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-bold shadow-2xl border-b border-rose-400/50 no-print">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-300 animate-bounce shrink-0" />
          <div>
            <span className="font-black text-amber-300 block text-xs uppercase tracking-wider">
              🚨 3 DAYS PASSED! TRIAL EXPIRED
            </span>
            <span className="text-[11px] text-rose-100">
              Your 3-day free demo trial period has ended. Subscribe now to continue using all themes.
            </span>
          </div>
        </div>

        {/* Day Simulator buttons for testing */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleSetSimulatedDay(1)}
            className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-[10px] font-mono font-bold text-white border border-white/30 cursor-pointer"
            title="Reset to Day 1 for testing"
          >
            <RotateCcw className="w-3 h-3 inline mr-1" />
            <span>Reset Day 1</span>
          </button>

          <button
            onClick={onOpenCheckout}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black uppercase text-xs tracking-wider hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer shadow-lg active:scale-95 animate-pulse"
          >
            <span>Subscribe & Pay Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-[1050] w-full no-print">
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white border-b border-indigo-400/40 shadow-xl flex flex-col overflow-hidden"
          >
            {/* Top Subdomain Bar */}
            <div className="w-full flex items-center justify-center py-1.5 px-4 bg-slate-950/20 border-b border-white/5 select-none gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/50 border border-white/10 w-full max-w-md shadow-inner text-center justify-center">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-300 truncate">
                  https://<strong className="text-cyan-300 font-extrabold">{(trialSession?.restaurantName || 'myrestaurant').toLowerCase().trim().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'myrestaurant'}</strong>.myrestaurant.com
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-black text-[8px] uppercase tracking-wider">
                  {'Demo Subdomain'}
                </span>
              </div>
            </div>

            {/* Main Bar Info */}
            <div className="px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Left: Day Badge & Progress Label */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-lg animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{dayBadge}</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <Building2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="font-bold text-white truncate max-w-[150px] sm:max-w-[220px]">
                    {trialSession.restaurantName}
                  </span>
                  <span className="text-amber-200 font-semibold hidden md:inline text-[11px]">
                    • {dayLabel}
                  </span>
                </div>
              </div>

            {/* Center: Real-time Countdown Timer & Day Simulation Buttons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/60 border border-amber-400/50 shadow-inner backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider hidden sm:inline">
                  Time Left:
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-amber-300 tracking-wider">
                  {formattedTime}
                </span>
              </div>

              {/* Day Simulator Trigger button */}
              <button
                type="button"
                onClick={() => setShowSimulator(!showSimulator)}
                className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 text-[10px] font-bold transition-all cursor-pointer"
                title="Test Day 1, Day 2, Day 3, or Expired trial states"
              >
                <span>🧪 Test Days</span>
              </button>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-full bg-white text-indigo-900 hover:bg-slate-100 font-extrabold text-[10px] uppercase tracking-wider shadow transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                title="Open Admin Panel & Switch Theme"
              >
                <Settings className="w-3.5 h-3.5 text-indigo-700" />
                <span>Admin & Settings</span>
              </button>

              <button
                type="button"
                onClick={onOpenCheckout}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                title="Upgrade to Full Subscription"
              >
                <CreditCard className="w-3.5 h-3.5 fill-slate-950" />
                <span>Subscribe Now</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="Minimize Banner"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            {/* Simulation Dropdown Bar */}
            {showSimulator && (
              <div className="w-full pt-2 border-t border-white/20 flex items-center justify-between gap-2 text-[10px] bg-slate-950/40 p-2 rounded-xl backdrop-blur-md">
                <span className="font-bold text-amber-300">
                  🧪 Simulate 3-Day Trial Progress:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSetSimulatedDay(1)}
                    className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                      currentDayNumber === 1 ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>Day 1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSimulatedDay(2)}
                    className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                      currentDayNumber === 2 ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>1 Day Passed</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSimulatedDay(3)}
                    className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                      currentDayNumber === 3 ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>2 Days Passed</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSimulatedDay(4)}
                    className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                      currentDayNumber === 4 ? 'bg-rose-500 text-white border-rose-400 shadow-md' : 'bg-rose-950 text-rose-300 border-rose-800 hover:bg-rose-900'
                    }`}
                  >
                    <span>3 Days Passed (Expired)</span>
                  </button>
                </div>
              </div>
            )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-2 right-4 z-[1050] bg-gradient-to-r from-blue-700 to-indigo-800 text-white border border-indigo-300/50 backdrop-blur-md px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-2 text-[11px] font-bold cursor-pointer hover:scale-105 transition-all"
            onClick={() => setIsMinimized(false)}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>{dayBadge}</span>
            <span className="font-mono font-black text-amber-200">({formattedTime})</span>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// =============================================================================
// ADMIN SETTINGS EMBEDDED CARD (Rendered inside Admin Panel under Settings)
// =============================================================================
export const TrialTimerCard: React.FC<{
  trialSession: TrialSessionData;
  onOpenCheckout: () => void;
  onUpdateTrialSession?: (updatedSession: TrialSessionData) => void;
  lang?: string;
  theme?: 'light' | 'dark';
}> = ({
  trialSession,
  onOpenCheckout,
  onUpdateTrialSession,
  lang = 'en',
  theme = 'light'
}) => {
  const simulatedOffsetMs = trialSession.simulatedDayOffsetMs || 0;
  const effectiveNow = Date.now() + simulatedOffsetMs;
  const timeRemainingMs = Math.max(0, trialSession.expiresAt - effectiveNow);
  const msPassed = Math.max(0, effectiveNow - trialSession.startTime);

  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeRemainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);
  const formattedTime = `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  let dayBadge = '';
  let dayLabel = '';
  let currentDayNumber = 1;
  let isExpired = timeRemainingMs <= 0 || msPassed >= 3 * ONE_DAY_MS;

  if (msPassed < ONE_DAY_MS) {
    currentDayNumber = 1;
    dayBadge = 'Day 1 Active';
    dayLabel = 'Day 1 in Progress (0 Days Passed, 2 Days Remaining)';
  } else if (msPassed >= ONE_DAY_MS && msPassed < 2 * ONE_DAY_MS) {
    currentDayNumber = 2;
    dayBadge = 'Day 2 Active';
    dayLabel = '1 Day Passed (Day 2 Active, 1 Day Remaining)';
  } else if (msPassed >= 2 * ONE_DAY_MS && msPassed < 3 * ONE_DAY_MS) {
    currentDayNumber = 3;
    dayBadge = 'Day 3 Active';
    dayLabel = '2 Days Passed (Day 3 Active - Trial Ending Soon)';
  } else {
    currentDayNumber = 4;
    isExpired = true;
    dayBadge = 'Expired';
    dayLabel = '3 Days Passed! Your 3-Day Free Demo Trial has expired.';
  }

  const handleSetSimulatedDay = (dayIndex: 1 | 2 | 3 | 4) => {
    let offset = 0;
    if (dayIndex === 1) offset = 0;
    if (dayIndex === 2) offset = ONE_DAY_MS + 1000;
    if (dayIndex === 3) offset = 2 * ONE_DAY_MS + 1000;
    if (dayIndex === 4) offset = 3 * ONE_DAY_MS + 1000;

    const updated = { ...trialSession, simulatedDayOffsetMs: offset };
    if (onUpdateTrialSession) onUpdateTrialSession(updated);
    try {
      localStorage.setItem('webar_trial_session', JSON.stringify(updated));
    } catch (e) {}

    if (dayIndex === 4) {
      onOpenCheckout();
    }
  };

  return (
    <div className={`mt-6 p-5 rounded-3xl border shadow-xl transition-all ${
      isExpired
        ? 'bg-gradient-to-r from-rose-900 to-red-950 text-white border-rose-500/50'
        : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border-indigo-500/40'
    }`}>
      <div className="flex flex-col gap-3">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              3-Day Free Demo Trial Status
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
            {dayBadge}
          </span>
        </div>

        <p className="text-xs font-medium text-slate-200">
          {dayLabel}
        </p>

        {/* Progress Day Indicators */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className={`p-2 rounded-xl text-center border text-[10px] font-bold ${
            currentDayNumber === 1
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-black'
              : currentDayNumber > 1
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-white/10 text-white/50 border-white/10'
          }`}>
            <span>Day 1</span>
          </div>

          <div className={`p-2 rounded-xl text-center border text-[10px] font-bold ${
            currentDayNumber === 2
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-black'
              : currentDayNumber > 2
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-white/10 text-white/50 border-white/10'
          }`}>
            <span>Day 2</span>
          </div>

          <div className={`p-2 rounded-xl text-center border text-[10px] font-bold ${
            currentDayNumber === 3
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-black'
              : currentDayNumber >= 4
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-white/10 text-white/50 border-white/10'
          }`}>
            <span>Day 3</span>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/10">
          <span className="text-[11px] font-bold text-slate-300">
            Time Remaining:
          </span>
          <span className="font-mono text-sm font-black text-amber-300 tracking-wider">
            {formattedTime}
          </span>
        </div>

        {/* Simulator controls */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-amber-200 block">
            🧪 Simulate Trial Day Progress:
          </span>
          <div className="grid grid-cols-4 gap-1">
            <button
              type="button"
              onClick={() => handleSetSimulatedDay(1)}
              className={`py-1 px-1.5 rounded-lg text-[9px] font-bold border cursor-pointer ${
                currentDayNumber === 1 ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              Day 1
            </button>
            <button
              type="button"
              onClick={() => handleSetSimulatedDay(2)}
              className={`py-1 px-1.5 rounded-lg text-[9px] font-bold border cursor-pointer ${
                currentDayNumber === 2 ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              1 Day
            </button>
            <button
              type="button"
              onClick={() => handleSetSimulatedDay(3)}
              className={`py-1 px-1.5 rounded-lg text-[9px] font-bold border cursor-pointer ${
                currentDayNumber === 3 ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              2 Days
            </button>
            <button
              type="button"
              onClick={() => handleSetSimulatedDay(4)}
              className={`py-1 px-1.5 rounded-lg text-[9px] font-bold border cursor-pointer ${
                currentDayNumber === 4 ? 'bg-rose-500 text-white border-rose-400' : 'bg-rose-950 text-rose-300 border-rose-800 hover:bg-rose-900'
              }`}
            >
              Expired
            </button>
          </div>
        </div>

        {/* Upgrade / Subscribe Button */}
        <button
          type="button"
          onClick={onOpenCheckout}
          className="w-full mt-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4 fill-slate-950" />
          <span>Subscribe & Payment Option</span>
        </button>
      </div>
    </div>
  );
};
