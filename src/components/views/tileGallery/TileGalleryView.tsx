//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useEffect } from 'react';
import TileBox from '../../specialized/TileBox';
import FlowContainer from '../../common/FlowContainer';
import { removeItem, setEditedItemIndex, TileDefinition } from '../../../states/tiles';
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';
import TileEditor from '../../specialized/TileEditor';
import { Entity } from '../../../types';

export default function TileGalleryView() {
    const dispatch = useAppDispatch();
    const [isTileEditorActive, editedItemIndex, items] = useAppSelector((state) => [state.editor.isActive, state.tiles.editedItemIndex, state.tiles.items]);
    let editedItem: Entity<TileDefinition> | null = null;
    if (editedItemIndex !== -1) {
        editedItem = items[editedItemIndex];
    }

    useEffect(() => {
        if (!isTileEditorActive) {
            dispatch(setEditedItemIndex(-1));
        }
    }, [isTileEditorActive]);

    const startEditing = useCallback((itemIndex: number) => {
        dispatch(setEditedItemIndex(itemIndex));
    }, []);

    const stopEditing = useCallback(() => {
        dispatch(setEditedItemIndex(-1));
    }, []);

    return (
        <>
            {/* TODO: React and TypeScript does not support inert attribute yet. */}
            {/* https://github.com/facebook/react/pull/24730 */}
            {/* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 */}
            <div ref={node => node && (editedItem ? node.setAttribute('inert', '') : node.removeAttribute('inert'))}>
                <FlowContainer>
                    {/* TODO: each item shall be validated as its origin is unknown. */}
                    {items.map((item, itemIndex) => {
                        const onCloseHandler = () => dispatch(removeItem(item.id));
                        return (
                            <TileBox onClose={onCloseHandler} onEdit={() => startEditing(itemIndex)} key={item.id} tile={item.entity} />
                        );
                    })}
                </FlowContainer>
            </div>
            {editedItem && <TileEditor tile={editedItem} onClose={stopEditing} />}
        </>
    );
}
