//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FlowContainer from 'src/components/common/FlowContainer';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { selectAllTiles, removeTile } from 'src/store/tiles';
import { startEditing, stopEditing } from 'src/store/editor';
import TileBox from './tiles/running/TileBox';
import TileEditorDialog from './tiles/editing/TileEditorDialog';

export default function TileGallery() {
    const dispatch = useDispatch();
    const [
        isTileEditorActive,
        editedTileId,
        definitions] = useRootSelector(state => [state.editor.isActive, state.editor.editedTileId, selectAllTiles(state.tiles)]);

    const editedTile = (isTileEditorActive && !!editedTileId) ? definitions.find(tile => tile.id === editedTileId) : null;

    useEffect(() => {
        if (!isTileEditorActive) {
            dispatch(stopEditing());
        }
    }, [isTileEditorActive]);

    const startEditingCallback = useCallback((tileId: string) => {
        dispatch(startEditing(tileId));
    }, []);

    const stopEditingCallback = useCallback(() => {
        dispatch(stopEditing());
    }, []);

    const onCloseHandler = useCallback((tileId: string) => {
        dispatch(removeTile(tileId));
    }, []);

    const onEditHandler = useCallback((tileId: string) => {
        startEditingCallback(tileId);
    }, []);

    return (
        <>
            {/* TODO: React and TypeScript does not support inert attribute yet. */}
            {/* https://github.com/facebook/react/pull/24730 */}
            {/* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 */}
            <div ref={node => node && (editedTile ? node.setAttribute('inert', '') : node.removeAttribute('inert'))}>
                <FlowContainer>
                    {definitions.map((definition) => {
                        return (
                            <TileBox key={definition.id} onClose={onCloseHandler} onEdit={onEditHandler} definition={definition} />
                        );
                    })}
                </FlowContainer>
            </div>
            {editedTile && <TileEditorDialog definition={editedTile} onClose={stopEditingCallback} />}
        </>
    );
}
