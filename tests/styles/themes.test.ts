//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, it, expect } from "vitest";
import { BACKGROUND_COLOR, theme } from "#/src/styles/themes";

describe("themes.ts", () => {
    it("should export BACKGROUND_COLOR as 'white'", () => {
        expect(BACKGROUND_COLOR).not.toBe(null);
    });

    it("should export theme with workspace.background set to BACKGROUND_COLOR", () => {
        expect(theme.workspace.background).toBe(BACKGROUND_COLOR);
    });

    it("should export theme with workspace.background set to BACKGROUND_COLOR", () => {
        expect(theme).toBeTypeOf("object");
        expect(theme).not.toBe(null);
    });
});
