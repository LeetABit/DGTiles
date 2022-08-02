//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

export type DockDirection = 'top' | 'bottom' | 'left' | 'right' | 'fill';

export const dockDirectionPropName = 'dock-direction';

export interface DockAttachedProps {
    'dock-direction'?: DockDirection,
}

export type DockAttachedProp = keyof DockAttachedProps;

const fullDockAttachedProps: DockAttachedProps = {
    'dock-direction': undefined,
}

export const dockAttachedProps = Object.getOwnPropertyNames(fullDockAttachedProps) as DockAttachedProps[];
