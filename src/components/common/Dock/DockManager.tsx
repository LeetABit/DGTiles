//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react'
import DockContainer from './DockContainer';
import DockItem from './DockItem';
import GridLineBuilder from './GridLineBuilder';
import { DockDirection } from './types';

export type DockedReactNode = [ DockDirection, React.ReactNode ];

interface Props {
    dockedNodes: DockedReactNode[],
}

export default ({ dockedNodes }: Props) => {
    const gridLineBuilder = new GridLineBuilder();

    const mapChild = (dockedNode: DockedReactNode, index: number) => {
        const [dock, child] = dockedNode;
        const gridLocation = gridLineBuilder.push(dock);
        const key: React.Key = (child && typeof child === 'object' && 'key' in child && child.key)
            ? child.key
            : index.toString(36);

        return <DockItem key={key} {...gridLocation}>{child}</DockItem>
    }

    const wrappedChildren = dockedNodes.map(mapChild);
    const lines = gridLineBuilder.getLines();

    return (
        <DockContainer lines={lines}>
            {wrappedChildren}
        </DockContainer>
    );
}
