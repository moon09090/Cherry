/* Cherry service worker: works offline after the first visit. Bump CACHE when you ship changes. */
const CACHE = 'cherry-v1';
const SHELL = [
  './', 'index.html', 'css/styles.css', 'manifest.webmanifest',
  'js/utils.js', 'js/icons.js', 'js/themes.js', 'js/fx.js', 'js/state.js', 'js/ui.js',
  'js/engines.js', 'js/ai.js', 'js/views-a.js', 'js/views-b.js', 'js/app.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  // Only handle same-origin GETs. OpenRouter and Google Fonts go straight to the network.
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
