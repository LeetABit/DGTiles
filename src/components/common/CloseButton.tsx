//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes, useMemo } from 'react';
import { DiagonalCross } from 'src/styles/components/DiagonalCross';
import { mergeStyles } from 'src/styles/mergeStyles';
import Button from './Button';

interface Props extends AriaAttributes {
    style?: CSSObject,
    onClick: () => void,
}

const baseStyle : CSSObject = mergeStyles(DiagonalCross, {
    width: '1em',
    height: '1em',
    cursor: 'pointer',
    position: 'relative',
    verticalAlign: 'top',
});

export default function CloseButton({ style, onClick, ...ariaAttributes }: Props) {
    const css = useMemo(() => mergeStyles(baseStyle, style), [style]);
    return <Button style={css} onClick={onClick} {...ariaAttributes} aria-label="close" />;
}
