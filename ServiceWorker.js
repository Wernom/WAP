var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  	'./js13kpwa/app.js',
	'./js13kpwa/DecoderWorker.js',
	'./js13kpwa/exif.js',
	'./js13kpwa/job.js',
	'./js13kpwa/icon-cart.png',
	'./js13kpwa/icon-setup.png',
	'./js13kpwa/icon-transmit.png',
	'./js13kpwa/logo.png'
];
self.addEventListener('install', (e) => {

	
    console.log('[Service Worker] Install');

	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			  console.log('[Service Worker] Caching all: app shell and content');
		  return cache.addAll(appShellFiles);
		})
	  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
