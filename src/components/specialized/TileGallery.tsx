//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FlowContainer from 'src/components/common/FlowContainer';
import { useRootSelector } from 'src/hooks/useRootSelector';
import TileBox from './tiles/running/TileBox';
import TileEditorDialog from './tiles/editing/TileEditorDialog';
import { selectAllTiles, removeTile } from 'src/store/tiles';
import { startEditing, stopEditing } from 'src/store/editor';

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

    return (
        <>
            {/* TODO: React and TypeScript does not support inert attribute yet. */}
            {/* https://github.com/facebook/react/pull/24730 */}
            {/* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 */}
            <div ref={node => node && (editedTile ? node.setAttribute('inert', '') : node.removeAttribute('inert'))}>
                <FlowContainer>
                    {/* TODO: each item shall be validated as its origin is unknown. */}
                    {/* TODO: check whether click handlers may be made common and passed with parameters from buttons data in child elements. */}
                    {definitions.map((definition) => {
                        const onCloseHandler = () => dispatch(removeTile(definition.id));
                        return (
                            <TileBox key={definition.id} onClose={onCloseHandler} onEdit={() => startEditingCallback(definition.id)} definition={definition.entity} />
                        );
                    })}
                </FlowContainer>
            </div>
            {editedTile && <TileEditorDialog definition={editedTile} onClose={stopEditingCallback} />}
        </>
    );
}
