//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as util from "util";
import { exec } from "child_process";
import * as fs from "fs/promises";

export const readFileAsync = util.promisify(fs.readFile);

export const execAsync = util.promisify(exec);

export const getRepositoryFilesAsync = async () => {
    const rootPath = await getProjectRootAsync();
    return await getCommandOutputAsync(
        `git ls-files --cached --others --exclude-standard ${rootPath}`,
    );
};

export const getFileGitAttributesAsync = async (filePath: string) => {
    return await getCommandOutputAsync(`git check-attr --all -- ${filePath}`);
};

export const getProjectRootAsync = async () => {
    return await getCommandOutputAsync("git rev-parse --show-toplevel");
};

export const getCommandOutputAsync = async (command: string) => {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.split("\n").filter((file) => file);
};
