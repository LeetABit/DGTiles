//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import MarkdownDocument from '../components/MarkdownDocument';
import termsOfUse from '../../docs/TermsOfUse.md?raw';

export default function TermsOfUse() {
    return (
        <MarkdownDocument content={termsOfUse} />
    );
}
