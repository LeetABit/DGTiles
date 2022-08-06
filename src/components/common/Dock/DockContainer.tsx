//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react'
import React from 'react'
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import { GridLines } from './GridLineBuilder';

interface Props {
    lines: GridLines,
}

export default ({ lines: { top, bottom, left, right }, children }: React.PropsWithChildren<Props>) => {
    const gridTemplateRows = `${top.join(' max-content ')} 1fr ${bottom.join(' max-content ')}`;
    const gridTemplateColumns = `${left.join(' max-content ')} 1fr ${right.join(' max-content ')}`;

    const style: CSSObject = mergeStyles(Fill, {
        display: 'grid',
        gridTemplateRows,
        gridTemplateColumns,
        label: 'Dock-Container',
    });

    return (
        <div css={style}>
            {children}
        </div>
    );
}
