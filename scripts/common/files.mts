//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { createReadStream } from "fs";
import readline from "node:readline/promises";

export type LineEvaluator = (line: string, lineNumber: number) => boolean;

export async function evaluateFileContentAsync(
    filePath: string,
    evaluator: LineEvaluator,
): Promise<boolean> {
    const stream = createReadStream(filePath);
    const readInterface = readline.createInterface(stream);
    let lineNumber = 0;
    let result = true;
    readInterface.on("line", (line) => {
        try {
            if (evaluator(line, lineNumber += 1)) {
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
}
