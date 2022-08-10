//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch } from '../../hooks/stateHooks';
import { addTile } from '../../states/tiles';

export default () => {
    const dispatch = useAppDispatch();
    return (
        <button type="button" onClick={() => dispatch(addTile({}))}>
            Add
        </button>
    );
};
