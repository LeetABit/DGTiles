//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { exec } from "child_process";
import util from "util";

export async function execCommandAsync(command: string): Promise<string> {
    const execAsync = util.promisify(exec);
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
        throw new Error(stderr.trim());
    }

    return stdout.trim();
}
