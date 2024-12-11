//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { existsSync } from "fs";
import { minimatch } from "minimatch";
import execCommandAsync from './exec.mts';

const versionTagRegexp = /^v(\d+)\.(\d+)\.(\d+)$/;

const matchVersion = (tagName: string, throwOnError: boolean) => {
    const versionTagMatch = tagName.match(versionTagRegexp);
    if (!versionTagMatch && throwOnError) {
        throw new Error(`Could not extract version information from most recently applied tag: '${tagName}'.`);
    }

    return versionTagMatch;
}

const extractVersionInfo = (tagName: string, fallbackVersion?: string) => {
    const versionTagMatch = matchVersion(tagName, fallbackVersion !== undefined);

    return versionTagMatch
        ? {
            major: parseInt(versionTagMatch[1], 10),
            minor: parseInt(versionTagMatch[2], 10),
            patch: parseInt(versionTagMatch[3], 10),
        }
        : fallbackVersion;
}

export async function getLatestTagAsync(revision? : string) {
    return (await execCommandAsync(`git describe --tags --abbrev=0 ${revision ?? ''}`)).trim();
}

export async function getLatestVersionAsync(revision: string, fallbackVersion?: string): Promise<string> {
    const tagName = await getLatestTagAsync(revision);
    if (fallbackVersion) {
        return matchVersion(tagName, fallbackVersion === undefined)
            ? tagName
            : fallbackVersion;
    } else {
        matchVersion(tagName, true);
        return tagName;
    }
}

export async function getLatestVersionInfoAsync(revision: string, fallbackVersion?: string) {
    const tagName = await getLatestTagAsync(revision);
    return extractVersionInfo(tagName, fallbackVersion);
}

export async function getCommitsAsync(startFrom? : string) {
    const commits = (startFrom)
        ? await execCommandAsync(`git rev-list ${startFrom}..HEAD`)
        : await execCommandAsync('git rev-list HEAD');

    return commits.split('\n').map(line => line.trim()).filter(line => line);
}

export async function getCommitMessageAsync(commit: string) {
    return (await execCommandAsync(`git show -s --format=%s ${commit}`)).trim();
}

export async function getCommitDateAsync(commit: string) {
    return (await execCommandAsync(`git show -s --format=%cd --date=short ${commit}`)).trim();
}

export async function getLastCommitAsync(revision = 'HEAD') {
    return (await execCommandAsync(`git rev-parse ${revision}`)).trim();
}

export async function getCurrentBranchNameAsync() {
    return execCommandAsync('git rev-parse --abbrev-ref HEAD');
}

export async function isWorkingDirectoryDirtyAsync() {
    const status = (await execCommandAsync('git status --porcelain')).trim();
    return status !== '';
}

export const getFileGitAttributesAsync = async (filePath: string) =>
    await (await execCommandAsync(`git check-attr --all -- ${filePath}`))
        .split("\n")
        .filter(file => file);

export const getProjectRootAsync = async () =>
    (await execCommandAsync("git rev-parse --show-toplevel"))
        .split("\n")
        .filter(file => file)[0];

export const getRepositoryFilesAsync = async (pattern?: string) => {
    const rootPath = await getProjectRootAsync();
    return (await execCommandAsync(`git ls-files --cached --others --exclude-standard ${rootPath}`))
        .split("\n")
        .filter(file => file && existsSync(file) && minimatch(file, pattern ?? "*"));
};
