//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import MarkdownDocument from '../common/MarkdownDocument';
import versionHistory from '../../versionHistory.json';

const documentLines: string[] = [];
versionHistory.forEach(entry => {
    documentLines.push(`# ${entry.version} - ${entry.date}`);
    documentLines.push('');
    entry.messages.forEach(message => {
        documentLines.push(`- ${message}`);
    });
});

const documentContent = documentLines.join('\n');

export default function VersionHistory() {
    return (
        <MarkdownDocument content={documentContent} />
    );
}
