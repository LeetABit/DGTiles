//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

export default class GridLine {
    isTemporary: boolean;
    previous: GridLine | null;
    next: GridLine | null;

    constructor(previous: GridLine | null, next: GridLine | null) {
        this.isTemporary = false;
        this.previous = previous;
        this.next = next;

        if (this.previous) {
            this.previous.next = this;
        }

        if (this.next) {
            this.next.previous = this;
        }
    }

    getIndex(): number {
        let result = 0;
        let current = this.previous;
        while (current) {
            ++result;
            current = current.previous;
        }

        return result;
    }

    accept() {
        this.isTemporary = false;
    }

    revert() {
        if (this.isTemporary) {
            if (this.previous) {
                this.previous.next = this.next;
            }

            if (this.next) {
                this.next.previous = this.previous;
            }
        }
    }
}
