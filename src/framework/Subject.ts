//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ArgumentType } from './functions/interfaces';
import { Observable } from './interfaces';

export class Subject implements Observable {
    protected plugs: ((value: ArgumentType) => void)[];

    constructor() {
        this.plugs = [];
    }

    subscribe(observer: (value: ArgumentType) => void) {
        this.plugs.push(observer);
    }

    receive(value: ArgumentType) {
        this.plugs.forEach(plug => plug(value));
    }
}
