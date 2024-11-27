//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { defineConfig, mergeConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const viteConfig = defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            treeshake: {
                preset: "smallest",
            },
        },
        terserOptions: {
            compress: false,
            mangle: false,
        },
    },
    plugins: [react(), basicSsl()],
    preview: {
        port: 5000,
    },
    resolve: {
        alias: {
            "#root": resolve(__dirname),
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        port: 5000,
    },
});

const vitestConfig = defineVitestConfig({
    define: {
        TEST: "true",
    },
    test: {
        environment: "jsdom",
        setupFiles: ["vitest-setup.mts"],
    },
});

export default mergeConfig(viteConfig, vitestConfig);
