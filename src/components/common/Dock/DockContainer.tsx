//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react'
import React from 'react'
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';

export interface DockContainerProps {
    topLines: string[],
    bottomLines: string[],
    leftLines: string[],
    rightLines: string[],
}

export default ({ topLines, bottomLines, leftLines, rightLines, children }: React.PropsWithChildren<DockContainerProps>) => {
    const gridTemplateRows = `${topLines.join(' max-content ')} 1fr ${bottomLines.join(' max-content ')}`;
    const gridTemplateColumns = `${leftLines.join(' max-content ')} 1fr ${rightLines.join(' max-content ')}`;

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
