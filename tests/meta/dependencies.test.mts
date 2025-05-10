//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { expect, test } from "vitest";
import { evaluateFileContentAsync } from "#/scripts/common/files.mjs";
import { getDependencies } from "#/scripts/common/packageJson.mjs";
import { getRepositoryFilesAsync } from "#/scripts/common/git.mjs";

const typeLibPrefix = "@types/";
const dependencies = getDependencies();
const files = await getRepositoryFilesAsync();

test.each(dependencies)(
    "Dependency '%s' is used in the project.",
    async (dependency: string) => {
        const dependencyName = dependency.startsWith(typeLibPrefix)
            ? dependency.substring(typeLibPrefix.length)
            : dependency;

        const importRegex = new RegExp(
            `(( from|import))\\s+["']${dependencyName}`,
            "u",
        );

        const documentationRegex = new RegExp(`### \`${dependency}\``, "u");

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

        expect(
            isUsed || isDocumented,
            `Dependency '${dependency}' is not used nor documented.`,
        ).toBe(true);
    },
);
