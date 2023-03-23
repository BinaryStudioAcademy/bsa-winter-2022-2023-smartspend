interface IRepository<T = unknown> {
    find(data: unknown): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(parameter: string | number, paylod: unknown): Promise<T>;
    delete(parameter: string | number): Promise<T>;
}

export { type IRepository };
