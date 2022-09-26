//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes } from 'react';

interface Props extends AriaAttributes {
    style?: CSSObject,
    onClick: () => void,
}

export default function EditButton({ style, onClick, ...ariaAttributes }: Props) {
    return (
        <button type="button" css={style} onClick={onClick} aria-label="edit" {...ariaAttributes}>
            Edit
        </button>
    );
}
