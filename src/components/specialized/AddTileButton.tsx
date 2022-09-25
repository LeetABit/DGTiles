//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import { useAppDispatch } from 'src/hooks/stateHooks';
import { setEditedItem } from 'src/states/editor';
import { addOrUpdateItem } from 'src/states/tiles';
import { Entity } from 'src/types';

export default function AddTileButton() {
    const dispatch = useAppDispatch();
    const clickHandler = useCallback(() => {
        const newItem = new Entity({});
        dispatch(addOrUpdateItem(newItem));
        dispatch(setEditedItem(newItem));
    }, []);

    return (
        <button type="button" onClick={clickHandler}>
            Add
        </button>
    );
}
