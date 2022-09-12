import { v4 as uuid } from 'uuid';

export type Identity<T> = T & Identifier;

export interface Identifier extends OptionalIdentifier {
    id: string
}

export interface OptionalIdentifier {
    id?: string
}

export function identify<T extends {}>(obj: T): Identity<T> {
    return Object.assign(obj, { id: uuid() });
}
