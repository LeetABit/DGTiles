//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, jsx } from '@emotion/react';
import { AriaAttributes, DOMElement, HTMLAttributes, LegacyRef, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';

export interface Entity<T> {
    id: string,
    entity: T,
}

export function identify<T extends {}>(obj: T, id: string = uuid()): Entity<T> {
    return { id, entity: obj };
}

function containsRef(element: ReactElement): element is DOMElement<HTMLAttributes<HTMLElement>, HTMLElement> {
    return 'ref' in element;
}

function extractRef(element: ReactElement): LegacyRef<HTMLElement> | undefined {
    return containsRef(element) ? element.ref : undefined;
}

export function cloneElementWithEmotion(element: ReactElement, css?: CSSObject, props?: {}, children?: ReactNode): ReactElement {
    const elementRef = extractRef(element);
    const elementProps = { ...element.props, key: element.key, ref: elementRef };
    const { children: extractedChildren, css: extractedCss, style: extractedStyle, ...extractedProps } = elementProps;
    const mergedCss = { ...extractedCss, ...extractedStyle, ...css };
    const mergedChildrenArray = [extractedChildren, children].flat().filter((child) => child !== undefined && child !== null && child !== false);
    const mergedChildren = mergedChildrenArray.length === 1
        ? mergedChildrenArray[0]
        : mergedChildrenArray.length === 0
            ? null
            : mergedChildrenArray;

    if (element.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__) {
        const mergedProps = { ...extractedProps, ...props, css: mergedCss };
        return jsx(
            element.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
            mergedProps,
            mergedChildren,
        );
    }

    const mergedProps = { ...extractedProps, ...props, style: mergedCss };
    return jsx(
        element.type,
        mergedProps,
        mergedChildren,
    );
}

export type PropsWithAria<P = unknown> = P & AriaAttributes;
export type PropsWithAriaChildren<P = unknown> = PropsWithChildren<P> & AriaAttributes;
