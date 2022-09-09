//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { TileDefinition } from '../../states/tiles';
import { Entity } from '../../types';
import FunctionBox from './FunctionBox';

interface Props {
    tile: Entity<TileDefinition>,
}

export default function FunctionEditor({ tile }: Props) {
    return (
        <>
            {tile.id}
            {tile.entity.functions.map((f, i) => <FunctionBox functionIndex={f} fIndex={i} key={i} />)}
        </>
    );
}
