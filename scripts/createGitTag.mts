//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { Context } from "@actions/github/lib/context";
import { RequestError } from "@octokit/request-error";
import { calculateNewVersion } from "./common/version.mts";
import { getOctokit } from "@actions/github";

type GitHub = ReturnType<typeof getOctokit>;
const HTTP_STATUS_NOT_FOUND = 404;

export default async function createGitTag(
    github: GitHub,
    context: Context,
): Promise<void> {
    const newVersion = await calculateNewVersion();

    const tag = `tags/v${newVersion.major.toString()}.${newVersion.minor.toString()}.${newVersion.patch.toString()}`;
    const tagRef = `refs/${tag}`;

    try {
        await github.rest.git.getRef({
            owner: context.repo.owner,
            ref: tag,
            repo: context.repo.repo,
        });
    } catch (error) {
        if (
            error instanceof RequestError &&
            error.status === HTTP_STATUS_NOT_FOUND
        ) {
            await github.rest.git.createRef({
                owner: context.repo.owner,
                ref: tagRef,
                repo: context.repo.repo,
                sha: context.sha,
            });
        }
    }
}
