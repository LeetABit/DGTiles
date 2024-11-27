//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as util from "util";
import { createReadStream, existsSync } from "fs";
import { exec } from "child_process";
import { minimatch } from "minimatch";
import readline from "node:readline/promises";

export const execAsync = util.promisify(exec);

export const evaluateFileContentAsync = async (
    filePath: string,
    evaluator: (line: string, lineNumber: number) => boolean,
): Promise<boolean> => {
    const stream = createReadStream(filePath);
    const readInterface = readline.createInterface(stream);
    let lineNumber = 0;
    let result = true;
    readInterface.on("line", (line) => {
        try {
            if (evaluator(line, (lineNumber += 1))) {
                return;
            }
        } catch {
            result = false;
        }

        readInterface.close();
        readInterface.removeAllListeners();
    });

    await new Promise<void>((resolve) => {
        readInterface.on("close", resolve);
    });

    return result;
};

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

export const getRepositoryFilesAsync = async (pattern?: string) => {
    const rootPath = await getProjectRootAsync();
    return (
        await getCommandOutputAsync(
            `git ls-files --cached --others --exclude-standard ${rootPath}`,
        )
    ).filter((file) => existsSync(file) && minimatch(file, pattern ?? "*"));
};
