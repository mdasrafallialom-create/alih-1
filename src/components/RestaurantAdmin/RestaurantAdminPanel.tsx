import React from 'react';
import OrderManagementAdmin from '../OrderManagementAdmin';
import { AdminSettings, Order } from '../../types';

interface RestaurantAdminPanelProps {
  restaurantId: string;
  user: any;
  settings: AdminSettings;
  orders: Order[];
  onLogout: () => void;
  onExitAdmin?: () => void;
  onUpdateSettings: (settings: Partial<AdminSettings>) => void;
  lang: 'en' | 'bn' | 'ar';
  setLang: (lang: 'en' | 'bn' | 'ar') => void;
  // Order management handlers
  onAcceptOrder: (orderId: string) => void;
  onNextStatus: (orderId: string) => void;
  onServeOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onClearHistory: () => void;
  onUpdatePaymentStatus: (orderId: string, status: 'Pending' | 'Paid' | 'Refunded', verifiedBy?: string, txnId?: string) => void;
  activeTablesCount: number;
  cookingCount: number;
  servedCount: number;
  revenue: number;
  waiterRequests: any[];
  onResolveWaiter: (id: string, action?: 'confirm' | 'resolve') => void;
  onTriggerGlobalUpdate?: () => Promise<void>;
}

export default function RestaurantAdminPanel({
  restaurantId,
  user,
  settings,
  orders,
  onLogout,
  onExitAdmin,
  onUpdateSettings,
  lang,
  setLang,
  onAcceptOrder,
  onNextStatus,
  onServeOrder,
  onCancelOrder,
  onDeleteOrder,
  onClearHistory,
  onUpdatePaymentStatus,
  activeTablesCount,
  cookingCount,
  servedCount,
  revenue,
  waiterRequests,
  onResolveWaiter,
  onTriggerGlobalUpdate
}: RestaurantAdminPanelProps) {
  return (
    <OrderManagementAdmin 
      restaurantId={restaurantId}
      orders={orders}
      onAcceptOrder={onAcceptOrder}
      onNextStatus={onNextStatus}
      onServeOrder={onServeOrder}
      onCancelOrder={onCancelOrder}
      onDeleteOrder={onDeleteOrder}
      onClearHistory={onClearHistory}
      onUpdatePaymentStatus={onUpdatePaymentStatus}
      activeTablesCount={activeTablesCount}
      cookingCount={cookingCount}
      servedCount={servedCount}
      revenue={revenue}
      onUpdateSettings={onUpdateSettings}
      settings={settings}
      user={user}
      lang={lang}
      setLang={setLang}
      onLogout={onLogout}
      onExitAdmin={onExitAdmin}
      activeTab="recent"
      showSidebar={true}
      waiterRequests={waiterRequests}
      onResolveWaiter={onResolveWaiter}
      onTriggerGlobalUpdate={onTriggerGlobalUpdate}
    />
  );
}
