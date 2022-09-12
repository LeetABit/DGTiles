//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { DiagonalCross } from '../../styles/icons';
import { mergeStyles } from '../../styles/mergeStyles';

interface Props {
    onClick: () => void,
}

const style : CSSObject = mergeStyles(DiagonalCross, {
    label: 'CloseButton',
    width: '1rem',
    height: '1rem',
    cursor: 'pointer',
    position: 'relative',
    //float: 'right',
});

export default function CloseButton({ onClick }: Props) {
    return <button type="button" css={style} onClick={onClick} aria-label="close" />;
}
