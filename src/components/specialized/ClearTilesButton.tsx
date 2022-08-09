//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch } from '../../hooks/stateHooks';
import { clearItems } from '../../states/tileEditor';

export default () => {
    const dispatch = useAppDispatch();

    const clear = () => {
        dispatch(clearItems());
    };

    return (
        <button type="button" onClick={clear}>
            Clear
        </button>
    );
};
