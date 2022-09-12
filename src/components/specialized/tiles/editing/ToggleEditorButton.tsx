//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch, useAppSelector } from '../../../../hooks/stateHooks';
import { toggleEditor } from '../../../../states/tiles';

export default function ToggleEditorButton() {
    const isTileEditorActive = useAppSelector((state) => state.tiles.isEditorActive);
    const dispatch = useAppDispatch();

    return (
        <button type="button" onClick={() => dispatch(toggleEditor())}>
            {isTileEditorActive ? 'Exit' : 'Edit'}
        </button>
    );
}
