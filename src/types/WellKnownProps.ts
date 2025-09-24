//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { AriaAttributes, PropsWithChildren, ReactElement, ReactNode } from "react";
import type { CSSObject } from "@emotion/react";

export interface WellKnownProps {
    [key: string]: unknown;
    children?: ReactNode;
    css?: CSSObject;
    style?: CSSObject;
    __EMOTION_TYPE_PLEASE_DO_NOT_USE__?: React.ElementType;
}

export type WellKnownElement =
    ReactElement<WellKnownProps | undefined | null>
    & { type: React.ElementType }

export const isWellKnownProps = (props: unknown):
    props is WellKnownProps =>
    props === undefined ||
    props === null ||
    (
        typeof props === "object" &&
        !Array.isArray(props)
    );

export const isWellKnownElement = (element: unknown):
    element is WellKnownElement =>
    element !== undefined &&
    element !== null &&
    typeof element === "object" &&
    'type' in element &&
    (
        !('props' in element) ||
        isWellKnownProps(element.props)
    );

export const isTagElement = (element: unknown):
    element is WellKnownElement =>
    isWellKnownElement(element) &&
    (
        element.props?.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ !== undefined ||
        typeof element.type === "string"
    );

export const getPropByName = (element: WellKnownElement, propKeyName: string): unknown => {
    if (element.props && propKeyName in element.props) {
        return element.props[propKeyName];
    }

    return undefined;
}

export type PropsWithAria<P = unknown> = P & AriaAttributes;

export type PropsWithAriaChildren<P = unknown> = PropsWithChildren<P> & AriaAttributes;
