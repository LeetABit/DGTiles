//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ArgumentType } from './functions/interfaces';

export interface Observable {
    subscribe(observer: (value: ArgumentType) => void): void;
}
