//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import {
    getProjectRootAsync,
    getRepositoryFilesAsync,
} from "../scripts/common/git.mts";
import { evaluateFileContentAsync } from "../scripts/common/files.mts";

const MAX_EXTRA_LINES = 1;
const rootPath = await getProjectRootAsync();
const typeScriptFiles = await getRepositoryFilesAsync(
    "**",
    "**/*.{gitattributes,gitignore,editorconfig,md,html,json,lock,yml}",
);
const expectedHeader = [
    "Copyright (c) Hubert Bukowski. All rights reserved.",
    "Licensed under the MIT License.",
    "See LICENSE file in the project root for full license information.",
];

describe.each(typeScriptFiles)("File '%s'", (file: string) => {
    test("contains copyright header.", async () => {
        let lineToFindIndex = 0;
        let lastMatchedLineNumber = -1;
        const result = await evaluateFileContentAsync(
            `${rootPath}/${file}`,
            (line, lineNumber) => {
                const header = expectedHeader[lineToFindIndex]!;
                if (header !== "" && line.includes(header)) {
                    lastMatchedLineNumber = lineNumber;
                    lineToFindIndex += 1;
                    return lineToFindIndex < expectedHeader.length;
                }

                if (lineNumber - lastMatchedLineNumber > MAX_EXTRA_LINES) {
                    throw new Error(
                        `File '${file}' does not contain expected header.`,
                    );
                }

                return true;
            },
        );

        expect(result, `File '${file}' does not contain expected header.`).toBe(
            true,
        );
    });
});
