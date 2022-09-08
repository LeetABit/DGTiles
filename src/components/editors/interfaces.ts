//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

export interface EditorProps<T> {
    value?: T;
    onValueChanged?: (newValue: T) => boolean;
}

export interface EditorInfo {
    editorName: string,
    description: string,
    type: string,
}
