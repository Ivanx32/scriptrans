import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox(`${import.meta.env.BASE_URL}sw.js`);
  wb.addEventListener('waiting', () => {
    wb.messageSW({ type: 'SKIP_WAITING' });
  });
  wb.register();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
