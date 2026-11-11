const CACHE = 'brisa-v14';
const files = ['./', './index.html', './styles.css', './app.js', './manifest.webmanifest', './assets/brisa-companion.png', './assets/brisa-rabbit.png', './assets/brisa-panda.png', './assets/brisa-otter.png', './assets/brisa-dragon.png', './assets/brisa-hedgehog.png', './assets/glasses-vista.png', './assets/glasses-sol.png', './assets/glasses-corazon.png', './assets/glasses-cumple.png', './assets/glasses-navidad.png', './assets/glasses-halloween.png'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(files)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
