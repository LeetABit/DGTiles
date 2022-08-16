//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import CloseButton from '../common/CloseButton';
import type { RootState } from '../../store';
import { useAppSelector } from '../../hooks/stateHooks';
import EditButton from '../common/EditButton';

interface Props {
    onClose: () => void,
    onEdit: () => void,
}

const style: CSSObject = {
    label: 'TileBox',
    position: 'relative',
    backgroundColor: 'white',
}

export default ({ onClose, onEdit, children }: React.PropsWithChildren<Props>) => {
    const isTileEditorActive = useAppSelector((state: RootState) => state.editor.isActive)

    return (
        <div css={style}>
            {isTileEditorActive && <CloseButton onClick={onClose} />}
            {isTileEditorActive && <EditButton onClick={onEdit} />}
            {children}
        </div>
    );
};