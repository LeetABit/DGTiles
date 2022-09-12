//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import Toolbar from '../../../common/Toolbar';
import { allEditors } from '../../../editors';

interface Props {
    onPicked: (editorId: string) => void,
}

export default function EditorPicker({ onPicked }: Props) {
    const onClicked = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.id) {
            onPicked(e.currentTarget.dataset.id);
        }
    }, [onPicked]);

    return (
        <Toolbar direction="column">
            {Object.entries(allEditors).map(([editorId, editor]) => {
                return <button key={editorId} data-id={editorId} onClick={onClicked}>{editor.editorName}</button>
            })}
        </Toolbar>
    );
}
