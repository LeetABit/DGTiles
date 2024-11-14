//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import { mergeStyles } from 'src/styles/mergeStyles';
import TileGalleryView from 'src/components/TileGallery';
import Dock from 'src/components/Dock';
import { cloneElementWithEmotion } from 'src/types';

interface Props {
    container?: ReactElement,
}

const style: CSSObject = {
    label: 'Workspace',
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'auto',
};

export default function Workspace({ container = <main /> }: Props) {
    const theme = useTheme();
    const mergedStyle = useMemo(() => {
        return mergeStyles({ ...theme.workspace }, style);
    }, [theme.workspace]);

    return useMemo(() => cloneElementWithEmotion(
        container,
        mergedStyle,
        undefined,
        <Dock>
            <TileGalleryView dock-direction="top" />
            <TileGalleryView dock-direction="fill" />
        </Dock>,
    ), [container, theme.workspace]);
}
