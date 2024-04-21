#!/usr/bin/env node

import util from 'util';
import { exec, execSync } from 'child_process';

const execAsync = util.promisify(exec);

export async function executeCommandAsync(command) {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.trim();
}

export function executeCommand(command) {
    return execSync(command).toString();
}
