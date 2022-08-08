//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import CloseButton from './CloseButton';
import type { RootState } from '../../store';
import { useAppSelector } from '../../hooks/stateHooks';

interface Props {
    onClose: () => void,
}

const style: CSSObject = {
    label: 'ClosableBox',
    position: 'relative',
    backgroundColor: 'white',
}

export default ({ onClose, children }: React.PropsWithChildren<Props>) => {
    const isTileEditorActive = useAppSelector((state: RootState) => state.tileEditor.isActive)

    return (
        <div css={style}>
            {isTileEditorActive && <CloseButton onClick={onClose} />}
            {children}
        </div>
    );
};
