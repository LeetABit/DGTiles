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
        width: '1px',
        height: '100%',
        transform: 'rotate(45deg) translateX(0px)',
        position: 'absolute',
        top: '0',
    },
    '&:after': {
        transform: 'rotate(-45deg) translateX(0px)',
    },
};
