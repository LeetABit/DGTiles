//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { getAllTagsWithDateAndMessagesAsync } from "./git.mts";

export interface VersionChanges {
    changes: string[];
    date: Date;
    version: string;
}

export type Changelog = VersionChanges[];

export async function getChangelog(): Promise<Changelog> {
    const tags = await getAllTagsWithDateAndMessagesAsync("v*");
    return tags
        .map(({ name, date, messages }) => ({
            changes: messages,
            date,
            version: name.substring(1),
        }))
        .sort((left, right) => {
            const parseVersion = (version: string) =>
                version.split(".").map(Number);
            const [leftMajor, leftMinor, leftPatch] = parseVersion(
                left.version,
            );
            const [rightMajor, rightMinor, rightPatch] = parseVersion(
                right.version,
            );
            return (
                rightMajor - leftMajor ||
                rightMinor - leftMinor ||
                rightPatch - leftPatch
            );
        });
}
