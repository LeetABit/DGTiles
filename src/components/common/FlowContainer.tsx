//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, useTheme } from '@emotion/react';
import React, { useMemo } from 'react';
import { Fill } from '../../styles/layout';
import { mergeStyles } from '../../styles/mergeStyles';

const baseStyle: CSSObject = {
    position: 'absolute',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px',
    rowGap: '10px',
    columnGap: '10px',
    alignContent: 'flex-start',
    boxSizing: 'border-box',
    label: 'FlowContainer-Main',
};

const rowStyle: CSSObject = {
    flexDirection: 'row',
}

const columnStyle: CSSObject = {
    flexDirection: 'column',
}

const calculateDirection = () => {
    return (window.innerWidth > window.innerHeight) ? rowStyle : columnStyle;
}

export default ({ children }: React.PropsWithChildren) => {
    const theme = useTheme();
    const mergedStyle = mergeStyles(Fill, baseStyle, { ...theme.workspace });
    const [direction, setDirection] = React.useState<CSSObject>(calculateDirection());

    const style = useMemo(() => {
        return mergeStyles(mergedStyle, direction);
    }, [window.innerWidth, window.innerHeight]);

    React.useEffect(() => {
        const handleResize = () => {
            setDirection(calculateDirection());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div css={style}>
            {children}
        </div>
    );
};
