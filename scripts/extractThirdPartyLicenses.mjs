#!/usr/bin/env node

import checker from 'license-checker';
import * as util from 'util';
import { parse } from 'parse-package-name';
import { readFileAsync } from './common/files.mjs';

const checkerInitAsync = util.promisify(checker.init);

export default async function extractThirdPartyLicensesAsync() {
    const packages = await checkerInitAsync({
        start: '.',
        production: true,
        development: false,
        unknown: true,
    });

    const result = [];

    for (const [packageId, { licenseFile }] of Object.entries(packages)) {
        const licenseText = (await readFileAsync(licenseFile)).toString().trim();
        const { name: packageFullName, version: packageVersion } = parse(packageId);
        const npmUrl = `https://www.npmjs.com/package/${packageFullName}/v/${packageVersion}`;
        const [packageOwner] = packageFullName.split('/');

        const ownerObject = result.find(owner => owner.packageOwner === packageOwner) ?? { packageOwner, licenses: [] };
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
