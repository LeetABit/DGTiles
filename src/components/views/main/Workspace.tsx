//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, useTheme } from '@emotion/react';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import { DockWrapper } from '../../common/Dock';
import TileGalleryView from '../tileGallery/TileGalleryView';

const baseStyle: CSSObject = mergeStyles(Fill, {
    label: 'Workspace-Main',
    position: 'relative',
});

export default () => {
    const theme = useTheme();
    const style = mergeStyles(baseStyle, { ...theme.workspace });

    return (
        <DockWrapper>
            <main css={style}>
                <TileGalleryView />
            </main>
        </DockWrapper>
    );
};
