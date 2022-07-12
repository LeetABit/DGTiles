//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { CSSObject, Global } from '@emotion/react';
import FullscreenViewport from '../../common/FullscreenViewport';
import Footer from './Footer';
import Header from './Header';
import TileGalleryView from '../tileGallery/TileGalleryView';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import Toolbox from './Toolbox';
import Dock, { TagWrapper } from '../../common/Dock';

const globalStyle : CSSObject = {
    body: {
        margin: '0px',
    },
};

const MainStyle: CSSObject = mergeStyles(Fill, {
    label: 'MainView-Main',
});

const MainView : React.FC = () => {
    return (
        <>
            <Global styles={globalStyle} />
            <FullscreenViewport>
                <Dock>
                    <Header dock-top />
                    <Footer dock-bottom />
                    <Toolbox dock-left />
                    <TagWrapper dock-fill>
                        <main css={MainStyle}>
                            <TileGalleryView />
                        </main>
                    </TagWrapper>
                </Dock>
            </FullscreenViewport>
        </>
    );
}

export default MainView;
