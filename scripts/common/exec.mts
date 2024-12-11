//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import util from 'util';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

export default async function execCommandAsync(command: string): Promise<string> {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout;
}
