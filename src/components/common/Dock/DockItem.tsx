//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { mergeStyles } from '../../../styles/mergeStyles';
import useThrottledState from '../../../hooks/useThrottledState';

declare type DockDirection = 'Top' | 'Bottom' | 'Left' | 'Right';

export interface DockProps {
    autoHide?: boolean,
    showTimeout?: number,
    hideTimeout?: number,
}

declare type DockItemProps = DockProps & { direction: DockDirection }

export default ({ direction, autoHide = false, showTimeout = 100, hideTimeout = 100, children }: PropsWithChildren<DockItemProps>) => {
    const baseStyle : CSSObject = {
        label: `Dock-${direction}`,
    };

    const calculateTimeout = (isCurrentlyHidden: boolean) => (isCurrentlyHidden ? showTimeout : hideTimeout);
    const [isHidden, setIsHidden] = useThrottledState(autoHide, calculateTimeout);

    let style = baseStyle;
    if (autoHide && isHidden) {
        if (direction === 'Top' || direction === 'Bottom') {
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

    return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} css={style}>{children}</div>;
};
