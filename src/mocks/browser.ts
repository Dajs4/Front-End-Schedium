import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configurar el Service Worker
export const worker = setupWorker(...handlers);

// Iniciar el worker
export async function startMSW() {
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
}