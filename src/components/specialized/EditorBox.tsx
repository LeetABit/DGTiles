//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import editors from '../editors';

interface Props {
    editorIndex: number,
}

const flexStyle: CSSObject = {
    display: 'flex',
}

export default function EditorBox({ editorIndex }: Props) {
    const f = editors[editorIndex];

    return (
        <div>
            <div>
                {f.name}
            </div>
        </div>
    );
}
