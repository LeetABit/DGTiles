//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, jsx } from '@emotion/react';
import { DOMElement, HTMLAttributes, JSXElementConstructor, LegacyRef, ReactElement, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';

// type Identity<T> = T & Identifier;

// interface OptionalIdentifier {
//     id?: string
// }

// interface Identifier extends OptionalIdentifier {
//     id: string
// }

export interface Entity<T> {
    id: string,
    entity: T,
}

export function identify<T extends {}>(obj: T, id: string = uuid()): Entity<T> {
    return { id, entity: obj };
}

// function cloneWithIdentity<T extends {}>(obj: T, id: string = uuid()): Identity<T> {
//     return { ...obj, id };
// }

// function stripIdentity<T extends OptionalIdentifier>(obj: T): T {
//     const result = { ...obj };
//     delete result.id;
//     return result;
// }

function containsRef(element: ReactElement): element is DOMElement<HTMLAttributes<HTMLElement>, HTMLElement> {
    return 'ref' in element;
}

function extractRef(element: ReactElement): LegacyRef<HTMLElement> | undefined {
    return containsRef(element) ? element.ref : undefined;
}

function extractType(element: ReactElement): string | JSXElementConstructor<unknown> {
    return element.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
        ? element.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
        : element.type;
}

export function cloneElementWithEmotion(element: ReactElement, props?: {}, css?: CSSObject, children?: ReactNode) {
    const elementRef = extractRef(element);
    const elementProps = { ...element.props, key: element.key, ref: elementRef };
    const { children: extractedChildren, css: extractedCss, ...extractedProps } = elementProps;
    const mergedCss = { ...extractedCss, ...css };
    const mergedProps = { ...extractedProps, ...props, css: mergedCss };

    return jsx(
        extractType(element),
        mergedProps,
        [extractedChildren, children],
    );
}
