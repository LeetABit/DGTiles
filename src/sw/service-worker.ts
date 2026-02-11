//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

declare let self: ServiceWorkerGlobalScope;
const CACHE_NAME = "dgtiles-cache-{APP_VERSION}";
const FILE_LIST = ["{FILE_LIST}"];
const HTTP_STATUS_OK = 200;

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(FILE_LIST);
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            return Promise.all(
                keys
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map(async (cacheName) => caches.delete(cacheName)),
            );
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);

            if (cachedResponse) {
                return cachedResponse;
            }

            const response = await fetch(event.request);
            if (response.status === HTTP_STATUS_OK) {
                await cache.put(event.request, response.clone());
            }

            return response;
        })(),
    );
});
