//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as util from "util";
import { exec } from "child_process";
import { existsSync } from "fs";

export const execAsync = util.promisify(exec);

export const getCommandOutputAsync = async (command: string) => {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.split("\n").filter((file) => file);
};

export const getFileGitAttributesAsync = async (filePath: string) =>
    await getCommandOutputAsync(`git check-attr --all -- ${filePath}`);

export const getProjectRootAsync = async () =>
    (await getCommandOutputAsync("git rev-parse --show-toplevel"))[0];

export const getRepositoryFilesAsync = async () => {
    const rootPath = await getProjectRootAsync();
    return (
        await getCommandOutputAsync(
            `git ls-files --cached --others --exclude-standard ${rootPath}`,
        )
    ).filter((file) => existsSync(file));
};
