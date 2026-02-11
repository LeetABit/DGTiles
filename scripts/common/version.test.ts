//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as git from "./git.ts";
import {
    INITIAL_VERSION,
    type VersionInfo,
    bumpVersion,
    calculateNewVersion,
    getLatestVersionAsync,
} from "./version.ts";
import { describe, expect, test, vi } from "vitest";

vi.mock("./git");

describe("bumpVersion", () => {
    test("should bump major version if a message starts with 'Breaking:'", () => {
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

    test("should bump minor version if a message starts with 'Feature:'", () => {
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

    test("should bump patch version if there are other messages", () => {
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

    test("should return the same version if there are no messages", () => {
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
    test("should return the latest version from tags", async () => {
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

    test("should return null if no valid version tags are found", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue([
            "invalid-tag",
            "v1.2",
        ]);
        const result = await getLatestVersionAsync();
        expect(result).toBeNull();
    });
});

describe("calculateNewVersion", () => {
    test("should return INITIAL_VERSION if no version exists", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue([]);
        const result = await calculateNewVersion();
        expect(result).toEqual(INITIAL_VERSION);
    });

    test("should return the last version there is no new commits", async () => {
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

    test("should bump the version based on the commit message", async () => {
        vi.spyOn(git, "getLatestTagsAsync").mockResolvedValue(["v1.2.3"]);
        vi.spyOn(git, "getCommitHashAsync")
            .mockResolvedValueOnce("abc123")
            .mockResolvedValueOnce("def456");
        vi.spyOn(git, "getCommitMessageAsync").mockResolvedValue([
            "Feature: Added new feature",
        ]);
        const result = await calculateNewVersion();
        expect(result).toEqual({
            major: 1,
            minor: 3,
            patch: 0,
        });
    });
});
