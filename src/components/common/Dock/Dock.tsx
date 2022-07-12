//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { JSXElementConstructor, PropsWithChildren, ReactElement } from 'react';
import DockBottom from './DockBottom';
import DockDirectionalContainer, { Direction } from './DockContainer';
import DockFill from './DockFill';
import DockLeft from './DockLeft';
import DockRight from './DockRight';
import DockTop from './DockTop';

type ContainerTemplate = {
    direction?: Direction,
    type?: string,
    children: React.ReactNode[],
}

const Dock : React.FC<PropsWithChildren<unknown>> = ({ children } : PropsWithChildren<unknown>) => {
    let currentTemplate: ContainerTemplate = {
        children: [],
    }
    const templates: ContainerTemplate[] = [currentTemplate];
    let fillOccurred = false;

    React.Children.forEach(children, (child, index) => {
        if (!child
            || typeof child !== 'object'
            || !('props' in child)
            || !child.props
        ) {
            throw new Error('Dock component requires each of its children to have dock-* attribute defined.');
        }

        const key = child.key != null ? child.key : index.toString(36);

        let dock;
        let childComponent;
        if (child.props['dock-fill']) {
            dock = 'dock-fill';
            childComponent = <DockFill key={key}>{child}</DockFill>;
        } else if (child.props['dock-left']) {
            dock = 'dock-left';
            childComponent = <DockLeft key={key}>{child}</DockLeft>;
        } else if (child.props['dock-right']) {
            dock = 'dock-right';
            childComponent = <DockRight key={key}>{child}</DockRight>;
        } else if (child.props['dock-top']) {
            dock = 'dock-top';
            childComponent = <DockTop key={key}>{child}</DockTop>;
        } else if (child.props['dock-bottom']) {
            dock = 'dock-bottom';
            childComponent = <DockBottom key={key}>{child}</DockBottom>;
        }

        if (!dock) {
            throw new Error('Dock component requires each of its children to have dock-* attribute defined.');
        }

        if (fillOccurred) {
            throw new Error('Dock component does not accept any children after child with dock-fill attribute.');
        } else if (dock === 'dock-fill') {
            currentTemplate.children.push(childComponent);
            fillOccurred = true;
        } else if (currentTemplate.type === dock) {
            currentTemplate.children.push(childComponent);
        } else {
            currentTemplate = {
                type: dock,
                children: [childComponent],
            }

            templates.push(currentTemplate);

            if (dock === 'dock-fill') {
                currentTemplate.direction = 'Left';
            } else if (dock === 'dock-right') {
                currentTemplate.direction = 'Right';
            } else if (dock === 'dock-top') {
                currentTemplate.direction = 'Top';
            } else if (dock === 'dock-bottom') {
                currentTemplate.direction = 'Bottom';
            }
        }
    });

    if (!fillOccurred) {
        currentTemplate.children.push(<DockFill />);
    }

    return templates.reduceRight<ReactElement<unknown, string | JSXElementConstructor<unknown>> | null>((previousContainer, template) => {
        const childrenArray = [...template.children];
        if (previousContainer) {
            childrenArray.push(previousContainer);
        }

        return <DockDirectionalContainer key="fill" direction={template.direction ?? 'Top'}>{childrenArray}</DockDirectionalContainer>
    }, null);
};

export default Dock;
