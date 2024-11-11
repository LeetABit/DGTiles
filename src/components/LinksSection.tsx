//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import TermsOfUseLink from './TermsOfUseLink';
import ThirdPartyLicensesLink from './ThirdPartyLicensesLink';
import VersionHistoryLink from './VersionHistoryLink';

const style: CSSObject = {
    display: 'inline-block',
    margin: '0.5em',
}

export default function LinksSection() {
    return (
        <>
            <span css={style}>
                <TermsOfUseLink />
                <br />
                <VersionHistoryLink />
            </span>
            <span css={style}>
                <ThirdPartyLicensesLink />
                <br />
                <a target="_blank" rel="noreferrer noopener" href="https://github.com/LeetABit/DGTiles">GitHub</a>
            </span>
        </>
    );
}
