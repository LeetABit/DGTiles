//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { Context } from "@actions/github/lib/context";
import { getLatestTagsAsync } from "./common/git.ts";
import type { getOctokit } from "@actions/github";

type GitHub = ReturnType<typeof getOctokit>;

const HTTP_STATUS_NOT_FOUND = 404;

/**
 * Creates a new Git tag for the current commit.
 * @param {GitHub} github The GitHub client.
 * @param {Context} context The GitHub context.
 * @returns {Promise<void>} A promise that resolves when the tag is created.
 * @throws {Error} An error if the tag creation fails.
 */
export default async function pushLatestTags(
    github: GitHub,
    context: Context,
): Promise<void> {
    const tags = await getLatestTagsAsync("HEAD", "v*");
    const promises = tags.map(async (tag) => {
        const tagObject = `tags/${tag}`;
        const tagRef = `refs/${tagObject}`;

        try {
            await github.rest.git.getRef({
                owner: context.repo.owner,
                ref: tagObject,
                repo: context.repo.repo,
            });
        } catch (getError) {
            if (
                typeof getError === "object" &&
                getError !== null &&
                "status" in getError &&
                getError.status === HTTP_STATUS_NOT_FOUND
            ) {
                await github.rest.git.createRef({
                    owner: context.repo.owner,
                    ref: tagRef,
                    repo: context.repo.repo,
                    sha: context.sha,
                });
            } else {
                throw getError;
            }
        }
    });

    await Promise.all(promises);
}
