/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { setCacheNameDetails } from 'workbox-core';

// self.__WB_MANIFEST is replaced at build time

declare const self: ServiceWorkerGlobalScope;
declare const __SW_VERSION__: string;

const CACHE_NAME = `shell-v${__SW_VERSION__}`;
setCacheNameDetails({ precache: CACHE_NAME, prefix: '', suffix: '' });

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith('shell-v') && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute([{ url: '/offline.html', revision: '' }]);

registerRoute(
  /\.(?:js|css|html|ico|png|svg)$/, 
  new CacheFirst({ cacheName: CACHE_NAME })
);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  async (options) => {
    const networkFirst = new NetworkFirst({ cacheName: CACHE_NAME });
    let response: Response | undefined;
    try {
      response = await networkFirst.handle(options);
    } catch {}
    return (response ?? (await caches.match('/offline.html'))) as Response;
  }
);

