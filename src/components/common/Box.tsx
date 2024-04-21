//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import useResizeObserver from 'src/hooks/useResizeObserver';
import { cloneElementWithEmotion } from 'src/utils/cloneElementWithEmotion';

interface Props {
    container?: ReactElement,
    titleBar?: React.ReactNode,
    buttons?: React.ReactNode,
    contentStyle?: CSSObject,
}

const baseStyle: CSSObject = {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    gridTemplateRows: 'max-content 1fr',
    gridTemplateAreas: "'title buttons' 'content content'",
}

const baseTitleStyle: CSSObject = {
    label: 'Box-Title',
    gridArea: 'title',
    textAlign: 'center',
};

const baseButtonStyle: CSSObject = {
    label: 'Box-CloseButton',
    gridArea: 'buttons',
};

const baseContentStyle: CSSObject = {
    label: 'Box-Content',
    gridArea: 'content',
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
            <div key="title" css={baseTitleStyle}>
                {titleBar}
            </div>,
            <div key="buttons" css={baseButtonStyle}>
                {buttons}
            </div>,
            // ISSUE #16: Remove tabIndex from scrollable div.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div key="content" css={contentCss} ref={contentRef} tabIndex={hasScrollbar ? 0 : undefined}>
                {children}
            </div>,
        ],
    );
}
