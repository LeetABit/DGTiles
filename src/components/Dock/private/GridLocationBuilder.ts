//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as GridAxisLocationBuilder from "./GridAxisLocationBuilder";
import type { DockDirection } from "../types";
import type { GridLocation } from "./GridLocation";

export interface GridLocationBuilder {
    columns: GridAxisLocationBuilder.GridAxisLocationBuilder,
    rows: GridAxisLocationBuilder.GridAxisLocationBuilder,
}

/**
 * Creates a new instance of GridLocationBuilder initialized to new column and
 * row builders.
 * @returns {GridLocationBuilder} A new instance of GridLocationBuilder
 * initialized to new column and row builders.
 */
export function create(): GridLocationBuilder {
    return {
        columns: GridAxisLocationBuilder.create(),
        rows: GridAxisLocationBuilder.create(),
    };
}

/**
 * Inserts a new grid item track in the specified direction and returns the
 * updated builder along with the location of the newly inserted item.
 * @param {GridLocationBuilder} info The grid location builder.
 * @param {DockDirection} direction The direction in which to insert the new
 * item.
 * @returns {[GridLocationBuilder, GridLocation]} A tuple where the first item
 * is the updated grid location builder and the second item is the location of
 * the newly inserted item.
 */
export function insert(info: GridLocationBuilder, direction: DockDirection)
: [GridLocationBuilder, GridLocation] {
    let newColumnsBuilder = info.columns;
    let newRowsBuilder = info.rows;
    let columnLocation = GridAxisLocationBuilder.getInsertionLocation(
        newColumnsBuilder);
    let rowLocation = GridAxisLocationBuilder.getInsertionLocation(
        newRowsBuilder);

    switch (direction) {
        case 'top':
            [newRowsBuilder, rowLocation] =
                GridAxisLocationBuilder.insertHead(info.rows);
            break;
        case 'bottom':
            [newRowsBuilder, rowLocation] =
                GridAxisLocationBuilder.insertTail(info.rows);
            break;
        case 'left':
            [newColumnsBuilder, columnLocation] =
                GridAxisLocationBuilder.insertHead(info.columns);
            break;
        case 'right':
            [newColumnsBuilder, columnLocation] =
                GridAxisLocationBuilder.insertTail(info.columns);
            break;
        case 'fill':
        default:
            break;
    }

    return [{
        columns: newColumnsBuilder,
        rows: newRowsBuilder,
    }, {
        column: columnLocation,
        row: rowLocation,
    }];
}

/**
 * Gets the grid axis location that represents the fill area between head and
 * tail.
 * @param {GridAxisLocationBuilder} info The grid axis location builder.
 * @returns {GridLocation} The grid axis location that represents the fill
 * area between head and tail.
 */
export function getInsertionLocation(info: GridLocationBuilder)
: GridLocation {
    return {
        column: GridAxisLocationBuilder.getInsertionLocation(info.columns),
        row: GridAxisLocationBuilder.getInsertionLocation(info.rows),
    };
}

/**
 * Gets the CSS templates for the grid axes represented by the specified
 * builder.
 * @param {GridLocationBuilder} info The grid location builder.
 * @returns {[string, string]} The CSS templates for the grid axes - columns and
 * rows - represented by the specified builder.
 */
export function getTemplate(info: GridLocationBuilder): [string, string] {
    return [
        GridAxisLocationBuilder.getTemplate(info.columns),
        GridAxisLocationBuilder.getTemplate(info.rows),
    ];
}
