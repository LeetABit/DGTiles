//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback, useState } from 'react';
import TileBox from '../../specialized/TileBox';
import FlowContainer from '../../common/FlowContainer';
import { removeItem, TileDefinition } from '../../../states/tiles';
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';
import TileEditor from '../../specialized/TileEditor';
import { Entity } from '../../../types';

export default () => {
    const dispatch = useAppDispatch();
    const [isTileEditorActive, items] = useAppSelector((state) => [state.editor.isActive, state.tiles.items]);
    const [editedTile, setEditedTile] = useState<Entity<TileDefinition> | null>(null);
    if (editedTile && (!isTileEditorActive || !items.includes(editedTile))) {
        setEditedTile(null);
    }

    const startEditing = useCallback((item: Entity<TileDefinition>) => {
        setEditedTile(item);
    }, [setEditedTile]);

    const stopEditing = useCallback(() => {
        setEditedTile(null);
    }, [setEditedTile]);

    return (
        <>
            {/* TODO: React and TypeScript does not support inert attribute yet. */}
            {/* https://github.com/facebook/react/pull/24730 */}
            {/* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 */}
            <div ref={node => node && (editedTile ? node.setAttribute('inert', '') : node.removeAttribute('inert'))}>
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
            {editedTile && <TileEditor tile={editedTile} onClose={stopEditing} />}
        </>
    );
}
