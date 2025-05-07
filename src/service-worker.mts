//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

self.addEventListener("install", () => {
    // Skip waiting to activate the service worker immediately
    console.log("Service worker installed " + Math.random().toString(10));
});

self.addEventListener("activate", () => {
    // Activate the service worker immediately
    console.log("Service worker activated " + Math.random().toString(10));
});

self.addEventListener("fetch", () => {
    // Handle fetch events here if needed
    console.log("Fetch event intercepted " + Math.random().toString(10));
});
