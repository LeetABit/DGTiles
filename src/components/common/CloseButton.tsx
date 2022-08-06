//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { DiagonalCross } from '../../styles/icons';
import { mergeStyles } from '../../styles/mergeStyles';
import { MainColor } from '../../styles/themes';

interface Props {
    shiftContentDown?: boolean,
    onClick: () => void,
}

const style : CSSObject = mergeStyles(DiagonalCross, {
    label: 'CloseButton-Main',
    width: '1rem',
    height: '1rem',
    margin: '0.5rem',
    '&:before, &:after': {
        background: MainColor,
    },
    cursor: 'pointer',
});

export default ({ shiftContentDown = false, onClick }: Props) => {
    const additionalStyle: CSSObject = (shiftContentDown)
        ? { position: 'relative' }
        : { position: 'absolute', right: '0px' };

    const mergedStyle = mergeStyles(style, additionalStyle);
    return <button type="button" css={mergedStyle} onClick={onClick} aria-label="close" />;
}
