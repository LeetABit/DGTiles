//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { serviceWorker } from "#/scripts/serviceWorkerPlugin";

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("service-worker")) {
                        return "sw";
                    }

                    if (
                        id.includes("node_modules") ||
                        id.endsWith("commonjsHelpers.js")
                    ) {
                        return "vendor";
                    }

                    return "main";
                },
            },
            treeshake: {
                preset: "smallest",
            },
        },
    },
    esbuild: { legalComments: "none" },
    plugins: [react(), serviceWorker("src/sw/service-worker.ts")],
    preview: {
        host: "0.0.0.0",
        port: 5000,
    },
    resolve: {
        alias: {
            "#/": `${resolve(__dirname)}/`,
            "@/": `${resolve(__dirname, "src")}/`,
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5000,
    },
    test: {
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            reportsDirectory: "results/coverage",
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
                perFile: true,
                autoUpdate: true,
            },
        },
        projects: [
            {
                test: {
                    include: ["scripts/**/*.test.ts"],
                    alias: {
                        "#/": `${resolve(__dirname)}/`,
                        "@/": `${resolve(__dirname, "src")}/`,
                    },
                },
                plugins: [
                    {
                        name: "virtual-modules",
                        resolveId(id) {
                            if (id.startsWith("virtual:")) {
                                return id;
                            }

                            return null;
                        },
                    },
                ],
            },
            {
                test: {
                    environment: "jsdom",
                    globals: true,
                    include: [
                        "src/**/*.test.ts",
                        "src/**/*.test.tsx",
                        "tests/**/*.test.ts",
                    ],
                    alias: {
                        "#/": `${resolve(__dirname)}/`,
                        "@/": `${resolve(__dirname, "src")}/`,
                    },
                },
                plugins: [
                    {
                        name: "virtual-modules",
                        resolveId(id) {
                            if (id.startsWith("virtual:")) {
                                return id;
                            }

                            return null;
                        },
                    },
                ],
            },
            {
                test: {
                    browser: {
                        enabled: true,
                        headless: true,
                        instances: [{ browser: "chromium" }],
                        provider: playwright(),
                        screenshotFailures: false,
                    },
                    globals: true,
                    include: [
                        "src/**/*.browser.ts",
                        "src/**/*.browser.tsx",
                        "tests/**/*.browser.ts",
                        "tests/**/*.browser.tsx",
                    ],
                    alias: {
                        "#/": `${resolve(__dirname)}/`,
                        "@/": `${resolve(__dirname, "src")}/`,
                    },
                },
                plugins: [
                    {
                        name: "virtual-modules",
                        resolveId(id) {
                            if (id.startsWith("virtual:")) {
                                return id;
                            }

                            return null;
                        },
                    },
                ],
            },
        ],
        setupFiles: ["vitest-setup.ts"],
    },
});
