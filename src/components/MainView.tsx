//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import { DialogProvider } from './common/Dialog';
import TileGallery from './specialized/TileGallery';

const baseStyle: CSSObject = {
    width: '100vw',
    height: '100vh',
};

export default function MainView() {
    const theme = useTheme();
    const style = useMemo(() => {
        return mergeStyles(baseStyle, { backgroundColor: theme.colors.background.primary });
    }, [theme.colors.background]);

    return (
        <main css={style}>
            <DialogProvider>
                <TileGallery />
                {/* <ControlsButton /> */}
            </DialogProvider>
        </main>
    );
}
