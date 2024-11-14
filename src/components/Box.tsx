//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { ReactElement, useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import { cloneElementWithEmotion } from 'src/types';
import Container from './Container';
import VerticalScrollbar from './VerticalScrollbar';

interface Props {
    container?: ReactElement,
    titleBar?: React.ReactNode,
    buttons?: React.ReactNode,
    contentStyle?: CSSObject,
}

const containerStyle: CSSObject = {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateRows: '[row-line-0] max-content [row-line-1] 1fr [row-line-2]',
    gridTemplateColumns: '[column-line-0] 1fr [column-line-1] max-content [column-line-2]',
}

const titleStyle: CSSObject = {
    label: 'BoxTitle',
    gridRowStart: 'row-line-0',
    gridRowEnd: 'row-line-1',
    gridColumnStart: 'column-line-0',
    gridColumnEnd: 'column-line-1',
    textAlign: 'center',
};

const closeButtonStyle: CSSObject = {
    label: 'BoxCloseButton',
    gridRowStart: 'row-line-0',
    gridRowEnd: 'row-line-1',
    gridColumnStart: 'column-line-1',
    gridColumnEnd: 'column-line-2',
};

const baseContentStyle: CSSObject = {
    label: 'BoxContent',
    gridRowStart: 'row-line-1',
    gridRowEnd: 'row-line-2',
    gridColumnStart: 'column-line-0',
    gridColumnEnd: 'column-line-2',
};

export default function Box({ container = <div />, titleBar, buttons, contentStyle, children }: React.PropsWithChildren<Props>) {
    const contentCss = useMemo(() => mergeStyles(baseContentStyle, contentStyle), [contentStyle]);

    return useMemo(() => cloneElementWithEmotion(
        container,
        containerStyle,
        undefined,
        <>
            <Container key="title" style={titleStyle} container={<div />}>
                {titleBar}
            </Container>
            <Container key="buttons" style={closeButtonStyle} container={<div />}>
                {buttons}
            </Container>
            <VerticalScrollbar style={contentCss}>
                {children}
            </VerticalScrollbar>
        </>,
    ), [container, titleBar, buttons, contentStyle, children]);
}
