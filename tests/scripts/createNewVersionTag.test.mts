//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { afterEach, describe, expect, it, vi } from "vitest";
import { createTagAsync, doesTagExistAsync } from "#/scripts/common/git.mjs";
import { calculateNewVersion } from "#/scripts/common/version.mts";
import createNewVersionTag from "#/scripts/createNewVersionTag.mts";

vi.mock("#/scripts/common/version.mts");
vi.mock("#/scripts/common/exec.mts");
vi.mock("#/scripts/common/git.mts");

describe("createNewVersionTag", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it("should create a new tag if it does not exist", async () => {
        vi.mocked(calculateNewVersion).mockResolvedValue({
            major: 1,
            minor: 0,
            patch: 0,
        });
        vi.mocked(doesTagExistAsync).mockResolvedValue(false);

        await createNewVersionTag();

        expect(createTagAsync).toHaveBeenCalledWith("v1.0.0");
    });

    it("should not create a tag if it already exists", async () => {
        vi.mocked(calculateNewVersion).mockResolvedValue({
            major: 1,
            minor: 0,
            patch: 0,
        });
        vi.mocked(doesTagExistAsync).mockResolvedValue(true);

        await createNewVersionTag();

        expect(createTagAsync).not.toHaveBeenCalled();
    });
});
