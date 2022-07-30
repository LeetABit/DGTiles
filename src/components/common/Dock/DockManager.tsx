//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react'
import DockContainer from './DockContainer';
import DockItem, { DockItemProps } from './DockItem';
import { DockDirection } from './types';

export type DockedReactNode = [ DockDirection, React.ReactNode ];
export interface RelocationInfo {
    index: number,
    dock: DockDirection,
}

export interface DockManagerProps {
    dockedNodes: DockedReactNode[],
}

export default ({ dockedNodes }: DockManagerProps) => {
    let topLineCount = 1;
    let bottomLineCount = 1;
    let leftLineCount = 1;
    let rightLineCount = 1;

    const mapChild = (dockedNode: DockedReactNode, index: number) => {
        const [dock, child] = dockedNode;

        const props: DockItemProps = {
            rowStart: `top-${topLineCount}`,
            rowEnd: `bottom-${bottomLineCount}`,
            columnStart: `left-${leftLineCount}`,
            columnEnd: `right-${rightLineCount}`,
            dock,
        };

        let key: React.Key = index.toString(36);

        if (child && typeof child === 'object' && 'props' in child) {
            switch (dock) {
                case 'Top': {
                    ++topLineCount;
                    props.rowEnd = `top-${topLineCount}`;
                    break;
                }

                case 'Bottom': {
                    ++bottomLineCount;
                    props.rowStart = `bottom-${bottomLineCount}`;
                    break;
                }

                case 'Left': {
                    ++leftLineCount;
                    props.columnEnd = `left-${leftLineCount}`;
                    break;
                }

                case 'Right': {
                    ++rightLineCount;
                    props.columnStart = `right-${rightLineCount}`;
                    break;
                }

                default: {
                    break;
                }
            }

            if (child.key) {
                key = child.key;
            }
        }

        return <DockItem key={key} {...props}>{child}</DockItem>
    }

    const wrappedChildren = dockedNodes.map(mapChild);

    const topLines = [...Array(topLineCount + 1).keys()].slice(1).map(num => `[top-${num}]`);
    const bottomLines = [...Array(bottomLineCount + 1).keys()].slice(1).reverse().map(num => `[bottom-${num}]`);
    const leftLines = [...Array(leftLineCount + 1).keys()].slice(1).map(num => `[left-${num}]`);
    const rightLines = [...Array(rightLineCount + 1).keys()].slice(1).reverse().map(num => `[right-${num}]`);

    return (
        <DockContainer topLines={topLines} bottomLines={bottomLines} leftLines={leftLines} rightLines={rightLines}>
            {wrappedChildren}
        </DockContainer>
    );
}
