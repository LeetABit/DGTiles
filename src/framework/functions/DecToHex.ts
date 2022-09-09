//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import nonNegativeNumber from '../validators/nonNegativeNumber';
import { FunctionInfo } from './interfaces';

const Factorial : FunctionInfo<[bigint], [string]> = {
    name: 'DecToHex',
    description: 'Calculates factorial of the specified integer',
    tags: [
        'maths',
    ],
    input: [{
        name: 'Value',
        description: 'Integer which factorial shall be calculated.',
        typeName: 'bigint',
        isArray: false,
        isOptional: false,
    }],
    output: [{
        name: 'Factorial',
        description: 'Factorial of the specified input value.',
        typeName: 'string',
        isArray: false,
        isOptional: false,
    }],
    invoke([input]) {
        return [input.toString(16)];
    },
}

export default Factorial;
