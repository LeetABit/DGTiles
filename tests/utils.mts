//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as util from 'util';
import { exec } from 'child_process';
import * as fs from 'fs/promises';

export const readFileAsync = util.promisify(fs.readFile);

export const execAsync = util.promisify(exec);

export const getRepositoryFilesAsync = async () => {
    const { stdout, stderr } = await execAsync('git ls-files --others --exclude-standard');
    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.split('\n').filter(file => file);
};
