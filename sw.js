// On install - the application shell cached
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-cache').then(function(cache) {
            // Static files the make up the applicaiton shell are cached
            return cache.add('index.html');
            return cache.add('body.css');
            return cache.add('style.css');
            return cache.add('main.js');
            return cache.add('cssFile/all.css');
        })
    );
});

// with request network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
            // return it if there is a response, or else fetch again
            return response || fetch(event.request);
        })
    )
})