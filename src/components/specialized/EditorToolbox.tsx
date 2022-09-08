//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Toolbar from '../common/Toolbar';
import Editors from '../editors';
import AddEditorButton from './AddEditorButton';

export default function EditorToolbox() {
    return (
        <Toolbar direction="column">
            {Editors.map((editor, index) => <AddEditorButton editorIndex={index} key={editor.name} editorName={editor.name} />)}
        </Toolbar>
    );
}
