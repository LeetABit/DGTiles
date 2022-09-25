#!/usr/bin/env node

import { writeFileAsync } from './common/files.mjs';
import getTimestamp from './common/timestamp.mjs'
import extractGitVersionAsync from './extractGitVersion.mjs';
import extractThirdPartyLicensesAsync from './extractThirdPartyLicenses.mjs';
import extractVersionHistoryAsync from './extractVersionHistory.mjs';

const writeToFileAsync = async (fileName, object) => {
    return writeFileAsync(`./src/${fileName}`, JSON.stringify(object, null, 2));
}

const timestamp = getTimestamp();
const [version, thirdPartyLicenses, versionHistory] = await Promise.all([
    extractGitVersionAsync(),
    extractThirdPartyLicensesAsync(),
    extractVersionHistoryAsync(),
]);

await Promise.all([
    writeToFileAsync('gitVersion.g.json', { ...version, ...timestamp }),
    writeToFileAsync('thirdPartyLicenses.g.json', thirdPartyLicenses),
    writeToFileAsync('versionHistory.g.json', versionHistory),
]);
