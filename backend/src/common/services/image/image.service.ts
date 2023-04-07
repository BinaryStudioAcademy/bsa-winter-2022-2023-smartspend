import FormData from 'form-data';

import { type IConfig } from '~/common/config/config.js';

import { type httpService } from '../services.js';

type UploadedImage = {
    link: string;
};

class ImageService {
    private readonly http: typeof httpService;
    private readonly config: IConfig;

    public constructor(http: typeof httpService, config: IConfig) {
        this.http = http;
        this.config = config;
    }

    public async upload(file: {
        buffer: Buffer;
        originalname: string;
        size: number;
    }): Promise<UploadedImage> {
        const formData = new FormData();

        formData.append('imagedata', file.buffer, {
            filename: file.originalname,
            knownLength: file.size,
        });
        formData.append('access_token', this.config.ENV.GYAZO.ACCESS_TOKEN);

        const headers = formData.getHeaders();
        const response = await this.http.load(
            this.config.ENV.GYAZO.UPLOAD_API_URL,
            {
                method: 'POST',
                data: formData,
                headers,
            } as unknown as RequestInit,
        );

        return { link: response.url };
    }
}

export { type UploadedImage, ImageService };
