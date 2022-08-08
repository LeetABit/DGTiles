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
    onClick: () => void,
}

const style : CSSObject = mergeStyles(DiagonalCross, {
    label: 'CloseButton',
    width: '1rem',
    height: '1rem',
    margin: '0.5rem',
    '&:before, &:after': {
        backgroundColor: MainColor,
    },
    cursor: 'pointer',
    position: 'absolute',
    right: '0px',
    top: '0px',
});

export default ({ onClick }: Props) => {
    return <button type="button" css={style} onClick={onClick} aria-label="close" />;
}
