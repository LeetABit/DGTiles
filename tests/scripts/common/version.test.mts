//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as git from "#/scripts/common/git.mts";
import {
    INITIAL_VERSION,
    type VersionInfo,
    bumpVersion,
    calculateNewVersion,
    getLatestVersionAsync,
} from "#/scripts/common/version.mts";
import { describe, expect, it, vi } from "vitest";

vi.mock("#/scripts/common/git.mts");

describe("bumpVersion", () => {
    it("should bump major version if a message starts with 'Breaking:'", () => {
        const currentVersion: VersionInfo = {
            major: 1,
            minor: 0,
            patch: 0,
        };
        const messages = ["Breaking: Major change"];
        const result = bumpVersion(currentVersion, messages);
        expect(result).toEqual({
            major: 2,
            minor: 0,
            patch: 0,
        });
    });

    it("should bump minor version if a message starts with 'Feature:'", () => {
        const currentVersion: VersionInfo = {
            major: 1,
            minor: 0,
            patch: 0,
        };
        const messages = ["Feature: New feature added"];
        const result = bumpVersion(currentVersion, messages);
        expect(result).toEqual({
            major: 1,
            minor: 1,
            patch: 0,
        });
    });

    it("should bump patch version if there are other messages", () => {
        const currentVersion: VersionInfo = {
            major: 1,
            minor: 0,
            patch: 0,
        };
        const messages = ["Fix: Bug fixed"];
        const result = bumpVersion(currentVersion, messages);
        expect(result).toEqual({
            major: 1,
            minor: 0,
            patch: 1,
        });
    });

    it("should return the same version if there are no messages", () => {
        const currentVersion: VersionInfo = {
            major: 1,
            minor: 0,
            patch: 0,
        };
        const messages: string[] = [];
        const result = bumpVersion(currentVersion, messages);
        expect(result).toEqual(currentVersion);
    });
});

describe("getLatestVersionAsync", () => {
    it("should return the latest version from tags", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue([
            "v1.2.3",
            "v1.1.0",
        ]);
        const result = await getLatestVersionAsync();
        expect(result).toEqual({
            major: 1,
            minor: 2,
            patch: 3,
        });
    });

    it("should return null if no valid version tags are found", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue([
            "invalid-tag",
            "v1.2",
        ]);
        const result = await getLatestVersionAsync();
        expect(result).toBeNull();
    });
});

describe("calculateNewVersion", () => {
    it("should return INITIAL_VERSION if no version exists", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue([]);
        const result = await calculateNewVersion();
        expect(result).toEqual(INITIAL_VERSION);
    });

    it("should return the last version there is no new commits", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue(["v1.2.3"]);
        vi.spyOn(git, "getCommitHashAsync")
            .mockResolvedValueOnce("abc123")
            .mockResolvedValueOnce("abc123");
        const result = await calculateNewVersion();
        expect(result).toEqual({
            major: 1,
            minor: 2,
            patch: 3,
        });
    });

    it("should bump the version based on the commit message", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue(["v1.2.3"]);
        vi.spyOn(git, "getCommitHashAsync")
            .mockResolvedValueOnce("abc123")
            .mockResolvedValueOnce("def456");
        vi.spyOn(git, "getCommitMessageAsync").mockResolvedValue(
            ["Feature: Added new feature"],
        );
        const result = await calculateNewVersion();
        expect(result).toEqual({
            major: 1,
            minor: 3,
            patch: 0,
        });
    });
});
