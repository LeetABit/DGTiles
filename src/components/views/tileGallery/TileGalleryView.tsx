//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import TileBox from 'src/components/specialized/TileBox';
import FlowContainer from 'src/components/common/FlowContainer';
import { removeItem, TileDefinition } from 'src/states/tiles';
import { useAppDispatch, useAppSelector } from 'src/hooks/stateHooks';
import TileEditor from 'src/components/specialized/TileEditor';
import { Entity } from 'src/types';
import { setEditedItem } from 'src/states/editor';

export default function TileGalleryView() {
    const dispatch = useAppDispatch();
    const [isTileEditorActive, editedItem, items] = useAppSelector((state) => [state.editor.isActive, state.editor.editedItem, state.tiles.items]);
    if (editedItem && (!isTileEditorActive || !items.includes(editedItem))) {
        dispatch(setEditedItem(undefined));
    }

    const startEditing = useCallback((item: Entity<TileDefinition>) => {
        dispatch(setEditedItem(item));
    }, []);

    const stopEditing = useCallback(() => {
        dispatch(setEditedItem(undefined));
    }, []);

    return (
        <>
            {/* TODO: React and TypeScript does not support inert attribute yet. */}
            {/* https://github.com/facebook/react/pull/24730 */}
            {/* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 */}
            <div ref={node => node && (editedItem ? node.setAttribute('inert', '') : node.removeAttribute('inert'))}>
                <FlowContainer>
                    {/* TODO: each item shall be validated as its origin is unknown. */}
                    {items.map((item) => {
                        const onCloseHandler = () => dispatch(removeItem(item.id));
                        return (
                            <TileBox onClose={onCloseHandler} onEdit={() => startEditing(item)} key={item.id}>
                                {item.id}
                            </TileBox>
                        );
                    })}
                </FlowContainer>
            </div>
            {editedItem && <TileEditor tile={editedItem} onClose={stopEditing} />}
        </>
    );
}
