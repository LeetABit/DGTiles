//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { stopEditing } from 'src/store/editor';
import { setTiles } from 'src/store/tiles';

interface Props extends AriaAttributes{
    style?: CSSObject,
}

export default function ClearTilesButton({ style, ...ariaAttributes }: Props) {
    const dispatch = useDispatch();
    const callback = useCallback(() => {
        dispatch(stopEditing());
        dispatch(setTiles([]));
    }, []);
    return (
        <button type="button" css={style} onClick={callback} {...ariaAttributes}>
            Clear
        </button>
    );
}
