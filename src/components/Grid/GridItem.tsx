//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { ReactElement, useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import { cloneElementWithEmotion } from 'src/types';
import { GridArea } from './types';

interface Props {
    area: GridArea,
    container?: ReactElement | null,
}

export default function GridItem({ area: { rowStart, rowEnd, columnStart, columnEnd }, container = <div id="GridItem" />, children }: React.PropsWithChildren<Props>) {
    const css: CSSObject = useMemo(
        () => mergeStyles(
            {
                gridRowStart: rowStart,
                gridRowEnd: rowEnd,
                gridColumnStart: columnStart,
                gridColumnEnd: columnEnd,
            },
        ),
        [rowStart, rowEnd, columnStart, columnEnd],
    );

    return useMemo(
        () => {
            if (container === null) {
                if (React.isValidElement(children)) {
                    return cloneElementWithEmotion(children, css);
                }

                return <div css={css}>{children}</div>
            }

            return cloneElementWithEmotion(container, css, undefined, children)
        },
        [container, rowStart, rowEnd, columnStart, columnEnd, children],
    );
}
