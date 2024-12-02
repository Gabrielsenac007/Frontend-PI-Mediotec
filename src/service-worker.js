const CACHE_NAME = 'app-cache-v1';


const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/favicon-li9hXLfP.ico',
  '/assets/index-BAp5TO6g.css',
  '/assets/index-C52_a5r4.js',
];


self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando arquivos iniciais...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
