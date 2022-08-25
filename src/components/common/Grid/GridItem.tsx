//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useMemo } from 'react';
import GridArea from './GridArea';

interface Props {
    area: GridArea,
    cssLabelSuffix?: string,
}

export default ({ area: { rowStart, rowEnd, columnStart, columnEnd }, cssLabelSuffix, children }: React.PropsWithChildren<Props>) => {
    const style: CSSObject = useMemo(() => ({
        label: cssLabelSuffix ? `GridItem-${cssLabelSuffix}` : 'GridItem',
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
    }), [rowStart, rowEnd, columnStart, columnEnd, cssLabelSuffix]);

    return (
        <div css={style}>
            {children}
        </div>
    );
}
