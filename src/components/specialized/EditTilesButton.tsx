//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { toggleIsActive } from '../../states/editor';

export default () => {
    const isTileEditorActive = useAppSelector((state) => state.editor.isActive);
    const dispatch = useAppDispatch();

    return (
        <button type="button" onClick={() => dispatch(toggleIsActive())}>
            {isTileEditorActive ? 'Exit' : 'Edit'}
        </button>
    );
};
