#!/usr/bin/env node

import * as fs from 'fs';
import { writeFileAsync } from './common/files.mjs';
import getTimestamp from './common/timestamp.mjs'
import extractGitVersionAsync from './extractGitVersion.mjs';
import extractThirdPartyLicensesAsync from './extractThirdPartyLicenses.mjs';
import extractVersionHistoryAsync from './extractVersionHistory.mjs';

const basePath = fs.existsSync('./src') ? './src/' : './';

const writeToFileAsync = async (fileName, object) => {
    return writeFileAsync(`${basePath}${fileName}`, JSON.stringify(object, null, 2));
}

const timestamp = getTimestamp();
const [version, thirdPartyLicenses, versionHistory] = await Promise.all([
    extractGitVersionAsync(),
    extractThirdPartyLicensesAsync(),
    extractVersionHistoryAsync(),
]);

await Promise.all([
    writeToFileAsync('gitVersion.json', { ...version, ...timestamp }),
    writeToFileAsync('thirdPartyLicenses.json', thirdPartyLicenses),
    writeToFileAsync('versionHistory.json', versionHistory),
]);
