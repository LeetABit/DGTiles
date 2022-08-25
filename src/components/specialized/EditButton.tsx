//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';

interface Props {
    onClick: () => void,
}

const style : CSSObject = {
    label: 'EditButton',
    position: 'relative',
    float: 'right',
};

export default ({ onClick }: Props) => {
    return <button type="button" css={style} onClick={onClick} aria-label="edit">Edit</button>;
}
