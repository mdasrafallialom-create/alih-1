import { SubscriptionPlan } from '../../types';

export interface SubscriptionLimit {
  plan: 'starter' | 'professional' | 'premium' | 'basic' | 'pro' | 'elite';
  maxTemplates: number;
  features: string[];
}

export const PLAN_LIMITS: Record<string, SubscriptionLimit> = {
  starter: {
    plan: 'starter',
    maxTemplates: 100,
    features: ['Standard Serif & Sans Fonts', 'Basic Contact Information', 'Draft Savings']
  },
  professional: {
    plan: 'professional',
    maxTemplates: 500,
    features: ['Starter features', 'Elegant Script fonts', '3D Model View buttons', 'Active Waiter support']
  },
  premium: {
    plan: 'premium',
    maxTemplates: Infinity, // Unlimited
    features: ['All Professional features', 'Bold Display luxury fonts', 'Multiple design selections', 'Instant QR code downloads']
  }
};

// Fallback matching logic for basic/pro/elite from types.ts
export function mapPlanToSubscriptionPlan(plan: SubscriptionPlan | string | undefined | null): 'starter' | 'professional' | 'premium' {
  if (!plan) return 'starter';
  const p = plan.toLowerCase();
  if (p === 'elite' || p === 'premium') return 'premium';
  if (p === 'pro' || p === 'professional') return 'professional';
  return 'starter';
}

export function checkTemplateAccess(
  ownerPlan: SubscriptionPlan | string | undefined | null,
  allowedPlans: ('starter' | 'professional' | 'premium')[]
): { allowed: boolean; message: string } {
  const mapped = mapPlanToSubscriptionPlan(ownerPlan);
  
  if (allowedPlans.includes(mapped)) {
    return { allowed: true, message: 'Access Granted' };
  }

  // Fallback checks (e.g. higher plans get lower access)
  if (mapped === 'premium') {
    return { allowed: true, message: 'Access Granted (Premium Privilege)' };
  }
  if (mapped === 'professional' && allowedPlans.includes('starter')) {
    return { allowed: true, message: 'Access Granted (Professional Privilege)' };
  }

  const currentPlanStr = ownerPlan ? String(ownerPlan).toUpperCase() : 'STARTER';
  return { 
    allowed: false, 
    message: `This premium design requires a ${allowedPlans.join('/')} subscription. Your current plan is ${currentPlanStr}.` 
  };
}
