//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/stateHooks';
import { clearTiles } from '../../../states/tiles';

export default function ClearTilesButton() {
    const dispatch = useAppDispatch();
    const clickHandler = useCallback(() => {
        dispatch(clearTiles());
    }, []);

    return (
        <button type="button" onClick={clickHandler}>
            Clear
        </button>
    );
}
