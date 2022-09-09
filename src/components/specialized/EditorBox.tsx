//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useContext } from 'react';
import editors from '../editors';
import { TileEditorContext } from './TileEditor';

interface Props {
    editorIndex: number,
    isOutput: boolean,
}

export default function EditorBox({ editorIndex, isOutput }: Props) {
    const f = editors[editorIndex];
    const tileEditorContext = useContext(TileEditorContext);

    return (
        <div>
            {f.name}
            <input type="checkbox" onChange={() => isOutput ? tileEditorContext.outputEditor(editorIndex) : tileEditorContext.inputEditor(editorIndex)} />
        </div>
    );
}
