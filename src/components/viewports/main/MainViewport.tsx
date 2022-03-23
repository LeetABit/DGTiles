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
import TileGalleryViewport from '../tileGallery/TileGalleryViewport';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';

const globalStyle : CSSObject = {
    body: {
        margin: '0px',
    },
};

const MainStyle: CSSObject = mergeStyles(Fill, {
    label: 'MainViewport-Main',
});

const MainViewport : React.FC = () => {
    return (
        <>
            <Global styles={globalStyle} />
            <FullscreenViewport>
                <Dock location="top" content={<Header />}>
                    <Dock location="bottom" content={<Footer />}>
                        <main css={MainStyle}>
                            <TileGalleryViewport />
                        </main>
                    </Dock>
                </Dock>
            </FullscreenViewport>
        </>
    );
}

export default MainViewport;
