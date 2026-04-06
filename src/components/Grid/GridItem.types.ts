//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

/**
 * Represents the location of a grid item within a grid layout.
 */
export interface GridItemLocation {
    // The row start position of the grid item.
    rowStart: NonNullable<React.CSSProperties["gridRowStart"]>;
    // The row end position of the grid item.
    rowEnd: NonNullable<React.CSSProperties["gridRowEnd"]>;
    // The column start position of the grid item.
    columnStart: NonNullable<React.CSSProperties["gridColumnStart"]>;
    // The column end position of the grid item.
    columnEnd: NonNullable<React.CSSProperties["gridColumnEnd"]>;
}
