import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, memoryLocalCache, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaPHogZnCcP4pKETxcUOfE3BScwoCnPu0",
  authDomain: "gen-lang-client-0853679275.firebaseapp.com",
  projectId: "gen-lang-client-0853679275",
  storageBucket: "gen-lang-client-0853679275.firebasestorage.app",
  messagingSenderId: "684080975790",
  appId: "1:684080975790:web:0fd9d1601f5f487f0b423f"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Use memoryLocalCache to prevent IndexedDB 'Database is closing/hidden' errors in iframes/webviews
export const db = (() => {
  try {
    return initializeFirestore(app, {
      localCache: memoryLocalCache()
    });
  } catch {
    return getFirestore(app);
  }
})();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

