//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type Mock, afterEach, describe, expect, it, vi } from "vitest";
import type { Context } from "@actions/github/lib/context";
import { getLatestTagsAsync } from "#/scripts/common/git.js";
import type { getOctokit } from "@actions/github";
import pushLatestTags from "#/scripts/pushLatestTags.js";

type GitHub = ReturnType<typeof getOctokit>;
vi.mock("#/scripts/common/version.ts");
vi.mock("#/scripts/common/git.ts");

describe("createRemoteGitTag", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    const mockGithub = {
        rest: {
            git: {
                createRef: vi.fn(),
                getRef: vi.fn(),
            },
        },
    } as unknown as GitHub;

    const mockContext: Context = {
        repo: {
            owner: "test-owner",
            repo: "test-repo",
        },
        sha: "test-sha",
    } as Context;

    it("should create a new tag if it does not exist", async () => {
        (mockGithub.rest.git.getRef as unknown as Mock).mockRejectedValueOnce({
            status: 404,
        });
        (
            mockGithub.rest.git.createRef as unknown as Mock
        ).mockResolvedValueOnce({});
        vi.mocked(getLatestTagsAsync).mockResolvedValue(["v1.0.0"]);

        await pushLatestTags(mockGithub, mockContext);

        expect(mockGithub.rest.git.getRef).toHaveBeenCalledWith({
            owner: "test-owner",
            ref: "tags/v1.0.0",
            repo: "test-repo",
        });

        expect(mockGithub.rest.git.createRef).toHaveBeenCalledWith({
            owner: "test-owner",
            ref: "refs/tags/v1.0.0",
            repo: "test-repo",
            sha: "test-sha",
        });
    });

    it("should not create a tag if it already exists", async () => {
        (mockGithub.rest.git.getRef as unknown as Mock).mockResolvedValueOnce(
            {},
        );
        vi.mocked(getLatestTagsAsync).mockResolvedValue(["v1.0.0"]);

        await pushLatestTags(mockGithub, mockContext);

        expect(mockGithub.rest.git.getRef).toHaveBeenCalledWith({
            owner: "test-owner",
            ref: "tags/v1.0.0",
            repo: "test-repo",
        });

        expect(mockGithub.rest.git.createRef).not.toHaveBeenCalled();
    });

    it("should throw an error if getRef fails", async () => {
        const unexpectedError = new Error("Unexpected error");
        (mockGithub.rest.git.getRef as unknown as Mock).mockRejectedValueOnce(
            unexpectedError,
        );
        vi.mocked(getLatestTagsAsync).mockResolvedValue(["v1.0.0"]);

        await expect(pushLatestTags(mockGithub, mockContext)).rejects.toThrow(
            "Unexpected error",
        );

        expect(mockGithub.rest.git.getRef).toHaveBeenCalledWith({
            owner: "test-owner",
            ref: "tags/v1.0.0",
            repo: "test-repo",
        });
    });

    it("should throw an error if createRef fails", async () => {
        (mockGithub.rest.git.getRef as unknown as Mock).mockRejectedValueOnce({
            status: 404,
        });
        const createError = new Error("Failed to create ref");
        (
            mockGithub.rest.git.createRef as unknown as Mock
        ).mockRejectedValueOnce(createError);
        vi.mocked(getLatestTagsAsync).mockResolvedValue(["v1.0.0"]);

        await expect(pushLatestTags(mockGithub, mockContext)).rejects.toThrow(
            "Failed to create ref",
        );

        expect(mockGithub.rest.git.getRef).toHaveBeenCalledWith({
            owner: "test-owner",
            ref: "tags/v1.0.0",
            repo: "test-repo",
        });

        expect(mockGithub.rest.git.createRef).toHaveBeenCalledWith({
            owner: "test-owner",
            ref: "refs/tags/v1.0.0",
            repo: "test-repo",
            sha: "test-sha",
        });
    });
});
