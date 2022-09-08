import { v4 as uuid } from 'uuid';
import { immerable } from 'immer';

export interface Identification {
    get id(): string
}

export class Entity<T> implements Identification {
    entity: T;
    id: string;
    constructor(entity: T) {
        this.entity = entity;
        this.id = uuid();
    }

    static [immerable] = true;
}

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type OptionalNullable<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export type ElementOf<TArray extends readonly unknown[]> = TArray extends readonly (infer TElement)[] ? TElement : never;
