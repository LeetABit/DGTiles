//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { mergeStyles } from '../../styles/mergeStyles';
import { ScreenOrientationContext } from './ScreenOrientationProvider';

type Direction = 'horizontal' | 'vertical'

interface Props {
    direction?: Direction;
}

const baseStyle: CSSObject = {
    label: 'FlowContainer',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px',
    rowGap: '10px',
    columnGap: '10px',
    alignContent: 'flex-start',
    boxSizing: 'border-box',
    overflow: 'auto',
};

const rowStyle: CSSObject = {
    flexDirection: 'row',
}

const columnStyle: CSSObject = {
    flexDirection: 'column',
}

export default function FlowContainer({ direction = 'horizontal', children }: React.PropsWithChildren<Props>) {
    const screenOrientation = useContext(ScreenOrientationContext);
    const directionStyle = (screenOrientation === 'Landscape') === (direction === 'horizontal') ? rowStyle : columnStyle;
    const divRef = React.useRef<HTMLDivElement>(null);

    const style = useMemo(() => {
        return mergeStyles(baseStyle, directionStyle);
    }, [screenOrientation, direction]);

    const handleWheelEvent = useCallback((e: WheelEvent) => {
        if (divRef.current) {
            divRef.current.scrollLeft += e.deltaY;
        }
    }, []);

    useEffect(() => {
        if (directionStyle === columnStyle && divRef.current) {
            divRef.current.addEventListener('wheel', handleWheelEvent);
            return () => divRef.current?.removeEventListener('wheel', handleWheelEvent);
        }

        return undefined;
    }, [directionStyle, handleWheelEvent]);

    return (
        <div ref={divRef} css={style}>
            {children}
        </div>
    );
}
