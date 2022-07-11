//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject } from '@emotion/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeProperties = (target: any, source: any): void => {
    const destination = target;
    Object.keys(source).forEach(key => {
        if (target[key]) {
            mergeProperties(destination[key], source[key]);
        } else {
            destination[key] = source[key];
        }
    });
}

export const mergeStyles = (...styles: CSSObject[]): CSSObject => {
    const result: CSSObject = {};
    styles.forEach(style => mergeProperties(result, style));
    return result;
}