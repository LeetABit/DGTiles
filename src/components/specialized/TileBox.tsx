//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import type { RootState } from 'src/store';
import { useAppSelector } from 'src/hooks/stateHooks';
import CloseButton from '../common/CloseButton';
import EditButton from './EditButton';

interface Props {
    onClose: () => void,
    onEdit: () => void,
}

const style: CSSObject = {
    label: 'TileBox',
    position: 'relative',
    backgroundColor: 'white',
}

export default function TileBox({ onClose, onEdit, children }: React.PropsWithChildren<Props>) {
    const isTileEditorActive = useAppSelector((state: RootState) => state.editor.isActive)

    return (
        <div css={style}>
            {isTileEditorActive && <CloseButton onClick={onClose} />}
            {isTileEditorActive && <EditButton onClick={onEdit} />}
            {children}
        </div>
    );
}
