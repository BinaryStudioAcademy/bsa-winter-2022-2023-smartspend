interface IService<T = unknown> {
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number, payload: unknown): Promise<T>;
    delete(id: number): Promise<T>;
}

export { type IService };
