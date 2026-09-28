import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully handle transient browser IndexedDB closing/hidden tab lifecycle events
if (typeof window !== 'undefined') {
  const isDbError = (msg: string) => {
    return (
      msg.includes('Database is closing') ||
      msg.includes('closing/hidden') ||
      msg.includes('IndexedDB') ||
      msg.includes('database is closing') ||
      msg.includes('database is closed')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason?.message || String(event?.reason || '');
    if (isDbError(reason)) {
      event.preventDefault();
      event.stopPropagation();
      console.warn('Suppressed transient Firestore IndexedDB lifecycle event:', reason);
    }
  });

  window.addEventListener('error', (event) => {
    const message = event?.message || '';
    const errorMsg = event?.error?.message || '';
    if (isDbError(message) || isDbError(errorMsg)) {
      event.preventDefault();
      event.stopPropagation();
      console.warn('Suppressed uncaught IndexedDB error event:', message || errorMsg);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

