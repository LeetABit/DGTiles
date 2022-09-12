//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useEffect, useState } from 'react';
import TileBox from './tiles/running/TileBox';
import FlowContainer from '../common/FlowContainer';
import { removeTile } from '../../states/tiles';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import TileEditorDialog from './tiles/editing/TileEditorDialog';

export default function TileGallery() {
    const dispatch = useAppDispatch();
    const [isTileEditorActive, tiles] = useAppSelector((state) => [state.tiles.isEditorActive, state.tiles.tiles]);
    const [editedTileIndex, setEditedTileIndex] = useState<number>(-1);

    const isTileEdited = editedTileIndex >= 0 ? !!tiles.at(editedTileIndex) : undefined;

    useEffect(() => {
        if (!isTileEditorActive) {
            setEditedTileIndex(-1);
        }
    }, [isTileEditorActive]);

    const startEditing = useCallback((itemIndex: number) => {
        setEditedTileIndex(itemIndex);
    }, []);

    const stopEditing = useCallback(() => {
        setEditedTileIndex(-1);
    }, []);

    return (
        <>
            {/* TODO: React and TypeScript does not support inert attribute yet. */}
            {/* https://github.com/facebook/react/pull/24730 */}
            {/* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 */}
            <div ref={node => node && (isTileEdited ? node.setAttribute('inert', '') : node.removeAttribute('inert'))}>
                <FlowContainer>
                    {/* TODO: each item shall be validated as its origin is unknown. */}
                    {tiles.map((tile, index) => {
                        const onCloseHandler = () => dispatch(removeTile(index));
                        return (
                            <TileBox key={tile.id} onClose={onCloseHandler} onEdit={startEditing} tile={tile} tileIndex={index} />
                        );
                    })}
                </FlowContainer>
            </div>
            {isTileEdited && <TileEditorDialog tileIndex={editedTileIndex} onClose={stopEditing} />}
        </>
    );
}
