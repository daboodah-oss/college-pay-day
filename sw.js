// College Pay Day service worker — network-first for the page so new
// publishes land immediately; cache-first for icons/manifest; everything
// else (including the Google Apps Script sync endpoint) passes through.
const CACHE = "college-pay-day-v1";
const STATIC = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(STATIC)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;                       // sync writes pass through
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;        // Google endpoint passes through
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/")) {
    // network-first: fresh board when online, cached board offline
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put("./index.html", copy));
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }
  // icons / manifest: cache-first
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
