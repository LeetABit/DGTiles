//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Dialog from '../../../common/Dialog';
import TileEditor from './TileEditor';

interface Props {
    tileIndex: number,
    onClose: () => void,
}

export default function TileEditorDialog({ tileIndex, onClose }: Props) {
    return (
        <Dialog mode="absolute-modal" onClose={onClose}>
            <TileEditor tileIndex={tileIndex} />
        </Dialog>
    );
}
