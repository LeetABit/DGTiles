//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { AriaAttributes, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setTile, TileDefinition } from 'src/store/tiles';
import { Entity } from 'src/types';

interface Props extends AriaAttributes{
    definition: Entity<TileDefinition>,
    style?: CSSObject,
}

export default function TileNameEditor({ definition: { id: tileId, entity: tile }, style, ...ariaAttributes }: Props) {
    const dispatch = useDispatch();

    const onChangeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTile(tileId, { ...tile, name: event.currentTarget.value }));
    }, [tileId, tile]);

    return <input value={tile.name} onChange={onChangeCallback} css={style} {...ariaAttributes} />;
}
