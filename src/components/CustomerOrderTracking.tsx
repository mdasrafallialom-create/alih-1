import React from 'react';
import { Order } from '../types';
import { Clock, CheckCircle2, Flame, Send, Utensils, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { Language } from '../lib/translations';

interface CustomerOrderTrackingProps {
  orders: Order[];
  tableNumber: number | string | null;
  lang: Language;
}

export default function CustomerOrderTracking({ orders, tableNumber, lang }: CustomerOrderTrackingProps) {
  const user = auth.currentUser;
  
  // Only show active orders for this table OR for this logged-in user
  const myActiveOrders = orders.filter(o => {
    const isMyEmail = user?.email && o.customerEmail === user.email;
    const isMyTable = o.tableNumber.toString() === tableNumber?.toString();
    const isActive = !['Completed', 'Cancelled'].includes(o.status);
    
    // If logged in, prioritize email match. If not, table match (for anonymous guest users if allowed, but we require login now)
    return (isMyEmail || (isMyTable && !o.customerEmail)) && isActive;
  });

  if (myActiveOrders.length === 0) return null;

  const statuses = [
    { id: 'Pending', label: lang === 'en' ? 'Order Received' : lang === 'ar' ? 'تم استلام الطلب' : 'অর্ডার গ্রহণ করা হয়েছে', icon: Clock, desc: lang === 'en' ? 'At Manager\'s Computer' : lang === 'ar' ? 'عند جهاز المدير' : 'ম্যানেজারের কম্পিউটারে আছে' },
    { id: 'Confirmed', label: lang === 'en' ? 'Confirmed' : lang === 'ar' ? 'تم التأكيد' : 'অর্ডার কনফার্মড', icon: Info, desc: lang === 'en' ? 'Order Confirmed' : lang === 'ar' ? 'تم تأكيد طلبك' : 'অর্ডার কনফার্মড' },
    { id: 'Kitchen', label: lang === 'en' ? 'Kitchen' : lang === 'ar' ? 'في المطبخ' : 'কিচেন', icon: Flame, desc: lang === 'en' ? 'Cooking in Kitchen' : lang === 'ar' ? 'يتم الطهي الآن' : 'কিচেনে রান্না হচ্ছে' },
    { id: 'Serving', label: lang === 'en' ? 'Serving' : lang === 'ar' ? 'جاري التقديم' : 'সার্ভিং', icon: Send, desc: lang === 'en' ? 'Bringing Food' : lang === 'ar' ? 'يتم إحضار الطعام' : 'খাবার আনা হচ্ছে' }
  ];

  const getStatusIndex = (status: string) => {
    return statuses.findIndex(s => s.id === status);
  };

  return (
    <div className="space-y-6 mb-12 animate-fade-in no-print">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-100 border border-cyan-200 text-cyan-700">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-extrabold text-slate-900">
              {lang === 'en' ? 'Your Active Orders' : lang === 'ar' ? 'طلباتক النشطة' : 'আপনার বর্তমান অর্ডারসমূহ'}
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              {lang === 'en' ? 'Real-time status of your meal' : lang === 'ar' ? 'حالة وجبتك في الوقت الفعلي' : 'আপনার খাবারের লাইভ আপডেট'}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-wider border border-slate-200">
          {lang === 'en' ? 'Table' : lang === 'ar' ? 'طاولة' : 'টেবিল'} {tableNumber}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {myActiveOrders.map((order) => {
            const currentIndex = getStatusIndex(order.status);
            
            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Order ID</span>
                    <h3 className="text-lg font-mono font-bold text-slate-900 leading-none">
                      #{order.id.slice(-6).toUpperCase()}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Status</span>
                    <p className="font-display font-bold text-cyan-600 text-sm">{order.status}</p>
                  </div>
                </div>

                {/* Progress Pipeline Visualization */}
                <div className="relative pt-2 pb-6">
                  {/* Background Track */}
                  <div className="absolute top-[21px] left-4 right-4 h-0.5 bg-slate-100" />
                  
                  {/* Progress Line */}
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
                    className="absolute top-[21px] left-4 h-0.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-1000"
                  />

                  <div className="flex justify-between relative z-10">
                    {statuses.map((step, idx) => {
                      const isActive = idx === currentIndex;
                      const isPast = idx < currentIndex;
                      const Icon = step.icon;

                      return (
                        <div key={step.id} className="flex flex-col items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                            isActive 
                              ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg scale-110' 
                              : isPast 
                                ? 'bg-emerald-500 border-emerald-400 text-white' 
                                : 'bg-white border-slate-200 text-slate-300'
                          }`}>
                            <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                          </div>
                          <div className="text-center">
                            <p className={`text-[10px] font-display font-bold uppercase tracking-tight transition-colors duration-500 ${
                              isActive ? 'text-cyan-700' : isPast ? 'text-emerald-600' : 'text-slate-400'
                            }`}>
                              {step.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Current Status Description (Bilingual) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                    <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-wider">Current Update</span>
                  </div>
                  <p className="text-sm font-display font-semibold text-slate-800">
                    {statuses[currentIndex]?.desc || 'Your order is being processed.'}
                  </p>
                </div>

                {/* Mini Item Summary */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Ordered Items</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-lg bg-white border border-slate-100 text-[10px] text-slate-600 font-medium">
                        {item.menuItem.name} x{item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
