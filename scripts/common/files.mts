//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { createReadStream } from "fs";
import readline from "node:readline/promises";

export type LineEvaluator = (line: string, lineNumber: number) => boolean;

/**
 * Evaluates the content of a file line by line using the provided evaluator
 * function.
 * @param {string} filePath The path to the file to be evaluated.
 * @param {LineEvaluator} evaluator A function that takes a line and its number,
 * and throws when the line does not meet the criteria, returns true if next
 * line should be fetched and false when evaluation should stop.
 * @returns {Promise<boolean>} A promise that resolves to true if all lines meet
 * the criteria, false otherwise.
 */
export async function evaluateFileContentAsync(
    filePath: string,
    evaluator: LineEvaluator,
): Promise<boolean> {
    const stream = createReadStream(filePath);
    const readInterface = readline.createInterface(stream);
    let lineNumber = 0;
    let result = false;
    readInterface.on("line", (line) => {
        try {
            if (!evaluator(line, (lineNumber += 1))) {
                return;
            }
            result = true;
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
}
