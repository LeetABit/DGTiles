//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement, type ReactNode } from "react";
import type { CSSObject } from "@emotion/react";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion";

/**
 * Interface for the props of the `Container` component.
 * @template T The type of the HTML element that the container will render as.
 */
export interface ContainerProps<T extends HTMLElement = HTMLElement> {
    /**
     * Additional props to be applied to the container element.
     */
    extraProps?: object;

    /**
     * Style object that contains the CSS properties to be applied to the
     * container element.
     */
    extraAttributes?: React.HTMLAttributes<T>;

    /**
     * Style object that contains the CSS properties to be applied to the
     * container element.
     */
    extraStyle?: CSSObject;

    /**
     * The fallback element to be used as a container for the item when the
     * `children` prop is not a valid React element.
     */
    fallbackContainer?: ReactElement | T;

    /**
     * Children elements to be rendered inside the container.
     */
    children?: ReactNode;
}

/**
 * React component that extends the styles of a HTML element or a specified
 * container element.
 * @template T The type of the HTML element that the container will render as.
 * @description When the `container` prop is not provided, the component will
 * check if the `children` prop is a valid React element. If it is, it will
 * clone that element and apply the CSS styles to it. If `children` is not a
 * valid React element, it will create a new `div` element with the provided CSS
 * styles and render the `children` inside it. This allows for more flexibility
 * in how the component can be used, as it can either wrap an existing element
 * or create a new one based on the provided `children`.
 * @param {ContainerProps} props Component properties.
 * @param {object | undefined} [props.extraProps] Additional props to be applied
 * to the container element.
 * @param {React.HTMLAttributes<T> | undefined} [props.extraAttributes]
 * Additional HTML attributes to be applied to the container element.
 * @param {CSSObject | undefined} [props.extraStyle] Style object that contains
 * the CSS properties to be applied to the container element.
 * @param {ReactNode} [props.children] Children elements.
 * @param {ReactElement | undefined} [props.fallbackContainer = undefined]
 * Element that shall be used as a fallback container for the item when the
 * children prop is not a valid React element.
 * @returns {ReactElement} Extender component.
 */
export default function Container<T extends HTMLElement = HTMLElement>({
    extraProps,
    extraAttributes,
    extraStyle,
    fallbackContainer,
    children,
}: ContainerProps<T>): ReactElement {
    if (fallbackContainer === undefined) {
        if (React.isValidElement(children)) {
            return cloneElementWithEmotion(children, extraStyle, {
                ...extraProps,
                ...extraAttributes,
            });
        }

        return <div css={extraStyle} {...extraProps} {...extraAttributes}>{children}</div>;
    }

    return cloneElementWithEmotion(fallbackContainer, extraStyle, {
        ...extraProps,
        ...extraAttributes,
    }, children);
}
