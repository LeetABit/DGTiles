//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

const style: CSSObject = {
    label: 'Toolbar-Main',
    display: 'flex',
    flexDirection: 'row',
};

const Toolbar : React.FC<PropsWithChildren<unknown>> = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <div css={style} role="toolbar">
            {children}
        </div>
    );
}

export default Toolbar;
