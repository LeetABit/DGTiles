//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, useTheme } from "@emotion/react";
import type { ReactElement } from "react";
import { useMemo } from "react";
import { mergeStyles } from "@/styles/mergeStyles.ts";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";
import { PropsWithAria } from "../types/WellKnownProps";

interface Props {
    container?: ReactElement;
    style?: CSSObject;
}

//const style: CSSObject = {
    // Label: 'Workspace',
    // Position: 'relative',
    // Width: '100%',
    // Height: '100%',
    // Overflow: 'auto',
//};

/**
 * @param root0
 * @param root0.container
 */
export default function Workspace({ container = <main />, style }: Props) {
    // const theme = useTheme();
    // const mergedStyle = useMemo(
    //     () => mergeStyles({ ...theme.workspace } /* , style*/),
    //     [theme.workspace],
    // );

    // return useMemo(
    //     () =>
    //         cloneElementWithEmotion(container, mergedStyle, undefined, <div />),
    //     [container, theme.workspace],
    // );

    return <div css={style} />;
}
