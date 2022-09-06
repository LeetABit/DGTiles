//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import FullscreenViewport from '../../common/FullscreenViewport';
import Footer from './Footer';
import Header from './Header';
import Toolbox from './Toolbox';
import Workspace from './Workspace';
import Dock from '../../common/Dock';

export default function MainView() {
    return (
        <FullscreenViewport>
            <Dock>
                <Header dock-direction="top" />
                <Dock dock-direction="fill">
                    <Toolbox dock-direction="left" />
                    <Workspace />
                </Dock>
                <Footer dock-direction="bottom" />
            </Dock>
        </FullscreenViewport>
    );
}
