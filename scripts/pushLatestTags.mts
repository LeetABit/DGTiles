//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { Context } from "@actions/github/lib/context";
import { getLatestTagsAsync } from "./common/git.mts";
import type { getOctokit } from "@actions/github";

type GitHub = ReturnType<typeof getOctokit>;

const HTTP_STATUS_NOT_FOUND = 404;

export default async function pushLatestTags(
    github: GitHub,
    context: Context,
): Promise<void> {
    const tags = await getLatestTagsAsync("HEAD", "v*");
    const promises = tags.map(async (tag) => {
        const tagObject = `tags/${tag}`;
        const tagRef = `refs/${tagObject}`;

        console.log(`Creating tag ${tagObject}`);

        try {
            await github.rest.git.getRef({
                owner: context.repo.owner,
                ref: tagObject,
                repo: context.repo.repo,
            });

            console.log(`Tag already exists.`);
        } catch (getError) {
            if (typeof getError === "object"
                && getError !== null
                && "status" in getError
                && getError.status === HTTP_STATUS_NOT_FOUND
            ) {
                try {
                    await github.rest.git.createRef({
                        owner: context.repo.owner,
                        ref: tagRef,
                        repo: context.repo.repo,
                        sha: context.sha,
                    });

                    console.log(`Tag ${tagObject} created.`);
                } catch (createError) {
                    console.error(`Failed to create tag ${tagObject}.`);
                    throw createError;
                }
            } else {
                console.error(`Failed to get tag ${tagObject}.`);
                throw getError;
            }
        }
    });

    await Promise.all(promises);
}
