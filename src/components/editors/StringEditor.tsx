//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback, useState } from 'react';
import { ArgumentType } from '../../framework/functions/interfaces';
import { identify } from '../../types';
import { EditorInfo, EditorProps } from './interfaces';

interface Props extends EditorProps<string> {
}

function StringEditor({ value, onValueChanged }: Props) {
    const [oldValue, setOldValue] = useState<string>(value?.toString() ?? '');
    const onInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        if (!target) {
            return;
        }

        if (onValueChanged && !onValueChanged(target.value)) {
            target.value = oldValue;
        } else {
            setOldValue(target.value);
        }
    }, [oldValue, onValueChanged]);

    return <input type="text" onInput={onInputHandler} value={value} />;
}

const info: EditorInfo = {
    editorName: 'String Editor',
    description: 'Simple editor for string values.',
    id: '58b70b36-a844-4906-bdfb-0d2473759c84',
};

export default Object.assign(StringEditor as React.ComponentType<EditorProps<ArgumentType>>, info);
