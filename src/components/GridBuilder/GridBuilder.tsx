//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement, useMemo, useState } from "react";
import type { CSSObject } from "@emotion/react";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";
import { mergeStyles } from "#/src/styles/mergeStyles.js";
import Grid from "../Grid/Grid";

interface Props {
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
export default function GridBuilder({
    container = <div />,
    style = {},
    children,
}: React.PropsWithChildren<Props>): ReactElement {

    const [rows, setRows] = useState(["1fr"]);
    const [columns, setColumns] = useState(["1fr"]);
    React.Children.toArray(children).map(child => {
        child.
    });

    return (
        <Grid container={container} style={style} rows={rows} columns={columns}>

        </Grid>
    );
}

export type GridProps = React.ComponentProps<typeof Grid>;
