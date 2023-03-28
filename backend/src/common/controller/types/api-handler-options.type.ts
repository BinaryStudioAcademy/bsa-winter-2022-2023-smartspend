type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    token?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    token: T['token'];
};

export { type ApiHandlerOptions };
