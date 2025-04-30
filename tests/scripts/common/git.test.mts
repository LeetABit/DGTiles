//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import {
    createTagAsync,
    doesTagExistAsync,
    getAllTagsWithDateAndMessagesAsync,
    getCommitHashAsync,
    getCommitMessageAsync,
    getFileGitAttributesAsync,
    getLatestTagsAsync,
    getProjectRootAsync,
    getRepositoryFilesAsync,
} from "#/scripts/common/git.mts";
import { describe, expect, it, vi } from "vitest";
import { execCommandAsync } from "#/scripts/common/exec.mts";
import { existsSync } from "fs";

vi.mock("#/scripts/common/exec.mts");
vi.mock("fs");

describe("getProjectRootAsync", () => {
    it("should return the root directory of the Git repository", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("/root/project");
        vi.mocked(existsSync).mockReturnValue(true);

        const result = await getProjectRootAsync();
        expect(result).toBe("/root/project");
    });

    it("should throw an error if the project root is missing", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("");
        vi.mocked(existsSync).mockReturnValue(false);

        await expect(getProjectRootAsync()).rejects.toThrow(
            "Could not find project root.",
        );
    });
});

describe("getFileGitAttributesAsync", () => {
    it("should return Git attributes for a file", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("attr1\nattr2");

        const result = await getFileGitAttributesAsync("file.txt");
        expect(result).toEqual(["attr1", "attr2"]);
    });
});

describe("getRepositoryFilesAsync", () => {
    it("should return files matching the pattern", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("file1.txt\nfile2.js");
        vi.mocked(existsSync).mockReturnValue(true);

        const result = await getRepositoryFilesAsync("*.txt");
        expect(result).toEqual(["file1.txt"]);
    });
});

describe("getCommitHashAsync", () => {
    it("should return the commit hash for a revision", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("abc123");

        const result = await getCommitHashAsync("HEAD");
        expect(result).toBe("abc123");
    });
});

describe("getLatestTagsAsync", () => {
    it("should return the latest tags matching the pattern", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("v1.0.0\nv1.1.0");

        const result = await getLatestTagsAsync("", "v*");
        expect(result).toEqual(["v1.0.0", "v1.1.0"]);
    });
});

describe("getCommitMessageAsync", () => {
    it("should return the commit message for a revision", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("Initial commit");

        const result = await getCommitMessageAsync("HEAD");
        expect(result).toEqual(["Initial commit"]);
    });
});

describe("getAllTagsWithDateAndMessagesAsync", () => {
    it("should return all tags with creation date and messages", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue(
            "v1.0.0 2023-01-01 Initial\nv1.1.0 2023-02-01 Update",
        );

        const result = await getAllTagsWithDateAndMessagesAsync("v*");
        expect(result).toEqual([
            {
                date: new Date("2023-01-01"),
                messages: ["Initial"],
                name: "v1.0.0",
            },
            {
                date: new Date("2023-02-01"),
                messages: ["Update"],
                name: "v1.1.0",
            },
        ]);
    });
});

describe("createTagAsync", () => {
    it("should create a new Git tag for the current commit", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("");

        await expect(createTagAsync("v1.2.0")).resolves.not.toThrow();
        expect(execCommandAsync).toHaveBeenCalledWith(
            "git tag v1.2.0 --no-sign",
        );
    });

    it("should throw an error if the command fails", async () => {
        vi.mocked(execCommandAsync).mockRejectedValue(
            new Error("Command failed"),
        );

        await expect(createTagAsync("v1.2.0")).rejects.toThrow(
            "Command failed",
        );
    });
});

describe("doesTagExistAsync", () => {
    it("should return true if the tag exists", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("v1.0.0");

        const result = await doesTagExistAsync("v1.0.0");
        expect(result).toBe(true);
    });

    it("should return false if the tag does not exist", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("");

        const result = await doesTagExistAsync("v1.0.0");
        expect(result).toBe(false);
    });

    it("should throw an error if the command fails", async () => {
        vi.mocked(execCommandAsync).mockRejectedValue(
            new Error("Command failed"),
        );

        await expect(doesTagExistAsync("v1.0.0")).rejects.toThrow(
            "Command failed",
        );
    });
});
