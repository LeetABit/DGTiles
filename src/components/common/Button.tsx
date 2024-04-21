//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';

interface Props extends AriaAttributes {
    style?: CSSObject,
    onClick: () => void,
}

const baseStyle : CSSObject = {
    cursor: 'pointer',
};

export default function Button({ style, onClick, ...ariaAttributes }: Props) {
    const css = mergeStyles(baseStyle, style);
    return <button type="button" css={css} onClick={onClick} {...ariaAttributes} />;
}
