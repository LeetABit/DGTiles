//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, Global } from '@emotion/react';
import React from 'react';
import FullscreenViewport from '../../common/FullscreenViewport';
import Footer from './Footer';
import Header from './Header';
import Toolbox from './Toolbox';
import DockManager from '../../common/Dock/DockManager';
import Workspace from './Workspace';
import { DockDirection } from '../../common/Dock/types';

const globalStyle : CSSObject = {
    body: {
        margin: '0px',
    },
};

type DockElement = [ DockDirection, React.ReactNode ];

const children: DockElement[] = [
    ['top', <Header key="header" />],
    ['bottom', <Footer key="footer" />],
    ['left', <Toolbox key="toolbox" />],
    ['fill', <Workspace key="workspace" />],
];

export default () => {
    return (
        <>
            <Global styles={globalStyle} />
            <FullscreenViewport>
                <DockManager dockedNodes={children} />
            </FullscreenViewport>
        </>
    );
};