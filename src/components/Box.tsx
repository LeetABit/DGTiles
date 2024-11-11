//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import useResizeObserver from 'src/hooks/useResizeObserver';
import { cloneElementWithEmotion } from 'src/types';

interface Props {
    container?: ReactElement,
    titleBar?: React.ReactNode,
    buttons?: React.ReactNode,
    contentStyle?: CSSObject,
}

const baseStyle: CSSObject = {
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
    const contentRef = useRef<HTMLDivElement>(null);
    const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

    const callback = useCallback((_entry: ResizeObserverEntry, element: HTMLDivElement | null) => {
        setHasScrollbar(element ? element.scrollHeight > element.offsetHeight : false);
    }, [setHasScrollbar]);

    useResizeObserver(contentRef, callback);

    const contentCss = useMemo(() => mergeStyles(baseContentStyle, contentStyle), [contentStyle]);

    return cloneElementWithEmotion(
        container,
        undefined,
        baseStyle,
        [
            <div key="title" css={titleStyle}>
                {titleBar}
            </div>,
            <div key="buttons" css={closeButtonStyle}>
                {buttons}
            </div>,
            // TODO: https://chromestatus.com/feature/5231964663578624
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div key="content" css={contentCss} ref={contentRef} tabIndex={hasScrollbar ? 0 : undefined}>
                {children}
            </div>,
        ],
    );
}
