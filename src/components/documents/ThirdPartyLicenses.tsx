//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import thirdPartyLicenses from 'src/thirdPartyLicenses.g.json';
import MarkdownDocument from '../common/MarkdownDocument';

const documentLines: string[] = [];
thirdPartyLicenses.forEach(entry => {
    documentLines.push(`# ${entry.packageOwner}`);
    documentLines.push('');
    entry.licenses.forEach(license => {
        documentLines.push(`**Packages**: ${Object.entries(license.packages).map(([packageName, packageUrl]) => `[${packageName}](${packageUrl})`).join(', ')}`);
        documentLines.push('');
        documentLines.push(license.licenseText.split('\n').map(line => line.trim()).map(line => `    ${line}`).join('\n'));
        documentLines.push('');
    });
});

const documentContent = documentLines.join('\n');

export default function ThirdPartyLicenses() {
    return (
        <MarkdownDocument content={documentContent} />
    );
}
