//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { CSSObject, Global } from '@emotion/react';
import Dock from '../../common/Dock';
import FullscreenViewport from '../../common/FullscreenViewport';
import Footer from './Footer';
import Header from './Header';
import TileGalleryViewport from '../tileGallery/TileGalleryView';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import Toolbox from './Toolbox';

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
                <Dock location="top" content={<Header />}>
                    <Dock location="bottom" content={<Footer />}>
                        <Dock location="left" content={<Toolbox />}>
                            <main css={MainStyle}>
                                <TileGalleryViewport />
                            </main>
                        </Dock>
                    </Dock>
                </Dock>
            </FullscreenViewport>
        </>
    );
}

export default MainView;
