//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren } from 'react';
import { CSSObject } from '@emotion/react';

declare interface DockProps {
    location: 'left' | 'right' | 'top' | 'bottom',
    content: React.ReactNode,
}

const verticalContainerStyle : CSSObject = {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
    overflowX: 'auto',
    overflowY: 'auto',
};

const horizontalContainerStyle : CSSObject = {
    display: 'flex',
    flexFlow: 'row',
    width: '100%',
    height: '100%',
};

const contentStyle : CSSObject = {
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: 'auto',
};

const childrenStyle : CSSObject = {
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
    overflowX: 'auto',
    overflowY: 'auto',
    flexDirection: 'column',
};

const Dock : React.FC<PropsWithChildren<DockProps>> = ({ location, content, children } : PropsWithChildren<DockProps>) => {
    const containerStyle = (location === 'left' || location === 'right')
        ? horizontalContainerStyle
        : verticalContainerStyle;

    const containerElement = (
        <div css={contentStyle} key="content">
            {React.Children.toArray(content)}
        </div>
    );

    const childrenElement = (
        <div css={childrenStyle} key="children">
            {React.Children.toArray(children)}
        </div>
    );

    return (
        <div css={containerStyle}>
            {(location === 'left' || location === 'top')
                ? [containerElement, childrenElement]
                : [childrenElement, containerElement]}
        </div>
    );
};

export default Dock;
