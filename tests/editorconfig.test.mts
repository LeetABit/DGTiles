//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { expect, test } from "vitest";
import editorconfig, { ParseOptions } from "editorconfig";
import { getRepositoryFilesAsync } from "#root/tests/utils.mts";

test("All files in repository are covered by '.editorconfig'.", async () => {
    const files = await getRepositoryFilesAsync();
    for (const file of files) {
        const options: ParseOptions = {
            files: [],
        };
        await editorconfig.parse(file, options);
        expect(
            options.files?.length,
            `File '${file}' is not included in '.editorconfig' file.`,
        ).toBeGreaterThan(0);
    }
});
