//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { beforeEach, describe, expect, test, vi } from "vitest";
import { axe } from "vitest-axe";
import { readFile as readFileAsync } from "fs/promises";

describe("Main entry point", () => {
    beforeEach(() => {
        vi.resetModules();
    });

    test("Should accept root element", async () => {
        document.body.innerHTML = '<div id="root" />';
        await import("../src/main.tsx");
    });

    test("Should throw when no root element.", async () => {
        document.body.innerHTML = '<div id="main" />';
        try {
            await import("../src/main.tsx");
            expect(false).toBeTruthy();
        } catch {
            expect(true).toBeTruthy();
        }
    });

    test("Should throw when no root element.", async () => {
        const html = await readFileAsync("./index.html");
        document.body.innerHTML = html.toString();
        await import("../src/main.tsx");
    });

    test("Should throw when no root element.", async () => {
        const html = await readFileAsync("./index.html");
        document.body.innerHTML = html.toString();
        await import("../src/main.tsx");
        const results = await axe(document.body.innerHTML);
        expect(results).toHaveNoViolations();
    });
});
