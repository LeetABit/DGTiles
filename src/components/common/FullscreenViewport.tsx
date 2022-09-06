//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { CSSObject } from '@emotion/react';

const style : CSSObject = {
    label: 'FullscreenViewport',
    wordBreak: 'break-all',
    position: 'absolute',
    width: '100%',
    height: '100%',
};

export default function FullscreenViewport({ children }: React.PropsWithChildren) {
    return (
        <div css={style}>
            {children}
        </div>
    );
}
