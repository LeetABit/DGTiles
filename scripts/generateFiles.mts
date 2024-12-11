//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { writeFile } from 'fs/promises';
import getTimestamp from './common/timestamp.mts'
import extractGitVersionAsync from './extractGitVersion.mts';
import extractThirdPartyLicensesAsync from './extractThirdPartyLicenses.mts';
import extractVersionHistoryAsync from './extractVersionHistory.mts';

const writeToFileAsync = async (fileName, object) => {
    return writeFile(`./public/${fileName}`, JSON.stringify(object, null, 2));
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
