//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

/**
 * Represents the grid template properties for a grid layout.
 */
export interface GridTemplates {
    // The template property for grid rows.
    rows: NonNullable<React.CSSProperties["gridTemplateRows"]>[];
    // The template property for grid columns.
    columns: NonNullable<React.CSSProperties["gridTemplateColumns"]>[];
}
