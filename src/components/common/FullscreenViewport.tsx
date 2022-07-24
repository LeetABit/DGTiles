//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { PropsWithChildren } from 'react';
import { CSSObject } from '@emotion/react';
import { Fill, FullScreen } from '../../styles/layout';
import { mergeStyles } from '../../styles/mergeStyles';

const style : CSSObject = mergeStyles(FullScreen, {
    label: 'FullscreenViewport-Main',
    overflow: 'auto',
});

const fitContentStyle: CSSObject = mergeStyles(Fill, {
    label: 'FullscreenViewport-FitContent',
    minWidth: 'fit-content',
    minHeight: 'fit-content',
});

export default ({ children }: PropsWithChildren) => (
    <div css={style}>
        <div css={fitContentStyle}>
            {children}
        </div>
    </div>
);
