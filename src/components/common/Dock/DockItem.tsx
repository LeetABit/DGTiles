//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react'
import { PropsWithChildren } from 'react'
import useThrottledState from '../../../hooks/useThrottledState'
import { mergeStyles } from '../../../styles/mergeStyles'
import { DockDirection } from './types'

export interface DockItemProps {
    columnStart: string,
    columnEnd: string,
    rowStart: string,
    rowEnd: string,
    dock: DockDirection,
    showDelay?: number,
    hideDelay?: number,
}

export default ({ columnStart, columnEnd, rowStart, rowEnd, dock, showDelay, hideDelay, children }: PropsWithChildren<DockItemProps>) => {
    const baseStyle: CSSObject = {
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        label: `Dock-${dock}`,
    }

    const autoHide = showDelay !== undefined || hideDelay !== undefined;
    const showDelayWithDefault = showDelay ?? 0;
    const hideDelayWithDefault = hideDelay ?? 0;

    const calculateTimeout = (isCurrentlyHidden: boolean) => (isCurrentlyHidden ? showDelayWithDefault : hideDelayWithDefault);
    const [isHidden, setIsHidden] = useThrottledState(autoHide, calculateTimeout);

    let style = baseStyle;
    if (autoHide && isHidden) {
        if (dock === 'Top' || dock === 'Bottom') {
            style = mergeStyles(baseStyle, { height: '10px' });
        } else {
            style = mergeStyles(baseStyle, { width: '10px' });
        }
    }

    const onMouseEnter = () => {
        setIsHidden(false);
    };

    const onMouseLeave = () => {
        setIsHidden(true);
    };

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} css={style}>
            {children}
        </div>
    );
}
