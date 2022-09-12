//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useAppSelector } from '../../../../hooks/stateHooks';
import FlowContainer from '../../../common/FlowContainer';
import { allEditors } from '../../../editors';

interface Props {
    tileIndex: number
}

export default function EditorList({ tileIndex }: Props) {
    const tiles = useAppSelector((state) => state.tiles.tiles);
    const tile = tiles[tileIndex];

    return (
        <FlowContainer direction="vertical">
            {tile.editors.map(editor => <div>{allEditors[editor.editorId].editorName}</div>)}
        </FlowContainer>
    );
}
