//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { ReactElement, useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import { cloneElementWithEmotion } from 'src/types';
import { GridTemplates } from './types';

interface Props {
    templates: GridTemplates,
    container?: ReactElement,
}

const baseStyle: CSSObject = {
    width: '100%',
    height: '100%',
    display: 'grid',
}

export default function Grid({ templates: { rows, columns }, container = <div />, children }: React.PropsWithChildren<Props>) {
    const css = useMemo(
        () => mergeStyles(
            baseStyle,
            {
                gridTemplateRows: rows,
                gridTemplateColumns: columns,
            },
        ),
        [rows, columns],
    );

    return useMemo(() => cloneElementWithEmotion(container, css, undefined, children), [container, rows, columns, children]);
}
