//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { AriaAttributes, useCallback, useId, useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import CloseButton from '../CloseButton';
import { DialogMode } from './types';
import Box from '../Box';
import VerticalScrollbar from '../VerticalScrollbar';

interface Props extends AriaAttributes{
    mode?: DialogMode,
    titleBar?: React.ReactNode,
    style?: CSSObject,
    onClose: () => void,
}

const dialogStyle: CSSObject = {
    borderStyle: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '0px',
}

const gridStyle: CSSObject = {
    display: 'grid',
    gridTemplateRows: '[row-line-0] max-content [row-line-1] 1fr [row-line-2]',
    gridTemplateColumns: '[column-line-0] 1fr [column-line-1] max-content [column-line-2]',
}

const modalDialogStyle: CSSObject = {
    top: '0px',
    bottom: '0px',
    maxWidth: 'calc((100% - 6px) - 2em)',
    maxHeight: 'calc((100% - 6px) - 2em)',
}

const absoluteModalDialogStyle: CSSObject = {
    boxShadow: '0 0 0 100vmax rgba(0, 0, 0, 0.1)',
}

const contentStyle: CSSObject = {
    overflow: 'auto',
};

const absoluteModalStyle = mergeStyles(dialogStyle, modalDialogStyle, gridStyle, absoluteModalDialogStyle);
const otherStyle = mergeStyles(dialogStyle, modalDialogStyle, gridStyle);

export default function Dialog({ mode = 'modal', titleBar, style, onClose, children, ...ariaAttributes }: React.PropsWithChildren<Props>) {
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    const dialogLabelId = useId();

    const css = useMemo(() => mergeStyles((mode === 'absolute-modal' ? absoluteModalStyle : otherStyle), style), [mode, style]);
    const closeOnEscapeKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && onClose) {
            event.stopImmediatePropagation();
            onClose();
        }
    }, [onClose]);

    React.useEffect(() => {
        window.addEventListener('keydown', closeOnEscapeKey);
        if (mode === 'modal') {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.show();
        }

        return () => {
            dialogRef.current?.close();
            window.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [closeOnEscapeKey]);

    const container = <dialog ref={dialogRef} id={dialogLabelId} css={css} aria-modal={mode === 'modal'} {...ariaAttributes} />;

    return (
        <Box container={container} titleBar={titleBar} buttons={<CloseButton onClick={onClose} />} contentStyle={contentStyle}>
            <VerticalScrollbar>
                {children}
            </VerticalScrollbar>
        </Box>
    );
}
