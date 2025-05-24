//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { serviceWorker } from "#/scripts/serviceWorkerPlugin.ts";

export default defineConfig({
    build: {
        rollupOptions: {
            treeshake: {
                moduleSideEffects: false,
                preset: "smallest",
            },
        },
    },
    esbuild: { legalComments: "none" },
    plugins: [react(), serviceWorker("sw/service-worker.ts")],
    preview: {
        port: 5000,
    },
    resolve: {
        alias: {
            "#/": `${resolve(__dirname)}/`,
            "@/": `${resolve(__dirname, "src")}/`,
        },
    },
    server: {
        port: 5000,
    },
    test: {
        setupFiles: ["vitest-setup.ts"],
        workspace: [
            {
                extends: true,
                test: {
                    include: [
                        "tests/meta/**/*.test.ts",
                        "tests/scripts/**/*.test.ts",
                    ],
                },
            },
            {
                extends: true,
                test: {
                    environment: "jsdom",
                    exclude: [
                        "tests/meta/**/*.test.ts",
                        "tests/scripts/**/*.test.ts",
                    ],
                    globals: true,
                    include: ["tests/**/*.test.ts"],
                },
            },
        ],
    },
});
