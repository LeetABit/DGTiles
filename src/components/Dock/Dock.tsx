//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { ReactElement } from 'react';
import { cloneElementWithEmotion } from 'src/types';
import Grid, { GridItem } from '../Grid';
import GridAreaBuilder from './private/GridAreaBuilder';
import { AreaSelector, ChildSelector, DockDirection, LazyReactNode, ReductionResult, ReductionResultFactory } from './types';

export const dockDirectionPropName = 'dock-direction';
export const dockContainerPropName = 'dock-container';

interface Props {
    container?: ReactElement,
}

const createFactory = (
    areaSelector: AreaSelector,
    childSelector: ChildSelector,
    dockDirection: DockDirection,
    container?: ReactElement,
): ReductionResultFactory => {
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
            const css = {
                label: `DockItem-${dockDirection}`,
            };

            const itemContainer = container
                ? cloneElementWithEmotion(container, undefined, css, null)
                : <div css={css} />;

            return (
                <GridItem area={originalFill.getArea()} container={itemContainer} key={key}>
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

        const dockDirection: DockDirection = (child && typeof child === 'object' && 'props' in child && dockDirectionPropName in child.props)
            ? child.props[dockDirectionPropName]
            : 'fill';

        const dockContainer = (child && typeof child === 'object' && 'props' in child && dockContainerPropName in child.props)
            ? child.props[dockContainerPropName]
            : undefined;

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

        childrenFactories.push(createFactory(areaSelector, childSelector, dockDirection, dockContainer));
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

export default function Dock({ container = <div />, children }: React.PropsWithChildren<Props>) {
    const gridAreaBuilder = GridAreaBuilder.create();
    const [reducedChildren, fillArea] = reduceChildren(gridAreaBuilder, children) as [LazyReactNode, GridAreaBuilder];
    const templates = gridAreaBuilder.getTemplates(fillArea);
    const reducedChildrenNode = reducedChildren();

    return (
        <Grid templates={templates} container={container}>
            {reducedChildrenNode}
        </Grid>
    );
}
