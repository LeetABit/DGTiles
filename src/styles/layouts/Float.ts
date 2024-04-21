//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';

// TODO: remove, move to component
export default function Float(left: boolean): CSSObject {
    return {
        position: 'absolute',
        bottom: (left ? '0' : '1'),
        margin: '0.5em',
    };
}
