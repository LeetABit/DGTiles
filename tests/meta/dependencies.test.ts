//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import {
    evaluateFileContentAsync,
    extractFileContentAsync,
} from "#/scripts/common/files";
import { getDependencies } from "#/scripts/common/packageJson";
import { getRepositoryFilesAsync } from "#/scripts/common/git";

const typeLibPrefix = "@types/";
const dependencies = getDependencies();
const files = await getRepositoryFilesAsync();
const documentationRegex = /### `(?<name>[^`]+)`/u;
const documentedDependencies = await extractFileContentAsync(
    "docs/dev/Dependencies.md",
    (line) => {
        const extracted = documentationRegex.exec(line);
        return extracted && extracted.length > 1 ? extracted[1] : undefined;
    },
);

describe.each(dependencies)("Dependency '%s'", (dependency: string) => {
    test("is used or documented in the project", async () => {
        const dependencyName = dependency.startsWith(typeLibPrefix)
            ? dependency.substring(typeLibPrefix.length)
            : dependency;

        const importRegex = new RegExp(
            `(( from|import))\\s+["']${dependencyName}`,
            "u",
        );

        let isUsed = false;
        let isDocumented = false;
        for (const file of files) {
            const result = await evaluateFileContentAsync(
                file,
                (line) => importRegex.exec(line) !== null,
            );

            if (result) {
                isUsed = true;
                break;
            }
        }

        if (!isUsed) {
            isDocumented = await evaluateFileContentAsync(
                "docs/dev/Dependencies.md",
                (line) => documentationRegex.exec(line) !== null,
            );
        }

        expect(isUsed || isDocumented).toBe(true);
    });
});

describe.each(documentedDependencies)(
    "Documented Dependency '%s'",
    (documentedDependency: string) => {
        test("is specified in project.json file", () => {
            expect(dependencies).toContain(documentedDependency);
        });
    },
);
