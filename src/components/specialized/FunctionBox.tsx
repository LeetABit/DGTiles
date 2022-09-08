//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import functions from '../../framework/functions';

interface Props {
    functionIndex: number,
}

const flexStyle: CSSObject = {
    display: 'flex',
}

export default function FunctionBox({ functionIndex }: Props) {
    const f = functions[functionIndex];

    return (
        <div>
            <div>
                {f.name}
            </div>
            <div css={flexStyle}>
                <div>
                    {f.input.map((i, index) => <div key={index}>{i.name}</div>)}
                </div>
                <div>
                    {f.output.map((i, index) => <div key={index}>{i.name}</div>)}
                </div>
            </div>
        </div>
    );
}
