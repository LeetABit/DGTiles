//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject } from '@emotion/react';

export const DiagonalCross : CSSObject = {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    padding: 0,
    '&:before, &:after': {
        content: '""',
        position: 'absolute',
        height: '100%',
        width: '5%',
        backgroundColor: 'currentColor',
    },
    '&:before': {
        transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    '&:after': {
        transform: 'translate(-50%, -50%) rotate(-45deg)',
    },
};
