class HttpService {
    public async load(
        url: string,
        options: RequestInit = {},
    ): Promise<{ url: string }> {
        const { method = 'GET', body, headers } = options;

        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            return { url: data.url };
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export { HttpService };
