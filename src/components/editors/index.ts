//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ArgumentType } from '../../framework/functions/interfaces';
import { EditorInfo, EditorProps } from './interfaces';
import NumberEditor from './NumberEditor';
import StringEditor from './StringEditor';

interface EditorCollection {
    [editorId: string]: React.ComponentType<EditorProps<ArgumentType>> & EditorInfo;
}

export const allEditors = [NumberEditor, StringEditor].reduce((result, editor) => Object.assign(result, { [editor.id]: editor }), {}) as EditorCollection;
