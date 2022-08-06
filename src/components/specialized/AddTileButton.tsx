//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppDispatch } from '../../hooks/stateHooks';
import { addItem } from '../../states/tileEditor';

export default () => {
    const dispatch = useAppDispatch();

    const add = () => {
        dispatch(addItem());
    };

    return (
        <button type="button" onClick={add}>
            Add
        </button>
    );
};
