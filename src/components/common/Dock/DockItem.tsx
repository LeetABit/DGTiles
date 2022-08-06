//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react'
import React from 'react'
import { GridDockPosition } from './GridLineBuilder'

interface Props extends GridDockPosition {
}

export default ({ top, bottom, left, right, dock, children }: React.PropsWithChildren<Props>) => {
    const style: CSSObject = {
        gridRowStart: top,
        gridRowEnd: bottom,
        gridColumnStart: left,
        gridColumnEnd: right,
        label: `Dock-${dock[0].toUpperCase()}${dock.slice(1)}`,
    }

    return (
        <div css={style}>
            {children}
        </div>
    );
}
