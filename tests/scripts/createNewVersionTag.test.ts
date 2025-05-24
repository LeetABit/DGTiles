//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { afterEach, describe, expect, it, vi } from "vitest";
import { createTagAsync, doesTagExistAsync } from "#/scripts/common/git.js";
import { calculateNewVersion } from "#/scripts/common/version.ts";
import createNewVersionTag from "#/scripts/createNewVersionTag.ts";

vi.mock("#/scripts/common/version.ts");
vi.mock("#/scripts/common/exec.ts");
vi.mock("#/scripts/common/git.ts");

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
