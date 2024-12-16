//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { getChangelog } from "./common/changelog.mts";
import { writeFile } from "fs/promises";

const MONTH_DATE_DIGIT_COUNT = 2;

export default async function generateChangelog(
    filePath: string,
): Promise<void> {
    const changelog = await getChangelog();
    const changelogLines = ["# Changelog", ""];

    for (const entry of changelog) {
        changelogLines.push(
            `## v${entry.version} - ${entry.date.getUTCFullYear().toString()}-${entry.date.getUTCMonth().toString().padStart(MONTH_DATE_DIGIT_COUNT, "0")}-${entry.date.getUTCDate().toString().padStart(MONTH_DATE_DIGIT_COUNT, "0")}`,
        );
        changelogLines.push("");
        for (const change of entry.changes) {
            changelogLines.push(`- ${change}`);
        }
        changelogLines.push("");
    }

    await writeFile(filePath, changelogLines.join("\n"), "utf-8");
}
