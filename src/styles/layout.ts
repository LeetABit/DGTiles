//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject } from '@emotion/react';
import { mergeStyles } from './mergeStyles';

export const Fill: CSSObject = {
    width: '100%',
    height: '100%',
}

export const FullScreen: CSSObject = mergeStyles(Fill, {
    position: 'absolute',
    left: '0px',
    top: '0px',
});
