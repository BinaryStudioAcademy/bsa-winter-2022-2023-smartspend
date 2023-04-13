type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    token?: unknown;
    file?: unknown;
    files?: unknown;
    raw?: unknown;
    multipart?: unknown;
    parts?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    token: T['token'];
    file: T['file'];
    files: T['files'];
    raw: T['raw'];
    multipart: T['multipart'];
    parts: T['parts'];
};

export { type ApiHandlerOptions };
