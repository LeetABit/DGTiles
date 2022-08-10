import { v4 as uuid } from 'uuid';

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
}
