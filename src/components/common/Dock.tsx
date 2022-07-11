//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren } from 'react';
import { CSSObject } from '@emotion/react';
import { Fill } from '../../styles/layout';
import { mergeStyles } from '../../styles/mergeStyles';

declare interface DockProps {
    location: 'left' | 'right' | 'top' | 'bottom',
    content: React.ReactNode,
}

const columnContainerStyle : CSSObject = mergeStyles(Fill, {
    display: 'flex',
    flexFlow: 'column',
});

const rowContainerStyle : CSSObject = mergeStyles(Fill, {
    display: 'flex',
    flexFlow: 'row',
});

const childrenStyle : CSSObject = {
    label: 'Dock-Fill',
    flexGrow: 1,
};

const Dock : React.FC<PropsWithChildren<DockProps>> = ({ location, content, children } : PropsWithChildren<DockProps>) => {
    const containerStyle = (location === 'left' || location === 'right')
        ? rowContainerStyle
        : columnContainerStyle;

    Object.assign(containerStyle, { label: `Dock-${location}` });

    const containerElement = (
        <div key="content">
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
