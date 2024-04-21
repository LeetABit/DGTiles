//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import type { Property } from 'csstype';
import { CSSObject, useTheme } from '@emotion/react';
import { AriaAttributes } from 'react';
import Float from 'src/styles/layouts/Float';
import { mergeStyles } from 'src/styles/mergeStyles';
import Button from './Button';

interface Props extends AriaAttributes {
    style?: CSSObject,
    onClick: () => void,
}

function Circle(size: Property.Width & Property.Height, color: Property.Color): CSSObject {
    return {
        width: size,
        height: size,
        borderRadius: '50%',
        borderStyle: 'none',
        backgroundColor: color,
    };
}

export default function FloatingButton({ style, onClick, ...ariaAttributes }: Props) {
    const theme = useTheme();
    const circle = Circle(theme.sizes.floatingButton, theme.colors.focus.idle);
    const layout = Float(true);
    const css = mergeStyles(circle, layout, style);
    return <Button style={css} onClick={onClick} {...ariaAttributes} />;
}
