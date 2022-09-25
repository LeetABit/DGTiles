//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import GridAreaBuilder from './private/GridAreaBuilder';

export type DockDirection = 'top' | 'bottom' | 'left' | 'right' | 'fill';
export type LazyReactNode = () => React.ReactNode;
export type ReductionResult = [LazyReactNode, GridAreaBuilder];
export type ReductionResultFactory = (fillArea: GridAreaBuilder) => [LazyReactNode, GridAreaBuilder];
export type AreaSelector = (fillArea: GridAreaBuilder) => GridAreaBuilder;
export type ChildSelector = (fillArea: GridAreaBuilder, childAreaSelector: AreaSelector) => ReductionResult;

export const dockDirectionPropName = 'dock-direction';
