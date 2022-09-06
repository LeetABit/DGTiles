//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import TileBox from '../../specialized/TileBox';
import FlowContainer from '../../common/FlowContainer';
import { removeItem, TileDefinition } from '../../../states/tiles';
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';
import TileEditor from '../../specialized/TileEditor';
import { Entity } from '../../../types';
import { setEditedItem } from '../../../states/editor';

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
