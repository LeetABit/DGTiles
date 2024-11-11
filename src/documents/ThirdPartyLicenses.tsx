//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useState } from 'react';
import thirdPartyLicenses from 'src/thirdPartyLicenses.g.json';
import Accordion from '../components/Accordion';
import MarkdownDocument from '../components/MarkdownDocument';

const documents: Record<string, string> = {};
thirdPartyLicenses.forEach(entry => {
    const documentLines: string[] = [];
    entry.licenses.forEach(license => {
        documentLines.push(`**Packages**: ${Object.entries(license.packages).map(([packageName, packageUrl]) => `[${packageName}](${packageUrl})`).join(', ')}`);
        documentLines.push('');
        documentLines.push(license.licenseText.split('\n').map(line => line.trim()).map(line => `    ${line}`).join('\n'));
        documentLines.push('');
    });

    documents[entry.packageOwner] = documentLines.join('\n');
});

export default function ThirdPartyLicenses() {
    const [expandedAccordion, setExpandedAccordion] = useState<string | undefined>(undefined);
    const onIsExpandedChangedHandler = useCallback((sourceId: string | undefined) => {
        setExpandedAccordion(expandedAccordion === sourceId ? undefined : sourceId);
    }, [expandedAccordion])

    return (
        <>
            {Object.entries(documents).map(([packageOwner, document]) => {
                return (
                    <Accordion
                        label={packageOwner}
                        isExpanded={packageOwner === expandedAccordion}
                        callbackSourceId={packageOwner}
                        onIsExpandedChanged={onIsExpandedChangedHandler}
                        key={packageOwner}
                    >
                        <MarkdownDocument content={document} />
                    </Accordion>
                );
            })}
        </>
    );
}
