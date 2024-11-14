//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';
import useResizeObserver from 'src/hooks/useResizeObserver';
import { cloneElementWithEmotion } from 'src/types';
import Container from './Container';

interface Props {
    style?: CSSObject,
}

export default function VerticalScrollbar({ style, children }: PropsWithChildren<Props>) {
    const contentRef = useRef<HTMLElement>(null);
    const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

    const callback = useCallback((_entry: ResizeObserverEntry, element: HTMLElement | null) => {
        setHasScrollbar(element ? element.scrollHeight > element.offsetHeight : false);
    }, [setHasScrollbar]);

    useResizeObserver(contentRef, callback);

    const container = (
        <Container container={<div />}>
            {children}
        </Container>
    );

    return useMemo(() => cloneElementWithEmotion(
        container,
        style,
        { ref: contentRef, tabIndex: hasScrollbar ? 0 : undefined },
    ), [children, style, contentRef, hasScrollbar]);
}
