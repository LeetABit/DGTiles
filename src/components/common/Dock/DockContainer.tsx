//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import type { Property } from 'csstype';
import React, { PropsWithChildren } from 'react';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';

export type Direction = 'Left' | 'Right' | 'Top' | 'Bottom';

const mapping = {
    Left: 'row' as Property.FlexDirection,
    Right: 'row-reverse' as Property.FlexDirection,
    Top: 'column' as Property.FlexDirection,
    Bottom: 'column-reverse' as Property.FlexDirection,
}

const style : CSSObject = mergeStyles(Fill, {
    label: 'Dock-Container',
    display: 'flex',
});

declare interface DockContainerProps {
    direction: Direction,
}

const DockContainer : React.FC<PropsWithChildren<DockContainerProps>> = ({ direction, children } : PropsWithChildren<DockContainerProps>) => {
    const flexDirection = mapping[direction];

    const directionStyle = mergeStyles(style, {
        flexDirection,
    });

    return (
        <div css={directionStyle}>
            {React.Children.toArray(children)}
        </div>
    );
};

export default DockContainer;
