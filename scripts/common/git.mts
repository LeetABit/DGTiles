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

export async function getProjectRootAsync(): Promise<string> {
    const result = (await execCommandAsync("git rev-parse --show-toplevel"))
        .split("\n")
        .find((file) => existsSync(file));

    if (!(result ?? '')) {
        throw new Error("Could not find project root.");
    }

    if (result === undefined || result === '') {
        throw new Error("Could not find project root.");
    }

    return result;
}

export async function getFileGitAttributesAsync(
    filePath: string,
): Promise<string[]> {
    return (await execCommandAsync(`git check-attr --all -- ${filePath}`))
        .split("\n")
        .filter((pattern) => pattern);
}

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
            (file) => file !== '' && existsSync(file)
                && minimatch(file, pattern ?? "**")
                && (
                    except === undefined
                    || except === ''
                    || !minimatch(file, except)
                ),
        );
}

export async function getCommitHashAsync(revision = "HEAD"): Promise<string> {
    return execCommandAsync(`git rev-parse ${revision}`);
}

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

export async function doesTagExistAsync(tagName: string): Promise<boolean> {
    const tag = await execCommandAsync(`git tag -l ${tagName}`);

    return tag !== "";
}

export async function createTagAsync(tagName: string): Promise<void> {
    await execCommandAsync(`git tag ${tagName} --no-sign`);
}

export async function getCommitMessageAsync(
    revision = "HEAD",
): Promise<string[]> {
    return (
        await execCommandAsync(`git show -s --format=%s ${revision}`)
    ).split("\n");
}

export async function getAllTagsWithDateAndMessagesAsync(
    tagPattern = "*",
): Promise<TagInfo[]> {
    const lines = await execCommandAsync(
        `git for-each-ref --format="%(refname:short) %(creatordate:short) `
        + `%(contents:lines=9)" "refs/tags/${tagPattern}"`,
    );
    const regex
        = /^(?<version>v\d+\.\d+\.\d+) (?<date>\d+-\d+-\d+) (?<message>.*)$/u;
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
            const match = regex.exec(
                line,
            );

            if (match?.groups
                && 'date' in match.groups
                && 'version' in match.groups
                && 'message' in match.groups
            ) {
                pushNewInfo();
                tagName = match.groups['version'];
                tagDate = new Date(match.groups['date']);
                messages = [match.groups['message'].trim()];
            } else {
                messages.push(line);
            }
        }
    }

    pushNewInfo();

    return result;
}
