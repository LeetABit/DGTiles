//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import { mergeStyles } from '../../styles/mergeStyles';

export type ToolbarDirection = 'row' | 'column';

interface Props {
    direction?: ToolbarDirection
}

const baseStyle: CSSObject = {
    label: 'Toolbar-Main',
    display: 'flex',
};

const rowStyle: CSSObject = {
    flexDirection: 'row',
};

const columnStyle: CSSObject = {
    flexDirection: 'column',
};

export default ({ direction = 'row', children }: React.PropsWithChildren<Props>) => {
    const directionStyle = direction === 'row' ? rowStyle : columnStyle;
    const style = mergeStyles(baseStyle, directionStyle);

    return (
        <div css={style} role="toolbar">
            {children}
        </div>
    );
}
