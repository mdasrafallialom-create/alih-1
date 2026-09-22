import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Lock, ShieldCheck, X, CheckCircle2, Loader2, Sparkles, Check, Wifi } from 'lucide-react';
import { PricingPlan } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (planId: string) => void;
  plan: PricingPlan;
  theme: 'light' | 'dark';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, plan, theme }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'generic'>('generic');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleCardNumberChange = (val: string) => {
    // Only numbers and spaces
    const clean = val.replace(/\D/g, '').slice(0, 16);
    // Format into groups of 4
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
    
    // Auto-detect card network
    if (clean.startsWith('4')) {
      setCardType('visa');
    } else if (clean.startsWith('51') || clean.startsWith('52') || clean.startsWith('53') || clean.startsWith('54') || clean.startsWith('55') || (clean.length >= 4 && parseInt(clean.slice(0, 4)) >= 2221 && parseInt(clean.slice(0, 4)) <= 2720)) {
      setCardType('mastercard');
    } else if (clean.startsWith('34') || clean.startsWith('37')) {
      setCardType('amex');
    } else {
      setCardType('generic');
    }

    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 2) {
      setFormData(prev => ({ ...prev, expiry: `${clean.slice(0, 2)}/${clean.slice(2)}` }));
    } else {
      setFormData(prev => ({ ...prev, expiry: clean }));
    }
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(plan.id);
      }, 2000);
    }, 2500);
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`relative w-full max-w-lg my-auto overflow-hidden rounded-[2.5rem] shadow-2xl ${
              isDark ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-200'
            }`}
          >
            {step === 'details' && (
              <div className="p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Checkout & Gateway</h2>
                      <p className="text-xs text-slate-500 font-medium">SSL 256-bit Encrypted Payment</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Selected Plan Summary Banner */}
                <div className={`p-4 sm:p-5 rounded-2xl mb-5 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/80'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Selected Plan</span>
                    <span className="px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xs">
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>${plan.price}</span>
                      <span className="text-slate-500 text-xs font-bold uppercase">/ {plan.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified & Encrypted</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Virtual Card Mockup Preview */}
                <div className="mb-6 relative">
                  <div className="w-full h-48 sm:h-52 rounded-3xl p-5 sm:p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-white/15 relative overflow-hidden flex flex-col justify-between select-none">
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

                    {/* Card Top: Chip + Wifi + Card Logo */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        {/* EMV Chip */}
                        <div className="w-11 h-8 rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 shadow-inner flex items-center justify-center relative overflow-hidden">
                          <div className="w-full h-[1px] bg-amber-600/60 absolute top-2" />
                          <div className="w-full h-[1px] bg-amber-600/60 absolute bottom-2" />
                          <div className="h-full w-[1px] bg-amber-600/60 absolute left-3" />
                          <div className="h-full w-[1px] bg-amber-600/60 absolute right-3" />
                        </div>
                        <Wifi className="w-5 h-5 text-slate-400 rotate-90" />
                      </div>

                      {/* Brand Logo (Visa, Mastercard, Amex, or Credit Badge) */}
                      <div className="flex items-center gap-2">
                        {cardType === 'visa' && (
                          <span className="font-display font-black italic tracking-tighter text-2xl text-blue-400 drop-shadow-md">
                            VISA
                          </span>
                        )}
                        {cardType === 'mastercard' && (
                          <div className="flex -space-x-3">
                            <div className="w-7 h-7 rounded-full bg-red-500/90" />
                            <div className="w-7 h-7 rounded-full bg-amber-400/90" />
                          </div>
                        )}
                        {cardType === 'amex' && (
                          <span className="font-mono font-black text-sm bg-blue-600 text-white px-2 py-0.5 rounded border border-blue-400">
                            AMEX
                          </span>
                        )}
                        {cardType === 'generic' && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            DEBIT / CREDIT
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Middle: Card Number */}
                    <div className="relative z-10 my-2">
                      <span className="font-mono text-lg sm:text-xl font-bold tracking-[0.2em] text-slate-100 drop-shadow">
                        {formData.cardNumber ? formData.cardNumber : '•••• •••• •••• ••••'}
                      </span>
                    </div>

                    {/* Card Bottom: Cardholder Name & Expiry */}
                    <div className="flex items-end justify-between relative z-10 text-xs">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">CARDHOLDER NAME</span>
                        <span className="font-mono font-bold tracking-wider text-slate-200 truncate max-w-[180px] block">
                          {formData.name ? formData.name : 'CARDHOLDER NAME'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">EXPIRES</span>
                        <span className="font-mono font-bold tracking-widest text-slate-200">
                          {formData.expiry ? formData.expiry : 'MM/YY'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supported Payment Gateways & Cards Badge Row */}
                <div className="mb-5 pb-5 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Accepted Payment Methods
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Instant Activation
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {/* Visa Badge */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 transition-colors">
                      <span className="font-black italic text-xs tracking-tighter text-blue-600 dark:text-blue-400">VISA</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Credit/Debit</span>
                    </div>

                    {/* Mastercard Badge */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 transition-colors">
                      <div className="flex -space-x-1.5 mb-0.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                      </div>
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Mastercard</span>
                    </div>

                    {/* American Express Badge */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 transition-colors">
                      <span className="font-black text-[10px] text-sky-600 tracking-wider">AMEX</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Express</span>
                    </div>

                    {/* Discover Badge */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 transition-colors">
                      <span className="font-black text-[10px] text-orange-600 tracking-tight">DISCOVER</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Global</span>
                    </div>

                    {/* Apple Pay */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 transition-colors">
                      <span className="font-black text-[10px] text-slate-900 dark:text-white">Pay</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Apple Pay</span>
                    </div>

                    {/* Google Pay */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 transition-colors">
                      <span className="font-black text-[10px] text-indigo-600 dark:text-indigo-400">G Pay</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Google</span>
                    </div>
                  </div>
                </div>

                {/* Form Input Fields */}
                <form onSubmit={(e) => { e.preventDefault(); handlePay(); }} autoComplete="off" className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="JOHN DOE"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      data-lpignore="true"
                      data-form-type="other"
                      className={`w-full px-5 py-3.5 rounded-2xl border font-bold text-sm outline-none transition-all ${
                        isDark ? 'bg-slate-800 border-white/10 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'
                      }`}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value.toUpperCase()})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Card Number (Visa / Mastercard / Amex)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        inputMode="numeric"
                        placeholder="4532 0000 0000 0000"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        data-lpignore="true"
                        data-form-type="other"
                        className={`w-full px-5 py-3.5 rounded-2xl border font-mono font-bold text-sm outline-none transition-all pr-12 ${
                          isDark ? 'bg-slate-800 border-white/10 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'
                        }`}
                        value={formData.cardNumber}
                        onChange={e => handleCardNumberChange(e.target.value)}
                      />
                      <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Expiry Date</label>
                      <input 
                        type="text" 
                        inputMode="numeric"
                        placeholder="MM/YY"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        data-lpignore="true"
                        data-form-type="other"
                        className={`w-full px-5 py-3.5 rounded-2xl border font-mono font-bold text-sm outline-none transition-all ${
                          isDark ? 'bg-slate-800 border-white/10 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'
                        }`}
                        value={formData.expiry}
                        onChange={e => handleExpiryChange(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">CVC / CVV</label>
                      <input 
                        type="password" 
                        inputMode="numeric"
                        placeholder="***"
                        maxLength={4}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        data-lpignore="true"
                        data-form-type="other"
                        className={`w-full px-5 py-3.5 rounded-2xl border font-mono font-bold text-sm outline-none transition-all ${
                          isDark ? 'bg-slate-800 border-white/10 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'
                        }`}
                        value={formData.cvc}
                        onChange={e => setFormData({...formData, cvc: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Checkout Submit Button */}
                  <button 
                    type="submit"
                    disabled={!formData.cardNumber || !formData.name}
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>PAY ${plan.price} NOW</span>
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-3 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">256-Bit SSL End-to-End Encryption</span>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 mb-8"
                />
                <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Authorizing Payment</h2>
                <p className="text-sm text-slate-500 font-bold">Contacting bank gateway. Please do not refresh or close.</p>
              </div>
            )}

            {step === 'success' && (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Payment Successful!</h2>
                <p className="text-sm text-slate-500 font-bold mb-8">Welcome to your active <span className="text-indigo-600 uppercase font-black">{plan.name}</span> subscription.</p>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-600 rounded-full font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Activating instant features...</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;

