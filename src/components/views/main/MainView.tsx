//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, Global } from '@emotion/react';
import FullscreenViewport from '../../common/FullscreenViewport';
import Footer from './Footer';
import Header from './Header';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import Toolbox from './Toolbox';
import TileGalleryView from '../tileGallery/TileGalleryView';
import Dock from '../../common/Dock';
import DockWrapper from '../../common/Dock/DockWrapper';

const globalStyle : CSSObject = {
    body: {
        margin: '0px',
    },
};

const MainStyle: CSSObject = mergeStyles(Fill, {
    label: 'MainView-Main',
});

export default () => (
    <>
        <Global styles={globalStyle} />
        <FullscreenViewport>
            <Dock>
                <Header dock-top />
                <Footer dock-bottom />
                <Toolbox dock-left dock-showDelay={300} dock-hideDelay={300} />
                <DockWrapper dock-fill>
                    <main css={MainStyle}>
                        <TileGalleryView />
                    </main>
                </DockWrapper>
            </Dock>
        </FullscreenViewport>
    </>
);
