//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';

const mergeProperties = (target: CSSObject | CSSInterpolation, source: CSSObject | CSSInterpolation): void => {
    if (!source || !target) {
        return;
    }

    const destination = target;
    (Object.keys(source) as Array<keyof typeof source>).forEach(key => {
        if (typeof (destination[key]) === 'object' && typeof (source[key]) === 'object') {
            mergeProperties(destination[key], source[key]);
        } else {
            destination[key] = source[key];
        }
    });
}

export const mergeStyles = (...styles: (CSSObject | undefined)[]): CSSObject => {
    const result: CSSObject = {};
    styles.forEach(style => mergeProperties(result, style));
    return result;
}
