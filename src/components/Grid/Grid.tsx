//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement, useMemo } from "react";
import type { CSSObject } from "@emotion/react";
import type { GridTemplates } from "./Grid.types.ts";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";
import { mergeStyles } from "#/src/styles/mergeStyles.js";

interface Props extends GridTemplates{
    container?: ReactElement;
    style?: CSSObject;
}

const baseStyle: CSSObject = {
    display: "grid",
};

/**
 * React component that facilitates CSS grid layout.
 * @param {React.PropsWithChildren<Props>} props Component properties.
 * @param {string} props.rows The grid template for rows.
 * @param {string} props.columns The grid template for columns.
 * @param {ReactElement | null} [props.container = <div />] Element that shall
 * be used as a container for the item.
 * @param {ReactElement} [props.children] Children elements.
 * @returns {ReactElement} Grid component.
 */
export default function Grid({
    rows,
    columns,
    container = <div />,
    style = {},
    children,
}: React.PropsWithChildren<Props>): ReactElement {
    const css = useMemo(
        () =>
            mergeStyles(baseStyle, style, {
                gridTemplateColumns: columns.join(" "),
                gridTemplateRows: rows.join(" "),
            }),
        [rows, columns, style],
    );

    return useMemo(
        () => cloneElementWithEmotion(container, css, undefined, children),
        [container, css, children],
    );
}

export type GridProps = React.ComponentProps<typeof Grid>;
