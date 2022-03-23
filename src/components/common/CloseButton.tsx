//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import { DiagonalCross } from '../../styles/icons';
import { mergeStyles } from '../../styles/mergeStyles';
import { MainColor } from '../../styles/themes';

interface CloseButtonProps {
    shiftContentDown?: boolean,
    onClick?: () => void,
}

const defaultProps : Partial<CloseButtonProps> = {
    shiftContentDown: false,
    onClick: () => {},
};

const style : CSSObject = mergeStyles(DiagonalCross, {
    label: 'CloseButton-Main',
    width: '1rem',
    height: '1rem',
    margin: '0.5rem',
    '&:before, &:after': {
        background: MainColor,
    },
});

const CloseButton : React.FC<CloseButtonProps> = ({ onClick, shiftContentDown } : CloseButtonProps) => {
    const additionalStyle: CSSObject = (shiftContentDown)
        ? { position: 'relative' }
        : { position: 'absolute', right: '0px' };

    const mergedStyle = mergeStyles(style, additionalStyle);
    return <button type="button" css={mergedStyle} onClick={onClick} aria-label="close" />;
}

CloseButton.defaultProps = defaultProps;

export default CloseButton;
