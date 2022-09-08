//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ArgumentType, FunctionInfo } from './functions/interfaces';
import { Observable } from './interfaces';
import { Subject } from './Subject';

export default class FunctionRunner {
    private func: FunctionInfo;
    private validatorsField: ((value: ArgumentType) => boolean)[];
    private outputsField: Subject[];
    private inputValues: ArgumentType[];
    private inputProvided: boolean[];

    constructor(func: FunctionInfo) {
        this.func = func;
        this.inputValues = Array<ArgumentType>(func.input.length);
        this.inputProvided = Array<boolean>(func.input.length);
        this.validatorsField = func.input.map((_input, index) => {
            return (value: ArgumentType) => {
                if (!func.validate) {
                    return true;
                }

                const array = new Array<ArgumentType>(func.input.length);
                array[index] = value;
                const result = func.validate(array)[index];
                if (result) {
                    this.inputItemUpdated(value, index);
                }

                return result;
            }
        });

        this.outputsField = func.output.map(() => new Subject());
    }

    private inputItemUpdated(value: ArgumentType, index: number) {
        if (index < 0 || index >= this.inputValues.length) {
            throw new Error('Input index is out of range.');
        }

        this.inputProvided[index] = true;

        const currentValue = this.inputValues[index];
        if (value === currentValue) {
            return;
        }

        this.inputValues[index] = value;
        this.reevaluate();
    }

    private reevaluate() {
        if (!this.inputProvided.includes(false) && this.func.validate && this.func.validate(this.inputValues)) {
            const result = this.func.invoke(this.inputValues);

            result.forEach((item, index) => {
                this.outputsField[index].receive(item);
            });
        }
    }

    get inputs(): ((value: ArgumentType) => boolean)[] {
        return this.validatorsField;
    }

    get outputs(): Observable[] {
        return this.outputsField;
    }
}
