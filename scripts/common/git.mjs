#!/usr/bin/env node

import executeCommandAsync from './executeCommandAsync.mjs';

const versionTagRegexp = /^v(\d+)\.(\d+)\.(\d+)$/;

const matchVersion = (tagName, throwOnError) => {
    const versionTagMatch = tagName.match(versionTagRegexp);
    if (!versionTagMatch && throwOnError) {
        throw new Error(`Could not extract version information from most recently applied tag: '${tagName}'.`);
    }

    return versionTagMatch;
}

const extractVersionInfo = (tagName, fallbackVersion) => {
    const versionTagMatch = matchVersion(tagName, fallbackVersion !== undefined);

    return versionTagMatch
        ? {
            major: parseInt(versionTagMatch[1], 10),
            minor: parseInt(versionTagMatch[2], 10),
            patch: parseInt(versionTagMatch[3], 10),
        }
        : fallbackVersion;
}

export async function getLatestTagAsync(revision) {
    return executeCommandAsync(`git describe --tags --abbrev=0 ${revision ?? ''}`);
}

export async function getLatestVersionAsync(revision, fallbackVersion) {
    const tagName = await getLatestTagAsync(revision);
    return matchVersion(tagName, fallbackVersion !== undefined)
        ? tagName
        : fallbackVersion;
}

export async function getLatestVersionInfoAsync(revision, fallbackVersion) {
    const tagName = await getLatestTagAsync(revision);
    return extractVersionInfo(tagName, fallbackVersion);
}

export async function getCommitsAsync(startFrom) {
    const commits = (startFrom)
        ? await executeCommandAsync(`git rev-list ${startFrom}..HEAD`)
        : await executeCommandAsync('git rev-list HEAD');

    return commits.split('\n').map(line => line.trim()).filter(line => line);
}

export async function getCommitMessageAsync(commit) {
    return executeCommandAsync(`git show -s --format=%s ${commit}`);
}

export async function getCommitDateAsync(commit) {
    return executeCommandAsync(`git show -s --format=%cd --date=short ${commit}`);
}

export async function getLastCommitAsync(revision = 'HEAD') {
    return executeCommandAsync(`git rev-parse ${revision}`);
}

export async function getCurrentBranchNameAsync() {
    return executeCommandAsync('git rev-parse --abbrev-ref HEAD');
}

export async function isWorkingDirectoryDirtyAsync() {
    const status = await executeCommandAsync('git status --porcelain');
    return status.trim() !== '';
}
