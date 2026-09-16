import { db, auth } from '../../lib/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  
  // Log offline and connectivity errors as warnings rather than crashing the application
  console.warn(`Firestore Warning/Error during [${operationType}] on [${path}]:`, errInfo.error);

  // Only throw an actual error for write operations so that form submits and actions can capture and display them
  if (
    operationType === OperationType.CREATE ||
    operationType === OperationType.UPDATE ||
    operationType === OperationType.WRITE ||
    operationType === OperationType.DELETE
  ) {
    throw new Error(errInfo.error);
  }
}

export interface MenuCardBrandingSettings {
  templateId: string;
  restaurantName: string;
  logoUrl: string;
  phone: string;
  website: string;
  address: string;
  heroImageUrl: string;
  brandFontId: string;
  bodyFontId: string;
  status: 'draft' | 'published';
  updatedAt: any;
  publishedAt: any;
}

export interface MenuCardTemplate {
  id: string;
  name: string;
  previewImageUrl: string;
  templateType: 'single-page' | 'multi-page';
  allowedPlans: ('starter' | 'professional' | 'premium')[];
  active: boolean;
  version: number;
  editableFields: string[];
  lockedFields: string[];
  createdAt: any;
  updatedAt: any;
}

// 1. Get or Create Menu Card Branding Settings
export async function getMenuCardBranding(restaurantId: string): Promise<MenuCardBrandingSettings | null> {
  const path = `restaurants/${restaurantId}/settings/branding`;
  try {
    const docRef = doc(db, 'restaurants', restaurantId, 'settings', 'branding');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as MenuCardBrandingSettings;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

export async function saveMenuCardBranding(
  restaurantId: string, 
  settings: Partial<MenuCardBrandingSettings>,
  isPublish = false
): Promise<void> {
  const path = `restaurants/${restaurantId}/settings/branding`;
  try {
    const docRef = doc(db, 'restaurants', restaurantId, 'settings', 'branding');
    const data = {
      ...settings,
      updatedAt: serverTimestamp(),
      ...(isPublish ? { status: 'published', publishedAt: serverTimestamp() } : { status: 'draft' })
    };
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 2. Load Active Menu Items
export async function getPublishedMenuItems(restaurantId: string) {
  const path = `restaurants/${restaurantId}/menu`;
  try {
    const q = query(collection(db, 'restaurants', restaurantId, 'menu'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// 3. Service (Waiter) Requests
export async function createWaiterRequest(
  restaurantId: string,
  tableId: string,
  tableNumber: string,
  sessionId: string
): Promise<string> {
  const path = `restaurants/${restaurantId}/waiter_requests`;
  try {
    // Prevent duplicate request checks in 2 mins
    const docRef = await addDoc(collection(db, 'restaurants', restaurantId, 'waiter_requests'), {
      type: 'waiter',
      restaurantId,
      tableId,
      tableNumber,
      sessionId,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return '';
  }
}

// 4. Templates Management (For Master Admin & Client)
export async function getMenuCardTemplates(): Promise<MenuCardTemplate[]> {
  const path = `menuCardTemplates`;
  try {
    const q = query(collection(db, 'menuCardTemplates'));
    const snap = await getDocs(q);
    const list = snap.docs.map(doc => doc.data() as MenuCardTemplate);
    if (list.length === 0) {
      // Return default list if Firestore collection empty (mock bootstrap)
      return DEFAULT_TEMPLATES;
    }
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return DEFAULT_TEMPLATES;
  }
}

export async function addMenuCardTemplate(template: MenuCardTemplate): Promise<void> {
  const path = `menuCardTemplates/${template.id}`;
  try {
    await setDoc(doc(db, 'menuCardTemplates', template.id), {
      ...template,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export const DEFAULT_TEMPLATES: MenuCardTemplate[] = [
  {
    id: 'premium-orange-001',
    name: 'Premium Orange Circle Menu',
    previewImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    templateType: 'single-page',
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems', 'brandFont', 'bodyFont'],
    lockedFields: ['layout', 'sectionPosition', 'cardStructure', 'buttonStructure'],
    createdAt: null,
    updatedAt: null
  },
  {
    id: 'luxury-gold-002',
    name: 'Royal Golden Velvet Template',
    previewImageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80',
    templateType: 'single-page',
    allowedPlans: ['professional', 'premium'],
    active: true,
    version: 1,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems', 'brandFont', 'bodyFont'],
    lockedFields: ['layout', 'sectionPosition', 'cardStructure', 'buttonStructure'],
    createdAt: null,
    updatedAt: null
  },
  {
    id: 'imperial-black-003',
    name: 'Imperial Black & Gold',
    previewImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    templateType: 'single-page',
    allowedPlans: ['premium'],
    active: true,
    version: 2,
    editableFields: ['restaurantName', 'logo', 'phone', 'website', 'address', 'heroImage', 'menuItems', 'brandFont', 'bodyFont'],
    lockedFields: ['layout', 'sectionPosition', 'cardStructure', 'buttonStructure'],
    createdAt: null,
    updatedAt: null
  }
];
