//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement, useMemo } from "react";
import type { GridItemLocation } from "./GridItem.types.ts";
import StyleExtender from "../Container/Container.tsx";
import type { ContainerProps } from
    "../Container";
import { mergeStyles } from "#/src/styles/mergeStyles.ts";

interface Props extends StyleExtensionProps, GridItemLocation {
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
 * @param {number | string} props.rowStart The grid row where the item starts.
 * @param {number | string} props.rowEnd The grid row where the item ends.
 * @param {number | string} props.columnStart The grid column where the item starts.
 * @param {number | string} props.columnEnd The grid column where the item ends.
 * @param {ReactElement | undefined} [props.container = undefined] Element that
 * shall be used as a container for the item.
 * @param {ReactElement} [props.children] Children elements.
 * @returns {ReactElement} Grid component.
 */
export default function GridItem({
    rowStart,
    rowEnd,
    columnStart,
    columnEnd,
    fallbackContainer,
    extraStyle = {},
    extraProps,
    children,
}: React.PropsWithChildren<Props>): ReactElement {
    const css = useMemo(
        () =>
            mergeStyles(style, {
                gridColumnEnd: columnEnd,
                gridColumnStart: columnStart,
                gridRowEnd: rowEnd,
                gridRowStart: rowStart,
            }),
        [columnStart, columnEnd, rowStart, rowEnd, style],
    );

    return <StyleExtender container={container} style={css}>
        {children}
    </StyleExtender>;
}

export type GridItemProps = React.ComponentProps<typeof GridItem>;
