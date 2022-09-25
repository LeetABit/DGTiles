//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch } from 'src/hooks/stateHooks';
import { clearItems } from 'src/states/tiles';

export default function ClearTilesButton() {
    const dispatch = useAppDispatch();
    return (
        <button type="button" onClick={() => dispatch(clearItems())}>
            Clear
        </button>
    );
}
