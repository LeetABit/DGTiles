//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import {
    getCommitHashAsync,
    getCommitMessageAsync,
    getLatestTagsAsync,
} from "#/scripts/common/git.ts";

export interface VersionInfo {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
}

export const INITIAL_VERSION: VersionInfo = {
    major: 0,
    minor: 1,
    patch: 0,
};

const versionTagRegexp = /^v(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/u;

/**
 * Bumps the version based on the provided messages.
 * - If any message starts with "Breaking:", increments the major version.
 * - If any message starts with "Feature:", increments the minor version.
 * - If there are any other messages, increments the patch version.
 * - If there are no messages, returns the current version.
 * @param {VersionInfo} version The current version.
 * @param {string[]} messages The commit messages.
 * @returns {VersionInfo} The bumped version.
 */
export function bumpVersion(
    version: VersionInfo,
    messages: readonly string[],
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

/**
 * Gets the latest version from the tags in the repository.
 * @returns {Promise<VersionInfo | null>} The latest version or null if no
 * version is found.
 */
export async function getLatestVersionAsync(): Promise<VersionInfo | null> {
    const tags = await getLatestTagsAsync("HEAD", "v*");
    for (const tag of tags) {
        const versionTagMatch = versionTagRegexp.exec(tag);
        if (
            versionTagMatch?.groups &&
            "major" in versionTagMatch.groups &&
            "minor" in versionTagMatch.groups &&
            "patch" in versionTagMatch.groups
        ) {
            return {
                major: parseInt(versionTagMatch.groups["major"], 10),
                minor: parseInt(versionTagMatch.groups["minor"], 10),
                patch: parseInt(versionTagMatch.groups["patch"], 10),
            };
        }
    }

    return null;
}

/**
 * Calculates the new version based on the latest version and the current
 * commit.
 * - If the current commit is the same as the last version, returns the last
 * version.
 * - If the current commit is different, bumps the version based on the commit
 * message.
 * @returns {Promise<VersionInfo>} The new version calculated from current
 * commit.
 */
export async function calculateNewVersion(): Promise<VersionInfo> {
    const lastVersion = await getLatestVersionAsync();
    if (!lastVersion) {
        return INITIAL_VERSION;
    }

    const currentCommit = await getCommitHashAsync("HEAD");
    const major = lastVersion.major.toString();
    const minor = lastVersion.minor.toString();
    const patch = lastVersion.patch.toString();
    const lastVersionCommit = await getCommitHashAsync(
        `v${major}.${minor}.${patch}`,
    );
    if (lastVersionCommit === currentCommit) {
        return lastVersion;
    }

    const currentCommitMessage = await getCommitMessageAsync(currentCommit);
    return bumpVersion(lastVersion, currentCommitMessage);
}
