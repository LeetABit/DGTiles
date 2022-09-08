//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { FunctionInfo } from './interfaces';
import nonNegativeNumber from '../validators/nonNegativeNumber';

const Square : FunctionInfo<[bigint], [bigint]> = {
    name: 'Square',
    description: 'Calculates square of the specified integer',
    tags: [
        'maths',
    ],
    input: [{
        name: 'Value',
        description: 'Integer which square shall be calculated.',
        typeName: 'number',
        isArray: false,
        isOptional: false,
    }],
    output: [{
        name: 'Square',
        description: 'Square of the specified input value.',
        typeName: 'number',
        isArray: false,
        isOptional: false,
    }],
    validate([value]) {
        return [nonNegativeNumber(value)];
    },
    invoke([input]) {
        return [input * input];
    },
}

export default Square;
