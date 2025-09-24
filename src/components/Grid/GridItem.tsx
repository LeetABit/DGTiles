//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement } from "react";
import type { CSSObject } from "@emotion/react";
import type { GridItemLocation } from "./GridItem.types.ts";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";

interface Props {
    location: GridItemLocation;
    container?: ReactElement;
}

/**
 * React component that represents an item in a CSS grid layout.
 * @description When the `container` prop is not provided, the component will
 * check if the `children` prop is a valid React element. If it is, it will
 * clone that element and apply the CSS styles to it. If `children` is not a
 * valid React element, it will create a new `div` element with the provided CSS
 * styles and render the `children` inside it. This allows for more flexibility
 * in how the component can be used, as it can either wrap an existing element
 * or create a new one based on the provided `children`.
 * @param {React.PropsWithChildren<Props>} props Component properties.
 * @param {GridItemLocation} props.location Grid location which shall be
 * occupied by the item.
 * @param {ReactElement | undefined} [props.container = null] Element that shall
 * be used as a container for the item.
 * @param {ReactElement} [props.children] Children elements.
 * @returns {ReactElement} Grid component.
 */
export default function GridItem({
    location: { rowStart, rowEnd, columnStart, columnEnd },
    container = undefined,
    children,
}: React.PropsWithChildren<Props>): ReactElement {
    const css: CSSObject = {
        gridColumnEnd: columnEnd,
        gridColumnStart: columnStart,
        gridRowEnd: rowEnd,
        gridRowStart: rowStart,
    };

    if (container === undefined) {
        if (React.isValidElement(children)) {
            return cloneElementWithEmotion(children, css);
        }

        return <div css={css}>{children}</div>;
    }

    return cloneElementWithEmotion(container, css, undefined, children);
}

export type GridItemProps = React.ComponentProps<typeof GridItem>;
