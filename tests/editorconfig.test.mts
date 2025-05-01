//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import editorconfig, { type ParseOptions } from "editorconfig";
import { expect, test } from "vitest";
import { getRepositoryFilesAsync } from "../scripts/common/git.mts";

test("All files in repository are covered by '.editorconfig'.", async () => {
    const files = await getRepositoryFilesAsync("**", "**/*.{png,ico}");
    await Promise.all(
        files.map(async (file) => {
            const options: ParseOptions = {
                files: [],
            };
            await editorconfig.parse(file, options);
            expect(
                options.files?.length,
                `File '${file}' is not included in '.editorconfig' file.`,
            ).toBeGreaterThan(0);
        }),
    );
});
