//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { TileDefinition } from 'src/store/tiles';
import CloseButton from 'src/components/CloseButton';
import EditButton from 'src/components/EditButton';
import { ReactElement, useCallback, useMemo } from 'react';
import Box from 'src/components/Box';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { cloneElementWithEmotion, Entity } from 'src/types';

interface Props {
    definition: Entity<TileDefinition>,
    container?: ReactElement,
    onClose: (tileId: string) => void,
    onEdit: (tileId: string) => void,
}

const baseStyle: CSSObject = {
    backgroundColor: 'white',
}

export default function TileBox({ definition, container = <div />, onClose, onEdit }: Props) {
    const isTileEditorActive = useRootSelector(state => state.editor.isActive);
    const onCloseHandler = useCallback(() => {
        onClose(definition.id);
    }, [definition.id]);

    const onEditHandler = useCallback(() => {
        onEdit(definition.id);
    }, [definition.id]);

    const buttons = isTileEditorActive
        ? (
            <>
                <EditButton onClick={onEditHandler} />
                <CloseButton onClick={onCloseHandler} />
            </>
        ) : undefined;

    const boxContainer = useMemo(() => cloneElementWithEmotion(container, baseStyle), [container]);

    return (
        <Box container={boxContainer} titleBar={definition.entity.name} buttons={buttons} />
    );
}
