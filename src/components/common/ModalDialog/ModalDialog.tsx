//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import CloseButton from '../CloseButton';
import FullscreenViewport from '../FullscreenViewport';

interface Props {
    onClose: () => void,
}

const style: CSSObject = {
    label: 'ModalDialog',
    borderWidth: '0px',
    boxSizing: 'border-box',
}

export default ({ onClose, children }: React.PropsWithChildren<Props>) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const closeOnEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
            e.stopImmediatePropagation();
        }
    };

    const addListener = () => {
        window.addEventListener('keydown', closeOnEscapeKey);
        dialogRef.current?.showModal();
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
        <FullscreenViewport>
            <dialog ref={dialogRef} css={style} aria-modal="true" aria-labelledby="h1">
                <CloseButton onClick={onClose} />
                {children}
            </dialog>
        </FullscreenViewport>
    );
};
