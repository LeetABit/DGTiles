//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch, useAppSelector } from 'src/hooks/stateHooks';
import { toggleIsActive } from 'src/states/editor';

export default function EditTilesButton() {
    const isTileEditorActive = useAppSelector((state) => state.editor.isActive);
    const dispatch = useAppDispatch();

    return (
        <button type="button" onClick={() => dispatch(toggleIsActive())}>
            {isTileEditorActive ? 'Exit' : 'Edit'}
        </button>
    );
}
