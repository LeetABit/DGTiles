//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import type { DockDirection } from './types';
import GridLine from './GridLine';
import GridStripeBuilder from './GridStripeBuilder';
import { GridTemplates, GridArea } from '../Grid';

export default class GridAreaBuilder {
    horizontalStripe: GridStripeBuilder;
    verticalStripe: GridStripeBuilder;

    constructor(horizontalStripe: GridStripeBuilder, verticalStripe: GridStripeBuilder) {
        this.horizontalStripe = horizontalStripe;
        this.verticalStripe = verticalStripe;
    }

    static create(): GridAreaBuilder {
        const top = new GridLine(null, null);
        const bottom = new GridLine(top, null);
        top.next = bottom;
        const left = new GridLine(null, null);
        const right = new GridLine(left, null);
        left.next = right;
        return new GridAreaBuilder(new GridStripeBuilder(top, bottom), new GridStripeBuilder(left, right));
    }

    split(direction: DockDirection): [GridAreaBuilder, GridAreaBuilder] | null {
        const thisFirst = direction === 'top' || direction === 'left';

        type AreaSplitter = (splitted: [GridStripeBuilder, GridStripeBuilder]) => [GridAreaBuilder, GridAreaBuilder];

        const areaSplitter: AreaSplitter = ([first, second]: [GridStripeBuilder, GridStripeBuilder]) => {
            return (direction === 'top' || direction === 'bottom')
                ? [new GridAreaBuilder(first, this.verticalStripe), new GridAreaBuilder(second, this.verticalStripe)]
                : [new GridAreaBuilder(this.horizontalStripe, first), new GridAreaBuilder(this.horizontalStripe, second)];
        };

        const splitter = (stripe: GridStripeBuilder, creator: AreaSplitter) => {
            const splitted = stripe.split();
            return splitted
                ? creator(splitted)
                : splitted;
        }

        const result = (direction === 'top' || direction === 'bottom')
            ? splitter(this.horizontalStripe, areaSplitter)
            : splitter(this.verticalStripe, areaSplitter);

        if (!result) {
            return result;
        }

        const [first, second] = result;
        return thisFirst
            ? [first, second]
            : [second, first];
    }

    contains(other: GridAreaBuilder) {
        return this.horizontalStripe.contains(other.horizontalStripe)
            && this.verticalStripe.contains(other.verticalStripe);
    }

    accept() {
        this.horizontalStripe.accept();
        this.verticalStripe.accept();
    }

    revert() {
        this.horizontalStripe.revert();
        this.verticalStripe.revert();
    }

    getTemplates(fill: GridAreaBuilder): GridTemplates {
        return {
            rows: this.horizontalStripe.getTemplate('row', fill.horizontalStripe.start),
            columns: this.verticalStripe.getTemplate('column', fill.verticalStripe.start),
        };
    }

    getArea(): GridArea {
        return {
            rowStart: this.horizontalStripe.getNameOfStart('row'),
            rowEnd: this.horizontalStripe.getNameOfEnd('row'),
            columnStart: this.verticalStripe.getNameOfStart('column'),
            columnEnd: this.verticalStripe.getNameOfEnd('column'),
        };
    }
}
