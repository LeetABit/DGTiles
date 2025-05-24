//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import { configureAxe } from "vitest-axe";
import { readFile as readFileAsync } from "fs/promises";

describe("Index document", () => {
    test("Should have no axe violations.", async () => {
        const html = await readFileAsync("./index.html");
        const axe = configureAxe({ impactLevels: ["minor"] });
        const results = await axe(html.toString());
        expect(results).toHaveNoViolations();
    });
});
