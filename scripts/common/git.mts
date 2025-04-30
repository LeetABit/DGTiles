//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { execCommandAsync } from "./exec.mts";
import { existsSync } from "fs";
import { minimatch } from "minimatch";

export interface TagInfo {
    name: string;
    date: Date;
    messages: string[];
}

/**
 * Gets the root directory of the current Git repository.
 * @returns {Promise<string>} The path to the root directory of the Git
 * repository.
 * @throws {Error} If the project root cannot be found.
 */
export async function getProjectRootAsync(): Promise<string> {
    const result = (await execCommandAsync("git rev-parse --show-toplevel"))
        .split("\n")
        .find((file) => existsSync(file));

    if (!(result ?? "")) {
        throw new Error("Could not find project root.");
    }

    if (result === undefined || result === "") {
        throw new Error("Could not find project root.");
    }

    return result;
}

/**
 * Gets the Git attributes for a specific file.
 * @param {string} filePath The path to the file.
 * @returns {Promise<string[]>} An array of Git attributes for the file.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function getFileGitAttributesAsync(
    filePath: string,
): Promise<string[]> {
    return (await execCommandAsync(`git check-attr --all -- ${filePath}`))
        .split("\n")
        .filter((pattern) => pattern);
}

/**
 * Gets the list of files in the Git repository that match the specified
 * pattern.
 * @param {string} [pattern="**"] The pattern to match the files against.
 * @param {string} [except] The pattern to exclude from the results.
 * @returns {Promise<string[]>} An array of file paths that match the pattern.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function getRepositoryFilesAsync(
    pattern?: string,
    except?: string,
): Promise<string[]> {
    const rootPath = await getProjectRootAsync();
    return (
        await execCommandAsync(
            `git ls-files --cached --others --exclude-standard ${rootPath}`,
        )
    )
        .split("\n")
        .filter(
            (file) =>
                file !== "" &&
                existsSync(file) &&
                minimatch(file, pattern ?? "**", { dot: true }) &&
                (except === undefined ||
                    except === "" ||
                    !minimatch(file, except, { dot: true })),
        );
}

/**
 * Gets the commit hash of the specified revision.
 * @param {string} [revision="HEAD"] The revision to get the commit hash for.
 * @returns {Promise<string>} The commit hash of the specified revision.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function getCommitHashAsync(revision = "HEAD"): Promise<string> {
    return execCommandAsync(`git rev-parse ${revision}`);
}

/**
 * Gets the latest tags in the repository.
 * @param {string} [revision=""] The revision to get the latest tags for.
 * @param {string} [pattern="*"] The pattern to match the tags against.
 * @returns {Promise<string[]>} An array of the latest tags.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function getLatestTagsAsync(
    revision: string | undefined = "",
    pattern = "*",
): Promise<string[]> {
    return (
        await execCommandAsync(
            `git describe --tags --match="${pattern}" --abbrev=0 ${revision}`,
        )
    )
        .split("\n")
        .filter((tag) => tag);
}

/**
 * Checks if a tag exists in the repository.
 * @param {string} tagName The name of the tag to check.
 * @returns {Promise<boolean>} True if the tag exists, false otherwise.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function doesTagExistAsync(tagName: string): Promise<boolean> {
    const tag = await execCommandAsync(`git tag -l ${tagName}`);

    return tag !== "";
}

/**
 * Creates a new Git tag for the current commit.
 * @param {string} tagName The name of the tag to create.
 * @returns {Promise<void>} A promise that resolves when the tag is created.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function createTagAsync(tagName: string): Promise<void> {
    await execCommandAsync(`git tag ${tagName} --no-sign`);
}

/**
 * Gets the commit message of the specified revision.
 * @param {string} [revision="HEAD"] The revision to get the commit message for.
 * @returns {Promise<string[]>} An array of the commit messages.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function getCommitMessageAsync(
    revision = "HEAD",
): Promise<string[]> {
    return (
        await execCommandAsync(`git show -s --format=%s ${revision}`)
    ).split("\n");
}

/**
 * Gets all tags in the repository with their creation date and messages.
 * @param {string} [tagPattern="*"] The pattern to match the tags against.
 * @returns {Promise<TagInfo[]>} An array of objects containing tag information.
 * @throws {Error} If the command fails or produces stderr.
 */
export async function getAllTagsWithDateAndMessagesAsync(
    tagPattern = "*",
): Promise<TagInfo[]> {
    const lines = await execCommandAsync(
        `git for-each-ref --format="%(refname:short) %(creatordate:short) ` +
            `%(contents:lines=9)" "refs/tags/${tagPattern}"`,
    );
    const regex =
        /^(?<version>v\d+\.\d+\.\d+) (?<date>\d+-\d+-\d+) (?<message>.*)$/u;
    const result: TagInfo[] = [];
    let tagName: string | undefined = undefined;
    let tagDate: Date | undefined = undefined;
    let messages: string[] = [];

    const pushNewInfo = () => {
        if (tagName !== undefined && tagDate !== undefined) {
            result.push({
                date: tagDate,
                messages,
                name: tagName,
            });
        }
    };

    for (const line of lines.split("\n")) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const match = regex.exec(line);

            if (
                match?.groups &&
                "date" in match.groups &&
                "version" in match.groups &&
                "message" in match.groups
            ) {
                pushNewInfo();
                tagName = match.groups["version"];
                tagDate = new Date(match.groups["date"]);
                messages = [match.groups["message"].trim()];
            } else {
                messages.push(line);
            }
        }
    }

    pushNewInfo();

    return result;
}
