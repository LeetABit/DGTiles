//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes } from 'react';
import TilesTokenSection from 'src/components/TilesTokenSection';

interface Props extends AriaAttributes {
    style?: CSSObject,
}

const titleStyle: CSSObject = {
    display: 'inline-block',
}

export default function Header({ style, ...ariaAttributes }: Props) {
    return (
        <header css={style} {...ariaAttributes}>
            <h1 css={titleStyle}>DGTiles</h1>
            <TilesTokenSection />
        </header>
    );
}
