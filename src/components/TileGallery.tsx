//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FlowContainer from 'src/components/FlowContainer';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { selectAllTiles, removeTile } from 'src/store/tiles';
import { startEditing, stopEditing } from 'src/store/editor';
import { cloneElementWithEmotion } from 'src/types';
import TileBox from './TileBox';
import TileEditorDialog from './TileEditorDialog';

interface Props {
    container?: ReactElement,
}

export default function TileGallery({ container = <div /> }: Props) {
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

    // TODO: React and TypeScript does not support inert attribute yet.
    // https://github.com/facebook/react/pull/24730
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822
    const refCallback : React.RefCallback<HTMLElement> = node => node && (editedTile ? node.setAttribute('inert', '') : node.removeAttribute('inert'))
    const containerCloned = cloneElementWithEmotion(
        container,
        undefined,
        { ref: refCallback },
        <FlowContainer>
            {definitions.map((definition) => {
                return (
                    <TileBox key={definition.id} onClose={onCloseHandler} onEdit={onEditHandler} definition={definition} />
                );
            })}
        </FlowContainer>,
    );

    return (
        <>
            {containerCloned}
            {editedTile && <TileEditorDialog definition={editedTile} onClose={stopEditingCallback} />}
        </>
    );
}
