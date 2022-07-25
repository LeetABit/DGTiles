//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch } from '../../hooks/stateHooks';
import { toggleIsActive, isActive } from '../../states/tileEditor';

export default () => {
    const isTileEditorActive = isActive();
    const dispatch = useAppDispatch();

    return (
        <button type="button" onClick={toggleIsActive(dispatch)}>
            {isTileEditorActive ? 'Exit' : 'Edit'}
        </button>
    );
};
