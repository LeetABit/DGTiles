//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { Fill } from '../../styles/layout';
import { mergeStyles } from '../../styles/mergeStyles';
import { BackgroundColor, DimerColor } from '../../styles/themes';
import CloseButton from './CloseButton';
import FullscreenViewport from './FullscreenViewport';

interface PopupProps {
    onClose?: () => void,
}

const defaultProps : PopupProps = {
    onClose: undefined,
};

const flexStyle: CSSObject = mergeStyles(Fill, {
    label: 'Popup-Flex',
    display: 'flex',
});

const style: CSSObject = {
    label: 'Popup-Main',
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
    label: 'Popup-Header',
    textAlign: 'right',
}

const contentStyle: CSSObject = {
    label: 'Popup-Content',
    overflow: 'auto',
    margin: '0.5rem',
}

const Popup : React.FC<PropsWithChildren<PopupProps>> = ({ onClose, children } : PropsWithChildren<PopupProps>) => (
    <FullscreenViewport>
        <div css={flexStyle}>
            <div css={style}>
                <div css={headerStyle}>
                    <CloseButton onClick={onClose} shiftContentDown />
                </div>
                <div css={contentStyle}>
                    {children}
                </div>
            </div>
        </div>
    </FullscreenViewport>
);

Popup.defaultProps = defaultProps;

export default Popup;
