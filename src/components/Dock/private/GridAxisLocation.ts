//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { GridAxisLocationBuilder } from "./GridAxisLocationBuilder";

export interface GridAxisLocation {
    start: number,
    end: number,
}

/**
 * Converts a grid axis location with potentially negative indices to an
 * equivalent location with only positive indices.
 * @param {GridAxisLocation} location The grid axis location to convert.
 * @param {GridAxisLocationBuilder} builder The grid axis location builder that
 * represents the final grid axis structure.
 * @returns {GridAxisLocation} The converted grid axis location.
 */
export function toAbsolute(
    location: GridAxisLocation,
    builder: GridAxisLocationBuilder
): GridAxisLocation {
    const axisSize = (builder.head + 1) + (-builder.tail + 1);
    return {
        end: toPositiveGridIndex(location.end, axisSize),
        start: toPositiveGridIndex(location.start, axisSize),
    };
}

/**
 * Expands a negative index that represents a number of items counted from the
 * last element to its equivalent positive index.
 * @param {number} index The index to expand.
 * @param {number} count The number of items in the collection.
 * @returns {number} The expanded index.
 */
function toPositiveGridIndex(index: number, count: number): number {
    return (index >= 0)
        ? index
        : count + 1 + index;
}
