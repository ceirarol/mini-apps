const CACHE = 'brisa-v23';
const files = ['./', './index.html', './styles.css', './styles.css?v=23', './app.js', './app.js?v=23', './manifest.webmanifest', './assets/brisa-companion.png', './assets/brisa-rabbit.png', './assets/brisa-panda.png', './assets/brisa-otter.png', './assets/brisa-dragon.png', './assets/brisa-hedgehog.png', './assets/glasses-vista.png', './assets/glasses-sol.png', './assets/glasses-corazon.png', './assets/glasses-aviador.png', './assets/glasses-navidad.png', './assets/glasses-halloween.png', './assets/brisa-fox-vista.png', './assets/brisa-fox-sol.png', './assets/brisa-fox-corazon.png', './assets/brisa-fox-aviador.png', './assets/brisa-fox-navidad.png', './assets/brisa-fox-halloween.png', './assets/brisa-rabbit-vista.png', './assets/brisa-rabbit-sol.png', './assets/brisa-rabbit-corazon.png', './assets/brisa-rabbit-aviador.png', './assets/brisa-rabbit-navidad.png', './assets/brisa-rabbit-halloween.png'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(files)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('brisa-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
