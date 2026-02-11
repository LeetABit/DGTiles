//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { beforeEach, describe, expect, test, vi } from "vitest";

type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<Partial<T[P]>>;
};

const mockCache = {
    addAll: vi.fn(),
    match: vi.fn(),
    put: vi.fn(),
};

const mockCaches = {
    open: vi.fn(async () => Promise.resolve(mockCache)),
    keys: vi.fn(async () =>
        Promise.resolve(["old-cache", "dgtiles-cache-{APP_VERSION}"]),
    ),
    delete: vi.fn(async () => Promise.resolve(true)),
};
const mockFetch = vi.fn();

type ServiceWorkerEvent = "install" | "activate" | "fetch";

declare let global: DeepWriteable<WorkerGlobalScope> & {
    events: {
        install?: (
            this: Partial<ServiceWorkerGlobalScope>,
            ev: Partial<ServiceWorkerGlobalScopeEventMap["install"]>,
        ) => any;
        activate?: (
            this: Partial<ServiceWorkerGlobalScope>,
            ev: Partial<ServiceWorkerGlobalScopeEventMap["activate"]>,
        ) => any;
        fetch?: (
            this: Partial<ServiceWorkerGlobalScope>,
            ev: Partial<ServiceWorkerGlobalScopeEventMap["fetch"]>,
        ) => any;
    };
};

global.events = {};
global.caches = mockCaches;
global.fetch = mockFetch;
global.self = {
    addEventListener: (
        event: ServiceWorkerEvent,
        cb: (
            this: Partial<ServiceWorkerGlobalScope>,
            ev: Partial<ServiceWorkerGlobalScopeEventMap[typeof event]>,
        ) => any,
    ) => {
        global.events[event] = cb;
    },
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("service-worker", () => {
    test("should cache files on install if fetch returns 200", async () => {
        mockCache.addAll.mockResolvedValue(undefined);
        const addAllSpy = vi.spyOn(mockCache, "addAll");

        await import("./service-worker");

        let ready: (value: void | PromiseLike<void>) => void;
        let error: (reason?: any) => void;
        const pr = new Promise<void>((resolve, reject) => {
            ready = resolve;
            error = reject;
        });

        assert(
            global.events.install,
            "Install event listener should be registered.",
        );
        global.events.install.bind({})({
            waitUntil: (promise: Promise<any>) => {
                promise
                    .then(() => {
                        ready();
                    })
                    .catch((reason: unknown) => {
                        error(reason);
                    });
            },
        });

        await pr;

        expect(addAllSpy).toHaveBeenCalledTimes(1);
        expect(addAllSpy).toHaveBeenCalledWith(["{FILE_LIST}"]);
    });

    test("should throw error if fetch fails during install", async () => {
        mockCache.addAll.mockRejectedValue(
            new TypeError("Could not fetch data."),
        );

        await import("./service-worker");

        try {
            let ready: (value: void | PromiseLike<void>) => void;
            let error: (reason?: any) => void;
            const pr = new Promise<void>((resolve, reject) => {
                ready = resolve;
                error = reject;
            });
            assert(
                global.events.install,
                "Install event listener should be registered.",
            );
            global.events.install.bind({})({
                waitUntil: (promise: Promise<any>) => {
                    promise
                        .then(() => {
                            ready();
                        })
                        .catch((reason: unknown) => {
                            error(reason);
                        });
                },
            });
            await pr;
            expect(true).toBeFalsy();
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
            expect((error as Error).message).toBe("Could not fetch data.");
        }
    });

    test("should delete old caches on activate", async () => {
        const deleteSpy = vi.spyOn(mockCaches, "delete");

        await import("./service-worker");

        let ready: (value: void | PromiseLike<void>) => void;
        let error: (reason?: any) => void;
        const pr = new Promise<void>((resolve, reject) => {
            ready = resolve;
            error = reject;
        });
        assert(
            global.events.activate,
            "Activate event listener should be registered.",
        );
        global.events.activate.bind({})({
            waitUntil: (promise: Promise<any>) => {
                promise
                    .then(() => {
                        ready();
                    })
                    .catch((reason: unknown) => {
                        error(reason);
                    });
            },
        });
        await pr;

        expect(deleteSpy).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith("old-cache");
    });

    test("should respond with cached response if available on fetch", async () => {
        const expectedResult = new Response("Cached response", { status: 200 });
        mockCache.match.mockResolvedValue(expectedResult);
        await import("./service-worker");

        let ready: (value: Response | PromiseLike<Response>) => void;
        let error: (reason?: any) => void;
        const pr = new Promise<Response>((resolve, reject) => {
            ready = resolve;
            error = reject;
        });
        assert(
            global.events.fetch,
            "Fetch event listener should be registered.",
        );
        global.events.fetch.bind({})({
            respondWith: (promise: Promise<Response>) => {
                promise
                    .then(() => {
                        ready(promise);
                    })
                    .catch((reason: unknown) => {
                        error(reason);
                    });
            },
        });
        const result = await pr;

        expect(result).toBe(expectedResult);
        expect(mockFetch).toHaveBeenCalledTimes(0);
    });

    test("should fetch and cache response if not cached on fetch", async () => {
        const putSpy = vi.spyOn(mockCache, "put");
        const expectedResult = new Response("Cached response", { status: 200 });
        mockCache.match.mockResolvedValue(undefined);
        mockFetch.mockResolvedValue(expectedResult);

        await import("./service-worker");

        let ready: (value: Response | PromiseLike<Response>) => void;
        let error: (reason?: any) => void;
        const pr = new Promise<Response>((resolve, reject) => {
            ready = resolve;
            error = reject;
        });

        const request = new Request("http://test-request");

        assert(
            global.events.fetch,
            "Fetch event listener should be registered.",
        );
        global.events.fetch.bind({})({
            respondWith: (promise: Promise<Response>) => {
                promise
                    .then(() => {
                        ready(promise);
                    })
                    .catch((reason: unknown) => {
                        error(reason);
                    });
            },
            request,
        });
        const result = await pr;

        expect(result).toBe(expectedResult);
        expect(putSpy).toHaveBeenCalledTimes(1);
        expect(putSpy).toHaveBeenCalledWith(request, expectedResult);
    });

    test("should not cache response if fetch status is not 200", async () => {
        const putSpy = vi.spyOn(mockCache, "put");
        const expectedResult = new Response("Invalid response", {
            status: 404,
        });
        mockCache.match.mockResolvedValue(undefined);
        mockFetch.mockResolvedValue(expectedResult);

        await import("./service-worker");

        let ready: (value: Response | PromiseLike<Response>) => void;
        let error: (reason?: any) => void;
        const pr = new Promise<Response>((resolve, reject) => {
            ready = resolve;
            error = reject;
        });

        assert(
            global.events.fetch,
            "Fetch event listener should be registered.",
        );
        global.events.fetch.bind({})({
            respondWith: (promise: Promise<Response>) => {
                promise
                    .then(() => {
                        ready(promise);
                    })
                    .catch((reason: unknown) => {
                        error(reason);
                    });
            },
        });
        const result = await pr;

        expect(result).toBe(expectedResult);
        expect(putSpy).toHaveBeenCalledTimes(0);
    });
});
