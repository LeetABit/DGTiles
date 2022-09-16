#!/usr/bin/env node

import * as git from './common/git.mjs';

const bumpMajor = (version) => {
    return {
        major: version.major + 1,
        minor: 0,
        patch: 0,
    };
}

const bumpMinor = (version) => {
    return {
        ...version,
        minor: version.minor + 1,
        patch: 0,
    };
}

const bumpPatch = (version) => {
    return {
        ...version,
        patch: version.patch + 1,
    };
}

const bumpVersion = (version, messages) => {
    if (messages.some(m => m.startsWith('Breaking:'))) {
        return bumpMajor(version);
    }

    if (messages.some(m => m.startsWith('Feature:'))) {
        return bumpMinor(version);
    }

    if (messages.length) {
        return bumpPatch(version);
    }

    return { ...version };
}

export default async function extractGitVersionAsync() {
    const tagName = await git.getLatestTagAsync();
    const currentVersion = await git.getLatestVersionInfoAsync(tagName);
    const commits = await git.getCommitsAsync(tagName);
    const messages = await Promise.all(commits.map(git.getCommitMessageAsync));
    const result = bumpVersion(currentVersion, messages);

    result.sha = await git.getLastCommitAsync();
    result.branch = await git.getCurrentBranchNameAsync();
    result.commitCount = commits.length;
    result.isDirty = await git.isWorkingDirectoryDirtyAsync();

    return result;
}
