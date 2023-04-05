import axios, {
    type AxiosError,
    type AxiosHeaders,
    type AxiosInstance,
} from 'axios';

class HttpService {
    private instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            timeout: 5000,
        });
    }

    public async load(
        url: string,
        options: AxiosHeaders = {} as AxiosHeaders,
    ): Promise<{ url: string }> {
        const { method = 'GET', data, headers } = options;

        try {
            const response = await this.instance.request({
                url,
                method,
                headers,
                data,
            });
            return response.data;
        } catch (error) {
            throw new Error((error as AxiosError).response?.data?.toString());
        }
    }
}

export { HttpService };
