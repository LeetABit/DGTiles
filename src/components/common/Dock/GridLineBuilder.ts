//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DockDirection } from './types';

export interface GridDockPosition {
    columnStart: string,
    columnEnd: string,
    rowStart: string,
    rowEnd: string,
    dock: DockDirection,
}

export interface GridLines {
    topLines: string[],
    bottomLines: string[],
    leftLines: string[],
    rightLines: string[],
}

interface GridLineCount {
    Top: number,
    Bottom: number,
    Left: number,
    Right: number,
}

const reverseDirection = (direction: Exclude<DockDirection, 'Fill'>): Exclude<DockDirection, 'Fill'> => {
    switch (direction) {
        case 'Top':
            return 'Bottom';
        case 'Bottom':
            return 'Top';
        case 'Left':
            return 'Right';
        case 'Right':
            return 'Left';
        default:
            throw new Error(`Specified dock direction '${direction}' is not supported.`);
    }
}

export default class {
    count: GridLineCount;

    constructor() {
        this.count = {
            Top: 1,
            Bottom: 1,
            Left: 1,
            Right: 1,
        }
    }

    getLines(): GridLines {
        return {
            topLines: [...Array(this.count.Top + 1).keys()].slice(1).map(num => `[top-${num}]`),
            bottomLines: [...Array(this.count.Bottom + 1).keys()].slice(1).reverse().map(num => `[bottom-${num}]`),
            leftLines: [...Array(this.count.Left + 1).keys()].slice(1).map(num => `[left-${num}]`),
            rightLines: [...Array(this.count.Right + 1).keys()].slice(1).reverse().map(num => `[right-${num}]`),
        };
    }

    push(dock: DockDirection): GridDockPosition {
        const indexes: GridLineCount = { ...this.count };

        if (dock !== 'Fill') {
            this.count[dock]++;
            indexes[reverseDirection(dock)] = this.count[dock];
        }

        return {
            rowStart: `Top-${indexes.Top}`,
            rowEnd: `Bottom-${indexes.Bottom}`,
            columnStart: `Left-${indexes.Left}`,
            columnEnd: `Right-${indexes.Right}`,
            dock,
        };
    }
}
