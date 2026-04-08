//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type CSSObject, jsx } from "@emotion/react";
import { type ReactElement, type ReactNode, type ElementType, type JSXElementConstructor, cloneElement } from "react";
import { isWellKnownElement } from "@/types/WellKnownProps.ts";

export const cloneElementWithEmotion = <
    P = unknown,
    T extends string | JSXElementConstructor<P> = string | JSXElementConstructor<P>>(
    element: ReactElement<P, T>,
    css?: CSSObject,
    props?: P,
    children?: ReactNode,
): ReactElement<P,T> => {
    if (!isWellKnownElement(element)) {
        throw new Error(
            "The element does not have an object props." +
            " Please check the element type.",
        );
    }

    const {
        children: extractedChildren,
        css: extractedCss,
        style: extractedStyle,
        '__EMOTION_TYPE_PLEASE_DO_NOT_USE__': emotionType,
        ...extractedProps
    } = element.props ?? {};

    const mergedCss = { ...extractedCss, ...extractedStyle, ...css };
    const mergedChildrenArray = [extractedChildren, children]
        .flat()
        .filter(
            (child) => child !== undefined && child !== null && child !== false,
        );
    const mergedChildren =
        mergedChildrenArray.length === 1
            ? mergedChildrenArray[0]
            : mergedChildrenArray.length === 0
              ? null
              : mergedChildrenArray;

    const mergedProps =
        (typeof element.type === "string" || emotionType !== undefined)
            ? { ...extractedProps, ...props, css: mergedCss }
            : { ...extractedProps, ...props, style: mergedCss };

    const elementType = emotionType ?? element.type;

    cloneElement

    return jsx<P, T>(elementType, mergedProps, mergedChildren);
}
