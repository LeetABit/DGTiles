//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ReactElement, useMemo } from 'react';
import { CSSObject } from '@emotion/react';
import { cloneElementWithEmotion } from 'src/types';
import TermsOfUseLink from './TermsOfUseLink';
import ThirdPartyLicensesLink from './ThirdPartyLicensesLink';
import VersionHistoryLink from './VersionHistoryLink';

interface Props {
    container?: ReactElement,
    style?: CSSObject,
}

const spanStyle: CSSObject = {
    display: 'inline-block',
    margin: '0.5em',
}

export default function LinksSection({ container = <div /> }: Props) {
    return useMemo(() => cloneElementWithEmotion(
        container,
        undefined,
        undefined,
        <>
            <span css={spanStyle}>
                <TermsOfUseLink />
                <br />
                <VersionHistoryLink />
            </span>
            <span css={spanStyle}>
                <ThirdPartyLicensesLink />
                <br />
                <a target="_blank" rel="noreferrer noopener" href="https://github.com/LeetABit/DGTiles">GitHub</a>
            </span>
        </>,
    ), [container]);
}
