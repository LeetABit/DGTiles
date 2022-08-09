//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { mergeStyles } from '../../styles/mergeStyles';

const baseStyle: CSSObject = {
    label: 'FlowContainer',
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

const calculateDirection = () => {
    return (window.innerWidth > window.innerHeight) ? rowStyle : columnStyle;
}

export default ({ children }: React.PropsWithChildren) => {
    const [direction, setDirection] = React.useState<CSSObject>(calculateDirection());
    const divRef = React.useRef<HTMLDivElement>(null);

    const style = useMemo(() => {
        return mergeStyles(baseStyle, direction);
    }, [window.innerWidth, window.innerHeight]);

    React.useEffect(() => {
        const handleResize = () => {
            setDirection(calculateDirection());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleWheelEvent = useCallback((e: WheelEvent) => {
        if (divRef.current) {
            divRef.current.scrollLeft += e.deltaY;
        }
    }, [divRef]);

    useEffect(() => {
        if (direction === columnStyle && divRef.current) {
            divRef.current.addEventListener('wheel', handleWheelEvent);
            return () => divRef.current?.removeEventListener('wheel', handleWheelEvent);
        }

        return undefined;
    }, [direction, handleWheelEvent]);

    return (
        <div ref={divRef} css={style}>
            {children}
        </div>
    );
};
