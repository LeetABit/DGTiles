//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import { parseDomainFromReadme } from "./readme";

describe("parseDomainFromReadme", () => {
    test("extracts domain from https URL in README content", () => {
        const readme = "See docs at https://dgtiles.com/docs/getting-started";

        expect(parseDomainFromReadme(readme)).toBe("dgtiles.com");
    });

    test("extracts first domain when multiple URLs are present", () => {
        const readme =
            "Primary: https://dgtiles.com/guide Secondary: https://example.com";

        expect(parseDomainFromReadme(readme)).toBe("dgtiles.com");
    });

    test("throws when README content has no https URL", () => {
        expect(() => {
            parseDomainFromReadme("No links here");
        }).toThrow("Domain URL must exist in docs/README.md");
    });
});
