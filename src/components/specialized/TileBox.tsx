//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useState } from 'react';
import CloseButton from '../common/CloseButton';
import type { RootState } from '../../store';
import { useAppSelector } from '../../hooks/stateHooks';
import EditButton from './EditButton';
import { TileDefinition } from '../../states/tiles';
import FunctionRunner from '../../framework/FunctionRunner';
import functions from '../../framework/functions';
import { ArgumentType } from '../../framework/functions/interfaces';
import combineValidators from '../../framework/validators/combineValidators';
import { Entity } from '../../types';
import editors from '../editors';
import { EditorProps } from '../editors/interfaces';

interface Props {
    onClose: () => void,
    onEdit: () => void,
    tile: TileDefinition,
}

const style: CSSObject = {
    label: 'TileBox',
    position: 'relative',
    backgroundColor: 'white',
}

const build = (definition: TileDefinition, values: ArgumentType[], setValues: React.Dispatch<React.SetStateAction<ArgumentType[]>>) => {
    const runners = definition.functions.map(func => new FunctionRunner(functions[func]));
    definition.functionLinks.forEach(link => {
        runners[link.output.functionIndex].outputs[link.output.parameterIndex].subscribe(runners[link.input.functionIndex].inputs[link.input.parameterIndex]);
    });

    const inputValidators: ((value: ArgumentType) => boolean)[][] = [];

    definition.inputLinks.forEach(link => {
        if (!inputValidators[link.editorIndex]) {
            inputValidators[link.editorIndex] = [];
        }

        inputValidators[link.editorIndex].push(runners[link.functionParameter.functionIndex].inputs[link.functionParameter.parameterIndex]);
    });

    const inputEditors = inputValidators.map((item, index) => {
        if (!item) {
            return undefined;
        }

        const combinedValidator = combineValidators(item);
        const editor: Entity<number> = definition.input[index];
        return React.createElement(editors[editor.entity] as React.ComponentType<EditorProps<ArgumentType>>, { key: editor.id, onValueChanged: combinedValidator }, null);
    }).filter(item => item);

    const outputEditors: React.ReactNode[] = [];

    definition.outputLinks.forEach(link => {
        runners[link.functionParameter.functionIndex].outputs[link.functionParameter.parameterIndex].subscribe(value => setValues(oldValues => {
            const newValues = [...oldValues];
            newValues[link.editorIndex] = value;
            return newValues;
        }));

        if (!outputEditors[link.editorIndex]) {
            outputEditors[link.editorIndex] = React.createElement(
                editors[definition.output[link.editorIndex].entity] as React.ComponentType<EditorProps<ArgumentType>>,
                { key: `${link.editorIndex}`, value: values[link.editorIndex] },
                null,
            );
        }
    });

    return [inputEditors, outputEditors];
}

export default function TileBox({ onClose, onEdit, tile }: Props) {
    const isTileEditorActive = useAppSelector((state: RootState) => state.editor.isActive);
    const [values, setValues] = useState<ArgumentType[]>(new Array<ArgumentType>(tile.output.length));
    const [inputEditors, outputEditors] = build(tile, values, setValues);

    return (
        <div css={style}>
            {isTileEditorActive && <CloseButton onClick={onClose} />}
            {isTileEditorActive && <EditButton onClick={onEdit} />}
            {inputEditors}
            {outputEditors}
        </div>
    );
}
