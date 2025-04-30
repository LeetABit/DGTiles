//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { createTagAsync, doesTagExistAsync } from "./common/git.mts";
import { calculateNewVersion } from "./common/version.mts";

export default async function createNewVersionTag(): Promise<void> {
    const newVersion = await calculateNewVersion();
    const major = newVersion.major.toString();
    const minor = newVersion.minor.toString();
    const patch = newVersion.patch.toString();

    const tag = `v${major}.${minor}.${patch}`;
    if (!await doesTagExistAsync(tag)) {
        await createTagAsync(tag);
    }
}
