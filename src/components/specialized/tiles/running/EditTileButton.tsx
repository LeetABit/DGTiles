//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { useCallback } from 'react';

interface Props {
    onClick: (tileIndex: number) => void,
    tileIndex: number,
}

const style : CSSObject = {
    label: 'EditButton',
    position: 'relative',
    float: 'right',
};

export default function EditTileButton({ onClick, tileIndex }: Props) {
    const onClickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        onClick(Number(e.currentTarget.dataset.index));
    }, [onClick]);
    return <button type="button" css={style} data-index={tileIndex} onClick={onClickHandler} aria-label="edit">Edit</button>;
}
