//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { GridItem } from '../Grid';
import Dock from './Dock';
import GridAreaBuilder from './GridAreaBuilder';
import { DockDirection, dockDirectionPropName } from './types';

export type LazyReactNode = () => React.ReactNode;
export type AreaSelector = (fillArea: GridAreaBuilder) => GridAreaBuilder;
export type ChildSelector = (fillArea: GridAreaBuilder, childAreaSelector: AreaSelector) => [LazyReactNode, GridAreaBuilder];

const reduceChildren = (area: GridAreaBuilder, children: React.ReactNode): [LazyReactNode, GridAreaBuilder] | undefined => {
    let cancel = false;
    const childrenFactories: ((fillArea: GridAreaBuilder) => [LazyReactNode, GridAreaBuilder])[] = [];
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

        let childSelector: ChildSelector = (fill, _) => [() => child, fill];
        if (child && typeof child === 'object' && 'type' in child && child.type === Dock) {
            childSelector = (fill, childAreaSelector) => {
                const childArea = childAreaSelector(fill);
                const dockChildren = ('children' in child.props)
                    ? child.props.children
                    : [];

                const reduced = reduceChildren(childArea, dockChildren);
                return reduced ?? [() => child, fill];
            };
        }

        childrenFactories.push((fill: GridAreaBuilder) => {
            const [selectedChildren, selectedFill] = childSelector(fill, areaSelector);
            return [() => {
                const ss = selectedChildren();
                if (Array.isArray(ss)) {
                    return ss;
                }

                const originalFill = areaSelector(fill);
                return (
                    <GridItem area={originalFill.getArea()}>
                        {ss}
                    </GridItem>
                );
            }, selectedFill];
        });
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

export default reduceChildren;
