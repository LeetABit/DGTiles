#!/usr/bin/env node


import * as util from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';


const execAsync = util.promisify(exec);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);


async function executeCommandAsync(command) {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.trimEnd();
}


const versionTagRegexp = new RegExp(/^v(\d+)\.(\d+)\.(\d+)$/);
const version = {
    major: 0,
    minor: 0,
    patch: 0,
    version: "0.0.0",
    sha: "",
    branch: "",
    commitCount: 0,
    buildTime: "",
    buildSafeTime: "",
};


try {
    const tagName = await executeCommandAsync('git describe --tags --abbrev=0');
    const commitsString = await executeCommandAsync('git rev-list ' + tagName + '..HEAD');
    const commits = commitsString.split('\n').map(line => line.trim());
    const messages = await Promise.all(commits.map(async (commit) => await executeCommandAsync('git show -s --format=%s ' + commit)));

    const versionTagMatch = tagName.match(versionTagRegexp);
    if (!versionTagMatch) {
        throw new Error("Could not extract version information from most recently applied tag: '" + tagName + "'.");
    }

    version.major = parseInt(versionTagMatch[1]);
    version.minor = parseInt(versionTagMatch[2]);
    version.patch = parseInt(versionTagMatch[3]);

    if (messages.some(m => m.startsWith("Breaking:"))) {
        version.major = version.major + 1;
        version.minor = 0;
        version.patch = 0;
    }
    else if (messages.some(m => m.startsWith("Feature:"))) {
        version.minor = version.minor + 1;
        version.patch = 0;
    }
    else {
        version.patch = version.patch + 1;
    }

    version.version = version.major + "." + version.minor + "." + version.patch;
    version.sha = await executeCommandAsync('git rev-parse HEAD');
    version.branch = await executeCommandAsync('git rev-parse --abbrev-ref HEAD');
    version.commitCount = commits.length;

    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = `${dateTime.getMonth() + 1}`.padStart(2, '0');
    const day =`${dateTime.getDate()}`.padStart(2, '0');
    const hours =`${dateTime.getHours()}`.padStart(2, '0');
    const minutes =`${dateTime.getMinutes()}`.padStart(2, '0');
    const seconds =`${dateTime.getSeconds()}`.padStart(2, '0');
    const milliseconds =`${dateTime.getMilliseconds()}`.padStart(2, '0');

    version.buildTime = dateTime.toISOString();
    version.buildSafeTime = `${year}${month}${day}-${hours}${minutes}${seconds}.${milliseconds}`;
}
catch (e) {
    console.error("Could not get version from git: " + e);
}

const path = fs.existsSync('./src') ? `./src/gitVersion.json` : `./gitVersion.json`
writeFileAsync(path, JSON.stringify(version, null, 2));
