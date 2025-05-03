//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
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
        setupFiles: ["vitest-setup.mts"],
        workspace: [
            {
                extends: true,
                test: {
                    include: [
                        "tests/meta/**/*.test.mts",
                        "tests/scripts/**/*.test.mts",
                    ],
                },
            },
            {
                extends: true,
                test: {
                    environment: "jsdom",
                    exclude: [
                        "tests/meta/**/*.test.mts",
                        "tests/scripts/**/*.test.mts",
                    ],
                    globals: true,
                    include: ["tests/**/*.test.mts"],
                },
            },
        ],
    },
});
