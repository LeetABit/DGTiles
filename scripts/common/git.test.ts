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
} from "./git";
import { describe, expect, test, vi } from "vitest";
import { execCommandAsync } from "./exec";
import { existsSync } from "fs";

vi.mock("./exec");
vi.mock("fs");

describe("getProjectRootAsync", () => {
    test("should return the root directory of the Git repository", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("/root/project");
        vi.mocked(existsSync).mockReturnValue(true);

        const result = await getProjectRootAsync();
        expect(result).toBe("/root/project");
    });

    test("should throw an error if the project root is missing", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("");
        vi.mocked(existsSync).mockReturnValue(false);

        await expect(getProjectRootAsync()).rejects.toThrow(
            "Could not find project root.",
        );
    });
});

describe("getFileGitAttributesAsync", () => {
    test("should return Git attributes for a file", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("attr1\nattr2");

        const result = await getFileGitAttributesAsync("file.txt");
        expect(result).toEqual(["attr1", "attr2"]);
    });
});

describe("getRepositoryFilesAsync", () => {
    test("should return files matching the pattern", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("file1.txt\nfile2.js");
        vi.mocked(existsSync).mockReturnValue(true);

        const result = await getRepositoryFilesAsync("*.txt");
        expect(result).toEqual(["file1.txt"]);
    });
});

describe("getCommitHashAsync", () => {
    test("should return the commit hash for a revision", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("abc123");

        const result = await getCommitHashAsync("HEAD");
        expect(result).toBe("abc123");
    });
});

describe("getLatestTagsAsync", () => {
    test("should return the latest tags matching the pattern", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("v1.0.0\nv1.1.0");

        const result = await getLatestTagsAsync("", "v*");
        expect(result).toEqual(["v1.0.0", "v1.1.0"]);
    });
});

describe("getCommitMessageAsync", () => {
    test("should return the commit message for a revision", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("Initial commit");

        const result = await getCommitMessageAsync("HEAD");
        expect(result).toEqual(["Initial commit"]);
    });
});

describe("getAllTagsWithDateAndMessagesAsync", () => {
    test(
        "should return all tags with creation date, messages and additional" +
            "lines",
        async () => {
            vi.mocked(execCommandAsync).mockResolvedValue(
                "v1.0.0 2023-01-01 Initial\n" +
                    "Unknown line\n" +
                    "v1.1.0 2023-02-01 Update",
            );

            const result = await getAllTagsWithDateAndMessagesAsync("v*");
            expect(result).toEqual([
                {
                    date: new Date("2023-01-01"),
                    messages: ["Initial", "Unknown line"],
                    name: "v1.0.0",
                },
                {
                    date: new Date("2023-02-01"),
                    messages: ["Update"],
                    name: "v1.1.0",
                },
            ]);
        },
    );

    test("should handle empty lines returned by git command", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue(
            "v1.0.0 2023-01-01 First\n\n\nv1.1.0 2023-02-01 Second\n",
        );

        const result = await getAllTagsWithDateAndMessagesAsync("v*");
        expect(result).toEqual([
            {
                date: new Date("2023-01-01"),
                messages: ["First"],
                name: "v1.0.0",
            },
            {
                date: new Date("2023-02-01"),
                messages: ["Second"],
                name: "v1.1.0",
            },
        ]);
    });
});

describe("createTagAsync", () => {
    test("should create a new Git tag for the current commit", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("");

        await expect(createTagAsync("v1.2.0")).resolves.not.toThrow();
        expect(execCommandAsync).toHaveBeenCalledWith(
            "git tag v1.2.0 --no-sign",
        );
    });

    test("should throw an error if the command fails", async () => {
        vi.mocked(execCommandAsync).mockRejectedValue(
            new Error("Command failed"),
        );

        await expect(createTagAsync("v1.2.0")).rejects.toThrow(
            "Command failed",
        );
    });
});

describe("doesTagExistAsync", () => {
    test("should return true if the tag exists", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("v1.0.0");

        const result = await doesTagExistAsync("v1.0.0");
        expect(result).toBe(true);
    });

    test("should return false if the tag does not exist", async () => {
        vi.mocked(execCommandAsync).mockResolvedValue("");

        const result = await doesTagExistAsync("v1.0.0");
        expect(result).toBe(false);
    });

    test("should throw an error if the command fails", async () => {
        vi.mocked(execCommandAsync).mockRejectedValue(
            new Error("Command failed"),
        );

        await expect(doesTagExistAsync("v1.0.0")).rejects.toThrow(
            "Command failed",
        );
    });
});
