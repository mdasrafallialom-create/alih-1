import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { Clock, CheckCircle2, Flame, Ban, FileText, Send, X } from 'lucide-react';

interface ActiveOrderCardProps {
  order: Order;
  onAccept: (orderId: string) => void;
  onNextStatus: (orderId: string) => void;
  onServe: (orderId: string) => void;
  onCancel: (orderId: string, reason: string) => void;
}

// Wrapped properly with React.forwardRef to completely solve the Framer Motion ref warning
export const ActiveOrderCard = React.forwardRef<HTMLDivElement, ActiveOrderCardProps>(
  ({ order, onAccept, onNextStatus, onServe, onCancel }, ref) => {
    const [timeAgo, setTimeAgo] = useState('');
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    // Calculate elegant relative time (e.g. "Just now", "2m ago")
    useEffect(() => {
      const calculateTimeAgo = () => {
        const diffSecs = Math.floor((Date.now() - order.timestamp) / 1000);
        if (diffSecs < 10) return 'Just now';
        if (diffSecs < 60) return `${diffSecs}s ago`;
        const diffMins = Math.floor(diffSecs / 60);
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        return `${diffHours}h ${diffMins % 60}m ago`;
      };

      setTimeAgo(calculateTimeAgo());
      const interval = setInterval(() => {
        setTimeAgo(calculateTimeAgo());
      }, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }, [order.timestamp]);

    const handleConfirmCancel = (e: React.FormEvent) => {
      e.preventDefault();
      if (!cancelReason.trim()) return;
      onCancel(order.id, cancelReason);
      setIsCancelling(false);
      setCancelReason('');
    };

    const isPending = order.status === 'Pending';
    const isConfirmed = order.status === 'Confirmed';
    const isKitchen = order.status === 'Kitchen';
    const isServing = order.status === 'Serving';

    const getStatusConfig = () => {
      switch (order.status) {
        case 'Pending': return { label: 'New Order', color: 'bg-red-100 border-red-300 text-red-700', icon: Clock };
        case 'Confirmed': return { label: 'Confirmed', color: 'bg-blue-100 border-blue-300 text-blue-700', icon: FileText };
        case 'Kitchen': return { label: 'In Kitchen', color: 'bg-amber-100 border-amber-300 text-amber-800', icon: Flame };
        case 'Serving': return { label: 'Serving', color: 'bg-cyan-100 border-cyan-300 text-cyan-700', icon: Send };
        case 'Completed': return { label: 'Served', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', icon: CheckCircle2 };
        default: return { label: order.status, color: 'bg-slate-100 border-slate-300 text-slate-700', icon: Clock };
      }
    };

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
      <div
        ref={ref}
        className={`rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
          isPending
            ? 'animate-order-alert bg-red-50/90 border-red-300 glow-rose'
            : 'glass-panel border-slate-200'
        }`}
      >
        {/* Subtle decorative glow for pending items */}
        {isPending && (
          <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-rose-600 animate-pulse" />
        )}
        {(isConfirmed || isKitchen || isServing) && (
          <div className={`absolute top-0 right-0 w-1.5 h-full ${
            isConfirmed ? 'bg-blue-500' : isKitchen ? 'bg-amber-500' : 'bg-cyan-500'
          }`} />
        )}

        {/* Card Header */}
        <div className="flex justify-between items-start gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-slate-900">
                Table {order.tableNumber}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase flex items-center gap-1 ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Ordered {timeAgo}</span>
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500">
            ID: #{order.id.slice(-5).toUpperCase()}
          </span>
        </div>

        {/* Ordered Food Items List */}
        <div className="space-y-3 my-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block border-b border-slate-200 pb-1.5">
            Ordered Items
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1 text-sm bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start gap-2 text-slate-900">
                  <span className="font-display font-medium">
                    {item.menuItem.name}
                  </span>
                  <span className="font-mono text-cyan-700 font-bold flex-shrink-0">
                    x{item.quantity}
                  </span>
                </div>
                {item.notes && (
                  <div className="flex items-start gap-1 text-amber-700 text-xs mt-1">
                    <FileText className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span className="italic leading-normal">
                      Note: {item.notes}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Display */}
        <div className="flex justify-between items-center py-2.5 px-3 bg-slate-100/80 rounded-xl border border-slate-200 mb-5">
          <span className="text-xs text-slate-600">Total Bill</span>
          <span className="font-mono text-base font-bold text-slate-900">
            ৳ {order.total.toLocaleString()}
          </span>
        </div>

        {/* Action Controls Pipeline */}
        {!isCancelling ? (
          <div className="space-y-2">
            {isPending && (
              <button
                onClick={() => onAccept(order.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-display font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-100" />
                <span>Confirm Order (Manager)</span>
              </button>
            )}

            {(isConfirmed || isKitchen || isServing) && (
              <button
                onClick={() => onNextStatus(order.id)}
                className={`w-full py-2.5 rounded-xl text-white text-xs font-display font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                  isConfirmed ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500' :
                  isKitchen ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' :
                  'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500'
                }`}
              >
                {isConfirmed && <Flame className="w-4 h-4" />}
                {isKitchen && <Send className="w-4 h-4" />}
                {isServing && <CheckCircle2 className="w-4 h-4" />}
                <span>
                  {isConfirmed ? 'Send to Kitchen' : 
                   isKitchen ? 'Mark as Ready' : 
                   'Complete Order'}
                </span>
              </button>
            )}

            <button
              onClick={() => setIsCancelling(true)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-mono border border-slate-200 hover:border-red-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Cancel Order</span>
            </button>
          </div>
        ) : (
          /* Sleek inline Cancellation Reason prompt */
          <form onSubmit={handleConfirmCancel} className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-2 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="text-xs font-display font-medium text-red-700">Specify Cancel Reason</span>
              <button
                type="button"
                onClick={() => setIsCancelling(false)}
                className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <input
              type="text"
              required
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="e.g. Out of stock / Customer canceled"
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-red-300 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-500"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Confirm Cancel</span>
            </button>
          </form>
        )}
      </div>
    );
  }
);

ActiveOrderCard.displayName = 'ActiveOrderCard';
