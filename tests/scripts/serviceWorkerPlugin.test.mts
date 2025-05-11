//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, it } from "vitest";
import { serviceWorker } from "#/scripts/serviceWorkerPlugin.mts";

describe("serviceWorker plugin", () => {
    const filePath = "src/sw.js";

    it("should return a plugin object with name", () => {
        const plugin = serviceWorker(filePath);
        expect(plugin.name).toBeTruthy();
    });
});
