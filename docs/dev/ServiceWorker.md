# Service Worker

The service worker in this project enhances the performance and reliability of
the web application by enabling offline capabilities, caching assets, and
efficiently managing network requests.

## Dynamic Code Generation

The service worker is utilized only in production builds. Its content is
dynamically generated to include the current application version, which
determines the cache name used by the website. Additionally, a list of all files
in the `dist` folder is passed for pre-caching. The code generation and
preparation are handled by the `scripts/serviceWorkerPlugin.ts` plugin.

## Pre-Caching During Installation

The service worker pre-caches all files in the `dist` directory to support
offline usage from the start. The implementation considers any resources already
cached via the HTTP caching mechanism. Instead of relying on the `Cache.addAll`
function, it manually downloads all assets with the `cache: no-store` header.
All responses are stored in a cache named with the exact application version,
To ensure atomic cache replacement, the service worker avoids using
`skipWaiting` during installation. This approach allows any open browser windows
to remain under the control of the previous service worker version until the
user explicitly refreshes or closes them.

## Cache Clearance During Activation

During activation, old caches are removed, and only the currently active cache
is preserved. This process ensures that unused resources are cleaned up.

## Cache-Only Strategy

The caching strategy for fetch requests is implemented as "cache-only." Since
all content in the `dist` directory is pre-cached, any missing files in the
cache are treated as errors.
