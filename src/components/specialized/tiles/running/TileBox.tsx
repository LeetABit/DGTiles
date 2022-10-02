//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { TileDefinition } from 'src/store/tiles';
import CloseButton from 'src/components/common/CloseButton';
import EditButton from 'src/components/specialized/EditButton';
import { AriaAttributes, useCallback, useMemo } from 'react';
import Box from 'src/components/common/Box';
import { mergeStyles } from 'src/styles/mergeStyles';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { Entity } from 'src/types';

interface Props extends AriaAttributes{
    definition: Entity<TileDefinition>,
    style?: CSSObject,
    onClose: (tileId: string) => void,
    onEdit: (tileId: string) => void,
}

const baseStyle: CSSObject = {
    backgroundColor: 'white',
}

export default function TileBox({ definition, style, onClose, onEdit, ...ariaAttributes }: Props) {
    const isTileEditorActive = useRootSelector(state => state.editor.isActive);
    const css = useMemo(() => mergeStyles(baseStyle, style), [style]);
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

    return (
        <Box container={<div css={css} {...ariaAttributes} />} titleBar={definition.entity.name} buttons={buttons} />
    );
}
