//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import DockManager, { DockedReactNode } from './DockManager';
import { DockDirection, dockDirectionPropName } from './types';

export default ({ children }: React.PropsWithChildren) => {
    const dockedNodes: DockedReactNode[] = React.Children.toArray(children).filter(child => child).map(child => {
        let dockDirection: DockDirection = 'Fill';

        if (child && typeof child === 'object' && 'props' in child && dockDirectionPropName in child.props) {
            dockDirection = child.props[dockDirectionPropName];
        }

        return [dockDirection, child];
    });

    return (
        <DockManager dockedNodes={dockedNodes} />
    );
};
