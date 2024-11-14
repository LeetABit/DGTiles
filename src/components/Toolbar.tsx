//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { ReactElement, useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import { cloneElementWithEmotion } from 'src/types';

export type ToolbarDirection = 'row' | 'column';

interface Props {
    direction?: ToolbarDirection,
    container?: ReactElement,
}

const baseStyle: CSSObject = {
    display: 'flex',
};

const rowStyle: CSSObject = {
    flexDirection: 'row',
};

const columnStyle: CSSObject = {
    flexDirection: 'column',
};

export default function Toolbar({ direction = 'row', container = <div />, children }: React.PropsWithChildren<Props>) {
    const mergedStyle = useMemo(() => mergeStyles(baseStyle, (direction === 'row' ? rowStyle : columnStyle)), [direction]);
    return useMemo(() => cloneElementWithEmotion(container, mergedStyle, undefined, children), [container, direction, children]);
}
