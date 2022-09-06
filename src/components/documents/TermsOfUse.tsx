//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import raw from 'raw.macro';
import MarkdownDocument from '../common/MarkdownDocument';

const termsOfUse = raw('../../../docs/TermsOfUse.md');

export default function TermsOfUse() {
    return (
        <MarkdownDocument content={termsOfUse} />
    );
}
