//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react'
import React from 'react'
import { DockDirection } from './types'

export interface DockItemProps {
    columnStart: string,
    columnEnd: string,
    rowStart: string,
    rowEnd: string,
    dock: DockDirection,
}

export default ({ columnStart, columnEnd, rowStart, rowEnd, dock, children }: React.PropsWithChildren<DockItemProps>) => {
    const style: CSSObject = {
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        label: `Dock-${dock}`,
    }

    return (
        <div css={style}>
            {children}
        </div>
    );
}
