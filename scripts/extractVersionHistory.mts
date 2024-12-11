//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as git from './common/git.mts';

type VersionHistory = { version: string; date: string; messages: string[] };

export default async function extractVersionHistoryAsync() {
    const result: VersionHistory[] = [];

    const commits = await git.getCommitsAsync();
    const recentVersion = await git.getLatestTagAsync();
    let recent: VersionHistory | undefined;

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
