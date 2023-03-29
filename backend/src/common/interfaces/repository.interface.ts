interface IRepository<T = unknown> {
    find(data: unknown): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<T>;
}

export { type IRepository };
