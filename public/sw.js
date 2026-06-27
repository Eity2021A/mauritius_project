/**
 * Legacy service worker cleanup — the site no longer registers a SW.
 * Browsers that still poll /sw.js will unregister instead of hanging on a 404.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.registration.unregister());
});
