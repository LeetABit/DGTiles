//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useMemo } from 'react';
import { mergeStyles } from '../../../styles/mergeStyles';
import CloseButton from '../CloseButton';

export type DialogMode = 'modal' | 'modeless' | 'absolute-modal';

interface Props {
    mode?: DialogMode,
    onClose: () => void,
    labeledBy?: string,
}

const baseStyle: CSSObject = {
    label: 'ModalDialog',
    borderStyle: 'none',
    boxSizing: 'border-box',
}

const buttonStyle: CSSObject = {
    float: 'right',
};

// TODO: This style is based on modal dialog in Chrome. All this shall
// be moved to theme and used here for built-in modal dialog.
// Including pseudo property dialog::backdrop.
const contextualStyle: CSSObject = {
    top: '0px',
    bottom: '0px',
    maxWidth: 'calc((100% - 6px) - 2em)',
    maxHeight: 'calc((100% - 6px) - 2em)',
    boxShadow: '0 0 0 100vmax rgba(0, 0, 0, 0.1)',
};

export default function Dialog({ mode = 'modal', onClose, labeledBy, children }: React.PropsWithChildren<Props>) {
    const style = useMemo(() => {
        return mode === 'absolute-modal'
            ? mergeStyles(baseStyle, contextualStyle)
            : baseStyle;
    }, [mode]);

    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const closeOnEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
            e.stopImmediatePropagation();
        }
    };

    const addListener = () => {
        window.addEventListener('keydown', closeOnEscapeKey);
        if (mode === 'modal') {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.show();
        }
    };

    const removeListener = () => {
        dialogRef.current?.close();
        window.removeEventListener('keydown', closeOnEscapeKey);
    };

    React.useEffect(() => {
        addListener();
        return removeListener;
    }, []);

    return (
        <dialog ref={dialogRef} css={style} aria-modal={mode === 'modal'} aria-labelledby={labeledBy}>
            <span css={buttonStyle}>
                <CloseButton onClick={onClose} />
            </span>
            {children}
        </dialog>
    );
}
