import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';
import CONFIG from './globals/config';

const assetsToCache = [
  './',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.startsWith(CONFIG.BASE_IMAGE_URL)) {
    event.respondWith(
      caches.open(CONFIG.IMAGE_CACHE_NAME).then((cache) => cache.match(request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((networkResponse) => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
      })),
    );
  } else {
    event.respondWith(CacheHelper.revalidateCache(request));
  }
});
