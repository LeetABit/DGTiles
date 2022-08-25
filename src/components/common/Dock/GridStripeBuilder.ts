//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import GridLine from './GridLine';

export default class GridStripe {
    start: GridLine;
    end: GridLine;
    constructor(start: GridLine, end: GridLine) {
        this.start = start;
        this.end = end;
    }

    split(): [GridStripe, GridStripe] | null {
        if (this.start.next !== this.end) {
            return null;
        }

        const newLine = new GridLine(this.start, this.end);
        return [new GridStripe(this.start, newLine), new GridStripe(newLine, this.end)];
    }

    accept() {
        for (const item of this.iterateAll()) {
            item.accept();
        }
    }

    revert() {
        for (const item of this.iterateAll()) {
            item.revert();
        }
    }

    contains(other: GridStripe) {
        let startFound = false;
        let endFound = false;

        for (const item of this.iterate()) {
            startFound ||= item === other.start;
            endFound ||= item === other.end;
        }

        return startFound && endFound;
    }

    getTemplate(prefix: string, fillStart: GridLine) {
        let i = 0;
        let result = '';

        for (const item of this.iterateAll()) {
            result += `[${GridStripe.getLineName(prefix, i++)}]`;
            if (item.next) {
                result += (item === fillStart) ? ' 1fr ' : ' max-content ';
            }
        }

        return result;
    }

    getNameOfStart(prefix: string): string {
        return GridStripe.getLineName(prefix, this.start.getIndex());
    }

    getNameOfEnd(prefix: string): string {
        return GridStripe.getLineName(prefix, this.end.getIndex());
    }

    private static getLineName(prefix: string, index: number): string {
        return `${prefix}-line-${index}`;
    }

    private getRoot() {
        let current = this.start;
        while (current.previous) {
            current = current.previous;
        }

        return current;
    }

    private* iterate(): Iterable<GridLine> {
        let line: GridLine | null = this.start;
        while (line) {
            yield line as GridLine;
            if (line === this.end) {
                break;
            }

            line = line.next;
        }
    }

    private* iterateAll(): Iterable<GridLine> {
        let line: GridLine | null = this.getRoot();
        while (line) {
            yield line;
            line = line.next;
        }
    }
}
