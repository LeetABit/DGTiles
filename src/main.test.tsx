//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/App.tsx", () => ({
    default: vi.fn(() => null),
}));
vi.mock("@axe-core/react", () => ({
    default: vi.fn(),
}));
vi.mock("virtual:service-worker", () => ({
    serviceWorkerFilePath: "/sw.js",
}));

describe("main.tsx", () => {
    let mockRoot: HTMLElement;
    let mockBase: HTMLBaseElement;

    beforeEach(() => {
        mockRoot = document.createElement("div");
        mockRoot.id = "root";
        document.body.appendChild(mockRoot);

        mockBase = document.createElement("base");
        mockBase.href = "/test-base/";
        document.head.appendChild(mockBase);

        vi.resetModules();
    });

    afterEach(() => {
        if (document.body.contains(mockRoot)) {
            document.body.removeChild(mockRoot);
        }
        if (document.head.contains(mockBase)) {
            document.head.removeChild(mockBase);
        }
        vi.clearAllMocks();
    });

    test("should throw error when base element is not found", async () => {
        document.head.removeChild(mockBase);

        await expect(async () => {
            await import("./main");
        }).rejects.toThrow(
            "Could not find base element for React App substitution.",
        );
    });

    test("should throw error when root element is not found", async () => {
        document.body.removeChild(mockRoot);

        await expect(async () => {
            await import("./main");
        }).rejects.toThrow(
            "Could not find element with root ID for React App substitution.",
        );
    });

    test("should register service worker in production mode", async () => {
        const mockRegister = vi.fn();
        Object.defineProperty(navigator, "serviceWorker", {
            value: { register: mockRegister },
            configurable: true,
        });

        vi.stubEnv("PROD", true);
        vi.stubEnv("DEV", false);

        await import("./main");

        expect(mockRegister).toHaveBeenCalledWith("/sw.js", { type: "module" });

        vi.unstubAllEnvs();
    });

    test("should not register service worker when not available", async () => {
        const mockRegister = vi.fn();
        const originalServiceWorker = navigator.serviceWorker;

        vi.stubEnv("PROD", true);
        vi.stubEnv("DEV", false);

        await import("./main");

        expect(mockRegister).not.toHaveBeenCalled();

        Object.defineProperty(navigator, "serviceWorker", {
            value: originalServiceWorker,
            configurable: true,
        });
        vi.unstubAllEnvs();
    });

    test("should run axe in development mode", async () => {
        const axe = (await import("@axe-core/react")).default;

        vi.stubEnv("PROD", false);
        vi.stubEnv("DEV", true);

        await import("./main");

        expect(axe).toHaveBeenCalled();

        vi.unstubAllEnvs();
    });

    test("should not run axe in production mode", async () => {
        const axe = (await import("@axe-core/react")).default;

        vi.stubEnv("PROD", true);
        vi.stubEnv("DEV", false);

        await import("./main");

        expect(axe).not.toHaveBeenCalled();

        vi.unstubAllEnvs();
    });
});
