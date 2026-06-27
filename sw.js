/* ISMS-P 학습앱 서비스워커 — 오프라인 캐시 (cache-first) */
const CACHE = 'ismsp-v3';
const ASSETS = [
  './', './index.html', './style.css', './app.js',
  './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './content/01-학습노트.md',
  './content/02-암기카드.md',
  './content/03-모의고사10회.md',
  './content/04-영역별심화.md',
  './content/05-정식모의고사50.md',
  './content/06-공식인증기준101.md',
  './content/07-10일체크리스트.md',
  './content/08-최종암기시트.md',
  './content/09-결함모의고사.md',
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, {ignoreSearch:true}).then(r=> r || fetch(e.request).then(resp=>{
      const copy = resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
      return resp;
    }).catch(()=> caches.match('./index.html')))
  );
});
