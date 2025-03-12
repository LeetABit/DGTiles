//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { expect, test } from "vitest";
import {
    getFileGitAttributesAsync,
    getRepositoryFilesAsync,
} from "../scripts/common/git.mts";

test("All files in repository are covered by '.gitattributes'.", async () => {
    const files = await getRepositoryFilesAsync();
    await Promise.all(
        files.map(async (file) => {
            const attributes = await getFileGitAttributesAsync(file);
            expect(
                attributes.length,
                `File '${file}' is not included in '.gitattributes' file.`,
            ).toBeGreaterThan(0);
        }),
    );
});
