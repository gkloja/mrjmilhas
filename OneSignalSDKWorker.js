/* Service worker unificado: OneSignal (push) + PWA (instalável).
   Coloque na RAIZ do site, junto com index.html e manifest.webmanifest. */
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Handler mínimo de fetch — o Chrome exige SW com fetch para permitir "Instalar app".
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response("Offline — abra de novo com internet.", {
        status: 503,
        statusText: "Offline",
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    })
  );
});

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
