//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import editorconfig, { type ParseOptions } from "editorconfig";
import { getRepositoryFilesAsync } from "#/scripts/common/git";

const files = await getRepositoryFilesAsync("**", "**/*.{png,ico}");

describe.concurrent.each(files)("File '%s'", (file: string) => {
    test("is covered by '.editorconfig'", async () => {
        const options: ParseOptions = {
            files: [],
        };
        await editorconfig.parse(file, options);
        expect(options.files?.length).toBeGreaterThan(0);
    });
});
