import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully handle transient browser IndexedDB closing/hidden tab lifecycle events
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason?.message || String(event?.reason || '');
    if (reason.includes('Database is closing') || reason.includes('closing/hidden') || reason.includes('IndexedDB')) {
      event.preventDefault();
      console.warn('Suppressed transient Firestore IndexedDB lifecycle event:', reason);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

