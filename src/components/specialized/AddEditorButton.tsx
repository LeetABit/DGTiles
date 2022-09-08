//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/stateHooks';
import { addInputEditor, addOutputEditor } from '../../states/tiles';

interface Props {
    editorIndex: number,
    editorName: string,
    isOutput?: boolean,
}

export default function AddEditorButton({ editorIndex, editorName, isOutput = false }: Props) {
    const dispatch = useAppDispatch();
    const clickHandler = useCallback(() => {
        if (isOutput) {
            dispatch(addOutputEditor(editorIndex));
        } else {
            dispatch(addInputEditor(editorIndex));
        }
    }, [isOutput, editorIndex]);

    return (
        <button type="button" onClick={clickHandler}>
            {editorName}
        </button>
    );
}
