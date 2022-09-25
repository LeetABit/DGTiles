//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import TileGalleryView from 'src/components/specialized/TileGallery';

const baseStyle: CSSObject = {
    label: 'Workspace',
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'auto',
};

export default function Workspace() {
    const theme = useTheme();
    const style = useMemo(() => {
        return mergeStyles(baseStyle, { ...theme.workspace });
    }, [theme.workspace]);

    return (
        <main css={style}>
            <TileGalleryView />
        </main>
    );
}
