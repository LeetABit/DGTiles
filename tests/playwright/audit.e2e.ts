//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Production Accessibility Audit", () => {
    test("homepage should have no detectable violations", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
