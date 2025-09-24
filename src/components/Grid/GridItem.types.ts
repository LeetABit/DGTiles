//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

/**
 * Represents the location of a grid item within a grid layout.
 */
export interface GridItemLocation {
    // The row start position of the grid item.
    rowStart: React.CSSProperties["gridRowStart"];
    // The row end position of the grid item.
    rowEnd: React.CSSProperties["gridRowEnd"];
    // The column start position of the grid item.
    columnStart: React.CSSProperties["gridColumnStart"];
    // The column end position of the grid item.
    columnEnd: React.CSSProperties["gridColumnEnd"];
}
