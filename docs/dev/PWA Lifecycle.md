# PWA Lifecycle Documentation (via vite-plugin-pwa)

This document outlines the lifecycle behavior of our Progressive Web App (PWA),
which is powered by the default configuration of the `vite-plugin-pwa` package.
The goal is to understand how the PWA behaves in terms of service worker
registration, caching, installation, updates, and offline support — all handled
by vite-plugin-pwa without deep customization.

## Overview

The app is enhanced with offline capability, installability, and improved
repeat-visit performance using `vite-plugin-pwa`'s auto-generated service worker
and manifest. The plugin uses sensible defaults that cover most standard PWA
requirements.

## App Initialization

### What Happens on First Load:

- The service worker is automatically registered by the plugin.
- During installation, the plugin's service worker precaches static assets (e.g.
  HTML, JS, CSS, icons) based on the Vite build output.
- Once active, the service worker intercepts requests and serves them from cache
  or network, depending on strategy.
- The app shell loads quickly from cache on repeat visits.

## Service Worker Lifecycle

Managed by `vite-plugin-pwa`, which uses Workbox under the hood.

| Phase    | Handled Behavior                                         |
| -------- | -------------------------------------------------------- |
| Install  | Precache built assets.                                   |
| Activate | Replace old caches automatically.                        |
| Fetch    | Serve from cache or network using `cacheFirst` strategy. |

No manual cache versioning is required unless you extend the plugin.

## Update Detection & Handling

### Default Behavior:

- The plugin uses `autoUpdate` mode.
- The service worker checks for updated precached content after registration.
- When new content is found, a new service worker is installed.
- On the next page reload, the new service worker takes control.

## Install Flow

### Default Behavior:

- The browser detects the PWA capabilities (manifest + service worker).
- On supported platforms (e.g. Chrome), the browser displays an install prompt.

### Manual Install:

- On iOS/Safari, the user must manually use "Add to Home Screen".

### Manifest Fields:

- Defined in `vite.config.ts` via the plugin configuration.
- Includes name, icons, start URL, display mode, theme and background colors.

## Offline Support

### What Works Offline:

- The app shell and precached routes and assets.

### What Doesn’t:

- Dynamic API data unless manually cached or handled via fallback logic.

### Testing Instructions:

- Use DevTools → Application → Service Workers → Simulate offline.
- Verify loading behavior without a network connection.

## Cache Invalidation Strategy

- Managed automatically by `vite-plugin-pwa`.
- When a new build is deployed, the service worker detects new files via
  precache manifest diffing.
- Old caches are purged during activation.
