//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { EditorLink, FunctionLink, linkFunctions, linkInput, linkOutput, TileDefinition } from '../../states/tiles';
import { Entity } from '../../types';
import Dock from '../common/Dock';
import FunctionEditor from './FunctionEditor';
import EditorToolbox from './EditorToolbox';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import AddFunctionButton from './AddFunctionButton';
import functions from '../../framework/functions';
import Toolbar from '../common/Toolbar';
import InputEditor from './InputEditor';
import OutputEditor from './OutputEditor';
import { createContext, useCallback, useMemo, useState } from 'react';

interface Props {
    tile: Entity<TileDefinition>,
}

export class LinkBuilder {
    //private tile: Entity<TileDefinition>;
    private linkF: (link: FunctionLink) => void;
    private linkI: (link: EditorLink) => void;
    private linkO: (link: EditorLink) => void;
    private functionInputIndex: number;
    private paramInputIndex: number;
    private functionOutputIndex: number;
    private paramOutputIndex: number;
    private inputE: number;
    private outputE: number;
    constructor(linkF: (link: FunctionLink) => void, linkI: (link: EditorLink) => void, linkO: (link: EditorLink) => void) {
        this.linkF = linkF;
        this.linkI = linkI;
        this.linkO = linkO;
        this.functionInputIndex = -1;
        this.paramInputIndex = -1;
        this.functionOutputIndex = -1;
        this.paramOutputIndex = -1;
        this.inputE = -1;
        this.outputE = -1;
    }

    inputParam(functionIndex: number, paramIndex: number) {
        this.functionInputIndex = functionIndex;
        this.paramInputIndex = paramIndex;
        this.check();
    }

    outputParam(functionIndex: number, paramIndex: number) {
        this.functionOutputIndex = functionIndex;
        this.paramOutputIndex = paramIndex;
        this.check();
    }

    inputEditor(index: number) {
        this.inputE = index;
        this.check();
    }

    outputEditor(index: number) {
        this.outputE = index;
        this.check();
    }

    private check() {
        if (this.functionInputIndex !== -1 && this.functionOutputIndex !== -1) {
            this.linkF({input: {functionIndex: this.functionInputIndex, parameterIndex: this.paramInputIndex}, output: {functionIndex: this.functionOutputIndex, parameterIndex: this.paramOutputIndex}});
            this.functionInputIndex = -1;
            this.paramInputIndex = -1;
            this.functionOutputIndex = -1;
            this.paramOutputIndex = -1;
            this.inputE = -1;
            this.outputE = -1;
        } else if (this.functionInputIndex !== -1 && this.inputE !== -1) {
            this.linkI({editorIndex: this.inputE, functionParameter: {functionIndex: this.functionInputIndex, parameterIndex: this.paramInputIndex}});
            this.functionInputIndex = -1;
            this.paramInputIndex = -1;
            this.functionOutputIndex = -1;
            this.paramOutputIndex = -1;
            this.inputE = -1;
            this.outputE = -1;
        } else if (this.functionOutputIndex !== -1 && this.outputE !== -1) {
            this.linkO({editorIndex: this.outputE, functionParameter: {functionIndex: this.functionOutputIndex, parameterIndex: this.paramOutputIndex}});
            this.functionInputIndex = -1;
            this.paramInputIndex = -1;
            this.functionOutputIndex = -1;
            this.paramOutputIndex = -1;
            this.inputE = -1;
            this.outputE = -1;
        }
    }
}

export const TileEditorContext = createContext<LinkBuilder>(new LinkBuilder((a) => {}, (a) => {}, (a) => {}));
export default function TileEditor({ tile }: Props) {
    const dispatch = useAppDispatch();
    const linkF = useCallback((link: FunctionLink) => {
        dispatch(linkFunctions(link));
    }, []);
    const linkI = useCallback((link: EditorLink) => {
        dispatch(linkInput(link));
    }, []);
    const linkO = useCallback((link: EditorLink) => {
        dispatch(linkOutput(link));
    }, []);

    const linkBuilder = useMemo(() => new LinkBuilder(linkF, linkI, linkO), [tile]);
    const [editedItemIndex] = useAppSelector((state) => [state.tiles.editedItemIndex]);

    return (
        <TileEditorContext.Provider value={linkBuilder}>
            <Dock>
                <Toolbar dock-direction="top">
                    {editedItemIndex !== -1 && (
                        functions.map((f, i) => <AddFunctionButton functionName={f.name} functionIndex={i} key={f.name} />)
                    )}
                </Toolbar>
                <EditorToolbox dock-direction="left" />
                <Dock dock-direction="fill">
                    <InputEditor dock-direction="left" tile={tile} />
                    <FunctionEditor dock-direction="fill" tile={tile} />
                    <OutputEditor dock-direction="right" tile={tile} />
                </Dock>
                <EditorToolbox dock-direction="right" isOutput />
            </Dock>
        </TileEditorContext.Provider>
    );
}
