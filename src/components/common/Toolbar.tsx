//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { PropsWithChildren } from 'react';

const style: CSSObject = {
    label: 'Toolbar-Main',
    display: 'flex',
    flexDirection: 'row',
    minWidth: '50px',
};

export default ({ children }: PropsWithChildren) => (
    <div css={style} role="toolbar">
        {children}
    </div>
);
