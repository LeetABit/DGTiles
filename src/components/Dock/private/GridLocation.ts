//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as GridAxisLocation from "./GridAxisLocation";
import type { GridLocationBuilder } from "./GridLocationBuilder";

export interface GridLocation {
    column: GridAxisLocation.GridAxisLocation,
    row: GridAxisLocation.GridAxisLocation,
}

/**
 * Converts a grid axis location with potentially negative indices to an
 * equivalent location with only positive indices.
 * @param {GridLocation} location The grid axis location to convert.
 * @param {GridLocationBuilder} builder The grid location builder that
 * represents the final grid structure.
 * @returns {GridLocation} The converted grid axis location.
 */
export function toAbsolute(
    location: GridLocation,
    builder: GridLocationBuilder,
): GridLocation {
    return {
        column: GridAxisLocation.toAbsolute(location.column, builder.columns),
        row: GridAxisLocation.toAbsolute(location.row, builder.rows),
    };
}
