//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useMemo } from 'react';
import { mergeStyles } from '../../styles/mergeStyles';

export type ToolbarDirection = 'row' | 'column';

interface Props {
    direction?: ToolbarDirection
}

const baseStyle: CSSObject = {
    label: 'Toolbar',
    display: 'flex',
};

const rowStyle: CSSObject = {
    flexDirection: 'row',
};

const columnStyle: CSSObject = {
    flexDirection: 'column',
};

export default function Toolbar({ direction = 'row', children }: React.PropsWithChildren<Props>) {
    const style = useMemo(() => {
        const directionStyle = direction === 'row' ? rowStyle : columnStyle;
        return mergeStyles(baseStyle, directionStyle);
    }, [direction]);

    return (
        <div css={style} role="toolbar">
            {children}
        </div>
    );
}
