//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { TileDefinition } from 'src/states/tiles';
import { Entity } from 'src/types';
import Dialog from '../common/Dialog';

interface Props {
    tile: Entity<TileDefinition>,
    onClose: () => void,
}

export default function TileEditor({ tile, onClose }: Props) {
    return (
        <Dialog mode="absolute-modal" onClose={onClose}>
            {tile.id}
        </Dialog>
    );
}
