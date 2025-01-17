export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]> | T[P];
};

type updateResultType = {
    raw:any,
    affected?: number|null,
    generatedMaps: IObjectLiteral[],
}

type findAndCountType<T> = {
    where:Partial<T>,
    order?:Record<string, 'ASC'|'DESC'>
    take?:number,
    skip?:number,
    select?:(keyof T)[]
}

interface IObjectLiteral {
    [key: string]: any;
}

export interface IGlobalRepository<Entity> {
    findOne(id:string|number):Promise<Entity | undefined>;
    findOne(partialEntity:Partial<Entity>):Promise<Entity | undefined>;
    count(partialEntity:Partial<Entity>):Promise<number>;
    update(id:string|number, partialEntity:Partial<Entity>):Promise<updateResultType>;
    increment(partialEntity:Partial<Entity>, field:string, value:string|number):Promise<updateResultType>;
    decrement(partialEntity:Partial<Entity>, field:string, value:string|number):Promise<updateResultType>;
    delete(id:string|number):Promise<Pick<updateResultType, 'raw'&'affected'>>;
    find(partialEntity:Partial<Entity>): Promise<Entity[]>;
    findByIds(ids: (string|number)[]): Promise<Entity[]>;
    findByIds(ids: (string|number)[], options:Partial<findAndCountType<Entity>>): Promise<Entity[]>;
    findAndCount(data:findAndCountType<Entity>): Promise<[Entity[], number]>;
    findOneOrFail(id?: string | number): Promise<Entity>;
    query(query: string, parameters?: any[]): Promise<Entity[]>;
    create(entityLike: DeepPartial<Entity>): Entity;
    save<T extends DeepPartial<Entity>>(entities: T[]): Promise<T[]>;
}
