//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import Grid from '../Grid';
import GridAreaBuilder from './GridAreaBuilder';
import reduceChildren, { LazyReactNode } from './reduceChildren';

export type DockDirection = 'top' | 'bottom' | 'left' | 'right' | 'fill';

export const dockDirectionPropName = 'dock-direction';

export default ({ children }: React.PropsWithChildren) => {
    const gridAreaBuilder = GridAreaBuilder.create();
    const [reducedChildren, fillArea] = reduceChildren(gridAreaBuilder, children) as [LazyReactNode, GridAreaBuilder];
    return (
        <Grid templates={gridAreaBuilder.getTemplates(fillArea)}>
            {reducedChildren()}
        </Grid>
    );
};
