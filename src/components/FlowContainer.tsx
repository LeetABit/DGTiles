//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { mergeStyles } from 'src/styles/mergeStyles';
import { cloneElementWithEmotion } from 'src/types';
import { ScreenOrientationContext } from '../contexts/ScreenOrientationContext';

type Direction = 'horizontal' | 'vertical'

interface Props {
    landscapeDirection?: Direction;
    container?: ReactElement,
}

const baseStyle: CSSObject = {
    width: '100%',
    height: '100%',
    position: 'absolute',
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

export default function FlowContainer({ landscapeDirection = 'horizontal', container = <div />, children }: React.PropsWithChildren<Props>) {
    const screenOrientation = useContext(ScreenOrientationContext);
    const directionStyle = (screenOrientation === 'Landscape') === (landscapeDirection === 'horizontal') ? rowStyle : columnStyle;
    const divRef = React.useRef<HTMLDivElement>(null);

    const css = useMemo(() => {
        return mergeStyles(baseStyle, directionStyle);
    }, [screenOrientation, landscapeDirection]);

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
    }, [directionStyle]);

    return cloneElementWithEmotion(container, { ref: divRef }, css, children);
}
