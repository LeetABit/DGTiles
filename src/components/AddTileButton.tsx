//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setTile } from 'src/store/tiles';
import { startEditing } from 'src/store/editor';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { PropsWithAria } from 'src/types';

interface Props {
    style?: CSSObject,
}

export default function AddTileButton({ style, ...ariaAttributes }: PropsWithAria<Props>) {
    const tilesCount = useRootSelector(state => state.tiles.tilesOrder.length);
    const dispatch = useDispatch();
    const clickHandler = useCallback(() => {
        const id = uuid();
        dispatch(setTile(id, { name: `New Tile ${tilesCount + 1}` }));
        dispatch(startEditing(id));
    }, [tilesCount]);

    return (
        <button type="button" css={style} onClick={clickHandler} {...ariaAttributes}>
            Add
        </button>
    );
}
