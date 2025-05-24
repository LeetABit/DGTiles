//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
/// <reference lib="WebWorker" />

declare let self: ServiceWorkerGlobalScope;
const CACHE_NAME = "my-cache-{APP_VERSION}";
const FILE_LIST = ["{FILE_LIST}"];
const HTTP_STATUS_OK = 200;

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            for (const file of FILE_LIST) {
                const response = await fetch(file, { cache: "no-store" });
                if (response.status === HTTP_STATUS_OK) {
                    await cache.put(file, response);
                } else {
                    throw new Error(
                        `Failed to fetch ${file}:` +
                            `${response.status} ${response.statusText}`,
                    );
                }
            }
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then(async (cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME)
                        .map(async (cacheName) => caches.delete(cacheName)),
                ),
            ),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) =>
            cache.match(event.request).then(async (cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request).then(async (response) => {
                    if (response.status === HTTP_STATUS_OK) {
                        await cache.put(event.request, response.clone());
                    }

                    return response;
                });
            }),
        ),
    );
});
