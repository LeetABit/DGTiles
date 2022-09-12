//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import CloseButton from '../../../common/CloseButton';
import { useAppSelector } from '../../../../hooks/stateHooks';
import EditTileButton from './EditTileButton';
import { TileDefinition } from '../../../../states/tiles';
import { allEditors } from '../../../editors';
import FlowContainer from '../../../common/FlowContainer';

interface Props {
    onClose: () => void,
    onEdit: (tileIndex: number) => void,
    tile: TileDefinition,
    tileIndex: number,
}

const style: CSSObject = {
    label: 'TileBox',
    backgroundColor: 'white',
}

const titleStyle: CSSObject = {
    display: 'inline-block',
}

const buttonsStyle: CSSObject = {
    float: 'right',
}

export default function TileBox({ onClose, onEdit, tile, tileIndex }: Props) {
    const isTileEditorActive = useAppSelector(state => state.tiles.isEditorActive);

    return (
        <div css={style}>
            <div>
                <div css={titleStyle}>
                    {tile.name}
                </div>
                {isTileEditorActive
                    && (
                        <div css={buttonsStyle}>
                            <CloseButton onClick={onClose} />
                            <EditTileButton onClick={onEdit} tileIndex={tileIndex} />
                        </div>
                    )}
            </div>
            <div>
                <FlowContainer direction="vertical">
                    {tile.editors.map(editor => {
                        return React.createElement(allEditors[editor.editorId], { key: editor.id }, null);
                    })}
                </FlowContainer>
            </div>
        </div>
    );
}
