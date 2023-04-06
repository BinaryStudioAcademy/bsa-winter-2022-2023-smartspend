import { type CategoryGetAllResponseDto } from 'shared/build/index.js';
import { CategoriesApiPath } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};
class CategoriesApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CATEGORIES, baseUrl, http, storage });
    }

    public async loadCategories(): Promise<CategoryGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(CategoriesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<CategoryGetAllResponseDto>();
    }
}

export { CategoriesApi };