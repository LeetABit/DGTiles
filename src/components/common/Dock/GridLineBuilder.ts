//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DockDirection } from './types';

export interface GridDockPosition {
    top: string,
    bottom: string,
    left: string,
    right: string,
    dock: DockDirection,
}

export interface GridLines {
    top: string[],
    bottom: string[],
    left: string[],
    right: string[],
}

interface GridLineCount {
    top: number,
    bottom: number,
    left: number,
    right: number,
}

const reverseDirection = (direction: Exclude<DockDirection, 'fill'>): Exclude<DockDirection, 'fill'> => {
    switch (direction) {
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        default:
            throw new Error(`Specified dock direction '${direction}' is not supported.`);
    }
}

export default class {
    count: GridLineCount;

    constructor() {
        this.count = {
            top: 1,
            bottom: 1,
            left: 1,
            right: 1,
        }
    }

    getLines(): GridLines {
        return {
            top: [...Array(this.count.top + 1).keys()].slice(1).map(num => `[top${num}]`),
            bottom: [...Array(this.count.bottom + 1).keys()].slice(1).reverse().map(num => `[bottom${num}]`),
            left: [...Array(this.count.left + 1).keys()].slice(1).map(num => `[left${num}]`),
            right: [...Array(this.count.right + 1).keys()].slice(1).reverse().map(num => `[right${num}]`),
        };
    }

    push(dock: DockDirection): GridDockPosition {
        const result: GridDockPosition = {
            top: `top${this.count.top}`,
            bottom: `bottom${this.count.bottom}`,
            left: `left${this.count.left}`,
            right: `right${this.count.right}`,
            dock,
        }

        if (dock !== 'fill') {
            this.count[dock]++;
            result[reverseDirection(dock)] = `${dock}${this.count[dock]}`;
        }

        return result;
    }
}
