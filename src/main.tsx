import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully handle transient browser IndexedDB closing/hidden tab lifecycle events
if (typeof window !== 'undefined') {
  const isDbError = (err: any) => {
    if (!err) return false;
    let msg = '';
    try {
      if (typeof err === 'string') {
        msg = err;
      } else {
        msg = [err.message, err.name, err.code, err.stack, String(err)].filter(Boolean).join(' ');
      }
    } catch {
      msg = String(err);
    }
    const lower = msg.toLowerCase();
    return (
      lower.includes('database is closing') ||
      lower.includes('closing/hidden') ||
      lower.includes('closing / hidden') ||
      lower.includes('database is closed') ||
      lower.includes('the database connection is closing') ||
      lower.includes('database is closing/hidden')
    );
  };

  // Intercept console.error to prevent transient DB closing/hidden warnings from surfacing as fatal errors
  const originalConsoleError = console.error;
  console.error = function (...args: any[]) {
    const combined = args.map(a => (a && (a.message || a.stack || String(a))) || '').join(' ');
    if (isDbError(combined)) {
      console.warn('Suppressed console error for transient DB closing/hidden event');
      return;
    }
    return originalConsoleError.apply(console, args);
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    if (isDbError(reason)) {
      event.preventDefault();
      event.stopPropagation();
      console.warn('Suppressed transient Firestore IndexedDB lifecycle event');
    }
  });

  window.addEventListener('error', (event) => {
    const message = event?.message || '';
    const error = event?.error;
    if (isDbError(message) || isDbError(error)) {
      event.preventDefault();
      event.stopPropagation();
      console.warn('Suppressed uncaught IndexedDB error event');
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

