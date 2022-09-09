//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { TileDefinition } from '../../states/tiles';
import { Entity } from '../../types';
import EditorBox from './EditorBox';

interface Props {
    tile: Entity<TileDefinition>,
}

export default function OutputEditor({ tile }: Props) {
    return (
        <>
            {tile.entity.output.map((f, i) => <EditorBox editorIndex={f.entity} eIndex={i} isOutput={true} key={f.id} />)}
        </>
    );
}
