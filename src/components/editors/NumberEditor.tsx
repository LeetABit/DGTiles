//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback, useState } from 'react';
import { ArgumentType } from '../../framework/functions/interfaces';
import { EditorProps, EditorInfo } from './interfaces';

interface Props extends EditorProps<number> {
}

function NumberEditor({ value, onValueChanged }: Props) {
    const [oldValue, setOldValue] = useState<string>(value?.toString() ?? '');
    const onInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        if (!target) {
            return;
        }

        const number = target.valueAsNumber;
        if (Number.isNaN(number) || (onValueChanged && !onValueChanged(number))) {
            target.value = oldValue;
        } else {
            setOldValue(target.value);
        }
    }, [oldValue, onValueChanged]);

    return <input type="number" onInput={onInputHandler} value={value} />;
}

const info: EditorInfo = {
    editorName: 'Number Editor',
    description: 'Simple editor for numeric values.',
    type: 'number',
}

export default Object.assign(NumberEditor as React.ComponentType<EditorProps<ArgumentType>>, info);
