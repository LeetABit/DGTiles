//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement, useMemo } from "react";
import type { CSSObject } from "@emotion/react";
import type { GridTemplates } from "./Grid.types.ts";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";
import { mergeStyles } from "#/src/styles/mergeStyles.js";

interface Props {
    templates: GridTemplates;
    container?: ReactElement;
}

const baseStyle: CSSObject = {
    display: "grid",
};

/**
 * React component that facilitates CSS grid layout.
 * @param {React.PropsWithChildren<Props>} props Component properties.
 * @param {GridTemplates} props.templates Grid rows and columns templates.
 * @param {ReactElement | null} [props.container = <div />] Element that shall
 * be used as a container for the item.
 * @param {ReactElement} [props.children] Children elements.
 * @returns {ReactElement} Grid component.
 */
export default function Grid({
    templates: { rows, columns },
    container = <div />,
    children,
}: React.PropsWithChildren<Props>): ReactElement {
    const css = useMemo(
        () =>
            mergeStyles(baseStyle, {
                gridTemplateColumns: columns,
                gridTemplateRows: rows,
            }),
        [rows, columns],
    );

    return useMemo(
        () => cloneElementWithEmotion(container, css, undefined, children),
        [container, rows, columns, children],
    );
}

export type GridProps = React.ComponentProps<typeof Grid>;
