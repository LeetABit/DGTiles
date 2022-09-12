//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';

const mergeProperties = (target: CSSObject | CSSInterpolation, source: CSSObject | CSSInterpolation): void => {
    if (typeof source !== 'object' || typeof target !== 'object' || source === null || target === null) {
        return;
    }

    const destination = target;
    Object.keys(source).forEach(key => {
        const sourceKey = key as keyof typeof source;
        const destinationKey = key as keyof typeof destination;
        if (typeof destination[destinationKey] === 'object' && typeof source[sourceKey] === 'object') {
            mergeProperties(destination[destinationKey], source[sourceKey]);
        } else {
            destination[destinationKey] = source[sourceKey];
        }
    });
}

export const mergeStyles = (...styles: (CSSObject | undefined)[]): CSSObject => {
    const result: CSSObject = {};
    styles.forEach(style => mergeProperties(result, style));
    return result;
}
