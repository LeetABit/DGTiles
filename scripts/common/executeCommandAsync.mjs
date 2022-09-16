#!/usr/bin/env node

import util from 'util';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

export default async function executeCommandAsync(command) {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.trim();
}
