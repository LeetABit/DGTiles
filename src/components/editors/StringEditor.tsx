//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback, useState } from 'react';
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
    type: 'string',
}

export default Object.assign(StringEditor, info);
