//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import TilesTokenInput from '../../specialized/TilesTokenInput';

const titleStyle: CSSObject = {
    display: 'inline-block',
}

export default function Header() {
    return (
        <header>
            <h1 css={titleStyle}>DGTiles</h1>
            <TilesTokenInput />
        </header>
    );
}
