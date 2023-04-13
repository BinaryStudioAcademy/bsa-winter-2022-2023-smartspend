import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class ImageApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.IMAGE_UPLOAD, baseUrl, http, storage });
    }

    public async createImage(
        file: File,
    ): Promise<Response & { json<T = unknown>(): Promise<T> }> {
        const formData = new FormData();
        formData.append('file', file);
        return await this.load(this.getFullEndpoint('/', {}), {
            method: 'POST',
            contentType: ContentType.MULTIPART_FORM_DATA,
            hasAuth: true,
            payload: file,
        });
    }
}

export { ImageApi };
