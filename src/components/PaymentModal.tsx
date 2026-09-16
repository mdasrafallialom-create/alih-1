import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Lock, ShieldCheck, X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-lg overflow-hidden rounded-[2.5rem] shadow-2xl ${
              isDark ? 'bg-slate-900 border border-white/10' : 'bg-white'
            }`}
          >
            {step === 'details' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Checkout</h2>
                      <p className="text-xs text-slate-500">Secure payment gateway</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className={`p-6 rounded-3xl mb-8 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Selected Plan</span>
                    <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>${plan.price}</span>
                      <span className="text-slate-500 text-xs font-bold">/ {plan.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Encrypted
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="JOHN DOE"
                      className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm outline-none transition-all ${
                        isDark ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value.toUpperCase()})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm outline-none transition-all pr-12 ${
                          isDark ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'
                        }`}
                        value={formData.cardNumber}
                        onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                      />
                      <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm outline-none transition-all ${
                          isDark ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'
                        }`}
                        value={formData.expiry}
                        onChange={e => setFormData({...formData, expiry: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">CVC / CVV</label>
                      <input 
                        type="password" 
                        placeholder="***"
                        maxLength={3}
                        className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm outline-none transition-all ${
                          isDark ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'
                        }`}
                        value={formData.cvc}
                        onChange={e => setFormData({...formData, cvc: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePay}
                  disabled={!formData.cardNumber || !formData.name}
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
                >
                  Pay ${plan.price} Now
                </button>

                <div className="mt-6 flex items-center justify-center gap-4 opacity-40 grayscale">
                  <Lock className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">SSL Secure Connection</span>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-600 mb-8"
                />
                <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Processing Payment</h2>
                <p className="text-sm text-slate-500 font-bold">Please do not refresh or close this window.</p>
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
                <p className="text-sm text-slate-500 font-bold mb-8">Welcome to the <span className="text-blue-500 uppercase">{plan.name}</span> experience.</p>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Unlocking features...</span>
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
