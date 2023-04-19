interface IRepository<T = unknown> {
    find(data: unknown): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(parameter: string | number, data: unknown): Promise<T>;
    delete(parameter: string | number): Promise<unknown>;
}

export { type IRepository };
