//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren, ReactNode } from 'react';
import DockContainer from './DockContainer';
import DockItem, { DockItemProps } from './DockItem';
import { dockAttachedDelayProps, dockAttachedDirectionProps } from './types';

export default ({ children }: PropsWithChildren) => {
    let topLineCount = 1;
    let bottomLineCount = 1;
    let leftLineCount = 1;
    let rightLineCount = 1;

    const mapChild = (child: ReactNode, index: number) => {
        if (child && typeof child === 'object' && 'props' in child) {
            let props: DockItemProps = {
                rowStart: `top-${topLineCount}`,
                rowEnd: `bottom-${bottomLineCount}`,
                columnStart: `left-${leftLineCount}`,
                columnEnd: `right-${rightLineCount}`,
                dock: 'Fill',
            };

            dockAttachedDelayProps.filter(prop => prop in child.props).forEach(prop => {
                props = { ...props, ...{ [prop.substring('dock-'.length)]: child.props[prop] } };
            });

            switch (dockAttachedDirectionProps.find(propName => propName in child.props)) {
                case 'dock-top': {
                    ++topLineCount;
                    props.rowEnd = `top-${topLineCount}`;
                    props.dock = 'Top';
                    break;
                }

                case 'dock-bottom': {
                    ++bottomLineCount;
                    props.rowStart = `bottom-${bottomLineCount}`;
                    props.dock = 'Bottom';
                    break;
                }

                case 'dock-left': {
                    ++leftLineCount;
                    props.columnEnd = `left-${leftLineCount}`;
                    props.dock = 'Left';
                    break;
                }

                case 'dock-right': {
                    ++rightLineCount;
                    props.columnStart = `right-${rightLineCount}`;
                    props.dock = 'Right';
                    break;
                }

                case 'dock-fill': {
                    break;
                }

                default: {
                    return child;
                }
            }

            const key = child.key ?? index.toString(36);
            return <DockItem key={key} {...props}>{child}</DockItem>;
        }

        return child;
    }

    const wrappedChildren = React.Children.map(children, mapChild);

    const topLines = [...Array(topLineCount + 1).keys()].slice(1).map(num => `[top-${num}]`);
    const bottomLines = [...Array(bottomLineCount + 1).keys()].slice(1).reverse().map(num => `[bottom-${num}]`);
    const leftLines = [...Array(leftLineCount + 1).keys()].slice(1).map(num => `[left-${num}]`);
    const rightLines = [...Array(rightLineCount + 1).keys()].slice(1).reverse().map(num => `[right-${num}]`);

    return (
        <DockContainer topLines={topLines} bottomLines={bottomLines} leftLines={leftLines} rightLines={rightLines}>
            {wrappedChildren}
        </DockContainer>
    );
};
