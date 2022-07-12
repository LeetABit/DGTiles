//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

const style : CSSObject = {
    label: 'Dock-Right',
};

const DockRight : React.FC<PropsWithChildren<unknown>> = ({ children } : PropsWithChildren<unknown>) => (
    <div css={style}>{children}</div>
);

export default DockRight;
