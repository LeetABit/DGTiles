//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { mergeStyles } from 'src/styles/mergeStyles';
import CloseButton from '../CloseButton';

export type DialogMode = 'modal' | 'modeless' | 'absolute-modal';

interface Props {
    mode?: DialogMode,
    onClose: () => void,
    titleBarContent?: React.ReactNode,
}

const baseStyle: CSSObject = {
    label: 'Dialog',
    borderStyle: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '0px',
}

// TODO: This style is based on modal dialog in Chrome. All this shall
// be moved to theme and used here and for built-in modal dialog.
// Including pseudo property dialog::backdrop.
const contextualStyle: CSSObject = {
    top: '0px',
    bottom: '0px',
    maxWidth: 'calc((100% - 6px) - 2em)',
    maxHeight: 'calc((100% - 6px) - 2em)',
    boxShadow: '0 0 0 100vmax rgba(0, 0, 0, 0.1)',
};

const titleBarStyle: CSSObject = {
    display: 'flex',
    padding: '1em',
};

const titleContentStyle: CSSObject = {
    flexGrow: 1,
    textAlign: 'center',
};
const closeButtonStyle: CSSObject = {
};
const contentStyle: CSSObject = {
    flexGrow: 1,
    overflow: 'auto',
    padding: '0px 1em',
    marginBottom: '1em',
};

export default function Dialog({ mode = 'modal', onClose, children, titleBarContent }: React.PropsWithChildren<Props>) {
    const style = useMemo(() => {
        return mode === 'absolute-modal'
            ? mergeStyles(baseStyle, contextualStyle)
            : baseStyle;
    }, [mode]);

    const labelId = useMemo(() => {
        return uuid();
    }, []);

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
        <dialog ref={dialogRef} css={style} aria-modal={mode === 'modal'} aria-labelledby={labelId}>
            <div css={titleBarStyle}>
                <span id={labelId} css={titleContentStyle}>
                    {titleBarContent}
                </span>
                <span css={closeButtonStyle}>
                    <CloseButton onClick={onClose} />
                </span>
            </div>
            <div css={contentStyle}>
                {children}
            </div>
        </dialog>
    );
}
