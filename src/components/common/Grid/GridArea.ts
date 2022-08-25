//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import type { Property } from 'csstype';

export default interface GridArea {
    rowStart: Property.GridRowStart,
    rowEnd: Property.GridRowEnd,
    columnStart: Property.GridColumnStart,
    columnEnd: Property.GridColumnEnd,
}