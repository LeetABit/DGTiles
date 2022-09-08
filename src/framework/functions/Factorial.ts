//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import nonNegativeNumber from '../validators/nonNegativeNumber';
import { FunctionInfo } from './interfaces';

const Factorial : FunctionInfo<[bigint], [bigint]> = {
    name: 'Factorial',
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
        typeName: 'bigint',
        isArray: false,
        isOptional: false,
    }],
    validate([value]) {
        return [nonNegativeNumber(value)];
    },
    invoke([input]) {
        let counter = input;
        let result = counter;
        do {
            result *= --counter;
        } while (counter > 2);

        return [result];
    },
}

export default Factorial;
