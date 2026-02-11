//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import {
    getFileGitAttributesAsync,
    getRepositoryFilesAsync,
} from "#/scripts/common/git";

const files = await getRepositoryFilesAsync();

describe.concurrent.each(files)("File '%s'", (file: string) => {
    test("is covered by '.gitattributes'", async () => {
        const attributes = await getFileGitAttributesAsync(file);
        expect(attributes.length).toBeGreaterThan(0);
    });
});
