//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import { ReactComponent as Wedge } from 'src/icons/Wedge.svg';
import { cloneElementWithEmotion } from 'src/types';

interface Props {
    container?: ReactElement,
    label: React.ReactNode,
    isExpanded?: boolean,
    callbackSourceId?: string,
    onIsExpandedChanged?: (sourceId: string | undefined) => void,
}

const containerStyle: CSSObject = {
    width: 'calc(100% - 1em)',
    display: 'inline-block',
    margin: '0.5em',
}

const buttonStyle: CSSObject = {
    cursor: 'pointer',
}

const contentStyle: CSSObject = {
    marginLeft: '2em',
}

const collapsedWedgeStyle: CSSObject = {
    width: '1em',
    height: '1em',
    verticalAlign: 'middle',
};

const expandedWedgeStyle: CSSObject = mergeStyles(collapsedWedgeStyle, {
    rotate: '90deg',
});

export default function Accordion({ container = <div />, label, isExpanded, callbackSourceId, onIsExpandedChanged, children }: React.PropsWithChildren<Props>) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isExpandedState, setIsExpandedState] = useState<boolean>(false);
    const effectiveIsExpanded = isExpanded ?? isExpandedState;

    const onClickHandler = useCallback(() => {
        if (onIsExpandedChanged) {
            onIsExpandedChanged(callbackSourceId);
        } else {
            setIsExpandedState(!isExpandedState)
        }
    }, [isExpandedState, callbackSourceId, onIsExpandedChanged]);

    const onKeyDownHandler = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter' || e.code === 'Enter') {
            e.preventDefault();
            onClickHandler();
        }
    }, [onClickHandler]);

    useEffect(() => {
        if (effectiveIsExpanded && containerRef.current) {
            containerRef.current.scrollIntoView({ block: 'nearest' });
        }
    }, [effectiveIsExpanded]);

    return useMemo(() => cloneElementWithEmotion(
        container,
        containerStyle,
        { ref: containerRef },
        <>
            <div role="button" tabIndex={0} onClick={onClickHandler} onKeyDown={onKeyDownHandler} css={buttonStyle}>
                <Wedge css={effectiveIsExpanded ? expandedWedgeStyle : collapsedWedgeStyle} />
                {label}
            </div>
            {effectiveIsExpanded
                ? (
                    <div css={contentStyle}>
                        {children}
                    </div>
                )
                : null}
        </>,
    ), [container, label, isExpanded, callbackSourceId, onIsExpandedChanged, children]);
}
