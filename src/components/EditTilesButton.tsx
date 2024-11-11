//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { toggleIsActive } from 'src/store/editor';

interface Props extends AriaAttributes{
    style?: CSSObject,
}

export default function EditTilesButton({ style, ...ariaAttributes }: Props) {
    const isTileEditorActive = useRootSelector((state) => state.editor.isActive);
    const dispatch = useDispatch();
    const onClickCallback = useCallback(() => {
        dispatch(toggleIsActive());
    }, [])

    return (
        <button type="button" css={style} onClick={onClickCallback} {...ariaAttributes}>
            {isTileEditorActive ? 'Exit' : 'Edit'}
        </button>
    );
}
