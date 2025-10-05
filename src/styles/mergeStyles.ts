//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { CSSObject } from "@emotion/react";

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const mergeObjects = (
    target: Record<string, unknown>,
    source: Record<string, unknown>,
): void => {
    for (const [key, srcVal] of Object.entries(source)) {
        const curVal = target[key];

        if (isRecordObject(srcVal) && isRecordObject(curVal)) {
            mergeObjects(curVal, srcVal);
        } else {
            target[key] = srcVal;
        }
    }
};

/**
 * Merges multiple CSS objects into one.
 * @param {CSSObject[]} styles CSS objects to merge.
 * @returns {CSSObject} Merged CSS object.
 */
export const mergeStyles = (...styles: CSSObject[]): CSSObject => {
    const result: CSSObject = {};
    styles.forEach((style) => {
        mergeObjects(result, style);
    });
    return result;
};
