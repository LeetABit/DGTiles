//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback } from 'react';
import { ArgumentType } from '../../framework/functions/interfaces';
import { EditorProps, EditorInfo } from './interfaces';

interface Props extends EditorProps<number> {
}

function NumberEditor({ value, onValueChanged }: Props) {
    const onInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.currentTarget?.value);
        if (onValueChanged && !onValueChanged(number)) {
            e.preventDefault();
        }
    }, [onValueChanged]);

    return <input type="number" onInput={onInputHandler} value={value} />;
}

const info: EditorInfo = {
    editorName: 'Number Editor',
    description: 'Simple editor for numeric values.',
    type: 'number',
}

export default Object.assign(NumberEditor as React.ComponentType<EditorProps<ArgumentType>>, info);
