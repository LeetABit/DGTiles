//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { createTagAsync, doesTagExistAsync } from "./common/git.mts";
import { calculateNewVersion } from "./common/version.mts";

/**
 * Creates a new Git tag for the current commit.
 * - Calculates the new version based on the commit messages.
 * - Creates a tag in the format "vX.Y.Z".
 * @returns {Promise<void>} A promise that resolves when the tag is created.
 * @throws {Error} If the command fails or produces stderr.
 */
export default async function createNewVersionTag(): Promise<void> {
    const newVersion = await calculateNewVersion();
    const major = newVersion.major.toString();
    const minor = newVersion.minor.toString();
    const patch = newVersion.patch.toString();

    const tag = `v${major}.${minor}.${patch}`;
    if (!(await doesTagExistAsync(tag))) {
        await createTagAsync(tag);
    }
}
