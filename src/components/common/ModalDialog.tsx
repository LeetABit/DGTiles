//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import FocusTrap from 'focus-trap-react';
import React from 'react';
import { Fill } from '../../styles/layout';
import { mergeStyles } from '../../styles/mergeStyles';
import { BackgroundColor, DimerColor } from '../../styles/themes';
import CloseButton from './CloseButton';
import FullscreenViewport from './FullscreenViewport';

export interface ModalDialogProps {
    onClose?: () => void,
}

const flexStyle: CSSObject = mergeStyles(Fill, {
    label: 'ModalDialog-Flex',
    display: 'flex',
});

const style: CSSObject = {
    position: 'static',
    borderWidth: '0px',
    label: 'ModalDialog-Main',
    maxWidth: 'calc(100% - 4rem)',
    maxHeight: 'calc(100% - 4rem)',
    margin: 'auto',
    padding: '0.5rem',
    boxSizing: 'border-box',
    boxShadow: `0 0 0 100vmax ${DimerColor}`,
    backgroundColor: BackgroundColor,
    display: 'flex',
    flexDirection: 'column',
}

const headerStyle: CSSObject = {
    label: 'ModalDialog-Header',
    textAlign: 'right',
}

const contentStyle: CSSObject = {
    label: 'ModalDialog-Content',
    overflow: 'auto',
    margin: '0.5rem',
}

export default ({ onClose, children }: React.PropsWithChildren<ModalDialogProps>) => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
            e.stopImmediatePropagation();
        }
    };

    const addListener = () => {
        window.addEventListener('keydown', closeOnEscapeKey);
    };

    const removeListener = () => {
        window.removeEventListener('keydown', closeOnEscapeKey);
    };

    React.useEffect(() => {
        addListener();
        return removeListener;
    }, []);

    return (
        <FullscreenViewport>
            <div css={flexStyle}>
                <FocusTrap>
                    <dialog css={style} aria-modal="true" aria-labelledby="h1">
                        <div css={headerStyle}>
                            <CloseButton onClick={onClose} shiftContentDown />
                        </div>
                        <div css={contentStyle}>
                            {children}
                        </div>
                    </dialog>
                </FocusTrap>
            </div>
        </FullscreenViewport>
    );
};
