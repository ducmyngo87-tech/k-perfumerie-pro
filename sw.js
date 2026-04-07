const CACHE_NAME = 'kp_cache_v20260406_4';
const ASSETS = [
      './index.html',
      './style.css',
      './app.js?v=20260406_4',
      './manifest.json',
      './icon.png',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
  ];

self.addEventListener('install', (event) => {
      event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
            );
});

self.addEventListener('activate', (event) => {
      event.waitUntil(
                caches.keys().then((keys) => {
                              return Promise.all(
                                                keys.filter(key => key !== CACHE_NAME)
                                                    .map(key => caches.delete(key))
                                            );
                })
            );
  self.addEventListener('fetch', (event) => {
        event.respondWith(
                  caches.match(event.request).then((resp) => {
                                return resp || fetch(event.request);
                  })
              );
  });
});

self.addEventListener('fetch', (event) => {
      event.respondWith(
                caches.match(event.request).then((resp) => {
                              return resp || fetch(event.request);
                })
            );
});
