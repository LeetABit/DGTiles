//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import {
    getCommitHashAsync,
    getCommitMessageAsync,
    getLatestTagsAsync,
} from "./git.mts";

export interface VersionInfo {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
}

export const InitialVersion: VersionInfo = { major: 0, minor: 1, patch: 0 };

const versionTagRegexp = /^v(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/u;

export function bumpVersion(
    version: VersionInfo,
    messages: string[],
): VersionInfo {
    if (messages.some((message) => message.startsWith("Breaking:"))) {
        return {
            major: version.major + 1,
            minor: 0,
            patch: 0,
        };
    }

    if (messages.some((message) => message.startsWith("Feature:"))) {
        return {
            ...version,
            minor: version.minor + 1,
            patch: 0,
        };
    }

    if (messages.length) {
        return {
            ...version,
            patch: version.patch + 1,
        };
    }

    return { ...version };
}

export async function getLatestVersionAsync(): Promise<VersionInfo | null> {
    const tags = await getLatestTagsAsync("HEAD", "v*");
    for (const tag of tags) {
        const versionTagMatch = versionTagRegexp.exec(tag);
        if (versionTagMatch?.groups) {
            return {
                major: parseInt(versionTagMatch.groups.major, 10),
                minor: parseInt(versionTagMatch.groups.minor, 10),
                patch: parseInt(versionTagMatch.groups.patch, 10),
            };
        }
    }

    return null;
}

export async function calculateNewVersion(): Promise<VersionInfo> {
    const lastVersion = await getLatestVersionAsync();
    if (!lastVersion) {
        return InitialVersion;
    }

    const currentCommit = await getCommitHashAsync("HEAD");
    const lastVersionCommit = await getCommitHashAsync(
        `v${lastVersion.major.toString()}.` +
        `${lastVersion.minor.toString()}.` +
        `${lastVersion.patch.toString()}`,
    );
    if (lastVersionCommit === currentCommit) {
        return lastVersion;
    }

    const currentCommitMessage = await getCommitMessageAsync(currentCommit);
    return bumpVersion(lastVersion, currentCommitMessage);
}
