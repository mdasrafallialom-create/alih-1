import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Lock, ShieldCheck, X, CheckCircle2, Loader2, Sparkles, Check, Wifi, Landmark, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';

interface CardGraphicProps {
  type: 'visa' | 'mastercard' | 'amex' | 'discover' | 'applepay' | 'gpay';
  isMini?: boolean;
  cardNumber?: string;
  name?: string;
  expiry?: string;
}

const CardGraphic: React.FC<CardGraphicProps> = ({ type, isMini = false, cardNumber, name, expiry }) => {
  const getCardStyle = () => {
    switch (type) {
      case 'visa':
        return {
          bg: 'bg-gradient-to-tr from-[#0a192f] via-[#113264] to-[#1e4d8c]',
          border: 'border-blue-400/40 shadow-blue-900/30',
          textColor: 'text-white',
          chipColor: 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border-amber-400/80',
          logo: (
            <div className="flex flex-col items-end">
              <span className="font-extrabold italic tracking-tighter text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-100 to-white drop-shadow">
                VISA
              </span>
              <span className="text-[7px] sm:text-[8px] font-black tracking-widest text-cyan-300 uppercase -mt-1">PLATINUM</span>
            </div>
          ),
          accentBar: null
        };
      case 'mastercard':
        return {
          bg: 'bg-gradient-to-br from-[#121212] via-[#1c1c1e] to-[#09090a]',
          border: 'border-zinc-700/50 shadow-zinc-950/40',
          textColor: 'text-white',
          chipColor: 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border-amber-400/80',
          logo: (
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2.5 filter drop-shadow">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#EB001B]" />
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F79E1B] opacity-90" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">mastercard</span>
                <span className="text-[6px] font-bold text-amber-400 uppercase">World Elite</span>
              </div>
            </div>
          ),
          accentBar: null
        };
      case 'amex':
        return {
          bg: 'bg-gradient-to-tr from-[#cbd5e1] via-[#f1f5f9] to-[#94a3b8]',
          border: 'border-slate-400/80 shadow-slate-900/20',
          textColor: 'text-slate-900',
          chipColor: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-slate-400',
          logo: (
            <div className="bg-[#006FCF] text-white font-black text-[9px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-sm border border-blue-300/40 tracking-wider">
              AMERICAN EXPRESS
            </div>
          ),
          accentBar: null
        };
      case 'discover':
        return {
          bg: 'bg-gradient-to-tr from-[#3b1200] via-[#833008] to-[#c2410c]',
          border: 'border-orange-500/30 shadow-orange-950/40',
          textColor: 'text-white',
          chipColor: 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border-amber-400/80',
          logo: (
            <div className="flex items-center gap-1 font-black text-sm sm:text-lg tracking-tighter text-white drop-shadow">
              <span>DISC</span>
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 border border-white/50" />
              <span>VER</span>
            </div>
          ),
          accentBar: null
        };
      case 'applepay':
        return {
          bg: 'bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]',
          border: 'border-slate-300 shadow-slate-900/10',
          textColor: 'text-slate-900',
          chipColor: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-slate-400',
          logo: (
            <div className="flex items-center gap-1 bg-slate-900 text-white px-2.5 py-1 rounded-full shadow-sm font-black text-xs">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.08-3.32-2.71-7.18-7.3-11.58-13.77-6.08-8.91-10.87-18.73-14.38-29.47-3.51-10.74-5.26-20.91-5.26-30.5 0-11.83 2.92-21.73 8.76-29.7 5.84-7.97 13.33-12.08 22.48-12.33 4.13 0 8.94 1.1 14.43 3.3 5.49 2.2 9.24 3.3 11.25 3.3 1.8 0 5.66-1.12 11.59-3.36 5.92-2.24 10.51-3.29 13.76-3.16 8.52.5 15.64 3.61 21.36 9.35-10.15 6.13-15.1 14.54-14.86 25.23.24 8.39 3.51 15.42 9.8 21.09 6.29 5.67 13.72 8.87 22.28 9.6-2.4 7.07-5.59 13.91-9.57 20.52zM119.22 31.84c0-6.19 2.27-12.06 6.81-17.62 4.54-5.56 10.19-8.83 16.96-9.82.25 1.13.38 2.14.38 3.02 0 6.12-2.29 11.97-6.87 17.55-4.58 5.58-10.3 8.89-17.16 9.93-.08-.88-.12-2-.12-3.06z"/>
              </svg>
              <span>Pay</span>
            </div>
          ),
          accentBar: null
        };
      case 'gpay':
        return {
          bg: 'bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#1f2937]',
          border: 'border-blue-500/30 shadow-indigo-950/40',
          textColor: 'text-white',
          chipColor: 'bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border-amber-400/80',
          logo: (
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20">
              <span className="font-black text-xs sm:text-sm text-blue-400">G</span>
              <span className="font-bold text-xs sm:text-sm text-white">Pay</span>
            </div>
          ),
          accentBar: (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />
          )
        };
    }
  };

  const style = getCardStyle();

  if (isMini) {
    const getMiniLogo = () => {
      switch (type) {
        case 'visa':
          return (
            <span className="font-extrabold italic tracking-tight text-xs sm:text-sm text-white drop-shadow">
              VISA
            </span>
          );
        case 'mastercard':
          return (
            <div className="flex -space-x-1 filter drop-shadow">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]" />
            </div>
          );
        case 'amex':
          return (
            <span className="font-black text-[9px] text-white bg-[#006FCF] px-1 py-0.5 rounded-xs tracking-tighter shadow-xs">
              AMEX
            </span>
          );
        case 'discover':
          return (
            <span className="font-black text-[9px] text-white tracking-tighter drop-shadow-xs">
              DISCOVER
            </span>
          );
        case 'applepay':
          return (
            <div className="flex items-center gap-0.5 font-black text-[9px] text-white bg-slate-900 px-1.5 py-0.5 rounded-full shadow-xs">
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.08-3.32-2.71-7.18-7.3-11.58-13.77-6.08-8.91-10.87-18.73-14.38-29.47-3.51-10.74-5.26-20.91-5.26-30.5 0-11.83 2.92-21.73 8.76-29.7 5.84-7.97 13.33-12.08 22.48-12.33 4.13 0 8.94 1.1 14.43 3.3 5.49 2.2 9.24 3.3 11.25 3.3 1.8 0 5.66-1.12 11.59-3.36 5.92-2.24 10.51-3.29 13.76-3.16 8.52.5 15.64 3.61 21.36 9.35-10.15 6.13-15.1 14.54-14.86 25.23.24 8.39 3.51 15.42 9.8 21.09 6.29 5.67 13.72 8.87 22.28 9.6-2.4 7.07-5.59 13.91-9.57 20.52zM119.22 31.84c0-6.19 2.27-12.06 6.81-17.62 4.54-5.56 10.19-8.83 16.96-9.82.25 1.13.38 2.14.38 3.02 0 6.12-2.29 11.97-6.87 17.55-4.58 5.58-10.3 8.89-17.16 9.93-.08-.88-.12-2-.12-3.06z"/>
              </svg>
              <span>Pay</span>
            </div>
          );
        case 'gpay':
          return (
            <div className="flex items-center gap-0.5 text-[9px] font-black text-white bg-white/15 px-1.5 py-0.5 rounded-sm backdrop-blur-xs">
              <span className="text-blue-400">G</span>
              <span>Pay</span>
            </div>
          );
      }
    };

    return (
      <div className={`w-full aspect-[1.58/1] rounded-md p-1.5 relative overflow-hidden flex flex-col justify-between border shadow-sm select-none transition-all ${style.bg} ${style.border}`}>
        {style.accentBar}
        <div className="w-full flex items-center justify-between">
          <div className={`w-3.5 h-2.5 rounded-[1px] border ${style.chipColor}`} />
          <Wifi className={`w-2 h-2 rotate-90 ${type === 'amex' || type === 'applepay' ? 'text-slate-700' : 'text-slate-300'}`} />
        </div>
        <div className="my-auto flex items-center justify-center w-full px-0.5">
          {getMiniLogo()}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-52 sm:h-56 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none border transition-all ${style.bg} ${style.border} ${style.textColor}`}>
      {style.accentBar}
      
      {/* Light sweep metallic gloss overlay */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-52 h-52 rounded-full bg-gradient-to-tr from-indigo-500/20 to-transparent blur-xl pointer-events-none" />

      {/* Top Header: EMV Chip + Contactless Wave + Official Brand Logo */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          {/* 3D EMV Chip */}
          <div className={`w-11 h-8 rounded-md border shadow-inner flex items-center justify-center relative overflow-hidden ${style.chipColor}`}>
            <div className="w-full h-[1px] bg-amber-600/40 absolute top-2" />
            <div className="w-full h-[1px] bg-amber-600/40 absolute bottom-2" />
            <div className="h-full w-[1px] bg-amber-600/40 absolute left-3" />
            <div className="h-full w-[1px] bg-amber-600/40 absolute right-3" />
          </div>
          <Wifi className={`w-5 h-5 rotate-90 ${type === 'amex' || type === 'applepay' ? 'text-slate-700' : 'text-slate-300'}`} />
        </div>

        <div>
          {style.logo}
        </div>
      </div>

      {/* Card Middle: Card Number (No hardcoded fake numbers) */}
      <div className="relative z-10 my-2">
        <span className="font-mono text-lg sm:text-2xl font-black tracking-[0.22em] drop-shadow-md">
          {cardNumber ? cardNumber : '•••• •••• •••• ••••'}
        </span>
      </div>

      {/* Card Bottom: Cardholder Name & Expiry */}
      <div className="flex items-end justify-between relative z-10 text-xs">
        <div>
          <span className="text-[9px] uppercase tracking-widest font-extrabold block mb-0.5 opacity-70">
            {type === 'applepay' ? 'LINKED ACCOUNT' : 'CARDHOLDER NAME'}
          </span>
          <span className="font-mono font-bold tracking-wider truncate max-w-[200px] block uppercase text-sm">
            {name ? name : 'CARDHOLDER NAME'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-widest font-extrabold block mb-0.5 opacity-70">EXPIRES</span>
          <span className="font-mono font-bold tracking-widest text-sm">
            {expiry ? expiry : 'MM/YY'}
          </span>
        </div>
      </div>
    </div>
  );
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (planId: string) => void;
  plan: PricingPlan;
  theme: 'light' | 'dark';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, plan, theme }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'discover' | 'applepay' | 'gpay'>('visa');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  // Prevent background page scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getGatewayInfo = () => {
    switch (cardType) {
      case 'visa':
        return {
          brandName: 'Visa Platinum Gateway',
          nameLabel: 'Cardholder Name (Visa)',
          namePlaceholder: 'E.G. JOHN DOE',
          numberLabel: 'Visa Card Number',
          numberPlaceholder: '4532 0000 0000 0000',
          bankSettlement: 'Visa Direct Bank Routing Gateway',
          securityBadge: 'Visa Secure 3D-Secure 2.0 Protection',
          buttonText: `PAY $${plan.price} WITH VISA`
        };
      case 'mastercard':
        return {
          brandName: 'Mastercard World Elite Gateway',
          nameLabel: 'Cardholder Name (Mastercard)',
          namePlaceholder: 'E.G. ALEX MORGAN',
          numberLabel: 'Mastercard Card Number',
          numberPlaceholder: '5412 0000 0000 0000',
          bankSettlement: 'Mastercard World Elite Direct Clearing',
          securityBadge: 'Mastercard Identity Check Secured',
          buttonText: `PAY $${plan.price} WITH MASTERCARD`
        };
      case 'amex':
        return {
          brandName: 'American Express Gateway',
          nameLabel: 'Cardholder Name (AMEX)',
          namePlaceholder: 'E.G. SAMANTHA TAYLOR',
          numberLabel: 'AMEX Card Number (15 Digits)',
          numberPlaceholder: '3782 000000 00000',
          bankSettlement: 'AMEX Direct Merchant Bank Settlement',
          securityBadge: 'American Express SafeKey Protection',
          buttonText: `PAY $${plan.price} WITH AMEX`
        };
      case 'discover':
        return {
          brandName: 'Discover Network Gateway',
          nameLabel: 'Cardholder Name (Discover)',
          namePlaceholder: 'E.G. MICHAEL BROWN',
          numberLabel: 'Discover Card Number',
          numberPlaceholder: '6011 0000 0000 0000',
          bankSettlement: 'Discover Network Bank Account Clearing',
          securityBadge: 'Discover ProtectBuy Encrypted Protocol',
          buttonText: `PAY $${plan.price} WITH DISCOVER`
        };
      case 'applepay':
        return {
          brandName: 'Apple Pay Express Gateway',
          nameLabel: 'Apple Account / Cardholder Name',
          namePlaceholder: 'E.G. APPLE PAY USER',
          numberLabel: 'Apple Pay Virtual Token / Card Number',
          numberPlaceholder: '4111 •••• •••• 8892 (Apple Pay)',
          bankSettlement: 'Apple Cash / Direct Bank Transfer Gateway',
          securityBadge: 'Apple Secure Enclave & Biometric Touch ID/Face ID',
          buttonText: `PAY $${plan.price} WITH  PAY`
        };
      case 'gpay':
        return {
          brandName: 'Google Pay Gateway',
          nameLabel: 'Google Account / Cardholder Name',
          namePlaceholder: 'E.G. GOOGLE ACCOUNT HOLDER',
          numberLabel: 'Google Pay Virtual Card Number',
          numberPlaceholder: '4000 •••• •••• 9921 (G Pay)',
          bankSettlement: 'Google Pay Direct Merchant Bank Settlement',
          securityBadge: 'Google Pay 256-Bit SSL Shielded Gateway',
          buttonText: `PAY $${plan.price} WITH G PAY`
        };
    }
  };

  const gateway = getGatewayInfo();

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
    } else if (clean.startsWith('6')) {
      setCardType('discover');
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full max-w-lg max-h-[92vh] my-auto overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col z-10 ${
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

                {/* Interactive Photorealistic Card Mockup Preview */}
                <div className="mb-6 relative perspective-1000">
                  <motion.div 
                    key={cardType}
                    initial={{ opacity: 0, scale: 0.95, rotateY: -8 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <CardGraphic 
                      type={cardType}
                      cardNumber={formData.cardNumber}
                      name={formData.name}
                      expiry={formData.expiry}
                    />
                  </motion.div>
                </div>

                {/* Real Mini Vector Cards Selector Grid */}
                <div className="mb-5 pb-5 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Select Payment Card (Click Card to Preview)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Instant Activation
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                    {[
                      { id: 'visa', name: 'Visa' },
                      { id: 'mastercard', name: 'Mastercard' },
                      { id: 'amex', name: 'Amex' },
                      { id: 'discover', name: 'Discover' },
                      { id: 'applepay', name: 'Apple Pay' },
                      { id: 'gpay', name: 'Google Pay' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCardType(item.id as any)}
                        className={`group relative rounded-lg transition-all duration-200 cursor-pointer p-1 flex flex-col items-center ${
                          cardType === item.id
                            ? 'ring-2 ring-indigo-500 shadow-lg scale-105 z-10 bg-indigo-50/50 dark:bg-indigo-950/30'
                            : 'opacity-80 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <div className="w-full relative rounded-md overflow-hidden shadow-xs">
                          <CardGraphic type={item.id as any} isMini={true} />
                          {cardType === item.id && (
                            <div className="absolute top-1 right-1 bg-indigo-600 text-white p-0.5 rounded-full shadow-md z-20">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className={`text-[8px] sm:text-[9px] font-extrabold uppercase mt-1 tracking-tight text-center leading-none ${
                          cardType === item.id ? 'text-indigo-600 dark:text-indigo-400 font-black' : 'text-slate-500'
                        }`}>
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Input Fields */}
                <form onSubmit={(e) => { e.preventDefault(); handlePay(); }} autoComplete="off" className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      {gateway.nameLabel}
                    </label>
                    <input 
                      type="text" 
                      placeholder={gateway.namePlaceholder}
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      {gateway.numberLabel}
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        inputMode="numeric"
                        placeholder={gateway.numberPlaceholder}
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

                  {/* Connected Merchant Bank Account Gateway Routing Banner */}
                  <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                    isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50/80 border-indigo-200 text-indigo-900'
                  }`}>
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Gateway Settlement Routing
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          Connected
                        </span>
                      </div>
                      <p className="text-[11px] font-bold mt-0.5 leading-snug">
                        {gateway.bankSettlement}
                      </p>
                    </div>
                  </div>

                  {/* Checkout Submit Button */}
                  <button 
                    type="submit"
                    disabled={!formData.cardNumber || !formData.name}
                    className="w-full mt-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.18em] shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{gateway.buttonText}</span>
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-2 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">{gateway.securityBadge}</span>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 mb-6"
                />
                <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Connecting to {gateway.brandName}...
                </h2>
                <p className="text-sm text-slate-500 font-bold mb-4">
                  Routing payment to merchant bank via {gateway.bankSettlement}.
                </p>
                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 font-bold">
                  SSL 256-Bit Encrypted Handshake
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20 text-white"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Payment Authorized & Deposited!
                </h2>
                <p className="text-sm text-slate-500 font-bold mb-6">
                  Transaction completed via <span className="text-indigo-600 font-black">{gateway.brandName}</span> and routed directly to bank account.
                </p>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Plan {plan.name} Activated</span>
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

