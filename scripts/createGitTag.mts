//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import extractGitVersion from './extractGitVersion.mts';

export default async function createGitTag(github, context) {
    const gitVersion = await extractGitVersion();

    const tag = `tags/v${gitVersion.major}.${gitVersion.minor}.${gitVersion.patch}`;
    const tagRef = `refs/${tag}`;

    try {
        await github.rest.git.getRef({
            owner: context.repo.owner,
            repo: context.repo.repo,
            ref: tag,
        });
    } catch (error) {
        if (error.status === 404) {
            await github.rest.git.createRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: tagRef,
                sha: context.sha,
            });
        }
    }
}
