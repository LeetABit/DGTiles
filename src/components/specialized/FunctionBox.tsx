//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { useContext } from 'react';
import functions from '../../framework/functions';
import { TileEditorContext } from './TileEditor';

interface Props {
    functionIndex: number,
}

const flexStyle: CSSObject = {
    display: 'flex',
}

export default function FunctionBox({ functionIndex }: Props) {
    const f = functions[functionIndex];
    const tileEditorContext = useContext(TileEditorContext);

    return (
        <div>
            <div>
                {f.name}
            </div>
            <div css={flexStyle}>
                <div>
                    {f.input.map((i, index) => <div key={index}>{i.name}<input type="checkbox" onChange={() => tileEditorContext.inputParam(functionIndex, index)}/></div>)}
                </div>
                <div>
                    {f.output.map((i, index) => <div key={index}>{i.name}<input type="checkbox" onChange={() => tileEditorContext.outputParam(functionIndex, index)}/></div>)}
                </div>
            </div>
        </div>
    );
}
