//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    reporter: [["html", { outputFolder: "results/playwright/" }]],
    testDir: "tests/playwright",
    testMatch: "**/*.e2e.ts",
    use: {
        baseURL: "http://localhost:5000",
    },
    webServer: {
        command: "pnpm preview",
    },
    outputDir: "results/playwright/",
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
        },
        {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"] },
        },
        {
            name: "Google Chrome",
            use: { ...devices["Desktop Chrome"], channel: "chrome" },
        },
        {
            name: "Microsoft Edge",
            use: { ...devices["Desktop Edge"], channel: "msedge" },
        },
    ],
});
