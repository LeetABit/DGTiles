//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as checker from 'license-checker-rseidelsohn';
import * as util from 'util';
import { parse } from 'parse-package-name';
import { readFile } from 'fs/promises';

const checkerInitAsync = util.promisify(checker.init);

export default async function extractThirdPartyLicensesAsync() {
    const packages = await checkerInitAsync({
        start: '.',
        production: true,
        development: false,
        unknown: true,
    });

    type License = { licenseText: string, packages: Record<string, string> };
    type Package = { packageOwner: string, licenses: License[] };
    const result = [] as Package[];

    for (const [packageId, { licenseFile }] of Object.entries(packages)) {
        if (!licenseFile) {
            continue;
        }

        const licenseText = (await readFile(licenseFile)).toString().trim();
        const { name: packageFullName, version: packageVersion } = parse(packageId);
        const npmUrl = `https://www.npmjs.com/package/${packageFullName}/v/${packageVersion}`;
        const [packageOwner] = packageFullName.split('/');

        const ownerObject = result.find(owner => owner.packageOwner === packageOwner) ?? { packageOwner, licenses: [] } as Package;
        if (!result.includes(ownerObject)) {
            result.push(ownerObject);
        }

        const licenseObject = ownerObject.licenses.find(license => license.licenseText === licenseText) ?? { licenseText, packages: {} };
        if (!ownerObject.licenses.includes(licenseObject)) {
            ownerObject.licenses.push(licenseObject);
        }

        licenseObject.packages[packageId] = npmUrl;
    }

    const countPackages = (ownerObject) => {
        return ownerObject.licenses.reduce((sum, licenseObject) => sum + Object.keys(licenseObject.packages).length, 0);
    }

    return result.sort((leftOwner, rightOwner) => countPackages(rightOwner) - countPackages(leftOwner));
}
