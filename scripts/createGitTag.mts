//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { Context } from "@actions/github/lib/context";
import { calculateNewVersion } from "./common/version.mts";
import type { getOctokit } from "@actions/github";

type GitHub = ReturnType<typeof getOctokit>;

const HTTP_STATUS_NOT_FOUND = 404;

export default async function createGitTag(
    github: GitHub,
    context: Context,
): Promise<void> {
    const newVersion = await calculateNewVersion();
    const major = newVersion.major.toString();
    const minor = newVersion.minor.toString();
    const patch = newVersion.patch.toString();

    const tag = `tags/v${major}.${minor}.${patch}`;
    const tagRef = `refs/${tag}`;

    console.log(`Creating tag ${tag}`);

    try {
        await github.rest.git.getRef({
            owner: context.repo.owner,
            ref: tag,
            repo: context.repo.repo,
        });

        console.log(`Tag already exists.`);
    } catch (getError) {
        if (typeof getError === 'object'
            && getError !== null
            && 'status' in getError
            && getError.status === HTTP_STATUS_NOT_FOUND
        ) {
            try {
                await github.rest.git.createRef({
                    owner: context.repo.owner,
                    ref: tagRef,
                    repo: context.repo.repo,
                    sha: context.sha,
                });

                console.log(`Tag ${tag} created.`);
            } catch (createError) {
                console.error(`Failed to create tag ${tag}.`);
                throw createError;
            }
        } else {
            console.error(`Failed to get tag ${tag}.`);
            throw getError;
        }
    }
}
