//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import { DockWrapper } from '../../common/Dock';
import TileGalleryView from '../tileGallery/TileGalleryView';

const style: CSSObject = mergeStyles(Fill, {
    label: 'Workspace-Main',
    position: 'relative',
});

export default () => (
    <DockWrapper>
        <main css={style}>
            <TileGalleryView />
        </main>
    </DockWrapper>
);
