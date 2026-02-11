//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_BACKGROUND_MAJOR_GRID_COLOR,
    DEFAULT_BACKGROUND_MINOR_GRID_COLOR,
    theme,
} from "./themes";
import { describe, expect, test } from "vitest";

describe("DEFAULTS", () => {
    test("should define DEFAULT_BACKGROUND_COLOR as string", () => {
        expect(DEFAULT_BACKGROUND_COLOR).toBeTypeOf("string");
    });

    test("should define DEFAULT_BACKGROUND_MAJOR_GRID_COLOR as string", () => {
        expect(DEFAULT_BACKGROUND_MAJOR_GRID_COLOR).toBeTypeOf("string");
    });

    test("should define DEFAULT_BACKGROUND_MINOR_GRID_COLOR as string", () => {
        expect(DEFAULT_BACKGROUND_MINOR_GRID_COLOR).toBeTypeOf("string");
    });
});

describe("theme", () => {
    test("should define theme.background.color as default value", () => {
        expect(theme.background.color).toBe(DEFAULT_BACKGROUND_COLOR);
    });

    test("should define theme.background.majorGrid as default value", () => {
        expect(theme.background.grid.majorColor).toBe(
            DEFAULT_BACKGROUND_MAJOR_GRID_COLOR,
        );
    });

    test("should define theme.background.minorGrid as default value", () => {
        expect(theme.background.grid.minorColor).toBe(
            DEFAULT_BACKGROUND_MINOR_GRID_COLOR,
        );
    });
});
