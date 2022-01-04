//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren } from 'react';
import { CSSObject, Global } from '@emotion/react';

const style : CSSObject = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflowWrap: 'anywhere',
    flexDirection: 'column',
    display: 'flex',
};

const globalStyle : CSSObject = {
    body: {
        margin: '0px',
    },
};

const Viewport : React.FC<PropsWithChildren<{}>> = ({ children } : PropsWithChildren<{}>) => (
    <div css={style}>
        <Global styles={globalStyle} />
        {React.Children.toArray(children)}
    </div>
);

export default Viewport;
