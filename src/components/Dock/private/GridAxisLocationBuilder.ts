//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { GridAxisLocation } from "./GridAxisLocation";

export interface GridAxisLocationBuilder {
    head: number,
    tail: number,
}

/**
 * Creates a new instance of GridAxisLocationBuilder initialized to zero head
 * and tail.
 * @returns {GridAxisLocationBuilder} A new instance of GridAxisLocationBuilder
 * initialized to zero head and tail.
 */
export function create(): GridAxisLocationBuilder {
    return { head: 0, tail: 0 };
}

/**
 * Inserts a new item at the head of the grid axis location.
 * @param {GridAxisLocationBuilder} info The grid axis location builder.
 * @returns {[GridAxisLocationBuilder, GridAxisLocation]} A tuple containing the
 * updated grid axis location builder and grid axis location that has been
 * inserted.
 */
export function insertHead(info: GridAxisLocationBuilder)
: [GridAxisLocationBuilder, GridAxisLocation] {
    const builder = { head: info.head + 1, tail: info.tail }
    const location = { end: info.head + 1, start: info.head };
    return [builder, location];
}

/**
 * Inserts a new item at the tail of the grid axis location.
 * @param {GridAxisLocationBuilder} info The grid axis location builder.
 * @returns {[GridAxisLocationBuilder, GridAxisLocation]} A tuple containing the
 * updated grid axis location builder and grid axis location that has been
 * inserted.
 */
export function insertTail(info: GridAxisLocationBuilder)
: [GridAxisLocationBuilder, GridAxisLocation] {
    const builder = { head: info.head, tail: info.tail - 1 }
    const location = { end: info.tail, start: info.tail - 1 };
    return [builder, location];
}

/**
 * Gets the grid axis location that represents the fill area between head and
 * tail.
 * @param {GridAxisLocationBuilder} info The grid axis location builder.
 * @returns {GridAxisLocation} The grid axis location that represents the fill
 * area between head and tail.
 */
export function getInsertionLocation(info: GridAxisLocationBuilder)
: GridAxisLocation {
    return { end: info.tail - 1, start: info.head + 1 };
}

/**
 * Gets the CSS template for the grid axis represented by the specified builder.
 * @param {GridAxisLocationBuilder} info The grid axis location builder.
 * @returns {string} The CSS template for the grid axis represented by the
 * specified builder.
 */
export function getTemplate(info: GridAxisLocationBuilder): string {
    let result = '';
    for (let headIndex = 0; headIndex < info.head; ++headIndex) {
        result += 'max-content ';
    }

    result += '1fr';

    for (let tailIndex = 0; tailIndex < -info.tail; ++tailIndex) {
        result += ' max-content';
    }

    return result;
}
