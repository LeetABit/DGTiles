//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { TileDefinition } from 'src/store/tiles';
import CloseButton from 'src/components/common/CloseButton';
import EditButton from 'src/components/specialized/EditButton';
import { AriaAttributes, useMemo } from 'react';
import Box from 'src/components/common/Box';
import { mergeStyles } from 'src/styles/mergeStyles';
import { useRootSelector } from 'src/hooks/useRootSelector';

interface Props extends AriaAttributes{
    // TODO: index, id or object?
    definition: TileDefinition,
    style?: CSSObject,
    onClose: () => void,
    onEdit: () => void,
}

const baseStyle: CSSObject = {
    backgroundColor: 'white',
}

export default function TileBox({ definition, style, onClose, onEdit, ...ariaAttributes }: Props) {
    const isTileEditorActive = useRootSelector(state => state.editor.isActive);
    const css = useMemo(() => mergeStyles(baseStyle, style), [style]);
    const buttons = isTileEditorActive
        ? (
            <>
                <EditButton onClick={onEdit} />
                <CloseButton onClick={onClose} />
            </>
        ) : undefined;

    return (
        <Box container={<div css={css} {...ariaAttributes} />} titleBar={definition.name} buttons={buttons} />
    );
}
