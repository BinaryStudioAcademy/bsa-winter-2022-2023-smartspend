interface IService<T = unknown> {
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number | string, payload: unknown): Promise<T>;
    delete(id: number | string): Promise<T>;
}

export { type IService };
