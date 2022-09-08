//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

export default function nonNegativeNumber<T extends bigint | number>(value: T): boolean {
    return value >= 0;
}
