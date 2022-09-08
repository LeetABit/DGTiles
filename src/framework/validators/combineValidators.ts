//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ArgumentType } from '../functions/interfaces';

export default function combineValidators(validators: ((value: ArgumentType) => boolean)[]): (value: ArgumentType) => boolean {
    return (value: ArgumentType) => {
        return validators.filter(validator => validator).reduce((result, validator) => {
            return result && validator(value);
        }, true);
    }
}
