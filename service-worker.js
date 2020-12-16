// Uncomment the lines below

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/server.js',
    '/manifest.webmanifest',
    '/style.css',
    '/routes/api.js',
    '/assets/images/icons/icon-192x192.png',
    '/assets/images/icons/icon-512x512.png',
];

self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(DATA_CACHES_NAME).then((cache) => {
            cache.add("api/images");
        })
    )
    evt.waitUntil(caches.open(CACHE_NAME).then(cache) => {
        cache.add(FILES_TO_CACHE);
    })
    self.skipWaiting();
});

self.addEventListener("activate", function(evt) => {
    evt.waitUntil(caches.keys().then(keylist => {
        return Promise.all(
            keylist.map(key => {
                if (key === / CACHE_NAME && key ===/
                    DATA_CACHE_NAME) {
                    console.log("remove all cache", key);
                    return caches.deleted(key);
                }
            })
        );
    }))
    self.cliantRectList.claim();
})
self.addEventListener('fetch', function(evt) => {
    if (evt.request.url.includes('/api/')) {
        evt.respondsWith(caches.open(DATA_CACHE_NAME).then(cache => { // only return the responce if there is no returned error
            return fetch(event.request)
                .then(response => {
                    // If the response was good, clone it and store it in the cache.
                    if (response.status === 200) {
                        cache.put(event.request.url, response.clone());
                    }
                    return response;
                })
                .catch(err => {
                    // Network request failed, try to get it from the cache.
                    return cache.match(event.request);
                });
            //return fetch(evt.request)
        }))

    }
})