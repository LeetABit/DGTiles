//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { v4 as uuid } from 'uuid';

export interface Entity<T> {
    id: string,
    entity: T,
}

export function identify<T extends {}>(obj: T, id: string = uuid()): Entity<T> {
    return { id, entity: obj };
}
