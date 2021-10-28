#!/usr/bin/env node


const util = require('util');
const exec = require('child_process').exec;
const execAsync = util.promisify(exec);

async function executeCommandAsync(command) {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout.trimEnd();
}

module.exports = async function() {
    const versionTagRegexp = new RegExp(/^v(\d+)\.(\d+)\.(\d+)$/);
    const version = {
        major: 0,
        minor: 0,
        patch: 0,
        version: "0.0.0",
        sha: "",
        branch: "",
        commitCount: 0,
        isDirty: false,
        buildTime: "",
        buildSafeTime: "",
    };


    try {
        const tagName = await executeCommandAsync('git describe --tags --abbrev=0');
        const commitsString = await executeCommandAsync('git rev-list ' + tagName + '..HEAD');
        const commits = commitsString.trim().split('\n').map(line => line.trim()).filter(line => line);
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
        else if (messages.length) {
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
        try {
            await executeCommandAsync('git diff-index --quiet HEAD --');
        }
        catch {
            version.isDirty = true;
        }

        version.buildTime = dateTime.toISOString();
        version.buildSafeTime = `${year}${month}${day}-${hours}${minutes}${seconds}.${milliseconds}`;
    }
    catch (e) {
        console.error("Could not get version from git: " + e);
    }

    return version;
}