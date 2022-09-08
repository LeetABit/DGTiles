//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import CustomType from '../types';

export type ScalarType = boolean | string | number | bigint | CustomType;
export type ArrayType = ScalarType[];
export type ArgumentType = ScalarType | ArrayType;

export interface FunctionInfo<TInput extends ArgumentType[] = ArgumentType[], TOutput extends ArgumentType[] = ArgumentType[]> {
    get name(): string;
    get description(): string;
    get tags(): string[];
    get input(): ParameterInfoOf<TInput>;
    get output(): ParameterInfoOf<TOutput>;
    validate?(input: TInput): BooleanOf<TInput>;
    invoke(input: TInput): TOutput;
}

type ParameterInfoOf<T> = { [P in keyof T]: ParameterInfo };
type BooleanOf<T> = { [P in keyof T]: boolean };

export interface ParameterInfo {
    get name(): string;
    get description(): string;
    get typeName(): string;
    get isArray(): boolean;
    get isOptional(): boolean;
}
