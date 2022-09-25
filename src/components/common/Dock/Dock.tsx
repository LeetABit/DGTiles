//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import Grid, { GridItem } from '../Grid';
import GridAreaBuilder from './GridAreaBuilder';

export type DockDirection = 'top' | 'bottom' | 'left' | 'right' | 'fill';

export const dockDirectionPropName = 'dock-direction';

type LazyReactNode = () => React.ReactNode;
type ReductionResult = [LazyReactNode, GridAreaBuilder];
type ReductionResultFactory = (fillArea: GridAreaBuilder) => [LazyReactNode, GridAreaBuilder];
type AreaSelector = (fillArea: GridAreaBuilder) => GridAreaBuilder;
type ChildSelector = (fillArea: GridAreaBuilder, childAreaSelector: AreaSelector) => ReductionResult;

const createFactory = (areaSelector: AreaSelector, childSelector: ChildSelector, dockDirection: DockDirection): ReductionResultFactory => {
    return (fill: GridAreaBuilder) => {
        const [selectedChildren, selectedFill] = childSelector(fill, areaSelector);
        return [() => {
            const selected = selectedChildren();
            if (Array.isArray(selected)) {
                return selected;
            }

            let key;
            if (selected && typeof selected === 'object' && 'key' in selected) {
                key = selected.key;
            }

            const originalFill = areaSelector(fill);
            return (
                <GridItem area={originalFill.getArea()} cssLabelSuffix={dockDirection} key={key}>
                    {selected}
                </GridItem>
            );
        }, selectedFill];
    }
}

const reduceChildren = (area: GridAreaBuilder, children: React.ReactNode): ReductionResult | undefined => {
    let cancel = false;
    const childrenFactories: ReductionResultFactory[] = [];
    let currentArea = area;

    React.Children.toArray(children).filter(child => child).forEach(child => {
        if (cancel) {
            return;
        }

        let dockDirection: DockDirection = 'fill';
        if (child && typeof child === 'object' && 'props' in child && dockDirectionPropName in child.props) {
            dockDirection = child.props[dockDirectionPropName];
        }

        let areaSelector: AreaSelector = (fillArea) => fillArea;
        if (dockDirection !== 'fill') {
            const splitResult = currentArea.split(dockDirection);
            if (!splitResult) {
                cancel = true;
                return;
            }

            const [thisArea, nextArea] = splitResult;
            currentArea = nextArea;
            areaSelector = (_) => thisArea;
        }

        let childSelector: ChildSelector = (fill, _childAreaSelector) => [() => child, fill];
        if (child && typeof child === 'object' && 'type' in child && child.type === Dock) {
            childSelector = (fill, childAreaSelector) => {
                const childArea = childAreaSelector(fill);
                const dockChildren = ('children' in child.props)
                    ? child.props.children
                    : [];

                return reduceChildren(childArea, dockChildren) ?? [() => child, fill];
            };
        }

        childrenFactories.push(createFactory(areaSelector, childSelector, dockDirection));
    });

    if (cancel) {
        area.revert();
        return undefined;
    }

    area.accept();

    const childFactories = childrenFactories.map(factory => {
        const [childrenFactory, newArea] = factory(currentArea);
        if (currentArea.contains(newArea)) {
            currentArea = newArea;
        }

        return childrenFactory;
    })

    return [() => childFactories.map(f => f()), currentArea];
}

export default function Dock({ children }: React.PropsWithChildren) {
    const gridAreaBuilder = GridAreaBuilder.create();
    const [reducedChildren, fillArea] = reduceChildren(gridAreaBuilder, children) as [LazyReactNode, GridAreaBuilder];
    return (
        <Grid templates={gridAreaBuilder.getTemplates(fillArea)}>
            {React.Children.toArray(reducedChildren())}
        </Grid>
    );
}
