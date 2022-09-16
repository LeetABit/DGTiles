#!/usr/bin/env node

import * as git from './common/git.mjs';

export default async function extractVersionHistoryAsync() {
    const result = [];

    const commits = await git.getCommitsAsync();
    const recentVersion = await git.getLatestTagAsync();
    let recent;

    for (const commit of commits) {
        const [version, date, message] = await Promise.all([
            git.getLatestVersionAsync(commit, recentVersion),
            git.getCommitDateAsync(commit),
            git.getCommitMessageAsync(commit),
        ]);

        if (recent?.version !== version) {
            recent = { version, date, messages: [] };
            result.push(recent);
        }

        recent.messages.push(message);
    }

    return result;
}
