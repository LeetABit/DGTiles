//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

export type DockDirection = 'Top' | 'Bottom' | 'Left' | 'Right' | 'Fill';

export interface DockAttachedDirectionProps {
    'dock-top'?: boolean,
    'dock-bottom'?: boolean,
    'dock-left'?: boolean,
    'dock-right'?: boolean,
    'dock-fill'?: boolean,
}

export interface DockAttachedDelayProps {
    'dock-showDelay'?: number,
    'dock-hideDelay'?: number,
}

export interface DockAttachedProps extends DockAttachedDirectionProps, DockAttachedDelayProps {
}

export type DockAttachedDirectionProp = keyof DockAttachedDirectionProps;
export type DockAttachedDelayProp = keyof DockAttachedDelayProps;
export type DockAttachedProp = keyof DockAttachedProps;

export const defaultDockAttachedDirectionProps: Required<DockAttachedDirectionProps> = {
    'dock-top': false,
    'dock-bottom': false,
    'dock-left': false,
    'dock-right': false,
    'dock-fill': false,
}

export const dockAttachedDirectionProps = Object.getOwnPropertyNames(defaultDockAttachedDirectionProps) as DockAttachedDirectionProp[];

export const defaultDockAttachedDelayProps: Required<DockAttachedDelayProps> = {
    'dock-showDelay': 0,
    'dock-hideDelay': 0,
}

export const dockAttachedDelayProps = Object.getOwnPropertyNames(defaultDockAttachedDelayProps) as DockAttachedDelayProp[];
