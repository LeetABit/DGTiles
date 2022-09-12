//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useContext } from 'react';
import Dock from '../../../common/Dock';
import { ScreenOrientationContext } from '../../../common/ScreenOrientationProvider';
import EditorArea from './EditorArea';

interface Props {
    tileIndex: number,
}

export default function TileEditor({ tileIndex }: Props) {
    const screenOrientation = useContext(ScreenOrientationContext);
    const editorAreaDock = screenOrientation === 'Landscape' ? 'left' : 'top';

    return (
        <Dock>
            <EditorArea dock-direction={editorAreaDock} tileIndex={tileIndex} />
        </Dock>
    );
}
