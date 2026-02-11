//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { afterEach, describe, expect, test, vi } from "vitest";
import { createTagAsync, doesTagExistAsync } from "./common/git";
import { calculateNewVersion } from "./common/version";
import createNewVersionTag from "./createNewVersionTag";

vi.mock("./common/version");
vi.mock("./common/exec");
vi.mock("./common/git");

describe("createNewVersionTag", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    test("should create a new tag if it does not exist", async () => {
        vi.mocked(calculateNewVersion).mockResolvedValue({
            major: 1,
            minor: 0,
            patch: 0,
        });
        vi.mocked(doesTagExistAsync).mockResolvedValue(false);

        await createNewVersionTag();

        expect(createTagAsync).toHaveBeenCalledWith("v1.0.0");
    });

    test("should not create a tag if it already exists", async () => {
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
