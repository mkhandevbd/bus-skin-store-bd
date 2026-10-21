/* অফলাইন ও দ্রুত চালানোর ফাইল (Service Worker)। এখানে কিছু বদলাতে হবে না।
   নতুন সংস্করণ বসালে নিচের V-এর সংখ্যা বাড়ালে পুরনো ক্যাশ মুছে যায়। */
const V = "bs-v2";
const PRE = ["offline.html", "icon-192.png", "icon-512.png", "manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(PRE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;           /* Supabase, সার্ভার, ছবি: সরাসরি যাবে */
  e.respondWith(
    fetch(r).then((res) => {
      if (res && res.ok) { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); }
      return res;
    }).catch(() =>
      caches.match(r).then((m) => m || (r.mode === "navigate" ? caches.match("offline.html") : Response.error()))
    )
  );
});
