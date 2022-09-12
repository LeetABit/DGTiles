//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/stateHooks';
import { setEditor } from '../../../../states/tiles';
import Dock from '../../../common/Dock';
import EditorList from './EditorList';
import EditorPicker from './EditorPicker';

interface Props {
    tileIndex: number,
}

export default function EditorArea({ tileIndex }: Props) {
    const dispatch = useAppDispatch();
    const editorPicked = useCallback((editorId: string) => {
        dispatch(setEditor([tileIndex, { editorId }]));
    }, [tileIndex]);

    return (
        <Dock>
            <EditorPicker dock-direction="left" onPicked={editorPicked} />
            <EditorList tileIndex={tileIndex} />
        </Dock>
    );
}
