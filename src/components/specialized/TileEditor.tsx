//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { TileDefinition } from '../../states/tiles';
import { Entity } from '../../types';
import Dialog from '../common/Dialog';
import Dock from '../common/Dock';
import FunctionEditor from './FunctionEditor';
import EditorToolbox from './EditorToolbox';

interface Props {
    tile: Entity<TileDefinition>,
    onClose: () => void,
}

export default function TileEditor({ tile, onClose }: Props) {
    return (
        <Dialog mode="absolute-modal" onClose={onClose}>
            <Dock>
                <EditorToolbox dock-direction="left" />
                <FunctionEditor dock-direction="fill" tile={tile} />
                <EditorToolbox dock-direction="right" />
            </Dock>
        </Dialog>
    );
}
