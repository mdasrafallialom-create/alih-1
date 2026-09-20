import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, memoryLocalCache, getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Silence non-fatal internal SDK connection retry warnings in iframe/sandboxed environments
try {
  setLogLevel('silent');
} catch {
  // Ignore if already set or unsupported
}

const firebaseConfig = {
  apiKey: "AIzaSyCaPHogZnCcP4pKETxcUOfE3BScwoCnPu0",
  authDomain: "gen-lang-client-0853679275.firebaseapp.com",
  projectId: "gen-lang-client-0853679275",
  storageBucket: "gen-lang-client-0853679275.firebasestorage.app",
  messagingSenderId: "684080975790",
  appId: "1:684080975790:web:0fd9d1601f5f487f0b423f"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Use memoryLocalCache and experimentalForceLongPolling to ensure reliable connectivity across iframes and proxies
export const db = (() => {
  try {
    return initializeFirestore(app, {
      localCache: memoryLocalCache(),
      experimentalForceLongPolling: true,
    });
  } catch {
    return getFirestore(app);
  }
})();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

